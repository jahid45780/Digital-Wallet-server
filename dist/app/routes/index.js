"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modular/user/user.route");
const auth_route_1 = require("../modular/auth/auth.route");
const wallet_route_1 = require("../modular/wallet/wallet.route");
const transaction_route_1 = require("../modular/transaction/transaction.route");
const admin_route_1 = require("../modular/admin/admin.route");
exports.router = (0, express_1.Router)();
const moduleRouter = [
    {
        path: "/user",
        route: user_route_1.userRouter
    },
    {
        path: "/auth",
        route: auth_route_1.authRouter
    },
    {
        path: "/wallet",
        route: wallet_route_1.walletRouter
    },
    {
        path: "/transaction",
        route: transaction_route_1.transactionRouter
    },
    { path: "/admin",
        route: admin_route_1.adminRouter }
];
moduleRouter.forEach((route) => {
    exports.router.use(route.path, route.route);
});
