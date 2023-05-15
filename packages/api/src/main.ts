import express from 'express';
import * as path from 'path';
import cors from 'cors';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'uploads');
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});
const upload = multer({ dest: 'uploads/' });

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cors());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.post('/upload', upload.single('file'), (req, res) => {
  console.log('file');
  console.log(req.file);

  res.send({ message: 'success' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
