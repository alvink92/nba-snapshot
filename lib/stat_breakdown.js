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
          { name: "F", children: [] },
          { name: "C", children: [] },
          { name: "G", children: [] }
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

const pltStatBreakdown = (attach, data) => {
  let width = 500,
    height = 500,
    radius = Math.min(width, height) / 2 - 50,
    color = d3.scaleOrdinal(d3.schemeCategory20b);

  let x = d3.scaleLinear().range([0, 2 * Math.PI]);

  let y = d3.scaleSqrt().range([0, radius]);

  let breadcrumbs = d3
    .select(attach)
    .append("breadcrumbs")
    .attr("transform", "translate(0, 0)");
  breadcrumbs.append("breadcrumb").attr("height", 50);

  let svg = d3
    .select(attach)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr(
      "transform",
      "translate(" + width / 2 + "," + (height / 2 + 30) + ")"
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
    .attr("d", arc)
    .style("stroke", "#fff")
    .style("stroke-width", 0.75)
    .style("fill", function(d) {
      return color(d.data.name);
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
    let ancestors = getAncestors(d);

    d3.selectAll("path").style("opacity", 0.3);
    svg
      .selectAll("path")
      .filter(function(node) {
        return ancestors.indexOf(node) >= 0;
      })
      .style("opacity", 1);

    updateBreadcrumbs(ancestors, percentStr);
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

  function updateBreadcrumbs(ancestors, percentStr) {
    breadcrumbs
      .selectAll("breacrumb")
      .attr("width", 100)
      .attr("fill", "blue");
  }
};
// let breadcrumbs = d3
//   .select(attach)
//   .append("breadcrumbs")
//   .attr("transform", "translate(0, 0)");
// breadcrumbs.append("breadcrumb").attr("height", 50);
export default pltStatBreakdown;
