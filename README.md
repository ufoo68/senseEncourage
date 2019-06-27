# messagingApiTraining
LINEのMessaging APIの練習用コードです。[この記事](https://qiita.com/ufoo68/items/f0ba45347b226c8afcd8)を参照してください。  

また、デプロイ環境は[Firebase](https://console.firebase.google.com/)をオススメします本レポジトリをそのままcloneしてもらった後に、  

```
messagingApiTraining
```

上記のプロジェクト名で[Firebaseのコンソール上](https://console.firebase.google.com/)よりプロジェクト作成を行ってください。  
また、firebase.jsonは以下のように設定しておくと上記の記事の内容通りにデプロイ可能です。  

```js
{
  "hosting": {
    "public": "./",
    "rewrites": [
      {
        "source": "/webhook",
        "function": "app"
      }
    ],
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}

```