$(function(){
  function buildHTML(message){
    if (message.image){
      console.log('true')
      var html =
      `<div class="chat-main__message-box">
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
      console.log('false')
      var html =
      `<div class="chat-main__message-box">
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
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.chat-main__form')[0].reset();
      $('.chat-main__send').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
      $('.chat-main__send').prop('disabled', false);
    })
  })
});