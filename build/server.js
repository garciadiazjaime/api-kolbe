module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _bodyParser = __webpack_require__(2);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _cors = __webpack_require__(4);

	var _cors2 = _interopRequireDefault(_cors);

	var _expressFileupload = __webpack_require__(5);

	var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

	var _morgan = __webpack_require__(6);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _sessionRoutes = __webpack_require__(7);

	var _sessionRoutes2 = _interopRequireDefault(_sessionRoutes);

	var _apiRoutes = __webpack_require__(8);

	var _apiRoutes2 = _interopRequireDefault(_apiRoutes);

	var _schoolRoutes = __webpack_require__(12);

	var _schoolRoutes2 = _interopRequireDefault(_schoolRoutes);

	var _locationRoutes = __webpack_require__(15);

	var _locationRoutes2 = _interopRequireDefault(_locationRoutes);

	var _levelRoutes = __webpack_require__(17);

	var _levelRoutes2 = _interopRequireDefault(_levelRoutes);

	var _gradeRoutes = __webpack_require__(19);

	var _gradeRoutes2 = _interopRequireDefault(_gradeRoutes);

	var _groupRoutes = __webpack_require__(21);

	var _groupRoutes2 = _interopRequireDefault(_groupRoutes);

	var _studentRoutes = __webpack_require__(28);

	var _studentRoutes2 = _interopRequireDefault(_studentRoutes);

	var _groupStudent = __webpack_require__(30);

	var _groupStudent2 = _interopRequireDefault(_groupStudent);

	var _parentStudentRoutes = __webpack_require__(32);

	var _parentStudentRoutes2 = _interopRequireDefault(_parentStudentRoutes);

	var _parentGroupRoutes = __webpack_require__(34);

	var _parentGroupRoutes2 = _interopRequireDefault(_parentGroupRoutes);

	var _newsletterRoutes = __webpack_require__(36);

	var _newsletterRoutes2 = _interopRequireDefault(_newsletterRoutes);

	var _documentRoutes = __webpack_require__(38);

	var _documentRoutes2 = _interopRequireDefault(_documentRoutes);

	var _activityRoutes = __webpack_require__(45);

	var _activityRoutes2 = _interopRequireDefault(_activityRoutes);

	var _parentRoutes = __webpack_require__(47);

	var _parentRoutes2 = _interopRequireDefault(_parentRoutes);

	var _groupParentRoutes = __webpack_require__(49);

	var _groupParentRoutes2 = _interopRequireDefault(_groupParentRoutes);

	var _loginRoutes = __webpack_require__(50);

	var _loginRoutes2 = _interopRequireDefault(_loginRoutes);

	var _config = __webpack_require__(10);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();
	var mongoUtil = new _utilMongodb2.default(_config2.default.get('db.url'));

	app.set('secureToken', _config2.default.get('secureToken'));
	app.use((0, _morgan2.default)('dev'));
	app.use((0, _cors2.default)());
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use(_bodyParser2.default.json());
	app.use(_express2.default.static('static'));
	app.use('/docs', _express2.default.static('data'));
	app.use((0, _expressFileupload2.default)());

	app.use('/api/login', _loginRoutes2.default);

	app.use('/api', _apiRoutes2.default);

	_apiRoutes2.default.use('/session', _sessionRoutes2.default);
	_apiRoutes2.default.use('/school', _schoolRoutes2.default);
	_apiRoutes2.default.use('/location', _locationRoutes2.default);

	_apiRoutes2.default.use('/newsletter', _newsletterRoutes2.default);
	_apiRoutes2.default.use('/document', _documentRoutes2.default);
	_apiRoutes2.default.use('/activity', _activityRoutes2.default);
	_apiRoutes2.default.use('/parent', _parentRoutes2.default);
	_apiRoutes2.default.use('/student', _studentRoutes2.default);

	_apiRoutes2.default.use('/parent/:parentId/student', _parentStudentRoutes2.default);
	_apiRoutes2.default.use('/parent/:parentId/group', _parentGroupRoutes2.default);

	_apiRoutes2.default.use('/group/:groupId/activity', _activityRoutes2.default);
	_apiRoutes2.default.use('/group/:groupId/document', _documentRoutes2.default);
	_apiRoutes2.default.use('/group/:groupId/newsletter', _newsletterRoutes2.default);
	_apiRoutes2.default.use('/group/:groupId/parent', _groupParentRoutes2.default);
	_apiRoutes2.default.use('/group/:groupId/student', _groupStudent2.default);
	_apiRoutes2.default.use('/group', _groupRoutes2.default);

	_locationRoutes2.default.use('/:locationId/level', _levelRoutes2.default);
	_levelRoutes2.default.use('/:levelId/grade', _gradeRoutes2.default);
	_gradeRoutes2.default.use('/:gradeId/group', _groupRoutes2.default);
	_groupRoutes2.default.use('/:groupId/student', _studentRoutes2.default);
	_groupRoutes2.default.use('/:groupId/parent', _parentRoutes2.default);

	app.get('/health', function (req, res) {
	  res.writeHead(200);
	  res.end();
	});

	app.set('ipaddress', _config2.default.get('ipaddress'));
	app.set('port', _config2.default.get('port'));

	mongoUtil.openConnection().then(function () {
	  var server = app.listen(app.get('port'), app.get('ipaddress'), function (err) {
	    if (err) {
	      console.log(err);
	    }
	    var host = server.address().address;
	    var port = server.address().port;
	    console.log('Example app listening at http://%s:%s', host, port);
	  });
	}, function () {
	  console.log('Error :: No DB connection open');
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("body-parser");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("util-mongodb");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("cors");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("express-fileupload");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("morgan");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router();
	/*eslint-enable */

	/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
	router.get('/', function (req, res) {
	  var decoded = req.decoded;

	  var id = decoded.role === 3 ? decoded._id : decoded.entityId;
	  var response = {
	    status: true,
	    role: decoded.role,
	    id: id
	  };
	  res.json(response);
	});

	exports.default = router;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _jsonwebtoken = __webpack_require__(9);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _config = __webpack_require__(10);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	router.use(function (req, res, next) {
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];
	  if (token) {
	    _jsonwebtoken2.default.verify(token, _config2.default.get('secureToken'), function (err, decoded) {
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });
	      }
	      // if everything is good, save to request for use in other routes
	      /*eslint-disable */
	      req.decoded = decoded;
	      /*eslint-enable */
	      next();
	      return null;
	    });
	  } else {
	    return res.status(403).send({
	      success: false,
	      message: 'No token provided.'
	    });
	  }
	  return null;
	});

	exports.default = router;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var convict = __webpack_require__(11);

	// Define a schema
	var config = convict({
	  env: {
	    doc: 'The applicaton environment.',
	    format: ['production', 'development', 'test'],
	    default: 'development',
	    env: 'NODE_ENV'
	  },
	  ipaddress: {
	    doc: 'The IP address to bind.',
	    format: 'ipaddress',
	    default: '127.0.0.1',
	    env: 'NODE_IP'
	  },
	  port: {
	    doc: 'The port to bind.',
	    format: 'port',
	    default: 3000,
	    env: 'NODE_PORT'
	  },
	  db: {
	    url: {
	      doc: 'Database hostname',
	      format: String,
	      default: 'mongodb://localhost:27017/kolbe',
	      env: 'DB_URL'
	    }
	  },
	  loggly: {
	    token: {
	      doc: 'Loggly token',
	      format: String,
	      default: '',
	      env: 'LOGGLY_TOKEN'
	    },
	    subdomain: {
	      doc: 'Loggly subdomain',
	      format: String,
	      default: '',
	      env: 'LOGGLY_SUBDOMIAN'
	    },
	    username: {
	      doc: 'Loggly username',
	      format: String,
	      default: '',
	      env: 'LOGGLY_USERNAME'
	    },
	    password: {
	      doc: 'Loggly password',
	      format: String,
	      default: '',
	      env: 'LOGGLY_PASSWORD'
	    }
	  },
	  alchemy: {
	    apiUrl: {
	      doc: 'Alchemy API URL',
	      format: String,
	      default: '',
	      env: 'ALCHEMY_API_URL'
	    },
	    token: {
	      doc: 'Alchemy token',
	      format: String,
	      default: '',
	      env: 'ALCHEMY_TOKEN'
	    }
	  },
	  secureToken: {
	    doc: 'Our token',
	    format: String,
	    default: 'MINT_TOKEN',
	    env: 'MINT_TOKEN'
	  },
	  dataFolder: {
	    doc: 'Files',
	    format: String,
	    default: process.env.PWD + '/data',
	    env: 'OPENSHIFT_DATA_DIR'
	  }
	});

	// Perform validation
	config.validate({ strict: true });

	module.exports = config;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = require("convict");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _schoolController = __webpack_require__(13);

	var _schoolController2 = _interopRequireDefault(_schoolController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router();
	/*eslint-enable */
	var controller = new _schoolController2.default();
	var identiyId = 'schoolId';

	router.get('/', function (req, res) {
	  controller.list().then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.get('/:' + identiyId, function (req, res) {
	  controller.get(req.params.schoolId).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.post('/', function (req, res) {
	  controller.save(req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.put('/:' + identiyId, function (req, res) {
	  controller.update(req.params.locationId, req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.delete('/:' + identiyId, function (req, res) {
	  controller.delete(req.params.locationId, req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	exports.default = router;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */


	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LocationController = function () {
	  function LocationController() {
	    _classCallCheck(this, LocationController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'school';
	  }

	  _createClass(LocationController, [{
	    key: 'list',
	    value: function list() {
	      var filter = {
	        status: true
	      };
	      var options = {
	        sort: 'weight'
	      };
	      return this.mongoUtil.find(this.collectionName, filter, options);
	    }
	  }, {
	    key: 'get',
	    value: function get(locationId) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(locationId),
	        status: true
	      };
	      return this.mongoUtil.findOne(this.collectionName, filter);
	    }
	  }, {
	    key: 'save',
	    value: function save(data) {
	      var newData = _lodash2.default.assign({}, data, {
	        created: new Date(),
	        status: true
	      });
	      return this.mongoUtil.insert(this.collectionName, newData);
	    }
	  }, {
	    key: 'update',
	    value: function update(locationId, data) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(locationId)
	      };
	      var newData = _lodash2.default.assign({}, data, {
	        updated: new Date()
	      });
	      return this.mongoUtil.update(this.collectionName, newData, filter);
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(locationId) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(locationId)
	      };
	      var newData = _lodash2.default.assign({}, {
	        deleted: new Date(),
	        status: false
	      });
	      return this.mongoUtil.update(this.collectionName, newData, filter);
	    }
	  }]);

	  return LocationController;
	}();

	exports.default = LocationController;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = require("lodash");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _locationController = __webpack_require__(16);

	var _locationController2 = _interopRequireDefault(_locationController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router();
	/*eslint-enable */
	var controller = new _locationController2.default();
	var identiyId = 'locationId';

	router.get('/', function (req, res) {
	  controller.list().then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.get('/:' + identiyId, function (req, res) {
	  controller.get(req.params.locationId).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.post('/', function (req, res) {
	  controller.save(req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.put('/:' + identiyId, function (req, res) {
	  controller.update(req.params.locationId, req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.delete('/:' + identiyId, function (req, res) {
	  controller.delete(req.params.locationId, req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	exports.default = router;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */


	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LocationController = function () {
	  function LocationController() {
	    _classCallCheck(this, LocationController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'location';
	  }

	  _createClass(LocationController, [{
	    key: 'list',
	    value: function list() {
	      var filter = {
	        status: true
	      };
	      var options = {
	        sort: 'weight'
	      };
	      return this.mongoUtil.find(this.collectionName, filter, options);
	    }
	  }, {
	    key: 'get',
	    value: function get(locationId) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(locationId),
	        status: true
	      };
	      return this.mongoUtil.findOne(this.collectionName, filter);
	    }
	  }, {
	    key: 'save',
	    value: function save(data) {
	      var newData = _lodash2.default.assign({}, data, {
	        created: new Date(),
	        status: true
	      });
	      return this.mongoUtil.insert(this.collectionName, newData);
	    }
	  }, {
	    key: 'update',
	    value: function update(locationId, data) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(locationId)
	      };
	      var newData = _lodash2.default.assign({}, data, {
	        updated: new Date()
	      });
	      return this.mongoUtil.update(this.collectionName, newData, filter);
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(locationId) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(locationId)
	      };
	      var newData = _lodash2.default.assign({}, {
	        deleted: new Date(),
	        status: false
	      });
	      return this.mongoUtil.update(this.collectionName, newData, filter);
	    }
	  }]);

	  return LocationController;
	}();

	exports.default = LocationController;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _levelController = __webpack_require__(18);

	var _levelController2 = _interopRequireDefault(_levelController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _levelController2.default();
	var parentId = 'locationId';
	var identiyId = 'levelId';

	router.get('/', function (req, res) {
	  controller.list(req.params[parentId]).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.get('/:' + identiyId, function (req, res) {
	  controller.get(req.params[identiyId]).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.post('/', function (req, res) {
	  controller.save(req.params[parentId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.put('/:' + identiyId, function (req, res) {
	  controller.update(req.params[identiyId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.delete('/:' + identiyId, function (req, res) {
	  controller.delete(req.params[identiyId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	exports.default = router;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LevelController = function () {
	  function LevelController() {
	    _classCallCheck(this, LevelController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'level';
	  }

	  _createClass(LevelController, [{
	    key: 'list',
	    value: function list(parentId) {
	      var _this = this;

	      var filter = {
	        status: true,
	        parentId: parentId
	      };
	      var options = {
	        sort: 'weight'
	      };
	      return new Promise(function (resolve, reject) {
	        _this.mongoUtil.find(_this.collectionName, filter, options).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'get',
	    value: function get(levelId) {
	      var _this2 = this;

	      var filter = {
	        _id: this.mongoUtil.getObjectID(levelId),
	        status: true
	      };
	      return new Promise(function (resolve, reject) {
	        _this2.mongoUtil.findOne(_this2.collectionName, filter).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'save',
	    value: function save(parentId, data) {
	      var _this3 = this;

	      var newData = _lodash2.default.assign({}, data, {
	        parentId: parentId,
	        status: true,
	        created: new Date()
	      });
	      return new Promise(function (resolve, reject) {
	        _this3.mongoUtil.insert(_this3.collectionName, newData).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update(levelId, data) {
	      var _this4 = this;

	      var filter = {
	        _id: this.mongoUtil.getObjectID(levelId)
	      };
	      var newData = _lodash2.default.assign({}, data, {
	        updated: new Date()
	      });
	      return new Promise(function (resolve, reject) {
	        _this4.mongoUtil.update(_this4.collectionName, newData, filter).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(levelId) {
	      var _this5 = this;

	      return new Promise(function (resolve, reject) {
	        var filter = {
	          _id: _this5.mongoUtil.getObjectID(levelId)
	        };
	        var newData = _lodash2.default.assign({}, {
	          deleted: new Date(),
	          status: false
	        });
	        _this5.mongoUtil.update(_this5.collectionName, newData, filter).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }]);

	  return LevelController;
	}();

	exports.default = LevelController;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _gradeController = __webpack_require__(20);

	var _gradeController2 = _interopRequireDefault(_gradeController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _gradeController2.default();
	var parentId = 'levelId';
	var identiyId = 'gradeId';

	router.get('/', function (req, res) {
	  controller.list(req.params[parentId]).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.get('/:' + identiyId, function (req, res) {
	  controller.get(req.params[identiyId]).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.post('/', function (req, res) {
	  controller.save(req.params[parentId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.put('/:' + identiyId, function (req, res) {
	  controller.update(req.params[identiyId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.delete('/:' + identiyId, function (req, res) {
	  controller.delete(req.params[identiyId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	exports.default = router;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GradeController = function () {
	  function GradeController() {
	    _classCallCheck(this, GradeController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'grade';
	  }

	  _createClass(GradeController, [{
	    key: 'list',
	    value: function list(parentId) {
	      var _this = this;

	      var filter = {
	        status: true,
	        parentId: parentId
	      };
	      var options = {
	        sort: 'weight'
	      };
	      return new Promise(function (resolve, reject) {
	        _this.mongoUtil.find(_this.collectionName, filter, options).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'get',
	    value: function get(identityId) {
	      var _this2 = this;

	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId),
	        status: true
	      };
	      return new Promise(function (resolve, reject) {
	        _this2.mongoUtil.findOne(_this2.collectionName, filter).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'save',
	    value: function save(parentId, data) {
	      var _this3 = this;

	      var newData = _lodash2.default.assign({}, data, {
	        parentId: parentId,
	        status: true,
	        created: new Date()
	      });
	      return new Promise(function (resolve, reject) {
	        _this3.mongoUtil.insert(_this3.collectionName, newData).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update(identityId, data) {
	      var _this4 = this;

	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId)
	      };
	      var newData = _lodash2.default.assign({}, data, {
	        updated: new Date()
	      });
	      return new Promise(function (resolve, reject) {
	        _this4.mongoUtil.update(_this4.collectionName, newData, filter).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(identityId) {
	      var _this5 = this;

	      return new Promise(function (resolve, reject) {
	        var filter = {
	          _id: _this5.mongoUtil.getObjectID(identityId)
	        };
	        var newData = _lodash2.default.assign({}, {
	          deleted: new Date(),
	          status: false
	        });
	        _this5.mongoUtil.update(_this5.collectionName, newData, filter).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }]);

	  return GradeController;
	}();

	exports.default = GradeController;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _groupController = __webpack_require__(22);

	var _groupController2 = _interopRequireDefault(_groupController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _groupController2.default();
	var parentId = 'gradeId';
	var identiyId = 'groupId';

	router.get('/', function (req, res) {
	  controller.list(req.params[parentId]).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.get('/:' + identiyId, function (req, res) {
	  controller.get(req.params[identiyId]).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.post('/', function (req, res) {
	  controller.save(req.params[parentId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.put('/:' + identiyId, function (req, res) {
	  controller.update(req.params[identiyId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.delete('/:' + identiyId, function (req, res) {
	  controller.delete(req.params[identiyId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.post('/:' + identiyId + '/upload', function (req, res) {
	  controller.upload(req.params[identiyId], req.files.data).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	exports.default = router;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */


	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _xlsxUtil = __webpack_require__(23);

	var _xlsxUtil2 = _interopRequireDefault(_xlsxUtil);

	var _groupUploadUtil = __webpack_require__(25);

	var _groupUploadUtil2 = _interopRequireDefault(_groupUploadUtil);

	var _userController = __webpack_require__(26);

	var _userController2 = _interopRequireDefault(_userController);

	var _groupParentController = __webpack_require__(27);

	var _groupParentController2 = _interopRequireDefault(_groupParentController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupController = function () {
	  function GroupController() {
	    _classCallCheck(this, GroupController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'group';
	    this.groupUploadUtil = new _groupUploadUtil2.default();
	    this.userController = new _userController2.default();
	    this.groupParentController = new _groupParentController2.default();
	  }

	  _createClass(GroupController, [{
	    key: 'list',
	    value: function list(parentId) {
	      var _this = this;

	      var filter = {
	        status: true,
	        parentId: parentId
	      };
	      var options = {
	        sort: 'weight'
	      };
	      return new Promise(function (resolve, reject) {
	        _this.mongoUtil.find(_this.collectionName, filter, options).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'get',
	    value: function get(identityId) {
	      var _this2 = this;

	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId),
	        status: true
	      };
	      return new Promise(function (resolve, reject) {
	        _this2.mongoUtil.findOne(_this2.collectionName, filter).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'save',
	    value: function save(parentId, data) {
	      var _this3 = this;

	      var newData = _lodash2.default.assign({}, data, {
	        parentId: parentId,
	        status: true,
	        created: new Date()
	      });
	      return new Promise(function (resolve, reject) {
	        _this3.mongoUtil.insert(_this3.collectionName, newData).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update(identityId, data) {
	      var _this4 = this;

	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId)
	      };
	      var newData = _lodash2.default.assign({}, data, {
	        updated: new Date()
	      });
	      return new Promise(function (resolve, reject) {
	        _this4.mongoUtil.update(_this4.collectionName, newData, filter).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(identityId) {
	      var _this5 = this;

	      return new Promise(function (resolve, reject) {
	        var filter = {
	          _id: _this5.mongoUtil.getObjectID(identityId)
	        };
	        var newData = _lodash2.default.assign({}, {
	          deleted: new Date(),
	          status: false
	        });
	        _this5.mongoUtil.update(_this5.collectionName, newData, filter).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'upload',
	    value: function upload(groupId, file) {
	      var _this6 = this;

	      var dataFromFile = _xlsxUtil2.default.parseBufferToJson(file.data).pop();
	      if (_lodash2.default.isArray(dataFromFile.data) && dataFromFile.data.length) {
	        var userByCode = this.dedupUsers(dataFromFile.data);
	        var promises = [];

	        _lodash2.default.forIn(userByCode, function (item) {
	          if (item.user && item.user.username && item.user.password) {
	            _this6.userController.upload(item.user).then(function (userId) {
	              return promises.push(_this6.groupParentController.upload(groupId, userId));
	            });
	          }
	        });

	        return Promise.all(promises).then(function () {
	          return Promise.resolve('saved');
	        });
	      }
	      return Promise.reject('wrong file data');
	    }
	  }, {
	    key: 'dedupUsers',
	    value: function dedupUsers(data) {
	      var _this7 = this;

	      var userByCode = {};
	      data.forEach(function (item, index) {
	        if (index === 0) {
	          _this7.groupUploadUtil.setColumns(item);
	        } else {
	          var _groupUploadUtil$getE = _this7.groupUploadUtil.getEntities(item),
	              user = _groupUploadUtil$getE.user;

	          if (!userByCode[user.password]) {
	            userByCode[user.password] = {
	              user: user
	            };
	          }
	        }
	      });
	      return userByCode;
	    }
	  }]);

	  return GroupController;
	}();

	exports.default = GroupController;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _nodeXlsx = __webpack_require__(24);

	var _nodeXlsx2 = _interopRequireDefault(_nodeXlsx);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var XlsxUtil = function () {
	  function XlsxUtil() {
	    _classCallCheck(this, XlsxUtil);
	  }

	  _createClass(XlsxUtil, null, [{
	    key: 'parseBufferToJson',
	    value: function parseBufferToJson(buffer) {
	      return _nodeXlsx2.default.parse(buffer);
	    }
	  }]);

	  return XlsxUtil;
	}();

	exports.default = XlsxUtil;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	module.exports = require("node-xlsx");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint max-len: [2, 500, 4] */


	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _userController = __webpack_require__(26);

	var _userController2 = _interopRequireDefault(_userController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupUploadUtil = function () {
	  function GroupUploadUtil() {
	    _classCallCheck(this, GroupUploadUtil);

	    this.columns = {
	      group: {
	        header: 'MH_GRUPO',
	        index: null
	      },
	      lastname: {
	        header: 'MH_APT_ALU',
	        index: null
	      },
	      lastname2: {
	        header: 'MH_AMT_ALU',
	        index: null
	      },
	      name: {
	        header: 'MH_NOM_ALU',
	        index: null
	      },
	      studentCode: {
	        header: 'MH_COD_ALU',
	        index: null
	      },
	      dob: {
	        header: 'MH_FEC_NAC',
	        index: null
	      },
	      registrationDate: {
	        header: 'MH_FEC_ALT',
	        index: null
	      },
	      familyCode: {
	        header: 'MH_COD_FAM',
	        index: null
	      },
	      email: {
	        header: 'CORREO ELECTRONICO',
	        index: null
	      }
	    };
	  }

	  _createClass(GroupUploadUtil, [{
	    key: 'setColumns',
	    value: function setColumns(row) {
	      if (!_lodash2.default.isArray(row) || !row.length) {
	        return false;
	      }
	      var rowUpperCase = row.map(function (item) {
	        return item.toUpperCase();
	      });
	      var column = null;
	      for (column in this.columns) {
	        var index = rowUpperCase.indexOf(this.columns[column].header.toUpperCase());
	        if (index !== -1) {
	          this.columns[column].index = index;
	        }
	      }
	    }
	  }, {
	    key: 'getEntities',
	    value: function getEntities(row) {
	      return {
	        group: this.getGroup(row),
	        student: this.getStudent(row),
	        user: this.getUser(row)
	      };
	    }
	  }, {
	    key: 'getGroup',
	    value: function getGroup(data) {
	      var bits = data[this.columns.group.index].split('');
	      return {
	        level: bits[0] || null,
	        grade: bits[1] || null,
	        group: bits[2] || null
	      };
	    }
	  }, {
	    key: 'getStudent',
	    value: function getStudent(data) {
	      return {
	        lastname: data[this.columns.lastname.index],
	        lastname2: data[this.columns.lastname2.index],
	        name: data[this.columns.name.index],
	        code: '' + data[this.columns.studentCode.index],
	        dob: this.getJsDateFromExcel(data[this.columns.dob.index]),
	        registrationDate: this.getDate(data[this.columns.registrationDate.index])
	      };
	    }
	  }, {
	    key: 'getUser',
	    value: function getUser(data) {
	      return {
	        password: '' + data[this.columns.familyCode.index],
	        code: '' + data[this.columns.familyCode.index],
	        username: data[this.columns.email.index],
	        role: _userController2.default.getRole('parent')
	      };
	    }
	  }, {
	    key: 'getJsDateFromExcel',
	    value: function getJsDateFromExcel(excelDate) {
	      // https://gist.github.com/christopherscott/2782634
	      var date = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
	      var bits = date.toJSON().split('T')[0].split('-');
	      return new Date(bits[1] + '-' + bits[2] + '-' + bits[0]) || excelDate;
	    }
	  }, {
	    key: 'getDate',
	    value: function getDate(data) {
	      var bits = data.split('');
	      return new Date('' + bits[2] + bits[3] + '-' + bits[0] + bits[1] + '-20' + bits[4] + bits[5]) || data;
	    }
	  }]);

	  return GroupUploadUtil;
	}();

	exports.default = GroupUploadUtil;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */


	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserController = function () {
	  function UserController() {
	    _classCallCheck(this, UserController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'user';
	  }

	  _createClass(UserController, [{
	    key: 'get',
	    value: function get(identityId) {
	      if (!identityId) {
	        return null;
	      }
	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId),
	        status: true
	      };
	      return this.mongoUtil.findOne(this.collectionName, filter);
	    }
	  }, {
	    key: 'save',
	    value: function save(data) {
	      if (!data) {
	        return null;
	      }
	      var newData = _lodash2.default.assign({}, data, {
	        status: true,
	        created: new Date()
	      });
	      return this.mongoUtil.insert(this.collectionName, newData);
	    }
	  }, {
	    key: 'update',
	    value: function update(identityId, data) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId)
	      };
	      var newData = _lodash2.default.assign({}, data, {
	        updated: new Date()
	      });
	      return this.mongoUtil.update(this.collectionName, newData, filter);
	    }
	  }, {
	    key: 'upload',
	    value: function upload(data) {
	      var _this = this;

	      return this.findByUsername(data).then(function (results) {
	        return _this.upsert(results, data);
	      }).then(function (results) {
	        return _this.extractId(results);
	      });
	    }
	  }, {
	    key: 'findByUsername',
	    value: function findByUsername(data) {
	      var filter = {
	        username: data.username
	      };
	      return this.mongoUtil.findOne(this.collectionName, filter);
	    }
	  }, {
	    key: 'upsert',
	    value: function upsert(entity, data) {
	      if (entity) {
	        var newData = _lodash2.default.assign({}, entity, data, {
	          status: true,
	          deleted: null
	        });
	        return this.update(entity._id, newData);
	      }
	      return this.save(data);
	    }
	  }, {
	    key: 'extractId',
	    value: function extractId(data) {
	      return data.filter ? data.filter._id : data.data.insertedIds[0];
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(identityId) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId)
	      };
	      var newData = _lodash2.default.assign({}, {
	        deleted: new Date(),
	        status: false
	      });
	      return this.mongoUtil.update(this.collectionName, newData, filter);
	    }
	  }], [{
	    key: 'getRole',
	    value: function getRole(entity) {
	      var key = entity ? entity.toUpperCase() : '';
	      var roles = {
	        ADMIN: 0,
	        DIRECTOR: 1,
	        PROFESSOR: 2,
	        PARENT: 3
	      };
	      return roles[key] || null;
	    }
	  }]);

	  return UserController;
	}();

	exports.default = UserController;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */


	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _userController = __webpack_require__(26);

	var _userController2 = _interopRequireDefault(_userController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupParentController = function () {
	  function GroupParentController() {
	    _classCallCheck(this, GroupParentController);

	    this.collectionName = 'groupParent';
	    this.mongoUtil = new _utilMongodb2.default();
	    this.userController = new _userController2.default();
	  }

	  _createClass(GroupParentController, [{
	    key: 'list',
	    value: function list(groupId) {
	      var _this = this;

	      if (!groupId) {
	        return null;
	      }
	      var filter = {
	        status: true,
	        groupId: this.mongoUtil.getObjectID(groupId)
	      };
	      return this.mongoUtil.find(this.collectionName, filter, {}).then(function (results) {
	        return Promise.all(results.map(function (item) {
	          return _this.userController.get(item.parentId);
	        }));
	      });
	    }
	  }, {
	    key: 'save',
	    value: function save(groupId, parentId) {
	      if (!groupId || !parentId) {
	        return null;
	      }
	      var newData = _lodash2.default.assign({}, {
	        status: true,
	        created: new Date(),
	        groupId: this.mongoUtil.getObjectID(groupId),
	        parentId: parentId
	      });
	      return this.mongoUtil.insert(this.collectionName, newData);
	    }
	  }, {
	    key: 'update',
	    value: function update(identityId, data) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId)
	      };
	      var newData = _lodash2.default.assign({}, data, {
	        updated: new Date()
	      });
	      return this.mongoUtil.update(this.collectionName, newData, filter);
	    }
	  }, {
	    key: 'upload',
	    value: function upload(groupId, parentId) {
	      var _this2 = this;

	      var filter = {
	        groupId: groupId,
	        parentId: parentId
	      };
	      return this.mongoUtil.findOne(this.collectionName, filter).then(function (results) {
	        return _this2.upsert(results, groupId, parentId);
	      });
	    }
	  }, {
	    key: 'upsert',
	    value: function upsert(entity, groupId, parentId) {
	      if (entity) {
	        var newData = _lodash2.default.assign({}, entity, {
	          status: true,
	          deleted: null
	        });
	        return this.update(entity._id, newData);
	      }
	      return this.save(groupId, parentId);
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(groupId, parentId) {
	      var _this3 = this;

	      var filter = {
	        groupId: this.mongoUtil.getObjectID(groupId),
	        parentId: this.mongoUtil.getObjectID(parentId),
	        status: true
	      };
	      var newData = _lodash2.default.assign({}, {
	        deleted: new Date(),
	        status: false
	      });
	      return this.mongoUtil.update(this.collectionName, newData, filter).then(function () {
	        return _this3.isParentActive(parentId);
	      }).then(function (results) {
	        return _this3.disableParent(results, parentId);
	      });
	    }
	  }, {
	    key: 'isParentActive',
	    value: function isParentActive(parentId) {
	      var filter = {
	        parentId: this.mongoUtil.getObjectID(parentId),
	        status: true
	      };
	      return this.mongoUtil.find(this.collectionName, filter);
	    }
	  }, {
	    key: 'disableParent',
	    value: function disableParent(results, parentId) {
	      if (!results) {
	        return this.userController.delete(parentId);
	      }
	      return null;
	    }
	  }]);

	  return GroupParentController;
	}();

	exports.default = GroupParentController;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _studentController = __webpack_require__(29);

	var _studentController2 = _interopRequireDefault(_studentController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _studentController2.default();
	var parentId = 'groupId';
	var identiyId = 'studentId';

	router.get('/', function (req, res) {
	  controller.list(req.params[parentId]).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.get('/:' + identiyId, function (req, res) {
	  controller.get(req.params[identiyId]).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.post('/', function (req, res) {
	  controller.save(req.params[parentId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.put('/:' + identiyId, function (req, res) {
	  controller.update(req.params[identiyId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.delete('/:' + identiyId, function (req, res) {
	  controller.delete(req.params[identiyId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	exports.default = router;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */


	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StudentController = function () {
	  function StudentController() {
	    _classCallCheck(this, StudentController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'student';
	  }

	  _createClass(StudentController, [{
	    key: 'list',
	    value: function list(groupId) {
	      var filter = {
	        status: true,
	        group: { $in: [groupId] }
	      };
	      return this.mongoUtil.find('student', filter, {});
	    }
	  }, {
	    key: 'get',
	    value: function get(identityId) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId),
	        status: true
	      };
	      return this.mongoUtil.findOne(this.collectionName, filter);
	    }
	  }, {
	    key: 'save',
	    value: function save(data) {
	      if (!data) {
	        return null;
	      }
	      var newData = _lodash2.default.assign({}, data, {
	        status: true,
	        created: new Date()
	      });
	      return this.mongoUtil.insert(this.collectionName, newData);
	    }
	  }, {
	    key: 'update',
	    value: function update(identityId, data) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId)
	      };
	      var newData = _lodash2.default.assign({}, data, {
	        updated: new Date()
	      });
	      return this.mongoUtil.update(this.collectionName, newData, filter);
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(identityId) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId)
	      };
	      var newData = _lodash2.default.assign({}, {
	        deleted: new Date(),
	        status: false
	      });
	      return this.mongoUtil.update(this.collectionName, newData, filter);
	    }
	  }, {
	    key: 'upload',
	    value: function upload(data) {
	      var _this = this;

	      return this.findByCode(data).then(function (results) {
	        return _this.upsert(results, data);
	      }).then(this.extractId);
	    }
	  }, {
	    key: 'findByCode',
	    value: function findByCode(data) {
	      var filter = {
	        code: data.code
	      };
	      return this.mongoUtil.findOne(this.collectionName, filter);
	    }
	  }, {
	    key: 'upsert',
	    value: function upsert(entity, data) {
	      if (entity) {
	        var newData = _lodash2.default.assign({}, data);
	        newData.status = true;
	        return this.update(entity._id, newData);
	      }
	      return this.save(data);
	    }
	  }, {
	    key: 'extractId',
	    value: function extractId(data) {
	      return data.filter ? data.filter._id : data.data.insertedIds[0];
	    }
	  }]);

	  return StudentController;
	}();

	exports.default = StudentController;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _groupStudentController = __webpack_require__(31);

	var _groupStudentController2 = _interopRequireDefault(_groupStudentController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _groupStudentController2.default();
	var identiyId = 'groupId';

	router.get('/', function (req, res) {
	  controller.getStudents(req.params[identiyId]).then(function (data) {
	    return res.json({ status: true, data: data });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	exports.default = router;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint max-len: [2, 500, 4] */
	/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */


	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _studentController = __webpack_require__(29);

	var _studentController2 = _interopRequireDefault(_studentController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupStudentController = function () {
	  function GroupStudentController() {
	    _classCallCheck(this, GroupStudentController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'groupStudent';
	    this.studentController = new _studentController2.default();
	  }

	  _createClass(GroupStudentController, [{
	    key: 'list',
	    value: function list(groupId) {
	      var filter = {
	        status: true,
	        groupId: groupId
	      };
	      return this.mongoUtil.find(this.collectionName, filter, {});
	    }
	  }, {
	    key: 'getStudents',
	    value: function getStudents(groupId) {
	      var _this = this;

	      return this.list(groupId).then(function (data) {
	        return Promise.all(data.map(function (item) {
	          return _this.studentController.get(item.studentId);
	        }));
	      });
	    }
	  }, {
	    key: 'save',
	    value: function save(groupId, studentId) {
	      if (!groupId || !studentId) {
	        return null;
	      }
	      var newData = _lodash2.default.assign({}, {
	        status: true,
	        created: new Date(),
	        groupId: groupId,
	        studentId: studentId
	      });
	      return this.mongoUtil.insert(this.collectionName, newData);
	    }
	  }, {
	    key: 'update',
	    value: function update(identityId, data) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId)
	      };
	      var newData = _lodash2.default.assign({}, data, {
	        updated: new Date()
	      });
	      return this.mongoUtil.update(this.collectionName, newData, filter);
	    }
	  }, {
	    key: 'upload',
	    value: function upload(groupId, studentId) {
	      var _this2 = this;

	      var filter = {
	        groupId: groupId,
	        studentId: studentId
	      };
	      return this.mongoUtil.findOne(this.collectionName, filter).then(function (results) {
	        return _this2.upsert(results, groupId, studentId);
	      });
	    }
	  }, {
	    key: 'upsert',
	    value: function upsert(entity, groupId, studentId) {
	      if (entity) {
	        var newData = _lodash2.default.assign({}, entity);
	        newData.status = true;
	        return this.update(entity._id, newData);
	      }
	      return this.save(groupId, studentId);
	    }
	  }, {
	    key: 'deleteStudents',
	    value: function deleteStudents(students) {
	      var _this3 = this;

	      var promises = students.map(function (item) {
	        var filter = {
	          studentId: item.studentId
	        };
	        var newData = _lodash2.default.assign({}, {
	          deleted: new Date(),
	          status: false
	        });
	        return Promise.all([_this3.mongoUtil.update(_this3.collectionName, newData, filter), _this3.studentController.delete(item.studentId.toString())]);
	      });
	      return Promise.all(promises);
	    }
	  }, {
	    key: 'getGroupsFromStudent',
	    value: function getGroupsFromStudent(data) {
	      var _this4 = this;

	      if (!_lodash2.default.isArray(data) || !data.length) {
	        return null;
	      }
	      var promises = data.map(function (item) {
	        var filter = {
	          status: true,
	          studentId: item.studentId
	        };
	        return _this4.mongoUtil.findOne(_this4.collectionName, filter);
	      });
	      return Promise.all(promises).then(function (groupStudent) {
	        return groupStudent.filter(function (student, index, self) {
	          return self.findIndex(function (item) {
	            return item.groupId.toString() === student.groupId.toString();
	          }) === index;
	        });
	      });
	    }
	  }]);

	  return GroupStudentController;
	}();

	exports.default = GroupStudentController;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _parentStudentController = __webpack_require__(33);

	var _parentStudentController2 = _interopRequireDefault(_parentStudentController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _parentStudentController2.default();
	var identiyId = 'parentId';

	router.get('/', function (req, res) {
	  controller.list(req.params[identiyId]).then(function (data) {
	    return res.json({ status: true, data: data });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	exports.default = router;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */


	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _studentController = __webpack_require__(29);

	var _studentController2 = _interopRequireDefault(_studentController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ParentStudentController = function () {
	  function ParentStudentController() {
	    _classCallCheck(this, ParentStudentController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'parentStudent';
	    this.studentController = new _studentController2.default();
	  }

	  _createClass(ParentStudentController, [{
	    key: 'list',
	    value: function list(parentId) {
	      var _this = this;

	      var filter = {
	        status: true,
	        parentId: this.mongoUtil.getObjectID(parentId)
	      };
	      return this.mongoUtil.find(this.collectionName, filter, {}).then(function (data) {
	        return Promise.all(data.map(function (item) {
	          return _this.studentController.get(item.studentId);
	        }));
	      });
	    }
	  }, {
	    key: 'get',
	    value: function get(parentId) {
	      var filter = {
	        status: true,
	        parentId: this.mongoUtil.getObjectID(parentId)
	      };
	      return this.mongoUtil.find(this.collectionName, filter, {});
	    }
	  }, {
	    key: 'save',
	    value: function save(parentId, studentId) {
	      if (!parentId || !studentId) {
	        return null;
	      }
	      var newData = _lodash2.default.assign({}, {
	        status: true,
	        created: new Date(),
	        parentId: parentId,
	        studentId: studentId
	      });
	      return this.mongoUtil.insert(this.collectionName, newData);
	    }
	  }, {
	    key: 'update',
	    value: function update(identityId, data) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId)
	      };
	      var newData = _lodash2.default.assign({}, data, {
	        updated: new Date()
	      });
	      return this.mongoUtil.update(this.collectionName, newData, filter);
	    }
	  }, {
	    key: 'upload',
	    value: function upload(parentId, studentId) {
	      var _this2 = this;

	      var filter = {
	        parentId: parentId,
	        studentId: studentId
	      };
	      return this.mongoUtil.findOne(this.collectionName, filter).then(function (results) {
	        return _this2.upsert(results, parentId, studentId);
	      });
	    }
	  }, {
	    key: 'upsert',
	    value: function upsert(entity, parentId, studentId) {
	      if (entity) {
	        var newData = _lodash2.default.assign({}, entity);
	        newData.status = true;
	        return this.update(entity._id, newData);
	      }
	      return this.save(parentId, studentId);
	    }
	  }, {
	    key: 'getParentsFromStudents',
	    value: function getParentsFromStudents(data) {
	      var _this3 = this;

	      if (!_lodash2.default.isArray(data) || !data.length) {
	        return null;
	      }
	      var promises = data.map(function (item) {
	        var filter = {
	          status: true,
	          studentId: item.studentId
	        };
	        return _this3.mongoUtil.findOne(_this3.collectionName, filter);
	      });
	      return Promise.all(promises);
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(parentId) {
	      var filter = {
	        status: true,
	        parentId: this.mongoUtil.getObjectID(parentId)
	      };
	      var newData = _lodash2.default.assign({}, {
	        deleted: new Date(),
	        status: false
	      });
	      return this.mongoUtil.update(this.collectionName, newData, filter);
	    }
	  }]);

	  return ParentStudentController;
	}();

	exports.default = ParentStudentController;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _parentGroupController = __webpack_require__(35);

	var _parentGroupController2 = _interopRequireDefault(_parentGroupController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _parentGroupController2.default();
	var identiyId = 'parentId';

	router.get('/', function (req, res) {
	  controller.list(req.params[identiyId]).then(function (data) {
	    return res.json({ status: true, data: data });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	exports.default = router;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ParentController = function () {
	  function ParentController() {
	    _classCallCheck(this, ParentController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'groupParent';
	  }

	  _createClass(ParentController, [{
	    key: 'list',
	    value: function list(parentId) {
	      var filter = {
	        status: true,
	        parentId: this.mongoUtil.getObjectID(parentId)
	      };
	      return this.mongoUtil.find(this.collectionName, filter, {});
	    }
	  }]);

	  return ParentController;
	}();

	exports.default = ParentController;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _newsletterController = __webpack_require__(37);

	var _newsletterController2 = _interopRequireDefault(_newsletterController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _newsletterController2.default();
	var identiyId = 'newsletterId';

	router.get('/', function (req, res) {
	  controller.list(req.params).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.get('/:' + identiyId, function (req, res) {
	  controller.get(req.params[identiyId]).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.post('/', function (req, res) {
	  controller.save(req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.put('/:' + identiyId, function (req, res) {
	  controller.update(req.params[identiyId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.delete('/:' + identiyId, function (req, res) {
	  controller.delete(req.params[identiyId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	exports.default = router;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NewsletterController = function () {
	  function NewsletterController() {
	    _classCallCheck(this, NewsletterController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'newsletter';
	  }

	  _createClass(NewsletterController, [{
	    key: 'list',
	    value: function list(params) {
	      var _this = this;

	      var filter = {
	        status: true
	      };
	      if (params.groupId) {
	        filter.groupId = params.groupId;
	      }
	      return new Promise(function (resolve, reject) {
	        _this.mongoUtil.find(_this.collectionName, filter, {}).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'get',
	    value: function get(identityId) {
	      var _this2 = this;

	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId),
	        status: true
	      };
	      return new Promise(function (resolve, reject) {
	        _this2.mongoUtil.findOne(_this2.collectionName, filter).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'save',
	    value: function save(data) {
	      var _this3 = this;

	      var newData = _lodash2.default.assign({}, data, {
	        status: true,
	        created: new Date()
	      });
	      return new Promise(function (resolve, reject) {
	        _this3.mongoUtil.insert(_this3.collectionName, newData).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update(identityId, data) {
	      var _this4 = this;

	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId)
	      };
	      var newData = _lodash2.default.assign({}, data, {
	        updated: new Date()
	      });
	      return new Promise(function (resolve, reject) {
	        _this4.mongoUtil.update(_this4.collectionName, newData, filter).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(identityId) {
	      var _this5 = this;

	      return new Promise(function (resolve, reject) {
	        var filter = {
	          _id: _this5.mongoUtil.getObjectID(identityId)
	        };
	        var newData = _lodash2.default.assign({}, {
	          deleted: new Date(),
	          status: false
	        });
	        _this5.mongoUtil.update(_this5.collectionName, newData, filter).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }]);

	  return NewsletterController;
	}();

	exports.default = NewsletterController;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _documentController = __webpack_require__(39);

	var _documentController2 = _interopRequireDefault(_documentController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _documentController2.default();
	var identiyId = 'documentId';
	var parentId = 'groupId';

	router.get('/', function (req, res) {
	  controller.list(req.params).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.get('/:' + identiyId, function (req, res) {
	  controller.get(req.params[identiyId]).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.post('/', function (req, res) {
	  controller.save(req.params[parentId], req.body, req.files).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.put('/:' + identiyId, function (req, res) {
	  controller.update(req.params[identiyId], req.body, req.files).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.delete('/:' + identiyId, function (req, res) {
	  controller.delete(req.params[identiyId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	exports.default = router;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _fileUtil = __webpack_require__(40);

	var _fileUtil2 = _interopRequireDefault(_fileUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DocumentController = function () {
	  function DocumentController() {
	    _classCallCheck(this, DocumentController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'document';
	    this.fileUtil = new _fileUtil2.default();
	  }

	  _createClass(DocumentController, [{
	    key: 'list',
	    value: function list(params) {
	      var filter = {
	        status: true
	      };
	      if (params.groupId) {
	        filter.groupId = params.groupId;
	      }
	      return this.mongoUtil.find(this.collectionName, filter, {});
	    }
	  }, {
	    key: 'get',
	    value: function get(identityId) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId),
	        status: true
	      };
	      return this.mongoUtil.findOne(this.collectionName, filter);
	    }
	  }, {
	    key: 'save',
	    value: function save(groupId, data, files) {
	      var _this = this;

	      var newData = _lodash2.default.assign({}, JSON.parse(data.data), {
	        status: true,
	        created: new Date(),
	        groupId: groupId
	      });
	      return this.fileUtil.save(files.file).then(function (fileName) {
	        newData.realFile = fileName;
	        return _this.mongoUtil.insert(_this.collectionName, newData);
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update(identityId, data, files) {
	      var _this2 = this;

	      var promise = files && files.file ? this.fileUtil.save(files.file) : Promise.resolve();
	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId)
	      };
	      var newData = _lodash2.default.assign({}, JSON.parse(data.data), {
	        updated: new Date()
	      });
	      return promise.then(function (fileName) {
	        if (fileName) {
	          newData.realFile = fileName;
	        }
	        _this2.mongoUtil.update(_this2.collectionName, newData, filter);
	      });
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(identityId) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId)
	      };
	      var newData = _lodash2.default.assign({}, {
	        deleted: new Date(),
	        status: false
	      });
	      return this.mongoUtil.update(this.collectionName, newData, filter);
	    }
	  }]);

	  return DocumentController;
	}();

	exports.default = DocumentController;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _v = __webpack_require__(41);

	var _v2 = _interopRequireDefault(_v);

	var _config = __webpack_require__(10);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FileUtil = function () {
	  function FileUtil() {
	    _classCallCheck(this, FileUtil);
	  }

	  _createClass(FileUtil, [{
	    key: 'save',
	    value: function save(file) {
	      return new Promise(function (resolve, reject) {
	        if (!_lodash2.default.isEmpty(file)) {
	          var extension = file.name.split('.').pop();
	          var fileName = (0, _v2.default)() + '.' + extension;
	          file.mv(_config2.default.get('dataFolder') + '/' + fileName, function (err) {
	            if (err) {
	              reject(err);
	            } else {
	              resolve(fileName);
	            }
	          });
	        } else {
	          reject('no file');
	        }
	      });
	    }
	  }]);

	  return FileUtil;
	}();

	exports.default = FileUtil;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var rng = __webpack_require__(42);
	var bytesToUuid = __webpack_require__(44);

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};

	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; ++n) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : bytesToUuid(b);
	}

	module.exports = v1;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	// Unique ID creation requires a high quality random # generator.  In node.js
	// this is prett straight-forward - we use the crypto API.

	var rb = __webpack_require__(43).randomBytes;

	function rng() {
	  return rb(16);
	};

	module.exports = rng;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

	module.exports = require("crypto");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	/**
	 * Convert array of 16 byte values to UUID string format of the form:
	 * XXXXXXXX-XXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	 */
	var byteToHex = [];
	for (var i = 0; i < 256; ++i) {
	  byteToHex[i] = (i + 0x100).toString(16).substr(1);
	}

	function bytesToUuid(buf, offset) {
	  var i = offset || 0;
	  var bth = byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}

	module.exports = bytesToUuid;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _activityController = __webpack_require__(46);

	var _activityController2 = _interopRequireDefault(_activityController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _activityController2.default();
	var identiyId = 'activityId';

	router.get('/', function (req, res) {
	  controller.list(req.params).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.get('/:' + identiyId, function (req, res) {
	  controller.get(req.params[identiyId]).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.post('/', function (req, res) {
	  controller.save(req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.put('/:' + identiyId, function (req, res) {
	  controller.update(req.params[identiyId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.delete('/:' + identiyId, function (req, res) {
	  controller.delete(req.params[identiyId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	exports.default = router;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ActivityController = function () {
	  function ActivityController() {
	    _classCallCheck(this, ActivityController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'activity';
	  }

	  _createClass(ActivityController, [{
	    key: 'list',
	    value: function list(params) {
	      var _this = this;

	      var filter = {
	        status: true
	      };
	      if (params.groupId) {
	        filter.groupId = params.groupId;
	      }
	      return new Promise(function (resolve, reject) {
	        _this.mongoUtil.find(_this.collectionName, filter, {}).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'get',
	    value: function get(identityId) {
	      var _this2 = this;

	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId),
	        status: true
	      };
	      return new Promise(function (resolve, reject) {
	        _this2.mongoUtil.findOne(_this2.collectionName, filter).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'save',
	    value: function save(data) {
	      var _this3 = this;

	      var newData = _lodash2.default.assign({}, data, {
	        status: true,
	        created: new Date()
	      });
	      return new Promise(function (resolve, reject) {
	        _this3.mongoUtil.insert(_this3.collectionName, newData).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update(identityId, data) {
	      var _this4 = this;

	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId)
	      };
	      var newData = _lodash2.default.assign({}, data, {
	        updated: new Date()
	      });
	      return new Promise(function (resolve, reject) {
	        _this4.mongoUtil.update(_this4.collectionName, newData, filter).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(identityId) {
	      var _this5 = this;

	      return new Promise(function (resolve, reject) {
	        var filter = {
	          _id: _this5.mongoUtil.getObjectID(identityId)
	        };
	        var newData = _lodash2.default.assign({}, {
	          deleted: new Date(),
	          status: false
	        });
	        _this5.mongoUtil.update(_this5.collectionName, newData, filter).then(function (results) {
	          return resolve(results);
	        }).catch(function (err) {
	          return reject(err);
	        });
	      });
	    }
	  }]);

	  return ActivityController;
	}();

	exports.default = ActivityController;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _parentController = __webpack_require__(48);

	var _parentController2 = _interopRequireDefault(_parentController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _parentController2.default();
	var identiyId = 'parentId';

	router.get('/', function (req, res) {
	  controller.list(req.params).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.get('/:' + identiyId, function (req, res) {
	  controller.get(req.params[identiyId]).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.post('/', function (req, res) {
	  controller.save(req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.put('/:' + identiyId, function (req, res) {
	  controller.update(req.params[identiyId], req.body).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.delete('/:' + identiyId, function (req, res) {
	  controller.delete(req.params[identiyId]).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	exports.default = router;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint max-len: [2, 500, 4] */
	/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */


	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(14);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _groupStudentController = __webpack_require__(31);

	var _groupStudentController2 = _interopRequireDefault(_groupStudentController);

	var _parentStudentController = __webpack_require__(33);

	var _parentStudentController2 = _interopRequireDefault(_parentStudentController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ParentController = function () {
	  function ParentController() {
	    _classCallCheck(this, ParentController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'parent';
	    this.groupStudentController = new _groupStudentController2.default();
	    this.parentStudentController = new _parentStudentController2.default();
	  }

	  _createClass(ParentController, [{
	    key: 'list',
	    value: function list(params) {
	      var _this = this;

	      var filter = {
	        status: true
	      };
	      if (params.groupId) {
	        return this.groupStudentController.list(params.groupId).then(function (students) {
	          return _this.parentStudentController.getParentsFromStudents(students);
	        }).then(function (parents) {
	          var filterParents = parents.filter(function (parent, index, self) {
	            return self.findIndex(function (item) {
	              return item.parentId.toString() === parent.parentId.toString();
	            }) === index;
	          });
	          return Promise.all(filterParents.map(function (item) {
	            return _this.get(item.parentId);
	          }));
	        });
	      }
	      return this.mongoUtil.find(this.collectionName, filter, {});
	    }
	  }, {
	    key: 'get',
	    value: function get(identityId) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId),
	        status: true
	      };
	      return this.mongoUtil.findOne(this.collectionName, filter);
	    }
	  }, {
	    key: 'save',
	    value: function save(data) {
	      if (!data) {
	        return null;
	      }
	      var newData = _lodash2.default.assign({}, data, {
	        status: true,
	        created: new Date()
	      });
	      return this.mongoUtil.insert(this.collectionName, newData);
	    }
	  }, {
	    key: 'update',
	    value: function update(identityId, data) {
	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId)
	      };
	      var newData = _lodash2.default.assign({}, data, {
	        updated: new Date()
	      });
	      return this.mongoUtil.update(this.collectionName, newData, filter);
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(identityId) {
	      var _this2 = this;

	      var filter = {
	        _id: this.mongoUtil.getObjectID(identityId)
	      };
	      var newData = _lodash2.default.assign({}, {
	        deleted: new Date(),
	        status: false
	      });
	      return this.parentStudentController.get(identityId).then(function (students) {
	        return Promise.all([_this2.groupStudentController.deleteStudents(students), _this2.parentStudentController.delete(identityId), _this2.mongoUtil.update(_this2.collectionName, newData, filter)]);
	      });
	    }
	  }, {
	    key: 'upload',
	    value: function upload(data) {
	      var _this3 = this;

	      return this.findByCode(data).then(function (results) {
	        return _this3.upsert(results, data);
	      }).then(function (results) {
	        return _this3.extractId(results);
	      });
	    }
	  }, {
	    key: 'findByCode',
	    value: function findByCode(data) {
	      var filter = {
	        code: data.code
	      };
	      return this.mongoUtil.findOne(this.collectionName, filter);
	    }
	  }, {
	    key: 'upsert',
	    value: function upsert(entity, data) {
	      if (entity) {
	        var newData = _lodash2.default.assign({}, entity, data, {
	          status: true,
	          deleted: null
	        });
	        return this.update(entity._id, newData);
	      }
	      return this.save(data);
	    }
	  }, {
	    key: 'extractId',
	    value: function extractId(data) {
	      return data.filter ? data.filter._id : data.data.insertedIds[0];
	    }
	  }]);

	  return ParentController;
	}();

	exports.default = ParentController;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _groupParentController = __webpack_require__(27);

	var _groupParentController2 = _interopRequireDefault(_groupParentController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _groupParentController2.default();

	router.get('/', function (req, res) {
	  controller.list(req.params.groupId).then(function (data) {
	    return res.json({ status: true, data: data });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	router.delete('/:parentId', function (req, res) {
	  controller.delete(req.params.groupId, req.params.parentId).then(function (data) {
	    res.json({
	      status: true,
	      data: data
	    });
	  }).catch(function (error) {
	    res.json({
	      status: false,
	      error: error
	    });
	  });
	});

	exports.default = router;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _jsonwebtoken = __webpack_require__(9);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _loginController = __webpack_require__(51);

	var _loginController2 = _interopRequireDefault(_loginController);

	var _config = __webpack_require__(10);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _loginController2.default();

	router.post('/', function (req, res) {
	  controller.login(req.body).then(function (data) {
	    if (data) {
	      // expires in 24 hours
	      var token = _jsonwebtoken2.default.sign(data, _config2.default.get('secureToken'), {
	        expiresIn: 86400
	      });
	      // ['', 'level', 'group', 'parent', 'location', 'school']
	      var id = data.role === 3 ? data._id : data.entityId;
	      res.json({
	        status: true,
	        data: {
	          token: token,
	          role: data.role,
	          id: id
	        }
	      });
	    } else {
	      res.json({ status: false });
	    }
	  }).catch(function (error) {
	    return res.json({ status: false, error: error });
	  });
	});

	exports.default = router;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginController = function () {
	  function LoginController() {
	    _classCallCheck(this, LoginController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'user';
	  }

	  _createClass(LoginController, [{
	    key: 'login',
	    value: function login(data) {
	      var filter = {
	        username: data.username,
	        password: data.password,
	        status: true
	      };
	      return this.mongoUtil.findOne(this.collectionName, filter);
	    }
	  }]);

	  return LoginController;
	}();

	exports.default = LoginController;

/***/ })
/******/ ]);