import _ from 'lodash';
import xlsx from 'node-xlsx';

import UserController from '../../controllers/userController';

export default class GroupUploadUtil {

  constructor() {
    this.columns = {
      group: {
        header: 'MH_GRUPO',
        index: null,
      },
      lastname: {
        header: 'MH_APT_ALU',
        index: null,
      },
      lastname2: {
        header: 'MH_AMT_ALU',
        index: null,
      },
      name: {
        header: 'MH_NOM_ALU',
        index: null,
      },
      studentCode: {
        header: 'MH_COD_ALU',
        index: null,
      },
      dob: {
        header: 'MH_FEC_NAC',
        index: null,
      },
      registrationDate: {
        header: 'MH_FEC_ALT',
        index: null,
      },
      familyCode: {
        header: 'MH_COD_FAM',
        index: null,
      },
      email: {
        header: 'CORREO ELECTRONICO',
        index: null,
      },
    };
  }

  setColumns(row) {
    if (!_.isArray(row) || !row.length) {
      return false;
    }
    const rowUpperCase = row.map(item => item.toUpperCase());
    let column = null;
    for(column in this.columns) {
      const index = rowUpperCase.indexOf(this.columns[column].header.toUpperCase());
      if (index !== -1) {
        this.columns[column].index = index;
      }
    }
  }

  getEntities(row) {
    return {
      group: this.getGroup(row),
      student: this.getStudent(row),
      user: this.getUser(row),
    };
  }

  getGroup(data) {
    const bits = data[this.columns.group.index].split('');
    return {
      level: bits[0] || null,
      grade: bits[1] || null,
      group: bits[2] || null,
    };
  }

  getStudent(data) {
    return {
      lastname: data[this.columns.lastname.index],
      lastname2: data[this.columns.lastname2.index],
      name: data[this.columns.name.index],
      code: `${data[this.columns.studentCode.index]}`,
      dob: this.getJsDateFromExcel(data[this.columns.dob.index]),
      registrationDate: this.getDate(data[this.columns.registrationDate.index]),
    };
  }

  getUser(data) {
    return {
      password: `${data[this.columns.familyCode.index]}`,
      code: `${data[this.columns.familyCode.index]}`,
      username: data[this.columns.email.index],
      role: UserController.getRole('parent'),
    };
  }

  getJsDateFromExcel(excelDate) {
    if(excelDate) {
      // https://gist.github.com/christopherscott/2782634
      const date = new Date((excelDate - (25567 + 2))*86400*1000);
      const bits = date.toJSON().split('T')[0].split('-')
      return new Date(`${bits[1]}-${bits[2]}-${bits[0]}`) || excelDate;
    }
    return null;
  }

  getDate(data) {
    if (data) {
      const bits = data.split('');
      return new Date(`${bits[2]}${bits[3]}-${bits[0]}${bits[1]}-20${bits[4]}${bits[5]}`) || data;
    }
    return null;
  }

  dedupUsers(data) {
    const userByCode = {};
    const users = [];

    data.forEach((item, index) => {
      if (index === 0) {
        this.setColumns(item);
      } else {
        const { user } = this.getEntities(item);
        if (user.password && user.username && !userByCode[user.password]) {
          userByCode[user.password] = true;
          users.push({
            user,
          });
        }
      }
    });

    return users;
  }

  process(buffer) {
    const dataFromFile = xlsx.parse(buffer).pop();
    if (_.isArray(dataFromFile.data) && dataFromFile.data.length) {
      return this.dedupUsers(dataFromFile.data);
    }
    return [];
  }
}
