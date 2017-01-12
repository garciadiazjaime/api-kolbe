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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _bodyParser = __webpack_require__(2);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _locationRoutes = __webpack_require__(4);

	var _locationRoutes2 = _interopRequireDefault(_locationRoutes);

	var _periodRoutes = __webpack_require__(7);

	var _periodRoutes2 = _interopRequireDefault(_periodRoutes);

	var _config = __webpack_require__(9);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();
	var mongoUtil = new _utilMongodb2.default(_config2.default.get('db.url'));

	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use(_bodyParser2.default.json());
	app.use(_express2.default.static('static'));

	app.use('/api/location', _locationRoutes2.default);
	_locationRoutes2.default.use('/:locationId/period', _periodRoutes2.default);

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

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("util-mongodb");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _locationController = __webpack_require__(5);

	var _locationController2 = _interopRequireDefault(_locationController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router();
	/*eslint-enable */
	var locationController = new _locationController2.default();

	router.get('/', function (req, res) {
	  locationController.list().then(function (data) {
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

	router.get('/:locationId', function (req, res) {
	  locationController.get(req.params.locationId).then(function (data) {
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
	  locationController.save(req.body).then(function (data) {
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

	router.put('/:locationId', function (req, res) {
	  locationController.update(req.params.locationId, req.body).then(function (data) {
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

	router.delete('/:locationId', function (req, res) {
	  locationController.delete(req.params.locationId, req.body).then(function (data) {
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(6);

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
	      var _this = this;

	      var filter = {
	        status: true
	      };
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
	    value: function get(locationId) {
	      var _this2 = this;

	      var filter = {
	        _id: this.mongoUtil.getObjectID(locationId),
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
	        created: new Date(),
	        status: true
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
	    value: function update(locationId, data) {
	      var _this4 = this;

	      var filter = {
	        _id: this.mongoUtil.getObjectID(locationId)
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
	    value: function _delete(locationId) {
	      var _this5 = this;

	      return new Promise(function (resolve, reject) {
	        var filter = {
	          _id: _this5.mongoUtil.getObjectID(locationId)
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

	  return LocationController;
	}();

	exports.default = LocationController;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _periodController = __webpack_require__(8);

	var _periodController2 = _interopRequireDefault(_periodController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var periodController = new _periodController2.default();

	router.get('/', function (req, res) {
	  periodController.list(req.params.locationId).then(function (data) {
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

	router.get('/:periodId', function (req, res) {
	  periodController.get(req.params.periodId).then(function (data) {
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
	  periodController.save(req.params.locationId, req.body).then(function (data) {
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

	router.put('/:periodId', function (req, res) {
	  periodController.update(req.params.periodId, req.body).then(function (data) {
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

	router.delete('/:periodId', function (req, res) {
	  periodController.delete(req.params.periodId, req.body).then(function (data) {
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(6);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PeriodController = function () {
	  function PeriodController() {
	    _classCallCheck(this, PeriodController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'period';
	  }

	  _createClass(PeriodController, [{
	    key: 'list',
	    value: function list(locationId) {
	      var _this = this;

	      var filter = {
	        status: true,
	        locationId: locationId
	      };
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
	    value: function get(periodId) {
	      var _this2 = this;

	      var filter = {
	        _id: this.mongoUtil.getObjectID(periodId),
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
	    value: function save(locationId, data) {
	      var _this3 = this;

	      var newData = _lodash2.default.assign({}, data, {
	        locationId: locationId,
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
	    value: function update(periodId, data) {
	      var _this4 = this;

	      var filter = {
	        _id: this.mongoUtil.getObjectID(periodId)
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
	    value: function _delete(periodId) {
	      var _this5 = this;

	      return new Promise(function (resolve, reject) {
	        var filter = {
	          _id: _this5.mongoUtil.getObjectID(periodId)
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

	  return PeriodController;
	}();

	exports.default = PeriodController;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _convict = __webpack_require__(10);

	var _convict2 = _interopRequireDefault(_convict);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Define a schema
	var config = (0, _convict2.default)({
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
	    default: '',
	    env: 'MINT_TOKEN'
	  }
	});

	// Perform validation
	config.validate({ strict: true });

	exports.default = config;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("convict");

/***/ }
/******/ ]);