module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/Seo/Seo.js":
/*!***********************************!*\
  !*** ./src/components/Seo/Seo.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-helmet */ \"react-helmet\");\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _jsxFileName = \"/Users/juliette/Sites/localhost/GOBELINS/artisanat-gobelins-vercel/app/src/components/Seo/Seo.js\";\n\n\n\nconst Seo = ({\n  title,\n  description\n}) => {\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_helmet__WEBPACK_IMPORTED_MODULE_2__[\"Helmet\"], {\n    title: title,\n    lang: \"FR_fr\",\n    description: description,\n    meta: [{\n      name: `description`,\n      content: description\n    }, {\n      property: `og:title`,\n      content: title\n    }, {\n      property: `og:description`,\n      content: description\n    }, {\n      property: `og:type`,\n      content: `website`\n    }, {\n      name: `twitter:card`,\n      content: `summary`\n    }, {\n      name: `twitter:creator`,\n      content: \"\"\n    }, {\n      name: `twitter:title`,\n      content: title\n    }, {\n      name: `twitter:description`,\n      content: description\n    }]\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 6,\n    columnNumber: 5\n  }, undefined);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Seo);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9TZW8vU2VvLmpzPzY0NGIiXSwibmFtZXMiOlsiU2VvIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsIm5hbWUiLCJjb250ZW50IiwicHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsTUFBTUEsR0FBRyxHQUFHLENBQUM7QUFBQ0MsT0FBRDtBQUFRQztBQUFSLENBQUQsS0FBMEI7QUFDcEMsc0JBQ0UscUVBQUMsbURBQUQ7QUFDRSxTQUFLLEVBQUVELEtBRFQ7QUFFRSxRQUFJLEVBQUMsT0FGUDtBQUdFLGVBQVcsRUFBRUMsV0FIZjtBQUlFLFFBQUksRUFBRSxDQUNKO0FBQ0VDLFVBQUksRUFBRyxhQURUO0FBRUVDLGFBQU8sRUFBRUY7QUFGWCxLQURJLEVBS0o7QUFDRUcsY0FBUSxFQUFHLFVBRGI7QUFFRUQsYUFBTyxFQUFFSDtBQUZYLEtBTEksRUFTSjtBQUNFSSxjQUFRLEVBQUcsZ0JBRGI7QUFFRUQsYUFBTyxFQUFFRjtBQUZYLEtBVEksRUFhSjtBQUNFRyxjQUFRLEVBQUcsU0FEYjtBQUVFRCxhQUFPLEVBQUc7QUFGWixLQWJJLEVBaUJKO0FBQ0VELFVBQUksRUFBRyxjQURUO0FBRUVDLGFBQU8sRUFBRztBQUZaLEtBakJJLEVBcUJKO0FBQ0VELFVBQUksRUFBRyxpQkFEVDtBQUVFQyxhQUFPLEVBQUU7QUFGWCxLQXJCSSxFQXlCSjtBQUNFRCxVQUFJLEVBQUcsZUFEVDtBQUVFQyxhQUFPLEVBQUVIO0FBRlgsS0F6QkksRUE2Qko7QUFDRUUsVUFBSSxFQUFHLHFCQURUO0FBRUVDLGFBQU8sRUFBRUY7QUFGWCxLQTdCSTtBQUpSO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFERjtBQTBDRCxDQTNDRDs7QUE2Q2VGLGtFQUFmIiwiZmlsZSI6Ii4vc3JjL2NvbXBvbmVudHMvU2VvL1Nlby5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBIZWxtZXQgfSBmcm9tIFwicmVhY3QtaGVsbWV0XCJcblxuY29uc3QgU2VvID0gKHt0aXRsZSwgZGVzY3JpcHRpb259KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEhlbG1ldFxuICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgbGFuZz1cIkZSX2ZyXCJcbiAgICAgIGRlc2NyaXB0aW9uPXtkZXNjcmlwdGlvbn1cbiAgICAgIG1ldGE9e1tcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IGBkZXNjcmlwdGlvbmAsXG4gICAgICAgICAgY29udGVudDogZGVzY3JpcHRpb24sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm9wZXJ0eTogYG9nOnRpdGxlYCxcbiAgICAgICAgICBjb250ZW50OiB0aXRsZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3BlcnR5OiBgb2c6ZGVzY3JpcHRpb25gLFxuICAgICAgICAgIGNvbnRlbnQ6IGRlc2NyaXB0aW9uLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvcGVydHk6IGBvZzp0eXBlYCxcbiAgICAgICAgICBjb250ZW50OiBgd2Vic2l0ZWAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBgdHdpdHRlcjpjYXJkYCxcbiAgICAgICAgICBjb250ZW50OiBgc3VtbWFyeWAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBgdHdpdHRlcjpjcmVhdG9yYCxcbiAgICAgICAgICBjb250ZW50OiBcIlwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogYHR3aXR0ZXI6dGl0bGVgLFxuICAgICAgICAgIGNvbnRlbnQ6IHRpdGxlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogYHR3aXR0ZXI6ZGVzY3JpcHRpb25gLFxuICAgICAgICAgIGNvbnRlbnQ6IGRlc2NyaXB0aW9uLFxuICAgICAgICB9XG4gICAgICBdXG4gICAgICB9XG4gICAgLz5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VvO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Seo/Seo.js\n");

