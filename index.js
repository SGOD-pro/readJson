import express from 'express';
import multer from 'multer';
import fs from 'fs';
import cors from 'cors';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.get("/", (req, res) => {
    res.send(200).json({ message: "Express on Vercel" })
});

app.post('/api/readfile', upload.single('file'), async(req, res) => {
    try {
        const filePath = req.file.path;
        const fileData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        await fs.promises.unlink(filePath); // Or use a promise-based approach

        res.json(jsonData);
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).send('Error reading file');
    }
});

export default app;
