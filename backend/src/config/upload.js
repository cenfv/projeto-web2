const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

exports.upload = (folder) => {
  return {
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, "..", "..", folder),
      filename: (req, file, cb) => {
        const fileHash = crypto.randomBytes(16).toString("hex");
        const fileName = `${fileHash}-${file.originalname}`;

        return cb(null, fileName);
      },
    }),
  };
};
