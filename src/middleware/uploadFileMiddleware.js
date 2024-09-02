import multer from "multer";
import minioClient from "../config/configMinio.js";

const storage = multer.memoryStorage();
export const upload = multer({storage, fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'application/vnd.ms-excel') {
        cb(null, true);
    } else {
        cb(null, false); // Rejeita o arquivo
        // Ou você pode retornar um erro se preferir
        // cb(new Error('Arquivo não suportado'), false);
    }
}});

export const uploadMinio = async (bucketName, fileName, fileData) => {
  return new Promise((resolve, reject) => {
    minioClient.putObject(bucketName, fileName, fileData, (err, etag) => {
        if (err)
            reject(err);
        else
            resolve(etag);
    })
  });  
};


