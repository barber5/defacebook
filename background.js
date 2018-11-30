var atBottom = 0;
var limit_reached = 0;

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
    	console.log("limit_reached");
    	limit_reached = 1;
      	sendResponse({farewell: "goodbye"});
    }
  });

chrome.webRequest.onBeforeRequest.addListener(
        function(details) {  
        	if(limit_reached == 1) {
        		var url = details.url;
	        	if(url.search('scontent-ort2') != -1) {
	        		// sleepFor(50);
	        	}
	        	if(url.search('LitestandTailLoadPagelet') != -1) {
	        		sleepFor(7500);
	        	}
        	}
	        	
        },
        {urls: ["<all_urls>"]},
        ["blocking"]);

