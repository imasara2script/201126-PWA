// 下記URLの記事を参考にさせていただいた。
// https://qiita.com/poster-keisuke/items/6651140fa20c7aa18474

// キャッシュファイルの指定
キャッシュの識別名 = 'pwa-sample-caches'
var キャッシュ対象のURL配列 = [
  //  '/imasara2script.github.io/201126-PWA/0324_hello/',
  //  '/imasara2script.github.io/201126-PWA/0324_hello/外部.js'
    './外部.js'
]

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(キャッシュの識別名)
            .then(function(cache) {
                return cache.addAll(キャッシュ対象のURL配列);
            })
    )
})

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    )
})
