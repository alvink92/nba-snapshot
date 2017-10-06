/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _boxscore = __webpack_require__(1);

var _boxscore2 = _interopRequireDefault(_boxscore);

var _stat_breakdown = __webpack_require__(2);

var _stat_breakdown2 = _interopRequireDefault(_stat_breakdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.pltStatBreakdown = _stat_breakdown2.default;
window.targetData = _boxscore2.default;
window.sunburstDataBy = _stat_breakdown.sunburstDataBy;

function initialize(statType, apiData) {
  var datas = Object.values((0, _stat_breakdown.sunburstDataBy)(statType, apiData));

  $("#game-id-key").empty().text("Game ID:");
  $("#game-id-val").empty().text(apiData.parameters.GameID);
  $("#sequence").empty();
  $("#t1-sunburst").empty();
  $("#t2-sunburst").empty();
  $("#header-title-t1").empty().text(datas[0].name);
  $("#header-title-t2").empty().text(datas[1].name);

  (0, _stat_breakdown2.default)({ name: "team", children: [datas[0]] }, statType, "#t1-sunburst", "t1-trail");
  (0, _stat_breakdown2.default)({ name: "team", children: [datas[1]] }, statType, "#t2-sunburst", "t2-trail");
}

window.initialize = initialize;

initialize("PTS", _boxscore2.default);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {"resource":"boxscore","parameters":{"GameID":"0041600401","StartPeriod":1,"EndPeriod":10,"StartRange":0,"EndRange":28800,"RangeType":0},"resultSets":[{"name":"PlayerStats","headers":["GAME_ID","TEAM_ID","TEAM_ABBREVIATION","TEAM_CITY","PLAYER_ID","PLAYER_NAME","START_POSITION","COMMENT","MIN","FGM","FGA","FG_PCT","FG3M","FG3A","FG3_PCT","FTM","FTA","FT_PCT","OREB","DREB","REB","AST","STL","BLK","TO","PF","PTS","PLUS_MINUS"],"rowSet":[["0041600401",1610612739,"CLE","Cleveland",2544,"LeBron James","F","","40:02",9,20,0.45,2,6,0.333,8,12,0.667,3,12,15,8,0,2,8,4,28,-22],["0041600401",1610612739,"CLE","Cleveland",201567,"Kevin Love","F","","34:13",4,13,0.308,3,6,0.5,4,4,1,5,16,21,1,0,3,1,4,15,-11],["0041600401",1610612739,"CLE","Cleveland",202684,"Tristan Thompson","C","","22:25",0,3,0,0,0,0,0,0,0,3,1,4,2,0,0,1,2,0,-13],["0041600401",1610612739,"CLE","Cleveland",2747,"JR Smith","G","","28:12",1,4,0.25,1,2,0.5,0,0,0,0,0,0,0,0,0,2,1,3,-12],["0041600401",1610612739,"CLE","Cleveland",202681,"Kyrie Irving","G","","34:53",10,22,0.455,3,4,0.75,1,1,1,3,0,3,2,0,1,4,3,24,-17],["0041600401",1610612739,"CLE","Cleveland",101114,"Deron Williams","","","18:30",0,4,0,0,2,0,0,0,0,0,3,3,1,0,0,2,3,0,-8],["0041600401",1610612739,"CLE","Cleveland",2210,"Richard Jefferson","","","14:48",3,6,0.5,0,2,0,3,4,0.75,1,3,4,0,0,0,2,5,9,-7],["0041600401",1610612739,"CLE","Cleveland",202697,"Iman Shumpert","","","16:46",2,6,0.333,1,3,0.333,0,0,0,0,5,5,0,0,0,0,1,5,-7],["0041600401",1610612739,"CLE","Cleveland",2594,"Kyle Korver","","","19:43",0,3,0,0,3,0,0,0,0,0,4,4,1,0,0,0,0,0,-8],["0041600401",1610612739,"CLE","Cleveland",202682,"Derrick Williams","","","4:06",0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],["0041600401",1610612739,"CLE","Cleveland",2563,"Dahntay Jones","","","4:06",1,2,0.5,1,2,0.5,4,4,1,0,0,0,0,0,0,0,0,7,-1],["0041600401",1610612739,"CLE","Cleveland",2592,"James Jones","","","2:16",0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,-3],["0041600401",1610612739,"CLE","Cleveland",101112,"Channing Frye","","DNP - Coach's Decision                  ",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["0041600401",1610612744,"GSW","Golden State",201142,"Kevin Durant","F","","37:33",14,26,0.538,3,6,0.5,7,8,0.875,2,7,9,8,0,0,0,1,38,16],["0041600401",1610612744,"GSW","Golden State",203110,"Draymond Green","F","","36:09",3,12,0.25,1,5,0.2,2,3,0.667,1,10,11,2,2,1,2,4,9,12],["0041600401",1610612744,"GSW","Golden State",2585,"Zaza Pachulia","C","","14:26",4,5,0.8,0,0,0,0,1,0,2,3,5,0,2,0,0,3,8,5],["0041600401",1610612744,"GSW","Golden State",202691,"Klay Thompson","G","","36:22",3,16,0.188,0,5,0,0,0,0,2,2,4,4,1,0,0,3,6,8],["0041600401",1610612744,"GSW","Golden State",201939,"Stephen Curry","G","","34:29",11,22,0.5,6,11,0.545,0,0,0,1,5,6,10,3,0,2,3,28,20],["0041600401",1610612744,"GSW","Golden State",2738,"Andre Iguodala","","","23:60",3,4,0.75,1,1,1,0,2,0,1,2,3,1,2,1,0,3,7,14],["0041600401",1610612744,"GSW","Golden State",201580,"JaVale McGee","","","5:32",2,3,0.667,0,0,0,0,0,0,3,1,4,1,0,1,0,1,4,8],["0041600401",1610612744,"GSW","Golden State",2733,"Shaun Livingston","","","15:16",1,5,0.2,0,0,0,0,0,0,1,1,2,2,1,0,0,1,2,9],["0041600401",1610612744,"GSW","Golden State",2561,"David West","","","8:03",1,4,0.25,0,0,0,0,0,0,1,0,1,1,0,0,0,3,2,3],["0041600401",1610612744,"GSW","Golden State",203546,"Ian Clark","","","18:05",1,4,0.25,0,3,0,2,2,1,0,1,1,0,1,0,0,0,4,6],["0041600401",1610612744,"GSW","Golden State",203949,"James Michael McAdoo","","","4:22",1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,2,2,3],["0041600401",1610612744,"GSW","Golden State",1627775,"Patrick McCaw","","","3:28",0,2,0,0,1,0,0,0,0,0,3,3,1,0,0,0,0,0,3],["0041600401",1610612744,"GSW","Golden State",2440,"Matt Barnes","","","2:16",1,2,0.5,1,1,1,0,0,0,0,0,0,1,0,0,0,0,3,3]]},{"name":"TeamStats","headers":["GAME_ID","TEAM_ID","TEAM_NAME","TEAM_ABBREVIATION","TEAM_CITY","MIN","FGM","FGA","FG_PCT","FG3M","FG3A","FG3_PCT","FTM","FTA","FT_PCT","OREB","DREB","REB","AST","STL","BLK","TO","PF","PTS","PLUS_MINUS"],"rowSet":[["0041600401",1610612744,"Warriors","GSW","Golden State","240:00",45,106,0.425,12,33,0.364,11,16,0.688,14,36,50,31,12,3,4,24,113,22],["0041600401",1610612739,"Cavaliers","CLE","Cleveland","240:00",30,86,0.349,11,31,0.355,20,25,0.8,15,44,59,15,0,6,20,23,91,-22]]},{"name":"TeamStarterBenchStats","headers":["GAME_ID","TEAM_ID","TEAM_NAME","TEAM_ABBREVIATION","TEAM_CITY","STARTERS_BENCH","MIN","FGM","FGA","FG_PCT","FG3M","FG3A","FG3_PCT","FTM","FTA","FT_PCT","OREB","DREB","REB","AST","STL","BLK","TO","PF","PTS"],"rowSet":[["0041600401",1610612744,"Warriors","GSW","Golden State","Starters","158:59",35,81,0.432,10,27,0.37,9,12,0.75,8,27,35,24,8,1,4,14,89],["0041600401",1610612744,"Warriors","GSW","Golden State","Bench","60:13",7,17,0.412,2,6,0.333,2,4,0.5,2,7,9,4,3,1,0,8,18],["0041600401",1610612739,"Cavaliers","CLE","Cleveland","Starters","159:46",24,62,0.387,9,18,0.5,13,17,0.765,14,29,43,13,0,6,16,14,70],["0041600401",1610612739,"Cavaliers","CLE","Cleveland","Bench","80:14",6,24,0.25,2,13,0.154,7,8,0.875,1,15,16,2,0,0,4,9,21]]}]}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var pltStatBreakdown = function pltStatBreakdown(data, statType, sunburstAttach, trailAttach) {
  var width = 450,
      height = 450,
      radius = Math.min(width, height) / 2 - 50,
      color = d3.scaleOrdinal(d3.schemeCategory20c);

  var x = d3.scaleLinear().range([0, 2 * Math.PI]);

  var y = d3.scaleSqrt().range([0, radius]);

  var b = {
    w: 200,
    h: 30,
    s: 3,
    t: 10
  };

  initializeBreadcrumbTrail();

  var svg = d3.select(sunburstAttach).append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + (height / 2 - 50) + ")");

  var partition = d3.partition();
  var root = d3.hierarchy(data).sum(function (d) {
    return d.amt;
  }).sort(function (a, b) {
    return b.value - a.value;
  });

  partition(root);

  var arc = d3.arc().startAngle(function (d) {
    return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
  }).endAngle(function (d) {
    return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
  }).innerRadius(function (d) {
    return Math.max(0, y(d.y0));
  }).outerRadius(function (d) {
    return Math.max(0, y(d.y1));
  });

  var path = svg.selectAll("path").data(partition(root).descendants()).enter().append("path").on("click", click).on("mouseover", mouseover).on("mouseleave", mouseleave).attr("d", arc).style("stroke", "#fff").style("stroke-width", 0.75).style("fill", function (d) {
    return d.parent ? color(d.data.name) : "#FFF";
  });

  var totalSize = path.node().__data__.value;
  function click(d) {
    svg.transition().duration(750).tween("scale", function () {
      var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
          yd = d3.interpolate(y.domain(), [d.y0, 1]),
          yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);

      return function (t) {
        x.domain(xd(t));
        y.domain(yd(t)).range(yr(t));
      };
    }).selectAll("path").attrTween("d", function (d) {
      return function () {
        return arc(d);
      };
    });
  }

  function mouseover(d) {
    var percent = (100 * d.value / totalSize).toPrecision(3);
    var percentStr = percent < 0.1 ? "< 0.1%" : percent + "%";
    var rawStr = "" + d.value;
    var ancestors = getAncestors(d);

    d3.selectAll("path").style("opacity", 0.3);
    svg.selectAll("path").filter(function (node) {
      return ancestors.indexOf(node) >= 0;
    }).style("opacity", 1);

    updateBreadcrumbs(ancestors, percentStr, rawStr);
  }

  function getAncestors(node) {
    var ancestors = [];
    var current = node;
    while (current.parent) {
      ancestors.unshift(current);
      current = current.parent;
    }
    return ancestors;
  }

  function updateBreadcrumbs(nodeArray, percentageString, rawStr) {
    var g = d3.select("#" + trailAttach).selectAll("g").data(nodeArray, function (d) {
      return d.data.name + d.depth;
    });

    var entering = g.enter().append("svg:g");

    entering.append("svg:polygon").attr("points", breadcrumbPoints).style("fill", function (d) {
      return color(d.data.name);
    });

    entering.append("svg:text").attr("x", (b.w + b.t) / 2).attr("y", b.h / 2).attr("dy", "0.35em").attr("text-anchor", "middle").text(function (d) {
      return d.data.name;
    });

    d3.select("#" + trailAttach).selectAll("g").attr("transform", function (d, i) {
      return "translate(" + (d.depth - 1) * (b.w + b.s) + ", 0)";
    });

    g.exit().remove();

    d3.select("#" + trailAttach).select("#endlabel").attr("x", nodeArray.length * (b.w + b.s) + b.t).attr("y", b.h / 2).attr("dy", "0.35em").attr("text-anchor", "left").text(percentageString + " → " + rawStr + " " + statType);

    d3.select("#" + trailAttach).style("visibility", "");
  }

  function initializeBreadcrumbTrail() {
    // Add the svg area.
    var trail = d3.select("#sequence").append("svg:svg").attr("width", width * 2).attr("height", 50).attr("id", trailAttach);
    trail.append("svg:text").attr("id", "endlabel").style("fill", "#000");
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
    // d3.select("#trail").style("visibility", "hidden");
    d3.selectAll("path").style("opacity", 1);
  }
};

