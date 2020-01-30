$(function(){
  // 検索をかけてユーザーが見つかった時、メンバー追加欄に表示される
  function appendUser(user) {
      var html =  `
      <div class="chat-group-user">
        <p class="chat-group-user__name">"${user.name}"</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
      `;
      $('#user-search-result').append(html);
  }

  // 検索をかけてユーザーが見つからなった時、メンバー追加欄に表示される
  function appendNoUser() {
      var html = `
      <div class="chat-group-user">
       <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>`
      $('#user-search-result').append(html);
  }

  // 追加をクリックした時、チャットメンバー欄に表示される
  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  //  追加を押した時のDBとのデータやりとり 保存
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" >`;
    $(`#${userId}`).append(html);
  }

  // 検索かけた時のイベント
  $('#user-search-field').on('keyup', function(){
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: "/users",
      dataType: 'json',
      data: { keyword: input },
    })
    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else if (input.length == 0) {
          return false;
      } else {
        appendNoUser();
      }
    })
    .fail(function(){
      alert("通信エラーです。ユーザーが表示できません");
    });
  });
  // 追加ボタン押した時のイベント
  $(document).on("click",".chat-group-user__btn--add",function(){
    const addUserName = $(this).attr('data-user-name');
    const addUserID = $(this).attr('data-user-id');
    $(this).parent().remove();
    addDeleteUser(addUserName, addUserID);
    addMember(addUserID);
  });
   // 削除ボタン押した時のイベント
  $(document).on("click", ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  });
});