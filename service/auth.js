import fs from 'fs';
import path from 'path';
import url from 'url';
import jwt from 'jsonwebtoken';

// Construct the path to the directory containing the current module
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Use the constructed directory path to reference your key files
const privateKey = fs.readFileSync(
  path.join(__dirname, 'private_key.pem'),
  'utf8'
);
const publicKey = fs.readFileSync(
  path.join(__dirname, 'public_key.pem'),
  'utf8'
);

function setUser(user) {
  return jwt.sign(
    {
      username: user.username,
      role: user.role || 'PARTICIPANT',
    },
    privateKey,
    { algorithm: 'RS256', expiresIn: '90d' }
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      if (!(process.env.NODE_ENV == 'production')) console.log('Token expired');
    }
    return null;
  }
}

const authService = {
  setUser,
  getUser,
};

export default authService;
