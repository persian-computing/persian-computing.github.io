function getEventX(event) {
	var posx = 0;
	if (event.pageX || event.pageY) {
		posx =  event.pageX;
	}
	else if (event.clientX || event.clientY) 	{
		posx = event.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
	}
	return posx;
}
function getElementX(obj) {
	var x = 0;
	if (obj.offsetParent) {
		do {
			x += obj.offsetLeft;
		} while (obj = obj.offsetParent);
	}
	return x;
}
function zeroPad(v, len) {
  v = v.toString();
  return v.length >= len ? v : "00000000".substring(0, len - v.length) + v;
}

/**
 * Check if the difference between the max and the min non zero capture numbers
 * is larger than 3 orders of magnitude. If yes, we need to scale.
**/
function capturegraph_scale_is_required(captures) {
    var max = 0;
    var min = 1000;
    for(var year in captures) {
        if(captures[year] == undefined) {
            continue;
        }
        max = Math.max(max, Math.max.apply(null, captures[year]));
        min = Math.min(min, Math.min.apply(null,
                                           captures[year].filter(Boolean)));
    }
    return (Math.log1p(max) - Math.log1p(min) > 3);
}

/**
 * Scale captugraph counts and max maxcount using log1p
**/
function capturegraph_scale(captures, maxcount) {
    var scaled = new Array();
    for(var year in captures) {
        if(captures[year] == undefined) {
            continue;
        }
        scaled[year] = captures[year].map(Math.log1p);
    }
    return [scaled, Math.log1p(maxcount)];
}

/**
 * Draw years, highlight current year, draw capture frequency per month
 */
function sparkline(captures, width, height, canvas_id, start_year,
                   cur_year, cur_month) {
    var c = document.getElementById(canvas_id);
    if (!c || !c.getContext) return;
    var ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFF";
    var end_year = new Date().getUTCFullYear();
    var year_width = width / (end_year - start_year + 1);
    var maxcount = 0;
    for(var year in captures['years']) {
        if(captures['years'][year] == undefined) {
            continue;
        }
        maxcount = Math.max(maxcount, Math.max.apply(null, captures['years'][year]));
    }

    if(capturegraph_scale_is_required(captures['years'])) {
        var scaled = capturegraph_scale(captures['years'], maxcount);
        captures['years'] = scaled[0];
        maxcount = scaled[1];
    }

    var yscale = height / maxcount;
    var years = captures['years'];
    for(var year = start_year; year<=end_year; year++) {
        year_left = Math.ceil((year - start_year) * year_width);
        year_right = Math.ceil((year - start_year + 1) * year_width);
        ctx.beginPath();
        ctx.moveTo(year_left + 0.5, 0);
        ctx.lineTo(year_left + 0.5, height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#CCC";
        ctx.stroke();

        var left = year_left + 1;
        if(year == cur_year) {
            ctx.fillStyle = "#FFFFA5";
            ctx.fillRect(left, 0, year_right-year_left-0.5, height+0.5);
        }
        if(years[year] == undefined) {
            continue;
        }
        var month_width = (year_right - left) / 12.0;
        for(var month = 0; month < 12; month++) {
            var count = years[year][month];
            if(count > 0) {
                var h = Math.ceil(count * yscale);
		if(year == cur_year && month == cur_month) {
                    ctx.fillStyle = "#EC008C";
                } else {
                    ctx.fillStyle = "#000";
                }
                // must note that when I use width=Math.round(month_width+1),
                // the replay toolbar looks more accurate whereas the
                // bubble calendar looks somehow different.
                ctx.fillRect(Math.round(left), Math.ceil(height-h),
                             Math.ceil(month_width), Math.round(h));
            }
            left += month_width;
        }
    }
}

function clear_canvas(canvas_id) {
    var c = document.getElementById(canvas_id);
    if (!c || !c.getContext) return;
    var ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
}
