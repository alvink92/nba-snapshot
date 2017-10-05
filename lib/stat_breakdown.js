const pltStatBreakdown = (data, statType, sunburstAttach) => {
  let width = 500,
    height = 500,
    radius = Math.min(width, height) / 2 - 50,
    color = d3.scaleOrdinal(d3.schemeCategory20c);

  let x = d3.scaleLinear().range([0, 2 * Math.PI]);

  let y = d3.scaleSqrt().range([0, radius]);

  let b = {
    w: 100,
    h: 30,
    s: 3,
    t: 10
  };

  initializeBreadcrumbTrail();

  let svg = d3
    .select(sunburstAttach)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr(
      "transform",
      "translate(" + width / 2 + "," + (height / 2 - 50) + ")"
    );

  let partition = d3.partition();
  let root = d3
    .hierarchy(data)
    .sum(function(d) {
      return d.amt;
    })
    .sort(function(a, b) {
      return b.value - a.value;
    });

  partition(root);

  var arc = d3
    .arc()
    .startAngle(function(d) {
      return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
    })
    .endAngle(function(d) {
      return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
    })
    .innerRadius(function(d) {
      return Math.max(0, y(d.y0));
    })
    .outerRadius(function(d) {
      return Math.max(0, y(d.y1));
    });

  let path = svg
    .selectAll("path")
    .data(partition(root).descendants())
    .enter()
    .append("path")
    .on("click", click)
    .on("mouseover", mouseover)
    .on("mouseleave", mouseleave)
    .attr("d", arc)
    .style("stroke", "#fff")
    .style("stroke-width", 0.75)
    .style("fill", function(d) {
      return d.parent ? color(d.data.name) : "#FFF";
    });

  let totalSize = path.node().__data__.value;
  function click(d) {
    svg
      .transition()
      .duration(750)
      .tween("scale", function() {
        var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
          yd = d3.interpolate(y.domain(), [d.y0, 1]),
          yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);

        return function(t) {
          x.domain(xd(t));
          y.domain(yd(t)).range(yr(t));
        };
      })
      .selectAll("path")
      .attrTween("d", function(d) {
        return function() {
          return arc(d);
        };
      });
  }

  function mouseover(d) {
    let percent = (100 * d.value / totalSize).toPrecision(3);
    let percentStr = percent < 0.1 ? "< 0.1%" : `${percent}%`;
    let rawStr = "" + d.value;
    let ancestors = getAncestors(d);

    d3.selectAll("path").style("opacity", 0.3);
    svg
      .selectAll("path")
      .filter(function(node) {
        return ancestors.indexOf(node) >= 0;
      })
      .style("opacity", 1);

    updateBreadcrumbs(ancestors, percentStr, rawStr);
  }

  function getAncestors(node) {
    let ancestors = [];
    let current = node;
    while (current.parent) {
      ancestors.unshift(current);
      current = current.parent;
    }
    return ancestors;
  }

  function updateBreadcrumbs(nodeArray, percentageString, rawStr) {
    var g = d3
      .select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) {
        return d.data.name + d.depth;
      });

    let entering = g.enter().append("svg:g");

    entering
      .append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) {
        return color(d.data.name);
      });

    entering
      .append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.data.name;
      });

    d3
      .select("#trail")
      .selectAll("g")
      .attr("transform", function(d, i) {
        return "translate(" + (d.depth - 1) * (b.w + b.s) + ", 0)";
      });

    g.exit().remove();

    // Now move and update the percentage at the end.
    d3
      .select("#trail")
      .select("#endlabel")
      .attr("x", nodeArray.length * (b.w + b.s) + b.t)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "left")
      .text(percentageString + " → " + rawStr + " " + statType);
    // .text(percentageString + "\n" + rawStr + " " + statType);

    // Make the breadcrumb trail visible, if it's hidden.
    d3.select("#trail").style("visibility", "");
  }

  function initializeBreadcrumbTrail() {
    // Add the svg area.
    var trail = d3
      .select("#sequence")
      .append("svg:svg")
      .attr("width", width)
      .attr("height", 50)
      .attr("id", "trail");
    trail
      .append("svg:text")
      .attr("id", "endlabel")
      .style("fill", "#000");
  }

  function breadcrumbPoints(d, i) {
    var points = [];
    var widthForThisLabel = b.w;

    points.push("0,0");
    points.push(widthForThisLabel + ",0");
    points.push(widthForThisLabel + b.t + "," + b.h / 2);
    points.push(widthForThisLabel + "," + b.h);
    points.push("0," + b.h);
    if (i > 0) {
      // Leftmost breadcrumb; don't include 6th vertex.
      points.push(b.t + "," + b.h / 2);
    }

    return points.join(" ");
  }

  function mouseleave(d) {
    d3.select("#trail").style("visibility", "hidden");
    d3.selectAll("path").style("opacity", 1);
  }
};

