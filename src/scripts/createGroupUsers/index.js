const MongoUtil = require('util-mongodb').default;
const _ = require('lodash');

const config = require('../../config');

const mongoUtil = new MongoUtil(config.get('db.url'));

mongoUtil
  .openConnection()
  .then(() => mongoUtil.findOne('school'))
  .then((school) => {
    const { location } = school;
    const promises = [];
    if (_.isArray(location) && location.length) {
      location.map((loc) => {
        const { level } = loc;
        if (_.isArray(level) && level.length) {
          level.map((lev) => {
            const { grade } = lev;
            if (_.isArray(grade) && grade.length) {
              grade.map((gra) => {
                const { group } = gra;
                group.map((gro) => {
                  const username = cleanString(`${loc.name}_${lev.name}_${gra.name}${gro.name}@irk.mx`);
                  const password = cleanString(`${loc.name}_${gra.name}${gro.name}`);
                  const user = {
                    username,
                    password,
                    role: 2,
                    entityId: gro.id,
                    status: true,
                    created: new Date(),
                  }
                  promises.push(mongoUtil.insert('user', user));
                });
              });
            }
          });
        }
      });
    }
    return Promise.all(promises);
  })
  .then(() => {
    console.log('finish');
    mongoUtil.closeConnection();
  })
  .catch(errors => {
    console.log('Error', errors);
  });

function cleanString(string) {
  return string.toLowerCase().replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}
