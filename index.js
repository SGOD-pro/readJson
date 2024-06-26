import express from 'express';
import multer from 'multer';
import fs from 'fs';
import cors from 'cors';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Express on Vercel" });
});

app.post('/api/readfile', upload.single('file'), (req, res) => {
    try {
        const filePath = req.file.path;
        const fileData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
            console.log('File deleted successfully');
        });
        res.json(jsonData);
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).send('Error reading file');
    }
});
app.listen(3000,()=>{
    console.log("Server started.");
});
export default app;
