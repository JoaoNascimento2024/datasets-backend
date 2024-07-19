import multer from "multer";

const storage = multer.diskStorage({
    //cb is callback function
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename : (req, file, cb) => {
        const sufix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + sufix + ".xlsx");
    }
});

export const upload = multer({storage : storage});