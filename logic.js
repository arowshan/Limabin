$(document).ready(function(){
//Generate html circles
	for(var i=0; i<35; i++){
		$('.robot').append('<div class="circle"><div class="message"><div class="arrow bottom right"></div>'+message[i]+'</div></div>');
	}

//Size & Position circles randomly
	
	var min_x = -100;
	var max_x = 0;
	var min_y = 0;
	var max_y = 80;
	var min_width = 5;
	var max_width = 100;
	var filled_areas = new Array();
	var min_time = 10000;
	var max_time = 100000;
	

	$('.circle').each(function() {
		var rand_x=0;
		var rand_y=0;
		var rand_width=0;
		var area;
		do {
			rand_x = Math.round(min_x + ((max_x - min_x)*(Math.random() % 1)));
			rand_y = Math.round(min_y + ((max_y - min_y)*(Math.random() % 1)));
			rand_width = Math.round(min_width + ((max_width - min_width)*(Math.random() % 1)));
			borderRadius = rand_width/2;
			area = {x: rand_x, y: rand_y, width: $(this).width(), height: $(this).height()};
		} while(check_overlap(area));
		
		filled_areas.push(area);
		
		$(this).css({left:rand_x + '%', top: rand_y + '%', width: rand_width, height: rand_width, borderRadius:borderRadius});
	});

	//Check for overlapping
	function check_overlap(area) {
		for (var i = 0; i < filled_areas.length; i++) {
        
			check_area = filled_areas[i];
			
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
	
	function setupCircles(pixels) {
		function runAnimation(x) {
			$(x).each(function(){
			animateTime = Math.round(min_time + ((max_time - min_time)*(Math.random() % 1)));			
			// $(this).animate({ left: '+='+pixels+'px' },
			$(this).animate({ left: '120%' },
				{
				duration: animateTime,
				easing: 'linear', 
				complete: function(){
					// console.log($('.circle').position().left);
					// if($('.circle').position().left>1000){
						// $('.circle').css({left: "10px"});
						// sprinkleCircles();
						rand_x = Math.round(min_x + ((max_x - min_x)*(Math.random() % 1)));
						rand_y = Math.round(min_y + ((max_y - min_y)*(Math.random() % 1)));						
						$(this).css({left:rand_x + '%', top: rand_y + '%'});
						runAnimation(this);
					} 
				});
				});
			}

		$('.circle').hover(function() {
			$(this).pause();	
			$(this).css({background:"yellow"});
			$(this).children().css({display:"inline-block"})
		}, function() {
			$(this).resume();
			$(this).css({background:"red"});
			$(this).children().css({display:"none"})
		});
		
		runAnimation('.circle');
	}
	setupCircles(2500);
	$('.pic').click(function(){
		$(".robot").css("background-image", "url('"+$(this)[0].src+"')");
	});
			
});
