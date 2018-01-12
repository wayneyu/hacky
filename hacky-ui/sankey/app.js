'use strict';

var currentNodeSubj = new Rx.Subject();
currentNodeSubj.subscribe(value => {
  document.getElementById("fundName").innerHTML=value.name;
  document.getElementById("fundnetFlow").innerHTML=(value.netFlow/1000000).toFixed(4);
  document.getElementById("fundnet").innerHTML=(Math.abs(value.netFlow/1000000) * 23.2).toFixed(4);
  document.getElementById("fund12mo").innerHTML=(Math.random() - 0.5).toFixed(2) * 4;
  console.log(value);
});

var svg, tooltip, biHiSankey, path, defs, colorScale, highlightColorScale, isTransitioning;

var OPACITY = {
    NODE_DEFAULT: 0.9,
    NODE_FADED: 0.1,
    NODE_HIGHLIGHT: 0.8,
    LINK_DEFAULT: 0.6,
    LINK_FADED: 0.05,
    LINK_HIGHLIGHT: 0.9
  },
  TYPES = ["Fund"],
  TYPE_COLORS = ["#0000cd"],
  TYPE_HIGHLIGHT_COLORS = ["#66c2a5"],
  LINK_COLOR = "#b3b3b3",
  INFLOW_COLOR = "#2E86D1",
  OUTFLOW_COLOR = "#D63028",
  NODE_WIDTH = 36,
  COLLAPSER = {
    RADIUS: NODE_WIDTH / 2,
    SPACING: 2
  },
  OUTER_MARGIN = 10,
  MARGIN = {
    TOP: 2 * (COLLAPSER.RADIUS + OUTER_MARGIN),
    RIGHT: OUTER_MARGIN,
    BOTTOM: OUTER_MARGIN,
    LEFT: OUTER_MARGIN
  },
  TRANSITION_DURATION = 400,
  HEIGHT = 900 - MARGIN.TOP - MARGIN.BOTTOM,
  WIDTH = 850 - MARGIN.LEFT - MARGIN.RIGHT,
  LAYOUT_INTERATIONS = 32,
  REFRESH_INTERVAL = 7000;

var formatNumber = function (d) {
  var numberFormat = d3.format(",.0f"); // zero decimal places
  return "$" + numberFormat(d);
},

formatFlow = function (d) {
  var flowFormat = d3.format(",.0f"); // zero decimal places with sign
  return "$" + flowFormat(Math.abs(d));
},

// Used when temporarily disabling user interractions to allow animations to complete
disableUserInterractions = function (time) {
  isTransitioning = true;
  setTimeout(function(){
    isTransitioning = false;
  }, time);
},

hideTooltip = function () {
  return tooltip.transition()
    .duration(TRANSITION_DURATION)
    .style("opacity", 0);
},

showTooltip = function () {
  return tooltip
    .style("left", d3.event.pageX + "px")
    .style("top", d3.event.pageY + 15 + "px")
    .transition()
      .duration(TRANSITION_DURATION)
      .style("opacity", 1);
};

colorScale = d3.scale.ordinal().domain(TYPES).range(TYPE_COLORS),
highlightColorScale = d3.scale.ordinal().domain(TYPES).range(TYPE_HIGHLIGHT_COLORS),

svg = d3.select("#chart").append("svg")
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
        .attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")");

svg.append("g").attr("id", "links");
svg.append("g").attr("id", "nodes");
svg.append("g").attr("id", "collapsers");

tooltip = d3.select("#chart").append("div").attr("id", "tooltip");

tooltip.style("opacity", 0)
    .append("p")
      .attr("class", "value");

biHiSankey = d3.biHiSankey();

// Set the biHiSankey diagram properties
biHiSankey
  .nodeWidth(NODE_WIDTH)
  .nodeSpacing(10)
  .linkSpacing(4)
  .arrowheadScaleFactor(0.5) // Specifies that 0.5 of the link's stroke WIDTH should be allowed for the marker at the end of the link.
  .size([WIDTH, HEIGHT]);

path = biHiSankey.link().curvature(0.45);

defs = svg.append("defs");

defs.append("marker")
  .style("fill", LINK_COLOR)
  .attr("id", "arrowHead")
  .attr("viewBox", "0 0 6 10")
  .attr("refX", "1")
  .attr("refY", "5")
  .attr("markerUnits", "strokeWidth")
  .attr("markerWidth", "1")
  .attr("markerHeight", "1")
  .attr("orient", "auto")
  .append("path")
    .attr("d", "M 0 0 L 1 0 L 6 5 L 1 10 L 0 10 z");

