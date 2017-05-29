import _ from 'lodash';
import uuidV1 from 'uuid/v1';

import config from '../../config';

export default class FileUtil {

  save(file) {
    return new Promise((resolve, reject) => {
      if (!_.isEmpty(file)) {
        const extension = file.name.split('.').pop();
        const fileName = `${uuidV1()}.${extension}`;
        file.mv(`${config.get('dataFolder')}/${fileName}`, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(fileName)
          }
        });
      } else {
        reject('no file');
      }
    });
  }
}
