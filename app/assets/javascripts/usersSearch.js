

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
    dataType: "json",
    data: formData,
    success: function( resp ) {
      console.log("successful query");
      that.renderResults(resp);
    },
    error: function() {
      console.log("Lame ass query try again.");
    }
  })
}

$.UsersSearch.prototype.renderResults = function(resp) {
  var that = this;
  var renderUser = function(user){
    var followerString = user.followed ? "followed" : "unfollowed"; 
      
    var options = {userId: user.id, followState: followerString};
    that.$ul.append("<li>" + user.username + "</li>")
    var button = '<button type="button" id="button_' + user.id + '" class="follow-toggle"></button>'
    that.$ul.append(button);
    that.$ul.append(new $.FollowToggle('#button_'+ user.id, options));
    console.log(user);
  }
  
  this.$ul.html("");
  
  resp.forEach(function(user){
    renderUser(user);
  });
  
}
//
//
// <button type="button" class="follow-toggle" data-user-id="<%= user.id %>" data-initial-follow-state="<%= current_user.follows?(user) ? "followed" : "unfollowed" %>"></button>



$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});



