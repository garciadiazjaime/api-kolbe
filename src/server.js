import express from 'express';
import bodyParser from 'body-parser';
import MongoUtil from 'util-mongodb';

import locationRoutes from './routes/locationRoutes';
import periodRoutes from './routes/periodRoutes';
import gradeRoutes from './routes/gradeRoutes';
import groupRoutes from './routes/groupRoutes';
import studentRoutes from './routes/studentRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import documentRoutes from './routes/documentRoutes';
import config from './config';

const app = express();
const mongoUtil = new MongoUtil(config.get('db.url'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));

app.use('/api/location', locationRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/document', documentRoutes);

locationRoutes.use('/:locationId/period', periodRoutes);
periodRoutes.use('/:periodId/grade', gradeRoutes);
gradeRoutes.use('/:gradeId/group', groupRoutes);

app.get('/health', (req, res) => {
  res.writeHead(200);
  res.end();
});

app.set('ipaddress', config.get('ipaddress'));
app.set('port', config.get('port'));

mongoUtil.openConnection()
  .then(() => {
    const server = app.listen(app.get('port'), app.get('ipaddress'), (err) => {
      if (err) {
        console.log(err);
      }
      const host = server.address().address;
      const port = server.address().port;
      console.log('Example app listening at http://%s:%s', host, port);
    });
  }, () => {
    console.log('Error :: No DB connection open');
  });
