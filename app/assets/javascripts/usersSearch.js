

$.UsersSearch = function (el) {
  this.$el = $(el);
  console.log("YEAY")
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});



