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
  const width = 600;
  const height = 600;
  const radius = Math.min(width, height) / 2 - 10;
  const color = d3.scale.category20c();

  const xScale = d3.scale.linear().range([0, 2 * Math.PI]);
  const yScale = d3.scale.linear().range([0, radius]);

  let partition = d3.layout.partition(data).value(function(d) {
    return d.amt;
  });
  let totalVal = partition.nodes(data).map(node => node.value)[0];

  const handleMouseover = d => {};

  const handleClick = d => {};

  var arc = d3.svg
    .arc()
    .startAngle(function(d) {
      return Math.max(0, Math.min(2 * Math.PI, xScale(d.x)));
    })
    .endAngle(function(d) {
      return Math.max(0, Math.min(2 * Math.PI, xScale(d.x + d.dx)));
    })
    .innerRadius(function(d) {
      return Math.max(0, yScale(d.y));
    })
    .outerRadius(function(d) {
      return Math.max(0, yScale(d.y + d.dy));
    });

  let svg = d3
    .select(attach)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  var path = svg
    .selectAll("path")
    .data(partition.nodes(data))
    .enter()
    .append("path")
    .attr("d", arc)
    .style("fill", function(d) {
      if (d.parent == null) {
        return "#FFF";
      }
      return color((d.children ? d : d.parent).name);
    })
    .append("title")
    .text(function(d) {
      return d.name + "\n" + d.value;
    })
    .classed("tooltip", true);
};

export default pltStatBreakdown;
