"use strict";
exports.__esModule = true;
exports.truncateEthAddress = exports.loadApiKey = exports.loadMephisto = exports.loadLITTLEBOY = exports.loadBIGDADDY = exports.loadWallet = exports.saveRandomWallet = exports.ALCHEMY_LOCATION = exports.MEPHISTO_LOCATION = exports.LITTLEBOY_LOCATION = exports.BIGDADDY_LOCATION = exports.WALLET_FILE_LOCATION = void 0;
var fs_1 = require("fs");
var ethers_1 = require("ethers");
exports.WALLET_FILE_LOCATION = './xmtp_wallet';
exports.BIGDADDY_LOCATION = './xmtp_wallet_BIGDADDY';
exports.LITTLEBOY_LOCATION = './xmtp_wallet_LITTLEBOY';
exports.MEPHISTO_LOCATION = './xmtp_mephisto';
exports.ALCHEMY_LOCATION = './xmtp_alchemy_apikey';
var saveRandomWallet = function () {
    var newWallet = ethers_1.Wallet.createRandom();
    (0, fs_1.writeFileSync)(exports.WALLET_FILE_LOCATION, newWallet.mnemonic.phrase);
};
exports.saveRandomWallet = saveRandomWallet;
var loadWallet = function () {
    try {
        var existing = (0, fs_1.readFileSync)(exports.WALLET_FILE_LOCATION);
        return ethers_1.Wallet.fromMnemonic(existing.toString());
    }
    catch (e) {
        throw new Error('No wallet file found');
    }
};
exports.loadWallet = loadWallet;
var loadBIGDADDY = function () {
    try {
        var existing = (0, fs_1.readFileSync)(exports.BIGDADDY_LOCATION);
        return ethers_1.Wallet.fromMnemonic(existing.toString());
    }
    catch (e) {
        throw new Error('No wallet file found');
    }
};
exports.loadBIGDADDY = loadBIGDADDY;
var loadLITTLEBOY = function () {
    try {
        var existing = (0, fs_1.readFileSync)(exports.LITTLEBOY_LOCATION);
        return ethers_1.Wallet.fromMnemonic(existing.toString());
    }
    catch (e) {
        throw new Error('No wallet file found');
    }
};
exports.loadLITTLEBOY = loadLITTLEBOY;
var loadMephisto = function () {
    return exports.MEPHISTO_LOCATION;
};
exports.loadMephisto = loadMephisto;
var loadApiKey = function () {
    return exports.ALCHEMY_LOCATION;
};
exports.loadApiKey = loadApiKey;
var truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
var truncateEthAddress = function (address) {
    var match = address.match(truncateRegex);
    if (!match)
        return address;
    return "".concat(match[1], "\u2026").concat(match[2]);
};
exports.truncateEthAddress = truncateEthAddress;
