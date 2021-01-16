let video;
let poseNet;
let pose;
let skeleton;

let nn;
let poseLabel = "1";
let correctLabel = 1;

let correctPosition;
let finished;
var points = 20;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();

  const optionsForPoseNet = {
    detectionType: 'single',
  };

  poseNet = ml5.poseNet(video, optionsForPoseNet, modelLoaded);
  poseNet.on('pose', gotPoses);

//model is geladen
function modelLoaded() {
  console.log('poseNet ready');
}

//pose en skeleton zetten
function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function classifyPose() {
  if (pose) {



  } else {
    setTimeout(classifyPose, 50);
  }
}

}


//export let xKe = pose.keypoint[0].position.x;