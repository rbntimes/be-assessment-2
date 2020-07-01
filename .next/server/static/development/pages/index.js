module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Endless.js":
/*!*******************************!*\
  !*** ./components/Endless.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _jsxFileName = \"/Users/n86ies/Documents/endless/components/Endless.js\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\nfunction Endless() {\n  return __jsx(\"svg\", {\n    width: \"300px\",\n    height: \"200px\",\n    viewBox: \"0 0 187.3 93.7\",\n    preserveAspectRatio: \"xMidYMid meet\",\n    style: {\n      left: '50%',\n      top: '50%',\n      position: 'absolute',\n      transform: 'translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0)'\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 3,\n      columnNumber: 5\n    }\n  }, __jsx(\"path\", {\n    stroke: \"#ededed\",\n    id: \"outline\",\n    fill: \"none\",\n    \"stroke-width\": \"4\",\n    \"stroke-linecap\": \"round\",\n    \"stroke-linejoin\": \"round\",\n    \"stroke-miterlimit\": \"10\",\n    d: \"M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 \\t\\t\\t\\tc-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 15,\n      columnNumber: 7\n    }\n  }), __jsx(\"path\", {\n    id: \"outline-bg\",\n    opacity: \"0.05\",\n    fill: \"none\",\n    stroke: \"#ededed\",\n    \"stroke-width\": \"4\",\n    \"stroke-linecap\": \"round\",\n    \"stroke-linejoin\": \"round\",\n    \"stroke-miterlimit\": \"10\",\n    d: \"M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 \\t\\t\\t\\tc-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 25,\n      columnNumber: 7\n    }\n  }));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Endless);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0VuZGxlc3MuanM/MWRmYSJdLCJuYW1lcyI6WyJFbmRsZXNzIiwibGVmdCIsInRvcCIsInBvc2l0aW9uIiwidHJhbnNmb3JtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsU0FBU0EsT0FBVCxHQUFtQjtBQUNqQixTQUNFO0FBQ0UsU0FBSyxFQUFDLE9BRFI7QUFFRSxVQUFNLEVBQUMsT0FGVDtBQUdFLFdBQU8sRUFBQyxnQkFIVjtBQUlFLHVCQUFtQixFQUFDLGVBSnRCO0FBS0UsU0FBSyxFQUFFO0FBQ0xDLFVBQUksRUFBRSxLQUREO0FBRUxDLFNBQUcsRUFBRSxLQUZBO0FBR0xDLGNBQVEsRUFBRSxVQUhMO0FBSUxDLGVBQVMsRUFBRTtBQUpOLEtBTFQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQVlFO0FBQ0UsVUFBTSxFQUFDLFNBRFQ7QUFFRSxNQUFFLEVBQUMsU0FGTDtBQUdFLFFBQUksRUFBQyxNQUhQO0FBSUUsb0JBQWEsR0FKZjtBQUtFLHNCQUFlLE9BTGpCO0FBTUUsdUJBQWdCLE9BTmxCO0FBT0UseUJBQWtCLElBUHBCO0FBUUUsS0FBQyxFQUFDLDZNQVJKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFaRixFQXNCRTtBQUNFLE1BQUUsRUFBQyxZQURMO0FBRUUsV0FBTyxFQUFDLE1BRlY7QUFHRSxRQUFJLEVBQUMsTUFIUDtBQUlFLFVBQU0sRUFBQyxTQUpUO0FBS0Usb0JBQWEsR0FMZjtBQU1FLHNCQUFlLE9BTmpCO0FBT0UsdUJBQWdCLE9BUGxCO0FBUUUseUJBQWtCLElBUnBCO0FBU0UsS0FBQyxFQUFDLDZNQVRKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUF0QkYsQ0FERjtBQW9DRDs7QUFFY0osc0VBQWYiLCJmaWxlIjoiLi9jb21wb25lbnRzL0VuZGxlc3MuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBFbmRsZXNzKCkge1xuICByZXR1cm4gKFxuICAgIDxzdmdcbiAgICAgIHdpZHRoPVwiMzAwcHhcIlxuICAgICAgaGVpZ2h0PVwiMjAwcHhcIlxuICAgICAgdmlld0JveD1cIjAgMCAxODcuMyA5My43XCJcbiAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1pZCBtZWV0XCJcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgICB0b3A6ICc1MCUnLFxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKC01MCUsIC01MCUpIG1hdHJpeCgxLCAwLCAwLCAxLCAwLCAwKScsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxwYXRoXG4gICAgICAgIHN0cm9rZT1cIiNlZGVkZWRcIlxuICAgICAgICBpZD1cIm91dGxpbmVcIlxuICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgIHN0cm9rZS13aWR0aD1cIjRcIlxuICAgICAgICBzdHJva2UtbGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCJcbiAgICAgICAgZD1cIk05My45LDQ2LjRjOS4zLDkuNSwxMy44LDE3LjksMjMuNSwxNy45czE3LjUtNy44LDE3LjUtMTcuNXMtNy44LTE3LjYtMTcuNS0xNy41Yy05LjcsMC4xLTEzLjMsNy4yLTIyLjEsMTcuMSBcdFx0XHRcdGMtOC45LDguOC0xNS43LDE3LjktMjUuNCwxNy45cy0xNy41LTcuOC0xNy41LTE3LjVzNy44LTE3LjUsMTcuNS0xNy41Uzg2LjIsMzguNiw5My45LDQ2LjR6XCJcbiAgICAgIC8+XG4gICAgICA8cGF0aFxuICAgICAgICBpZD1cIm91dGxpbmUtYmdcIlxuICAgICAgICBvcGFjaXR5PVwiMC4wNVwiXG4gICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgc3Ryb2tlPVwiI2VkZWRlZFwiXG4gICAgICAgIHN0cm9rZS13aWR0aD1cIjRcIlxuICAgICAgICBzdHJva2UtbGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCJcbiAgICAgICAgZD1cIk05My45LDQ2LjRjOS4zLDkuNSwxMy44LDE3LjksMjMuNSwxNy45czE3LjUtNy44LDE3LjUtMTcuNXMtNy44LTE3LjYtMTcuNS0xNy41Yy05LjcsMC4xLTEzLjMsNy4yLTIyLjEsMTcuMSBcdFx0XHRcdGMtOC45LDguOC0xNS43LDE3LjktMjUuNCwxNy45cy0xNy41LTcuOC0xNy41LTE3LjVzNy44LTE3LjUsMTcuNS0xNy41Uzg2LjIsMzguNiw5My45LDQ2LjR6XCJcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVuZGxlc3M7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/Endless.js\n");

/***/ }),

