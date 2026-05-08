"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTransactionStatus = exports.TTransactionType = void 0;
var TTransactionType;
(function (TTransactionType) {
    TTransactionType["ADD_MONEY"] = "ADD-MONEY";
    TTransactionType["WITHDRAW"] = "WITHDRAW";
    TTransactionType["SEND_MONEY"] = "SEND_MONEY";
    TTransactionType["CASH_IN"] = "CASH_IN";
    TTransactionType["CASH_OUT"] = "CASH_OUT";
})(TTransactionType || (exports.TTransactionType = TTransactionType = {}));
var TTransactionStatus;
(function (TTransactionStatus) {
    TTransactionStatus["PENDING"] = "PENDING";
    TTransactionStatus["SUCCESS"] = "SUCCESS";
    TTransactionStatus["FAILED"] = "FAILED";
})(TTransactionStatus || (exports.TTransactionStatus = TTransactionStatus = {}));
