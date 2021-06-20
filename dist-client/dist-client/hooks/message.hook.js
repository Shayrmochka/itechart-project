"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useMessage = function () {
    return react_1.useCallback(function (text) {
        if (text) {
            alert(text);
        }
    }, []);
};
exports.default = useMessage;
