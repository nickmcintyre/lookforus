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
      sketch.print('Look for us');
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
    const skeletons = [];
    for (let i = 0; i < poses.length; i += 1) {
      if (poses[i].skeleton.length > 0) {
        skeletons.push(poses[i].skeleton);
      }
    }

    Meteor.call('organisms.insert', skeletons);
  }

  function drawSuperorganism() {
    if (!window.superorganism || window.superorganism.length === 0) {
      return;
    }

    sketch.stroke(0, 0, 0, 125);
    sketch.strokeWeight(5);
    for (let i = 0; i < window.superorganism.length; i += 1) {
      const { skeletons } = window.superorganism[i];
      for (let j = 0; j < skeletons.length; j += 1) {
        const skeleton = skeletons[j];
        for (let k = 0; k < skeleton.length; k += 1) {
          const partA = skeleton[k][0];
          const partB = skeleton[k][1];
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
