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
exports.__esModule = true;
var react_1 = require("react");
var yargs_1 = require("yargs");
var helpers_1 = require("yargs/helpers");
var xmtp_js_1 = require("@xmtp/xmtp-js");
var ink_1 = require("ink");
var renderers_1 = require("./renderers");
var utils_1 = require("./utils");
var ethers_1 = require("ethers");
var Trustee_json_1 = require("./Trustee.json");
(0, yargs_1["default"])((0, helpers_1.hideBin)(process.argv))
    .command('init', 'Initialize wallet', {}, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var env, client, contractABI, provider, signer, contract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                env = argv.env;
                return [4 /*yield*/, xmtp_js_1.Client.create((0, utils_1.loadBIGDADDY)(), { env: env })];
            case 1:
                client = _a.sent();
                contractABI = Trustee_json_1["default"].abi;
                console.log(contractABI);
                provider = new ethers_1.ethers.providers.WebSocketProvider("wss://eth-mainnet.alchemyapi.io/v2/".concat(process.env.ALCHEMY_WEBSOCKET));
                signer = provider.getSigner(client.address);
                contract = new ethers_1.ethers.Contract('0x6f6f8e11d0a6abD4a297C99b47Dc990e8D8B852c', contractABI, signer);
                contract.on('Withdraw', function () {
                    // send logic here
                    console.log('withdraw');
                });
                (0, ink_1.render)(<ink_1.Text>
        New wallet with address {client.address} saved at {utils_1.WALLET_FILE_LOCATION}
      </ink_1.Text>);
                return [2 /*return*/];
        }
    });
}); })
    .command('BIGDADDY', 'Initialize wallet', {}, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var env, client, provider;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                env = argv.env;
                (0, utils_1.saveRandomWallet)();
                return [4 /*yield*/, xmtp_js_1.Client.create((0, utils_1.loadBIGDADDY)(), { env: env })];
            case 1:
                client = _a.sent();
                provider = new ethers_1.ethers.providers.AlchemyProvider('goerli', (0, utils_1.loadApiKey)());
                (0, ink_1.render)(<ink_1.Text>
        New wallet with address {client.address} saved at {utils_1.WALLET_FILE_LOCATION}
      </ink_1.Text>);
                return [2 /*return*/];
        }
    });
}); })
    .command('LITTLEBOY', 'Initialize wallet', {}, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var env, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                env = argv.env;
                (0, utils_1.saveRandomWallet)();
                return [4 /*yield*/, xmtp_js_1.Client.create((0, utils_1.loadLITTLEBOY)(), { env: env })];
            case 1:
                client = _a.sent();
                (0, ink_1.render)(<ink_1.Text>
        New wallet with address {client.address} saved at {utils_1.WALLET_FILE_LOCATION}
      </ink_1.Text>);
                return [2 /*return*/];
        }
    });
}); })
    .command('Withdraw', 'call ableToWithdraw', {}, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var env, client, provider, path, mneumonic, providerWithWallet, contractABI, contract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                env = argv.env;
                return [4 /*yield*/, xmtp_js_1.Client.create((0, utils_1.loadLITTLEBOY)(), { env: env })];
            case 1:
                client = _a.sent();
                provider = new ethers_1.ethers.providers.AlchemyProvider('optimism-goerli', process.env.ALCHEMY_WEBSOCKET);
                path = "m/44'/60'/0'/0/0";
                mneumonic = 'swallow license seed summer stadium accident maximum term cushion roof blood detect';
                providerWithWallet = new ethers_1.ethers.Wallet('5b513444a764686dd26f98ed00626ebaa0ae4b0453fb43f2519b83943aad07ac', provider);
                contractABI = Trustee_json_1["default"].abi;
                contract = new ethers_1.ethers.Contract('0x6f6f8e11d0a6abD4a297C99b47Dc990e8D8B852c', contractABI, providerWithWallet);
                return [4 /*yield*/, contract.ableToWithdraw()];
            case 2:
                _a.sent();
                (0, ink_1.render)(<ink_1.Text>
        little boy try to withdraw money from {client.address} saved at{' '}
        {utils_1.WALLET_FILE_LOCATION}
      </ink_1.Text>);
                return [2 /*return*/];
        }
    });
}); })
    .command('send <address> <message>', 'Send a message to a blockchain address', {
    address: { type: 'string', demand: true },
    message: { type: 'string', demand: true }
}, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var env, message, address, client, conversation, sent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                env = argv.env, message = argv.message, address = argv.address;
                return [4 /*yield*/, xmtp_js_1.Client.create((0, utils_1.loadWallet)(), { env: env })];
            case 1:
                client = _a.sent();
                return [4 /*yield*/, client.conversations.newConversation(address)];
            case 2:
                conversation = _a.sent();
                return [4 /*yield*/, conversation.send(message)];
            case 3:
                sent = _a.sent();
                (0, ink_1.render)(<renderers_1.Message {...sent}/>);
                return [2 /*return*/];
        }
    });
}); })
    .command('list-messages <address>', 'List all messages from an address', { address: { type: 'string', demand: true } }, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var env, address, client, conversation, messages, title;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                env = argv.env, address = argv.address;
                return [4 /*yield*/, xmtp_js_1.Client.create((0, utils_1.loadWallet)(), { env: env })];
            case 1:
                client = _a.sent();
                return [4 /*yield*/, client.conversations.newConversation(address)];
            case 2:
                conversation = _a.sent();
                return [4 /*yield*/, conversation.messages()];
            case 3:
                messages = _a.sent();
                title = "Messages between ".concat((0, utils_1.truncateEthAddress)(client.address), " and ").concat((0, utils_1.truncateEthAddress)(conversation.peerAddress));
                (0, ink_1.render)(<renderers_1.MessageList title={title} messages={messages}/>);
                return [2 /*return*/];
        }
    });
}); })
    .command('stream-all', 'Stream messages coming from any address', {}, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var env, client, stream;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                env = argv.env;
                return [4 /*yield*/, xmtp_js_1.Client.create((0, utils_1.loadWallet)(), { env: env })];
            case 1:
                client = _a.sent();
                return [4 /*yield*/, client.conversations.streamAllMessages()];
            case 2:
                stream = _a.sent();
                (0, ink_1.render)(<renderers_1.MessageStream stream={stream} title="Streaming messages"/>);
                return [2 /*return*/];
        }
    });
}); })
    .command('stream <address>', 'Stream messages from an address', { address: { type: 'string', demand: true } }, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var address, env, client, convo, stream;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                address = argv.address, env = argv.env;
                return [4 /*yield*/, xmtp_js_1.Client.create((0, utils_1.loadWallet)(), { env: env })];
            case 1:
                client = _a.sent();
                return [4 /*yield*/, client.conversations.newConversation(address)];
            case 2:
                convo = _a.sent();
                return [4 /*yield*/, convo.streamMessages()];
            case 3:
                stream = _a.sent();
                (0, ink_1.render)(<renderers_1.MessageStream stream={stream} title={"Streaming messages from ".concat(argv.address)}/>);
                return [2 /*return*/];
        }
    });
}); })
    .option('env', {
    alias: 'e',
    type: 'string',
    "default": 'dev',
    choices: ['dev', 'production'],
    description: 'The XMTP environment to use'
})
    .demandCommand(1)
    .parse();
