import { Meteor } from 'meteor/meteor';


export default function (sketch) {
  let video;
  let poseNet;
  let poses = [];

  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);

    video = sketch.createCapture(sketch.VIDEO);
    video.size(sketch.width, sketch.height);
    poseNet = ml5.poseNet(video, () => {
      sketch.print("Look for us");
    });
    poseNet.on('pose', (results) => {
      poses = results;
    });
    video.hide();
  };

  sketch.draw = function () {
    sketch.background(255);
    insertOrganisms();
    drawSuperorganism();
  };

  function insertOrganisms() {
    Meteor.call('organisms.insert', poses);
  }

  function drawSuperorganism() {
    sketch.stroke(125, 125, 125);
    sketch.strokeWeight(5);
    for (let i = 0; i < window.superorganism.length; i += 1) {
      const organism = window.superorganism[i].poses;
      for (let j = 0; j < organism.length; j += 1) {
        for (let k = 0; k < organism[j].skeleton.length; k += 1) {
          let partA = organism[j].skeleton[k][0];
          let partB = organism[j].skeleton[k][1];
          sketch.push();
          sketch.translate(sketch.width, 0);
          sketch.scale(-1, 1);
          sketch.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
          sketch.pop();
        }
      }
    }
  }

}
