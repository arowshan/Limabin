$(document).ready(function(){
//Generate html circles
	for(var i=0; i<20; i++){
		$('.robot').append('<div class="circle"></div>');
	}
//Mouse position
	var mouseX = 0;
	var mouseY = 0;
	$('.robot').mousemove(function( event ) {
		mouseX = event.pageX;
		mouseY = event.pageY;
	});	

//Place circles randomly	
	var min_x = 0;
	var max_x = 500;
	var min_y = 0;
	var max_y = 500;
	var filled_areas = new Array();

	$('.circle').each(function() {
		var rand_x=0;
		var rand_y=0;
		var area;
		do {
			rand_x = Math.round(min_x + ((max_x - min_x)*(Math.random() % 1)));
			rand_y = Math.round(min_y + ((max_y - min_y)*(Math.random() % 1)));
			area = {x: rand_x, y: rand_y, width: $(this).width(), height: $(this).height()};
		} while(check_overlap(area));
		
		filled_areas.push(area);
		
		$(this).css({left:rand_x, top: rand_y});
	});

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
	
//Move Circles based on mouse movement
	$('.robot').mousemove(function( event ) {
		$('.circle').each(function() {
			var pos = $(this).position();
			var offset = $(this).offset();
			$(this).css({top: event.pageY - offset.left});
			// $(this).css({top: Math.abs(event.pageY) - Math.abs(offset.top)});
		});
	});
		
});