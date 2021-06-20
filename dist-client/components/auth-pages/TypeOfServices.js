"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var FormGroup_1 = __importDefault(require("@material-ui/core/FormGroup"));
var FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
var Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
function TypeOfServices(_a) {
    var handleChangeServices = _a.handleChangeServices, services = _a.services;
    return (react_1.default.createElement(FormGroup_1.default, null, services.map(function (service) { return (react_1.default.createElement(FormControlLabel_1.default, { key: service._id, control: (react_1.default.createElement(Checkbox_1.default, { checked: service.checked, onChange: function () { return handleChangeServices(service); }, name: service.typeOfService })), label: service.serviceName })); })));
}
exports.default = TypeOfServices;
TypeOfServices.propTypes = {
    handleChangeServices: prop_types_1.default.func.isRequired,
    services: prop_types_1.default.arrayOf(prop_types_1.default.shape({
        _id: prop_types_1.default.string,
        checked: prop_types_1.default.bool,
        typeOfService: prop_types_1.default.string,
        serviceName: prop_types_1.default.string,
    }).isRequired).isRequired,
};
