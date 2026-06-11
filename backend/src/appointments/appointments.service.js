"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
var common_1 = require("@nestjs/common");
var AppointmentsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppointmentsService = _classThis = /** @class */ (function () {
        function AppointmentsService_1(prisma, audit) {
            this.prisma = prisma;
            this.audit = audit;
        }
        AppointmentsService_1.prototype.create = function (dto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var appt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.appointment.create({
                                data: __assign(__assign({}, dto), { scheduledAt: new Date(dto.scheduledAt), status: dto.status || 'SCHEDULED' }),
                                include: {
                                    patient: { select: { id: true, firstName: true, lastName: true, ci: true } },
                                    doctor: { select: { id: true, name: true, email: true } },
                                },
                            })];
                        case 1:
                            appt = _a.sent();
                            return [4 /*yield*/, this.audit.log(userId, 'APPOINTMENT_CREATED', 'Appointment', appt.id, "".concat(appt.patient.firstName, " ").concat(appt.patient.lastName, " \u2014 Dr. ").concat(appt.doctor.name))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, appt];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.findAll = function (filters) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    where = { deletedAt: null };
                    if (filters === null || filters === void 0 ? void 0 : filters.patientId)
                        where.patientId = filters.patientId;
                    if (filters === null || filters === void 0 ? void 0 : filters.doctorId)
                        where.doctorId = filters.doctorId;
                    if (filters === null || filters === void 0 ? void 0 : filters.status)
                        where.status = filters.status;
                    if ((filters === null || filters === void 0 ? void 0 : filters.from) || (filters === null || filters === void 0 ? void 0 : filters.to)) {
                        where.scheduledAt = {};
                        if (filters.from)
                            where.scheduledAt.gte = new Date(filters.from);
                        if (filters.to)
                            where.scheduledAt.lte = new Date(filters.to);
                    }
                    return [2 /*return*/, this.prisma.appointment.findMany({
                            where: where,
                            include: {
                                patient: { select: { id: true, firstName: true, lastName: true, ci: true } },
                                doctor: { select: { id: true, name: true } },
                            },
                            orderBy: { scheduledAt: 'desc' },
                        })];
                });
            });
        };
        AppointmentsService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var appt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.appointment.findFirst({
                                where: { id: id, deletedAt: null },
                                include: {
                                    patient: true,
                                    doctor: { select: { id: true, name: true, email: true, role: true } },
                                },
                            })];
                        case 1:
                            appt = _a.sent();
                            if (!appt)
                                throw new common_1.NotFoundException('Cita no encontrada');
                            return [2 /*return*/, appt];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.update = function (id, dto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var rawDto, updated, action;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            _a.sent();
                            rawDto = dto;
                            return [4 /*yield*/, this.prisma.appointment.update({
                                    where: { id: id },
                                    data: __assign(__assign({}, dto), (rawDto.scheduledAt ? { scheduledAt: new Date(rawDto.scheduledAt) } : {})),
                                    include: {
                                        patient: { select: { id: true, firstName: true, lastName: true } },
                                        doctor: { select: { id: true, name: true } },
                                    },
                                })];
                        case 2:
                            updated = _a.sent();
                            action = dto.status === 'CANCELLED' ? 'APPOINTMENT_CANCELLED' : 'APPOINTMENT_UPDATED';
                            return [4 /*yield*/, this.audit.log(userId, action, 'Appointment', id, "".concat(updated.patient.firstName, " ").concat(updated.patient.lastName, " \u2014 Dr. ").concat(updated.doctor.name))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.remove = function (id, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var appt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            appt = _a.sent();
                            return [4 /*yield*/, this.prisma.appointment.update({
                                    where: { id: id },
                                    data: { deletedAt: new Date() },
                                })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.audit.log(userId, 'APPOINTMENT_DELETED', 'Appointment', id, "".concat(appt.patient.firstName, " ").concat(appt.patient.lastName))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { message: 'Cita eliminada correctamente' }];
                    }
                });
            });
        };
        /** Summary counts for the dashboard */
        AppointmentsService_1.prototype.getDashboardStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var today, startOfDay, endOfDay, _a, total, todayCount, completed, cancelled, totalPatients, allAppointments, now, citasPorMes, _loop_1, i, doctorMap, _i, allAppointments_1, a, topDoctores;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            today = new Date();
                            startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                            endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.appointment.count({ where: { deletedAt: null } }),
                                    this.prisma.appointment.count({
                                        where: { deletedAt: null, scheduledAt: { gte: startOfDay, lt: endOfDay } },
                                    }),
                                    this.prisma.appointment.count({ where: { deletedAt: null, status: 'COMPLETED' } }),
                                    this.prisma.appointment.count({ where: { deletedAt: null, status: 'CANCELLED' } }),
                                    this.prisma.patient.count({ where: { deletedAt: null } }),
                                    this.prisma.appointment.findMany({
                                        where: { deletedAt: null },
                                        select: {
                                            scheduledAt: true,
                                            doctorId: true,
                                            doctor: { select: { name: true } },
                                        },
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), total = _a[0], todayCount = _a[1], completed = _a[2], cancelled = _a[3], totalPatients = _a[4], allAppointments = _a[5];
                            now = new Date();
                            citasPorMes = [];
                            _loop_1 = function (i) {
                                var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                                var nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
                                var monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                                var count = allAppointments.filter(function (a) {
                                    var dt = new Date(a.scheduledAt);
                                    return dt >= d && dt < nextMonth;
                                }).length;
                                citasPorMes.push({ mes: monthNames[d.getMonth()], total: count });
                            };
                            for (i = 5; i >= 0; i--) {
                                _loop_1(i);
                            }
                            doctorMap = new Map();
                            for (_i = 0, allAppointments_1 = allAppointments; _i < allAppointments_1.length; _i++) {
                                a = allAppointments_1[_i];
                                if (!doctorMap.has(a.doctorId)) {
                                    doctorMap.set(a.doctorId, { name: a.doctor.name, count: 0 });
                                }
                                doctorMap.get(a.doctorId).count++;
                            }
                            topDoctores = __spreadArray([], doctorMap.values(), true).sort(function (a, b) { return b.count - a.count; })
                                .slice(0, 5)
                                .map(function (d) { return ({ name: d.name, citas: d.count }); });
                            return [2 /*return*/, { total: total, todayCount: todayCount, completed: completed, cancelled: cancelled, totalPatients: totalPatients, citasPorMes: citasPorMes, topDoctores: topDoctores }];
                    }
                });
            });
        };
        return AppointmentsService_1;
    }());
    __setFunctionName(_classThis, "AppointmentsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppointmentsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppointmentsService = _classThis;
}();
exports.AppointmentsService = AppointmentsService;
