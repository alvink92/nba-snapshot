import targetData from "../data/boxscore.json";
import pltStatBreakdown from "./stat_breakdown";
import { sunburstDataBy } from "./stat_breakdown";

let statType = "PTS";
let datas = Object.values(sunburstDataBy(statType, targetData));
let team1 = datas[0];
let team2 = datas[1];
let combined = { name: "Combined", children: [team1, team2] };

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
