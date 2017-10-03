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
    let statAmt = sbSet[starterBenchHeader.indexOf(type)];

    result["name"] = sbStatus;
    // result["amt"] = statAmt;
    if (sbStatus === "Starters") {
      result = {
        name: "Starter",
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
      if (sbStatus === "Bench") {
        sunburstData[team]["children"][i]["children"].push(result);
      } else {
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
  let currData = sunburstDataBy("PTS", data);

  let height = 700;
  let width = 700;
  let radius = Math.min(width, height) / 2;

  let color = d3
    .scaleOrdinal()
    .range(["red", "orange", "yellow", "green", "blue"]);

  let donutThickness = 25;

  let lv1InnerR = 50;
  let lv1OuterR = lv1InnerR + donutThickness;
  let lv2InnerR = lv1OuterR;
  let lv2OuterR = lv1OuterR + donutThickness;
  let lv3InnerR = lv2OuterR;
  let lv3OuterR = lv3InnerR + donutThickness;

  let canvas = d3
    .select(attach)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  let group = canvas
    .append("g")
    .attr("transform", `translate(${height / 2}, ${width / 2})`);

  let arc1 = d3
    .arc()
    .innerRadius(lv1InnerR)
    .outerRadius(lv2OuterR);

  let pie1 = d3.pie().value(function(d) {
    return d;
  });

  let arcs = group
    .selectAll(".arc")
    .data(
      pie1(currData["GSW"]["children"][0]["children"].map(child => child.amt))
    )
    .enter()
    .append("g")
    .attr("class", "arc");

  arcs
    .append("path")
    .attr("d", arc1)
    .attr("fill", function(d) {
      return color(d.data);
    });
};

export default pltStatBreakdown;

// export const sunburstDataBy = (type, boxscoreData) => {
//   let sunburstData = {};
//
//   const teamPartition = boxscoreData.resultSets[1];
//   const playerPartition = boxscoreData.resultSets[0];
//
//   const teamHeader = teamPartition.headers;
//   const playerHeader = playerPartition.headers;
//
//   const teamData = teamPartition.rowSet;
//   const playerData = playerPartition.rowSet;
//
//   // populate team data first
//   sunburstData["name"] = type;
//   sunburstData["children"] = [];
//
//   teamData.forEach(teamSet => {
//     let result = {};
//     result["name"] = teamSet[teamHeader.indexOf("TEAM_ABBREVIATION")];
//     result["children"] = [];
//     sunburstData["children"].push(result);
//   });
//
//   playerData.forEach(playerSet => {
//     let playerTeamAbbr = playerSet[playerHeader.indexOf("TEAM_ABBREVIATION")];
//     let typeAmt = playerSet[playerHeader.indexOf(type)];
//     let playerName = playerSet[playerHeader.indexOf("PLAYER_NAME")];
//
//     let playerResult = {};
//     playerResult["name"] = playerName;
//     playerResult["amt"] = typeAmt;
//
//     sunburstData["children"].forEach(lv1Slice => {
//       let teamAbbr = lv1Slice["name"];
//       let children = lv1Slice["children"];
//
//       if (playerTeamAbbr === teamAbbr) {
//         children.push(playerResult);
//       }
//     });
//   });
//
//   return sunburstData;
// };
