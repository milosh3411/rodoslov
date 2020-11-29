//Display width and height
var w,h;
// Array of circles' radius values
var r = [];
// Array(branches) of arrays (levels) of arrays(nodes)
var tree = [];

function setup() {
  // create canvas
  w = displayWidth;
  h = displayHeight;
  createCanvas(w, h);

  r[0] = min(w,h)*0.125;

}

function draw() {
  // for each branch
    // for each level
      // for each node
        //draw node
}