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
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-helmet */ "react-helmet");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = "D:\\AA_CLASS\\COURS GOBELINS DMII1\\ARTISANAT\\artisanat-gobelins-vercel\\app\\src\\components\\Seo\\Seo.js";



const Seo = ({
  title,
  description
}) => {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_helmet__WEBPACK_IMPORTED_MODULE_2__["Helmet"], {
    title: title,
    lang: "FR_fr",
    description: description,
    meta: [{
      name: `description`,
      content: description
    }, {
      property: `og:title`,
      content: title
    }, {
      property: `og:description`,
      content: description
    }, {
      property: `og:type`,
      content: `website`
    }, {
      name: `twitter:card`,
      content: `summary`
    }, {
      name: `twitter:creator`,
      content: ""
    }, {
      name: `twitter:title`,
      content: title
    }, {
      name: `twitter:description`,
      content: description
    }]
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 6,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ __webpack_exports__["default"] = (Seo);

/***/ }),

/***/ "./src/helpers/store.js":
/*!******************************!*\
  !*** ./src/helpers/store.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "zustand");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zustand__WEBPACK_IMPORTED_MODULE_0__);

const useStore = zustand__WEBPACK_IMPORTED_MODULE_0___default()(set => {
  return {
    router: {},
    events: null,
    setEvents: events => {
      set({
        events
      });
    }
  };
});
/* harmony default export */ __webpack_exports__["default"] = (useStore);

/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_three_fiber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-three-fiber */ "react-three-fiber");
/* harmony import */ var react_three_fiber__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_three_fiber__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_Seo_Seo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Seo/Seo */ "./src/components/Seo/Seo.js");
/* harmony import */ var _helpers_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/store */ "./src/helpers/store.js");
/* harmony import */ var _test_test__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../test/test */ "./src/test/test.js");


var _jsxFileName = "D:\\AA_CLASS\\COURS GOBELINS DMII1\\ARTISANAT\\artisanat-gobelins-vercel\\app\\src\\pages\\index.js";





 // import Canvas from "../components/examples/layout/_canvas"
// import Sphere from "../components/examples/canvas/Sphere"

