// ==UserScript==
// @name           GitHub Enhancement Suite
// @namespace      https://github.com/skratchdot/github-enhancement-suite
// @description    A collection of userscripts to add functionality when browsing github.com
// @include        https://github.com/*
// @match          https://github.com/*
// @run-at         document-end
// @icon           http://skratchdot.com/favicon.ico
// @downloadURL    https://github.com/skratchdot/github-enhancement-suite/raw/master/enhancement-suite.user.js
// @updateURL      https://github.com/skratchdot/github-enhancement-suite/raw/master/enhancement-suite.user.js
// @version        2.0.0
// ==/UserScript==


!function e(t,n,r){function o(a,u){if(!n[a]){if(!t[a]){var s="function"==typeof require&&require;

if(!u&&s)return s(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");

throw c.code="MODULE_NOT_FOUND",c}var l=n[a]={exports:{}};t[a][0].call(l.exports,function(e){
var n=t[a][1][e];return o(n?n:e)},l,l.exports,e,t,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);

return o}({1:[function(e,t,n){"use strict";n["fork-count"]=e("../plugins/fork-count"),
n["gh-pages-link"]=e("../plugins/gh-pages-link"),n["pull-request-links"]=e("../plugins/pull-request-links"),
n["repo-counts"]=e("../plugins/repo-counts"),n["repo-filter-info"]=e("../plugins/repo-filter-info"),
n.settings=e("../plugins/settings"),n["twitter-link"]=e("../plugins/twitter-link"),
n.pluginNames=["fork-count","gh-pages-link","pull-request-links","repo-counts","repo-filter-info","settings","twitter-link"];

},{"../plugins/fork-count":6,"../plugins/gh-pages-link":7,"../plugins/pull-request-links":8,
"../plugins/repo-counts":9,"../plugins/repo-filter-info":10,"../plugins/settings":11,
"../plugins/twitter-link":12}],2:[function(e,t,n){"use strict";var r=e("util"),o=e("object-path-get"),i=e("object-path-set"),a="GES.by.skratchdot",u=function(){
try{var e=JSON.parse(window.localStorage.getItem(a));return r.isObject(e)||(e={}),
e}catch(t){return{}}};n.get=function(e,t){var n=u();return o(n,e,t)},n.set=function(e,t){
var n=u();n=i(n,e,t),window.localStorage.setItem(a,JSON.stringify(n))},n.test=function(){
var e="localStorageTest",t=Date.now();return n.set(e,t),t===n.get(e,null)}},{"object-path-get":26,
"object-path-set":27,util:21}],3:[function(e,t,n){"use strict";var r=(e("jquery"),
e("url")),o=e("./storage");n.getCurrentAuthorAndRepo=function(){var e=(r.parse(document.location.toString()).pathname||"").split("/");

return{author:e[1]||"",repo:e[2]||""}},n.getCurrentRepo=function(){return n.getCurrentAuthorAndRepo().repo;

},n.getCurrentAuthor=function(){return n.getCurrentAuthorAndRepo().author},n.isPluginEnabled=function(e){
return"boolean"!=typeof o.get("enabled."+e)&&o.set("enabled."+e,!0),o.get("enabled."+e,!0);

},n.enablePlugin=function(e,t){o.set("enabled."+e,t)},n.togglePluginEnabled=function(e){
n.enablePlugin(e,!n.isPluginEnabled(e))}},{"./storage":2,jquery:23,url:19}],4:[function(e,t,n){
var r=e("d3"),o={};o.pie_chart=function(e,t,n){"use strict";var o,i,a,u,s,c,l,p,f=r.select("svg."+e),d=f[0][0].clientWidth||f[0][0].parentNode.clientWidth,h={
radius_inner:0,radius_outer:d/3,radius_label:d/3+20,percentage:!0,value:!1,label_margin:10,
group_data:0},g={left:[],right:[]},m=function(e){e.sort(function(e,t){return e.y+e.height-(t.y+t.height);

}).forEach(function(t,n){e[n+1]&&e[n+1].y-(t.y+t.height)<h.label_margin&&(e[n+1].y=t.y+t.height+h.label_margin),
t.x<h.label_margin?t.x=h.label_margin:t.x+t.width>d-h.label_margin&&(t.x=d-t.width-h.label_margin),
r.select(s[0][t.index]).attr("transform","translate("+t.x+", "+t.y+")"),r.select(c[0][t.index]).attr("x",0).attr("y",-t.height+2).attr("width",t.width+4).attr("height",t.height+4),
t.textNode.attr("x",2).attr("y",2)})},v=function(e){var t,n=0,r=0;for(e.forEach(function(e){
n+=e.value}),t=e.length-1;t>=0;t--)e[t].value/n*100<h.group_data&&r++;if(r>1)for(r=0,
t=e.length-1;t>=0;t--)e[t].value/n*100<h.group_data&&(r+=e.splice(t,1)[0].value);
return e.push({index:0,name:"Other",value:r}),e};if(-1!==t.map(function(e){return e.index;

}).indexOf(0))throw"0 index is reserved for grouped data.";if(void 0!==n)for(p in n)n.hasOwnProperty(p)&&void 0!==h[p]&&(h[p]=n[p]);

h.group_data&&(t=v(t)),o=f.append("g").attr("class","donut").attr("transform","translate("+d/2+", "+d/2+")"),
i=r.svg.arc().innerRadius(h.radius_inner).outerRadius(h.radius_outer),t=r.layout.pie().value(function(e){
return e.value}).sort(function(e,t){return t.index-e.index})(t),a=o.selectAll("path").data(t).enter().append("path").attr("class",function(e){
return"g-"+e.data.index}).attr("d",i).on("mouseover",function(e,t){r.select(s[0][t]).classed("active",!0);

}).on("mouseout",function(e,t){r.select(s[0][t]).classed("active",!1)}),u=f.append("g").attr("class","labels"),
s=u.selectAll("g.label").data(t).enter().append("g").filter(function(e){return h.percentage?!0:void 0!==e.data.name;

}).attr("class","label"),c=s.append("rect"),l=s.append("text").text(function(e){var t=((e.endAngle-e.startAngle)/(2*Math.PI)*100).toFixed(2),n=[];

return void 0!==e.data.name&&n.push(e.data.name),h.value&&n.push(" - "+e.data.value),
h.percentage&&n.push(" ("+t+"%)"),n.join(" ")}).each(function(e,t){var n=i.centroid(e),o=n[0],a=n[1],u=Math.sqrt(o*o+a*a),s=o/u*h.radius_label+d/2,c=a/u*h.radius_label+d/2,l=.5*(e.endAngle-e.startAngle)+e.startAngle>Math.PI,p=r.select(this),f=this.getBBox();

g[l?"left":"right"].push({index:t,width:f.width,height:f.height,x:l?s-f.width:s,y:c,
textNode:p})}),m(g.left),m(g.right)},n.ay=o},{d3:22}],5:[function(e,t,n){"use strict";

var r,o=e("./core/storage"),i=e("jquery"),a=e("./core/plugins"),u=e("./core/utils");

o.test()||console.warn("Github Enhancement Suite cannot use localStorageand may not work properly."),
r=function(){a.pluginNames.forEach(function(e){u.isPluginEnabled(e)&&i(a[e].enabledSelector).length&&"function"==typeof a[e].onPage&&(console.log("Firing onPage() for plugin: "+e+" at "+Date.now()),
a[e].onPage())})},r(),function(){var e=!1,t=new MutationObserver(function(t){i(".pjax-active").length?e=!0:e&&(e=!1,
setImmediate(function(){r()}))});t.observe(document,{attributes:!0,childList:!0,characterData:!0,
characterDataOldValue:!0,subtree:!0})}()},{"./core/plugins":1,"./core/storage":2,
"./core/utils":3,jquery:23}],6:[function(e,t,n){"use strict";var r=e("jquery");n.name="Fork Count",
n.description="Display repo counts (public, private, sources, forks, mirrors) on the profile page underneath a users followers/starred/following count",
n.enabledSelector="body.page-profile .tabnav-tab.selected",n.onPage=function(){var e,t=0,n=0,o=0,i=0,a=0,u=0,s=r("ul.js-repo-list > li"),c=r(".column.vcard:first .vcard-stats");

0===r("#skratchdot-fork-count").length&&(c.append('<div class="clearfix"></div>'),
c.append('<div style="margin-top:-10px" id="skratchdot-fork-count"><span class="text-muted">repo counts visible on <a href="?tab=repositories">tab repositories</a></span></div>')),
e=r("#skratchdot-fork-count"),!e.hasClass("stats-populated")&&s.length>0&&(s.each(function(){
try{var e=r(this);t+=1,e.hasClass("public")&&(n+=1),e.hasClass("private")&&(o+=1),
e.hasClass("source")&&(i+=1),e.hasClass("fork")&&(a+=1),e.hasClass("mirror")&&(u+=1);

}catch(s){}}),e.html('<small class="text-muted">'+n+" public, "+o+" private, "+i+" sources, "+a+" forks</small>"+(u>0?'<small style="margin:0" class="text-muted">'+u+" mirrors</small>":"")),
e.addClass("stats-populated"))}},{jquery:23}],7:[function(e,t,n){"use strict";var r=e("jquery"),o=e("../core/utils");

n.name="Github Pages Link",n.description="If a repository has a gh-pages branch, then this will add links to the Github Page, as well as the gh-page source code.",
n.enabledSelector=".repo-container .repository-meta.js-details-container",n.onPage=function(){
var e,t,i=o.getCurrentAuthorAndRepo();""!==i.author&&""!==i.repo&&r('[data-tab-filter="branches"] [data-name="gh-pages"]').length>0&&(e="http://"+i.author+".github.io/"+i.repo,
t="https://github.com/"+i.author+"/"+i.repo+"/tree/gh-pages",0===r("#skratchdot-gh-pages-container").length&&(r(n.enabledSelector).append('<div style="margin-top:5px" id="skratchdot-gh-pages-container"><span style="padding-right:5px;"><b>gh-pages:</b></span><span><a id="skratchdot-gh-pages-link" href="#"></a></span><span>&nbsp;&#8226;&nbsp;</span><span><a id="skratchdot-gh-pages-link-source" href="#">[gh-pages source]</a></span></div>'),
r("#skratchdot-gh-pages-link").attr("href",e).text(e),r("#skratchdot-gh-pages-link-source").attr("href",t)));

}},{"../core/utils":3,jquery:23}],8:[function(e,t,n){"use strict";var r=e("jquery"),o=e("../core/utils");

n.name="Pull Request Links",n.description='A user script to "linkify" the to/from branches on Pull Request pages.',
n.enabledSelector=".commit-ref:not(.editor-expander)",n.onPage=function(){r(n.enabledSelector).css("cursor","pointer").click(function(){
var e=o.getCurrentRepo(),t=r(this).text().trim().split(":");console.log(e,t),1===t.length&&(t=[o.getCurrentAuthor(),t[0]]),
e.length>0&&2===t.length&&(document.location="/"+t[0]+"/"+e+"/tree/"+t[1])})}},{"../core/utils":3,
jquery:23}],9:[function(e,t,n){"use strict";var r=e("jquery");n.name="Repo Counts",
n.description="A user script to display repo counts when browsing Github repository pages.",
n.enabledSelector='body.page-profile .tabnav-tab.selected:contains("Repositories")',
n.onPage=function(){r("body.page-profile .filter-bar a.new-repo").length>0&&r("#your-repos-filter").css("width","180px"),
r(".page-profile ul.repo_filterer li a").each(function(){try{var e=r(this),t=e.data("filter"),n=r("ul.js-repo-list").find("li"+t);

e.append(" ("+n.size()+")"),e.css("font-size","11px")}catch(o){}})}},{jquery:23}],
10:[function(e,t,n){"use strict";var r,o,i,a,u,s,c,l=e("jquery"),p=e("lodash.debounce"),f=e("../extras/ay-pie-chart").ay,d=["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5"];

n.name="Repo Filter Info",n.description='A user script to display some additional info below the repository filter on a user\'s "repositories" page.',
n.enabledSelector='body.page-profile .tabnav-tab.selected:contains("Repositories")',
n.onPage=function(){var e=document.querySelector(".repo-tab .repo-list.js-repo-list"),t=new MutationObserver(function(e){
setImmediate(i)});a(),u(),t.observe(e,{attributes:!0,childList:!0,characterData:!0,
characterDataOldValue:!0,subtree:!0})},a=function(){var e,t,n="",r="skratchdot-repo-filter-info-css";

if(0===l("#"+r).length){for(n+='<style type="text/css" id="'+r+'">',n+="#skratchdot-repo-filter-div .show-hide { display: none; }",
n+="#skratchdot-repo-filter-div th, #skratchdot-repo-filter-div td { padding-right: 10px; }",
n+="#skratchdot-repo-filter-div .chart { width: 300px; height: 300px; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }",
n+="#skratchdot-repo-filter-div svg { width: 100%; height: 100%; }",n+="#skratchdot-repo-filter-div .color-chip { border: 1px solid #000; width: 10px; height: 10px; }",
e=0;e<d.length;e++)t=Math.min(d.length,e+1),n+="#skratchdot-repo-filter-div path.g-"+t+" { fill:"+d[e]+"; }",
n+="#skratchdot-repo-filter-div .color-g-"+t+" { background-color:"+d[e]+"; }";n+="#skratchdot-repo-filter-div svg > g.label { text-anchor: middle; }",
n+="#skratchdot-repo-filter-div svg > g.labels g.label { -moz-pointer-events: none; -webkit-pointer-events: none; -o-pointer-events: none; pointer-events: none; }",
n+="#skratchdot-repo-filter-div svg > g.labels g.label rect { stroke: none; fill: #fff; fill-opacity: .5; shape-rendering: crispEdges; }",
n+="#skratchdot-repo-filter-div svg > g.labels g.label text { font-size: 12px; text-anchor: left; }",
n+="#skratchdot-repo-filter-div svg > g.labels g.label.active rect { fill-opacity: 1; }",
n+="</style>",l("head").append(n)}},u=function(){0===l("#skratchdot-repo-filter-div").length&&(l("div.js-repo-filter .filter-bar").after(l("<div></div>").attr("id","skratchdot-repo-filter-div").css("background","none repeat scroll 0 0 #FAFAFB").css("border","1px solid #DDDDDD").css("border-radius","4px 4px 4px 4px").css("cursor","pointer").css("margin-bottom","10px").css("padding","10px").css("text-align","center").append('<div class="left" />').append('<div class="right"><a class="skratchdot-languages" href="#" style="font-size:.8em;padding:5px;">show languages</a><span class="octicon octicon-star"></span><span class="skratchdot-count-starred" style="padding:0px 5px;"></span>&nbsp;<span class="octicon octicon-git-branch"></span><span class="skratchdot-count-forks" style="padding:0px 5px;"></span></div>').append('<div class="show-hide" style="clear:both;"><div style="float:left;"><div class="chart"></div></div><div style="float:right;"><table><thead><tr><th>Language</th><th>&nbsp;</th><th>Usage</th><th>Repos</th><th>Starred</th><th>Forks</th></tr></thead><tbody></tbody></table></div></div>').append('<div class="clearfix" />')),
r=l("#skratchdot-repo-filter-div"),r.click(function(e){e.preventDefault(),s()?(r.find(".skratchdot-languages").text("show languages"),
r.find(".show-hide").hide()):(r.find(".skratchdot-languages").text("hide languages"),
r.find(".show-hide").show(),c())}))},s=function(){return r.find(".show-hide:visible").length>0;

},i=p(function(){console.log("drawing filter div...");var e,t,n,i,a,u=0,s=0,p=0,f=0,h=0,g={},m=[],v="",y={};

for(o=[],e=document.querySelectorAll('ul.js-repo-list > li:not([style*="display: none"])'),
u=0;u<e.length;u++)t=l("<div>"+e[u].innerHTML+"</div>"),0!==t.find(".repo-list-stats").length&&(i=parseInt(t.find('[aria-label="Forks"]').text().replace(",",""),10),
a=parseInt(t.find('[aria-label="Stargazers"]').text().replace(",",""),10),p+=1,f+=i,
h+=a,n=t.find(".repo-list-stats").clone(),n.find(".repo-list-stat-item").remove(),
v=n.text().trim(),""===v&&(v="Unknown"),g.hasOwnProperty(v)||(g[v]={name:v,count:0,
forks:0,starred:0}),g[v].count=g[v].count+1,g[v].forks=g[v].forks+i,g[v].starred=g[v].starred+a);

r.find(".left").html("Now Showing <b>"+p+"</b> Repos"),r.find(".skratchdot-count-forks").text(f),
r.find(".skratchdot-count-starred").text(h),r.find("table tbody").empty(),r.find(".chart").empty();

for(v in g)g.hasOwnProperty(v)&&m.push(g[v]);for(m.sort(function(e,t){return t.count-e.count||e.name>t.name;

}),u=0;u<m.length;u++)y=m[u],r.find("table tbody").append('<tr><td align="right">'+y.name+'</td><td align="center"><div class="color-chip color-g-'+Math.min(d.length,u+1)+'">&nbsp;</div></td><td align="center">'+(y.count/p*100).toFixed(2)+' %</td><td align="center">'+y.count+'</td><td align="center">'+y.starred+'</td><td align="center">'+y.forks+"</td></tr>"),
u<d.length-1?o.push({index:u+1,name:y.name,value:y.count}):0!==u&&(s+=y.count);s>0&&o.push({
index:d.length,name:"Other",value:s}),c()},100),c=function(){var e=r.find(".chart");

s()&&0===e.find("svg").length&&(e.append('<svg class="skratchdot-language-chart"></svg>'),
"undefined"!=typeof f&&f.pie_chart("skratchdot-language-chart",o,{group_data:0}));

}},{"../extras/ay-pie-chart":4,jquery:23,"lodash.debounce":24}],11:[function(e,t,n){
"use strict";var r=e("react"),o=e("jquery"),i=e("../core/plugins"),a=e("../core/utils"),u="github-enhancement-suite-settings",s=u+"-app";

n.name="Settings",n.description="A plugin that controls all the Github Enhancement Suite plugin settings and whether or not a plugin is enabled.",
n.enabledSelector='a.js-selected-navigation-item.selected[href="/settings/profile"]',
n.onPage=function(){var e,t,n;n=function(){0===o("#"+u).length&&o(".column.three-fourths").append('<div id="'+u+'" class="boxed-group clearfix">	<h3>Github Enhancement Suite</h3>	<div id="'+s+'" class="boxed-group-inner" style="padding-bottom:20px"></div></div>');

},e=r.createClass({displayName:"App",getDefaultProps:function(){return{pluginNames:i.pluginNames.filter(function(e){
return"settings"!==e})}},getInitialState:function(){return{lastAction:Date.now()};

},onEnableButton:function(e){a.togglePluginEnabled(e),this.setState({lastAction:Date.now()
})},render:function(){var e=this;return r.createElement("div",null,r.createElement("h1",null,"Settings"),r.createElement("hr",null),this.props.pluginNames.map(function(n){
var o=i[n];return r.createElement("div",null,r.createElement(t,{key:o.name,name:o.name,
description:o.description,enabled:a.isPluginEnabled(n),onEnableButton:e.onEnableButton.bind(e,n)
}),r.createElement("hr",null))}))}}),t=r.createClass({displayName:"PluginDisplay",
getDefaultProps:function(){return{name:"",description:"",enabled:!1,onEnableButton:function(){}
}},render:function(){return r.createElement("div",{style:{padding:20}},r.createElement("div",null,r.createElement("div",{
style:{"float":"left",width:"80%"}},r.createElement("h4",null,this.props.name),r.createElement("br",null),r.createElement("div",{
style:{width:"100%",background:"#fafafa",border:"1px solid #eaeaea",padding:20,borderRadius:10
}},this.props.description)),r.createElement("div",{style:{"float":"right"}},r.createElement("button",{
onClick:this.props.onEnableButton,className:"btn btn-"+(this.props.enabled===!0?"primary":"danger")
},this.props.enabled===!0?"Enabled":"Disabled"))),r.createElement("div",{style:{clear:"both",
"float":"none"}}," "))}}),n(),r.render(r.createElement(e,null),document.getElementById(s));

}},{"../core/plugins":1,"../core/utils":3,jquery:23,react:182}],12:[function(e,t,n){
"use strict";var r=e("jquery"),o=e("../core/utils");n.name="Twitter Link",n.description="Adds a link to Twitter on a user's profile page.",
n.enabledSelector="body.page-profile",n.onPage=function(){var e,t,n;0===r("#skratchdot-twitter-section").length&&(e=o.getCurrentAuthor(),
t=r("<a />").attr("href","//twitter.com/"+encodeURIComponent(e)).text("@"+e),n='<li class="vcard-detail" id="skratchdot-twitter-section"><span class="octicon">&#9443;</span><span id="skratchdot-twitter-link"></span></li>',
r(".column.vcard:first ul.vcard-details:first").append(n),r("#skratchdot-twitter-link").append(t));

}},{"../core/utils":3,jquery:23}],13:[function(e,t,n){t.exports="function"==typeof Object.create?function(e,t){
e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,
writable:!0,configurable:!0}})}:function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,
e.prototype=new n,e.prototype.constructor=e}},{}],14:[function(e,t,n){function r(){
l=!1,u.length?c=u.concat(c):p=-1,c.length&&o()}function o(){if(!l){var e=setTimeout(r);

l=!0;for(var t=c.length;t;){for(u=c,c=[];++p<t;)u[p].run();p=-1,t=c.length}u=null,
l=!1,clearTimeout(e)}}function i(e,t){this.fun=e,this.array=t}function a(){}var u,s=t.exports={},c=[],l=!1,p=-1;

s.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];

c.push(new i(e,t)),1!==c.length||l||setTimeout(o,0)},i.prototype.run=function(){this.fun.apply(null,this.array);

},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=a,
s.addListener=a,s.once=a,s.off=a,s.removeListener=a,s.removeAllListeners=a,s.emit=a,
s.binding=function(e){throw new Error("process.binding is not supported")},s.cwd=function(){
return"/"},s.chdir=function(e){throw new Error("process.chdir is not supported")},
s.umask=function(){return 0}},{}],15:[function(e,t,n){(function(e){!function(r){function o(e){
throw RangeError(P[e])}function i(e,t){for(var n=e.length,r=[];n--;)r[n]=t(e[n]);
return r}function a(e,t){var n=e.split("@"),r="";n.length>1&&(r=n[0]+"@",e=n[1]),
e=e.replace(S,".");var o=e.split("."),a=i(o,t).join(".");return r+a}function u(e){
for(var t,n,r=[],o=0,i=e.length;i>o;)t=e.charCodeAt(o++),t>=55296&&56319>=t&&i>o?(n=e.charCodeAt(o++),
56320==(64512&n)?r.push(((1023&t)<<10)+(1023&n)+65536):(r.push(t),o--)):r.push(t);

return r}function s(e){return i(e,function(e){var t="";return e>65535&&(e-=65536,
t+=j(e>>>10&1023|55296),e=56320|1023&e),t+=j(e)}).join("")}function c(e){return 10>e-48?e-22:26>e-65?e-65:26>e-97?e-97:w;

}function l(e,t){return e+22+75*(26>e)-((0!=t)<<5)}function p(e,t,n){var r=0;for(e=n?A(e/M):e>>1,
e+=A(e/t);e>I*_>>1;r+=w)e=A(e/I);return A(r+(I+1)*e/(e+N))}function f(e){var t,n,r,i,a,u,l,f,d,h,g=[],m=e.length,v=0,y=R,E=D;

for(n=e.lastIndexOf(O),0>n&&(n=0),r=0;n>r;++r)e.charCodeAt(r)>=128&&o("not-basic"),
g.push(e.charCodeAt(r));for(i=n>0?n+1:0;m>i;){for(a=v,u=1,l=w;i>=m&&o("invalid-input"),
f=c(e.charCodeAt(i++)),(f>=w||f>A((x-v)/u))&&o("overflow"),v+=f*u,d=E>=l?C:l>=E+_?_:l-E,
!(d>f);l+=w)h=w-d,u>A(x/h)&&o("overflow"),u*=h;t=g.length+1,E=p(v-a,t,0==a),A(v/t)>x-y&&o("overflow"),
y+=A(v/t),v%=t,g.splice(v++,0,y)}return s(g)}function d(e){var t,n,r,i,a,s,c,f,d,h,g,m,v,y,E,b=[];

for(e=u(e),m=e.length,t=R,n=0,a=D,s=0;m>s;++s)g=e[s],128>g&&b.push(j(g));for(r=i=b.length,
i&&b.push(O);m>r;){for(c=x,s=0;m>s;++s)g=e[s],g>=t&&c>g&&(c=g);for(v=r+1,c-t>A((x-n)/v)&&o("overflow"),
n+=(c-t)*v,t=c,s=0;m>s;++s)if(g=e[s],t>g&&++n>x&&o("overflow"),g==t){for(f=n,d=w;h=a>=d?C:d>=a+_?_:d-a,
!(h>f);d+=w)E=f-h,y=w-h,b.push(j(l(h+E%y,0))),f=A(E/y);b.push(j(l(f,0))),a=p(n,v,r==i),
n=0,++r}++n,++t}return b.join("")}function h(e){return a(e,function(e){return T.test(e)?f(e.slice(4).toLowerCase()):e;

})}function g(e){return a(e,function(e){return k.test(e)?"xn--"+d(e):e})}var m="object"==typeof n&&n&&!n.nodeType&&n,v="object"==typeof t&&t&&!t.nodeType&&t,y="object"==typeof e&&e;

(y.global===y||y.window===y||y.self===y)&&(r=y);var E,b,x=2147483647,w=36,C=1,_=26,N=38,M=700,D=72,R=128,O="-",T=/^xn--/,k=/[^\x20-\x7E]/,S=/[\x2E\u3002\uFF0E\uFF61]/g,P={
overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)",
"invalid-input":"Invalid input"},I=w-C,A=Math.floor,j=String.fromCharCode;if(E={version:"1.3.2",
ucs2:{decode:u,encode:s},decode:f,encode:d,toASCII:g,toUnicode:h},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){
return E});else if(m&&v)if(t.exports==m)v.exports=E;else for(b in E)E.hasOwnProperty(b)&&(m[b]=E[b]);
else r.punycode=E}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});

},{}],16:[function(e,t,n){"use strict";function r(e,t){return Object.prototype.hasOwnProperty.call(e,t);

}t.exports=function(e,t,n,i){t=t||"&",n=n||"=";var a={};if("string"!=typeof e||0===e.length)return a;

var u=/\+/g;e=e.split(t);var s=1e3;i&&"number"==typeof i.maxKeys&&(s=i.maxKeys);var c=e.length;

s>0&&c>s&&(c=s);for(var l=0;c>l;++l){var p,f,d,h,g=e[l].replace(u,"%20"),m=g.indexOf(n);

m>=0?(p=g.substr(0,m),f=g.substr(m+1)):(p=g,f=""),d=decodeURIComponent(p),h=decodeURIComponent(f),
r(a,d)?o(a[d])?a[d].push(h):a[d]=[a[d],h]:a[d]=h}return a};var o=Array.isArray||function(e){
return"[object Array]"===Object.prototype.toString.call(e)}},{}],17:[function(e,t,n){
"use strict";function r(e,t){if(e.map)return e.map(t);for(var n=[],r=0;r<e.length;r++)n.push(t(e[r],r));

return n}var o=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";

case"number":return isFinite(e)?e:"";default:return""}};t.exports=function(e,t,n,u){
return t=t||"&",n=n||"=",null===e&&(e=void 0),"object"==typeof e?r(a(e),function(a){
var u=encodeURIComponent(o(a))+n;return i(e[a])?r(e[a],function(e){return u+encodeURIComponent(o(e));

}).join(t):u+encodeURIComponent(o(e[a]))}).join(t):u?encodeURIComponent(o(u))+n+encodeURIComponent(o(e)):"";

};var i=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e);

},a=Object.keys||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);

return t}},{}],18:[function(e,t,n){"use strict";n.decode=n.parse=e("./decode"),n.encode=n.stringify=e("./encode");

},{"./decode":16,"./encode":17}],19:[function(e,t,n){function r(){this.protocol=null,
this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,
this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,
this.href=null}function o(e,t,n){if(e&&c(e)&&e instanceof r)return e;var o=new r;
return o.parse(e,t,n),o}function i(e){return s(e)&&(e=o(e)),e instanceof r?e.format():r.prototype.format.call(e);

}function a(e,t){return o(e,!1,!0).resolve(t)}function u(e,t){return e?o(e,!1,!0).resolveObject(t):t;

}function s(e){return"string"==typeof e}function c(e){return"object"==typeof e&&null!==e;

}function l(e){return null===e}function p(e){return null==e}var f=e("punycode");n.parse=o,
n.resolve=a,n.resolveObject=u,n.format=i,n.Url=r;var d=/^([a-z0-9.+-]+:)/i,h=/:[0-9]*$/,g=["<",">",'"',"`"," ","\r","\n","	"],m=["{","}","|","\\","^","`"].concat(g),v=["'"].concat(m),y=["%","/","?",";","#"].concat(v),E=["/","?","#"],b=255,x=/^[a-z0-9A-Z_-]{0,63}$/,w=/^([a-z0-9A-Z_-]{0,63})(.*)$/,C={
javascript:!0,"javascript:":!0},_={javascript:!0,"javascript:":!0},N={http:!0,https:!0,
ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0
},M=e("querystring");r.prototype.parse=function(e,t,n){if(!s(e))throw new TypeError("Parameter 'url' must be a string, not "+typeof e);

var r=e;r=r.trim();var o=d.exec(r);if(o){o=o[0];var i=o.toLowerCase();this.protocol=i,
r=r.substr(o.length)}if(n||o||r.match(/^\/\/[^@\/]+@[^@\/]+/)){var a="//"===r.substr(0,2);

!a||o&&_[o]||(r=r.substr(2),this.slashes=!0)}if(!_[o]&&(a||o&&!N[o])){for(var u=-1,c=0;c<E.length;c++){
var l=r.indexOf(E[c]);-1!==l&&(-1===u||u>l)&&(u=l)}var p,h;h=-1===u?r.lastIndexOf("@"):r.lastIndexOf("@",u),
-1!==h&&(p=r.slice(0,h),r=r.slice(h+1),this.auth=decodeURIComponent(p)),u=-1;for(var c=0;c<y.length;c++){
var l=r.indexOf(y[c]);-1!==l&&(-1===u||u>l)&&(u=l)}-1===u&&(u=r.length),this.host=r.slice(0,u),
r=r.slice(u),this.parseHost(),this.hostname=this.hostname||"";var g="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];

if(!g)for(var m=this.hostname.split(/\./),c=0,D=m.length;D>c;c++){var R=m[c];if(R&&!R.match(x)){
for(var O="",T=0,k=R.length;k>T;T++)O+=R.charCodeAt(T)>127?"x":R[T];if(!O.match(x)){
var S=m.slice(0,c),P=m.slice(c+1),I=R.match(w);I&&(S.push(I[1]),P.unshift(I[2])),
P.length&&(r="/"+P.join(".")+r),this.hostname=S.join(".");break}}}if(this.hostname=this.hostname.length>b?"":this.hostname.toLowerCase(),
!g){for(var A=this.hostname.split("."),j=[],c=0;c<A.length;++c){var L=A[c];j.push(L.match(/[^A-Za-z0-9_-]/)?"xn--"+f.encode(L):L);

}this.hostname=j.join(".")}var V=this.port?":"+this.port:"",U=this.hostname||"";this.host=U+V,
this.href+=this.host,g&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),
"/"!==r[0]&&(r="/"+r))}if(!C[i])for(var c=0,D=v.length;D>c;c++){var F=v[c],q=encodeURIComponent(F);

q===F&&(q=escape(F)),r=r.split(F).join(q)}var B=r.indexOf("#");-1!==B&&(this.hash=r.substr(B),
r=r.slice(0,B));var H=r.indexOf("?");if(-1!==H?(this.search=r.substr(H),this.query=r.substr(H+1),
t&&(this.query=M.parse(this.query)),r=r.slice(0,H)):t&&(this.search="",this.query={}),
r&&(this.pathname=r),N[i]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){
var V=this.pathname||"",L=this.search||"";this.path=V+L}return this.href=this.format(),
this},r.prototype.format=function(){var e=this.auth||"";e&&(e=encodeURIComponent(e),
e=e.replace(/%3A/i,":"),e+="@");var t=this.protocol||"",n=this.pathname||"",r=this.hash||"",o=!1,i="";

this.host?o=e+this.host:this.hostname&&(o=e+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),
this.port&&(o+=":"+this.port)),this.query&&c(this.query)&&Object.keys(this.query).length&&(i=M.stringify(this.query));

var a=this.search||i&&"?"+i||"";return t&&":"!==t.substr(-1)&&(t+=":"),this.slashes||(!t||N[t])&&o!==!1?(o="//"+(o||""),
n&&"/"!==n.charAt(0)&&(n="/"+n)):o||(o=""),r&&"#"!==r.charAt(0)&&(r="#"+r),a&&"?"!==a.charAt(0)&&(a="?"+a),
n=n.replace(/[?#]/g,function(e){return encodeURIComponent(e)}),a=a.replace("#","%23"),
t+o+n+a+r},r.prototype.resolve=function(e){return this.resolveObject(o(e,!1,!0)).format();

},r.prototype.resolveObject=function(e){if(s(e)){var t=new r;t.parse(e,!1,!0),e=t;

}var n=new r;if(Object.keys(this).forEach(function(e){n[e]=this[e]},this),n.hash=e.hash,
""===e.href)return n.href=n.format(),n;if(e.slashes&&!e.protocol)return Object.keys(e).forEach(function(t){
"protocol"!==t&&(n[t]=e[t])}),N[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),
n.href=n.format(),n;if(e.protocol&&e.protocol!==n.protocol){if(!N[e.protocol])return Object.keys(e).forEach(function(t){
n[t]=e[t]}),n.href=n.format(),n;if(n.protocol=e.protocol,e.host||_[e.protocol])n.pathname=e.pathname;
else{for(var o=(e.pathname||"").split("/");o.length&&!(e.host=o.shift()););e.host||(e.host=""),
e.hostname||(e.hostname=""),""!==o[0]&&o.unshift(""),o.length<2&&o.unshift(""),n.pathname=o.join("/");

}if(n.search=e.search,n.query=e.query,n.host=e.host||"",n.auth=e.auth,n.hostname=e.hostname||e.host,
n.port=e.port,n.pathname||n.search){var i=n.pathname||"",a=n.search||"";n.path=i+a;

}return n.slashes=n.slashes||e.slashes,n.href=n.format(),n}var u=n.pathname&&"/"===n.pathname.charAt(0),c=e.host||e.pathname&&"/"===e.pathname.charAt(0),f=c||u||n.host&&e.pathname,d=f,h=n.pathname&&n.pathname.split("/")||[],o=e.pathname&&e.pathname.split("/")||[],g=n.protocol&&!N[n.protocol];

if(g&&(n.hostname="",n.port=null,n.host&&(""===h[0]?h[0]=n.host:h.unshift(n.host)),
n.host="",e.protocol&&(e.hostname=null,e.port=null,e.host&&(""===o[0]?o[0]=e.host:o.unshift(e.host)),
e.host=null),f=f&&(""===o[0]||""===h[0])),c)n.host=e.host||""===e.host?e.host:n.host,
n.hostname=e.hostname||""===e.hostname?e.hostname:n.hostname,n.search=e.search,n.query=e.query,
h=o;else if(o.length)h||(h=[]),h.pop(),h=h.concat(o),n.search=e.search,n.query=e.query;
else if(!p(e.search)){if(g){n.hostname=n.host=h.shift();var m=n.host&&n.host.indexOf("@")>0?n.host.split("@"):!1;

m&&(n.auth=m.shift(),n.host=n.hostname=m.shift())}return n.search=e.search,n.query=e.query,
l(n.pathname)&&l(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),
n.href=n.format(),n}if(!h.length)return n.pathname=null,n.path=n.search?"/"+n.search:null,
n.href=n.format(),n;for(var v=h.slice(-1)[0],y=(n.host||e.host)&&("."===v||".."===v)||""===v,E=0,b=h.length;b>=0;b--)v=h[b],
"."==v?h.splice(b,1):".."===v?(h.splice(b,1),E++):E&&(h.splice(b,1),E--);if(!f&&!d)for(;E--;E)h.unshift("..");

!f||""===h[0]||h[0]&&"/"===h[0].charAt(0)||h.unshift(""),y&&"/"!==h.join("/").substr(-1)&&h.push("");

var x=""===h[0]||h[0]&&"/"===h[0].charAt(0);if(g){n.hostname=n.host=x?"":h.length?h.shift():"";

var m=n.host&&n.host.indexOf("@")>0?n.host.split("@"):!1;m&&(n.auth=m.shift(),n.host=n.hostname=m.shift());

}return f=f||n.host&&h.length,f&&!x&&h.unshift(""),h.length?n.pathname=h.join("/"):(n.pathname=null,
n.path=null),l(n.pathname)&&l(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),
n.auth=e.auth||n.auth,n.slashes=n.slashes||e.slashes,n.href=n.format(),n},r.prototype.parseHost=function(){
var e=this.host,t=h.exec(e);t&&(t=t[0],":"!==t&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),
e&&(this.hostname=e)}},{punycode:15,querystring:18}],20:[function(e,t,n){t.exports=function(e){
return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8;

}},{}],21:[function(e,t,n){(function(t,r){function o(e,t){var r={seen:[],stylize:a
};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),
g(t)?r.showHidden=t:t&&n._extend(r,t),x(r.showHidden)&&(r.showHidden=!1),x(r.depth)&&(r.depth=2),
x(r.colors)&&(r.colors=!1),x(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=i),
s(r,e,r.depth)}function i(e,t){var n=o.styles[t];return n?"["+o.colors[n][0]+"m"+e+"["+o.colors[n][1]+"m":e;

}function a(e,t){return e}function u(e){var t={};return e.forEach(function(e,n){t[e]=!0;

}),t}function s(e,t,r){if(e.customInspect&&t&&M(t.inspect)&&t.inspect!==n.inspect&&(!t.constructor||t.constructor.prototype!==t)){
var o=t.inspect(r,e);return E(o)||(o=s(e,o,r)),o}var i=c(e,t);if(i)return i;var a=Object.keys(t),g=u(a);

if(e.showHidden&&(a=Object.getOwnPropertyNames(t)),N(t)&&(a.indexOf("message")>=0||a.indexOf("description")>=0))return l(t);

if(0===a.length){if(M(t)){var m=t.name?": "+t.name:"";return e.stylize("[Function"+m+"]","special");

}if(w(t))return e.stylize(RegExp.prototype.toString.call(t),"regexp");if(_(t))return e.stylize(Date.prototype.toString.call(t),"date");

if(N(t))return l(t)}var v="",y=!1,b=["{","}"];if(h(t)&&(y=!0,b=["[","]"]),M(t)){var x=t.name?": "+t.name:"";

v=" [Function"+x+"]"}if(w(t)&&(v=" "+RegExp.prototype.toString.call(t)),_(t)&&(v=" "+Date.prototype.toUTCString.call(t)),
N(t)&&(v=" "+l(t)),0===a.length&&(!y||0==t.length))return b[0]+v+b[1];if(0>r)return w(t)?e.stylize(RegExp.prototype.toString.call(t),"regexp"):e.stylize("[Object]","special");

e.seen.push(t);var C;return C=y?p(e,t,r,g,a):a.map(function(n){return f(e,t,r,g,n,y);

}),e.seen.pop(),d(C,v,b)}function c(e,t){if(x(t))return e.stylize("undefined","undefined");

if(E(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";

return e.stylize(n,"string")}return y(t)?e.stylize(""+t,"number"):g(t)?e.stylize(""+t,"boolean"):m(t)?e.stylize("null","null"):void 0;

}function l(e){return"["+Error.prototype.toString.call(e)+"]"}function p(e,t,n,r,o){
for(var i=[],a=0,u=t.length;u>a;++a)i.push(k(t,String(a))?f(e,t,n,r,String(a),!0):"");

return o.forEach(function(o){o.match(/^\d+$/)||i.push(f(e,t,n,r,o,!0))}),i}function f(e,t,n,r,o,i){
var a,u,c;if(c=Object.getOwnPropertyDescriptor(t,o)||{value:t[o]},c.get?u=c.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):c.set&&(u=e.stylize("[Setter]","special")),
k(r,o)||(a="["+o+"]"),u||(e.seen.indexOf(c.value)<0?(u=m(n)?s(e,c.value,null):s(e,c.value,n-1),
u.indexOf("\n")>-1&&(u=i?u.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+u.split("\n").map(function(e){
return"   "+e}).join("\n"))):u=e.stylize("[Circular]","special")),x(a)){if(i&&o.match(/^\d+$/))return u;

a=JSON.stringify(""+o),a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(a=a.substr(1,a.length-2),
a=e.stylize(a,"name")):(a=a.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),
a=e.stylize(a,"string"))}return a+": "+u}function d(e,t,n){var r=0,o=e.reduce(function(e,t){
return r++,t.indexOf("\n")>=0&&r++,e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0);

return o>60?n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1]:n[0]+t+" "+e.join(", ")+" "+n[1];

}function h(e){return Array.isArray(e)}function g(e){return"boolean"==typeof e}function m(e){
return null===e}function v(e){return null==e}function y(e){return"number"==typeof e;

}function E(e){return"string"==typeof e}function b(e){return"symbol"==typeof e}function x(e){
return void 0===e}function w(e){return C(e)&&"[object RegExp]"===R(e)}function C(e){
return"object"==typeof e&&null!==e}function _(e){return C(e)&&"[object Date]"===R(e);

}function N(e){return C(e)&&("[object Error]"===R(e)||e instanceof Error)}function M(e){
return"function"==typeof e}function D(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e;

}function R(e){return Object.prototype.toString.call(e)}function O(e){return 10>e?"0"+e.toString(10):e.toString(10);

}function T(){var e=new Date,t=[O(e.getHours()),O(e.getMinutes()),O(e.getSeconds())].join(":");

return[e.getDate(),A[e.getMonth()],t].join(" ")}function k(e,t){return Object.prototype.hasOwnProperty.call(e,t);

}var S=/%[sdj%]/g;n.format=function(e){if(!E(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(o(arguments[n]));

return t.join(" ")}for(var n=1,r=arguments,i=r.length,a=String(e).replace(S,function(e){
if("%%"===e)return"%";if(n>=i)return e;switch(e){case"%s":return String(r[n++]);case"%d":
return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(t){return"[Circular]";

}default:return e}}),u=r[n];i>n;u=r[++n])a+=m(u)||!C(u)?" "+u:" "+o(u);return a},
n.deprecate=function(e,o){function i(){if(!a){if(t.throwDeprecation)throw new Error(o);

t.traceDeprecation?console.trace(o):console.error(o),a=!0}return e.apply(this,arguments);

}if(x(r.process))return function(){return n.deprecate(e,o).apply(this,arguments)};

if(t.noDeprecation===!0)return e;var a=!1;return i};var P,I={};n.debuglog=function(e){
if(x(P)&&(P=t.env.NODE_DEBUG||""),e=e.toUpperCase(),!I[e])if(new RegExp("\\b"+e+"\\b","i").test(P)){
var r=t.pid;I[e]=function(){var t=n.format.apply(n,arguments);console.error("%s %d: %s",e,r,t);

}}else I[e]=function(){};return I[e]},n.inspect=o,o.colors={bold:[1,22],italic:[3,23],
underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],
cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},o.styles={
special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",
string:"green",date:"magenta",regexp:"red"},n.isArray=h,n.isBoolean=g,n.isNull=m,
n.isNullOrUndefined=v,n.isNumber=y,n.isString=E,n.isSymbol=b,n.isUndefined=x,n.isRegExp=w,
n.isObject=C,n.isDate=_,n.isError=N,n.isFunction=M,n.isPrimitive=D,n.isBuffer=e("./support/isBuffer");

var A=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];n.log=function(){
console.log("%s - %s",T(),n.format.apply(n,arguments))},n.inherits=e("inherits"),
n._extend=function(e,t){if(!t||!C(t))return e;for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]];

return e}}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});

},{"./support/isBuffer":20,_process:14,inherits:13}],22:[function(e,t,n){!function(){
function e(e){return e&&(e.ownerDocument||e.document||e).documentElement}function n(e){
return e&&(e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView);

}function r(e,t){return t>e?-1:e>t?1:e>=t?0:0/0}function o(e){return null===e?0/0:+e;

}function i(e){return!isNaN(e)}function a(e){return{left:function(t,n,r,o){for(arguments.length<3&&(r=0),
arguments.length<4&&(o=t.length);o>r;){var i=r+o>>>1;e(t[i],n)<0?r=i+1:o=i}return r;

},right:function(t,n,r,o){for(arguments.length<3&&(r=0),arguments.length<4&&(o=t.length);o>r;){
var i=r+o>>>1;e(t[i],n)>0?o=i:r=i+1}return r}}}function u(e){return e.length}function s(e){
for(var t=1;e*t%1;)t*=10;return t}function c(e,t){for(var n in t)Object.defineProperty(e.prototype,n,{
value:t[n],enumerable:!1})}function l(){this._=Object.create(null)}function p(e){
return(e+="")===ma||e[0]===va?va+e:e}function f(e){return(e+="")[0]===va?e.slice(1):e;

}function d(e){return p(e)in this._}function h(e){return(e=p(e))in this._&&delete this._[e];

}function g(){var e=[];for(var t in this._)e.push(f(t));return e}function m(){var e=0;

for(var t in this._)++e;return e}function v(){for(var e in this._)return!1;return!0;

}function y(){this._=Object.create(null)}function E(e){return e}function b(e,t,n){
return function(){var r=n.apply(t,arguments);return r===t?e:r}}function x(e,t){if(t in e)return t;

t=t.charAt(0).toUpperCase()+t.slice(1);for(var n=0,r=ya.length;r>n;++n){var o=ya[n]+t;

if(o in e)return o}}function w(){}function C(){}function _(e){function t(){for(var t,r=n,o=-1,i=r.length;++o<i;)(t=r[o].on)&&t.apply(this,arguments);

return e}var n=[],r=new l;return t.on=function(t,o){var i,a=r.get(t);return arguments.length<2?a&&a.on:(a&&(a.on=null,
n=n.slice(0,i=n.indexOf(a)).concat(n.slice(i+1)),r.remove(t)),o&&n.push(r.set(t,{
on:o})),e)},t}function N(){ra.event.preventDefault()}function M(){for(var e,t=ra.event;e=t.sourceEvent;)t=e;

return t}function D(e){for(var t=new C,n=0,r=arguments.length;++n<r;)t[arguments[n]]=_(t);

return t.of=function(n,r){return function(o){try{var i=o.sourceEvent=ra.event;o.target=e,
ra.event=o,t[o.type].apply(n,r)}finally{ra.event=i}}},t}function R(e){return ba(e,_a),
e}function O(e){return"function"==typeof e?e:function(){return xa(e,this)}}function T(e){
return"function"==typeof e?e:function(){return wa(e,this)}}function k(e,t){function n(){
this.removeAttribute(e)}function r(){this.removeAttributeNS(e.space,e.local)}function o(){
this.setAttribute(e,t)}function i(){this.setAttributeNS(e.space,e.local,t)}function a(){
var n=t.apply(this,arguments);null==n?this.removeAttribute(e):this.setAttribute(e,n);

}function u(){var n=t.apply(this,arguments);null==n?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n);

}return e=ra.ns.qualify(e),null==t?e.local?r:n:"function"==typeof t?e.local?u:a:e.local?i:o;

}function S(e){return e.trim().replace(/\s+/g," ")}function P(e){return new RegExp("(?:^|\\s+)"+ra.requote(e)+"(?:\\s+|$)","g");

}function I(e){return(e+"").trim().split(/^|\s+/)}function A(e,t){function n(){for(var n=-1;++n<o;)e[n](this,t);

}function r(){for(var n=-1,r=t.apply(this,arguments);++n<o;)e[n](this,r)}e=I(e).map(j);

var o=e.length;return"function"==typeof t?r:n}function j(e){var t=P(e);return function(n,r){
if(o=n.classList)return r?o.add(e):o.remove(e);var o=n.getAttribute("class")||"";
r?(t.lastIndex=0,t.test(o)||n.setAttribute("class",S(o+" "+e))):n.setAttribute("class",S(o.replace(t," ")));

}}function L(e,t,n){function r(){this.style.removeProperty(e)}function o(){this.style.setProperty(e,t,n);

}function i(){var r=t.apply(this,arguments);null==r?this.style.removeProperty(e):this.style.setProperty(e,r,n);

}return null==t?r:"function"==typeof t?i:o}function V(e,t){function n(){delete this[e];

}function r(){this[e]=t}function o(){var n=t.apply(this,arguments);null==n?delete this[e]:this[e]=n;

}return null==t?n:"function"==typeof t?o:r}function U(e){function t(){var t=this.ownerDocument,n=this.namespaceURI;

return n?t.createElementNS(n,e):t.createElement(e)}function n(){return this.ownerDocument.createElementNS(e.space,e.local);

}return"function"==typeof e?e:(e=ra.ns.qualify(e)).local?n:t}function F(){var e=this.parentNode;

e&&e.removeChild(this)}function q(e){return{__data__:e}}function B(e){return function(){
return Ca(this,e)}}function H(e){return arguments.length||(e=r),function(t,n){return t&&n?e(t.__data__,n.__data__):!t-!n;

}}function z(e,t){for(var n=0,r=e.length;r>n;n++)for(var o,i=e[n],a=0,u=i.length;u>a;a++)(o=i[a])&&t(o,a,n);

return e}function W(e){return ba(e,Ma),e}function Y(e){var t,n;return function(r,o,i){
var a,u=e[i].update,s=u.length;for(i!=n&&(n=i,t=0),o>=t&&(t=o+1);!(a=u[t])&&++t<s;);
return a}}function K(e,t,n){function r(){var t=this[a];t&&(this.removeEventListener(e,t,t.$),
delete this[a])}function o(){var o=s(t,ia(arguments));r.call(this),this.addEventListener(e,this[a]=o,o.$=n),
o._=t}function i(){var t,n=new RegExp("^__on([^.]+)"+ra.requote(e)+"$");for(var r in this)if(t=r.match(n)){
var o=this[r];this.removeEventListener(t[1],o,o.$),delete this[r]}}var a="__on"+e,u=e.indexOf("."),s=$;

u>0&&(e=e.slice(0,u));var c=Da.get(e);return c&&(e=c,s=X),u?t?o:r:t?w:i}function $(e,t){
return function(n){var r=ra.event;ra.event=n,t[0]=this.__data__;try{e.apply(this,t);

}finally{ra.event=r}}}function X(e,t){var n=$(e,t);return function(e){var t=this,r=e.relatedTarget;

r&&(r===t||8&r.compareDocumentPosition(t))||n.call(t,e)}}function G(t){var r=".dragsuppress-"+ ++Oa,o="click"+r,i=ra.select(n(t)).on("touchmove"+r,N).on("dragstart"+r,N).on("selectstart"+r,N);

if(null==Ra&&(Ra="onselectstart"in t?!1:x(t.style,"userSelect")),Ra){var a=e(t).style,u=a[Ra];

a[Ra]="none"}return function(e){if(i.on(r,null),Ra&&(a[Ra]=u),e){var t=function(){
i.on(o,null)};i.on(o,function(){N(),t()},!0),setTimeout(t,0)}}}function Q(e,t){t.changedTouches&&(t=t.changedTouches[0]);

var r=e.ownerSVGElement||e;if(r.createSVGPoint){var o=r.createSVGPoint();if(0>Ta){
var i=n(e);if(i.scrollX||i.scrollY){r=ra.select("body").append("svg").style({position:"absolute",
top:0,left:0,margin:0,padding:0,border:"none"},"important");var a=r[0][0].getScreenCTM();

Ta=!(a.f||a.e),r.remove()}}return Ta?(o.x=t.pageX,o.y=t.pageY):(o.x=t.clientX,o.y=t.clientY),
o=o.matrixTransform(e.getScreenCTM().inverse()),[o.x,o.y]}var u=e.getBoundingClientRect();

return[t.clientX-u.left-e.clientLeft,t.clientY-u.top-e.clientTop]}function Z(){return ra.event.changedTouches[0].identifier;

}function J(e){return e>0?1:0>e?-1:0}function ee(e,t,n){return(t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0]);

}function te(e){return e>1?0:-1>e?Pa:Math.acos(e)}function ne(e){return e>1?ja:-1>e?-ja:Math.asin(e);

}function re(e){return((e=Math.exp(e))-1/e)/2}function oe(e){return((e=Math.exp(e))+1/e)/2;

}function ie(e){return((e=Math.exp(2*e))-1)/(e+1)}function ae(e){return(e=Math.sin(e/2))*e;

}function ue(){}function se(e,t,n){return this instanceof se?(this.h=+e,this.s=+t,
void(this.l=+n)):arguments.length<2?e instanceof se?new se(e.h,e.s,e.l):we(""+e,Ce,se):new se(e,t,n);

}function ce(e,t,n){function r(e){return e>360?e-=360:0>e&&(e+=360),60>e?i+(a-i)*e/60:180>e?a:240>e?i+(a-i)*(240-e)/60:i;

}function o(e){return Math.round(255*r(e))}var i,a;return e=isNaN(e)?0:(e%=360)<0?e+360:e,
t=isNaN(t)?0:0>t?0:t>1?1:t,n=0>n?0:n>1?1:n,a=.5>=n?n*(1+t):n+t-n*t,i=2*n-a,new ye(o(e+120),o(e),o(e-120));

}function le(e,t,n){return this instanceof le?(this.h=+e,this.c=+t,void(this.l=+n)):arguments.length<2?e instanceof le?new le(e.h,e.c,e.l):e instanceof fe?he(e.l,e.a,e.b):he((e=_e((e=ra.rgb(e)).r,e.g,e.b)).l,e.a,e.b):new le(e,t,n);

}function pe(e,t,n){return isNaN(e)&&(e=0),isNaN(t)&&(t=0),new fe(n,Math.cos(e*=La)*t,Math.sin(e)*t);

}function fe(e,t,n){return this instanceof fe?(this.l=+e,this.a=+t,void(this.b=+n)):arguments.length<2?e instanceof fe?new fe(e.l,e.a,e.b):e instanceof le?pe(e.h,e.c,e.l):_e((e=ye(e)).r,e.g,e.b):new fe(e,t,n);

}function de(e,t,n){var r=(e+16)/116,o=r+t/500,i=r-n/200;return o=ge(o)*$a,r=ge(r)*Xa,
i=ge(i)*Ga,new ye(ve(3.2404542*o-1.5371385*r-.4985314*i),ve(-.969266*o+1.8760108*r+.041556*i),ve(.0556434*o-.2040259*r+1.0572252*i));

}function he(e,t,n){return e>0?new le(Math.atan2(n,t)*Va,Math.sqrt(t*t+n*n),e):new le(0/0,0/0,e);

}function ge(e){return e>.206893034?e*e*e:(e-4/29)/7.787037}function me(e){return e>.008856?Math.pow(e,1/3):7.787037*e+4/29;

}function ve(e){return Math.round(255*(.00304>=e?12.92*e:1.055*Math.pow(e,1/2.4)-.055));

}function ye(e,t,n){return this instanceof ye?(this.r=~~e,this.g=~~t,void(this.b=~~n)):arguments.length<2?e instanceof ye?new ye(e.r,e.g,e.b):we(""+e,ye,ce):new ye(e,t,n);

}function Ee(e){return new ye(e>>16,e>>8&255,255&e)}function be(e){return Ee(e)+"";

}function xe(e){return 16>e?"0"+Math.max(0,e).toString(16):Math.min(255,e).toString(16);

}function we(e,t,n){e=e.toLowerCase();var r,o,i,a=0,u=0,s=0;if(r=/([a-z]+)\((.*)\)/.exec(e))switch(o=r[2].split(","),
r[1]){case"hsl":return n(parseFloat(o[0]),parseFloat(o[1])/100,parseFloat(o[2])/100);

case"rgb":return t(Me(o[0]),Me(o[1]),Me(o[2]))}return(i=Ja.get(e))?t(i.r,i.g,i.b):(null==e||"#"!==e.charAt(0)||isNaN(i=parseInt(e.slice(1),16))||(4===e.length?(a=(3840&i)>>4,
a=a>>4|a,u=240&i,u=u>>4|u,s=15&i,s=s<<4|s):7===e.length&&(a=(16711680&i)>>16,u=(65280&i)>>8,
s=255&i)),t(a,u,s))}function Ce(e,t,n){var r,o,i=Math.min(e/=255,t/=255,n/=255),a=Math.max(e,t,n),u=a-i,s=(a+i)/2;

return u?(o=.5>s?u/(a+i):u/(2-a-i),r=e==a?(t-n)/u+(n>t?6:0):t==a?(n-e)/u+2:(e-t)/u+4,
r*=60):(r=0/0,o=s>0&&1>s?0:r),new se(r,o,s)}function _e(e,t,n){e=Ne(e),t=Ne(t),n=Ne(n);

var r=me((.4124564*e+.3575761*t+.1804375*n)/$a),o=me((.2126729*e+.7151522*t+.072175*n)/Xa),i=me((.0193339*e+.119192*t+.9503041*n)/Ga);

return fe(116*o-16,500*(r-o),200*(o-i))}function Ne(e){return(e/=255)<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);

}function Me(e){var t=parseFloat(e);return"%"===e.charAt(e.length-1)?Math.round(2.55*t):t;

}function De(e){return"function"==typeof e?e:function(){return e}}function Re(e){
return function(t,n,r){return 2===arguments.length&&"function"==typeof n&&(r=n,n=null),
Oe(t,n,e,r)}}function Oe(e,t,n,r){function o(){var e,t=s.status;if(!t&&ke(s)||t>=200&&300>t||304===t){
try{e=n.call(i,s)}catch(r){return void a.error.call(i,r)}a.load.call(i,e)}else a.error.call(i,s);

}var i={},a=ra.dispatch("beforesend","progress","load","error"),u={},s=new XMLHttpRequest,c=null;

return!this.XDomainRequest||"withCredentials"in s||!/^(http(s)?:)?\/\//.test(e)||(s=new XDomainRequest),
"onload"in s?s.onload=s.onerror=o:s.onreadystatechange=function(){s.readyState>3&&o();

},s.onprogress=function(e){var t=ra.event;ra.event=e;try{a.progress.call(i,s)}finally{
ra.event=t}},i.header=function(e,t){return e=(e+"").toLowerCase(),arguments.length<2?u[e]:(null==t?delete u[e]:u[e]=t+"",
i)},i.mimeType=function(e){return arguments.length?(t=null==e?null:e+"",i):t},i.responseType=function(e){
return arguments.length?(c=e,i):c},i.response=function(e){return n=e,i},["get","post"].forEach(function(e){
i[e]=function(){return i.send.apply(i,[e].concat(ia(arguments)))}}),i.send=function(n,r,o){
if(2===arguments.length&&"function"==typeof r&&(o=r,r=null),s.open(n,e,!0),null==t||"accept"in u||(u.accept=t+",*/*"),
s.setRequestHeader)for(var l in u)s.setRequestHeader(l,u[l]);return null!=t&&s.overrideMimeType&&s.overrideMimeType(t),
null!=c&&(s.responseType=c),null!=o&&i.on("error",o).on("load",function(e){o(null,e);

}),a.beforesend.call(i,s),s.send(null==r?null:r),i},i.abort=function(){return s.abort(),
i},ra.rebind(i,a,"on"),null==r?i:i.get(Te(r))}function Te(e){return 1===e.length?function(t,n){
e(null==t?n:null)}:e}function ke(e){var t=e.responseType;return t&&"text"!==t?e.response:e.responseText;

}function Se(){var e=Pe(),t=Ie()-e;t>24?(isFinite(t)&&(clearTimeout(ru),ru=setTimeout(Se,t)),
nu=0):(nu=1,iu(Se))}function Pe(){var e=Date.now();for(ou=eu;ou;)e>=ou.t&&(ou.f=ou.c(e-ou.t)),
ou=ou.n;return e}function Ie(){for(var e,t=eu,n=1/0;t;)t.f?t=e?e.n=t.n:eu=t.n:(t.t<n&&(n=t.t),
t=(e=t).n);return tu=e,n}function Ae(e,t){return t-(e?Math.ceil(Math.log(e)/Math.LN10):1);

}function je(e,t){var n=Math.pow(10,3*ga(8-t));return{scale:t>8?function(e){return e/n;

}:function(e){return e*n},symbol:e}}function Le(e){var t=e.decimal,n=e.thousands,r=e.grouping,o=e.currency,i=r&&n?function(e,t){
for(var o=e.length,i=[],a=0,u=r[0],s=0;o>0&&u>0&&(s+u+1>t&&(u=Math.max(1,t-s)),i.push(e.substring(o-=u,o+u)),
!((s+=u+1)>t));)u=r[a=(a+1)%r.length];return i.reverse().join(n)}:E;return function(e){
var n=uu.exec(e),r=n[1]||" ",a=n[2]||">",u=n[3]||"-",s=n[4]||"",c=n[5],l=+n[6],p=n[7],f=n[8],d=n[9],h=1,g="",m="",v=!1,y=!0;

switch(f&&(f=+f.substring(1)),(c||"0"===r&&"="===a)&&(c=r="0",a="="),d){case"n":p=!0,
d="g";break;case"%":h=100,m="%",d="f";break;case"p":h=100,m="%",d="r";break;case"b":
case"o":case"x":case"X":"#"===s&&(g="0"+d.toLowerCase());case"c":y=!1;case"d":v=!0,
f=0;break;case"s":h=-1,d="r"}"$"===s&&(g=o[0],m=o[1]),"r"!=d||f||(d="g"),null!=f&&("g"==d?f=Math.max(1,Math.min(21,f)):("e"==d||"f"==d)&&(f=Math.max(0,Math.min(20,f)))),
d=su.get(d)||Ve;var E=c&&p;return function(e){var n=m;if(v&&e%1)return"";var o=0>e||0===e&&0>1/e?(e=-e,
"-"):"-"===u?"":u;if(0>h){var s=ra.formatPrefix(e,f);e=s.scale(e),n=s.symbol+m}else e*=h;

e=d(e,f);var b,x,w=e.lastIndexOf(".");if(0>w){var C=y?e.lastIndexOf("e"):-1;0>C?(b=e,
x=""):(b=e.substring(0,C),x=e.substring(C))}else b=e.substring(0,w),x=t+e.substring(w+1);

!c&&p&&(b=i(b,1/0));var _=g.length+b.length+x.length+(E?0:o.length),N=l>_?new Array(_=l-_+1).join(r):"";

return E&&(b=i(N+b,N.length?l-x.length:1/0)),o+=g,e=b+x,("<"===a?o+e+N:">"===a?N+o+e:"^"===a?N.substring(0,_>>=1)+o+e+N.substring(_):o+(E?e:N+e))+n;

}}}function Ve(e){return e+""}function Ue(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0]);

}function Fe(e,t,n){function r(t){var n=e(t),r=i(n,1);return r-t>t-n?n:r}function o(n){
return t(n=e(new lu(n-1)),1),n}function i(e,n){return t(e=new lu(+e),n),e}function a(e,r,i){
var a=o(e),u=[];if(i>1)for(;r>a;)n(a)%i||u.push(new Date(+a)),t(a,1);else for(;r>a;)u.push(new Date(+a)),
t(a,1);return u}function u(e,t,n){try{lu=Ue;var r=new Ue;return r._=e,a(r,t,n)}finally{
lu=Date}}e.floor=e,e.round=r,e.ceil=o,e.offset=i,e.range=a;var s=e.utc=qe(e);return s.floor=s,
s.round=qe(r),s.ceil=qe(o),s.offset=qe(i),s.range=u,e}function qe(e){return function(t,n){
try{lu=Ue;var r=new Ue;return r._=t,e(r,n)._}finally{lu=Date}}}function Be(e){function t(e){
function t(t){for(var n,o,i,a=[],u=-1,s=0;++u<r;)37===e.charCodeAt(u)&&(a.push(e.slice(s,u)),
null!=(o=fu[n=e.charAt(++u)])&&(n=e.charAt(++u)),(i=R[n])&&(n=i(t,null==o?"e"===n?" ":"0":o)),
a.push(n),s=u+1);return a.push(e.slice(s,u)),a.join("")}var r=e.length;return t.parse=function(t){
var r={y:1900,m:0,d:1,H:0,M:0,S:0,L:0,Z:null},o=n(r,e,t,0);if(o!=t.length)return null;

"p"in r&&(r.H=r.H%12+12*r.p);var i=null!=r.Z&&lu!==Ue,a=new(i?Ue:lu);return"j"in r?a.setFullYear(r.y,0,r.j):"w"in r&&("W"in r||"U"in r)?(a.setFullYear(r.y,0,1),
a.setFullYear(r.y,0,"W"in r?(r.w+6)%7+7*r.W-(a.getDay()+5)%7:r.w+7*r.U-(a.getDay()+6)%7)):a.setFullYear(r.y,r.m,r.d),
a.setHours(r.H+(r.Z/100|0),r.M+r.Z%100,r.S,r.L),i?a._:a},t.toString=function(){return e;

},t}function n(e,t,n,r){for(var o,i,a,u=0,s=t.length,c=n.length;s>u;){if(r>=c)return-1;

if(o=t.charCodeAt(u++),37===o){if(a=t.charAt(u++),i=O[a in fu?t.charAt(u++):a],!i||(r=i(e,n,r))<0)return-1;

}else if(o!=n.charCodeAt(r++))return-1}return r}function r(e,t,n){w.lastIndex=0;var r=w.exec(t.slice(n));

return r?(e.w=C.get(r[0].toLowerCase()),n+r[0].length):-1}function o(e,t,n){b.lastIndex=0;

var r=b.exec(t.slice(n));return r?(e.w=x.get(r[0].toLowerCase()),n+r[0].length):-1;

}function i(e,t,n){M.lastIndex=0;var r=M.exec(t.slice(n));return r?(e.m=D.get(r[0].toLowerCase()),
n+r[0].length):-1}function a(e,t,n){_.lastIndex=0;var r=_.exec(t.slice(n));return r?(e.m=N.get(r[0].toLowerCase()),
n+r[0].length):-1}function u(e,t,r){return n(e,R.c.toString(),t,r)}function s(e,t,r){
return n(e,R.x.toString(),t,r)}function c(e,t,r){return n(e,R.X.toString(),t,r)}function l(e,t,n){
var r=E.get(t.slice(n,n+=2).toLowerCase());return null==r?-1:(e.p=r,n)}var p=e.dateTime,f=e.date,d=e.time,h=e.periods,g=e.days,m=e.shortDays,v=e.months,y=e.shortMonths;

t.utc=function(e){function n(e){try{lu=Ue;var t=new lu;return t._=e,r(t)}finally{
lu=Date}}var r=t(e);return n.parse=function(e){try{lu=Ue;var t=r.parse(e);return t&&t._;

}finally{lu=Date}},n.toString=r.toString,n},t.multi=t.utc.multi=st;var E=ra.map(),b=ze(g),x=We(g),w=ze(m),C=We(m),_=ze(v),N=We(v),M=ze(y),D=We(y);

h.forEach(function(e,t){E.set(e.toLowerCase(),t)});var R={a:function(e){return m[e.getDay()];

},A:function(e){return g[e.getDay()]},b:function(e){return y[e.getMonth()]},B:function(e){
return v[e.getMonth()]},c:t(p),d:function(e,t){return He(e.getDate(),t,2)},e:function(e,t){
return He(e.getDate(),t,2)},H:function(e,t){return He(e.getHours(),t,2)},I:function(e,t){
return He(e.getHours()%12||12,t,2)},j:function(e,t){return He(1+cu.dayOfYear(e),t,3);

},L:function(e,t){return He(e.getMilliseconds(),t,3)},m:function(e,t){return He(e.getMonth()+1,t,2);

},M:function(e,t){return He(e.getMinutes(),t,2)},p:function(e){return h[+(e.getHours()>=12)];

},S:function(e,t){return He(e.getSeconds(),t,2)},U:function(e,t){return He(cu.sundayOfYear(e),t,2);

},w:function(e){return e.getDay()},W:function(e,t){return He(cu.mondayOfYear(e),t,2);

},x:t(f),X:t(d),y:function(e,t){return He(e.getFullYear()%100,t,2)},Y:function(e,t){
return He(e.getFullYear()%1e4,t,4)},Z:at,"%":function(){return"%"}},O={a:r,A:o,b:i,
B:a,c:u,d:et,e:et,H:nt,I:nt,j:tt,L:it,m:Je,M:rt,p:l,S:ot,U:Ke,w:Ye,W:$e,x:s,X:c,y:Ge,
Y:Xe,Z:Qe,"%":ut};return t}function He(e,t,n){var r=0>e?"-":"",o=(r?-e:e)+"",i=o.length;

return r+(n>i?new Array(n-i+1).join(t)+o:o)}function ze(e){return new RegExp("^(?:"+e.map(ra.requote).join("|")+")","i");

}function We(e){for(var t=new l,n=-1,r=e.length;++n<r;)t.set(e[n].toLowerCase(),n);

return t}function Ye(e,t,n){du.lastIndex=0;var r=du.exec(t.slice(n,n+1));return r?(e.w=+r[0],
n+r[0].length):-1}function Ke(e,t,n){du.lastIndex=0;var r=du.exec(t.slice(n));return r?(e.U=+r[0],
n+r[0].length):-1}function $e(e,t,n){du.lastIndex=0;var r=du.exec(t.slice(n));return r?(e.W=+r[0],
n+r[0].length):-1}function Xe(e,t,n){du.lastIndex=0;var r=du.exec(t.slice(n,n+4));

return r?(e.y=+r[0],n+r[0].length):-1}function Ge(e,t,n){du.lastIndex=0;var r=du.exec(t.slice(n,n+2));

return r?(e.y=Ze(+r[0]),n+r[0].length):-1}function Qe(e,t,n){return/^[+-]\d{4}$/.test(t=t.slice(n,n+5))?(e.Z=-t,
n+5):-1}function Ze(e){return e+(e>68?1900:2e3)}function Je(e,t,n){du.lastIndex=0;

var r=du.exec(t.slice(n,n+2));return r?(e.m=r[0]-1,n+r[0].length):-1}function et(e,t,n){
du.lastIndex=0;var r=du.exec(t.slice(n,n+2));return r?(e.d=+r[0],n+r[0].length):-1;

}function tt(e,t,n){du.lastIndex=0;var r=du.exec(t.slice(n,n+3));return r?(e.j=+r[0],
n+r[0].length):-1}function nt(e,t,n){du.lastIndex=0;var r=du.exec(t.slice(n,n+2));

return r?(e.H=+r[0],n+r[0].length):-1}function rt(e,t,n){du.lastIndex=0;var r=du.exec(t.slice(n,n+2));

return r?(e.M=+r[0],n+r[0].length):-1}function ot(e,t,n){du.lastIndex=0;var r=du.exec(t.slice(n,n+2));

return r?(e.S=+r[0],n+r[0].length):-1}function it(e,t,n){du.lastIndex=0;var r=du.exec(t.slice(n,n+3));

return r?(e.L=+r[0],n+r[0].length):-1}function at(e){var t=e.getTimezoneOffset(),n=t>0?"-":"+",r=ga(t)/60|0,o=ga(t)%60;

return n+He(r,"0",2)+He(o,"0",2)}function ut(e,t,n){hu.lastIndex=0;var r=hu.exec(t.slice(n,n+1));

return r?n+r[0].length:-1}function st(e){for(var t=e.length,n=-1;++n<t;)e[n][0]=this(e[n][0]);

return function(t){for(var n=0,r=e[n];!r[1](t);)r=e[++n];return r[0](t)}}function ct(){}
function lt(e,t,n){var r=n.s=e+t,o=r-e,i=r-o;n.t=e-i+(t-o)}function pt(e,t){e&&yu.hasOwnProperty(e.type)&&yu[e.type](e,t);

}function ft(e,t,n){var r,o=-1,i=e.length-n;for(t.lineStart();++o<i;)r=e[o],t.point(r[0],r[1],r[2]);

t.lineEnd()}function dt(e,t){var n=-1,r=e.length;for(t.polygonStart();++n<r;)ft(e[n],t,1);

t.polygonEnd()}function ht(){function e(e,t){e*=La,t=t*La/2+Pa/4;var n=e-r,a=n>=0?1:-1,u=a*n,s=Math.cos(t),c=Math.sin(t),l=i*c,p=o*s+l*Math.cos(u),f=l*a*Math.sin(u);

bu.add(Math.atan2(f,p)),r=e,o=s,i=c}var t,n,r,o,i;xu.point=function(a,u){xu.point=e,
r=(t=a)*La,o=Math.cos(u=(n=u)*La/2+Pa/4),i=Math.sin(u)},xu.lineEnd=function(){e(t,n);

}}function gt(e){var t=e[0],n=e[1],r=Math.cos(n);return[r*Math.cos(t),r*Math.sin(t),Math.sin(n)];

}function mt(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function vt(e,t){return[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]];

}function yt(e,t){e[0]+=t[0],e[1]+=t[1],e[2]+=t[2]}function Et(e,t){return[e[0]*t,e[1]*t,e[2]*t];

}function bt(e){var t=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]/=t,e[1]/=t,e[2]/=t;

}function xt(e){return[Math.atan2(e[1],e[0]),ne(e[2])]}function wt(e,t){return ga(e[0]-t[0])<ka&&ga(e[1]-t[1])<ka;

}function Ct(e,t){e*=La;var n=Math.cos(t*=La);_t(n*Math.cos(e),n*Math.sin(e),Math.sin(t));

}function _t(e,t,n){++wu,_u+=(e-_u)/wu,Nu+=(t-Nu)/wu,Mu+=(n-Mu)/wu}function Nt(){
function e(e,o){e*=La;var i=Math.cos(o*=La),a=i*Math.cos(e),u=i*Math.sin(e),s=Math.sin(o),c=Math.atan2(Math.sqrt((c=n*s-r*u)*c+(c=r*a-t*s)*c+(c=t*u-n*a)*c),t*a+n*u+r*s);

Cu+=c,Du+=c*(t+(t=a)),Ru+=c*(n+(n=u)),Ou+=c*(r+(r=s)),_t(t,n,r)}var t,n,r;Pu.point=function(o,i){
o*=La;var a=Math.cos(i*=La);t=a*Math.cos(o),n=a*Math.sin(o),r=Math.sin(i),Pu.point=e,
_t(t,n,r)}}function Mt(){Pu.point=Ct}function Dt(){function e(e,t){e*=La;var n=Math.cos(t*=La),a=n*Math.cos(e),u=n*Math.sin(e),s=Math.sin(t),c=o*s-i*u,l=i*a-r*s,p=r*u-o*a,f=Math.sqrt(c*c+l*l+p*p),d=r*a+o*u+i*s,h=f&&-te(d)/f,g=Math.atan2(f,d);

Tu+=h*c,ku+=h*l,Su+=h*p,Cu+=g,Du+=g*(r+(r=a)),Ru+=g*(o+(o=u)),Ou+=g*(i+(i=s)),_t(r,o,i);

}var t,n,r,o,i;Pu.point=function(a,u){t=a,n=u,Pu.point=e,a*=La;var s=Math.cos(u*=La);

r=s*Math.cos(a),o=s*Math.sin(a),i=Math.sin(u),_t(r,o,i)},Pu.lineEnd=function(){e(t,n),
Pu.lineEnd=Mt,Pu.point=Ct}}function Rt(e,t){function n(n,r){return n=e(n,r),t(n[0],n[1]);

}return e.invert&&t.invert&&(n.invert=function(n,r){return n=t.invert(n,r),n&&e.invert(n[0],n[1]);

}),n}function Ot(){return!0}function Tt(e,t,n,r,o){var i=[],a=[];if(e.forEach(function(e){
if(!((t=e.length-1)<=0)){var t,n=e[0],r=e[t];if(wt(n,r)){o.lineStart();for(var u=0;t>u;++u)o.point((n=e[u])[0],n[1]);

return void o.lineEnd()}var s=new St(n,e,null,!0),c=new St(n,null,s,!1);s.o=c,i.push(s),
a.push(c),s=new St(r,e,null,!1),c=new St(r,null,s,!0),s.o=c,i.push(s),a.push(c)}}),
a.sort(t),kt(i),kt(a),i.length){for(var u=0,s=n,c=a.length;c>u;++u)a[u].e=s=!s;for(var l,p,f=i[0];;){
for(var d=f,h=!0;d.v;)if((d=d.n)===f)return;l=d.z,o.lineStart();do{if(d.v=d.o.v=!0,
d.e){if(h)for(var u=0,c=l.length;c>u;++u)o.point((p=l[u])[0],p[1]);else r(d.x,d.n.x,1,o);

d=d.n}else{if(h){l=d.p.z;for(var u=l.length-1;u>=0;--u)o.point((p=l[u])[0],p[1])}else r(d.x,d.p.x,-1,o);

d=d.p}d=d.o,l=d.z,h=!h}while(!d.v);o.lineEnd()}}}function kt(e){if(t=e.length){for(var t,n,r=0,o=e[0];++r<t;)o.n=n=e[r],
n.p=o,o=n;o.n=n=e[0],n.p=o}}function St(e,t,n,r){this.x=e,this.z=t,this.o=n,this.e=r,
this.v=!1,this.n=this.p=null}function Pt(e,t,n,r){return function(o,i){function a(t,n){
var r=o(t,n);e(t=r[0],n=r[1])&&i.point(t,n)}function u(e,t){var n=o(e,t);m.point(n[0],n[1]);

}function s(){y.point=u,m.lineStart()}function c(){y.point=a,m.lineEnd()}function l(e,t){
g.push([e,t]);var n=o(e,t);b.point(n[0],n[1])}function p(){b.lineStart(),g=[]}function f(){
l(g[0][0],g[0][1]),b.lineEnd();var e,t=b.clean(),n=E.buffer(),r=n.length;if(g.pop(),
h.push(g),g=null,r)if(1&t){e=n[0];var o,r=e.length-1,a=-1;if(r>0){for(x||(i.polygonStart(),
x=!0),i.lineStart();++a<r;)i.point((o=e[a])[0],o[1]);i.lineEnd()}}else r>1&&2&t&&n.push(n.pop().concat(n.shift())),
d.push(n.filter(It))}var d,h,g,m=t(i),v=o.invert(r[0],r[1]),y={point:a,lineStart:s,
lineEnd:c,polygonStart:function(){y.point=l,y.lineStart=p,y.lineEnd=f,d=[],h=[]},
polygonEnd:function(){y.point=a,y.lineStart=s,y.lineEnd=c,d=ra.merge(d);var e=Ft(v,h);

d.length?(x||(i.polygonStart(),x=!0),Tt(d,jt,e,n,i)):e&&(x||(i.polygonStart(),x=!0),
i.lineStart(),n(null,null,1,i),i.lineEnd()),x&&(i.polygonEnd(),x=!1),d=h=null},sphere:function(){
i.polygonStart(),i.lineStart(),n(null,null,1,i),i.lineEnd(),i.polygonEnd()}},E=At(),b=t(E),x=!1;

return y}}function It(e){return e.length>1}function At(){var e,t=[];return{lineStart:function(){
t.push(e=[])},point:function(t,n){e.push([t,n])},lineEnd:w,buffer:function(){var n=t;

return t=[],e=null,n},rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()));

}}}function jt(e,t){return((e=e.x)[0]<0?e[1]-ja-ka:ja-e[1])-((t=t.x)[0]<0?t[1]-ja-ka:ja-t[1]);

}function Lt(e){var t,n=0/0,r=0/0,o=0/0;return{lineStart:function(){e.lineStart(),
t=1},point:function(i,a){var u=i>0?Pa:-Pa,s=ga(i-n);ga(s-Pa)<ka?(e.point(n,r=(r+a)/2>0?ja:-ja),
e.point(o,r),e.lineEnd(),e.lineStart(),e.point(u,r),e.point(i,r),t=0):o!==u&&s>=Pa&&(ga(n-o)<ka&&(n-=o*ka),
ga(i-u)<ka&&(i-=u*ka),r=Vt(n,r,i,a),e.point(o,r),e.lineEnd(),e.lineStart(),e.point(u,r),
t=0),e.point(n=i,r=a),o=u},lineEnd:function(){e.lineEnd(),n=r=0/0},clean:function(){
return 2-t}}}function Vt(e,t,n,r){var o,i,a=Math.sin(e-n);return ga(a)>ka?Math.atan((Math.sin(t)*(i=Math.cos(r))*Math.sin(n)-Math.sin(r)*(o=Math.cos(t))*Math.sin(e))/(o*i*a)):(t+r)/2;

}function Ut(e,t,n,r){var o;if(null==e)o=n*ja,r.point(-Pa,o),r.point(0,o),r.point(Pa,o),
r.point(Pa,0),r.point(Pa,-o),r.point(0,-o),r.point(-Pa,-o),r.point(-Pa,0),r.point(-Pa,o);
else if(ga(e[0]-t[0])>ka){var i=e[0]<t[0]?Pa:-Pa;o=n*i/2,r.point(-i,o),r.point(0,o),
r.point(i,o)}else r.point(t[0],t[1])}function Ft(e,t){var n=e[0],r=e[1],o=[Math.sin(n),-Math.cos(n),0],i=0,a=0;

bu.reset();for(var u=0,s=t.length;s>u;++u){var c=t[u],l=c.length;if(l)for(var p=c[0],f=p[0],d=p[1]/2+Pa/4,h=Math.sin(d),g=Math.cos(d),m=1;;){
m===l&&(m=0),e=c[m];var v=e[0],y=e[1]/2+Pa/4,E=Math.sin(y),b=Math.cos(y),x=v-f,w=x>=0?1:-1,C=w*x,_=C>Pa,N=h*E;

if(bu.add(Math.atan2(N*w*Math.sin(C),g*b+N*Math.cos(C))),i+=_?x+w*Ia:x,_^f>=n^v>=n){
var M=vt(gt(p),gt(e));bt(M);var D=vt(o,M);bt(D);var R=(_^x>=0?-1:1)*ne(D[2]);(r>R||r===R&&(M[0]||M[1]))&&(a+=_^x>=0?1:-1);

}if(!m++)break;f=v,h=E,g=b,p=e}}return(-ka>i||ka>i&&0>bu)^1&a}function qt(e){function t(e,t){
return Math.cos(e)*Math.cos(t)>i}function n(e){var n,i,s,c,l;return{lineStart:function(){
c=s=!1,l=1},point:function(p,f){var d,h=[p,f],g=t(p,f),m=a?g?0:o(p,f):g?o(p+(0>p?Pa:-Pa),f):0;

if(!n&&(c=s=g)&&e.lineStart(),g!==s&&(d=r(n,h),(wt(n,d)||wt(h,d))&&(h[0]+=ka,h[1]+=ka,
g=t(h[0],h[1]))),g!==s)l=0,g?(e.lineStart(),d=r(h,n),e.point(d[0],d[1])):(d=r(n,h),
e.point(d[0],d[1]),e.lineEnd()),n=d;else if(u&&n&&a^g){var v;m&i||!(v=r(h,n,!0))||(l=0,
a?(e.lineStart(),e.point(v[0][0],v[0][1]),e.point(v[1][0],v[1][1]),e.lineEnd()):(e.point(v[1][0],v[1][1]),
e.lineEnd(),e.lineStart(),e.point(v[0][0],v[0][1])))}!g||n&&wt(n,h)||e.point(h[0],h[1]),
n=h,s=g,i=m},lineEnd:function(){s&&e.lineEnd(),n=null},clean:function(){return l|(c&&s)<<1;

}}}function r(e,t,n){var r=gt(e),o=gt(t),a=[1,0,0],u=vt(r,o),s=mt(u,u),c=u[0],l=s-c*c;

if(!l)return!n&&e;var p=i*s/l,f=-i*c/l,d=vt(a,u),h=Et(a,p),g=Et(u,f);yt(h,g);var m=d,v=mt(h,m),y=mt(m,m),E=v*v-y*(mt(h,h)-1);

if(!(0>E)){var b=Math.sqrt(E),x=Et(m,(-v-b)/y);if(yt(x,h),x=xt(x),!n)return x;var w,C=e[0],_=t[0],N=e[1],M=t[1];

C>_&&(w=C,C=_,_=w);var D=_-C,R=ga(D-Pa)<ka,O=R||ka>D;if(!R&&N>M&&(w=N,N=M,M=w),O?R?N+M>0^x[1]<(ga(x[0]-C)<ka?N:M):N<=x[1]&&x[1]<=M:D>Pa^(C<=x[0]&&x[0]<=_)){
var T=Et(m,(-v+b)/y);return yt(T,h),[x,xt(T)]}}}function o(t,n){var r=a?e:Pa-e,o=0;

return-r>t?o|=1:t>r&&(o|=2),-r>n?o|=4:n>r&&(o|=8),o}var i=Math.cos(e),a=i>0,u=ga(i)>ka,s=gn(e,6*La);

return Pt(t,n,s,a?[0,-e]:[-Pa,e-Pa])}function Bt(e,t,n,r){return function(o){var i,a=o.a,u=o.b,s=a.x,c=a.y,l=u.x,p=u.y,f=0,d=1,h=l-s,g=p-c;

if(i=e-s,h||!(i>0)){if(i/=h,0>h){if(f>i)return;d>i&&(d=i)}else if(h>0){if(i>d)return;

i>f&&(f=i)}if(i=n-s,h||!(0>i)){if(i/=h,0>h){if(i>d)return;i>f&&(f=i)}else if(h>0){
if(f>i)return;d>i&&(d=i)}if(i=t-c,g||!(i>0)){if(i/=g,0>g){if(f>i)return;d>i&&(d=i);

}else if(g>0){if(i>d)return;i>f&&(f=i)}if(i=r-c,g||!(0>i)){if(i/=g,0>g){if(i>d)return;

i>f&&(f=i)}else if(g>0){if(f>i)return;d>i&&(d=i)}return f>0&&(o.a={x:s+f*h,y:c+f*g
}),1>d&&(o.b={x:s+d*h,y:c+d*g}),o}}}}}}function Ht(e,t,n,r){function o(r,o){return ga(r[0]-e)<ka?o>0?0:3:ga(r[0]-n)<ka?o>0?2:1:ga(r[1]-t)<ka?o>0?1:0:o>0?3:2;

}function i(e,t){return a(e.x,t.x)}function a(e,t){var n=o(e,1),r=o(t,1);return n!==r?n-r:0===n?t[1]-e[1]:1===n?e[0]-t[0]:2===n?e[1]-t[1]:t[0]-e[0];

}return function(u){function s(e){for(var t=0,n=m.length,r=e[1],o=0;n>o;++o)for(var i,a=1,u=m[o],s=u.length,c=u[0];s>a;++a)i=u[a],
c[1]<=r?i[1]>r&&ee(c,i,e)>0&&++t:i[1]<=r&&ee(c,i,e)<0&&--t,c=i;return 0!==t}function c(i,u,s,c){
var l=0,p=0;if(null==i||(l=o(i,s))!==(p=o(u,s))||a(i,u)<0^s>0){do c.point(0===l||3===l?e:n,l>1?r:t);
while((l=(l+s+4)%4)!==p)}else c.point(u[0],u[1])}function l(o,i){return o>=e&&n>=o&&i>=t&&r>=i;

}function p(e,t){l(e,t)&&u.point(e,t)}function f(){O.point=h,m&&m.push(v=[]),_=!0,
C=!1,x=w=0/0}function d(){g&&(h(y,E),b&&C&&D.rejoin(),g.push(D.buffer())),O.point=p,
C&&u.lineEnd()}function h(e,t){e=Math.max(-Au,Math.min(Au,e)),t=Math.max(-Au,Math.min(Au,t));

var n=l(e,t);if(m&&v.push([e,t]),_)y=e,E=t,b=n,_=!1,n&&(u.lineStart(),u.point(e,t));
else if(n&&C)u.point(e,t);else{var r={a:{x:x,y:w},b:{x:e,y:t}};R(r)?(C||(u.lineStart(),
u.point(r.a.x,r.a.y)),u.point(r.b.x,r.b.y),n||u.lineEnd(),N=!1):n&&(u.lineStart(),
u.point(e,t),N=!1)}x=e,w=t,C=n}var g,m,v,y,E,b,x,w,C,_,N,M=u,D=At(),R=Bt(e,t,n,r),O={
point:p,lineStart:f,lineEnd:d,polygonStart:function(){u=D,g=[],m=[],N=!0},polygonEnd:function(){
u=M,g=ra.merge(g);var t=s([e,r]),n=N&&t,o=g.length;(n||o)&&(u.polygonStart(),n&&(u.lineStart(),
c(null,null,1,u),u.lineEnd()),o&&Tt(g,i,t,c,u),u.polygonEnd()),g=m=v=null}};return O;

}}function zt(e){var t=0,n=Pa/3,r=un(e),o=r(t,n);return o.parallels=function(e){return arguments.length?r(t=e[0]*Pa/180,n=e[1]*Pa/180):[t/Pa*180,n/Pa*180];

},o}function Wt(e,t){function n(e,t){var n=Math.sqrt(i-2*o*Math.sin(t))/o;return[n*Math.sin(e*=o),a-n*Math.cos(e)];

}var r=Math.sin(e),o=(r+Math.sin(t))/2,i=1+r*(2*o-r),a=Math.sqrt(i)/o;return n.invert=function(e,t){
var n=a-t;return[Math.atan2(e,n)/o,ne((i-(e*e+n*n)*o*o)/(2*o))]},n}function Yt(){
function e(e,t){Lu+=o*e-r*t,r=e,o=t}var t,n,r,o;Bu.point=function(i,a){Bu.point=e,
t=r=i,n=o=a},Bu.lineEnd=function(){e(t,n)}}function Kt(e,t){Vu>e&&(Vu=e),e>Fu&&(Fu=e),
Uu>t&&(Uu=t),t>qu&&(qu=t)}function $t(){function e(e,t){a.push("M",e,",",t,i)}function t(e,t){
a.push("M",e,",",t),u.point=n}function n(e,t){a.push("L",e,",",t)}function r(){u.point=e;

}function o(){a.push("Z")}var i=Xt(4.5),a=[],u={point:e,lineStart:function(){u.point=t;

},lineEnd:r,polygonStart:function(){u.lineEnd=o},polygonEnd:function(){u.lineEnd=r,
u.point=e},pointRadius:function(e){return i=Xt(e),u},result:function(){if(a.length){
var e=a.join("");return a=[],e}}};return u}function Xt(e){return"m0,"+e+"a"+e+","+e+" 0 1,1 0,"+-2*e+"a"+e+","+e+" 0 1,1 0,"+2*e+"z";

}function Gt(e,t){_u+=e,Nu+=t,++Mu}function Qt(){function e(e,r){var o=e-t,i=r-n,a=Math.sqrt(o*o+i*i);

Du+=a*(t+e)/2,Ru+=a*(n+r)/2,Ou+=a,Gt(t=e,n=r)}var t,n;zu.point=function(r,o){zu.point=e,
Gt(t=r,n=o)}}function Zt(){zu.point=Gt}function Jt(){function e(e,t){var n=e-r,i=t-o,a=Math.sqrt(n*n+i*i);

Du+=a*(r+e)/2,Ru+=a*(o+t)/2,Ou+=a,a=o*e-r*t,Tu+=a*(r+e),ku+=a*(o+t),Su+=3*a,Gt(r=e,o=t);

}var t,n,r,o;zu.point=function(i,a){zu.point=e,Gt(t=r=i,n=o=a)},zu.lineEnd=function(){
e(t,n)}}function en(e){function t(t,n){e.moveTo(t+a,n),e.arc(t,n,a,0,Ia)}function n(t,n){
e.moveTo(t,n),u.point=r}function r(t,n){e.lineTo(t,n)}function o(){u.point=t}function i(){
e.closePath()}var a=4.5,u={point:t,lineStart:function(){u.point=n},lineEnd:o,polygonStart:function(){
u.lineEnd=i},polygonEnd:function(){u.lineEnd=o,u.point=t},pointRadius:function(e){
return a=e,u},result:w};return u}function tn(e){function t(e){return(u?r:n)(e)}function n(t){
return on(t,function(n,r){n=e(n,r),t.point(n[0],n[1])})}function r(t){function n(n,r){
n=e(n,r),t.point(n[0],n[1])}function r(){E=0/0,_.point=i,t.lineStart()}function i(n,r){
var i=gt([n,r]),a=e(n,r);o(E,b,y,x,w,C,E=a[0],b=a[1],y=n,x=i[0],w=i[1],C=i[2],u,t),
t.point(E,b)}function a(){_.point=n,t.lineEnd()}function s(){r(),_.point=c,_.lineEnd=l;

}function c(e,t){i(p=e,f=t),d=E,h=b,g=x,m=w,v=C,_.point=i}function l(){o(E,b,y,x,w,C,d,h,p,g,m,v,u,t),
_.lineEnd=a,a()}var p,f,d,h,g,m,v,y,E,b,x,w,C,_={point:n,lineStart:r,lineEnd:a,polygonStart:function(){
t.polygonStart(),_.lineStart=s},polygonEnd:function(){t.polygonEnd(),_.lineStart=r;

}};return _}function o(t,n,r,u,s,c,l,p,f,d,h,g,m,v){var y=l-t,E=p-n,b=y*y+E*E;if(b>4*i&&m--){
var x=u+d,w=s+h,C=c+g,_=Math.sqrt(x*x+w*w+C*C),N=Math.asin(C/=_),M=ga(ga(C)-1)<ka||ga(r-f)<ka?(r+f)/2:Math.atan2(w,x),D=e(M,N),R=D[0],O=D[1],T=R-t,k=O-n,S=E*T-y*k;

(S*S/b>i||ga((y*T+E*k)/b-.5)>.3||a>u*d+s*h+c*g)&&(o(t,n,r,u,s,c,R,O,M,x/=_,w/=_,C,m,v),
v.point(R,O),o(R,O,M,x,w,C,l,p,f,d,h,g,m,v))}}var i=.5,a=Math.cos(30*La),u=16;return t.precision=function(e){
return arguments.length?(u=(i=e*e)>0&&16,t):Math.sqrt(i)},t}function nn(e){var t=tn(function(t,n){
return e([t*Va,n*Va])});return function(e){return sn(t(e))}}function rn(e){this.stream=e;

}function on(e,t){return{point:t,sphere:function(){e.sphere()},lineStart:function(){
e.lineStart()},lineEnd:function(){e.lineEnd()},polygonStart:function(){e.polygonStart();

},polygonEnd:function(){e.polygonEnd()}}}function an(e){return un(function(){return e;

})()}function un(e){function t(e){return e=u(e[0]*La,e[1]*La),[e[0]*f+s,c-e[1]*f];

}function n(e){return e=u.invert((e[0]-s)/f,(c-e[1])/f),e&&[e[0]*Va,e[1]*Va]}function r(){
u=Rt(a=pn(v,y,b),i);var e=i(g,m);return s=d-e[0]*f,c=h+e[1]*f,o()}function o(){return l&&(l.valid=!1,
l=null),t}var i,a,u,s,c,l,p=tn(function(e,t){return e=i(e,t),[e[0]*f+s,c-e[1]*f]}),f=150,d=480,h=250,g=0,m=0,v=0,y=0,b=0,x=Iu,w=E,C=null,_=null;

return t.stream=function(e){return l&&(l.valid=!1),l=sn(x(a,p(w(e)))),l.valid=!0,
l},t.clipAngle=function(e){return arguments.length?(x=null==e?(C=e,Iu):qt((C=+e)*La),
o()):C},t.clipExtent=function(e){return arguments.length?(_=e,w=e?Ht(e[0][0],e[0][1],e[1][0],e[1][1]):E,
o()):_},t.scale=function(e){return arguments.length?(f=+e,r()):f},t.translate=function(e){
return arguments.length?(d=+e[0],h=+e[1],r()):[d,h]},t.center=function(e){return arguments.length?(g=e[0]%360*La,
m=e[1]%360*La,r()):[g*Va,m*Va]},t.rotate=function(e){return arguments.length?(v=e[0]%360*La,
y=e[1]%360*La,b=e.length>2?e[2]%360*La:0,r()):[v*Va,y*Va,b*Va]},ra.rebind(t,p,"precision"),
function(){return i=e.apply(this,arguments),t.invert=i.invert&&n,r()}}function sn(e){
return on(e,function(t,n){e.point(t*La,n*La)})}function cn(e,t){return[e,t]}function ln(e,t){
return[e>Pa?e-Ia:-Pa>e?e+Ia:e,t]}function pn(e,t,n){return e?t||n?Rt(dn(e),hn(t,n)):dn(e):t||n?hn(t,n):ln;

}function fn(e){return function(t,n){return t+=e,[t>Pa?t-Ia:-Pa>t?t+Ia:t,n]}}function dn(e){
var t=fn(e);return t.invert=fn(-e),t}function hn(e,t){function n(e,t){var n=Math.cos(t),u=Math.cos(e)*n,s=Math.sin(e)*n,c=Math.sin(t),l=c*r+u*o;

return[Math.atan2(s*i-l*a,u*r-c*o),ne(l*i+s*a)]}var r=Math.cos(e),o=Math.sin(e),i=Math.cos(t),a=Math.sin(t);

return n.invert=function(e,t){var n=Math.cos(t),u=Math.cos(e)*n,s=Math.sin(e)*n,c=Math.sin(t),l=c*i-s*a;

return[Math.atan2(s*i+c*a,u*r+l*o),ne(l*r-u*o)]},n}function gn(e,t){var n=Math.cos(e),r=Math.sin(e);

return function(o,i,a,u){var s=a*t;null!=o?(o=mn(n,o),i=mn(n,i),(a>0?i>o:o>i)&&(o+=a*Ia)):(o=e+a*Ia,
i=e-.5*s);for(var c,l=o;a>0?l>i:i>l;l-=s)u.point((c=xt([n,-r*Math.cos(l),-r*Math.sin(l)]))[0],c[1]);

}}function mn(e,t){var n=gt(t);n[0]-=e,bt(n);var r=te(-n[1]);return((-n[2]<0?-r:r)+2*Math.PI-ka)%(2*Math.PI);

}function vn(e,t,n){var r=ra.range(e,t-ka,n).concat(t);return function(e){return r.map(function(t){
return[e,t]})}}function yn(e,t,n){var r=ra.range(e,t-ka,n).concat(t);return function(e){
return r.map(function(t){return[t,e]})}}function En(e){return e.source}function bn(e){
return e.target}function xn(e,t,n,r){var o=Math.cos(t),i=Math.sin(t),a=Math.cos(r),u=Math.sin(r),s=o*Math.cos(e),c=o*Math.sin(e),l=a*Math.cos(n),p=a*Math.sin(n),f=2*Math.asin(Math.sqrt(ae(r-t)+o*a*ae(n-e))),d=1/Math.sin(f),h=f?function(e){
var t=Math.sin(e*=f)*d,n=Math.sin(f-e)*d,r=n*s+t*l,o=n*c+t*p,a=n*i+t*u;return[Math.atan2(o,r)*Va,Math.atan2(a,Math.sqrt(r*r+o*o))*Va];

}:function(){return[e*Va,t*Va]};return h.distance=f,h}function wn(){function e(e,o){
var i=Math.sin(o*=La),a=Math.cos(o),u=ga((e*=La)-t),s=Math.cos(u);Wu+=Math.atan2(Math.sqrt((u=a*Math.sin(u))*u+(u=r*i-n*a*s)*u),n*i+r*a*s),
t=e,n=i,r=a}var t,n,r;Yu.point=function(o,i){t=o*La,n=Math.sin(i*=La),r=Math.cos(i),
Yu.point=e},Yu.lineEnd=function(){Yu.point=Yu.lineEnd=w}}function Cn(e,t){function n(t,n){
var r=Math.cos(t),o=Math.cos(n),i=e(r*o);return[i*o*Math.sin(t),i*Math.sin(n)]}return n.invert=function(e,n){
var r=Math.sqrt(e*e+n*n),o=t(r),i=Math.sin(o),a=Math.cos(o);return[Math.atan2(e*i,r*a),Math.asin(r&&n*i/r)];

},n}function _n(e,t){function n(e,t){a>0?-ja+ka>t&&(t=-ja+ka):t>ja-ka&&(t=ja-ka);
var n=a/Math.pow(o(t),i);return[n*Math.sin(i*e),a-n*Math.cos(i*e)]}var r=Math.cos(e),o=function(e){
return Math.tan(Pa/4+e/2)},i=e===t?Math.sin(e):Math.log(r/Math.cos(t))/Math.log(o(t)/o(e)),a=r*Math.pow(o(e),i)/i;

return i?(n.invert=function(e,t){var n=a-t,r=J(i)*Math.sqrt(e*e+n*n);return[Math.atan2(e,n)/i,2*Math.atan(Math.pow(a/r,1/i))-ja];

},n):Mn}function Nn(e,t){function n(e,t){var n=i-t;return[n*Math.sin(o*e),i-n*Math.cos(o*e)];

}var r=Math.cos(e),o=e===t?Math.sin(e):(r-Math.cos(t))/(t-e),i=r/o+e;return ga(o)<ka?cn:(n.invert=function(e,t){
var n=i-t;return[Math.atan2(e,n)/o,i-J(o)*Math.sqrt(e*e+n*n)]},n)}function Mn(e,t){
return[e,Math.log(Math.tan(Pa/4+t/2))]}function Dn(e){var t,n=an(e),r=n.scale,o=n.translate,i=n.clipExtent;

return n.scale=function(){var e=r.apply(n,arguments);return e===n?t?n.clipExtent(null):n:e;

},n.translate=function(){var e=o.apply(n,arguments);return e===n?t?n.clipExtent(null):n:e;

},n.clipExtent=function(e){var a=i.apply(n,arguments);if(a===n){if(t=null==e){var u=Pa*r(),s=o();

i([[s[0]-u,s[1]-u],[s[0]+u,s[1]+u]])}}else t&&(a=null);return a},n.clipExtent(null);

}function Rn(e,t){return[Math.log(Math.tan(Pa/4+t/2)),-e]}function On(e){return e[0];

}function Tn(e){return e[1]}function kn(e){for(var t=e.length,n=[0,1],r=2,o=2;t>o;o++){
for(;r>1&&ee(e[n[r-2]],e[n[r-1]],e[o])<=0;)--r;n[r++]=o}return n.slice(0,r)}function Sn(e,t){
return e[0]-t[0]||e[1]-t[1]}function Pn(e,t,n){return(n[0]-t[0])*(e[1]-t[1])<(n[1]-t[1])*(e[0]-t[0]);

}function In(e,t,n,r){var o=e[0],i=n[0],a=t[0]-o,u=r[0]-i,s=e[1],c=n[1],l=t[1]-s,p=r[1]-c,f=(u*(s-c)-p*(o-i))/(p*a-u*l);

return[o+f*a,s+f*l]}function An(e){var t=e[0],n=e[e.length-1];return!(t[0]-n[0]||t[1]-n[1]);

}function jn(){rr(this),this.edge=this.site=this.circle=null}function Ln(e){var t=os.pop()||new jn;

return t.site=e,t}function Vn(e){$n(e),ts.remove(e),os.push(e),rr(e)}function Un(e){
var t=e.circle,n=t.x,r=t.cy,o={x:n,y:r},i=e.P,a=e.N,u=[e];Vn(e);for(var s=i;s.circle&&ga(n-s.circle.x)<ka&&ga(r-s.circle.cy)<ka;)i=s.P,
u.unshift(s),Vn(s),s=i;u.unshift(s),$n(s);for(var c=a;c.circle&&ga(n-c.circle.x)<ka&&ga(r-c.circle.cy)<ka;)a=c.N,
u.push(c),Vn(c),c=a;u.push(c),$n(c);var l,p=u.length;for(l=1;p>l;++l)c=u[l],s=u[l-1],
er(c.edge,s.site,c.site,o);s=u[0],c=u[p-1],c.edge=Zn(s.site,c.site,null,o),Kn(s),
Kn(c)}function Fn(e){for(var t,n,r,o,i=e.x,a=e.y,u=ts._;u;)if(r=qn(u,a)-i,r>ka)u=u.L;
else{if(o=i-Bn(u,a),!(o>ka)){r>-ka?(t=u.P,n=u):o>-ka?(t=u,n=u.N):t=n=u;break}if(!u.R){
t=u;break}u=u.R}var s=Ln(e);if(ts.insert(t,s),t||n){if(t===n)return $n(t),n=Ln(t.site),
ts.insert(s,n),s.edge=n.edge=Zn(t.site,s.site),Kn(t),void Kn(n);if(!n)return void(s.edge=Zn(t.site,s.site));

$n(t),$n(n);var c=t.site,l=c.x,p=c.y,f=e.x-l,d=e.y-p,h=n.site,g=h.x-l,m=h.y-p,v=2*(f*m-d*g),y=f*f+d*d,E=g*g+m*m,b={
x:(m*y-d*E)/v+l,y:(f*E-g*y)/v+p};er(n.edge,c,h,b),s.edge=Zn(c,e,null,b),n.edge=Zn(e,h,null,b),
Kn(t),Kn(n)}}function qn(e,t){var n=e.site,r=n.x,o=n.y,i=o-t;if(!i)return r;var a=e.P;

if(!a)return-(1/0);n=a.site;var u=n.x,s=n.y,c=s-t;if(!c)return u;var l=u-r,p=1/i-1/c,f=l/c;

return p?(-f+Math.sqrt(f*f-2*p*(l*l/(-2*c)-s+c/2+o-i/2)))/p+r:(r+u)/2}function Bn(e,t){
var n=e.N;if(n)return qn(n,t);var r=e.site;return r.y===t?r.x:1/0}function Hn(e){
this.site=e,this.edges=[]}function zn(e){for(var t,n,r,o,i,a,u,s,c,l,p=e[0][0],f=e[1][0],d=e[0][1],h=e[1][1],g=es,m=g.length;m--;)if(i=g[m],
i&&i.prepare())for(u=i.edges,s=u.length,a=0;s>a;)l=u[a].end(),r=l.x,o=l.y,c=u[++a%s].start(),
t=c.x,n=c.y,(ga(r-t)>ka||ga(o-n)>ka)&&(u.splice(a,0,new tr(Jn(i.site,l,ga(r-p)<ka&&h-o>ka?{
x:p,y:ga(t-p)<ka?n:h}:ga(o-h)<ka&&f-r>ka?{x:ga(n-h)<ka?t:f,y:h}:ga(r-f)<ka&&o-d>ka?{
x:f,y:ga(t-f)<ka?n:d}:ga(o-d)<ka&&r-p>ka?{x:ga(n-d)<ka?t:p,y:d}:null),i.site,null)),
++s)}function Wn(e,t){return t.angle-e.angle}function Yn(){rr(this),this.x=this.y=this.arc=this.site=this.cy=null;

}function Kn(e){var t=e.P,n=e.N;if(t&&n){var r=t.site,o=e.site,i=n.site;if(r!==i){
var a=o.x,u=o.y,s=r.x-a,c=r.y-u,l=i.x-a,p=i.y-u,f=2*(s*p-c*l);if(!(f>=-Sa)){var d=s*s+c*c,h=l*l+p*p,g=(p*d-c*h)/f,m=(s*h-l*d)/f,p=m+u,v=is.pop()||new Yn;

v.arc=e,v.site=o,v.x=g+a,v.y=p+Math.sqrt(g*g+m*m),v.cy=p,e.circle=v;for(var y=null,E=rs._;E;)if(v.y<E.y||v.y===E.y&&v.x<=E.x){
if(!E.L){y=E.P;break}E=E.L}else{if(!E.R){y=E;break}E=E.R}rs.insert(y,v),y||(ns=v);

}}}}function $n(e){var t=e.circle;t&&(t.P||(ns=t.N),rs.remove(t),is.push(t),rr(t),
e.circle=null)}function Xn(e){for(var t,n=Ju,r=Bt(e[0][0],e[0][1],e[1][0],e[1][1]),o=n.length;o--;)t=n[o],
(!Gn(t,e)||!r(t)||ga(t.a.x-t.b.x)<ka&&ga(t.a.y-t.b.y)<ka)&&(t.a=t.b=null,n.splice(o,1));

}function Gn(e,t){var n=e.b;if(n)return!0;var r,o,i=e.a,a=t[0][0],u=t[1][0],s=t[0][1],c=t[1][1],l=e.l,p=e.r,f=l.x,d=l.y,h=p.x,g=p.y,m=(f+h)/2,v=(d+g)/2;

if(g===d){if(a>m||m>=u)return;if(f>h){if(i){if(i.y>=c)return}else i={x:m,y:s};n={
x:m,y:c}}else{if(i){if(i.y<s)return}else i={x:m,y:c};n={x:m,y:s}}}else if(r=(f-h)/(g-d),
o=v-r*m,-1>r||r>1)if(f>h){if(i){if(i.y>=c)return}else i={x:(s-o)/r,y:s};n={x:(c-o)/r,
y:c}}else{if(i){if(i.y<s)return}else i={x:(c-o)/r,y:c};n={x:(s-o)/r,y:s}}else if(g>d){
if(i){if(i.x>=u)return}else i={x:a,y:r*a+o};n={x:u,y:r*u+o}}else{if(i){if(i.x<a)return;

}else i={x:u,y:r*u+o};n={x:a,y:r*a+o}}return e.a=i,e.b=n,!0}function Qn(e,t){this.l=e,
this.r=t,this.a=this.b=null}function Zn(e,t,n,r){var o=new Qn(e,t);return Ju.push(o),
n&&er(o,e,t,n),r&&er(o,t,e,r),es[e.i].edges.push(new tr(o,e,t)),es[t.i].edges.push(new tr(o,t,e)),
o}function Jn(e,t,n){var r=new Qn(e,null);return r.a=t,r.b=n,Ju.push(r),r}function er(e,t,n,r){
e.a||e.b?e.l===n?e.b=r:e.a=r:(e.a=r,e.l=t,e.r=n)}function tr(e,t,n){var r=e.a,o=e.b;

this.edge=e,this.site=t,this.angle=n?Math.atan2(n.y-t.y,n.x-t.x):e.l===t?Math.atan2(o.x-r.x,r.y-o.y):Math.atan2(r.x-o.x,o.y-r.y);

}function nr(){this._=null}function rr(e){e.U=e.C=e.L=e.R=e.P=e.N=null}function or(e,t){
var n=t,r=t.R,o=n.U;o?o.L===n?o.L=r:o.R=r:e._=r,r.U=o,n.U=r,n.R=r.L,n.R&&(n.R.U=n),
r.L=n}function ir(e,t){var n=t,r=t.L,o=n.U;o?o.L===n?o.L=r:o.R=r:e._=r,r.U=o,n.U=r,
n.L=r.R,n.L&&(n.L.U=n),r.R=n}function ar(e){for(;e.L;)e=e.L;return e}function ur(e,t){
var n,r,o,i=e.sort(sr).pop();for(Ju=[],es=new Array(e.length),ts=new nr,rs=new nr;;)if(o=ns,
i&&(!o||i.y<o.y||i.y===o.y&&i.x<o.x))(i.x!==n||i.y!==r)&&(es[i.i]=new Hn(i),Fn(i),
n=i.x,r=i.y),i=e.pop();else{if(!o)break;Un(o.arc)}t&&(Xn(t),zn(t));var a={cells:es,
edges:Ju};return ts=rs=Ju=es=null,a}function sr(e,t){return t.y-e.y||t.x-e.x}function cr(e,t,n){
return(e.x-n.x)*(t.y-e.y)-(e.x-t.x)*(n.y-e.y)}function lr(e){return e.x}function pr(e){
return e.y}function fr(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function dr(e,t,n,r,o,i){
if(!e(t,n,r,o,i)){var a=.5*(n+o),u=.5*(r+i),s=t.nodes;s[0]&&dr(e,s[0],n,r,a,u),s[1]&&dr(e,s[1],a,r,o,u),
s[2]&&dr(e,s[2],n,u,a,i),s[3]&&dr(e,s[3],a,u,o,i)}}function hr(e,t,n,r,o,i,a){var u,s=1/0;

return function c(e,l,p,f,d){if(!(l>i||p>a||r>f||o>d)){if(h=e.point){var h,g=t-e.x,m=n-e.y,v=g*g+m*m;

if(s>v){var y=Math.sqrt(s=v);r=t-y,o=n-y,i=t+y,a=n+y,u=h}}for(var E=e.nodes,b=.5*(l+f),x=.5*(p+d),w=t>=b,C=n>=x,_=C<<1|w,N=_+4;N>_;++_)if(e=E[3&_])switch(3&_){
case 0:c(e,l,p,b,x);break;case 1:c(e,b,p,f,x);break;case 2:c(e,l,x,b,d);break;case 3:
c(e,b,x,f,d)}}}(e,r,o,i,a),u}function gr(e,t){e=ra.rgb(e),t=ra.rgb(t);var n=e.r,r=e.g,o=e.b,i=t.r-n,a=t.g-r,u=t.b-o;

return function(e){return"#"+xe(Math.round(n+i*e))+xe(Math.round(r+a*e))+xe(Math.round(o+u*e));

}}function mr(e,t){var n,r={},o={};for(n in e)n in t?r[n]=Er(e[n],t[n]):o[n]=e[n];

for(n in t)n in e||(o[n]=t[n]);return function(e){for(n in r)o[n]=r[n](e);return o;

}}function vr(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}function yr(e,t){
var n,r,o,i=us.lastIndex=ss.lastIndex=0,a=-1,u=[],s=[];for(e+="",t+="";(n=us.exec(e))&&(r=ss.exec(t));)(o=r.index)>i&&(o=t.slice(i,o),
u[a]?u[a]+=o:u[++a]=o),(n=n[0])===(r=r[0])?u[a]?u[a]+=r:u[++a]=r:(u[++a]=null,s.push({
i:a,x:vr(n,r)})),i=ss.lastIndex;return i<t.length&&(o=t.slice(i),u[a]?u[a]+=o:u[++a]=o),
u.length<2?s[0]?(t=s[0].x,function(e){return t(e)+""}):function(){return t}:(t=s.length,
function(e){for(var n,r=0;t>r;++r)u[(n=s[r]).i]=n.x(e);return u.join("")})}function Er(e,t){
for(var n,r=ra.interpolators.length;--r>=0&&!(n=ra.interpolators[r](e,t)););return n;

}function br(e,t){var n,r=[],o=[],i=e.length,a=t.length,u=Math.min(e.length,t.length);

for(n=0;u>n;++n)r.push(Er(e[n],t[n]));for(;i>n;++n)o[n]=e[n];for(;a>n;++n)o[n]=t[n];

return function(e){for(n=0;u>n;++n)o[n]=r[n](e);return o}}function xr(e){return function(t){
return 0>=t?0:t>=1?1:e(t)}}function wr(e){return function(t){return 1-e(1-t)}}function Cr(e){
return function(t){return.5*(.5>t?e(2*t):2-e(2-2*t))}}function _r(e){return e*e}function Nr(e){
return e*e*e}function Mr(e){if(0>=e)return 0;if(e>=1)return 1;var t=e*e,n=t*e;return 4*(.5>e?n:3*(e-t)+n-.75);

}function Dr(e){return function(t){return Math.pow(t,e)}}function Rr(e){return 1-Math.cos(e*ja);

}function Or(e){return Math.pow(2,10*(e-1))}function Tr(e){return 1-Math.sqrt(1-e*e);

}function kr(e,t){var n;return arguments.length<2&&(t=.45),arguments.length?n=t/Ia*Math.asin(1/e):(e=1,
n=t/4),function(r){return 1+e*Math.pow(2,-10*r)*Math.sin((r-n)*Ia/t)}}function Sr(e){
return e||(e=1.70158),function(t){return t*t*((e+1)*t-e)}}function Pr(e){return 1/2.75>e?7.5625*e*e:2/2.75>e?7.5625*(e-=1.5/2.75)*e+.75:2.5/2.75>e?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375;

}function Ir(e,t){e=ra.hcl(e),t=ra.hcl(t);var n=e.h,r=e.c,o=e.l,i=t.h-n,a=t.c-r,u=t.l-o;

return isNaN(a)&&(a=0,r=isNaN(r)?t.c:r),isNaN(i)?(i=0,n=isNaN(n)?t.h:n):i>180?i-=360:-180>i&&(i+=360),
function(e){return pe(n+i*e,r+a*e,o+u*e)+""}}function Ar(e,t){e=ra.hsl(e),t=ra.hsl(t);

var n=e.h,r=e.s,o=e.l,i=t.h-n,a=t.s-r,u=t.l-o;return isNaN(a)&&(a=0,r=isNaN(r)?t.s:r),
isNaN(i)?(i=0,n=isNaN(n)?t.h:n):i>180?i-=360:-180>i&&(i+=360),function(e){return ce(n+i*e,r+a*e,o+u*e)+"";

}}function jr(e,t){e=ra.lab(e),t=ra.lab(t);var n=e.l,r=e.a,o=e.b,i=t.l-n,a=t.a-r,u=t.b-o;

return function(e){return de(n+i*e,r+a*e,o+u*e)+""}}function Lr(e,t){return t-=e,
function(n){return Math.round(e+t*n)}}function Vr(e){var t=[e.a,e.b],n=[e.c,e.d],r=Fr(t),o=Ur(t,n),i=Fr(qr(n,t,-o))||0;

t[0]*n[1]<n[0]*t[1]&&(t[0]*=-1,t[1]*=-1,r*=-1,o*=-1),this.rotate=(r?Math.atan2(t[1],t[0]):Math.atan2(-n[0],n[1]))*Va,
this.translate=[e.e,e.f],this.scale=[r,i],this.skew=i?Math.atan2(o,i)*Va:0}function Ur(e,t){
return e[0]*t[0]+e[1]*t[1]}function Fr(e){var t=Math.sqrt(Ur(e,e));return t&&(e[0]/=t,
e[1]/=t),t}function qr(e,t,n){return e[0]+=n*t[0],e[1]+=n*t[1],e}function Br(e,t){
var n,r=[],o=[],i=ra.transform(e),a=ra.transform(t),u=i.translate,s=a.translate,c=i.rotate,l=a.rotate,p=i.skew,f=a.skew,d=i.scale,h=a.scale;

return u[0]!=s[0]||u[1]!=s[1]?(r.push("translate(",null,",",null,")"),o.push({i:1,
x:vr(u[0],s[0])},{i:3,x:vr(u[1],s[1])})):r.push(s[0]||s[1]?"translate("+s+")":""),
c!=l?(c-l>180?l+=360:l-c>180&&(c+=360),o.push({i:r.push(r.pop()+"rotate(",null,")")-2,
x:vr(c,l)})):l&&r.push(r.pop()+"rotate("+l+")"),p!=f?o.push({i:r.push(r.pop()+"skewX(",null,")")-2,
x:vr(p,f)}):f&&r.push(r.pop()+"skewX("+f+")"),d[0]!=h[0]||d[1]!=h[1]?(n=r.push(r.pop()+"scale(",null,",",null,")"),
o.push({i:n-4,x:vr(d[0],h[0])},{i:n-2,x:vr(d[1],h[1])})):(1!=h[0]||1!=h[1])&&r.push(r.pop()+"scale("+h+")"),
n=o.length,function(e){for(var t,i=-1;++i<n;)r[(t=o[i]).i]=t.x(e);return r.join("");

}}function Hr(e,t){return t=(t-=e=+e)||1/t,function(n){return(n-e)/t}}function zr(e,t){
return t=(t-=e=+e)||1/t,function(n){return Math.max(0,Math.min(1,(n-e)/t))}}function Wr(e){
for(var t=e.source,n=e.target,r=Kr(t,n),o=[t];t!==r;)t=t.parent,o.push(t);for(var i=o.length;n!==r;)o.splice(i,0,n),
n=n.parent;return o}function Yr(e){for(var t=[],n=e.parent;null!=n;)t.push(e),e=n,
n=n.parent;return t.push(e),t}function Kr(e,t){if(e===t)return e;for(var n=Yr(e),r=Yr(t),o=n.pop(),i=r.pop(),a=null;o===i;)a=o,
o=n.pop(),i=r.pop();return a}function $r(e){e.fixed|=2}function Xr(e){e.fixed&=-7;

}function Gr(e){e.fixed|=4,e.px=e.x,e.py=e.y}function Qr(e){e.fixed&=-5}function Zr(e,t,n){
var r=0,o=0;if(e.charge=0,!e.leaf)for(var i,a=e.nodes,u=a.length,s=-1;++s<u;)i=a[s],
null!=i&&(Zr(i,t,n),e.charge+=i.charge,r+=i.charge*i.cx,o+=i.charge*i.cy);if(e.point){
e.leaf||(e.point.x+=Math.random()-.5,e.point.y+=Math.random()-.5);var c=t*n[e.point.index];

e.charge+=e.pointCharge=c,r+=c*e.point.x,o+=c*e.point.y}e.cx=r/e.charge,e.cy=o/e.charge;

}function Jr(e,t){return ra.rebind(e,t,"sort","children","value"),e.nodes=e,e.links=io,
e}function eo(e,t){for(var n=[e];null!=(e=n.pop());)if(t(e),(o=e.children)&&(r=o.length))for(var r,o;--r>=0;)n.push(o[r]);

}function to(e,t){for(var n=[e],r=[];null!=(e=n.pop());)if(r.push(e),(i=e.children)&&(o=i.length))for(var o,i,a=-1;++a<o;)n.push(i[a]);

for(;null!=(e=r.pop());)t(e)}function no(e){return e.children}function ro(e){return e.value;

}function oo(e,t){return t.value-e.value}function io(e){return ra.merge(e.map(function(e){
return(e.children||[]).map(function(t){return{source:e,target:t}})}))}function ao(e){
return e.x}function uo(e){return e.y}function so(e,t,n){e.y0=t,e.y=n}function co(e){
return ra.range(e.length)}function lo(e){for(var t=-1,n=e[0].length,r=[];++t<n;)r[t]=0;

return r}function po(e){for(var t,n=1,r=0,o=e[0][1],i=e.length;i>n;++n)(t=e[n][1])>o&&(r=n,
o=t);return r}function fo(e){return e.reduce(ho,0)}function ho(e,t){return e+t[1];

}function go(e,t){return mo(e,Math.ceil(Math.log(t.length)/Math.LN2+1))}function mo(e,t){
for(var n=-1,r=+e[0],o=(e[1]-r)/t,i=[];++n<=t;)i[n]=o*n+r;return i}function vo(e){
return[ra.min(e),ra.max(e)]}function yo(e,t){return e.value-t.value}function Eo(e,t){
var n=e._pack_next;e._pack_next=t,t._pack_prev=e,t._pack_next=n,n._pack_prev=t}function bo(e,t){
e._pack_next=t,t._pack_prev=e}function xo(e,t){var n=t.x-e.x,r=t.y-e.y,o=e.r+t.r;
return.999*o*o>n*n+r*r}function wo(e){function t(e){l=Math.min(e.x-e.r,l),p=Math.max(e.x+e.r,p),
f=Math.min(e.y-e.r,f),d=Math.max(e.y+e.r,d)}if((n=e.children)&&(c=n.length)){var n,r,o,i,a,u,s,c,l=1/0,p=-(1/0),f=1/0,d=-(1/0);

if(n.forEach(Co),r=n[0],r.x=-r.r,r.y=0,t(r),c>1&&(o=n[1],o.x=o.r,o.y=0,t(o),c>2))for(i=n[2],
Mo(r,o,i),t(i),Eo(r,i),r._pack_prev=i,Eo(i,o),o=r._pack_next,a=3;c>a;a++){Mo(r,o,i=n[a]);

var h=0,g=1,m=1;for(u=o._pack_next;u!==o;u=u._pack_next,g++)if(xo(u,i)){h=1;break;

}if(1==h)for(s=r._pack_prev;s!==u._pack_prev&&!xo(s,i);s=s._pack_prev,m++);h?(m>g||g==m&&o.r<r.r?bo(r,o=u):bo(r=s,o),
a--):(Eo(r,i),o=i,t(i))}var v=(l+p)/2,y=(f+d)/2,E=0;for(a=0;c>a;a++)i=n[a],i.x-=v,
i.y-=y,E=Math.max(E,i.r+Math.sqrt(i.x*i.x+i.y*i.y));e.r=E,n.forEach(_o)}}function Co(e){
e._pack_next=e._pack_prev=e}function _o(e){delete e._pack_next,delete e._pack_prev;

}function No(e,t,n,r){var o=e.children;if(e.x=t+=r*e.x,e.y=n+=r*e.y,e.r*=r,o)for(var i=-1,a=o.length;++i<a;)No(o[i],t,n,r);

}function Mo(e,t,n){var r=e.r+n.r,o=t.x-e.x,i=t.y-e.y;if(r&&(o||i)){var a=t.r+n.r,u=o*o+i*i;

a*=a,r*=r;var s=.5+(r-a)/(2*u),c=Math.sqrt(Math.max(0,2*a*(r+u)-(r-=u)*r-a*a))/(2*u);

n.x=e.x+s*o+c*i,n.y=e.y+s*i-c*o}else n.x=e.x+r,n.y=e.y}function Do(e,t){return e.parent==t.parent?1:2;

}function Ro(e){var t=e.children;return t.length?t[0]:e.t}function Oo(e){var t,n=e.children;

return(t=n.length)?n[t-1]:e.t}function To(e,t,n){var r=n/(t.i-e.i);t.c-=r,t.s+=n,
e.c+=r,t.z+=n,t.m+=n}function ko(e){for(var t,n=0,r=0,o=e.children,i=o.length;--i>=0;)t=o[i],
t.z+=n,t.m+=n,n+=t.s+(r+=t.c)}function So(e,t,n){return e.a.parent===t.parent?e.a:n;

}function Po(e){return 1+ra.max(e,function(e){return e.y})}function Io(e){return e.reduce(function(e,t){
return e+t.x},0)/e.length}function Ao(e){var t=e.children;return t&&t.length?Ao(t[0]):e;

}function jo(e){var t,n=e.children;return n&&(t=n.length)?jo(n[t-1]):e}function Lo(e){
return{x:e.x,y:e.y,dx:e.dx,dy:e.dy}}function Vo(e,t){var n=e.x+t[3],r=e.y+t[0],o=e.dx-t[1]-t[3],i=e.dy-t[0]-t[2];

return 0>o&&(n+=o/2,o=0),0>i&&(r+=i/2,i=0),{x:n,y:r,dx:o,dy:i}}function Uo(e){var t=e[0],n=e[e.length-1];

return n>t?[t,n]:[n,t]}function Fo(e){return e.rangeExtent?e.rangeExtent():Uo(e.range());

}function qo(e,t,n,r){var o=n(e[0],e[1]),i=r(t[0],t[1]);return function(e){return i(o(e));

}}function Bo(e,t){var n,r=0,o=e.length-1,i=e[r],a=e[o];return i>a&&(n=r,r=o,o=n,
n=i,i=a,a=n),e[r]=t.floor(i),e[o]=t.ceil(a),e}function Ho(e){return e?{floor:function(t){
return Math.floor(t/e)*e},ceil:function(t){return Math.ceil(t/e)*e}}:Es}function zo(e,t,n,r){
var o=[],i=[],a=0,u=Math.min(e.length,t.length)-1;for(e[u]<e[0]&&(e=e.slice().reverse(),
t=t.slice().reverse());++a<=u;)o.push(n(e[a-1],e[a])),i.push(r(t[a-1],t[a]));return function(t){
var n=ra.bisect(e,t,1,u)-1;return i[n](o[n](t))}}function Wo(e,t,n,r){function o(){
var o=Math.min(e.length,t.length)>2?zo:qo,s=r?zr:Hr;return a=o(e,t,s,n),u=o(t,e,s,Er),
i}function i(e){return a(e)}var a,u;return i.invert=function(e){return u(e)},i.domain=function(t){
return arguments.length?(e=t.map(Number),o()):e},i.range=function(e){return arguments.length?(t=e,
o()):t},i.rangeRound=function(e){return i.range(e).interpolate(Lr)},i.clamp=function(e){
return arguments.length?(r=e,o()):r},i.interpolate=function(e){return arguments.length?(n=e,
o()):n},i.ticks=function(t){return Xo(e,t)},i.tickFormat=function(t,n){return Go(e,t,n);

},i.nice=function(t){return Ko(e,t),o()},i.copy=function(){return Wo(e,t,n,r)},o();

}function Yo(e,t){return ra.rebind(e,t,"range","rangeRound","interpolate","clamp");

}function Ko(e,t){return Bo(e,Ho($o(e,t)[2]))}function $o(e,t){null==t&&(t=10);var n=Uo(e),r=n[1]-n[0],o=Math.pow(10,Math.floor(Math.log(r/t)/Math.LN10)),i=t/r*o;

return.15>=i?o*=10:.35>=i?o*=5:.75>=i&&(o*=2),n[0]=Math.ceil(n[0]/o)*o,n[1]=Math.floor(n[1]/o)*o+.5*o,
n[2]=o,n}function Xo(e,t){return ra.range.apply(ra,$o(e,t))}function Go(e,t,n){var r=$o(e,t);

if(n){var o=uu.exec(n);if(o.shift(),"s"===o[8]){var i=ra.formatPrefix(Math.max(ga(r[0]),ga(r[1])));

return o[7]||(o[7]="."+Qo(i.scale(r[2]))),o[8]="f",n=ra.format(o.join("")),function(e){
return n(i.scale(e))+i.symbol}}o[7]||(o[7]="."+Zo(o[8],r)),n=o.join("")}else n=",."+Qo(r[2])+"f";

return ra.format(n)}function Qo(e){return-Math.floor(Math.log(e)/Math.LN10+.01)}function Zo(e,t){
var n=Qo(t[2]);return e in bs?Math.abs(n-Qo(Math.max(ga(t[0]),ga(t[1]))))+ +("e"!==e):n-2*("%"===e);

}function Jo(e,t,n,r){function o(e){return(n?Math.log(0>e?0:e):-Math.log(e>0?0:-e))/Math.log(t);

}function i(e){return n?Math.pow(t,e):-Math.pow(t,-e)}function a(t){return e(o(t));

}return a.invert=function(t){return i(e.invert(t))},a.domain=function(t){return arguments.length?(n=t[0]>=0,
e.domain((r=t.map(Number)).map(o)),a):r},a.base=function(n){return arguments.length?(t=+n,
e.domain(r.map(o)),a):t},a.nice=function(){var t=Bo(r.map(o),n?Math:ws);return e.domain(t),
r=t.map(i),a},a.ticks=function(){var e=Uo(r),a=[],u=e[0],s=e[1],c=Math.floor(o(u)),l=Math.ceil(o(s)),p=t%1?2:t;

if(isFinite(l-c)){if(n){for(;l>c;c++)for(var f=1;p>f;f++)a.push(i(c)*f);a.push(i(c));

}else for(a.push(i(c));c++<l;)for(var f=p-1;f>0;f--)a.push(i(c)*f);for(c=0;a[c]<u;c++);
for(l=a.length;a[l-1]>s;l--);a=a.slice(c,l)}return a},a.tickFormat=function(e,t){
if(!arguments.length)return xs;arguments.length<2?t=xs:"function"!=typeof t&&(t=ra.format(t));

var r,u=Math.max(.1,e/a.ticks().length),s=n?(r=1e-12,Math.ceil):(r=-1e-12,Math.floor);

return function(e){return e/i(s(o(e)+r))<=u?t(e):""}},a.copy=function(){return Jo(e.copy(),t,n,r);

},Yo(a,e)}function ei(e,t,n){function r(t){return e(o(t))}var o=ti(t),i=ti(1/t);return r.invert=function(t){
return i(e.invert(t))},r.domain=function(t){return arguments.length?(e.domain((n=t.map(Number)).map(o)),
r):n},r.ticks=function(e){return Xo(n,e)},r.tickFormat=function(e,t){return Go(n,e,t);

},r.nice=function(e){return r.domain(Ko(n,e))},r.exponent=function(a){return arguments.length?(o=ti(t=a),
i=ti(1/t),e.domain(n.map(o)),r):t},r.copy=function(){return ei(e.copy(),t,n)},Yo(r,e);

}function ti(e){return function(t){return 0>t?-Math.pow(-t,e):Math.pow(t,e)}}function ni(e,t){
function n(n){return i[((o.get(n)||("range"===t.t?o.set(n,e.push(n)):0/0))-1)%i.length];

}function r(t,n){return ra.range(e.length).map(function(e){return t+n*e})}var o,i,a;

return n.domain=function(r){if(!arguments.length)return e;e=[],o=new l;for(var i,a=-1,u=r.length;++a<u;)o.has(i=r[a])||o.set(i,e.push(i));

return n[t.t].apply(n,t.a)},n.range=function(e){return arguments.length?(i=e,a=0,
t={t:"range",a:arguments},n):i},n.rangePoints=function(o,u){arguments.length<2&&(u=0);

var s=o[0],c=o[1],l=e.length<2?(s=(s+c)/2,0):(c-s)/(e.length-1+u);return i=r(s+l*u/2,l),
a=0,t={t:"rangePoints",a:arguments},n},n.rangeRoundPoints=function(o,u){arguments.length<2&&(u=0);

var s=o[0],c=o[1],l=e.length<2?(s=c=Math.round((s+c)/2),0):(c-s)/(e.length-1+u)|0;

return i=r(s+Math.round(l*u/2+(c-s-(e.length-1+u)*l)/2),l),a=0,t={t:"rangeRoundPoints",
a:arguments},n},n.rangeBands=function(o,u,s){arguments.length<2&&(u=0),arguments.length<3&&(s=u);

var c=o[1]<o[0],l=o[c-0],p=o[1-c],f=(p-l)/(e.length-u+2*s);return i=r(l+f*s,f),c&&i.reverse(),
a=f*(1-u),t={t:"rangeBands",a:arguments},n},n.rangeRoundBands=function(o,u,s){arguments.length<2&&(u=0),
arguments.length<3&&(s=u);var c=o[1]<o[0],l=o[c-0],p=o[1-c],f=Math.floor((p-l)/(e.length-u+2*s));

return i=r(l+Math.round((p-l-(e.length-u)*f)/2),f),c&&i.reverse(),a=Math.round(f*(1-u)),
t={t:"rangeRoundBands",a:arguments},n},n.rangeBand=function(){return a},n.rangeExtent=function(){
return Uo(t.a[0])},n.copy=function(){return ni(e,t)},n.domain(e)}function ri(e,t){
function n(){var n=0,r=t.length;for(u=[];++n<r;)u[n-1]=ra.quantile(e,n/r);return a;

}function a(e){return isNaN(e=+e)?void 0:t[ra.bisect(u,e)]}var u;return a.domain=function(t){
return arguments.length?(e=t.map(o).filter(i).sort(r),n()):e},a.range=function(e){
return arguments.length?(t=e,n()):t},a.quantiles=function(){return u},a.invertExtent=function(n){
return n=t.indexOf(n),0>n?[0/0,0/0]:[n>0?u[n-1]:e[0],n<u.length?u[n]:e[e.length-1]];

},a.copy=function(){return ri(e,t)},n()}function oi(e,t,n){function r(t){return n[Math.max(0,Math.min(a,Math.floor(i*(t-e))))];

}function o(){return i=n.length/(t-e),a=n.length-1,r}var i,a;return r.domain=function(n){
return arguments.length?(e=+n[0],t=+n[n.length-1],o()):[e,t]},r.range=function(e){
return arguments.length?(n=e,o()):n},r.invertExtent=function(t){return t=n.indexOf(t),
t=0>t?0/0:t/i+e,[t,t+1/i]},r.copy=function(){return oi(e,t,n)},o()}function ii(e,t){
function n(n){return n>=n?t[ra.bisect(e,n)]:void 0}return n.domain=function(t){return arguments.length?(e=t,
n):e},n.range=function(e){return arguments.length?(t=e,n):t},n.invertExtent=function(n){
return n=t.indexOf(n),[e[n-1],e[n]]},n.copy=function(){return ii(e,t)},n}function ai(e){
function t(e){return+e}return t.invert=t,t.domain=t.range=function(n){return arguments.length?(e=n.map(t),
t):e},t.ticks=function(t){return Xo(e,t)},t.tickFormat=function(t,n){return Go(e,t,n);

},t.copy=function(){return ai(e)},t}function ui(){return 0}function si(e){return e.innerRadius;

}function ci(e){return e.outerRadius}function li(e){return e.startAngle}function pi(e){
return e.endAngle}function fi(e){return e&&e.padAngle}function di(e,t,n,r){return(e-n)*t-(t-r)*e>0?0:1;

}function hi(e,t,n,r,o){var i=e[0]-t[0],a=e[1]-t[1],u=(o?r:-r)/Math.sqrt(i*i+a*a),s=u*a,c=-u*i,l=e[0]+s,p=e[1]+c,f=t[0]+s,d=t[1]+c,h=(l+f)/2,g=(p+d)/2,m=f-l,v=d-p,y=m*m+v*v,E=n-r,b=l*d-f*p,x=(0>v?-1:1)*Math.sqrt(E*E*y-b*b),w=(b*v-m*x)/y,C=(-b*m-v*x)/y,_=(b*v+m*x)/y,N=(-b*m+v*x)/y,M=w-h,D=C-g,R=_-h,O=N-g;

return M*M+D*D>R*R+O*O&&(w=_,C=N),[[w-s,C-c],[w*n/E,C*n/E]]}function gi(e){function t(t){
function a(){c.push("M",i(e(l),u))}for(var s,c=[],l=[],p=-1,f=t.length,d=De(n),h=De(r);++p<f;)o.call(this,s=t[p],p)?l.push([+d.call(this,s,p),+h.call(this,s,p)]):l.length&&(a(),
l=[]);return l.length&&a(),c.length?c.join(""):null}var n=On,r=Tn,o=Ot,i=mi,a=i.key,u=.7;

return t.x=function(e){return arguments.length?(n=e,t):n},t.y=function(e){return arguments.length?(r=e,
t):r},t.defined=function(e){return arguments.length?(o=e,t):o},t.interpolate=function(e){
return arguments.length?(a="function"==typeof e?i=e:(i=Rs.get(e)||mi).key,t):a},t.tension=function(e){
return arguments.length?(u=e,t):u},t}function mi(e){return e.join("L")}function vi(e){
return mi(e)+"Z"}function yi(e){for(var t=0,n=e.length,r=e[0],o=[r[0],",",r[1]];++t<n;)o.push("H",(r[0]+(r=e[t])[0])/2,"V",r[1]);

return n>1&&o.push("H",r[0]),o.join("")}function Ei(e){for(var t=0,n=e.length,r=e[0],o=[r[0],",",r[1]];++t<n;)o.push("V",(r=e[t])[1],"H",r[0]);

return o.join("")}function bi(e){for(var t=0,n=e.length,r=e[0],o=[r[0],",",r[1]];++t<n;)o.push("H",(r=e[t])[0],"V",r[1]);

return o.join("")}function xi(e,t){return e.length<4?mi(e):e[1]+_i(e.slice(1,-1),Ni(e,t));

}function wi(e,t){return e.length<3?mi(e):e[0]+_i((e.push(e[0]),e),Ni([e[e.length-2]].concat(e,[e[1]]),t));

}function Ci(e,t){return e.length<3?mi(e):e[0]+_i(e,Ni(e,t))}function _i(e,t){if(t.length<1||e.length!=t.length&&e.length!=t.length+2)return mi(e);

var n=e.length!=t.length,r="",o=e[0],i=e[1],a=t[0],u=a,s=1;if(n&&(r+="Q"+(i[0]-2*a[0]/3)+","+(i[1]-2*a[1]/3)+","+i[0]+","+i[1],
o=e[1],s=2),t.length>1){u=t[1],i=e[s],s++,r+="C"+(o[0]+a[0])+","+(o[1]+a[1])+","+(i[0]-u[0])+","+(i[1]-u[1])+","+i[0]+","+i[1];

for(var c=2;c<t.length;c++,s++)i=e[s],u=t[c],r+="S"+(i[0]-u[0])+","+(i[1]-u[1])+","+i[0]+","+i[1];

}if(n){var l=e[s];r+="Q"+(i[0]+2*u[0]/3)+","+(i[1]+2*u[1]/3)+","+l[0]+","+l[1]}return r;

}function Ni(e,t){for(var n,r=[],o=(1-t)/2,i=e[0],a=e[1],u=1,s=e.length;++u<s;)n=i,
i=a,a=e[u],r.push([o*(a[0]-n[0]),o*(a[1]-n[1])]);return r}function Mi(e){if(e.length<3)return mi(e);

var t=1,n=e.length,r=e[0],o=r[0],i=r[1],a=[o,o,o,(r=e[1])[0]],u=[i,i,i,r[1]],s=[o,",",i,"L",Ti(ks,a),",",Ti(ks,u)];

for(e.push(e[n-1]);++t<=n;)r=e[t],a.shift(),a.push(r[0]),u.shift(),u.push(r[1]),ki(s,a,u);

return e.pop(),s.push("L",r),s.join("")}function Di(e){if(e.length<4)return mi(e);

for(var t,n=[],r=-1,o=e.length,i=[0],a=[0];++r<3;)t=e[r],i.push(t[0]),a.push(t[1]);

for(n.push(Ti(ks,i)+","+Ti(ks,a)),--r;++r<o;)t=e[r],i.shift(),i.push(t[0]),a.shift(),
a.push(t[1]),ki(n,i,a);return n.join("")}function Ri(e){for(var t,n,r=-1,o=e.length,i=o+4,a=[],u=[];++r<4;)n=e[r%o],
a.push(n[0]),u.push(n[1]);for(t=[Ti(ks,a),",",Ti(ks,u)],--r;++r<i;)n=e[r%o],a.shift(),
a.push(n[0]),u.shift(),u.push(n[1]),ki(t,a,u);return t.join("")}function Oi(e,t){
var n=e.length-1;if(n)for(var r,o,i=e[0][0],a=e[0][1],u=e[n][0]-i,s=e[n][1]-a,c=-1;++c<=n;)r=e[c],
o=c/n,r[0]=t*r[0]+(1-t)*(i+o*u),r[1]=t*r[1]+(1-t)*(a+o*s);return Mi(e)}function Ti(e,t){
return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]}function ki(e,t,n){e.push("C",Ti(Os,t),",",Ti(Os,n),",",Ti(Ts,t),",",Ti(Ts,n),",",Ti(ks,t),",",Ti(ks,n));

}function Si(e,t){return(t[1]-e[1])/(t[0]-e[0])}function Pi(e){for(var t=0,n=e.length-1,r=[],o=e[0],i=e[1],a=r[0]=Si(o,i);++t<n;)r[t]=(a+(a=Si(o=i,i=e[t+1])))/2;

return r[t]=a,r}function Ii(e){for(var t,n,r,o,i=[],a=Pi(e),u=-1,s=e.length-1;++u<s;)t=Si(e[u],e[u+1]),
ga(t)<ka?a[u]=a[u+1]=0:(n=a[u]/t,r=a[u+1]/t,o=n*n+r*r,o>9&&(o=3*t/Math.sqrt(o),a[u]=o*n,
a[u+1]=o*r));for(u=-1;++u<=s;)o=(e[Math.min(s,u+1)][0]-e[Math.max(0,u-1)][0])/(6*(1+a[u]*a[u])),
i.push([o||0,a[u]*o||0]);return i}function Ai(e){return e.length<3?mi(e):e[0]+_i(e,Ii(e));

}function ji(e){for(var t,n,r,o=-1,i=e.length;++o<i;)t=e[o],n=t[0],r=t[1]-ja,t[0]=n*Math.cos(r),
t[1]=n*Math.sin(r);return e}function Li(e){function t(t){function s(){g.push("M",u(e(v),p),l,c(e(m.reverse()),p),"Z");

}for(var f,d,h,g=[],m=[],v=[],y=-1,E=t.length,b=De(n),x=De(o),w=n===r?function(){
return d}:De(r),C=o===i?function(){return h}:De(i);++y<E;)a.call(this,f=t[y],y)?(m.push([d=+b.call(this,f,y),h=+x.call(this,f,y)]),
v.push([+w.call(this,f,y),+C.call(this,f,y)])):m.length&&(s(),m=[],v=[]);return m.length&&s(),
g.length?g.join(""):null}var n=On,r=On,o=0,i=Tn,a=Ot,u=mi,s=u.key,c=u,l="L",p=.7;
return t.x=function(e){return arguments.length?(n=r=e,t):r},t.x0=function(e){return arguments.length?(n=e,
t):n},t.x1=function(e){return arguments.length?(r=e,t):r},t.y=function(e){return arguments.length?(o=i=e,
t):i},t.y0=function(e){return arguments.length?(o=e,t):o},t.y1=function(e){return arguments.length?(i=e,
t):i},t.defined=function(e){return arguments.length?(a=e,t):a},t.interpolate=function(e){
return arguments.length?(s="function"==typeof e?u=e:(u=Rs.get(e)||mi).key,c=u.reverse||u,
l=u.closed?"M":"L",t):s},t.tension=function(e){return arguments.length?(p=e,t):p},
t}function Vi(e){return e.radius}function Ui(e){return[e.x,e.y]}function Fi(e){return function(){
var t=e.apply(this,arguments),n=t[0],r=t[1]-ja;return[n*Math.cos(r),n*Math.sin(r)];

}}function qi(){return 64}function Bi(){return"circle"}function Hi(e){var t=Math.sqrt(e/Pa);

return"M0,"+t+"A"+t+","+t+" 0 1,1 0,"+-t+"A"+t+","+t+" 0 1,1 0,"+t+"Z"}function zi(e){
return function(){var t,n;(t=this[e])&&(n=t[t.active])&&(--t.count?delete t[t.active]:delete this[e],
t.active+=.5,n.event&&n.event.interrupt.call(this,this.__data__,n.index))}}function Wi(e,t,n){
return ba(e,Vs),e.namespace=t,e.id=n,e}function Yi(e,t,n,r){var o=e.id,i=e.namespace;

return z(e,"function"==typeof n?function(e,a,u){e[i][o].tween.set(t,r(n.call(e,e.__data__,a,u)));

}:(n=r(n),function(e){e[i][o].tween.set(t,n)}))}function Ki(e){return null==e&&(e=""),
function(){this.textContent=e}}function $i(e){return null==e?"__transition__":"__transition_"+e+"__";

}function Xi(e,t,n,r,o){var i=e[n]||(e[n]={active:0,count:0}),a=i[r];if(!a){var u=o.time;

a=i[r]={tween:new l,time:u,delay:o.delay,duration:o.duration,ease:o.ease,index:t},
o=null,++i.count,ra.timer(function(o){function s(n){if(i.active>r)return l();var o=i[i.active];

o&&(--i.count,delete i[i.active],o.event&&o.event.interrupt.call(e,e.__data__,o.index)),
i.active=r,a.event&&a.event.start.call(e,e.__data__,t),a.tween.forEach(function(n,r){
(r=r.call(e,e.__data__,t))&&g.push(r)}),f=a.ease,p=a.duration,ra.timer(function(){
return h.c=c(n||1)?Ot:c,1},0,u)}function c(n){if(i.active!==r)return 1;for(var o=n/p,u=f(o),s=g.length;s>0;)g[--s].call(e,u);

return o>=1?(a.event&&a.event.end.call(e,e.__data__,t),l()):void 0}function l(){return--i.count?delete i[r]:delete e[n],
1}var p,f,d=a.delay,h=ou,g=[];return h.t=d+u,o>=d?s(o-d):void(h.c=s)},0,u)}}function Gi(e,t,n){
e.attr("transform",function(e){var r=t(e);return"translate("+(isFinite(r)?r:n(e))+",0)";

})}function Qi(e,t,n){e.attr("transform",function(e){var r=t(e);return"translate(0,"+(isFinite(r)?r:n(e))+")";

})}function Zi(e){return e.toISOString()}function Ji(e,t,n){function r(t){return e(t);

}function o(e,n){var r=e[1]-e[0],o=r/n,i=ra.bisect(Ks,o);return i==Ks.length?[t.year,$o(e.map(function(e){
return e/31536e6}),n)[2]]:i?t[o/Ks[i-1]<Ks[i]/o?i-1:i]:[Gs,$o(e,n)[2]]}return r.invert=function(t){
return ea(e.invert(t))},r.domain=function(t){return arguments.length?(e.domain(t),
r):e.domain().map(ea)},r.nice=function(e,t){function n(n){return!isNaN(n)&&!e.range(n,ea(+n+1),t).length;

}var i=r.domain(),a=Uo(i),u=null==e?o(a,10):"number"==typeof e&&o(a,e);return u&&(e=u[0],
t=u[1]),r.domain(Bo(i,t>1?{floor:function(t){for(;n(t=e.floor(t));)t=ea(t-1);return t;

},ceil:function(t){for(;n(t=e.ceil(t));)t=ea(+t+1);return t}}:e))},r.ticks=function(e,t){
var n=Uo(r.domain()),i=null==e?o(n,10):"number"==typeof e?o(n,e):!e.range&&[{range:e
},t];return i&&(e=i[0],t=i[1]),e.range(n[0],ea(+n[1]+1),1>t?1:t)},r.tickFormat=function(){
return n},r.copy=function(){return Ji(e.copy(),t,n)},Yo(r,e)}function ea(e){return new Date(e);

}function ta(e){return JSON.parse(e.responseText)}function na(e){var t=aa.createRange();

return t.selectNode(aa.body),t.createContextualFragment(e.responseText)}var ra={version:"3.5.6"
},oa=[].slice,ia=function(e){return oa.call(e)},aa=this.document;if(aa)try{ia(aa.documentElement.childNodes)[0].nodeType;

}catch(ua){ia=function(e){for(var t=e.length,n=new Array(t);t--;)n[t]=e[t];return n;

}}if(Date.now||(Date.now=function(){return+new Date}),aa)try{aa.createElement("DIV").style.setProperty("opacity",0,"");

}catch(sa){var ca=this.Element.prototype,la=ca.setAttribute,pa=ca.setAttributeNS,fa=this.CSSStyleDeclaration.prototype,da=fa.setProperty;

ca.setAttribute=function(e,t){la.call(this,e,t+"")},ca.setAttributeNS=function(e,t,n){
pa.call(this,e,t,n+"")},fa.setProperty=function(e,t,n){da.call(this,e,t+"",n)}}ra.ascending=r,
ra.descending=function(e,t){return e>t?-1:t>e?1:t>=e?0:0/0},ra.min=function(e,t){
var n,r,o=-1,i=e.length;if(1===arguments.length){for(;++o<i;)if(null!=(r=e[o])&&r>=r){
n=r;break}for(;++o<i;)null!=(r=e[o])&&n>r&&(n=r)}else{for(;++o<i;)if(null!=(r=t.call(e,e[o],o))&&r>=r){
n=r;break}for(;++o<i;)null!=(r=t.call(e,e[o],o))&&n>r&&(n=r)}return n},ra.max=function(e,t){
var n,r,o=-1,i=e.length;if(1===arguments.length){for(;++o<i;)if(null!=(r=e[o])&&r>=r){
n=r;break}for(;++o<i;)null!=(r=e[o])&&r>n&&(n=r)}else{for(;++o<i;)if(null!=(r=t.call(e,e[o],o))&&r>=r){
n=r;break}for(;++o<i;)null!=(r=t.call(e,e[o],o))&&r>n&&(n=r)}return n},ra.extent=function(e,t){
var n,r,o,i=-1,a=e.length;if(1===arguments.length){for(;++i<a;)if(null!=(r=e[i])&&r>=r){
n=o=r;break}for(;++i<a;)null!=(r=e[i])&&(n>r&&(n=r),r>o&&(o=r))}else{for(;++i<a;)if(null!=(r=t.call(e,e[i],i))&&r>=r){
n=o=r;break}for(;++i<a;)null!=(r=t.call(e,e[i],i))&&(n>r&&(n=r),r>o&&(o=r))}return[n,o];

},ra.sum=function(e,t){var n,r=0,o=e.length,a=-1;if(1===arguments.length)for(;++a<o;)i(n=+e[a])&&(r+=n);
else for(;++a<o;)i(n=+t.call(e,e[a],a))&&(r+=n);return r},ra.mean=function(e,t){var n,r=0,a=e.length,u=-1,s=a;

if(1===arguments.length)for(;++u<a;)i(n=o(e[u]))?r+=n:--s;else for(;++u<a;)i(n=o(t.call(e,e[u],u)))?r+=n:--s;

return s?r/s:void 0},ra.quantile=function(e,t){var n=(e.length-1)*t+1,r=Math.floor(n),o=+e[r-1],i=n-r;

return i?o+i*(e[r]-o):o},ra.median=function(e,t){var n,a=[],u=e.length,s=-1;if(1===arguments.length)for(;++s<u;)i(n=o(e[s]))&&a.push(n);
else for(;++s<u;)i(n=o(t.call(e,e[s],s)))&&a.push(n);return a.length?ra.quantile(a.sort(r),.5):void 0;

},ra.variance=function(e,t){var n,r,a=e.length,u=0,s=0,c=-1,l=0;if(1===arguments.length)for(;++c<a;)i(n=o(e[c]))&&(r=n-u,
u+=r/++l,s+=r*(n-u));else for(;++c<a;)i(n=o(t.call(e,e[c],c)))&&(r=n-u,u+=r/++l,s+=r*(n-u));

return l>1?s/(l-1):void 0},ra.deviation=function(){var e=ra.variance.apply(this,arguments);

return e?Math.sqrt(e):e};var ha=a(r);ra.bisectLeft=ha.left,ra.bisect=ra.bisectRight=ha.right,
ra.bisector=function(e){return a(1===e.length?function(t,n){return r(e(t),n)}:e)},
ra.shuffle=function(e,t,n){(i=arguments.length)<3&&(n=e.length,2>i&&(t=0));for(var r,o,i=n-t;i;)o=Math.random()*i--|0,
r=e[i+t],e[i+t]=e[o+t],e[o+t]=r;return e},ra.permute=function(e,t){for(var n=t.length,r=new Array(n);n--;)r[n]=e[t[n]];

return r},ra.pairs=function(e){for(var t,n=0,r=e.length-1,o=e[0],i=new Array(0>r?0:r);r>n;)i[n]=[t=o,o=e[++n]];

return i},ra.zip=function(){if(!(r=arguments.length))return[];for(var e=-1,t=ra.min(arguments,u),n=new Array(t);++e<t;)for(var r,o=-1,i=n[e]=new Array(r);++o<r;)i[o]=arguments[o][e];

return n},ra.transpose=function(e){return ra.zip.apply(ra,e)},ra.keys=function(e){
var t=[];for(var n in e)t.push(n);return t},ra.values=function(e){var t=[];for(var n in e)t.push(e[n]);

return t},ra.entries=function(e){var t=[];for(var n in e)t.push({key:n,value:e[n]
});return t},ra.merge=function(e){for(var t,n,r,o=e.length,i=-1,a=0;++i<o;)a+=e[i].length;

for(n=new Array(a);--o>=0;)for(r=e[o],t=r.length;--t>=0;)n[--a]=r[t];return n};var ga=Math.abs;

ra.range=function(e,t,n){if(arguments.length<3&&(n=1,arguments.length<2&&(t=e,e=0)),
(t-e)/n===1/0)throw new Error("infinite range");var r,o=[],i=s(ga(n)),a=-1;if(e*=i,
t*=i,n*=i,0>n)for(;(r=e+n*++a)>t;)o.push(r/i);else for(;(r=e+n*++a)<t;)o.push(r/i);

return o},ra.map=function(e,t){var n=new l;if(e instanceof l)e.forEach(function(e,t){
n.set(e,t)});else if(Array.isArray(e)){var r,o=-1,i=e.length;if(1===arguments.length)for(;++o<i;)n.set(o,e[o]);
else for(;++o<i;)n.set(t.call(e,r=e[o],o),r)}else for(var a in e)n.set(a,e[a]);return n;

};var ma="__proto__",va="\x00";c(l,{has:d,get:function(e){return this._[p(e)]},set:function(e,t){
return this._[p(e)]=t},remove:h,keys:g,values:function(){var e=[];for(var t in this._)e.push(this._[t]);

return e},entries:function(){var e=[];for(var t in this._)e.push({key:f(t),value:this._[t]
});return e},size:m,empty:v,forEach:function(e){for(var t in this._)e.call(this,f(t),this._[t]);

}}),ra.nest=function(){function e(t,a,u){if(u>=i.length)return r?r.call(o,a):n?a.sort(n):a;

for(var s,c,p,f,d=-1,h=a.length,g=i[u++],m=new l;++d<h;)(f=m.get(s=g(c=a[d])))?f.push(c):m.set(s,[c]);

return t?(c=t(),p=function(n,r){c.set(n,e(t,r,u))}):(c={},p=function(n,r){c[n]=e(t,r,u);

}),m.forEach(p),c}function t(e,n){if(n>=i.length)return e;var r=[],o=a[n++];return e.forEach(function(e,o){
r.push({key:e,values:t(o,n)})}),o?r.sort(function(e,t){return o(e.key,t.key)}):r}
var n,r,o={},i=[],a=[];return o.map=function(t,n){return e(n,t,0)},o.entries=function(n){
return t(e(ra.map,n,0),0)},o.key=function(e){return i.push(e),o},o.sortKeys=function(e){
return a[i.length-1]=e,o},o.sortValues=function(e){return n=e,o},o.rollup=function(e){
return r=e,o},o},ra.set=function(e){var t=new y;if(e)for(var n=0,r=e.length;r>n;++n)t.add(e[n]);

return t},c(y,{has:d,add:function(e){return this._[p(e+="")]=!0,e},remove:h,values:g,
size:m,empty:v,forEach:function(e){for(var t in this._)e.call(this,f(t))}}),ra.behavior={},
ra.rebind=function(e,t){for(var n,r=1,o=arguments.length;++r<o;)e[n=arguments[r]]=b(e,t,t[n]);

return e};var ya=["webkit","ms","moz","Moz","o","O"];ra.dispatch=function(){for(var e=new C,t=-1,n=arguments.length;++t<n;)e[arguments[t]]=_(e);

return e},C.prototype.on=function(e,t){var n=e.indexOf("."),r="";if(n>=0&&(r=e.slice(n+1),
e=e.slice(0,n)),e)return arguments.length<2?this[e].on(r):this[e].on(r,t);if(2===arguments.length){
if(null==t)for(e in this)this.hasOwnProperty(e)&&this[e].on(r,null);return this}},
ra.event=null,ra.requote=function(e){return e.replace(Ea,"\\$&")};var Ea=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,ba={}.__proto__?function(e,t){
e.__proto__=t}:function(e,t){for(var n in t)e[n]=t[n]},xa=function(e,t){return t.querySelector(e);

},wa=function(e,t){return t.querySelectorAll(e)},Ca=function(e,t){var n=e.matches||e[x(e,"matchesSelector")];

return(Ca=function(e,t){return n.call(e,t)})(e,t)};"function"==typeof Sizzle&&(xa=function(e,t){
return Sizzle(e,t)[0]||null},wa=Sizzle,Ca=Sizzle.matchesSelector),ra.selection=function(){
return ra.select(aa.documentElement)};var _a=ra.selection.prototype=[];_a.select=function(e){
var t,n,r,o,i=[];e=O(e);for(var a=-1,u=this.length;++a<u;){i.push(t=[]),t.parentNode=(r=this[a]).parentNode;

for(var s=-1,c=r.length;++s<c;)(o=r[s])?(t.push(n=e.call(o,o.__data__,s,a)),n&&"__data__"in o&&(n.__data__=o.__data__)):t.push(null);

}return R(i)},_a.selectAll=function(e){var t,n,r=[];e=T(e);for(var o=-1,i=this.length;++o<i;)for(var a=this[o],u=-1,s=a.length;++u<s;)(n=a[u])&&(r.push(t=ia(e.call(n,n.__data__,u,o))),
t.parentNode=n);return R(r)};var Na={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",
xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"
};ra.ns={prefix:Na,qualify:function(e){var t=e.indexOf(":"),n=e;return t>=0&&(n=e.slice(0,t),
e=e.slice(t+1)),Na.hasOwnProperty(n)?{space:Na[n],local:e}:e}},_a.attr=function(e,t){
if(arguments.length<2){if("string"==typeof e){var n=this.node();return e=ra.ns.qualify(e),
e.local?n.getAttributeNS(e.space,e.local):n.getAttribute(e)}for(t in e)this.each(k(t,e[t]));

return this}return this.each(k(e,t))},_a.classed=function(e,t){if(arguments.length<2){
if("string"==typeof e){var n=this.node(),r=(e=I(e)).length,o=-1;if(t=n.classList){
for(;++o<r;)if(!t.contains(e[o]))return!1}else for(t=n.getAttribute("class");++o<r;)if(!P(e[o]).test(t))return!1;

return!0}for(t in e)this.each(A(t,e[t]));return this}return this.each(A(e,t))},_a.style=function(e,t,r){
var o=arguments.length;if(3>o){if("string"!=typeof e){2>o&&(t="");for(r in e)this.each(L(r,e[r],t));

return this}if(2>o){var i=this.node();return n(i).getComputedStyle(i,null).getPropertyValue(e);

}r=""}return this.each(L(e,t,r))},_a.property=function(e,t){if(arguments.length<2){
if("string"==typeof e)return this.node()[e];for(t in e)this.each(V(t,e[t]));return this;

}return this.each(V(e,t))},_a.text=function(e){return arguments.length?this.each("function"==typeof e?function(){
var t=e.apply(this,arguments);this.textContent=null==t?"":t}:null==e?function(){this.textContent="";

}:function(){this.textContent=e}):this.node().textContent},_a.html=function(e){return arguments.length?this.each("function"==typeof e?function(){
var t=e.apply(this,arguments);this.innerHTML=null==t?"":t}:null==e?function(){this.innerHTML="";

}:function(){this.innerHTML=e}):this.node().innerHTML},_a.append=function(e){return e=U(e),
this.select(function(){return this.appendChild(e.apply(this,arguments))})},_a.insert=function(e,t){
return e=U(e),t=O(t),this.select(function(){return this.insertBefore(e.apply(this,arguments),t.apply(this,arguments)||null);

})},_a.remove=function(){return this.each(F)},_a.data=function(e,t){function n(e,n){
var r,o,i,a=e.length,p=n.length,f=Math.min(a,p),d=new Array(p),h=new Array(p),g=new Array(a);

if(t){var m,v=new l,y=new Array(a);for(r=-1;++r<a;)v.has(m=t.call(o=e[r],o.__data__,r))?g[r]=o:v.set(m,o),
y[r]=m;for(r=-1;++r<p;)(o=v.get(m=t.call(n,i=n[r],r)))?o!==!0&&(d[r]=o,o.__data__=i):h[r]=q(i),
v.set(m,!0);for(r=-1;++r<a;)v.get(y[r])!==!0&&(g[r]=e[r])}else{for(r=-1;++r<f;)o=e[r],
i=n[r],o?(o.__data__=i,d[r]=o):h[r]=q(i);for(;p>r;++r)h[r]=q(n[r]);for(;a>r;++r)g[r]=e[r];

}h.update=d,h.parentNode=d.parentNode=g.parentNode=e.parentNode,u.push(h),s.push(d),
c.push(g)}var r,o,i=-1,a=this.length;if(!arguments.length){for(e=new Array(a=(r=this[0]).length);++i<a;)(o=r[i])&&(e[i]=o.__data__);

return e}var u=W([]),s=R([]),c=R([]);if("function"==typeof e)for(;++i<a;)n(r=this[i],e.call(r,r.parentNode.__data__,i));
else for(;++i<a;)n(r=this[i],e);return s.enter=function(){return u},s.exit=function(){
return c},s},_a.datum=function(e){return arguments.length?this.property("__data__",e):this.property("__data__");

},_a.filter=function(e){var t,n,r,o=[];"function"!=typeof e&&(e=B(e));for(var i=0,a=this.length;a>i;i++){
o.push(t=[]),t.parentNode=(n=this[i]).parentNode;for(var u=0,s=n.length;s>u;u++)(r=n[u])&&e.call(r,r.__data__,u,i)&&t.push(r);

}return R(o)},_a.order=function(){for(var e=-1,t=this.length;++e<t;)for(var n,r=this[e],o=r.length-1,i=r[o];--o>=0;)(n=r[o])&&(i&&i!==n.nextSibling&&i.parentNode.insertBefore(n,i),
i=n);return this},_a.sort=function(e){e=H.apply(this,arguments);for(var t=-1,n=this.length;++t<n;)this[t].sort(e);

return this.order()},_a.each=function(e){return z(this,function(t,n,r){e.call(t,t.__data__,n,r);

})},_a.call=function(e){var t=ia(arguments);return e.apply(t[0]=this,t),this},_a.empty=function(){
return!this.node()},_a.node=function(){for(var e=0,t=this.length;t>e;e++)for(var n=this[e],r=0,o=n.length;o>r;r++){
var i=n[r];if(i)return i}return null},_a.size=function(){var e=0;return z(this,function(){
++e}),e};var Ma=[];ra.selection.enter=W,ra.selection.enter.prototype=Ma,Ma.append=_a.append,
Ma.empty=_a.empty,Ma.node=_a.node,Ma.call=_a.call,Ma.size=_a.size,Ma.select=function(e){
for(var t,n,r,o,i,a=[],u=-1,s=this.length;++u<s;){r=(o=this[u]).update,a.push(t=[]),
t.parentNode=o.parentNode;for(var c=-1,l=o.length;++c<l;)(i=o[c])?(t.push(r[c]=n=e.call(o.parentNode,i.__data__,c,u)),
n.__data__=i.__data__):t.push(null)}return R(a)},Ma.insert=function(e,t){return arguments.length<2&&(t=Y(this)),
_a.insert.call(this,e,t)},ra.select=function(t){var n;return"string"==typeof t?(n=[xa(t,aa)],
n.parentNode=aa.documentElement):(n=[t],n.parentNode=e(t)),R([n])},ra.selectAll=function(e){
var t;return"string"==typeof e?(t=ia(wa(e,aa)),t.parentNode=aa.documentElement):(t=e,
t.parentNode=null),R([t])},_a.on=function(e,t,n){var r=arguments.length;if(3>r){if("string"!=typeof e){
2>r&&(t=!1);for(n in e)this.each(K(n,e[n],t));return this}if(2>r)return(r=this.node()["__on"+e])&&r._;

n=!1}return this.each(K(e,t,n))};var Da=ra.map({mouseenter:"mouseover",mouseleave:"mouseout"
});aa&&Da.forEach(function(e){"on"+e in aa&&Da.remove(e)});var Ra,Oa=0;ra.mouse=function(e){
return Q(e,M())};var Ta=this.navigator&&/WebKit/.test(this.navigator.userAgent)?-1:0;

ra.touch=function(e,t,n){if(arguments.length<3&&(n=t,t=M().changedTouches),t)for(var r,o=0,i=t.length;i>o;++o)if((r=t[o]).identifier===n)return Q(e,r);

},ra.behavior.drag=function(){function e(){this.on("mousedown.drag",i).on("touchstart.drag",a);

}function t(e,t,n,i,a){return function(){function u(){var e,n,r=t(f,g);r&&(e=r[0]-E[0],
n=r[1]-E[1],h|=e|n,E=r,d({type:"drag",x:r[0]+c[0],y:r[1]+c[1],dx:e,dy:n}))}function s(){
t(f,g)&&(v.on(i+m,null).on(a+m,null),y(h&&ra.event.target===p),d({type:"dragend"}));

}var c,l=this,p=ra.event.target,f=l.parentNode,d=r.of(l,arguments),h=0,g=e(),m=".drag"+(null==g?"":"-"+g),v=ra.select(n(p)).on(i+m,u).on(a+m,s),y=G(p),E=t(f,g);

o?(c=o.apply(l,arguments),c=[c.x-E[0],c.y-E[1]]):c=[0,0],d({type:"dragstart"})}}var r=D(e,"drag","dragstart","dragend"),o=null,i=t(w,ra.mouse,n,"mousemove","mouseup"),a=t(Z,ra.touch,E,"touchmove","touchend");

return e.origin=function(t){return arguments.length?(o=t,e):o},ra.rebind(e,r,"on");

},ra.touches=function(e,t){return arguments.length<2&&(t=M().touches),t?ia(t).map(function(t){
var n=Q(e,t);return n.identifier=t.identifier,n}):[]};var ka=1e-6,Sa=ka*ka,Pa=Math.PI,Ia=2*Pa,Aa=Ia-ka,ja=Pa/2,La=Pa/180,Va=180/Pa,Ua=Math.SQRT2,Fa=2,qa=4;

ra.interpolateZoom=function(e,t){function n(e){var t=e*y;if(v){var n=oe(g),a=i/(Fa*f)*(n*ie(Ua*t+g)-re(g));

return[r+a*c,o+a*l,i*n/oe(Ua*t+g)]}return[r+e*c,o+e*l,i*Math.exp(Ua*t)]}var r=e[0],o=e[1],i=e[2],a=t[0],u=t[1],s=t[2],c=a-r,l=u-o,p=c*c+l*l,f=Math.sqrt(p),d=(s*s-i*i+qa*p)/(2*i*Fa*f),h=(s*s-i*i-qa*p)/(2*s*Fa*f),g=Math.log(Math.sqrt(d*d+1)-d),m=Math.log(Math.sqrt(h*h+1)-h),v=m-g,y=(v||Math.log(s/i))/Ua;

return n.duration=1e3*y,n},ra.behavior.zoom=function(){function e(e){e.on(k,p).on(Ha+".zoom",d).on("dblclick.zoom",h).on(I,f);

}function t(e){return[(e[0]-_.x)/_.k,(e[1]-_.y)/_.k]}function r(e){return[e[0]*_.k+_.x,e[1]*_.k+_.y];

}function o(e){_.k=Math.max(R[0],Math.min(R[1],e))}function i(e,t){t=r(t),_.x+=e[0]-t[0],
_.y+=e[1]-t[1]}function a(t,n,r,a){t.__chart__={x:_.x,y:_.y,k:_.k},o(Math.pow(2,a)),
i(m=n,r),t=ra.select(t),O>0&&(t=t.transition().duration(O)),t.call(e.event)}function u(){
x&&x.domain(b.range().map(function(e){return(e-_.x)/_.k}).map(b.invert)),C&&C.domain(w.range().map(function(e){
return(e-_.y)/_.k}).map(w.invert))}function s(e){T++||e({type:"zoomstart"})}function c(e){
u(),e({type:"zoom",scale:_.k,translate:[_.x,_.y]})}function l(e){--T||(e({type:"zoomend"
}),m=null)}function p(){function e(){p=1,i(ra.mouse(o),d),c(u)}function r(){f.on(S,null).on(P,null),
h(p&&ra.event.target===a),l(u)}var o=this,a=ra.event.target,u=A.of(o,arguments),p=0,f=ra.select(n(o)).on(S,e).on(P,r),d=t(ra.mouse(o)),h=G(o);

Ls.call(o),s(u)}function f(){function e(){var e=ra.touches(h);return d=_.k,e.forEach(function(e){
e.identifier in m&&(m[e.identifier]=t(e))}),e}function n(){var t=ra.event.target;
ra.select(t).on(b,r).on(x,u),w.push(t);for(var n=ra.event.changedTouches,o=0,i=n.length;i>o;++o)m[n[o].identifier]=null;

var s=e(),c=Date.now();if(1===s.length){if(500>c-E){var l=s[0];a(h,l,m[l.identifier],Math.floor(Math.log(_.k)/Math.LN2)+1),
N()}E=c}else if(s.length>1){var l=s[0],p=s[1],f=l[0]-p[0],d=l[1]-p[1];v=f*f+d*d}}
function r(){var e,t,n,r,a=ra.touches(h);Ls.call(h);for(var u=0,s=a.length;s>u;++u,
r=null)if(n=a[u],r=m[n.identifier]){if(t)break;e=n,t=r}if(r){var l=(l=n[0]-e[0])*l+(l=n[1]-e[1])*l,p=v&&Math.sqrt(l/v);

e=[(e[0]+n[0])/2,(e[1]+n[1])/2],t=[(t[0]+r[0])/2,(t[1]+r[1])/2],o(p*d)}E=null,i(e,t),
c(g)}function u(){if(ra.event.touches.length){for(var t=ra.event.changedTouches,n=0,r=t.length;r>n;++n)delete m[t[n].identifier];

for(var o in m)return void e()}ra.selectAll(w).on(y,null),C.on(k,p).on(I,f),M(),l(g);

}var d,h=this,g=A.of(h,arguments),m={},v=0,y=".zoom-"+ra.event.changedTouches[0].identifier,b="touchmove"+y,x="touchend"+y,w=[],C=ra.select(h),M=G(h);

n(),s(g),C.on(k,null).on(I,n)}function d(){var e=A.of(this,arguments);y?clearTimeout(y):(Ls.call(this),
g=t(m=v||ra.mouse(this)),s(e)),y=setTimeout(function(){y=null,l(e)},50),N(),o(Math.pow(2,.002*Ba())*_.k),
i(m,g),c(e)}function h(){var e=ra.mouse(this),n=Math.log(_.k)/Math.LN2;a(this,e,t(e),ra.event.shiftKey?Math.ceil(n)-1:Math.floor(n)+1);

}var g,m,v,y,E,b,x,w,C,_={x:0,y:0,k:1},M=[960,500],R=za,O=250,T=0,k="mousedown.zoom",S="mousemove.zoom",P="mouseup.zoom",I="touchstart.zoom",A=D(e,"zoomstart","zoom","zoomend");

return Ha||(Ha="onwheel"in aa?(Ba=function(){return-ra.event.deltaY*(ra.event.deltaMode?120:1);

},"wheel"):"onmousewheel"in aa?(Ba=function(){return ra.event.wheelDelta},"mousewheel"):(Ba=function(){
return-ra.event.detail},"MozMousePixelScroll")),e.event=function(e){e.each(function(){
var e=A.of(this,arguments),t=_;As?ra.select(this).transition().each("start.zoom",function(){
_=this.__chart__||{x:0,y:0,k:1},s(e)}).tween("zoom:zoom",function(){var n=M[0],r=M[1],o=m?m[0]:n/2,i=m?m[1]:r/2,a=ra.interpolateZoom([(o-_.x)/_.k,(i-_.y)/_.k,n/_.k],[(o-t.x)/t.k,(i-t.y)/t.k,n/t.k]);

return function(t){var r=a(t),u=n/r[2];this.__chart__=_={x:o-r[0]*u,y:i-r[1]*u,k:u
},c(e)}}).each("interrupt.zoom",function(){l(e)}).each("end.zoom",function(){l(e);

}):(this.__chart__=_,s(e),c(e),l(e))})},e.translate=function(t){return arguments.length?(_={
x:+t[0],y:+t[1],k:_.k},u(),e):[_.x,_.y]},e.scale=function(t){return arguments.length?(_={
x:_.x,y:_.y,k:+t},u(),e):_.k},e.scaleExtent=function(t){return arguments.length?(R=null==t?za:[+t[0],+t[1]],
e):R},e.center=function(t){return arguments.length?(v=t&&[+t[0],+t[1]],e):v},e.size=function(t){
return arguments.length?(M=t&&[+t[0],+t[1]],e):M},e.duration=function(t){return arguments.length?(O=+t,
e):O},e.x=function(t){return arguments.length?(x=t,b=t.copy(),_={x:0,y:0,k:1},e):x;

},e.y=function(t){return arguments.length?(C=t,w=t.copy(),_={x:0,y:0,k:1},e):C},ra.rebind(e,A,"on");

};var Ba,Ha,za=[0,1/0];ra.color=ue,ue.prototype.toString=function(){return this.rgb()+"";

},ra.hsl=se;var Wa=se.prototype=new ue;Wa.brighter=function(e){return e=Math.pow(.7,arguments.length?e:1),
new se(this.h,this.s,this.l/e)},Wa.darker=function(e){return e=Math.pow(.7,arguments.length?e:1),
new se(this.h,this.s,e*this.l)},Wa.rgb=function(){return ce(this.h,this.s,this.l);

},ra.hcl=le;var Ya=le.prototype=new ue;Ya.brighter=function(e){return new le(this.h,this.c,Math.min(100,this.l+Ka*(arguments.length?e:1)));

},Ya.darker=function(e){return new le(this.h,this.c,Math.max(0,this.l-Ka*(arguments.length?e:1)));

},Ya.rgb=function(){return pe(this.h,this.c,this.l).rgb()},ra.lab=fe;var Ka=18,$a=.95047,Xa=1,Ga=1.08883,Qa=fe.prototype=new ue;

Qa.brighter=function(e){return new fe(Math.min(100,this.l+Ka*(arguments.length?e:1)),this.a,this.b);

},Qa.darker=function(e){return new fe(Math.max(0,this.l-Ka*(arguments.length?e:1)),this.a,this.b);

},Qa.rgb=function(){return de(this.l,this.a,this.b)},ra.rgb=ye;var Za=ye.prototype=new ue;

Za.brighter=function(e){e=Math.pow(.7,arguments.length?e:1);var t=this.r,n=this.g,r=this.b,o=30;

return t||n||r?(t&&o>t&&(t=o),n&&o>n&&(n=o),r&&o>r&&(r=o),new ye(Math.min(255,t/e),Math.min(255,n/e),Math.min(255,r/e))):new ye(o,o,o);

},Za.darker=function(e){return e=Math.pow(.7,arguments.length?e:1),new ye(e*this.r,e*this.g,e*this.b);

},Za.hsl=function(){return Ce(this.r,this.g,this.b)},Za.toString=function(){return"#"+xe(this.r)+xe(this.g)+xe(this.b);

};var Ja=ra.map({aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,
azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,
blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,
chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,
cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,
darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,
darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,
darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,
deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,
firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,
ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,
grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,
ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,
lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,
lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,
lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,
lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,
magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,
mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,
mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,
mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,
olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,
palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,
papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,
powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,
royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,
seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,
slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,
tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,
wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074
});Ja.forEach(function(e,t){Ja.set(e,Ee(t))}),ra.functor=De,ra.xhr=Re(E),ra.dsv=function(e,t){
function n(e,n,i){arguments.length<3&&(i=n,n=null);var a=Oe(e,t,null==n?r:o(n),i);

return a.row=function(e){return arguments.length?a.response(null==(n=e)?r:o(e)):n;

},a}function r(e){return n.parse(e.responseText)}function o(e){return function(t){
return n.parse(t.responseText,e)}}function i(t){return t.map(a).join(e)}function a(e){
return u.test(e)?'"'+e.replace(/\"/g,'""')+'"':e}var u=new RegExp('["'+e+"\n]"),s=e.charCodeAt(0);

return n.parse=function(e,t){var r;return n.parseRows(e,function(e,n){if(r)return r(e,n-1);

var o=new Function("d","return {"+e.map(function(e,t){return JSON.stringify(e)+": d["+t+"]";

}).join(",")+"}");r=t?function(e,n){return t(o(e),n)}:o})},n.parseRows=function(e,t){
function n(){if(l>=c)return a;if(o)return o=!1,i;var t=l;if(34===e.charCodeAt(t)){
for(var n=t;n++<c;)if(34===e.charCodeAt(n)){if(34!==e.charCodeAt(n+1))break;++n}l=n+2;

var r=e.charCodeAt(n+1);return 13===r?(o=!0,10===e.charCodeAt(n+2)&&++l):10===r&&(o=!0),
e.slice(t+1,n).replace(/""/g,'"')}for(;c>l;){var r=e.charCodeAt(l++),u=1;if(10===r)o=!0;
else if(13===r)o=!0,10===e.charCodeAt(l)&&(++l,++u);else if(r!==s)continue;return e.slice(t,l-u);

}return e.slice(t)}for(var r,o,i={},a={},u=[],c=e.length,l=0,p=0;(r=n())!==a;){for(var f=[];r!==i&&r!==a;)f.push(r),
r=n();t&&null==(f=t(f,p++))||u.push(f)}return u},n.format=function(t){if(Array.isArray(t[0]))return n.formatRows(t);

var r=new y,o=[];return t.forEach(function(e){for(var t in e)r.has(t)||o.push(r.add(t));

}),[o.map(a).join(e)].concat(t.map(function(t){return o.map(function(e){return a(t[e]);

}).join(e)})).join("\n")},n.formatRows=function(e){return e.map(i).join("\n")},n},
ra.csv=ra.dsv(",","text/csv"),ra.tsv=ra.dsv("	","text/tab-separated-values");var eu,tu,nu,ru,ou,iu=this[x(this,"requestAnimationFrame")]||function(e){
setTimeout(e,17)};ra.timer=function(e,t,n){var r=arguments.length;2>r&&(t=0),3>r&&(n=Date.now());

var o=n+t,i={c:e,t:o,f:!1,n:null};tu?tu.n=i:eu=i,tu=i,nu||(ru=clearTimeout(ru),nu=1,
iu(Se))},ra.timer.flush=function(){Pe(),Ie()},ra.round=function(e,t){return t?Math.round(e*(t=Math.pow(10,t)))/t:Math.round(e);

};var au=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"].map(je);

ra.formatPrefix=function(e,t){var n=0;return e&&(0>e&&(e*=-1),t&&(e=ra.round(e,Ae(e,t))),
n=1+Math.floor(1e-12+Math.log(e)/Math.LN10),n=Math.max(-24,Math.min(24,3*Math.floor((n-1)/3)))),
au[8+n/3]};var uu=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,su=ra.map({
b:function(e){return e.toString(2)},c:function(e){return String.fromCharCode(e)},
o:function(e){return e.toString(8)},x:function(e){return e.toString(16)},X:function(e){
return e.toString(16).toUpperCase()},g:function(e,t){return e.toPrecision(t)},e:function(e,t){
return e.toExponential(t)},f:function(e,t){return e.toFixed(t)},r:function(e,t){return(e=ra.round(e,Ae(e,t))).toFixed(Math.max(0,Math.min(20,Ae(e*(1+1e-15),t))));

}}),cu=ra.time={},lu=Date;Ue.prototype={getDate:function(){return this._.getUTCDate();

},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear();

},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds();

},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth();

},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime();

},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf();

},setDate:function(){pu.setUTCDate.apply(this._,arguments)},setDay:function(){pu.setUTCDay.apply(this._,arguments);

},setFullYear:function(){pu.setUTCFullYear.apply(this._,arguments)},setHours:function(){
pu.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){pu.setUTCMilliseconds.apply(this._,arguments);

},setMinutes:function(){pu.setUTCMinutes.apply(this._,arguments)},setMonth:function(){
pu.setUTCMonth.apply(this._,arguments)},setSeconds:function(){pu.setUTCSeconds.apply(this._,arguments);

},setTime:function(){pu.setTime.apply(this._,arguments)}};var pu=Date.prototype;cu.year=Fe(function(e){
return e=cu.day(e),e.setMonth(0,1),e},function(e,t){e.setFullYear(e.getFullYear()+t);

},function(e){return e.getFullYear()}),cu.years=cu.year.range,cu.years.utc=cu.year.utc.range,
cu.day=Fe(function(e){var t=new lu(2e3,0);return t.setFullYear(e.getFullYear(),e.getMonth(),e.getDate()),
t},function(e,t){e.setDate(e.getDate()+t)},function(e){return e.getDate()-1}),cu.days=cu.day.range,
cu.days.utc=cu.day.utc.range,cu.dayOfYear=function(e){var t=cu.year(e);return Math.floor((e-t-6e4*(e.getTimezoneOffset()-t.getTimezoneOffset()))/864e5);

},["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].forEach(function(e,t){
t=7-t;var n=cu[e]=Fe(function(e){return(e=cu.day(e)).setDate(e.getDate()-(e.getDay()+t)%7),
e},function(e,t){e.setDate(e.getDate()+7*Math.floor(t))},function(e){var n=cu.year(e).getDay();

return Math.floor((cu.dayOfYear(e)+(n+t)%7)/7)-(n!==t)});cu[e+"s"]=n.range,cu[e+"s"].utc=n.utc.range,
cu[e+"OfYear"]=function(e){var n=cu.year(e).getDay();return Math.floor((cu.dayOfYear(e)+(n+t)%7)/7);

}}),cu.week=cu.sunday,cu.weeks=cu.sunday.range,cu.weeks.utc=cu.sunday.utc.range,cu.weekOfYear=cu.sundayOfYear;

var fu={"-":"",_:" ",0:"0"},du=/^\s*\d+/,hu=/^%/;ra.locale=function(e){return{numberFormat:Le(e),
timeFormat:Be(e)}};var gu=ra.locale({decimal:".",thousands:",",grouping:[3],currency:["$",""],
dateTime:"%a %b %e %X %Y",date:"%m/%d/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],
shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
});ra.format=gu.numberFormat,ra.geo={},ct.prototype={s:0,t:0,add:function(e){lt(e,this.t,mu),
lt(mu.s,this.s,this),this.s?this.t+=mu.t:this.s=mu.t},reset:function(){this.s=this.t=0;

},valueOf:function(){return this.s}};var mu=new ct;ra.geo.stream=function(e,t){e&&vu.hasOwnProperty(e.type)?vu[e.type](e,t):pt(e,t);

};var vu={Feature:function(e,t){pt(e.geometry,t)},FeatureCollection:function(e,t){
for(var n=e.features,r=-1,o=n.length;++r<o;)pt(n[r].geometry,t)}},yu={Sphere:function(e,t){
t.sphere()},Point:function(e,t){e=e.coordinates,t.point(e[0],e[1],e[2])},MultiPoint:function(e,t){
for(var n=e.coordinates,r=-1,o=n.length;++r<o;)e=n[r],t.point(e[0],e[1],e[2])},LineString:function(e,t){
ft(e.coordinates,t,0)},MultiLineString:function(e,t){for(var n=e.coordinates,r=-1,o=n.length;++r<o;)ft(n[r],t,0);

},Polygon:function(e,t){dt(e.coordinates,t)},MultiPolygon:function(e,t){for(var n=e.coordinates,r=-1,o=n.length;++r<o;)dt(n[r],t);

},GeometryCollection:function(e,t){for(var n=e.geometries,r=-1,o=n.length;++r<o;)pt(n[r],t);

}};ra.geo.area=function(e){return Eu=0,ra.geo.stream(e,xu),Eu};var Eu,bu=new ct,xu={
sphere:function(){Eu+=4*Pa},point:w,lineStart:w,lineEnd:w,polygonStart:function(){
bu.reset(),xu.lineStart=ht},polygonEnd:function(){var e=2*bu;Eu+=0>e?4*Pa+e:e,xu.lineStart=xu.lineEnd=xu.point=w;

}};ra.geo.bounds=function(){function e(e,t){E.push(b=[l=e,f=e]),p>t&&(p=t),t>d&&(d=t);

}function t(t,n){var r=gt([t*La,n*La]);if(v){var o=vt(v,r),i=[o[1],-o[0],0],a=vt(i,o);

bt(a),a=xt(a);var s=t-h,c=s>0?1:-1,g=a[0]*Va*c,m=ga(s)>180;if(m^(g>c*h&&c*t>g)){var y=a[1]*Va;

y>d&&(d=y)}else if(g=(g+360)%360-180,m^(g>c*h&&c*t>g)){var y=-a[1]*Va;p>y&&(p=y)}else p>n&&(p=n),
n>d&&(d=n);m?h>t?u(l,t)>u(l,f)&&(f=t):u(t,f)>u(l,f)&&(l=t):f>=l?(l>t&&(l=t),t>f&&(f=t)):t>h?u(l,t)>u(l,f)&&(f=t):u(t,f)>u(l,f)&&(l=t);

}else e(t,n);v=r,h=t}function n(){x.point=t}function r(){b[0]=l,b[1]=f,x.point=e,
v=null}function o(e,n){if(v){var r=e-h;y+=ga(r)>180?r+(r>0?360:-360):r}else g=e,m=n;

xu.point(e,n),t(e,n)}function i(){xu.lineStart()}function a(){o(g,m),xu.lineEnd(),
ga(y)>ka&&(l=-(f=180)),b[0]=l,b[1]=f,v=null}function u(e,t){return(t-=e)<0?t+360:t;

}function s(e,t){return e[0]-t[0]}function c(e,t){return t[0]<=t[1]?t[0]<=e&&e<=t[1]:e<t[0]||t[1]<e;

}var l,p,f,d,h,g,m,v,y,E,b,x={point:e,lineStart:n,lineEnd:r,polygonStart:function(){
x.point=o,x.lineStart=i,x.lineEnd=a,y=0,xu.polygonStart()},polygonEnd:function(){
xu.polygonEnd(),x.point=e,x.lineStart=n,x.lineEnd=r,0>bu?(l=-(f=180),p=-(d=90)):y>ka?d=90:-ka>y&&(p=-90),
b[0]=l,b[1]=f}};return function(e){d=f=-(l=p=1/0),E=[],ra.geo.stream(e,x);var t=E.length;

if(t){E.sort(s);for(var n,r=1,o=E[0],i=[o];t>r;++r)n=E[r],c(n[0],o)||c(n[1],o)?(u(o[0],n[1])>u(o[0],o[1])&&(o[1]=n[1]),
u(n[0],o[1])>u(o[0],o[1])&&(o[0]=n[0])):i.push(o=n);for(var a,n,h=-(1/0),t=i.length-1,r=0,o=i[t];t>=r;o=n,
++r)n=i[r],(a=u(o[1],n[0]))>h&&(h=a,l=n[0],f=o[1])}return E=b=null,l===1/0||p===1/0?[[0/0,0/0],[0/0,0/0]]:[[l,p],[f,d]];

}}(),ra.geo.centroid=function(e){wu=Cu=_u=Nu=Mu=Du=Ru=Ou=Tu=ku=Su=0,ra.geo.stream(e,Pu);

var t=Tu,n=ku,r=Su,o=t*t+n*n+r*r;return Sa>o&&(t=Du,n=Ru,r=Ou,ka>Cu&&(t=_u,n=Nu,r=Mu),
o=t*t+n*n+r*r,Sa>o)?[0/0,0/0]:[Math.atan2(n,t)*Va,ne(r/Math.sqrt(o))*Va]};var wu,Cu,_u,Nu,Mu,Du,Ru,Ou,Tu,ku,Su,Pu={
sphere:w,point:Ct,lineStart:Nt,lineEnd:Mt,polygonStart:function(){Pu.lineStart=Dt;

},polygonEnd:function(){Pu.lineStart=Nt}},Iu=Pt(Ot,Lt,Ut,[-Pa,-Pa/2]),Au=1e9;ra.geo.clipExtent=function(){
var e,t,n,r,o,i,a={stream:function(e){return o&&(o.valid=!1),o=i(e),o.valid=!0,o},
extent:function(u){return arguments.length?(i=Ht(e=+u[0][0],t=+u[0][1],n=+u[1][0],r=+u[1][1]),
o&&(o.valid=!1,o=null),a):[[e,t],[n,r]]}};return a.extent([[0,0],[960,500]])},(ra.geo.conicEqualArea=function(){
return zt(Wt)}).raw=Wt,ra.geo.albers=function(){return ra.geo.conicEqualArea().rotate([96,0]).center([-.6,38.7]).parallels([29.5,45.5]).scale(1070);

},ra.geo.albersUsa=function(){function e(e){var i=e[0],a=e[1];return t=null,n(i,a),
t||(r(i,a),t)||o(i,a),t}var t,n,r,o,i=ra.geo.albers(),a=ra.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),u=ra.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),s={
point:function(e,n){t=[e,n]}};return e.invert=function(e){var t=i.scale(),n=i.translate(),r=(e[0]-n[0])/t,o=(e[1]-n[1])/t;

return(o>=.12&&.234>o&&r>=-.425&&-.214>r?a:o>=.166&&.234>o&&r>=-.214&&-.115>r?u:i).invert(e);

},e.stream=function(e){var t=i.stream(e),n=a.stream(e),r=u.stream(e);return{point:function(e,o){
t.point(e,o),n.point(e,o),r.point(e,o)},sphere:function(){t.sphere(),n.sphere(),r.sphere();

},lineStart:function(){t.lineStart(),n.lineStart(),r.lineStart()},lineEnd:function(){
t.lineEnd(),n.lineEnd(),r.lineEnd()},polygonStart:function(){t.polygonStart(),n.polygonStart(),
r.polygonStart()},polygonEnd:function(){t.polygonEnd(),n.polygonEnd(),r.polygonEnd();

}}},e.precision=function(t){return arguments.length?(i.precision(t),a.precision(t),
u.precision(t),e):i.precision()},e.scale=function(t){return arguments.length?(i.scale(t),
a.scale(.35*t),u.scale(t),e.translate(i.translate())):i.scale()},e.translate=function(t){
if(!arguments.length)return i.translate();var c=i.scale(),l=+t[0],p=+t[1];return n=i.translate(t).clipExtent([[l-.455*c,p-.238*c],[l+.455*c,p+.238*c]]).stream(s).point,
r=a.translate([l-.307*c,p+.201*c]).clipExtent([[l-.425*c+ka,p+.12*c+ka],[l-.214*c-ka,p+.234*c-ka]]).stream(s).point,
o=u.translate([l-.205*c,p+.212*c]).clipExtent([[l-.214*c+ka,p+.166*c+ka],[l-.115*c-ka,p+.234*c-ka]]).stream(s).point,
e},e.scale(1070)};var ju,Lu,Vu,Uu,Fu,qu,Bu={point:w,lineStart:w,lineEnd:w,polygonStart:function(){
Lu=0,Bu.lineStart=Yt},polygonEnd:function(){Bu.lineStart=Bu.lineEnd=Bu.point=w,ju+=ga(Lu/2);

}},Hu={point:Kt,lineStart:w,lineEnd:w,polygonStart:w,polygonEnd:w},zu={point:Gt,lineStart:Qt,
lineEnd:Zt,polygonStart:function(){zu.lineStart=Jt},polygonEnd:function(){zu.point=Gt,
zu.lineStart=Qt,zu.lineEnd=Zt}};ra.geo.path=function(){function e(e){return e&&("function"==typeof u&&i.pointRadius(+u.apply(this,arguments)),
a&&a.valid||(a=o(i)),ra.geo.stream(e,a)),i.result()}function t(){return a=null,e}
var n,r,o,i,a,u=4.5;return e.area=function(e){return ju=0,ra.geo.stream(e,o(Bu)),
ju},e.centroid=function(e){return _u=Nu=Mu=Du=Ru=Ou=Tu=ku=Su=0,ra.geo.stream(e,o(zu)),
Su?[Tu/Su,ku/Su]:Ou?[Du/Ou,Ru/Ou]:Mu?[_u/Mu,Nu/Mu]:[0/0,0/0]},e.bounds=function(e){
return Fu=qu=-(Vu=Uu=1/0),ra.geo.stream(e,o(Hu)),[[Vu,Uu],[Fu,qu]]},e.projection=function(e){
return arguments.length?(o=(n=e)?e.stream||nn(e):E,t()):n},e.context=function(e){
return arguments.length?(i=null==(r=e)?new $t:new en(e),"function"!=typeof u&&i.pointRadius(u),
t()):r},e.pointRadius=function(t){return arguments.length?(u="function"==typeof t?t:(i.pointRadius(+t),
+t),e):u},e.projection(ra.geo.albersUsa()).context(null)},ra.geo.transform=function(e){
return{stream:function(t){var n=new rn(t);for(var r in e)n[r]=e[r];return n}}},rn.prototype={
point:function(e,t){this.stream.point(e,t)},sphere:function(){this.stream.sphere();

},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd();

},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd();

}},ra.geo.projection=an,ra.geo.projectionMutator=un,(ra.geo.equirectangular=function(){
return an(cn)}).raw=cn.invert=cn,ra.geo.rotation=function(e){function t(t){return t=e(t[0]*La,t[1]*La),
t[0]*=Va,t[1]*=Va,t}return e=pn(e[0]%360*La,e[1]*La,e.length>2?e[2]*La:0),t.invert=function(t){
return t=e.invert(t[0]*La,t[1]*La),t[0]*=Va,t[1]*=Va,t},t},ln.invert=cn,ra.geo.circle=function(){
function e(){var e="function"==typeof r?r.apply(this,arguments):r,t=pn(-e[0]*La,-e[1]*La,0).invert,o=[];

return n(null,null,1,{point:function(e,n){o.push(e=t(e,n)),e[0]*=Va,e[1]*=Va}}),{
type:"Polygon",coordinates:[o]}}var t,n,r=[0,0],o=6;return e.origin=function(t){return arguments.length?(r=t,
e):r},e.angle=function(r){return arguments.length?(n=gn((t=+r)*La,o*La),e):t},e.precision=function(r){
return arguments.length?(n=gn(t*La,(o=+r)*La),e):o},e.angle(90)},ra.geo.distance=function(e,t){
var n,r=(t[0]-e[0])*La,o=e[1]*La,i=t[1]*La,a=Math.sin(r),u=Math.cos(r),s=Math.sin(o),c=Math.cos(o),l=Math.sin(i),p=Math.cos(i);

return Math.atan2(Math.sqrt((n=p*a)*n+(n=c*l-s*p*u)*n),s*l+c*p*u)},ra.geo.graticule=function(){
function e(){return{type:"MultiLineString",coordinates:t()}}function t(){return ra.range(Math.ceil(i/m)*m,o,m).map(f).concat(ra.range(Math.ceil(c/v)*v,s,v).map(d)).concat(ra.range(Math.ceil(r/h)*h,n,h).filter(function(e){
return ga(e%m)>ka}).map(l)).concat(ra.range(Math.ceil(u/g)*g,a,g).filter(function(e){
return ga(e%v)>ka}).map(p))}var n,r,o,i,a,u,s,c,l,p,f,d,h=10,g=h,m=90,v=360,y=2.5;

return e.lines=function(){return t().map(function(e){return{type:"LineString",coordinates:e
}})},e.outline=function(){return{type:"Polygon",coordinates:[f(i).concat(d(s).slice(1),f(o).reverse().slice(1),d(c).reverse().slice(1))]
}},e.extent=function(t){return arguments.length?e.majorExtent(t).minorExtent(t):e.minorExtent();

},e.majorExtent=function(t){return arguments.length?(i=+t[0][0],o=+t[1][0],c=+t[0][1],
s=+t[1][1],i>o&&(t=i,i=o,o=t),c>s&&(t=c,c=s,s=t),e.precision(y)):[[i,c],[o,s]]},e.minorExtent=function(t){
return arguments.length?(r=+t[0][0],n=+t[1][0],u=+t[0][1],a=+t[1][1],r>n&&(t=r,r=n,
n=t),u>a&&(t=u,u=a,a=t),e.precision(y)):[[r,u],[n,a]]},e.step=function(t){return arguments.length?e.majorStep(t).minorStep(t):e.minorStep();

},e.majorStep=function(t){return arguments.length?(m=+t[0],v=+t[1],e):[m,v]},e.minorStep=function(t){
return arguments.length?(h=+t[0],g=+t[1],e):[h,g]},e.precision=function(t){return arguments.length?(y=+t,
l=vn(u,a,90),p=yn(r,n,y),f=vn(c,s,90),d=yn(i,o,y),e):y},e.majorExtent([[-180,-90+ka],[180,90-ka]]).minorExtent([[-180,-80-ka],[180,80+ka]]);

},ra.geo.greatArc=function(){function e(){return{type:"LineString",coordinates:[t||r.apply(this,arguments),n||o.apply(this,arguments)]
}}var t,n,r=En,o=bn;return e.distance=function(){return ra.geo.distance(t||r.apply(this,arguments),n||o.apply(this,arguments));

},e.source=function(n){return arguments.length?(r=n,t="function"==typeof n?null:n,
e):r},e.target=function(t){return arguments.length?(o=t,n="function"==typeof t?null:t,
e):o},e.precision=function(){return arguments.length?e:0},e},ra.geo.interpolate=function(e,t){
return xn(e[0]*La,e[1]*La,t[0]*La,t[1]*La)},ra.geo.length=function(e){return Wu=0,
ra.geo.stream(e,Yu),Wu};var Wu,Yu={sphere:w,point:w,lineStart:wn,lineEnd:w,polygonStart:w,
polygonEnd:w},Ku=Cn(function(e){return Math.sqrt(2/(1+e))},function(e){return 2*Math.asin(e/2);

});(ra.geo.azimuthalEqualArea=function(){return an(Ku)}).raw=Ku;var $u=Cn(function(e){
var t=Math.acos(e);return t&&t/Math.sin(t)},E);(ra.geo.azimuthalEquidistant=function(){
return an($u)}).raw=$u,(ra.geo.conicConformal=function(){return zt(_n)}).raw=_n,(ra.geo.conicEquidistant=function(){
return zt(Nn)}).raw=Nn;var Xu=Cn(function(e){return 1/e},Math.atan);(ra.geo.gnomonic=function(){
return an(Xu)}).raw=Xu,Mn.invert=function(e,t){return[e,2*Math.atan(Math.exp(t))-ja];

},(ra.geo.mercator=function(){return Dn(Mn)}).raw=Mn;var Gu=Cn(function(){return 1;

},Math.asin);(ra.geo.orthographic=function(){return an(Gu)}).raw=Gu;var Qu=Cn(function(e){
return 1/(1+e)},function(e){return 2*Math.atan(e)});(ra.geo.stereographic=function(){
return an(Qu)}).raw=Qu,Rn.invert=function(e,t){return[-t,2*Math.atan(Math.exp(e))-ja];

},(ra.geo.transverseMercator=function(){var e=Dn(Rn),t=e.center,n=e.rotate;return e.center=function(e){
return e?t([-e[1],e[0]]):(e=t(),[e[1],-e[0]])},e.rotate=function(e){return e?n([e[0],e[1],e.length>2?e[2]+90:90]):(e=n(),
[e[0],e[1],e[2]-90])},n([0,0,90])}).raw=Rn,ra.geom={},ra.geom.hull=function(e){function t(e){
if(e.length<3)return[];var t,o=De(n),i=De(r),a=e.length,u=[],s=[];for(t=0;a>t;t++)u.push([+o.call(this,e[t],t),+i.call(this,e[t],t),t]);

for(u.sort(Sn),t=0;a>t;t++)s.push([u[t][0],-u[t][1]]);var c=kn(u),l=kn(s),p=l[0]===c[0],f=l[l.length-1]===c[c.length-1],d=[];

for(t=c.length-1;t>=0;--t)d.push(e[u[c[t]][2]]);for(t=+p;t<l.length-f;++t)d.push(e[u[l[t]][2]]);

return d}var n=On,r=Tn;return arguments.length?t(e):(t.x=function(e){return arguments.length?(n=e,
t):n},t.y=function(e){return arguments.length?(r=e,t):r},t)},ra.geom.polygon=function(e){
return ba(e,Zu),e};var Zu=ra.geom.polygon.prototype=[];Zu.area=function(){for(var e,t=-1,n=this.length,r=this[n-1],o=0;++t<n;)e=r,
r=this[t],o+=e[1]*r[0]-e[0]*r[1];return.5*o},Zu.centroid=function(e){var t,n,r=-1,o=this.length,i=0,a=0,u=this[o-1];

for(arguments.length||(e=-1/(6*this.area()));++r<o;)t=u,u=this[r],n=t[0]*u[1]-u[0]*t[1],
i+=(t[0]+u[0])*n,a+=(t[1]+u[1])*n;return[i*e,a*e]},Zu.clip=function(e){for(var t,n,r,o,i,a,u=An(e),s=-1,c=this.length-An(this),l=this[c-1];++s<c;){
for(t=e.slice(),e.length=0,o=this[s],i=t[(r=t.length-u)-1],n=-1;++n<r;)a=t[n],Pn(a,l,o)?(Pn(i,l,o)||e.push(In(i,a,l,o)),
e.push(a)):Pn(i,l,o)&&e.push(In(i,a,l,o)),i=a;u&&e.push(e[0]),l=o}return e};var Ju,es,ts,ns,rs,os=[],is=[];

Hn.prototype.prepare=function(){for(var e,t=this.edges,n=t.length;n--;)e=t[n].edge,
e.b&&e.a||t.splice(n,1);return t.sort(Wn),t.length},tr.prototype={start:function(){
return this.edge.l===this.site?this.edge.a:this.edge.b},end:function(){return this.edge.l===this.site?this.edge.b:this.edge.a;

}},nr.prototype={insert:function(e,t){var n,r,o;if(e){if(t.P=e,t.N=e.N,e.N&&(e.N.P=t),
e.N=t,e.R){for(e=e.R;e.L;)e=e.L;e.L=t}else e.R=t;n=e}else this._?(e=ar(this._),t.P=null,
t.N=e,e.P=e.L=t,n=e):(t.P=t.N=null,this._=t,n=null);for(t.L=t.R=null,t.U=n,t.C=!0,
e=t;n&&n.C;)r=n.U,n===r.L?(o=r.R,o&&o.C?(n.C=o.C=!1,r.C=!0,e=r):(e===n.R&&(or(this,n),
e=n,n=e.U),n.C=!1,r.C=!0,ir(this,r))):(o=r.L,o&&o.C?(n.C=o.C=!1,r.C=!0,e=r):(e===n.L&&(ir(this,n),
e=n,n=e.U),n.C=!1,r.C=!0,or(this,r))),n=e.U;this._.C=!1},remove:function(e){e.N&&(e.N.P=e.P),
e.P&&(e.P.N=e.N),e.N=e.P=null;var t,n,r,o=e.U,i=e.L,a=e.R;if(n=i?a?ar(a):i:a,o?o.L===e?o.L=n:o.R=n:this._=n,
i&&a?(r=n.C,n.C=e.C,n.L=i,i.U=n,n!==a?(o=n.U,n.U=e.U,e=n.R,o.L=e,n.R=a,a.U=n):(n.U=o,
o=n,e=n.R)):(r=e.C,e=n),e&&(e.U=o),!r){if(e&&e.C)return void(e.C=!1);do{if(e===this._)break;

if(e===o.L){if(t=o.R,t.C&&(t.C=!1,o.C=!0,or(this,o),t=o.R),t.L&&t.L.C||t.R&&t.R.C){
t.R&&t.R.C||(t.L.C=!1,t.C=!0,ir(this,t),t=o.R),t.C=o.C,o.C=t.R.C=!1,or(this,o),e=this._;

break}}else if(t=o.L,t.C&&(t.C=!1,o.C=!0,ir(this,o),t=o.L),t.L&&t.L.C||t.R&&t.R.C){
t.L&&t.L.C||(t.R.C=!1,t.C=!0,or(this,t),t=o.L),t.C=o.C,o.C=t.L.C=!1,ir(this,o),e=this._;

break}t.C=!0,e=o,o=o.U}while(!e.C);e&&(e.C=!1)}}},ra.geom.voronoi=function(e){function t(e){
var t=new Array(e.length),r=u[0][0],o=u[0][1],i=u[1][0],a=u[1][1];return ur(n(e),u).cells.forEach(function(n,u){
var s=n.edges,c=n.site,l=t[u]=s.length?s.map(function(e){var t=e.start();return[t.x,t.y];

}):c.x>=r&&c.x<=i&&c.y>=o&&c.y<=a?[[r,a],[i,a],[i,o],[r,o]]:[];l.point=e[u]}),t}function n(e){
return e.map(function(e,t){return{x:Math.round(i(e,t)/ka)*ka,y:Math.round(a(e,t)/ka)*ka,
i:t}})}var r=On,o=Tn,i=r,a=o,u=as;return e?t(e):(t.links=function(e){return ur(n(e)).edges.filter(function(e){
return e.l&&e.r}).map(function(t){return{source:e[t.l.i],target:e[t.r.i]}})},t.triangles=function(e){
var t=[];return ur(n(e)).cells.forEach(function(n,r){for(var o,i,a=n.site,u=n.edges.sort(Wn),s=-1,c=u.length,l=u[c-1].edge,p=l.l===a?l.r:l.l;++s<c;)o=l,
i=p,l=u[s].edge,p=l.l===a?l.r:l.l,r<i.i&&r<p.i&&cr(a,i,p)<0&&t.push([e[r],e[i.i],e[p.i]]);

}),t},t.x=function(e){return arguments.length?(i=De(r=e),t):r},t.y=function(e){return arguments.length?(a=De(o=e),
t):o},t.clipExtent=function(e){return arguments.length?(u=null==e?as:e,t):u===as?null:u;

},t.size=function(e){return arguments.length?t.clipExtent(e&&[[0,0],e]):u===as?null:u&&u[1];

},t)};var as=[[-1e6,-1e6],[1e6,1e6]];ra.geom.delaunay=function(e){return ra.geom.voronoi().triangles(e);

},ra.geom.quadtree=function(e,t,n,r,o){function i(e){function i(e,t,n,r,o,i,a,u){
if(!isNaN(n)&&!isNaN(r))if(e.leaf){var s=e.x,l=e.y;if(null!=s)if(ga(s-n)+ga(l-r)<.01)c(e,t,n,r,o,i,a,u);
else{var p=e.point;e.x=e.y=e.point=null,c(e,p,s,l,o,i,a,u),c(e,t,n,r,o,i,a,u)}else e.x=n,
e.y=r,e.point=t}else c(e,t,n,r,o,i,a,u)}function c(e,t,n,r,o,a,u,s){var c=.5*(o+u),l=.5*(a+s),p=n>=c,f=r>=l,d=f<<1|p;

e.leaf=!1,e=e.nodes[d]||(e.nodes[d]=fr()),p?o=c:u=c,f?a=l:s=l,i(e,t,n,r,o,a,u,s)}
var l,p,f,d,h,g,m,v,y,E=De(u),b=De(s);if(null!=t)g=t,m=n,v=r,y=o;else if(v=y=-(g=m=1/0),
p=[],f=[],h=e.length,a)for(d=0;h>d;++d)l=e[d],l.x<g&&(g=l.x),l.y<m&&(m=l.y),l.x>v&&(v=l.x),
l.y>y&&(y=l.y),p.push(l.x),f.push(l.y);else for(d=0;h>d;++d){var x=+E(l=e[d],d),w=+b(l,d);

g>x&&(g=x),m>w&&(m=w),x>v&&(v=x),w>y&&(y=w),p.push(x),f.push(w)}var C=v-g,_=y-m;C>_?y=m+C:v=g+_;

var N=fr();if(N.add=function(e){i(N,e,+E(e,++d),+b(e,d),g,m,v,y)},N.visit=function(e){
dr(e,N,g,m,v,y)},N.find=function(e){return hr(N,e[0],e[1],g,m,v,y)},d=-1,null==t){
for(;++d<h;)i(N,e[d],p[d],f[d],g,m,v,y);--d}else e.forEach(N.add);return p=f=e=l=null,
N}var a,u=On,s=Tn;return(a=arguments.length)?(u=lr,s=pr,3===a&&(o=n,r=t,n=t=0),i(e)):(i.x=function(e){
return arguments.length?(u=e,i):u},i.y=function(e){return arguments.length?(s=e,i):s;

},i.extent=function(e){return arguments.length?(null==e?t=n=r=o=null:(t=+e[0][0],
n=+e[0][1],r=+e[1][0],o=+e[1][1]),i):null==t?null:[[t,n],[r,o]]},i.size=function(e){
return arguments.length?(null==e?t=n=r=o=null:(t=n=0,r=+e[0],o=+e[1]),i):null==t?null:[r-t,o-n];

},i)},ra.interpolateRgb=gr,ra.interpolateObject=mr,ra.interpolateNumber=vr,ra.interpolateString=yr;

var us=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,ss=new RegExp(us.source,"g");

ra.interpolate=Er,ra.interpolators=[function(e,t){var n=typeof t;return("string"===n?Ja.has(t.toLowerCase())||/^(#|rgb\(|hsl\()/i.test(t)?gr:yr:t instanceof ue?gr:Array.isArray(t)?br:"object"===n&&isNaN(t)?mr:vr)(e,t);

}],ra.interpolateArray=br;var cs=function(){return E},ls=ra.map({linear:cs,poly:Dr,
quad:function(){return _r},cubic:function(){return Nr},sin:function(){return Rr},
exp:function(){return Or},circle:function(){return Tr},elastic:kr,back:Sr,bounce:function(){
return Pr}}),ps=ra.map({"in":E,out:wr,"in-out":Cr,"out-in":function(e){return Cr(wr(e));

}});ra.ease=function(e){var t=e.indexOf("-"),n=t>=0?e.slice(0,t):e,r=t>=0?e.slice(t+1):"in";

return n=ls.get(n)||cs,r=ps.get(r)||E,xr(r(n.apply(null,oa.call(arguments,1))))},
ra.interpolateHcl=Ir,ra.interpolateHsl=Ar,ra.interpolateLab=jr,ra.interpolateRound=Lr,
ra.transform=function(e){var t=aa.createElementNS(ra.ns.prefix.svg,"g");return(ra.transform=function(e){
if(null!=e){t.setAttribute("transform",e);var n=t.transform.baseVal.consolidate();

}return new Vr(n?n.matrix:fs)})(e)},Vr.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")";

};var fs={a:1,b:0,c:0,d:1,e:0,f:0};ra.interpolateTransform=Br,ra.layout={},ra.layout.bundle=function(){
return function(e){for(var t=[],n=-1,r=e.length;++n<r;)t.push(Wr(e[n]));return t};

},ra.layout.chord=function(){function e(){var e,c,p,f,d,h={},g=[],m=ra.range(i),v=[];

for(n=[],r=[],e=0,f=-1;++f<i;){for(c=0,d=-1;++d<i;)c+=o[f][d];g.push(c),v.push(ra.range(i)),
e+=c}for(a&&m.sort(function(e,t){return a(g[e],g[t])}),u&&v.forEach(function(e,t){
e.sort(function(e,n){return u(o[t][e],o[t][n])})}),e=(Ia-l*i)/e,c=0,f=-1;++f<i;){
for(p=c,d=-1;++d<i;){var y=m[f],E=v[y][d],b=o[y][E],x=c,w=c+=b*e;h[y+"-"+E]={index:y,
subindex:E,startAngle:x,endAngle:w,value:b}}r[y]={index:y,startAngle:p,endAngle:c,
value:(c-p)/e},c+=l}for(f=-1;++f<i;)for(d=f-1;++d<i;){var C=h[f+"-"+d],_=h[d+"-"+f];

(C.value||_.value)&&n.push(C.value<_.value?{source:_,target:C}:{source:C,target:_
})}s&&t()}function t(){n.sort(function(e,t){return s((e.source.value+e.target.value)/2,(t.source.value+t.target.value)/2);

})}var n,r,o,i,a,u,s,c={},l=0;return c.matrix=function(e){return arguments.length?(i=(o=e)&&o.length,
n=r=null,c):o},c.padding=function(e){return arguments.length?(l=e,n=r=null,c):l},
c.sortGroups=function(e){return arguments.length?(a=e,n=r=null,c):a},c.sortSubgroups=function(e){
return arguments.length?(u=e,n=null,c):u},c.sortChords=function(e){return arguments.length?(s=e,
n&&t(),c):s},c.chords=function(){return n||e(),n},c.groups=function(){return r||e(),
r},c},ra.layout.force=function(){function e(e){return function(t,n,r,o){if(t.point!==e){
var i=t.cx-e.x,a=t.cy-e.y,u=o-n,s=i*i+a*a;if(s>u*u/m){if(h>s){var c=t.charge/s;e.px-=i*c,
e.py-=a*c}return!0}if(t.point&&s&&h>s){var c=t.pointCharge/s;e.px-=i*c,e.py-=a*c}
}return!t.charge}}function t(e){e.px=ra.event.x,e.py=ra.event.y,u.resume()}var n,r,o,i,a,u={},s=ra.dispatch("start","tick","end"),c=[1,1],l=.9,p=ds,f=hs,d=-30,h=gs,g=.1,m=.64,v=[],y=[];

return u.tick=function(){if((r*=.99)<.005)return s.end({type:"end",alpha:r=0}),!0;

var t,n,u,p,f,h,m,E,b,x=v.length,w=y.length;for(n=0;w>n;++n)u=y[n],p=u.source,f=u.target,
E=f.x-p.x,b=f.y-p.y,(h=E*E+b*b)&&(h=r*i[n]*((h=Math.sqrt(h))-o[n])/h,E*=h,b*=h,f.x-=E*(m=p.weight/(f.weight+p.weight)),
f.y-=b*m,p.x+=E*(m=1-m),p.y+=b*m);if((m=r*g)&&(E=c[0]/2,b=c[1]/2,n=-1,m))for(;++n<x;)u=v[n],
u.x+=(E-u.x)*m,u.y+=(b-u.y)*m;if(d)for(Zr(t=ra.geom.quadtree(v),r,a),n=-1;++n<x;)(u=v[n]).fixed||t.visit(e(u));

for(n=-1;++n<x;)u=v[n],u.fixed?(u.x=u.px,u.y=u.py):(u.x-=(u.px-(u.px=u.x))*l,u.y-=(u.py-(u.py=u.y))*l);

s.tick({type:"tick",alpha:r})},u.nodes=function(e){return arguments.length?(v=e,u):v;

},u.links=function(e){return arguments.length?(y=e,u):y},u.size=function(e){return arguments.length?(c=e,
u):c},u.linkDistance=function(e){return arguments.length?(p="function"==typeof e?e:+e,
u):p},u.distance=u.linkDistance,u.linkStrength=function(e){return arguments.length?(f="function"==typeof e?e:+e,
u):f},u.friction=function(e){return arguments.length?(l=+e,u):l},u.charge=function(e){
return arguments.length?(d="function"==typeof e?e:+e,u):d},u.chargeDistance=function(e){
return arguments.length?(h=e*e,u):Math.sqrt(h)},u.gravity=function(e){return arguments.length?(g=+e,
u):g},u.theta=function(e){return arguments.length?(m=e*e,u):Math.sqrt(m)},u.alpha=function(e){
return arguments.length?(e=+e,r?r=e>0?e:0:e>0&&(s.start({type:"start",alpha:r=e}),
ra.timer(u.tick)),u):r},u.start=function(){function e(e,r){if(!n){for(n=new Array(s),
u=0;s>u;++u)n[u]=[];for(u=0;l>u;++u){var o=y[u];n[o.source.index].push(o.target),
n[o.target.index].push(o.source)}}for(var i,a=n[t],u=-1,c=a.length;++u<c;)if(!isNaN(i=a[u][e]))return i;

return Math.random()*r}var t,n,r,s=v.length,l=y.length,h=c[0],g=c[1];for(t=0;s>t;++t)(r=v[t]).index=t,
r.weight=0;for(t=0;l>t;++t)r=y[t],"number"==typeof r.source&&(r.source=v[r.source]),
"number"==typeof r.target&&(r.target=v[r.target]),++r.source.weight,++r.target.weight;

for(t=0;s>t;++t)r=v[t],isNaN(r.x)&&(r.x=e("x",h)),isNaN(r.y)&&(r.y=e("y",g)),isNaN(r.px)&&(r.px=r.x),
isNaN(r.py)&&(r.py=r.y);if(o=[],"function"==typeof p)for(t=0;l>t;++t)o[t]=+p.call(this,y[t],t);
else for(t=0;l>t;++t)o[t]=p;if(i=[],"function"==typeof f)for(t=0;l>t;++t)i[t]=+f.call(this,y[t],t);
else for(t=0;l>t;++t)i[t]=f;if(a=[],"function"==typeof d)for(t=0;s>t;++t)a[t]=+d.call(this,v[t],t);
else for(t=0;s>t;++t)a[t]=d;return u.resume()},u.resume=function(){return u.alpha(.1);

},u.stop=function(){return u.alpha(0)},u.drag=function(){return n||(n=ra.behavior.drag().origin(E).on("dragstart.force",$r).on("drag.force",t).on("dragend.force",Xr)),
arguments.length?void this.on("mouseover.force",Gr).on("mouseout.force",Qr).call(n):n;

},ra.rebind(u,s,"on")};var ds=20,hs=1,gs=1/0;ra.layout.hierarchy=function(){function e(o){
var i,a=[o],u=[];for(o.depth=0;null!=(i=a.pop());)if(u.push(i),(c=n.call(e,i,i.depth))&&(s=c.length)){
for(var s,c,l;--s>=0;)a.push(l=c[s]),l.parent=i,l.depth=i.depth+1;r&&(i.value=0),
i.children=c}else r&&(i.value=+r.call(e,i,i.depth)||0),delete i.children;return to(o,function(e){
var n,o;t&&(n=e.children)&&n.sort(t),r&&(o=e.parent)&&(o.value+=e.value)}),u}var t=oo,n=no,r=ro;

return e.sort=function(n){return arguments.length?(t=n,e):t},e.children=function(t){
return arguments.length?(n=t,e):n},e.value=function(t){return arguments.length?(r=t,
e):r},e.revalue=function(t){return r&&(eo(t,function(e){e.children&&(e.value=0)}),
to(t,function(t){var n;t.children||(t.value=+r.call(e,t,t.depth)||0),(n=t.parent)&&(n.value+=t.value);

})),t},e},ra.layout.partition=function(){function e(t,n,r,o){var i=t.children;if(t.x=n,
t.y=t.depth*o,t.dx=r,t.dy=o,i&&(a=i.length)){var a,u,s,c=-1;for(r=t.value?r/t.value:0;++c<a;)e(u=i[c],n,s=u.value*r,o),
n+=s}}function t(e){var n=e.children,r=0;if(n&&(o=n.length))for(var o,i=-1;++i<o;)r=Math.max(r,t(n[i]));

return 1+r}function n(n,i){var a=r.call(this,n,i);return e(a[0],0,o[0],o[1]/t(a[0])),
a}var r=ra.layout.hierarchy(),o=[1,1];return n.size=function(e){return arguments.length?(o=e,
n):o},Jr(n,r)},ra.layout.pie=function(){function e(a){var u,s=a.length,c=a.map(function(n,r){
return+t.call(e,n,r)}),l=+("function"==typeof r?r.apply(this,arguments):r),p=("function"==typeof o?o.apply(this,arguments):o)-l,f=Math.min(Math.abs(p)/s,+("function"==typeof i?i.apply(this,arguments):i)),d=f*(0>p?-1:1),h=(p-s*d)/ra.sum(c),g=ra.range(s),m=[];

return null!=n&&g.sort(n===ms?function(e,t){return c[t]-c[e]}:function(e,t){return n(a[e],a[t]);

}),g.forEach(function(e){m[e]={data:a[e],value:u=c[e],startAngle:l,endAngle:l+=u*h+d,
padAngle:f}}),m}var t=Number,n=ms,r=0,o=Ia,i=0;return e.value=function(n){return arguments.length?(t=n,
e):t},e.sort=function(t){return arguments.length?(n=t,e):n},e.startAngle=function(t){
return arguments.length?(r=t,e):r},e.endAngle=function(t){return arguments.length?(o=t,
e):o},e.padAngle=function(t){return arguments.length?(i=t,e):i},e};var ms={};ra.layout.stack=function(){
function e(u,s){if(!(f=u.length))return u;var c=u.map(function(n,r){return t.call(e,n,r);

}),l=c.map(function(t){return t.map(function(t,n){return[i.call(e,t,n),a.call(e,t,n)];

})}),p=n.call(e,l,s);c=ra.permute(c,p),l=ra.permute(l,p);var f,d,h,g,m=r.call(e,l,s),v=c[0].length;

for(h=0;v>h;++h)for(o.call(e,c[0][h],g=m[h],l[0][h][1]),d=1;f>d;++d)o.call(e,c[d][h],g+=l[d-1][h][1],l[d][h][1]);

return u}var t=E,n=co,r=lo,o=so,i=ao,a=uo;return e.values=function(n){return arguments.length?(t=n,
e):t},e.order=function(t){return arguments.length?(n="function"==typeof t?t:vs.get(t)||co,
e):n},e.offset=function(t){return arguments.length?(r="function"==typeof t?t:ys.get(t)||lo,
e):r},e.x=function(t){return arguments.length?(i=t,e):i},e.y=function(t){return arguments.length?(a=t,
e):a},e.out=function(t){return arguments.length?(o=t,e):o},e};var vs=ra.map({"inside-out":function(e){
var t,n,r=e.length,o=e.map(po),i=e.map(fo),a=ra.range(r).sort(function(e,t){return o[e]-o[t];

}),u=0,s=0,c=[],l=[];for(t=0;r>t;++t)n=a[t],s>u?(u+=i[n],c.push(n)):(s+=i[n],l.push(n));

return l.reverse().concat(c)},reverse:function(e){return ra.range(e.length).reverse();

},"default":co}),ys=ra.map({silhouette:function(e){var t,n,r,o=e.length,i=e[0].length,a=[],u=0,s=[];

for(n=0;i>n;++n){for(t=0,r=0;o>t;t++)r+=e[t][n][1];r>u&&(u=r),a.push(r)}for(n=0;i>n;++n)s[n]=(u-a[n])/2;

return s},wiggle:function(e){var t,n,r,o,i,a,u,s,c,l=e.length,p=e[0],f=p.length,d=[];

for(d[0]=s=c=0,n=1;f>n;++n){for(t=0,o=0;l>t;++t)o+=e[t][n][1];for(t=0,i=0,u=p[n][0]-p[n-1][0];l>t;++t){
for(r=0,a=(e[t][n][1]-e[t][n-1][1])/(2*u);t>r;++r)a+=(e[r][n][1]-e[r][n-1][1])/u;
i+=a*e[t][n][1]}d[n]=s-=o?i/o*u:0,c>s&&(c=s)}for(n=0;f>n;++n)d[n]-=c;return d},expand:function(e){
var t,n,r,o=e.length,i=e[0].length,a=1/o,u=[];for(n=0;i>n;++n){for(t=0,r=0;o>t;t++)r+=e[t][n][1];

if(r)for(t=0;o>t;t++)e[t][n][1]/=r;else for(t=0;o>t;t++)e[t][n][1]=a}for(n=0;i>n;++n)u[n]=0;

return u},zero:lo});ra.layout.histogram=function(){function e(e,i){for(var a,u,s=[],c=e.map(n,this),l=r.call(this,c,i),p=o.call(this,l,c,i),i=-1,f=c.length,d=p.length-1,h=t?1:1/f;++i<d;)a=s[i]=[],
a.dx=p[i+1]-(a.x=p[i]),a.y=0;if(d>0)for(i=-1;++i<f;)u=c[i],u>=l[0]&&u<=l[1]&&(a=s[ra.bisect(p,u,1,d)-1],
a.y+=h,a.push(e[i]));return s}var t=!0,n=Number,r=vo,o=go;return e.value=function(t){
return arguments.length?(n=t,e):n},e.range=function(t){return arguments.length?(r=De(t),
e):r},e.bins=function(t){return arguments.length?(o="number"==typeof t?function(e){
return mo(e,t)}:De(t),e):o},e.frequency=function(n){return arguments.length?(t=!!n,
e):t},e},ra.layout.pack=function(){function e(e,i){var a=n.call(this,e,i),u=a[0],s=o[0],c=o[1],l=null==t?Math.sqrt:"function"==typeof t?t:function(){
return t};if(u.x=u.y=0,to(u,function(e){e.r=+l(e.value)}),to(u,wo),r){var p=r*(t?1:Math.max(2*u.r/s,2*u.r/c))/2;

to(u,function(e){e.r+=p}),to(u,wo),to(u,function(e){e.r-=p})}return No(u,s/2,c/2,t?1:1/Math.max(2*u.r/s,2*u.r/c)),
a}var t,n=ra.layout.hierarchy().sort(yo),r=0,o=[1,1];return e.size=function(t){return arguments.length?(o=t,
e):o},e.radius=function(n){return arguments.length?(t=null==n||"function"==typeof n?n:+n,
e):t},e.padding=function(t){return arguments.length?(r=+t,e):r},Jr(e,n)},ra.layout.tree=function(){
function e(e,o){var l=a.call(this,e,o),p=l[0],f=t(p);if(to(f,n),f.parent.m=-f.z,eo(f,r),
c)eo(p,i);else{var d=p,h=p,g=p;eo(p,function(e){e.x<d.x&&(d=e),e.x>h.x&&(h=e),e.depth>g.depth&&(g=e);

});var m=u(d,h)/2-d.x,v=s[0]/(h.x+u(h,d)/2+m),y=s[1]/(g.depth||1);eo(p,function(e){
e.x=(e.x+m)*v,e.y=e.depth*y})}return l}function t(e){for(var t,n={A:null,children:[e]
},r=[n];null!=(t=r.pop());)for(var o,i=t.children,a=0,u=i.length;u>a;++a)r.push((i[a]=o={
_:i[a],parent:t,children:(o=i[a].children)&&o.slice()||[],A:null,a:null,z:0,m:0,c:0,
s:0,t:null,i:a}).a=o);return n.children[0]}function n(e){var t=e.children,n=e.parent.children,r=e.i?n[e.i-1]:null;

if(t.length){ko(e);var i=(t[0].z+t[t.length-1].z)/2;r?(e.z=r.z+u(e._,r._),e.m=e.z-i):e.z=i;

}else r&&(e.z=r.z+u(e._,r._));e.parent.A=o(e,r,e.parent.A||n[0])}function r(e){e._.x=e.z+e.parent.m,
e.m+=e.parent.m}function o(e,t,n){if(t){for(var r,o=e,i=e,a=t,s=o.parent.children[0],c=o.m,l=i.m,p=a.m,f=s.m;a=Oo(a),
o=Ro(o),a&&o;)s=Ro(s),i=Oo(i),i.a=e,r=a.z+p-o.z-c+u(a._,o._),r>0&&(To(So(a,e,n),e,r),
c+=r,l+=r),p+=a.m,c+=o.m,f+=s.m,l+=i.m;a&&!Oo(i)&&(i.t=a,i.m+=p-l),o&&!Ro(s)&&(s.t=o,
s.m+=c-f,n=e)}return n}function i(e){e.x*=s[0],e.y=e.depth*s[1]}var a=ra.layout.hierarchy().sort(null).value(null),u=Do,s=[1,1],c=null;

return e.separation=function(t){return arguments.length?(u=t,e):u},e.size=function(t){
return arguments.length?(c=null==(s=t)?i:null,e):c?null:s},e.nodeSize=function(t){
return arguments.length?(c=null==(s=t)?null:i,e):c?s:null},Jr(e,a)},ra.layout.cluster=function(){
function e(e,i){var a,u=t.call(this,e,i),s=u[0],c=0;to(s,function(e){var t=e.children;

t&&t.length?(e.x=Io(t),e.y=Po(t)):(e.x=a?c+=n(e,a):0,e.y=0,a=e)});var l=Ao(s),p=jo(s),f=l.x-n(l,p)/2,d=p.x+n(p,l)/2;

return to(s,o?function(e){e.x=(e.x-s.x)*r[0],e.y=(s.y-e.y)*r[1]}:function(e){e.x=(e.x-f)/(d-f)*r[0],
e.y=(1-(s.y?e.y/s.y:1))*r[1]}),u}var t=ra.layout.hierarchy().sort(null).value(null),n=Do,r=[1,1],o=!1;

return e.separation=function(t){return arguments.length?(n=t,e):n},e.size=function(t){
return arguments.length?(o=null==(r=t),e):o?null:r},e.nodeSize=function(t){return arguments.length?(o=null!=(r=t),
e):o?r:null},Jr(e,t)},ra.layout.treemap=function(){function e(e,t){for(var n,r,o=-1,i=e.length;++o<i;)r=(n=e[o]).value*(0>t?0:t),
n.area=isNaN(r)||0>=r?0:r}function t(n){var i=n.children;if(i&&i.length){var a,u,s,c=p(n),l=[],f=i.slice(),h=1/0,g="slice"===d?c.dx:"dice"===d?c.dy:"slice-dice"===d?1&n.depth?c.dy:c.dx:Math.min(c.dx,c.dy);

for(e(f,c.dx*c.dy/n.value),l.area=0;(s=f.length)>0;)l.push(a=f[s-1]),l.area+=a.area,
"squarify"!==d||(u=r(l,g))<=h?(f.pop(),h=u):(l.area-=l.pop().area,o(l,g,c,!1),g=Math.min(c.dx,c.dy),
l.length=l.area=0,h=1/0);l.length&&(o(l,g,c,!0),l.length=l.area=0),i.forEach(t)}}
function n(t){var r=t.children;if(r&&r.length){var i,a=p(t),u=r.slice(),s=[];for(e(u,a.dx*a.dy/t.value),
s.area=0;i=u.pop();)s.push(i),s.area+=i.area,null!=i.z&&(o(s,i.z?a.dx:a.dy,a,!u.length),
s.length=s.area=0);r.forEach(n)}}function r(e,t){for(var n,r=e.area,o=0,i=1/0,a=-1,u=e.length;++a<u;)(n=e[a].area)&&(i>n&&(i=n),
n>o&&(o=n));return r*=r,t*=t,r?Math.max(t*o*h/r,r/(t*i*h)):1/0}function o(e,t,n,r){
var o,i=-1,a=e.length,u=n.x,c=n.y,l=t?s(e.area/t):0;if(t==n.dx){for((r||l>n.dy)&&(l=n.dy);++i<a;)o=e[i],
o.x=u,o.y=c,o.dy=l,u+=o.dx=Math.min(n.x+n.dx-u,l?s(o.area/l):0);o.z=!0,o.dx+=n.x+n.dx-u,
n.y+=l,n.dy-=l}else{for((r||l>n.dx)&&(l=n.dx);++i<a;)o=e[i],o.x=u,o.y=c,o.dx=l,c+=o.dy=Math.min(n.y+n.dy-c,l?s(o.area/l):0);

o.z=!1,o.dy+=n.y+n.dy-c,n.x+=l,n.dx-=l}}function i(r){var o=a||u(r),i=o[0];return i.x=0,
i.y=0,i.dx=c[0],i.dy=c[1],a&&u.revalue(i),e([i],i.dx*i.dy/i.value),(a?n:t)(i),f&&(a=o),
o}var a,u=ra.layout.hierarchy(),s=Math.round,c=[1,1],l=null,p=Lo,f=!1,d="squarify",h=.5*(1+Math.sqrt(5));

return i.size=function(e){return arguments.length?(c=e,i):c},i.padding=function(e){
function t(t){var n=e.call(i,t,t.depth);return null==n?Lo(t):Vo(t,"number"==typeof n?[n,n,n,n]:n);

}function n(t){return Vo(t,e)}if(!arguments.length)return l;var r;return p=null==(l=e)?Lo:"function"==(r=typeof e)?t:"number"===r?(e=[e,e,e,e],
n):n,i},i.round=function(e){return arguments.length?(s=e?Math.round:Number,i):s!=Number;

},i.sticky=function(e){return arguments.length?(f=e,a=null,i):f},i.ratio=function(e){
return arguments.length?(h=e,i):h},i.mode=function(e){return arguments.length?(d=e+"",
i):d},Jr(i,u)},ra.random={normal:function(e,t){var n=arguments.length;return 2>n&&(t=1),
1>n&&(e=0),function(){var n,r,o;do n=2*Math.random()-1,r=2*Math.random()-1,o=n*n+r*r;
while(!o||o>1);return e+t*n*Math.sqrt(-2*Math.log(o)/o)}},logNormal:function(){var e=ra.random.normal.apply(ra,arguments);

return function(){return Math.exp(e())}},bates:function(e){var t=ra.random.irwinHall(e);

return function(){return t()/e}},irwinHall:function(e){return function(){for(var t=0,n=0;e>n;n++)t+=Math.random();

return t}}},ra.scale={};var Es={floor:E,ceil:E};ra.scale.linear=function(){return Wo([0,1],[0,1],Er,!1);

};var bs={s:1,g:1,p:1,r:1,e:1};ra.scale.log=function(){return Jo(ra.scale.linear().domain([0,1]),10,!0,[1,10]);

};var xs=ra.format(".0e"),ws={floor:function(e){return-Math.ceil(-e)},ceil:function(e){
return-Math.floor(-e)}};ra.scale.pow=function(){return ei(ra.scale.linear(),1,[0,1]);

},ra.scale.sqrt=function(){return ra.scale.pow().exponent(.5)},ra.scale.ordinal=function(){
return ni([],{t:"range",a:[[]]})},ra.scale.category10=function(){return ra.scale.ordinal().range(Cs);

},ra.scale.category20=function(){return ra.scale.ordinal().range(_s)},ra.scale.category20b=function(){
return ra.scale.ordinal().range(Ns)},ra.scale.category20c=function(){return ra.scale.ordinal().range(Ms);

};var Cs=[2062260,16744206,2924588,14034728,9725885,9197131,14907330,8355711,12369186,1556175].map(be),_s=[2062260,11454440,16744206,16759672,2924588,10018698,14034728,16750742,9725885,12955861,9197131,12885140,14907330,16234194,8355711,13092807,12369186,14408589,1556175,10410725].map(be),Ns=[3750777,5395619,7040719,10264286,6519097,9216594,11915115,13556636,9202993,12426809,15186514,15190932,8666169,11356490,14049643,15177372,8077683,10834324,13528509,14589654].map(be),Ms=[3244733,7057110,10406625,13032431,15095053,16616764,16625259,16634018,3253076,7652470,10607003,13101504,7695281,10394312,12369372,14342891,6513507,9868950,12434877,14277081].map(be);

ra.scale.quantile=function(){return ri([],[])},ra.scale.quantize=function(){return oi(0,1,[0,1]);

},ra.scale.threshold=function(){return ii([.5],[0,1])},ra.scale.identity=function(){
return ai([0,1])},ra.svg={},ra.svg.arc=function(){function e(){var e=Math.max(0,+n.apply(this,arguments)),c=Math.max(0,+r.apply(this,arguments)),l=a.apply(this,arguments)-ja,p=u.apply(this,arguments)-ja,f=Math.abs(p-l),d=l>p?0:1;

if(e>c&&(h=c,c=e,e=h),f>=Aa)return t(c,d)+(e?t(e,1-d):"")+"Z";var h,g,m,v,y,E,b,x,w,C,_,N,M=0,D=0,R=[];

if((v=(+s.apply(this,arguments)||0)/2)&&(m=i===Ds?Math.sqrt(e*e+c*c):+i.apply(this,arguments),
d||(D*=-1),c&&(D=ne(m/c*Math.sin(v))),e&&(M=ne(m/e*Math.sin(v)))),c){y=c*Math.cos(l+D),
E=c*Math.sin(l+D),b=c*Math.cos(p-D),x=c*Math.sin(p-D);var O=Math.abs(p-l-2*D)<=Pa?0:1;

if(D&&di(y,E,b,x)===d^O){var T=(l+p)/2;y=c*Math.cos(T),E=c*Math.sin(T),b=x=null}}else y=E=0;

if(e){w=e*Math.cos(p-M),C=e*Math.sin(p-M),_=e*Math.cos(l+M),N=e*Math.sin(l+M);var k=Math.abs(l-p+2*M)<=Pa?0:1;

if(M&&di(w,C,_,N)===1-d^k){var S=(l+p)/2;w=e*Math.cos(S),C=e*Math.sin(S),_=N=null;

}}else w=C=0;if((h=Math.min(Math.abs(c-e)/2,+o.apply(this,arguments)))>.001){g=c>e^d?0:1;

var P=null==_?[w,C]:null==b?[y,E]:In([y,E],[_,N],[b,x],[w,C]),I=y-P[0],A=E-P[1],j=b-P[0],L=x-P[1],V=1/Math.sin(Math.acos((I*j+A*L)/(Math.sqrt(I*I+A*A)*Math.sqrt(j*j+L*L)))/2),U=Math.sqrt(P[0]*P[0]+P[1]*P[1]);

if(null!=b){var F=Math.min(h,(c-U)/(V+1)),q=hi(null==_?[w,C]:[_,N],[y,E],c,F,d),B=hi([b,x],[w,C],c,F,d);

h===F?R.push("M",q[0],"A",F,",",F," 0 0,",g," ",q[1],"A",c,",",c," 0 ",1-d^di(q[1][0],q[1][1],B[1][0],B[1][1]),",",d," ",B[1],"A",F,",",F," 0 0,",g," ",B[0]):R.push("M",q[0],"A",F,",",F," 0 1,",g," ",B[0]);

}else R.push("M",y,",",E);if(null!=_){var H=Math.min(h,(e-U)/(V-1)),z=hi([y,E],[_,N],e,-H,d),W=hi([w,C],null==b?[y,E]:[b,x],e,-H,d);

h===H?R.push("L",W[0],"A",H,",",H," 0 0,",g," ",W[1],"A",e,",",e," 0 ",d^di(W[1][0],W[1][1],z[1][0],z[1][1]),",",1-d," ",z[1],"A",H,",",H," 0 0,",g," ",z[0]):R.push("L",W[0],"A",H,",",H," 0 0,",g," ",z[0]);

}else R.push("L",w,",",C)}else R.push("M",y,",",E),null!=b&&R.push("A",c,",",c," 0 ",O,",",d," ",b,",",x),
R.push("L",w,",",C),null!=_&&R.push("A",e,",",e," 0 ",k,",",1-d," ",_,",",N);return R.push("Z"),
R.join("")}function t(e,t){return"M0,"+e+"A"+e+","+e+" 0 1,"+t+" 0,"+-e+"A"+e+","+e+" 0 1,"+t+" 0,"+e;

}var n=si,r=ci,o=ui,i=Ds,a=li,u=pi,s=fi;return e.innerRadius=function(t){return arguments.length?(n=De(t),
e):n},e.outerRadius=function(t){return arguments.length?(r=De(t),e):r},e.cornerRadius=function(t){
return arguments.length?(o=De(t),e):o},e.padRadius=function(t){return arguments.length?(i=t==Ds?Ds:De(t),
e):i},e.startAngle=function(t){return arguments.length?(a=De(t),e):a},e.endAngle=function(t){
return arguments.length?(u=De(t),e):u},e.padAngle=function(t){return arguments.length?(s=De(t),
e):s},e.centroid=function(){var e=(+n.apply(this,arguments)+ +r.apply(this,arguments))/2,t=(+a.apply(this,arguments)+ +u.apply(this,arguments))/2-ja;

return[Math.cos(t)*e,Math.sin(t)*e]},e};var Ds="auto";ra.svg.line=function(){return gi(E);

};var Rs=ra.map({linear:mi,"linear-closed":vi,step:yi,"step-before":Ei,"step-after":bi,
basis:Mi,"basis-open":Di,"basis-closed":Ri,bundle:Oi,cardinal:Ci,"cardinal-open":xi,
"cardinal-closed":wi,monotone:Ai});Rs.forEach(function(e,t){t.key=e,t.closed=/-closed$/.test(e);

});var Os=[0,2/3,1/3,0],Ts=[0,1/3,2/3,0],ks=[0,1/6,2/3,1/6];ra.svg.line.radial=function(){
var e=gi(ji);return e.radius=e.x,delete e.x,e.angle=e.y,delete e.y,e},Ei.reverse=bi,
bi.reverse=Ei,ra.svg.area=function(){return Li(E)},ra.svg.area.radial=function(){
var e=Li(ji);return e.radius=e.x,delete e.x,e.innerRadius=e.x0,delete e.x0,e.outerRadius=e.x1,
delete e.x1,e.angle=e.y,delete e.y,e.startAngle=e.y0,delete e.y0,e.endAngle=e.y1,
delete e.y1,e},ra.svg.chord=function(){function e(e,u){var s=t(this,i,e,u),c=t(this,a,e,u);

return"M"+s.p0+r(s.r,s.p1,s.a1-s.a0)+(n(s,c)?o(s.r,s.p1,s.r,s.p0):o(s.r,s.p1,c.r,c.p0)+r(c.r,c.p1,c.a1-c.a0)+o(c.r,c.p1,s.r,s.p0))+"Z";

}function t(e,t,n,r){var o=t.call(e,n,r),i=u.call(e,o,r),a=s.call(e,o,r)-ja,l=c.call(e,o,r)-ja;

return{r:i,a0:a,a1:l,p0:[i*Math.cos(a),i*Math.sin(a)],p1:[i*Math.cos(l),i*Math.sin(l)]
}}function n(e,t){return e.a0==t.a0&&e.a1==t.a1}function r(e,t,n){return"A"+e+","+e+" 0 "+ +(n>Pa)+",1 "+t;

}function o(e,t,n,r){return"Q 0,0 "+r}var i=En,a=bn,u=Vi,s=li,c=pi;return e.radius=function(t){
return arguments.length?(u=De(t),e):u},e.source=function(t){return arguments.length?(i=De(t),
e):i},e.target=function(t){return arguments.length?(a=De(t),e):a},e.startAngle=function(t){
return arguments.length?(s=De(t),e):s},e.endAngle=function(t){return arguments.length?(c=De(t),
e):c},e},ra.svg.diagonal=function(){function e(e,o){var i=t.call(this,e,o),a=n.call(this,e,o),u=(i.y+a.y)/2,s=[i,{
x:i.x,y:u},{x:a.x,y:u},a];return s=s.map(r),"M"+s[0]+"C"+s[1]+" "+s[2]+" "+s[3]}var t=En,n=bn,r=Ui;

return e.source=function(n){return arguments.length?(t=De(n),e):t},e.target=function(t){
return arguments.length?(n=De(t),e):n},e.projection=function(t){return arguments.length?(r=t,
e):r},e},ra.svg.diagonal.radial=function(){var e=ra.svg.diagonal(),t=Ui,n=e.projection;

return e.projection=function(e){return arguments.length?n(Fi(t=e)):t},e},ra.svg.symbol=function(){
function e(e,r){return(Ss.get(t.call(this,e,r))||Hi)(n.call(this,e,r))}var t=Bi,n=qi;

return e.type=function(n){return arguments.length?(t=De(n),e):t},e.size=function(t){
return arguments.length?(n=De(t),e):n},e};var Ss=ra.map({circle:Hi,cross:function(e){
var t=Math.sqrt(e/5)/2;return"M"+-3*t+","+-t+"H"+-t+"V"+-3*t+"H"+t+"V"+-t+"H"+3*t+"V"+t+"H"+t+"V"+3*t+"H"+-t+"V"+t+"H"+-3*t+"Z";

},diamond:function(e){var t=Math.sqrt(e/(2*Is)),n=t*Is;return"M0,"+-t+"L"+n+",0 0,"+t+" "+-n+",0Z";

},square:function(e){var t=Math.sqrt(e)/2;return"M"+-t+","+-t+"L"+t+","+-t+" "+t+","+t+" "+-t+","+t+"Z";

},"triangle-down":function(e){var t=Math.sqrt(e/Ps),n=t*Ps/2;return"M0,"+n+"L"+t+","+-n+" "+-t+","+-n+"Z";

},"triangle-up":function(e){var t=Math.sqrt(e/Ps),n=t*Ps/2;return"M0,"+-n+"L"+t+","+n+" "+-t+","+n+"Z";

}});ra.svg.symbolTypes=Ss.keys();var Ps=Math.sqrt(3),Is=Math.tan(30*La);_a.transition=function(e){
for(var t,n,r=As||++Us,o=$i(e),i=[],a=js||{time:Date.now(),ease:Mr,delay:0,duration:250
},u=-1,s=this.length;++u<s;){i.push(t=[]);for(var c=this[u],l=-1,p=c.length;++l<p;)(n=c[l])&&Xi(n,l,o,r,a),
t.push(n)}return Wi(i,o,r)},_a.interrupt=function(e){return this.each(null==e?Ls:zi($i(e)));

};var As,js,Ls=zi($i()),Vs=[],Us=0;Vs.call=_a.call,Vs.empty=_a.empty,Vs.node=_a.node,
Vs.size=_a.size,ra.transition=function(e,t){return e&&e.transition?As?e.transition(t):e:ra.selection().transition(e);

},ra.transition.prototype=Vs,Vs.select=function(e){var t,n,r,o=this.id,i=this.namespace,a=[];

e=O(e);for(var u=-1,s=this.length;++u<s;){a.push(t=[]);for(var c=this[u],l=-1,p=c.length;++l<p;)(r=c[l])&&(n=e.call(r,r.__data__,l,u))?("__data__"in r&&(n.__data__=r.__data__),
Xi(n,l,i,o,r[i][o]),t.push(n)):t.push(null)}return Wi(a,i,o)},Vs.selectAll=function(e){
var t,n,r,o,i,a=this.id,u=this.namespace,s=[];e=T(e);for(var c=-1,l=this.length;++c<l;)for(var p=this[c],f=-1,d=p.length;++f<d;)if(r=p[f]){
i=r[u][a],n=e.call(r,r.__data__,f,c),s.push(t=[]);for(var h=-1,g=n.length;++h<g;)(o=n[h])&&Xi(o,h,u,a,i),
t.push(o)}return Wi(s,u,a)},Vs.filter=function(e){var t,n,r,o=[];"function"!=typeof e&&(e=B(e));

for(var i=0,a=this.length;a>i;i++){o.push(t=[]);for(var n=this[i],u=0,s=n.length;s>u;u++)(r=n[u])&&e.call(r,r.__data__,u,i)&&t.push(r);

}return Wi(o,this.namespace,this.id)},Vs.tween=function(e,t){var n=this.id,r=this.namespace;

return arguments.length<2?this.node()[r][n].tween.get(e):z(this,null==t?function(t){
t[r][n].tween.remove(e)}:function(o){o[r][n].tween.set(e,t)})},Vs.attr=function(e,t){
function n(){this.removeAttribute(u)}function r(){this.removeAttributeNS(u.space,u.local);

}function o(e){return null==e?n:(e+="",function(){var t,n=this.getAttribute(u);return n!==e&&(t=a(n,e),
function(e){this.setAttribute(u,t(e))})})}function i(e){return null==e?r:(e+="",function(){
var t,n=this.getAttributeNS(u.space,u.local);return n!==e&&(t=a(n,e),function(e){
this.setAttributeNS(u.space,u.local,t(e))})})}if(arguments.length<2){for(t in e)this.attr(t,e[t]);

return this}var a="transform"==e?Br:Er,u=ra.ns.qualify(e);return Yi(this,"attr."+e,t,u.local?i:o);

},Vs.attrTween=function(e,t){function n(e,n){var r=t.call(this,e,n,this.getAttribute(o));

return r&&function(e){this.setAttribute(o,r(e))}}function r(e,n){var r=t.call(this,e,n,this.getAttributeNS(o.space,o.local));

return r&&function(e){this.setAttributeNS(o.space,o.local,r(e))}}var o=ra.ns.qualify(e);

return this.tween("attr."+e,o.local?r:n)},Vs.style=function(e,t,r){function o(){this.style.removeProperty(e);

}function i(t){return null==t?o:(t+="",function(){var o,i=n(this).getComputedStyle(this,null).getPropertyValue(e);

return i!==t&&(o=Er(i,t),function(t){this.style.setProperty(e,o(t),r)})})}var a=arguments.length;

if(3>a){if("string"!=typeof e){2>a&&(t="");for(r in e)this.style(r,e[r],t);return this;

}r=""}return Yi(this,"style."+e,t,i)},Vs.styleTween=function(e,t,r){function o(o,i){
var a=t.call(this,o,i,n(this).getComputedStyle(this,null).getPropertyValue(e));return a&&function(t){
this.style.setProperty(e,a(t),r)}}return arguments.length<3&&(r=""),this.tween("style."+e,o);

},Vs.text=function(e){return Yi(this,"text",e,Ki)},Vs.remove=function(){var e=this.namespace;

return this.each("end.transition",function(){var t;this[e].count<2&&(t=this.parentNode)&&t.removeChild(this);

})},Vs.ease=function(e){var t=this.id,n=this.namespace;return arguments.length<1?this.node()[n][t].ease:("function"!=typeof e&&(e=ra.ease.apply(ra,arguments)),
z(this,function(r){r[n][t].ease=e}))},Vs.delay=function(e){var t=this.id,n=this.namespace;

return arguments.length<1?this.node()[n][t].delay:z(this,"function"==typeof e?function(r,o,i){
r[n][t].delay=+e.call(r,r.__data__,o,i)}:(e=+e,function(r){r[n][t].delay=e}))},Vs.duration=function(e){
var t=this.id,n=this.namespace;return arguments.length<1?this.node()[n][t].duration:z(this,"function"==typeof e?function(r,o,i){
r[n][t].duration=Math.max(1,e.call(r,r.__data__,o,i))}:(e=Math.max(1,e),function(r){
r[n][t].duration=e}))},Vs.each=function(e,t){var n=this.id,r=this.namespace;if(arguments.length<2){
var o=js,i=As;try{As=n,z(this,function(t,o,i){js=t[r][n],e.call(t,t.__data__,o,i);

})}finally{js=o,As=i}}else z(this,function(o){var i=o[r][n];(i.event||(i.event=ra.dispatch("start","end","interrupt"))).on(e,t);

});return this},Vs.transition=function(){for(var e,t,n,r,o=this.id,i=++Us,a=this.namespace,u=[],s=0,c=this.length;c>s;s++){
u.push(e=[]);for(var t=this[s],l=0,p=t.length;p>l;l++)(n=t[l])&&(r=n[a][o],Xi(n,l,a,i,{
time:r.time,ease:r.ease,delay:r.delay+r.duration,duration:r.duration})),e.push(n);

}return Wi(u,a,i)},ra.svg.axis=function(){function e(e){e.each(function(){var e,c=ra.select(this),l=this.__chart__||n,p=this.__chart__=n.copy(),f=null==s?p.ticks?p.ticks.apply(p,u):p.domain():s,d=null==t?p.tickFormat?p.tickFormat.apply(p,u):E:t,h=c.selectAll(".tick").data(f,p),g=h.enter().insert("g",".domain").attr("class","tick").style("opacity",ka),m=ra.transition(h.exit()).style("opacity",ka).remove(),v=ra.transition(h.order()).style("opacity",1),y=Math.max(o,0)+a,b=Fo(p),x=c.selectAll(".domain").data([0]),w=(x.enter().append("path").attr("class","domain"),
ra.transition(x));g.append("line"),g.append("text");var C,_,N,M,D=g.select("line"),R=v.select("line"),O=h.select("text").text(d),T=g.select("text"),k=v.select("text"),S="top"===r||"left"===r?-1:1;

if("bottom"===r||"top"===r?(e=Gi,C="x",N="y",_="x2",M="y2",O.attr("dy",0>S?"0em":".71em").style("text-anchor","middle"),
w.attr("d","M"+b[0]+","+S*i+"V0H"+b[1]+"V"+S*i)):(e=Qi,C="y",N="x",_="y2",M="x2",
O.attr("dy",".32em").style("text-anchor",0>S?"end":"start"),w.attr("d","M"+S*i+","+b[0]+"H0V"+b[1]+"H"+S*i)),
D.attr(M,S*o),T.attr(N,S*y),R.attr(_,0).attr(M,S*o),k.attr(C,0).attr(N,S*y),p.rangeBand){
var P=p,I=P.rangeBand()/2;l=p=function(e){return P(e)+I}}else l.rangeBand?l=p:m.call(e,p,l);

g.call(e,l,p),v.call(e,p,p)})}var t,n=ra.scale.linear(),r=Fs,o=6,i=6,a=3,u=[10],s=null;

return e.scale=function(t){return arguments.length?(n=t,e):n},e.orient=function(t){
return arguments.length?(r=t in qs?t+"":Fs,e):r},e.ticks=function(){return arguments.length?(u=arguments,
e):u},e.tickValues=function(t){return arguments.length?(s=t,e):s},e.tickFormat=function(n){
return arguments.length?(t=n,e):t},e.tickSize=function(t){var n=arguments.length;
return n?(o=+t,i=+arguments[n-1],e):o},e.innerTickSize=function(t){return arguments.length?(o=+t,
e):o},e.outerTickSize=function(t){return arguments.length?(i=+t,e):i},e.tickPadding=function(t){
return arguments.length?(a=+t,e):a},e.tickSubdivide=function(){return arguments.length&&e;

},e};var Fs="bottom",qs={top:1,right:1,bottom:1,left:1};ra.svg.brush=function(){function e(n){
n.each(function(){var n=ra.select(this).style("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush",i).on("touchstart.brush",i),a=n.selectAll(".background").data([0]);

a.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),
n.selectAll(".extent").data([0]).enter().append("rect").attr("class","extent").style("cursor","move");

var u=n.selectAll(".resize").data(g,E);u.exit().remove(),u.enter().append("g").attr("class",function(e){
return"resize "+e}).style("cursor",function(e){return Bs[e]}).append("rect").attr("x",function(e){
return/[ew]$/.test(e)?-3:null}).attr("y",function(e){return/^[ns]/.test(e)?-3:null;

}).attr("width",6).attr("height",6).style("visibility","hidden"),u.style("display",e.empty()?"none":null);

var s,p=ra.transition(n),f=ra.transition(a);c&&(s=Fo(c),f.attr("x",s[0]).attr("width",s[1]-s[0]),
r(p)),l&&(s=Fo(l),f.attr("y",s[0]).attr("height",s[1]-s[0]),o(p)),t(p)})}function t(e){
e.selectAll(".resize").attr("transform",function(e){return"translate("+p[+/e$/.test(e)]+","+f[+/^s/.test(e)]+")";

})}function r(e){e.select(".extent").attr("x",p[0]),e.selectAll(".extent,.n>rect,.s>rect").attr("width",p[1]-p[0]);

}function o(e){e.select(".extent").attr("y",f[0]),e.selectAll(".extent,.e>rect,.w>rect").attr("height",f[1]-f[0]);

}function i(){function i(){32==ra.event.keyCode&&(O||(E=null,k[0]-=p[1],k[1]-=f[1],
O=2),N())}function g(){32==ra.event.keyCode&&2==O&&(k[0]+=p[1],k[1]+=f[1],O=0,N());

}function m(){var e=ra.mouse(x),n=!1;b&&(e[0]+=b[0],e[1]+=b[1]),O||(ra.event.altKey?(E||(E=[(p[0]+p[1])/2,(f[0]+f[1])/2]),
k[0]=p[+(e[0]<E[0])],k[1]=f[+(e[1]<E[1])]):E=null),D&&v(e,c,0)&&(r(_),n=!0),R&&v(e,l,1)&&(o(_),
n=!0),n&&(t(_),C({type:"brush",mode:O?"move":"resize"}))}function v(e,t,n){var r,o,i=Fo(t),s=i[0],c=i[1],l=k[n],g=n?f:p,m=g[1]-g[0];

return O&&(s-=l,c-=m+l),r=(n?h:d)?Math.max(s,Math.min(c,e[n])):e[n],O?o=(r+=l)+m:(E&&(l=Math.max(s,Math.min(c,2*E[n]-r))),
r>l?(o=r,r=l):o=l),g[0]!=r||g[1]!=o?(n?u=null:a=null,g[0]=r,g[1]=o,!0):void 0}function y(){
m(),_.style("pointer-events","all").selectAll(".resize").style("display",e.empty()?"none":null),
ra.select("body").style("cursor",null),S.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),
T(),C({type:"brushend"})}var E,b,x=this,w=ra.select(ra.event.target),C=s.of(x,arguments),_=ra.select(x),M=w.datum(),D=!/^(n|s)$/.test(M)&&c,R=!/^(e|w)$/.test(M)&&l,O=w.classed("extent"),T=G(x),k=ra.mouse(x),S=ra.select(n(x)).on("keydown.brush",i).on("keyup.brush",g);

if(ra.event.changedTouches?S.on("touchmove.brush",m).on("touchend.brush",y):S.on("mousemove.brush",m).on("mouseup.brush",y),
_.interrupt().selectAll("*").interrupt(),O)k[0]=p[0]-k[0],k[1]=f[0]-k[1];else if(M){
var P=+/w$/.test(M),I=+/^n/.test(M);b=[p[1-P]-k[0],f[1-I]-k[1]],k[0]=p[P],k[1]=f[I];

}else ra.event.altKey&&(E=k.slice());_.style("pointer-events","none").selectAll(".resize").style("display",null),
ra.select("body").style("cursor",w.style("cursor")),C({type:"brushstart"}),m()}var a,u,s=D(e,"brushstart","brush","brushend"),c=null,l=null,p=[0,0],f=[0,0],d=!0,h=!0,g=Hs[0];

return e.event=function(e){e.each(function(){var e=s.of(this,arguments),t={x:p,y:f,
i:a,j:u},n=this.__chart__||t;this.__chart__=t,As?ra.select(this).transition().each("start.brush",function(){
a=n.i,u=n.j,p=n.x,f=n.y,e({type:"brushstart"})}).tween("brush:brush",function(){var n=br(p,t.x),r=br(f,t.y);

return a=u=null,function(o){p=t.x=n(o),f=t.y=r(o),e({type:"brush",mode:"resize"});

}}).each("end.brush",function(){a=t.i,u=t.j,e({type:"brush",mode:"resize"}),e({type:"brushend"
})}):(e({type:"brushstart"}),e({type:"brush",mode:"resize"}),e({type:"brushend"}));

})},e.x=function(t){return arguments.length?(c=t,g=Hs[!c<<1|!l],e):c},e.y=function(t){
return arguments.length?(l=t,g=Hs[!c<<1|!l],e):l},e.clamp=function(t){return arguments.length?(c&&l?(d=!!t[0],
h=!!t[1]):c?d=!!t:l&&(h=!!t),e):c&&l?[d,h]:c?d:l?h:null},e.extent=function(t){var n,r,o,i,s;

return arguments.length?(c&&(n=t[0],r=t[1],l&&(n=n[0],r=r[0]),a=[n,r],c.invert&&(n=c(n),
r=c(r)),n>r&&(s=n,n=r,r=s),(n!=p[0]||r!=p[1])&&(p=[n,r])),l&&(o=t[0],i=t[1],c&&(o=o[1],
i=i[1]),u=[o,i],l.invert&&(o=l(o),i=l(i)),o>i&&(s=o,o=i,i=s),(o!=f[0]||i!=f[1])&&(f=[o,i])),
e):(c&&(a?(n=a[0],r=a[1]):(n=p[0],r=p[1],c.invert&&(n=c.invert(n),r=c.invert(r)),
n>r&&(s=n,n=r,r=s))),l&&(u?(o=u[0],i=u[1]):(o=f[0],i=f[1],l.invert&&(o=l.invert(o),
i=l.invert(i)),o>i&&(s=o,o=i,i=s))),c&&l?[[n,o],[r,i]]:c?[n,r]:l&&[o,i])},e.clear=function(){
return e.empty()||(p=[0,0],f=[0,0],a=u=null),e},e.empty=function(){return!!c&&p[0]==p[1]||!!l&&f[0]==f[1];

},ra.rebind(e,s,"on")};var Bs={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",
nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},Hs=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]],zs=cu.format=gu.timeFormat,Ws=zs.utc,Ys=Ws("%Y-%m-%dT%H:%M:%S.%LZ");

zs.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?Zi:Ys,Zi.parse=function(e){
var t=new Date(e);return isNaN(t)?null:t},Zi.toString=Ys.toString,cu.second=Fe(function(e){
return new lu(1e3*Math.floor(e/1e3))},function(e,t){e.setTime(e.getTime()+1e3*Math.floor(t));

},function(e){return e.getSeconds()}),cu.seconds=cu.second.range,cu.seconds.utc=cu.second.utc.range,
cu.minute=Fe(function(e){return new lu(6e4*Math.floor(e/6e4))},function(e,t){e.setTime(e.getTime()+6e4*Math.floor(t));

},function(e){return e.getMinutes()}),cu.minutes=cu.minute.range,cu.minutes.utc=cu.minute.utc.range,
cu.hour=Fe(function(e){var t=e.getTimezoneOffset()/60;return new lu(36e5*(Math.floor(e/36e5-t)+t));

},function(e,t){e.setTime(e.getTime()+36e5*Math.floor(t))},function(e){return e.getHours();

}),cu.hours=cu.hour.range,cu.hours.utc=cu.hour.utc.range,cu.month=Fe(function(e){
return e=cu.day(e),e.setDate(1),e},function(e,t){e.setMonth(e.getMonth()+t)},function(e){
return e.getMonth()}),cu.months=cu.month.range,cu.months.utc=cu.month.utc.range;var Ks=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],$s=[[cu.second,1],[cu.second,5],[cu.second,15],[cu.second,30],[cu.minute,1],[cu.minute,5],[cu.minute,15],[cu.minute,30],[cu.hour,1],[cu.hour,3],[cu.hour,6],[cu.hour,12],[cu.day,1],[cu.day,2],[cu.week,1],[cu.month,1],[cu.month,3],[cu.year,1]],Xs=zs.multi([[".%L",function(e){
return e.getMilliseconds()}],[":%S",function(e){return e.getSeconds()}],["%I:%M",function(e){
return e.getMinutes()}],["%I %p",function(e){return e.getHours()}],["%a %d",function(e){
return e.getDay()&&1!=e.getDate()}],["%b %d",function(e){return 1!=e.getDate()}],["%B",function(e){
return e.getMonth()}],["%Y",Ot]]),Gs={range:function(e,t,n){return ra.range(Math.ceil(e/n)*n,+t,n).map(ea);

},floor:E,ceil:E};$s.year=cu.year,cu.scale=function(){return Ji(ra.scale.linear(),$s,Xs);

};var Qs=$s.map(function(e){return[e[0].utc,e[1]]}),Zs=Ws.multi([[".%L",function(e){
return e.getUTCMilliseconds()}],[":%S",function(e){return e.getUTCSeconds()}],["%I:%M",function(e){
return e.getUTCMinutes()}],["%I %p",function(e){return e.getUTCHours()}],["%a %d",function(e){
return e.getUTCDay()&&1!=e.getUTCDate()}],["%b %d",function(e){return 1!=e.getUTCDate();

}],["%B",function(e){return e.getUTCMonth()}],["%Y",Ot]]);Qs.year=cu.year.utc,cu.scale.utc=function(){
return Ji(ra.scale.linear(),Qs,Zs)},ra.text=Re(function(e){return e.responseText}),
ra.json=function(e,t){return Oe(e,"application/json",ta,t)},ra.html=function(e,t){
return Oe(e,"text/html",na,t)},ra.xml=Re(function(e){return e.responseXML}),"function"==typeof define&&define.amd?define(ra):"object"==typeof t&&t.exports&&(t.exports=ra),
this.d3=ra}()},{}],23:[function(e,t,n){!function(e,n){"object"==typeof t&&"object"==typeof t.exports?t.exports=e.document?n(e,!0):function(e){
if(!e.document)throw new Error("jQuery requires a window with a document");return n(e);

}:n(e)}("undefined"!=typeof window?window:this,function(e,t){function n(e){var t="length"in e&&e.length,n=J.type(e);

return"function"===n||J.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e;

}function r(e,t,n){if(J.isFunction(t))return J.grep(e,function(e,r){return!!t.call(e,r,e)!==n;

});if(t.nodeType)return J.grep(e,function(e){return e===t!==n});if("string"==typeof t){
if(ue.test(t))return J.filter(t,e,n);t=J.filter(t,e)}return J.grep(e,function(e){
return Y.call(t,e)>=0!==n})}function o(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e;

}function i(e){var t=he[e]={};return J.each(e.match(de)||[],function(e,n){t[n]=!0;

}),t}function a(){Q.removeEventListener("DOMContentLoaded",a,!1),e.removeEventListener("load",a,!1),
J.ready()}function u(){Object.defineProperty(this.cache={},0,{get:function(){return{};

}}),this.expando=J.expando+u.uid++}function s(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(be,"-$1").toLowerCase(),
n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:Ee.test(n)?J.parseJSON(n):n;

}catch(o){}ye.set(e,t,n)}else n=void 0;return n}function c(){return!0}function l(){
return!1}function p(){try{return Q.activeElement}catch(e){}}function f(e,t){return J.nodeName(e,"table")&&J.nodeName(11!==t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e;

}function d(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function h(e){
var t=je.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function g(e,t){
for(var n=0,r=e.length;r>n;n++)ve.set(e[n],"globalEval",!t||ve.get(t[n],"globalEval"));

}function m(e,t){var n,r,o,i,a,u,s,c;if(1===t.nodeType){if(ve.hasData(e)&&(i=ve.access(e),
a=ve.set(t,i),c=i.events)){delete a.handle,a.events={};for(o in c)for(n=0,r=c[o].length;r>n;n++)J.event.add(t,o,c[o][n]);

}ye.hasData(e)&&(u=ye.access(e),s=J.extend({},u),ye.set(t,s))}}function v(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];

return void 0===t||t&&J.nodeName(e,t)?J.merge([e],n):n}function y(e,t){var n=t.nodeName.toLowerCase();

"input"===n&&_e.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue);

}function E(t,n){var r,o=J(n.createElement(t)).appendTo(n.body),i=e.getDefaultComputedStyle&&(r=e.getDefaultComputedStyle(o[0]))?r.display:J.css(o[0],"display");

return o.detach(),i}function b(e){var t=Q,n=Fe[e];return n||(n=E(e,t),"none"!==n&&n||(Ue=(Ue||J("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),
t=Ue[0].contentDocument,t.write(),t.close(),n=E(e,t),Ue.detach()),Fe[e]=n),n}function x(e,t,n){
var r,o,i,a,u=e.style;return n=n||He(e),n&&(a=n.getPropertyValue(t)||n[t]),n&&(""!==a||J.contains(e.ownerDocument,e)||(a=J.style(e,t)),
Be.test(a)&&qe.test(t)&&(r=u.width,o=u.minWidth,i=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,
a=n.width,u.width=r,u.minWidth=o,u.maxWidth=i)),void 0!==a?a+"":a}function w(e,t){
return{get:function(){return e()?void delete this.get:(this.get=t).apply(this,arguments);

}}}function C(e,t){if(t in e)return t;for(var n=t[0].toUpperCase()+t.slice(1),r=t,o=Xe.length;o--;)if(t=Xe[o]+n,
t in e)return t;return r}function _(e,t,n){var r=We.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t;

}function N(e,t,n,r,o){for(var i=n===(r?"border":"content")?4:"width"===t?1:0,a=0;4>i;i+=2)"margin"===n&&(a+=J.css(e,n+we[i],!0,o)),
r?("content"===n&&(a-=J.css(e,"padding"+we[i],!0,o)),"margin"!==n&&(a-=J.css(e,"border"+we[i]+"Width",!0,o))):(a+=J.css(e,"padding"+we[i],!0,o),
"padding"!==n&&(a+=J.css(e,"border"+we[i]+"Width",!0,o)));return a}function M(e,t,n){
var r=!0,o="width"===t?e.offsetWidth:e.offsetHeight,i=He(e),a="border-box"===J.css(e,"boxSizing",!1,i);

if(0>=o||null==o){if(o=x(e,t,i),(0>o||null==o)&&(o=e.style[t]),Be.test(o))return o;

r=a&&(G.boxSizingReliable()||o===e.style[t]),o=parseFloat(o)||0}return o+N(e,t,n||(a?"border":"content"),r,i)+"px";

}function D(e,t){for(var n,r,o,i=[],a=0,u=e.length;u>a;a++)r=e[a],r.style&&(i[a]=ve.get(r,"olddisplay"),
n=r.style.display,t?(i[a]||"none"!==n||(r.style.display=""),""===r.style.display&&Ce(r)&&(i[a]=ve.access(r,"olddisplay",b(r.nodeName)))):(o=Ce(r),
"none"===n&&o||ve.set(r,"olddisplay",o?n:J.css(r,"display"))));for(a=0;u>a;a++)r=e[a],
r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?i[a]||"":"none"));

return e}function R(e,t,n,r,o){return new R.prototype.init(e,t,n,r,o)}function O(){
return setTimeout(function(){Ge=void 0}),Ge=J.now()}function T(e,t){var n,r=0,o={
height:e};for(t=t?1:0;4>r;r+=2-t)n=we[r],o["margin"+n]=o["padding"+n]=e;return t&&(o.opacity=o.width=e),
o}function k(e,t,n){for(var r,o=(nt[t]||[]).concat(nt["*"]),i=0,a=o.length;a>i;i++)if(r=o[i].call(n,t,e))return r;

}function S(e,t,n){var r,o,i,a,u,s,c,l,p=this,f={},d=e.style,h=e.nodeType&&Ce(e),g=ve.get(e,"fxshow");

n.queue||(u=J._queueHooks(e,"fx"),null==u.unqueued&&(u.unqueued=0,s=u.empty.fire,
u.empty.fire=function(){u.unqueued||s()}),u.unqueued++,p.always(function(){p.always(function(){
u.unqueued--,J.queue(e,"fx").length||u.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],
c=J.css(e,"display"),l="none"===c?ve.get(e,"olddisplay")||b(e.nodeName):c,"inline"===l&&"none"===J.css(e,"float")&&(d.display="inline-block")),
n.overflow&&(d.overflow="hidden",p.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],
d.overflowY=n.overflow[2]}));for(r in t)if(o=t[r],Ze.exec(o)){if(delete t[r],i=i||"toggle"===o,
o===(h?"hide":"show")){if("show"!==o||!g||void 0===g[r])continue;h=!0}f[r]=g&&g[r]||J.style(e,r);

}else c=void 0;if(J.isEmptyObject(f))"inline"===("none"===c?b(e.nodeName):c)&&(d.display=c);
else{g?"hidden"in g&&(h=g.hidden):g=ve.access(e,"fxshow",{}),i&&(g.hidden=!h),h?J(e).show():p.done(function(){
J(e).hide()}),p.done(function(){var t;ve.remove(e,"fxshow");for(t in f)J.style(e,t,f[t]);

});for(r in f)a=k(h?g[r]:0,r,p),r in g||(g[r]=a.start,h&&(a.end=a.start,a.start="width"===r||"height"===r?1:0));

}}function P(e,t){var n,r,o,i,a;for(n in e)if(r=J.camelCase(n),o=t[r],i=e[n],J.isArray(i)&&(o=i[1],
i=e[n]=i[0]),n!==r&&(e[r]=i,delete e[n]),a=J.cssHooks[r],a&&"expand"in a){i=a.expand(i),
delete e[r];for(n in i)n in e||(e[n]=i[n],t[n]=o)}else t[r]=o}function I(e,t,n){var r,o,i=0,a=tt.length,u=J.Deferred().always(function(){
delete s.elem}),s=function(){if(o)return!1;for(var t=Ge||O(),n=Math.max(0,c.startTime+c.duration-t),r=n/c.duration||0,i=1-r,a=0,s=c.tweens.length;s>a;a++)c.tweens[a].run(i);

return u.notifyWith(e,[c,i,n]),1>i&&s?n:(u.resolveWith(e,[c]),!1)},c=u.promise({elem:e,
props:J.extend({},t),opts:J.extend(!0,{specialEasing:{}},n),originalProperties:t,
originalOptions:n,startTime:Ge||O(),duration:n.duration,tweens:[],createTween:function(t,n){
var r=J.Tween(e,c.opts,t,n,c.opts.specialEasing[t]||c.opts.easing);return c.tweens.push(r),
r},stop:function(t){var n=0,r=t?c.tweens.length:0;if(o)return this;for(o=!0;r>n;n++)c.tweens[n].run(1);

return t?u.resolveWith(e,[c,t]):u.rejectWith(e,[c,t]),this}}),l=c.props;for(P(l,c.opts.specialEasing);a>i;i++)if(r=tt[i].call(c,e,l,c.opts))return r;

return J.map(l,k,c),J.isFunction(c.opts.start)&&c.opts.start.call(e,c),J.fx.timer(J.extend(s,{
elem:e,anim:c,queue:c.opts.queue})),c.progress(c.opts.progress).done(c.opts.done,c.opts.complete).fail(c.opts.fail).always(c.opts.always);

}function A(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,o=0,i=t.toLowerCase().match(de)||[];

if(J.isFunction(n))for(;r=i[o++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n);

}}function j(e,t,n,r){function o(u){var s;return i[u]=!0,J.each(e[u]||[],function(e,u){
var c=u(t,n,r);return"string"!=typeof c||a||i[c]?a?!(s=c):void 0:(t.dataTypes.unshift(c),
o(c),!1)}),s}var i={},a=e===Et;return o(t.dataTypes[0])||!i["*"]&&o("*")}function L(e,t){
var n,r,o=J.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((o[n]?e:r||(r={}))[n]=t[n]);

return r&&J.extend(!0,e,r),e}function V(e,t,n){for(var r,o,i,a,u=e.contents,s=e.dataTypes;"*"===s[0];)s.shift(),
void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(o in u)if(u[o]&&u[o].test(r)){
s.unshift(o);break}if(s[0]in n)i=s[0];else{for(o in n){if(!s[0]||e.converters[o+" "+s[0]]){
i=o;break}a||(a=o)}i=i||a}return i?(i!==s[0]&&s.unshift(i),n[i]):void 0}function U(e,t,n,r){
var o,i,a,u,s,c={},l=e.dataTypes.slice();if(l[1])for(a in e.converters)c[a.toLowerCase()]=e.converters[a];

for(i=l.shift();i;)if(e.responseFields[i]&&(n[e.responseFields[i]]=t),!s&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),
s=i,i=l.shift())if("*"===i)i=s;else if("*"!==s&&s!==i){if(a=c[s+" "+i]||c["* "+i],
!a)for(o in c)if(u=o.split(" "),u[1]===i&&(a=c[s+" "+u[0]]||c["* "+u[0]])){a===!0?a=c[o]:c[o]!==!0&&(i=u[0],
l.unshift(u[1]));break}if(a!==!0)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(p){
return{state:"parsererror",error:a?p:"No conversion from "+s+" to "+i}}}return{state:"success",
data:t}}function F(e,t,n,r){var o;if(J.isArray(t))J.each(t,function(t,o){n||_t.test(e)?r(e,o):F(e+"["+("object"==typeof o?t:"")+"]",o,n,r);

});else if(n||"object"!==J.type(t))r(e,t);else for(o in t)F(e+"["+o+"]",t[o],n,r);

}function q(e){return J.isWindow(e)?e:9===e.nodeType&&e.defaultView}var B=[],H=B.slice,z=B.concat,W=B.push,Y=B.indexOf,K={},$=K.toString,X=K.hasOwnProperty,G={},Q=e.document,Z="2.1.4",J=function(e,t){
return new J.fn.init(e,t)},ee=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,te=/^-ms-/,ne=/-([\da-z])/gi,re=function(e,t){
return t.toUpperCase()};J.fn=J.prototype={jquery:Z,constructor:J,selector:"",length:0,
toArray:function(){return H.call(this)},get:function(e){return null!=e?0>e?this[e+this.length]:this[e]:H.call(this);

},pushStack:function(e){var t=J.merge(this.constructor(),e);return t.prevObject=this,
t.context=this.context,t},each:function(e,t){return J.each(this,e,t)},map:function(e){
return this.pushStack(J.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){
return this.pushStack(H.apply(this,arguments))},first:function(){return this.eq(0);

},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);

return this.pushStack(n>=0&&t>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null);

},push:W,sort:B.sort,splice:B.splice},J.extend=J.fn.extend=function(){var e,t,n,r,o,i,a=arguments[0]||{},u=1,s=arguments.length,c=!1;

for("boolean"==typeof a&&(c=a,a=arguments[u]||{},u++),"object"==typeof a||J.isFunction(a)||(a={}),
u===s&&(a=this,u--);s>u;u++)if(null!=(e=arguments[u]))for(t in e)n=a[t],r=e[t],a!==r&&(c&&r&&(J.isPlainObject(r)||(o=J.isArray(r)))?(o?(o=!1,
i=n&&J.isArray(n)?n:[]):i=n&&J.isPlainObject(n)?n:{},a[t]=J.extend(c,i,r)):void 0!==r&&(a[t]=r));

return a},J.extend({expando:"jQuery"+(Z+Math.random()).replace(/\D/g,""),isReady:!0,
error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===J.type(e);

},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){
return!J.isArray(e)&&e-parseFloat(e)+1>=0},isPlainObject:function(e){return"object"!==J.type(e)||e.nodeType||J.isWindow(e)?!1:e.constructor&&!X.call(e.constructor.prototype,"isPrototypeOf")?!1:!0;

},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},type:function(e){
return null==e?e+"":"object"==typeof e||"function"==typeof e?K[$.call(e)]||"object":typeof e;

},globalEval:function(e){var t,n=eval;e=J.trim(e),e&&(1===e.indexOf("use strict")?(t=Q.createElement("script"),
t.text=e,Q.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){
return e.replace(te,"ms-").replace(ne,re)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase();

},each:function(e,t,r){var o,i=0,a=e.length,u=n(e);if(r){if(u)for(;a>i&&(o=t.apply(e[i],r),
o!==!1);i++);else for(i in e)if(o=t.apply(e[i],r),o===!1)break}else if(u)for(;a>i&&(o=t.call(e[i],i,e[i]),
o!==!1);i++);else for(i in e)if(o=t.call(e[i],i,e[i]),o===!1)break;return e},trim:function(e){
return null==e?"":(e+"").replace(ee,"")},makeArray:function(e,t){var r=t||[];return null!=e&&(n(Object(e))?J.merge(r,"string"==typeof e?[e]:e):W.call(r,e)),
r},inArray:function(e,t,n){return null==t?-1:Y.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,o=e.length;n>r;r++)e[o++]=t[r];

return e.length=o,e},grep:function(e,t,n){for(var r,o=[],i=0,a=e.length,u=!n;a>i;i++)r=!t(e[i],i),
r!==u&&o.push(e[i]);return o},map:function(e,t,r){var o,i=0,a=e.length,u=n(e),s=[];

if(u)for(;a>i;i++)o=t(e[i],i,r),null!=o&&s.push(o);else for(i in e)o=t(e[i],i,r),
null!=o&&s.push(o);return z.apply([],s)},guid:1,proxy:function(e,t){var n,r,o;return"string"==typeof t&&(n=e[t],
t=e,e=n),J.isFunction(e)?(r=H.call(arguments,2),o=function(){return e.apply(t||this,r.concat(H.call(arguments)));

},o.guid=e.guid=e.guid||J.guid++,o):void 0},now:Date.now,support:G}),J.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){
K["[object "+t+"]"]=t.toLowerCase()});var oe=function(e){function t(e,t,n,r){var o,i,a,u,s,c,p,d,h,g;

if((t?t.ownerDocument||t:F)!==S&&k(t),t=t||S,n=n||[],u=t.nodeType,"string"!=typeof e||!e||1!==u&&9!==u&&11!==u)return n;

if(!r&&I){if(11!==u&&(o=ye.exec(e)))if(a=o[1]){if(9===u){if(i=t.getElementById(a),
!i||!i.parentNode)return n;if(i.id===a)return n.push(i),n}else if(t.ownerDocument&&(i=t.ownerDocument.getElementById(a))&&V(t,i)&&i.id===a)return n.push(i),
n}else{if(o[2])return Z.apply(n,t.getElementsByTagName(e)),n;if((a=o[3])&&x.getElementsByClassName)return Z.apply(n,t.getElementsByClassName(a)),
n}if(x.qsa&&(!A||!A.test(e))){if(d=p=U,h=t,g=1!==u&&e,1===u&&"object"!==t.nodeName.toLowerCase()){
for(c=N(e),(p=t.getAttribute("id"))?d=p.replace(be,"\\$&"):t.setAttribute("id",d),
d="[id='"+d+"'] ",s=c.length;s--;)c[s]=d+f(c[s]);h=Ee.test(e)&&l(t.parentNode)||t,
g=c.join(",")}if(g)try{return Z.apply(n,h.querySelectorAll(g)),n}catch(m){}finally{
p||t.removeAttribute("id")}}}return D(e.replace(se,"$1"),t,n,r)}function n(){function e(n,r){
return t.push(n+" ")>w.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e;

}function r(e){return e[U]=!0,e}function o(e){var t=S.createElement("div");try{return!!e(t);

}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function i(e,t){
for(var n=e.split("|"),r=e.length;r--;)w.attrHandle[n[r]]=t}function a(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||K)-(~e.sourceIndex||K);

if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function u(e){
return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}
function s(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e;

}}function c(e){return r(function(t){return t=+t,r(function(n,r){for(var o,i=e([],n.length,t),a=i.length;a--;)n[o=i[a]]&&(n[o]=!(r[o]=n[o]));

})})}function l(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function p(){}
function f(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function d(e,t,n){
var r=t.dir,o=n&&"parentNode"===r,i=B++;return t.first?function(t,n,i){for(;t=t[r];)if(1===t.nodeType||o)return e(t,n,i);

}:function(t,n,a){var u,s,c=[q,i];if(a){for(;t=t[r];)if((1===t.nodeType||o)&&e(t,n,a))return!0;

}else for(;t=t[r];)if(1===t.nodeType||o){if(s=t[U]||(t[U]={}),(u=s[r])&&u[0]===q&&u[1]===i)return c[2]=u[2];

if(s[r]=c,c[2]=e(t,n,a))return!0}}}function h(e){return e.length>1?function(t,n,r){
for(var o=e.length;o--;)if(!e[o](t,n,r))return!1;return!0}:e[0]}function g(e,n,r){
for(var o=0,i=n.length;i>o;o++)t(e,n[o],r);return r}function m(e,t,n,r,o){for(var i,a=[],u=0,s=e.length,c=null!=t;s>u;u++)(i=e[u])&&(!n||n(i,r,o))&&(a.push(i),
c&&t.push(u));return a}function v(e,t,n,o,i,a){return o&&!o[U]&&(o=v(o)),i&&!i[U]&&(i=v(i,a)),
r(function(r,a,u,s){var c,l,p,f=[],d=[],h=a.length,v=r||g(t||"*",u.nodeType?[u]:u,[]),y=!e||!r&&t?v:m(v,f,e,u,s),E=n?i||(r?e:h||o)?[]:a:y;

if(n&&n(y,E,u,s),o)for(c=m(E,d),o(c,[],u,s),l=c.length;l--;)(p=c[l])&&(E[d[l]]=!(y[d[l]]=p));

if(r){if(i||e){if(i){for(c=[],l=E.length;l--;)(p=E[l])&&c.push(y[l]=p);i(null,E=[],c,s);

}for(l=E.length;l--;)(p=E[l])&&(c=i?ee(r,p):f[l])>-1&&(r[c]=!(a[c]=p))}}else E=m(E===a?E.splice(h,E.length):E),
i?i(null,a,E,s):Z.apply(a,E)})}function y(e){for(var t,n,r,o=e.length,i=w.relative[e[0].type],a=i||w.relative[" "],u=i?1:0,s=d(function(e){
return e===t},a,!0),c=d(function(e){return ee(t,e)>-1},a,!0),l=[function(e,n,r){var o=!i&&(r||n!==R)||((t=n).nodeType?s(e,n,r):c(e,n,r));

return t=null,o}];o>u;u++)if(n=w.relative[e[u].type])l=[d(h(l),n)];else{if(n=w.filter[e[u].type].apply(null,e[u].matches),
n[U]){for(r=++u;o>r&&!w.relative[e[r].type];r++);return v(u>1&&h(l),u>1&&f(e.slice(0,u-1).concat({
value:" "===e[u-2].type?"*":""})).replace(se,"$1"),n,r>u&&y(e.slice(u,r)),o>r&&y(e=e.slice(r)),o>r&&f(e));

}l.push(n)}return h(l)}function E(e,n){var o=n.length>0,i=e.length>0,a=function(r,a,u,s,c){
var l,p,f,d=0,h="0",g=r&&[],v=[],y=R,E=r||i&&w.find.TAG("*",c),b=q+=null==y?1:Math.random()||.1,x=E.length;

for(c&&(R=a!==S&&a);h!==x&&null!=(l=E[h]);h++){if(i&&l){for(p=0;f=e[p++];)if(f(l,a,u)){
s.push(l);break}c&&(q=b)}o&&((l=!f&&l)&&d--,r&&g.push(l))}if(d+=h,o&&h!==d){for(p=0;f=n[p++];)f(g,v,a,u);

if(r){if(d>0)for(;h--;)g[h]||v[h]||(v[h]=G.call(s));v=m(v)}Z.apply(s,v),c&&!r&&v.length>0&&d+n.length>1&&t.uniqueSort(s);

}return c&&(q=b,R=y),g};return o?r(a):a}var b,x,w,C,_,N,M,D,R,O,T,k,S,P,I,A,j,L,V,U="sizzle"+1*new Date,F=e.document,q=0,B=0,H=n(),z=n(),W=n(),Y=function(e,t){
return e===t&&(T=!0),0},K=1<<31,$={}.hasOwnProperty,X=[],G=X.pop,Q=X.push,Z=X.push,J=X.slice,ee=function(e,t){
for(var n=0,r=e.length;r>n;n++)if(e[n]===t)return n;return-1},te="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ne="[\\x20\\t\\r\\n\\f]",re="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",oe=re.replace("w","w#"),ie="\\["+ne+"*("+re+")(?:"+ne+"*([*^$|!~]?=)"+ne+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+oe+"))|)"+ne+"*\\]",ae=":("+re+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ie+")*)|.*)\\)|)",ue=new RegExp(ne+"+","g"),se=new RegExp("^"+ne+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ne+"+$","g"),ce=new RegExp("^"+ne+"*,"+ne+"*"),le=new RegExp("^"+ne+"*([>+~]|"+ne+")"+ne+"*"),pe=new RegExp("="+ne+"*([^\\]'\"]*?)"+ne+"*\\]","g"),fe=new RegExp(ae),de=new RegExp("^"+oe+"$"),he={
ID:new RegExp("^#("+re+")"),CLASS:new RegExp("^\\.("+re+")"),TAG:new RegExp("^("+re.replace("w","w*")+")"),
ATTR:new RegExp("^"+ie),PSEUDO:new RegExp("^"+ae),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ne+"*(even|odd|(([+-]|)(\\d*)n|)"+ne+"*(?:([+-]|)"+ne+"*(\\d+)|))"+ne+"*\\)|)","i"),
bool:new RegExp("^(?:"+te+")$","i"),needsContext:new RegExp("^"+ne+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ne+"*((?:-\\d)?\\d*)"+ne+"*\\)|)(?=[^-]|$)","i")
},ge=/^(?:input|select|textarea|button)$/i,me=/^h\d$/i,ve=/^[^{]+\{\s*\[native \w/,ye=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Ee=/[+~]/,be=/'|\\/g,xe=new RegExp("\\\\([\\da-f]{1,6}"+ne+"?|("+ne+")|.)","ig"),we=function(e,t,n){
var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320);

},Ce=function(){k()};try{Z.apply(X=J.call(F.childNodes),F.childNodes),X[F.childNodes.length].nodeType;

}catch(_e){Z={apply:X.length?function(e,t){Q.apply(e,J.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);
e.length=n-1}}}x=t.support={},_=t.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;

return t?"HTML"!==t.nodeName:!1},k=t.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:F;

return r!==S&&9===r.nodeType&&r.documentElement?(S=r,P=r.documentElement,n=r.defaultView,
n&&n!==n.top&&(n.addEventListener?n.addEventListener("unload",Ce,!1):n.attachEvent&&n.attachEvent("onunload",Ce)),
I=!_(r),x.attributes=o(function(e){return e.className="i",!e.getAttribute("className");

}),x.getElementsByTagName=o(function(e){return e.appendChild(r.createComment("")),
!e.getElementsByTagName("*").length}),x.getElementsByClassName=ve.test(r.getElementsByClassName),
x.getById=o(function(e){return P.appendChild(e).id=U,!r.getElementsByName||!r.getElementsByName(U).length;

}),x.getById?(w.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&I){
var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},w.filter.ID=function(e){
var t=e.replace(xe,we);return function(e){return e.getAttribute("id")===t}}):(delete w.find.ID,
w.filter.ID=function(e){var t=e.replace(xe,we);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");

return n&&n.value===t}}),w.find.TAG=x.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):x.qsa?t.querySelectorAll(e):void 0;

}:function(e,t){var n,r=[],o=0,i=t.getElementsByTagName(e);if("*"===e){for(;n=i[o++];)1===n.nodeType&&r.push(n);

return r}return i},w.find.CLASS=x.getElementsByClassName&&function(e,t){return I?t.getElementsByClassName(e):void 0;

},j=[],A=[],(x.qsa=ve.test(r.querySelectorAll))&&(o(function(e){P.appendChild(e).innerHTML="<a id='"+U+"'></a><select id='"+U+"-\f]' msallowcapture=''><option selected=''></option></select>",
e.querySelectorAll("[msallowcapture^='']").length&&A.push("[*^$]="+ne+"*(?:''|\"\")"),
e.querySelectorAll("[selected]").length||A.push("\\["+ne+"*(?:value|"+te+")"),e.querySelectorAll("[id~="+U+"-]").length||A.push("~="),
e.querySelectorAll(":checked").length||A.push(":checked"),e.querySelectorAll("a#"+U+"+*").length||A.push(".#.+[+~]");

}),o(function(e){var t=r.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),
e.querySelectorAll("[name=d]").length&&A.push("name"+ne+"*[*^$|!~]?="),e.querySelectorAll(":enabled").length||A.push(":enabled",":disabled"),
e.querySelectorAll("*,:x"),A.push(",.*:")})),(x.matchesSelector=ve.test(L=P.matches||P.webkitMatchesSelector||P.mozMatchesSelector||P.oMatchesSelector||P.msMatchesSelector))&&o(function(e){
x.disconnectedMatch=L.call(e,"div"),L.call(e,"[s!='']:x"),j.push("!=",ae)}),A=A.length&&new RegExp(A.join("|")),
j=j.length&&new RegExp(j.join("|")),t=ve.test(P.compareDocumentPosition),V=t||ve.test(P.contains)?function(e,t){
var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)));

}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},Y=t?function(e,t){
if(e===t)return T=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;

return n?n:(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,
1&n||!x.sortDetached&&t.compareDocumentPosition(e)===n?e===r||e.ownerDocument===F&&V(F,e)?-1:t===r||t.ownerDocument===F&&V(F,t)?1:O?ee(O,e)-ee(O,t):0:4&n?-1:1);

}:function(e,t){if(e===t)return T=!0,0;var n,o=0,i=e.parentNode,u=t.parentNode,s=[e],c=[t];

if(!i||!u)return e===r?-1:t===r?1:i?-1:u?1:O?ee(O,e)-ee(O,t):0;if(i===u)return a(e,t);

for(n=e;n=n.parentNode;)s.unshift(n);for(n=t;n=n.parentNode;)c.unshift(n);for(;s[o]===c[o];)o++;

return o?a(s[o],c[o]):s[o]===F?-1:c[o]===F?1:0},r):S},t.matches=function(e,n){return t(e,null,null,n);

},t.matchesSelector=function(e,n){if((e.ownerDocument||e)!==S&&k(e),n=n.replace(pe,"='$1']"),
!(!x.matchesSelector||!I||j&&j.test(n)||A&&A.test(n)))try{var r=L.call(e,n);if(r||x.disconnectedMatch||e.document&&11!==e.document.nodeType)return r;

}catch(o){}return t(n,S,null,[e]).length>0},t.contains=function(e,t){return(e.ownerDocument||e)!==S&&k(e),
V(e,t)},t.attr=function(e,t){(e.ownerDocument||e)!==S&&k(e);var n=w.attrHandle[t.toLowerCase()],r=n&&$.call(w.attrHandle,t.toLowerCase())?n(e,t,!I):void 0;

return void 0!==r?r:x.attributes||!I?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null;

},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e);

},t.uniqueSort=function(e){var t,n=[],r=0,o=0;if(T=!x.detectDuplicates,O=!x.sortStable&&e.slice(0),
e.sort(Y),T){for(;t=e[o++];)t===e[o]&&(r=n.push(o));for(;r--;)e.splice(n[r],1)}return O=null,
e},C=t.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){
if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=C(e);

}else if(3===o||4===o)return e.nodeValue}else for(;t=e[r++];)n+=C(t);return n},w=t.selectors={
cacheLength:50,createPseudo:r,match:he,attrHandle:{},find:{},relative:{">":{dir:"parentNode",
first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"
}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(xe,we),e[3]=(e[3]||e[4]||e[5]||"").replace(xe,we),
"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),
"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),
e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];

return he.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&fe.test(n)&&(t=N(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),
e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(xe,we).toLowerCase();

return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t;

}},CLASS:function(e){var t=H[e+" "];return t||(t=new RegExp("(^|"+ne+")"+e+"("+ne+"|$)"))&&H(e,function(e){
return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"");

})},ATTR:function(e,n,r){return function(o){var i=t.attr(o,e);return null==i?"!="===n:n?(i+="",
"="===n?i===r:"!="===n?i!==r:"^="===n?r&&0===i.indexOf(r):"*="===n?r&&i.indexOf(r)>-1:"$="===n?r&&i.slice(-r.length)===r:"~="===n?(" "+i.replace(ue," ")+" ").indexOf(r)>-1:"|="===n?i===r||i.slice(0,r.length+1)===r+"-":!1):!0;

}},CHILD:function(e,t,n,r,o){var i="nth"!==e.slice(0,3),a="last"!==e.slice(-4),u="of-type"===t;

return 1===r&&0===o?function(e){return!!e.parentNode}:function(t,n,s){var c,l,p,f,d,h,g=i!==a?"nextSibling":"previousSibling",m=t.parentNode,v=u&&t.nodeName.toLowerCase(),y=!s&&!u;

if(m){if(i){for(;g;){for(p=t;p=p[g];)if(u?p.nodeName.toLowerCase()===v:1===p.nodeType)return!1;

h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&y){
for(l=m[U]||(m[U]={}),c=l[e]||[],d=c[0]===q&&c[1],f=c[0]===q&&c[2],p=d&&m.childNodes[d];p=++d&&p&&p[g]||(f=d=0)||h.pop();)if(1===p.nodeType&&++f&&p===t){
l[e]=[q,d,f];break}}else if(y&&(c=(t[U]||(t[U]={}))[e])&&c[0]===q)f=c[1];else for(;(p=++d&&p&&p[g]||(f=d=0)||h.pop())&&((u?p.nodeName.toLowerCase()!==v:1!==p.nodeType)||!++f||(y&&((p[U]||(p[U]={}))[e]=[q,f]),
p!==t)););return f-=o,f===r||f%r===0&&f/r>=0}}},PSEUDO:function(e,n){var o,i=w.pseudos[e]||w.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);

return i[U]?i(n):i.length>1?(o=[e,e,"",n],w.setFilters.hasOwnProperty(e.toLowerCase())?r(function(e,t){
for(var r,o=i(e,n),a=o.length;a--;)r=ee(e,o[a]),e[r]=!(t[r]=o[a])}):function(e){return i(e,0,o);

}):i}},pseudos:{not:r(function(e){var t=[],n=[],o=M(e.replace(se,"$1"));return o[U]?r(function(e,t,n,r){
for(var i,a=o(e,null,r,[]),u=e.length;u--;)(i=a[u])&&(e[u]=!(t[u]=i))}):function(e,r,i){
return t[0]=e,o(t,null,i,n),t[0]=null,!n.pop()}}),has:r(function(e){return function(n){
return t(e,n).length>0}}),contains:r(function(e){return e=e.replace(xe,we),function(t){
return(t.textContent||t.innerText||C(t)).indexOf(e)>-1}}),lang:r(function(e){return de.test(e||"")||t.error("unsupported lang: "+e),
e=e.replace(xe,we).toLowerCase(),function(t){var n;do if(n=I?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),
n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){
var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===P;

},focus:function(e){return e===S.activeElement&&(!S.hasFocus||S.hasFocus())&&!!(e.type||e.href||~e.tabIndex);

},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0;

},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected;

},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0;

},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;

return!0},parent:function(e){return!w.pseudos.empty(e)},header:function(e){return me.test(e.nodeName);

},input:function(e){return ge.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();

return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase());

},first:c(function(){return[0]}),last:c(function(e,t){return[t-1]}),eq:c(function(e,t,n){
return[0>n?n+t:n]}),even:c(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),
odd:c(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:c(function(e,t,n){
for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:c(function(e,t,n){for(var r=0>n?n+t:n;++r<t;)e.push(r);

return e})}},w.pseudos.nth=w.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,
image:!0})w.pseudos[b]=u(b);for(b in{submit:!0,reset:!0})w.pseudos[b]=s(b);return p.prototype=w.filters=w.pseudos,
w.setFilters=new p,N=t.tokenize=function(e,n){var r,o,i,a,u,s,c,l=z[e+" "];if(l)return n?0:l.slice(0);

for(u=e,s=[],c=w.preFilter;u;){(!r||(o=ce.exec(u)))&&(o&&(u=u.slice(o[0].length)||u),
s.push(i=[])),r=!1,(o=le.exec(u))&&(r=o.shift(),i.push({value:r,type:o[0].replace(se," ")
}),u=u.slice(r.length));for(a in w.filter)!(o=he[a].exec(u))||c[a]&&!(o=c[a](o))||(r=o.shift(),
i.push({value:r,type:a,matches:o}),u=u.slice(r.length));if(!r)break}return n?u.length:u?t.error(e):z(e,s).slice(0);

},M=t.compile=function(e,t){var n,r=[],o=[],i=W[e+" "];if(!i){for(t||(t=N(e)),n=t.length;n--;)i=y(t[n]),
i[U]?r.push(i):o.push(i);i=W(e,E(o,r)),i.selector=e}return i},D=t.select=function(e,t,n,r){
var o,i,a,u,s,c="function"==typeof e&&e,p=!r&&N(e=c.selector||e);if(n=n||[],1===p.length){
if(i=p[0]=p[0].slice(0),i.length>2&&"ID"===(a=i[0]).type&&x.getById&&9===t.nodeType&&I&&w.relative[i[1].type]){
if(t=(w.find.ID(a.matches[0].replace(xe,we),t)||[])[0],!t)return n;c&&(t=t.parentNode),
e=e.slice(i.shift().value.length)}for(o=he.needsContext.test(e)?0:i.length;o--&&(a=i[o],
!w.relative[u=a.type]);)if((s=w.find[u])&&(r=s(a.matches[0].replace(xe,we),Ee.test(i[0].type)&&l(t.parentNode)||t))){
if(i.splice(o,1),e=r.length&&f(i),!e)return Z.apply(n,r),n;break}}return(c||M(e,p))(r,t,!I,n,Ee.test(e)&&l(t.parentNode)||t),
n},x.sortStable=U.split("").sort(Y).join("")===U,x.detectDuplicates=!!T,k(),x.sortDetached=o(function(e){
return 1&e.compareDocumentPosition(S.createElement("div"))}),o(function(e){return e.innerHTML="<a href='#'></a>",
"#"===e.firstChild.getAttribute("href")})||i("type|href|height|width",function(e,t,n){
return n?void 0:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),x.attributes&&o(function(e){
return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value");

})||i("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?void 0:e.defaultValue;

}),o(function(e){return null==e.getAttribute("disabled")})||i(te,function(e,t,n){
var r;return n?void 0:e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null;

}),t}(e);J.find=oe,J.expr=oe.selectors,J.expr[":"]=J.expr.pseudos,J.unique=oe.uniqueSort,
J.text=oe.getText,J.isXMLDoc=oe.isXML,J.contains=oe.contains;var ie=J.expr.match.needsContext,ae=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,ue=/^.[^:#\[\.,]*$/;

J.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?J.find.matchesSelector(r,e)?[r]:[]:J.find.matches(e,J.grep(t,function(e){
return 1===e.nodeType}))},J.fn.extend({find:function(e){var t,n=this.length,r=[],o=this;

if("string"!=typeof e)return this.pushStack(J(e).filter(function(){for(t=0;n>t;t++)if(J.contains(o[t],this))return!0;

}));for(t=0;n>t;t++)J.find(e,o[t],r);return r=this.pushStack(n>1?J.unique(r):r),r.selector=this.selector?this.selector+" "+e:e,
r},filter:function(e){return this.pushStack(r(this,e||[],!1))},not:function(e){return this.pushStack(r(this,e||[],!0));

},is:function(e){return!!r(this,"string"==typeof e&&ie.test(e)?J(e):e||[],!1).length;

}});var se,ce=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,le=J.fn.init=function(e,t){var n,r;

if(!e)return this;if("string"==typeof e){if(n="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:ce.exec(e),
!n||!n[1]&&t)return!t||t.jquery?(t||se).find(e):this.constructor(t).find(e);if(n[1]){
if(t=t instanceof J?t[0]:t,J.merge(this,J.parseHTML(n[1],t&&t.nodeType?t.ownerDocument||t:Q,!0)),
ae.test(n[1])&&J.isPlainObject(t))for(n in t)J.isFunction(this[n])?this[n](t[n]):this.attr(n,t[n]);

return this}return r=Q.getElementById(n[2]),r&&r.parentNode&&(this.length=1,this[0]=r),
this.context=Q,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,
this):J.isFunction(e)?"undefined"!=typeof se.ready?se.ready(e):e(J):(void 0!==e.selector&&(this.selector=e.selector,
this.context=e.context),J.makeArray(e,this))};le.prototype=J.fn,se=J(Q);var pe=/^(?:parents|prev(?:Until|All))/,fe={
children:!0,contents:!0,next:!0,prev:!0};J.extend({dir:function(e,t,n){for(var r=[],o=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){
if(o&&J(e).is(n))break;r.push(e)}return r},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);

return n}}),J.fn.extend({has:function(e){var t=J(e,this),n=t.length;return this.filter(function(){
for(var e=0;n>e;e++)if(J.contains(this,t[e]))return!0})},closest:function(e,t){for(var n,r=0,o=this.length,i=[],a=ie.test(e)||"string"!=typeof e?J(e,t||this.context):0;o>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&J.find.matchesSelector(n,e))){
i.push(n);break}return this.pushStack(i.length>1?J.unique(i):i)},index:function(e){
return e?"string"==typeof e?Y.call(J(e),this[0]):Y.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1;

},add:function(e,t){return this.pushStack(J.unique(J.merge(this.get(),J(e,t))))},
addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e));

}}),J.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null;

},parents:function(e){return J.dir(e,"parentNode")},parentsUntil:function(e,t,n){
return J.dir(e,"parentNode",n)},next:function(e){return o(e,"nextSibling")},prev:function(e){
return o(e,"previousSibling")},nextAll:function(e){return J.dir(e,"nextSibling")},
prevAll:function(e){return J.dir(e,"previousSibling")},nextUntil:function(e,t,n){
return J.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return J.dir(e,"previousSibling",n);

},siblings:function(e){return J.sibling((e.parentNode||{}).firstChild,e)},children:function(e){
return J.sibling(e.firstChild)},contents:function(e){return e.contentDocument||J.merge([],e.childNodes);

}},function(e,t){J.fn[e]=function(n,r){var o=J.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),
r&&"string"==typeof r&&(o=J.filter(r,o)),this.length>1&&(fe[e]||J.unique(o),pe.test(e)&&o.reverse()),
this.pushStack(o)}});var de=/\S+/g,he={};J.Callbacks=function(e){e="string"==typeof e?he[e]||i(e):J.extend({},e);

var t,n,r,o,a,u,s=[],c=!e.once&&[],l=function(i){for(t=e.memory&&i,n=!0,u=o||0,o=0,
a=s.length,r=!0;s&&a>u;u++)if(s[u].apply(i[0],i[1])===!1&&e.stopOnFalse){t=!1;break;

}r=!1,s&&(c?c.length&&l(c.shift()):t?s=[]:p.disable())},p={add:function(){if(s){var n=s.length;

!function i(t){J.each(t,function(t,n){var r=J.type(n);"function"===r?e.unique&&p.has(n)||s.push(n):n&&n.length&&"string"!==r&&i(n);

})}(arguments),r?a=s.length:t&&(o=n,l(t))}return this},remove:function(){return s&&J.each(arguments,function(e,t){
for(var n;(n=J.inArray(t,s,n))>-1;)s.splice(n,1),r&&(a>=n&&a--,u>=n&&u--)}),this},
has:function(e){return e?J.inArray(e,s)>-1:!(!s||!s.length)},empty:function(){return s=[],
a=0,this},disable:function(){return s=c=t=void 0,this},disabled:function(){return!s;

},lock:function(){return c=void 0,t||p.disable(),this},locked:function(){return!c;

},fireWith:function(e,t){return!s||n&&!c||(t=t||[],t=[e,t.slice?t.slice():t],r?c.push(t):l(t)),
this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!n;

}};return p},J.extend({Deferred:function(e){var t=[["resolve","done",J.Callbacks("once memory"),"resolved"],["reject","fail",J.Callbacks("once memory"),"rejected"],["notify","progress",J.Callbacks("memory")]],n="pending",r={
state:function(){return n},always:function(){return o.done(arguments).fail(arguments),
this},then:function(){var e=arguments;return J.Deferred(function(n){J.each(t,function(t,i){
var a=J.isFunction(e[t])&&e[t];o[i[1]](function(){var e=a&&a.apply(this,arguments);

e&&J.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[i[0]+"With"](this===r?n.promise():this,a?[e]:arguments);

})}),e=null}).promise()},promise:function(e){return null!=e?J.extend(e,r):r}},o={};

return r.pipe=r.then,J.each(t,function(e,i){var a=i[2],u=i[3];r[i[1]]=a.add,u&&a.add(function(){
n=u},t[1^e][2].disable,t[2][2].lock),o[i[0]]=function(){return o[i[0]+"With"](this===o?r:this,arguments),
this},o[i[0]+"With"]=a.fireWith}),r.promise(o),e&&e.call(o,o),o},when:function(e){
var t,n,r,o=0,i=H.call(arguments),a=i.length,u=1!==a||e&&J.isFunction(e.promise)?a:0,s=1===u?e:J.Deferred(),c=function(e,n,r){
return function(o){n[e]=this,r[e]=arguments.length>1?H.call(arguments):o,r===t?s.notifyWith(n,r):--u||s.resolveWith(n,r);

}};if(a>1)for(t=new Array(a),n=new Array(a),r=new Array(a);a>o;o++)i[o]&&J.isFunction(i[o].promise)?i[o].promise().done(c(o,r,i)).fail(s.reject).progress(c(o,n,t)):--u;

return u||s.resolveWith(r,i),s.promise()}});var ge;J.fn.ready=function(e){return J.ready.promise().done(e),
this},J.extend({isReady:!1,readyWait:1,holdReady:function(e){e?J.readyWait++:J.ready(!0);

},ready:function(e){(e===!0?--J.readyWait:J.isReady)||(J.isReady=!0,e!==!0&&--J.readyWait>0||(ge.resolveWith(Q,[J]),
J.fn.triggerHandler&&(J(Q).triggerHandler("ready"),J(Q).off("ready"))))}}),J.ready.promise=function(t){
return ge||(ge=J.Deferred(),"complete"===Q.readyState?setTimeout(J.ready):(Q.addEventListener("DOMContentLoaded",a,!1),
e.addEventListener("load",a,!1))),ge.promise(t)},J.ready.promise();var me=J.access=function(e,t,n,r,o,i,a){
var u=0,s=e.length,c=null==n;if("object"===J.type(n)){o=!0;for(u in n)J.access(e,t,u,n[u],!0,i,a);

}else if(void 0!==r&&(o=!0,J.isFunction(r)||(a=!0),c&&(a?(t.call(e,r),t=null):(c=t,
t=function(e,t,n){return c.call(J(e),n)})),t))for(;s>u;u++)t(e[u],n,a?r:r.call(e[u],u,t(e[u],n)));

return o?e:c?t.call(e):s?t(e[0],n):i};J.acceptData=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType;

},u.uid=1,u.accepts=J.acceptData,u.prototype={key:function(e){if(!u.accepts(e))return 0;

var t={},n=e[this.expando];if(!n){n=u.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t);

}catch(r){t[this.expando]=n,J.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),
n},set:function(e,t,n){var r,o=this.key(e),i=this.cache[o];if("string"==typeof t)i[t]=n;
else if(J.isEmptyObject(i))J.extend(this.cache[o],t);else for(r in t)i[r]=t[r];return i;

},get:function(e,t){var n=this.cache[this.key(e)];return void 0===t?n:n[t]},access:function(e,t,n){
var r;return void 0===t||t&&"string"==typeof t&&void 0===n?(r=this.get(e,t),void 0!==r?r:this.get(e,J.camelCase(t))):(this.set(e,t,n),
void 0!==n?n:t)},remove:function(e,t){var n,r,o,i=this.key(e),a=this.cache[i];if(void 0===t)this.cache[i]={};
else{J.isArray(t)?r=t.concat(t.map(J.camelCase)):(o=J.camelCase(t),t in a?r=[t,o]:(r=o,
r=r in a?[r]:r.match(de)||[])),n=r.length;for(;n--;)delete a[r[n]]}},hasData:function(e){
return!J.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]];

}};var ve=new u,ye=new u,Ee=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,be=/([A-Z])/g;J.extend({
hasData:function(e){return ye.hasData(e)||ve.hasData(e)},data:function(e,t,n){return ye.access(e,t,n);

},removeData:function(e,t){ye.remove(e,t)},_data:function(e,t,n){return ve.access(e,t,n);

},_removeData:function(e,t){ve.remove(e,t)}}),J.fn.extend({data:function(e,t){var n,r,o,i=this[0],a=i&&i.attributes;

if(void 0===e){if(this.length&&(o=ye.get(i),1===i.nodeType&&!ve.get(i,"hasDataAttrs"))){
for(n=a.length;n--;)a[n]&&(r=a[n].name,0===r.indexOf("data-")&&(r=J.camelCase(r.slice(5)),
s(i,r,o[r])));ve.set(i,"hasDataAttrs",!0)}return o}return"object"==typeof e?this.each(function(){
ye.set(this,e)}):me(this,function(t){var n,r=J.camelCase(e);if(i&&void 0===t){if(n=ye.get(i,e),
void 0!==n)return n;if(n=ye.get(i,r),void 0!==n)return n;if(n=s(i,r,void 0),void 0!==n)return n;

}else this.each(function(){var n=ye.get(this,r);ye.set(this,r,t),-1!==e.indexOf("-")&&void 0!==n&&ye.set(this,e,t);

})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){
ye.remove(this,e)})}}),J.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",
r=ve.get(e,t),n&&(!r||J.isArray(n)?r=ve.access(e,t,J.makeArray(n)):r.push(n)),r||[]):void 0;

},dequeue:function(e,t){t=t||"fx";var n=J.queue(e,t),r=n.length,o=n.shift(),i=J._queueHooks(e,t),a=function(){
J.dequeue(e,t)};"inprogress"===o&&(o=n.shift(),r--),o&&("fx"===t&&n.unshift("inprogress"),
delete i.stop,o.call(e,a,i)),!r&&i&&i.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";

return ve.get(e,n)||ve.access(e,n,{empty:J.Callbacks("once memory").add(function(){
ve.remove(e,[t+"queue",n])})})}}),J.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,
e="fx",n--),arguments.length<n?J.queue(this[0],e):void 0===t?this:this.each(function(){
var n=J.queue(this,e,t);J._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&J.dequeue(this,e);

})},dequeue:function(e){return this.each(function(){J.dequeue(this,e)})},clearQueue:function(e){
return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,o=J.Deferred(),i=this,a=this.length,u=function(){
--r||o.resolveWith(i,[i])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";a--;)n=ve.get(i[a],e+"queueHooks"),
n&&n.empty&&(r++,n.empty.add(u));return u(),o.promise(t)}});var xe=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,we=["Top","Right","Bottom","Left"],Ce=function(e,t){
return e=t||e,"none"===J.css(e,"display")||!J.contains(e.ownerDocument,e)},_e=/^(?:checkbox|radio)$/i;

!function(){var e=Q.createDocumentFragment(),t=e.appendChild(Q.createElement("div")),n=Q.createElement("input");

n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),
t.appendChild(n),G.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,t.innerHTML="<textarea>x</textarea>",
G.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue}();var Ne="undefined";G.focusinBubbles="onfocusin"in e;

var Me=/^key/,De=/^(?:mouse|pointer|contextmenu)|click/,Re=/^(?:focusinfocus|focusoutblur)$/,Oe=/^([^.]*)(?:\.(.+)|)$/;

J.event={global:{},add:function(e,t,n,r,o){var i,a,u,s,c,l,p,f,d,h,g,m=ve.get(e);
if(m)for(n.handler&&(i=n,n=i.handler,o=i.selector),n.guid||(n.guid=J.guid++),(s=m.events)||(s=m.events={}),
(a=m.handle)||(a=m.handle=function(t){return typeof J!==Ne&&J.event.triggered!==t.type?J.event.dispatch.apply(e,arguments):void 0;

}),t=(t||"").match(de)||[""],c=t.length;c--;)u=Oe.exec(t[c])||[],d=g=u[1],h=(u[2]||"").split(".").sort(),
d&&(p=J.event.special[d]||{},d=(o?p.delegateType:p.bindType)||d,p=J.event.special[d]||{},
l=J.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:o,needsContext:o&&J.expr.match.needsContext.test(o),
namespace:h.join(".")},i),(f=s[d])||(f=s[d]=[],f.delegateCount=0,p.setup&&p.setup.call(e,r,h,a)!==!1||e.addEventListener&&e.addEventListener(d,a,!1)),
p.add&&(p.add.call(e,l),l.handler.guid||(l.handler.guid=n.guid)),o?f.splice(f.delegateCount++,0,l):f.push(l),
J.event.global[d]=!0)},remove:function(e,t,n,r,o){var i,a,u,s,c,l,p,f,d,h,g,m=ve.hasData(e)&&ve.get(e);

if(m&&(s=m.events)){for(t=(t||"").match(de)||[""],c=t.length;c--;)if(u=Oe.exec(t[c])||[],
d=g=u[1],h=(u[2]||"").split(".").sort(),d){for(p=J.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,
f=s[d]||[],u=u[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=i=f.length;i--;)l=f[i],
!o&&g!==l.origType||n&&n.guid!==l.guid||u&&!u.test(l.namespace)||r&&r!==l.selector&&("**"!==r||!l.selector)||(f.splice(i,1),
l.selector&&f.delegateCount--,p.remove&&p.remove.call(e,l));a&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||J.removeEvent(e,d,m.handle),
delete s[d])}else for(d in s)J.event.remove(e,d+t[c],n,r,!0);J.isEmptyObject(s)&&(delete m.handle,
ve.remove(e,"events"))}},trigger:function(t,n,r,o){var i,a,u,s,c,l,p,f=[r||Q],d=X.call(t,"type")?t.type:t,h=X.call(t,"namespace")?t.namespace.split("."):[];

if(a=u=r=r||Q,3!==r.nodeType&&8!==r.nodeType&&!Re.test(d+J.event.triggered)&&(d.indexOf(".")>=0&&(h=d.split("."),
d=h.shift(),h.sort()),c=d.indexOf(":")<0&&"on"+d,t=t[J.expando]?t:new J.Event(d,"object"==typeof t&&t),
t.isTrigger=o?2:3,t.namespace=h.join("."),t.namespace_re=t.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,
t.result=void 0,t.target||(t.target=r),n=null==n?[t]:J.makeArray(n,[t]),p=J.event.special[d]||{},
o||!p.trigger||p.trigger.apply(r,n)!==!1)){if(!o&&!p.noBubble&&!J.isWindow(r)){for(s=p.delegateType||d,
Re.test(s+d)||(a=a.parentNode);a;a=a.parentNode)f.push(a),u=a;u===(r.ownerDocument||Q)&&f.push(u.defaultView||u.parentWindow||e);

}for(i=0;(a=f[i++])&&!t.isPropagationStopped();)t.type=i>1?s:p.bindType||d,l=(ve.get(a,"events")||{})[t.type]&&ve.get(a,"handle"),
l&&l.apply(a,n),l=c&&a[c],l&&l.apply&&J.acceptData(a)&&(t.result=l.apply(a,n),t.result===!1&&t.preventDefault());

return t.type=d,o||t.isDefaultPrevented()||p._default&&p._default.apply(f.pop(),n)!==!1||!J.acceptData(r)||c&&J.isFunction(r[d])&&!J.isWindow(r)&&(u=r[c],
u&&(r[c]=null),J.event.triggered=d,r[d](),J.event.triggered=void 0,u&&(r[c]=u)),t.result;

}},dispatch:function(e){e=J.event.fix(e);var t,n,r,o,i,a=[],u=H.call(arguments),s=(ve.get(this,"events")||{})[e.type]||[],c=J.event.special[e.type]||{};

if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){
for(a=J.event.handlers.call(this,e,s),t=0;(o=a[t++])&&!e.isPropagationStopped();)for(e.currentTarget=o.elem,
n=0;(i=o.handlers[n++])&&!e.isImmediatePropagationStopped();)(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,
e.data=i.data,r=((J.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),
void 0!==r&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()));return c.postDispatch&&c.postDispatch.call(this,e),
e.result}},handlers:function(e,t){var n,r,o,i,a=[],u=t.delegateCount,s=e.target;if(u&&s.nodeType&&(!e.button||"click"!==e.type))for(;s!==this;s=s.parentNode||this)if(s.disabled!==!0||"click"!==e.type){
for(r=[],n=0;u>n;n++)i=t[n],o=i.selector+" ",void 0===r[o]&&(r[o]=i.needsContext?J(o,this).index(s)>=0:J.find(o,this,null,[s]).length),
r[o]&&r.push(i);r.length&&a.push({elem:s,handlers:r})}return u<t.length&&a.push({
elem:this,handlers:t.slice(u)}),a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){
return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{
props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
filter:function(e,t){var n,r,o,i=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||Q,
r=n.documentElement,o=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||o&&o.scrollLeft||0)-(r&&r.clientLeft||o&&o.clientLeft||0),
e.pageY=t.clientY+(r&&r.scrollTop||o&&o.scrollTop||0)-(r&&r.clientTop||o&&o.clientTop||0)),
e.which||void 0===i||(e.which=1&i?1:2&i?3:4&i?2:0),e}},fix:function(e){if(e[J.expando])return e;

var t,n,r,o=e.type,i=e,a=this.fixHooks[o];for(a||(this.fixHooks[o]=a=De.test(o)?this.mouseHooks:Me.test(o)?this.keyHooks:{}),
r=a.props?this.props.concat(a.props):this.props,e=new J.Event(i),t=r.length;t--;)n=r[t],
e[n]=i[n];return e.target||(e.target=Q),3===e.target.nodeType&&(e.target=e.target.parentNode),
a.filter?a.filter(e,i):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==p()&&this.focus?(this.focus(),
!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===p()&&this.blur?(this.blur(),
!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&J.nodeName(this,"input")?(this.click(),
!1):void 0},_default:function(e){return J.nodeName(e.target,"a")}},beforeunload:{
postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result);

}}},simulate:function(e,t,n,r){var o=J.extend(new J.Event,n,{type:e,isSimulated:!0,
originalEvent:{}});r?J.event.trigger(o,null,t):J.event.dispatch.call(t,o),o.isDefaultPrevented()&&n.preventDefault();

}},J.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1);

},J.Event=function(e,t){return this instanceof J.Event?(e&&e.type?(this.originalEvent=e,
this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?c:l):this.type=e,
t&&J.extend(this,t),this.timeStamp=e&&e.timeStamp||J.now(),void(this[J.expando]=!0)):new J.Event(e,t);

},J.Event.prototype={isDefaultPrevented:l,isPropagationStopped:l,isImmediatePropagationStopped:l,
preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=c,e&&e.preventDefault&&e.preventDefault();

},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=c,
e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;

this.isImmediatePropagationStopped=c,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),
this.stopPropagation()}},J.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",
pointerleave:"pointerout"},function(e,t){J.event.special[e]={delegateType:t,bindType:t,
handle:function(e){var n,r=this,o=e.relatedTarget,i=e.handleObj;return(!o||o!==r&&!J.contains(r,o))&&(e.type=i.origType,
n=i.handler.apply(this,arguments),e.type=t),n}}}),G.focusinBubbles||J.each({focus:"focusin",
blur:"focusout"},function(e,t){var n=function(e){J.event.simulate(t,e.target,J.event.fix(e),!0);

};J.event.special[t]={setup:function(){var r=this.ownerDocument||this,o=ve.access(r,t);

o||r.addEventListener(e,n,!0),ve.access(r,t,(o||0)+1)},teardown:function(){var r=this.ownerDocument||this,o=ve.access(r,t)-1;

o?ve.access(r,t,o):(r.removeEventListener(e,n,!0),ve.remove(r,t))}}}),J.fn.extend({
on:function(e,t,n,r,o){var i,a;if("object"==typeof e){"string"!=typeof t&&(n=n||t,
t=void 0);for(a in e)this.on(a,t,n,e[a],o);return this}if(null==n&&null==r?(r=t,n=t=void 0):null==r&&("string"==typeof t?(r=n,
n=void 0):(r=n,n=t,t=void 0)),r===!1)r=l;else if(!r)return this;return 1===o&&(i=r,
r=function(e){return J().off(e),i.apply(this,arguments)},r.guid=i.guid||(i.guid=J.guid++)),
this.each(function(){J.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1);

},off:function(e,t,n){var r,o;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,
J(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),
this;if("object"==typeof e){for(o in e)this.off(o,t,e[o]);return this}return(t===!1||"function"==typeof t)&&(n=t,
t=void 0),n===!1&&(n=l),this.each(function(){J.event.remove(this,e,n,t)})},trigger:function(e,t){
return this.each(function(){J.event.trigger(e,t,this)})},triggerHandler:function(e,t){
var n=this[0];return n?J.event.trigger(e,t,n,!0):void 0}});var Te=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ke=/<([\w:]+)/,Se=/<|&#?\w+;/,Pe=/<(?:script|style|link)/i,Ie=/checked\s*(?:[^=]|=\s*.checked.)/i,Ae=/^$|\/(?:java|ecma)script/i,je=/^true\/(.*)/,Le=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Ve={
option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],
col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],
td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};Ve.optgroup=Ve.option,
Ve.tbody=Ve.tfoot=Ve.colgroup=Ve.caption=Ve.thead,Ve.th=Ve.td,J.extend({clone:function(e,t,n){
var r,o,i,a,u=e.cloneNode(!0),s=J.contains(e.ownerDocument,e);if(!(G.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||J.isXMLDoc(e)))for(a=v(u),
i=v(e),r=0,o=i.length;o>r;r++)y(i[r],a[r]);if(t)if(n)for(i=i||v(e),a=a||v(u),r=0,
o=i.length;o>r;r++)m(i[r],a[r]);else m(e,u);return a=v(u,"script"),a.length>0&&g(a,!s&&v(e,"script")),
u},buildFragment:function(e,t,n,r){for(var o,i,a,u,s,c,l=t.createDocumentFragment(),p=[],f=0,d=e.length;d>f;f++)if(o=e[f],
o||0===o)if("object"===J.type(o))J.merge(p,o.nodeType?[o]:o);else if(Se.test(o)){
for(i=i||l.appendChild(t.createElement("div")),a=(ke.exec(o)||["",""])[1].toLowerCase(),
u=Ve[a]||Ve._default,i.innerHTML=u[1]+o.replace(Te,"<$1></$2>")+u[2],c=u[0];c--;)i=i.lastChild;

J.merge(p,i.childNodes),i=l.firstChild,i.textContent=""}else p.push(t.createTextNode(o));

for(l.textContent="",f=0;o=p[f++];)if((!r||-1===J.inArray(o,r))&&(s=J.contains(o.ownerDocument,o),
i=v(l.appendChild(o),"script"),s&&g(i),n))for(c=0;o=i[c++];)Ae.test(o.type||"")&&n.push(o);

return l},cleanData:function(e){for(var t,n,r,o,i=J.event.special,a=0;void 0!==(n=e[a]);a++){
if(J.acceptData(n)&&(o=n[ve.expando],o&&(t=ve.cache[o]))){if(t.events)for(r in t.events)i[r]?J.event.remove(n,r):J.removeEvent(n,r,t.handle);

ve.cache[o]&&delete ve.cache[o]}delete ye.cache[n[ye.expando]]}}}),J.fn.extend({text:function(e){
return me(this,function(e){return void 0===e?J.text(this):this.empty().each(function(){
(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=e)});

},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){
if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=f(this,e);t.appendChild(e);

}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){
var t=f(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){
this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){
this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){
for(var n,r=e?J.filter(e,this):this,o=0;null!=(n=r[o]);o++)t||1!==n.nodeType||J.cleanData(v(n)),
n.parentNode&&(t&&J.contains(n.ownerDocument,n)&&g(v(n,"script")),n.parentNode.removeChild(n));

return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(J.cleanData(v(e,!1)),
e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,
this.map(function(){return J.clone(this,e,t)})},html:function(e){return me(this,function(e){
var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;

if("string"==typeof e&&!Pe.test(e)&&!Ve[(ke.exec(e)||["",""])[1].toLowerCase()]){
e=e.replace(Te,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(J.cleanData(v(t,!1)),
t.innerHTML=e);t=0}catch(o){}}t&&this.empty().append(e)},null,e,arguments.length);

},replaceWith:function(){var e=arguments[0];return this.domManip(arguments,function(t){
e=this.parentNode,J.cleanData(v(this)),e&&e.replaceChild(t,this)}),e&&(e.length||e.nodeType)?this:this.remove();

},detach:function(e){return this.remove(e,!0)},domManip:function(e,t){e=z.apply([],e);

var n,r,o,i,a,u,s=0,c=this.length,l=this,p=c-1,f=e[0],g=J.isFunction(f);if(g||c>1&&"string"==typeof f&&!G.checkClone&&Ie.test(f))return this.each(function(n){
var r=l.eq(n);g&&(e[0]=f.call(this,n,r.html())),r.domManip(e,t)});if(c&&(n=J.buildFragment(e,this[0].ownerDocument,!1,this),
r=n.firstChild,1===n.childNodes.length&&(n=r),r)){for(o=J.map(v(n,"script"),d),i=o.length;c>s;s++)a=n,
s!==p&&(a=J.clone(a,!0,!0),i&&J.merge(o,v(a,"script"))),t.call(this[s],a,s);if(i)for(u=o[o.length-1].ownerDocument,
J.map(o,h),s=0;i>s;s++)a=o[s],Ae.test(a.type||"")&&!ve.access(a,"globalEval")&&J.contains(u,a)&&(a.src?J._evalUrl&&J._evalUrl(a.src):J.globalEval(a.textContent.replace(Le,"")));

}return this}}),J.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",
insertAfter:"after",replaceAll:"replaceWith"},function(e,t){J.fn[e]=function(e){for(var n,r=[],o=J(e),i=o.length-1,a=0;i>=a;a++)n=a===i?this:this.clone(!0),
J(o[a])[t](n),W.apply(r,n.get());return this.pushStack(r)}});var Ue,Fe={},qe=/^margin/,Be=new RegExp("^("+xe+")(?!px)[a-z%]+$","i"),He=function(t){
return t.ownerDocument.defaultView.opener?t.ownerDocument.defaultView.getComputedStyle(t,null):e.getComputedStyle(t,null);

};!function(){function t(){a.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",
a.innerHTML="",o.appendChild(i);var t=e.getComputedStyle(a,null);n="1%"!==t.top,r="4px"===t.width,
o.removeChild(i)}var n,r,o=Q.documentElement,i=Q.createElement("div"),a=Q.createElement("div");

a.style&&(a.style.backgroundClip="content-box",a.cloneNode(!0).style.backgroundClip="",
G.clearCloneStyle="content-box"===a.style.backgroundClip,i.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",
i.appendChild(a),e.getComputedStyle&&J.extend(G,{pixelPosition:function(){return t(),
n},boxSizingReliable:function(){return null==r&&t(),r},reliableMarginRight:function(){
var t,n=a.appendChild(Q.createElement("div"));return n.style.cssText=a.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
n.style.marginRight=n.style.width="0",a.style.width="1px",o.appendChild(i),t=!parseFloat(e.getComputedStyle(n,null).marginRight),
o.removeChild(i),a.removeChild(n),t}}))}(),J.swap=function(e,t,n,r){var o,i,a={};
for(i in t)a[i]=e.style[i],e.style[i]=t[i];o=n.apply(e,r||[]);for(i in t)e.style[i]=a[i];

return o};var ze=/^(none|table(?!-c[ea]).+)/,We=new RegExp("^("+xe+")(.*)$","i"),Ye=new RegExp("^([+-])=("+xe+")","i"),Ke={
position:"absolute",visibility:"hidden",display:"block"},$e={letterSpacing:"0",fontWeight:"400"
},Xe=["Webkit","O","Moz","ms"];J.extend({cssHooks:{opacity:{get:function(e,t){if(t){
var n=x(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,
flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,
widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){
if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,i,a,u=J.camelCase(t),s=e.style;

return t=J.cssProps[u]||(J.cssProps[u]=C(s,u)),a=J.cssHooks[t]||J.cssHooks[u],void 0===n?a&&"get"in a&&void 0!==(o=a.get(e,!1,r))?o:s[t]:(i=typeof n,
"string"===i&&(o=Ye.exec(n))&&(n=(o[1]+1)*o[2]+parseFloat(J.css(e,t)),i="number"),
null!=n&&n===n&&("number"!==i||J.cssNumber[u]||(n+="px"),G.clearCloneStyle||""!==n||0!==t.indexOf("background")||(s[t]="inherit"),
a&&"set"in a&&void 0===(n=a.set(e,n,r))||(s[t]=n)),void 0)}},css:function(e,t,n,r){
var o,i,a,u=J.camelCase(t);return t=J.cssProps[u]||(J.cssProps[u]=C(e.style,u)),a=J.cssHooks[t]||J.cssHooks[u],
a&&"get"in a&&(o=a.get(e,!0,n)),void 0===o&&(o=x(e,t,r)),"normal"===o&&t in $e&&(o=$e[t]),
""===n||n?(i=parseFloat(o),n===!0||J.isNumeric(i)?i||0:o):o}}),J.each(["height","width"],function(e,t){
J.cssHooks[t]={get:function(e,n,r){return n?ze.test(J.css(e,"display"))&&0===e.offsetWidth?J.swap(e,Ke,function(){
return M(e,t,r)}):M(e,t,r):void 0},set:function(e,n,r){var o=r&&He(e);return _(e,n,r?N(e,t,r,"border-box"===J.css(e,"boxSizing",!1,o),o):0);

}}}),J.cssHooks.marginRight=w(G.reliableMarginRight,function(e,t){return t?J.swap(e,{
display:"inline-block"},x,[e,"marginRight"]):void 0}),J.each({margin:"",padding:"",
border:"Width"},function(e,t){J.cssHooks[e+t]={expand:function(n){for(var r=0,o={},i="string"==typeof n?n.split(" "):[n];4>r;r++)o[e+we[r]+t]=i[r]||i[r-2]||i[0];

return o}},qe.test(e)||(J.cssHooks[e+t].set=_)}),J.fn.extend({css:function(e,t){return me(this,function(e,t,n){
var r,o,i={},a=0;if(J.isArray(t)){for(r=He(e),o=t.length;o>a;a++)i[t[a]]=J.css(e,t[a],!1,r);

return i}return void 0!==n?J.style(e,t,n):J.css(e,t)},e,t,arguments.length>1)},show:function(){
return D(this,!0)},hide:function(){return D(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){
Ce(this)?J(this).show():J(this).hide()})}}),J.Tween=R,R.prototype={constructor:R,
init:function(e,t,n,r,o,i){this.elem=e,this.prop=n,this.easing=o||"swing",this.options=t,
this.start=this.now=this.cur(),this.end=r,this.unit=i||(J.cssNumber[n]?"":"px")},
cur:function(){var e=R.propHooks[this.prop];return e&&e.get?e.get(this):R.propHooks._default.get(this);

},run:function(e){var t,n=R.propHooks[this.prop];return this.pos=t=this.options.duration?J.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,
this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),
n&&n.set?n.set(this):R.propHooks._default.set(this),this}},R.prototype.init.prototype=R.prototype,
R.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=J.css(e.elem,e.prop,""),
t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){J.fx.step[e.prop]?J.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[J.cssProps[e.prop]]||J.cssHooks[e.prop])?J.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now;

}}},R.propHooks.scrollTop=R.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now);

}},J.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2;

}},J.fx=R.prototype.init,J.fx.step={};var Ge,Qe,Ze=/^(?:toggle|show|hide)$/,Je=new RegExp("^(?:([+-])=|)("+xe+")([a-z%]*)$","i"),et=/queueHooks$/,tt=[S],nt={
"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),o=Je.exec(t),i=o&&o[3]||(J.cssNumber[e]?"":"px"),a=(J.cssNumber[e]||"px"!==i&&+r)&&Je.exec(J.css(n.elem,e)),u=1,s=20;

if(a&&a[3]!==i){i=i||a[3],o=o||[],a=+r||1;do u=u||".5",a/=u,J.style(n.elem,e,a+i);
while(u!==(u=n.cur()/r)&&1!==u&&--s)}return o&&(a=n.start=+a||+r||0,n.unit=i,n.end=o[1]?a+(o[1]+1)*o[2]:+o[2]),
n}]};J.Animation=J.extend(I,{tweener:function(e,t){J.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");

for(var n,r=0,o=e.length;o>r;r++)n=e[r],nt[n]=nt[n]||[],nt[n].unshift(t)},prefilter:function(e,t){
t?tt.unshift(e):tt.push(e)}}),J.speed=function(e,t,n){var r=e&&"object"==typeof e?J.extend({},e):{
complete:n||!n&&t||J.isFunction(e)&&e,duration:e,easing:n&&t||t&&!J.isFunction(t)&&t
};return r.duration=J.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in J.fx.speeds?J.fx.speeds[r.duration]:J.fx.speeds._default,
(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){
J.isFunction(r.old)&&r.old.call(this),r.queue&&J.dequeue(this,r.queue)},r},J.fn.extend({
fadeTo:function(e,t,n,r){return this.filter(Ce).css("opacity",0).show().end().animate({
opacity:t},e,n,r)},animate:function(e,t,n,r){var o=J.isEmptyObject(e),i=J.speed(t,n,r),a=function(){
var t=I(this,J.extend({},e),i);(o||ve.get(this,"finish"))&&t.stop(!0)};return a.finish=a,
o||i.queue===!1?this.each(a):this.queue(i.queue,a)},stop:function(e,t,n){var r=function(e){
var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),
this.each(function(){var t=!0,o=null!=e&&e+"queueHooks",i=J.timers,a=ve.get(this);

if(o)a[o]&&a[o].stop&&r(a[o]);else for(o in a)a[o]&&a[o].stop&&et.test(o)&&r(a[o]);

for(o=i.length;o--;)i[o].elem!==this||null!=e&&i[o].queue!==e||(i[o].anim.stop(n),
t=!1,i.splice(o,1));(t||!n)&&J.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),
this.each(function(){var t,n=ve.get(this),r=n[e+"queue"],o=n[e+"queueHooks"],i=J.timers,a=r?r.length:0;

for(n.finish=!0,J.queue(this,e,[]),o&&o.stop&&o.stop.call(this,!0),t=i.length;t--;)i[t].elem===this&&i[t].queue===e&&(i[t].anim.stop(!0),
i.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish;

})}}),J.each(["toggle","show","hide"],function(e,t){var n=J.fn[t];J.fn[t]=function(e,r,o){
return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(T(t,!0),e,r,o);

}}),J.each({slideDown:T("show"),slideUp:T("hide"),slideToggle:T("toggle"),fadeIn:{
opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){
J.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),J.timers=[],J.fx.tick=function(){
var e,t=0,n=J.timers;for(Ge=J.now();t<n.length;t++)e=n[t],e()||n[t]!==e||n.splice(t--,1);

n.length||J.fx.stop(),Ge=void 0},J.fx.timer=function(e){J.timers.push(e),e()?J.fx.start():J.timers.pop();

},J.fx.interval=13,J.fx.start=function(){Qe||(Qe=setInterval(J.fx.tick,J.fx.interval));

},J.fx.stop=function(){clearInterval(Qe),Qe=null},J.fx.speeds={slow:600,fast:200,
_default:400},J.fn.delay=function(e,t){return e=J.fx?J.fx.speeds[e]||e:e,t=t||"fx",
this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r);

}})},function(){var e=Q.createElement("input"),t=Q.createElement("select"),n=t.appendChild(Q.createElement("option"));

e.type="checkbox",G.checkOn=""!==e.value,G.optSelected=n.selected,t.disabled=!0,G.optDisabled=!n.disabled,
e=Q.createElement("input"),e.value="t",e.type="radio",G.radioValue="t"===e.value}();

var rt,ot,it=J.expr.attrHandle;J.fn.extend({attr:function(e,t){return me(this,J.attr,e,t,arguments.length>1);

},removeAttr:function(e){return this.each(function(){J.removeAttr(this,e)})}}),J.extend({
attr:function(e,t,n){var r,o,i=e.nodeType;if(e&&3!==i&&8!==i&&2!==i)return typeof e.getAttribute===Ne?J.prop(e,t,n):(1===i&&J.isXMLDoc(e)||(t=t.toLowerCase(),
r=J.attrHooks[t]||(J.expr.match.bool.test(t)?ot:rt)),void 0===n?r&&"get"in r&&null!==(o=r.get(e,t))?o:(o=J.find.attr(e,t),
null==o?void 0:o):null!==n?r&&"set"in r&&void 0!==(o=r.set(e,n,t))?o:(e.setAttribute(t,n+""),
n):void J.removeAttr(e,t))},removeAttr:function(e,t){var n,r,o=0,i=t&&t.match(de);

if(i&&1===e.nodeType)for(;n=i[o++];)r=J.propFix[n]||n,J.expr.match.bool.test(n)&&(e[r]=!1),
e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!G.radioValue&&"radio"===t&&J.nodeName(e,"input")){
var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}}}),ot={set:function(e,t,n){
return t===!1?J.removeAttr(e,n):e.setAttribute(n,n),n}},J.each(J.expr.match.bool.source.match(/\w+/g),function(e,t){
var n=it[t]||J.find.attr;it[t]=function(e,t,r){var o,i;return r||(i=it[t],it[t]=o,
o=null!=n(e,t,r)?t.toLowerCase():null,it[t]=i),o}});var at=/^(?:input|select|textarea|button)$/i;

J.fn.extend({prop:function(e,t){return me(this,J.prop,e,t,arguments.length>1)},removeProp:function(e){
return this.each(function(){delete this[J.propFix[e]||e]})}}),J.extend({propFix:{
"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,o,i,a=e.nodeType;
if(e&&3!==a&&8!==a&&2!==a)return i=1!==a||!J.isXMLDoc(e),i&&(t=J.propFix[t]||t,o=J.propHooks[t]),
void 0!==n?o&&"set"in o&&void 0!==(r=o.set(e,n,t))?r:e[t]=n:o&&"get"in o&&null!==(r=o.get(e,t))?r:e[t];

},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||at.test(e.nodeName)||e.href?e.tabIndex:-1;

}}}}),G.optSelected||(J.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,
null}}),J.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){
J.propFix[this.toLowerCase()]=this});var ut=/[\t\r\n\f]/g;J.fn.extend({addClass:function(e){
var t,n,r,o,i,a,u="string"==typeof e&&e,s=0,c=this.length;if(J.isFunction(e))return this.each(function(t){
J(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(de)||[];c>s;s++)if(n=this[s],
r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(ut," "):" ")){for(i=0;o=t[i++];)r.indexOf(" "+o+" ")<0&&(r+=o+" ");

a=J.trim(r),n.className!==a&&(n.className=a)}return this},removeClass:function(e){
var t,n,r,o,i,a,u=0===arguments.length||"string"==typeof e&&e,s=0,c=this.length;if(J.isFunction(e))return this.each(function(t){
J(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(de)||[];c>s;s++)if(n=this[s],
r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(ut," "):"")){for(i=0;o=t[i++];)for(;r.indexOf(" "+o+" ")>=0;)r=r.replace(" "+o+" "," ");

a=e?J.trim(r):"",n.className!==a&&(n.className=a)}return this},toggleClass:function(e,t){
var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):this.each(J.isFunction(e)?function(n){
J(this).toggleClass(e.call(this,n,this.className,t),t)}:function(){if("string"===n)for(var t,r=0,o=J(this),i=e.match(de)||[];t=i[r++];)o.hasClass(t)?o.removeClass(t):o.addClass(t);
else(n===Ne||"boolean"===n)&&(this.className&&ve.set(this,"__className__",this.className),
this.className=this.className||e===!1?"":ve.get(this,"__className__")||"")})},hasClass:function(e){
for(var t=" "+e+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(ut," ").indexOf(t)>=0)return!0;

return!1}});var st=/\r/g;J.fn.extend({val:function(e){var t,n,r,o=this[0];{if(arguments.length)return r=J.isFunction(e),
this.each(function(n){var o;1===this.nodeType&&(o=r?e.call(this,n,J(this).val()):e,
null==o?o="":"number"==typeof o?o+="":J.isArray(o)&&(o=J.map(o,function(e){return null==e?"":e+"";

})),t=J.valHooks[this.type]||J.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&void 0!==t.set(this,o,"value")||(this.value=o));

});if(o)return t=J.valHooks[o.type]||J.valHooks[o.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(o,"value"))?n:(n=o.value,
"string"==typeof n?n.replace(st,""):null==n?"":n)}}}),J.extend({valHooks:{option:{
get:function(e){var t=J.find.attr(e,"value");return null!=t?t:J.trim(J.text(e))}},
select:{get:function(e){for(var t,n,r=e.options,o=e.selectedIndex,i="select-one"===e.type||0>o,a=i?null:[],u=i?o+1:r.length,s=0>o?u:i?o:0;u>s;s++)if(n=r[s],
!(!n.selected&&s!==o||(G.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&J.nodeName(n.parentNode,"optgroup"))){
if(t=J(n).val(),i)return t;a.push(t)}return a},set:function(e,t){for(var n,r,o=e.options,i=J.makeArray(t),a=o.length;a--;)r=o[a],
(r.selected=J.inArray(r.value,i)>=0)&&(n=!0);return n||(e.selectedIndex=-1),i}}}}),
J.each(["radio","checkbox"],function(){J.valHooks[this]={set:function(e,t){return J.isArray(t)?e.checked=J.inArray(J(e).val(),t)>=0:void 0;

}},G.checkOn||(J.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value;

})}),J.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){
J.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t);

}}),J.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},
bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t);

},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){
return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var ct=J.now(),lt=/\?/;

J.parseJSON=function(e){return JSON.parse(e+"")},J.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;

try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=void 0}return(!t||t.getElementsByTagName("parsererror").length)&&J.error("Invalid XML: "+e),
t};var pt=/#.*$/,ft=/([?&])_=[^&]*/,dt=/^(.*?):[ \t]*([^\r\n]*)$/gm,ht=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,gt=/^(?:GET|HEAD)$/,mt=/^\/\//,vt=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,yt={},Et={},bt="*/".concat("*"),xt=e.location.href,wt=vt.exec(xt.toLowerCase())||[];

J.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:xt,type:"GET",isLocal:ht.test(wt[1]),
global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",
accepts:{"*":bt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",
json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/
},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{
"* text":String,"text html":!0,"text json":J.parseJSON,"text xml":J.parseXML},flatOptions:{
url:!0,context:!0}},ajaxSetup:function(e,t){return t?L(L(e,J.ajaxSettings),t):L(J.ajaxSettings,e);

},ajaxPrefilter:A(yt),ajaxTransport:A(Et),ajax:function(e,t){function n(e,t,n,a){
var s,l,v,y,b,w=t;2!==E&&(E=2,u&&clearTimeout(u),r=void 0,i=a||"",x.readyState=e>0?4:0,
s=e>=200&&300>e||304===e,n&&(y=V(p,x,n)),y=U(p,y,x,s),s?(p.ifModified&&(b=x.getResponseHeader("Last-Modified"),
b&&(J.lastModified[o]=b),b=x.getResponseHeader("etag"),b&&(J.etag[o]=b)),204===e||"HEAD"===p.type?w="nocontent":304===e?w="notmodified":(w=y.state,
l=y.data,v=y.error,s=!v)):(v=w,(e||!w)&&(w="error",0>e&&(e=0))),x.status=e,x.statusText=(t||w)+"",
s?h.resolveWith(f,[l,w,x]):h.rejectWith(f,[x,w,v]),x.statusCode(m),m=void 0,c&&d.trigger(s?"ajaxSuccess":"ajaxError",[x,p,s?l:v]),
g.fireWith(f,[x,w]),c&&(d.trigger("ajaxComplete",[x,p]),--J.active||J.event.trigger("ajaxStop")));

}"object"==typeof e&&(t=e,e=void 0),t=t||{};var r,o,i,a,u,s,c,l,p=J.ajaxSetup({},t),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?J(f):J.event,h=J.Deferred(),g=J.Callbacks("once memory"),m=p.statusCode||{},v={},y={},E=0,b="canceled",x={
readyState:0,getResponseHeader:function(e){var t;if(2===E){if(!a)for(a={};t=dt.exec(i);)a[t[1].toLowerCase()]=t[2];

t=a[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===E?i:null;

},setRequestHeader:function(e,t){var n=e.toLowerCase();return E||(e=y[n]=y[n]||e,
v[e]=t),this},overrideMimeType:function(e){return E||(p.mimeType=e),this},statusCode:function(e){
var t;if(e)if(2>E)for(t in e)m[t]=[m[t],e[t]];else x.always(e[x.status]);return this;

},abort:function(e){var t=e||b;return r&&r.abort(t),n(0,t),this}};if(h.promise(x).complete=g.add,
x.success=x.done,x.error=x.fail,p.url=((e||p.url||xt)+"").replace(pt,"").replace(mt,wt[1]+"//"),
p.type=t.method||t.type||p.method||p.type,p.dataTypes=J.trim(p.dataType||"*").toLowerCase().match(de)||[""],
null==p.crossDomain&&(s=vt.exec(p.url.toLowerCase()),p.crossDomain=!(!s||s[1]===wt[1]&&s[2]===wt[2]&&(s[3]||("http:"===s[1]?"80":"443"))===(wt[3]||("http:"===wt[1]?"80":"443")))),
p.data&&p.processData&&"string"!=typeof p.data&&(p.data=J.param(p.data,p.traditional)),
j(yt,p,t,x),2===E)return x;c=J.event&&p.global,c&&0===J.active++&&J.event.trigger("ajaxStart"),
p.type=p.type.toUpperCase(),p.hasContent=!gt.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(lt.test(o)?"&":"?")+p.data,
delete p.data),p.cache===!1&&(p.url=ft.test(o)?o.replace(ft,"$1_="+ct++):o+(lt.test(o)?"&":"?")+"_="+ct++)),
p.ifModified&&(J.lastModified[o]&&x.setRequestHeader("If-Modified-Since",J.lastModified[o]),
J.etag[o]&&x.setRequestHeader("If-None-Match",J.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||t.contentType)&&x.setRequestHeader("Content-Type",p.contentType),
x.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+bt+"; q=0.01":""):p.accepts["*"]);

for(l in p.headers)x.setRequestHeader(l,p.headers[l]);if(p.beforeSend&&(p.beforeSend.call(f,x,p)===!1||2===E))return x.abort();

b="abort";for(l in{success:1,error:1,complete:1})x[l](p[l]);if(r=j(Et,p,t,x)){x.readyState=1,
c&&d.trigger("ajaxSend",[x,p]),p.async&&p.timeout>0&&(u=setTimeout(function(){x.abort("timeout");

},p.timeout));try{E=1,r.send(v,n)}catch(w){if(!(2>E))throw w;n(-1,w)}}else n(-1,"No Transport");

return x},getJSON:function(e,t,n){return J.get(e,t,n,"json")},getScript:function(e,t){
return J.get(e,void 0,t,"script")}}),J.each(["get","post"],function(e,t){J[t]=function(e,n,r,o){
return J.isFunction(n)&&(o=o||r,r=n,n=void 0),J.ajax({url:e,type:t,dataType:o,data:n,
success:r})}}),J._evalUrl=function(e){return J.ajax({url:e,type:"GET",dataType:"script",
async:!1,global:!1,"throws":!0})},J.fn.extend({wrapAll:function(e){var t;return J.isFunction(e)?this.each(function(t){
J(this).wrapAll(e.call(this,t))}):(this[0]&&(t=J(e,this[0].ownerDocument).eq(0).clone(!0),
this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;

return e}).append(this)),this)},wrapInner:function(e){return this.each(J.isFunction(e)?function(t){
J(this).wrapInner(e.call(this,t))}:function(){var t=J(this),n=t.contents();n.length?n.wrapAll(e):t.append(e);

})},wrap:function(e){var t=J.isFunction(e);return this.each(function(n){J(this).wrapAll(t?e.call(this,n):e);

})},unwrap:function(){return this.parent().each(function(){J.nodeName(this,"body")||J(this).replaceWith(this.childNodes);

}).end()}}),J.expr.filters.hidden=function(e){return e.offsetWidth<=0&&e.offsetHeight<=0;

},J.expr.filters.visible=function(e){return!J.expr.filters.hidden(e)};var Ct=/%20/g,_t=/\[\]$/,Nt=/\r?\n/g,Mt=/^(?:submit|button|image|reset|file)$/i,Dt=/^(?:input|select|textarea|keygen)/i;

J.param=function(e,t){var n,r=[],o=function(e,t){t=J.isFunction(t)?t():null==t?"":t,
r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(void 0===t&&(t=J.ajaxSettings&&J.ajaxSettings.traditional),
J.isArray(e)||e.jquery&&!J.isPlainObject(e))J.each(e,function(){o(this.name,this.value);

});else for(n in e)F(n,e[n],t,o);return r.join("&").replace(Ct,"+")},J.fn.extend({
serialize:function(){return J.param(this.serializeArray())},serializeArray:function(){
return this.map(function(){var e=J.prop(this,"elements");return e?J.makeArray(e):this;

}).filter(function(){var e=this.type;return this.name&&!J(this).is(":disabled")&&Dt.test(this.nodeName)&&!Mt.test(e)&&(this.checked||!_e.test(e));

}).map(function(e,t){var n=J(this).val();return null==n?null:J.isArray(n)?J.map(n,function(e){
return{name:t.name,value:e.replace(Nt,"\r\n")}}):{name:t.name,value:n.replace(Nt,"\r\n")
}}).get()}}),J.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}
};var Rt=0,Ot={},Tt={0:200,1223:204},kt=J.ajaxSettings.xhr();e.attachEvent&&e.attachEvent("onunload",function(){
for(var e in Ot)Ot[e]()}),G.cors=!!kt&&"withCredentials"in kt,G.ajax=kt=!!kt,J.ajaxTransport(function(e){
var t;return G.cors||kt&&!e.crossDomain?{send:function(n,r){var o,i=e.xhr(),a=++Rt;

if(i.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(o in e.xhrFields)i[o]=e.xhrFields[o];

e.mimeType&&i.overrideMimeType&&i.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");

for(o in n)i.setRequestHeader(o,n[o]);t=function(e){return function(){t&&(delete Ot[a],
t=i.onload=i.onerror=null,"abort"===e?i.abort():"error"===e?r(i.status,i.statusText):r(Tt[i.status]||i.status,i.statusText,"string"==typeof i.responseText?{
text:i.responseText}:void 0,i.getAllResponseHeaders()))}},i.onload=t(),i.onerror=t("error"),
t=Ot[a]=t("abort");try{i.send(e.hasContent&&e.data||null)}catch(u){if(t)throw u}},
abort:function(){t&&t()}}:void 0}),J.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return J.globalEval(e),
e}}}),J.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET");

}),J.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,o){
t=J("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){
t.remove(),n=null,e&&o("error"===e.type?404:200,e.type)}),Q.head.appendChild(t[0]);

},abort:function(){n&&n()}}}});var St=[],Pt=/(=)\?(?=&|$)|\?\?/;J.ajaxSetup({jsonp:"callback",
jsonpCallback:function(){var e=St.pop()||J.expando+"_"+ct++;return this[e]=!0,e}}),
J.ajaxPrefilter("json jsonp",function(t,n,r){var o,i,a,u=t.jsonp!==!1&&(Pt.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&Pt.test(t.data)&&"data");

return u||"jsonp"===t.dataTypes[0]?(o=t.jsonpCallback=J.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,
u?t[u]=t[u].replace(Pt,"$1"+o):t.jsonp!==!1&&(t.url+=(lt.test(t.url)?"&":"?")+t.jsonp+"="+o),
t.converters["script json"]=function(){return a||J.error(o+" was not called"),a[0];

},t.dataTypes[0]="json",i=e[o],e[o]=function(){a=arguments},r.always(function(){e[o]=i,
t[o]&&(t.jsonpCallback=n.jsonpCallback,St.push(o)),a&&J.isFunction(i)&&i(a[0]),a=i=void 0;

}),"script"):void 0}),J.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null;

"boolean"==typeof t&&(n=t,t=!1),t=t||Q;var r=ae.exec(e),o=!n&&[];return r?[t.createElement(r[1])]:(r=J.buildFragment([e],t,o),
o&&o.length&&J(o).remove(),J.merge([],r.childNodes))};var It=J.fn.load;J.fn.load=function(e,t,n){
if("string"!=typeof e&&It)return It.apply(this,arguments);var r,o,i,a=this,u=e.indexOf(" ");

return u>=0&&(r=J.trim(e.slice(u)),e=e.slice(0,u)),J.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(o="POST"),
a.length>0&&J.ajax({url:e,type:o,dataType:"html",data:t}).done(function(e){i=arguments,
a.html(r?J("<div>").append(J.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){
a.each(n,i||[e.responseText,t,e])}),this},J.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){
J.fn[t]=function(e){return this.on(t,e)}}),J.expr.filters.animated=function(e){return J.grep(J.timers,function(t){
return e===t.elem}).length};var At=e.document.documentElement;J.offset={setOffset:function(e,t,n){
var r,o,i,a,u,s,c,l=J.css(e,"position"),p=J(e),f={};"static"===l&&(e.style.position="relative"),
u=p.offset(),i=J.css(e,"top"),s=J.css(e,"left"),c=("absolute"===l||"fixed"===l)&&(i+s).indexOf("auto")>-1,
c?(r=p.position(),a=r.top,o=r.left):(a=parseFloat(i)||0,o=parseFloat(s)||0),J.isFunction(t)&&(t=t.call(e,n,u)),
null!=t.top&&(f.top=t.top-u.top+a),null!=t.left&&(f.left=t.left-u.left+o),"using"in t?t.using.call(e,f):p.css(f);

}},J.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){
J.offset.setOffset(this,e,t)});var t,n,r=this[0],o={top:0,left:0},i=r&&r.ownerDocument;

if(i)return t=i.documentElement,J.contains(t,r)?(typeof r.getBoundingClientRect!==Ne&&(o=r.getBoundingClientRect()),
n=q(i),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft
}):o},position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===J.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),
t=this.offset(),J.nodeName(e[0],"html")||(r=e.offset()),r.top+=J.css(e[0],"borderTopWidth",!0),
r.left+=J.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-J.css(n,"marginTop",!0),
left:t.left-r.left-J.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){
for(var e=this.offsetParent||At;e&&!J.nodeName(e,"html")&&"static"===J.css(e,"position");)e=e.offsetParent;

return e||At})}}),J.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){
var r="pageYOffset"===n;J.fn[t]=function(o){return me(this,function(t,o,i){var a=q(t);

return void 0===i?a?a[n]:t[o]:void(a?a.scrollTo(r?e.pageXOffset:i,r?i:e.pageYOffset):t[o]=i);

},t,o,arguments.length,null)}}),J.each(["top","left"],function(e,t){J.cssHooks[t]=w(G.pixelPosition,function(e,n){
return n?(n=x(e,t),Be.test(n)?J(e).position()[t]+"px":n):void 0})}),J.each({Height:"height",
Width:"width"},function(e,t){J.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){
J.fn[r]=function(r,o){var i=arguments.length&&(n||"boolean"!=typeof r),a=n||(r===!0||o===!0?"margin":"border");

return me(this,function(t,n,r){var o;return J.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,
Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===r?J.css(t,n,a):J.style(t,n,r,a);

},t,i?r:void 0,i,null)}})}),J.fn.size=function(){return this.length},J.fn.andSelf=J.fn.addBack,
"function"==typeof define&&define.amd&&define("jquery",[],function(){return J});var jt=e.jQuery,Lt=e.$;

return J.noConflict=function(t){return e.$===J&&(e.$=Lt),t&&e.jQuery===J&&(e.jQuery=jt),
J},typeof t===Ne&&(e.jQuery=e.$=J),J})},{}],24:[function(e,t,n){function r(e,t,n){
function r(){v&&clearTimeout(v),d&&clearTimeout(d),E=0,d=v=y=void 0}function i(t,n){
n&&clearTimeout(n),d=v=y=void 0,t&&(E=c(),h=e.apply(m,f),v||d||(f=m=void 0))}function s(){
var e=t-(c()-g);0>=e||e>t?i(y,d):v=setTimeout(s,e)}function l(){i(x,v)}function p(){
if(f=arguments,g=c(),m=this,y=x&&(v||!w),b===!1)var n=w&&!v;else{d||w||(E=g);var r=b-(g-E),o=0>=r||r>b;

o?(d&&(d=clearTimeout(d)),E=g,h=e.apply(m,f)):d||(d=setTimeout(l,r))}return o&&v?v=clearTimeout(v):v||t===b||(v=setTimeout(s,t)),
n&&(o=!0,h=e.apply(m,f)),!o||v||d||(f=m=void 0),h}var f,d,h,g,m,v,y,E=0,b=!1,x=!0;

if("function"!=typeof e)throw new TypeError(a);if(t=0>t?0:+t||0,n===!0){var w=!0;
x=!1}else o(n)&&(w=!!n.leading,b="maxWait"in n&&u(+n.maxWait||0,t),x="trailing"in n?!!n.trailing:x);

return p.cancel=r,p}function o(e){var t=typeof e;return!!e&&("object"==t||"function"==t);

}var i=e("lodash._getnative"),a="Expected a function",u=Math.max,s=i(Date,"now"),c=s||function(){
return(new Date).getTime()};t.exports=r},{"lodash._getnative":25}],25:[function(e,t,n){
function r(e){return!!e&&"object"==typeof e}function o(e,t){var n=null==e?void 0:e[t];

return u(n)?n:void 0}function i(e){return a(e)&&d.call(e)==s}function a(e){var t=typeof e;

return!!e&&("object"==t||"function"==t)}function u(e){return null==e?!1:i(e)?h.test(p.call(e)):r(e)&&c.test(e);

}var s="[object Function]",c=/^\[object .+?Constructor\]$/,l=Object.prototype,p=Function.prototype.toString,f=l.hasOwnProperty,d=l.toString,h=RegExp("^"+p.call(f).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");

t.exports=o},{}],26:[function(e,t,n){"use strict";t.exports=n=function(e,t,n,r){var o,i;

if("string"==typeof t){for(o=t.split(r||"."),i=0;i<o.length;i++){if(!e||!e.hasOwnProperty(o[i])&&!e[o[i]])return n;

e=e[o[i]]}return e}return n}},{}],27:[function(e,t,n){"use strict";var r=function(e,t,n,o){
var i,a;return e&&"object"==typeof e||(e={}),"string"==typeof t&&(i=t.split(o||"."),
a=i[0],i.length>1?(i.shift(),e[a]=r(e[a],i.join(o||"."),n,o)):e[a]=n),e};t.exports=n=r;

},{}],28:[function(e,t,n){"use strict";var r=e("./focusNode"),o={componentDidMount:function(){
this.props.autoFocus&&r(this.getDOMNode())}};t.exports=o},{"./focusNode":146}],29:[function(e,t,n){
"use strict";function r(){var e=window.opera;return"object"==typeof e&&"function"==typeof e.version&&parseInt(e.version(),10)<=12;

}function o(e){return(e.ctrlKey||e.altKey||e.metaKey)&&!(e.ctrlKey&&e.altKey)}function i(e){
switch(e){case R.topCompositionStart:return O.compositionStart;case R.topCompositionEnd:
return O.compositionEnd;case R.topCompositionUpdate:return O.compositionUpdate}}function a(e,t){
return e===R.topKeyDown&&t.keyCode===x}function u(e,t){switch(e){case R.topKeyUp:
return-1!==b.indexOf(t.keyCode);case R.topKeyDown:return t.keyCode!==x;case R.topKeyPress:
case R.topMouseDown:case R.topBlur:return!0;default:return!1}}function s(e){var t=e.detail;

return"object"==typeof t&&"data"in t?t.data:null}function c(e,t,n,r){var o,c;if(w?o=i(e):k?u(e,r)&&(o=O.compositionEnd):a(e,r)&&(o=O.compositionStart),
!o)return null;N&&(k||o!==O.compositionStart?o===O.compositionEnd&&k&&(c=k.getData()):k=m.getPooled(t));

var l=v.getPooled(o,n,r);if(c)l.data=c;else{var p=s(r);null!==p&&(l.data=p)}return h.accumulateTwoPhaseDispatches(l),
l}function l(e,t){switch(e){case R.topCompositionEnd:return s(t);case R.topKeyPress:
var n=t.which;return n!==M?null:(T=!0,D);case R.topTextInput:var r=t.data;return r===D&&T?null:r;

default:return null}}function p(e,t){if(k){if(e===R.topCompositionEnd||u(e,t)){var n=k.getData();

return m.release(k),k=null,n}return null}switch(e){case R.topPaste:return null;case R.topKeyPress:
return t.which&&!o(t)?String.fromCharCode(t.which):null;case R.topCompositionEnd:
return N?null:t.data;default:return null}}function f(e,t,n,r){var o;if(o=_?l(e,r):p(e,r),
!o)return null;var i=y.getPooled(O.beforeInput,n,r);return i.data=o,h.accumulateTwoPhaseDispatches(i),
i}var d=e("./EventConstants"),h=e("./EventPropagators"),g=e("./ExecutionEnvironment"),m=e("./FallbackCompositionState"),v=e("./SyntheticCompositionEvent"),y=e("./SyntheticInputEvent"),E=e("./keyOf"),b=[9,13,27,32],x=229,w=g.canUseDOM&&"CompositionEvent"in window,C=null;

g.canUseDOM&&"documentMode"in document&&(C=document.documentMode);var _=g.canUseDOM&&"TextEvent"in window&&!C&&!r(),N=g.canUseDOM&&(!w||C&&C>8&&11>=C),M=32,D=String.fromCharCode(M),R=d.topLevelTypes,O={
beforeInput:{phasedRegistrationNames:{bubbled:E({onBeforeInput:null}),captured:E({
onBeforeInputCapture:null})},dependencies:[R.topCompositionEnd,R.topKeyPress,R.topTextInput,R.topPaste]
},compositionEnd:{phasedRegistrationNames:{bubbled:E({onCompositionEnd:null}),captured:E({
onCompositionEndCapture:null})},dependencies:[R.topBlur,R.topCompositionEnd,R.topKeyDown,R.topKeyPress,R.topKeyUp,R.topMouseDown]
},compositionStart:{phasedRegistrationNames:{bubbled:E({onCompositionStart:null}),
captured:E({onCompositionStartCapture:null})},dependencies:[R.topBlur,R.topCompositionStart,R.topKeyDown,R.topKeyPress,R.topKeyUp,R.topMouseDown]
},compositionUpdate:{phasedRegistrationNames:{bubbled:E({onCompositionUpdate:null
}),captured:E({onCompositionUpdateCapture:null})},dependencies:[R.topBlur,R.topCompositionUpdate,R.topKeyDown,R.topKeyPress,R.topKeyUp,R.topMouseDown]
}},T=!1,k=null,S={eventTypes:O,extractEvents:function(e,t,n,r){return[c(e,t,n,r),f(e,t,n,r)];

}};t.exports=S},{"./EventConstants":41,"./EventPropagators":46,"./ExecutionEnvironment":47,
"./FallbackCompositionState":48,"./SyntheticCompositionEvent":120,"./SyntheticInputEvent":124,
"./keyOf":168}],30:[function(e,t,n){"use strict";function r(e,t){return e+t.charAt(0).toUpperCase()+t.substring(1);

}var o={boxFlex:!0,boxFlexGroup:!0,columnCount:!0,flex:!0,flexGrow:!0,flexPositive:!0,
flexShrink:!0,flexNegative:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,
order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,strokeDashoffset:!0,
strokeOpacity:!0,strokeWidth:!0},i=["Webkit","ms","Moz","O"];Object.keys(o).forEach(function(e){
i.forEach(function(t){o[r(t,e)]=o[e]})});var a={background:{backgroundImage:!0,backgroundPosition:!0,
backgroundRepeat:!0,backgroundColor:!0},border:{borderWidth:!0,borderStyle:!0,borderColor:!0
},borderBottom:{borderBottomWidth:!0,borderBottomStyle:!0,borderBottomColor:!0},borderLeft:{
borderLeftWidth:!0,borderLeftStyle:!0,borderLeftColor:!0},borderRight:{borderRightWidth:!0,
borderRightStyle:!0,borderRightColor:!0},borderTop:{borderTopWidth:!0,borderTopStyle:!0,
borderTopColor:!0},font:{fontStyle:!0,fontVariant:!0,fontWeight:!0,fontSize:!0,lineHeight:!0,
fontFamily:!0}},u={isUnitlessNumber:o,shorthandPropertyExpansions:a};t.exports=u},{}],
31:[function(e,t,n){(function(n){"use strict";var r=e("./CSSProperty"),o=e("./ExecutionEnvironment"),i=e("./camelizeStyleName"),a=e("./dangerousStyleValue"),u=e("./hyphenateStyleName"),s=e("./memoizeStringOnly"),c=e("./warning"),l=s(function(e){
return u(e)}),p="cssFloat";if(o.canUseDOM&&void 0===document.documentElement.style.cssFloat&&(p="styleFloat"),
"production"!==n.env.NODE_ENV)var f=/^(?:webkit|moz|o)[A-Z]/,d=/;\s*$/,h={},g={},m=function(e){
h.hasOwnProperty(e)&&h[e]||(h[e]=!0,"production"!==n.env.NODE_ENV?c(!1,"Unsupported style property %s. Did you mean %s?",e,i(e)):null);

},v=function(e){h.hasOwnProperty(e)&&h[e]||(h[e]=!0,"production"!==n.env.NODE_ENV?c(!1,"Unsupported vendor-prefixed style property %s. Did you mean %s?",e,e.charAt(0).toUpperCase()+e.slice(1)):null);

},y=function(e,t){g.hasOwnProperty(t)&&g[t]||(g[t]=!0,"production"!==n.env.NODE_ENV?c(!1,'Style property values shouldn\'t contain a semicolon. Try "%s: %s" instead.',e,t.replace(d,"")):null);

},E=function(e,t){e.indexOf("-")>-1?m(e):f.test(e)?v(e):d.test(t)&&y(e,t)};var b={
createMarkupForStyles:function(e){var t="";for(var r in e)if(e.hasOwnProperty(r)){
var o=e[r];"production"!==n.env.NODE_ENV&&E(r,o),null!=o&&(t+=l(r)+":",t+=a(r,o)+";");

}return t||null},setValueForStyles:function(e,t){var o=e.style;for(var i in t)if(t.hasOwnProperty(i)){
"production"!==n.env.NODE_ENV&&E(i,t[i]);var u=a(i,t[i]);if("float"===i&&(i=p),u)o[i]=u;
else{var s=r.shorthandPropertyExpansions[i];if(s)for(var c in s)o[c]="";else o[i]="";

}}}};t.exports=b}).call(this,e("_process"))},{"./CSSProperty":30,"./ExecutionEnvironment":47,
"./camelizeStyleName":135,"./dangerousStyleValue":140,"./hyphenateStyleName":160,
"./memoizeStringOnly":170,"./warning":181,_process:14}],32:[function(e,t,n){(function(n){
"use strict";function r(){this._callbacks=null,this._contexts=null}var o=e("./PooledClass"),i=e("./Object.assign"),a=e("./invariant");

i(r.prototype,{enqueue:function(e,t){this._callbacks=this._callbacks||[],this._contexts=this._contexts||[],
this._callbacks.push(e),this._contexts.push(t)},notifyAll:function(){var e=this._callbacks,t=this._contexts;

if(e){"production"!==n.env.NODE_ENV?a(e.length===t.length,"Mismatched list of contexts in callback queue"):a(e.length===t.length),
this._callbacks=null,this._contexts=null;for(var r=0,o=e.length;o>r;r++)e[r].call(t[r]);

e.length=0,t.length=0}},reset:function(){this._callbacks=null,this._contexts=null;

},destructor:function(){this.reset()}}),o.addPoolingTo(r),t.exports=r}).call(this,e("_process"));

},{"./Object.assign":53,"./PooledClass":54,"./invariant":162,_process:14}],33:[function(e,t,n){
"use strict";function r(e){return"SELECT"===e.nodeName||"INPUT"===e.nodeName&&"file"===e.type;

}function o(e){var t=C.getPooled(R.change,T,e);b.accumulateTwoPhaseDispatches(t),
w.batchedUpdates(i,t)}function i(e){E.enqueueEvents(e),E.processEventQueue()}function a(e,t){
O=e,T=t,O.attachEvent("onchange",o)}function u(){O&&(O.detachEvent("onchange",o),
O=null,T=null)}function s(e,t,n){return e===D.topChange?n:void 0}function c(e,t,n){
e===D.topFocus?(u(),a(t,n)):e===D.topBlur&&u()}function l(e,t){O=e,T=t,k=e.value,
S=Object.getOwnPropertyDescriptor(e.constructor.prototype,"value"),Object.defineProperty(O,"value",A),
O.attachEvent("onpropertychange",f)}function p(){O&&(delete O.value,O.detachEvent("onpropertychange",f),
O=null,T=null,k=null,S=null)}function f(e){if("value"===e.propertyName){var t=e.srcElement.value;

t!==k&&(k=t,o(e))}}function d(e,t,n){return e===D.topInput?n:void 0}function h(e,t,n){
e===D.topFocus?(p(),l(t,n)):e===D.topBlur&&p()}function g(e,t,n){return e!==D.topSelectionChange&&e!==D.topKeyUp&&e!==D.topKeyDown||!O||O.value===k?void 0:(k=O.value,
T)}function m(e){return"INPUT"===e.nodeName&&("checkbox"===e.type||"radio"===e.type);

}function v(e,t,n){return e===D.topClick?n:void 0}var y=e("./EventConstants"),E=e("./EventPluginHub"),b=e("./EventPropagators"),x=e("./ExecutionEnvironment"),w=e("./ReactUpdates"),C=e("./SyntheticEvent"),_=e("./isEventSupported"),N=e("./isTextInputElement"),M=e("./keyOf"),D=y.topLevelTypes,R={
change:{phasedRegistrationNames:{bubbled:M({onChange:null}),captured:M({onChangeCapture:null
})},dependencies:[D.topBlur,D.topChange,D.topClick,D.topFocus,D.topInput,D.topKeyDown,D.topKeyUp,D.topSelectionChange]
}},O=null,T=null,k=null,S=null,P=!1;x.canUseDOM&&(P=_("change")&&(!("documentMode"in document)||document.documentMode>8));

var I=!1;x.canUseDOM&&(I=_("input")&&(!("documentMode"in document)||document.documentMode>9));

var A={get:function(){return S.get.call(this)},set:function(e){k=""+e,S.set.call(this,e);

}},j={eventTypes:R,extractEvents:function(e,t,n,o){var i,a;if(r(t)?P?i=s:a=c:N(t)?I?i=d:(i=g,
a=h):m(t)&&(i=v),i){var u=i(e,t,n);if(u){var l=C.getPooled(R.change,u,o);return b.accumulateTwoPhaseDispatches(l),
l}}a&&a(e,t,n)}};t.exports=j},{"./EventConstants":41,"./EventPluginHub":43,"./EventPropagators":46,
"./ExecutionEnvironment":47,"./ReactUpdates":114,"./SyntheticEvent":122,"./isEventSupported":163,
"./isTextInputElement":165,"./keyOf":168}],34:[function(e,t,n){"use strict";var r=0,o={
createReactRootIndex:function(){return r++}};t.exports=o},{}],35:[function(e,t,n){
(function(n){"use strict";function r(e,t,n){e.insertBefore(t,e.childNodes[n]||null);

}var o=e("./Danger"),i=e("./ReactMultiChildUpdateTypes"),a=e("./setTextContent"),u=e("./invariant"),s={
dangerouslyReplaceNodeWithMarkup:o.dangerouslyReplaceNodeWithMarkup,updateTextContent:a,
processUpdates:function(e,t){for(var s,c=null,l=null,p=0;p<e.length;p++)if(s=e[p],
s.type===i.MOVE_EXISTING||s.type===i.REMOVE_NODE){var f=s.fromIndex,d=s.parentNode.childNodes[f],h=s.parentID;

"production"!==n.env.NODE_ENV?u(d,"processUpdates(): Unable to find child %s of element. This probably means the DOM was unexpectedly mutated (e.g., by the browser), usually due to forgetting a <tbody> when using tables, nesting tags like <form>, <p>, or <a>, or using non-SVG elements in an <svg> parent. Try inspecting the child nodes of the element with React ID `%s`.",f,h):u(d),
c=c||{},c[h]=c[h]||[],c[h][f]=d,l=l||[],l.push(d)}var g=o.dangerouslyRenderMarkup(t);

if(l)for(var m=0;m<l.length;m++)l[m].parentNode.removeChild(l[m]);for(var v=0;v<e.length;v++)switch(s=e[v],
s.type){case i.INSERT_MARKUP:r(s.parentNode,g[s.markupIndex],s.toIndex);break;case i.MOVE_EXISTING:
r(s.parentNode,c[s.parentID][s.fromIndex],s.toIndex);break;case i.TEXT_CONTENT:a(s.parentNode,s.textContent);

break;case i.REMOVE_NODE:}}};t.exports=s}).call(this,e("_process"))},{"./Danger":38,
"./ReactMultiChildUpdateTypes":99,"./invariant":162,"./setTextContent":176,_process:14
}],36:[function(e,t,n){(function(n){"use strict";function r(e,t){return(e&t)===t}
var o=e("./invariant"),i={MUST_USE_ATTRIBUTE:1,MUST_USE_PROPERTY:2,HAS_SIDE_EFFECTS:4,
HAS_BOOLEAN_VALUE:8,HAS_NUMERIC_VALUE:16,HAS_POSITIVE_NUMERIC_VALUE:48,HAS_OVERLOADED_BOOLEAN_VALUE:64,
injectDOMPropertyConfig:function(e){var t=e.Properties||{},a=e.DOMAttributeNames||{},s=e.DOMPropertyNames||{},c=e.DOMMutationMethods||{};

e.isCustomAttribute&&u._isCustomAttributeFunctions.push(e.isCustomAttribute);for(var l in t){
"production"!==n.env.NODE_ENV?o(!u.isStandardName.hasOwnProperty(l),"injectDOMPropertyConfig(...): You're trying to inject DOM property '%s' which has already been injected. You may be accidentally injecting the same DOM property config twice, or you may be injecting two configs that have conflicting property names.",l):o(!u.isStandardName.hasOwnProperty(l)),
u.isStandardName[l]=!0;var p=l.toLowerCase();if(u.getPossibleStandardName[p]=l,a.hasOwnProperty(l)){
var f=a[l];u.getPossibleStandardName[f]=l,u.getAttributeName[l]=f}else u.getAttributeName[l]=p;

u.getPropertyName[l]=s.hasOwnProperty(l)?s[l]:l,u.getMutationMethod[l]=c.hasOwnProperty(l)?c[l]:null;

var d=t[l];u.mustUseAttribute[l]=r(d,i.MUST_USE_ATTRIBUTE),u.mustUseProperty[l]=r(d,i.MUST_USE_PROPERTY),
u.hasSideEffects[l]=r(d,i.HAS_SIDE_EFFECTS),u.hasBooleanValue[l]=r(d,i.HAS_BOOLEAN_VALUE),
u.hasNumericValue[l]=r(d,i.HAS_NUMERIC_VALUE),u.hasPositiveNumericValue[l]=r(d,i.HAS_POSITIVE_NUMERIC_VALUE),
u.hasOverloadedBooleanValue[l]=r(d,i.HAS_OVERLOADED_BOOLEAN_VALUE),"production"!==n.env.NODE_ENV?o(!u.mustUseAttribute[l]||!u.mustUseProperty[l],"DOMProperty: Cannot require using both attribute and property: %s",l):o(!u.mustUseAttribute[l]||!u.mustUseProperty[l]),
"production"!==n.env.NODE_ENV?o(u.mustUseProperty[l]||!u.hasSideEffects[l],"DOMProperty: Properties that have side effects must use property: %s",l):o(u.mustUseProperty[l]||!u.hasSideEffects[l]),
"production"!==n.env.NODE_ENV?o(!!u.hasBooleanValue[l]+!!u.hasNumericValue[l]+!!u.hasOverloadedBooleanValue[l]<=1,"DOMProperty: Value can be one of boolean, overloaded boolean, or numeric value, but not a combination: %s",l):o(!!u.hasBooleanValue[l]+!!u.hasNumericValue[l]+!!u.hasOverloadedBooleanValue[l]<=1);

}}},a={},u={ID_ATTRIBUTE_NAME:"data-reactid",isStandardName:{},getPossibleStandardName:{},
getAttributeName:{},getPropertyName:{},getMutationMethod:{},mustUseAttribute:{},mustUseProperty:{},
hasSideEffects:{},hasBooleanValue:{},hasNumericValue:{},hasPositiveNumericValue:{},
hasOverloadedBooleanValue:{},_isCustomAttributeFunctions:[],isCustomAttribute:function(e){
for(var t=0;t<u._isCustomAttributeFunctions.length;t++){var n=u._isCustomAttributeFunctions[t];

if(n(e))return!0}return!1},getDefaultValueForProperty:function(e,t){var n,r=a[e];
return r||(a[e]=r={}),t in r||(n=document.createElement(e),r[t]=n[t]),r[t]},injection:i
};t.exports=u}).call(this,e("_process"))},{"./invariant":162,_process:14}],37:[function(e,t,n){
(function(n){"use strict";function r(e,t){return null==t||o.hasBooleanValue[e]&&!t||o.hasNumericValue[e]&&isNaN(t)||o.hasPositiveNumericValue[e]&&1>t||o.hasOverloadedBooleanValue[e]&&t===!1;

}var o=e("./DOMProperty"),i=e("./quoteAttributeValueForBrowser"),a=e("./warning");

if("production"!==n.env.NODE_ENV)var u={children:!0,dangerouslySetInnerHTML:!0,key:!0,
ref:!0},s={},c=function(e){if(!(u.hasOwnProperty(e)&&u[e]||s.hasOwnProperty(e)&&s[e])){
s[e]=!0;var t=e.toLowerCase(),r=o.isCustomAttribute(t)?t:o.getPossibleStandardName.hasOwnProperty(t)?o.getPossibleStandardName[t]:null;

"production"!==n.env.NODE_ENV?a(null==r,"Unknown DOM property %s. Did you mean %s?",e,r):null;

}};var l={createMarkupForID:function(e){return o.ID_ATTRIBUTE_NAME+"="+i(e)},createMarkupForProperty:function(e,t){
if(o.isStandardName.hasOwnProperty(e)&&o.isStandardName[e]){if(r(e,t))return"";var a=o.getAttributeName[e];

return o.hasBooleanValue[e]||o.hasOverloadedBooleanValue[e]&&t===!0?a:a+"="+i(t)}
return o.isCustomAttribute(e)?null==t?"":e+"="+i(t):("production"!==n.env.NODE_ENV&&c(e),
null)},setValueForProperty:function(e,t,i){if(o.isStandardName.hasOwnProperty(t)&&o.isStandardName[t]){
var a=o.getMutationMethod[t];if(a)a(e,i);else if(r(t,i))this.deleteValueForProperty(e,t);
else if(o.mustUseAttribute[t])e.setAttribute(o.getAttributeName[t],""+i);else{var u=o.getPropertyName[t];

o.hasSideEffects[t]&&""+e[u]==""+i||(e[u]=i)}}else o.isCustomAttribute(t)?null==i?e.removeAttribute(t):e.setAttribute(t,""+i):"production"!==n.env.NODE_ENV&&c(t);

},deleteValueForProperty:function(e,t){if(o.isStandardName.hasOwnProperty(t)&&o.isStandardName[t]){
var r=o.getMutationMethod[t];if(r)r(e,void 0);else if(o.mustUseAttribute[t])e.removeAttribute(o.getAttributeName[t]);
else{var i=o.getPropertyName[t],a=o.getDefaultValueForProperty(e.nodeName,i);o.hasSideEffects[t]&&""+e[i]===a||(e[i]=a);

}}else o.isCustomAttribute(t)?e.removeAttribute(t):"production"!==n.env.NODE_ENV&&c(t);

}};t.exports=l}).call(this,e("_process"))},{"./DOMProperty":36,"./quoteAttributeValueForBrowser":174,
"./warning":181,_process:14}],38:[function(e,t,n){(function(n){"use strict";function r(e){
return e.substring(1,e.indexOf(" "))}var o=e("./ExecutionEnvironment"),i=e("./createNodesFromMarkup"),a=e("./emptyFunction"),u=e("./getMarkupWrap"),s=e("./invariant"),c=/^(<[^ \/>]+)/,l="data-danger-index",p={
dangerouslyRenderMarkup:function(e){"production"!==n.env.NODE_ENV?s(o.canUseDOM,"dangerouslyRenderMarkup(...): Cannot render markup in a worker thread. Make sure `window` and `document` are available globally before requiring React when unit testing or use React.renderToString for server rendering."):s(o.canUseDOM);

for(var t,p={},f=0;f<e.length;f++)"production"!==n.env.NODE_ENV?s(e[f],"dangerouslyRenderMarkup(...): Missing markup."):s(e[f]),
t=r(e[f]),t=u(t)?t:"*",p[t]=p[t]||[],p[t][f]=e[f];var d=[],h=0;for(t in p)if(p.hasOwnProperty(t)){
var g,m=p[t];for(g in m)if(m.hasOwnProperty(g)){var v=m[g];m[g]=v.replace(c,"$1 "+l+'="'+g+'" ');

}for(var y=i(m.join(""),a),E=0;E<y.length;++E){var b=y[E];b.hasAttribute&&b.hasAttribute(l)?(g=+b.getAttribute(l),
b.removeAttribute(l),"production"!==n.env.NODE_ENV?s(!d.hasOwnProperty(g),"Danger: Assigning to an already-occupied result index."):s(!d.hasOwnProperty(g)),
d[g]=b,h+=1):"production"!==n.env.NODE_ENV&&console.error("Danger: Discarding unexpected node:",b);

}}return"production"!==n.env.NODE_ENV?s(h===d.length,"Danger: Did not assign to every index of resultList."):s(h===d.length),
"production"!==n.env.NODE_ENV?s(d.length===e.length,"Danger: Expected markup to render %s nodes, but rendered %s.",e.length,d.length):s(d.length===e.length),
d},dangerouslyReplaceNodeWithMarkup:function(e,t){"production"!==n.env.NODE_ENV?s(o.canUseDOM,"dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a worker thread. Make sure `window` and `document` are available globally before requiring React when unit testing or use React.renderToString for server rendering."):s(o.canUseDOM),
"production"!==n.env.NODE_ENV?s(t,"dangerouslyReplaceNodeWithMarkup(...): Missing markup."):s(t),
"production"!==n.env.NODE_ENV?s("html"!==e.tagName.toLowerCase(),"dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the <html> node. This is because browser quirks make this unreliable and/or slow. If you want to render to the root you must use server rendering. See React.renderToString()."):s("html"!==e.tagName.toLowerCase());

var r=i(t,a)[0];e.parentNode.replaceChild(r,e)}};t.exports=p}).call(this,e("_process"));

},{"./ExecutionEnvironment":47,"./createNodesFromMarkup":139,"./emptyFunction":141,
"./getMarkupWrap":154,"./invariant":162,_process:14}],39:[function(e,t,n){"use strict";

var r=e("./keyOf"),o=[r({ResponderEventPlugin:null}),r({SimpleEventPlugin:null}),r({
TapEventPlugin:null}),r({EnterLeaveEventPlugin:null}),r({ChangeEventPlugin:null}),r({
SelectEventPlugin:null}),r({BeforeInputEventPlugin:null}),r({AnalyticsEventPlugin:null
}),r({MobileSafariClickEventPlugin:null})];t.exports=o},{"./keyOf":168}],40:[function(e,t,n){
"use strict";var r=e("./EventConstants"),o=e("./EventPropagators"),i=e("./SyntheticMouseEvent"),a=e("./ReactMount"),u=e("./keyOf"),s=r.topLevelTypes,c=a.getFirstReactDOM,l={
mouseEnter:{registrationName:u({onMouseEnter:null}),dependencies:[s.topMouseOut,s.topMouseOver]
},mouseLeave:{registrationName:u({onMouseLeave:null}),dependencies:[s.topMouseOut,s.topMouseOver]
}},p=[null,null],f={eventTypes:l,extractEvents:function(e,t,n,r){if(e===s.topMouseOver&&(r.relatedTarget||r.fromElement))return null;

if(e!==s.topMouseOut&&e!==s.topMouseOver)return null;var u;if(t.window===t)u=t;else{
var f=t.ownerDocument;u=f?f.defaultView||f.parentWindow:window}var d,h;if(e===s.topMouseOut?(d=t,
h=c(r.relatedTarget||r.toElement)||u):(d=u,h=t),d===h)return null;var g=d?a.getID(d):"",m=h?a.getID(h):"",v=i.getPooled(l.mouseLeave,g,r);

v.type="mouseleave",v.target=d,v.relatedTarget=h;var y=i.getPooled(l.mouseEnter,m,r);

return y.type="mouseenter",y.target=h,y.relatedTarget=d,o.accumulateEnterLeaveDispatches(v,y,g,m),
p[0]=v,p[1]=y,p}};t.exports=f},{"./EventConstants":41,"./EventPropagators":46,"./ReactMount":97,
"./SyntheticMouseEvent":126,"./keyOf":168}],41:[function(e,t,n){"use strict";var r=e("./keyMirror"),o=r({
bubbled:null,captured:null}),i=r({topBlur:null,topChange:null,topClick:null,topCompositionEnd:null,
topCompositionStart:null,topCompositionUpdate:null,topContextMenu:null,topCopy:null,
topCut:null,topDoubleClick:null,topDrag:null,topDragEnd:null,topDragEnter:null,topDragExit:null,
topDragLeave:null,topDragOver:null,topDragStart:null,topDrop:null,topError:null,topFocus:null,
topInput:null,topKeyDown:null,topKeyPress:null,topKeyUp:null,topLoad:null,topMouseDown:null,
topMouseMove:null,topMouseOut:null,topMouseOver:null,topMouseUp:null,topPaste:null,
topReset:null,topScroll:null,topSelectionChange:null,topSubmit:null,topTextInput:null,
topTouchCancel:null,topTouchEnd:null,topTouchMove:null,topTouchStart:null,topWheel:null
}),a={topLevelTypes:i,PropagationPhases:o};t.exports=a},{"./keyMirror":167}],42:[function(e,t,n){
(function(n){var r=e("./emptyFunction"),o={listen:function(e,t,n){return e.addEventListener?(e.addEventListener(t,n,!1),
{remove:function(){e.removeEventListener(t,n,!1)}}):e.attachEvent?(e.attachEvent("on"+t,n),
{remove:function(){e.detachEvent("on"+t,n)}}):void 0},capture:function(e,t,o){return e.addEventListener?(e.addEventListener(t,o,!0),
{remove:function(){e.removeEventListener(t,o,!0)}}):("production"!==n.env.NODE_ENV&&console.error("Attempted to listen to events during the capture phase on a browser that does not support the capture phase. Your application will not receive some events."),
{remove:r})},registerDefault:function(){}};t.exports=o}).call(this,e("_process"));

},{"./emptyFunction":141,_process:14}],43:[function(e,t,n){(function(n){"use strict";

function r(){var e=f&&f.traverseTwoPhase&&f.traverseEnterLeave;"production"!==n.env.NODE_ENV?s(e,"InstanceHandle not injected before use!"):s(e);

}var o=e("./EventPluginRegistry"),i=e("./EventPluginUtils"),a=e("./accumulateInto"),u=e("./forEachAccumulated"),s=e("./invariant"),c={},l=null,p=function(e){
if(e){var t=i.executeDispatch,n=o.getPluginModuleForEvent(e);n&&n.executeDispatch&&(t=n.executeDispatch),
i.executeDispatchesInOrder(e,t),e.isPersistent()||e.constructor.release(e)}},f=null,d={
injection:{injectMount:i.injection.injectMount,injectInstanceHandle:function(e){f=e,
"production"!==n.env.NODE_ENV&&r()},getInstanceHandle:function(){return"production"!==n.env.NODE_ENV&&r(),
f},injectEventPluginOrder:o.injectEventPluginOrder,injectEventPluginsByName:o.injectEventPluginsByName
},eventNameDispatchConfigs:o.eventNameDispatchConfigs,registrationNameModules:o.registrationNameModules,
putListener:function(e,t,r){"production"!==n.env.NODE_ENV?s(!r||"function"==typeof r,"Expected %s listener to be a function, instead got type %s",t,typeof r):s(!r||"function"==typeof r);

var o=c[t]||(c[t]={});o[e]=r},getListener:function(e,t){var n=c[t];return n&&n[e];

},deleteListener:function(e,t){var n=c[t];n&&delete n[e]},deleteAllListeners:function(e){
for(var t in c)delete c[t][e]},extractEvents:function(e,t,n,r){for(var i,u=o.plugins,s=0,c=u.length;c>s;s++){
var l=u[s];if(l){var p=l.extractEvents(e,t,n,r);p&&(i=a(i,p))}}return i},enqueueEvents:function(e){
e&&(l=a(l,e))},processEventQueue:function(){var e=l;l=null,u(e,p),"production"!==n.env.NODE_ENV?s(!l,"processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented."):s(!l);

},__purge:function(){c={}},__getListenerBank:function(){return c}};t.exports=d}).call(this,e("_process"));

},{"./EventPluginRegistry":44,"./EventPluginUtils":45,"./accumulateInto":132,"./forEachAccumulated":147,
"./invariant":162,_process:14}],44:[function(e,t,n){(function(n){"use strict";function r(){
if(u)for(var e in s){var t=s[e],r=u.indexOf(e);if("production"!==n.env.NODE_ENV?a(r>-1,"EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.",e):a(r>-1),
!c.plugins[r]){"production"!==n.env.NODE_ENV?a(t.extractEvents,"EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.",e):a(t.extractEvents),
c.plugins[r]=t;var i=t.eventTypes;for(var l in i)"production"!==n.env.NODE_ENV?a(o(i[l],t,l),"EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.",l,e):a(o(i[l],t,l));

}}}function o(e,t,r){"production"!==n.env.NODE_ENV?a(!c.eventNameDispatchConfigs.hasOwnProperty(r),"EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.",r):a(!c.eventNameDispatchConfigs.hasOwnProperty(r)),
c.eventNameDispatchConfigs[r]=e;var o=e.phasedRegistrationNames;if(o){for(var u in o)if(o.hasOwnProperty(u)){
var s=o[u];i(s,t,r)}return!0}return e.registrationName?(i(e.registrationName,t,r),
!0):!1}function i(e,t,r){"production"!==n.env.NODE_ENV?a(!c.registrationNameModules[e],"EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.",e):a(!c.registrationNameModules[e]),
c.registrationNameModules[e]=t,c.registrationNameDependencies[e]=t.eventTypes[r].dependencies;

}var a=e("./invariant"),u=null,s={},c={plugins:[],eventNameDispatchConfigs:{},registrationNameModules:{},
registrationNameDependencies:{},injectEventPluginOrder:function(e){"production"!==n.env.NODE_ENV?a(!u,"EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React."):a(!u),
u=Array.prototype.slice.call(e),r()},injectEventPluginsByName:function(e){var t=!1;

for(var o in e)if(e.hasOwnProperty(o)){var i=e[o];s.hasOwnProperty(o)&&s[o]===i||("production"!==n.env.NODE_ENV?a(!s[o],"EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.",o):a(!s[o]),
s[o]=i,t=!0)}t&&r()},getPluginModuleForEvent:function(e){var t=e.dispatchConfig;if(t.registrationName)return c.registrationNameModules[t.registrationName]||null;

for(var n in t.phasedRegistrationNames)if(t.phasedRegistrationNames.hasOwnProperty(n)){
var r=c.registrationNameModules[t.phasedRegistrationNames[n]];if(r)return r}return null;

},_resetEventPlugins:function(){u=null;for(var e in s)s.hasOwnProperty(e)&&delete s[e];

c.plugins.length=0;var t=c.eventNameDispatchConfigs;for(var n in t)t.hasOwnProperty(n)&&delete t[n];

var r=c.registrationNameModules;for(var o in r)r.hasOwnProperty(o)&&delete r[o]}};

t.exports=c}).call(this,e("_process"))},{"./invariant":162,_process:14}],45:[function(e,t,n){
(function(n){"use strict";function r(e){return e===v.topMouseUp||e===v.topTouchEnd||e===v.topTouchCancel;

}function o(e){return e===v.topMouseMove||e===v.topTouchMove}function i(e){return e===v.topMouseDown||e===v.topTouchStart;

}function a(e,t){var r=e._dispatchListeners,o=e._dispatchIDs;if("production"!==n.env.NODE_ENV&&d(e),
Array.isArray(r))for(var i=0;i<r.length&&!e.isPropagationStopped();i++)t(e,r[i],o[i]);
else r&&t(e,r,o)}function u(e,t,n){e.currentTarget=m.Mount.getNode(n);var r=t(e,n);

return e.currentTarget=null,r}function s(e,t){a(e,t),e._dispatchListeners=null,e._dispatchIDs=null;

}function c(e){var t=e._dispatchListeners,r=e._dispatchIDs;if("production"!==n.env.NODE_ENV&&d(e),
Array.isArray(t)){for(var o=0;o<t.length&&!e.isPropagationStopped();o++)if(t[o](e,r[o]))return r[o];

}else if(t&&t(e,r))return r;return null}function l(e){var t=c(e);return e._dispatchIDs=null,
e._dispatchListeners=null,t}function p(e){"production"!==n.env.NODE_ENV&&d(e);var t=e._dispatchListeners,r=e._dispatchIDs;

"production"!==n.env.NODE_ENV?g(!Array.isArray(t),"executeDirectDispatch(...): Invalid `event`."):g(!Array.isArray(t));

var o=t?t(e,r):null;return e._dispatchListeners=null,e._dispatchIDs=null,o}function f(e){
return!!e._dispatchListeners}var d,h=e("./EventConstants"),g=e("./invariant"),m={
Mount:null,injectMount:function(e){m.Mount=e,"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?g(e&&e.getNode,"EventPluginUtils.injection.injectMount(...): Injected Mount module is missing getNode."):g(e&&e.getNode));

}},v=h.topLevelTypes;"production"!==n.env.NODE_ENV&&(d=function(e){var t=e._dispatchListeners,r=e._dispatchIDs,o=Array.isArray(t),i=Array.isArray(r),a=i?r.length:r?1:0,u=o?t.length:t?1:0;

"production"!==n.env.NODE_ENV?g(i===o&&a===u,"EventPluginUtils: Invalid `event`."):g(i===o&&a===u);

});var y={isEndish:r,isMoveish:o,isStartish:i,executeDirectDispatch:p,executeDispatch:u,
executeDispatchesInOrder:s,executeDispatchesInOrderStopAtTrue:l,hasDispatches:f,injection:m,
useTouchEvents:!1};t.exports=y}).call(this,e("_process"))},{"./EventConstants":41,
"./invariant":162,_process:14}],46:[function(e,t,n){(function(n){"use strict";function r(e,t,n){
var r=t.dispatchConfig.phasedRegistrationNames[n];return m(e,r)}function o(e,t,o){
if("production"!==n.env.NODE_ENV&&!e)throw new Error("Dispatching id must not be null");

var i=t?g.bubbled:g.captured,a=r(e,o,i);a&&(o._dispatchListeners=d(o._dispatchListeners,a),
o._dispatchIDs=d(o._dispatchIDs,e))}function i(e){e&&e.dispatchConfig.phasedRegistrationNames&&f.injection.getInstanceHandle().traverseTwoPhase(e.dispatchMarker,o,e);

}function a(e,t,n){if(n&&n.dispatchConfig.registrationName){var r=n.dispatchConfig.registrationName,o=m(e,r);

o&&(n._dispatchListeners=d(n._dispatchListeners,o),n._dispatchIDs=d(n._dispatchIDs,e));

}}function u(e){e&&e.dispatchConfig.registrationName&&a(e.dispatchMarker,null,e)}
function s(e){h(e,i)}function c(e,t,n,r){f.injection.getInstanceHandle().traverseEnterLeave(n,r,a,e,t);

}function l(e){h(e,u)}var p=e("./EventConstants"),f=e("./EventPluginHub"),d=e("./accumulateInto"),h=e("./forEachAccumulated"),g=p.PropagationPhases,m=f.getListener,v={
accumulateTwoPhaseDispatches:s,accumulateDirectDispatches:l,accumulateEnterLeaveDispatches:c
};t.exports=v}).call(this,e("_process"))},{"./EventConstants":41,"./EventPluginHub":43,
"./accumulateInto":132,"./forEachAccumulated":147,_process:14}],47:[function(e,t,n){
"use strict";var r=!("undefined"==typeof window||!window.document||!window.document.createElement),o={
canUseDOM:r,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:r&&!(!window.addEventListener&&!window.attachEvent),
canUseViewport:r&&!!window.screen,isInWorker:!r};t.exports=o},{}],48:[function(e,t,n){
"use strict";function r(e){this._root=e,this._startText=this.getText(),this._fallbackText=null;

}var o=e("./PooledClass"),i=e("./Object.assign"),a=e("./getTextContentAccessor");
i(r.prototype,{getText:function(){return"value"in this._root?this._root.value:this._root[a()];

},getData:function(){if(this._fallbackText)return this._fallbackText;var e,t,n=this._startText,r=n.length,o=this.getText(),i=o.length;

for(e=0;r>e&&n[e]===o[e];e++);var a=r-e;for(t=1;a>=t&&n[r-t]===o[i-t];t++);var u=t>1?1-t:void 0;

return this._fallbackText=o.slice(e,u),this._fallbackText}}),o.addPoolingTo(r),t.exports=r;

},{"./Object.assign":53,"./PooledClass":54,"./getTextContentAccessor":157}],49:[function(e,t,n){
"use strict";var r,o=e("./DOMProperty"),i=e("./ExecutionEnvironment"),a=o.injection.MUST_USE_ATTRIBUTE,u=o.injection.MUST_USE_PROPERTY,s=o.injection.HAS_BOOLEAN_VALUE,c=o.injection.HAS_SIDE_EFFECTS,l=o.injection.HAS_NUMERIC_VALUE,p=o.injection.HAS_POSITIVE_NUMERIC_VALUE,f=o.injection.HAS_OVERLOADED_BOOLEAN_VALUE;

if(i.canUseDOM){var d=document.implementation;r=d&&d.hasFeature&&d.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1");

}var h={isCustomAttribute:RegExp.prototype.test.bind(/^(data|aria)-[a-z_][a-z\d_.\-]*$/),
Properties:{accept:null,acceptCharset:null,accessKey:null,action:null,allowFullScreen:a|s,
allowTransparency:a,alt:null,async:s,autoComplete:null,autoPlay:s,cellPadding:null,
cellSpacing:null,charSet:a,checked:u|s,classID:a,className:r?a:u,cols:a|p,colSpan:null,
content:null,contentEditable:null,contextMenu:a,controls:u|s,coords:null,crossOrigin:null,
data:null,dateTime:a,defer:s,dir:null,disabled:a|s,download:f,draggable:null,encType:null,
form:a,formAction:a,formEncType:a,formMethod:a,formNoValidate:s,formTarget:a,frameBorder:a,
headers:null,height:a,hidden:a|s,high:null,href:null,hrefLang:null,htmlFor:null,httpEquiv:null,
icon:null,id:u,label:null,lang:null,list:a,loop:u|s,low:null,manifest:a,marginHeight:null,
marginWidth:null,max:null,maxLength:a,media:a,mediaGroup:null,method:null,min:null,
multiple:u|s,muted:u|s,name:null,noValidate:s,open:s,optimum:null,pattern:null,placeholder:null,
poster:null,preload:null,radioGroup:null,readOnly:u|s,rel:null,required:s,role:a,
rows:a|p,rowSpan:null,sandbox:null,scope:null,scoped:s,scrolling:null,seamless:a|s,
selected:u|s,shape:null,size:a|p,sizes:a,span:p,spellCheck:null,src:null,srcDoc:u,
srcSet:a,start:l,step:null,style:null,tabIndex:null,target:null,title:null,type:null,
useMap:null,value:u|c,width:a,wmode:a,autoCapitalize:null,autoCorrect:null,itemProp:a,
itemScope:a|s,itemType:a,itemID:a,itemRef:a,property:null,unselectable:a},DOMAttributeNames:{
acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv"
},DOMPropertyNames:{autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoCorrect:"autocorrect",
autoFocus:"autofocus",autoPlay:"autoplay",encType:"encoding",hrefLang:"hreflang",
radioGroup:"radiogroup",spellCheck:"spellcheck",srcDoc:"srcdoc",srcSet:"srcset"}};

t.exports=h},{"./DOMProperty":36,"./ExecutionEnvironment":47}],50:[function(e,t,n){
(function(n){"use strict";function r(e){"production"!==n.env.NODE_ENV?c(null==e.props.checkedLink||null==e.props.valueLink,"Cannot provide a checkedLink and a valueLink. If you want to use checkedLink, you probably don't want to use valueLink and vice versa."):c(null==e.props.checkedLink||null==e.props.valueLink);

}function o(e){r(e),"production"!==n.env.NODE_ENV?c(null==e.props.value&&null==e.props.onChange,"Cannot provide a valueLink and a value or onChange event. If you want to use value or onChange, you probably don't want to use valueLink."):c(null==e.props.value&&null==e.props.onChange);

}function i(e){r(e),"production"!==n.env.NODE_ENV?c(null==e.props.checked&&null==e.props.onChange,"Cannot provide a checkedLink and a checked property or onChange event. If you want to use checked or onChange, you probably don't want to use checkedLink"):c(null==e.props.checked&&null==e.props.onChange);

}function a(e){this.props.valueLink.requestChange(e.target.value)}function u(e){this.props.checkedLink.requestChange(e.target.checked);

}var s=e("./ReactPropTypes"),c=e("./invariant"),l={button:!0,checkbox:!0,image:!0,
hidden:!0,radio:!0,reset:!0,submit:!0},p={Mixin:{propTypes:{value:function(e,t,n){
return!e[t]||l[e.type]||e.onChange||e.readOnly||e.disabled?null:new Error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");

},checked:function(e,t,n){return!e[t]||e.onChange||e.readOnly||e.disabled?null:new Error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");

},onChange:s.func}},getValue:function(e){return e.props.valueLink?(o(e),e.props.valueLink.value):e.props.value;

},getChecked:function(e){return e.props.checkedLink?(i(e),e.props.checkedLink.value):e.props.checked;

},getOnChange:function(e){return e.props.valueLink?(o(e),a):e.props.checkedLink?(i(e),
u):e.props.onChange}};t.exports=p}).call(this,e("_process"))},{"./ReactPropTypes":105,
"./invariant":162,_process:14}],51:[function(e,t,n){(function(n){"use strict";function r(e){
e.remove()}var o=e("./ReactBrowserEventEmitter"),i=e("./accumulateInto"),a=e("./forEachAccumulated"),u=e("./invariant"),s={
trapBubbledEvent:function(e,t){"production"!==n.env.NODE_ENV?u(this.isMounted(),"Must be mounted to trap events"):u(this.isMounted());

var r=this.getDOMNode();"production"!==n.env.NODE_ENV?u(r,"LocalEventTrapMixin.trapBubbledEvent(...): Requires node to be rendered."):u(r);

var a=o.trapBubbledEvent(e,t,r);this._localEventListeners=i(this._localEventListeners,a);

},componentWillUnmount:function(){this._localEventListeners&&a(this._localEventListeners,r);

}};t.exports=s}).call(this,e("_process"))},{"./ReactBrowserEventEmitter":57,"./accumulateInto":132,
"./forEachAccumulated":147,"./invariant":162,_process:14}],52:[function(e,t,n){"use strict";

var r=e("./EventConstants"),o=e("./emptyFunction"),i=r.topLevelTypes,a={eventTypes:null,
extractEvents:function(e,t,n,r){if(e===i.topTouchStart){var a=r.target;a&&!a.onclick&&(a.onclick=o);

}}};t.exports=a},{"./EventConstants":41,"./emptyFunction":141}],53:[function(e,t,n){
"use strict";function r(e,t){if(null==e)throw new TypeError("Object.assign target cannot be null or undefined");

for(var n=Object(e),r=Object.prototype.hasOwnProperty,o=1;o<arguments.length;o++){
var i=arguments[o];if(null!=i){var a=Object(i);for(var u in a)r.call(a,u)&&(n[u]=a[u]);

}}return n}t.exports=r},{}],54:[function(e,t,n){(function(n){"use strict";var r=e("./invariant"),o=function(e){
var t=this;if(t.instancePool.length){var n=t.instancePool.pop();return t.call(n,e),
n}return new t(e)},i=function(e,t){var n=this;if(n.instancePool.length){var r=n.instancePool.pop();

return n.call(r,e,t),r}return new n(e,t)},a=function(e,t,n){var r=this;if(r.instancePool.length){
var o=r.instancePool.pop();return r.call(o,e,t,n),o}return new r(e,t,n)},u=function(e,t,n,r,o){
var i=this;if(i.instancePool.length){var a=i.instancePool.pop();return i.call(a,e,t,n,r,o),
a}return new i(e,t,n,r,o)},s=function(e){var t=this;"production"!==n.env.NODE_ENV?r(e instanceof t,"Trying to release an instance into a pool of a different type."):r(e instanceof t),
e.destructor&&e.destructor(),t.instancePool.length<t.poolSize&&t.instancePool.push(e);

},c=10,l=o,p=function(e,t){var n=e;return n.instancePool=[],n.getPooled=t||l,n.poolSize||(n.poolSize=c),
n.release=s,n},f={addPoolingTo:p,oneArgumentPooler:o,twoArgumentPooler:i,threeArgumentPooler:a,
fiveArgumentPooler:u};t.exports=f}).call(this,e("_process"))},{"./invariant":162,
_process:14}],55:[function(e,t,n){(function(n){"use strict";var r=e("./EventPluginUtils"),o=e("./ReactChildren"),i=e("./ReactComponent"),a=e("./ReactClass"),u=e("./ReactContext"),s=e("./ReactCurrentOwner"),c=e("./ReactElement"),l=e("./ReactElementValidator"),p=e("./ReactDOM"),f=e("./ReactDOMTextComponent"),d=e("./ReactDefaultInjection"),h=e("./ReactInstanceHandles"),g=e("./ReactMount"),m=e("./ReactPerf"),v=e("./ReactPropTypes"),y=e("./ReactReconciler"),E=e("./ReactServerRendering"),b=e("./Object.assign"),x=e("./findDOMNode"),w=e("./onlyChild");

d.inject();var C=c.createElement,_=c.createFactory,N=c.cloneElement;"production"!==n.env.NODE_ENV&&(C=l.createElement,
_=l.createFactory,N=l.cloneElement);var M=m.measure("React","render",g.render),D={
Children:{map:o.map,forEach:o.forEach,count:o.count,only:w},Component:i,DOM:p,PropTypes:v,
initializeTouchEvents:function(e){r.useTouchEvents=e},createClass:a.createClass,createElement:C,
cloneElement:N,createFactory:_,createMixin:function(e){return e},constructAndRenderComponent:g.constructAndRenderComponent,
constructAndRenderComponentByID:g.constructAndRenderComponentByID,findDOMNode:x,render:M,
renderToString:E.renderToString,renderToStaticMarkup:E.renderToStaticMarkup,unmountComponentAtNode:g.unmountComponentAtNode,
isValidElement:c.isValidElement,withContext:u.withContext,__spread:b};if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject&&__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
CurrentOwner:s,InstanceHandles:h,Mount:g,Reconciler:y,TextComponent:f}),"production"!==n.env.NODE_ENV){
var R=e("./ExecutionEnvironment");if(R.canUseDOM&&window.top===window.self){navigator.userAgent.indexOf("Chrome")>-1&&"undefined"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&console.debug("Download the React DevTools for a better development experience: https://fb.me/react-devtools");

for(var O=[Array.isArray,Array.prototype.every,Array.prototype.forEach,Array.prototype.indexOf,Array.prototype.map,Date.now,Function.prototype.bind,Object.keys,String.prototype.split,String.prototype.trim,Object.create,Object.freeze],T=0;T<O.length;T++)if(!O[T]){
console.error("One or more ES5 shim/shams expected by React are not available: https://fb.me/react-warning-polyfills");

break}}}D.version="0.13.3",t.exports=D}).call(this,e("_process"))},{"./EventPluginUtils":45,
"./ExecutionEnvironment":47,"./Object.assign":53,"./ReactChildren":59,"./ReactClass":60,
"./ReactComponent":61,"./ReactContext":65,"./ReactCurrentOwner":66,"./ReactDOM":67,
"./ReactDOMTextComponent":78,"./ReactDefaultInjection":81,"./ReactElement":84,"./ReactElementValidator":85,
"./ReactInstanceHandles":93,"./ReactMount":97,"./ReactPerf":102,"./ReactPropTypes":105,
"./ReactReconciler":108,"./ReactServerRendering":111,"./findDOMNode":144,"./onlyChild":171,
_process:14}],56:[function(e,t,n){"use strict";var r=e("./findDOMNode"),o={getDOMNode:function(){
return r(this)}};t.exports=o},{"./findDOMNode":144}],57:[function(e,t,n){"use strict";

function r(e){return Object.prototype.hasOwnProperty.call(e,g)||(e[g]=d++,p[e[g]]={}),
p[e[g]]}var o=e("./EventConstants"),i=e("./EventPluginHub"),a=e("./EventPluginRegistry"),u=e("./ReactEventEmitterMixin"),s=e("./ViewportMetrics"),c=e("./Object.assign"),l=e("./isEventSupported"),p={},f=!1,d=0,h={
topBlur:"blur",topChange:"change",topClick:"click",topCompositionEnd:"compositionend",
topCompositionStart:"compositionstart",topCompositionUpdate:"compositionupdate",topContextMenu:"contextmenu",
topCopy:"copy",topCut:"cut",topDoubleClick:"dblclick",topDrag:"drag",topDragEnd:"dragend",
topDragEnter:"dragenter",topDragExit:"dragexit",topDragLeave:"dragleave",topDragOver:"dragover",
topDragStart:"dragstart",topDrop:"drop",topFocus:"focus",topInput:"input",topKeyDown:"keydown",
topKeyPress:"keypress",topKeyUp:"keyup",topMouseDown:"mousedown",topMouseMove:"mousemove",
topMouseOut:"mouseout",topMouseOver:"mouseover",topMouseUp:"mouseup",topPaste:"paste",
topScroll:"scroll",topSelectionChange:"selectionchange",topTextInput:"textInput",
topTouchCancel:"touchcancel",topTouchEnd:"touchend",topTouchMove:"touchmove",topTouchStart:"touchstart",
topWheel:"wheel"},g="_reactListenersID"+String(Math.random()).slice(2),m=c({},u,{
ReactEventListener:null,injection:{injectReactEventListener:function(e){e.setHandleTopLevel(m.handleTopLevel),
m.ReactEventListener=e}},setEnabled:function(e){m.ReactEventListener&&m.ReactEventListener.setEnabled(e);

},isEnabled:function(){return!(!m.ReactEventListener||!m.ReactEventListener.isEnabled());

},listenTo:function(e,t){for(var n=t,i=r(n),u=a.registrationNameDependencies[e],s=o.topLevelTypes,c=0,p=u.length;p>c;c++){
var f=u[c];i.hasOwnProperty(f)&&i[f]||(f===s.topWheel?l("wheel")?m.ReactEventListener.trapBubbledEvent(s.topWheel,"wheel",n):l("mousewheel")?m.ReactEventListener.trapBubbledEvent(s.topWheel,"mousewheel",n):m.ReactEventListener.trapBubbledEvent(s.topWheel,"DOMMouseScroll",n):f===s.topScroll?l("scroll",!0)?m.ReactEventListener.trapCapturedEvent(s.topScroll,"scroll",n):m.ReactEventListener.trapBubbledEvent(s.topScroll,"scroll",m.ReactEventListener.WINDOW_HANDLE):f===s.topFocus||f===s.topBlur?(l("focus",!0)?(m.ReactEventListener.trapCapturedEvent(s.topFocus,"focus",n),
m.ReactEventListener.trapCapturedEvent(s.topBlur,"blur",n)):l("focusin")&&(m.ReactEventListener.trapBubbledEvent(s.topFocus,"focusin",n),
m.ReactEventListener.trapBubbledEvent(s.topBlur,"focusout",n)),i[s.topBlur]=!0,i[s.topFocus]=!0):h.hasOwnProperty(f)&&m.ReactEventListener.trapBubbledEvent(f,h[f],n),
i[f]=!0)}},trapBubbledEvent:function(e,t,n){return m.ReactEventListener.trapBubbledEvent(e,t,n);

},trapCapturedEvent:function(e,t,n){return m.ReactEventListener.trapCapturedEvent(e,t,n);

},ensureScrollValueMonitoring:function(){if(!f){var e=s.refreshScrollValues;m.ReactEventListener.monitorScrollValue(e),
f=!0}},eventNameDispatchConfigs:i.eventNameDispatchConfigs,registrationNameModules:i.registrationNameModules,
putListener:i.putListener,getListener:i.getListener,deleteListener:i.deleteListener,
deleteAllListeners:i.deleteAllListeners});t.exports=m},{"./EventConstants":41,"./EventPluginHub":43,
"./EventPluginRegistry":44,"./Object.assign":53,"./ReactEventEmitterMixin":88,"./ViewportMetrics":131,
"./isEventSupported":163}],58:[function(e,t,n){"use strict";var r=e("./ReactReconciler"),o=e("./flattenChildren"),i=e("./instantiateReactComponent"),a=e("./shouldUpdateReactComponent"),u={
instantiateChildren:function(e,t,n){var r=o(e);for(var a in r)if(r.hasOwnProperty(a)){
var u=r[a],s=i(u,null);r[a]=s}return r},updateChildren:function(e,t,n,u){var s=o(t);

if(!s&&!e)return null;var c;for(c in s)if(s.hasOwnProperty(c)){var l=e&&e[c],p=l&&l._currentElement,f=s[c];

if(a(p,f))r.receiveComponent(l,f,n,u),s[c]=l;else{l&&r.unmountComponent(l,c);var d=i(f,null);

s[c]=d}}for(c in e)!e.hasOwnProperty(c)||s&&s.hasOwnProperty(c)||r.unmountComponent(e[c]);

return s},unmountChildren:function(e){for(var t in e){var n=e[t];r.unmountComponent(n);

}}};t.exports=u},{"./ReactReconciler":108,"./flattenChildren":145,"./instantiateReactComponent":161,
"./shouldUpdateReactComponent":178}],59:[function(e,t,n){(function(n){"use strict";

function r(e,t){this.forEachFunction=e,this.forEachContext=t}function o(e,t,n,r){
var o=e;o.forEachFunction.call(o.forEachContext,t,r)}function i(e,t,n){if(null==e)return e;

var i=r.getPooled(t,n);d(e,o,i),r.release(i)}function a(e,t,n){this.mapResult=e,this.mapFunction=t,
this.mapContext=n}function u(e,t,r,o){var i=e,a=i.mapResult,u=!a.hasOwnProperty(r);

if("production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?h(u,"ReactChildren.map(...): Encountered two children with the same key, `%s`. Child keys must be unique; when two children share a key, only the first child will be used.",r):null),
u){var s=i.mapFunction.call(i.mapContext,t,o);a[r]=s}}function s(e,t,n){if(null==e)return e;

var r={},o=a.getPooled(r,t,n);return d(e,u,o),a.release(o),f.create(r)}function c(e,t,n,r){
return null}function l(e,t){return d(e,c,null)}var p=e("./PooledClass"),f=e("./ReactFragment"),d=e("./traverseAllChildren"),h=e("./warning"),g=p.twoArgumentPooler,m=p.threeArgumentPooler;

p.addPoolingTo(r,g),p.addPoolingTo(a,m);var v={forEach:i,map:s,count:l};t.exports=v;

}).call(this,e("_process"))},{"./PooledClass":54,"./ReactFragment":90,"./traverseAllChildren":180,
"./warning":181,_process:14}],60:[function(e,t,n){(function(n){"use strict";function r(e,t,r){
for(var o in t)t.hasOwnProperty(o)&&("production"!==n.env.NODE_ENV?N("function"==typeof t[o],"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",e.displayName||"ReactClass",E[r],o):null);

}function o(e,t){var r=O.hasOwnProperty(t)?O[t]:null;S.hasOwnProperty(t)&&("production"!==n.env.NODE_ENV?w(r===D.OVERRIDE_BASE,"ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.",t):w(r===D.OVERRIDE_BASE)),
e.hasOwnProperty(t)&&("production"!==n.env.NODE_ENV?w(r===D.DEFINE_MANY||r===D.DEFINE_MANY_MERGED,"ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",t):w(r===D.DEFINE_MANY||r===D.DEFINE_MANY_MERGED));

}function i(e,t){if(t){"production"!==n.env.NODE_ENV?w("function"!=typeof t,"ReactClass: You're attempting to use a component class as a mixin. Instead, just use a regular object."):w("function"!=typeof t),
"production"!==n.env.NODE_ENV?w(!h.isValidElement(t),"ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object."):w(!h.isValidElement(t));

var r=e.prototype;t.hasOwnProperty(M)&&T.mixins(e,t.mixins);for(var i in t)if(t.hasOwnProperty(i)&&i!==M){
var a=t[i];if(o(r,i),T.hasOwnProperty(i))T[i](e,a);else{var u=O.hasOwnProperty(i),l=r.hasOwnProperty(i),p=a&&a.__reactDontBind,f="function"==typeof a,d=f&&!u&&!l&&!p;

if(d)r.__reactAutoBindMap||(r.__reactAutoBindMap={}),r.__reactAutoBindMap[i]=a,r[i]=a;
else if(l){var g=O[i];"production"!==n.env.NODE_ENV?w(u&&(g===D.DEFINE_MANY_MERGED||g===D.DEFINE_MANY),"ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.",g,i):w(u&&(g===D.DEFINE_MANY_MERGED||g===D.DEFINE_MANY)),
g===D.DEFINE_MANY_MERGED?r[i]=s(r[i],a):g===D.DEFINE_MANY&&(r[i]=c(r[i],a))}else r[i]=a,
"production"!==n.env.NODE_ENV&&"function"==typeof a&&t.displayName&&(r[i].displayName=t.displayName+"_"+i);

}}}}function a(e,t){if(t)for(var r in t){var o=t[r];if(t.hasOwnProperty(r)){var i=r in T;

"production"!==n.env.NODE_ENV?w(!i,'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.',r):w(!i);

var a=r in e;"production"!==n.env.NODE_ENV?w(!a,"ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",r):w(!a),
e[r]=o}}}function u(e,t){"production"!==n.env.NODE_ENV?w(e&&t&&"object"==typeof e&&"object"==typeof t,"mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects."):w(e&&t&&"object"==typeof e&&"object"==typeof t);

for(var r in t)t.hasOwnProperty(r)&&("production"!==n.env.NODE_ENV?w(void 0===e[r],"mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.",r):w(void 0===e[r]),
e[r]=t[r]);return e}function s(e,t){return function(){var n=e.apply(this,arguments),r=t.apply(this,arguments);

if(null==n)return r;if(null==r)return n;var o={};return u(o,n),u(o,r),o}}function c(e,t){
return function(){e.apply(this,arguments),t.apply(this,arguments)}}function l(e,t){
var r=t.bind(e);if("production"!==n.env.NODE_ENV){r.__reactBoundContext=e,r.__reactBoundMethod=t,
r.__reactBoundArguments=null;var o=e.constructor.displayName,i=r.bind;r.bind=function(a){
for(var u=[],s=1,c=arguments.length;c>s;s++)u.push(arguments[s]);if(a!==e&&null!==a)"production"!==n.env.NODE_ENV?N(!1,"bind(): React component methods may only be bound to the component instance. See %s",o):null;
else if(!u.length)return"production"!==n.env.NODE_ENV?N(!1,"bind(): You are binding a component method to the component. React does this for you automatically in a high-performance way, so you can safely remove this call. See %s",o):null,
r;var l=i.apply(r,arguments);return l.__reactBoundContext=e,l.__reactBoundMethod=t,
l.__reactBoundArguments=u,l}}return r}function p(e){for(var t in e.__reactAutoBindMap)if(e.__reactAutoBindMap.hasOwnProperty(t)){
var n=e.__reactAutoBindMap[t];e[t]=l(e,g.guard(n,e.constructor.displayName+"."+t));

}}var f=e("./ReactComponent"),d=e("./ReactCurrentOwner"),h=e("./ReactElement"),g=e("./ReactErrorUtils"),m=e("./ReactInstanceMap"),v=e("./ReactLifeCycle"),y=e("./ReactPropTypeLocations"),E=e("./ReactPropTypeLocationNames"),b=e("./ReactUpdateQueue"),x=e("./Object.assign"),w=e("./invariant"),C=e("./keyMirror"),_=e("./keyOf"),N=e("./warning"),M=_({
mixins:null}),D=C({DEFINE_ONCE:null,DEFINE_MANY:null,OVERRIDE_BASE:null,DEFINE_MANY_MERGED:null
}),R=[],O={mixins:D.DEFINE_MANY,statics:D.DEFINE_MANY,propTypes:D.DEFINE_MANY,contextTypes:D.DEFINE_MANY,
childContextTypes:D.DEFINE_MANY,getDefaultProps:D.DEFINE_MANY_MERGED,getInitialState:D.DEFINE_MANY_MERGED,
getChildContext:D.DEFINE_MANY_MERGED,render:D.DEFINE_ONCE,componentWillMount:D.DEFINE_MANY,
componentDidMount:D.DEFINE_MANY,componentWillReceiveProps:D.DEFINE_MANY,shouldComponentUpdate:D.DEFINE_ONCE,
componentWillUpdate:D.DEFINE_MANY,componentDidUpdate:D.DEFINE_MANY,componentWillUnmount:D.DEFINE_MANY,
updateComponent:D.OVERRIDE_BASE},T={displayName:function(e,t){e.displayName=t},mixins:function(e,t){
if(t)for(var n=0;n<t.length;n++)i(e,t[n])},childContextTypes:function(e,t){"production"!==n.env.NODE_ENV&&r(e,t,y.childContext),
e.childContextTypes=x({},e.childContextTypes,t)},contextTypes:function(e,t){"production"!==n.env.NODE_ENV&&r(e,t,y.context),
e.contextTypes=x({},e.contextTypes,t)},getDefaultProps:function(e,t){e.getDefaultProps=e.getDefaultProps?s(e.getDefaultProps,t):t;

},propTypes:function(e,t){"production"!==n.env.NODE_ENV&&r(e,t,y.prop),e.propTypes=x({},e.propTypes,t);

},statics:function(e,t){a(e,t)}},k={enumerable:!1,get:function(){var e=this.displayName||this.name||"Component";

return"production"!==n.env.NODE_ENV?N(!1,"%s.type is deprecated. Use %s directly to access the class.",e,e):null,
Object.defineProperty(this,"type",{value:this}),this}},S={replaceState:function(e,t){
b.enqueueReplaceState(this,e),t&&b.enqueueCallback(this,t)},isMounted:function(){
if("production"!==n.env.NODE_ENV){var e=d.current;null!==e&&("production"!==n.env.NODE_ENV?N(e._warnedAboutRefsInRender,"%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",e.getName()||"A component"):null,
e._warnedAboutRefsInRender=!0)}var t=m.get(this);return t&&t!==v.currentlyMountingInstance;

},setProps:function(e,t){b.enqueueSetProps(this,e),t&&b.enqueueCallback(this,t)},
replaceProps:function(e,t){b.enqueueReplaceProps(this,e),t&&b.enqueueCallback(this,t);

}},P=function(){};x(P.prototype,f.prototype,S);var I={createClass:function(e){var t=function(e,r){
"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?N(this instanceof t,"Something is calling a React component directly. Use a factory or JSX instead. See: https://fb.me/react-legacyfactory"):null),
this.__reactAutoBindMap&&p(this),this.props=e,this.context=r,this.state=null;var o=this.getInitialState?this.getInitialState():null;

"production"!==n.env.NODE_ENV&&"undefined"==typeof o&&this.getInitialState._isMockFunction&&(o=null),
"production"!==n.env.NODE_ENV?w("object"==typeof o&&!Array.isArray(o),"%s.getInitialState(): must return an object or null",t.displayName||"ReactCompositeComponent"):w("object"==typeof o&&!Array.isArray(o)),
this.state=o};t.prototype=new P,t.prototype.constructor=t,R.forEach(i.bind(null,t)),
i(t,e),t.getDefaultProps&&(t.defaultProps=t.getDefaultProps()),"production"!==n.env.NODE_ENV&&(t.getDefaultProps&&(t.getDefaultProps.isReactClassApproved={}),
t.prototype.getInitialState&&(t.prototype.getInitialState.isReactClassApproved={})),
"production"!==n.env.NODE_ENV?w(t.prototype.render,"createClass(...): Class specification must implement a `render` method."):w(t.prototype.render),
"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?N(!t.prototype.componentShouldUpdate,"%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",e.displayName||"A component"):null);

for(var r in O)t.prototype[r]||(t.prototype[r]=null);if(t.type=t,"production"!==n.env.NODE_ENV)try{
Object.defineProperty(t,"type",k)}catch(o){}return t},injection:{injectMixin:function(e){
R.push(e)}}};t.exports=I}).call(this,e("_process"))},{"./Object.assign":53,"./ReactComponent":61,
"./ReactCurrentOwner":66,"./ReactElement":84,"./ReactErrorUtils":87,"./ReactInstanceMap":94,
"./ReactLifeCycle":95,"./ReactPropTypeLocationNames":103,"./ReactPropTypeLocations":104,
"./ReactUpdateQueue":113,"./invariant":162,"./keyMirror":167,"./keyOf":168,"./warning":181,
_process:14}],61:[function(e,t,n){(function(n){"use strict";function r(e,t){this.props=e,
this.context=t}var o=e("./ReactUpdateQueue"),i=e("./invariant"),a=e("./warning");
if(r.prototype.setState=function(e,t){"production"!==n.env.NODE_ENV?i("object"==typeof e||"function"==typeof e||null==e,"setState(...): takes an object of state variables to update or a function which returns an object of state variables."):i("object"==typeof e||"function"==typeof e||null==e),
"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?a(null!=e,"setState(...): You passed an undefined or null state object; instead, use forceUpdate()."):null),
o.enqueueSetState(this,e),t&&o.enqueueCallback(this,t)},r.prototype.forceUpdate=function(e){
o.enqueueForceUpdate(this),e&&o.enqueueCallback(this,e)},"production"!==n.env.NODE_ENV){
var u={getDOMNode:["getDOMNode","Use React.findDOMNode(component) instead."],isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
replaceProps:["replaceProps","Instead, call React.render again at the top level."],
replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."],
setProps:["setProps","Instead, call React.render again at the top level."]},s=function(e,t){
try{Object.defineProperty(r.prototype,e,{get:function(){return void("production"!==n.env.NODE_ENV?a(!1,"%s(...) is deprecated in plain JavaScript React classes. %s",t[0],t[1]):null);

}})}catch(o){}};for(var c in u)u.hasOwnProperty(c)&&s(c,u[c])}t.exports=r}).call(this,e("_process"));

},{"./ReactUpdateQueue":113,"./invariant":162,"./warning":181,_process:14}],62:[function(e,t,n){
"use strict";var r=e("./ReactDOMIDOperations"),o=e("./ReactMount"),i={processChildrenUpdates:r.dangerouslyProcessChildrenUpdates,
replaceNodeWithMarkupByID:r.dangerouslyReplaceNodeWithMarkupByID,unmountIDFromEnvironment:function(e){
o.purgeID(e)}};t.exports=i},{"./ReactDOMIDOperations":71,"./ReactMount":97}],63:[function(e,t,n){
(function(n){"use strict";var r=e("./invariant"),o=!1,i={unmountIDFromEnvironment:null,
replaceNodeWithMarkupByID:null,processChildrenUpdates:null,injection:{injectEnvironment:function(e){
"production"!==n.env.NODE_ENV?r(!o,"ReactCompositeComponent: injectEnvironment() can only be called once."):r(!o),
i.unmountIDFromEnvironment=e.unmountIDFromEnvironment,i.replaceNodeWithMarkupByID=e.replaceNodeWithMarkupByID,
i.processChildrenUpdates=e.processChildrenUpdates,o=!0}}};t.exports=i}).call(this,e("_process"));

},{"./invariant":162,_process:14}],64:[function(e,t,n){(function(n){"use strict";
function r(e){var t=e._currentElement._owner||null;if(t){var n=t.getName();if(n)return" Check the render method of `"+n+"`.";

}return""}var o=e("./ReactComponentEnvironment"),i=e("./ReactContext"),a=e("./ReactCurrentOwner"),u=e("./ReactElement"),s=e("./ReactElementValidator"),c=e("./ReactInstanceMap"),l=e("./ReactLifeCycle"),p=e("./ReactNativeComponent"),f=e("./ReactPerf"),d=e("./ReactPropTypeLocations"),h=e("./ReactPropTypeLocationNames"),g=e("./ReactReconciler"),m=e("./ReactUpdates"),v=e("./Object.assign"),y=e("./emptyObject"),E=e("./invariant"),b=e("./shouldUpdateReactComponent"),x=e("./warning"),w=1,C={
construct:function(e){this._currentElement=e,this._rootNodeID=null,this._instance=null,
this._pendingElement=null,this._pendingStateQueue=null,this._pendingReplaceState=!1,
this._pendingForceUpdate=!1,this._renderedComponent=null,this._context=null,this._mountOrder=0,
this._isTopLevel=!1,this._pendingCallbacks=null},mountComponent:function(e,t,r){this._context=r,
this._mountOrder=w++,this._rootNodeID=e;var o=this._processProps(this._currentElement.props),i=this._processContext(this._currentElement._context),a=p.getComponentClassForElement(this._currentElement),u=new a(o,i);

"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?x(null!=u.render,"%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render` in your component or you may have accidentally tried to render an element whose type is a function that isn't a React component.",a.displayName||a.name||"Component"):null),
u.props=o,u.context=i,u.refs=y,this._instance=u,c.set(u,this),"production"!==n.env.NODE_ENV&&this._warnIfContextsDiffer(this._currentElement._context,r),
"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?x(!u.getInitialState||u.getInitialState.isReactClassApproved,"getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",this.getName()||"a component"):null,
"production"!==n.env.NODE_ENV?x(!u.getDefaultProps||u.getDefaultProps.isReactClassApproved,"getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",this.getName()||"a component"):null,
"production"!==n.env.NODE_ENV?x(!u.propTypes,"propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.",this.getName()||"a component"):null,
"production"!==n.env.NODE_ENV?x(!u.contextTypes,"contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.",this.getName()||"a component"):null,
"production"!==n.env.NODE_ENV?x("function"!=typeof u.componentShouldUpdate,"%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",this.getName()||"A component"):null);

var s=u.state;void 0===s&&(u.state=s=null),"production"!==n.env.NODE_ENV?E("object"==typeof s&&!Array.isArray(s),"%s.state: must be set to an object or null",this.getName()||"ReactCompositeComponent"):E("object"==typeof s&&!Array.isArray(s)),
this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1;

var f,d,h=l.currentlyMountingInstance;l.currentlyMountingInstance=this;try{u.componentWillMount&&(u.componentWillMount(),
this._pendingStateQueue&&(u.state=this._processPendingState(u.props,u.context))),
f=this._getValidatedChildContext(r),d=this._renderValidatedComponent(f)}finally{l.currentlyMountingInstance=h;

}this._renderedComponent=this._instantiateReactComponent(d,this._currentElement.type);

var m=g.mountComponent(this._renderedComponent,e,t,this._mergeChildContext(r,f));
return u.componentDidMount&&t.getReactMountReady().enqueue(u.componentDidMount,u),
m},unmountComponent:function(){var e=this._instance;if(e.componentWillUnmount){var t=l.currentlyUnmountingInstance;

l.currentlyUnmountingInstance=this;try{e.componentWillUnmount()}finally{l.currentlyUnmountingInstance=t;

}}g.unmountComponent(this._renderedComponent),this._renderedComponent=null,this._pendingStateQueue=null,
this._pendingReplaceState=!1,this._pendingForceUpdate=!1,this._pendingCallbacks=null,
this._pendingElement=null,this._context=null,this._rootNodeID=null,c.remove(e)},_setPropsInternal:function(e,t){
var n=this._pendingElement||this._currentElement;this._pendingElement=u.cloneAndReplaceProps(n,v({},n.props,e)),
m.enqueueUpdate(this,t)},_maskContext:function(e){var t=null;if("string"==typeof this._currentElement.type)return y;

var n=this._currentElement.type.contextTypes;if(!n)return y;t={};for(var r in n)t[r]=e[r];

return t},_processContext:function(e){var t=this._maskContext(e);if("production"!==n.env.NODE_ENV){
var r=p.getComponentClassForElement(this._currentElement);r.contextTypes&&this._checkPropTypes(r.contextTypes,t,d.context);

}return t},_getValidatedChildContext:function(e){var t=this._instance,r=t.getChildContext&&t.getChildContext();

if(r){"production"!==n.env.NODE_ENV?E("object"==typeof t.constructor.childContextTypes,"%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",this.getName()||"ReactCompositeComponent"):E("object"==typeof t.constructor.childContextTypes),
"production"!==n.env.NODE_ENV&&this._checkPropTypes(t.constructor.childContextTypes,r,d.childContext);

for(var o in r)"production"!==n.env.NODE_ENV?E(o in t.constructor.childContextTypes,'%s.getChildContext(): key "%s" is not defined in childContextTypes.',this.getName()||"ReactCompositeComponent",o):E(o in t.constructor.childContextTypes);

return r}return null},_mergeChildContext:function(e,t){return t?v({},e,t):e},_processProps:function(e){
if("production"!==n.env.NODE_ENV){var t=p.getComponentClassForElement(this._currentElement);

t.propTypes&&this._checkPropTypes(t.propTypes,e,d.prop)}return e},_checkPropTypes:function(e,t,o){
var i=this.getName();for(var a in e)if(e.hasOwnProperty(a)){var u;try{"production"!==n.env.NODE_ENV?E("function"==typeof e[a],"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",i||"React class",h[o],a):E("function"==typeof e[a]),
u=e[a](t,a,i,o)}catch(s){u=s}if(u instanceof Error){var c=r(this);o===d.prop?"production"!==n.env.NODE_ENV?x(!1,"Failed Composite propType: %s%s",u.message,c):null:"production"!==n.env.NODE_ENV?x(!1,"Failed Context Types: %s%s",u.message,c):null;

}}},receiveComponent:function(e,t,n){var r=this._currentElement,o=this._context;this._pendingElement=null,
this.updateComponent(t,r,e,o,n)},performUpdateIfNecessary:function(e){null!=this._pendingElement&&g.receiveComponent(this,this._pendingElement||this._currentElement,e,this._context),
(null!==this._pendingStateQueue||this._pendingForceUpdate)&&("production"!==n.env.NODE_ENV&&s.checkAndWarnForMutatedProps(this._currentElement),
this.updateComponent(e,this._currentElement,this._currentElement,this._context,this._context));

},_warnIfContextsDiffer:function(e,t){e=this._maskContext(e),t=this._maskContext(t);

for(var r=Object.keys(t).sort(),o=this.getName()||"ReactCompositeComponent",i=0;i<r.length;i++){
var a=r[i];"production"!==n.env.NODE_ENV?x(e[a]===t[a],"owner-based and parent-based contexts differ (values: `%s` vs `%s`) for key (%s) while mounting %s (see: http://fb.me/react-context-by-parent)",e[a],t[a],a,o):null;

}},updateComponent:function(e,t,r,o,i){var a=this._instance,u=a.context,s=a.props;

t!==r&&(u=this._processContext(r._context),s=this._processProps(r.props),"production"!==n.env.NODE_ENV&&null!=i&&this._warnIfContextsDiffer(r._context,i),
a.componentWillReceiveProps&&a.componentWillReceiveProps(s,u));var c=this._processPendingState(s,u),l=this._pendingForceUpdate||!a.shouldComponentUpdate||a.shouldComponentUpdate(s,c,u);

"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?x("undefined"!=typeof l,"%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",this.getName()||"ReactCompositeComponent"):null),
l?(this._pendingForceUpdate=!1,this._performComponentUpdate(r,s,c,u,e,i)):(this._currentElement=r,
this._context=i,a.props=s,a.state=c,a.context=u)},_processPendingState:function(e,t){
var n=this._instance,r=this._pendingStateQueue,o=this._pendingReplaceState;if(this._pendingReplaceState=!1,
this._pendingStateQueue=null,!r)return n.state;if(o&&1===r.length)return r[0];for(var i=v({},o?r[0]:n.state),a=o?1:0;a<r.length;a++){
var u=r[a];v(i,"function"==typeof u?u.call(n,i,e,t):u)}return i},_performComponentUpdate:function(e,t,n,r,o,i){
var a=this._instance,u=a.props,s=a.state,c=a.context;a.componentWillUpdate&&a.componentWillUpdate(t,n,r),
this._currentElement=e,this._context=i,a.props=t,a.state=n,a.context=r,this._updateRenderedComponent(o,i),
a.componentDidUpdate&&o.getReactMountReady().enqueue(a.componentDidUpdate.bind(a,u,s,c),a);

},_updateRenderedComponent:function(e,t){var n=this._renderedComponent,r=n._currentElement,o=this._getValidatedChildContext(),i=this._renderValidatedComponent(o);

if(b(r,i))g.receiveComponent(n,i,e,this._mergeChildContext(t,o));else{var a=this._rootNodeID,u=n._rootNodeID;

g.unmountComponent(n),this._renderedComponent=this._instantiateReactComponent(i,this._currentElement.type);

var s=g.mountComponent(this._renderedComponent,a,e,this._mergeChildContext(t,o));
this._replaceNodeWithMarkupByID(u,s)}},_replaceNodeWithMarkupByID:function(e,t){o.replaceNodeWithMarkupByID(e,t);

},_renderValidatedComponentWithoutOwnerOrContext:function(){var e=this._instance,t=e.render();

return"production"!==n.env.NODE_ENV&&"undefined"==typeof t&&e.render._isMockFunction&&(t=null),
t},_renderValidatedComponent:function(e){var t,r=i.current;i.current=this._mergeChildContext(this._currentElement._context,e),
a.current=this;try{t=this._renderValidatedComponentWithoutOwnerOrContext()}finally{
i.current=r,a.current=null}return"production"!==n.env.NODE_ENV?E(null===t||t===!1||u.isValidElement(t),"%s.render(): A valid ReactComponent must be returned. You may have returned undefined, an array or some other invalid object.",this.getName()||"ReactCompositeComponent"):E(null===t||t===!1||u.isValidElement(t)),
t},attachRef:function(e,t){var n=this.getPublicInstance(),r=n.refs===y?n.refs={}:n.refs;

r[e]=t.getPublicInstance()},detachRef:function(e){var t=this.getPublicInstance().refs;

delete t[e]},getName:function(){var e=this._currentElement.type,t=this._instance&&this._instance.constructor;

return e.displayName||t&&t.displayName||e.name||t&&t.name||null},getPublicInstance:function(){
return this._instance},_instantiateReactComponent:null};f.measureMethods(C,"ReactCompositeComponent",{
mountComponent:"mountComponent",updateComponent:"updateComponent",_renderValidatedComponent:"_renderValidatedComponent"
});var _={Mixin:C};t.exports=_}).call(this,e("_process"))},{"./Object.assign":53,
"./ReactComponentEnvironment":63,"./ReactContext":65,"./ReactCurrentOwner":66,"./ReactElement":84,
"./ReactElementValidator":85,"./ReactInstanceMap":94,"./ReactLifeCycle":95,"./ReactNativeComponent":100,
"./ReactPerf":102,"./ReactPropTypeLocationNames":103,"./ReactPropTypeLocations":104,
"./ReactReconciler":108,"./ReactUpdates":114,"./emptyObject":142,"./invariant":162,
"./shouldUpdateReactComponent":178,"./warning":181,_process:14}],65:[function(e,t,n){
(function(n){"use strict";var r=e("./Object.assign"),o=e("./emptyObject"),i=e("./warning"),a=!1,u={
current:o,withContext:function(e,t){"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?i(a,"withContext is deprecated and will be removed in a future version. Use a wrapper component with getChildContext instead."):null,
a=!0);var o,s=u.current;u.current=r({},s,e);try{o=t()}finally{u.current=s}return o;

}};t.exports=u}).call(this,e("_process"))},{"./Object.assign":53,"./emptyObject":142,
"./warning":181,_process:14}],66:[function(e,t,n){"use strict";var r={current:null
};t.exports=r},{}],67:[function(e,t,n){(function(n){"use strict";function r(e){return"production"!==n.env.NODE_ENV?i.createFactory(e):o.createFactory(e);

}var o=e("./ReactElement"),i=e("./ReactElementValidator"),a=e("./mapObject"),u=a({
a:"a",abbr:"abbr",address:"address",area:"area",article:"article",aside:"aside",audio:"audio",
b:"b",base:"base",bdi:"bdi",bdo:"bdo",big:"big",blockquote:"blockquote",body:"body",
br:"br",button:"button",canvas:"canvas",caption:"caption",cite:"cite",code:"code",
col:"col",colgroup:"colgroup",data:"data",datalist:"datalist",dd:"dd",del:"del",details:"details",
dfn:"dfn",dialog:"dialog",div:"div",dl:"dl",dt:"dt",em:"em",embed:"embed",fieldset:"fieldset",
figcaption:"figcaption",figure:"figure",footer:"footer",form:"form",h1:"h1",h2:"h2",
h3:"h3",h4:"h4",h5:"h5",h6:"h6",head:"head",header:"header",hr:"hr",html:"html",i:"i",
iframe:"iframe",img:"img",input:"input",ins:"ins",kbd:"kbd",keygen:"keygen",label:"label",
legend:"legend",li:"li",link:"link",main:"main",map:"map",mark:"mark",menu:"menu",
menuitem:"menuitem",meta:"meta",meter:"meter",nav:"nav",noscript:"noscript",object:"object",
ol:"ol",optgroup:"optgroup",option:"option",output:"output",p:"p",param:"param",picture:"picture",
pre:"pre",progress:"progress",q:"q",rp:"rp",rt:"rt",ruby:"ruby",s:"s",samp:"samp",
script:"script",section:"section",select:"select",small:"small",source:"source",span:"span",
strong:"strong",style:"style",sub:"sub",summary:"summary",sup:"sup",table:"table",
tbody:"tbody",td:"td",textarea:"textarea",tfoot:"tfoot",th:"th",thead:"thead",time:"time",
title:"title",tr:"tr",track:"track",u:"u",ul:"ul","var":"var",video:"video",wbr:"wbr",
circle:"circle",clipPath:"clipPath",defs:"defs",ellipse:"ellipse",g:"g",line:"line",
linearGradient:"linearGradient",mask:"mask",path:"path",pattern:"pattern",polygon:"polygon",
polyline:"polyline",radialGradient:"radialGradient",rect:"rect",stop:"stop",svg:"svg",
text:"text",tspan:"tspan"},r);t.exports=u}).call(this,e("_process"))},{"./ReactElement":84,
"./ReactElementValidator":85,"./mapObject":169,_process:14}],68:[function(e,t,n){
"use strict";var r=e("./AutoFocusMixin"),o=e("./ReactBrowserComponentMixin"),i=e("./ReactClass"),a=e("./ReactElement"),u=e("./keyMirror"),s=a.createFactory("button"),c=u({
onClick:!0,onDoubleClick:!0,onMouseDown:!0,onMouseMove:!0,onMouseUp:!0,onClickCapture:!0,
onDoubleClickCapture:!0,onMouseDownCapture:!0,onMouseMoveCapture:!0,onMouseUpCapture:!0
}),l=i.createClass({displayName:"ReactDOMButton",tagName:"BUTTON",mixins:[r,o],render:function(){
var e={};for(var t in this.props)!this.props.hasOwnProperty(t)||this.props.disabled&&c[t]||(e[t]=this.props[t]);

return s(e,this.props.children)}});t.exports=l},{"./AutoFocusMixin":28,"./ReactBrowserComponentMixin":56,
"./ReactClass":60,"./ReactElement":84,"./keyMirror":167}],69:[function(e,t,n){(function(n){
"use strict";function r(e){e&&(null!=e.dangerouslySetInnerHTML&&("production"!==n.env.NODE_ENV?v(null==e.children,"Can only set one of `children` or `props.dangerouslySetInnerHTML`."):v(null==e.children),
"production"!==n.env.NODE_ENV?v("object"==typeof e.dangerouslySetInnerHTML&&"__html"in e.dangerouslySetInnerHTML,"`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information."):v("object"==typeof e.dangerouslySetInnerHTML&&"__html"in e.dangerouslySetInnerHTML)),
"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?b(null==e.innerHTML,"Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."):null,
"production"!==n.env.NODE_ENV?b(!e.contentEditable||null==e.children,"A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."):null),
"production"!==n.env.NODE_ENV?v(null==e.style||"object"==typeof e.style,"The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."):v(null==e.style||"object"==typeof e.style));

}function o(e,t,r,o){"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?b("onScroll"!==t||y("scroll",!0),"This browser doesn't support the `onScroll` event"):null);

var i=f.findReactContainerForID(e);if(i){var a=i.nodeType===M?i.ownerDocument:i;w(t,a);

}o.getPutListenerQueue().enqueuePutListener(e,t,r)}function i(e){k.call(T,e)||("production"!==n.env.NODE_ENV?v(O.test(e),"Invalid tag: %s",e):v(O.test(e)),
T[e]=!0)}function a(e){i(e),this._tag=e,this._renderedChildren=null,this._previousStyleCopy=null,
this._rootNodeID=null}var u=e("./CSSPropertyOperations"),s=e("./DOMProperty"),c=e("./DOMPropertyOperations"),l=e("./ReactBrowserEventEmitter"),p=e("./ReactComponentBrowserEnvironment"),f=e("./ReactMount"),d=e("./ReactMultiChild"),h=e("./ReactPerf"),g=e("./Object.assign"),m=e("./escapeTextContentForBrowser"),v=e("./invariant"),y=e("./isEventSupported"),E=e("./keyOf"),b=e("./warning"),x=l.deleteListener,w=l.listenTo,C=l.registrationNameModules,_={
string:!0,number:!0},N=E({style:null}),M=1,D=null,R={area:!0,base:!0,br:!0,col:!0,
embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,
wbr:!0},O=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,T={},k={}.hasOwnProperty;a.displayName="ReactDOMComponent",
a.Mixin={construct:function(e){this._currentElement=e},mountComponent:function(e,t,n){
this._rootNodeID=e,r(this._currentElement.props);var o=R[this._tag]?"":"</"+this._tag+">";

return this._createOpenTagMarkupAndPutListeners(t)+this._createContentMarkup(t,n)+o;

},_createOpenTagMarkupAndPutListeners:function(e){var t=this._currentElement.props,n="<"+this._tag;

for(var r in t)if(t.hasOwnProperty(r)){var i=t[r];if(null!=i)if(C.hasOwnProperty(r))o(this._rootNodeID,r,i,e);
else{r===N&&(i&&(i=this._previousStyleCopy=g({},t.style)),i=u.createMarkupForStyles(i));

var a=c.createMarkupForProperty(r,i);a&&(n+=" "+a)}}if(e.renderToStaticMarkup)return n+">";

var s=c.createMarkupForID(this._rootNodeID);return n+" "+s+">"},_createContentMarkup:function(e,t){
var n="";("listing"===this._tag||"pre"===this._tag||"textarea"===this._tag)&&(n="\n");

var r=this._currentElement.props,o=r.dangerouslySetInnerHTML;if(null!=o){if(null!=o.__html)return n+o.__html;

}else{var i=_[typeof r.children]?r.children:null,a=null!=i?null:r.children;if(null!=i)return n+m(i);

if(null!=a){var u=this.mountChildren(a,e,t);return n+u.join("")}}return n},receiveComponent:function(e,t,n){
var r=this._currentElement;this._currentElement=e,this.updateComponent(t,r,e,n)},
updateComponent:function(e,t,n,o){r(this._currentElement.props),this._updateDOMProperties(t.props,e),
this._updateDOMChildren(t.props,e,o)},_updateDOMProperties:function(e,t){var n,r,i,a=this._currentElement.props;

for(n in e)if(!a.hasOwnProperty(n)&&e.hasOwnProperty(n))if(n===N){var u=this._previousStyleCopy;

for(r in u)u.hasOwnProperty(r)&&(i=i||{},i[r]="");this._previousStyleCopy=null}else C.hasOwnProperty(n)?x(this._rootNodeID,n):(s.isStandardName[n]||s.isCustomAttribute(n))&&D.deletePropertyByID(this._rootNodeID,n);

for(n in a){var c=a[n],l=n===N?this._previousStyleCopy:e[n];if(a.hasOwnProperty(n)&&c!==l)if(n===N)if(c?c=this._previousStyleCopy=g({},c):this._previousStyleCopy=null,
l){for(r in l)!l.hasOwnProperty(r)||c&&c.hasOwnProperty(r)||(i=i||{},i[r]="");for(r in c)c.hasOwnProperty(r)&&l[r]!==c[r]&&(i=i||{},
i[r]=c[r])}else i=c;else C.hasOwnProperty(n)?o(this._rootNodeID,n,c,t):(s.isStandardName[n]||s.isCustomAttribute(n))&&D.updatePropertyByID(this._rootNodeID,n,c);

}i&&D.updateStylesByID(this._rootNodeID,i)},_updateDOMChildren:function(e,t,n){var r=this._currentElement.props,o=_[typeof e.children]?e.children:null,i=_[typeof r.children]?r.children:null,a=e.dangerouslySetInnerHTML&&e.dangerouslySetInnerHTML.__html,u=r.dangerouslySetInnerHTML&&r.dangerouslySetInnerHTML.__html,s=null!=o?null:e.children,c=null!=i?null:r.children,l=null!=o||null!=a,p=null!=i||null!=u;

null!=s&&null==c?this.updateChildren(null,t,n):l&&!p&&this.updateTextContent(""),
null!=i?o!==i&&this.updateTextContent(""+i):null!=u?a!==u&&D.updateInnerHTMLByID(this._rootNodeID,u):null!=c&&this.updateChildren(c,t,n);

},unmountComponent:function(){this.unmountChildren(),l.deleteAllListeners(this._rootNodeID),
p.unmountIDFromEnvironment(this._rootNodeID),this._rootNodeID=null}},h.measureMethods(a,"ReactDOMComponent",{
mountComponent:"mountComponent",updateComponent:"updateComponent"}),g(a.prototype,a.Mixin,d.Mixin),
a.injection={injectIDOperations:function(e){a.BackendIDOperations=D=e}},t.exports=a;

}).call(this,e("_process"))},{"./CSSPropertyOperations":31,"./DOMProperty":36,"./DOMPropertyOperations":37,
"./Object.assign":53,"./ReactBrowserEventEmitter":57,"./ReactComponentBrowserEnvironment":62,
"./ReactMount":97,"./ReactMultiChild":98,"./ReactPerf":102,"./escapeTextContentForBrowser":143,
"./invariant":162,"./isEventSupported":163,"./keyOf":168,"./warning":181,_process:14
}],70:[function(e,t,n){"use strict";var r=e("./EventConstants"),o=e("./LocalEventTrapMixin"),i=e("./ReactBrowserComponentMixin"),a=e("./ReactClass"),u=e("./ReactElement"),s=u.createFactory("form"),c=a.createClass({
displayName:"ReactDOMForm",tagName:"FORM",mixins:[i,o],render:function(){return s(this.props);

},componentDidMount:function(){this.trapBubbledEvent(r.topLevelTypes.topReset,"reset"),
this.trapBubbledEvent(r.topLevelTypes.topSubmit,"submit")}});t.exports=c},{"./EventConstants":41,
"./LocalEventTrapMixin":51,"./ReactBrowserComponentMixin":56,"./ReactClass":60,"./ReactElement":84
}],71:[function(e,t,n){(function(n){"use strict";var r=e("./CSSPropertyOperations"),o=e("./DOMChildrenOperations"),i=e("./DOMPropertyOperations"),a=e("./ReactMount"),u=e("./ReactPerf"),s=e("./invariant"),c=e("./setInnerHTML"),l={
dangerouslySetInnerHTML:"`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.",
style:"`style` must be set using `updateStylesByID()`."},p={updatePropertyByID:function(e,t,r){
var o=a.getNode(e);"production"!==n.env.NODE_ENV?s(!l.hasOwnProperty(t),"updatePropertyByID(...): %s",l[t]):s(!l.hasOwnProperty(t)),
null!=r?i.setValueForProperty(o,t,r):i.deleteValueForProperty(o,t)},deletePropertyByID:function(e,t,r){
var o=a.getNode(e);"production"!==n.env.NODE_ENV?s(!l.hasOwnProperty(t),"updatePropertyByID(...): %s",l[t]):s(!l.hasOwnProperty(t)),
i.deleteValueForProperty(o,t,r)},updateStylesByID:function(e,t){var n=a.getNode(e);

r.setValueForStyles(n,t)},updateInnerHTMLByID:function(e,t){var n=a.getNode(e);c(n,t);

},updateTextContentByID:function(e,t){var n=a.getNode(e);o.updateTextContent(n,t);

},dangerouslyReplaceNodeWithMarkupByID:function(e,t){var n=a.getNode(e);o.dangerouslyReplaceNodeWithMarkup(n,t);

},dangerouslyProcessChildrenUpdates:function(e,t){for(var n=0;n<e.length;n++)e[n].parentNode=a.getNode(e[n].parentID);

o.processUpdates(e,t)}};u.measureMethods(p,"ReactDOMIDOperations",{updatePropertyByID:"updatePropertyByID",
deletePropertyByID:"deletePropertyByID",updateStylesByID:"updateStylesByID",updateInnerHTMLByID:"updateInnerHTMLByID",
updateTextContentByID:"updateTextContentByID",dangerouslyReplaceNodeWithMarkupByID:"dangerouslyReplaceNodeWithMarkupByID",
dangerouslyProcessChildrenUpdates:"dangerouslyProcessChildrenUpdates"}),t.exports=p;

}).call(this,e("_process"))},{"./CSSPropertyOperations":31,"./DOMChildrenOperations":35,
"./DOMPropertyOperations":37,"./ReactMount":97,"./ReactPerf":102,"./invariant":162,
"./setInnerHTML":175,_process:14}],72:[function(e,t,n){"use strict";var r=e("./EventConstants"),o=e("./LocalEventTrapMixin"),i=e("./ReactBrowserComponentMixin"),a=e("./ReactClass"),u=e("./ReactElement"),s=u.createFactory("iframe"),c=a.createClass({
displayName:"ReactDOMIframe",tagName:"IFRAME",mixins:[i,o],render:function(){return s(this.props);

},componentDidMount:function(){this.trapBubbledEvent(r.topLevelTypes.topLoad,"load");

}});t.exports=c},{"./EventConstants":41,"./LocalEventTrapMixin":51,"./ReactBrowserComponentMixin":56,
"./ReactClass":60,"./ReactElement":84}],73:[function(e,t,n){"use strict";var r=e("./EventConstants"),o=e("./LocalEventTrapMixin"),i=e("./ReactBrowserComponentMixin"),a=e("./ReactClass"),u=e("./ReactElement"),s=u.createFactory("img"),c=a.createClass({
displayName:"ReactDOMImg",tagName:"IMG",mixins:[i,o],render:function(){return s(this.props);

},componentDidMount:function(){this.trapBubbledEvent(r.topLevelTypes.topLoad,"load"),
this.trapBubbledEvent(r.topLevelTypes.topError,"error")}});t.exports=c},{"./EventConstants":41,
"./LocalEventTrapMixin":51,"./ReactBrowserComponentMixin":56,"./ReactClass":60,"./ReactElement":84
}],74:[function(e,t,n){(function(n){"use strict";function r(){this.isMounted()&&this.forceUpdate();

}var o=e("./AutoFocusMixin"),i=e("./DOMPropertyOperations"),a=e("./LinkedValueUtils"),u=e("./ReactBrowserComponentMixin"),s=e("./ReactClass"),c=e("./ReactElement"),l=e("./ReactMount"),p=e("./ReactUpdates"),f=e("./Object.assign"),d=e("./invariant"),h=c.createFactory("input"),g={},m=s.createClass({
displayName:"ReactDOMInput",tagName:"INPUT",mixins:[o,a.Mixin,u],getInitialState:function(){
var e=this.props.defaultValue;return{initialChecked:this.props.defaultChecked||!1,
initialValue:null!=e?e:null}},render:function(){var e=f({},this.props);e.defaultChecked=null,
e.defaultValue=null;var t=a.getValue(this);e.value=null!=t?t:this.state.initialValue;

var n=a.getChecked(this);return e.checked=null!=n?n:this.state.initialChecked,e.onChange=this._handleChange,
h(e,this.props.children)},componentDidMount:function(){var e=l.getID(this.getDOMNode());

g[e]=this},componentWillUnmount:function(){var e=this.getDOMNode(),t=l.getID(e);delete g[t];

},componentDidUpdate:function(e,t,n){var r=this.getDOMNode();null!=this.props.checked&&i.setValueForProperty(r,"checked",this.props.checked||!1);

var o=a.getValue(this);null!=o&&i.setValueForProperty(r,"value",""+o)},_handleChange:function(e){
var t,o=a.getOnChange(this);o&&(t=o.call(this,e)),p.asap(r,this);var i=this.props.name;

if("radio"===this.props.type&&null!=i){for(var u=this.getDOMNode(),s=u;s.parentNode;)s=s.parentNode;

for(var c=s.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),f=0,h=c.length;h>f;f++){
var m=c[f];if(m!==u&&m.form===u.form){var v=l.getID(m);"production"!==n.env.NODE_ENV?d(v,"ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported."):d(v);

var y=g[v];"production"!==n.env.NODE_ENV?d(y,"ReactDOMInput: Unknown radio button ID %s.",v):d(y),
p.asap(r,y)}}}return t}});t.exports=m}).call(this,e("_process"))},{"./AutoFocusMixin":28,
"./DOMPropertyOperations":37,"./LinkedValueUtils":50,"./Object.assign":53,"./ReactBrowserComponentMixin":56,
"./ReactClass":60,"./ReactElement":84,"./ReactMount":97,"./ReactUpdates":114,"./invariant":162,
_process:14}],75:[function(e,t,n){(function(n){"use strict";var r=e("./ReactBrowserComponentMixin"),o=e("./ReactClass"),i=e("./ReactElement"),a=e("./warning"),u=i.createFactory("option"),s=o.createClass({
displayName:"ReactDOMOption",tagName:"OPTION",mixins:[r],componentWillMount:function(){
"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?a(null==this.props.selected,"Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."):null);

},render:function(){return u(this.props,this.props.children)}});t.exports=s}).call(this,e("_process"));

},{"./ReactBrowserComponentMixin":56,"./ReactClass":60,"./ReactElement":84,"./warning":181,
_process:14}],76:[function(e,t,n){"use strict";function r(){if(this._pendingUpdate){
this._pendingUpdate=!1;var e=u.getValue(this);null!=e&&this.isMounted()&&i(this,e);

}}function o(e,t,n){if(null==e[t])return null;if(e.multiple){if(!Array.isArray(e[t]))return new Error("The `"+t+"` prop supplied to <select> must be an array if `multiple` is true.");

}else if(Array.isArray(e[t]))return new Error("The `"+t+"` prop supplied to <select> must be a scalar value if `multiple` is false.");

}function i(e,t){var n,r,o,i=e.getDOMNode().options;if(e.props.multiple){for(n={},
r=0,o=t.length;o>r;r++)n[""+t[r]]=!0;for(r=0,o=i.length;o>r;r++){var a=n.hasOwnProperty(i[r].value);

i[r].selected!==a&&(i[r].selected=a)}}else{for(n=""+t,r=0,o=i.length;o>r;r++)if(i[r].value===n)return void(i[r].selected=!0);

i.length&&(i[0].selected=!0)}}var a=e("./AutoFocusMixin"),u=e("./LinkedValueUtils"),s=e("./ReactBrowserComponentMixin"),c=e("./ReactClass"),l=e("./ReactElement"),p=e("./ReactUpdates"),f=e("./Object.assign"),d=l.createFactory("select"),h=c.createClass({
displayName:"ReactDOMSelect",tagName:"SELECT",mixins:[a,u.Mixin,s],propTypes:{defaultValue:o,
value:o},render:function(){var e=f({},this.props);return e.onChange=this._handleChange,
e.value=null,d(e,this.props.children)},componentWillMount:function(){this._pendingUpdate=!1;

},componentDidMount:function(){var e=u.getValue(this);null!=e?i(this,e):null!=this.props.defaultValue&&i(this,this.props.defaultValue);

},componentDidUpdate:function(e){var t=u.getValue(this);null!=t?(this._pendingUpdate=!1,
i(this,t)):!e.multiple!=!this.props.multiple&&(null!=this.props.defaultValue?i(this,this.props.defaultValue):i(this,this.props.multiple?[]:""));

},_handleChange:function(e){var t,n=u.getOnChange(this);return n&&(t=n.call(this,e)),
this._pendingUpdate=!0,p.asap(r,this),t}});t.exports=h},{"./AutoFocusMixin":28,"./LinkedValueUtils":50,
"./Object.assign":53,"./ReactBrowserComponentMixin":56,"./ReactClass":60,"./ReactElement":84,
"./ReactUpdates":114}],77:[function(e,t,n){"use strict";function r(e,t,n,r){return e===n&&t===r;

}function o(e){var t=document.selection,n=t.createRange(),r=n.text.length,o=n.duplicate();

o.moveToElementText(e),o.setEndPoint("EndToStart",n);var i=o.text.length,a=i+r;return{
start:i,end:a}}function i(e){var t=window.getSelection&&window.getSelection();if(!t||0===t.rangeCount)return null;

var n=t.anchorNode,o=t.anchorOffset,i=t.focusNode,a=t.focusOffset,u=t.getRangeAt(0),s=r(t.anchorNode,t.anchorOffset,t.focusNode,t.focusOffset),c=s?0:u.toString().length,l=u.cloneRange();

l.selectNodeContents(e),l.setEnd(u.startContainer,u.startOffset);var p=r(l.startContainer,l.startOffset,l.endContainer,l.endOffset),f=p?0:l.toString().length,d=f+c,h=document.createRange();

h.setStart(n,o),h.setEnd(i,a);var g=h.collapsed;return{start:g?d:f,end:g?f:d}}function a(e,t){
var n,r,o=document.selection.createRange().duplicate();"undefined"==typeof t.end?(n=t.start,
r=n):t.start>t.end?(n=t.end,r=t.start):(n=t.start,r=t.end),o.moveToElementText(e),
o.moveStart("character",n),o.setEndPoint("EndToStart",o),o.moveEnd("character",r-n),
o.select()}function u(e,t){if(window.getSelection){var n=window.getSelection(),r=e[l()].length,o=Math.min(t.start,r),i="undefined"==typeof t.end?o:Math.min(t.end,r);

if(!n.extend&&o>i){var a=i;i=o,o=a}var u=c(e,o),s=c(e,i);if(u&&s){var p=document.createRange();

p.setStart(u.node,u.offset),n.removeAllRanges(),o>i?(n.addRange(p),n.extend(s.node,s.offset)):(p.setEnd(s.node,s.offset),
n.addRange(p))}}}var s=e("./ExecutionEnvironment"),c=e("./getNodeForCharacterOffset"),l=e("./getTextContentAccessor"),p=s.canUseDOM&&"selection"in document&&!("getSelection"in window),f={
getOffsets:p?o:i,setOffsets:p?a:u};t.exports=f},{"./ExecutionEnvironment":47,"./getNodeForCharacterOffset":155,
"./getTextContentAccessor":157}],78:[function(e,t,n){"use strict";var r=e("./DOMPropertyOperations"),o=e("./ReactComponentBrowserEnvironment"),i=e("./ReactDOMComponent"),a=e("./Object.assign"),u=e("./escapeTextContentForBrowser"),s=function(e){};

a(s.prototype,{construct:function(e){this._currentElement=e,this._stringText=""+e,
this._rootNodeID=null,this._mountIndex=0},mountComponent:function(e,t,n){this._rootNodeID=e;

var o=u(this._stringText);return t.renderToStaticMarkup?o:"<span "+r.createMarkupForID(e)+">"+o+"</span>";

},receiveComponent:function(e,t){if(e!==this._currentElement){this._currentElement=e;

var n=""+e;n!==this._stringText&&(this._stringText=n,i.BackendIDOperations.updateTextContentByID(this._rootNodeID,n));

}},unmountComponent:function(){o.unmountIDFromEnvironment(this._rootNodeID)}}),t.exports=s;

},{"./DOMPropertyOperations":37,"./Object.assign":53,"./ReactComponentBrowserEnvironment":62,
"./ReactDOMComponent":69,"./escapeTextContentForBrowser":143}],79:[function(e,t,n){
(function(n){"use strict";function r(){this.isMounted()&&this.forceUpdate()}var o=e("./AutoFocusMixin"),i=e("./DOMPropertyOperations"),a=e("./LinkedValueUtils"),u=e("./ReactBrowserComponentMixin"),s=e("./ReactClass"),c=e("./ReactElement"),l=e("./ReactUpdates"),p=e("./Object.assign"),f=e("./invariant"),d=e("./warning"),h=c.createFactory("textarea"),g=s.createClass({
displayName:"ReactDOMTextarea",tagName:"TEXTAREA",mixins:[o,a.Mixin,u],getInitialState:function(){
var e=this.props.defaultValue,t=this.props.children;null!=t&&("production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?d(!1,"Use the `defaultValue` or `value` props instead of setting children on <textarea>."):null),
"production"!==n.env.NODE_ENV?f(null==e,"If you supply `defaultValue` on a <textarea>, do not pass children."):f(null==e),
Array.isArray(t)&&("production"!==n.env.NODE_ENV?f(t.length<=1,"<textarea> can only have at most one child."):f(t.length<=1),
t=t[0]),e=""+t),null==e&&(e="");var r=a.getValue(this);return{initialValue:""+(null!=r?r:e)
}},render:function(){var e=p({},this.props);return"production"!==n.env.NODE_ENV?f(null==e.dangerouslySetInnerHTML,"`dangerouslySetInnerHTML` does not make sense on <textarea>."):f(null==e.dangerouslySetInnerHTML),
e.defaultValue=null,e.value=null,e.onChange=this._handleChange,h(e,this.state.initialValue);

},componentDidUpdate:function(e,t,n){var r=a.getValue(this);if(null!=r){var o=this.getDOMNode();

i.setValueForProperty(o,"value",""+r)}},_handleChange:function(e){var t,n=a.getOnChange(this);

return n&&(t=n.call(this,e)),l.asap(r,this),t}});t.exports=g}).call(this,e("_process"));

},{"./AutoFocusMixin":28,"./DOMPropertyOperations":37,"./LinkedValueUtils":50,"./Object.assign":53,
"./ReactBrowserComponentMixin":56,"./ReactClass":60,"./ReactElement":84,"./ReactUpdates":114,
"./invariant":162,"./warning":181,_process:14}],80:[function(e,t,n){"use strict";
function r(){this.reinitializeTransaction()}var o=e("./ReactUpdates"),i=e("./Transaction"),a=e("./Object.assign"),u=e("./emptyFunction"),s={
initialize:u,close:function(){f.isBatchingUpdates=!1}},c={initialize:u,close:o.flushBatchedUpdates.bind(o)
},l=[c,s];a(r.prototype,i.Mixin,{getTransactionWrappers:function(){return l}});var p=new r,f={
isBatchingUpdates:!1,batchedUpdates:function(e,t,n,r,o){var i=f.isBatchingUpdates;

f.isBatchingUpdates=!0,i?e(t,n,r,o):p.perform(e,null,t,n,r,o)}};t.exports=f},{"./Object.assign":53,
"./ReactUpdates":114,"./Transaction":130,"./emptyFunction":141}],81:[function(e,t,n){
(function(n){"use strict";function r(e){return h.createClass({tagName:e.toUpperCase(),
render:function(){return new R(e,null,null,null,null,this.props)}})}function o(){
if(T.EventEmitter.injectReactEventListener(O),T.EventPluginHub.injectEventPluginOrder(s),
T.EventPluginHub.injectInstanceHandle(k),T.EventPluginHub.injectMount(S),T.EventPluginHub.injectEventPluginsByName({
SimpleEventPlugin:j,EnterLeaveEventPlugin:c,ChangeEventPlugin:a,MobileSafariClickEventPlugin:f,
SelectEventPlugin:I,BeforeInputEventPlugin:i}),T.NativeComponent.injectGenericComponentClass(v),
T.NativeComponent.injectTextComponentClass(D),T.NativeComponent.injectAutoWrapper(r),
T.Class.injectMixin(d),T.NativeComponent.injectComponentClasses({button:y,form:E,
iframe:w,img:b,input:C,option:_,select:N,textarea:M,html:V("html"),head:V("head"),
body:V("body")}),T.DOMProperty.injectDOMPropertyConfig(p),T.DOMProperty.injectDOMPropertyConfig(L),
T.EmptyComponent.injectEmptyComponent("noscript"),T.Updates.injectReconcileTransaction(P),
T.Updates.injectBatchingStrategy(m),T.RootIndex.injectCreateReactRootIndex(l.canUseDOM?u.createReactRootIndex:A.createReactRootIndex),
T.Component.injectEnvironment(g),T.DOMComponent.injectIDOperations(x),"production"!==n.env.NODE_ENV){
var t=l.canUseDOM&&window.location.href||"";if(/[?&]react_perf\b/.test(t)){var o=e("./ReactDefaultPerf");

o.start()}}}var i=e("./BeforeInputEventPlugin"),a=e("./ChangeEventPlugin"),u=e("./ClientReactRootIndex"),s=e("./DefaultEventPluginOrder"),c=e("./EnterLeaveEventPlugin"),l=e("./ExecutionEnvironment"),p=e("./HTMLDOMPropertyConfig"),f=e("./MobileSafariClickEventPlugin"),d=e("./ReactBrowserComponentMixin"),h=e("./ReactClass"),g=e("./ReactComponentBrowserEnvironment"),m=e("./ReactDefaultBatchingStrategy"),v=e("./ReactDOMComponent"),y=e("./ReactDOMButton"),E=e("./ReactDOMForm"),b=e("./ReactDOMImg"),x=e("./ReactDOMIDOperations"),w=e("./ReactDOMIframe"),C=e("./ReactDOMInput"),_=e("./ReactDOMOption"),N=e("./ReactDOMSelect"),M=e("./ReactDOMTextarea"),D=e("./ReactDOMTextComponent"),R=e("./ReactElement"),O=e("./ReactEventListener"),T=e("./ReactInjection"),k=e("./ReactInstanceHandles"),S=e("./ReactMount"),P=e("./ReactReconcileTransaction"),I=e("./SelectEventPlugin"),A=e("./ServerReactRootIndex"),j=e("./SimpleEventPlugin"),L=e("./SVGDOMPropertyConfig"),V=e("./createFullPageComponent");

t.exports={inject:o}}).call(this,e("_process"))},{"./BeforeInputEventPlugin":29,"./ChangeEventPlugin":33,
"./ClientReactRootIndex":34,"./DefaultEventPluginOrder":39,"./EnterLeaveEventPlugin":40,
"./ExecutionEnvironment":47,"./HTMLDOMPropertyConfig":49,"./MobileSafariClickEventPlugin":52,
"./ReactBrowserComponentMixin":56,"./ReactClass":60,"./ReactComponentBrowserEnvironment":62,
"./ReactDOMButton":68,"./ReactDOMComponent":69,"./ReactDOMForm":70,"./ReactDOMIDOperations":71,
"./ReactDOMIframe":72,"./ReactDOMImg":73,"./ReactDOMInput":74,"./ReactDOMOption":75,
"./ReactDOMSelect":76,"./ReactDOMTextComponent":78,"./ReactDOMTextarea":79,"./ReactDefaultBatchingStrategy":80,
"./ReactDefaultPerf":82,"./ReactElement":84,"./ReactEventListener":89,"./ReactInjection":91,
"./ReactInstanceHandles":93,"./ReactMount":97,"./ReactReconcileTransaction":107,"./SVGDOMPropertyConfig":115,
"./SelectEventPlugin":116,"./ServerReactRootIndex":117,"./SimpleEventPlugin":118,
"./createFullPageComponent":138,_process:14}],82:[function(e,t,n){"use strict";function r(e){
return Math.floor(100*e)/100}function o(e,t,n){e[t]=(e[t]||0)+n}var i=e("./DOMProperty"),a=e("./ReactDefaultPerfAnalysis"),u=e("./ReactMount"),s=e("./ReactPerf"),c=e("./performanceNow"),l={
_allMeasurements:[],_mountStack:[0],_injected:!1,start:function(){l._injected||s.injection.injectMeasure(l.measure),
l._allMeasurements.length=0,s.enableMeasure=!0},stop:function(){s.enableMeasure=!1;

},getLastMeasurements:function(){return l._allMeasurements},printExclusive:function(e){
e=e||l._allMeasurements;var t=a.getExclusiveSummary(e);console.table(t.map(function(e){
return{"Component class name":e.componentName,"Total inclusive time (ms)":r(e.inclusive),
"Exclusive mount time (ms)":r(e.exclusive),"Exclusive render time (ms)":r(e.render),
"Mount time per instance (ms)":r(e.exclusive/e.count),"Render time per instance (ms)":r(e.render/e.count),
Instances:e.count}}))},printInclusive:function(e){e=e||l._allMeasurements;var t=a.getInclusiveSummary(e);

console.table(t.map(function(e){return{"Owner > component":e.componentName,"Inclusive time (ms)":r(e.time),
Instances:e.count}})),console.log("Total time:",a.getTotalTime(e).toFixed(2)+" ms");

},getMeasurementsSummaryMap:function(e){var t=a.getInclusiveSummary(e,!0);return t.map(function(e){
return{"Owner > component":e.componentName,"Wasted time (ms)":e.time,Instances:e.count
}})},printWasted:function(e){e=e||l._allMeasurements,console.table(l.getMeasurementsSummaryMap(e)),
console.log("Total time:",a.getTotalTime(e).toFixed(2)+" ms")},printDOM:function(e){
e=e||l._allMeasurements;var t=a.getDOMSummary(e);console.table(t.map(function(e){
var t={};return t[i.ID_ATTRIBUTE_NAME]=e.id,t.type=e.type,t.args=JSON.stringify(e.args),
t})),console.log("Total time:",a.getTotalTime(e).toFixed(2)+" ms")},_recordWrite:function(e,t,n,r){
var o=l._allMeasurements[l._allMeasurements.length-1].writes;o[e]=o[e]||[],o[e].push({
type:t,time:n,args:r})},measure:function(e,t,n){return function(){for(var r=[],i=0,a=arguments.length;a>i;i++)r.push(arguments[i]);

var s,p,f;if("_renderNewRootComponent"===t||"flushBatchedUpdates"===t)return l._allMeasurements.push({
exclusive:{},inclusive:{},render:{},counts:{},writes:{},displayNames:{},totalTime:0
}),f=c(),p=n.apply(this,r),l._allMeasurements[l._allMeasurements.length-1].totalTime=c()-f,
p;if("_mountImageIntoNode"===t||"ReactDOMIDOperations"===e){if(f=c(),p=n.apply(this,r),
s=c()-f,"_mountImageIntoNode"===t){var d=u.getID(r[1]);l._recordWrite(d,t,s,r[0]);

}else"dangerouslyProcessChildrenUpdates"===t?r[0].forEach(function(e){var t={};null!==e.fromIndex&&(t.fromIndex=e.fromIndex),
null!==e.toIndex&&(t.toIndex=e.toIndex),null!==e.textContent&&(t.textContent=e.textContent),
null!==e.markupIndex&&(t.markup=r[1][e.markupIndex]),l._recordWrite(e.parentID,e.type,s,t);

}):l._recordWrite(r[0],t,s,Array.prototype.slice.call(r,1));return p}if("ReactCompositeComponent"!==e||"mountComponent"!==t&&"updateComponent"!==t&&"_renderValidatedComponent"!==t)return n.apply(this,r);

if("string"==typeof this._currentElement.type)return n.apply(this,r);var h="mountComponent"===t?r[0]:this._rootNodeID,g="_renderValidatedComponent"===t,m="mountComponent"===t,v=l._mountStack,y=l._allMeasurements[l._allMeasurements.length-1];

if(g?o(y.counts,h,1):m&&v.push(0),f=c(),p=n.apply(this,r),s=c()-f,g)o(y.render,h,s);
else if(m){var E=v.pop();v[v.length-1]+=s,o(y.exclusive,h,s-E),o(y.inclusive,h,s);

}else o(y.inclusive,h,s);return y.displayNames[h]={current:this.getName(),owner:this._currentElement._owner?this._currentElement._owner.getName():"<root>"
},p}}};t.exports=l},{"./DOMProperty":36,"./ReactDefaultPerfAnalysis":83,"./ReactMount":97,
"./ReactPerf":102,"./performanceNow":173}],83:[function(e,t,n){function r(e){for(var t=0,n=0;n<e.length;n++){
var r=e[n];t+=r.totalTime}return t}function o(e){for(var t=[],n=0;n<e.length;n++){
var r,o=e[n];for(r in o.writes)o.writes[r].forEach(function(e){t.push({id:r,type:l[e.type]||e.type,
args:e.args})})}return t}function i(e){for(var t,n={},r=0;r<e.length;r++){var o=e[r],i=s({},o.exclusive,o.inclusive);

for(var a in i)t=o.displayNames[a].current,n[t]=n[t]||{componentName:t,inclusive:0,
exclusive:0,render:0,count:0},o.render[a]&&(n[t].render+=o.render[a]),o.exclusive[a]&&(n[t].exclusive+=o.exclusive[a]),
o.inclusive[a]&&(n[t].inclusive+=o.inclusive[a]),o.counts[a]&&(n[t].count+=o.counts[a]);

}var u=[];for(t in n)n[t].exclusive>=c&&u.push(n[t]);return u.sort(function(e,t){
return t.exclusive-e.exclusive}),u}function a(e,t){for(var n,r={},o=0;o<e.length;o++){
var i,a=e[o],l=s({},a.exclusive,a.inclusive);t&&(i=u(a));for(var p in l)if(!t||i[p]){
var f=a.displayNames[p];n=f.owner+" > "+f.current,r[n]=r[n]||{componentName:n,time:0,
count:0},a.inclusive[p]&&(r[n].time+=a.inclusive[p]),a.counts[p]&&(r[n].count+=a.counts[p]);

}}var d=[];for(n in r)r[n].time>=c&&d.push(r[n]);return d.sort(function(e,t){return t.time-e.time;

}),d}function u(e){var t={},n=Object.keys(e.writes),r=s({},e.exclusive,e.inclusive);

for(var o in r){for(var i=!1,a=0;a<n.length;a++)if(0===n[a].indexOf(o)){i=!0;break;

}!i&&e.counts[o]>0&&(t[o]=!0)}return t}var s=e("./Object.assign"),c=1.2,l={_mountImageIntoNode:"set innerHTML",
INSERT_MARKUP:"set innerHTML",MOVE_EXISTING:"move",REMOVE_NODE:"remove",TEXT_CONTENT:"set textContent",
updatePropertyByID:"update attribute",deletePropertyByID:"delete attribute",updateStylesByID:"update styles",
updateInnerHTMLByID:"set innerHTML",dangerouslyReplaceNodeWithMarkupByID:"replace"
},p={getExclusiveSummary:i,getInclusiveSummary:a,getDOMSummary:o,getTotalTime:r};
t.exports=p},{"./Object.assign":53}],84:[function(e,t,n){(function(n){"use strict";

function r(e,t){Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:function(){
return this._store?this._store[t]:null},set:function(e){"production"!==n.env.NODE_ENV?s(!1,"Don't set the %s property of the React element. Instead, specify the correct value when initially creating the element.",t):null,
this._store[t]=e}})}function o(e){try{var t={props:!0};for(var n in t)r(e,n);l=!0;

}catch(o){}}var i=e("./ReactContext"),a=e("./ReactCurrentOwner"),u=e("./Object.assign"),s=e("./warning"),c={
key:!0,ref:!0},l=!1,p=function(e,t,r,o,i,a){if(this.type=e,this.key=t,this.ref=r,
this._owner=o,this._context=i,"production"!==n.env.NODE_ENV){this._store={props:a,
originalProps:u({},a)};try{Object.defineProperty(this._store,"validated",{configurable:!1,
enumerable:!1,writable:!0})}catch(s){}if(this._store.validated=!1,l)return void Object.freeze(this);

}this.props=a};p.prototype={_isReactElement:!0},"production"!==n.env.NODE_ENV&&o(p.prototype),
p.createElement=function(e,t,n){var r,o={},u=null,s=null;if(null!=t){s=void 0===t.ref?null:t.ref,
u=void 0===t.key?null:""+t.key;for(r in t)t.hasOwnProperty(r)&&!c.hasOwnProperty(r)&&(o[r]=t[r]);

}var l=arguments.length-2;if(1===l)o.children=n;else if(l>1){for(var f=Array(l),d=0;l>d;d++)f[d]=arguments[d+2];

o.children=f}if(e&&e.defaultProps){var h=e.defaultProps;for(r in h)"undefined"==typeof o[r]&&(o[r]=h[r]);

}return new p(e,u,s,a.current,i.current,o)},p.createFactory=function(e){var t=p.createElement.bind(null,e);

return t.type=e,t},p.cloneAndReplaceProps=function(e,t){var r=new p(e.type,e.key,e.ref,e._owner,e._context,t);

return"production"!==n.env.NODE_ENV&&(r._store.validated=e._store.validated),r},p.cloneElement=function(e,t,n){
var r,o=u({},e.props),i=e.key,s=e.ref,l=e._owner;if(null!=t){void 0!==t.ref&&(s=t.ref,
l=a.current),void 0!==t.key&&(i=""+t.key);for(r in t)t.hasOwnProperty(r)&&!c.hasOwnProperty(r)&&(o[r]=t[r]);

}var f=arguments.length-2;if(1===f)o.children=n;else if(f>1){for(var d=Array(f),h=0;f>h;h++)d[h]=arguments[h+2];

o.children=d}return new p(e.type,i,s,l,e._context,o)},p.isValidElement=function(e){
var t=!(!e||!e._isReactElement);return t},t.exports=p}).call(this,e("_process"))},{
"./Object.assign":53,"./ReactContext":65,"./ReactCurrentOwner":66,"./warning":181,
_process:14}],85:[function(e,t,n){(function(n){"use strict";function r(){if(E.current){
var e=E.current.getName();if(e)return" Check the render method of `"+e+"`."}return"";

}function o(e){var t=e&&e.getPublicInstance();if(!t)return void 0;var n=t.constructor;

return n?n.displayName||n.name||void 0:void 0}function i(){var e=E.current;return e&&o(e)||void 0;

}function a(e,t){e._store.validated||null!=e.key||(e._store.validated=!0,s('Each child in an array or iterator should have a unique "key" prop.',e,t));

}function u(e,t,n){M.test(e)&&s("Child objects should have non-numeric keys so ordering is preserved.",t,n);

}function s(e,t,r){var a=i(),u="string"==typeof r?r:r.displayName||r.name,s=a||u,c=_[e]||(_[e]={});

if(!c.hasOwnProperty(s)){c[s]=!0;var l=a?" Check the render method of "+a+".":u?" Check the React.render call using <"+u+">.":"",p="";

if(t&&t._owner&&t._owner!==E.current){var f=o(t._owner);p=" It was passed a child from "+f+".";

}"production"!==n.env.NODE_ENV?C(!1,e+"%s%s See https://fb.me/react-warning-keys for more information.",l,p):null;

}}function c(e,t){if(Array.isArray(e))for(var n=0;n<e.length;n++){var r=e[n];g.isValidElement(r)&&a(r,t);

}else if(g.isValidElement(e))e._store.validated=!0;else if(e){var o=x(e);if(o){if(o!==e.entries)for(var i,s=o.call(e);!(i=s.next()).done;)g.isValidElement(i.value)&&a(i.value,t);

}else if("object"==typeof e){var c=m.extractIfFragment(e);for(var l in c)c.hasOwnProperty(l)&&u(l,c[l],t);

}}}function l(e,t,o,i){for(var a in t)if(t.hasOwnProperty(a)){var u;try{"production"!==n.env.NODE_ENV?w("function"==typeof t[a],"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",e||"React class",y[i],a):w("function"==typeof t[a]),
u=t[a](o,a,e,i)}catch(s){u=s}if(u instanceof Error&&!(u.message in N)){N[u.message]=!0;

var c=r(this);"production"!==n.env.NODE_ENV?C(!1,"Failed propType: %s%s",u.message,c):null;

}}}function p(e,t){var r=t.type,o="string"==typeof r?r:r.displayName,i=t._owner?t._owner.getPublicInstance().constructor.displayName:null,a=e+"|"+o+"|"+i;

if(!D.hasOwnProperty(a)){D[a]=!0;var u="";o&&(u=" <"+o+" />");var s="";i&&(s=" The element was created by "+i+"."),
"production"!==n.env.NODE_ENV?C(!1,"Don't set .props.%s of the React component%s. Instead, specify the correct value when initially creating the element or use React.cloneElement to make a new element with updated props.%s",e,u,s):null;

}}function f(e,t){return e!==e?t!==t:0===e&&0===t?1/e===1/t:e===t}function d(e){if(e._store){
var t=e._store.originalProps,n=e.props;for(var r in n)n.hasOwnProperty(r)&&(t.hasOwnProperty(r)&&f(t[r],n[r])||(p(r,e),
t[r]=n[r]))}}function h(e){if(null!=e.type){var t=b.getComponentClassForElement(e),r=t.displayName||t.name;

t.propTypes&&l(r,t.propTypes,e.props,v.prop),"function"==typeof t.getDefaultProps&&("production"!==n.env.NODE_ENV?C(t.getDefaultProps.isReactClassApproved,"getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead."):null);

}}var g=e("./ReactElement"),m=e("./ReactFragment"),v=e("./ReactPropTypeLocations"),y=e("./ReactPropTypeLocationNames"),E=e("./ReactCurrentOwner"),b=e("./ReactNativeComponent"),x=e("./getIteratorFn"),w=e("./invariant"),C=e("./warning"),_={},N={},M=/^\d+$/,D={},R={
checkAndWarnForMutatedProps:d,createElement:function(e,t,r){"production"!==n.env.NODE_ENV?C(null!=e,"React.createElement: type should not be null or undefined. It should be a string (for DOM elements) or a ReactClass (for composite components)."):null;

var o=g.createElement.apply(this,arguments);if(null==o)return o;for(var i=2;i<arguments.length;i++)c(arguments[i],e);

return h(o),o},createFactory:function(e){var t=R.createElement.bind(null,e);if(t.type=e,
"production"!==n.env.NODE_ENV)try{Object.defineProperty(t,"type",{enumerable:!1,get:function(){
return"production"!==n.env.NODE_ENV?C(!1,"Factory.type is deprecated. Access the class directly before passing it to createFactory."):null,
Object.defineProperty(this,"type",{value:e}),e}})}catch(r){}return t},cloneElement:function(e,t,n){
for(var r=g.cloneElement.apply(this,arguments),o=2;o<arguments.length;o++)c(arguments[o],r.type);

return h(r),r}};t.exports=R}).call(this,e("_process"))},{"./ReactCurrentOwner":66,
"./ReactElement":84,"./ReactFragment":90,"./ReactNativeComponent":100,"./ReactPropTypeLocationNames":103,
"./ReactPropTypeLocations":104,"./getIteratorFn":153,"./invariant":162,"./warning":181,
_process:14}],86:[function(e,t,n){(function(n){"use strict";function r(e){l[e]=!0;

}function o(e){delete l[e]}function i(e){return!!l[e]}var a,u=e("./ReactElement"),s=e("./ReactInstanceMap"),c=e("./invariant"),l={},p={
injectEmptyComponent:function(e){a=u.createFactory(e)}},f=function(){};f.prototype.componentDidMount=function(){
var e=s.get(this);e&&r(e._rootNodeID)},f.prototype.componentWillUnmount=function(){
var e=s.get(this);e&&o(e._rootNodeID)},f.prototype.render=function(){return"production"!==n.env.NODE_ENV?c(a,"Trying to return null from a render, but no null placeholder component was injected."):c(a),
a()};var d=u.createElement(f),h={emptyElement:d,injection:p,isNullComponentID:i};
t.exports=h}).call(this,e("_process"))},{"./ReactElement":84,"./ReactInstanceMap":94,
"./invariant":162,_process:14}],87:[function(e,t,n){"use strict";var r={guard:function(e,t){
return e}};t.exports=r},{}],88:[function(e,t,n){"use strict";function r(e){o.enqueueEvents(e),
o.processEventQueue()}var o=e("./EventPluginHub"),i={handleTopLevel:function(e,t,n,i){
var a=o.extractEvents(e,t,n,i);r(a)}};t.exports=i},{"./EventPluginHub":43}],89:[function(e,t,n){
"use strict";function r(e){var t=p.getID(e),n=l.getReactRootIDFromNodeID(t),r=p.findReactContainerForID(n),o=p.getFirstReactDOM(r);

return o}function o(e,t){this.topLevelType=e,this.nativeEvent=t,this.ancestors=[];

}function i(e){for(var t=p.getFirstReactDOM(h(e.nativeEvent))||window,n=t;n;)e.ancestors.push(n),
n=r(n);for(var o=0,i=e.ancestors.length;i>o;o++){t=e.ancestors[o];var a=p.getID(t)||"";

m._handleTopLevel(e.topLevelType,t,a,e.nativeEvent)}}function a(e){var t=g(window);

e(t)}var u=e("./EventListener"),s=e("./ExecutionEnvironment"),c=e("./PooledClass"),l=e("./ReactInstanceHandles"),p=e("./ReactMount"),f=e("./ReactUpdates"),d=e("./Object.assign"),h=e("./getEventTarget"),g=e("./getUnboundedScrollPosition");

d(o.prototype,{destructor:function(){this.topLevelType=null,this.nativeEvent=null,
this.ancestors.length=0}}),c.addPoolingTo(o,c.twoArgumentPooler);var m={_enabled:!0,
_handleTopLevel:null,WINDOW_HANDLE:s.canUseDOM?window:null,setHandleTopLevel:function(e){
m._handleTopLevel=e},setEnabled:function(e){m._enabled=!!e},isEnabled:function(){
return m._enabled},trapBubbledEvent:function(e,t,n){var r=n;return r?u.listen(r,t,m.dispatchEvent.bind(null,e)):null;

},trapCapturedEvent:function(e,t,n){var r=n;return r?u.capture(r,t,m.dispatchEvent.bind(null,e)):null;

},monitorScrollValue:function(e){var t=a.bind(null,e);u.listen(window,"scroll",t);

},dispatchEvent:function(e,t){if(m._enabled){var n=o.getPooled(e,t);try{f.batchedUpdates(i,n);

}finally{o.release(n)}}}};t.exports=m},{"./EventListener":42,"./ExecutionEnvironment":47,
"./Object.assign":53,"./PooledClass":54,"./ReactInstanceHandles":93,"./ReactMount":97,
"./ReactUpdates":114,"./getEventTarget":152,"./getUnboundedScrollPosition":158}],
90:[function(e,t,n){(function(n){"use strict";var r=e("./ReactElement"),o=e("./warning");

if("production"!==n.env.NODE_ENV){var i="_reactFragment",a="_reactDidWarn",u=!1;try{
var s=function(){return 1};Object.defineProperty({},i,{enumerable:!1,value:!0}),Object.defineProperty({},"key",{
enumerable:!0,get:s}),u=!0}catch(c){}var l=function(e,t){Object.defineProperty(e,t,{
enumerable:!0,get:function(){return"production"!==n.env.NODE_ENV?o(this[a],"A ReactFragment is an opaque type. Accessing any of its properties is deprecated. Pass it to one of the React.Children helpers."):null,
this[a]=!0,this[i][t]},set:function(e){"production"!==n.env.NODE_ENV?o(this[a],"A ReactFragment is an immutable opaque type. Mutating its properties is deprecated."):null,
this[a]=!0,this[i][t]=e}})},p={},f=function(e){var t="";for(var n in e)t+=n+":"+typeof e[n]+",";

var r=!!p[t];return p[t]=!0,r}}var d={create:function(e){if("production"!==n.env.NODE_ENV){
if("object"!=typeof e||!e||Array.isArray(e))return"production"!==n.env.NODE_ENV?o(!1,"React.addons.createFragment only accepts a single object.",e):null,
e;if(r.isValidElement(e))return"production"!==n.env.NODE_ENV?o(!1,"React.addons.createFragment does not accept a ReactElement without a wrapper object."):null,
e;if(u){var t={};Object.defineProperty(t,i,{enumerable:!1,value:e}),Object.defineProperty(t,a,{
writable:!0,enumerable:!1,value:!1});for(var s in e)l(t,s);return Object.preventExtensions(t),
t}}return e},extract:function(e){return"production"!==n.env.NODE_ENV&&u?e[i]?e[i]:("production"!==n.env.NODE_ENV?o(f(e),"Any use of a keyed object should be wrapped in React.addons.createFragment(object) before being passed as a child."):null,
e):e},extractIfFragment:function(e){if("production"!==n.env.NODE_ENV&&u){if(e[i])return e[i];

for(var t in e)if(e.hasOwnProperty(t)&&r.isValidElement(e[t]))return d.extract(e);

}return e}};t.exports=d}).call(this,e("_process"))},{"./ReactElement":84,"./warning":181,
_process:14}],91:[function(e,t,n){"use strict";var r=e("./DOMProperty"),o=e("./EventPluginHub"),i=e("./ReactComponentEnvironment"),a=e("./ReactClass"),u=e("./ReactEmptyComponent"),s=e("./ReactBrowserEventEmitter"),c=e("./ReactNativeComponent"),l=e("./ReactDOMComponent"),p=e("./ReactPerf"),f=e("./ReactRootIndex"),d=e("./ReactUpdates"),h={
Component:i.injection,Class:a.injection,DOMComponent:l.injection,DOMProperty:r.injection,
EmptyComponent:u.injection,EventPluginHub:o.injection,EventEmitter:s.injection,NativeComponent:c.injection,
Perf:p.injection,RootIndex:f.injection,Updates:d.injection};t.exports=h},{"./DOMProperty":36,
"./EventPluginHub":43,"./ReactBrowserEventEmitter":57,"./ReactClass":60,"./ReactComponentEnvironment":63,
"./ReactDOMComponent":69,"./ReactEmptyComponent":86,"./ReactNativeComponent":100,
"./ReactPerf":102,"./ReactRootIndex":110,"./ReactUpdates":114}],92:[function(e,t,n){
"use strict";function r(e){return i(document.documentElement,e)}var o=e("./ReactDOMSelection"),i=e("./containsNode"),a=e("./focusNode"),u=e("./getActiveElement"),s={
hasSelectionCapabilities:function(e){return e&&("INPUT"===e.nodeName&&"text"===e.type||"TEXTAREA"===e.nodeName||"true"===e.contentEditable);

},getSelectionInformation:function(){var e=u();return{focusedElem:e,selectionRange:s.hasSelectionCapabilities(e)?s.getSelection(e):null
}},restoreSelection:function(e){var t=u(),n=e.focusedElem,o=e.selectionRange;t!==n&&r(n)&&(s.hasSelectionCapabilities(n)&&s.setSelection(n,o),
a(n))},getSelection:function(e){var t;if("selectionStart"in e)t={start:e.selectionStart,
end:e.selectionEnd};else if(document.selection&&"INPUT"===e.nodeName){var n=document.selection.createRange();

n.parentElement()===e&&(t={start:-n.moveStart("character",-e.value.length),end:-n.moveEnd("character",-e.value.length)
})}else t=o.getOffsets(e);return t||{start:0,end:0}},setSelection:function(e,t){var n=t.start,r=t.end;

if("undefined"==typeof r&&(r=n),"selectionStart"in e)e.selectionStart=n,e.selectionEnd=Math.min(r,e.value.length);
else if(document.selection&&"INPUT"===e.nodeName){var i=e.createTextRange();i.collapse(!0),
i.moveStart("character",n),i.moveEnd("character",r-n),i.select()}else o.setOffsets(e,t);

}};t.exports=s},{"./ReactDOMSelection":77,"./containsNode":136,"./focusNode":146,
"./getActiveElement":148}],93:[function(e,t,n){(function(n){"use strict";function r(e){
return d+e.toString(36)}function o(e,t){return e.charAt(t)===d||t===e.length}function i(e){
return""===e||e.charAt(0)===d&&e.charAt(e.length-1)!==d}function a(e,t){return 0===t.indexOf(e)&&o(t,e.length);

}function u(e){return e?e.substr(0,e.lastIndexOf(d)):""}function s(e,t){if("production"!==n.env.NODE_ENV?f(i(e)&&i(t),"getNextDescendantID(%s, %s): Received an invalid React DOM ID.",e,t):f(i(e)&&i(t)),
"production"!==n.env.NODE_ENV?f(a(e,t),"getNextDescendantID(...): React has made an invalid assumption about the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.",e,t):f(a(e,t)),
e===t)return e;var r,u=e.length+h;for(r=u;r<t.length&&!o(t,r);r++);return t.substr(0,r);

}function c(e,t){var r=Math.min(e.length,t.length);if(0===r)return"";for(var a=0,u=0;r>=u;u++)if(o(e,u)&&o(t,u))a=u;
else if(e.charAt(u)!==t.charAt(u))break;var s=e.substr(0,a);return"production"!==n.env.NODE_ENV?f(i(s),"getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s",e,t,s):f(i(s)),
s}function l(e,t,r,o,i,c){e=e||"",t=t||"","production"!==n.env.NODE_ENV?f(e!==t,"traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.",e):f(e!==t);

var l=a(t,e);"production"!==n.env.NODE_ENV?f(l||a(e,t),"traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do not have a parent path.",e,t):f(l||a(e,t));

for(var p=0,d=l?u:s,h=e;;h=d(h,t)){var m;if(i&&h===e||c&&h===t||(m=r(h,l,o)),m===!1||h===t)break;

"production"!==n.env.NODE_ENV?f(p++<g,"traverseParentPath(%s, %s, ...): Detected an infinite loop while traversing the React DOM ID tree. This may be due to malformed IDs: %s",e,t):f(p++<g);

}}var p=e("./ReactRootIndex"),f=e("./invariant"),d=".",h=d.length,g=100,m={createReactRootID:function(){
return r(p.createReactRootIndex())},createReactID:function(e,t){return e+t},getReactRootIDFromNodeID:function(e){
if(e&&e.charAt(0)===d&&e.length>1){var t=e.indexOf(d,1);return t>-1?e.substr(0,t):e;

}return null},traverseEnterLeave:function(e,t,n,r,o){var i=c(e,t);i!==e&&l(e,i,n,r,!1,!0),
i!==t&&l(i,t,n,o,!0,!1)},traverseTwoPhase:function(e,t,n){e&&(l("",e,t,n,!0,!1),l(e,"",t,n,!1,!0));

},traverseAncestors:function(e,t,n){l("",e,t,n,!0,!1)},_getFirstCommonAncestorID:c,
_getNextDescendantID:s,isAncestorIDOf:a,SEPARATOR:d};t.exports=m}).call(this,e("_process"));

},{"./ReactRootIndex":110,"./invariant":162,_process:14}],94:[function(e,t,n){"use strict";

var r={remove:function(e){e._reactInternalInstance=void 0},get:function(e){return e._reactInternalInstance;

},has:function(e){return void 0!==e._reactInternalInstance},set:function(e,t){e._reactInternalInstance=t;

}};t.exports=r},{}],95:[function(e,t,n){"use strict";var r={currentlyMountingInstance:null,
currentlyUnmountingInstance:null};t.exports=r},{}],96:[function(e,t,n){"use strict";

var r=e("./adler32"),o={CHECKSUM_ATTR_NAME:"data-react-checksum",addChecksumToMarkup:function(e){
var t=r(e);return e.replace(">"," "+o.CHECKSUM_ATTR_NAME+'="'+t+'">')},canReuseMarkup:function(e,t){
var n=t.getAttribute(o.CHECKSUM_ATTR_NAME);n=n&&parseInt(n,10);var i=r(e);return i===n;

}};t.exports=o},{"./adler32":133}],97:[function(e,t,n){(function(n){"use strict";
function r(e,t){for(var n=Math.min(e.length,t.length),r=0;n>r;r++)if(e.charAt(r)!==t.charAt(r))return r;

return e.length===t.length?-1:n}function o(e){var t=k(e);return t&&K.getID(t)}function i(e){
var t=a(e);if(t)if(U.hasOwnProperty(t)){var r=U[t];r!==e&&("production"!==n.env.NODE_ENV?P(!l(r,t),"ReactMount: Two valid but unequal nodes with the same `%s`: %s",V,t):P(!l(r,t)),
U[t]=e)}else U[t]=e;return t}function a(e){return e&&e.getAttribute&&e.getAttribute(V)||"";

}function u(e,t){var n=a(e);n!==t&&delete U[n],e.setAttribute(V,t),U[t]=e}function s(e){
return U.hasOwnProperty(e)&&l(U[e],e)||(U[e]=K.findReactNodeByID(e)),U[e]}function c(e){
var t=C.get(e)._rootNodeID;return x.isNullComponentID(t)?null:(U.hasOwnProperty(t)&&l(U[t],t)||(U[t]=K.findReactNodeByID(t)),
U[t])}function l(e,t){if(e){"production"!==n.env.NODE_ENV?P(a(e)===t,"ReactMount: Unexpected modification of `%s`",V):P(a(e)===t);

var r=K.findReactContainerForID(t);if(r&&T(r,e))return!0}return!1}function p(e){delete U[e];

}function f(e){var t=U[e];return t&&l(t,e)?void(Y=t):!1}function d(e){Y=null,w.traverseAncestors(e,f);

var t=Y;return Y=null,t}function h(e,t,n,r,o){var i=M.mountComponent(e,t,r,O);e._isTopLevel=!0,
K._mountImageIntoNode(i,n,o)}function g(e,t,n,r){var o=R.ReactReconcileTransaction.getPooled();

o.perform(h,null,e,t,n,o,r),R.ReactReconcileTransaction.release(o)}var m=e("./DOMProperty"),v=e("./ReactBrowserEventEmitter"),y=e("./ReactCurrentOwner"),E=e("./ReactElement"),b=e("./ReactElementValidator"),x=e("./ReactEmptyComponent"),w=e("./ReactInstanceHandles"),C=e("./ReactInstanceMap"),_=e("./ReactMarkupChecksum"),N=e("./ReactPerf"),M=e("./ReactReconciler"),D=e("./ReactUpdateQueue"),R=e("./ReactUpdates"),O=e("./emptyObject"),T=e("./containsNode"),k=e("./getReactRootElementInContainer"),S=e("./instantiateReactComponent"),P=e("./invariant"),I=e("./setInnerHTML"),A=e("./shouldUpdateReactComponent"),j=e("./warning"),L=w.SEPARATOR,V=m.ID_ATTRIBUTE_NAME,U={},F=1,q=9,B={},H={};

if("production"!==n.env.NODE_ENV)var z={};var W=[],Y=null,K={_instancesByReactRootID:B,
scrollMonitor:function(e,t){t()},_updateRootComponent:function(e,t,r,i){return"production"!==n.env.NODE_ENV&&b.checkAndWarnForMutatedProps(t),
K.scrollMonitor(r,function(){D.enqueueElementInternal(e,t),i&&D.enqueueCallbackInternal(e,i);

}),"production"!==n.env.NODE_ENV&&(z[o(r)]=k(r)),e},_registerComponent:function(e,t){
"production"!==n.env.NODE_ENV?P(t&&(t.nodeType===F||t.nodeType===q),"_registerComponent(...): Target container is not a DOM element."):P(t&&(t.nodeType===F||t.nodeType===q)),
v.ensureScrollValueMonitoring();var r=K.registerContainer(t);return B[r]=e,r},_renderNewRootComponent:function(e,t,r){
"production"!==n.env.NODE_ENV?j(null==y.current,"_renderNewRootComponent(): Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate."):null;

var o=S(e,null),i=K._registerComponent(o,t);return R.batchedUpdates(g,o,i,t,r),"production"!==n.env.NODE_ENV&&(z[i]=k(t)),
o},render:function(e,t,r){"production"!==n.env.NODE_ENV?P(E.isValidElement(e),"React.render(): Invalid component element.%s","string"==typeof e?" Instead of passing an element string, make sure to instantiate it by passing it to React.createElement.":"function"==typeof e?" Instead of passing a component class, make sure to instantiate it by passing it to React.createElement.":null!=e&&void 0!==e.props?" This may be caused by unintentionally loading two independent copies of React.":""):P(E.isValidElement(e));

var i=B[o(t)];if(i){var a=i._currentElement;if(A(a,e))return K._updateRootComponent(i,e,t,r).getPublicInstance();

K.unmountComponentAtNode(t)}var u=k(t),s=u&&K.isRenderedByReact(u);if("production"!==n.env.NODE_ENV&&(!s||u.nextSibling))for(var c=u;c;){
if(K.isRenderedByReact(c)){"production"!==n.env.NODE_ENV?j(!1,"render(): Target node has markup rendered by React, but there are unrelated nodes as well. This is most commonly caused by white-space inserted around server-rendered markup."):null;

break}c=c.nextSibling}var l=s&&!i,p=K._renderNewRootComponent(e,t,l).getPublicInstance();

return r&&r.call(p),p},constructAndRenderComponent:function(e,t,n){var r=E.createElement(e,t);

return K.render(r,n)},constructAndRenderComponentByID:function(e,t,r){var o=document.getElementById(r);

return"production"!==n.env.NODE_ENV?P(o,'Tried to get element with id of "%s" but it is not present on the page.',r):P(o),
K.constructAndRenderComponent(e,t,o)},registerContainer:function(e){var t=o(e);return t&&(t=w.getReactRootIDFromNodeID(t)),
t||(t=w.createReactRootID()),H[t]=e,t},unmountComponentAtNode:function(e){"production"!==n.env.NODE_ENV?j(null==y.current,"unmountComponentAtNode(): Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate."):null,
"production"!==n.env.NODE_ENV?P(e&&(e.nodeType===F||e.nodeType===q),"unmountComponentAtNode(...): Target container is not a DOM element."):P(e&&(e.nodeType===F||e.nodeType===q));

var t=o(e),r=B[t];return r?(K.unmountComponentFromNode(r,e),delete B[t],delete H[t],
"production"!==n.env.NODE_ENV&&delete z[t],!0):!1},unmountComponentFromNode:function(e,t){
for(M.unmountComponent(e),t.nodeType===q&&(t=t.documentElement);t.lastChild;)t.removeChild(t.lastChild);

},findReactContainerForID:function(e){var t=w.getReactRootIDFromNodeID(e),r=H[t];
if("production"!==n.env.NODE_ENV){var o=z[t];if(o&&o.parentNode!==r){"production"!==n.env.NODE_ENV?P(a(o)===t,"ReactMount: Root element ID differed from reactRootID."):P(a(o)===t);

var i=r.firstChild;i&&t===a(i)?z[t]=i:"production"!==n.env.NODE_ENV?j(!1,"ReactMount: Root element has been removed from its original container. New container:",o.parentNode):null;

}}return r},findReactNodeByID:function(e){var t=K.findReactContainerForID(e);return K.findComponentRoot(t,e);

},isRenderedByReact:function(e){if(1!==e.nodeType)return!1;var t=K.getID(e);return t?t.charAt(0)===L:!1;

},getFirstReactDOM:function(e){for(var t=e;t&&t.parentNode!==t;){if(K.isRenderedByReact(t))return t;

t=t.parentNode}return null},findComponentRoot:function(e,t){var r=W,o=0,i=d(t)||e;

for(r[0]=i.firstChild,r.length=1;o<r.length;){for(var a,u=r[o++];u;){var s=K.getID(u);

s?t===s?a=u:w.isAncestorIDOf(s,t)&&(r.length=o=0,r.push(u.firstChild)):r.push(u.firstChild),
u=u.nextSibling}if(a)return r.length=0,a}r.length=0,"production"!==n.env.NODE_ENV?P(!1,"findComponentRoot(..., %s): Unable to find element. This probably means the DOM was unexpectedly mutated (e.g., by the browser), usually due to forgetting a <tbody> when using tables, nesting tags like <form>, <p>, or <a>, or using non-SVG elements in an <svg> parent. Try inspecting the child nodes of the element with React ID `%s`.",t,K.getID(e)):P(!1);

},_mountImageIntoNode:function(e,t,o){if("production"!==n.env.NODE_ENV?P(t&&(t.nodeType===F||t.nodeType===q),"mountComponentIntoNode(...): Target container is not valid."):P(t&&(t.nodeType===F||t.nodeType===q)),
o){var i=k(t);if(_.canReuseMarkup(e,i))return;var a=i.getAttribute(_.CHECKSUM_ATTR_NAME);

i.removeAttribute(_.CHECKSUM_ATTR_NAME);var u=i.outerHTML;i.setAttribute(_.CHECKSUM_ATTR_NAME,a);

var s=r(e,u),c=" (client) "+e.substring(s-20,s+20)+"\n (server) "+u.substring(s-20,s+20);

"production"!==n.env.NODE_ENV?P(t.nodeType!==q,"You're trying to render a component to the document using server rendering but the checksum was invalid. This usually means you rendered a different component type or props on the client from the one on the server, or your render() methods are impure. React cannot handle this case due to cross-browser quirks by rendering at the document root. You should look for environment dependent code in your components and ensure the props are the same client and server side:\n%s",c):P(t.nodeType!==q),
"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?j(!1,"React attempted to reuse markup in a container but the checksum was invalid. This generally means that you are using server rendering and the markup generated on the server was not what the client was expecting. React injected new markup to compensate which works but you have lost many of the benefits of server rendering. Instead, figure out why the markup being generated is different on the client or server:\n%s",c):null);

}"production"!==n.env.NODE_ENV?P(t.nodeType!==q,"You're trying to render a component to the document but you didn't use server rendering. We can't do this without using server rendering due to cross-browser quirks. See React.renderToString() for server rendering."):P(t.nodeType!==q),
I(t,e)},getReactRootID:o,getID:i,setID:u,getNode:s,getNodeFromInstance:c,purgeID:p
};N.measureMethods(K,"ReactMount",{_renderNewRootComponent:"_renderNewRootComponent",
_mountImageIntoNode:"_mountImageIntoNode"}),t.exports=K}).call(this,e("_process"));

},{"./DOMProperty":36,"./ReactBrowserEventEmitter":57,"./ReactCurrentOwner":66,"./ReactElement":84,
"./ReactElementValidator":85,"./ReactEmptyComponent":86,"./ReactInstanceHandles":93,
"./ReactInstanceMap":94,"./ReactMarkupChecksum":96,"./ReactPerf":102,"./ReactReconciler":108,
"./ReactUpdateQueue":113,"./ReactUpdates":114,"./containsNode":136,"./emptyObject":142,
"./getReactRootElementInContainer":156,"./instantiateReactComponent":161,"./invariant":162,
"./setInnerHTML":175,"./shouldUpdateReactComponent":178,"./warning":181,_process:14
}],98:[function(e,t,n){"use strict";function r(e,t,n){h.push({parentID:e,parentNode:null,
type:l.INSERT_MARKUP,markupIndex:g.push(t)-1,textContent:null,fromIndex:null,toIndex:n
})}function o(e,t,n){h.push({parentID:e,parentNode:null,type:l.MOVE_EXISTING,markupIndex:null,
textContent:null,fromIndex:t,toIndex:n})}function i(e,t){h.push({parentID:e,parentNode:null,
type:l.REMOVE_NODE,markupIndex:null,textContent:null,fromIndex:t,toIndex:null})}function a(e,t){
h.push({parentID:e,parentNode:null,type:l.TEXT_CONTENT,markupIndex:null,textContent:t,
fromIndex:null,toIndex:null})}function u(){h.length&&(c.processChildrenUpdates(h,g),
s())}function s(){h.length=0,g.length=0}var c=e("./ReactComponentEnvironment"),l=e("./ReactMultiChildUpdateTypes"),p=e("./ReactReconciler"),f=e("./ReactChildReconciler"),d=0,h=[],g=[],m={
Mixin:{mountChildren:function(e,t,n){var r=f.instantiateChildren(e,t,n);this._renderedChildren=r;

var o=[],i=0;for(var a in r)if(r.hasOwnProperty(a)){var u=r[a],s=this._rootNodeID+a,c=p.mountComponent(u,s,t,n);

u._mountIndex=i,o.push(c),i++}return o},updateTextContent:function(e){d++;var t=!0;

try{var n=this._renderedChildren;f.unmountChildren(n);for(var r in n)n.hasOwnProperty(r)&&this._unmountChildByName(n[r],r);

this.setTextContent(e),t=!1}finally{d--,d||(t?s():u())}},updateChildren:function(e,t,n){
d++;var r=!0;try{this._updateChildren(e,t,n),r=!1}finally{d--,d||(r?s():u())}},_updateChildren:function(e,t,n){
var r=this._renderedChildren,o=f.updateChildren(r,e,t,n);if(this._renderedChildren=o,
o||r){var i,a=0,u=0;for(i in o)if(o.hasOwnProperty(i)){var s=r&&r[i],c=o[i];s===c?(this.moveChild(s,u,a),
a=Math.max(s._mountIndex,a),s._mountIndex=u):(s&&(a=Math.max(s._mountIndex,a),this._unmountChildByName(s,i)),
this._mountChildByNameAtIndex(c,i,u,t,n)),u++}for(i in r)!r.hasOwnProperty(i)||o&&o.hasOwnProperty(i)||this._unmountChildByName(r[i],i);

}},unmountChildren:function(){var e=this._renderedChildren;f.unmountChildren(e),this._renderedChildren=null;

},moveChild:function(e,t,n){e._mountIndex<n&&o(this._rootNodeID,e._mountIndex,t)},
createChild:function(e,t){r(this._rootNodeID,t,e._mountIndex)},removeChild:function(e){
i(this._rootNodeID,e._mountIndex)},setTextContent:function(e){a(this._rootNodeID,e);

},_mountChildByNameAtIndex:function(e,t,n,r,o){var i=this._rootNodeID+t,a=p.mountComponent(e,i,r,o);

e._mountIndex=n,this.createChild(e,a)},_unmountChildByName:function(e,t){this.removeChild(e),
e._mountIndex=null}}};t.exports=m},{"./ReactChildReconciler":58,"./ReactComponentEnvironment":63,
"./ReactMultiChildUpdateTypes":99,"./ReactReconciler":108}],99:[function(e,t,n){"use strict";

var r=e("./keyMirror"),o=r({INSERT_MARKUP:null,MOVE_EXISTING:null,REMOVE_NODE:null,
TEXT_CONTENT:null});t.exports=o},{"./keyMirror":167}],100:[function(e,t,n){(function(n){
"use strict";function r(e){if("function"==typeof e.type)return e.type;var t=e.type,n=p[t];

return null==n&&(p[t]=n=c(t)),n}function o(e){return"production"!==n.env.NODE_ENV?s(l,"There is no registered component for the tag %s",e.type):s(l),
new l(e.type,e.props)}function i(e){return new f(e)}function a(e){return e instanceof f;

}var u=e("./Object.assign"),s=e("./invariant"),c=null,l=null,p={},f=null,d={injectGenericComponentClass:function(e){
l=e},injectTextComponentClass:function(e){f=e},injectComponentClasses:function(e){
u(p,e)},injectAutoWrapper:function(e){c=e}},h={getComponentClassForElement:r,createInternalComponent:o,
createInstanceForText:i,isTextComponent:a,injection:d};t.exports=h}).call(this,e("_process"));

},{"./Object.assign":53,"./invariant":162,_process:14}],101:[function(e,t,n){(function(n){
"use strict";var r=e("./invariant"),o={isValidOwner:function(e){return!(!e||"function"!=typeof e.attachRef||"function"!=typeof e.detachRef);

},addComponentAsRefTo:function(e,t,i){"production"!==n.env.NODE_ENV?r(o.isValidOwner(i),"addComponentAsRefTo(...): Only a ReactOwner can have refs. This usually means that you're trying to add a ref to a component that doesn't have an owner (that is, was not created inside of another component's `render` method). Try rendering this component inside of a new top-level component which will hold the ref."):r(o.isValidOwner(i)),
i.attachRef(t,e)},removeComponentAsRefFrom:function(e,t,i){"production"!==n.env.NODE_ENV?r(o.isValidOwner(i),"removeComponentAsRefFrom(...): Only a ReactOwner can have refs. This usually means that you're trying to remove a ref to a component that doesn't have an owner (that is, was not created inside of another component's `render` method). Try rendering this component inside of a new top-level component which will hold the ref."):r(o.isValidOwner(i)),
i.getPublicInstance().refs[t]===e.getPublicInstance()&&i.detachRef(t)}};t.exports=o;

}).call(this,e("_process"))},{"./invariant":162,_process:14}],102:[function(e,t,n){
(function(e){"use strict";function n(e,t,n){return n}var r={enableMeasure:!1,storedMeasure:n,
measureMethods:function(t,n,o){if("production"!==e.env.NODE_ENV)for(var i in o)o.hasOwnProperty(i)&&(t[i]=r.measure(n,o[i],t[i]));

},measure:function(t,n,o){if("production"!==e.env.NODE_ENV){var i=null,a=function(){
return r.enableMeasure?(i||(i=r.storedMeasure(t,n,o)),i.apply(this,arguments)):o.apply(this,arguments);

};return a.displayName=t+"_"+n,a}return o},injection:{injectMeasure:function(e){r.storedMeasure=e;

}}};t.exports=r}).call(this,e("_process"))},{_process:14}],103:[function(e,t,n){(function(e){
"use strict";var n={};"production"!==e.env.NODE_ENV&&(n={prop:"prop",context:"context",
childContext:"child context"}),t.exports=n}).call(this,e("_process"))},{_process:14
}],104:[function(e,t,n){"use strict";var r=e("./keyMirror"),o=r({prop:null,context:null,
childContext:null});t.exports=o},{"./keyMirror":167}],105:[function(e,t,n){"use strict";

function r(e){function t(t,n,r,o,i){if(o=o||x,null==n[r]){var a=E[i];return t?new Error("Required "+a+" `"+r+"` was not specified in "+("`"+o+"`.")):null;

}return e(n,r,o,i)}var n=t.bind(null,!1);return n.isRequired=t.bind(null,!0),n}function o(e){
function t(t,n,r,o){var i=t[n],a=g(i);if(a!==e){var u=E[o],s=m(i);return new Error("Invalid "+u+" `"+n+"` of type `"+s+"` "+("supplied to `"+r+"`, expected `"+e+"`."));

}return null}return r(t)}function i(){return r(b.thatReturns(null))}function a(e){
function t(t,n,r,o){var i=t[n];if(!Array.isArray(i)){var a=E[o],u=g(i);return new Error("Invalid "+a+" `"+n+"` of type "+("`"+u+"` supplied to `"+r+"`, expected an array."));

}for(var s=0;s<i.length;s++){var c=e(i,s,r,o);if(c instanceof Error)return c}return null;

}return r(t)}function u(){function e(e,t,n,r){if(!v.isValidElement(e[t])){var o=E[r];

return new Error("Invalid "+o+" `"+t+"` supplied to "+("`"+n+"`, expected a ReactElement."));

}return null}return r(e)}function s(e){function t(t,n,r,o){if(!(t[n]instanceof e)){
var i=E[o],a=e.name||x;return new Error("Invalid "+i+" `"+n+"` supplied to "+("`"+r+"`, expected instance of `"+a+"`."));

}return null}return r(t)}function c(e){function t(t,n,r,o){for(var i=t[n],a=0;a<e.length;a++)if(i===e[a])return null;

var u=E[o],s=JSON.stringify(e);return new Error("Invalid "+u+" `"+n+"` of value `"+i+"` "+("supplied to `"+r+"`, expected one of "+s+"."));

}return r(t)}function l(e){function t(t,n,r,o){var i=t[n],a=g(i);if("object"!==a){
var u=E[o];return new Error("Invalid "+u+" `"+n+"` of type "+("`"+a+"` supplied to `"+r+"`, expected an object."));

}for(var s in i)if(i.hasOwnProperty(s)){var c=e(i,s,r,o);if(c instanceof Error)return c;

}return null}return r(t)}function p(e){function t(t,n,r,o){for(var i=0;i<e.length;i++){
var a=e[i];if(null==a(t,n,r,o))return null}var u=E[o];return new Error("Invalid "+u+" `"+n+"` supplied to "+("`"+r+"`."));

}return r(t)}function f(){function e(e,t,n,r){if(!h(e[t])){var o=E[r];return new Error("Invalid "+o+" `"+t+"` supplied to "+("`"+n+"`, expected a ReactNode."));

}return null}return r(e)}function d(e){function t(t,n,r,o){var i=t[n],a=g(i);if("object"!==a){
var u=E[o];return new Error("Invalid "+u+" `"+n+"` of type `"+a+"` "+("supplied to `"+r+"`, expected `object`."));

}for(var s in e){var c=e[s];if(c){var l=c(i,s,r,o);if(l)return l}}return null}return r(t);

}function h(e){switch(typeof e){case"number":case"string":case"undefined":return!0;

case"boolean":return!e;case"object":if(Array.isArray(e))return e.every(h);if(null===e||v.isValidElement(e))return!0;

e=y.extractIfFragment(e);for(var t in e)if(!h(e[t]))return!1;return!0;default:return!1;

}}function g(e){var t=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":t;

}function m(e){var t=g(e);if("object"===t){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp";

}return t}var v=e("./ReactElement"),y=e("./ReactFragment"),E=e("./ReactPropTypeLocationNames"),b=e("./emptyFunction"),x="<<anonymous>>",w=u(),C=f(),_={
array:o("array"),bool:o("boolean"),func:o("function"),number:o("number"),object:o("object"),
string:o("string"),any:i(),arrayOf:a,element:w,instanceOf:s,node:C,objectOf:l,oneOf:c,
oneOfType:p,shape:d};t.exports=_},{"./ReactElement":84,"./ReactFragment":90,"./ReactPropTypeLocationNames":103,
"./emptyFunction":141}],106:[function(e,t,n){"use strict";function r(){this.listenersToPut=[];

}var o=e("./PooledClass"),i=e("./ReactBrowserEventEmitter"),a=e("./Object.assign");

a(r.prototype,{enqueuePutListener:function(e,t,n){this.listenersToPut.push({rootNodeID:e,
propKey:t,propValue:n})},putListeners:function(){for(var e=0;e<this.listenersToPut.length;e++){
var t=this.listenersToPut[e];i.putListener(t.rootNodeID,t.propKey,t.propValue)}},
reset:function(){this.listenersToPut.length=0},destructor:function(){this.reset();

}}),o.addPoolingTo(r),t.exports=r},{"./Object.assign":53,"./PooledClass":54,"./ReactBrowserEventEmitter":57
}],107:[function(e,t,n){"use strict";function r(){this.reinitializeTransaction(),
this.renderToStaticMarkup=!1,this.reactMountReady=o.getPooled(null),this.putListenerQueue=s.getPooled();

}var o=e("./CallbackQueue"),i=e("./PooledClass"),a=e("./ReactBrowserEventEmitter"),u=e("./ReactInputSelection"),s=e("./ReactPutListenerQueue"),c=e("./Transaction"),l=e("./Object.assign"),p={
initialize:u.getSelectionInformation,close:u.restoreSelection},f={initialize:function(){
var e=a.isEnabled();return a.setEnabled(!1),e},close:function(e){a.setEnabled(e)}
},d={initialize:function(){this.reactMountReady.reset()},close:function(){this.reactMountReady.notifyAll();

}},h={initialize:function(){this.putListenerQueue.reset()},close:function(){this.putListenerQueue.putListeners();

}},g=[h,p,f,d],m={getTransactionWrappers:function(){return g},getReactMountReady:function(){
return this.reactMountReady},getPutListenerQueue:function(){return this.putListenerQueue;

},destructor:function(){o.release(this.reactMountReady),this.reactMountReady=null,
s.release(this.putListenerQueue),this.putListenerQueue=null}};l(r.prototype,c.Mixin,m),
i.addPoolingTo(r),t.exports=r},{"./CallbackQueue":32,"./Object.assign":53,"./PooledClass":54,
"./ReactBrowserEventEmitter":57,"./ReactInputSelection":92,"./ReactPutListenerQueue":106,
"./Transaction":130}],108:[function(e,t,n){(function(n){"use strict";function r(){
o.attachRefs(this,this._currentElement)}var o=e("./ReactRef"),i=e("./ReactElementValidator"),a={
mountComponent:function(e,t,o,a){var u=e.mountComponent(t,o,a);return"production"!==n.env.NODE_ENV&&i.checkAndWarnForMutatedProps(e._currentElement),
o.getReactMountReady().enqueue(r,e),u},unmountComponent:function(e){o.detachRefs(e,e._currentElement),
e.unmountComponent()},receiveComponent:function(e,t,a,u){var s=e._currentElement;
if(t!==s||null==t._owner){"production"!==n.env.NODE_ENV&&i.checkAndWarnForMutatedProps(t);

var c=o.shouldUpdateRefs(s,t);c&&o.detachRefs(e,s),e.receiveComponent(t,a,u),c&&a.getReactMountReady().enqueue(r,e);

}},performUpdateIfNecessary:function(e,t){e.performUpdateIfNecessary(t)}};t.exports=a;

}).call(this,e("_process"))},{"./ReactElementValidator":85,"./ReactRef":109,_process:14
}],109:[function(e,t,n){"use strict";function r(e,t,n){"function"==typeof e?e(t.getPublicInstance()):i.addComponentAsRefTo(t,e,n);

}function o(e,t,n){"function"==typeof e?e(null):i.removeComponentAsRefFrom(t,e,n);

}var i=e("./ReactOwner"),a={};a.attachRefs=function(e,t){var n=t.ref;null!=n&&r(n,e,t._owner);

},a.shouldUpdateRefs=function(e,t){return t._owner!==e._owner||t.ref!==e.ref},a.detachRefs=function(e,t){
var n=t.ref;null!=n&&o(n,e,t._owner)},t.exports=a},{"./ReactOwner":101}],110:[function(e,t,n){
"use strict";var r={injectCreateReactRootIndex:function(e){o.createReactRootIndex=e;

}},o={createReactRootIndex:null,injection:r};t.exports=o},{}],111:[function(e,t,n){
(function(n){"use strict";function r(e){"production"!==n.env.NODE_ENV?p(i.isValidElement(e),"renderToString(): You must pass a valid ReactElement."):p(i.isValidElement(e));

var t;try{var r=a.createReactRootID();return t=s.getPooled(!1),t.perform(function(){
var n=l(e,null),o=n.mountComponent(r,t,c);return u.addChecksumToMarkup(o)},null)}finally{
s.release(t)}}function o(e){"production"!==n.env.NODE_ENV?p(i.isValidElement(e),"renderToStaticMarkup(): You must pass a valid ReactElement."):p(i.isValidElement(e));

var t;try{var r=a.createReactRootID();return t=s.getPooled(!0),t.perform(function(){
var n=l(e,null);return n.mountComponent(r,t,c)},null)}finally{s.release(t)}}var i=e("./ReactElement"),a=e("./ReactInstanceHandles"),u=e("./ReactMarkupChecksum"),s=e("./ReactServerRenderingTransaction"),c=e("./emptyObject"),l=e("./instantiateReactComponent"),p=e("./invariant");

t.exports={renderToString:r,renderToStaticMarkup:o}}).call(this,e("_process"))},{
"./ReactElement":84,"./ReactInstanceHandles":93,"./ReactMarkupChecksum":96,"./ReactServerRenderingTransaction":112,
"./emptyObject":142,"./instantiateReactComponent":161,"./invariant":162,_process:14
}],112:[function(e,t,n){"use strict";function r(e){this.reinitializeTransaction(),
this.renderToStaticMarkup=e,this.reactMountReady=i.getPooled(null),this.putListenerQueue=a.getPooled();

}var o=e("./PooledClass"),i=e("./CallbackQueue"),a=e("./ReactPutListenerQueue"),u=e("./Transaction"),s=e("./Object.assign"),c=e("./emptyFunction"),l={
initialize:function(){this.reactMountReady.reset()},close:c},p={initialize:function(){
this.putListenerQueue.reset()},close:c},f=[p,l],d={getTransactionWrappers:function(){
return f},getReactMountReady:function(){return this.reactMountReady},getPutListenerQueue:function(){
return this.putListenerQueue},destructor:function(){i.release(this.reactMountReady),
this.reactMountReady=null,a.release(this.putListenerQueue),this.putListenerQueue=null;

}};s(r.prototype,u.Mixin,d),o.addPoolingTo(r),t.exports=r},{"./CallbackQueue":32,
"./Object.assign":53,"./PooledClass":54,"./ReactPutListenerQueue":106,"./Transaction":130,
"./emptyFunction":141}],113:[function(e,t,n){(function(n){"use strict";function r(e){
e!==i.currentlyMountingInstance&&c.enqueueUpdate(e)}function o(e,t){"production"!==n.env.NODE_ENV?p(null==a.current,"%s(...): Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.",t):p(null==a.current);

var r=s.get(e);return r?r===i.currentlyUnmountingInstance?null:r:("production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?f(!t,"%s(...): Can only update a mounted or mounting component. This usually means you called %s() on an unmounted component. This is a no-op.",t,t):null),
null)}var i=e("./ReactLifeCycle"),a=e("./ReactCurrentOwner"),u=e("./ReactElement"),s=e("./ReactInstanceMap"),c=e("./ReactUpdates"),l=e("./Object.assign"),p=e("./invariant"),f=e("./warning"),d={
enqueueCallback:function(e,t){"production"!==n.env.NODE_ENV?p("function"==typeof t,"enqueueCallback(...): You called `setProps`, `replaceProps`, `setState`, `replaceState`, or `forceUpdate` with a callback that isn't callable."):p("function"==typeof t);

var a=o(e);return a&&a!==i.currentlyMountingInstance?(a._pendingCallbacks?a._pendingCallbacks.push(t):a._pendingCallbacks=[t],
void r(a)):null},enqueueCallbackInternal:function(e,t){"production"!==n.env.NODE_ENV?p("function"==typeof t,"enqueueCallback(...): You called `setProps`, `replaceProps`, `setState`, `replaceState`, or `forceUpdate` with a callback that isn't callable."):p("function"==typeof t),
e._pendingCallbacks?e._pendingCallbacks.push(t):e._pendingCallbacks=[t],r(e)},enqueueForceUpdate:function(e){
var t=o(e,"forceUpdate");t&&(t._pendingForceUpdate=!0,r(t))},enqueueReplaceState:function(e,t){
var n=o(e,"replaceState");n&&(n._pendingStateQueue=[t],n._pendingReplaceState=!0,
r(n))},enqueueSetState:function(e,t){var n=o(e,"setState");if(n){var i=n._pendingStateQueue||(n._pendingStateQueue=[]);

i.push(t),r(n)}},enqueueSetProps:function(e,t){var i=o(e,"setProps");if(i){"production"!==n.env.NODE_ENV?p(i._isTopLevel,"setProps(...): You called `setProps` on a component with a parent. This is an anti-pattern since props will get reactively updated when rendered. Instead, change the owner's `render` method to pass the correct value as props to the component where it is created."):p(i._isTopLevel);

var a=i._pendingElement||i._currentElement,s=l({},a.props,t);i._pendingElement=u.cloneAndReplaceProps(a,s),
r(i)}},enqueueReplaceProps:function(e,t){var i=o(e,"replaceProps");if(i){"production"!==n.env.NODE_ENV?p(i._isTopLevel,"replaceProps(...): You called `replaceProps` on a component with a parent. This is an anti-pattern since props will get reactively updated when rendered. Instead, change the owner's `render` method to pass the correct value as props to the component where it is created."):p(i._isTopLevel);

var a=i._pendingElement||i._currentElement;i._pendingElement=u.cloneAndReplaceProps(a,t),
r(i)}},enqueueElementInternal:function(e,t){e._pendingElement=t,r(e)}};t.exports=d;

}).call(this,e("_process"))},{"./Object.assign":53,"./ReactCurrentOwner":66,"./ReactElement":84,
"./ReactInstanceMap":94,"./ReactLifeCycle":95,"./ReactUpdates":114,"./invariant":162,
"./warning":181,_process:14}],114:[function(e,t,n){(function(n){"use strict";function r(){
"production"!==n.env.NODE_ENV?v(R.ReactReconcileTransaction&&w,"ReactUpdates: must inject a reconcile transaction class and batching strategy"):v(R.ReactReconcileTransaction&&w);

}function o(){this.reinitializeTransaction(),this.dirtyComponentsLength=null,this.callbackQueue=l.getPooled(),
this.reconcileTransaction=R.ReactReconcileTransaction.getPooled()}function i(e,t,n,o,i){
r(),w.batchedUpdates(e,t,n,o,i)}function a(e,t){return e._mountOrder-t._mountOrder;

}function u(e){var t=e.dirtyComponentsLength;"production"!==n.env.NODE_ENV?v(t===E.length,"Expected flush transaction's stored dirty-components length (%s) to match dirty-components array length (%s).",t,E.length):v(t===E.length),
E.sort(a);for(var r=0;t>r;r++){var o=E[r],i=o._pendingCallbacks;if(o._pendingCallbacks=null,
h.performUpdateIfNecessary(o,e.reconcileTransaction),i)for(var u=0;u<i.length;u++)e.callbackQueue.enqueue(i[u],o.getPublicInstance());

}}function s(e){return r(),"production"!==n.env.NODE_ENV?y(null==f.current,"enqueueUpdate(): Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate."):null,
w.isBatchingUpdates?void E.push(e):void w.batchedUpdates(s,e)}function c(e,t){"production"!==n.env.NODE_ENV?v(w.isBatchingUpdates,"ReactUpdates.asap: Can't enqueue an asap callback in a context whereupdates are not being batched."):v(w.isBatchingUpdates),
b.enqueue(e,t),x=!0}var l=e("./CallbackQueue"),p=e("./PooledClass"),f=e("./ReactCurrentOwner"),d=e("./ReactPerf"),h=e("./ReactReconciler"),g=e("./Transaction"),m=e("./Object.assign"),v=e("./invariant"),y=e("./warning"),E=[],b=l.getPooled(),x=!1,w=null,C={
initialize:function(){this.dirtyComponentsLength=E.length},close:function(){this.dirtyComponentsLength!==E.length?(E.splice(0,this.dirtyComponentsLength),
M()):E.length=0}},_={initialize:function(){this.callbackQueue.reset()},close:function(){
this.callbackQueue.notifyAll()}},N=[C,_];m(o.prototype,g.Mixin,{getTransactionWrappers:function(){
return N},destructor:function(){this.dirtyComponentsLength=null,l.release(this.callbackQueue),
this.callbackQueue=null,R.ReactReconcileTransaction.release(this.reconcileTransaction),
this.reconcileTransaction=null},perform:function(e,t,n){return g.Mixin.perform.call(this,this.reconcileTransaction.perform,this.reconcileTransaction,e,t,n);

}}),p.addPoolingTo(o);var M=function(){for(;E.length||x;){if(E.length){var e=o.getPooled();

e.perform(u,null,e),o.release(e)}if(x){x=!1;var t=b;b=l.getPooled(),t.notifyAll(),
l.release(t)}}};M=d.measure("ReactUpdates","flushBatchedUpdates",M);var D={injectReconcileTransaction:function(e){
"production"!==n.env.NODE_ENV?v(e,"ReactUpdates: must provide a reconcile transaction class"):v(e),
R.ReactReconcileTransaction=e},injectBatchingStrategy:function(e){"production"!==n.env.NODE_ENV?v(e,"ReactUpdates: must provide a batching strategy"):v(e),
"production"!==n.env.NODE_ENV?v("function"==typeof e.batchedUpdates,"ReactUpdates: must provide a batchedUpdates() function"):v("function"==typeof e.batchedUpdates),
"production"!==n.env.NODE_ENV?v("boolean"==typeof e.isBatchingUpdates,"ReactUpdates: must provide an isBatchingUpdates boolean attribute"):v("boolean"==typeof e.isBatchingUpdates),
w=e}},R={ReactReconcileTransaction:null,batchedUpdates:i,enqueueUpdate:s,flushBatchedUpdates:M,
injection:D,asap:c};t.exports=R}).call(this,e("_process"))},{"./CallbackQueue":32,
"./Object.assign":53,"./PooledClass":54,"./ReactCurrentOwner":66,"./ReactPerf":102,
"./ReactReconciler":108,"./Transaction":130,"./invariant":162,"./warning":181,_process:14
}],115:[function(e,t,n){"use strict";var r=e("./DOMProperty"),o=r.injection.MUST_USE_ATTRIBUTE,i={
Properties:{clipPath:o,cx:o,cy:o,d:o,dx:o,dy:o,fill:o,fillOpacity:o,fontFamily:o,
fontSize:o,fx:o,fy:o,gradientTransform:o,gradientUnits:o,markerEnd:o,markerMid:o,
markerStart:o,offset:o,opacity:o,patternContentUnits:o,patternUnits:o,points:o,preserveAspectRatio:o,
r:o,rx:o,ry:o,spreadMethod:o,stopColor:o,stopOpacity:o,stroke:o,strokeDasharray:o,
strokeLinecap:o,strokeOpacity:o,strokeWidth:o,textAnchor:o,transform:o,version:o,
viewBox:o,x1:o,x2:o,x:o,y1:o,y2:o,y:o},DOMAttributeNames:{clipPath:"clip-path",fillOpacity:"fill-opacity",
fontFamily:"font-family",fontSize:"font-size",gradientTransform:"gradientTransform",
gradientUnits:"gradientUnits",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",
patternContentUnits:"patternContentUnits",patternUnits:"patternUnits",preserveAspectRatio:"preserveAspectRatio",
spreadMethod:"spreadMethod",stopColor:"stop-color",stopOpacity:"stop-opacity",strokeDasharray:"stroke-dasharray",
strokeLinecap:"stroke-linecap",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",
textAnchor:"text-anchor",viewBox:"viewBox"}};t.exports=i},{"./DOMProperty":36}],116:[function(e,t,n){
"use strict";function r(e){if("selectionStart"in e&&u.hasSelectionCapabilities(e))return{
start:e.selectionStart,end:e.selectionEnd};if(window.getSelection){var t=window.getSelection();

return{anchorNode:t.anchorNode,anchorOffset:t.anchorOffset,focusNode:t.focusNode,
focusOffset:t.focusOffset}}if(document.selection){var n=document.selection.createRange();

return{parentElement:n.parentElement(),text:n.text,top:n.boundingTop,left:n.boundingLeft
}}}function o(e){if(y||null==g||g!==c())return null;var t=r(g);if(!v||!f(v,t)){v=t;

var n=s.getPooled(h.select,m,e);return n.type="select",n.target=g,a.accumulateTwoPhaseDispatches(n),
n}}var i=e("./EventConstants"),a=e("./EventPropagators"),u=e("./ReactInputSelection"),s=e("./SyntheticEvent"),c=e("./getActiveElement"),l=e("./isTextInputElement"),p=e("./keyOf"),f=e("./shallowEqual"),d=i.topLevelTypes,h={
select:{phasedRegistrationNames:{bubbled:p({onSelect:null}),captured:p({onSelectCapture:null
})},dependencies:[d.topBlur,d.topContextMenu,d.topFocus,d.topKeyDown,d.topMouseDown,d.topMouseUp,d.topSelectionChange]
}},g=null,m=null,v=null,y=!1,E={eventTypes:h,extractEvents:function(e,t,n,r){switch(e){
case d.topFocus:(l(t)||"true"===t.contentEditable)&&(g=t,m=n,v=null);break;case d.topBlur:
g=null,m=null,v=null;break;case d.topMouseDown:y=!0;break;case d.topContextMenu:case d.topMouseUp:
return y=!1,o(r);case d.topSelectionChange:case d.topKeyDown:case d.topKeyUp:return o(r);

}}};t.exports=E},{"./EventConstants":41,"./EventPropagators":46,"./ReactInputSelection":92,
"./SyntheticEvent":122,"./getActiveElement":148,"./isTextInputElement":165,"./keyOf":168,
"./shallowEqual":177}],117:[function(e,t,n){"use strict";var r=Math.pow(2,53),o={
createReactRootIndex:function(){return Math.ceil(Math.random()*r)}};t.exports=o},{}],
118:[function(e,t,n){(function(n){"use strict";var r=e("./EventConstants"),o=e("./EventPluginUtils"),i=e("./EventPropagators"),a=e("./SyntheticClipboardEvent"),u=e("./SyntheticEvent"),s=e("./SyntheticFocusEvent"),c=e("./SyntheticKeyboardEvent"),l=e("./SyntheticMouseEvent"),p=e("./SyntheticDragEvent"),f=e("./SyntheticTouchEvent"),d=e("./SyntheticUIEvent"),h=e("./SyntheticWheelEvent"),g=e("./getEventCharCode"),m=e("./invariant"),v=e("./keyOf"),y=e("./warning"),E=r.topLevelTypes,b={
blur:{phasedRegistrationNames:{bubbled:v({onBlur:!0}),captured:v({onBlurCapture:!0
})}},click:{phasedRegistrationNames:{bubbled:v({onClick:!0}),captured:v({onClickCapture:!0
})}},contextMenu:{phasedRegistrationNames:{bubbled:v({onContextMenu:!0}),captured:v({
onContextMenuCapture:!0})}},copy:{phasedRegistrationNames:{bubbled:v({onCopy:!0}),
captured:v({onCopyCapture:!0})}},cut:{phasedRegistrationNames:{bubbled:v({onCut:!0
}),captured:v({onCutCapture:!0})}},doubleClick:{phasedRegistrationNames:{bubbled:v({
onDoubleClick:!0}),captured:v({onDoubleClickCapture:!0})}},drag:{phasedRegistrationNames:{
bubbled:v({onDrag:!0}),captured:v({onDragCapture:!0})}},dragEnd:{phasedRegistrationNames:{
bubbled:v({onDragEnd:!0}),captured:v({onDragEndCapture:!0})}},dragEnter:{phasedRegistrationNames:{
bubbled:v({onDragEnter:!0}),captured:v({onDragEnterCapture:!0})}},dragExit:{phasedRegistrationNames:{
bubbled:v({onDragExit:!0}),captured:v({onDragExitCapture:!0})}},dragLeave:{phasedRegistrationNames:{
bubbled:v({onDragLeave:!0}),captured:v({onDragLeaveCapture:!0})}},dragOver:{phasedRegistrationNames:{
bubbled:v({onDragOver:!0}),captured:v({onDragOverCapture:!0})}},dragStart:{phasedRegistrationNames:{
bubbled:v({onDragStart:!0}),captured:v({onDragStartCapture:!0})}},drop:{phasedRegistrationNames:{
bubbled:v({onDrop:!0}),captured:v({onDropCapture:!0})}},focus:{phasedRegistrationNames:{
bubbled:v({onFocus:!0}),captured:v({onFocusCapture:!0})}},input:{phasedRegistrationNames:{
bubbled:v({onInput:!0}),captured:v({onInputCapture:!0})}},keyDown:{phasedRegistrationNames:{
bubbled:v({onKeyDown:!0}),captured:v({onKeyDownCapture:!0})}},keyPress:{phasedRegistrationNames:{
bubbled:v({onKeyPress:!0}),captured:v({onKeyPressCapture:!0})}},keyUp:{phasedRegistrationNames:{
bubbled:v({onKeyUp:!0}),captured:v({onKeyUpCapture:!0})}},load:{phasedRegistrationNames:{
bubbled:v({onLoad:!0}),captured:v({onLoadCapture:!0})}},error:{phasedRegistrationNames:{
bubbled:v({onError:!0}),captured:v({onErrorCapture:!0})}},mouseDown:{phasedRegistrationNames:{
bubbled:v({onMouseDown:!0}),captured:v({onMouseDownCapture:!0})}},mouseMove:{phasedRegistrationNames:{
bubbled:v({onMouseMove:!0}),captured:v({onMouseMoveCapture:!0})}},mouseOut:{phasedRegistrationNames:{
bubbled:v({onMouseOut:!0}),captured:v({onMouseOutCapture:!0})}},mouseOver:{phasedRegistrationNames:{
bubbled:v({onMouseOver:!0}),captured:v({onMouseOverCapture:!0})}},mouseUp:{phasedRegistrationNames:{
bubbled:v({onMouseUp:!0}),captured:v({onMouseUpCapture:!0})}},paste:{phasedRegistrationNames:{
bubbled:v({onPaste:!0}),captured:v({onPasteCapture:!0})}},reset:{phasedRegistrationNames:{
bubbled:v({onReset:!0}),captured:v({onResetCapture:!0})}},scroll:{phasedRegistrationNames:{
bubbled:v({onScroll:!0}),captured:v({onScrollCapture:!0})}},submit:{phasedRegistrationNames:{
bubbled:v({onSubmit:!0}),captured:v({onSubmitCapture:!0})}},touchCancel:{phasedRegistrationNames:{
bubbled:v({onTouchCancel:!0}),captured:v({onTouchCancelCapture:!0})}},touchEnd:{phasedRegistrationNames:{
bubbled:v({onTouchEnd:!0}),captured:v({onTouchEndCapture:!0})}},touchMove:{phasedRegistrationNames:{
bubbled:v({onTouchMove:!0}),captured:v({onTouchMoveCapture:!0})}},touchStart:{phasedRegistrationNames:{
bubbled:v({onTouchStart:!0}),captured:v({onTouchStartCapture:!0})}},wheel:{phasedRegistrationNames:{
bubbled:v({onWheel:!0}),captured:v({onWheelCapture:!0})}}},x={topBlur:b.blur,topClick:b.click,
topContextMenu:b.contextMenu,topCopy:b.copy,topCut:b.cut,topDoubleClick:b.doubleClick,
topDrag:b.drag,topDragEnd:b.dragEnd,topDragEnter:b.dragEnter,topDragExit:b.dragExit,
topDragLeave:b.dragLeave,topDragOver:b.dragOver,topDragStart:b.dragStart,topDrop:b.drop,
topError:b.error,topFocus:b.focus,topInput:b.input,topKeyDown:b.keyDown,topKeyPress:b.keyPress,
topKeyUp:b.keyUp,topLoad:b.load,topMouseDown:b.mouseDown,topMouseMove:b.mouseMove,
topMouseOut:b.mouseOut,topMouseOver:b.mouseOver,topMouseUp:b.mouseUp,topPaste:b.paste,
topReset:b.reset,topScroll:b.scroll,topSubmit:b.submit,topTouchCancel:b.touchCancel,
topTouchEnd:b.touchEnd,topTouchMove:b.touchMove,topTouchStart:b.touchStart,topWheel:b.wheel
};for(var w in x)x[w].dependencies=[w];var C={eventTypes:b,executeDispatch:function(e,t,r){
var i=o.executeDispatch(e,t,r);"production"!==n.env.NODE_ENV?y("boolean"!=typeof i,"Returning `false` from an event handler is deprecated and will be ignored in a future release. Instead, manually call e.stopPropagation() or e.preventDefault(), as appropriate."):null,
i===!1&&(e.stopPropagation(),e.preventDefault())},extractEvents:function(e,t,r,o){
var v=x[e];if(!v)return null;var y;switch(e){case E.topInput:case E.topLoad:case E.topError:
case E.topReset:case E.topSubmit:y=u;break;case E.topKeyPress:if(0===g(o))return null;

case E.topKeyDown:case E.topKeyUp:y=c;break;case E.topBlur:case E.topFocus:y=s;break;

case E.topClick:if(2===o.button)return null;case E.topContextMenu:case E.topDoubleClick:
case E.topMouseDown:case E.topMouseMove:case E.topMouseOut:case E.topMouseOver:case E.topMouseUp:
y=l;break;case E.topDrag:case E.topDragEnd:case E.topDragEnter:case E.topDragExit:
case E.topDragLeave:case E.topDragOver:case E.topDragStart:case E.topDrop:y=p;break;

case E.topTouchCancel:case E.topTouchEnd:case E.topTouchMove:case E.topTouchStart:
y=f;break;case E.topScroll:y=d;break;case E.topWheel:y=h;break;case E.topCopy:case E.topCut:
case E.topPaste:y=a}"production"!==n.env.NODE_ENV?m(y,"SimpleEventPlugin: Unhandled event type, `%s`.",e):m(y);

var b=y.getPooled(v,r,o);return i.accumulateTwoPhaseDispatches(b),b}};t.exports=C;

}).call(this,e("_process"))},{"./EventConstants":41,"./EventPluginUtils":45,"./EventPropagators":46,
"./SyntheticClipboardEvent":119,"./SyntheticDragEvent":121,"./SyntheticEvent":122,
"./SyntheticFocusEvent":123,"./SyntheticKeyboardEvent":125,"./SyntheticMouseEvent":126,
"./SyntheticTouchEvent":127,"./SyntheticUIEvent":128,"./SyntheticWheelEvent":129,
"./getEventCharCode":149,"./invariant":162,"./keyOf":168,"./warning":181,_process:14
}],119:[function(e,t,n){"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e("./SyntheticEvent"),i={
clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData;

}};o.augmentClass(r,i),t.exports=r},{"./SyntheticEvent":122}],120:[function(e,t,n){
"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e("./SyntheticEvent"),i={
data:null};o.augmentClass(r,i),t.exports=r},{"./SyntheticEvent":122}],121:[function(e,t,n){
"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e("./SyntheticMouseEvent"),i={
dataTransfer:null};o.augmentClass(r,i),t.exports=r},{"./SyntheticMouseEvent":126}],
122:[function(e,t,n){"use strict";function r(e,t,n){this.dispatchConfig=e,this.dispatchMarker=t,
this.nativeEvent=n;var r=this.constructor.Interface;for(var o in r)if(r.hasOwnProperty(o)){
var i=r[o];this[o]=i?i(n):n[o]}var u=null!=n.defaultPrevented?n.defaultPrevented:n.returnValue===!1;

this.isDefaultPrevented=u?a.thatReturnsTrue:a.thatReturnsFalse,this.isPropagationStopped=a.thatReturnsFalse;

}var o=e("./PooledClass"),i=e("./Object.assign"),a=e("./emptyFunction"),u=e("./getEventTarget"),s={
type:null,target:u,currentTarget:a.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,
timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null
};i(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;

e.preventDefault?e.preventDefault():e.returnValue=!1,this.isDefaultPrevented=a.thatReturnsTrue;

},stopPropagation:function(){var e=this.nativeEvent;e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,
this.isPropagationStopped=a.thatReturnsTrue},persist:function(){this.isPersistent=a.thatReturnsTrue;

},isPersistent:a.thatReturnsFalse,destructor:function(){var e=this.constructor.Interface;

for(var t in e)this[t]=null;this.dispatchConfig=null,this.dispatchMarker=null,this.nativeEvent=null;

}}),r.Interface=s,r.augmentClass=function(e,t){var n=this,r=Object.create(n.prototype);

i(r,e.prototype),e.prototype=r,e.prototype.constructor=e,e.Interface=i({},n.Interface,t),
e.augmentClass=n.augmentClass,o.addPoolingTo(e,o.threeArgumentPooler)},o.addPoolingTo(r,o.threeArgumentPooler),
t.exports=r},{"./Object.assign":53,"./PooledClass":54,"./emptyFunction":141,"./getEventTarget":152
}],123:[function(e,t,n){"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e("./SyntheticUIEvent"),i={
relatedTarget:null};o.augmentClass(r,i),t.exports=r},{"./SyntheticUIEvent":128}],
124:[function(e,t,n){"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e("./SyntheticEvent"),i={
data:null};o.augmentClass(r,i),t.exports=r},{"./SyntheticEvent":122}],125:[function(e,t,n){
"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e("./SyntheticUIEvent"),i=e("./getEventCharCode"),a=e("./getEventKey"),u=e("./getEventModifierState"),s={
key:a,location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,
locale:null,getModifierState:u,charCode:function(e){return"keypress"===e.type?i(e):0;

},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){
return"keypress"===e.type?i(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}};

o.augmentClass(r,s),t.exports=r},{"./SyntheticUIEvent":128,"./getEventCharCode":149,
"./getEventKey":150,"./getEventModifierState":151}],126:[function(e,t,n){"use strict";

function r(e,t,n){o.call(this,e,t,n)}var o=e("./SyntheticUIEvent"),i=e("./ViewportMetrics"),a=e("./getEventModifierState"),u={
screenX:null,screenY:null,clientX:null,clientY:null,ctrlKey:null,shiftKey:null,altKey:null,
metaKey:null,getModifierState:a,button:function(e){var t=e.button;return"which"in e?t:2===t?2:4===t?1:0;

},buttons:null,relatedTarget:function(e){return e.relatedTarget||(e.fromElement===e.srcElement?e.toElement:e.fromElement);

},pageX:function(e){return"pageX"in e?e.pageX:e.clientX+i.currentScrollLeft},pageY:function(e){
return"pageY"in e?e.pageY:e.clientY+i.currentScrollTop}};o.augmentClass(r,u),t.exports=r;

},{"./SyntheticUIEvent":128,"./ViewportMetrics":131,"./getEventModifierState":151
}],127:[function(e,t,n){"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e("./SyntheticUIEvent"),i=e("./getEventModifierState"),a={
touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,
shiftKey:null,getModifierState:i};o.augmentClass(r,a),t.exports=r},{"./SyntheticUIEvent":128,
"./getEventModifierState":151}],128:[function(e,t,n){"use strict";function r(e,t,n){
o.call(this,e,t,n)}var o=e("./SyntheticEvent"),i=e("./getEventTarget"),a={view:function(e){
if(e.view)return e.view;var t=i(e);if(null!=t&&t.window===t)return t;var n=t.ownerDocument;

return n?n.defaultView||n.parentWindow:window},detail:function(e){return e.detail||0;

}};o.augmentClass(r,a),t.exports=r},{"./SyntheticEvent":122,"./getEventTarget":152
}],129:[function(e,t,n){"use strict";function r(e,t,n){o.call(this,e,t,n)}var o=e("./SyntheticMouseEvent"),i={
deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0;

},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0;

},deltaZ:null,deltaMode:null};o.augmentClass(r,i),t.exports=r},{"./SyntheticMouseEvent":126
}],130:[function(e,t,n){(function(n){"use strict";var r=e("./invariant"),o={reinitializeTransaction:function(){
this.transactionWrappers=this.getTransactionWrappers(),this.wrapperInitData?this.wrapperInitData.length=0:this.wrapperInitData=[],
this._isInTransaction=!1},_isInTransaction:!1,getTransactionWrappers:null,isInTransaction:function(){
return!!this._isInTransaction},perform:function(e,t,o,i,a,u,s,c){"production"!==n.env.NODE_ENV?r(!this.isInTransaction(),"Transaction.perform(...): Cannot initialize a transaction when there is already an outstanding transaction."):r(!this.isInTransaction());

var l,p;try{this._isInTransaction=!0,l=!0,this.initializeAll(0),p=e.call(t,o,i,a,u,s,c),
l=!1}finally{try{if(l)try{this.closeAll(0)}catch(f){}else this.closeAll(0)}finally{
this._isInTransaction=!1}}return p},initializeAll:function(e){for(var t=this.transactionWrappers,n=e;n<t.length;n++){
var r=t[n];try{this.wrapperInitData[n]=i.OBSERVED_ERROR,this.wrapperInitData[n]=r.initialize?r.initialize.call(this):null;

}finally{if(this.wrapperInitData[n]===i.OBSERVED_ERROR)try{this.initializeAll(n+1);

}catch(o){}}}},closeAll:function(e){"production"!==n.env.NODE_ENV?r(this.isInTransaction(),"Transaction.closeAll(): Cannot close transaction when none are open."):r(this.isInTransaction());

for(var t=this.transactionWrappers,o=e;o<t.length;o++){var a,u=t[o],s=this.wrapperInitData[o];

try{a=!0,s!==i.OBSERVED_ERROR&&u.close&&u.close.call(this,s),a=!1}finally{if(a)try{
this.closeAll(o+1)}catch(c){}}}this.wrapperInitData.length=0}},i={Mixin:o,OBSERVED_ERROR:{}
};t.exports=i}).call(this,e("_process"))},{"./invariant":162,_process:14}],131:[function(e,t,n){
"use strict";var r={currentScrollLeft:0,currentScrollTop:0,refreshScrollValues:function(e){
r.currentScrollLeft=e.x,r.currentScrollTop=e.y}};t.exports=r},{}],132:[function(e,t,n){
(function(n){"use strict";function r(e,t){if("production"!==n.env.NODE_ENV?o(null!=t,"accumulateInto(...): Accumulated items must not be null or undefined."):o(null!=t),
null==e)return t;var r=Array.isArray(e),i=Array.isArray(t);return r&&i?(e.push.apply(e,t),
e):r?(e.push(t),e):i?[e].concat(t):[e,t]}var o=e("./invariant");t.exports=r}).call(this,e("_process"));

},{"./invariant":162,_process:14}],133:[function(e,t,n){"use strict";function r(e){
for(var t=1,n=0,r=0;r<e.length;r++)t=(t+e.charCodeAt(r))%o,n=(n+t)%o;return t|n<<16;

}var o=65521;t.exports=r},{}],134:[function(e,t,n){function r(e){return e.replace(o,function(e,t){
return t.toUpperCase()})}var o=/-(.)/g;t.exports=r},{}],135:[function(e,t,n){"use strict";

function r(e){return o(e.replace(i,"ms-"))}var o=e("./camelize"),i=/^-ms-/;t.exports=r;

},{"./camelize":134}],136:[function(e,t,n){function r(e,t){return e&&t?e===t?!0:o(e)?!1:o(t)?r(e,t.parentNode):e.contains?e.contains(t):e.compareDocumentPosition?!!(16&e.compareDocumentPosition(t)):!1:!1;

}var o=e("./isTextNode");t.exports=r},{"./isTextNode":166}],137:[function(e,t,n){
function r(e){return!!e&&("object"==typeof e||"function"==typeof e)&&"length"in e&&!("setInterval"in e)&&"number"!=typeof e.nodeType&&(Array.isArray(e)||"callee"in e||"item"in e);

}function o(e){return r(e)?Array.isArray(e)?e.slice():i(e):[e]}var i=e("./toArray");

t.exports=o},{"./toArray":179}],138:[function(e,t,n){(function(n){"use strict";function r(e){
var t=i.createFactory(e),r=o.createClass({tagName:e.toUpperCase(),displayName:"ReactFullPageComponent"+e,
componentWillUnmount:function(){"production"!==n.env.NODE_ENV?a(!1,"%s tried to unmount. Because of cross-browser quirks it is impossible to unmount some top-level components (eg <html>, <head>, and <body>) reliably and efficiently. To fix this, have a single top-level component that never unmounts render these elements.",this.constructor.displayName):a(!1);

},render:function(){return t(this.props)}});return r}var o=e("./ReactClass"),i=e("./ReactElement"),a=e("./invariant");

t.exports=r}).call(this,e("_process"))},{"./ReactClass":60,"./ReactElement":84,"./invariant":162,
_process:14}],139:[function(e,t,n){(function(n){function r(e){var t=e.match(l);return t&&t[1].toLowerCase();

}function o(e,t){var o=c;"production"!==n.env.NODE_ENV?s(!!c,"createNodesFromMarkup dummy not initialized"):s(!!c);

var i=r(e),l=i&&u(i);if(l){o.innerHTML=l[1]+e+l[2];for(var p=l[0];p--;)o=o.lastChild;

}else o.innerHTML=e;var f=o.getElementsByTagName("script");f.length&&("production"!==n.env.NODE_ENV?s(t,"createNodesFromMarkup(...): Unexpected <script> element rendered."):s(t),
a(f).forEach(t));for(var d=a(o.childNodes);o.lastChild;)o.removeChild(o.lastChild);

return d}var i=e("./ExecutionEnvironment"),a=e("./createArrayFromMixed"),u=e("./getMarkupWrap"),s=e("./invariant"),c=i.canUseDOM?document.createElement("div"):null,l=/^\s*<(\w+)/;

t.exports=o}).call(this,e("_process"))},{"./ExecutionEnvironment":47,"./createArrayFromMixed":137,
"./getMarkupWrap":154,"./invariant":162,_process:14}],140:[function(e,t,n){"use strict";

function r(e,t){var n=null==t||"boolean"==typeof t||""===t;if(n)return"";var r=isNaN(t);

return r||0===t||i.hasOwnProperty(e)&&i[e]?""+t:("string"==typeof t&&(t=t.trim()),
t+"px")}var o=e("./CSSProperty"),i=o.isUnitlessNumber;t.exports=r},{"./CSSProperty":30
}],141:[function(e,t,n){function r(e){return function(){return e}}function o(){}o.thatReturns=r,
o.thatReturnsFalse=r(!1),o.thatReturnsTrue=r(!0),o.thatReturnsNull=r(null),o.thatReturnsThis=function(){
return this},o.thatReturnsArgument=function(e){return e},t.exports=o},{}],142:[function(e,t,n){
(function(e){"use strict";var n={};"production"!==e.env.NODE_ENV&&Object.freeze(n),
t.exports=n}).call(this,e("_process"))},{_process:14}],143:[function(e,t,n){"use strict";

function r(e){return i[e]}function o(e){return(""+e).replace(a,r)}var i={"&":"&amp;",
">":"&gt;","<":"&lt;",'"':"&quot;","'":"&#x27;"},a=/[&><"']/g;t.exports=o},{}],144:[function(e,t,n){
(function(n){"use strict";function r(e){if("production"!==n.env.NODE_ENV){var t=o.current;

null!==t&&("production"!==n.env.NODE_ENV?c(t._warnedAboutRefsInRender,"%s is accessing getDOMNode or findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",t.getName()||"A component"):null,
t._warnedAboutRefsInRender=!0)}return null==e?null:s(e)?e:i.has(e)?a.getNodeFromInstance(e):("production"!==n.env.NODE_ENV?u(null==e.render||"function"!=typeof e.render,"Component (with keys: %s) contains `render` method but is not mounted in the DOM",Object.keys(e)):u(null==e.render||"function"!=typeof e.render),
void("production"!==n.env.NODE_ENV?u(!1,"Element appears to be neither ReactComponent nor DOMNode (keys: %s)",Object.keys(e)):u(!1)));

}var o=e("./ReactCurrentOwner"),i=e("./ReactInstanceMap"),a=e("./ReactMount"),u=e("./invariant"),s=e("./isNode"),c=e("./warning");

t.exports=r}).call(this,e("_process"))},{"./ReactCurrentOwner":66,"./ReactInstanceMap":94,
"./ReactMount":97,"./invariant":162,"./isNode":164,"./warning":181,_process:14}],
145:[function(e,t,n){(function(n){"use strict";function r(e,t,r){var o=e,i=!o.hasOwnProperty(r);

"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?a(i,"flattenChildren(...): Encountered two children with the same key, `%s`. Child keys must be unique; when two children share a key, only the first child will be used.",r):null),
i&&null!=t&&(o[r]=t)}function o(e){if(null==e)return e;var t={};return i(e,r,t),t;

}var i=e("./traverseAllChildren"),a=e("./warning");t.exports=o}).call(this,e("_process"));

},{"./traverseAllChildren":180,"./warning":181,_process:14}],146:[function(e,t,n){
"use strict";function r(e){try{e.focus()}catch(t){}}t.exports=r},{}],147:[function(e,t,n){
"use strict";var r=function(e,t,n){Array.isArray(e)?e.forEach(t,n):e&&t.call(n,e);

};t.exports=r},{}],148:[function(e,t,n){function r(){try{return document.activeElement||document.body;

}catch(e){return document.body}}t.exports=r},{}],149:[function(e,t,n){"use strict";

function r(e){var t,n=e.keyCode;return"charCode"in e?(t=e.charCode,0===t&&13===n&&(t=13)):t=n,
t>=32||13===t?t:0}t.exports=r},{}],150:[function(e,t,n){"use strict";function r(e){
if(e.key){var t=i[e.key]||e.key;if("Unidentified"!==t)return t}if("keypress"===e.type){
var n=o(e);return 13===n?"Enter":String.fromCharCode(n)}return"keydown"===e.type||"keyup"===e.type?a[e.keyCode]||"Unidentified":"";

}var o=e("./getEventCharCode"),i={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",
Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",
Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},a={8:"Backspace",9:"Tab",12:"Clear",
13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",
32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",
40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",
117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",
224:"Meta"};t.exports=r},{"./getEventCharCode":149}],151:[function(e,t,n){"use strict";

function r(e){var t=this,n=t.nativeEvent;if(n.getModifierState)return n.getModifierState(e);

var r=i[e];return r?!!n[r]:!1}function o(e){return r}var i={Alt:"altKey",Control:"ctrlKey",
Meta:"metaKey",Shift:"shiftKey"};t.exports=o},{}],152:[function(e,t,n){"use strict";

function r(e){var t=e.target||e.srcElement||window;return 3===t.nodeType?t.parentNode:t;

}t.exports=r},{}],153:[function(e,t,n){"use strict";function r(e){var t=e&&(o&&e[o]||e[i]);

return"function"==typeof t?t:void 0}var o="function"==typeof Symbol&&Symbol.iterator,i="@@iterator";

t.exports=r},{}],154:[function(e,t,n){(function(n){function r(e){return"production"!==n.env.NODE_ENV?i(!!a,"Markup wrapping node not initialized"):i(!!a),
f.hasOwnProperty(e)||(e="*"),u.hasOwnProperty(e)||(a.innerHTML="*"===e?"<link />":"<"+e+"></"+e+">",
u[e]=!a.firstChild),u[e]?f[e]:null}var o=e("./ExecutionEnvironment"),i=e("./invariant"),a=o.canUseDOM?document.createElement("div"):null,u={
circle:!0,clipPath:!0,defs:!0,ellipse:!0,g:!0,line:!0,linearGradient:!0,path:!0,polygon:!0,
polyline:!0,radialGradient:!0,rect:!0,stop:!0,text:!0},s=[1,'<select multiple="true">',"</select>"],c=[1,"<table>","</table>"],l=[3,"<table><tbody><tr>","</tr></tbody></table>"],p=[1,"<svg>","</svg>"],f={
"*":[1,"?<div>","</div>"],area:[1,"<map>","</map>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],
legend:[1,"<fieldset>","</fieldset>"],param:[1,"<object>","</object>"],tr:[2,"<table><tbody>","</tbody></table>"],
optgroup:s,option:s,caption:c,colgroup:c,tbody:c,tfoot:c,thead:c,td:l,th:l,circle:p,
clipPath:p,defs:p,ellipse:p,g:p,line:p,linearGradient:p,path:p,polygon:p,polyline:p,
radialGradient:p,rect:p,stop:p,text:p};t.exports=r}).call(this,e("_process"))},{"./ExecutionEnvironment":47,
"./invariant":162,_process:14}],155:[function(e,t,n){"use strict";function r(e){for(;e&&e.firstChild;)e=e.firstChild;

return e}function o(e){for(;e;){if(e.nextSibling)return e.nextSibling;e=e.parentNode;

}}function i(e,t){for(var n=r(e),i=0,a=0;n;){if(3===n.nodeType){if(a=i+n.textContent.length,
t>=i&&a>=t)return{node:n,offset:t-i};i=a}n=r(o(n))}}t.exports=i},{}],156:[function(e,t,n){
"use strict";function r(e){return e?e.nodeType===o?e.documentElement:e.firstChild:null;

}var o=9;t.exports=r},{}],157:[function(e,t,n){"use strict";function r(){return!i&&o.canUseDOM&&(i="textContent"in document.documentElement?"textContent":"innerText"),
i}var o=e("./ExecutionEnvironment"),i=null;t.exports=r},{"./ExecutionEnvironment":47
}],158:[function(e,t,n){"use strict";function r(e){return e===window?{x:window.pageXOffset||document.documentElement.scrollLeft,
y:window.pageYOffset||document.documentElement.scrollTop}:{x:e.scrollLeft,y:e.scrollTop
}}t.exports=r},{}],159:[function(e,t,n){function r(e){return e.replace(o,"-$1").toLowerCase();

}var o=/([A-Z])/g;t.exports=r},{}],160:[function(e,t,n){"use strict";function r(e){
return o(e).replace(i,"-ms-")}var o=e("./hyphenate"),i=/^ms-/;t.exports=r},{"./hyphenate":159
}],161:[function(e,t,n){(function(n){"use strict";function r(e){return"function"==typeof e&&"undefined"!=typeof e.prototype&&"function"==typeof e.prototype.mountComponent&&"function"==typeof e.prototype.receiveComponent;

}function o(e,t){var o;if((null===e||e===!1)&&(e=a.emptyElement),"object"==typeof e){
var i=e;"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?l(i&&("function"==typeof i.type||"string"==typeof i.type),"Only functions or strings can be mounted as React components."):null),
o=t===i.type&&"string"==typeof i.type?u.createInternalComponent(i):r(i.type)?new i.type(i):new p;

}else"string"==typeof e||"number"==typeof e?o=u.createInstanceForText(e):"production"!==n.env.NODE_ENV?c(!1,"Encountered invalid React node of type %s",typeof e):c(!1);

return"production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?l("function"==typeof o.construct&&"function"==typeof o.mountComponent&&"function"==typeof o.receiveComponent&&"function"==typeof o.unmountComponent,"Only React Components can be mounted."):null),
o.construct(e),o._mountIndex=0,o._mountImage=null,"production"!==n.env.NODE_ENV&&(o._isOwnerNecessary=!1,
o._warnedAboutRefsInRender=!1),"production"!==n.env.NODE_ENV&&Object.preventExtensions&&Object.preventExtensions(o),
o}var i=e("./ReactCompositeComponent"),a=e("./ReactEmptyComponent"),u=e("./ReactNativeComponent"),s=e("./Object.assign"),c=e("./invariant"),l=e("./warning"),p=function(){};

s(p.prototype,i.Mixin,{_instantiateReactComponent:o}),t.exports=o}).call(this,e("_process"));

},{"./Object.assign":53,"./ReactCompositeComponent":64,"./ReactEmptyComponent":86,
"./ReactNativeComponent":100,"./invariant":162,"./warning":181,_process:14}],162:[function(e,t,n){
(function(e){"use strict";var n=function(t,n,r,o,i,a,u,s){if("production"!==e.env.NODE_ENV&&void 0===n)throw new Error("invariant requires an error message argument");

if(!t){var c;if(void 0===n)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
else{var l=[r,o,i,a,u,s],p=0;c=new Error("Invariant Violation: "+n.replace(/%s/g,function(){
return l[p++]}))}throw c.framesToPop=1,c}};t.exports=n}).call(this,e("_process"));

},{_process:14}],163:[function(e,t,n){"use strict";function r(e,t){if(!i.canUseDOM||t&&!("addEventListener"in document))return!1;

var n="on"+e,r=n in document;if(!r){var a=document.createElement("div");a.setAttribute(n,"return;"),
r="function"==typeof a[n]}return!r&&o&&"wheel"===e&&(r=document.implementation.hasFeature("Events.wheel","3.0")),
r}var o,i=e("./ExecutionEnvironment");i.canUseDOM&&(o=document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature("","")!==!0),
t.exports=r},{"./ExecutionEnvironment":47}],164:[function(e,t,n){function r(e){return!(!e||!("function"==typeof Node?e instanceof Node:"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName));

}t.exports=r},{}],165:[function(e,t,n){"use strict";function r(e){return e&&("INPUT"===e.nodeName&&o[e.type]||"TEXTAREA"===e.nodeName);

}var o={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,
password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};t.exports=r;

},{}],166:[function(e,t,n){function r(e){return o(e)&&3==e.nodeType}var o=e("./isNode");

t.exports=r},{"./isNode":164}],167:[function(e,t,n){(function(n){"use strict";var r=e("./invariant"),o=function(e){
var t,o={};"production"!==n.env.NODE_ENV?r(e instanceof Object&&!Array.isArray(e),"keyMirror(...): Argument must be an object."):r(e instanceof Object&&!Array.isArray(e));

for(t in e)e.hasOwnProperty(t)&&(o[t]=t);return o};t.exports=o}).call(this,e("_process"));

},{"./invariant":162,_process:14}],168:[function(e,t,n){var r=function(e){var t;for(t in e)if(e.hasOwnProperty(t))return t;

return null};t.exports=r},{}],169:[function(e,t,n){"use strict";function r(e,t,n){
if(!e)return null;var r={};for(var i in e)o.call(e,i)&&(r[i]=t.call(n,e[i],i,e));
return r}var o=Object.prototype.hasOwnProperty;t.exports=r},{}],170:[function(e,t,n){
"use strict";function r(e){var t={};return function(n){return t.hasOwnProperty(n)||(t[n]=e.call(this,n)),
t[n]}}t.exports=r},{}],171:[function(e,t,n){(function(n){"use strict";function r(e){
return"production"!==n.env.NODE_ENV?i(o.isValidElement(e),"onlyChild must be passed a children with exactly one child."):i(o.isValidElement(e)),
e}var o=e("./ReactElement"),i=e("./invariant");t.exports=r}).call(this,e("_process"));

},{"./ReactElement":84,"./invariant":162,_process:14}],172:[function(e,t,n){"use strict";

var r,o=e("./ExecutionEnvironment");o.canUseDOM&&(r=window.performance||window.msPerformance||window.webkitPerformance),
t.exports=r||{}},{"./ExecutionEnvironment":47}],173:[function(e,t,n){var r=e("./performance");

r&&r.now||(r=Date);var o=r.now.bind(r);t.exports=o},{"./performance":172}],174:[function(e,t,n){
"use strict";function r(e){return'"'+o(e)+'"'}var o=e("./escapeTextContentForBrowser");

t.exports=r},{"./escapeTextContentForBrowser":143}],175:[function(e,t,n){"use strict";

var r=e("./ExecutionEnvironment"),o=/^[ \r\n\t\f]/,i=/<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/,a=function(e,t){
e.innerHTML=t};if("undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction&&(a=function(e,t){
MSApp.execUnsafeLocalFunction(function(){e.innerHTML=t})}),r.canUseDOM){var u=document.createElement("div");

u.innerHTML=" ",""===u.innerHTML&&(a=function(e,t){if(e.parentNode&&e.parentNode.replaceChild(e,e),
o.test(t)||"<"===t[0]&&i.test(t)){e.innerHTML="\ufeff"+t;var n=e.firstChild;1===n.data.length?e.removeChild(n):n.deleteData(0,1);

}else e.innerHTML=t})}t.exports=a},{"./ExecutionEnvironment":47}],176:[function(e,t,n){
"use strict";var r=e("./ExecutionEnvironment"),o=e("./escapeTextContentForBrowser"),i=e("./setInnerHTML"),a=function(e,t){
e.textContent=t};r.canUseDOM&&("textContent"in document.documentElement||(a=function(e,t){
i(e,o(t))})),t.exports=a},{"./ExecutionEnvironment":47,"./escapeTextContentForBrowser":143,
"./setInnerHTML":175}],177:[function(e,t,n){"use strict";function r(e,t){if(e===t)return!0;

var n;for(n in e)if(e.hasOwnProperty(n)&&(!t.hasOwnProperty(n)||e[n]!==t[n]))return!1;

for(n in t)if(t.hasOwnProperty(n)&&!e.hasOwnProperty(n))return!1;return!0}t.exports=r;

},{}],178:[function(e,t,n){(function(n){"use strict";function r(e,t){if(null!=e&&null!=t){
var r=typeof e,i=typeof t;if("string"===r||"number"===r)return"string"===i||"number"===i;

if("object"===i&&e.type===t.type&&e.key===t.key){var a=e._owner===t._owner,u=null,s=null,c=null;

return"production"!==n.env.NODE_ENV&&(a||(null!=e._owner&&null!=e._owner.getPublicInstance()&&null!=e._owner.getPublicInstance().constructor&&(u=e._owner.getPublicInstance().constructor.displayName),
null!=t._owner&&null!=t._owner.getPublicInstance()&&null!=t._owner.getPublicInstance().constructor&&(s=t._owner.getPublicInstance().constructor.displayName),
null!=t.type&&null!=t.type.displayName&&(c=t.type.displayName),null!=t.type&&"string"==typeof t.type&&(c=t.type),
("string"!=typeof t.type||"input"===t.type||"textarea"===t.type)&&(null!=e._owner&&e._owner._isOwnerNecessary===!1||null!=t._owner&&t._owner._isOwnerNecessary===!1)&&(null!=e._owner&&(e._owner._isOwnerNecessary=!0),
null!=t._owner&&(t._owner._isOwnerNecessary=!0),"production"!==n.env.NODE_ENV?o(!1,"<%s /> is being rendered by both %s and %s using the same key (%s) in the same place. Currently, this means that they don't preserve state. This behavior should be very rare so we're considering deprecating it. Please contact the React team and explain your use case so that we can take that into consideration.",c||"Unknown Component",u||"[Unknown]",s||"[Unknown]",e.key):null))),
a}}return!1}var o=e("./warning");t.exports=r}).call(this,e("_process"))},{"./warning":181,
_process:14}],179:[function(e,t,n){(function(n){function r(e){var t=e.length;if("production"!==n.env.NODE_ENV?o(!Array.isArray(e)&&("object"==typeof e||"function"==typeof e),"toArray: Array-like object expected"):o(!Array.isArray(e)&&("object"==typeof e||"function"==typeof e)),
"production"!==n.env.NODE_ENV?o("number"==typeof t,"toArray: Object needs a length property"):o("number"==typeof t),
"production"!==n.env.NODE_ENV?o(0===t||t-1 in e,"toArray: Object should have keys for indices"):o(0===t||t-1 in e),
e.hasOwnProperty)try{return Array.prototype.slice.call(e)}catch(r){}for(var i=Array(t),a=0;t>a;a++)i[a]=e[a];

return i}var o=e("./invariant");t.exports=r}).call(this,e("_process"))},{"./invariant":162,
_process:14}],180:[function(e,t,n){(function(n){"use strict";function r(e){return v[e];

}function o(e,t){return e&&null!=e.key?a(e.key):t.toString(36)}function i(e){return(""+e).replace(y,r);

}function a(e){return"$"+i(e)}function u(e,t,r,i,s){var p=typeof e;if(("undefined"===p||"boolean"===p)&&(e=null),
null===e||"string"===p||"number"===p||c.isValidElement(e))return i(s,e,""===t?g+o(e,0):t,r),
1;var v,y,b,x=0;if(Array.isArray(e))for(var w=0;w<e.length;w++)v=e[w],y=(""!==t?t+m:g)+o(v,w),
b=r+x,x+=u(v,y,b,i,s);else{var C=f(e);if(C){var _,N=C.call(e);if(C!==e.entries)for(var M=0;!(_=N.next()).done;)v=_.value,
y=(""!==t?t+m:g)+o(v,M++),b=r+x,x+=u(v,y,b,i,s);else for("production"!==n.env.NODE_ENV&&("production"!==n.env.NODE_ENV?h(E,"Using Maps as children is not yet fully supported. It is an experimental feature that might be removed. Convert it to a sequence / iterable of keyed ReactElements instead."):null,
E=!0);!(_=N.next()).done;){var D=_.value;D&&(v=D[1],y=(""!==t?t+m:g)+a(D[0])+m+o(v,0),
b=r+x,x+=u(v,y,b,i,s))}}else if("object"===p){"production"!==n.env.NODE_ENV?d(1!==e.nodeType,"traverseAllChildren(...): Encountered an invalid child; DOM elements are not valid children of React components."):d(1!==e.nodeType);

var R=l.extract(e);for(var O in R)R.hasOwnProperty(O)&&(v=R[O],y=(""!==t?t+m:g)+a(O)+m+o(v,0),
b=r+x,x+=u(v,y,b,i,s))}}return x}function s(e,t,n){return null==e?0:u(e,"",0,t,n);

}var c=e("./ReactElement"),l=e("./ReactFragment"),p=e("./ReactInstanceHandles"),f=e("./getIteratorFn"),d=e("./invariant"),h=e("./warning"),g=p.SEPARATOR,m=":",v={
"=":"=0",".":"=1",":":"=2"},y=/[=.:]/g,E=!1;t.exports=s}).call(this,e("_process"));

},{"./ReactElement":84,"./ReactFragment":90,"./ReactInstanceHandles":93,"./getIteratorFn":153,
"./invariant":162,"./warning":181,_process:14}],181:[function(e,t,n){(function(n){
"use strict";var r=e("./emptyFunction"),o=r;"production"!==n.env.NODE_ENV&&(o=function(e,t){
for(var n=[],r=2,o=arguments.length;o>r;r++)n.push(arguments[r]);if(void 0===t)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");

if(t.length<10||/^[s\W]*$/.test(t))throw new Error("The warning format should be able to uniquely identify this warning. Please, use a more descriptive format than: "+t);

if(0!==t.indexOf("Failed Composite propType: ")&&!e){var i=0,a="Warning: "+t.replace(/%s/g,function(){
return n[i++]});console.warn(a);try{throw new Error(a)}catch(u){}}}),t.exports=o}).call(this,e("_process"));

},{"./emptyFunction":141,_process:14}],182:[function(e,t,n){t.exports=e("./lib/React");

},{"./lib/React":55}]},{},[5]);