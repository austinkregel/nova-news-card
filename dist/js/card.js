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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(6);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Nova.booting(function (Vue, router) {
    Vue.component('nova-news-card', __webpack_require__(2));
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(3)
/* script */
var __vue_script__ = __webpack_require__(4)
/* template */
var __vue_template__ = __webpack_require__(5)
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
Component.options.__file = "resources/js/components/Card.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b9bc2c0a", Component.options)
  } else {
    hotAPI.reload("data-v-b9bc2c0a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 3 */
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
/* 4 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['card'],
    data: function data() {
        return {
            country: this.card.country,
            category: 'technology',
            type: 'topStories',
            shouldPromptForApiKey: false,
            allStories: [],
            topStories_: []
        };
    },

    watch: {
        type: function type() {
            this.getStories();
        }
    },
    computed: {
        stories: function stories() {
            return this.allStories.concat(this.topStories_);
        },
        queryString: function queryString() {
            var _this = this;

            return ['sources', 'domains', 'excludeDomains', 'from', 'to', 'language', 'sortBy', 'pageSize', 'page'].filter(function (key) {
                return _this.card[key];
            }).map(function (key) {
                return key + '=' + _this.card[key];
            }).join('&');
        }
    },
    methods: {
        topStories: function topStories() {
            var _this2 = this;

            axios.get('/nova-vendor/nova-news-card/news-proxy/top-headlines/' + this.country + '/' + this.category + (!this.queryString ? '' : this.queryString)).then(function (res) {
                _this2.topStories_ = res.data[0].articles;
                _this2.allStories = [];
            }).catch(function (err) {
                return _this2.shouldPromptForApiKey = true;
            });
        },
        everything: function everything() {
            var _this3 = this;

            axios.get('/nova-vendor/nova-news-card/news-proxy/everything/publishedAt?q=' + this.country + ' news').then(function (res) {
                _this3.allStories = res.data[0].articles;
                _this3.topStories_ = [];
            }).catch(function (err) {
                return _this3.shouldPromptForApiKey = true;
            });
        },
        getStories: function getStories() {
            this[this.type]();
        },
        saveKey: function saveKey() {
            var _this4 = this;

            axios.post('/nova-vendor/nova-news-card/news-proxy/set-api-key', {
                api_key: this.api_key
            }).then(function (r) {
                return _this4.getStories();
            });
        }
    },
    mounted: function mounted() {
        this.getStories();
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "card",
    {
      staticClass: "px-2 pb-4 overflow-hidden bg-white overflow-y-scroll",
      staticStyle: { height: "350px" }
    },
    [
      _c("div", { staticClass: "flex justify-center items-centers" }, [
        !_vm.shouldPromptForApiKey
          ? _c("div", { staticClass: "w-full  flex flex-wrap pt-2" }, [
              _c("h4", { staticClass: "flex-grow" }, [_vm._v("News")]),
              _vm._v(" "),
              _c("label", { staticClass: "mr-2" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.type,
                      expression: "type"
                    }
                  ],
                  attrs: { type: "radio", value: "topStories" },
                  domProps: { checked: _vm._q(_vm.type, "topStories") },
                  on: {
                    change: function($event) {
                      _vm.type = "topStories"
                    }
                  }
                }),
                _vm._v(" Top Stories\n            ")
              ]),
              _vm._v(" "),
              _c("label", [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.type,
                      expression: "type"
                    }
                  ],
                  attrs: { type: "radio", value: "everything" },
                  domProps: { checked: _vm._q(_vm.type, "everything") },
                  on: {
                    change: function($event) {
                      _vm.type = "everything"
                    }
                  }
                }),
                _vm._v(" Everything\n            ")
              ]),
              _vm._v(" "),
              _c(
                "select",
                { staticClass: "mt-2 w-full form-control form-select" },
                [_c("option", [_vm._v("US")])]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "w-full scroll-y pt-2" },
                _vm._l(_vm.stories, function(story) {
                  return _c("div", [
                    _c(
                      "div",
                      {
                        staticClass: "p-2 mb-2 shadow rounded",
                        staticStyle: { background: "#eef1f4" }
                      },
                      [
                        _c("h4", [
                          _c(
                            "a",
                            {
                              staticClass: "text-primary no-underline",
                              attrs: { href: story.url }
                            },
                            [_vm._v(_vm._s(story.title))]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "pt-1" }, [
                          _vm._v(
                            _vm._s(story.source.name) +
                              " - " +
                              _vm._s(story.author)
                          )
                        ])
                      ]
                    )
                  ])
                })
              )
            ])
          : _c("div", { staticClass: "px-3 py-3 flex-1 w-full" }, [
              _c("h2", { staticClass: "pb-4" }, [
                _vm._v("We need your Api Key!")
              ]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.api_key,
                    expression: "api_key"
                  }
                ],
                staticClass:
                  "w-full form-control form-input form-input-bordered",
                attrs: { type: "text" },
                domProps: { value: _vm.api_key },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.api_key = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _c("div", { staticClass: "flex flex-wrap w-full mt-4" }, [
                _c(
                  "div",
                  {
                    staticClass: "flex-grow pt-2 text-small",
                    staticStyle: { color: "#8795A1" }
                  },
                  [
                    _vm._v("\n                    News from "),
                    _c(
                      "a",
                      {
                        staticStyle: { color: "#8795A1" },
                        attrs: { href: "https://newsapi.org" }
                      },
                      [_vm._v("newsapi.org")]
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "ml-auto btn btn-default btn-primary",
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.saveKey($event)
                      }
                    }
                  },
                  [_vm._v("\n                    Save\n                ")]
                )
              ])
            ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b9bc2c0a", module.exports)
  }
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);