/***/ "./components/List.js":
/*!****************************!*\
  !*** ./components/List.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _jsxFileName = \"/Users/n86ies/Documents/endless/components/List.js\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\nfunction List({\n  users\n}) {\n  return __jsx(\"ul\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 3,\n      columnNumber: 5\n    }\n  }, users.map(user => __jsx(\"li\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 5,\n      columnNumber: 9\n    }\n  }, __jsx(\"a\", {\n    href: `/user/${user._id}`,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 6,\n      columnNumber: 11\n    }\n  }, __jsx(\"h3\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 7,\n      columnNumber: 13\n    }\n  }, user.name, \", \", user.age)))));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (List); // <div class=\"status\">\n//   <span>\n//     <% if (data[index].match === true) { %>\n//       <a href=\"/users/<%= data[index].id %>/<%= data[index].match === true ? 'match' : 'questions' %>\">\n//         Open chat\n//       </a>\n//       ❤️ ✍️\n//     <% } else { %>\n//       <%= data[index].unlocked && data[index].completed === true ? \"Waiting ⭐️\" : '' %>\n//       <%= !data[index].unlocked && data[index].completed === true ? \"Failed 🚫\" : '' %>\n//     <% } %>\n//   </span>\n//   <h3> <%= index + 1 %></h3>\n// </div>\n// </div>\n// <p class=meta>\n// <span><%= data[index].matchPercentage %>% match!</span>\n// <span><%= data[index].distance %> kilometer</span>\n// </p>//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0xpc3QuanM/MGQ2YyJdLCJuYW1lcyI6WyJMaXN0IiwidXNlcnMiLCJtYXAiLCJ1c2VyIiwiX2lkIiwibmFtZSIsImFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLFNBQVNBLElBQVQsQ0FBYztBQUFFQztBQUFGLENBQWQsRUFBeUI7QUFDdkIsU0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0dBLEtBQUssQ0FBQ0MsR0FBTixDQUFXQyxJQUFELElBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUcsUUFBSSxFQUFHLFNBQVFBLElBQUksQ0FBQ0MsR0FBSSxFQUEzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHRCxJQUFJLENBQUNFLElBRFIsUUFDZ0JGLElBQUksQ0FBQ0csR0FEckIsQ0FERixDQURGLENBREQsQ0FESCxDQURGO0FBYUQ7O0FBRWNOLG1FQUFmLEUsQ0FFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL2NvbXBvbmVudHMvTGlzdC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIExpc3QoeyB1c2VycyB9KSB7XG4gIHJldHVybiAoXG4gICAgPHVsPlxuICAgICAge3VzZXJzLm1hcCgodXNlcikgPT4gKFxuICAgICAgICA8bGk+XG4gICAgICAgICAgPGEgaHJlZj17YC91c2VyLyR7dXNlci5faWR9YH0+XG4gICAgICAgICAgICA8aDM+XG4gICAgICAgICAgICAgIHt1c2VyLm5hbWV9LCB7dXNlci5hZ2V9XG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgICkpfVxuICAgIDwvdWw+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpc3Q7XG5cbi8vIDxkaXYgY2xhc3M9XCJzdGF0dXNcIj5cbi8vICAgPHNwYW4+XG4vLyAgICAgPCUgaWYgKGRhdGFbaW5kZXhdLm1hdGNoID09PSB0cnVlKSB7ICU+XG4vLyAgICAgICA8YSBocmVmPVwiL3VzZXJzLzwlPSBkYXRhW2luZGV4XS5pZCAlPi88JT0gZGF0YVtpbmRleF0ubWF0Y2ggPT09IHRydWUgPyAnbWF0Y2gnIDogJ3F1ZXN0aW9ucycgJT5cIj5cbi8vICAgICAgICAgT3BlbiBjaGF0XG4vLyAgICAgICA8L2E+XG4vLyAgICAgICDinaTvuI8g4pyN77iPXG4vLyAgICAgPCUgfSBlbHNlIHsgJT5cbi8vICAgICAgIDwlPSBkYXRhW2luZGV4XS51bmxvY2tlZCAmJiBkYXRhW2luZGV4XS5jb21wbGV0ZWQgPT09IHRydWUgPyBcIldhaXRpbmcg4q2Q77iPXCIgOiAnJyAlPlxuLy8gICAgICAgPCU9ICFkYXRhW2luZGV4XS51bmxvY2tlZCAmJiBkYXRhW2luZGV4XS5jb21wbGV0ZWQgPT09IHRydWUgPyBcIkZhaWxlZCDwn5qrXCIgOiAnJyAlPlxuLy8gICAgIDwlIH0gJT5cbi8vICAgPC9zcGFuPlxuLy8gICA8aDM+IDwlPSBpbmRleCArIDEgJT48L2gzPlxuLy8gPC9kaXY+XG4vLyA8L2Rpdj5cbi8vIDxwIGNsYXNzPW1ldGE+XG4vLyA8c3Bhbj48JT0gZGF0YVtpbmRleF0ubWF0Y2hQZXJjZW50YWdlICU+JSBtYXRjaCE8L3NwYW4+XG4vLyA8c3Bhbj48JT0gZGF0YVtpbmRleF0uZGlzdGFuY2UgJT4ga2lsb21ldGVyPC9zcGFuPlxuLy8gPC9wPlxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/List.js\n");

/***/ }),

