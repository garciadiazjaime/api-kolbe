import express from 'express';
import bodyParser from 'body-parser';
import MongoUtil from 'util-mongodb';
import cors from 'cors';
import fileUpload from 'express-fileupload';


import schoolRoutes from './routes/schoolRoutes';
import locationRoutes from './routes/locationRoutes';
import levelRoutes from './routes/levelRoutes';
import gradeRoutes from './routes/gradeRoutes';
import groupRoutes from './routes/groupRoutes';
import studentRoutes from './routes/studentRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import documentRoutes from './routes/documentRoutes';
import activityRoutes from './routes/activityRoutes';
import parentRoutes from './routes/parentRoutes';
import config from './config';

const app = express();
const mongoUtil = new MongoUtil(config.get('db.url'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));
app.use(fileUpload());

app.use('/api/school', schoolRoutes);
app.use('/api/location', locationRoutes);

app.use('/api/newsletter', newsletterRoutes);
app.use('/api/document', documentRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/parent', parentRoutes);

app.use('/api/group/:groupId/activity', activityRoutes);
app.use('/api/group/:groupId/document', documentRoutes);
app.use('/api/group/:groupId/newsletter', newsletterRoutes);
app.use('/api/group/:groupId/parent', parentRoutes);

locationRoutes.use('/:locationId/level', levelRoutes);
levelRoutes.use('/:levelId/grade', gradeRoutes);
gradeRoutes.use('/:gradeId/group', groupRoutes);
groupRoutes.use('/:groupId/student', studentRoutes);

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
