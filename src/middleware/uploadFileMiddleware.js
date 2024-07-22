import multer from "multer";
import {v4 as uuidv4} from "uuid";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename : (req, file, cb) => {
        cb(null, `${uuidv4()}.xlsx`);
    }
});

export const upload = multer({storage : storage});