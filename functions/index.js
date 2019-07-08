'use strict';

const functions = require('firebase-functions');
const express = require('express');
const line = require('@line/bot-sdk');

const config = {
    channelSecret: functions.config().channel.secret,
    channelAccessToken: functions.config().channel.accesstoken
};

const client = new line.Client(config);

const app = express();
app.post('/webhook', (req, res) => {
    handleEventPush(req.body)
    .then((result) => res.json(result));
});

async function handleEventPush(body) {
    let messageStamp = {
        type:  'sticker'
    }
    switch(body.level) {
        case 0:
            messageStamp.packageId = 11537;
            messageStamp.stickerId = 52002746
            break;
        case 1:
            messageStamp.packageId = 11538;
            messageStamp.stickerId = 51626525
            break;
        case 2:
            messageStamp.packageId = 11538;
            messageStamp.stickerId = 51626523
            break;
        case 3:
            messageStamp.packageId = 11537;
            messageStamp.stickerId = 52002757
            break;
        default:
            return Promise.resolve(null);
    }
    await client.pushMessage(functions.config().channel.groupid, messageStamp);
    return Promise.resolve(null);
}

exports.app = functions.https.onRequest(app);