var sunburstDataBy = exports.sunburstDataBy = function sunburstDataBy(type, boxscoreData) {
  var sunburstData = {};

  var teamPartition = boxscoreData.resultSets[1];
  var playerPartition = boxscoreData.resultSets[0];
  var starterBenchPartition = boxscoreData.resultSets[2];

  var teamHeader = teamPartition.headers;
  var playerHeader = playerPartition.headers;
  var starterBenchHeader = starterBenchPartition.headers;

  var teamData = teamPartition.rowSet;
  var playerData = playerPartition.rowSet;
  var starterBenchData = starterBenchPartition.rowSet;

  // separate by team

  teamData.forEach(function (teamSet) {
    var team = teamSet[teamHeader.indexOf("TEAM_ABBREVIATION")];
    sunburstData[team] = { name: team, children: [] };
  });

  // populate next level by starter vs bench
  starterBenchData.forEach(function (sbSet) {
    var result = {};

    var team = sbSet[starterBenchHeader.indexOf("TEAM_ABBREVIATION")];
    var sbStatus = sbSet[starterBenchHeader.indexOf("STARTERS_BENCH")];

    result["name"] = sbStatus;

    if (sbStatus === "Starters") {
      result = {
        name: "Starters",
        children: [{ name: "Forwards", children: [] }, { name: "Center", children: [] }, { name: "Guards", children: [] }]
      };

      sunburstData[team]["children"].push(result);
    } else {
      result["children"] = [];
      sunburstData[team]["children"].push(result);
    }
  });

  // populate next level for players. players with positions gets nested
  // one level deeper
  playerData.forEach(function (playerSet) {
    var team = playerSet[playerHeader.indexOf("TEAM_ABBREVIATION")];
    var sbStatus = playerSet[playerHeader.indexOf("START_POSITION")] === "" ? "Bench" : "Starters";
    var position = playerSet[playerHeader.indexOf("START_POSITION")];

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

    var typeAmt = playerSet[playerHeader.indexOf(type)];
    var playerName = playerSet[playerHeader.indexOf("PLAYER_NAME")];

    var result = {};
    result["name"] = playerName;
    result["amt"] = typeAmt;
    // result["children"] = []

    sunburstData[team]["children"].forEach(function (sbChild, i) {
      if (sbStatus === "Bench" && sbChild.name === "Bench") {
        sunburstData[team]["children"][i]["children"].push(result);
      } else if (sbStatus === "Starters") {
        sunburstData[team]["children"][i]["children"].forEach(function (positionChild, j) {
          if (positionChild["name"] === position) {
            sunburstData[team]["children"][i]["children"][j]["children"].push(result);
          }
        });
      }
    });
  });
  return sunburstData;
};

exports.default = pltStatBreakdown;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map