function Box({
  position,
  color
}) {
  const ref = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])();
  Object(react_three_fiber__WEBPACK_IMPORTED_MODULE_3__["useFrame"])(() => ref.current.rotation.x = ref.current.rotation.y += 0.01);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("mesh", {
    position: position,
    ref: ref,
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("boxBufferGeometry", {
      args: [1, 1, 1],
      attach: "geometry"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("meshPhongMaterial", {
      color: color,
      attach: "material"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 16,
    columnNumber: 5
  }, this);
}

const Page = () => {
  _helpers_store__WEBPACK_IMPORTED_MODULE_5__["default"].setState({
    title: 'Sphere'
  });
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_Seo_Seo__WEBPACK_IMPORTED_MODULE_4__["default"], {
      title: "regards d'artisans",
      description: "description du projet"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h1", {
      children: "Hello world"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_test_test__WEBPACK_IMPORTED_MODULE_6__["default"], {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
};

/* harmony default export */ __webpack_exports__["default"] = (Page);

/***/ }),

/***/ "./src/test/styles.module.scss":
/*!*************************************!*\
  !*** ./src/test/styles.module.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ "./src/test/test.js":
/*!**************************!*\
  !*** ./src/test/test.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.scss */ "./src/test/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_three_fiber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-three-fiber */ "react-three-fiber");
/* harmony import */ var react_three_fiber__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_three_fiber__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @react-three/drei */ "@react-three/drei");
/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_react_three_drei__WEBPACK_IMPORTED_MODULE_4__);


var _jsxFileName = "D:\\AA_CLASS\\COURS GOBELINS DMII1\\ARTISANAT\\artisanat-gobelins-vercel\\app\\src\\test\\test.js";





function Box({
  position,
  color
}) {
  const ref = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();
  Object(react_three_fiber__WEBPACK_IMPORTED_MODULE_3__["useFrame"])(() => ref.current.rotation.x = ref.current.rotation.y += 0.01);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("mesh", {
    position: position,
    ref: ref,
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("boxBufferGeometry", {
      args: [1, 1, 1],
      attach: "geometry"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 9
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("meshPhongMaterial", {
      color: color,
      attach: "material"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 9
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 7
  }, this);
} // const Model = () => {
//   const fbx = useFBX("/public/table_plateau.fbx", true);
//   return <primitive object={fbx.scene} dispose={null} />;
// }
//   const Model = lazy(() => import("../../public/table_plateau.fbx")); // 
//   function Asset({ url }) {
//     const fbx = useLoader(FBXLoader, url)
//     return <primitive object={fbx} dispose={null} />
// }
// const Model = lazy(() => import("./table_plateau.fbx")); // has imports from three/jsm


const Test = () => {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_three_fiber__WEBPACK_IMPORTED_MODULE_3__["Canvas"], {
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(Box, {
        color: "#18a36e",
        position: [-1, 0, 3]
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 13
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(Box, {
        color: "#f56f42",
        position: [1, 0, 3]
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 13
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("directionalLight", {
        color: "#ffffff",
        intensity: 1,
        position: [-1, 2, 4]
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 13
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 9
    }, undefined)
  }, void 0, false);
};

/* harmony default export */ __webpack_exports__["default"] = (Test);

/***/ }),

/***/ "@react-three/drei":
/*!************************************!*\
  !*** external "@react-three/drei" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@react-three/drei");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),

/***/ "react-three-fiber":
/*!************************************!*\
  !*** external "react-three-fiber" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-three-fiber");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "zustand":
/*!**************************!*\
  !*** external "zustand" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("zustand");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvU2VvL1Nlby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rlc3Qvc3R5bGVzLm1vZHVsZS5zY3NzIiwid2VicGFjazovLy8uL3NyYy90ZXN0L3Rlc3QuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQHJlYWN0LXRocmVlL2RyZWlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXRocmVlLWZpYmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwienVzdGFuZFwiIl0sIm5hbWVzIjpbIlNlbyIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJuYW1lIiwiY29udGVudCIsInByb3BlcnR5IiwidXNlU3RvcmUiLCJjcmVhdGUiLCJzZXQiLCJyb3V0ZXIiLCJldmVudHMiLCJzZXRFdmVudHMiLCJCb3giLCJwb3NpdGlvbiIsImNvbG9yIiwicmVmIiwidXNlUmVmIiwidXNlRnJhbWUiLCJjdXJyZW50Iiwicm90YXRpb24iLCJ4IiwieSIsIlBhZ2UiLCJzZXRTdGF0ZSIsIlRlc3QiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7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QUE7QUFBQTtBQUFBO0FBQUEsVUFERjtBQU1ELEMsQ0FFRDtBQUNBO0FBRUE7QUFDQTtBQUVGO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBSUEsTUFBTVUsSUFBSSxHQUFHLE1BQU07QUFDZixzQkFDSTtBQUFBLDJCQUNBLHFFQUFDLHdEQUFEO0FBQUEsOEJBQ0kscUVBQUMsR0FBRDtBQUFLLGFBQUssRUFBQyxTQUFYO0FBQXFCLGdCQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFMLEVBQVEsQ0FBUjtBQUEvQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQURKLGVBRUkscUVBQUMsR0FBRDtBQUFLLGFBQUssRUFBQyxTQUFYO0FBQXFCLGdCQUFRLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVA7QUFBL0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFGSixlQUdJO0FBQWtCLGFBQUssRUFBQyxTQUF4QjtBQUFrQyxpQkFBUyxFQUFFLENBQTdDO0FBQWdELGdCQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFMLEVBQVEsQ0FBUjtBQUExRDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUhKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBLG1CQURKO0FBU0gsQ0FWRDs7QUFZZUEsbUVBQWYsRTs7Ozs7Ozs7Ozs7QUMvQ0EsOEM7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsc0M7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsOEM7Ozs7Ozs7Ozs7O0FDQUEsa0Q7Ozs7Ozs7Ozs7O0FDQUEsb0MiLCJmaWxlIjoicGFnZXMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wYWdlcy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEhlbG1ldCB9IGZyb20gXCJyZWFjdC1oZWxtZXRcIlxyXG5cclxuY29uc3QgU2VvID0gKHt0aXRsZSwgZGVzY3JpcHRpb259KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxIZWxtZXRcclxuICAgICAgdGl0bGU9e3RpdGxlfVxyXG4gICAgICBsYW5nPVwiRlJfZnJcIlxyXG4gICAgICBkZXNjcmlwdGlvbj17ZGVzY3JpcHRpb259XHJcbiAgICAgIG1ldGE9e1tcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiBgZGVzY3JpcHRpb25gLFxyXG4gICAgICAgICAgY29udGVudDogZGVzY3JpcHRpb24sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm9wZXJ0eTogYG9nOnRpdGxlYCxcclxuICAgICAgICAgIGNvbnRlbnQ6IHRpdGxlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvcGVydHk6IGBvZzpkZXNjcmlwdGlvbmAsXHJcbiAgICAgICAgICBjb250ZW50OiBkZXNjcmlwdGlvbixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3BlcnR5OiBgb2c6dHlwZWAsXHJcbiAgICAgICAgICBjb250ZW50OiBgd2Vic2l0ZWAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiBgdHdpdHRlcjpjYXJkYCxcclxuICAgICAgICAgIGNvbnRlbnQ6IGBzdW1tYXJ5YCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6IGB0d2l0dGVyOmNyZWF0b3JgLFxyXG4gICAgICAgICAgY29udGVudDogXCJcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6IGB0d2l0dGVyOnRpdGxlYCxcclxuICAgICAgICAgIGNvbnRlbnQ6IHRpdGxlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogYHR3aXR0ZXI6ZGVzY3JpcHRpb25gLFxyXG4gICAgICAgICAgY29udGVudDogZGVzY3JpcHRpb24sXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICAgIH1cclxuICAgIC8+XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VvO1xyXG4iLCJpbXBvcnQgY3JlYXRlIGZyb20gJ3p1c3RhbmQnXHJcblxyXG5jb25zdCB1c2VTdG9yZSA9IGNyZWF0ZSgoc2V0KSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJvdXRlcjoge30sXHJcbiAgICBldmVudHM6IG51bGwsXHJcbiAgICBzZXRFdmVudHM6IChldmVudHMpID0+IHtcclxuICAgICAgc2V0KHsgZXZlbnRzIH0pXHJcbiAgICB9LFxyXG4gIH1cclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZVN0b3JlXHJcbiIsImltcG9ydCBSZWFjdCwge3VzZVJlZn0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxyXG5pbXBvcnQgeyBDYW52YXMsIHVzZUZyYW1lIH0gZnJvbSBcInJlYWN0LXRocmVlLWZpYmVyXCJcclxuaW1wb3J0IFNlbyBmcm9tICcuLi9jb21wb25lbnRzL1Nlby9TZW8nXHJcbmltcG9ydCB1c2VTdG9yZSBmcm9tICcuLi9oZWxwZXJzL3N0b3JlJ1xyXG5pbXBvcnQgVGVzdCBmcm9tIFwiLi4vdGVzdC90ZXN0XCJcclxuXHJcbi8vIGltcG9ydCBDYW52YXMgZnJvbSBcIi4uL2NvbXBvbmVudHMvZXhhbXBsZXMvbGF5b3V0L19jYW52YXNcIlxyXG4vLyBpbXBvcnQgU3BoZXJlIGZyb20gXCIuLi9jb21wb25lbnRzL2V4YW1wbGVzL2NhbnZhcy9TcGhlcmVcIlxyXG5cclxuZnVuY3Rpb24gQm94KHsgcG9zaXRpb24sIGNvbG9yIH0pIHtcclxuICBjb25zdCByZWYgPSB1c2VSZWYoKVxyXG4gIHVzZUZyYW1lKCgpID0+IChyZWYuY3VycmVudC5yb3RhdGlvbi54ID0gcmVmLmN1cnJlbnQucm90YXRpb24ueSArPSAwLjAxKSlcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxtZXNoIHBvc2l0aW9uPXtwb3NpdGlvbn0gcmVmPXtyZWZ9PlxyXG4gICAgICA8Ym94QnVmZmVyR2VvbWV0cnkgYXJncz17WzEsIDEsIDFdfSBhdHRhY2g9XCJnZW9tZXRyeVwiIC8+XHJcbiAgICAgIDxtZXNoUGhvbmdNYXRlcmlhbCBjb2xvcj17Y29sb3J9IGF0dGFjaD1cIm1hdGVyaWFsXCIgLz5cclxuICAgIDwvbWVzaD5cclxuICApXHJcbn1cclxuXHJcblxyXG5jb25zdCBQYWdlID0gKCkgPT4ge1xyXG4gIHVzZVN0b3JlLnNldFN0YXRlKHsgdGl0bGU6ICdTcGhlcmUnIH0pXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxTZW9cclxuICAgICAgICB0aXRsZT1cInJlZ2FyZHMgZCdhcnRpc2Fuc1wiXHJcbiAgICAgICAgZGVzY3JpcHRpb249XCJkZXNjcmlwdGlvbiBkdSBwcm9qZXRcIlxyXG4gICAgICAvPlxyXG4gICAgICA8aDE+SGVsbG8gd29ybGQ8L2gxPlxyXG5cclxuICAgICAgey8qIDxDYW52YXM+XHJcbiAgICAgICAgPFNwaGVyZSAvPlxyXG4gICAgICA8L0NhbnZhcz4gKi99XHJcblxyXG4gICAgICA8VGVzdCAvPlxyXG4gICAgICB7LyogPENhbnZhcz5cclxuICAgICAgICA8Qm94IGNvbG9yPVwiIzE4YTM2ZVwiIHBvc2l0aW9uPXtbLTEsIDAsIDNdfSAvPlxyXG4gICAgICAgIDxCb3ggY29sb3I9XCIjZjU2ZjQyXCIgcG9zaXRpb249e1sxLCAwLCAzXX0gLz5cclxuICAgICAgICA8ZGlyZWN0aW9uYWxMaWdodCBjb2xvcj1cIiNmZmZmZmZcIiBpbnRlbnNpdHk9ezF9IHBvc2l0aW9uPXtbLTEsIDIsIDRdfSAvPlxyXG4gICAgICA8L0NhbnZhcz4gKi99XHJcblxyXG4gICAgPC8+XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYWdlXHJcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXG59O1xuIiwiaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi9zdHlsZXMubW9kdWxlLnNjc3NcIjtcclxuaW1wb3J0IFJlYWN0LCB7dXNlUmVmLCBsYXp5LCBTdXNwZW5zZX0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHsgQ2FudmFzLCB1c2VGcmFtZSwgdXNlTG9hZGVyIH0gZnJvbSBcInJlYWN0LXRocmVlLWZpYmVyXCI7XHJcblxyXG5pbXBvcnQgeyBIdG1sLCB1c2VHTFRGTG9hZGVyLCB1c2VGQlggfSBmcm9tIFwiQHJlYWN0LXRocmVlL2RyZWlcIjtcclxuXHJcbmZ1bmN0aW9uIEJveCh7IHBvc2l0aW9uLCBjb2xvciB9KSB7XHJcbiAgICBjb25zdCByZWYgPSB1c2VSZWYoKVxyXG4gICAgdXNlRnJhbWUoKCkgPT4gKHJlZi5jdXJyZW50LnJvdGF0aW9uLnggPSByZWYuY3VycmVudC5yb3RhdGlvbi55ICs9IDAuMDEpKVxyXG4gIFxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPG1lc2ggcG9zaXRpb249e3Bvc2l0aW9ufSByZWY9e3JlZn0+XHJcbiAgICAgICAgPGJveEJ1ZmZlckdlb21ldHJ5IGFyZ3M9e1sxLCAxLCAxXX0gYXR0YWNoPVwiZ2VvbWV0cnlcIiAvPlxyXG4gICAgICAgIDxtZXNoUGhvbmdNYXRlcmlhbCBjb2xvcj17Y29sb3J9IGF0dGFjaD1cIm1hdGVyaWFsXCIgLz5cclxuICAgICAgPC9tZXNoPlxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgLy8gY29uc3QgTW9kZWwgPSAoKSA9PiB7XHJcbiAgLy8gICBjb25zdCBmYnggPSB1c2VGQlgoXCIvcHVibGljL3RhYmxlX3BsYXRlYXUuZmJ4XCIsIHRydWUpO1xyXG4gICBcclxuICAvLyAgIHJldHVybiA8cHJpbWl0aXZlIG9iamVjdD17ZmJ4LnNjZW5lfSBkaXNwb3NlPXtudWxsfSAvPjtcclxuICAvLyB9XHJcblxyXG4vLyAgIGNvbnN0IE1vZGVsID0gbGF6eSgoKSA9PiBpbXBvcnQoXCIuLi8uLi9wdWJsaWMvdGFibGVfcGxhdGVhdS5mYnhcIikpOyAvLyBcclxuXHJcbi8vICAgZnVuY3Rpb24gQXNzZXQoeyB1cmwgfSkge1xyXG4vLyAgICAgY29uc3QgZmJ4ID0gdXNlTG9hZGVyKEZCWExvYWRlciwgdXJsKVxyXG4vLyAgICAgcmV0dXJuIDxwcmltaXRpdmUgb2JqZWN0PXtmYnh9IGRpc3Bvc2U9e251bGx9IC8+XHJcbi8vIH1cclxuXHJcbi8vIGNvbnN0IE1vZGVsID0gbGF6eSgoKSA9PiBpbXBvcnQoXCIuL3RhYmxlX3BsYXRlYXUuZmJ4XCIpKTsgLy8gaGFzIGltcG9ydHMgZnJvbSB0aHJlZS9qc21cclxuXHJcbiAgXHJcblxyXG5jb25zdCBUZXN0ID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuICggXHJcbiAgICAgICAgPD5cclxuICAgICAgICA8Q2FudmFzPiAgICAgXHJcbiAgICAgICAgICAgIDxCb3ggY29sb3I9XCIjMThhMzZlXCIgcG9zaXRpb249e1stMSwgMCwgM119IC8+XHJcbiAgICAgICAgICAgIDxCb3ggY29sb3I9XCIjZjU2ZjQyXCIgcG9zaXRpb249e1sxLCAwLCAzXX0gLz5cclxuICAgICAgICAgICAgPGRpcmVjdGlvbmFsTGlnaHQgY29sb3I9XCIjZmZmZmZmXCIgaW50ZW5zaXR5PXsxfSBwb3NpdGlvbj17Wy0xLCAyLCA0XX0gLz5cclxuICAgICAgPC9DYW52YXM+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgKTtcclxufVxyXG4gXHJcbmV4cG9ydCBkZWZhdWx0IFRlc3Q7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQHJlYWN0LXRocmVlL2RyZWlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC10aHJlZS1maWJlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwienVzdGFuZFwiKTsiXSwic291cmNlUm9vdCI6IiJ9