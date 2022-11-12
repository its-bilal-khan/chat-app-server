import dotEnv from 'dotenv';
dotEnv.config();

import app from './express-config';
import { socketController } from './controllers';
import http from 'http';
import { bootstrap } from './bootstrap';
import mongoose from './db/MongoConfig';
import { GlobalMiddleware } from './middlewares/global-error-handler.middleware';
bootstrap();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

socketController.init(server);
app.use(GlobalMiddleware);
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING_V2, {
    useUnifiedTopology: true,
  })
  .then(result => {
    console.log('Db connected successfully');
    server.listen(PORT, () => console.log(`Server has starte on port ${PORT}`));
  })
  .catch(e => console.log(e));
