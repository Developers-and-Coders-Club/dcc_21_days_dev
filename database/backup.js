import fs from 'fs';
import path from 'path';
import cron from 'node-cron';
import archiver from 'archiver';
import { createClient } from 'webdav';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

// Construct the path to the directory containing the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextcloudUrl = process.env.NEXTCLOUD_URL;
const nextcloudOptions = JSON.parse(process.env.NEXTCLOUD_OPTIONS);

// Initialize WebDAV client for Nextcloud
const webdavClient = createClient(nextcloudUrl, nextcloudOptions);

function backupDatabase() {
  const dbPath = path.join(__dirname, '..', process.env.DB_FILENAME);
  const backupDir = path.join(__dirname, '..', process.env.BACKUP_DIR);
  const backupPath = path.join(
    backupDir,
    `Database_backup_${new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/:/g, '-')}.db`
  );

  // Ensure backup directory exists
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Copy the database file
  try {
    fs.copyFileSync(dbPath, backupPath);
    console.log(`Backup created at ${backupPath}`);
  } catch (error) {
    console.error('Error creating backup:', error);
  }
}

function compressAndUploadBackups() {
  const output = fs.createWriteStream(
    path.join(__dirname, '..', process.env.BACKUP_DIR, process.env.BACKUP_ZIP)
  );
  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  archive.pipe(output);

  // Add files to the archive
  fs.readdirSync(path.join(__dirname, '..', process.env.BACKUP_DIR)).forEach(
    (file) => {
      if (file !== process.env.BACKUP_ZIP) {
        archive.file(path.join(__dirname, '..', process.env.BACKUP_DIR, file), {
          name: file,
        });
      }
    }
  );

  archive.finalize();

  output.on('close', () => {
    console.log(`Archive created. Size: ${archive.pointer()} bytes`);
    uploadToNextcloud(
      path.join(
        __dirname,
        '..',
        process.env.BACKUP_DIR,
        process.env.BACKUP_ZIP
      ),
      process.env.NEXTCLOUD_BACKUP_PATH
    );
  });
}

function uploadToNextcloud(filePath, remotePath) {
  webdavClient
    .putFileContents(remotePath, fs.createReadStream(filePath))
    .then(() => {
      console.log(`Backup uploaded to Nextcloud at ${remotePath}`);
    })
    .catch((error) => {
      console.error('Error uploading to Nextcloud:', error);
    });
}

// Schedule the hourly backup
cron.schedule('0 * * * *', () => {
  console.log('Running a task every hour');
  backupDatabase();
});

// Schedule the daily backup upload
cron.schedule('0 0 * * *', () => {
  console.log('Running a daily task for backup upload');
  compressAndUploadBackups();
});

const backup = {
  backupDatabase,
  compressAndUploadBackups,
};

export default backup;
