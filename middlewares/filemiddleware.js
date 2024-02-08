const multer=require('multer')
const path=require('path')
const storage = multer.diskStorage({
    destination: path.join(__dirname,'../uploads'),
    filename: function (req, file, cb) {
      const allowedExtensions = ['.jpeg', '.jpg','.png'];
  
      // Validate file extension
      const extname = path.extname(file.originalname).toLowerCase();
      if (allowedExtensions.includes(extname)) {
        cb(null, file.fieldname + '-' + Date.now() + extname);
      } else {
        cb(new Error('Invalid file extension. Only JPEG and JPG files are allowed.'));
      }
    },
  });
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }, // 1 MB file size limit (adjust as needed)
  });

  module.exports=upload;