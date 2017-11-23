import { isArray } from 'lodash';
import xlsx from 'node-xlsx';

import UserController from '../../controllers/userController';

export default class GroupUploadUtil {

  constructor() {
    this.columns = {
      group: {
        header: 'GRUPO',
        index: null,
      },
      lastname: {
        header: 'PATERNO',
        index: null,
      },
      lastname2: {
        header: 'MATERNO',
        index: null,
      },
      name: {
        header: 'NOMBRE',
        index: null,
      },
      familyCode: {
        header: 'COD_FAM',
        index: null,
      },
      email: {
        header: 'CORREO ELECTRONICO',
        index: null,
      },
    };
  }

  setColumns(row) {
    if (!isArray(row) || !row.length) {
      return false;
    }
    const rowUpperCase = row.map(item => item.toUpperCase());
    Object.keys(this.columns).forEach(key => {
      const index = rowUpperCase.indexOf(this.columns[key].header.toUpperCase());
      if (index !== -1) {
        this.columns[key].index = index;
      }
    });
    return true;
  }

  validColumns(row) {
    this.setColumns(row);

    for(let column in this.columns) {
      if (this.columns[column].index === null) {
        return false
      }
    }

    return true;
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
    let users = {};

    if (isArray(data) && data.length) {
      users = data.filter(item => isArray(item) && item.length).reduce((users, item) => {
        const { group, user } = this.getEntities(item);
        if (user.code
          && user.username
          && user.username.indexOf('@') !== -1
          && !users[user.code]) {
          users[user.code] = { user, group };
        }
        return users;
      }, {});
    }

    return Object.keys(users).map(key => users[key]);
  }

  process(buffer) {
    const dataFromFile = xlsx.parse(buffer).shift();

    if (this.validColumns(dataFromFile.data.shift())) {
      return this.dedupUsers(dataFromFile.data);
    }

    return [];
  }
}
