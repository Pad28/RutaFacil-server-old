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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expo_server_sdk_1 = require("expo-server-sdk");
const router = (0, express_1.Router)();
router.post('/recordatorio', (req, res) => {
    let expo = new expo_server_sdk_1.Expo();
    let messages = [{
            to: req.body.expoPushToken,
            sound: 'default',
            body: 'Hola, esta es una notificación push!',
            data: { withSome: 'data' },
        }];
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (() => __awaiter(void 0, void 0, void 0, function* () {
        for (let chunk of chunks) {
            try {
                let ticketChunk = yield expo.sendPushNotificationsAsync(chunk);
                tickets.push(...ticketChunk);
            }
            catch (error) {
                console.error(error);
            }
        }
    }))();
    res.send('Notificación enviada');
});
exports.default = router;
