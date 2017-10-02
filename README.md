# NBA Pastime

## Overview
NBA Pastime is a statistical dashboard that shows a snapshot of a state of an NBA match. Users can view team and player statistics as well as explore breakdowns of how well the game is going.

<sub>Although NBA Pastime only displays a single snapshot as of now, it's future may include a backend implementation to feed users live updates to game scores and statistics as live games are going on</sub>

## Functionality and MVPs

NBA Pastime will:
 * allow users to view and/or interact with statistics of selected snapshot of an NBA game
 * display teams' points scored in a visually pleasing manner
 * display a breakdown of points scored per quarter
 * display boxscore of player statistics
 * display an interactive statistical breakdown of selected statistics in the form of a zoomable sunburst
 * display an interactive miscellaneous statistical goal monitor (e.g. free-throws missed for free tacos)

## Wireframes

This app with consist of two(currently) views, which can be navigated through the tabs on the top.

### View 1

![](https://raw.githubusercontent.com/alvink92/nba-pastime/master/docs/images/wireframes/overview.png)


### View 2

![](https://raw.githubusercontent.com/alvink92/nba-pastime/master/docs/images/wireframes/stat_breakdown.png)


### Architecture and Technology

This project will be built using:
 * Vanilla JavaScript and jQuery for DOM manipulation
 * d3.js for creating visualization component modules

The file structure of this project will be in the form:

 * dashboard.html
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

## Bonus Features
 * Adding extra interactive visualizations in statistical breakdown tab
 * Slider for users to navigate to certain states(by quarter) of the game
