"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
require("./index.css");
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var App_1 = __importDefault(require("./App"));
var rootReducer_1 = __importDefault(require("./redux/rootReducer"));
var store = redux_1.createStore(rootReducer_1.default, redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: store },
    react_1.default.createElement(App_1.default, null)), document.getElementById('root'));
