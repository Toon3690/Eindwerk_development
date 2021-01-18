let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();

  const optionsForPoseNet = {
    detectionType: 'single',
  };

  poseNet = ml5.poseNet(video, optionsForPoseNet, modelLoaded);
  poseNet.on('pose', gotPoses);

// model is geladen
function modelLoaded() {
  console.log('poseNet ready');
}

// pose en skeleton zetten
function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function classifyPose() {
  if (pose) {
    let xWaarde = pose.keypoint[0].position.x;
    let yWaarde = pose.keypoint[0].position.y;
  } else {
    setTimeout(classifyPose, 50);
  }
}

}


//export let xKe = pose.keypoint[0].position.x;