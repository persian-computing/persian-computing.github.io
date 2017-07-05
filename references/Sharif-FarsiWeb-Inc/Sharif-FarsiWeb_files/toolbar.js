if(typeof __wm==="undefined") __wm={};
(function(){
  var prettyMonths = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var $D=document,$=function(n){return document.getElementById(n)};

  function formatNumber(n) {
    return (''+n).replace(/\B(?=(\d{3})+$)/g, ',');
  }
  var ajax=__wm.ajax=function ajax(method, url, callback) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
	callback(xmlhttp);
      }
    };
    xmlhttp.open(method, url, true);
    xmlhttp.send();
  }
  __wm.h=function hideToolbar(ev) {
    $("wm-ipp").style.display="none";
    ev.stopPropagation();
  }

  var $exbtn, $capinfo;

  __wm.bt=function bootstrap(imgWidth,imgHeight,yearImgWidth,monthImgWidth,
			     coll,wbCurrentUrl,captureDate,firstYear) {
    var wbPrefix='/'+(coll||'web')+'/';
    captureDate = captureDate.split('-');
    var displayDay = captureDate[2];
    var displayMonth = captureDate[1];
    var displayYear = captureDate[0];
    var trackerVal,curYear = -1,curMonth = -1;
    var yearTracker,monthTracker;

    var $spk=$('wm-ipp-sparkline')
    var $expand=$('wm-expand');
    $exbtn=$expand.children[0];
    $capinfo=$('wm-capinfo');

    function showTrackers(event) {
      var val = event.type=="mouseenter"?1:0;
      if (val===trackerVal) return;
      var $ipp=$("wm-ipp");
      var $y=$("displayYearEl"),$m=$("displayMonthEl"),$d=$("displayDayEl");
      if (val) {
	$ipp.className="hi";
      } else {
	$ipp.className="";
	$y.innerHTML=displayYear;$m.innerHTML=prettyMonths[displayMonth-1];$d.innerHTML=displayDay;
      }
      yearTracker.style.display=val?"inline":"none";
      monthTracker.style.display=val?"inline":"none";
      trackerVal = val;
    }
    function getElementX2(el) {
      var de = $D.documentElement;
      var box = (typeof el.getBoundingClientRect!=='undefied')?
	el.getBoundingClientRect():{top:0,left:0};
      return box.left + (window.pageXOffset||de.scrollLeft)-(de.clientLeft||0);
    }
    function navCaptures(captures) {
      var $e = $("wm-nav-captures");
      var count = 0;
      var years = captures.years;
      var first_ts = captures.first_ts, last_ts = captures.last_ts;
      for (var y in years) {
	var months = years[y];
	for (var i = 0; i < months.length; i++) {
	  count += months[i];
	}
      }
      var html = '<a class="t" href="' + wbPrefix + '*/' + wbCurrentUrl +
	'" title="See a list of every capture for this URL">' +
	formatNumber(count) + ' ' +
	(count > 1 ? "captures" : "capture") + '</a>';
      var timespan = __wbTs.format(first_ts, '%d %b %Y');
      if (last_ts != first_ts) {
	timespan += ' - ' + __wbTs.format(last_ts, '%d %b %Y');
      }
      html += '<div class="r" title="Timespan for captures of this URL">' +
	timespan + '</div>';
      $e.innerHTML = html;
    }
    function trackMouseMove(event) {
      //var element = event.target;
      var element = $spk;
      var eventX = getEventX(event);
      var elementX = getElementX2(element);
      var xOff = Math.min(Math.max(0, eventX - elementX),imgWidth);
      var monthOff = xOff % yearImgWidth;

      var year = Math.floor(xOff / yearImgWidth);
      var monthOfYear = Math.min(11,Math.floor(monthOff / monthImgWidth));
      // 1 extra border pixel at the left edge of the year:
      var month = (year * 12) + monthOfYear;
      var day = monthOff % 2==1?15:1;
      var dateString = zeroPad(year + firstYear) + zeroPad(monthOfYear+1,2) +
	zeroPad(day,2) + "000000";

      $("displayYearEl").innerHTML=year+firstYear;
      $("displayMonthEl").innerHTML=prettyMonths[monthOfYear];
      // looks too jarring when it changes..
      //$("displayDayEl").innerHTML=zeroPad(day,2);
      var url = wbPrefix + dateString + '/' +  wbCurrentUrl;
      $("wm-graph-anchor").href=url;

      if(curYear != year) {
	var yrOff = year * yearImgWidth;
	yearTracker.style.left = yrOff + "px";
	curYear = year;
      }
      if(curMonth != month) {
	var mtOff = year + (month * monthImgWidth) + 1;
	monthTracker.style.left = mtOff + "px";
	curMonth = month;
      }
    }
    function disclaimElement(element) {
      if (window.top == window.self) {
	element.style.display = "block";
	$D.body.insertBefore(element, $D.body.firstChild);
      }
    }
    yearTracker=$D.createElement('div');
    yearTracker.className='yt';
    with(yearTracker.style){
      display='none';width=yearImgWidth+"px";height=imgHeight+"px";
    }
    monthTracker=$D.createElement('div');
    monthTracker.className='mt';
    with(monthTracker.style){
      display='none';width=monthImgWidth+"px";height=imgHeight+"px";
    }
    $spk.appendChild(yearTracker);
    $spk.appendChild(monthTracker);

    var $cv=$('wm-sparkline-canvas');
    $spk.onmouseenter=showTrackers;
    $spk.onmouseleave=showTrackers;
    $spk.onmousemove=trackMouseMove;

    var $ipp=$("wm-ipp");
    $ipp&&disclaimElement($ipp);

    var testCanvas = document.createElement('canvas');
    if(!!(testCanvas.getContext && testCanvas.getContext('2d'))) {
      var sparkline_url = "/__wb/sparkline?output=json&url=" +
	encodeURIComponent(wbCurrentUrl) +
	(coll && "&collection=" + coll || '');
      ajax("GET", sparkline_url, function(response) {
	  if(response.status == 200) {
	    var capnav=JSON.parse(response.responseText);
	    navCaptures(capnav);
	    sparkline(capnav,imgWidth,imgHeight,'wm-sparkline-canvas',
		      firstYear, displayYear, displayMonth);
	  }
      });
    } else {
      var sparklineImg = new Image();
      sparklineImg.src = "/__wb/sparkline?url=" +
	encodeURIComponent(wbCurrentUrl) +
	"&width=" + imgWidth + "&height=" + imgHeight +
	"&selected_year=" + displayYear + "&selected_month=" + displayMonth +
	(coll && "&collection=" + coll || '');
      sparklineImg.alt= "sparkline";
      sparklineImg.width=imgWidth;
      sparklineImg.height=imgHeight;
      sparklineImg.id="sparklineImgId";
      sparklineImg.border="0";
      $cv.parentNode.replaceChild(sparklineImg, $cv);
    }

    function process_autocomplete(data) {
      var out = []
      var len = data.length;
      for(var i=0; i<len; i++) {
	if(typeof data[i].excluded === 'undefined') {
	  out.push(data[i].display_name);
	}
      }
      return out;
    }
    new wbAutoComplete({
      selector: 'input#wmtbURL',
      delay: 400,
      source: function(query, suggest) {
	ajax("GET", '/__wb/search/host?q=' + encodeURIComponent(query),
	  function(data) {
	    var data = JSON.parse(data.response);
	    if (typeof data.hosts!=='undefined' && data.hosts.length>0) {
	      var output = process_autocomplete(data.hosts);
	      suggest(output);
	    } else if (typeof data.isUrl!=='undefined' && data.isUrl===true && typeof data.excluded==='undefined') {
	      suggest([query]);
	    } else {
	      ajax("GET", '/__wb/search/anchor?q='+encodeURIComponent(query),
		function(data) {
		  var data = JSON.parse(data.response);
		  if (typeof data!=='undefined' && data.length>0) {
		    var output = process_autocomplete(data.slice(0,5));
		    suggest(output);
		  }
		});
	    }
	});
      },
      onSelect: function(e, term, item) {
	$("wmtb").submit();
      }
    });
    $("wmtb").onsubmit = function(e) {
      var query = $("wmtbURL").value;
      // if textbox value is not a URL, redirect to search
      if (!(query.indexOf('http://') === 0 || query.indexOf('https://') === 0 ||
	   query.match(/[\w\.]{2,256}\.[a-z]{2,4}/gi))) {
	document.location.href="/web/*/" + $("wmtbURL").value;
	e.preventDefault();
	return false;
      }
    };
  }
  __wm.ex=function expand(ev) {
    ev.stopPropagation();
    var c=$exbtn.className;
    if (c.match(/down/)) { // closed
      $exbtn.className=c.replace(/down/,'up');
      $capinfo.style.display='block';
    } else {
      $exbtn.className=c.replace(/up/,'down');
      $capinfo.style.display='none';
    }
  }
})();
