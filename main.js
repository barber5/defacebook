// set the border
// document.body.style.border = "5px solid red";

// get number of divs in the web page
// var result=document.getElementsByTagName("div").length;
// console.log(result)

// window.onscroll = function() {    
// 	console.log("scroll");   
// }

function isScrolledIntoView(elem)
{
	// only check top
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
}

var isScrolling;
var cur_div = 0;
window.addEventListener('scroll', function ( event ) {
	window.clearTimeout(isScrolling);

	var items = document.querySelectorAll('div[id^="hyperfeed"]');

	isScrolling = setTimeout(function() {
		console.log( 'Scrolling has stopped.' );
		for (i = cur_div; i < items.length; i++) {
	    	if (isScrolledIntoView(items[i])) {
	    		console.log(i);
	    		if (cur_div !== i) {
	    			chrome.storage.local.get({'total_div': 0}, function(item){
	    				var new_total_div = i - cur_div + item['total_div'];
	    				cur_div = i;
	    				document.getElementById('number_content_seen').innerHTML = new_total_div;
	    				chrome.storage.local.set({'total_div': new_total_div}, function(){});

	    				// if (new_total_div == 0) {
	    				// 	document.getElementById('mainContainer').setAttribute('style',
	    				// 		'color:transparent;text-shadow: 0 0 5px rgba(0,0,0,0.5);');
	    				// }
	    				if(new_total_div < 10) {
	    					throttle_level = 0
	    					chrome.runtime.sendMessage({greeting: "limit_reached", level: throttle_level}, function(response) {
							  console.log("background confirms un-throttling");
							});	

	    				}
	    				if (new_total_div > 10) {
	    					if (document.getElementById('pagelet_bluebar') !== null)
								document.getElementById('pagelet_bluebar').style.filter = 'grayscale(100%)';
							if (document.getElementById('userNav') !== null)
								document.getElementById('userNav').style.filter = 'grayscale(100%)';
							if (document.getElementById('universalNav') !== null)
								document.getElementById('universalNav').style.filter = 'grayscale(100%)';
							if (document.getElementById('pinnedNav') !== null)
								document.getElementById('pinnedNav').style.filter = 'grayscale(100%)';
							if (document.getElementById('appsNav') !== null)
								document.getElementById('appsNav').style.filter = 'grayscale(100%)';
							if (document.getElementById('createNav') !== null)
								document.getElementById('createNav').style.filter = 'grayscale(100%)';
							if (document.getElementById('contentCol') !== null)
								document.getElementById('contentCol').style.filter = 'grayscale(100%)';
							//document.body.style.filter = 'grayscale(100%)';
	    				} 
	    				if(new_total_div > 20) {
	    					var throttle_level = Math.floor(new_total_div/5) 
	    					
							chrome.runtime.sendMessage({greeting: "limit_reached", level: throttle_level}, function(response) {
							  console.log("background confirms throttling");
							});															
	    				}
	    				if (new_total_div > 30) {
	    					document.getElementById('content_container').setAttribute('style',
	    						'color:transparent;text-shadow: 0 0 8px #000, 0 0 8px #000, 0 0 8px #000;');
	    				}
	    			});
	    		}
	    		break;
	    	}
		}
	}, 66);

}, false);


// var items = document.querySelectorAll('div[id^="_hyperfeed_"]');
// console.log(items.length)
