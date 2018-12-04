let left_nav = document.getElementById('left_nav_section_nodes');
let number = document.createElement('div');
number.setAttribute('id', 'number_content_seen');
number.setAttribute('style',
	'color:red;font-size:300%;text-align:center;position:relative;top:100px;left:3px');

chrome.storage.local.get({'total_div': 0}, function(item){
	console.log('number.js');
	var number_content = document.createTextNode(item['total_div']);
	number.appendChild(number_content);
	left_nav.appendChild(number);
	if (item['total_div'] > 10) {
	

	document.getElementById('pagelet_bluebar').style.filter = 'grayscale(100%)';
	
	document.getElementById('userNav').style.filter = 'grayscale(100%)';
	document.getElementById('universalNav').style.filter = 'grayscale(100%)';
	document.getElementById('pinnedNav').style.filter = 'grayscale(100%)';
	document.getElementById('appsNav').style.filter = 'grayscale(100%)';
	document.getElementById('createNav').style.filter = 'grayscale(100%)';

	document.getElementById('contentCol').style.filter = 'grayscale(100%)';
	//document.body.style.filter = 'grayscale(100%)';
	}
	if(item['total_div'] > 20) {
		var throttle_level = Math.floor(item['total_div']/5) 	    					
		chrome.runtime.sendMessage({greeting: "limit_reached", level: throttle_level}, function(response) {
		  console.log("background confirms throttling");
		});	
	}
});

function time_now() {
	console.log('main.js: timer_now');
	chrome.storage.local.get({'last_time': 0}, function(item){
		if (item['last_time'] !== 0) {
			var now = new Date().getTime();
			if (now - item['last_time'] > 10000) {
				console.log('reset');
				chrome.storage.local.set({'total_div': 0}, function(){});
				document.getElementById('number_content_seen').innerHTML = 0;

				document.getElementById('pagelet_bluebar').style.filter = 'grayscale(0%)';
	
				document.getElementById('userNav').style.filter = 'grayscale(0%)';
				document.getElementById('universalNav').style.filter = 'grayscale(0%)';
				document.getElementById('pinnedNav').style.filter = 'grayscale(0%)';
				document.getElementById('appsNav').style.filter = 'grayscale(0%)';
				document.getElementById('createNav').style.filter = 'grayscale(0%)';

				document.getElementById('contentCol').style.filter = 'grayscale(0%)';
			}
		}
	});
}

//time_now();

setInterval((function interval(){
	time_now();

	var now = new Date().getTime();
	console.log('store_time: ' + now.toString());
	chrome.storage.local.set({'last_time': now}, function(){});

	return interval;
})(), 5000);
