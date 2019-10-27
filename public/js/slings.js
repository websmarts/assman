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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/slingtable.vue":
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


var ModalForm = {
    props: ['item'],
    data: function data() {
        return {
            newitem: _.clone(this.item)
        };
    },

    template: '\n        <form action="" v-on:submit.prevent="onSubmit">\n            <div class="modal-card" style="width: auto">\n                <header class="modal-card-head">\n                    <p class="modal-card-title">Edit record</p>\n                </header>\n                <section class="modal-card-body">\n                <div style="display: flex;">\n                <div style="width:360px; margin-right:10px">\n                    <b-field label="Barcode">\n                        <b-input\n                            type="text"\n                            :value="item.barcode"\n                            placeholder="Barcode"\n                            required>\n                        </b-input>\n                    </b-field>\n\n                    <b-field label="Commissioned date">\n                        <b-input\n                            type="text"\n                            :value="item.commissioned_date"\n                            placeholder="Commissioned date">\n                        </b-input>\n                    </b-field>\n                    </div>\n                    <div >\n\n                    <b-field label="Select a date">\n                        <b-datepicker\n                            placeholder="Click to select..."\n                            inline\n                            :date="item.commissioned_date"\n                            icon="calendar-today">\n                        </b-datepicker>\n                    </b-field>\n\n                    <b-field label="Wash count">\n                        <b-input\n\n                            type="number"\n                            :value="item.wash_count"\n                            @input="update($event,\'wash_count\')"\n                            placeholder="Wash count">\n                        </b-input>\n                    </b-field>\n                    </div>\n                    </div>\n\n                \n                </section>\n                <footer class="modal-card-foot">\n                    <button class="button" type="button" @click="$parent.close()">Close</button>\n                    <button class="button is-primary" >Update</button>\n                </footer>\n            </div>\n        </form>\n    ',
    methods: {
        update: function update(v, f) {
            console.log('input value=', v, 'for field', f);
            this.newitem[f] = v;
        },
        onSubmit: function onSubmit() {
            console.log('Update the form data via xhr and notify the datatable of changed record');
            this.$emit('update', this.newitem);
        }
    }
};
/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        ModalForm: ModalForm
    },

    data: function data() {
        var data = [];
        return {
            data: data,
            selected: data[2],
            isPaginated: true,
            isPaginationSimple: false,
            defaultSortDirection: 'asc',
            currentPage: 1,
            perPage: 10,
            dataFilter: null,
            isComponentModalFormActive: false,
            itemSelectedForEdit: {},
            formProps: {
                email: 'evan@you.com',
                password: 'testing'
            }

        };
    },

    computed: {
        filteredData: function filteredData() {

            var filterTerm = this.dataFilter;

            if (!filterTerm) {
                return this.data;
            }

            var results = _.filter(this.data, function (o) {

                if (o.barcode.includes(filterTerm)) return o;
            });

            return results;
        }
    },

    methods: {
        getSlings: function getSlings() {
            var _this = this;

            axios.get('/api/slings').then(function (response) {
                //console.log(response.data)
                _this.data = response.data;
            });
        },
        selectrow: function selectrow(rowObj, oldRowObj) {
            console.log('row selected, obj and old obj', rowObj, oldRowObj);
        },
        edititem: function edititem(i) {
            console.log('edititem', i);
            this.itemSelectedForEdit = i;
            this.isComponentModalFormActive = true;
        },
        updateitem: function updateitem(i) {
            // replace the data item with the id=i.id with i
            var index = _.findIndex(this.data, { id: i.id });

            // Replace item at index using native splice
            this.data.splice(index, 1, i);
        }
    },
    mounted: function mounted() {
        this.getSlings();
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

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-010251c4\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/slingtable.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm._v("\n    Filter: "),
      _c("b-input", {
        model: {
          value: _vm.dataFilter,
          callback: function($$v) {
            _vm.dataFilter = $$v
          },
          expression: "dataFilter"
        }
      }),
      _vm._v(" "),
      _c("div", { domProps: { textContent: _vm._s(_vm.filteredData.length) } }),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          attrs: {
            active: _vm.isComponentModalFormActive,
            scroll: "clip",
            "has-modal-card": ""
          },
          on: {
            "update:active": function($event) {
              _vm.isComponentModalFormActive = $event
            }
          }
        },
        [
          _c("modal-form", {
            attrs: { item: _vm.itemSelectedForEdit },
            on: { update: _vm.updateitem }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("b-table", {
        attrs: {
          data: _vm.filteredData,
          selected: _vm.selected,
          paginated: _vm.isPaginated,
          "per-page": _vm.perPage,
          "current-page": _vm.currentPage,
          "pagination-simple": _vm.isPaginationSimple,
          "default-sort-direction": _vm.defaultSortDirection,
          "default-sort": "barcode"
        },
        on: {
          "update:selected": function($event) {
            _vm.selected = $event
          },
          "update:currentPage": function($event) {
            _vm.currentPage = $event
          },
          "update:current-page": function($event) {
            _vm.currentPage = $event
          },
          select: _vm.selectrow
        },
        scopedSlots: _vm._u([
          {
            key: "default",
            fn: function(props) {
              return [
                _c(
                  "b-table-column",
                  {
                    attrs: {
                      field: "barcode",
                      label: "Barcode",
                      width: "40",
                      sortable: ""
                    }
                  },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(props.row.barcode) +
                        "\n            "
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "b-table-column",
                  {
                    attrs: {
                      field: "cost_centre",
                      label: "Cost Centre",
                      sortable: ""
                    }
                  },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(props.row.cost_centre) +
                        "\n            "
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "b-table-column",
                  { attrs: { field: "vendor", label: "Vendor", sortable: "" } },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(props.row.vendor) +
                        "\n            "
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "b-table-column",
                  {
                    attrs: {
                      field: "vendor_part_reference",
                      label: "Vendor Part",
                      sortable: ""
                    }
                  },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(props.row.vendor_part_reference) +
                        "\n            "
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "b-table-column",
                  {
                    attrs: {
                      field: "wash_count",
                      label: "Wash Count",
                      sortable: "",
                      numebic: ""
                    }
                  },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(props.row.wash_count) +
                        "\n            "
                    )
                  ]
                ),
                _vm._v(" "),
                _c("b-table-column", { attrs: { label: "Action" } }, [
                  _c(
                    "a",
                    {
                      on: {
                        click: function($event) {
                          return _vm.edititem(props.row)
                        }
                      }
                    },
                    [_vm._v("Edit")]
                  )
                ])
              ]
            }
          }
        ])
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-010251c4", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/slings.js":
/***/ (function(module, exports, __webpack_require__) {



Vue.component('slingtable', __webpack_require__("./resources/assets/js/slingtable.vue"));

var app = new Vue({
    el: '#app'

});

/***/ }),

/***/ "./resources/assets/js/slingtable.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/slingtable.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-010251c4\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/slingtable.vue")
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
Component.options.__file = "resources\\assets\\js\\slingtable.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-010251c4", Component.options)
  } else {
    hotAPI.reload("data-v-010251c4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/assets/js/slings.js");


/***/ })

/******/ });