defs.append("marker")
  .style("fill", OUTFLOW_COLOR)
  .attr("id", "arrowHeadInflow")
  .attr("viewBox", "0 0 6 10")
  .attr("refX", "1")
  .attr("refY", "5")
  .attr("markerUnits", "strokeWidth")
  .attr("markerWidth", "1")
  .attr("markerHeight", "1")
  .attr("orient", "auto")
  .append("path")
    .attr("d", "M 0 0 L 1 0 L 6 5 L 1 10 L 0 10 z");

defs.append("marker")
  .style("fill", INFLOW_COLOR)
  .attr("id", "arrowHeadOutlow")
  .attr("viewBox", "0 0 6 10")
  .attr("refX", "1")
  .attr("refY", "5")
  .attr("markerUnits", "strokeWidth")
  .attr("markerWidth", "1")
  .attr("markerHeight", "1")
  .attr("orient", "auto")
  .append("path")
    .attr("d", "M 0 0 L 1 0 L 6 5 L 1 10 L 0 10 z");

function update () {
  var link, linkEnter, node, nodeEnter, collapser, collapserEnter;

  function dragmove(node) {
    node.x = Math.max(0, Math.min(WIDTH - node.width, d3.event.x));
    node.y = Math.max(0, Math.min(HEIGHT - node.height, d3.event.y));
    d3.select(this).attr("transform", "translate(" + node.x + "," + node.y + ")");
    biHiSankey.relayout();
    svg.selectAll(".node").selectAll("rect").attr("height", function (d) { return d.height; });
    link.attr("d", path);
  }

  function containChildren(node) {
    node.children.forEach(function (child) {
      child.state = "contained";
      child.parent = this;
      child._parent = null;
      containChildren(child);
    }, node);
  }

  function expand(node) {
    node.state = "expanded";
    node.children.forEach(function (child) {
      child.state = "collapsed";
      child._parent = this;
      child.parent = null;
      containChildren(child);
    }, node);
  }

  function collapse(node) {
    node.state = "collapsed";
    containChildren(node);
  }

  function restoreLinksAndNodes() {
    link
      .style("stroke", LINK_COLOR)
      .style("marker-end", function () { return 'url(#arrowHead)'; })
      .transition()
        .duration(TRANSITION_DURATION)
        .style("opacity", OPACITY.LINK_DEFAULT);

    node
      .selectAll("rect")
        .style("fill", function (d) {
          d.color = colorScale(d.type.replace(/ .*/, ""));
          return d.color;
        })
        .style("stroke", function (d) {
          return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1);
        })
        .style("fill-opacity", OPACITY.NODE_DEFAULT);

    node.filter(function (n) { return n.state === "collapsed"; })
      .transition()
        .duration(TRANSITION_DURATION)
        .style("opacity", OPACITY.NODE_DEFAULT);
  }

  function showHideChildren(node) {
    disableUserInterractions(2 * TRANSITION_DURATION);
    hideTooltip();
    if (node.state === "collapsed") { expand(node); }
    else { collapse(node); }

    biHiSankey.relayout();
    update();
    link.attr("d", path);
    restoreLinksAndNodes();
  }

  function highlightConnected(g) {
    link.filter(function (d) { return d.source === g; })
      .style("marker-end", function () { return 'url(#arrowHeadInflow)'; })
      .style("stroke", OUTFLOW_COLOR)
      .style("opacity", OPACITY.LINK_DEFAULT);

    link.filter(function (d) { return d.target === g; })
      .style("marker-end", function () { return 'url(#arrowHeadOutlow)'; })
      .style("stroke", INFLOW_COLOR)
      .style("opacity", OPACITY.LINK_DEFAULT);
  }

  function fadeUnconnected(g) {
    link.filter(function (d) { return d.source !== g && d.target !== g; })
      .style("marker-end", function () { return 'url(#arrowHead)'; })
      .transition()
        .duration(TRANSITION_DURATION)
        .style("opacity", OPACITY.LINK_FADED);

    node.filter(function (d) {
      return (d.name === g.name) ? false : !biHiSankey.connected(d, g);
    }).transition()
      .duration(TRANSITION_DURATION)
      .style("opacity", OPACITY.NODE_FADED);
  }

  link = svg.select("#links").selectAll("path.link")
    .data(biHiSankey.visibleLinks(), function (d) { return d.id; });

  link.transition()
    .duration(TRANSITION_DURATION)
    .style("stroke-WIDTH", function (d) { return Math.max(1, d.thickness); })
    .attr("d", path)
    .style("opacity", OPACITY.LINK_DEFAULT);


  link.exit().remove();


  linkEnter = link.enter().append("path")
    .attr("class", "link")
    .style("fill", "none");

  linkEnter.on('mouseenter', function (d) {
    if (!isTransitioning) {
      showTooltip().select(".value").text(function () {
        if (d.direction > 0) {
          return d.source.name + " -> " + d.target.name + "\n" + formatNumber(d.value);
        }
        return d.target.name + " <- " + d.source.name + "\n" + formatNumber(d.value);
      });

      d3.select(this)
        .style("stroke", LINK_COLOR)
        .transition()
          .duration(TRANSITION_DURATION / 2)
          .style("opacity", OPACITY.LINK_HIGHLIGHT);
    }
  });

  linkEnter.on('mouseleave', function () {
    if (!isTransitioning) {
      hideTooltip();

      d3.select(this)
        .style("stroke", LINK_COLOR)
        .transition()
          .duration(TRANSITION_DURATION / 2)
          .style("opacity", OPACITY.LINK_DEFAULT);
    }
  });

  linkEnter.sort(function (a, b) { return b.thickness - a.thickness; })
    .classed("leftToRight", function (d) {
      return d.direction > 0;
    })
    .classed("rightToLeft", function (d) {
      return d.direction < 0;
    })
    .style("marker-end", function () {
      return 'url(#arrowHead)';
    })
    .style("stroke", LINK_COLOR)
    .style("opacity", 0)
    .transition()
      .delay(TRANSITION_DURATION)
      .duration(TRANSITION_DURATION)
      .attr("d", path)
      .style("stroke-WIDTH", function (d) { return Math.max(1, d.thickness); })
      .style("opacity", OPACITY.LINK_DEFAULT);


  node = svg.select("#nodes").selectAll(".node")
      .data(biHiSankey.collapsedNodes(), function (d) { return d.id; });


  node.transition()
    .duration(TRANSITION_DURATION)
    .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
    .style("opacity", OPACITY.NODE_DEFAULT)
    .select("rect")
      .style("fill", function (d) {
        d.color = colorScale(d.type.replace(/ .*/, ""));
        return d.color;
      })
      .style("stroke", function (d) { return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1); })
      .style("stroke-WIDTH", "1px")
      .attr("height", function (d) { return d.height; })
      .attr("width", biHiSankey.nodeWidth());


  node.exit()
    .transition()
      .duration(TRANSITION_DURATION)
      .attr("transform", function (d) {
        var collapsedAncestor, endX, endY;
        collapsedAncestor = d.ancestors.filter(function (a) {
          return a.state === "collapsed";
        })[0];
        endX = collapsedAncestor ? collapsedAncestor.x : d.x;
        endY = collapsedAncestor ? collapsedAncestor.y : d.y;
        return "translate(" + endX + "," + endY + ")";
      })
      .remove();


  nodeEnter = node.enter().append("g").attr("class", "node");

  nodeEnter
    .attr("transform", function (d) {
      var startX = d._parent ? d._parent.x : d.x,
          startY = d._parent ? d._parent.y : d.y;
      return "translate(" + startX + "," + startY + ")";
    })
    .style("opacity", 1e-6)
    .transition()
      .duration(TRANSITION_DURATION)
      .style("opacity", OPACITY.NODE_DEFAULT)
      .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

  nodeEnter.append("text");
  nodeEnter.append("rect")
    .style("fill", function (d) {
      d.color = colorScale(d.type.replace(/ .*/, ""));
      return d.color;
    })
    .style("stroke", function (d) {
      return d3.rgb(colorScale(d.type.replace(/ .*/, ""))).darker(0.1);
    })
    .style("stroke-WIDTH", "1px")
    .attr("height", function (d) { return d.height; })
    .attr("width", biHiSankey.nodeWidth());

  node.on("mouseenter", function (g) {
    if (!isTransitioning) {
      currentNodeSubj.next(g);
      restoreLinksAndNodes();
      highlightConnected(g);
      fadeUnconnected(g);

      d3.select(this).select("rect")
        .style("fill", function (d) {
          d.color = d.netFlow > 0 ? INFLOW_COLOR : OUTFLOW_COLOR;
          return d.color;
        })
        .style("stroke", function (d) {
          return d3.rgb(d.color).darker(0.1);
        })
        .style("fill-opacity", OPACITY.LINK_DEFAULT);

      tooltip
        .style("left", g.x + MARGIN.LEFT + "px")
        .style("top", g.y + g.height + MARGIN.TOP + 15 + "px")
        .transition()
          .duration(TRANSITION_DURATION)
          .style("opacity", 1).select(".value")
          .text(function () {
            var additionalInstructions = g.children.length ? "" : "";
            return  "\n" +g.name + "\nNet flow: " + formatFlow(g.netFlow) + additionalInstructions;
          });
    }
  });

  node.on("mouseleave", function () {
    if (!isTransitioning) {
      hideTooltip();
      restoreLinksAndNodes();
    }
  });
  node.filter(function (d) { return d.children.length; })
    .on("dblclick", showHideChildren);

  // allow nodes to be dragged to new positions
  node.call(d3.behavior.drag()
    .origin(function (d) { return d; })
    .on("dragstart", function () { this.parentNode.appendChild(this); })
    .on("drag", dragmove));

  // add in the text for the nodes
  node.filter(function (d) { return d.value !== 0; })
    .select("text")
      .attr("x", -6)
      .attr("y", function (d) { return d.height / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function (d) { return d.name; })
    .filter(function (d) { return d.x < WIDTH / 2; })
      .attr("x", 6 + biHiSankey.nodeWidth())
      .attr("text-anchor", "start");


  collapser = svg.select("#collapsers").selectAll(".collapser")
    .data(biHiSankey.expandedNodes(), function (d) { return d.id; });


  collapserEnter = collapser.enter().append("g").attr("class", "collapser");

  collapserEnter.append("circle")
    .attr("r", COLLAPSER.RADIUS)
    .style("fill", function (d) {
      d.color = colorScale(d.type.replace(/ .*/, ""));
      return d.color;
    });

  collapserEnter
    .style("opacity", OPACITY.NODE_DEFAULT)
    .attr("transform", function (d) {
      return "translate(" + (d.x + d.width / 2) + "," + (d.y + COLLAPSER.RADIUS) + ")";
    });

  collapserEnter.on("dblclick", showHideChildren);

  collapser.select("circle")
    .attr("r", COLLAPSER.RADIUS);

  collapser.transition()
    .delay(TRANSITION_DURATION)
    .duration(TRANSITION_DURATION)
    .attr("transform", function (d, i) {
      return "translate("
        + (COLLAPSER.RADIUS + i * 2 * (COLLAPSER.RADIUS + COLLAPSER.SPACING))
        + ","
        + (-COLLAPSER.RADIUS - OUTER_MARGIN)
        + ")";
    });

  collapser.on("mouseenter", function (g) {
    if (!isTransitioning) {
      showTooltip().select(".value")
        .text(function () {
          return g.name + "\n(Double click to collapse)";
        });

      var highlightColor = highlightColorScale(g.type.replace(/ .*/, ""));

      d3.select(this)
        .style("opacity", OPACITY.NODE_HIGHLIGHT)
        .select("circle")
          .style("fill", highlightColor);

      node.filter(function (d) {
        return d.ancestors.indexOf(g) >= 0;
      }).style("opacity", OPACITY.NODE_HIGHLIGHT)
        .select("rect")
          .style("fill", highlightColor);
    }
  });

  collapser.on("mouseleave", function (g) {
    if (!isTransitioning) {
      hideTooltip();
      d3.select(this)
        .style("opacity", OPACITY.NODE_DEFAULT)
        .select("circle")
          .style("fill", function (d) { return d.color; });

      node.filter(function (d) {
        return d.ancestors.indexOf(g) >= 0;
      }).style("opacity", OPACITY.NODE_DEFAULT)
        .select("rect")
          .style("fill", function (d) { return d.color; });
    }
  });

  collapser.exit().remove();

}


