var atBottom = 0;
var throttle_level = 0;

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "limit_reached") {
    	console.log("throttle_level is " + request.level);
    	throttle_level = request.level;
      	sendResponse({farewell: "loading throttled"});
    }
  });

chrome.webRequest.onBeforeRequest.addListener(
        function(details) {  
        	if(throttle_level > 0) {
        		var url = details.url;
	        	if(url.search('scontent-ort2') != -1) {
	        		// sleepFor(50);
	        	}
	        	if(url.search('LitestandTailLoadPagelet') != -1) {
	        		sleepFor( (throttle_level+2)*1000 );
	        	}
        	}	        	
        },
        {urls: ["<all_urls>"]},
        ["blocking"]);

