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

	var _cors = __webpack_require__(4);

	var _cors2 = _interopRequireDefault(_cors);

	var _locationRoutes = __webpack_require__(5);

	var _locationRoutes2 = _interopRequireDefault(_locationRoutes);

	var _levelRoutes = __webpack_require__(8);

	var _levelRoutes2 = _interopRequireDefault(_levelRoutes);

	var _gradeRoutes = __webpack_require__(10);

	var _gradeRoutes2 = _interopRequireDefault(_gradeRoutes);

	var _groupRoutes = __webpack_require__(12);

	var _groupRoutes2 = _interopRequireDefault(_groupRoutes);

	var _studentRoutes = __webpack_require__(14);

	var _studentRoutes2 = _interopRequireDefault(_studentRoutes);

	var _newsletterRoutes = __webpack_require__(16);

	var _newsletterRoutes2 = _interopRequireDefault(_newsletterRoutes);

	var _documentRoutes = __webpack_require__(18);

	var _documentRoutes2 = _interopRequireDefault(_documentRoutes);

	var _activityRoutes = __webpack_require__(20);

	var _activityRoutes2 = _interopRequireDefault(_activityRoutes);

	var _parentRoutes = __webpack_require__(22);

	var _parentRoutes2 = _interopRequireDefault(_parentRoutes);

	var _config = __webpack_require__(24);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();
	var mongoUtil = new _utilMongodb2.default(_config2.default.get('db.url'));

	app.use((0, _cors2.default)());
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use(_bodyParser2.default.json());
	app.use(_express2.default.static('static'));

	app.use('/api/location', _locationRoutes2.default);
	// app.use('/api/student', studentRoutes);
	app.use('/api/newsletter', _newsletterRoutes2.default);
	app.use('/api/document', _documentRoutes2.default);
	app.use('/api/activity', _activityRoutes2.default);
	app.use('/api/parent', _parentRoutes2.default);

	_locationRoutes2.default.use('/:locationId/level', _levelRoutes2.default);
	_levelRoutes2.default.use('/:levelId/grade', _gradeRoutes2.default);
	_gradeRoutes2.default.use('/:gradeId/group', _groupRoutes2.default);
	_groupRoutes2.default.use('/:groupId/student', _studentRoutes2.default);

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
/***/ function(module, exports) {

	module.exports = require("cors");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _locationController = __webpack_require__(6);

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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(7);

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
/* 7 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _levelController = __webpack_require__(9);

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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(7);

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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _gradeController = __webpack_require__(11);

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

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(7);

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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _groupController = __webpack_require__(13);

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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(7);

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _studentController = __webpack_require__(15);

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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(7);

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
	      var _this = this;

	      var filter = {
	        status: true,
	        group: { $in: [groupId] }
	      };
	      return new Promise(function (resolve, reject) {
	        _this.mongoUtil.find('student', filter, {}).then(function (results) {
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
	        status: true,
	        created: new Date(),
	        group: [parentId]
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _newsletterController = __webpack_require__(17);

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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(7);

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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _documentController = __webpack_require__(19);

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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(7);

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _activityController = __webpack_require__(21);

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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(7);

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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _parentController = __webpack_require__(23);

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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilMongodb = __webpack_require__(3);

	var _utilMongodb2 = _interopRequireDefault(_utilMongodb);

	var _lodash = __webpack_require__(7);

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

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var convict = __webpack_require__(25);

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
	    default: '',
	    env: 'MINT_TOKEN'
	  }
	});

	// Perform validation
	config.validate({ strict: true });

	module.exports = config;

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("convict");

/***/ }
/******/ ]);