/*!
 * jsHub open source tagging
 * Copyright (c) 2009 jsHub.org
 * Released under the BSD license, see http://github.com/jshub/jshub-core/raw/master/LICENSE.txt
 *
 * This file also contains code supplied by and Copyright (c) 2009, Yahoo! Inc. under the BSD License: http://developer.yahoo.net/yui/license.txt
 * This file also contains code supplied by and Copyright (c) 2009 John Resig under the MIT License http://docs.jquery.com/License
 * This file also contains code supplied by and Copyright (c) 2009, 2010, 2011, 2012 RTP Ltd. - v2.0 (r28094)
 */




// debug/debug-min.js skipped

// hub/hub-min.js
(function(){var c=window,b,a=function(){var h=[],i=[],f={},m=function(n,p){this.token=n;
this.callback=p;
},l=function(n,q,p){this.type=n;
this.timestamp=p||b.safe.getTimestamp();
this.data=q;
},g=function(){var n={},p=function(q){return n[q]||{"data-capture":[],"data-transport":[]};
};
this.bind=function(r,t,q,w){var v=p(r);
if(!v[q]){q="data-capture";
}for(var u=false,s=0;
s<v[q].length;
s++){if(v[q][s].token===t){v[q][s].callback=w;
u=true;
break;
}}if(!u){v[q].push(new m(t,w));
}n[r]=v;
};
this.listenersFor=function(u){var r=p(u),q=p("*");
var x=[],y=[].concat(r["data-capture"]).concat(q["data-capture"]).concat(r["data-transport"]).concat(q["data-transport"]);
o:for(var t=0,w=y.length;
t<w;
t++){for(var s=0,v=x.length;
s<v;
s++){if(x[s].token===y[t].token){continue o;
}}x.push(y[t]);
}return x;
};
},k=new g(),e=function(){var n=function(r,t){r=r.split(",");
for(var s=0;
s<r.length;
s++){if(t===b.util.trim(r[s])){return true;
}}return false;
},q=function(r,t){var s=b.util.trim(t.event_visibility);
if(s===undefined||s===""||s==="*"){return true;
}return n(s,r);
},p=function(s,t){var r={};
b.util.each(t,function(w,v){if(/_visibility$/.test(v)===false){var u=t[v+"_visibility"];
if(typeof u!=="string"||u===""||u==="*"||n(u,s)){r[v]=w;
}}});
return r;
};
this.dispatch=function(s,x,w,v){var r,u,t;
if(q(x.token,w)){u=p(x.token,w);
r=new l(s,u,v);
t=x.callback(r);
if(t){b.util.merge(w,t);
}}};
},j=new e();
this.bind=function(n,p){if(typeof n!=="string"||n===""){return;
}if(typeof p!=="object"){return;
}if(!p.id||!p.eventHandler){return;
}k.bind(n,p.id,p.type,p.eventHandler);
};
this.trigger=function(q,s,r){s=s||{};
var n=new l(q,s,r);
i.push(n);
var t=k.listenersFor(q);
for(var p=0;
p<t.length;
p++){j.dispatch(q,t[p],s,n.timestamp);
}if(q==="plugin-initialization-start"){h.push(s);
if(f[s.id]){this.configure(s.id,f[s.id]);
}}};
this.cachedEvents=function(){var s=[],q;
for(q=0;
q<i.length;
q++){var p=i[q],n={};
n.type=p.type;
n.timestamp=p.timestamp;
n.data={};
for(var r in p.data){if(p.data.hasOwnProperty(r)){n.data[r]=p.data[r];
}}s.push(n);
}return s;
};
this.getPluginInfo=function(){var s=[],n;
for(n=0;
n<h.length;
n++){var p=h[n],r={};
for(var q in p){if(typeof p[q]==="string"||typeof p[q]==="number"){r[q]=p[q];
}}s.push(r);
}return s;
};
this.configure=function(v,s){if(typeof v!=="string"){throw new Error("Invalid configuration key");
}var r,w,t,x=v.split("."),p=typeof s;
w=function(){var y,z=x.slice(1,x.length).join(".");
for(y=0;
y<h.length;
y++){if(r===h[y].id&&typeof h[y].configure==="function"){h[y].configure(z,s);
return;
}}};
r=x[0];
t=x[x.length-1];
for(var u=f,q=0;
q<x.length-1;
q++){u[x[q]]=u[x[q]]||{};
u=u[x[q]];
}if(p==="string"||p==="number"||p==="boolean"){u[t]=s;
w();
}else{if(s===null){delete u[t];
w();
}else{if(p==="object"){for(var n in s){if(s.hasOwnProperty(n)){this.configure(v+"."+n,s[n]);
}}}else{return u[t];
}}}};
};
b=c.jsHub=new a();
b.safe=function(f){var e;
if("document"===f){e={location:{hash:document.location.hash,host:document.location.host,hostname:document.location.hostname,href:document.location.href,pathname:document.location.pathname,port:document.location.port,protocol:document.location.protocol,search:document.location.search},title:document.title,referrer:(document.referrer===null)?"":document.referrer,cookies:document.cookies,domain:"Unsafe property"};
}else{e={};
}return e;
};
b.safe.getTimestamp=function(){return new Date().getTime();
};
var d=function(){var e=this;
e.trim=function(f){if(typeof f==="string"){f=f.replace(/(&nbsp;|\s)+/g," ").replace(/(^\s+)|(\s+$)/g,"");
}return f;
};
e.isArray=function(f){return Object.prototype.toString.call(f)==="[object Array]";
};
e.each=function(g,k){if(e.isArray(g)){for(var j=0,f=g.length;
j<f;
j++){k.call(b,g[j],j);
}}else{if(typeof g==="object"){for(var h in g){if(g.hasOwnProperty(h)){k.call(b,g[h],h);
}}}}return g;
};
e.merge=function(f,h){f=f||{};
h=h||{};
for(var g in h){if(h.hasOwnProperty(g)){f[g]=h[g];
}}return f;
};
};
b.util=new d();
})();

