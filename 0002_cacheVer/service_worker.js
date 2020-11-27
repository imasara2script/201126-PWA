// 下記URLの記事を参考にさせていただいた。
// https://qiita.com/TakeshiNickOsanai/items/8d012a128827c9db980d

// キャッシュファイルの指定
キャッシュの識別名 = 'pwa-sample-caches'
var キャッシュ対象のURL配列 = [
    './外部.js'
]

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(キャッシュの識別名)
            .then(function(cache) {
                return cache.addAll(キャッシュ対象のURL配列)
            })
    )
})

// リクエストされたファイルが Service Worker にキャッシュされている場合
// キャッシュからレスポンスを返す
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request)
            })
    )
})

// Cache Storage にキャッシュされているサービスワーカーのkeyに変更があった場合
// 新バージョンをインストール後、旧バージョンのキャッシュを削除する
// (このファイルでは CACHE_NAME をkeyの値とみなし、変更を検知している)
self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(function(key){
        if(!キャッシュの識別名.includes(key)){ caches.delete(key) }
      })
    )).then(function(){
      console.log(CACHE_NAME + "activated")
    })
  )
})
