const circleCount = 35; 									//number of circles
const stoppingPoint = '120%';								//point for animate to repeat
const middleFlippingPoint = 50;								//point where messages flip
const fullWidth = 100;										//full width of animation
const triangleOffset = 15;									//speech box traingle offset from the edge
const triangleLeftOffset = "15px";							//speech box traingle offset from the edge in px
const hoveredCircleColor = "rgba(255,255,0, 0.7)";			//yellow
const originalCircleColor = "rgba(255,0,0, 0.7)";			//red

var min_x = -100;		//min X window of circle positioning in percentage					
var max_x = 0;			//max X window of circle positioning in percentage
var min_y = 25;			//max Y window of circle positioning in precentage
var max_y = 80;			//max Y window of circle positioning in percentage
var min_width = 5;		//min diameter in px
var max_width = 100;	//max diameter in px
var min_time = 10000;	//min animate time in .1 of ms
var max_time = 100000;	//max animate time in .1 of ms
