import express from 'express';
import fs from 'fs';
import * as models from './models';

const router = express.Router();

router.get('/', async (req, res, next) => {
  // const updatedUser = await models.User.findOneAndUpdate({_id:"605112a8517f4b1290346f2a"}, {$push:{friendsId :"60575f2342f17c4a986a2cfd"}})

  next();
});

router.get('/logs', (req, res) => {
  fs.readFile('log.txt', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });
});
export default router;
