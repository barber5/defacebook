let left_nav = document.getElementById('left_nav_section_nodes');

let instruction = document.createElement('div');
instruction.setAttribute('id', 'number_content_instruction');
instruction.setAttribute('style',
	'position:relative;top:5px;left:3px');
let instr_text = document.createTextNode('Number of posts you have seen: ');
instruction.appendChild(instr_text);
left_nav.appendChild(instruction);

let number = document.createElement('div');
number.setAttribute('id', 'number_content_seen');
number.setAttribute('style',
	'color:red;font-size:300%;text-align:center;position:relative;top:5px;left:3px');

chrome.storage.local.get({'total_div': 0}, function(item){
	console.log('number.js');
	var number_content = document.createTextNode(item['total_div']);
	number.appendChild(number_content);
	left_nav.appendChild(number);
	if(new_total_div < 10) {
		var throttle_level = 0
		chrome.runtime.sendMessage({greeting: "limit_reached", level: throttle_level}, function(response) {
		  console.log("background confirms un-throttling");
		});	

	}
	if (item['total_div'] > 10) {
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
	if(item['total_div'] > 20) {
		var throttle_level = Math.floor(item['total_div']/5) 	    					
		chrome.runtime.sendMessage({greeting: "limit_reached", level: throttle_level}, function(response) {
		  console.log("background confirms throttling");
		});	
	}
	if (item['total_div'] > 30) {
		document.getElementById('content_container').setAttribute('style',
	    	'color:transparent;text-shadow: 0 0 8px #000, 0 0 8px #000, 0 0 8px #000;');
	}
});

function time_now() {
	console.log('main.js: timer_now');
	chrome.storage.local.get({'last_time': 0}, function(item){
		if (item['last_time'] !== 0) {
			var now = new Date().getTime();
			if (now - item['last_time'] > 6000) {
				console.log('reset');
				chrome.storage.local.set({'total_div': 0}, function(){});
				document.getElementById('number_content_seen').innerHTML = 0;

				var throttle_level = 0
				chrome.runtime.sendMessage({greeting: "limit_reached", level: throttle_level}, function(response) {
				  console.log("background confirms un-throttling");
				});	

				if (document.getElementById('pagelet_bluebar') !== null)
					document.getElementById('pagelet_bluebar').style.filter = 'grayscale(0%)';
				if (document.getElementById('userNav') !== null)
					document.getElementById('userNav').style.filter = 'grayscale(0%)';
				if (document.getElementById('universalNav') !== null)
					document.getElementById('universalNav').style.filter = 'grayscale(0%)';
				if (document.getElementById('pinnedNav') !== null)
					document.getElementById('pinnedNav').style.filter = 'grayscale(0%)';
				if (document.getElementById('appsNav') !== null)
					document.getElementById('appsNav').style.filter = 'grayscale(0%)';
				if (document.getElementById('createNav') !== null)
					document.getElementById('createNav').style.filter = 'grayscale(0%)';
				if (document.getElementById('contentCol') !== null)
					document.getElementById('contentCol').style.filter = 'grayscale(0%)';

				document.getElementById('content_container').removeAttribute('style');
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
