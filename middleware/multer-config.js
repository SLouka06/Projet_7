const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

module.exports = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!req.file) return next();

    const name = req.file.originalname.split(' ').join('_');
    const newFilename = name + Date.now() + '.webp';

    sharp(req.file.buffer)
      .resize(200)
      .toFormat('webp')
      .webp({ quality: 20 })
      .toFile(path.join('images', newFilename), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Erreur lors du traitement de l\'image' });
        }
        req.file.filename = newFilename;
        req.file.path = path.join('images', newFilename);
        next();
      });
  });
};

