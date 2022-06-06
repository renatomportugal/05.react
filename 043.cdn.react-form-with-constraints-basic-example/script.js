//import * as React from 'react';
//import * as ReactDOM from 'react-dom';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
//import { FormWithConstraints, FieldFeedbacks, Async, FieldFeedback } from 'react-form-with-constraints';
//import { DisplayFields } from 'react-form-with-constraints-tools';
var FormWithConstraints = ReactFormWithConstraints.FormWithConstraints, FieldFeedbacks = ReactFormWithConstraints.FieldFeedbacks, Async = ReactFormWithConstraints.Async, FieldFeedback = ReactFormWithConstraints.FieldFeedback;
var DisplayFields = ReactFormWithConstraintsTools.DisplayFields;
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
// See https://en.wikipedia.org/wiki/List_of_the_most_common_passwords
var isACommonPassword = function (password) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('checkPasswordHasBeenUsed');
                return [4 /*yield*/, sleep(1000)];
            case 1:
                _a.sent();
                return [2 /*return*/, [
                        '123456',
                        'password',
                        '12345678',
                        'qwerty',
                        '12345',
                        '123456789',
                        'letmein',
                        '1234567',
                        'football',
                        'iloveyou',
                        'admin',
                        'welcome',
                        'monkey',
                        'login',
                        'abc123'
                    ].includes(password.toLowerCase())];
        }
    });
}); };
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.form = null;
        _this.password = null;
        _this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            signUpButtonDisabled: false
        };
        _this.handleChange = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var target, fields, fieldIsValid, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        target = e.target;
                        // FIXME See Computed property key names should not be widened https://github.com/Microsoft/TypeScript/issues/13948
                        // @ts-ignore
                        this.setState((_a = {},
                            _a[target.name] = target.value,
                            _a));
                        return [4 /*yield*/, this.form.validateFields(target)];
                    case 1:
                        fields = _b.sent();
                        fieldIsValid = fields.every(function (fieldFeedbacksValidation) { return fieldFeedbacksValidation.isValid(); });
                        if (fieldIsValid)
                            console.log("Field '" + target.name + "' is valid");
                        else
                            console.log("Field '" + target.name + "' is invalid");
                        if (this.form.isValid())
                            console.log('The form is valid');
                        else
                            console.log('The form is invalid');
                        this.setState({ signUpButtonDisabled: !this.form.isValid() });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.handlePasswordChange = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var target, fields, fieldsAreValid, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        target = e.target;
                        // FIXME See Computed property key names should not be widened https://github.com/Microsoft/TypeScript/issues/13948
                        // @ts-ignore
                        this.setState((_a = {},
                            _a[target.name] = target.value,
                            _a));
                        return [4 /*yield*/, this.form.validateFields(target, 'passwordConfirm')];
                    case 1:
                        fields = _b.sent();
                        fieldsAreValid = fields.every(function (field) { return field.isValid(); });
                        if (fieldsAreValid)
                            console.log("Fields '" + target.name + "' and 'passwordConfirm' are valid");
                        else
                            console.log("Fields '" + target.name + "' and/or 'passwordConfirm' are invalid");
                        if (this.form.isValid())
                            console.log('The form is valid');
                        else
                            console.log('The form is invalid');
                        this.setState({ signUpButtonDisabled: !this.form.isValid() });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var fields, formIsValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        return [4 /*yield*/, this.form.validateForm()];
                    case 1:
                        fields = _a.sent();
                        formIsValid = fields.every(function (field) { return field.isValid(); });
                        if (formIsValid)
                            console.log('The form is valid');
                        else
                            console.log('The form is invalid');
                        this.setState({ signUpButtonDisabled: !formIsValid });
                        if (formIsValid) {
                            alert("Valid form\n\nthis.state =\n" + JSON.stringify(this.state, null, 2));
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    Form.prototype.render = function () {
        var _this = this;
        return (React.createElement(FormWithConstraints, { ref: function (formWithConstraints) { return _this.form = formWithConstraints; }, onSubmit: this.handleSubmit, noValidate: true },
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "username" }, "Username"),
                React.createElement("input", { type: "email", name: "username", id: "username", value: this.state.username, onChange: this.handleChange, required: true, minLength: 5 }),
                React.createElement(FieldFeedbacks, { "for": "username" },
                    React.createElement(FieldFeedback, { when: "tooShort" }, "Too short"),
                    React.createElement(FieldFeedback, { when: "*" }),
                    React.createElement(FieldFeedback, { when: "valid" }, "Looks good!"))),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "password" },
                    "Password ",
                    React.createElement("small", null, "(common passwords: 123456, password, 12345678, qwerty...)")),
                React.createElement("input", { type: "password", name: "password", id: "password", ref: function (password) { return _this.password = password; }, value: this.state.password, onChange: this.handlePasswordChange, required: true, pattern: ".{5,}" }),
                React.createElement(FieldFeedbacks, { "for": "password" },
                    React.createElement(FieldFeedback, { when: "valueMissing" }),
                    React.createElement(FieldFeedback, { when: "patternMismatch" }, "Should be at least 5 characters long"),
                    React.createElement(FieldFeedback, { when: function (value) { return !/\d/.test(value); }, warning: true }, "Should contain numbers"),
                    React.createElement(FieldFeedback, { when: function (value) { return !/[a-z]/.test(value); }, warning: true }, "Should contain small letters"),
                    React.createElement(FieldFeedback, { when: function (value) { return !/[A-Z]/.test(value); }, warning: true }, "Should contain capital letters"),
                    React.createElement(FieldFeedback, { when: function (value) { return !/\W/.test(value); }, warning: true }, "Should contain special characters"),
                    React.createElement(Async, { promise: isACommonPassword, pending: React.createElement("span", { style: { display: 'block' } }, "..."), then: function (commonPassword) { return commonPassword ?
                            React.createElement(FieldFeedback, { warning: true }, "This password is very common") : null; } }),
                    React.createElement(FieldFeedback, { when: "valid" }, "Looks good!"))),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "password-confirm" }, "Confirm Password"),
                React.createElement("input", { type: "password", name: "passwordConfirm", id: "password-confirm", value: this.state.passwordConfirm, onChange: this.handleChange }),
                React.createElement(FieldFeedbacks, { "for": "passwordConfirm" },
                    React.createElement(FieldFeedback, { when: function (value) { return value !== _this.password.value; } }, "Not the same password"))),
            React.createElement("button", { disabled: this.state.signUpButtonDisabled }, "Sign Up"),
            React.createElement(DisplayFields, null)));
    };
    return Form;
}(React.Component));
ReactDOM.render(React.createElement(Form, null), document.getElementById('app'));