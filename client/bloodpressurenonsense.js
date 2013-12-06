Meteor.subscribe("pressures");

Template.page.events({
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the button");
  }
});

Template.list.pressures = function() {
  return Pressures.find({}, {sort: {date: -1}});
};

Template.chart.rendered = function() {
  //var self = this;

  // graph things
  var w = 500;
  var h = 500;
  var margin = 20;

  // data things
  var data = Pressures.find({}, {sort: {date: -1}});
  var dias = data.map(function(d){ return d.dia; });
  var syss = data.map(function(d){ return d.sys; });
  var puls = data.map(function(d){ return d.pulse; });

  // max
  var max = d3.max(dias);
  var max_s = d3.max(syss);
  var max_p = d3.max(puls);

  // set the scales
  var x = d3.scale.linear().domain([0, dias.length]).range([0 + margin, w - margin]);
  var y = d3.scale.linear().domain([max, 0]).range([0 + margin, h - margin]);

  // base vis layer
  var vis = d3.select('#chart')
      .append('svg:svg')
      .attr('width', w)
      .attr('height', h);

  // creates a group element
  var g = vis.append('svg:g');

  var line = d3.svg.line()
      .x(function(d,i) { return x(i); })
      .y(function(d) { return y(d); });

  // creates the line
  var make_path = function(d, color) {
    g.append('svg:path')
      .attr('stroke', color)
      .attr('stroke-width', '2')
      .attr('fill', 'none')
      .attr('d', line(d));
  };
  make_path(dias, 'green');

  // creates axes
  g.append('svg:line')
    .attr('stroke', 'black')
    .attr('x1', x(0))
    .attr('y1', y(0))
    .attr('x2', x(w))
    .attr('y2', y(0));

  g.append('svg:line')
    .attr('stroke', 'black')
    .attr('x1', x(0))
    .attr('y1', y(0))
    .attr('x2', x(0))
    .attr('y2', y(d3.max(dias)));

};
