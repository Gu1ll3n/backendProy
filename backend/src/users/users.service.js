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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcryptjs");
var UsersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersService = _classThis = /** @class */ (function () {
        function UsersService_1(prisma, audit) {
            this.prisma = prisma;
            this.audit = audit;
        }
        /**
         * Evaluates password strength:
         * - weak: < 8 chars or only letters/numbers
         * - medium: >= 8 chars with letters + numbers
         * - strong: >= 10 chars with uppercase, lowercase, numbers, and special chars
         */
        UsersService_1.prototype.evaluatePasswordStrength = function (password) {
            if (password.length < 6)
                return 'weak';
            var hasUpper = /[A-Z]/.test(password);
            var hasLower = /[a-z]/.test(password);
            var hasNumber = /[0-9]/.test(password);
            var hasSpecial = /[^A-Za-z0-9]/.test(password);
            if (password.length >= 10 &&
                hasUpper &&
                hasLower &&
                hasNumber &&
                hasSpecial) {
                return 'strong';
            }
            if (password.length >= 8 &&
                ((hasUpper && hasNumber) || (hasLower && hasNumber))) {
                return 'medium';
            }
            return 'weak';
        };
        UsersService_1.prototype.create = function (dto, requestingUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, passwordHash, strength, user, _, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { email: dto.email },
                            })];
                        case 1:
                            existing = _a.sent();
                            if (existing)
                                throw new common_1.ConflictException('El email ya está registrado');
                            return [4 /*yield*/, bcrypt.hash(dto.password, 10)];
                        case 2:
                            passwordHash = _a.sent();
                            strength = this.evaluatePasswordStrength(dto.password);
                            return [4 /*yield*/, this.prisma.user.create({
                                    data: {
                                        email: dto.email,
                                        name: dto.name,
                                        password: passwordHash,
                                        role: dto.role,
                                    },
                                })];
                        case 3:
                            user = _a.sent();
                            return [4 /*yield*/, this.audit.log(requestingUserId, 'USER_CREATED', 'User', user.id, "".concat(user.name, " (").concat(user.email, ") \u2014 Rol: ").concat(user.role))];
                        case 4:
                            _a.sent();
                            _ = user.password, result = __rest(user, ["password"]);
                            return [2 /*return*/, __assign(__assign({}, result), { passwordStrength: strength })];
                    }
                });
            });
        };
        UsersService_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.user.findMany({
                            select: {
                                id: true,
                                email: true,
                                name: true,
                                role: true,
                                createdAt: true,
                            },
                        })];
                });
            });
        };
        UsersService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var user, _, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: id } })];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.NotFoundException('Usuario no encontrado');
                            _ = user.password, result = __rest(user, ["password"]);
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        UsersService_1.prototype.findByEmail = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.user.findUnique({ where: { email: email } })];
                });
            });
        };
        UsersService_1.prototype.update = function (id, dto, requestingUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, emailTaken, data, roleChanged, _a, updated, _, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: id } })];
                        case 1:
                            existing = _b.sent();
                            if (!existing)
                                throw new common_1.NotFoundException('Usuario no encontrado');
                            if (!(dto.email && dto.email !== existing.email)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { email: dto.email },
                                })];
                        case 2:
                            emailTaken = _b.sent();
                            if (emailTaken)
                                throw new common_1.ConflictException('El email ya está en uso');
                            _b.label = 3;
                        case 3:
                            data = {};
                            if (dto.name !== undefined)
                                data.name = dto.name;
                            if (dto.email !== undefined)
                                data.email = dto.email;
                            if (dto.isActive !== undefined)
                                data.isActive = dto.isActive;
                            roleChanged = dto.role && dto.role !== existing.role;
                            if (dto.role !== undefined)
                                data.role = dto.role;
                            if (!dto.password) return [3 /*break*/, 5];
                            _a = data;
                            return [4 /*yield*/, bcrypt.hash(dto.password, 10)];
                        case 4:
                            _a.password = _b.sent();
                            _b.label = 5;
                        case 5: return [4 /*yield*/, this.prisma.user.update({ where: { id: id }, data: data })];
                        case 6:
                            updated = _b.sent();
                            if (!roleChanged) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.audit.log(requestingUserId, 'USER_ROLE_CHANGED', 'User', id, "".concat(existing.name, ": ").concat(existing.role, " \u2192 ").concat(dto.role))];
                        case 7:
                            _b.sent();
                            return [3 /*break*/, 10];
                        case 8: return [4 /*yield*/, this.audit.log(requestingUserId, 'USER_UPDATED', 'User', id, "".concat(existing.name, " (").concat(existing.email, ")"))];
                        case 9:
                            _b.sent();
                            _b.label = 10;
                        case 10:
                            _ = updated.password, result = __rest(updated, ["password"]);
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        UsersService_1.prototype.remove = function (id, requestingUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (id === requestingUserId) {
                                throw new common_1.BadRequestException('No puedes eliminar tu propia cuenta');
                            }
                            return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: id } })];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.NotFoundException('Usuario no encontrado');
                            return [4 /*yield*/, this.prisma.user.delete({ where: { id: id } })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.audit.log(requestingUserId, 'USER_DELETED', 'User', id, "".concat(user.name, " (").concat(user.email, ") \u2014 Rol: ").concat(user.role))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { message: 'Usuario eliminado correctamente' }];
                    }
                });
            });
        };
        UsersService_1.prototype.getStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var users, counts, _i, users_1, u;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findMany({
                                select: { role: true },
                            })];
                        case 1:
                            users = _a.sent();
                            counts = {
                                ADMIN: 0,
                                DOCTOR: 0,
                                RECEPCION: 0,
                            };
                            for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                                u = users_1[_i];
                                counts[u.role] = (counts[u.role] || 0) + 1;
                            }
                            return [2 /*return*/, counts];
                    }
                });
            });
        };
        return UsersService_1;
    }());
    __setFunctionName(_classThis, "UsersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersService = _classThis;
}();
exports.UsersService = UsersService;
