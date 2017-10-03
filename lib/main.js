import targetData from "../data/boxscore.json";
import pltStatBreakdown from "./stat_breakdown";
import { sunburstDataBy } from "./stat_breakdown";
pltStatBreakdown("#stat-breakdown", targetData);

window.test = sunburstDataBy;
window.data = targetData;

window.d = sunburstDataBy("FGM", targetData);
