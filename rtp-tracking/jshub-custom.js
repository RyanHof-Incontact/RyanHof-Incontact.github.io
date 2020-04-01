/*!
 * jsHub open source tagging
 *
 * Custom plugin 
 * Prepared by RTP consulting
 */


(function () {

  /*
  * Metadata about this plug-in for use by UI tools and the Hub
  */
  var metadata = {
    name: 'Disney Custom Page Data Plugin',
    id: 'disney-custom',
    version: 1.0,
    vendor: 'RTP Inc',
    type: 'data-capture'
  };

  /*
   * First trigger an event to show that the plugin is being registered
   */
  jsHub.trigger("plugin-initialization-start", metadata);

  /**
   * Capture page data from the SiteCatalyst object in the page
   * @method capture
   * @param event {Object} Config object for the plugin, containing data found by other plugins, and
   * the context (DOM node) to start parsing from.
   * @property metadata
   */
  metadata.eventHandler = function capture(event) {

    // Notify start lifecycle event
    jsHub.trigger("plugin-parse-start", event);

    var data = event.data;

//    if (!! window.s) {
//      data['page-name'] = s.pageName;
      // etc...
//    }

    if (readCookie('email')) 
	data['email-address'] = readCookie('email')

    // and send to output plugins
    jsHub.trigger("plugin-parse-complete", data);

    return data;
  };

  /*
   * Bind the plugin to the Hub to look for data to add to page view events
   */
  jsHub.bind("page-view", metadata);

  /*
   * Last trigger an event to show that the plugin has bene registered
   */
  jsHub.trigger("plugin-initialization-complete", metadata);
}());



// Configuration
jsHub.configure("inspector", {
    "Version" : "0.4",
  "Generator" : "http://localhost:3001/tag_configurations/18",
  "Configuration" : "AKQA Realtime APIs (revision 7, debug)"
});


/* development */
//jsHub.configure("RTP-decision", {"server":"fluffles.etl.office:8000/realtime/v1/webdecision"});
//jsHub.configure("RTP-transport", {"server":"fluffles.etl.office:8000/realtime/v1/webcapture"});
//jsHub.configure("RTP-transport", {"server":"fluffles.etl.office:8110/realtime/v1/capture"});

/* production */
//jsHub.configure("RTP-decision", {"server":"api.megademo.RTP.com/realtime/v1/webdecision"});
//jsHub.configure("RTP-transport", {"server":"api.megademo.RTP.com/realtime/v1/webcapture"});

//jsHub.configure("RTP-decision", {"server":"api.v4fsdemo.RTP.com//realtime/v1/webdecision"});
//jsHub.configure("RTP-transport", {"server":"api.v4fsdemo.RTP.com/realtime/v1/webcapture"});

/* Denver data center */
jsHub.configure("RTP-decision", {"server":"rtpdemo.ceanice.com/_datacapture/realtime/v5/webdecision"});
jsHub.configure("RTP-transport", {"server":"rtpdemo.ceanice.com/_datacapture/realtime/v5/webcapture"});




function getURLParam( name )
{       
    // get query string part of url into its own variable
    var url = window.location.href;
    url.replace('@', '%40')
    var query_string = url.split("?");
            
    // make array of all name/value pairs in query string
    if (query_string[1]) {
        var params = query_string[1].split("&");
            
        // loop through the parameters
        var i = 0;
        while (i < params.length) {
            // compare param name against arg passed in
            var param_item = params[i].split("=");
            if (param_item[0] == name) { 
                // if they match, return the value
                return param_item[1];
            }       
            i++;    
        }       
        return "";
    }
} 

// Send Email with ExactTarget
function sendEmail() {
	var email = readCookie('email');
	var url = "https://api.dc1.exacttarget.com/integrate.aspx?qf=xml&xml=<exacttarget><authorization><username>emailRTP@gmail.com</username><password>gocubs1!</password></authorization><system><system_name>triggeredsend</system_name><action>add</action><TriggeredSend xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns='http://exacttarget.com/wsdl/partnerAPI'><TriggeredSendDefinition><CustomerKey>476</CustomerKey></TriggeredSendDefinition><Subscribers><SubscriberKey>"+email+"</SubscriberKey><EmailAddress>"+email+"</EmailAddress></Subscribers></TriggeredSend></system></exacttarget>";
    document.getElementById("ExactTarget").src = url;

    //alert(url);
}

// Create a Cookie to save identifier between pages
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    } else 
        var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

// Read Cookie value
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);  
    }   
    return null;
}




// example callback function
function doSomethingWithDecision(response){
	var response = window.RTPDecisionAPI = response;
	
	// update content in the option div
	function updateContent() {
    	var decisions = response.decisions,
            location = '',
            option = {},
            optionName = '',
            properties = [],
            item;

        //console.log('updateContent', this, arguments, response)

        // For each location get all the options and create the html string from its properties
        // Then insert the html string into the location on the page
        if (decisions && decisions.length > 0){
        	for(var d = 0; d < decisions.length; d++){
				location = decisions[d].location;
				option = decisions[d].option;
				console.log('decisions', this, arguments, location, option);
				properties = option.properties;
				optionName = option.name;
				
				var adbox = document.getElementById(location);
				if(properties.length==0) {
					if(optionName!=null)
						adbox.src='./images/'+optionName+'.jpg';	
				} else {		
				for(var p = 0; p < properties.length; p++){
					if(properties[p].value != null) {
					
						if(adbox!=null){
							console.log('RTP Content Decision:', properties[p].value);
							adbox.innerHTML = properties[p].value;
							adbox.firstChild.removeAttribute('height');
							adbox.firstChild.removeAttribute('width');
				  
						}
						var custid = getCustId();
						var custidContent = document.getElementById('custid').innerHTML;
						document.getElementById('custid').innerHTML = custidContent + ' ('+custid+')';
					}
				}		
				}	
        	}
    	}
	};

	// trigger function on doc.ready
	function onReady(d, f){
		if (d.addEventListener) {
			/* for Mozilla / Opera9 */
			d.addEventListener("DOMContentLoaded", f, false);
	
		} else if (d.attachEvent) {
			/* for Internet Explorer */
			d.onreadystatechange = function () {
				if (/interactive|complete/.test(this.readyState)) {
					f();
				}
			};
	
		} else if (/WebKit/i.test(navigator.userAgent)) {
			/* for older Safari */
			timer = setInterval(function () {
				if (/loaded|complete/.test(d.readyState)) {
					f();
				}
			}, 50);
		}
	};
	onReady(document, updateContent);

}

function getCustId() {
	var custid = readCookie('custid');
	if(custid==null) {
		custid = Math.floor(Math.random()*10000);
		createCookie('custid',custid,30);
	}
	return custid;
}

function getEmail() {
	var email = readCookie('email');
	return email;
}
