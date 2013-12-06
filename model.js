Pressures = new Meteor.Collection("pressures")

Pressures.allow({
  insert: function (userId, pressure_point) {
    return userId && pressure_point.owner === userId;
  }
});
