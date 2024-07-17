import express from 'express'
import path from 'path'

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory in our case the client react app
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', (req, res) => {
  console.log(__dirname)
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});