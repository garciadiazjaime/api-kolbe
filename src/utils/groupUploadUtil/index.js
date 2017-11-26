import { isArray } from 'lodash';
import xlsx from 'node-xlsx';
import md5 from 'md5';


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
    const bits = data[this.columns.email.index].split('@');
    return {
      password: bits[0],
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

  dedupUsersFromGroup(data) {
    let users = {};

    if (isArray(data) && data.length) {
      users = data.filter(item => isArray(item) && item.length).reduce((users, item) => {
        const { group, user } = this.getEntities(item);
        if (user.username && user.username.indexOf('@') !== -1) {
          users[user.username] = { user, group };
        }
        return users;
      }, {});
    }

    return Object.keys(users).map(key => users[key]);
  }

  dedupUsers(data) {
    let users = {};

    if (isArray(data) && data.length) {
      users = data.filter(item => isArray(item) && item.length).reduce((_users, item) => {
        const { group, user } = this.getEntities(item);
        if (user.username && user.username.indexOf('@') !== -1) {
          if (!_users[user.username]) {
            _users[user.username] = {
              user,
              groups: [],
            };
          }
          const key = md5(JSON.stringify(group));
          if (!_users[user.username][key]) {
            _users[user.username]['groups'].push(group);
            _users[user.username][key] = true;
          }
        }
        return _users;
      }, {});
    }

    return Object.keys(users).reduce((_users, username) => {
      const groups = Object.keys(users[username]).map(key => users[username][key]);
      _users.push({
        user: users[username].user,
        groups: users[username].groups,
      });
      return _users;
    }, []);
  }

  doProcess(buffer, isGroup = false) {
    const dataFromFile = xlsx.parse(buffer).shift();

    if (this.validColumns(dataFromFile.data.shift())) {
      return isGroup ? this.dedupUsersFromGroup(dataFromFile.data) : this.dedupUsers(dataFromFile.data);
    }

    return [];
  }

  process(buffer) {
    return this.doProcess(buffer);
  }

  processGroup(buffer) {
    return this.doProcess(buffer, true);
  }
}