var exampleNodes = [
  {"type":"Fund","id":"fund10122","parent":null,"name":"RBC PRIV SH-TERM INC PL CL O"},
{"type":"Fund","id":10122,"parent":"fund10122","number":"1000000","name":"RBC PRIV SH-TERM INC PL CL O"},
{"type":"Fund","id":"fund1014","parent":null,"name":"RBC CANADIAN DIVIDEND FUND SERIES D"},
{"type":"Fund","id":1014,"parent":"fund1014","number":"1000000","name":"RBC CANADIAN DIVIDEND FUND SERIES D"},
{"type":"Fund","id":"fund10170","parent":null,"name":"RBC PRIVATE U.S. SML-CAP EQ PL - O"},
{"type":"Fund","id":10170,"parent":"fund10170","number":"1000000","name":"RBC PRIVATE U.S. SML-CAP EQ PL - O"},
{"type":"Fund","id":"fund10455","parent":null,"name":"RBC QUBE LOW VOL U.S. EQ. (USD) O"},
{"type":"Fund","id":10455,"parent":"fund10455","number":"1000000","name":"RBC QUBE LOW VOL U.S. EQ. (USD) O"},
{"type":"Fund","id":"fund137","parent":null,"name":"RBC BOND FUND O-SERIES"},
{"type":"Fund","id":137,"parent":"fund137","number":"1000000","name":"RBC BOND FUND O-SERIES"},
{"type":"Fund","id":"fund194","parent":null,"name":"RBC GLOBAL CORPORATE BOND FUND-O"},
{"type":"Fund","id":194,"parent":"fund194","number":"1000000","name":"RBC GLOBAL CORPORATE BOND FUND-O"},
{"type":"Fund","id":"fund2010","parent":null,"name":"RBC INVESTMENT SAVINGS ACCT A (RBC)"},
{"type":"Fund","id":2010,"parent":"fund2010","number":"1000000","name":"RBC INVESTMENT SAVINGS ACCT A (RBC)"},
{"type":"Fund","id":"fund2011","parent":null,"name":"RBC INVESTMENT SAVINGS ACCT F (RBC)"},
{"type":"Fund","id":2011,"parent":"fund2011","number":"1000000","name":"RBC INVESTMENT SAVINGS ACCT F (RBC)"},
{"type":"Fund","id":"fund2012","parent":null,"name":"RBC INVESTMENT CORPORATE SERIES A"},
{"type":"Fund","id":2012,"parent":"fund2012","number":"1000000","name":"RBC INVESTMENT CORPORATE SERIES A"},
{"type":"Fund","id":"fund2013","parent":null,"name":"RBC INVESTMENT CORPORATE SERIES F"},
{"type":"Fund","id":2013,"parent":"fund2013","number":"1000000","name":"RBC INVESTMENT CORPORATE SERIES F"},
{"type":"Fund","id":"fund2014","parent":null,"name":"USD RBC INVESTMENT SAVINGS ACCT A"},
{"type":"Fund","id":2014,"parent":"fund2014","number":"1000000","name":"USD RBC INVESTMENT SAVINGS ACCT A"},
{"type":"Fund","id":"fund2015","parent":null,"name":"USD RBC INVESTMENT SAVINGS ACCT F"},
{"type":"Fund","id":2015,"parent":"fund2015","number":"1000000","name":"USD RBC INVESTMENT SAVINGS ACCT F"},
{"type":"Fund","id":"fund2017","parent":null,"name":"USD RBC INVESTMENT CORP SERIES F"},
{"type":"Fund","id":2017,"parent":"fund2017","number":"1000000","name":"USD RBC INVESTMENT CORP SERIES F"},
{"type":"Fund","id":"fund201","parent":null,"name":"RBC INTERNATIONAL EQUITY FD SER O"},
{"type":"Fund","id":201,"parent":"fund201","number":"1000000","name":"RBC INTERNATIONAL EQUITY FD SER O"},
{"type":"Fund","id":"fund202","parent":null,"name":"RBC EUROPEAN EQUITY FUND SERIES O"},
{"type":"Fund","id":202,"parent":"fund202","number":"1000000","name":"RBC EUROPEAN EQUITY FUND SERIES O"},
{"type":"Fund","id":"fund209","parent":null,"name":"SELECT VERY CONSERVATIVE A"},
{"type":"Fund","id":209,"parent":"fund209","number":"1000000","name":"SELECT VERY CONSERVATIVE A"},
{"type":"Fund","id":"fund266","parent":null,"name":"RBC CANADIAN DIVIDEND FUND"},
{"type":"Fund","id":266,"parent":"fund266","number":"1000000","name":"RBC CANADIAN DIVIDEND FUND"},
{"type":"Fund","id":"fund282","parent":null,"name":"RBC STRATEGIC INC BOND FUND O"},
{"type":"Fund","id":282,"parent":"fund282","number":"1000000","name":"RBC STRATEGIC INC BOND FUND O"},
{"type":"Fund","id":"fund289","parent":null,"name":"RBC QUBE LOW VOL CDN EQTY FND-O"},
{"type":"Fund","id":289,"parent":"fund289","number":"1000000","name":"RBC QUBE LOW VOL CDN EQTY FND-O"},
{"type":"Fund","id":"fund290","parent":null,"name":"BLUEBAY GLOB. CONV. BND FND CAD-O"},
{"type":"Fund","id":290,"parent":"fund290","number":"1000000","name":"BLUEBAY GLOB. CONV. BND FND CAD-O"},
{"type":"Fund","id":"fund460","parent":null,"name":"SELECT BALANCED PORTFOLIO"},
{"type":"Fund","id":460,"parent":"fund460","number":"1000000","name":"SELECT BALANCED PORTFOLIO"},
{"type":"Fund","id":"fund461","parent":null,"name":"SELECT CONSERVATIVE"},
{"type":"Fund","id":461,"parent":"fund461","number":"1000000","name":"SELECT CONSERVATIVE"},
{"type":"Fund","id":"fund5280","parent":null,"name":"PH&N HIGH YIELD BOND-F"},
{"type":"Fund","id":5280,"parent":"fund5280","number":"1000000","name":"PH&N HIGH YIELD BOND-F"},
{"type":"Fund","id":"fund587","parent":null,"name":"RBC U.S. MONTHLY INCOME FD (USD) A"},
{"type":"Fund","id":587,"parent":"fund587","number":"1000000","name":"RBC U.S. MONTHLY INCOME FD (USD) A"},
{"type":"Fund","id":"fund601","parent":null,"name":"BOND FUND"},
{"type":"Fund","id":601,"parent":"fund601","number":"1000000","name":"BOND FUND"},
{"type":"Fund","id":"fund607","parent":null,"name":"RBC CANADIAN DIVIDEND FUND"},
{"type":"Fund","id":607,"parent":"fund607","number":"1000000","name":"RBC CANADIAN DIVIDEND FUND"},
{"type":"Fund","id":"fund640","parent":null,"name":"RBC U.S. MONTHLY INCOME FD (USD) F"},
{"type":"Fund","id":640,"parent":"fund640","number":"1000000","name":"RBC U.S. MONTHLY INCOME FD (USD) F"},
{"type":"Fund","id":"fund646","parent":null,"name":"RBC CANADIAN EQUITY INCOME FUND F"},
{"type":"Fund","id":646,"parent":"fund646","number":"1000000","name":"RBC CANADIAN EQUITY INCOME FUND F"},
{"type":"Fund","id":"fund654","parent":null,"name":"RBC PREMIUM $U.S. MONEY MARKET F"},
{"type":"Fund","id":654,"parent":"fund654","number":"1000000","name":"RBC PREMIUM $U.S. MONEY MARKET F"},
{"type":"Fund","id":"fund657","parent":null,"name":"RBC SELECT CONSERVATIVE PORTFOLIO F"},
{"type":"Fund","id":657,"parent":"fund657","number":"1000000","name":"RBC SELECT CONSERVATIVE PORTFOLIO F"},
{"type":"Fund","id":"fund658","parent":null,"name":"RBC SELECT BALANCED PORTFOLIO SER F"},
{"type":"Fund","id":658,"parent":"fund658","number":"1000000","name":"RBC SELECT BALANCED PORTFOLIO SER F"},
{"type":"Fund","id":"fund664","parent":null,"name":"SELECT VERY CONSERVATIVE F"},
{"type":"Fund","id":664,"parent":"fund664","number":"1000000","name":"SELECT VERY CONSERVATIVE F"},
{"type":"Fund","id":"fund682","parent":null,"name":"RBC STRATEGIC INC BOND FUND F"},
{"type":"Fund","id":682,"parent":"fund682","number":"1000000","name":"RBC STRATEGIC INC BOND FUND F"},
{"type":"Fund","id":"fund696","parent":null,"name":"RBC HIGH YIELD BOND - F"},
{"type":"Fund","id":696,"parent":"fund696","number":"1000000","name":"RBC HIGH YIELD BOND - F"},
{"type":"Fund","id":"fund7280","parent":null,"name":"PH&N HIGH YIELD BOND FUND A"},
{"type":"Fund","id":7280,"parent":"fund7280","number":"1000000","name":"PH&N HIGH YIELD BOND FUND A"},
{"type":"Fund","id":"fund762","parent":null,"name":"RBC CANADIAN EQUITY INCOME FUND-ISC"},
{"type":"Fund","id":762,"parent":"fund762","number":"1000000","name":"RBC CANADIAN EQUITY INCOME FUND-ISC"},
{"type":"Fund","id":"fund8125","parent":null,"name":"PH&N CDN MONEY MARKET-O"},
{"type":"Fund","id":8125,"parent":"fund8125","number":"1000000","name":"PH&N CDN MONEY MARKET-O"},
{"type":"Fund","id":"fund8285","parent":null,"name":"PH&N HIGH YIELD BOND-O"},
{"type":"Fund","id":8285,"parent":"fund8285","number":"1000000","name":"PH&N HIGH YIELD BOND-O"},
{"type":"Fund","id":"fund8345","parent":null,"name":"PH&N TOTAL RETURN BOND-O"},
{"type":"Fund","id":8345,"parent":"fund8345","number":"1000000","name":"PH&N TOTAL RETURN BOND-O"},
{"type":"Fund","id":"fund8472","parent":null,"name":"RBC CANADIAN PREFERRED SHARE FD - O"},
{"type":"Fund","id":8472,"parent":"fund8472","number":"1000000","name":"RBC CANADIAN PREFERRED SHARE FD - O"},
{"type":"Fund","id":"fund911299","parent":null,"name":"RBC MULTI-STRATEGY ALPHA FUND F (A)"},
{"type":"Fund","id":911299,"parent":"fund9112A","number":"1000000","name":"RBC MULTI-STRATEGY ALPHA FUND F (A)"},
{"type":"Fund","id":"fund9112","parent":null,"name":"RBC MULTI-STRATEGY ALPHA FUND F (R)"},
{"type":"Fund","id":9112,"parent":"fund9112","number":"1000000","name":"RBC MULTI-STRATEGY ALPHA FUND F (R)"}
]

