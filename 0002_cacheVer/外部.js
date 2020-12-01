  追記 = function(str){ div.innerText += '\r\n\r\n' + str }
  追記('最終更新 ' + document.lastModified)

  !function(){
    // serviceWorkerの登録
    if('serviceWorker' in navigator){
        追記('serviceWorker in navi')
    }else{
        追記('serviceWorker not found navi')
        return
    }

    navigator.serviceWorker.register('service_worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
        追記('register success')
    }).catch(function(err) {
        console.log('ServiceWorker registration failed: ', err)
        追記('register failed')
    })

    try{
        キャッシュの識別名 += ''
        追記('キャッシュの識別名[' + キャッシュの識別名 + ']')
    }
    catch(e){
        追記('「キャッシュの識別名」は未定義（このスコープでは参照不可）')
    }
  }()
  onload = function(){
      追記('textボタンを押してください')
      btn.onclick = function(){
          追記('動作ＯＫ！')
      }
      
      キャッシュ名の一覧を出力する()
  }

  キャッシュ名の一覧を出力する = () => {
    追記('キャッシュ名の一覧')
    caches.keys().then(keys => Promise.all(
      keys.map(function(key){ 追記('　'+key) })
    ))
  }
