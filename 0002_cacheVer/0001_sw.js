キャッシュの識別名 = '0001_sw.js'
var キャッシュ対象のURL配列 = [
    // './外部.js'
    // 開発中はキャッシュしちゃうと更新に時間がかかるので、任意のタイミングで更新できるようになるまではキャッシュしない。
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
            console.log('key削除「'+key+'」')
            caches.delete(key)
        }
      })
    )).then(function(){
      console.log(キャッシュの識別名 + "activated")
    })
  )
})