var exampleLinks = [

{"source":2010, "target":2011, "value":97187401.70},
{"source":266, "target":607, "value":49364397.43},
{"source":2011, "target":2010, "value":33829280.13},
{"source":2010, "target":2012, "value":28358885.50},
{"source":461, "target":657, "value":21564075.09},
{"source":266, "target":1014, "value":21396640.46},
{"source":2011, "target":2013, "value":20342858.43},
{"source":2012, "target":2010, "value":17971425.27},
{"source":762, "target":646, "value":17821273.60},
{"source":460, "target":658, "value":17681025.81},
{"source":696, "target":682, "value":15668809.30},
{"source":9112, "target":911299, "value":15558570.00},
{"source":137, "target":601, "value":15284572.14},
{"source":2014, "target":2015, "value":14761989.26},
{"source":2011, "target":8285, "value":14584363.92},
{"source":289, "target":202, "value":14565361.78},
{"source":2015, "target":654, "value":14268414.45},
{"source":2011, "target":10122, "value":13874998.38},
{"source":194, "target":282, "value":11700108.06},
{"source":290, "target":282, "value":11579470.91},
{"source":8345, "target":8472, "value":11313447.48},
{"source":2015, "target":2017, "value":10249442.68},
{"source":209, "target":664, "value":9909745.63},
{"source":7280, "target":5280, "value":9215556.62},
{"source":2011, "target":8345, "value":8922949.88},
{"source":201, "target":2011, "value":8816084.53},
{"source":8125, "target":8345, "value":8708205.29},
{"source":10170, "target":10455, "value":8693797.75},
{"source":587, "target":640, "value":8637926.10}
]

biHiSankey
  .nodes(exampleNodes)
  .links(exampleLinks)
  .initializeNodes(function (node) {
    node.state = node.parent ? "contained" : "collapsed";
  })
  .layout(LAYOUT_INTERATIONS);

disableUserInterractions(2 * TRANSITION_DURATION);

update();
