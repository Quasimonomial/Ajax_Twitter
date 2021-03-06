$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.userId = this.$el.attr("data-user-id") || options.userId;
  this.followState = this.$el.attr("data-initial-follow-state") || options.followState;
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
    new $.FollowToggle(this, options);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});



