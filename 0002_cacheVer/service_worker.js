// 下記URLの記事を参考にさせていただいた。
// https://qiita.com/TakeshiNickOsanai/items/8d012a128827c9db980d

// キャッシュファイルの指定
キャッシュの識別名 = 'pwa-sample-caches0'
var キャッシュ対象のURL配列 = [
    '/201126-PWA/0002_cacheVer/',
    '/201126-PWA/0002_cacheVer/外部.js'
    
  //  './外部.js'
    
  //  '/pwa/',
  //  '/pwa/css/style.css',
  //  '/pwa/drawer.js'
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
// (このファイルでは キャッシュの識別名 をkeyの値とみなし、変更を検知している)
self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(function(key){
        if(!キャッシュの識別名.includes(key)){
            console.log('')
            caches.delete(key)
        }
      })
    )).then(function(){
      console.log(キャッシュの識別名 + "activated")
    })
  )
})
