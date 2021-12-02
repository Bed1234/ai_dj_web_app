song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLW = 0;
scoreRW = 0;

function preload() {
    song = loadSound("music.mp3");

}


//creating canvas 
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose', gotPoses);
}


function gotPoses(results){
    if (results.length > 0) {
        console.log(results);
        
        scoreLW = results[0].pose.keypoints[9].score;
        scoreRW = results[0].pose.keypoints[10].score;
        console.log("scoreLW = " + scoreLW + "scoreRW = " + scoreRW);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log(" leftWristX = "+leftWristX +  " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(" rightWristX = "+rightWristX +  " rightWristY = " + rightWristY);

        

    } 
        
    
}

function modelLoaded(){
    console.log("poseNet is initialized")
}


function draw(){
    image (video,0,0,600,500);


    fill ("#FF0000");
    stroke ("#FF0000");


    if(scoreRW > 0.2){

        circle(rightWristX , rightWristY , 20);

        if (rightWristY > 0 && rightWristY <= 100) {
            
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
    
        } 
        else if (rightWristY > 100 && rightWristY<= 200) {
            document.getElementById("speed").innetHTML = "Speed = 1x";
            song.rate(1);
        }
        
        else if (rightWristY > 200 && rightWristY<= 300) {
            document.getElementById("speed").innetHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
    
        else if (rightWristY > 300 && rightWristY<= 400) {
            document.getElementById("speed").innetHTML = "Speed = 2x";
            song.rate(2);
        }
        else if (rightWristY > 400) {
            document.getElementById("speed").innetHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }

    


 if (scoreLW > 0.2) {
     
    circle(leftWristX , leftWristY , 20);

    lw_number = Number (leftWristY);

    R_d = floor (lw_number);

    volume = R_d / 500;

    document.getElementById("volume").innerHTML = "volume = " + volume;

    song.setVolume(volume);
 }
    
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
    
}