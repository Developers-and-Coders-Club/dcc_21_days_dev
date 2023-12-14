import cors from 'cors';

const allowedOrigins = [
  'https://decembothon.netlify.app',
  'https://decembothon.vercel.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export default cors(corsOptions);
