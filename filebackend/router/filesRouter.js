import { Router } from "express";
import multer from "multer";
import fs from "node:fs";

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        cb(null, './public');
    },
    
    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + file.originalname;
        cb(null, filename);
    }
})
const upload = multer({ storage }); 

const filesRouter = Router();


filesRouter.get("/list", (req, res) => {
  fs.readdir("./public", (err, files) => {
    if (err) res.status(500).json({ message: err.message });
    let data = [];
    files.forEach((file) => {
      const obj = { name: file, url: `http://localhost:3000/${file}` };
      data.push(obj);
    });
    res.status(200).json(data);
  });
});

filesRouter.post('/upload', upload.single('test'), (req,res) => {
    res.status(200).json({ message: 'File uploaded successfully'});
})

filesRouter.delete('/delete/:name', (req,res) => {
    const { name } = req.params;
    fs.unlink(`./public/${name}`, (err) => {
        if (err) res.status(500).json({ message: err.message });
        res.status(200).json({ message: 'File deleted successfully' });
    });
}
)

export default filesRouter;