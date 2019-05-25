'use strict';

const functions = require('firebase-functions');
const express = require('express');
const line = require('@line/bot-sdk');

// channel secretとaccess tokenをFirebaseの環境変数から呼び出す
const config = {
    channelSecret: functions.config().channel.secret,
    channelAccessToken: functions.config().channel.accesstoken
};

const app = express();
//URL + /webhookで登録したWebhook URLが呼び出されたときに実行される。
app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);
//ユーザから受け取ったイベントについてのハンドリングを実装する
async function handleEvent(event) {
    //返信メッセージ用のボディを組み立てる。typeの指定が必要。
    let replyText = {
        type: 'text',
        text:  ''
    }
    //ユーザから送られた各メッセージに対する処理を実装する。
    //https://developers.line.biz/ja/reference/messaging-api/#message-event を参照。
    switch (event.message.type) {
        case 'text':
            replyText.text = 'テキストを受け取りました。'
            return client.replyMessage(event.replyToken, replyText);

        case 'image':
            replyText.text = '画像を受け取りました。'
            return client.replyMessage(event.replyToken, replyText);

        case 'video':
            replyText.text = '動画を受け取りました。'
            return client.replyMessage(event.replyToken, replyText);

        case 'audio':
            replyText.text = '音声を受け取りました。'
            return client.replyMessage(event.replyToken, replyText);

        case 'file':
            replyText.text = 'ファイルを受け取りました。'
            return client.replyMessage(event.replyToken, replyText);

        case 'location':
            replyText.text = '位置情報を受け取りました。'
            return client.replyMessage(event.replyToken, replyText);

        case 'sticker':
            replyText.text = 'スタンプを受け取りました。'
            return client.replyMessage(event.replyToken, replyText);
        default:
            return Promise.resolve(null);
    }
}

exports.app = functions.https.onRequest(app);