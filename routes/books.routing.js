import { Router } from "express";
import { single_book } from "../controllers/books.controller.js";
import multer from "multer";

const router = Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/");
    },
    filename: (req, file, cb) => { cb(null, 'mysite' + file.originalname) }
});
const upload = multer({ storage: storage });

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>File Upload Page</title>
</head>
<body>
    <h1>File Upload Page</h1>
    <br>
    <form action="/books/single" method="post" enctype="multipart/form-data">
        <label for="book">File:</label>
        <input type="file" name="book">
        <br>
        <button type="submit">
            Upload
        </button>
    </form>
</body>
</html>
`;

router.get("/", (req, res) => {
    res.send(html);
});

router.post("/single", upload.single('book'), single_book);


export default router;