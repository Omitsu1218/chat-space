$(function(){
  // メッセージ投稿時 & 自動更新時の処理
  function buildHTML(message){
    if (message.image){
      var html =
      `<div class="chat-main__message-box" data-message-id = ${message.id}>
            <div class="chat-main__content">
              <div class="chat-main__content--name">
                ${message.user_name}
              </div>
              <div class="chat-main__content--date">
                ${message.created_at}
              </div>
            </div>
            <div class="chat-main__letter">
              <p class="chat-main__letter--text-image">
                ${message.text}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
      return html;
    } else {
      var html =
      `<div class="chat-main__message-box" data-message-id = ${message.id}>
            <div class="chat-main__content">
              <div class="chat-main__content--name">
                ${message.user_name}
              </div>
              <div class="chat-main__content--date">
                ${message.created_at}
              </div>
            </div>
            <div class="chat-main__letter">
              <p class="chat-main__letter--text-image">
                ${message.text}
              </p>
            </div>
          </div>`
    return html;
    };
  }
  // 送信ボタンクリック時に発火
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    // 非同期での投稿 & 自動での画面スクロール
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.chat-main__form')[0].reset();
      $('.chat-main__send').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
      $('.chat-main__send').prop('disabled', false);
    })
  })
  // 自動更新時の処理(相手方)
  var reloadMessages = function() {
    last_message_id = $('.chat-main__message-box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){
      var insertHTML = '';
      $.each(messages, function(index, letter){
        insertHTML += buildHTML(letter);
      });
      $('.chat-main__message-list').append(insertHTML);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  // イベント発火時のタイミング 7秒に1回
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});