import targetData from "../data/boxscore.json";
import pltStatBreakdown from "./stat_breakdown";
import { sunburstDataBy } from "./stat_breakdown";

window.test = sunburstDataBy;
window.data = targetData;

let datas = Object.values(sunburstDataBy("PTS", targetData));
window.d = datas;
pltStatBreakdown("#stat-breakdown", datas[0]);

// var partition = d3.layout.partition(d["GSW"])
//       .value(function(d) { return d.amt; });
//
// partition.nodes(d["GSW"])
