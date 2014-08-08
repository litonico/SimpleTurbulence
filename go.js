var margin = {top: 20, right: 10, bottom: 20, left: 10};

var width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var boardDimension = 19,
    boardMargin = 120; //px

var SCALE = width / boardDimension,
    stoneSize = SCALE/2-1;

var stones = [{}];
var colorState = false; // First move is black's

var svg = d3.select("body").append("svg")
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var linesX = new Array(boardDimension);
var linesY = new Array(boardDimension);

// Grid lines
svg.selectAll("gridX") // Draw board lines along the X axis
        .data(linesX)
    .enter().append("line")
        .attr("x1", function(d, i) {return (i * SCALE)})
        .attr("x2", function(d, i) {return (i * SCALE)})
        .attr("y1", 0)
        .attr("y2", SCALE*boardDimension-SCALE)
        .attr("stroke", "darkgrey");


svg.selectAll("gridY") // Draw board lines along the X axis
        .data(linesY)
    .enter().append("line")
        .attr("y1", function(d, i) {return (i * SCALE)})
        .attr("y2", function(d, i) {return (i * SCALE)})
        .attr("x1", 0)
        .attr("x2", SCALE*boardDimension-SCALE)
        .attr("stroke", "darkgrey");


function valid(position) {
    // Tests for validity (if there's a stone there already)
    // Let's ignore the Ko rule for now!
    for (var i = 0; i < stones.length; i++){
        var stone = stones[i];
        if (position.px === stone.px && position.py === stone.py) {
            return false;
            }
    }
    return true;
}

function getColor(value) {
    return (value === true ? "whiteStone" : "blackStone");
}

function roundToGrid(val) { // Rounds positions to the grid
    return Math.round(val/SCALE)*SCALE;
}



