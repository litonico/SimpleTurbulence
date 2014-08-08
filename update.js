function update() {
    stonesDraw();
    vectorUpdate();
    vectorDraw();
}

svg.on("mousedown", function() {
    var point = d3.mouse(this);
    var stone = {px: roundToGrid(point[0]), 
                 py: roundToGrid(point[1]),
                 color: getColor(colorState)};

    if (valid(stone)) {
        stones.push(stone);
        colorState = !colorState;
    }

    update();
});

function stonesDraw() {
    svg.selectAll("circle") // Draw circles
        .data(stones.slice(1))
    .enter().append("circle")
        .attr("cx", function(d){return d.px})
        .attr("cy", function(d){return d.py})
        .attr("r", stoneSize)
        .attr("class", function(d){return d.color});
}

function vectorUpdate() { 
    // Can be changed to linear time
    // By just calculating for the most recently played stone
    for (var i = 0; i < vectorField.length; i++) {
        var vector = vectorField[i];
        for (var j = 1; j < stones.length; j++) {
            var stone = stones[j];
            inv_dist = inv_distance(vector, stone);
            vectorField[i].x += (vector.px - stone.px)*inv_dist*SCALE;
            vectorField[i].y += (vector.py - stone.py)*inv_dist*SCALE;
        }
    }
}

function vectorDraw() {
    svg.selectAll("vector") // Draw board lines along the X axis
            .data(vectorField)
        .enter().append("line")
            .attr("x1", function(d) {return (d.px)})
            .attr("x2", function(d) {return (d.px+d.x)})
            .attr("y1", function(d) {return (d.py)})
            .attr("y2", function(d) {return (d.py+d.y)})
            .attr("stroke-width", 2)
            .attr("stroke", function(d) {return vectorColors(magnitude(d)/SCALE)});
}


