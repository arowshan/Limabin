$(document).ready(function(){
var message = [
	'I am a nice guy',
	'I have a good sense of humor. At least I think so...',
	'a',
	'a',
	'aa',
	'w',
	'q',
	'q',
	'q',
	'q',
	'q',
	'q',
	'q',
	'q',
	'q',
	'q',
	'q',
	'q',
	'q',
	'q',
	'q',
	'q',
	'q',
	'q',
	'q',
	'q',	
];
//Generate html circles
	for(var i=0; i<20; i++){
		$('.robot').append('<div class="circle"><div class="message">'+message[i]+'</div></div>');
	}

//Size & Position circles randomly	
	var min_x = 0;
	var max_x = 80;
	var min_y = 0;
	var max_y = 100;
	var min_width = 5;
	var max_width = 100;
	var filled_areas = new Array();

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
			
});

$(function() {
	function setupCircles(pixels) {
		function runAnimation() {
			$('.circle').animate({ left: '+='+pixels+'px' }, {
				duration: 2000,
				easing: 'swing', 
				complete: function(){
					// console.log($('.circle').position().left);
					// if($('.circle').position().left>1000){
						// $(this).css({left: "10px"});
						runAnimation();
					} 
				}
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
		runAnimation();
	}
	setupCircles(1000);

});