/***/ }),

/***/ "./src/helpers/store.js":
/*!******************************!*\
  !*** ./src/helpers/store.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ \"zustand\");\n/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zustand__WEBPACK_IMPORTED_MODULE_0__);\n\nconst useStore = zustand__WEBPACK_IMPORTED_MODULE_0___default()(set => {\n  return {\n    router: {},\n    events: null,\n    setEvents: events => {\n      set({\n        events\n      });\n    }\n  };\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (useStore);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy9zdG9yZS5qcz9iOTllIl0sIm5hbWVzIjpbInVzZVN0b3JlIiwiY3JlYXRlIiwic2V0Iiwicm91dGVyIiwiZXZlbnRzIiwic2V0RXZlbnRzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBLE1BQU1BLFFBQVEsR0FBR0MsOENBQU0sQ0FBRUMsR0FBRCxJQUFTO0FBQy9CLFNBQU87QUFDTEMsVUFBTSxFQUFFLEVBREg7QUFFTEMsVUFBTSxFQUFFLElBRkg7QUFHTEMsYUFBUyxFQUFHRCxNQUFELElBQVk7QUFDckJGLFNBQUcsQ0FBQztBQUFFRTtBQUFGLE9BQUQsQ0FBSDtBQUNEO0FBTEksR0FBUDtBQU9ELENBUnNCLENBQXZCO0FBVWVKLHVFQUFmIiwiZmlsZSI6Ii4vc3JjL2hlbHBlcnMvc3RvcmUuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlIGZyb20gJ3p1c3RhbmQnXG5cbmNvbnN0IHVzZVN0b3JlID0gY3JlYXRlKChzZXQpID0+IHtcbiAgcmV0dXJuIHtcbiAgICByb3V0ZXI6IHt9LFxuICAgIGV2ZW50czogbnVsbCxcbiAgICBzZXRFdmVudHM6IChldmVudHMpID0+IHtcbiAgICAgIHNldCh7IGV2ZW50cyB9KVxuICAgIH0sXG4gIH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHVzZVN0b3JlXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/helpers/store.js\n");

/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ \"react-dom\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_three_fiber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-three-fiber */ \"react-three-fiber\");\n/* harmony import */ var react_three_fiber__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_three_fiber__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_Seo_Seo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Seo/Seo */ \"./src/components/Seo/Seo.js\");\n/* harmony import */ var _helpers_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/store */ \"./src/helpers/store.js\");\n/* harmony import */ var _test_test__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../test/test */ \"./src/test/test.js\");\n\n\nvar _jsxFileName = \"/Users/juliette/Sites/localhost/GOBELINS/artisanat-gobelins-vercel/app/src/pages/index.js\";\n\n\n\n\n\n // import Canvas from \"../components/examples/layout/_canvas\"\n// import Sphere from \"../components/examples/canvas/Sphere\"\n\nfunction Box({\n  position,\n  color\n}) {\n  const ref = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useRef\"])();\n  Object(react_three_fiber__WEBPACK_IMPORTED_MODULE_3__[\"useFrame\"])(() => ref.current.rotation.x = ref.current.rotation.y += 0.01);\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"mesh\", {\n    position: position,\n    ref: ref,\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"boxBufferGeometry\", {\n      args: [1, 1, 1],\n      attach: \"geometry\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 17,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"meshPhongMaterial\", {\n      color: color,\n      attach: \"material\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 18,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 16,\n    columnNumber: 5\n  }, this);\n}\n\nconst Page = () => {\n  _helpers_store__WEBPACK_IMPORTED_MODULE_5__[\"default\"].setState({\n    title: 'Sphere'\n  });\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_Seo_Seo__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      title: \"regards d'artisans\",\n      description: \"description du projet\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 28,\n      columnNumber: 7\n    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h1\", {\n      children: \"Hello world\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 32,\n      columnNumber: 7\n    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_test_test__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 38,\n      columnNumber: 7\n    }, undefined)]\n  }, void 0, true);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvaW5kZXguanM/NDU3MCJdLCJuYW1lcyI6WyJCb3giLCJwb3NpdGlvbiIsImNvbG9yIiwicmVmIiwidXNlUmVmIiwidXNlRnJhbWUiLCJjdXJyZW50Iiwicm90YXRpb24iLCJ4IiwieSIsIlBhZ2UiLCJ1c2VTdG9yZSIsInNldFN0YXRlIiwidGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Q0FHQTtBQUNBOztBQUVBLFNBQVNBLEdBQVQsQ0FBYTtBQUFFQyxVQUFGO0FBQVlDO0FBQVosQ0FBYixFQUFrQztBQUNoQyxRQUFNQyxHQUFHLEdBQUdDLG9EQUFNLEVBQWxCO0FBQ0FDLG9FQUFRLENBQUMsTUFBT0YsR0FBRyxDQUFDRyxPQUFKLENBQVlDLFFBQVosQ0FBcUJDLENBQXJCLEdBQXlCTCxHQUFHLENBQUNHLE9BQUosQ0FBWUMsUUFBWixDQUFxQkUsQ0FBckIsSUFBMEIsSUFBM0QsQ0FBUjtBQUVBLHNCQUNFO0FBQU0sWUFBUSxFQUFFUixRQUFoQjtBQUEwQixPQUFHLEVBQUVFLEdBQS9CO0FBQUEsNEJBQ0U7QUFBbUIsVUFBSSxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBQXpCO0FBQW9DLFlBQU0sRUFBQztBQUEzQztBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsZUFFRTtBQUFtQixXQUFLLEVBQUVELEtBQTFCO0FBQWlDLFlBQU0sRUFBQztBQUF4QztBQUFBO0FBQUE7QUFBQTtBQUFBLFlBRkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFNRDs7QUFHRCxNQUFNUSxJQUFJLEdBQUcsTUFBTTtBQUNqQkMsd0RBQVEsQ0FBQ0MsUUFBVCxDQUFrQjtBQUFFQyxTQUFLLEVBQUU7QUFBVCxHQUFsQjtBQUNBLHNCQUNFO0FBQUEsNEJBQ0UscUVBQUMsMkRBQUQ7QUFDRSxXQUFLLEVBQUMsb0JBRFI7QUFFRSxpQkFBVyxFQUFDO0FBRmQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFERixlQUtFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUxGLGVBV0UscUVBQUMsa0RBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFYRjtBQUFBLGtCQURGO0FBcUJELENBdkJEOztBQXlCZUgsbUVBQWYiLCJmaWxlIjoiLi9zcmMvcGFnZXMvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHt1c2VSZWZ9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQgeyBDYW52YXMsIHVzZUZyYW1lIH0gZnJvbSBcInJlYWN0LXRocmVlLWZpYmVyXCJcbmltcG9ydCBTZW8gZnJvbSAnLi4vY29tcG9uZW50cy9TZW8vU2VvJ1xuaW1wb3J0IHVzZVN0b3JlIGZyb20gJy4uL2hlbHBlcnMvc3RvcmUnXG5pbXBvcnQgVGVzdCBmcm9tIFwiLi4vdGVzdC90ZXN0XCJcblxuLy8gaW1wb3J0IENhbnZhcyBmcm9tIFwiLi4vY29tcG9uZW50cy9leGFtcGxlcy9sYXlvdXQvX2NhbnZhc1wiXG4vLyBpbXBvcnQgU3BoZXJlIGZyb20gXCIuLi9jb21wb25lbnRzL2V4YW1wbGVzL2NhbnZhcy9TcGhlcmVcIlxuXG5mdW5jdGlvbiBCb3goeyBwb3NpdGlvbiwgY29sb3IgfSkge1xuICBjb25zdCByZWYgPSB1c2VSZWYoKVxuICB1c2VGcmFtZSgoKSA9PiAocmVmLmN1cnJlbnQucm90YXRpb24ueCA9IHJlZi5jdXJyZW50LnJvdGF0aW9uLnkgKz0gMC4wMSkpXG5cbiAgcmV0dXJuIChcbiAgICA8bWVzaCBwb3NpdGlvbj17cG9zaXRpb259IHJlZj17cmVmfT5cbiAgICAgIDxib3hCdWZmZXJHZW9tZXRyeSBhcmdzPXtbMSwgMSwgMV19IGF0dGFjaD1cImdlb21ldHJ5XCIgLz5cbiAgICAgIDxtZXNoUGhvbmdNYXRlcmlhbCBjb2xvcj17Y29sb3J9IGF0dGFjaD1cIm1hdGVyaWFsXCIgLz5cbiAgICA8L21lc2g+XG4gIClcbn1cblxuXG5jb25zdCBQYWdlID0gKCkgPT4ge1xuICB1c2VTdG9yZS5zZXRTdGF0ZSh7IHRpdGxlOiAnU3BoZXJlJyB9KVxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8U2VvXG4gICAgICAgIHRpdGxlPVwicmVnYXJkcyBkJ2FydGlzYW5zXCJcbiAgICAgICAgZGVzY3JpcHRpb249XCJkZXNjcmlwdGlvbiBkdSBwcm9qZXRcIlxuICAgICAgLz5cbiAgICAgIDxoMT5IZWxsbyB3b3JsZDwvaDE+XG5cbiAgICAgIHsvKiA8Q2FudmFzPlxuICAgICAgICA8U3BoZXJlIC8+XG4gICAgICA8L0NhbnZhcz4gKi99XG5cbiAgICAgIDxUZXN0IC8+XG4gICAgICB7LyogPENhbnZhcz5cbiAgICAgICAgPEJveCBjb2xvcj1cIiMxOGEzNmVcIiBwb3NpdGlvbj17Wy0xLCAwLCAzXX0gLz5cbiAgICAgICAgPEJveCBjb2xvcj1cIiNmNTZmNDJcIiBwb3NpdGlvbj17WzEsIDAsIDNdfSAvPlxuICAgICAgICA8ZGlyZWN0aW9uYWxMaWdodCBjb2xvcj1cIiNmZmZmZmZcIiBpbnRlbnNpdHk9ezF9IHBvc2l0aW9uPXtbLTEsIDIsIDRdfSAvPlxuICAgICAgPC9DYW52YXM+ICovfVxuXG4gICAgPC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFnZVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/index.js\n");

