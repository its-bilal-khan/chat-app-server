import express from 'express';
import cors from 'cors';
import router from './router';
import routes from './routes';
import { verifyTokenMiddleWare } from './middlewares/VerifyToken';

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

const app = express();

app.use(router);
app.use(cors(corsOptions));
app.use(express.json()); // DEPRICATED
app.use(verifyTokenMiddleWare);
app.use(express.static('Videos'));

app.use('/', routes);

export default app;
