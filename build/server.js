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

	var _gradeRoutes = __webpack_require__(9);

	var _gradeRoutes2 = _interopRequireDefault(_gradeRoutes);

	var _groupRoutes = __webpack_require__(11);

	var _groupRoutes2 = _interopRequireDefault(_groupRoutes);

	var _studentRoutes = __webpack_require__(13);

	var _studentRoutes2 = _interopRequireDefault(_studentRoutes);

	var _newsletterRoutes = __webpack_require__(15);

	var _newsletterRoutes2 = _interopRequireDefault(_newsletterRoutes);

	var _documentRoutes = __webpack_require__(17);

	var _documentRoutes2 = _interopRequireDefault(_documentRoutes);

	var _activityRoutes = __webpack_require__(19);

	var _activityRoutes2 = _interopRequireDefault(_activityRoutes);

	var _parentRoutes = __webpack_require__(23);

	var _parentRoutes2 = _interopRequireDefault(_parentRoutes);

	var _config = __webpack_require__(21);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();
	var mongoUtil = new _utilMongodb2.default(_config2.default.get('db.url'));

	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use(_bodyParser2.default.json());
	app.use(_express2.default.static('static'));

	app.use('/api/location', _locationRoutes2.default);
	app.use('/api/student', _studentRoutes2.default);
	app.use('/api/newsletter', _newsletterRoutes2.default);
	app.use('/api/document', _documentRoutes2.default);
	app.use('/api/activity', _activityRoutes2.default);
	app.use('/api/parent', _parentRoutes2.default);

	_locationRoutes2.default.use('/:locationId/period', _periodRoutes2.default);
	_periodRoutes2.default.use('/:periodId/grade', _gradeRoutes2.default);
	_gradeRoutes2.default.use('/:gradeId/group', _groupRoutes2.default);

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
	var controller = new _periodController2.default();
	var parentId = 'locationId';
	var identiyId = 'periodId';

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

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _gradeController = __webpack_require__(10);

	var _gradeController2 = _interopRequireDefault(_gradeController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _gradeController2.default();
	var parentId = 'periodId';
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

/***/ },
/* 10 */
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

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _groupController = __webpack_require__(12);

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

	exports.default = router;

/***/ },
/* 12 */
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

	var GroupController = function () {
	  function GroupController() {
	    _classCallCheck(this, GroupController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'group';
	  }

	  _createClass(GroupController, [{
	    key: 'list',
	    value: function list(parentId) {
	      var _this = this;

	      var filter = {
	        status: true,
	        parentId: parentId
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

	  return GroupController;
	}();

	exports.default = GroupController;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _studentController = __webpack_require__(14);

	var _studentController2 = _interopRequireDefault(_studentController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _studentController2.default();
	var identiyId = 'studentId';

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

/***/ },
/* 14 */
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

	var StudentController = function () {
	  function StudentController() {
	    _classCallCheck(this, StudentController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'student';
	  }

	  _createClass(StudentController, [{
	    key: 'list',
	    value: function list(parentId) {
	      var _this = this;

	      var filter = {
	        status: true,
	        parentId: parentId
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

	  return StudentController;
	}();

	exports.default = StudentController;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _newsletterController = __webpack_require__(16);

	var _newsletterController2 = _interopRequireDefault(_newsletterController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _newsletterController2.default();
	var identiyId = 'newsletterId';

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

/***/ },
/* 16 */
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

	var NewsletterController = function () {
	  function NewsletterController() {
	    _classCallCheck(this, NewsletterController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'newsletter';
	  }

	  _createClass(NewsletterController, [{
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

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _documentController = __webpack_require__(18);

	var _documentController2 = _interopRequireDefault(_documentController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _documentController2.default();
	var identiyId = 'documentId';

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

/***/ },
/* 18 */
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

	var DocumentController = function () {
	  function DocumentController() {
	    _classCallCheck(this, DocumentController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'document';
	  }

	  _createClass(DocumentController, [{
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

	  return DocumentController;
	}();

	exports.default = DocumentController;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _activityController = __webpack_require__(20);

	var _activityController2 = _interopRequireDefault(_activityController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _activityController2.default();
	var identiyId = 'activityId';

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

/***/ },
/* 20 */
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

	var ActivityController = function () {
	  function ActivityController() {
	    _classCallCheck(this, ActivityController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'activity';
	  }

	  _createClass(ActivityController, [{
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

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _convict = __webpack_require__(22);

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
/* 22 */
/***/ function(module, exports) {

	module.exports = require("convict");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _parentController = __webpack_require__(24);

	var _parentController2 = _interopRequireDefault(_parentController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*eslint-disable */
	var router = _express2.default.Router({ mergeParams: true });
	/*eslint-enable */
	var controller = new _parentController2.default();
	var identiyId = 'parentId';

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

/***/ },
/* 24 */
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

	var ParentController = function () {
	  function ParentController() {
	    _classCallCheck(this, ParentController);

	    this.mongoUtil = new _utilMongodb2.default();
	    this.collectionName = 'parent';
	  }

	  _createClass(ParentController, [{
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

	  return ParentController;
	}();

	exports.default = ParentController;

/***/ }
/******/ ]);