// form-transport/form-transport-min.js
(function(){var a=function(){this.dispatch=function(b,d,j){var l=+new Date(),n=document,m=(/MSIE/).test(navigator.userAgent),f,g="jshub-form-"+l,h,c="jshub-iframe-"+l,i;
if(!(/^POST|GET$/i.test(b))||!d||(/^javascript:|file:/i.test(d))){return false;
}j=j||{};
f=n.createElement("form");
f.id=g;
f.method=b;
f.action=d;
f.style.visibility="hidden";
f.style.position="absolute";
f.style.top=0;
f.style.cssClass="jshub-form";
while(f.hasChildNodes()){f.removeChild(f.lastChild);
}jsHub.util.each(j,function o(r,t){var q,p;
if(typeof r==="string"||typeof r==="number"){if(m){try{p=n.createElement('<input name="'+t+'" />');
}catch(s){p=n.createElement("input");
p.name=t;
}}else{p=n.createElement("input");
p.name=t;
}p.type="hidden";
p.value=r;
f.appendChild(p);
}else{if(jsHub.util.isArray(r)){for(q=0;
q<r.length;
q++){if(typeof r[q]==="string"||typeof r[q]==="number"){o(r[q],t);
}}}else{}}});
if(m){try{h=n.createElement('<iframe name="'+c+'" />');
}catch(k){h=n.createElement("iframe");
h.name=c;
}}else{h=n.createElement("iframe");
h.name=c;
}h.id=c;
h.src="#";
h.style.visibility="hidden";
h.style.position="absolute";
h.style.top=0;
h.style.cssClass="jshub-iframe";
if(m){try{if("ActiveXObject" in window){n=new ActiveXObject("htmlfile");
n.open();
n.write("<html><head></head><body></body></html>");
n.body.innerHTML=f.outerHTML+h.outerHTML;
n.close();
f=n.getElementById(f.id);
h=n.getElementById(h.id);
}}catch(k){}}else{n.body.appendChild(f);
n.body.appendChild(h);
}if(!f){}if(!h||typeof(h.nodeType)==="undefined"){}i={"doc":n,"form":f,"url":f.action,"iframe":h};
h.transportState=0;
h.onload=function(){jsHub.trigger("form-transport-complete",i);
if(f&&h.parentNode){f.parentNode.removeChild(f);
}if(h&&h.parentNode){h.parentNode.removeChild(h);
}};
h.onunload=function(){};
f.target=h.id;
f.submit();
jsHub.trigger("form-transport-sent",{method:b,url:d,data:j});
return i;
};
};
jsHub.dispatchViaForm=(new a()).dispatch;
})();

