// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .



$.FollowToggle = function (el) {
  this.$el = $(el);
  this.userId = this.$el.attr("data-user-id");
  this.followState = this.$el.attr("data-initial-follow-state");
  this.render();
  this.bindListeners();
};

$.FollowToggle.prototype.bindListeners = function() {
  this.$el.on("click", this.handleClick.bind(this));
}

$.FollowToggle.prototype.render = function () {
  if(this.followState === "following" || this.followState === "unfollowing"){
    this.$el.prop("disabled", true)
  }
  
  if (this.followState === "followed") {
    this.$el.html("Unfollow!").prop("disabled", false);
  } else if (this.followState === "unfollowed"){
    this.$el.html("Follow!").prop("disabled", false);
  }
};

$.FollowToggle.prototype.handleClick = function (event) {
  event.preventDefault();
  var that = this;
  var id = this.userId;
  var urlPlace = '/users/' + id +'/follow';
  
  var requestData = { user_id: this.userId }
   
  if (this.followState === "unfollowed") {
    this.followState = "following";
    this.render();
    $.ajax(urlPlace, {
      type: 'POST',
      data: requestData,
      dataType: 'json',
      success: function( resp ) {
        that.$el.attr('data-initial-follow-state', "followed");
        that.followState = "followed";
        console.log("New Follow State: " + that.followState);
        that.render();
      },
      error: function() {
        console.log("fail at following :'(");
      }
    })
  } else if(this.followState === "followed") {
    this.followState = "unfollowing";
    this.render();
    $.ajax(urlPlace, {
      type: 'DELETE',
      dataType: 'json',
      success: function( resp ) {
        that.$el.attr('data-initial-follow-state', "unfollowed");
        that.followState = "unfollowed";
        console.log("New Follow State: " + that.followState);
        that.render();
      },
      error: function() {
        console.log("fail at unfollwoing :'(");
      }
    })
  }
  
}

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});



