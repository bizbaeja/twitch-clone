"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.Actions = void 0;
var nextjs_1 = require("@clerk/nextjs");
var nextjs_2 = require("@clerk/nextjs");
var navigation_1 = require("next/navigation");
var sonner_1 = require("sonner");
var react_1 = require("react");
var follow_1 = require("@/actions/follow");
;
exports.default = (0, nextjs_1.authMiddleware)({
    publicRoutes: [
        "/",
        "/api/webhooks(.*)",
        "/api/uploadthing",
        "/:username",
        "/search"
    ],
    debug: true
});
var Actions = function (_a) {
    var hostIdentity = _a.hostIdentity, isFollowing = _a.isFollowing, isHost = _a.isHost;
    var mw = (0, nextjs_1.authMiddleware)();
    //requset("http://localhost:3000/api/webhooks", {method: "POST"})
    console.log(mw);
    var _b = (0, react_1.useTransition)(), isPending = _b[0], startTransition = _b[1];
    var router = (0, navigation_1.useRouter)();
    var userId = (0, nextjs_2.auth)().userId;
    var handleFollow = function () {
        startTransition(function () {
            (0, follow_1.onFollow)(hostIdentity)
                .then(function (data) { return sonner_1.toast.success("You are now following ".concat(data.following.username)); })
                .catch(function () { return sonner_1.toast.error("Something went wrong"); });
        });
    };
    var handleUnfollow = function () {
        startTransition(function () {
            (0, follow_1.onUnfollow)(hostIdentity)
                .then(function (data) { return sonner_1.toast.success("You have unfollowed ".concat(data.following.username)); })
                .catch(function () { return sonner_1.toast.error("Something went wrong"); });
        });
    };
    var toggleFollow = function () {
        if (!userId) {
            return router.push("/sign-in");
        }
        if (isHost)
            return;
        if (isFollowing) {
            handleUnfollow();
        }
        else {
            handleFollow();
        }
    };
};
exports.Actions = Actions;
exports.config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
