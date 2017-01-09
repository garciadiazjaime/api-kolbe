const LogUtil = {};

LogUtil.log = (type, message) => {
  console.log(`type: ${type}, message: ${message || ''}`);
};

module.exports = LogUtil;
