Meteor.subscribe("pressures");

Template.page.events({
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the button");
  }
});

Template.chart.pressures = function() {
  return Pressures.find({}, {sort: {date: -1}});
};