// jsonp-transport/jsonp-transport-min.js
(function(){var a=function(){this.request=function(g,e,h,f){var c=g+"?"+e+"&callback="+h;
if(f===true||f==="true"){document.write('<script type="text/javascript" src="',c,'"><\/script>');
}else{var b=document.createElement("script");
b.setAttribute("type","text/javascript");
b.setAttribute("src",c);
var d=document.getElementsByTagName("head")[0];
d.appendChild(b);
}};
this.response=function(b){jsHub.response=b;
};
};
jsHub.dispatchViaJsonp=(new a()).request;
jsHub.responseViaJsonp=(new a()).response;
})();

// lib/json2-min.js
(function(){function d(f){return f<10?"0"+f:f;
}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(f){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+d(this.getUTCMonth()+1)+"-"+d(this.getUTCDate())+"T"+d(this.getUTCHours())+":"+d(this.getUTCMinutes())+":"+d(this.getUTCSeconds())+"Z":null;
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(f){return this.valueOf();
};
}var c=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,g=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,h,b,j={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},i;
function a(f){g.lastIndex=0;
return g.test(f)?'"'+f.replace(g,function(k){var l=j[k];
return typeof l==="string"?l:"\\u"+("0000"+k.charCodeAt(0).toString(16)).slice(-4);
})+'"':'"'+f+'"';
}function e(r,o){var m,l,s,f,p=h,n,q=o[r];
if(q&&typeof q==="object"&&typeof q.toJSON==="function"){q=q.toJSON(r);
}if(typeof i==="function"){q=i.call(o,r,q);
}switch(typeof q){case"string":return a(q);
case"number":return isFinite(q)?String(q):"null";
case"boolean":case"null":return String(q);
case"object":if(!q){return"null";
}h+=b;
n=[];
if(Object.prototype.toString.apply(q)==="[object Array]"){f=q.length;
for(m=0;
m<f;
m+=1){n[m]=e(m,q)||"null";
}s=n.length===0?"[]":h?"[\n"+h+n.join(",\n"+h)+"\n"+p+"]":"["+n.join(",")+"]";
h=p;
return s;
}if(i&&typeof i==="object"){f=i.length;
for(m=0;
m<f;
m+=1){l=i[m];
if(typeof l==="string"){s=e(l,q);
if(s){n.push(a(l)+(h?": ":":")+s);
}}}}else{for(l in q){if(Object.hasOwnProperty.call(q,l)){s=e(l,q);
if(s){n.push(a(l)+(h?": ":":")+s);
}}}}s=n.length===0?"{}":h?"{\n"+h+n.join(",\n"+h)+"\n"+p+"}":"{"+n.join(",")+"}";
h=p;
return s;
}}jsHub.json=jsHub.json||{};
if(typeof jsHub.json.stringify!=="function"){jsHub.json.stringify=function(m,k,l){var f;
h="";
b="";
if(typeof l==="number"){for(f=0;
f<l;
f+=1){b+=" ";
}}else{if(typeof l==="string"){b=l;
}}i=k;
if(k&&typeof k!=="function"&&(typeof k!=="object"||typeof k.length!=="number")){throw new Error("JSON.stringify");
}return e("",{"":m});
};
}}());

// logger/logger-min.js skipped

