"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentDto = exports.AppointmentStatus = void 0;
var class_validator_1 = require("class-validator");
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["SCHEDULED"] = "SCHEDULED";
    AppointmentStatus["COMPLETED"] = "COMPLETED";
    AppointmentStatus["CANCELLED"] = "CANCELLED";
    AppointmentStatus["NO_SHOW"] = "NO_SHOW";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
var CreateAppointmentDto = function () {
    var _a;
    var _patientId_decorators;
    var _patientId_initializers = [];
    var _patientId_extraInitializers = [];
    var _doctorId_decorators;
    var _doctorId_initializers = [];
    var _doctorId_extraInitializers = [];
    var _scheduledAt_decorators;
    var _scheduledAt_initializers = [];
    var _scheduledAt_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _diagnosis_decorators;
    var _diagnosis_initializers = [];
    var _diagnosis_extraInitializers = [];
    var _prescription_decorators;
    var _prescription_initializers = [];
    var _prescription_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateAppointmentDto() {
                this.patientId = __runInitializers(this, _patientId_initializers, void 0);
                this.doctorId = (__runInitializers(this, _patientId_extraInitializers), __runInitializers(this, _doctorId_initializers, void 0));
                this.scheduledAt = (__runInitializers(this, _doctorId_extraInitializers), __runInitializers(this, _scheduledAt_initializers, void 0));
                this.reason = (__runInitializers(this, _scheduledAt_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
                this.status = (__runInitializers(this, _reason_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.notes = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
                this.diagnosis = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _diagnosis_initializers, void 0));
                this.prescription = (__runInitializers(this, _diagnosis_extraInitializers), __runInitializers(this, _prescription_initializers, void 0));
                __runInitializers(this, _prescription_extraInitializers);
            }
            return CreateAppointmentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _patientId_decorators = [(0, class_validator_1.IsInt)(), (0, class_validator_1.IsNotEmpty)()];
            _doctorId_decorators = [(0, class_validator_1.IsInt)(), (0, class_validator_1.IsNotEmpty)()];
            _scheduledAt_decorators = [(0, class_validator_1.IsDateString)({}, { message: 'Fecha/hora de cita inválida' }), (0, class_validator_1.IsNotEmpty)()];
            _reason_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: 'El motivo de consulta es requerido' })];
            _status_decorators = [(0, class_validator_1.IsEnum)(AppointmentStatus, { message: 'Estado inválido' }), (0, class_validator_1.IsOptional)()];
            _notes_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _diagnosis_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _prescription_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _patientId_decorators, { kind: "field", name: "patientId", static: false, private: false, access: { has: function (obj) { return "patientId" in obj; }, get: function (obj) { return obj.patientId; }, set: function (obj, value) { obj.patientId = value; } }, metadata: _metadata }, _patientId_initializers, _patientId_extraInitializers);
            __esDecorate(null, null, _doctorId_decorators, { kind: "field", name: "doctorId", static: false, private: false, access: { has: function (obj) { return "doctorId" in obj; }, get: function (obj) { return obj.doctorId; }, set: function (obj, value) { obj.doctorId = value; } }, metadata: _metadata }, _doctorId_initializers, _doctorId_extraInitializers);
            __esDecorate(null, null, _scheduledAt_decorators, { kind: "field", name: "scheduledAt", static: false, private: false, access: { has: function (obj) { return "scheduledAt" in obj; }, get: function (obj) { return obj.scheduledAt; }, set: function (obj, value) { obj.scheduledAt = value; } }, metadata: _metadata }, _scheduledAt_initializers, _scheduledAt_extraInitializers);
            __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            __esDecorate(null, null, _diagnosis_decorators, { kind: "field", name: "diagnosis", static: false, private: false, access: { has: function (obj) { return "diagnosis" in obj; }, get: function (obj) { return obj.diagnosis; }, set: function (obj, value) { obj.diagnosis = value; } }, metadata: _metadata }, _diagnosis_initializers, _diagnosis_extraInitializers);
            __esDecorate(null, null, _prescription_decorators, { kind: "field", name: "prescription", static: false, private: false, access: { has: function (obj) { return "prescription" in obj; }, get: function (obj) { return obj.prescription; }, set: function (obj, value) { obj.prescription = value; } }, metadata: _metadata }, _prescription_initializers, _prescription_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateAppointmentDto = CreateAppointmentDto;
