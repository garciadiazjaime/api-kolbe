import xlsx from 'node-xlsx';

import GroupUploadUtil from '../groupUploadUtil';

export default class XlsxUtil {

  static parseBufferToJson(buffer) {
    return xlsx.parse(buffer);
  }

  static dedupUsers(users) {
    const userByCode = {};
    const groupUploadUtil = new GroupUploadUtil();
    users.forEach((item, index) => {
      if (index === 0) {
        groupUploadUtil.setColumns(item);
      } else {
        const { user } = groupUploadUtil.getEntities(item);
        if (!userByCode[user.password]) {
          userByCode[user.password] = {
            user,
          };
        }
      }
    });
    return userByCode;
  }
}
