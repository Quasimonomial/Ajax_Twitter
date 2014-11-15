

$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = $(this.$el.find("input"));
  this.$ul = $(this.$el.find("ul"));
  this.bindListener();
  
};

$.UsersSearch.prototype.bindListener = function (){
  this.$input.on("input", this.handleInput.bind(this));
};

$.UsersSearch.prototype.handleInput = function(event){
  var that = this;
  var formData = { query: this.$input.val() };
  $.ajax("/users/search", {
    type: 'GET',
    datatype: "json",
    data: formData,
    success: function( resp ) {
      console.log("successful query");
      that.renderResults(resp);
    },
    error: function() {
      console.log("You're both fucking failures and will never amount to anything.")
    }
  })
}

$.UsersSearch.prototype.renderResults = function(resp) {
  console.log(resp)
}



// type: 'POST',
// data: requestData,
// dataType: 'json',
// success: function( resp ) {
//   that.$el.attr('data-initial-follow-state', "followed");
//   that.followState = "followed";
//   console.log("New Follow State: " + that.followState);
//   that.render();
// },
// error: function() {
//   console.log("fail at following :'(");
// }



$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});



