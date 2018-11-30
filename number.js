let left_nav = document.getElementById('left_nav_section_nodes');
let number = document.createElement('div');
number.setAttribute('id', 'number_content_seen');
number.setAttribute('style',
	'color:red;font-size:300%;text-align:center;position:relative;top:100px;left:3px');
chrome.storage.local.get({'total_div': 0}, function(item){
	var number_content = document.createTextNode(item['total_div']);
	number.appendChild(number_content);
	left_nav.appendChild(number);
	if (item['total_div'] > 10) {
		if(limit_reached == 0) {
		chrome.runtime.sendMessage({greeting: "limit_reached"}, function(response) {
		  console.log("background confirms limited reached");
		});
		limit_reached = 1;
	}

	document.getElementById('pagelet_bluebar').style.filter = 'grayscale(100%)'
	
	document.getElementById('userNav').style.filter = 'grayscale(100%)'
	document.getElementById('universalNav').style.filter = 'grayscale(100%)'
	document.getElementById('pinnedNav').style.filter = 'grayscale(100%)'
	document.getElementById('appsNav').style.filter = 'grayscale(100%)'
	document.getElementById('createNav').style.filter = 'grayscale(100%)'

	document.getElementById('contentCol').style.filter = 'grayscale(100%)'
	//document.body.style.filter = 'grayscale(100%)';
	}
});