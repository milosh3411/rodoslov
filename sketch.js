//Display width and height
var w, h;
// radius step between levels (circles)
var r
// last_apha step..
var a
// Array(branches) of arrays (levels) of arrays(nodes)
var tree = [];

function preload() {
  tree[0] = loadJSON("data/tree.json")
}

function setup() {
  noLoop();
  // create canvas
  w = displayWidth;
  h = displayHeight;
  createCanvas(w, h);

  r = min(w, h) * 0.095;
  a = PI / 2

}

function drawChildren(father) {
  // if there are children
  if (father.children != null) {

    //total number of children is even or odd? It will impact the drawing...
    var e = isEven(father.children.length)

    // the left-right switch
    var s = 1

    // remember last node angle
    var last_a = father.position.ang

    // angle distance between children (level dependant)
    var delta_a = a/(((father.position.rad + r)/r)*pow(((father.position.rad + r)/r - 1),2))

    // for each child
    for (let i = 0; i < father.children.length; i++) {

      // get child object
      var child = getChildByID(tree[0], father.children[i])

      // set ang and rad for the child
      child.position.rad = father.position.rad + r;
      child.position.ang = last_a + (i + e) * s * delta_a;
      last_a = child.position.ang;

      // next child on other side..
      s = (-1) * s;

      // draw child node and branch to the father
      drawChildBranch(father, child);

      console.log(child.name);
      console.log(delta_a);

      // recursion
      drawChildren(child);
    }
  }
}

function getChildByID(tree, id) {
  // get person index for that child
  var pi = tree.person.findIndex(x => x.id === id)
  // get the person
  var c = tree.person[pi];
  return c
}

function drawChildBranch(father, child) {
  push()
  translate(w / 2, h / 2)

  var x1 = child.position.rad * cos(child.position.ang);
  var y1 = child.position.rad * sin(child.position.ang);

  var x2 = father.position.rad * cos(father.position.ang);
  var y2 = father.position.rad * sin(father.position.ang);

  line(x1, y1, x2, y2);
  ellipse(x1, y1, 5, 5);
  ellipse(x2, y2, 5, 5);
  pop()
}

function isEven(value) {
  if (value % 2 == 0)
    return 1;
  else
    return 0;
}

function draw() {
  background(0)
  stroke(255)
  // for each tree
  // find the root (father == null)
  var f;
  for (let index = 0; index < tree[0].person.length; index++) {
    var p = tree[0].person[index];
    if (p.father === null) {
      f = p
    }
  }
  // set the root's polar coordinates
  console.log(f.name)
  f.position.rad = r;
  f.position.ang = 0;

  //  drawChildren() { recursive!}
  drawChildren(f);
}