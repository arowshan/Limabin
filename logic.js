$(document).ready(function(){
	
//Generate html circles
	for(var i=0; i<circleCount; i++){
		$('.robot').append(
			'<div class="circle">\
				<div class="message">\
					<div class="arrow speech-triangle right">\
						<div class="empty-triangle">\
						</div>\
					</div>\
				'+message[i]+'</div>\
			</div>'
		);
	}

//Size & Position circles randomly
	var filled_areas = new Array();
	$('.circle').each(function() {
		//coordiates of filled areas
		var rand_x=0;
		var rand_y=0;
		var rand_width=0;
		var area;
		do {
			//random positioning of circles
			rand_x = Math.round(min_x + ((max_x - min_x)*(Math.random() % 1)));
			rand_y = Math.round(min_y + ((max_y - min_y)*(Math.random() % 1)));
			//randomize circle size
			rand_width = Math.round(min_width + ((max_width - min_width)*(Math.random() % 1)));
			//round square to circle
			borderRadius = rand_width/2;
			area = {x: rand_x, y: rand_y, width: $(this).width(), height: $(this).height()};
		} while(check_overlap(area));
		
		filled_areas.push(area);
		//implement the changes on each circle
		$(this).css({left:rand_x + '%', top: rand_y + '%', width: rand_width, height: rand_width, borderRadius:borderRadius});
	});

	//Check for overlapping
	function check_overlap(area) {
		for (var i = 0; i < filled_areas.length; i++) {
			
			check_area = filled_areas[i];
			//coordinates of filled areas
			var bottom1 = area.y + area.height;
			var bottom2 = check_area.y + check_area.height;
			var top1 = area.y;
			var top2 = check_area.y;
			var left1 = area.x;
			var left2 = check_area.x;
			var right1 = area.x + area.width;
			var right2 = check_area.x + check_area.width;
			if (bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2) {
				continue;
			}
			return true;
		}
		return false;
	}
	
	function setupCircles() {
		//Animatie circles
		function runAnimation(circles) {
			//Animate each circle independently
			$(circles).each(function(){
				//vary random animate times
				animateTime = Math.round(min_time + ((max_time - min_time)*(Math.random() % 1)));
				//wait till circles exit the screen
				$(this).animate({ left: stoppingPoint },
				{
					duration: animateTime,
					easing: 'linear',
					//Reposition and re-animate
					complete: function(){
							//randomize position again
							rand_x = Math.round(min_x + ((max_x - min_x)*(Math.random() % 1)));
							rand_y = Math.round(min_y + ((max_y - min_y)*(Math.random() % 1)));						
							$(this).css({left:rand_x + '%', top: rand_y + '%'});
							runAnimation(this);
					} 
				});
			});
		}
		
		//Show message/color and pause on hover
		$('.circle').hover(function() {
			//pause animation
			$(this).pause();
			//flip message position once passed middle point
			if($(this).position().left/$(window).width() * fullWidth > middleFlippingPoint){
				//show message
				$(this).find('.message').css({display:"inline-block", right:"0px", left:''});
				//position speech bubble triangle
				var leftOffset = $(this).find('.message').width() - triangleOffset + "px";
				$(this).find('.speech-triangle').css({left:leftOffset});
			}
			//change color
			$(this).css({background:hoveredCircleColor});
			//show message 
			$(this).children().css({display:"inline-block"})
		}, function() {
			//Resume animation
			$(this).resume();
			//return to original color
			$(this).css({background:originalCircleColor});
			//hide message
			$(this).children().css({display:"none"});
			//reposition speech box
			$(this).find('.message').css({right:'', left:"0px"});
			$(this).find('.speech-triangle').css({left:triangleLeftOffset});
		});
		
		runAnimation('.circle');
	}
	
	setupCircles();
	
	//Change backgrounds
	$('.pic').click(function(){
		$(".robot").css("background-image", "url('"+$(this)[0].src+"')");
	});
			
});
