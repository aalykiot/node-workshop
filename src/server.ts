import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short'));

app.get('/', (_, res) => {
  res.send({ ok: true });
});

export default app;
