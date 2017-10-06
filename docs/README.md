# NBA Snapshot

## Overview
NBA Snapshot is an interactive visualization users can use to explore contributions certain players or category of players made to a game victory or loss.

## Functionality and MVPs

NBA Snapshot will:
 * Utilize a sunburst made using d3.js
 * allow users to select a counting stat they would like to explore
 * display team stats visually pleasing and easy to understand manner
 * display a breakdown of counting stat per nested category
 * display boxscore of player statistics
 * make an api request for boxscore data using the format 'http://stats.nba.com/stats/boxscoretraditionalv2?RangeType=0&StartPeriod=1&StartRange=0&EndPeriod=10&EndRange=28800&GameID={gameId}'

## Wireframes

This app with consist of two(currently) views, which can be navigated through the tabs on the top.

### View 1

![](https://raw.githubusercontent.com/alvink92/nba-pastime/master/docs/images/wireframes/sunburst.png)


### Architecture and Technology

This project will be built using:
 * Vanilla JavaScript and jQuery for DOM manipulation
 * d3.js for creating visualization component modules

The file structure of this project will be in the form:

 * index.html
 * /lib
 * /assets
   * /images
   * /css

## Implementation Timeline

### Day 1
 * set up package.json
 * set up webpack.config.js
 * set up node_modules
 * write and test entry file and modules
 * learn the basics of d3.js
 * find in-game nba data
 * brainstorm ideas to make design and layout more user-friendly and pleasing to look at (if have time)

### Day 2
 * create layout of dashboard
 * create and test tabs to display each view
 * Brainstorm how data will flow into each visualization component
 * write first graphical d3 component module and test that it works and displays in index file


### Day 3
 * Create and style team score header
 * Create static table components for points per quarter and box score
 * Create Other graphical d3 component module

### Day 4
 * Finished up anything not completed
 * debug
 * Touch up on styling
