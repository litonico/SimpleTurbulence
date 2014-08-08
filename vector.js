// Construct the dataset for the vectors
// Vector obj: {px, py, 

 var vectorColors = d3.scale.linear()
     .domain([0, 0.5])
     .range(["blue", "red"]);

// function inv(x) { return (x === 0 ? 0 : 1/x) }

function distance(pt1, pt2) {
    return (Math.pow(pt1.px-pt2.px, 2) + Math.pow(pt1.py-pt2.py, 2));
}

function inv_distance(p1, p2) {
    dist = distance(p1, p2);
    return (dist === 0 ? 0 : 1/dist);
}

function magnitude(v) {
    return Math.sqrt(v.x*v.x + v.y*v.y);
}

vectorField = [];
for (var y = 0; y < boardDimension; y++) {
    for (var x = 0; x < boardDimension; x++) {
        vectorField.push({px: SCALE*x, py: SCALE*y, x: 0, y: 0}); // no stones; 0
    }
}
