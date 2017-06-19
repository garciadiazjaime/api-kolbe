import express from 'express';
import bodyParser from 'body-parser';
import MongoUtil from 'util-mongodb';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';

import sessionRoutes from './routes/sessionRoutes';
import apiRoutes from './routes/apiRoutes';
import schoolRoutes from './routes/schoolRoutes';
import locationRoutes from './routes/locationRoutes';
import levelRoutes from './routes/levelRoutes';
import gradeRoutes from './routes/gradeRoutes';
import groupRoutes from './routes/groupRoutes';
import studentRoutes from './routes/studentRoutes';
import groupStudentRoutes from './routes/groupStudent';
import parentStudentRoutes from './routes/parentStudentRoutes';
import parentGroupRoutes from './routes/parentGroupRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import documentRoutes from './routes/documentRoutes';
import activityRoutes from './routes/activityRoutes';
import parentRoutes from './routes/parentRoutes';
import groupParentRoutes from './routes/groupParentRoutes';
import loginRoutes from './routes/loginRoutes';
import config from './config';

const app = express();
const mongoUtil = new MongoUtil(config.get('db.url'));

app.set('secureToken', config.get('secureToken'));
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));
app.use('/docs', express.static('data'));
app.use(fileUpload());

app.use('/api/login', loginRoutes);

app.use('/api', apiRoutes);

apiRoutes.use('/session', sessionRoutes);
apiRoutes.use('/school', schoolRoutes);
apiRoutes.use('/location', locationRoutes);

apiRoutes.use('/newsletter', newsletterRoutes);
apiRoutes.use('/document', documentRoutes);
apiRoutes.use('/activity', activityRoutes);
apiRoutes.use('/parent', parentRoutes);
apiRoutes.use('/student', studentRoutes);

apiRoutes.use('/parent/:parentId/student', parentStudentRoutes);
apiRoutes.use('/parent/:parentId/group', parentGroupRoutes);

apiRoutes.use('/group/:groupId/activity', activityRoutes);
apiRoutes.use('/group/:groupId/document', documentRoutes);
apiRoutes.use('/group/:groupId/newsletter', newsletterRoutes);
apiRoutes.use('/group/:groupId/parent', groupParentRoutes);
apiRoutes.use('/group/:groupId/student', groupStudentRoutes);
apiRoutes.use('/group', groupRoutes);


locationRoutes.use('/:locationId/level', levelRoutes);
levelRoutes.use('/:levelId/grade', gradeRoutes);
gradeRoutes.use('/:gradeId/group', groupRoutes);
groupRoutes.use('/:groupId/student', studentRoutes);
groupRoutes.use('/:groupId/parent', parentRoutes);

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
