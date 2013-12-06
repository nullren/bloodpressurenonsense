Meteor.publish("pressures", function() {
  return Pressures.find({owner: this.userId});
});
