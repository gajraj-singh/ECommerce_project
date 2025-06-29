const multer = require('multer');
const storage = multer.memoryStorage(); // store image in RAM before DB
const upload = multer({ storage });

module.exports = upload;