//Display width and height
var w, h;
// radius step between levels (circles)
var r
// Array(branches) of arrays (levels) of arrays(nodes)
var tree = [];

function setup() {
  noLoop();
  // create canvas
  w = displayWidth;
  h = displayHeight;
  createCanvas(w, h);

  r = min(w, h) * 0.125;


  tree[0] = {
    "person": [
      {
        "id": "6cd3c61f-c6b7-4814-82de-cd9f2d7692d1",
        "name": "Milos",
        "surname": "Radenkovic",
        "father": null,
        "mother": null,
        "children": [
          "3c0b07b4-df06-40e1-8e73-3bd74b7ddcc4"
        ],
        "position": {
          "ang": null,
          "rad": null
        }
      },
      {
        "id": "1c3f0b83-ccc6-46f9-b530-7e470bbc401c",
        "name": "Milos",
        "surname": "Radenkovic",
        "father": "45d8c58a-8f03-4804-8eb7-2c791ede1446",
        "mother": null,
        "children": null,
        "position": {
          "ang": null,
          "rad": null
        }
      },
      {
        "id": "45d8c58a-8f03-4804-8eb7-2c791ede1446",
        "name": "Milovan",
        "surname": "Radenkovic",
        "father": "3c0b07b4-df06-40e1-8e73-3bd74b7ddcc4",
        "mother": null,
        "children": [
          "1c3f0b83-ccc6-46f9-b530-7e470bbc401c"
        ],
        "position": {
          "ang": null,
          "rad": null
        }
      },
      {
        "id": "3c0b07b4-df06-40e1-8e73-3bd74b7ddcc4",
        "name": "Miodrag",
        "surname": "Radenkovic",
        "father": "6cd3c61f-c6b7-4814-82de-cd9f2d7692d1",
        "mother": null,
        "children": [
          "45d8c58a-8f03-4804-8eb7-2c791ede1446",
          "7dc68dff-9de0-40f0-ad62-291a21bc9729"
        ],
        "position": {
          "ang": null,
          "rad": null
        }
      },
      {
        "id": "7dc68dff-9de0-40f0-ad62-291a21bc9729",
        "name": "Radovan",
        "surname": "Radenkovic",
        "father": "3c0b07b4-df06-40e1-8e73-3bd74b7ddcc4",
        "mother": null,
        "children": [
          "9faba932-d8aa-4727-8ba9-c7b3e0839c50",
          "16bc52ba-1d73-42b9-81d6-96dfa325abdc"
        ],
        "position": {
          "ang": null,
          "rad": null
        }
      },
      {
        "id": "9faba932-d8aa-4727-8ba9-c7b3e0839c50",
        "name": "Bojan",
        "surname": "Radenkovic",
        "father": "7dc68dff-9de0-40f0-ad62-291a21bc9729",
        "mother": null,
        "children": null,
        "position": {
          "ang": null,
          "rad": null
        }
      },
      {
        "id": "16bc52ba-1d73-42b9-81d6-96dfa325abdc",
        "name": "Ivan",
        "surname": "Radenkovic",
        "father": "7dc68dff-9de0-40f0-ad62-291a21bc9729",
        "mother": null,
        "children": null,
        "position": {
          "ang": null,
          "rad": null
        }
      }
    ]
  }

}

function drawChildren(father) {
  // if there are children
  if (father.children != null) {

    // set the radius of children nodes
    var rc = father.position.rad + r

    // for each child
    for (let i = 0; i < father.children.length; i++) {
      // get person index for that child
      var pi = tree[0].person.findIndex(x => x.id === father.children[i])
      // get the person
      var child = tree[0].person[pi];
      // set ang and rad for the child and draw connection to the father
      child.position.rad = rc;
      child.position.ang = father.position.ang + i * PI / 8;
      
      push()
      translate(w / 2, h / 2)

      var x1 = rc * cos(child.position.ang);
      var y1 = rc * sin(child.position.ang);

      var x2 = father.position.rad * cos(father.position.ang);
      var y2 = father.position.rad * sin(father.position.ang);

      line(x1, y1, x2, y2);
      ellipse(x1, y1, 5, 5);
      ellipse(x2, y2, 5, 5);
      pop()

      console.log(child.name);
      //console.log(child.position.rad);
      //console.log(child.position.ang);
      //console.log(x1, y1, x2, y2)

      drawChildren(child);
    }
  }
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