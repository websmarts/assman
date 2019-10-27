/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/SortControl.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['direction', 'column', 'order'],
  data: function data() {
    return {
      sortDir: this.direction,
      sortIndicator: "*"

    };
  },

  methods: {
    cycleDirection: function cycleDirection() {

      if (this.sortDir == 0) {
        this.sortDir = 1;
      } else if (this.sortDir < 0) {
        this.sortDir = 0;
      } else if (this.sortDir > 0) {
        this.sortDir = -1;
      }
      this.$emit('update', this.column, this.sortDir);
    }
  },
  computed: {
    sortIcon: function sortIcon() {
      return {
        'fa-sort-up': this.direction == 1,
        'fa-sort': this.direction == 0,
        'fa-sort-down': this.direction == -1
      };
    }
  }

});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/manager/slings/Index.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({

  props: ['listitems'],
  data: function data() {
    return {
      filterKey: '',

      sorters: [{ column: 'barcode', direction: 0 }, { column: 'wash_count', direction: 0 }],
      activeSorters: []

    };
  },

  methods: {
    updateSorter: function updateSorter(column, val) {
      // Find the sorter object and set thge direction value
      var sorter = _.find(this.sorters, { 'column': column });
      sorter.direction = val;

      // Update the activeSorters array. We do it this way to provide 
      // an implicit order to the various sorters to be the same as 
      // the order the user applied them
      if (val == 0) {
        // remove any activeSorter for the column if one exists
        for (var i = 0; i < this.activeSorters.length; i++) {
          if (this.activeSorters[i].column == column) {
            this.activeSorters.splice(i, 1);
            break;
          }
        }
      } else {
        // push the new sorter to activeSorters list 
        var found = _.find(this.activeSorters, { 'column': column });
        if (found) {
          found.direction = val;
        } else {
          this.activeSorters.push({ 'column': column, 'direction': val });
        }
      }
    }
  },
  computed: {
    barcode: function barcode() {
      var barcode = _.find(this.sorters, { 'column': 'barcode' });
      barcode.order = _.findIndex(this.activeSorters, { 'column': 'barcode' }) + 1;
      return barcode;
    },
    wash_count: function wash_count() {
      var wash_count = _.find(this.sorters, { 'column': 'wash_count' });
      wash_count.order = _.findIndex(this.activeSorters, { 'column': 'wash_count' }) + 1;
      return wash_count;
    },
    filteredList: function filteredList() {
      var _this = this;

      var list = this.listitems;

      if (!this.filterKey.length) {
        return list;
      }

      return _.filter(list, function (o) {

        // This filter returns items that macth any of the following filters

        // Barcode filter
        if (o.barcode && o.barcode.indexOf(_this.filterKey) == 0) {
          return o;
        }

        // vendor_part_reference filter
        if (o.vendor_part_reference && o.vendor_part_reference.indexOf(_this.filterKey) !== -1) {
          return o;
        }
      });
    },
    sortedList: function sortedList() {

      var list = this.filteredList;
      var sortfields = [];
      var sortdirections = [];

      // Apply each sorter in order
      _.each(this.activeSorters, function (s) {
        sortfields.push(s.column);
        sortdirections.push(s.direction == 1 ? 'asc' : 'desc');
      });

      return _.orderBy(list, sortfields, sortdirections);
    },
    displayList: function displayList() {
      return this.sortedList;
    }
  }

});

/***/ }),

/***/ "./node_modules/vue-loader/lib/component-normalizer.js":
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-0ae79d26\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/manager/slings/Index.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("h1", [_vm._v("Sling Index")]),
    _vm._v("\r\n\r\nFilter: "),
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.filterKey,
          expression: "filterKey"
        }
      ],
      attrs: { type: "text", name: "filter" },
      domProps: { value: _vm.filterKey },
      on: {
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.filterKey = $event.target.value
        }
      }
    }),
    _vm._v(" "),
    _c("table", { staticClass: "table" }, [
      _c("thead", [
        _c("tr", [
          _c(
            "th",
            [
              _vm._v("Barcode"),
              _c("sort-control", {
                attrs: {
                  direction: _vm.barcode.direction,
                  column: _vm.barcode.column,
                  order: _vm.barcode.order
                },
                on: { update: _vm.updateSorter }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("th", [_vm._v("Vendor")]),
          _vm._v(" "),
          _c("th", [_vm._v("Part No")]),
          _vm._v(" "),
          _c("th", [_vm._v("Site")]),
          _vm._v(" "),
          _c("th", [_vm._v("Dept")]),
          _vm._v(" "),
          _c("th", [_vm._v("Description")]),
          _vm._v(" "),
          _c("th", [_vm._v("Commissioned")]),
          _vm._v(" "),
          _c(
            "th",
            [
              _vm._v("Wash count"),
              _c("sort-control", {
                attrs: {
                  direction: _vm.wash_count.direction,
                  column: _vm.wash_count.column,
                  order: _vm.wash_count.order
                },
                on: { update: _vm.updateSorter }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("th", [_vm._v("Next audit")]),
          _vm._v(" "),
          _c("th", [_vm._v(" ")])
        ])
      ]),
      _vm._v(" "),
      _c(
        "tbody",
        _vm._l(_vm.displayList, function(sling) {
          return _c("tr", { key: sling.id }, [
            _c("td", [_vm._v(_vm._s(sling.barcode))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(sling.vendor))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(sling.vendor_part_reference))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(sling.site_id))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(sling.department_id))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(sling.description))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(sling.commissioned_date))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(sling.wash_count))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(sling.next_audit_due))]),
            _vm._v(" "),
            _c("td", [_vm._v(" ")])
          ])
        })
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0ae79d26", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-53fc5e90\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/SortControl.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { on: { click: _vm.cycleDirection } }, [
    _c("i", { staticClass: "fas", class: _vm.sortIcon }),
    _vm._v(_vm._s(_vm.sortIndicator.repeat(_vm.order)) + "\n")
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-53fc5e90", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/SortControl.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/SortControl.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-53fc5e90\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/SortControl.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\SortControl.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-53fc5e90", Component.options)
  } else {
    hotAPI.reload("data-v-53fc5e90", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/manager/slings/Index.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/manager/slings/Index.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-0ae79d26\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/manager/slings/Index.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\manager\\slings\\Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0ae79d26", Component.options)
  } else {
    hotAPI.reload("data-v-0ae79d26", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/slings_app.js":
/***/ (function(module, exports, __webpack_require__) {


Vue.component('sling-index', __webpack_require__("./resources/assets/js/components/manager/slings/Index.vue"));

Vue.component('sort-control', __webpack_require__("./resources/assets/js/components/SortControl.vue"));
var app = new Vue({
    el: '#app',
    data: function data() {
        return {
            slings: []
        };
    },


    methods: {
        getSlings: function getSlings() {
            var _this = this;

            axios.get('/api/slings').then(function (response) {
                //console.log(response.data)
                _this.slings = response.data;
            });
        }
    },
    mounted: function mounted() {
        this.getSlings();
    }
});

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/assets/js/slings_app.js");


/***/ })

/******/ });