import targetData from "../data/boxscore.json";
import pltStatBreakdown from "./stat_breakdown";
import { sunburstDataBy } from "./stat_breakdown";

window.pltStatBreakdown = pltStatBreakdown;
window.targetData = targetData;
window.sunburstDataBy = sunburstDataBy;

function initialize() {
  let statType = "PTS";
  let datas = Object.values(sunburstDataBy(statType, targetData));

  pltStatBreakdown(
    { name: "team", children: [datas[0]] },
    statType,
    "#t1-sunburst"
  );
  pltStatBreakdown(
    { name: "team", children: [datas[1]] },
    statType,
    "#t2-sunburst"
  );
}

initialize();