// vendor-RTP/RTP-decision-min.js
(function(){var d={id:"RTP-decision",name:"RTP Decision Plugin",version:"2.0.1",vendor:"RTP Inc",type:"data-transport"},b="string",a={server:null,account:null,locations:null,callback:"jsHub.responseViaJsonp",api:"",wait:false},c=function(){if(typeof a.server!==b){jsHub.trigger("plugin-error",{message:"Server hostname not specified",source:d.id});
return;
}if(typeof a.locations!==b){jsHub.trigger("plugin-error",{message:"Locations not specified",source:d.id});
return;
}var g,f=a.locations.split(/\s*,\s*/);
g="numRequests="+f.length;
for(i=0;
i<f.length;
i++){g+="&loc"+i+"="+f[i];
}g+=a.api;
var h=(("https:"===jsHub.safe("document").location.protocol)?"https://":"https://"),j=a.server.split(/\s*,\s*/);
for(i=0;
i<j.length;
i++){jsHub.dispatchViaJsonp(h+j[i],g,a.callback,a.wait);
}};
jsHub.trigger("plugin-initialization-start",d);
d.eventHandler=function e(f){c();
};
d.configure=function(f,g){a[f]=""+g;
};
jsHub.bind("make-decision",d);
jsHub.trigger("plugin-initialization-complete",d);
})();

// vendor-RTP/RTP-transport-min.js
(function(){var h={id:"RTP-transport",name:"RTP Transport Plugin",version:"0.4.4",vendor:"RTP Inc",type:"data-transport"},a="authentication,checkout,download,nat-search-ref,page-view,product-view,site-exit,site-search".split(","),f="string",e=/^url|tzOffset|sW|sH|wW|wH|colors|plugins$/,c={server:null,account:null},b=[],i=false,j=function(o,n,m){if(/-source$/.test(n)){return;
}var l=typeof m,k;
if(f===l||"number"===l){o.push({name:n,value:m});
}else{if(jsHub.util.isArray(m)){for(k=0;
k<m.length;
k++){j(o,n,m[k]);
}}}},g=function(){if(typeof c.server!==f){jsHub.trigger("plugin-error",{message:"Server hostname not specified",source:h.id});
return;
}var m,k,s,n,p,l;
var o={sender:h.name+" v"+h.version,event:[]};
for(m=0;
m<b.length;
m++){k=b[m];
s={timestamp:k.timestamp,eventType:k.type};
if(typeof c.account===f){s.organization=c.account;
}l=[];
for(n in k.data){if(k.data.hasOwnProperty(n)){p=k.data[n];
if(e.test(n)){o[n]=p;
}else{if(n==="referrer"){if(p===""){p="(direct)";
}o.referrer=p;
}else{j(l,n,p);
}}}}if(l.length>0){s.attributes=l;
}o.event.push(jsHub.json.stringify(s));
}b=[];
var r=(("https:"===jsHub.safe("document").location.protocol)?"https://":"https://"),q=c.server.split(/\s*,\s*/);
for(m=0;
m<q.length;
m++){jsHub.dispatchViaForm("POST",r+q[m],o);
}};
jsHub.trigger("plugin-initialization-start",h);
h.eventHandler=function d(m){if(m.type==="data-capture-start"){i=true;
}if(m.type==="data-capture-complete"){i=false;
g();
}var l=false;
if(""+m.data["custom-event"]==="true"){l="custom";
}else{if(m.type.match(/^error-/)){l="standard";
}else{for(var k=0;
k<a.length;
k++){if(a[k]===m.type){l="standard";
break;
}}}}if(l){b.push(m);
if(!i){g();
}}};
h.configure=function(k,l){c[k]=""+l;
};
jsHub.bind("*",h);
jsHub.trigger("plugin-initialization-complete",h);
})();



// Configuration
jsHub.configure("inspector", {
	"Version" : "0.4",
  "Generator" : "http://liamc.local:3001/tag_configurations/23",
  "Configuration" : "Disney Realtime APIs (revision 4, debug)"
});

