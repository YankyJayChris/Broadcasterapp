import path from 'path';
import multer from 'multer';

const single = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/public/avatar`));
  },
  // eslint-disable-next-line consistent-return
  filename: (req, file, callback) => {
    const match = ['image/png', 'image/jpeg', 'image/pjpeg'];

    if (match.indexOf(file.mimetype) === -1) {
      const message = `${file.originalname} is invalid. Only accept images.`;
      return callback(message, null);
    }

    const filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

const multfile = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/public/upload`));
  },
  // eslint-disable-next-line consistent-return
  filename: (req, file, callback) => {
    const match = ['image/png', 'image/jpeg', 'image/pjpeg', 'video/mp4', 'application/x-mpegURL', 'video/MP2T', 'video/3gpp', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv'];

    if (match.indexOf(file.mimetype) === -1) {
      const message = `${file.originalname} is invalid. Only accept video and images.`;
      return callback(message, null);
    }

    const filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

export const uploadFiles = multer({ storage: multfile }).array('files', 10);
export const uploadsingle = multer({ storage: single }).single('avatar');