export const sunburstDataBy = (type, boxscoreData) => {
  let sunburstData = {};

  const teamPartition = boxscoreData.resultSets[1];
  const playerPartition = boxscoreData.resultSets[0];
  const starterBenchPartition = boxscoreData.resultSets[2];

  const teamHeader = teamPartition.headers;
  const playerHeader = playerPartition.headers;
  const starterBenchHeader = starterBenchPartition.headers;

  const teamData = teamPartition.rowSet;
  const playerData = playerPartition.rowSet;
  const starterBenchData = starterBenchPartition.rowSet;

  // separate by team

  teamData.forEach(teamSet => {
    let team = teamSet[teamHeader.indexOf("TEAM_ABBREVIATION")];
    sunburstData[team] = { name: team, children: [] };
  });

  // populate next level by starter vs bench
  starterBenchData.forEach(sbSet => {
    let result = {};

    let team = sbSet[starterBenchHeader.indexOf("TEAM_ABBREVIATION")];
    let sbStatus = sbSet[starterBenchHeader.indexOf("STARTERS_BENCH")];

    result["name"] = sbStatus;

    if (sbStatus === "Starters") {
      result = {
        name: "Starters",
        children: [
          { name: "Forwards", children: [] },
          { name: "Center", children: [] },
          { name: "Guards", children: [] }
        ]
      };

      sunburstData[team]["children"].push(result);
    } else {
      result["children"] = [];
      sunburstData[team]["children"].push(result);
    }
  });

  // populate next level for players. players with positions gets nested
  // one level deeper
  playerData.forEach(playerSet => {
    let team = playerSet[playerHeader.indexOf("TEAM_ABBREVIATION")];
    let sbStatus =
      playerSet[playerHeader.indexOf("START_POSITION")] === ""
        ? "Bench"
        : "Starters";
    let position = playerSet[playerHeader.indexOf("START_POSITION")];

    switch (position) {
      case "F":
        position = "Forwards";
        break;
      case "G":
        position = "Guards";
        break;
      case "C":
        position = "Center";
        break;
      default:
        position = "";
    }

    let typeAmt = playerSet[playerHeader.indexOf(type)];
    let playerName = playerSet[playerHeader.indexOf("PLAYER_NAME")];

    let result = {};
    result["name"] = playerName;
    result["amt"] = typeAmt;
    // result["children"] = []

    sunburstData[team]["children"].forEach((sbChild, i) => {
      if (sbStatus === "Bench" && sbChild.name === "Bench") {
        sunburstData[team]["children"][i]["children"].push(result);
      } else if (sbStatus === "Starters") {
        sunburstData[team]["children"][i][
          "children"
        ].forEach((positionChild, j) => {
          if (positionChild["name"] === position) {
            sunburstData[team]["children"][i]["children"][j]["children"].push(
              result
            );
          }
        });
      }
    });
  });
  return sunburstData;
};

export default pltStatBreakdown;
