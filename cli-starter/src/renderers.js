"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
exports.MessageStream = exports.MessageList = exports.Message = void 0;
var react_1 = require("react");
var ink_1 = require("ink");
var utils_1 = require("./utils");
var Message = function (_a) {
    var id = _a.id, senderAddress = _a.senderAddress, content = _a.content, sent = _a.sent;
    return (<ink_1.Box flexDirection="row" key={id}>
      <ink_1.Box marginRight={2}>
        <ink_1.Text color="red">{(0, utils_1.truncateEthAddress)(senderAddress)}: </ink_1.Text>
        <ink_1.Text>{content}</ink_1.Text>
      </ink_1.Box>
      <ink_1.Spacer />
      <ink_1.Text italic color="gray">
        {sent.toLocaleString()}
      </ink_1.Text>
    </ink_1.Box>);
};
exports.Message = Message;
var MessageList = function (_a) {
    var messages = _a.messages, title = _a.title;
    return (<ink_1.Box flexDirection="column" margin={1}>
      <ink_1.Text bold>{title}</ink_1.Text>
      <ink_1.Box flexDirection="column" borderStyle="single">
        {messages && messages.length ? (messages.map(function (message) { return <exports.Message {...message} key={message.id}/>; })) : (<ink_1.Text color="red" bold>
            No messages
          </ink_1.Text>)}
      </ink_1.Box>
    </ink_1.Box>);
};
exports.MessageList = MessageList;
var MessageStream = function (_a) {
    var stream = _a.stream, title = _a.title;
    var _b = (0, react_1.useState)([]), messages = _b[0], setMessages = _b[1];
    (0, react_1.useEffect)(function () {
        if (!stream) {
            return;
        }
        var seenMessages = new Set();
        var listenForMessages = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _loop_1, stream_1, stream_1_1, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 11]);
                        _loop_1 = function () {
                            var message = stream_1_1.value;
                            if (seenMessages.has(message.id)) {
                                return "continue";
                            }
                            setMessages(function (existing) { return existing.concat(message); });
                            seenMessages.add(message.id);
                        };
                        stream_1 = __asyncValues(stream);
                        _b.label = 1;
                    case 1: return [4 /*yield*/, stream_1.next()];
                    case 2:
                        if (!(stream_1_1 = _b.sent(), !stream_1_1.done)) return [3 /*break*/, 4];
                        _loop_1();
                        _b.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 11];
                    case 5:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 11];
                    case 6:
                        _b.trys.push([6, , 9, 10]);
                        if (!(stream_1_1 && !stream_1_1.done && (_a = stream_1["return"]))) return [3 /*break*/, 8];
                        return [4 /*yield*/, _a.call(stream_1)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 10: return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        listenForMessages();
        return function () {
            if (stream) {
                stream["return"](undefined);
            }
        };
    }, [stream]);
    return <exports.MessageList title={title} messages={messages}/>;
};
exports.MessageStream = MessageStream;
