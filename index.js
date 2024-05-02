import express from 'express'
import someDatabase from 'your-database-library'; // Replace with your database library
const app = express();
app.use(cors())

app.get("/", (req, res) => {
    res.json({ message: "Express on Vercel" })
});

app.post('/api/readfile', async (req, res) => {
    try {
        const fileData = await someDatabase.getData('your-data-key'); // Assuming you have a function to get data by key
        const jsonData = JSON.parse(fileData);
        res.json(jsonData);
    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).send('Error reading data');
    }
});

const port = process.env.PORT || 3000; // Use a default port if environment variable is not set
app.listen(port, () => {
    console.log('Server is running');
});

export default app;
