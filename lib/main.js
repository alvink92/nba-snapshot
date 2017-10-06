import targetData from "../data/boxscore.json";
import pltStatBreakdown from "./stat_breakdown";
import { sunburstDataBy } from "./stat_breakdown";

window.pltStatBreakdown = pltStatBreakdown;
window.targetData = targetData;
window.sunburstDataBy = sunburstDataBy;
console.log(targetData);
function initialize(statType, apiData) {
  let datas = Object.values(sunburstDataBy(statType, apiData));

  $("#game-id-key")
    .empty()
    .text("Game ID:");
  $("#game-id-val")
    .empty()
    .text(apiData.parameters.GameID);
  $("#sequence").empty();
  $("#t1-sunburst").empty();
  $("#t2-sunburst").empty();
  $("#header-title-t1")
    .empty()
    .text(datas[0].name);
  $("#header-title-t2")
    .empty()
    .text(datas[1].name);

  pltStatBreakdown(
    { name: "team", children: [datas[0]] },
    statType,
    "#t1-sunburst",
    "t1-trail"
  );
  pltStatBreakdown(
    { name: "team", children: [datas[1]] },
    statType,
    "#t2-sunburst",
    "t2-trail"
  );
}

window.initialize = initialize;

initialize("PTS", targetData);