/***/ }),

/***/ "./src/test/styles.module.scss":
/*!*************************************!*\
  !*** ./src/test/styles.module.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Exports\nmodule.exports = {\n\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdC9zdHlsZXMubW9kdWxlLnNjc3M/Y2YxYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOztBQUVBIiwiZmlsZSI6Ii4vc3JjL3Rlc3Qvc3R5bGVzLm1vZHVsZS5zY3NzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/test/styles.module.scss\n");

/***/ }),

/***/ "./src/test/test.js":
/*!**************************!*\
  !*** ./src/test/test.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.scss */ \"./src/test/styles.module.scss\");\n/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_three_fiber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-three-fiber */ \"react-three-fiber\");\n/* harmony import */ var react_three_fiber__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_three_fiber__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @react-three/drei */ \"@react-three/drei\");\n/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_react_three_drei__WEBPACK_IMPORTED_MODULE_4__);\n\n\nvar _jsxFileName = \"/Users/juliette/Sites/localhost/GOBELINS/artisanat-gobelins-vercel/app/src/test/test.js\";\n\n\n\n\n\nfunction Box({\n  position,\n  color\n}) {\n  const ref = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useRef\"])();\n  Object(react_three_fiber__WEBPACK_IMPORTED_MODULE_3__[\"useFrame\"])(() => ref.current.rotation.x = ref.current.rotation.y += 0.01);\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"mesh\", {\n    position: position,\n    ref: ref,\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"boxBufferGeometry\", {\n      args: [1, 1, 1],\n      attach: \"geometry\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 13,\n      columnNumber: 9\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"meshPhongMaterial\", {\n      color: color,\n      attach: \"material\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 14,\n      columnNumber: 9\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 12,\n    columnNumber: 7\n  }, this);\n} // const Model = () => {\n//   const fbx = useFBX(\"/public/table_plateau.fbx\", true);\n//   return <primitive object={fbx.scene} dispose={null} />;\n// }\n//   const Model = lazy(() => import(\"../../public/table_plateau.fbx\")); // \n//   function Asset({ url }) {\n//     const fbx = useLoader(FBXLoader, url)\n//     return <primitive object={fbx} dispose={null} />\n// }\n// const Model = lazy(() => import(\"./table_plateau.fbx\")); // has imports from three/jsm\n\n\nconst Test = () => {\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], {\n    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_three_fiber__WEBPACK_IMPORTED_MODULE_3__[\"Canvas\"], {\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Box, {\n        color: \"#18a36e\",\n        position: [-1, 0, 3]\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 40,\n        columnNumber: 13\n      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Box, {\n        color: \"#f56f42\",\n        position: [1, 0, 3]\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 41,\n        columnNumber: 13\n      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"directionalLight\", {\n        color: \"#ffffff\",\n        intensity: 1,\n        position: [-1, 2, 4]\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 42,\n        columnNumber: 13\n      }, undefined)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 39,\n      columnNumber: 9\n    }, undefined)\n  }, void 0, false);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Test);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdC90ZXN0LmpzP2JiN2MiXSwibmFtZXMiOlsiQm94IiwicG9zaXRpb24iLCJjb2xvciIsInJlZiIsInVzZVJlZiIsInVzZUZyYW1lIiwiY3VycmVudCIsInJvdGF0aW9uIiwieCIsInkiLCJUZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBOztBQUVBLFNBQVNBLEdBQVQsQ0FBYTtBQUFFQyxVQUFGO0FBQVlDO0FBQVosQ0FBYixFQUFrQztBQUM5QixRQUFNQyxHQUFHLEdBQUdDLG9EQUFNLEVBQWxCO0FBQ0FDLG9FQUFRLENBQUMsTUFBT0YsR0FBRyxDQUFDRyxPQUFKLENBQVlDLFFBQVosQ0FBcUJDLENBQXJCLEdBQXlCTCxHQUFHLENBQUNHLE9BQUosQ0FBWUMsUUFBWixDQUFxQkUsQ0FBckIsSUFBMEIsSUFBM0QsQ0FBUjtBQUVBLHNCQUNFO0FBQU0sWUFBUSxFQUFFUixRQUFoQjtBQUEwQixPQUFHLEVBQUVFLEdBQS9CO0FBQUEsNEJBQ0U7QUFBbUIsVUFBSSxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBQXpCO0FBQW9DLFlBQU0sRUFBQztBQUEzQztBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsZUFFRTtBQUFtQixXQUFLLEVBQUVELEtBQTFCO0FBQWlDLFlBQU0sRUFBQztBQUF4QztBQUFBO0FBQUE7QUFBQTtBQUFBLFlBRkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFNRCxDLENBRUQ7QUFDQTtBQUVBO0FBQ0E7QUFFRjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUlBLE1BQU1RLElBQUksR0FBRyxNQUFNO0FBQ2Ysc0JBQ0k7QUFBQSwyQkFDQSxxRUFBQyx3REFBRDtBQUFBLDhCQUNJLHFFQUFDLEdBQUQ7QUFBSyxhQUFLLEVBQUMsU0FBWDtBQUFxQixnQkFBUSxFQUFFLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVI7QUFBL0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFESixlQUVJLHFFQUFDLEdBQUQ7QUFBSyxhQUFLLEVBQUMsU0FBWDtBQUFxQixnQkFBUSxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQO0FBQS9CO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRkosZUFHSTtBQUFrQixhQUFLLEVBQUMsU0FBeEI7QUFBa0MsaUJBQVMsRUFBRSxDQUE3QztBQUFnRCxnQkFBUSxFQUFFLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVI7QUFBMUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFISjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQSxtQkFESjtBQVNILENBVkQ7O0FBWWVBLG1FQUFmIiwiZmlsZSI6Ii4vc3JjL3Rlc3QvdGVzdC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZXMgZnJvbSBcIi4vc3R5bGVzLm1vZHVsZS5zY3NzXCI7XG5pbXBvcnQgUmVhY3QsIHt1c2VSZWYsIGxhenksIFN1c3BlbnNlfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHsgQ2FudmFzLCB1c2VGcmFtZSwgdXNlTG9hZGVyIH0gZnJvbSBcInJlYWN0LXRocmVlLWZpYmVyXCI7XG5cbmltcG9ydCB7IEh0bWwsIHVzZUdMVEZMb2FkZXIsIHVzZUZCWCB9IGZyb20gXCJAcmVhY3QtdGhyZWUvZHJlaVwiO1xuXG5mdW5jdGlvbiBCb3goeyBwb3NpdGlvbiwgY29sb3IgfSkge1xuICAgIGNvbnN0IHJlZiA9IHVzZVJlZigpXG4gICAgdXNlRnJhbWUoKCkgPT4gKHJlZi5jdXJyZW50LnJvdGF0aW9uLnggPSByZWYuY3VycmVudC5yb3RhdGlvbi55ICs9IDAuMDEpKVxuICBcbiAgICByZXR1cm4gKFxuICAgICAgPG1lc2ggcG9zaXRpb249e3Bvc2l0aW9ufSByZWY9e3JlZn0+XG4gICAgICAgIDxib3hCdWZmZXJHZW9tZXRyeSBhcmdzPXtbMSwgMSwgMV19IGF0dGFjaD1cImdlb21ldHJ5XCIgLz5cbiAgICAgICAgPG1lc2hQaG9uZ01hdGVyaWFsIGNvbG9yPXtjb2xvcn0gYXR0YWNoPVwibWF0ZXJpYWxcIiAvPlxuICAgICAgPC9tZXNoPlxuICAgIClcbiAgfVxuXG4gIC8vIGNvbnN0IE1vZGVsID0gKCkgPT4ge1xuICAvLyAgIGNvbnN0IGZieCA9IHVzZUZCWChcIi9wdWJsaWMvdGFibGVfcGxhdGVhdS5mYnhcIiwgdHJ1ZSk7XG4gICBcbiAgLy8gICByZXR1cm4gPHByaW1pdGl2ZSBvYmplY3Q9e2ZieC5zY2VuZX0gZGlzcG9zZT17bnVsbH0gLz47XG4gIC8vIH1cblxuLy8gICBjb25zdCBNb2RlbCA9IGxhenkoKCkgPT4gaW1wb3J0KFwiLi4vLi4vcHVibGljL3RhYmxlX3BsYXRlYXUuZmJ4XCIpKTsgLy8gXG5cbi8vICAgZnVuY3Rpb24gQXNzZXQoeyB1cmwgfSkge1xuLy8gICAgIGNvbnN0IGZieCA9IHVzZUxvYWRlcihGQlhMb2FkZXIsIHVybClcbi8vICAgICByZXR1cm4gPHByaW1pdGl2ZSBvYmplY3Q9e2ZieH0gZGlzcG9zZT17bnVsbH0gLz5cbi8vIH1cblxuLy8gY29uc3QgTW9kZWwgPSBsYXp5KCgpID0+IGltcG9ydChcIi4vdGFibGVfcGxhdGVhdS5mYnhcIikpOyAvLyBoYXMgaW1wb3J0cyBmcm9tIHRocmVlL2pzbVxuXG4gIFxuXG5jb25zdCBUZXN0ID0gKCkgPT4ge1xuICAgIHJldHVybiAoIFxuICAgICAgICA8PlxuICAgICAgICA8Q2FudmFzPiAgICAgXG4gICAgICAgICAgICA8Qm94IGNvbG9yPVwiIzE4YTM2ZVwiIHBvc2l0aW9uPXtbLTEsIDAsIDNdfSAvPlxuICAgICAgICAgICAgPEJveCBjb2xvcj1cIiNmNTZmNDJcIiBwb3NpdGlvbj17WzEsIDAsIDNdfSAvPlxuICAgICAgICAgICAgPGRpcmVjdGlvbmFsTGlnaHQgY29sb3I9XCIjZmZmZmZmXCIgaW50ZW5zaXR5PXsxfSBwb3NpdGlvbj17Wy0xLCAyLCA0XX0gLz5cbiAgICAgIDwvQ2FudmFzPlxuICAgICAgICA8Lz5cbiAgICAgKTtcbn1cbiBcbmV4cG9ydCBkZWZhdWx0IFRlc3Q7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/test/test.js\n");

/***/ }),

/***/ "@react-three/drei":
/*!************************************!*\
  !*** external "@react-three/drei" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@react-three/drei\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAcmVhY3QtdGhyZWUvZHJlaVwiPzBhOGYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiQHJlYWN0LXRocmVlL2RyZWkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAcmVhY3QtdGhyZWUvZHJlaVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@react-three/drei\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb21cIj81ZTlhIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0LWRvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react-dom\n");

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-helmet\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIj9jOWQwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0LWhlbG1ldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react-helmet\n");

/***/ }),

/***/ "react-three-fiber":
/*!************************************!*\
  !*** external "react-three-fiber" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-three-fiber\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC10aHJlZS1maWJlclwiP2M3NjUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QtdGhyZWUtZmliZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC10aHJlZS1maWJlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react-three-fiber\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ }),

/***/ "zustand":
/*!**************************!*\
  !*** external "zustand" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"zustand\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ6dXN0YW5kXCI/NzNjZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJ6dXN0YW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwienVzdGFuZFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///zustand\n");

/***/ })

/******/ });