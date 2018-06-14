var ball   = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');
var output2 = document.querySelector('.output2');

var maxX = garden.clientWidth  - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

function handleOrientation(event) {
  var x = event.beta;  // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]
  if (event.webkitCompassHeading){
  	var c = event.webkitCompassHeading;
  } else {c = "not iphone";}

  output.innerHTML  = "beta : " + x + "\n";
  output.innerHTML += "gamma: " + y + "\n";
  output.innerHTML += "direction: " + c + "\n";

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x >  90) { x =  90};
  if (x < -90) { x = -90};

  // To make computation easier we shift the range of 
  // x and y to [0,180]
  x += 90;
  y += 90;

  // 10 is half the size of the ball
  // It center the positioning point to the center of the ball
  ball.style.top  = (maxX*x/180 - 10) + "px";
  ball.style.left = (maxY*y/180 - 10) + "px";
}

function handleMotion(event) {
	var xcel 		= event.acceleration;
	var gravxcel 	= event.accelerationIncludingGravity;
	var rot 		= event.rotationRate;
	var int 		= event.interval;	

	output2.innerHTML  = "acceleration : " + "\n" + xcel.x + "\n" + xcel.y + "\n" + xcel.z + "\n" + "\n";
	output2.innerHTML  += "accel w/ grav : " + "\n"+ gravxcel.x + "\n" + gravxcel.y + "\n" + gravxcel.z + "\n" + "\n";
	output2.innerHTML  += "rotation rate : " + "\n" + rot.alpha +"\n" + rot.beta + "\n" + rot.gamma + "\n" + "\n";
	output2.innerHTML  += "interval : " + int + "\n";
}

window.addEventListener('deviceorientation', handleOrientation);
window.addEventListener("devicemotion", handleMotion, true);