/***/ "./lib/fetch.js":
/*!**********************!*\
  !*** ./lib/fetch.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return fetcher; });\nfunction fetcher(url) {\n  return fetch(url).then(r => r.json());\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWIvZmV0Y2guanM/MjE2OSJdLCJuYW1lcyI6WyJmZXRjaGVyIiwidXJsIiwiZmV0Y2giLCJ0aGVuIiwiciIsImpzb24iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBZSxTQUFTQSxPQUFULENBQWlCQyxHQUFqQixFQUFzQjtBQUFFLFNBQU9DLEtBQUssQ0FBQ0QsR0FBRCxDQUFMLENBQVdFLElBQVgsQ0FBaUJDLENBQUQsSUFBT0EsQ0FBQyxDQUFDQyxJQUFGLEVBQXZCLENBQVA7QUFBMEMiLCJmaWxlIjoiLi9saWIvZmV0Y2guanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmZXRjaGVyKHVybCkgeyByZXR1cm4gZmV0Y2godXJsKS50aGVuKChyKSA9PiByLmpzb24oKSk7IH1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./lib/fetch.js\n");

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swr */ \"swr\");\n/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(swr__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Endless__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Endless */ \"./components/Endless.js\");\n/* harmony import */ var _components_List__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/List */ \"./components/List.js\");\n/* harmony import */ var _lib_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/fetch */ \"./lib/fetch.js\");\nvar _jsxFileName = \"/Users/n86ies/Documents/endless/pages/index.js\";\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\n\n\n\nfunction Home() {\n  const {\n    data,\n    error\n  } = swr__WEBPACK_IMPORTED_MODULE_1___default()('/api/list', _lib_fetch__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n\n  if (error) {\n    return __jsx(\"span\", {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 11,\n        columnNumber: 12\n      }\n    }, \"Error\");\n  }\n\n  if (!data) {\n    return __jsx(_components_Endless__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 15,\n        columnNumber: 12\n      }\n    });\n  }\n\n  return __jsx(\"div\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 19,\n      columnNumber: 5\n    }\n  }, __jsx(\"img\", {\n    alt: \"Map met voorkeuren\",\n    src: data.map,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 20,\n      columnNumber: 7\n    }\n  }), __jsx(_components_List__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    users: data.results,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 21,\n      columnNumber: 7\n    }\n  }));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qcz80NGQ4Il0sIm5hbWVzIjpbIkhvbWUiLCJkYXRhIiwiZXJyb3IiLCJ1c2VTV1IiLCJmZXRjaGVyIiwibWFwIiwicmVzdWx0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsSUFBVCxHQUFnQjtBQUNkLFFBQU07QUFBRUMsUUFBRjtBQUFRQztBQUFSLE1BQWtCQywwQ0FBTSxDQUFDLFdBQUQsRUFBY0Msa0RBQWQsQ0FBOUI7O0FBRUEsTUFBSUYsS0FBSixFQUFXO0FBQ1QsV0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQVA7QUFDRDs7QUFFRCxNQUFJLENBQUNELElBQUwsRUFBVztBQUNULFdBQU8sTUFBQywyREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQVA7QUFDRDs7QUFFRCxTQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLE9BQUcsRUFBQyxvQkFBVDtBQUE4QixPQUFHLEVBQUVBLElBQUksQ0FBQ0ksR0FBeEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURGLEVBRUUsTUFBQyx3REFBRDtBQUFNLFNBQUssRUFBRUosSUFBSSxDQUFDSyxPQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBRkYsQ0FERjtBQU1EOztBQUVjTixtRUFBZiIsImZpbGUiOiIuL3BhZ2VzL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB1c2VTV1IgZnJvbSAnc3dyJztcbmltcG9ydCBFbmRsZXNzIGZyb20gJy4uL2NvbXBvbmVudHMvRW5kbGVzcyc7XG5pbXBvcnQgTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL0xpc3QnO1xuaW1wb3J0IGZldGNoZXIgZnJvbSAnLi4vbGliL2ZldGNoJztcblxuZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gdXNlU1dSKCcvYXBpL2xpc3QnLCBmZXRjaGVyKTtcblxuICBpZiAoZXJyb3IpIHtcbiAgICByZXR1cm4gPHNwYW4+RXJyb3I8L3NwYW4+O1xuICB9XG5cbiAgaWYgKCFkYXRhKSB7XG4gICAgcmV0dXJuIDxFbmRsZXNzIC8+O1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGltZyBhbHQ9XCJNYXAgbWV0IHZvb3JrZXVyZW5cIiBzcmM9e2RhdGEubWFwfSAvPlxuICAgICAgPExpc3QgdXNlcnM9e2RhdGEucmVzdWx0c30gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9tZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ 7:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/n86ies/Documents/endless/pages/index.js */"./pages/index.js");


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "swr":
/*!**********************!*\
  !*** external "swr" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"swr\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzd3JcIj9jMjg5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InN3ci5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN3clwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///swr\n");

/***/ })

/******/ });