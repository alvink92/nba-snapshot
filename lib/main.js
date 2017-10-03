import targetData from "../data/boxscore.json";
import pltStatBreakdown from "./stat_breakdown";
import { sunburstDataBy } from "./stat_breakdown";

window.test = sunburstDataBy;
window.data = targetData;

window.d = sunburstDataBy("PTS", targetData);
pltStatBreakdown("#stat-breakdown", targetData, "PTS");

// var partition = d3.layout.partition(d["GSW"])
//       .value(function(d) { return d.amt; });
//
// partition.nodes(d["GSW"])
