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


!function t(e,n,r){function i(a,u){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;

if(!u&&s)return s(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");

throw c.code="MODULE_NOT_FOUND",c}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(t){
var n=e[a][1][t];return i(n?n:t)},l,l.exports,t,e,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);

return i}({1:[function(t,e,n){"use strict";n["code-search"]=t("../plugins/code-search"),
n["editor-theme"]=t("../plugins/editor-theme"),n["fork-count"]=t("../plugins/fork-count"),
n["gh-pages-link"]=t("../plugins/gh-pages-link"),n["pull-request-links"]=t("../plugins/pull-request-links"),
n["repo-counts"]=t("../plugins/repo-counts"),n["repo-filter-info"]=t("../plugins/repo-filter-info"),
n["twitter-link"]=t("../plugins/twitter-link"),n.pluginNames=["code-search","editor-theme","fork-count","gh-pages-link","pull-request-links","repo-counts","repo-filter-info","twitter-link"];

},{"../plugins/code-search":6,"../plugins/editor-theme":7,"../plugins/fork-count":8,
"../plugins/gh-pages-link":9,"../plugins/pull-request-links":10,"../plugins/repo-counts":11,
"../plugins/repo-filter-info":12,"../plugins/twitter-link":13}],2:[function(t,e,n){
"use strict";var r=t("util"),i=t("object-path-get"),o=t("object-path-set"),a="GES.by.skratchdot",u=function(){
try{var t=JSON.parse(window.localStorage.getItem(a));return r.isObject(t)||(t={}),
t}catch(e){return{}}};n.get=function(t,e){var n=u();return i(n,t,e)},n.set=function(t,e){
var n=u();n=o(n,t,e),window.localStorage.setItem(a,JSON.stringify(n))},n.test=function(){
var t="localStorageTest",e=Date.now();return n.set(t,e),e===n.get(t,null)}},{"object-path-get":27,
"object-path-set":28,util:22}],3:[function(t,e,n){"use strict";var r=(t("jquery"),
t("url"));n.getCurrentAuthorAndRepo=function(){var t=(r.parse(document.location.toString()).pathname||"").split("/");

return{author:t[1]||"",repo:t[2]||""}},n.getCurrentRepo=function(){return n.getCurrentAuthorAndRepo().repo;

},n.getCurrentAuthor=function(){return n.getCurrentAuthorAndRepo().author}},{jquery:24,
url:20}],4:[function(t,e,n){var r=t("d3"),i={};i.pie_chart=function(t,e,n){"use strict";

var i,o,a,u,s,c,l,f,h=r.select("svg."+t),p=h[0][0].clientWidth||h[0][0].parentNode.clientWidth,d={
radius_inner:0,radius_outer:p/3,radius_label:p/3+20,percentage:!0,value:!1,label_margin:10,
group_data:0},g={left:[],right:[]},v=function(t){t.sort(function(t,e){return t.y+t.height-(e.y+e.height);

}).forEach(function(e,n){t[n+1]&&t[n+1].y-(e.y+e.height)<d.label_margin&&(t[n+1].y=e.y+e.height+d.label_margin),
e.x<d.label_margin?e.x=d.label_margin:e.x+e.width>p-d.label_margin&&(e.x=p-e.width-d.label_margin),
r.select(s[0][e.index]).attr("transform","translate("+e.x+", "+e.y+")"),r.select(c[0][e.index]).attr("x",0).attr("y",-e.height+2).attr("width",e.width+4).attr("height",e.height+4),
e.textNode.attr("x",2).attr("y",2)})},m=function(t){var e,n=0,r=0;for(t.forEach(function(t){
n+=t.value}),e=t.length-1;e>=0;e--)t[e].value/n*100<d.group_data&&r++;if(r>1)for(r=0,
e=t.length-1;e>=0;e--)t[e].value/n*100<d.group_data&&(r+=t.splice(e,1)[0].value);
return t.push({index:0,name:"Other",value:r}),t};if(-1!==e.map(function(t){return t.index;

}).indexOf(0))throw"0 index is reserved for grouped data.";if(void 0!==n)for(f in n)n.hasOwnProperty(f)&&void 0!==d[f]&&(d[f]=n[f]);

d.group_data&&(e=m(e)),i=h.append("g").attr("class","donut").attr("transform","translate("+p/2+", "+p/2+")"),
o=r.svg.arc().innerRadius(d.radius_inner).outerRadius(d.radius_outer),e=r.layout.pie().value(function(t){
return t.value}).sort(function(t,e){return e.index-t.index})(e),a=i.selectAll("path").data(e).enter().append("path").attr("class",function(t){
return"g-"+t.data.index}).attr("d",o).on("mouseover",function(t,e){r.select(s[0][e]).classed("active",!0);

}).on("mouseout",function(t,e){r.select(s[0][e]).classed("active",!1)}),u=h.append("g").attr("class","labels"),
s=u.selectAll("g.label").data(e).enter().append("g").filter(function(t){return d.percentage?!0:void 0!==t.data.name;

}).attr("class","label"),c=s.append("rect"),l=s.append("text").text(function(t){var e=((t.endAngle-t.startAngle)/(2*Math.PI)*100).toFixed(2),n=[];

return void 0!==t.data.name&&n.push(t.data.name),d.value&&n.push(" - "+t.data.value),
d.percentage&&n.push(" ("+e+"%)"),n.join(" ")}).each(function(t,e){var n=o.centroid(t),i=n[0],a=n[1],u=Math.sqrt(i*i+a*a),s=i/u*d.radius_label+p/2,c=a/u*d.radius_label+p/2,l=.5*(t.endAngle-t.startAngle)+t.startAngle>Math.PI,f=r.select(this),h=this.getBBox();

g[l?"left":"right"].push({index:e,width:h.width,height:h.height,x:l?s-h.width:s,y:c,
textNode:f})}),v(g.left),v(g.right)},n.ay=i},{d3:23}],5:[function(t,e,n){"use strict";

var r,i=t("./core/storage"),o=t("jquery"),a=t("./core/plugins");i.test()||console.warn("Github Enhancement Suite cannot use localStorageand may not work properly."),
a.pluginNames.forEach(function(t){"boolean"!=typeof i.get("enabled."+t)&&i.set("enabled."+t,!0);

}),r=function(){a.pluginNames.forEach(function(t){i.get("enabled."+t)&&o(a[t].enabledSelector).length&&"function"==typeof a[t].onPage&&(console.log("Firing onPage() for plugin: "+t+" at "+Date.now()),
a[t].onPage())})},r(),function(){var t=!1,e=new MutationObserver(function(e){o(".pjax-active").length?t=!0:t&&(t=!1,
setImmediate(function(){r()}))});e.observe(document,{attributes:!0,childList:!0,characterData:!0,
characterDataOldValue:!0,subtree:!0})}()},{"./core/plugins":1,"./core/storage":2,
jquery:24}],6:[function(t,e,n){"use strict";t("jquery");n.enabledSelector="",n.onPage=function(){};

},{jquery:24}],7:[function(t,e,n){"use strict";var r=t("jquery");n.enabledSelector=".file.js-code-editor .file-actions",
n.onPage=function(){var t,e,n,i,o,a,u,s={"ace/theme/chrome":"Chrome","ace/theme/clouds":"Clouds",
"ace/theme/crimson_editor":"Crimson Editor","ace/theme/dawn":"Dawn","ace/theme/dreamweaver":"Dreamweaver",
"ace/theme/eclipse":"Eclipse","ace/theme/github":"GitHub","ace/theme/solarized_light":"Solarized Light",
"ace/theme/textmate":"TextMate","ace/theme/tomorrow":"Tomorrow","ace/theme/xcode":"XCode"
},c={"ace/theme/ambiance":"Ambiance","ace/theme/clouds_midnight":"Clouds Midnight",
"ace/theme/cobalt":"Cobalt","ace/theme/idle_fingers":"idleFingers","ace/theme/kr_theme":"krTheme",
"ace/theme/merbivore":"Merbivore","ace/theme/merbivore_soft":"Merbivore Soft","ace/theme/mono_industrial":"Mono Industrial",
"ace/theme/monokai":"Monokai","ace/theme/pastel_on_dark":"Pastel on dark","ace/theme/solarized_dark":"Solarized Dark",
"ace/theme/twilight":"Twilight","ace/theme/tomorrow_night":"Tomorrow Night","ace/theme/tomorrow_night_blue":"Tomorrow Night Blue",
"ace/theme/tomorrow_night_bright":"Tomorrow Night Bright","ace/theme/tomorrow_night_eighties":"Tomorrow Night 80s",
"ace/theme/vibrant_ink":"Vibrant Ink"},l="ace/theme/twilight",f="SKRATCHDOT_EDITOR_THEME",h="skratchdot-editor-theme",p=0,d=50,g=100;

e=function(t){var e='<select id="'+h+'" class="select select-sm">';return e+=n(t,s,"Bright"),
e+=n(t,c,"Dark"),e+="\n</select>"},n=function(t,e,n){var r,i='\n<optgroup label="'+n+'">';

for(r in e)e.hasOwnProperty(r)&&(i+='\n<option value="'+r+'"'+(r===t?' selected="selected">':">")+e[r]+"</option>");

return i+="\n</optgroup>"},o=function(){var t;return window.localStorage&&(t=window.localStorage.getItem(f)),
"string"==typeof t&&"undefined"!=typeof ace&&ace.config.modules.hasOwnProperty(t)||(t=l,
a(t)),t},a=function(t){window.localStorage&&window.localStorage.setItem(f,t),"undefined"!=typeof CodeEditor&&CodeEditor.ace.setTheme(t);

},i=function(){var n,u;p+=1,1===r(".ace_editor").length&&(n=o(),t.prepend(e(n)),u=r("#"+h),
u.change(function(){a(r(this).val())}),u.change(),p=d),d>p&&setTimeout(i,g)},u=function(){
if(t=r(".file.js-code-editor .file-actions"),t.length)try{setTimeout(i,g)}catch(e){}
},r(document).ready(u)}},{jquery:24}],8:[function(t,e,n){"use strict";var r=t("jquery");

n.enabledSelector="body.page-profile .tabnav-tab.selected",n.onPage=function(){var t,e=0,n=0,i=0,o=0,a=0,u=0,s=r("ul.js-repo-list > li"),c=r(".column.vcard:first .vcard-stats");

0===r("#skratchdot-fork-count").length&&(c.append('<div class="clearfix"></div>'),
c.append('<div style="margin-top:-10px" id="skratchdot-fork-count"><span class="text-muted">repo counts visible on <a href="?tab=repositories">tab repositories</a></span></div>')),
t=r("#skratchdot-fork-count"),!t.hasClass("stats-populated")&&s.length>0&&(s.each(function(){
try{var t=r(this);e+=1,t.hasClass("public")&&(n+=1),t.hasClass("private")&&(i+=1),
t.hasClass("source")&&(o+=1),t.hasClass("fork")&&(a+=1),t.hasClass("mirror")&&(u+=1);

}catch(s){}}),t.html('<small class="text-muted">'+n+" public, "+i+" private, "+o+" sources, "+a+" forks</small>"+(u>0?'<small style="margin:0" class="text-muted">'+u+" mirrors</small>":"")),
t.addClass("stats-populated"))}},{jquery:24}],9:[function(t,e,n){"use strict";var r=t("jquery"),i=t("../core/utils");

n.enabledSelector=".repo-container .repository-meta.js-details-container",n.onPage=function(){
var t,e,o=i.getCurrentAuthorAndRepo();""!==o.author&&""!==o.repo&&r('[data-tab-filter="branches"] [data-name="gh-pages"]').length>0&&(t="http://"+o.author+".github.io/"+o.repo,
e="https://github.com/"+o.author+"/"+o.repo+"/tree/gh-pages",0===r("#skratchdot-gh-pages-container").length&&(r(n.enabledSelector).append('<div style="margin-top:5px" id="skratchdot-gh-pages-container"><span style="padding-right:5px;"><b>gh-pages:</b></span><span><a id="skratchdot-gh-pages-link" href="#"></a></span><span>&nbsp;&#8226;&nbsp;</span><span><a id="skratchdot-gh-pages-link-source" href="#">[gh-pages source]</a></span></div>'),
r("#skratchdot-gh-pages-link").attr("href",t).text(t),r("#skratchdot-gh-pages-link-source").attr("href",e)));

}},{"../core/utils":3,jquery:24}],10:[function(t,e,n){"use strict";var r=t("jquery"),i=t("../core/utils");

n.enabledSelector=".commit-ref:not(.editor-expander)",n.onPage=function(){r(n.enabledSelector).css("cursor","pointer").click(function(){
var t=i.getCurrentRepo(),e=r(this).text().trim().split(":");console.log(t,e),1===e.length&&(e=[i.getCurrentAuthor(),e[0]]),
t.length>0&&2===e.length&&(document.location="/"+e[0]+"/"+t+"/tree/"+e[1])})}},{"../core/utils":3,
jquery:24}],11:[function(t,e,n){"use strict";var r=t("jquery");n.enabledSelector='body.page-profile .tabnav-tab.selected:contains("Repositories")',
n.onPage=function(){r("body.page-profile .filter-bar a.new-repo").length>0&&r("#your-repos-filter").css("width","180px"),
r(".page-profile ul.repo_filterer li a").each(function(){try{var t=r(this),e=t.data("filter"),n=r("ul.js-repo-list").find("li"+e);

t.append(" ("+n.size()+")"),t.css("font-size","11px")}catch(i){}})}},{jquery:24}],
12:[function(t,e,n){"use strict";var r,i,o,a,u,s,c,l=t("jquery"),f=t("lodash.debounce"),h=t("../extras/ay-pie-chart").ay,p=["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5"];

n.enabledSelector='body.page-profile .tabnav-tab.selected:contains("Repositories")',
n.onPage=function(){var t=document.querySelector(".repo-tab .repo-list.js-repo-list"),e=new MutationObserver(function(t){
setImmediate(o)});a(),u(),e.observe(t,{attributes:!0,childList:!0,characterData:!0,
characterDataOldValue:!0,subtree:!0})},a=function(){var t,e,n="",r="skratchdot-repo-filter-info-css";

if(0===l("#"+r).length){for(n+='<style type="text/css" id="'+r+'">',n+="#skratchdot-repo-filter-div .show-hide { display: none; }",
n+="#skratchdot-repo-filter-div th, #skratchdot-repo-filter-div td { padding-right: 10px; }",
n+="#skratchdot-repo-filter-div .chart { width: 300px; height: 300px; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }",
n+="#skratchdot-repo-filter-div svg { width: 100%; height: 100%; }",n+="#skratchdot-repo-filter-div .color-chip { border: 1px solid #000; width: 10px; height: 10px; }",
t=0;t<p.length;t++)e=Math.min(p.length,t+1),n+="#skratchdot-repo-filter-div path.g-"+e+" { fill:"+p[t]+"; }",
n+="#skratchdot-repo-filter-div .color-g-"+e+" { background-color:"+p[t]+"; }";n+="#skratchdot-repo-filter-div svg > g.label { text-anchor: middle; }",
n+="#skratchdot-repo-filter-div svg > g.labels g.label { -moz-pointer-events: none; -webkit-pointer-events: none; -o-pointer-events: none; pointer-events: none; }",
n+="#skratchdot-repo-filter-div svg > g.labels g.label rect { stroke: none; fill: #fff; fill-opacity: .5; shape-rendering: crispEdges; }",
n+="#skratchdot-repo-filter-div svg > g.labels g.label text { font-size: 12px; text-anchor: left; }",
n+="#skratchdot-repo-filter-div svg > g.labels g.label.active rect { fill-opacity: 1; }",
n+="</style>",l("head").append(n)}},u=function(){0===l("#skratchdot-repo-filter-div").length&&(l("div.js-repo-filter .filter-bar").after(l("<div></div>").attr("id","skratchdot-repo-filter-div").css("background","none repeat scroll 0 0 #FAFAFB").css("border","1px solid #DDDDDD").css("border-radius","4px 4px 4px 4px").css("cursor","pointer").css("margin-bottom","10px").css("padding","10px").css("text-align","center").append('<div class="left" />').append('<div class="right"><a class="skratchdot-languages" href="#" style="font-size:.8em;padding:5px;">show languages</a><span class="octicon octicon-star"></span><span class="skratchdot-count-starred" style="padding:0px 5px;"></span>&nbsp;<span class="octicon octicon-git-branch"></span><span class="skratchdot-count-forks" style="padding:0px 5px;"></span></div>').append('<div class="show-hide" style="clear:both;"><div style="float:left;"><div class="chart"></div></div><div style="float:right;"><table><thead><tr><th>Language</th><th>&nbsp;</th><th>Usage</th><th>Repos</th><th>Starred</th><th>Forks</th></tr></thead><tbody></tbody></table></div></div>').append('<div class="clearfix" />')),
r=l("#skratchdot-repo-filter-div"),r.click(function(t){t.preventDefault(),s()?(r.find(".skratchdot-languages").text("show languages"),
r.find(".show-hide").hide()):(r.find(".skratchdot-languages").text("hide languages"),
r.find(".show-hide").show(),c())}))},s=function(){return r.find(".show-hide:visible").length>0;

},o=f(function(){console.log("drawing filter div...");var t,e,n,o,a,u=0,s=0,f=0,h=0,d=0,g={},v=[],m="",y={};

for(i=[],t=document.querySelectorAll('ul.js-repo-list > li:not([style*="display: none"])'),
u=0;u<t.length;u++)e=l("<div>"+t[u].innerHTML+"</div>"),0!==e.find(".repo-list-stats").length&&(o=parseInt(e.find('[aria-label="Forks"]').text().replace(",",""),10),
a=parseInt(e.find('[aria-label="Stargazers"]').text().replace(",",""),10),f+=1,h+=o,
d+=a,n=e.find(".repo-list-stats").clone(),n.find(".repo-list-stat-item").remove(),
m=n.text().trim(),""===m&&(m="Unknown"),g.hasOwnProperty(m)||(g[m]={name:m,count:0,
forks:0,starred:0}),g[m].count=g[m].count+1,g[m].forks=g[m].forks+o,g[m].starred=g[m].starred+a);

r.find(".left").html("Now Showing <b>"+f+"</b> Repos"),r.find(".skratchdot-count-forks").text(h),
r.find(".skratchdot-count-starred").text(d),r.find("table tbody").empty(),r.find(".chart").empty();

for(m in g)g.hasOwnProperty(m)&&v.push(g[m]);for(v.sort(function(t,e){return e.count-t.count||t.name>e.name;

}),u=0;u<v.length;u++)y=v[u],r.find("table tbody").append('<tr><td align="right">'+y.name+'</td><td align="center"><div class="color-chip color-g-'+Math.min(p.length,u+1)+'">&nbsp;</div></td><td align="center">'+(y.count/f*100).toFixed(2)+' %</td><td align="center">'+y.count+'</td><td align="center">'+y.starred+'</td><td align="center">'+y.forks+"</td></tr>"),
u<p.length-1?i.push({index:u+1,name:y.name,value:y.count}):0!==u&&(s+=y.count);s>0&&i.push({
index:p.length,name:"Other",value:s}),c()},100),c=function(){var t=r.find(".chart");

s()&&0===t.find("svg").length&&(t.append('<svg class="skratchdot-language-chart"></svg>'),
"undefined"!=typeof h&&h.pie_chart("skratchdot-language-chart",i,{group_data:0}));

}},{"../extras/ay-pie-chart":4,jquery:24,"lodash.debounce":25}],13:[function(t,e,n){
"use strict";var r=t("jquery"),i=t("../core/utils");n.enabledSelector="body.page-profile",
n.onPage=function(){var t,e,n;0===r("#skratchdot-twitter-section").length&&(t=i.getCurrentAuthor(),
e=r("<a />").attr("href","//twitter.com/"+encodeURIComponent(t)).text("@"+t),n='<li class="vcard-detail" id="skratchdot-twitter-section"><span class="octicon">&#9443;</span><span id="skratchdot-twitter-link"></span></li>',
r(".column.vcard:first ul.vcard-details:first").append(n),r("#skratchdot-twitter-link").append(e));

}},{"../core/utils":3,jquery:24}],14:[function(t,e,n){e.exports="function"==typeof Object.create?function(t,e){
t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,
writable:!0,configurable:!0}})}:function(t,e){t.super_=e;var n=function(){};n.prototype=e.prototype,
t.prototype=new n,t.prototype.constructor=t}},{}],15:[function(t,e,n){function r(){
l=!1,u.length?c=u.concat(c):f=-1,c.length&&i()}function i(){if(!l){var t=setTimeout(r);

l=!0;for(var e=c.length;e;){for(u=c,c=[];++f<e;)u[f].run();f=-1,e=c.length}u=null,
l=!1,clearTimeout(t)}}function o(t,e){this.fun=t,this.array=e}function a(){}var u,s=e.exports={},c=[],l=!1,f=-1;

s.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];

c.push(new o(t,e)),1!==c.length||l||setTimeout(i,0)},o.prototype.run=function(){this.fun.apply(null,this.array);

},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=a,
s.addListener=a,s.once=a,s.off=a,s.removeListener=a,s.removeAllListeners=a,s.emit=a,
s.binding=function(t){throw new Error("process.binding is not supported")},s.cwd=function(){
return"/"},s.chdir=function(t){throw new Error("process.chdir is not supported")},
s.umask=function(){return 0}},{}],16:[function(t,e,n){(function(t){!function(r){function i(t){
throw RangeError(D[t])}function o(t,e){for(var n=t.length,r=[];n--;)r[n]=e(t[n]);
return r}function a(t,e){var n=t.split("@"),r="";n.length>1&&(r=n[0]+"@",t=n[1]),
t=t.replace(q,".");var i=t.split("."),a=o(i,e).join(".");return r+a}function u(t){
for(var e,n,r=[],i=0,o=t.length;o>i;)e=t.charCodeAt(i++),e>=55296&&56319>=e&&o>i?(n=t.charCodeAt(i++),
56320==(64512&n)?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),i--)):r.push(e);

return r}function s(t){return o(t,function(t){var e="";return t>65535&&(t-=65536,
e+=R(t>>>10&1023|55296),t=56320|1023&t),e+=R(t)}).join("")}function c(t){return 10>t-48?t-22:26>t-65?t-65:26>t-97?t-97:M;

}function l(t,e){return t+22+75*(26>t)-((0!=e)<<5)}function f(t,e,n){var r=0;for(t=n?O(t/C):t>>1,
t+=O(t/e);t>L*_>>1;r+=M)t=O(t/L);return O(r+(L+1)*t/(t+S))}function h(t){var e,n,r,o,a,u,l,h,p,d,g=[],v=t.length,m=0,y=T,x=E;

for(n=t.lastIndexOf(A),0>n&&(n=0),r=0;n>r;++r)t.charCodeAt(r)>=128&&i("not-basic"),
g.push(t.charCodeAt(r));for(o=n>0?n+1:0;v>o;){for(a=m,u=1,l=M;o>=v&&i("invalid-input"),
h=c(t.charCodeAt(o++)),(h>=M||h>O((w-m)/u))&&i("overflow"),m+=h*u,p=x>=l?k:l>=x+_?_:l-x,
!(p>h);l+=M)d=M-p,u>O(w/d)&&i("overflow"),u*=d;e=g.length+1,x=f(m-a,e,0==a),O(m/e)>w-y&&i("overflow"),
y+=O(m/e),m%=e,g.splice(m++,0,y)}return s(g)}function p(t){var e,n,r,o,a,s,c,h,p,d,g,v,m,y,x,b=[];

for(t=u(t),v=t.length,e=T,n=0,a=E,s=0;v>s;++s)g=t[s],128>g&&b.push(R(g));for(r=o=b.length,
o&&b.push(A);v>r;){for(c=w,s=0;v>s;++s)g=t[s],g>=e&&c>g&&(c=g);for(m=r+1,c-e>O((w-n)/m)&&i("overflow"),
n+=(c-e)*m,e=c,s=0;v>s;++s)if(g=t[s],e>g&&++n>w&&i("overflow"),g==e){for(h=n,p=M;d=a>=p?k:p>=a+_?_:p-a,
!(d>h);p+=M)x=h-d,y=M-d,b.push(R(l(d+x%y,0))),h=O(x/y);b.push(R(l(h,0))),a=f(n,m,r==o),
n=0,++r}++n,++e}return b.join("")}function d(t){return a(t,function(t){return N.test(t)?h(t.slice(4).toLowerCase()):t;

})}function g(t){return a(t,function(t){return j.test(t)?"xn--"+p(t):t})}var v="object"==typeof n&&n&&!n.nodeType&&n,m="object"==typeof e&&e&&!e.nodeType&&e,y="object"==typeof t&&t;

(y.global===y||y.window===y||y.self===y)&&(r=y);var x,b,w=2147483647,M=36,k=1,_=26,S=38,C=700,E=72,T=128,A="-",N=/^xn--/,j=/[^\x20-\x7E]/,q=/[\x2E\u3002\uFF0E\uFF61]/g,D={
overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)",
"invalid-input":"Invalid input"},L=M-k,O=Math.floor,R=String.fromCharCode;if(x={version:"1.3.2",
ucs2:{decode:u,encode:s},decode:h,encode:p,toASCII:g,toUnicode:d},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){
return x});else if(v&&m)if(e.exports==v)m.exports=x;else for(b in x)x.hasOwnProperty(b)&&(v[b]=x[b]);
else r.punycode=x}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});

},{}],17:[function(t,e,n){"use strict";function r(t,e){return Object.prototype.hasOwnProperty.call(t,e);

}e.exports=function(t,e,n,o){e=e||"&",n=n||"=";var a={};if("string"!=typeof t||0===t.length)return a;

var u=/\+/g;t=t.split(e);var s=1e3;o&&"number"==typeof o.maxKeys&&(s=o.maxKeys);var c=t.length;

s>0&&c>s&&(c=s);for(var l=0;c>l;++l){var f,h,p,d,g=t[l].replace(u,"%20"),v=g.indexOf(n);

v>=0?(f=g.substr(0,v),h=g.substr(v+1)):(f=g,h=""),p=decodeURIComponent(f),d=decodeURIComponent(h),
r(a,p)?i(a[p])?a[p].push(d):a[p]=[a[p],d]:a[p]=d}return a};var i=Array.isArray||function(t){
return"[object Array]"===Object.prototype.toString.call(t)}},{}],18:[function(t,e,n){
"use strict";function r(t,e){if(t.map)return t.map(e);for(var n=[],r=0;r<t.length;r++)n.push(e(t[r],r));

return n}var i=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";

case"number":return isFinite(t)?t:"";default:return""}};e.exports=function(t,e,n,u){
return e=e||"&",n=n||"=",null===t&&(t=void 0),"object"==typeof t?r(a(t),function(a){
var u=encodeURIComponent(i(a))+n;return o(t[a])?r(t[a],function(t){return u+encodeURIComponent(i(t));

}).join(e):u+encodeURIComponent(i(t[a]))}).join(e):u?encodeURIComponent(i(u))+n+encodeURIComponent(i(t)):"";

};var o=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t);

},a=Object.keys||function(t){var e=[];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(n);

return e}},{}],19:[function(t,e,n){"use strict";n.decode=n.parse=t("./decode"),n.encode=n.stringify=t("./encode");

},{"./decode":17,"./encode":18}],20:[function(t,e,n){function r(){this.protocol=null,
this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,
this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,
this.href=null}function i(t,e,n){if(t&&c(t)&&t instanceof r)return t;var i=new r;
return i.parse(t,e,n),i}function o(t){return s(t)&&(t=i(t)),t instanceof r?t.format():r.prototype.format.call(t);

}function a(t,e){return i(t,!1,!0).resolve(e)}function u(t,e){return t?i(t,!1,!0).resolveObject(e):e;

}function s(t){return"string"==typeof t}function c(t){return"object"==typeof t&&null!==t;

}function l(t){return null===t}function f(t){return null==t}var h=t("punycode");n.parse=i,
n.resolve=a,n.resolveObject=u,n.format=o,n.Url=r;var p=/^([a-z0-9.+-]+:)/i,d=/:[0-9]*$/,g=["<",">",'"',"`"," ","\r","\n","	"],v=["{","}","|","\\","^","`"].concat(g),m=["'"].concat(v),y=["%","/","?",";","#"].concat(m),x=["/","?","#"],b=255,w=/^[a-z0-9A-Z_-]{0,63}$/,M=/^([a-z0-9A-Z_-]{0,63})(.*)$/,k={
javascript:!0,"javascript:":!0},_={javascript:!0,"javascript:":!0},S={http:!0,https:!0,
ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0
},C=t("querystring");r.prototype.parse=function(t,e,n){if(!s(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);

var r=t;r=r.trim();var i=p.exec(r);if(i){i=i[0];var o=i.toLowerCase();this.protocol=o,
r=r.substr(i.length)}if(n||i||r.match(/^\/\/[^@\/]+@[^@\/]+/)){var a="//"===r.substr(0,2);

!a||i&&_[i]||(r=r.substr(2),this.slashes=!0)}if(!_[i]&&(a||i&&!S[i])){for(var u=-1,c=0;c<x.length;c++){
var l=r.indexOf(x[c]);-1!==l&&(-1===u||u>l)&&(u=l)}var f,d;d=-1===u?r.lastIndexOf("@"):r.lastIndexOf("@",u),
-1!==d&&(f=r.slice(0,d),r=r.slice(d+1),this.auth=decodeURIComponent(f)),u=-1;for(var c=0;c<y.length;c++){
var l=r.indexOf(y[c]);-1!==l&&(-1===u||u>l)&&(u=l)}-1===u&&(u=r.length),this.host=r.slice(0,u),
r=r.slice(u),this.parseHost(),this.hostname=this.hostname||"";var g="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];

if(!g)for(var v=this.hostname.split(/\./),c=0,E=v.length;E>c;c++){var T=v[c];if(T&&!T.match(w)){
for(var A="",N=0,j=T.length;j>N;N++)A+=T.charCodeAt(N)>127?"x":T[N];if(!A.match(w)){
var q=v.slice(0,c),D=v.slice(c+1),L=T.match(M);L&&(q.push(L[1]),D.unshift(L[2])),
D.length&&(r="/"+D.join(".")+r),this.hostname=q.join(".");break}}}if(this.hostname=this.hostname.length>b?"":this.hostname.toLowerCase(),
!g){for(var O=this.hostname.split("."),R=[],c=0;c<O.length;++c){var z=O[c];R.push(z.match(/[^A-Za-z0-9_-]/)?"xn--"+h.encode(z):z);

}this.hostname=R.join(".")}var P=this.port?":"+this.port:"",H=this.hostname||"";this.host=H+P,
this.href+=this.host,g&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),
"/"!==r[0]&&(r="/"+r))}if(!k[o])for(var c=0,E=m.length;E>c;c++){var F=m[c],I=encodeURIComponent(F);

I===F&&(I=escape(F)),r=r.split(F).join(I)}var U=r.indexOf("#");-1!==U&&(this.hash=r.substr(U),
r=r.slice(0,U));var $=r.indexOf("?");if(-1!==$?(this.search=r.substr($),this.query=r.substr($+1),
e&&(this.query=C.parse(this.query)),r=r.slice(0,$)):e&&(this.search="",this.query={}),
r&&(this.pathname=r),S[o]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){
var P=this.pathname||"",z=this.search||"";this.path=P+z}return this.href=this.format(),
this},r.prototype.format=function(){var t=this.auth||"";t&&(t=encodeURIComponent(t),
t=t.replace(/%3A/i,":"),t+="@");var e=this.protocol||"",n=this.pathname||"",r=this.hash||"",i=!1,o="";

this.host?i=t+this.host:this.hostname&&(i=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),
this.port&&(i+=":"+this.port)),this.query&&c(this.query)&&Object.keys(this.query).length&&(o=C.stringify(this.query));

var a=this.search||o&&"?"+o||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||S[e])&&i!==!1?(i="//"+(i||""),
n&&"/"!==n.charAt(0)&&(n="/"+n)):i||(i=""),r&&"#"!==r.charAt(0)&&(r="#"+r),a&&"?"!==a.charAt(0)&&(a="?"+a),
n=n.replace(/[?#]/g,function(t){return encodeURIComponent(t)}),a=a.replace("#","%23"),
e+i+n+a+r},r.prototype.resolve=function(t){return this.resolveObject(i(t,!1,!0)).format();

},r.prototype.resolveObject=function(t){if(s(t)){var e=new r;e.parse(t,!1,!0),t=e;

}var n=new r;if(Object.keys(this).forEach(function(t){n[t]=this[t]},this),n.hash=t.hash,
""===t.href)return n.href=n.format(),n;if(t.slashes&&!t.protocol)return Object.keys(t).forEach(function(e){
"protocol"!==e&&(n[e]=t[e])}),S[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),
n.href=n.format(),n;if(t.protocol&&t.protocol!==n.protocol){if(!S[t.protocol])return Object.keys(t).forEach(function(e){
n[e]=t[e]}),n.href=n.format(),n;if(n.protocol=t.protocol,t.host||_[t.protocol])n.pathname=t.pathname;
else{for(var i=(t.pathname||"").split("/");i.length&&!(t.host=i.shift()););t.host||(t.host=""),
t.hostname||(t.hostname=""),""!==i[0]&&i.unshift(""),i.length<2&&i.unshift(""),n.pathname=i.join("/");

}if(n.search=t.search,n.query=t.query,n.host=t.host||"",n.auth=t.auth,n.hostname=t.hostname||t.host,
n.port=t.port,n.pathname||n.search){var o=n.pathname||"",a=n.search||"";n.path=o+a;

}return n.slashes=n.slashes||t.slashes,n.href=n.format(),n}var u=n.pathname&&"/"===n.pathname.charAt(0),c=t.host||t.pathname&&"/"===t.pathname.charAt(0),h=c||u||n.host&&t.pathname,p=h,d=n.pathname&&n.pathname.split("/")||[],i=t.pathname&&t.pathname.split("/")||[],g=n.protocol&&!S[n.protocol];

if(g&&(n.hostname="",n.port=null,n.host&&(""===d[0]?d[0]=n.host:d.unshift(n.host)),
n.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===i[0]?i[0]=t.host:i.unshift(t.host)),
t.host=null),h=h&&(""===i[0]||""===d[0])),c)n.host=t.host||""===t.host?t.host:n.host,
n.hostname=t.hostname||""===t.hostname?t.hostname:n.hostname,n.search=t.search,n.query=t.query,
d=i;else if(i.length)d||(d=[]),d.pop(),d=d.concat(i),n.search=t.search,n.query=t.query;
else if(!f(t.search)){if(g){n.hostname=n.host=d.shift();var v=n.host&&n.host.indexOf("@")>0?n.host.split("@"):!1;

v&&(n.auth=v.shift(),n.host=n.hostname=v.shift())}return n.search=t.search,n.query=t.query,
l(n.pathname)&&l(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),
n.href=n.format(),n}if(!d.length)return n.pathname=null,n.path=n.search?"/"+n.search:null,
n.href=n.format(),n;for(var m=d.slice(-1)[0],y=(n.host||t.host)&&("."===m||".."===m)||""===m,x=0,b=d.length;b>=0;b--)m=d[b],
"."==m?d.splice(b,1):".."===m?(d.splice(b,1),x++):x&&(d.splice(b,1),x--);if(!h&&!p)for(;x--;x)d.unshift("..");

!h||""===d[0]||d[0]&&"/"===d[0].charAt(0)||d.unshift(""),y&&"/"!==d.join("/").substr(-1)&&d.push("");

var w=""===d[0]||d[0]&&"/"===d[0].charAt(0);if(g){n.hostname=n.host=w?"":d.length?d.shift():"";

var v=n.host&&n.host.indexOf("@")>0?n.host.split("@"):!1;v&&(n.auth=v.shift(),n.host=n.hostname=v.shift());

}return h=h||n.host&&d.length,h&&!w&&d.unshift(""),d.length?n.pathname=d.join("/"):(n.pathname=null,
n.path=null),l(n.pathname)&&l(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),
n.auth=t.auth||n.auth,n.slashes=n.slashes||t.slashes,n.href=n.format(),n},r.prototype.parseHost=function(){
var t=this.host,e=d.exec(t);e&&(e=e[0],":"!==e&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),
t&&(this.hostname=t)}},{punycode:16,querystring:19}],21:[function(t,e,n){e.exports=function(t){
return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8;

}},{}],22:[function(t,e,n){(function(e,r){function i(t,e){var r={seen:[],stylize:a
};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),
g(e)?r.showHidden=e:e&&n._extend(r,e),w(r.showHidden)&&(r.showHidden=!1),w(r.depth)&&(r.depth=2),
w(r.colors)&&(r.colors=!1),w(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=o),
s(r,t,r.depth)}function o(t,e){var n=i.styles[e];return n?"["+i.colors[n][0]+"m"+t+"["+i.colors[n][1]+"m":t;

}function a(t,e){return t}function u(t){var e={};return t.forEach(function(t,n){e[t]=!0;

}),e}function s(t,e,r){if(t.customInspect&&e&&C(e.inspect)&&e.inspect!==n.inspect&&(!e.constructor||e.constructor.prototype!==e)){
var i=e.inspect(r,t);return x(i)||(i=s(t,i,r)),i}var o=c(t,e);if(o)return o;var a=Object.keys(e),g=u(a);

if(t.showHidden&&(a=Object.getOwnPropertyNames(e)),S(e)&&(a.indexOf("message")>=0||a.indexOf("description")>=0))return l(e);

if(0===a.length){if(C(e)){var v=e.name?": "+e.name:"";return t.stylize("[Function"+v+"]","special");

}if(M(e))return t.stylize(RegExp.prototype.toString.call(e),"regexp");if(_(e))return t.stylize(Date.prototype.toString.call(e),"date");

if(S(e))return l(e)}var m="",y=!1,b=["{","}"];if(d(e)&&(y=!0,b=["[","]"]),C(e)){var w=e.name?": "+e.name:"";

m=" [Function"+w+"]"}if(M(e)&&(m=" "+RegExp.prototype.toString.call(e)),_(e)&&(m=" "+Date.prototype.toUTCString.call(e)),
S(e)&&(m=" "+l(e)),0===a.length&&(!y||0==e.length))return b[0]+m+b[1];if(0>r)return M(e)?t.stylize(RegExp.prototype.toString.call(e),"regexp"):t.stylize("[Object]","special");

t.seen.push(e);var k;return k=y?f(t,e,r,g,a):a.map(function(n){return h(t,e,r,g,n,y);

}),t.seen.pop(),p(k,m,b)}function c(t,e){if(w(e))return t.stylize("undefined","undefined");

if(x(e)){var n="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";

return t.stylize(n,"string")}return y(e)?t.stylize(""+e,"number"):g(e)?t.stylize(""+e,"boolean"):v(e)?t.stylize("null","null"):void 0;

}function l(t){return"["+Error.prototype.toString.call(t)+"]"}function f(t,e,n,r,i){
for(var o=[],a=0,u=e.length;u>a;++a)o.push(j(e,String(a))?h(t,e,n,r,String(a),!0):"");

return i.forEach(function(i){i.match(/^\d+$/)||o.push(h(t,e,n,r,i,!0))}),o}function h(t,e,n,r,i,o){
var a,u,c;if(c=Object.getOwnPropertyDescriptor(e,i)||{value:e[i]},c.get?u=c.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):c.set&&(u=t.stylize("[Setter]","special")),
j(r,i)||(a="["+i+"]"),u||(t.seen.indexOf(c.value)<0?(u=v(n)?s(t,c.value,null):s(t,c.value,n-1),
u.indexOf("\n")>-1&&(u=o?u.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+u.split("\n").map(function(t){
return"   "+t}).join("\n"))):u=t.stylize("[Circular]","special")),w(a)){if(o&&i.match(/^\d+$/))return u;

a=JSON.stringify(""+i),a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(a=a.substr(1,a.length-2),
a=t.stylize(a,"name")):(a=a.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),
a=t.stylize(a,"string"))}return a+": "+u}function p(t,e,n){var r=0,i=t.reduce(function(t,e){
return r++,e.indexOf("\n")>=0&&r++,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0);

return i>60?n[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+n[1]:n[0]+e+" "+t.join(", ")+" "+n[1];

}function d(t){return Array.isArray(t)}function g(t){return"boolean"==typeof t}function v(t){
return null===t}function m(t){return null==t}function y(t){return"number"==typeof t;

}function x(t){return"string"==typeof t}function b(t){return"symbol"==typeof t}function w(t){
return void 0===t}function M(t){return k(t)&&"[object RegExp]"===T(t)}function k(t){
return"object"==typeof t&&null!==t}function _(t){return k(t)&&"[object Date]"===T(t);

}function S(t){return k(t)&&("[object Error]"===T(t)||t instanceof Error)}function C(t){
return"function"==typeof t}function E(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||"undefined"==typeof t;

}function T(t){return Object.prototype.toString.call(t)}function A(t){return 10>t?"0"+t.toString(10):t.toString(10);

}function N(){var t=new Date,e=[A(t.getHours()),A(t.getMinutes()),A(t.getSeconds())].join(":");

return[t.getDate(),O[t.getMonth()],e].join(" ")}function j(t,e){return Object.prototype.hasOwnProperty.call(t,e);

}var q=/%[sdj%]/g;n.format=function(t){if(!x(t)){for(var e=[],n=0;n<arguments.length;n++)e.push(i(arguments[n]));

return e.join(" ")}for(var n=1,r=arguments,o=r.length,a=String(t).replace(q,function(t){
if("%%"===t)return"%";if(n>=o)return t;switch(t){case"%s":return String(r[n++]);case"%d":
return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(e){return"[Circular]";

}default:return t}}),u=r[n];o>n;u=r[++n])a+=v(u)||!k(u)?" "+u:" "+i(u);return a},
n.deprecate=function(t,i){function o(){if(!a){if(e.throwDeprecation)throw new Error(i);

e.traceDeprecation?console.trace(i):console.error(i),a=!0}return t.apply(this,arguments);

}if(w(r.process))return function(){return n.deprecate(t,i).apply(this,arguments)};

if(e.noDeprecation===!0)return t;var a=!1;return o};var D,L={};n.debuglog=function(t){
if(w(D)&&(D=e.env.NODE_DEBUG||""),t=t.toUpperCase(),!L[t])if(new RegExp("\\b"+t+"\\b","i").test(D)){
var r=e.pid;L[t]=function(){var e=n.format.apply(n,arguments);console.error("%s %d: %s",t,r,e);

}}else L[t]=function(){};return L[t]},n.inspect=i,i.colors={bold:[1,22],italic:[3,23],
underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],
cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},i.styles={
special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",
string:"green",date:"magenta",regexp:"red"},n.isArray=d,n.isBoolean=g,n.isNull=v,
n.isNullOrUndefined=m,n.isNumber=y,n.isString=x,n.isSymbol=b,n.isUndefined=w,n.isRegExp=M,
n.isObject=k,n.isDate=_,n.isError=S,n.isFunction=C,n.isPrimitive=E,n.isBuffer=t("./support/isBuffer");

var O=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];n.log=function(){
console.log("%s - %s",N(),n.format.apply(n,arguments))},n.inherits=t("inherits"),
n._extend=function(t,e){if(!e||!k(e))return t;for(var n=Object.keys(e),r=n.length;r--;)t[n[r]]=e[n[r]];

return t}}).call(this,t("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});

},{"./support/isBuffer":21,_process:15,inherits:14}],23:[function(t,e,n){!function(){
function t(t){return t&&(t.ownerDocument||t.document||t).documentElement}function n(t){
return t&&(t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView);

}function r(t,e){return e>t?-1:t>e?1:t>=e?0:0/0}function i(t){return null===t?0/0:+t;

}function o(t){return!isNaN(t)}function a(t){return{left:function(e,n,r,i){for(arguments.length<3&&(r=0),
arguments.length<4&&(i=e.length);i>r;){var o=r+i>>>1;t(e[o],n)<0?r=o+1:i=o}return r;

},right:function(e,n,r,i){for(arguments.length<3&&(r=0),arguments.length<4&&(i=e.length);i>r;){
var o=r+i>>>1;t(e[o],n)>0?i=o:r=o+1}return r}}}function u(t){return t.length}function s(t){
for(var e=1;t*e%1;)e*=10;return e}function c(t,e){for(var n in e)Object.defineProperty(t.prototype,n,{
value:e[n],enumerable:!1})}function l(){this._=Object.create(null)}function f(t){
return(t+="")===va||t[0]===ma?ma+t:t}function h(t){return(t+="")[0]===ma?t.slice(1):t;

}function p(t){return f(t)in this._}function d(t){return(t=f(t))in this._&&delete this._[t];

}function g(){var t=[];for(var e in this._)t.push(h(e));return t}function v(){var t=0;

for(var e in this._)++t;return t}function m(){for(var t in this._)return!1;return!0;

}function y(){this._=Object.create(null)}function x(t){return t}function b(t,e,n){
return function(){var r=n.apply(e,arguments);return r===e?t:r}}function w(t,e){if(e in t)return e;

e=e.charAt(0).toUpperCase()+e.slice(1);for(var n=0,r=ya.length;r>n;++n){var i=ya[n]+e;

if(i in t)return i}}function M(){}function k(){}function _(t){function e(){for(var e,r=n,i=-1,o=r.length;++i<o;)(e=r[i].on)&&e.apply(this,arguments);

return t}var n=[],r=new l;return e.on=function(e,i){var o,a=r.get(e);return arguments.length<2?a&&a.on:(a&&(a.on=null,
n=n.slice(0,o=n.indexOf(a)).concat(n.slice(o+1)),r.remove(e)),i&&n.push(r.set(e,{
on:i})),t)},e}function S(){ra.event.preventDefault()}function C(){for(var t,e=ra.event;t=e.sourceEvent;)e=t;

return e}function E(t){for(var e=new k,n=0,r=arguments.length;++n<r;)e[arguments[n]]=_(e);

return e.of=function(n,r){return function(i){try{var o=i.sourceEvent=ra.event;i.target=t,
ra.event=i,e[i.type].apply(n,r)}finally{ra.event=o}}},e}function T(t){return ba(t,_a),
t}function A(t){return"function"==typeof t?t:function(){return wa(t,this)}}function N(t){
return"function"==typeof t?t:function(){return Ma(t,this)}}function j(t,e){function n(){
this.removeAttribute(t)}function r(){this.removeAttributeNS(t.space,t.local)}function i(){
this.setAttribute(t,e)}function o(){this.setAttributeNS(t.space,t.local,e)}function a(){
var n=e.apply(this,arguments);null==n?this.removeAttribute(t):this.setAttribute(t,n);

}function u(){var n=e.apply(this,arguments);null==n?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,n);

}return t=ra.ns.qualify(t),null==e?t.local?r:n:"function"==typeof e?t.local?u:a:t.local?o:i;

}function q(t){return t.trim().replace(/\s+/g," ")}function D(t){return new RegExp("(?:^|\\s+)"+ra.requote(t)+"(?:\\s+|$)","g");

}function L(t){return(t+"").trim().split(/^|\s+/)}function O(t,e){function n(){for(var n=-1;++n<i;)t[n](this,e);

}function r(){for(var n=-1,r=e.apply(this,arguments);++n<i;)t[n](this,r)}t=L(t).map(R);

var i=t.length;return"function"==typeof e?r:n}function R(t){var e=D(t);return function(n,r){
if(i=n.classList)return r?i.add(t):i.remove(t);var i=n.getAttribute("class")||"";
r?(e.lastIndex=0,e.test(i)||n.setAttribute("class",q(i+" "+t))):n.setAttribute("class",q(i.replace(e," ")));

}}function z(t,e,n){function r(){this.style.removeProperty(t)}function i(){this.style.setProperty(t,e,n);

}function o(){var r=e.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,n);

}return null==e?r:"function"==typeof e?o:i}function P(t,e){function n(){delete this[t];

}function r(){this[t]=e}function i(){var n=e.apply(this,arguments);null==n?delete this[t]:this[t]=n;

}return null==e?n:"function"==typeof e?i:r}function H(t){function e(){var e=this.ownerDocument,n=this.namespaceURI;

return n?e.createElementNS(n,t):e.createElement(t)}function n(){return this.ownerDocument.createElementNS(t.space,t.local);

}return"function"==typeof t?t:(t=ra.ns.qualify(t)).local?n:e}function F(){var t=this.parentNode;

t&&t.removeChild(this)}function I(t){return{__data__:t}}function U(t){return function(){
return ka(this,t)}}function $(t){return arguments.length||(t=r),function(e,n){return e&&n?t(e.__data__,n.__data__):!e-!n;

}}function B(t,e){for(var n=0,r=t.length;r>n;n++)for(var i,o=t[n],a=0,u=o.length;u>a;a++)(i=o[a])&&e(i,a,n);

return t}function W(t){return ba(t,Ca),t}function Y(t){var e,n;return function(r,i,o){
var a,u=t[o].update,s=u.length;for(o!=n&&(n=o,e=0),i>=e&&(e=i+1);!(a=u[e])&&++e<s;);
return a}}function X(t,e,n){function r(){var e=this[a];e&&(this.removeEventListener(t,e,e.$),
delete this[a])}function i(){var i=s(e,oa(arguments));r.call(this),this.addEventListener(t,this[a]=i,i.$=n),
i._=e}function o(){var e,n=new RegExp("^__on([^.]+)"+ra.requote(t)+"$");for(var r in this)if(e=r.match(n)){
var i=this[r];this.removeEventListener(e[1],i,i.$),delete this[r]}}var a="__on"+t,u=t.indexOf("."),s=V;

u>0&&(t=t.slice(0,u));var c=Ea.get(t);return c&&(t=c,s=Z),u?e?i:r:e?M:o}function V(t,e){
return function(n){var r=ra.event;ra.event=n,e[0]=this.__data__;try{t.apply(this,e);

}finally{ra.event=r}}}function Z(t,e){var n=V(t,e);return function(t){var e=this,r=t.relatedTarget;

r&&(r===e||8&r.compareDocumentPosition(e))||n.call(e,t)}}function J(e){var r=".dragsuppress-"+ ++Aa,i="click"+r,o=ra.select(n(e)).on("touchmove"+r,S).on("dragstart"+r,S).on("selectstart"+r,S);

if(null==Ta&&(Ta="onselectstart"in e?!1:w(e.style,"userSelect")),Ta){var a=t(e).style,u=a[Ta];

a[Ta]="none"}return function(t){if(o.on(r,null),Ta&&(a[Ta]=u),t){var e=function(){
o.on(i,null)};o.on(i,function(){S(),e()},!0),setTimeout(e,0)}}}function G(t,e){e.changedTouches&&(e=e.changedTouches[0]);

var r=t.ownerSVGElement||t;if(r.createSVGPoint){var i=r.createSVGPoint();if(0>Na){
var o=n(t);if(o.scrollX||o.scrollY){r=ra.select("body").append("svg").style({position:"absolute",
top:0,left:0,margin:0,padding:0,border:"none"},"important");var a=r[0][0].getScreenCTM();

Na=!(a.f||a.e),r.remove()}}return Na?(i.x=e.pageX,i.y=e.pageY):(i.x=e.clientX,i.y=e.clientY),
i=i.matrixTransform(t.getScreenCTM().inverse()),[i.x,i.y]}var u=t.getBoundingClientRect();

return[e.clientX-u.left-t.clientLeft,e.clientY-u.top-t.clientTop]}function K(){return ra.event.changedTouches[0].identifier;

}function Q(t){return t>0?1:0>t?-1:0}function tt(t,e,n){return(e[0]-t[0])*(n[1]-t[1])-(e[1]-t[1])*(n[0]-t[0]);

}function et(t){return t>1?0:-1>t?Da:Math.acos(t)}function nt(t){return t>1?Ra:-1>t?-Ra:Math.asin(t);

}function rt(t){return((t=Math.exp(t))-1/t)/2}function it(t){return((t=Math.exp(t))+1/t)/2;

}function ot(t){return((t=Math.exp(2*t))-1)/(t+1)}function at(t){return(t=Math.sin(t/2))*t;

}function ut(){}function st(t,e,n){return this instanceof st?(this.h=+t,this.s=+e,
void(this.l=+n)):arguments.length<2?t instanceof st?new st(t.h,t.s,t.l):Mt(""+t,kt,st):new st(t,e,n);

}function ct(t,e,n){function r(t){return t>360?t-=360:0>t&&(t+=360),60>t?o+(a-o)*t/60:180>t?a:240>t?o+(a-o)*(240-t)/60:o;

}function i(t){return Math.round(255*r(t))}var o,a;return t=isNaN(t)?0:(t%=360)<0?t+360:t,
e=isNaN(e)?0:0>e?0:e>1?1:e,n=0>n?0:n>1?1:n,a=.5>=n?n*(1+e):n+e-n*e,o=2*n-a,new yt(i(t+120),i(t),i(t-120));

}function lt(t,e,n){return this instanceof lt?(this.h=+t,this.c=+e,void(this.l=+n)):arguments.length<2?t instanceof lt?new lt(t.h,t.c,t.l):t instanceof ht?dt(t.l,t.a,t.b):dt((t=_t((t=ra.rgb(t)).r,t.g,t.b)).l,t.a,t.b):new lt(t,e,n);

}function ft(t,e,n){return isNaN(t)&&(t=0),isNaN(e)&&(e=0),new ht(n,Math.cos(t*=za)*e,Math.sin(t)*e);

}function ht(t,e,n){return this instanceof ht?(this.l=+t,this.a=+e,void(this.b=+n)):arguments.length<2?t instanceof ht?new ht(t.l,t.a,t.b):t instanceof lt?ft(t.h,t.c,t.l):_t((t=yt(t)).r,t.g,t.b):new ht(t,e,n);

}function pt(t,e,n){var r=(t+16)/116,i=r+e/500,o=r-n/200;return i=gt(i)*Va,r=gt(r)*Za,
o=gt(o)*Ja,new yt(mt(3.2404542*i-1.5371385*r-.4985314*o),mt(-.969266*i+1.8760108*r+.041556*o),mt(.0556434*i-.2040259*r+1.0572252*o));

}function dt(t,e,n){return t>0?new lt(Math.atan2(n,e)*Pa,Math.sqrt(e*e+n*n),t):new lt(0/0,0/0,t);

}function gt(t){return t>.206893034?t*t*t:(t-4/29)/7.787037}function vt(t){return t>.008856?Math.pow(t,1/3):7.787037*t+4/29;

}function mt(t){return Math.round(255*(.00304>=t?12.92*t:1.055*Math.pow(t,1/2.4)-.055));

}function yt(t,e,n){return this instanceof yt?(this.r=~~t,this.g=~~e,void(this.b=~~n)):arguments.length<2?t instanceof yt?new yt(t.r,t.g,t.b):Mt(""+t,yt,ct):new yt(t,e,n);

}function xt(t){return new yt(t>>16,t>>8&255,255&t)}function bt(t){return xt(t)+"";

}function wt(t){return 16>t?"0"+Math.max(0,t).toString(16):Math.min(255,t).toString(16);

}function Mt(t,e,n){t=t.toLowerCase();var r,i,o,a=0,u=0,s=0;if(r=/([a-z]+)\((.*)\)/.exec(t))switch(i=r[2].split(","),
r[1]){case"hsl":return n(parseFloat(i[0]),parseFloat(i[1])/100,parseFloat(i[2])/100);

case"rgb":return e(Ct(i[0]),Ct(i[1]),Ct(i[2]))}return(o=Qa.get(t))?e(o.r,o.g,o.b):(null==t||"#"!==t.charAt(0)||isNaN(o=parseInt(t.slice(1),16))||(4===t.length?(a=(3840&o)>>4,
a=a>>4|a,u=240&o,u=u>>4|u,s=15&o,s=s<<4|s):7===t.length&&(a=(16711680&o)>>16,u=(65280&o)>>8,
s=255&o)),e(a,u,s))}function kt(t,e,n){var r,i,o=Math.min(t/=255,e/=255,n/=255),a=Math.max(t,e,n),u=a-o,s=(a+o)/2;

return u?(i=.5>s?u/(a+o):u/(2-a-o),r=t==a?(e-n)/u+(n>e?6:0):e==a?(n-t)/u+2:(t-e)/u+4,
r*=60):(r=0/0,i=s>0&&1>s?0:r),new st(r,i,s)}function _t(t,e,n){t=St(t),e=St(e),n=St(n);

var r=vt((.4124564*t+.3575761*e+.1804375*n)/Va),i=vt((.2126729*t+.7151522*e+.072175*n)/Za),o=vt((.0193339*t+.119192*e+.9503041*n)/Ja);

return ht(116*i-16,500*(r-i),200*(i-o))}function St(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4);

}function Ct(t){var e=parseFloat(t);return"%"===t.charAt(t.length-1)?Math.round(2.55*e):e;

}function Et(t){return"function"==typeof t?t:function(){return t}}function Tt(t){
return function(e,n,r){return 2===arguments.length&&"function"==typeof n&&(r=n,n=null),
At(e,n,t,r)}}function At(t,e,n,r){function i(){var t,e=s.status;if(!e&&jt(s)||e>=200&&300>e||304===e){
try{t=n.call(o,s)}catch(r){return void a.error.call(o,r)}a.load.call(o,t)}else a.error.call(o,s);

}var o={},a=ra.dispatch("beforesend","progress","load","error"),u={},s=new XMLHttpRequest,c=null;

return!this.XDomainRequest||"withCredentials"in s||!/^(http(s)?:)?\/\//.test(t)||(s=new XDomainRequest),
"onload"in s?s.onload=s.onerror=i:s.onreadystatechange=function(){s.readyState>3&&i();

},s.onprogress=function(t){var e=ra.event;ra.event=t;try{a.progress.call(o,s)}finally{
ra.event=e}},o.header=function(t,e){return t=(t+"").toLowerCase(),arguments.length<2?u[t]:(null==e?delete u[t]:u[t]=e+"",
o)},o.mimeType=function(t){return arguments.length?(e=null==t?null:t+"",o):e},o.responseType=function(t){
return arguments.length?(c=t,o):c},o.response=function(t){return n=t,o},["get","post"].forEach(function(t){
o[t]=function(){return o.send.apply(o,[t].concat(oa(arguments)))}}),o.send=function(n,r,i){
if(2===arguments.length&&"function"==typeof r&&(i=r,r=null),s.open(n,t,!0),null==e||"accept"in u||(u.accept=e+",*/*"),
s.setRequestHeader)for(var l in u)s.setRequestHeader(l,u[l]);return null!=e&&s.overrideMimeType&&s.overrideMimeType(e),
null!=c&&(s.responseType=c),null!=i&&o.on("error",i).on("load",function(t){i(null,t);

}),a.beforesend.call(o,s),s.send(null==r?null:r),o},o.abort=function(){return s.abort(),
o},ra.rebind(o,a,"on"),null==r?o:o.get(Nt(r))}function Nt(t){return 1===t.length?function(e,n){
t(null==e?n:null)}:t}function jt(t){var e=t.responseType;return e&&"text"!==e?t.response:t.responseText;

}function qt(){var t=Dt(),e=Lt()-t;e>24?(isFinite(e)&&(clearTimeout(ru),ru=setTimeout(qt,e)),
nu=0):(nu=1,ou(qt))}function Dt(){var t=Date.now();for(iu=tu;iu;)t>=iu.t&&(iu.f=iu.c(t-iu.t)),
iu=iu.n;return t}function Lt(){for(var t,e=tu,n=1/0;e;)e.f?e=t?t.n=e.n:tu=e.n:(e.t<n&&(n=e.t),
e=(t=e).n);return eu=t,n}function Ot(t,e){return e-(t?Math.ceil(Math.log(t)/Math.LN10):1);

}function Rt(t,e){var n=Math.pow(10,3*ga(8-e));return{scale:e>8?function(t){return t/n;

}:function(t){return t*n},symbol:t}}function zt(t){var e=t.decimal,n=t.thousands,r=t.grouping,i=t.currency,o=r&&n?function(t,e){
for(var i=t.length,o=[],a=0,u=r[0],s=0;i>0&&u>0&&(s+u+1>e&&(u=Math.max(1,e-s)),o.push(t.substring(i-=u,i+u)),
!((s+=u+1)>e));)u=r[a=(a+1)%r.length];return o.reverse().join(n)}:x;return function(t){
var n=uu.exec(t),r=n[1]||" ",a=n[2]||">",u=n[3]||"-",s=n[4]||"",c=n[5],l=+n[6],f=n[7],h=n[8],p=n[9],d=1,g="",v="",m=!1,y=!0;

switch(h&&(h=+h.substring(1)),(c||"0"===r&&"="===a)&&(c=r="0",a="="),p){case"n":f=!0,
p="g";break;case"%":d=100,v="%",p="f";break;case"p":d=100,v="%",p="r";break;case"b":
case"o":case"x":case"X":"#"===s&&(g="0"+p.toLowerCase());case"c":y=!1;case"d":m=!0,
h=0;break;case"s":d=-1,p="r"}"$"===s&&(g=i[0],v=i[1]),"r"!=p||h||(p="g"),null!=h&&("g"==p?h=Math.max(1,Math.min(21,h)):("e"==p||"f"==p)&&(h=Math.max(0,Math.min(20,h)))),
p=su.get(p)||Pt;var x=c&&f;return function(t){var n=v;if(m&&t%1)return"";var i=0>t||0===t&&0>1/t?(t=-t,
"-"):"-"===u?"":u;if(0>d){var s=ra.formatPrefix(t,h);t=s.scale(t),n=s.symbol+v}else t*=d;

t=p(t,h);var b,w,M=t.lastIndexOf(".");if(0>M){var k=y?t.lastIndexOf("e"):-1;0>k?(b=t,
w=""):(b=t.substring(0,k),w=t.substring(k))}else b=t.substring(0,M),w=e+t.substring(M+1);

!c&&f&&(b=o(b,1/0));var _=g.length+b.length+w.length+(x?0:i.length),S=l>_?new Array(_=l-_+1).join(r):"";

return x&&(b=o(S+b,S.length?l-w.length:1/0)),i+=g,t=b+w,("<"===a?i+t+S:">"===a?S+i+t:"^"===a?S.substring(0,_>>=1)+i+t+S.substring(_):i+(x?t:S+t))+n;

}}}function Pt(t){return t+""}function Ht(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0]);

}function Ft(t,e,n){function r(e){var n=t(e),r=o(n,1);return r-e>e-n?n:r}function i(n){
return e(n=t(new lu(n-1)),1),n}function o(t,n){return e(t=new lu(+t),n),t}function a(t,r,o){
var a=i(t),u=[];if(o>1)for(;r>a;)n(a)%o||u.push(new Date(+a)),e(a,1);else for(;r>a;)u.push(new Date(+a)),
e(a,1);return u}function u(t,e,n){try{lu=Ht;var r=new Ht;return r._=t,a(r,e,n)}finally{
lu=Date}}t.floor=t,t.round=r,t.ceil=i,t.offset=o,t.range=a;var s=t.utc=It(t);return s.floor=s,
s.round=It(r),s.ceil=It(i),s.offset=It(o),s.range=u,t}function It(t){return function(e,n){
try{lu=Ht;var r=new Ht;return r._=e,t(r,n)._}finally{lu=Date}}}function Ut(t){function e(t){
function e(e){for(var n,i,o,a=[],u=-1,s=0;++u<r;)37===t.charCodeAt(u)&&(a.push(t.slice(s,u)),
null!=(i=hu[n=t.charAt(++u)])&&(n=t.charAt(++u)),(o=T[n])&&(n=o(e,null==i?"e"===n?" ":"0":i)),
a.push(n),s=u+1);return a.push(t.slice(s,u)),a.join("")}var r=t.length;return e.parse=function(e){
var r={y:1900,m:0,d:1,H:0,M:0,S:0,L:0,Z:null},i=n(r,t,e,0);if(i!=e.length)return null;

"p"in r&&(r.H=r.H%12+12*r.p);var o=null!=r.Z&&lu!==Ht,a=new(o?Ht:lu);return"j"in r?a.setFullYear(r.y,0,r.j):"w"in r&&("W"in r||"U"in r)?(a.setFullYear(r.y,0,1),
a.setFullYear(r.y,0,"W"in r?(r.w+6)%7+7*r.W-(a.getDay()+5)%7:r.w+7*r.U-(a.getDay()+6)%7)):a.setFullYear(r.y,r.m,r.d),
a.setHours(r.H+(r.Z/100|0),r.M+r.Z%100,r.S,r.L),o?a._:a},e.toString=function(){return t;

},e}function n(t,e,n,r){for(var i,o,a,u=0,s=e.length,c=n.length;s>u;){if(r>=c)return-1;

if(i=e.charCodeAt(u++),37===i){if(a=e.charAt(u++),o=A[a in hu?e.charAt(u++):a],!o||(r=o(t,n,r))<0)return-1;

}else if(i!=n.charCodeAt(r++))return-1}return r}function r(t,e,n){M.lastIndex=0;var r=M.exec(e.slice(n));

return r?(t.w=k.get(r[0].toLowerCase()),n+r[0].length):-1}function i(t,e,n){b.lastIndex=0;

var r=b.exec(e.slice(n));return r?(t.w=w.get(r[0].toLowerCase()),n+r[0].length):-1;

}function o(t,e,n){C.lastIndex=0;var r=C.exec(e.slice(n));return r?(t.m=E.get(r[0].toLowerCase()),
n+r[0].length):-1}function a(t,e,n){_.lastIndex=0;var r=_.exec(e.slice(n));return r?(t.m=S.get(r[0].toLowerCase()),
n+r[0].length):-1}function u(t,e,r){return n(t,T.c.toString(),e,r)}function s(t,e,r){
return n(t,T.x.toString(),e,r)}function c(t,e,r){return n(t,T.X.toString(),e,r)}function l(t,e,n){
var r=x.get(e.slice(n,n+=2).toLowerCase());return null==r?-1:(t.p=r,n)}var f=t.dateTime,h=t.date,p=t.time,d=t.periods,g=t.days,v=t.shortDays,m=t.months,y=t.shortMonths;

e.utc=function(t){function n(t){try{lu=Ht;var e=new lu;return e._=t,r(e)}finally{
lu=Date}}var r=e(t);return n.parse=function(t){try{lu=Ht;var e=r.parse(t);return e&&e._;

}finally{lu=Date}},n.toString=r.toString,n},e.multi=e.utc.multi=se;var x=ra.map(),b=Bt(g),w=Wt(g),M=Bt(v),k=Wt(v),_=Bt(m),S=Wt(m),C=Bt(y),E=Wt(y);

d.forEach(function(t,e){x.set(t.toLowerCase(),e)});var T={a:function(t){return v[t.getDay()];

},A:function(t){return g[t.getDay()]},b:function(t){return y[t.getMonth()]},B:function(t){
return m[t.getMonth()]},c:e(f),d:function(t,e){return $t(t.getDate(),e,2)},e:function(t,e){
return $t(t.getDate(),e,2)},H:function(t,e){return $t(t.getHours(),e,2)},I:function(t,e){
return $t(t.getHours()%12||12,e,2)},j:function(t,e){return $t(1+cu.dayOfYear(t),e,3);

},L:function(t,e){return $t(t.getMilliseconds(),e,3)},m:function(t,e){return $t(t.getMonth()+1,e,2);

},M:function(t,e){return $t(t.getMinutes(),e,2)},p:function(t){return d[+(t.getHours()>=12)];

},S:function(t,e){return $t(t.getSeconds(),e,2)},U:function(t,e){return $t(cu.sundayOfYear(t),e,2);

},w:function(t){return t.getDay()},W:function(t,e){return $t(cu.mondayOfYear(t),e,2);

},x:e(h),X:e(p),y:function(t,e){return $t(t.getFullYear()%100,e,2)},Y:function(t,e){
return $t(t.getFullYear()%1e4,e,4)},Z:ae,"%":function(){return"%"}},A={a:r,A:i,b:o,
B:a,c:u,d:te,e:te,H:ne,I:ne,j:ee,L:oe,m:Qt,M:re,p:l,S:ie,U:Xt,w:Yt,W:Vt,x:s,X:c,y:Jt,
Y:Zt,Z:Gt,"%":ue};return e}function $t(t,e,n){var r=0>t?"-":"",i=(r?-t:t)+"",o=i.length;

return r+(n>o?new Array(n-o+1).join(e)+i:i)}function Bt(t){return new RegExp("^(?:"+t.map(ra.requote).join("|")+")","i");

}function Wt(t){for(var e=new l,n=-1,r=t.length;++n<r;)e.set(t[n].toLowerCase(),n);

return e}function Yt(t,e,n){pu.lastIndex=0;var r=pu.exec(e.slice(n,n+1));return r?(t.w=+r[0],
n+r[0].length):-1}function Xt(t,e,n){pu.lastIndex=0;var r=pu.exec(e.slice(n));return r?(t.U=+r[0],
n+r[0].length):-1}function Vt(t,e,n){pu.lastIndex=0;var r=pu.exec(e.slice(n));return r?(t.W=+r[0],
n+r[0].length):-1}function Zt(t,e,n){pu.lastIndex=0;var r=pu.exec(e.slice(n,n+4));

return r?(t.y=+r[0],n+r[0].length):-1}function Jt(t,e,n){pu.lastIndex=0;var r=pu.exec(e.slice(n,n+2));

return r?(t.y=Kt(+r[0]),n+r[0].length):-1}function Gt(t,e,n){return/^[+-]\d{4}$/.test(e=e.slice(n,n+5))?(t.Z=-e,
n+5):-1}function Kt(t){return t+(t>68?1900:2e3)}function Qt(t,e,n){pu.lastIndex=0;

var r=pu.exec(e.slice(n,n+2));return r?(t.m=r[0]-1,n+r[0].length):-1}function te(t,e,n){
pu.lastIndex=0;var r=pu.exec(e.slice(n,n+2));return r?(t.d=+r[0],n+r[0].length):-1;

}function ee(t,e,n){pu.lastIndex=0;var r=pu.exec(e.slice(n,n+3));return r?(t.j=+r[0],
n+r[0].length):-1}function ne(t,e,n){pu.lastIndex=0;var r=pu.exec(e.slice(n,n+2));

return r?(t.H=+r[0],n+r[0].length):-1}function re(t,e,n){pu.lastIndex=0;var r=pu.exec(e.slice(n,n+2));

return r?(t.M=+r[0],n+r[0].length):-1}function ie(t,e,n){pu.lastIndex=0;var r=pu.exec(e.slice(n,n+2));

return r?(t.S=+r[0],n+r[0].length):-1}function oe(t,e,n){pu.lastIndex=0;var r=pu.exec(e.slice(n,n+3));

return r?(t.L=+r[0],n+r[0].length):-1}function ae(t){var e=t.getTimezoneOffset(),n=e>0?"-":"+",r=ga(e)/60|0,i=ga(e)%60;

return n+$t(r,"0",2)+$t(i,"0",2)}function ue(t,e,n){du.lastIndex=0;var r=du.exec(e.slice(n,n+1));

return r?n+r[0].length:-1}function se(t){for(var e=t.length,n=-1;++n<e;)t[n][0]=this(t[n][0]);

return function(e){for(var n=0,r=t[n];!r[1](e);)r=t[++n];return r[0](e)}}function ce(){}
function le(t,e,n){var r=n.s=t+e,i=r-t,o=r-i;n.t=t-o+(e-i)}function fe(t,e){t&&yu.hasOwnProperty(t.type)&&yu[t.type](t,e);

}function he(t,e,n){var r,i=-1,o=t.length-n;for(e.lineStart();++i<o;)r=t[i],e.point(r[0],r[1],r[2]);

e.lineEnd()}function pe(t,e){var n=-1,r=t.length;for(e.polygonStart();++n<r;)he(t[n],e,1);

e.polygonEnd()}function de(){function t(t,e){t*=za,e=e*za/2+Da/4;var n=t-r,a=n>=0?1:-1,u=a*n,s=Math.cos(e),c=Math.sin(e),l=o*c,f=i*s+l*Math.cos(u),h=l*a*Math.sin(u);

bu.add(Math.atan2(h,f)),r=t,i=s,o=c}var e,n,r,i,o;wu.point=function(a,u){wu.point=t,
r=(e=a)*za,i=Math.cos(u=(n=u)*za/2+Da/4),o=Math.sin(u)},wu.lineEnd=function(){t(e,n);

}}function ge(t){var e=t[0],n=t[1],r=Math.cos(n);return[r*Math.cos(e),r*Math.sin(e),Math.sin(n)];

}function ve(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function me(t,e){return[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]];

}function ye(t,e){t[0]+=e[0],t[1]+=e[1],t[2]+=e[2]}function xe(t,e){return[t[0]*e,t[1]*e,t[2]*e];

}function be(t){var e=Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=e,t[1]/=e,t[2]/=e;

}function we(t){return[Math.atan2(t[1],t[0]),nt(t[2])]}function Me(t,e){return ga(t[0]-e[0])<ja&&ga(t[1]-e[1])<ja;

}function ke(t,e){t*=za;var n=Math.cos(e*=za);_e(n*Math.cos(t),n*Math.sin(t),Math.sin(e));

}function _e(t,e,n){++Mu,_u+=(t-_u)/Mu,Su+=(e-Su)/Mu,Cu+=(n-Cu)/Mu}function Se(){
function t(t,i){t*=za;var o=Math.cos(i*=za),a=o*Math.cos(t),u=o*Math.sin(t),s=Math.sin(i),c=Math.atan2(Math.sqrt((c=n*s-r*u)*c+(c=r*a-e*s)*c+(c=e*u-n*a)*c),e*a+n*u+r*s);

ku+=c,Eu+=c*(e+(e=a)),Tu+=c*(n+(n=u)),Au+=c*(r+(r=s)),_e(e,n,r)}var e,n,r;Du.point=function(i,o){
i*=za;var a=Math.cos(o*=za);e=a*Math.cos(i),n=a*Math.sin(i),r=Math.sin(o),Du.point=t,
_e(e,n,r)}}function Ce(){Du.point=ke}function Ee(){function t(t,e){t*=za;var n=Math.cos(e*=za),a=n*Math.cos(t),u=n*Math.sin(t),s=Math.sin(e),c=i*s-o*u,l=o*a-r*s,f=r*u-i*a,h=Math.sqrt(c*c+l*l+f*f),p=r*a+i*u+o*s,d=h&&-et(p)/h,g=Math.atan2(h,p);

Nu+=d*c,ju+=d*l,qu+=d*f,ku+=g,Eu+=g*(r+(r=a)),Tu+=g*(i+(i=u)),Au+=g*(o+(o=s)),_e(r,i,o);

}var e,n,r,i,o;Du.point=function(a,u){e=a,n=u,Du.point=t,a*=za;var s=Math.cos(u*=za);

r=s*Math.cos(a),i=s*Math.sin(a),o=Math.sin(u),_e(r,i,o)},Du.lineEnd=function(){t(e,n),
Du.lineEnd=Ce,Du.point=ke}}function Te(t,e){function n(n,r){return n=t(n,r),e(n[0],n[1]);

}return t.invert&&e.invert&&(n.invert=function(n,r){return n=e.invert(n,r),n&&t.invert(n[0],n[1]);

}),n}function Ae(){return!0}function Ne(t,e,n,r,i){var o=[],a=[];if(t.forEach(function(t){
if(!((e=t.length-1)<=0)){var e,n=t[0],r=t[e];if(Me(n,r)){i.lineStart();for(var u=0;e>u;++u)i.point((n=t[u])[0],n[1]);

return void i.lineEnd()}var s=new qe(n,t,null,!0),c=new qe(n,null,s,!1);s.o=c,o.push(s),
a.push(c),s=new qe(r,t,null,!1),c=new qe(r,null,s,!0),s.o=c,o.push(s),a.push(c)}}),
a.sort(e),je(o),je(a),o.length){for(var u=0,s=n,c=a.length;c>u;++u)a[u].e=s=!s;for(var l,f,h=o[0];;){
for(var p=h,d=!0;p.v;)if((p=p.n)===h)return;l=p.z,i.lineStart();do{if(p.v=p.o.v=!0,
p.e){if(d)for(var u=0,c=l.length;c>u;++u)i.point((f=l[u])[0],f[1]);else r(p.x,p.n.x,1,i);

p=p.n}else{if(d){l=p.p.z;for(var u=l.length-1;u>=0;--u)i.point((f=l[u])[0],f[1])}else r(p.x,p.p.x,-1,i);

p=p.p}p=p.o,l=p.z,d=!d}while(!p.v);i.lineEnd()}}}function je(t){if(e=t.length){for(var e,n,r=0,i=t[0];++r<e;)i.n=n=t[r],
n.p=i,i=n;i.n=n=t[0],n.p=i}}function qe(t,e,n,r){this.x=t,this.z=e,this.o=n,this.e=r,
this.v=!1,this.n=this.p=null}function De(t,e,n,r){return function(i,o){function a(e,n){
var r=i(e,n);t(e=r[0],n=r[1])&&o.point(e,n)}function u(t,e){var n=i(t,e);v.point(n[0],n[1]);

}function s(){y.point=u,v.lineStart()}function c(){y.point=a,v.lineEnd()}function l(t,e){
g.push([t,e]);var n=i(t,e);b.point(n[0],n[1])}function f(){b.lineStart(),g=[]}function h(){
l(g[0][0],g[0][1]),b.lineEnd();var t,e=b.clean(),n=x.buffer(),r=n.length;if(g.pop(),
d.push(g),g=null,r)if(1&e){t=n[0];var i,r=t.length-1,a=-1;if(r>0){for(w||(o.polygonStart(),
w=!0),o.lineStart();++a<r;)o.point((i=t[a])[0],i[1]);o.lineEnd()}}else r>1&&2&e&&n.push(n.pop().concat(n.shift())),
p.push(n.filter(Le))}var p,d,g,v=e(o),m=i.invert(r[0],r[1]),y={point:a,lineStart:s,
lineEnd:c,polygonStart:function(){y.point=l,y.lineStart=f,y.lineEnd=h,p=[],d=[]},
polygonEnd:function(){y.point=a,y.lineStart=s,y.lineEnd=c,p=ra.merge(p);var t=Fe(m,d);

p.length?(w||(o.polygonStart(),w=!0),Ne(p,Re,t,n,o)):t&&(w||(o.polygonStart(),w=!0),
o.lineStart(),n(null,null,1,o),o.lineEnd()),w&&(o.polygonEnd(),w=!1),p=d=null},sphere:function(){
o.polygonStart(),o.lineStart(),n(null,null,1,o),o.lineEnd(),o.polygonEnd()}},x=Oe(),b=e(x),w=!1;

return y}}function Le(t){return t.length>1}function Oe(){var t,e=[];return{lineStart:function(){
e.push(t=[])},point:function(e,n){t.push([e,n])},lineEnd:M,buffer:function(){var n=e;

return e=[],t=null,n},rejoin:function(){e.length>1&&e.push(e.pop().concat(e.shift()));

}}}function Re(t,e){return((t=t.x)[0]<0?t[1]-Ra-ja:Ra-t[1])-((e=e.x)[0]<0?e[1]-Ra-ja:Ra-e[1]);

}function ze(t){var e,n=0/0,r=0/0,i=0/0;return{lineStart:function(){t.lineStart(),
e=1},point:function(o,a){var u=o>0?Da:-Da,s=ga(o-n);ga(s-Da)<ja?(t.point(n,r=(r+a)/2>0?Ra:-Ra),
t.point(i,r),t.lineEnd(),t.lineStart(),t.point(u,r),t.point(o,r),e=0):i!==u&&s>=Da&&(ga(n-i)<ja&&(n-=i*ja),
ga(o-u)<ja&&(o-=u*ja),r=Pe(n,r,o,a),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(u,r),
e=0),t.point(n=o,r=a),i=u},lineEnd:function(){t.lineEnd(),n=r=0/0},clean:function(){
return 2-e}}}function Pe(t,e,n,r){var i,o,a=Math.sin(t-n);return ga(a)>ja?Math.atan((Math.sin(e)*(o=Math.cos(r))*Math.sin(n)-Math.sin(r)*(i=Math.cos(e))*Math.sin(t))/(i*o*a)):(e+r)/2;

}function He(t,e,n,r){var i;if(null==t)i=n*Ra,r.point(-Da,i),r.point(0,i),r.point(Da,i),
r.point(Da,0),r.point(Da,-i),r.point(0,-i),r.point(-Da,-i),r.point(-Da,0),r.point(-Da,i);
else if(ga(t[0]-e[0])>ja){var o=t[0]<e[0]?Da:-Da;i=n*o/2,r.point(-o,i),r.point(0,i),
r.point(o,i)}else r.point(e[0],e[1])}function Fe(t,e){var n=t[0],r=t[1],i=[Math.sin(n),-Math.cos(n),0],o=0,a=0;

bu.reset();for(var u=0,s=e.length;s>u;++u){var c=e[u],l=c.length;if(l)for(var f=c[0],h=f[0],p=f[1]/2+Da/4,d=Math.sin(p),g=Math.cos(p),v=1;;){
v===l&&(v=0),t=c[v];var m=t[0],y=t[1]/2+Da/4,x=Math.sin(y),b=Math.cos(y),w=m-h,M=w>=0?1:-1,k=M*w,_=k>Da,S=d*x;

if(bu.add(Math.atan2(S*M*Math.sin(k),g*b+S*Math.cos(k))),o+=_?w+M*La:w,_^h>=n^m>=n){
var C=me(ge(f),ge(t));be(C);var E=me(i,C);be(E);var T=(_^w>=0?-1:1)*nt(E[2]);(r>T||r===T&&(C[0]||C[1]))&&(a+=_^w>=0?1:-1);

}if(!v++)break;h=m,d=x,g=b,f=t}}return(-ja>o||ja>o&&0>bu)^1&a}function Ie(t){function e(t,e){
return Math.cos(t)*Math.cos(e)>o}function n(t){var n,o,s,c,l;return{lineStart:function(){
c=s=!1,l=1},point:function(f,h){var p,d=[f,h],g=e(f,h),v=a?g?0:i(f,h):g?i(f+(0>f?Da:-Da),h):0;

if(!n&&(c=s=g)&&t.lineStart(),g!==s&&(p=r(n,d),(Me(n,p)||Me(d,p))&&(d[0]+=ja,d[1]+=ja,
g=e(d[0],d[1]))),g!==s)l=0,g?(t.lineStart(),p=r(d,n),t.point(p[0],p[1])):(p=r(n,d),
t.point(p[0],p[1]),t.lineEnd()),n=p;else if(u&&n&&a^g){var m;v&o||!(m=r(d,n,!0))||(l=0,
a?(t.lineStart(),t.point(m[0][0],m[0][1]),t.point(m[1][0],m[1][1]),t.lineEnd()):(t.point(m[1][0],m[1][1]),
t.lineEnd(),t.lineStart(),t.point(m[0][0],m[0][1])))}!g||n&&Me(n,d)||t.point(d[0],d[1]),
n=d,s=g,o=v},lineEnd:function(){s&&t.lineEnd(),n=null},clean:function(){return l|(c&&s)<<1;

}}}function r(t,e,n){var r=ge(t),i=ge(e),a=[1,0,0],u=me(r,i),s=ve(u,u),c=u[0],l=s-c*c;

if(!l)return!n&&t;var f=o*s/l,h=-o*c/l,p=me(a,u),d=xe(a,f),g=xe(u,h);ye(d,g);var v=p,m=ve(d,v),y=ve(v,v),x=m*m-y*(ve(d,d)-1);

if(!(0>x)){var b=Math.sqrt(x),w=xe(v,(-m-b)/y);if(ye(w,d),w=we(w),!n)return w;var M,k=t[0],_=e[0],S=t[1],C=e[1];

k>_&&(M=k,k=_,_=M);var E=_-k,T=ga(E-Da)<ja,A=T||ja>E;if(!T&&S>C&&(M=S,S=C,C=M),A?T?S+C>0^w[1]<(ga(w[0]-k)<ja?S:C):S<=w[1]&&w[1]<=C:E>Da^(k<=w[0]&&w[0]<=_)){
var N=xe(v,(-m+b)/y);return ye(N,d),[w,we(N)]}}}function i(e,n){var r=a?t:Da-t,i=0;

return-r>e?i|=1:e>r&&(i|=2),-r>n?i|=4:n>r&&(i|=8),i}var o=Math.cos(t),a=o>0,u=ga(o)>ja,s=gn(t,6*za);

return De(e,n,s,a?[0,-t]:[-Da,t-Da])}function Ue(t,e,n,r){return function(i){var o,a=i.a,u=i.b,s=a.x,c=a.y,l=u.x,f=u.y,h=0,p=1,d=l-s,g=f-c;

if(o=t-s,d||!(o>0)){if(o/=d,0>d){if(h>o)return;p>o&&(p=o)}else if(d>0){if(o>p)return;

o>h&&(h=o)}if(o=n-s,d||!(0>o)){if(o/=d,0>d){if(o>p)return;o>h&&(h=o)}else if(d>0){
if(h>o)return;p>o&&(p=o)}if(o=e-c,g||!(o>0)){if(o/=g,0>g){if(h>o)return;p>o&&(p=o);

}else if(g>0){if(o>p)return;o>h&&(h=o)}if(o=r-c,g||!(0>o)){if(o/=g,0>g){if(o>p)return;

o>h&&(h=o)}else if(g>0){if(h>o)return;p>o&&(p=o)}return h>0&&(i.a={x:s+h*d,y:c+h*g
}),1>p&&(i.b={x:s+p*d,y:c+p*g}),i}}}}}}function $e(t,e,n,r){function i(r,i){return ga(r[0]-t)<ja?i>0?0:3:ga(r[0]-n)<ja?i>0?2:1:ga(r[1]-e)<ja?i>0?1:0:i>0?3:2;

}function o(t,e){return a(t.x,e.x)}function a(t,e){var n=i(t,1),r=i(e,1);return n!==r?n-r:0===n?e[1]-t[1]:1===n?t[0]-e[0]:2===n?t[1]-e[1]:e[0]-t[0];

}return function(u){function s(t){for(var e=0,n=v.length,r=t[1],i=0;n>i;++i)for(var o,a=1,u=v[i],s=u.length,c=u[0];s>a;++a)o=u[a],
c[1]<=r?o[1]>r&&tt(c,o,t)>0&&++e:o[1]<=r&&tt(c,o,t)<0&&--e,c=o;return 0!==e}function c(o,u,s,c){
var l=0,f=0;if(null==o||(l=i(o,s))!==(f=i(u,s))||a(o,u)<0^s>0){do c.point(0===l||3===l?t:n,l>1?r:e);
while((l=(l+s+4)%4)!==f)}else c.point(u[0],u[1])}function l(i,o){return i>=t&&n>=i&&o>=e&&r>=o;

}function f(t,e){l(t,e)&&u.point(t,e)}function h(){A.point=d,v&&v.push(m=[]),_=!0,
k=!1,w=M=0/0}function p(){g&&(d(y,x),b&&k&&E.rejoin(),g.push(E.buffer())),A.point=f,
k&&u.lineEnd()}function d(t,e){t=Math.max(-Ou,Math.min(Ou,t)),e=Math.max(-Ou,Math.min(Ou,e));

var n=l(t,e);if(v&&m.push([t,e]),_)y=t,x=e,b=n,_=!1,n&&(u.lineStart(),u.point(t,e));
else if(n&&k)u.point(t,e);else{var r={a:{x:w,y:M},b:{x:t,y:e}};T(r)?(k||(u.lineStart(),
u.point(r.a.x,r.a.y)),u.point(r.b.x,r.b.y),n||u.lineEnd(),S=!1):n&&(u.lineStart(),
u.point(t,e),S=!1)}w=t,M=e,k=n}var g,v,m,y,x,b,w,M,k,_,S,C=u,E=Oe(),T=Ue(t,e,n,r),A={
point:f,lineStart:h,lineEnd:p,polygonStart:function(){u=E,g=[],v=[],S=!0},polygonEnd:function(){
u=C,g=ra.merge(g);var e=s([t,r]),n=S&&e,i=g.length;(n||i)&&(u.polygonStart(),n&&(u.lineStart(),
c(null,null,1,u),u.lineEnd()),i&&Ne(g,o,e,c,u),u.polygonEnd()),g=v=m=null}};return A;

}}function Be(t){var e=0,n=Da/3,r=un(t),i=r(e,n);return i.parallels=function(t){return arguments.length?r(e=t[0]*Da/180,n=t[1]*Da/180):[e/Da*180,n/Da*180];

},i}function We(t,e){function n(t,e){var n=Math.sqrt(o-2*i*Math.sin(e))/i;return[n*Math.sin(t*=i),a-n*Math.cos(t)];

}var r=Math.sin(t),i=(r+Math.sin(e))/2,o=1+r*(2*i-r),a=Math.sqrt(o)/i;return n.invert=function(t,e){
var n=a-e;return[Math.atan2(t,n)/i,nt((o-(t*t+n*n)*i*i)/(2*i))]},n}function Ye(){
function t(t,e){zu+=i*t-r*e,r=t,i=e}var e,n,r,i;Uu.point=function(o,a){Uu.point=t,
e=r=o,n=i=a},Uu.lineEnd=function(){t(e,n)}}function Xe(t,e){Pu>t&&(Pu=t),t>Fu&&(Fu=t),
Hu>e&&(Hu=e),e>Iu&&(Iu=e)}function Ve(){function t(t,e){a.push("M",t,",",e,o)}function e(t,e){
a.push("M",t,",",e),u.point=n}function n(t,e){a.push("L",t,",",e)}function r(){u.point=t;

}function i(){a.push("Z")}var o=Ze(4.5),a=[],u={point:t,lineStart:function(){u.point=e;

},lineEnd:r,polygonStart:function(){u.lineEnd=i},polygonEnd:function(){u.lineEnd=r,
u.point=t},pointRadius:function(t){return o=Ze(t),u},result:function(){if(a.length){
var t=a.join("");return a=[],t}}};return u}function Ze(t){return"m0,"+t+"a"+t+","+t+" 0 1,1 0,"+-2*t+"a"+t+","+t+" 0 1,1 0,"+2*t+"z";

}function Je(t,e){_u+=t,Su+=e,++Cu}function Ge(){function t(t,r){var i=t-e,o=r-n,a=Math.sqrt(i*i+o*o);

Eu+=a*(e+t)/2,Tu+=a*(n+r)/2,Au+=a,Je(e=t,n=r)}var e,n;Bu.point=function(r,i){Bu.point=t,
Je(e=r,n=i)}}function Ke(){Bu.point=Je}function Qe(){function t(t,e){var n=t-r,o=e-i,a=Math.sqrt(n*n+o*o);

Eu+=a*(r+t)/2,Tu+=a*(i+e)/2,Au+=a,a=i*t-r*e,Nu+=a*(r+t),ju+=a*(i+e),qu+=3*a,Je(r=t,i=e);

}var e,n,r,i;Bu.point=function(o,a){Bu.point=t,Je(e=r=o,n=i=a)},Bu.lineEnd=function(){
t(e,n)}}function tn(t){function e(e,n){t.moveTo(e+a,n),t.arc(e,n,a,0,La)}function n(e,n){
t.moveTo(e,n),u.point=r}function r(e,n){t.lineTo(e,n)}function i(){u.point=e}function o(){
t.closePath()}var a=4.5,u={point:e,lineStart:function(){u.point=n},lineEnd:i,polygonStart:function(){
u.lineEnd=o},polygonEnd:function(){u.lineEnd=i,u.point=e},pointRadius:function(t){
return a=t,u},result:M};return u}function en(t){function e(t){return(u?r:n)(t)}function n(e){
return on(e,function(n,r){n=t(n,r),e.point(n[0],n[1])})}function r(e){function n(n,r){
n=t(n,r),e.point(n[0],n[1])}function r(){x=0/0,_.point=o,e.lineStart()}function o(n,r){
var o=ge([n,r]),a=t(n,r);i(x,b,y,w,M,k,x=a[0],b=a[1],y=n,w=o[0],M=o[1],k=o[2],u,e),
e.point(x,b)}function a(){_.point=n,e.lineEnd()}function s(){r(),_.point=c,_.lineEnd=l;

}function c(t,e){o(f=t,h=e),p=x,d=b,g=w,v=M,m=k,_.point=o}function l(){i(x,b,y,w,M,k,p,d,f,g,v,m,u,e),
_.lineEnd=a,a()}var f,h,p,d,g,v,m,y,x,b,w,M,k,_={point:n,lineStart:r,lineEnd:a,polygonStart:function(){
e.polygonStart(),_.lineStart=s},polygonEnd:function(){e.polygonEnd(),_.lineStart=r;

}};return _}function i(e,n,r,u,s,c,l,f,h,p,d,g,v,m){var y=l-e,x=f-n,b=y*y+x*x;if(b>4*o&&v--){
var w=u+p,M=s+d,k=c+g,_=Math.sqrt(w*w+M*M+k*k),S=Math.asin(k/=_),C=ga(ga(k)-1)<ja||ga(r-h)<ja?(r+h)/2:Math.atan2(M,w),E=t(C,S),T=E[0],A=E[1],N=T-e,j=A-n,q=x*N-y*j;

(q*q/b>o||ga((y*N+x*j)/b-.5)>.3||a>u*p+s*d+c*g)&&(i(e,n,r,u,s,c,T,A,C,w/=_,M/=_,k,v,m),
m.point(T,A),i(T,A,C,w,M,k,l,f,h,p,d,g,v,m))}}var o=.5,a=Math.cos(30*za),u=16;return e.precision=function(t){
return arguments.length?(u=(o=t*t)>0&&16,e):Math.sqrt(o)},e}function nn(t){var e=en(function(e,n){
return t([e*Pa,n*Pa])});return function(t){return sn(e(t))}}function rn(t){this.stream=t;

}function on(t,e){return{point:e,sphere:function(){t.sphere()},lineStart:function(){
t.lineStart()},lineEnd:function(){t.lineEnd()},polygonStart:function(){t.polygonStart();

},polygonEnd:function(){t.polygonEnd()}}}function an(t){return un(function(){return t;

})()}function un(t){function e(t){return t=u(t[0]*za,t[1]*za),[t[0]*h+s,c-t[1]*h];

}function n(t){return t=u.invert((t[0]-s)/h,(c-t[1])/h),t&&[t[0]*Pa,t[1]*Pa]}function r(){
u=Te(a=fn(m,y,b),o);var t=o(g,v);return s=p-t[0]*h,c=d+t[1]*h,i()}function i(){return l&&(l.valid=!1,
l=null),e}var o,a,u,s,c,l,f=en(function(t,e){return t=o(t,e),[t[0]*h+s,c-t[1]*h]}),h=150,p=480,d=250,g=0,v=0,m=0,y=0,b=0,w=Lu,M=x,k=null,_=null;

return e.stream=function(t){return l&&(l.valid=!1),l=sn(w(a,f(M(t)))),l.valid=!0,
l},e.clipAngle=function(t){return arguments.length?(w=null==t?(k=t,Lu):Ie((k=+t)*za),
i()):k},e.clipExtent=function(t){return arguments.length?(_=t,M=t?$e(t[0][0],t[0][1],t[1][0],t[1][1]):x,
i()):_},e.scale=function(t){return arguments.length?(h=+t,r()):h},e.translate=function(t){
return arguments.length?(p=+t[0],d=+t[1],r()):[p,d]},e.center=function(t){return arguments.length?(g=t[0]%360*za,
v=t[1]%360*za,r()):[g*Pa,v*Pa]},e.rotate=function(t){return arguments.length?(m=t[0]%360*za,
y=t[1]%360*za,b=t.length>2?t[2]%360*za:0,r()):[m*Pa,y*Pa,b*Pa]},ra.rebind(e,f,"precision"),
function(){return o=t.apply(this,arguments),e.invert=o.invert&&n,r()}}function sn(t){
return on(t,function(e,n){t.point(e*za,n*za)})}function cn(t,e){return[t,e]}function ln(t,e){
return[t>Da?t-La:-Da>t?t+La:t,e]}function fn(t,e,n){return t?e||n?Te(pn(t),dn(e,n)):pn(t):e||n?dn(e,n):ln;

}function hn(t){return function(e,n){return e+=t,[e>Da?e-La:-Da>e?e+La:e,n]}}function pn(t){
var e=hn(t);return e.invert=hn(-t),e}function dn(t,e){function n(t,e){var n=Math.cos(e),u=Math.cos(t)*n,s=Math.sin(t)*n,c=Math.sin(e),l=c*r+u*i;

return[Math.atan2(s*o-l*a,u*r-c*i),nt(l*o+s*a)]}var r=Math.cos(t),i=Math.sin(t),o=Math.cos(e),a=Math.sin(e);

return n.invert=function(t,e){var n=Math.cos(e),u=Math.cos(t)*n,s=Math.sin(t)*n,c=Math.sin(e),l=c*o-s*a;

return[Math.atan2(s*o+c*a,u*r+l*i),nt(l*r-u*i)]},n}function gn(t,e){var n=Math.cos(t),r=Math.sin(t);

return function(i,o,a,u){var s=a*e;null!=i?(i=vn(n,i),o=vn(n,o),(a>0?o>i:i>o)&&(i+=a*La)):(i=t+a*La,
o=t-.5*s);for(var c,l=i;a>0?l>o:o>l;l-=s)u.point((c=we([n,-r*Math.cos(l),-r*Math.sin(l)]))[0],c[1]);

}}function vn(t,e){var n=ge(e);n[0]-=t,be(n);var r=et(-n[1]);return((-n[2]<0?-r:r)+2*Math.PI-ja)%(2*Math.PI);

}function mn(t,e,n){var r=ra.range(t,e-ja,n).concat(e);return function(t){return r.map(function(e){
return[t,e]})}}function yn(t,e,n){var r=ra.range(t,e-ja,n).concat(e);return function(t){
return r.map(function(e){return[e,t]})}}function xn(t){return t.source}function bn(t){
return t.target}function wn(t,e,n,r){var i=Math.cos(e),o=Math.sin(e),a=Math.cos(r),u=Math.sin(r),s=i*Math.cos(t),c=i*Math.sin(t),l=a*Math.cos(n),f=a*Math.sin(n),h=2*Math.asin(Math.sqrt(at(r-e)+i*a*at(n-t))),p=1/Math.sin(h),d=h?function(t){
var e=Math.sin(t*=h)*p,n=Math.sin(h-t)*p,r=n*s+e*l,i=n*c+e*f,a=n*o+e*u;return[Math.atan2(i,r)*Pa,Math.atan2(a,Math.sqrt(r*r+i*i))*Pa];

}:function(){return[t*Pa,e*Pa]};return d.distance=h,d}function Mn(){function t(t,i){
var o=Math.sin(i*=za),a=Math.cos(i),u=ga((t*=za)-e),s=Math.cos(u);Wu+=Math.atan2(Math.sqrt((u=a*Math.sin(u))*u+(u=r*o-n*a*s)*u),n*o+r*a*s),
e=t,n=o,r=a}var e,n,r;Yu.point=function(i,o){e=i*za,n=Math.sin(o*=za),r=Math.cos(o),
Yu.point=t},Yu.lineEnd=function(){Yu.point=Yu.lineEnd=M}}function kn(t,e){function n(e,n){
var r=Math.cos(e),i=Math.cos(n),o=t(r*i);return[o*i*Math.sin(e),o*Math.sin(n)]}return n.invert=function(t,n){
var r=Math.sqrt(t*t+n*n),i=e(r),o=Math.sin(i),a=Math.cos(i);return[Math.atan2(t*o,r*a),Math.asin(r&&n*o/r)];

},n}function _n(t,e){function n(t,e){a>0?-Ra+ja>e&&(e=-Ra+ja):e>Ra-ja&&(e=Ra-ja);
var n=a/Math.pow(i(e),o);return[n*Math.sin(o*t),a-n*Math.cos(o*t)]}var r=Math.cos(t),i=function(t){
return Math.tan(Da/4+t/2)},o=t===e?Math.sin(t):Math.log(r/Math.cos(e))/Math.log(i(e)/i(t)),a=r*Math.pow(i(t),o)/o;

return o?(n.invert=function(t,e){var n=a-e,r=Q(o)*Math.sqrt(t*t+n*n);return[Math.atan2(t,n)/o,2*Math.atan(Math.pow(a/r,1/o))-Ra];

},n):Cn}function Sn(t,e){function n(t,e){var n=o-e;return[n*Math.sin(i*t),o-n*Math.cos(i*t)];

}var r=Math.cos(t),i=t===e?Math.sin(t):(r-Math.cos(e))/(e-t),o=r/i+t;return ga(i)<ja?cn:(n.invert=function(t,e){
var n=o-e;return[Math.atan2(t,n)/i,o-Q(i)*Math.sqrt(t*t+n*n)]},n)}function Cn(t,e){
return[t,Math.log(Math.tan(Da/4+e/2))]}function En(t){var e,n=an(t),r=n.scale,i=n.translate,o=n.clipExtent;

return n.scale=function(){var t=r.apply(n,arguments);return t===n?e?n.clipExtent(null):n:t;

},n.translate=function(){var t=i.apply(n,arguments);return t===n?e?n.clipExtent(null):n:t;

},n.clipExtent=function(t){var a=o.apply(n,arguments);if(a===n){if(e=null==t){var u=Da*r(),s=i();

o([[s[0]-u,s[1]-u],[s[0]+u,s[1]+u]])}}else e&&(a=null);return a},n.clipExtent(null);

}function Tn(t,e){return[Math.log(Math.tan(Da/4+e/2)),-t]}function An(t){return t[0];

}function Nn(t){return t[1]}function jn(t){for(var e=t.length,n=[0,1],r=2,i=2;e>i;i++){
for(;r>1&&tt(t[n[r-2]],t[n[r-1]],t[i])<=0;)--r;n[r++]=i}return n.slice(0,r)}function qn(t,e){
return t[0]-e[0]||t[1]-e[1]}function Dn(t,e,n){return(n[0]-e[0])*(t[1]-e[1])<(n[1]-e[1])*(t[0]-e[0]);

}function Ln(t,e,n,r){var i=t[0],o=n[0],a=e[0]-i,u=r[0]-o,s=t[1],c=n[1],l=e[1]-s,f=r[1]-c,h=(u*(s-c)-f*(i-o))/(f*a-u*l);

return[i+h*a,s+h*l]}function On(t){var e=t[0],n=t[t.length-1];return!(e[0]-n[0]||e[1]-n[1]);

}function Rn(){rr(this),this.edge=this.site=this.circle=null}function zn(t){var e=is.pop()||new Rn;

return e.site=t,e}function Pn(t){Vn(t),es.remove(t),is.push(t),rr(t)}function Hn(t){
var e=t.circle,n=e.x,r=e.cy,i={x:n,y:r},o=t.P,a=t.N,u=[t];Pn(t);for(var s=o;s.circle&&ga(n-s.circle.x)<ja&&ga(r-s.circle.cy)<ja;)o=s.P,
u.unshift(s),Pn(s),s=o;u.unshift(s),Vn(s);for(var c=a;c.circle&&ga(n-c.circle.x)<ja&&ga(r-c.circle.cy)<ja;)a=c.N,
u.push(c),Pn(c),c=a;u.push(c),Vn(c);var l,f=u.length;for(l=1;f>l;++l)c=u[l],s=u[l-1],
tr(c.edge,s.site,c.site,i);s=u[0],c=u[f-1],c.edge=Kn(s.site,c.site,null,i),Xn(s),
Xn(c)}function Fn(t){for(var e,n,r,i,o=t.x,a=t.y,u=es._;u;)if(r=In(u,a)-o,r>ja)u=u.L;
else{if(i=o-Un(u,a),!(i>ja)){r>-ja?(e=u.P,n=u):i>-ja?(e=u,n=u.N):e=n=u;break}if(!u.R){
e=u;break}u=u.R}var s=zn(t);if(es.insert(e,s),e||n){if(e===n)return Vn(e),n=zn(e.site),
es.insert(s,n),s.edge=n.edge=Kn(e.site,s.site),Xn(e),void Xn(n);if(!n)return void(s.edge=Kn(e.site,s.site));

Vn(e),Vn(n);var c=e.site,l=c.x,f=c.y,h=t.x-l,p=t.y-f,d=n.site,g=d.x-l,v=d.y-f,m=2*(h*v-p*g),y=h*h+p*p,x=g*g+v*v,b={
x:(v*y-p*x)/m+l,y:(h*x-g*y)/m+f};tr(n.edge,c,d,b),s.edge=Kn(c,t,null,b),n.edge=Kn(t,d,null,b),
Xn(e),Xn(n)}}function In(t,e){var n=t.site,r=n.x,i=n.y,o=i-e;if(!o)return r;var a=t.P;

if(!a)return-(1/0);n=a.site;var u=n.x,s=n.y,c=s-e;if(!c)return u;var l=u-r,f=1/o-1/c,h=l/c;

return f?(-h+Math.sqrt(h*h-2*f*(l*l/(-2*c)-s+c/2+i-o/2)))/f+r:(r+u)/2}function Un(t,e){
var n=t.N;if(n)return In(n,e);var r=t.site;return r.y===e?r.x:1/0}function $n(t){
this.site=t,this.edges=[]}function Bn(t){for(var e,n,r,i,o,a,u,s,c,l,f=t[0][0],h=t[1][0],p=t[0][1],d=t[1][1],g=ts,v=g.length;v--;)if(o=g[v],
o&&o.prepare())for(u=o.edges,s=u.length,a=0;s>a;)l=u[a].end(),r=l.x,i=l.y,c=u[++a%s].start(),
e=c.x,n=c.y,(ga(r-e)>ja||ga(i-n)>ja)&&(u.splice(a,0,new er(Qn(o.site,l,ga(r-f)<ja&&d-i>ja?{
x:f,y:ga(e-f)<ja?n:d}:ga(i-d)<ja&&h-r>ja?{x:ga(n-d)<ja?e:h,y:d}:ga(r-h)<ja&&i-p>ja?{
x:h,y:ga(e-h)<ja?n:p}:ga(i-p)<ja&&r-f>ja?{x:ga(n-p)<ja?e:f,y:p}:null),o.site,null)),
++s)}function Wn(t,e){return e.angle-t.angle}function Yn(){rr(this),this.x=this.y=this.arc=this.site=this.cy=null;

}function Xn(t){var e=t.P,n=t.N;if(e&&n){var r=e.site,i=t.site,o=n.site;if(r!==o){
var a=i.x,u=i.y,s=r.x-a,c=r.y-u,l=o.x-a,f=o.y-u,h=2*(s*f-c*l);if(!(h>=-qa)){var p=s*s+c*c,d=l*l+f*f,g=(f*p-c*d)/h,v=(s*d-l*p)/h,f=v+u,m=os.pop()||new Yn;

m.arc=t,m.site=i,m.x=g+a,m.y=f+Math.sqrt(g*g+v*v),m.cy=f,t.circle=m;for(var y=null,x=rs._;x;)if(m.y<x.y||m.y===x.y&&m.x<=x.x){
if(!x.L){y=x.P;break}x=x.L}else{if(!x.R){y=x;break}x=x.R}rs.insert(y,m),y||(ns=m);

}}}}function Vn(t){var e=t.circle;e&&(e.P||(ns=e.N),rs.remove(e),os.push(e),rr(e),
t.circle=null)}function Zn(t){for(var e,n=Qu,r=Ue(t[0][0],t[0][1],t[1][0],t[1][1]),i=n.length;i--;)e=n[i],
(!Jn(e,t)||!r(e)||ga(e.a.x-e.b.x)<ja&&ga(e.a.y-e.b.y)<ja)&&(e.a=e.b=null,n.splice(i,1));

}function Jn(t,e){var n=t.b;if(n)return!0;var r,i,o=t.a,a=e[0][0],u=e[1][0],s=e[0][1],c=e[1][1],l=t.l,f=t.r,h=l.x,p=l.y,d=f.x,g=f.y,v=(h+d)/2,m=(p+g)/2;

if(g===p){if(a>v||v>=u)return;if(h>d){if(o){if(o.y>=c)return}else o={x:v,y:s};n={
x:v,y:c}}else{if(o){if(o.y<s)return}else o={x:v,y:c};n={x:v,y:s}}}else if(r=(h-d)/(g-p),
i=m-r*v,-1>r||r>1)if(h>d){if(o){if(o.y>=c)return}else o={x:(s-i)/r,y:s};n={x:(c-i)/r,
y:c}}else{if(o){if(o.y<s)return}else o={x:(c-i)/r,y:c};n={x:(s-i)/r,y:s}}else if(g>p){
if(o){if(o.x>=u)return}else o={x:a,y:r*a+i};n={x:u,y:r*u+i}}else{if(o){if(o.x<a)return;

}else o={x:u,y:r*u+i};n={x:a,y:r*a+i}}return t.a=o,t.b=n,!0}function Gn(t,e){this.l=t,
this.r=e,this.a=this.b=null}function Kn(t,e,n,r){var i=new Gn(t,e);return Qu.push(i),
n&&tr(i,t,e,n),r&&tr(i,e,t,r),ts[t.i].edges.push(new er(i,t,e)),ts[e.i].edges.push(new er(i,e,t)),
i}function Qn(t,e,n){var r=new Gn(t,null);return r.a=e,r.b=n,Qu.push(r),r}function tr(t,e,n,r){
t.a||t.b?t.l===n?t.b=r:t.a=r:(t.a=r,t.l=e,t.r=n)}function er(t,e,n){var r=t.a,i=t.b;

this.edge=t,this.site=e,this.angle=n?Math.atan2(n.y-e.y,n.x-e.x):t.l===e?Math.atan2(i.x-r.x,r.y-i.y):Math.atan2(r.x-i.x,i.y-r.y);

}function nr(){this._=null}function rr(t){t.U=t.C=t.L=t.R=t.P=t.N=null}function ir(t,e){
var n=e,r=e.R,i=n.U;i?i.L===n?i.L=r:i.R=r:t._=r,r.U=i,n.U=r,n.R=r.L,n.R&&(n.R.U=n),
r.L=n}function or(t,e){var n=e,r=e.L,i=n.U;i?i.L===n?i.L=r:i.R=r:t._=r,r.U=i,n.U=r,
n.L=r.R,n.L&&(n.L.U=n),r.R=n}function ar(t){for(;t.L;)t=t.L;return t}function ur(t,e){
var n,r,i,o=t.sort(sr).pop();for(Qu=[],ts=new Array(t.length),es=new nr,rs=new nr;;)if(i=ns,
o&&(!i||o.y<i.y||o.y===i.y&&o.x<i.x))(o.x!==n||o.y!==r)&&(ts[o.i]=new $n(o),Fn(o),
n=o.x,r=o.y),o=t.pop();else{if(!i)break;Hn(i.arc)}e&&(Zn(e),Bn(e));var a={cells:ts,
edges:Qu};return es=rs=Qu=ts=null,a}function sr(t,e){return e.y-t.y||e.x-t.x}function cr(t,e,n){
return(t.x-n.x)*(e.y-t.y)-(t.x-e.x)*(n.y-t.y)}function lr(t){return t.x}function fr(t){
return t.y}function hr(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function pr(t,e,n,r,i,o){
if(!t(e,n,r,i,o)){var a=.5*(n+i),u=.5*(r+o),s=e.nodes;s[0]&&pr(t,s[0],n,r,a,u),s[1]&&pr(t,s[1],a,r,i,u),
s[2]&&pr(t,s[2],n,u,a,o),s[3]&&pr(t,s[3],a,u,i,o)}}function dr(t,e,n,r,i,o,a){var u,s=1/0;

return function c(t,l,f,h,p){if(!(l>o||f>a||r>h||i>p)){if(d=t.point){var d,g=e-t.x,v=n-t.y,m=g*g+v*v;

if(s>m){var y=Math.sqrt(s=m);r=e-y,i=n-y,o=e+y,a=n+y,u=d}}for(var x=t.nodes,b=.5*(l+h),w=.5*(f+p),M=e>=b,k=n>=w,_=k<<1|M,S=_+4;S>_;++_)if(t=x[3&_])switch(3&_){
case 0:c(t,l,f,b,w);break;case 1:c(t,b,f,h,w);break;case 2:c(t,l,w,b,p);break;case 3:
c(t,b,w,h,p)}}}(t,r,i,o,a),u}function gr(t,e){t=ra.rgb(t),e=ra.rgb(e);var n=t.r,r=t.g,i=t.b,o=e.r-n,a=e.g-r,u=e.b-i;

return function(t){return"#"+wt(Math.round(n+o*t))+wt(Math.round(r+a*t))+wt(Math.round(i+u*t));

}}function vr(t,e){var n,r={},i={};for(n in t)n in e?r[n]=xr(t[n],e[n]):i[n]=t[n];

for(n in e)n in t||(i[n]=e[n]);return function(t){for(n in r)i[n]=r[n](t);return i;

}}function mr(t,e){return t=+t,e=+e,function(n){return t*(1-n)+e*n}}function yr(t,e){
var n,r,i,o=us.lastIndex=ss.lastIndex=0,a=-1,u=[],s=[];for(t+="",e+="";(n=us.exec(t))&&(r=ss.exec(e));)(i=r.index)>o&&(i=e.slice(o,i),
u[a]?u[a]+=i:u[++a]=i),(n=n[0])===(r=r[0])?u[a]?u[a]+=r:u[++a]=r:(u[++a]=null,s.push({
i:a,x:mr(n,r)})),o=ss.lastIndex;return o<e.length&&(i=e.slice(o),u[a]?u[a]+=i:u[++a]=i),
u.length<2?s[0]?(e=s[0].x,function(t){return e(t)+""}):function(){return e}:(e=s.length,
function(t){for(var n,r=0;e>r;++r)u[(n=s[r]).i]=n.x(t);return u.join("")})}function xr(t,e){
for(var n,r=ra.interpolators.length;--r>=0&&!(n=ra.interpolators[r](t,e)););return n;

}function br(t,e){var n,r=[],i=[],o=t.length,a=e.length,u=Math.min(t.length,e.length);

for(n=0;u>n;++n)r.push(xr(t[n],e[n]));for(;o>n;++n)i[n]=t[n];for(;a>n;++n)i[n]=e[n];

return function(t){for(n=0;u>n;++n)i[n]=r[n](t);return i}}function wr(t){return function(e){
return 0>=e?0:e>=1?1:t(e)}}function Mr(t){return function(e){return 1-t(1-e)}}function kr(t){
return function(e){return.5*(.5>e?t(2*e):2-t(2-2*e))}}function _r(t){return t*t}function Sr(t){
return t*t*t}function Cr(t){if(0>=t)return 0;if(t>=1)return 1;var e=t*t,n=e*t;return 4*(.5>t?n:3*(t-e)+n-.75);

}function Er(t){return function(e){return Math.pow(e,t)}}function Tr(t){return 1-Math.cos(t*Ra);

}function Ar(t){return Math.pow(2,10*(t-1))}function Nr(t){return 1-Math.sqrt(1-t*t);

}function jr(t,e){var n;return arguments.length<2&&(e=.45),arguments.length?n=e/La*Math.asin(1/t):(t=1,
n=e/4),function(r){return 1+t*Math.pow(2,-10*r)*Math.sin((r-n)*La/e)}}function qr(t){
return t||(t=1.70158),function(e){return e*e*((t+1)*e-t)}}function Dr(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375;

}function Lr(t,e){t=ra.hcl(t),e=ra.hcl(e);var n=t.h,r=t.c,i=t.l,o=e.h-n,a=e.c-r,u=e.l-i;

return isNaN(a)&&(a=0,r=isNaN(r)?e.c:r),isNaN(o)?(o=0,n=isNaN(n)?e.h:n):o>180?o-=360:-180>o&&(o+=360),
function(t){return ft(n+o*t,r+a*t,i+u*t)+""}}function Or(t,e){t=ra.hsl(t),e=ra.hsl(e);

var n=t.h,r=t.s,i=t.l,o=e.h-n,a=e.s-r,u=e.l-i;return isNaN(a)&&(a=0,r=isNaN(r)?e.s:r),
isNaN(o)?(o=0,n=isNaN(n)?e.h:n):o>180?o-=360:-180>o&&(o+=360),function(t){return ct(n+o*t,r+a*t,i+u*t)+"";

}}function Rr(t,e){t=ra.lab(t),e=ra.lab(e);var n=t.l,r=t.a,i=t.b,o=e.l-n,a=e.a-r,u=e.b-i;

return function(t){return pt(n+o*t,r+a*t,i+u*t)+""}}function zr(t,e){return e-=t,
function(n){return Math.round(t+e*n)}}function Pr(t){var e=[t.a,t.b],n=[t.c,t.d],r=Fr(e),i=Hr(e,n),o=Fr(Ir(n,e,-i))||0;

e[0]*n[1]<n[0]*e[1]&&(e[0]*=-1,e[1]*=-1,r*=-1,i*=-1),this.rotate=(r?Math.atan2(e[1],e[0]):Math.atan2(-n[0],n[1]))*Pa,
this.translate=[t.e,t.f],this.scale=[r,o],this.skew=o?Math.atan2(i,o)*Pa:0}function Hr(t,e){
return t[0]*e[0]+t[1]*e[1]}function Fr(t){var e=Math.sqrt(Hr(t,t));return e&&(t[0]/=e,
t[1]/=e),e}function Ir(t,e,n){return t[0]+=n*e[0],t[1]+=n*e[1],t}function Ur(t,e){
var n,r=[],i=[],o=ra.transform(t),a=ra.transform(e),u=o.translate,s=a.translate,c=o.rotate,l=a.rotate,f=o.skew,h=a.skew,p=o.scale,d=a.scale;

return u[0]!=s[0]||u[1]!=s[1]?(r.push("translate(",null,",",null,")"),i.push({i:1,
x:mr(u[0],s[0])},{i:3,x:mr(u[1],s[1])})):r.push(s[0]||s[1]?"translate("+s+")":""),
c!=l?(c-l>180?l+=360:l-c>180&&(c+=360),i.push({i:r.push(r.pop()+"rotate(",null,")")-2,
x:mr(c,l)})):l&&r.push(r.pop()+"rotate("+l+")"),f!=h?i.push({i:r.push(r.pop()+"skewX(",null,")")-2,
x:mr(f,h)}):h&&r.push(r.pop()+"skewX("+h+")"),p[0]!=d[0]||p[1]!=d[1]?(n=r.push(r.pop()+"scale(",null,",",null,")"),
i.push({i:n-4,x:mr(p[0],d[0])},{i:n-2,x:mr(p[1],d[1])})):(1!=d[0]||1!=d[1])&&r.push(r.pop()+"scale("+d+")"),
n=i.length,function(t){for(var e,o=-1;++o<n;)r[(e=i[o]).i]=e.x(t);return r.join("");

}}function $r(t,e){return e=(e-=t=+t)||1/e,function(n){return(n-t)/e}}function Br(t,e){
return e=(e-=t=+t)||1/e,function(n){return Math.max(0,Math.min(1,(n-t)/e))}}function Wr(t){
for(var e=t.source,n=t.target,r=Xr(e,n),i=[e];e!==r;)e=e.parent,i.push(e);for(var o=i.length;n!==r;)i.splice(o,0,n),
n=n.parent;return i}function Yr(t){for(var e=[],n=t.parent;null!=n;)e.push(t),t=n,
n=n.parent;return e.push(t),e}function Xr(t,e){if(t===e)return t;for(var n=Yr(t),r=Yr(e),i=n.pop(),o=r.pop(),a=null;i===o;)a=i,
i=n.pop(),o=r.pop();return a}function Vr(t){t.fixed|=2}function Zr(t){t.fixed&=-7;

}function Jr(t){t.fixed|=4,t.px=t.x,t.py=t.y}function Gr(t){t.fixed&=-5}function Kr(t,e,n){
var r=0,i=0;if(t.charge=0,!t.leaf)for(var o,a=t.nodes,u=a.length,s=-1;++s<u;)o=a[s],
null!=o&&(Kr(o,e,n),t.charge+=o.charge,r+=o.charge*o.cx,i+=o.charge*o.cy);if(t.point){
t.leaf||(t.point.x+=Math.random()-.5,t.point.y+=Math.random()-.5);var c=e*n[t.point.index];

t.charge+=t.pointCharge=c,r+=c*t.point.x,i+=c*t.point.y}t.cx=r/t.charge,t.cy=i/t.charge;

}function Qr(t,e){return ra.rebind(t,e,"sort","children","value"),t.nodes=t,t.links=oi,
t}function ti(t,e){for(var n=[t];null!=(t=n.pop());)if(e(t),(i=t.children)&&(r=i.length))for(var r,i;--r>=0;)n.push(i[r]);

}function ei(t,e){for(var n=[t],r=[];null!=(t=n.pop());)if(r.push(t),(o=t.children)&&(i=o.length))for(var i,o,a=-1;++a<i;)n.push(o[a]);

for(;null!=(t=r.pop());)e(t)}function ni(t){return t.children}function ri(t){return t.value;

}function ii(t,e){return e.value-t.value}function oi(t){return ra.merge(t.map(function(t){
return(t.children||[]).map(function(e){return{source:t,target:e}})}))}function ai(t){
return t.x}function ui(t){return t.y}function si(t,e,n){t.y0=e,t.y=n}function ci(t){
return ra.range(t.length)}function li(t){for(var e=-1,n=t[0].length,r=[];++e<n;)r[e]=0;

return r}function fi(t){for(var e,n=1,r=0,i=t[0][1],o=t.length;o>n;++n)(e=t[n][1])>i&&(r=n,
i=e);return r}function hi(t){return t.reduce(pi,0)}function pi(t,e){return t+e[1];

}function di(t,e){return gi(t,Math.ceil(Math.log(e.length)/Math.LN2+1))}function gi(t,e){
for(var n=-1,r=+t[0],i=(t[1]-r)/e,o=[];++n<=e;)o[n]=i*n+r;return o}function vi(t){
return[ra.min(t),ra.max(t)]}function mi(t,e){return t.value-e.value}function yi(t,e){
var n=t._pack_next;t._pack_next=e,e._pack_prev=t,e._pack_next=n,n._pack_prev=e}function xi(t,e){
t._pack_next=e,e._pack_prev=t}function bi(t,e){var n=e.x-t.x,r=e.y-t.y,i=t.r+e.r;
return.999*i*i>n*n+r*r}function wi(t){function e(t){l=Math.min(t.x-t.r,l),f=Math.max(t.x+t.r,f),
h=Math.min(t.y-t.r,h),p=Math.max(t.y+t.r,p)}if((n=t.children)&&(c=n.length)){var n,r,i,o,a,u,s,c,l=1/0,f=-(1/0),h=1/0,p=-(1/0);

if(n.forEach(Mi),r=n[0],r.x=-r.r,r.y=0,e(r),c>1&&(i=n[1],i.x=i.r,i.y=0,e(i),c>2))for(o=n[2],
Si(r,i,o),e(o),yi(r,o),r._pack_prev=o,yi(o,i),i=r._pack_next,a=3;c>a;a++){Si(r,i,o=n[a]);

var d=0,g=1,v=1;for(u=i._pack_next;u!==i;u=u._pack_next,g++)if(bi(u,o)){d=1;break;

}if(1==d)for(s=r._pack_prev;s!==u._pack_prev&&!bi(s,o);s=s._pack_prev,v++);d?(v>g||g==v&&i.r<r.r?xi(r,i=u):xi(r=s,i),
a--):(yi(r,o),i=o,e(o))}var m=(l+f)/2,y=(h+p)/2,x=0;for(a=0;c>a;a++)o=n[a],o.x-=m,
o.y-=y,x=Math.max(x,o.r+Math.sqrt(o.x*o.x+o.y*o.y));t.r=x,n.forEach(ki)}}function Mi(t){
t._pack_next=t._pack_prev=t}function ki(t){delete t._pack_next,delete t._pack_prev;

}function _i(t,e,n,r){var i=t.children;if(t.x=e+=r*t.x,t.y=n+=r*t.y,t.r*=r,i)for(var o=-1,a=i.length;++o<a;)_i(i[o],e,n,r);

}function Si(t,e,n){var r=t.r+n.r,i=e.x-t.x,o=e.y-t.y;if(r&&(i||o)){var a=e.r+n.r,u=i*i+o*o;

a*=a,r*=r;var s=.5+(r-a)/(2*u),c=Math.sqrt(Math.max(0,2*a*(r+u)-(r-=u)*r-a*a))/(2*u);

n.x=t.x+s*i+c*o,n.y=t.y+s*o-c*i}else n.x=t.x+r,n.y=t.y}function Ci(t,e){return t.parent==e.parent?1:2;

}function Ei(t){var e=t.children;return e.length?e[0]:t.t}function Ti(t){var e,n=t.children;

return(e=n.length)?n[e-1]:t.t}function Ai(t,e,n){var r=n/(e.i-t.i);e.c-=r,e.s+=n,
t.c+=r,e.z+=n,e.m+=n}function Ni(t){for(var e,n=0,r=0,i=t.children,o=i.length;--o>=0;)e=i[o],
e.z+=n,e.m+=n,n+=e.s+(r+=e.c)}function ji(t,e,n){return t.a.parent===e.parent?t.a:n;

}function qi(t){return 1+ra.max(t,function(t){return t.y})}function Di(t){return t.reduce(function(t,e){
return t+e.x},0)/t.length}function Li(t){var e=t.children;return e&&e.length?Li(e[0]):t;

}function Oi(t){var e,n=t.children;return n&&(e=n.length)?Oi(n[e-1]):t}function Ri(t){
return{x:t.x,y:t.y,dx:t.dx,dy:t.dy}}function zi(t,e){var n=t.x+e[3],r=t.y+e[0],i=t.dx-e[1]-e[3],o=t.dy-e[0]-e[2];

return 0>i&&(n+=i/2,i=0),0>o&&(r+=o/2,o=0),{x:n,y:r,dx:i,dy:o}}function Pi(t){var e=t[0],n=t[t.length-1];

return n>e?[e,n]:[n,e]}function Hi(t){return t.rangeExtent?t.rangeExtent():Pi(t.range());

}function Fi(t,e,n,r){var i=n(t[0],t[1]),o=r(e[0],e[1]);return function(t){return o(i(t));

}}function Ii(t,e){var n,r=0,i=t.length-1,o=t[r],a=t[i];return o>a&&(n=r,r=i,i=n,
n=o,o=a,a=n),t[r]=e.floor(o),t[i]=e.ceil(a),t}function Ui(t){return t?{floor:function(e){
return Math.floor(e/t)*t},ceil:function(e){return Math.ceil(e/t)*t}}:xs}function $i(t,e,n,r){
var i=[],o=[],a=0,u=Math.min(t.length,e.length)-1;for(t[u]<t[0]&&(t=t.slice().reverse(),
e=e.slice().reverse());++a<=u;)i.push(n(t[a-1],t[a])),o.push(r(e[a-1],e[a]));return function(e){
var n=ra.bisect(t,e,1,u)-1;return o[n](i[n](e))}}function Bi(t,e,n,r){function i(){
var i=Math.min(t.length,e.length)>2?$i:Fi,s=r?Br:$r;return a=i(t,e,s,n),u=i(e,t,s,xr),
o}function o(t){return a(t)}var a,u;return o.invert=function(t){return u(t)},o.domain=function(e){
return arguments.length?(t=e.map(Number),i()):t},o.range=function(t){return arguments.length?(e=t,
i()):e},o.rangeRound=function(t){return o.range(t).interpolate(zr)},o.clamp=function(t){
return arguments.length?(r=t,i()):r},o.interpolate=function(t){return arguments.length?(n=t,
i()):n},o.ticks=function(e){return Vi(t,e)},o.tickFormat=function(e,n){return Zi(t,e,n);

},o.nice=function(e){return Yi(t,e),i()},o.copy=function(){return Bi(t,e,n,r)},i();

}function Wi(t,e){return ra.rebind(t,e,"range","rangeRound","interpolate","clamp");

}function Yi(t,e){return Ii(t,Ui(Xi(t,e)[2]))}function Xi(t,e){null==e&&(e=10);var n=Pi(t),r=n[1]-n[0],i=Math.pow(10,Math.floor(Math.log(r/e)/Math.LN10)),o=e/r*i;

return.15>=o?i*=10:.35>=o?i*=5:.75>=o&&(i*=2),n[0]=Math.ceil(n[0]/i)*i,n[1]=Math.floor(n[1]/i)*i+.5*i,
n[2]=i,n}function Vi(t,e){return ra.range.apply(ra,Xi(t,e))}function Zi(t,e,n){var r=Xi(t,e);

if(n){var i=uu.exec(n);if(i.shift(),"s"===i[8]){var o=ra.formatPrefix(Math.max(ga(r[0]),ga(r[1])));

return i[7]||(i[7]="."+Ji(o.scale(r[2]))),i[8]="f",n=ra.format(i.join("")),function(t){
return n(o.scale(t))+o.symbol}}i[7]||(i[7]="."+Gi(i[8],r)),n=i.join("")}else n=",."+Ji(r[2])+"f";

return ra.format(n)}function Ji(t){return-Math.floor(Math.log(t)/Math.LN10+.01)}function Gi(t,e){
var n=Ji(e[2]);return t in bs?Math.abs(n-Ji(Math.max(ga(e[0]),ga(e[1]))))+ +("e"!==t):n-2*("%"===t);

}function Ki(t,e,n,r){function i(t){return(n?Math.log(0>t?0:t):-Math.log(t>0?0:-t))/Math.log(e);

}function o(t){return n?Math.pow(e,t):-Math.pow(e,-t)}function a(e){return t(i(e));

}return a.invert=function(e){return o(t.invert(e))},a.domain=function(e){return arguments.length?(n=e[0]>=0,
t.domain((r=e.map(Number)).map(i)),a):r},a.base=function(n){return arguments.length?(e=+n,
t.domain(r.map(i)),a):e},a.nice=function(){var e=Ii(r.map(i),n?Math:Ms);return t.domain(e),
r=e.map(o),a},a.ticks=function(){var t=Pi(r),a=[],u=t[0],s=t[1],c=Math.floor(i(u)),l=Math.ceil(i(s)),f=e%1?2:e;

if(isFinite(l-c)){if(n){for(;l>c;c++)for(var h=1;f>h;h++)a.push(o(c)*h);a.push(o(c));

}else for(a.push(o(c));c++<l;)for(var h=f-1;h>0;h--)a.push(o(c)*h);for(c=0;a[c]<u;c++);
for(l=a.length;a[l-1]>s;l--);a=a.slice(c,l)}return a},a.tickFormat=function(t,e){
if(!arguments.length)return ws;arguments.length<2?e=ws:"function"!=typeof e&&(e=ra.format(e));

var r,u=Math.max(.1,t/a.ticks().length),s=n?(r=1e-12,Math.ceil):(r=-1e-12,Math.floor);

return function(t){return t/o(s(i(t)+r))<=u?e(t):""}},a.copy=function(){return Ki(t.copy(),e,n,r);

},Wi(a,t)}function Qi(t,e,n){function r(e){return t(i(e))}var i=to(e),o=to(1/e);return r.invert=function(e){
return o(t.invert(e))},r.domain=function(e){return arguments.length?(t.domain((n=e.map(Number)).map(i)),
r):n},r.ticks=function(t){return Vi(n,t)},r.tickFormat=function(t,e){return Zi(n,t,e);

},r.nice=function(t){return r.domain(Yi(n,t))},r.exponent=function(a){return arguments.length?(i=to(e=a),
o=to(1/e),t.domain(n.map(i)),r):e},r.copy=function(){return Qi(t.copy(),e,n)},Wi(r,t);

}function to(t){return function(e){return 0>e?-Math.pow(-e,t):Math.pow(e,t)}}function eo(t,e){
function n(n){return o[((i.get(n)||("range"===e.t?i.set(n,t.push(n)):0/0))-1)%o.length];

}function r(e,n){return ra.range(t.length).map(function(t){return e+n*t})}var i,o,a;

return n.domain=function(r){if(!arguments.length)return t;t=[],i=new l;for(var o,a=-1,u=r.length;++a<u;)i.has(o=r[a])||i.set(o,t.push(o));

return n[e.t].apply(n,e.a)},n.range=function(t){return arguments.length?(o=t,a=0,
e={t:"range",a:arguments},n):o},n.rangePoints=function(i,u){arguments.length<2&&(u=0);

var s=i[0],c=i[1],l=t.length<2?(s=(s+c)/2,0):(c-s)/(t.length-1+u);return o=r(s+l*u/2,l),
a=0,e={t:"rangePoints",a:arguments},n},n.rangeRoundPoints=function(i,u){arguments.length<2&&(u=0);

var s=i[0],c=i[1],l=t.length<2?(s=c=Math.round((s+c)/2),0):(c-s)/(t.length-1+u)|0;

return o=r(s+Math.round(l*u/2+(c-s-(t.length-1+u)*l)/2),l),a=0,e={t:"rangeRoundPoints",
a:arguments},n},n.rangeBands=function(i,u,s){arguments.length<2&&(u=0),arguments.length<3&&(s=u);

var c=i[1]<i[0],l=i[c-0],f=i[1-c],h=(f-l)/(t.length-u+2*s);return o=r(l+h*s,h),c&&o.reverse(),
a=h*(1-u),e={t:"rangeBands",a:arguments},n},n.rangeRoundBands=function(i,u,s){arguments.length<2&&(u=0),
arguments.length<3&&(s=u);var c=i[1]<i[0],l=i[c-0],f=i[1-c],h=Math.floor((f-l)/(t.length-u+2*s));

return o=r(l+Math.round((f-l-(t.length-u)*h)/2),h),c&&o.reverse(),a=Math.round(h*(1-u)),
e={t:"rangeRoundBands",a:arguments},n},n.rangeBand=function(){return a},n.rangeExtent=function(){
return Pi(e.a[0])},n.copy=function(){return eo(t,e)},n.domain(t)}function no(t,e){
function n(){var n=0,r=e.length;for(u=[];++n<r;)u[n-1]=ra.quantile(t,n/r);return a;

}function a(t){return isNaN(t=+t)?void 0:e[ra.bisect(u,t)]}var u;return a.domain=function(e){
return arguments.length?(t=e.map(i).filter(o).sort(r),n()):t},a.range=function(t){
return arguments.length?(e=t,n()):e},a.quantiles=function(){return u},a.invertExtent=function(n){
return n=e.indexOf(n),0>n?[0/0,0/0]:[n>0?u[n-1]:t[0],n<u.length?u[n]:t[t.length-1]];

},a.copy=function(){return no(t,e)},n()}function ro(t,e,n){function r(e){return n[Math.max(0,Math.min(a,Math.floor(o*(e-t))))];

}function i(){return o=n.length/(e-t),a=n.length-1,r}var o,a;return r.domain=function(n){
return arguments.length?(t=+n[0],e=+n[n.length-1],i()):[t,e]},r.range=function(t){
return arguments.length?(n=t,i()):n},r.invertExtent=function(e){return e=n.indexOf(e),
e=0>e?0/0:e/o+t,[e,e+1/o]},r.copy=function(){return ro(t,e,n)},i()}function io(t,e){
function n(n){return n>=n?e[ra.bisect(t,n)]:void 0}return n.domain=function(e){return arguments.length?(t=e,
n):t},n.range=function(t){return arguments.length?(e=t,n):e},n.invertExtent=function(n){
return n=e.indexOf(n),[t[n-1],t[n]]},n.copy=function(){return io(t,e)},n}function oo(t){
function e(t){return+t}return e.invert=e,e.domain=e.range=function(n){return arguments.length?(t=n.map(e),
e):t},e.ticks=function(e){return Vi(t,e)},e.tickFormat=function(e,n){return Zi(t,e,n);

},e.copy=function(){return oo(t)},e}function ao(){return 0}function uo(t){return t.innerRadius;

}function so(t){return t.outerRadius}function co(t){return t.startAngle}function lo(t){
return t.endAngle}function fo(t){return t&&t.padAngle}function ho(t,e,n,r){return(t-n)*e-(e-r)*t>0?0:1;

}function po(t,e,n,r,i){var o=t[0]-e[0],a=t[1]-e[1],u=(i?r:-r)/Math.sqrt(o*o+a*a),s=u*a,c=-u*o,l=t[0]+s,f=t[1]+c,h=e[0]+s,p=e[1]+c,d=(l+h)/2,g=(f+p)/2,v=h-l,m=p-f,y=v*v+m*m,x=n-r,b=l*p-h*f,w=(0>m?-1:1)*Math.sqrt(x*x*y-b*b),M=(b*m-v*w)/y,k=(-b*v-m*w)/y,_=(b*m+v*w)/y,S=(-b*v+m*w)/y,C=M-d,E=k-g,T=_-d,A=S-g;

return C*C+E*E>T*T+A*A&&(M=_,k=S),[[M-s,k-c],[M*n/x,k*n/x]]}function go(t){function e(e){
function a(){c.push("M",o(t(l),u))}for(var s,c=[],l=[],f=-1,h=e.length,p=Et(n),d=Et(r);++f<h;)i.call(this,s=e[f],f)?l.push([+p.call(this,s,f),+d.call(this,s,f)]):l.length&&(a(),
l=[]);return l.length&&a(),c.length?c.join(""):null}var n=An,r=Nn,i=Ae,o=vo,a=o.key,u=.7;

return e.x=function(t){return arguments.length?(n=t,e):n},e.y=function(t){return arguments.length?(r=t,
e):r},e.defined=function(t){return arguments.length?(i=t,e):i},e.interpolate=function(t){
return arguments.length?(a="function"==typeof t?o=t:(o=Ts.get(t)||vo).key,e):a},e.tension=function(t){
return arguments.length?(u=t,e):u},e}function vo(t){return t.join("L")}function mo(t){
return vo(t)+"Z"}function yo(t){for(var e=0,n=t.length,r=t[0],i=[r[0],",",r[1]];++e<n;)i.push("H",(r[0]+(r=t[e])[0])/2,"V",r[1]);

return n>1&&i.push("H",r[0]),i.join("")}function xo(t){for(var e=0,n=t.length,r=t[0],i=[r[0],",",r[1]];++e<n;)i.push("V",(r=t[e])[1],"H",r[0]);

return i.join("")}function bo(t){for(var e=0,n=t.length,r=t[0],i=[r[0],",",r[1]];++e<n;)i.push("H",(r=t[e])[0],"V",r[1]);

return i.join("")}function wo(t,e){return t.length<4?vo(t):t[1]+_o(t.slice(1,-1),So(t,e));

}function Mo(t,e){return t.length<3?vo(t):t[0]+_o((t.push(t[0]),t),So([t[t.length-2]].concat(t,[t[1]]),e));

}function ko(t,e){return t.length<3?vo(t):t[0]+_o(t,So(t,e))}function _o(t,e){if(e.length<1||t.length!=e.length&&t.length!=e.length+2)return vo(t);

var n=t.length!=e.length,r="",i=t[0],o=t[1],a=e[0],u=a,s=1;if(n&&(r+="Q"+(o[0]-2*a[0]/3)+","+(o[1]-2*a[1]/3)+","+o[0]+","+o[1],
i=t[1],s=2),e.length>1){u=e[1],o=t[s],s++,r+="C"+(i[0]+a[0])+","+(i[1]+a[1])+","+(o[0]-u[0])+","+(o[1]-u[1])+","+o[0]+","+o[1];

for(var c=2;c<e.length;c++,s++)o=t[s],u=e[c],r+="S"+(o[0]-u[0])+","+(o[1]-u[1])+","+o[0]+","+o[1];

}if(n){var l=t[s];r+="Q"+(o[0]+2*u[0]/3)+","+(o[1]+2*u[1]/3)+","+l[0]+","+l[1]}return r;

}function So(t,e){for(var n,r=[],i=(1-e)/2,o=t[0],a=t[1],u=1,s=t.length;++u<s;)n=o,
o=a,a=t[u],r.push([i*(a[0]-n[0]),i*(a[1]-n[1])]);return r}function Co(t){if(t.length<3)return vo(t);

var e=1,n=t.length,r=t[0],i=r[0],o=r[1],a=[i,i,i,(r=t[1])[0]],u=[o,o,o,r[1]],s=[i,",",o,"L",No(js,a),",",No(js,u)];

for(t.push(t[n-1]);++e<=n;)r=t[e],a.shift(),a.push(r[0]),u.shift(),u.push(r[1]),jo(s,a,u);

return t.pop(),s.push("L",r),s.join("")}function Eo(t){if(t.length<4)return vo(t);

for(var e,n=[],r=-1,i=t.length,o=[0],a=[0];++r<3;)e=t[r],o.push(e[0]),a.push(e[1]);

for(n.push(No(js,o)+","+No(js,a)),--r;++r<i;)e=t[r],o.shift(),o.push(e[0]),a.shift(),
a.push(e[1]),jo(n,o,a);return n.join("")}function To(t){for(var e,n,r=-1,i=t.length,o=i+4,a=[],u=[];++r<4;)n=t[r%i],
a.push(n[0]),u.push(n[1]);for(e=[No(js,a),",",No(js,u)],--r;++r<o;)n=t[r%i],a.shift(),
a.push(n[0]),u.shift(),u.push(n[1]),jo(e,a,u);return e.join("")}function Ao(t,e){
var n=t.length-1;if(n)for(var r,i,o=t[0][0],a=t[0][1],u=t[n][0]-o,s=t[n][1]-a,c=-1;++c<=n;)r=t[c],
i=c/n,r[0]=e*r[0]+(1-e)*(o+i*u),r[1]=e*r[1]+(1-e)*(a+i*s);return Co(t)}function No(t,e){
return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]+t[3]*e[3]}function jo(t,e,n){t.push("C",No(As,e),",",No(As,n),",",No(Ns,e),",",No(Ns,n),",",No(js,e),",",No(js,n));

}function qo(t,e){return(e[1]-t[1])/(e[0]-t[0])}function Do(t){for(var e=0,n=t.length-1,r=[],i=t[0],o=t[1],a=r[0]=qo(i,o);++e<n;)r[e]=(a+(a=qo(i=o,o=t[e+1])))/2;

return r[e]=a,r}function Lo(t){for(var e,n,r,i,o=[],a=Do(t),u=-1,s=t.length-1;++u<s;)e=qo(t[u],t[u+1]),
ga(e)<ja?a[u]=a[u+1]=0:(n=a[u]/e,r=a[u+1]/e,i=n*n+r*r,i>9&&(i=3*e/Math.sqrt(i),a[u]=i*n,
a[u+1]=i*r));for(u=-1;++u<=s;)i=(t[Math.min(s,u+1)][0]-t[Math.max(0,u-1)][0])/(6*(1+a[u]*a[u])),
o.push([i||0,a[u]*i||0]);return o}function Oo(t){return t.length<3?vo(t):t[0]+_o(t,Lo(t));

}function Ro(t){for(var e,n,r,i=-1,o=t.length;++i<o;)e=t[i],n=e[0],r=e[1]-Ra,e[0]=n*Math.cos(r),
e[1]=n*Math.sin(r);return t}function zo(t){function e(e){function s(){g.push("M",u(t(m),f),l,c(t(v.reverse()),f),"Z");

}for(var h,p,d,g=[],v=[],m=[],y=-1,x=e.length,b=Et(n),w=Et(i),M=n===r?function(){
return p}:Et(r),k=i===o?function(){return d}:Et(o);++y<x;)a.call(this,h=e[y],y)?(v.push([p=+b.call(this,h,y),d=+w.call(this,h,y)]),
m.push([+M.call(this,h,y),+k.call(this,h,y)])):v.length&&(s(),v=[],m=[]);return v.length&&s(),
g.length?g.join(""):null}var n=An,r=An,i=0,o=Nn,a=Ae,u=vo,s=u.key,c=u,l="L",f=.7;
return e.x=function(t){return arguments.length?(n=r=t,e):r},e.x0=function(t){return arguments.length?(n=t,
e):n},e.x1=function(t){return arguments.length?(r=t,e):r},e.y=function(t){return arguments.length?(i=o=t,
e):o},e.y0=function(t){return arguments.length?(i=t,e):i},e.y1=function(t){return arguments.length?(o=t,
e):o},e.defined=function(t){return arguments.length?(a=t,e):a},e.interpolate=function(t){
return arguments.length?(s="function"==typeof t?u=t:(u=Ts.get(t)||vo).key,c=u.reverse||u,
l=u.closed?"M":"L",e):s},e.tension=function(t){return arguments.length?(f=t,e):f},
e}function Po(t){return t.radius}function Ho(t){return[t.x,t.y]}function Fo(t){return function(){
var e=t.apply(this,arguments),n=e[0],r=e[1]-Ra;return[n*Math.cos(r),n*Math.sin(r)];

}}function Io(){return 64}function Uo(){return"circle"}function $o(t){var e=Math.sqrt(t/Da);

return"M0,"+e+"A"+e+","+e+" 0 1,1 0,"+-e+"A"+e+","+e+" 0 1,1 0,"+e+"Z"}function Bo(t){
return function(){var e,n;(e=this[t])&&(n=e[e.active])&&(--e.count?delete e[e.active]:delete this[t],
e.active+=.5,n.event&&n.event.interrupt.call(this,this.__data__,n.index))}}function Wo(t,e,n){
return ba(t,Ps),t.namespace=e,t.id=n,t}function Yo(t,e,n,r){var i=t.id,o=t.namespace;

return B(t,"function"==typeof n?function(t,a,u){t[o][i].tween.set(e,r(n.call(t,t.__data__,a,u)));

}:(n=r(n),function(t){t[o][i].tween.set(e,n)}))}function Xo(t){return null==t&&(t=""),
function(){this.textContent=t}}function Vo(t){return null==t?"__transition__":"__transition_"+t+"__";

}function Zo(t,e,n,r,i){var o=t[n]||(t[n]={active:0,count:0}),a=o[r];if(!a){var u=i.time;

a=o[r]={tween:new l,time:u,delay:i.delay,duration:i.duration,ease:i.ease,index:e},
i=null,++o.count,ra.timer(function(i){function s(n){if(o.active>r)return l();var i=o[o.active];

i&&(--o.count,delete o[o.active],i.event&&i.event.interrupt.call(t,t.__data__,i.index)),
o.active=r,a.event&&a.event.start.call(t,t.__data__,e),a.tween.forEach(function(n,r){
(r=r.call(t,t.__data__,e))&&g.push(r)}),h=a.ease,f=a.duration,ra.timer(function(){
return d.c=c(n||1)?Ae:c,1},0,u)}function c(n){if(o.active!==r)return 1;for(var i=n/f,u=h(i),s=g.length;s>0;)g[--s].call(t,u);

return i>=1?(a.event&&a.event.end.call(t,t.__data__,e),l()):void 0}function l(){return--o.count?delete o[r]:delete t[n],
1}var f,h,p=a.delay,d=iu,g=[];return d.t=p+u,i>=p?s(i-p):void(d.c=s)},0,u)}}function Jo(t,e,n){
t.attr("transform",function(t){var r=e(t);return"translate("+(isFinite(r)?r:n(t))+",0)";

})}function Go(t,e,n){t.attr("transform",function(t){var r=e(t);return"translate(0,"+(isFinite(r)?r:n(t))+")";

})}function Ko(t){return t.toISOString()}function Qo(t,e,n){function r(e){return t(e);

}function i(t,n){var r=t[1]-t[0],i=r/n,o=ra.bisect(Xs,i);return o==Xs.length?[e.year,Xi(t.map(function(t){
return t/31536e6}),n)[2]]:o?e[i/Xs[o-1]<Xs[o]/i?o-1:o]:[Js,Xi(t,n)[2]]}return r.invert=function(e){
return ta(t.invert(e))},r.domain=function(e){return arguments.length?(t.domain(e),
r):t.domain().map(ta)},r.nice=function(t,e){function n(n){return!isNaN(n)&&!t.range(n,ta(+n+1),e).length;

}var o=r.domain(),a=Pi(o),u=null==t?i(a,10):"number"==typeof t&&i(a,t);return u&&(t=u[0],
e=u[1]),r.domain(Ii(o,e>1?{floor:function(e){for(;n(e=t.floor(e));)e=ta(e-1);return e;

},ceil:function(e){for(;n(e=t.ceil(e));)e=ta(+e+1);return e}}:t))},r.ticks=function(t,e){
var n=Pi(r.domain()),o=null==t?i(n,10):"number"==typeof t?i(n,t):!t.range&&[{range:t
},e];return o&&(t=o[0],e=o[1]),t.range(n[0],ta(+n[1]+1),1>e?1:e)},r.tickFormat=function(){
return n},r.copy=function(){return Qo(t.copy(),e,n)},Wi(r,t)}function ta(t){return new Date(t);

}function ea(t){return JSON.parse(t.responseText)}function na(t){var e=aa.createRange();

return e.selectNode(aa.body),e.createContextualFragment(t.responseText)}var ra={version:"3.5.6"
},ia=[].slice,oa=function(t){return ia.call(t)},aa=this.document;if(aa)try{oa(aa.documentElement.childNodes)[0].nodeType;

}catch(ua){oa=function(t){for(var e=t.length,n=new Array(e);e--;)n[e]=t[e];return n;

}}if(Date.now||(Date.now=function(){return+new Date}),aa)try{aa.createElement("DIV").style.setProperty("opacity",0,"");

}catch(sa){var ca=this.Element.prototype,la=ca.setAttribute,fa=ca.setAttributeNS,ha=this.CSSStyleDeclaration.prototype,pa=ha.setProperty;

ca.setAttribute=function(t,e){la.call(this,t,e+"")},ca.setAttributeNS=function(t,e,n){
fa.call(this,t,e,n+"")},ha.setProperty=function(t,e,n){pa.call(this,t,e+"",n)}}ra.ascending=r,
ra.descending=function(t,e){return t>e?-1:e>t?1:e>=t?0:0/0},ra.min=function(t,e){
var n,r,i=-1,o=t.length;if(1===arguments.length){for(;++i<o;)if(null!=(r=t[i])&&r>=r){
n=r;break}for(;++i<o;)null!=(r=t[i])&&n>r&&(n=r)}else{for(;++i<o;)if(null!=(r=e.call(t,t[i],i))&&r>=r){
n=r;break}for(;++i<o;)null!=(r=e.call(t,t[i],i))&&n>r&&(n=r)}return n},ra.max=function(t,e){
var n,r,i=-1,o=t.length;if(1===arguments.length){for(;++i<o;)if(null!=(r=t[i])&&r>=r){
n=r;break}for(;++i<o;)null!=(r=t[i])&&r>n&&(n=r)}else{for(;++i<o;)if(null!=(r=e.call(t,t[i],i))&&r>=r){
n=r;break}for(;++i<o;)null!=(r=e.call(t,t[i],i))&&r>n&&(n=r)}return n},ra.extent=function(t,e){
var n,r,i,o=-1,a=t.length;if(1===arguments.length){for(;++o<a;)if(null!=(r=t[o])&&r>=r){
n=i=r;break}for(;++o<a;)null!=(r=t[o])&&(n>r&&(n=r),r>i&&(i=r))}else{for(;++o<a;)if(null!=(r=e.call(t,t[o],o))&&r>=r){
n=i=r;break}for(;++o<a;)null!=(r=e.call(t,t[o],o))&&(n>r&&(n=r),r>i&&(i=r))}return[n,i];

},ra.sum=function(t,e){var n,r=0,i=t.length,a=-1;if(1===arguments.length)for(;++a<i;)o(n=+t[a])&&(r+=n);
else for(;++a<i;)o(n=+e.call(t,t[a],a))&&(r+=n);return r},ra.mean=function(t,e){var n,r=0,a=t.length,u=-1,s=a;

if(1===arguments.length)for(;++u<a;)o(n=i(t[u]))?r+=n:--s;else for(;++u<a;)o(n=i(e.call(t,t[u],u)))?r+=n:--s;

return s?r/s:void 0},ra.quantile=function(t,e){var n=(t.length-1)*e+1,r=Math.floor(n),i=+t[r-1],o=n-r;

return o?i+o*(t[r]-i):i},ra.median=function(t,e){var n,a=[],u=t.length,s=-1;if(1===arguments.length)for(;++s<u;)o(n=i(t[s]))&&a.push(n);
else for(;++s<u;)o(n=i(e.call(t,t[s],s)))&&a.push(n);return a.length?ra.quantile(a.sort(r),.5):void 0;

},ra.variance=function(t,e){var n,r,a=t.length,u=0,s=0,c=-1,l=0;if(1===arguments.length)for(;++c<a;)o(n=i(t[c]))&&(r=n-u,
u+=r/++l,s+=r*(n-u));else for(;++c<a;)o(n=i(e.call(t,t[c],c)))&&(r=n-u,u+=r/++l,s+=r*(n-u));

return l>1?s/(l-1):void 0},ra.deviation=function(){var t=ra.variance.apply(this,arguments);

return t?Math.sqrt(t):t};var da=a(r);ra.bisectLeft=da.left,ra.bisect=ra.bisectRight=da.right,
ra.bisector=function(t){return a(1===t.length?function(e,n){return r(t(e),n)}:t)},
ra.shuffle=function(t,e,n){(o=arguments.length)<3&&(n=t.length,2>o&&(e=0));for(var r,i,o=n-e;o;)i=Math.random()*o--|0,
r=t[o+e],t[o+e]=t[i+e],t[i+e]=r;return t},ra.permute=function(t,e){for(var n=e.length,r=new Array(n);n--;)r[n]=t[e[n]];

return r},ra.pairs=function(t){for(var e,n=0,r=t.length-1,i=t[0],o=new Array(0>r?0:r);r>n;)o[n]=[e=i,i=t[++n]];

return o},ra.zip=function(){if(!(r=arguments.length))return[];for(var t=-1,e=ra.min(arguments,u),n=new Array(e);++t<e;)for(var r,i=-1,o=n[t]=new Array(r);++i<r;)o[i]=arguments[i][t];

return n},ra.transpose=function(t){return ra.zip.apply(ra,t)},ra.keys=function(t){
var e=[];for(var n in t)e.push(n);return e},ra.values=function(t){var e=[];for(var n in t)e.push(t[n]);

return e},ra.entries=function(t){var e=[];for(var n in t)e.push({key:n,value:t[n]
});return e},ra.merge=function(t){for(var e,n,r,i=t.length,o=-1,a=0;++o<i;)a+=t[o].length;

for(n=new Array(a);--i>=0;)for(r=t[i],e=r.length;--e>=0;)n[--a]=r[e];return n};var ga=Math.abs;

ra.range=function(t,e,n){if(arguments.length<3&&(n=1,arguments.length<2&&(e=t,t=0)),
(e-t)/n===1/0)throw new Error("infinite range");var r,i=[],o=s(ga(n)),a=-1;if(t*=o,
e*=o,n*=o,0>n)for(;(r=t+n*++a)>e;)i.push(r/o);else for(;(r=t+n*++a)<e;)i.push(r/o);

return i},ra.map=function(t,e){var n=new l;if(t instanceof l)t.forEach(function(t,e){
n.set(t,e)});else if(Array.isArray(t)){var r,i=-1,o=t.length;if(1===arguments.length)for(;++i<o;)n.set(i,t[i]);
else for(;++i<o;)n.set(e.call(t,r=t[i],i),r)}else for(var a in t)n.set(a,t[a]);return n;

};var va="__proto__",ma="\x00";c(l,{has:p,get:function(t){return this._[f(t)]},set:function(t,e){
return this._[f(t)]=e},remove:d,keys:g,values:function(){var t=[];for(var e in this._)t.push(this._[e]);

return t},entries:function(){var t=[];for(var e in this._)t.push({key:h(e),value:this._[e]
});return t},size:v,empty:m,forEach:function(t){for(var e in this._)t.call(this,h(e),this._[e]);

}}),ra.nest=function(){function t(e,a,u){if(u>=o.length)return r?r.call(i,a):n?a.sort(n):a;

for(var s,c,f,h,p=-1,d=a.length,g=o[u++],v=new l;++p<d;)(h=v.get(s=g(c=a[p])))?h.push(c):v.set(s,[c]);

return e?(c=e(),f=function(n,r){c.set(n,t(e,r,u))}):(c={},f=function(n,r){c[n]=t(e,r,u);

}),v.forEach(f),c}function e(t,n){if(n>=o.length)return t;var r=[],i=a[n++];return t.forEach(function(t,i){
r.push({key:t,values:e(i,n)})}),i?r.sort(function(t,e){return i(t.key,e.key)}):r}
var n,r,i={},o=[],a=[];return i.map=function(e,n){return t(n,e,0)},i.entries=function(n){
return e(t(ra.map,n,0),0)},i.key=function(t){return o.push(t),i},i.sortKeys=function(t){
return a[o.length-1]=t,i},i.sortValues=function(t){return n=t,i},i.rollup=function(t){
return r=t,i},i},ra.set=function(t){var e=new y;if(t)for(var n=0,r=t.length;r>n;++n)e.add(t[n]);

return e},c(y,{has:p,add:function(t){return this._[f(t+="")]=!0,t},remove:d,values:g,
size:v,empty:m,forEach:function(t){for(var e in this._)t.call(this,h(e))}}),ra.behavior={},
ra.rebind=function(t,e){for(var n,r=1,i=arguments.length;++r<i;)t[n=arguments[r]]=b(t,e,e[n]);

return t};var ya=["webkit","ms","moz","Moz","o","O"];ra.dispatch=function(){for(var t=new k,e=-1,n=arguments.length;++e<n;)t[arguments[e]]=_(t);

return t},k.prototype.on=function(t,e){var n=t.indexOf("."),r="";if(n>=0&&(r=t.slice(n+1),
t=t.slice(0,n)),t)return arguments.length<2?this[t].on(r):this[t].on(r,e);if(2===arguments.length){
if(null==e)for(t in this)this.hasOwnProperty(t)&&this[t].on(r,null);return this}},
ra.event=null,ra.requote=function(t){return t.replace(xa,"\\$&")};var xa=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,ba={}.__proto__?function(t,e){
t.__proto__=e}:function(t,e){for(var n in e)t[n]=e[n]},wa=function(t,e){return e.querySelector(t);

},Ma=function(t,e){return e.querySelectorAll(t)},ka=function(t,e){var n=t.matches||t[w(t,"matchesSelector")];

return(ka=function(t,e){return n.call(t,e)})(t,e)};"function"==typeof Sizzle&&(wa=function(t,e){
return Sizzle(t,e)[0]||null},Ma=Sizzle,ka=Sizzle.matchesSelector),ra.selection=function(){
return ra.select(aa.documentElement)};var _a=ra.selection.prototype=[];_a.select=function(t){
var e,n,r,i,o=[];t=A(t);for(var a=-1,u=this.length;++a<u;){o.push(e=[]),e.parentNode=(r=this[a]).parentNode;

for(var s=-1,c=r.length;++s<c;)(i=r[s])?(e.push(n=t.call(i,i.__data__,s,a)),n&&"__data__"in i&&(n.__data__=i.__data__)):e.push(null);

}return T(o)},_a.selectAll=function(t){var e,n,r=[];t=N(t);for(var i=-1,o=this.length;++i<o;)for(var a=this[i],u=-1,s=a.length;++u<s;)(n=a[u])&&(r.push(e=oa(t.call(n,n.__data__,u,i))),
e.parentNode=n);return T(r)};var Sa={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",
xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"
};ra.ns={prefix:Sa,qualify:function(t){var e=t.indexOf(":"),n=t;return e>=0&&(n=t.slice(0,e),
t=t.slice(e+1)),Sa.hasOwnProperty(n)?{space:Sa[n],local:t}:t}},_a.attr=function(t,e){
if(arguments.length<2){if("string"==typeof t){var n=this.node();return t=ra.ns.qualify(t),
t.local?n.getAttributeNS(t.space,t.local):n.getAttribute(t)}for(e in t)this.each(j(e,t[e]));

return this}return this.each(j(t,e))},_a.classed=function(t,e){if(arguments.length<2){
if("string"==typeof t){var n=this.node(),r=(t=L(t)).length,i=-1;if(e=n.classList){
for(;++i<r;)if(!e.contains(t[i]))return!1}else for(e=n.getAttribute("class");++i<r;)if(!D(t[i]).test(e))return!1;

return!0}for(e in t)this.each(O(e,t[e]));return this}return this.each(O(t,e))},_a.style=function(t,e,r){
var i=arguments.length;if(3>i){if("string"!=typeof t){2>i&&(e="");for(r in t)this.each(z(r,t[r],e));

return this}if(2>i){var o=this.node();return n(o).getComputedStyle(o,null).getPropertyValue(t);

}r=""}return this.each(z(t,e,r))},_a.property=function(t,e){if(arguments.length<2){
if("string"==typeof t)return this.node()[t];for(e in t)this.each(P(e,t[e]));return this;

}return this.each(P(t,e))},_a.text=function(t){return arguments.length?this.each("function"==typeof t?function(){
var e=t.apply(this,arguments);this.textContent=null==e?"":e}:null==t?function(){this.textContent="";

}:function(){this.textContent=t}):this.node().textContent},_a.html=function(t){return arguments.length?this.each("function"==typeof t?function(){
var e=t.apply(this,arguments);this.innerHTML=null==e?"":e}:null==t?function(){this.innerHTML="";

}:function(){this.innerHTML=t}):this.node().innerHTML},_a.append=function(t){return t=H(t),
this.select(function(){return this.appendChild(t.apply(this,arguments))})},_a.insert=function(t,e){
return t=H(t),e=A(e),this.select(function(){return this.insertBefore(t.apply(this,arguments),e.apply(this,arguments)||null);

})},_a.remove=function(){return this.each(F)},_a.data=function(t,e){function n(t,n){
var r,i,o,a=t.length,f=n.length,h=Math.min(a,f),p=new Array(f),d=new Array(f),g=new Array(a);

if(e){var v,m=new l,y=new Array(a);for(r=-1;++r<a;)m.has(v=e.call(i=t[r],i.__data__,r))?g[r]=i:m.set(v,i),
y[r]=v;for(r=-1;++r<f;)(i=m.get(v=e.call(n,o=n[r],r)))?i!==!0&&(p[r]=i,i.__data__=o):d[r]=I(o),
m.set(v,!0);for(r=-1;++r<a;)m.get(y[r])!==!0&&(g[r]=t[r])}else{for(r=-1;++r<h;)i=t[r],
o=n[r],i?(i.__data__=o,p[r]=i):d[r]=I(o);for(;f>r;++r)d[r]=I(n[r]);for(;a>r;++r)g[r]=t[r];

}d.update=p,d.parentNode=p.parentNode=g.parentNode=t.parentNode,u.push(d),s.push(p),
c.push(g)}var r,i,o=-1,a=this.length;if(!arguments.length){for(t=new Array(a=(r=this[0]).length);++o<a;)(i=r[o])&&(t[o]=i.__data__);

return t}var u=W([]),s=T([]),c=T([]);if("function"==typeof t)for(;++o<a;)n(r=this[o],t.call(r,r.parentNode.__data__,o));
else for(;++o<a;)n(r=this[o],t);return s.enter=function(){return u},s.exit=function(){
return c},s},_a.datum=function(t){return arguments.length?this.property("__data__",t):this.property("__data__");

},_a.filter=function(t){var e,n,r,i=[];"function"!=typeof t&&(t=U(t));for(var o=0,a=this.length;a>o;o++){
i.push(e=[]),e.parentNode=(n=this[o]).parentNode;for(var u=0,s=n.length;s>u;u++)(r=n[u])&&t.call(r,r.__data__,u,o)&&e.push(r);

}return T(i)},_a.order=function(){for(var t=-1,e=this.length;++t<e;)for(var n,r=this[t],i=r.length-1,o=r[i];--i>=0;)(n=r[i])&&(o&&o!==n.nextSibling&&o.parentNode.insertBefore(n,o),
o=n);return this},_a.sort=function(t){t=$.apply(this,arguments);for(var e=-1,n=this.length;++e<n;)this[e].sort(t);

return this.order()},_a.each=function(t){return B(this,function(e,n,r){t.call(e,e.__data__,n,r);

})},_a.call=function(t){var e=oa(arguments);return t.apply(e[0]=this,e),this},_a.empty=function(){
return!this.node()},_a.node=function(){for(var t=0,e=this.length;e>t;t++)for(var n=this[t],r=0,i=n.length;i>r;r++){
var o=n[r];if(o)return o}return null},_a.size=function(){var t=0;return B(this,function(){
++t}),t};var Ca=[];ra.selection.enter=W,ra.selection.enter.prototype=Ca,Ca.append=_a.append,
Ca.empty=_a.empty,Ca.node=_a.node,Ca.call=_a.call,Ca.size=_a.size,Ca.select=function(t){
for(var e,n,r,i,o,a=[],u=-1,s=this.length;++u<s;){r=(i=this[u]).update,a.push(e=[]),
e.parentNode=i.parentNode;for(var c=-1,l=i.length;++c<l;)(o=i[c])?(e.push(r[c]=n=t.call(i.parentNode,o.__data__,c,u)),
n.__data__=o.__data__):e.push(null)}return T(a)},Ca.insert=function(t,e){return arguments.length<2&&(e=Y(this)),
_a.insert.call(this,t,e)},ra.select=function(e){var n;return"string"==typeof e?(n=[wa(e,aa)],
n.parentNode=aa.documentElement):(n=[e],n.parentNode=t(e)),T([n])},ra.selectAll=function(t){
var e;return"string"==typeof t?(e=oa(Ma(t,aa)),e.parentNode=aa.documentElement):(e=t,
e.parentNode=null),T([e])},_a.on=function(t,e,n){var r=arguments.length;if(3>r){if("string"!=typeof t){
2>r&&(e=!1);for(n in t)this.each(X(n,t[n],e));return this}if(2>r)return(r=this.node()["__on"+t])&&r._;

n=!1}return this.each(X(t,e,n))};var Ea=ra.map({mouseenter:"mouseover",mouseleave:"mouseout"
});aa&&Ea.forEach(function(t){"on"+t in aa&&Ea.remove(t)});var Ta,Aa=0;ra.mouse=function(t){
return G(t,C())};var Na=this.navigator&&/WebKit/.test(this.navigator.userAgent)?-1:0;

ra.touch=function(t,e,n){if(arguments.length<3&&(n=e,e=C().changedTouches),e)for(var r,i=0,o=e.length;o>i;++i)if((r=e[i]).identifier===n)return G(t,r);

},ra.behavior.drag=function(){function t(){this.on("mousedown.drag",o).on("touchstart.drag",a);

}function e(t,e,n,o,a){return function(){function u(){var t,n,r=e(h,g);r&&(t=r[0]-x[0],
n=r[1]-x[1],d|=t|n,x=r,p({type:"drag",x:r[0]+c[0],y:r[1]+c[1],dx:t,dy:n}))}function s(){
e(h,g)&&(m.on(o+v,null).on(a+v,null),y(d&&ra.event.target===f),p({type:"dragend"}));

}var c,l=this,f=ra.event.target,h=l.parentNode,p=r.of(l,arguments),d=0,g=t(),v=".drag"+(null==g?"":"-"+g),m=ra.select(n(f)).on(o+v,u).on(a+v,s),y=J(f),x=e(h,g);

i?(c=i.apply(l,arguments),c=[c.x-x[0],c.y-x[1]]):c=[0,0],p({type:"dragstart"})}}var r=E(t,"drag","dragstart","dragend"),i=null,o=e(M,ra.mouse,n,"mousemove","mouseup"),a=e(K,ra.touch,x,"touchmove","touchend");

return t.origin=function(e){return arguments.length?(i=e,t):i},ra.rebind(t,r,"on");

},ra.touches=function(t,e){return arguments.length<2&&(e=C().touches),e?oa(e).map(function(e){
var n=G(t,e);return n.identifier=e.identifier,n}):[]};var ja=1e-6,qa=ja*ja,Da=Math.PI,La=2*Da,Oa=La-ja,Ra=Da/2,za=Da/180,Pa=180/Da,Ha=Math.SQRT2,Fa=2,Ia=4;

ra.interpolateZoom=function(t,e){function n(t){var e=t*y;if(m){var n=it(g),a=o/(Fa*h)*(n*ot(Ha*e+g)-rt(g));

return[r+a*c,i+a*l,o*n/it(Ha*e+g)]}return[r+t*c,i+t*l,o*Math.exp(Ha*e)]}var r=t[0],i=t[1],o=t[2],a=e[0],u=e[1],s=e[2],c=a-r,l=u-i,f=c*c+l*l,h=Math.sqrt(f),p=(s*s-o*o+Ia*f)/(2*o*Fa*h),d=(s*s-o*o-Ia*f)/(2*s*Fa*h),g=Math.log(Math.sqrt(p*p+1)-p),v=Math.log(Math.sqrt(d*d+1)-d),m=v-g,y=(m||Math.log(s/o))/Ha;

return n.duration=1e3*y,n},ra.behavior.zoom=function(){function t(t){t.on(j,f).on($a+".zoom",p).on("dblclick.zoom",d).on(L,h);

}function e(t){return[(t[0]-_.x)/_.k,(t[1]-_.y)/_.k]}function r(t){return[t[0]*_.k+_.x,t[1]*_.k+_.y];

}function i(t){_.k=Math.max(T[0],Math.min(T[1],t))}function o(t,e){e=r(e),_.x+=t[0]-e[0],
_.y+=t[1]-e[1]}function a(e,n,r,a){e.__chart__={x:_.x,y:_.y,k:_.k},i(Math.pow(2,a)),
o(v=n,r),e=ra.select(e),A>0&&(e=e.transition().duration(A)),e.call(t.event)}function u(){
w&&w.domain(b.range().map(function(t){return(t-_.x)/_.k}).map(b.invert)),k&&k.domain(M.range().map(function(t){
return(t-_.y)/_.k}).map(M.invert))}function s(t){N++||t({type:"zoomstart"})}function c(t){
u(),t({type:"zoom",scale:_.k,translate:[_.x,_.y]})}function l(t){--N||(t({type:"zoomend"
}),v=null)}function f(){function t(){f=1,o(ra.mouse(i),p),c(u)}function r(){h.on(q,null).on(D,null),
d(f&&ra.event.target===a),l(u)}var i=this,a=ra.event.target,u=O.of(i,arguments),f=0,h=ra.select(n(i)).on(q,t).on(D,r),p=e(ra.mouse(i)),d=J(i);

zs.call(i),s(u)}function h(){function t(){var t=ra.touches(d);return p=_.k,t.forEach(function(t){
t.identifier in v&&(v[t.identifier]=e(t))}),t}function n(){var e=ra.event.target;
ra.select(e).on(b,r).on(w,u),M.push(e);for(var n=ra.event.changedTouches,i=0,o=n.length;o>i;++i)v[n[i].identifier]=null;

var s=t(),c=Date.now();if(1===s.length){if(500>c-x){var l=s[0];a(d,l,v[l.identifier],Math.floor(Math.log(_.k)/Math.LN2)+1),
S()}x=c}else if(s.length>1){var l=s[0],f=s[1],h=l[0]-f[0],p=l[1]-f[1];m=h*h+p*p}}
function r(){var t,e,n,r,a=ra.touches(d);zs.call(d);for(var u=0,s=a.length;s>u;++u,
r=null)if(n=a[u],r=v[n.identifier]){if(e)break;t=n,e=r}if(r){var l=(l=n[0]-t[0])*l+(l=n[1]-t[1])*l,f=m&&Math.sqrt(l/m);

t=[(t[0]+n[0])/2,(t[1]+n[1])/2],e=[(e[0]+r[0])/2,(e[1]+r[1])/2],i(f*p)}x=null,o(t,e),
c(g)}function u(){if(ra.event.touches.length){for(var e=ra.event.changedTouches,n=0,r=e.length;r>n;++n)delete v[e[n].identifier];

for(var i in v)return void t()}ra.selectAll(M).on(y,null),k.on(j,f).on(L,h),C(),l(g);

}var p,d=this,g=O.of(d,arguments),v={},m=0,y=".zoom-"+ra.event.changedTouches[0].identifier,b="touchmove"+y,w="touchend"+y,M=[],k=ra.select(d),C=J(d);

n(),s(g),k.on(j,null).on(L,n)}function p(){var t=O.of(this,arguments);y?clearTimeout(y):(zs.call(this),
g=e(v=m||ra.mouse(this)),s(t)),y=setTimeout(function(){y=null,l(t)},50),S(),i(Math.pow(2,.002*Ua())*_.k),
o(v,g),c(t)}function d(){var t=ra.mouse(this),n=Math.log(_.k)/Math.LN2;a(this,t,e(t),ra.event.shiftKey?Math.ceil(n)-1:Math.floor(n)+1);

}var g,v,m,y,x,b,w,M,k,_={x:0,y:0,k:1},C=[960,500],T=Ba,A=250,N=0,j="mousedown.zoom",q="mousemove.zoom",D="mouseup.zoom",L="touchstart.zoom",O=E(t,"zoomstart","zoom","zoomend");

return $a||($a="onwheel"in aa?(Ua=function(){return-ra.event.deltaY*(ra.event.deltaMode?120:1);

},"wheel"):"onmousewheel"in aa?(Ua=function(){return ra.event.wheelDelta},"mousewheel"):(Ua=function(){
return-ra.event.detail},"MozMousePixelScroll")),t.event=function(t){t.each(function(){
var t=O.of(this,arguments),e=_;Os?ra.select(this).transition().each("start.zoom",function(){
_=this.__chart__||{x:0,y:0,k:1},s(t)}).tween("zoom:zoom",function(){var n=C[0],r=C[1],i=v?v[0]:n/2,o=v?v[1]:r/2,a=ra.interpolateZoom([(i-_.x)/_.k,(o-_.y)/_.k,n/_.k],[(i-e.x)/e.k,(o-e.y)/e.k,n/e.k]);

return function(e){var r=a(e),u=n/r[2];this.__chart__=_={x:i-r[0]*u,y:o-r[1]*u,k:u
},c(t)}}).each("interrupt.zoom",function(){l(t)}).each("end.zoom",function(){l(t);

}):(this.__chart__=_,s(t),c(t),l(t))})},t.translate=function(e){return arguments.length?(_={
x:+e[0],y:+e[1],k:_.k},u(),t):[_.x,_.y]},t.scale=function(e){return arguments.length?(_={
x:_.x,y:_.y,k:+e},u(),t):_.k},t.scaleExtent=function(e){return arguments.length?(T=null==e?Ba:[+e[0],+e[1]],
t):T},t.center=function(e){return arguments.length?(m=e&&[+e[0],+e[1]],t):m},t.size=function(e){
return arguments.length?(C=e&&[+e[0],+e[1]],t):C},t.duration=function(e){return arguments.length?(A=+e,
t):A},t.x=function(e){return arguments.length?(w=e,b=e.copy(),_={x:0,y:0,k:1},t):w;

},t.y=function(e){return arguments.length?(k=e,M=e.copy(),_={x:0,y:0,k:1},t):k},ra.rebind(t,O,"on");

};var Ua,$a,Ba=[0,1/0];ra.color=ut,ut.prototype.toString=function(){return this.rgb()+"";

},ra.hsl=st;var Wa=st.prototype=new ut;Wa.brighter=function(t){return t=Math.pow(.7,arguments.length?t:1),
new st(this.h,this.s,this.l/t)},Wa.darker=function(t){return t=Math.pow(.7,arguments.length?t:1),
new st(this.h,this.s,t*this.l)},Wa.rgb=function(){return ct(this.h,this.s,this.l);

},ra.hcl=lt;var Ya=lt.prototype=new ut;Ya.brighter=function(t){return new lt(this.h,this.c,Math.min(100,this.l+Xa*(arguments.length?t:1)));

},Ya.darker=function(t){return new lt(this.h,this.c,Math.max(0,this.l-Xa*(arguments.length?t:1)));

},Ya.rgb=function(){return ft(this.h,this.c,this.l).rgb()},ra.lab=ht;var Xa=18,Va=.95047,Za=1,Ja=1.08883,Ga=ht.prototype=new ut;

Ga.brighter=function(t){return new ht(Math.min(100,this.l+Xa*(arguments.length?t:1)),this.a,this.b);

},Ga.darker=function(t){return new ht(Math.max(0,this.l-Xa*(arguments.length?t:1)),this.a,this.b);

},Ga.rgb=function(){return pt(this.l,this.a,this.b)},ra.rgb=yt;var Ka=yt.prototype=new ut;

Ka.brighter=function(t){t=Math.pow(.7,arguments.length?t:1);var e=this.r,n=this.g,r=this.b,i=30;

return e||n||r?(e&&i>e&&(e=i),n&&i>n&&(n=i),r&&i>r&&(r=i),new yt(Math.min(255,e/t),Math.min(255,n/t),Math.min(255,r/t))):new yt(i,i,i);

},Ka.darker=function(t){return t=Math.pow(.7,arguments.length?t:1),new yt(t*this.r,t*this.g,t*this.b);

},Ka.hsl=function(){return kt(this.r,this.g,this.b)},Ka.toString=function(){return"#"+wt(this.r)+wt(this.g)+wt(this.b);

};var Qa=ra.map({aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,
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
});Qa.forEach(function(t,e){Qa.set(t,xt(e))}),ra.functor=Et,ra.xhr=Tt(x),ra.dsv=function(t,e){
function n(t,n,o){arguments.length<3&&(o=n,n=null);var a=At(t,e,null==n?r:i(n),o);

return a.row=function(t){return arguments.length?a.response(null==(n=t)?r:i(t)):n;

},a}function r(t){return n.parse(t.responseText)}function i(t){return function(e){
return n.parse(e.responseText,t)}}function o(e){return e.map(a).join(t)}function a(t){
return u.test(t)?'"'+t.replace(/\"/g,'""')+'"':t}var u=new RegExp('["'+t+"\n]"),s=t.charCodeAt(0);

return n.parse=function(t,e){var r;return n.parseRows(t,function(t,n){if(r)return r(t,n-1);

var i=new Function("d","return {"+t.map(function(t,e){return JSON.stringify(t)+": d["+e+"]";

}).join(",")+"}");r=e?function(t,n){return e(i(t),n)}:i})},n.parseRows=function(t,e){
function n(){if(l>=c)return a;if(i)return i=!1,o;var e=l;if(34===t.charCodeAt(e)){
for(var n=e;n++<c;)if(34===t.charCodeAt(n)){if(34!==t.charCodeAt(n+1))break;++n}l=n+2;

var r=t.charCodeAt(n+1);return 13===r?(i=!0,10===t.charCodeAt(n+2)&&++l):10===r&&(i=!0),
t.slice(e+1,n).replace(/""/g,'"')}for(;c>l;){var r=t.charCodeAt(l++),u=1;if(10===r)i=!0;
else if(13===r)i=!0,10===t.charCodeAt(l)&&(++l,++u);else if(r!==s)continue;return t.slice(e,l-u);

}return t.slice(e)}for(var r,i,o={},a={},u=[],c=t.length,l=0,f=0;(r=n())!==a;){for(var h=[];r!==o&&r!==a;)h.push(r),
r=n();e&&null==(h=e(h,f++))||u.push(h)}return u},n.format=function(e){if(Array.isArray(e[0]))return n.formatRows(e);

var r=new y,i=[];return e.forEach(function(t){for(var e in t)r.has(e)||i.push(r.add(e));

}),[i.map(a).join(t)].concat(e.map(function(e){return i.map(function(t){return a(e[t]);

}).join(t)})).join("\n")},n.formatRows=function(t){return t.map(o).join("\n")},n},
ra.csv=ra.dsv(",","text/csv"),ra.tsv=ra.dsv("	","text/tab-separated-values");var tu,eu,nu,ru,iu,ou=this[w(this,"requestAnimationFrame")]||function(t){
setTimeout(t,17)};ra.timer=function(t,e,n){var r=arguments.length;2>r&&(e=0),3>r&&(n=Date.now());

var i=n+e,o={c:t,t:i,f:!1,n:null};eu?eu.n=o:tu=o,eu=o,nu||(ru=clearTimeout(ru),nu=1,
ou(qt))},ra.timer.flush=function(){Dt(),Lt()},ra.round=function(t,e){return e?Math.round(t*(e=Math.pow(10,e)))/e:Math.round(t);

};var au=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"].map(Rt);

ra.formatPrefix=function(t,e){var n=0;return t&&(0>t&&(t*=-1),e&&(t=ra.round(t,Ot(t,e))),
n=1+Math.floor(1e-12+Math.log(t)/Math.LN10),n=Math.max(-24,Math.min(24,3*Math.floor((n-1)/3)))),
au[8+n/3]};var uu=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,su=ra.map({
b:function(t){return t.toString(2)},c:function(t){return String.fromCharCode(t)},
o:function(t){return t.toString(8)},x:function(t){return t.toString(16)},X:function(t){
return t.toString(16).toUpperCase()},g:function(t,e){return t.toPrecision(e)},e:function(t,e){
return t.toExponential(e)},f:function(t,e){return t.toFixed(e)},r:function(t,e){return(t=ra.round(t,Ot(t,e))).toFixed(Math.max(0,Math.min(20,Ot(t*(1+1e-15),e))));

}}),cu=ra.time={},lu=Date;Ht.prototype={getDate:function(){return this._.getUTCDate();

},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear();

},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds();

},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth();

},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime();

},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf();

},setDate:function(){fu.setUTCDate.apply(this._,arguments)},setDay:function(){fu.setUTCDay.apply(this._,arguments);

},setFullYear:function(){fu.setUTCFullYear.apply(this._,arguments)},setHours:function(){
fu.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){fu.setUTCMilliseconds.apply(this._,arguments);

},setMinutes:function(){fu.setUTCMinutes.apply(this._,arguments)},setMonth:function(){
fu.setUTCMonth.apply(this._,arguments)},setSeconds:function(){fu.setUTCSeconds.apply(this._,arguments);

},setTime:function(){fu.setTime.apply(this._,arguments)}};var fu=Date.prototype;cu.year=Ft(function(t){
return t=cu.day(t),t.setMonth(0,1),t},function(t,e){t.setFullYear(t.getFullYear()+e);

},function(t){return t.getFullYear()}),cu.years=cu.year.range,cu.years.utc=cu.year.utc.range,
cu.day=Ft(function(t){var e=new lu(2e3,0);return e.setFullYear(t.getFullYear(),t.getMonth(),t.getDate()),
e},function(t,e){t.setDate(t.getDate()+e)},function(t){return t.getDate()-1}),cu.days=cu.day.range,
cu.days.utc=cu.day.utc.range,cu.dayOfYear=function(t){var e=cu.year(t);return Math.floor((t-e-6e4*(t.getTimezoneOffset()-e.getTimezoneOffset()))/864e5);

},["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].forEach(function(t,e){
e=7-e;var n=cu[t]=Ft(function(t){return(t=cu.day(t)).setDate(t.getDate()-(t.getDay()+e)%7),
t},function(t,e){t.setDate(t.getDate()+7*Math.floor(e))},function(t){var n=cu.year(t).getDay();

return Math.floor((cu.dayOfYear(t)+(n+e)%7)/7)-(n!==e)});cu[t+"s"]=n.range,cu[t+"s"].utc=n.utc.range,
cu[t+"OfYear"]=function(t){var n=cu.year(t).getDay();return Math.floor((cu.dayOfYear(t)+(n+e)%7)/7);

}}),cu.week=cu.sunday,cu.weeks=cu.sunday.range,cu.weeks.utc=cu.sunday.utc.range,cu.weekOfYear=cu.sundayOfYear;

var hu={"-":"",_:" ",0:"0"},pu=/^\s*\d+/,du=/^%/;ra.locale=function(t){return{numberFormat:zt(t),
timeFormat:Ut(t)}};var gu=ra.locale({decimal:".",thousands:",",grouping:[3],currency:["$",""],
dateTime:"%a %b %e %X %Y",date:"%m/%d/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],
shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
});ra.format=gu.numberFormat,ra.geo={},ce.prototype={s:0,t:0,add:function(t){le(t,this.t,vu),
le(vu.s,this.s,this),this.s?this.t+=vu.t:this.s=vu.t},reset:function(){this.s=this.t=0;

},valueOf:function(){return this.s}};var vu=new ce;ra.geo.stream=function(t,e){t&&mu.hasOwnProperty(t.type)?mu[t.type](t,e):fe(t,e);

};var mu={Feature:function(t,e){fe(t.geometry,e)},FeatureCollection:function(t,e){
for(var n=t.features,r=-1,i=n.length;++r<i;)fe(n[r].geometry,e)}},yu={Sphere:function(t,e){
e.sphere()},Point:function(t,e){t=t.coordinates,e.point(t[0],t[1],t[2])},MultiPoint:function(t,e){
for(var n=t.coordinates,r=-1,i=n.length;++r<i;)t=n[r],e.point(t[0],t[1],t[2])},LineString:function(t,e){
he(t.coordinates,e,0)},MultiLineString:function(t,e){for(var n=t.coordinates,r=-1,i=n.length;++r<i;)he(n[r],e,0);

},Polygon:function(t,e){pe(t.coordinates,e)},MultiPolygon:function(t,e){for(var n=t.coordinates,r=-1,i=n.length;++r<i;)pe(n[r],e);

},GeometryCollection:function(t,e){for(var n=t.geometries,r=-1,i=n.length;++r<i;)fe(n[r],e);

}};ra.geo.area=function(t){return xu=0,ra.geo.stream(t,wu),xu};var xu,bu=new ce,wu={
sphere:function(){xu+=4*Da},point:M,lineStart:M,lineEnd:M,polygonStart:function(){
bu.reset(),wu.lineStart=de},polygonEnd:function(){var t=2*bu;xu+=0>t?4*Da+t:t,wu.lineStart=wu.lineEnd=wu.point=M;

}};ra.geo.bounds=function(){function t(t,e){x.push(b=[l=t,h=t]),f>e&&(f=e),e>p&&(p=e);

}function e(e,n){var r=ge([e*za,n*za]);if(m){var i=me(m,r),o=[i[1],-i[0],0],a=me(o,i);

be(a),a=we(a);var s=e-d,c=s>0?1:-1,g=a[0]*Pa*c,v=ga(s)>180;if(v^(g>c*d&&c*e>g)){var y=a[1]*Pa;

y>p&&(p=y)}else if(g=(g+360)%360-180,v^(g>c*d&&c*e>g)){var y=-a[1]*Pa;f>y&&(f=y)}else f>n&&(f=n),
n>p&&(p=n);v?d>e?u(l,e)>u(l,h)&&(h=e):u(e,h)>u(l,h)&&(l=e):h>=l?(l>e&&(l=e),e>h&&(h=e)):e>d?u(l,e)>u(l,h)&&(h=e):u(e,h)>u(l,h)&&(l=e);

}else t(e,n);m=r,d=e}function n(){w.point=e}function r(){b[0]=l,b[1]=h,w.point=t,
m=null}function i(t,n){if(m){var r=t-d;y+=ga(r)>180?r+(r>0?360:-360):r}else g=t,v=n;

wu.point(t,n),e(t,n)}function o(){wu.lineStart()}function a(){i(g,v),wu.lineEnd(),
ga(y)>ja&&(l=-(h=180)),b[0]=l,b[1]=h,m=null}function u(t,e){return(e-=t)<0?e+360:e;

}function s(t,e){return t[0]-e[0]}function c(t,e){return e[0]<=e[1]?e[0]<=t&&t<=e[1]:t<e[0]||e[1]<t;

}var l,f,h,p,d,g,v,m,y,x,b,w={point:t,lineStart:n,lineEnd:r,polygonStart:function(){
w.point=i,w.lineStart=o,w.lineEnd=a,y=0,wu.polygonStart()},polygonEnd:function(){
wu.polygonEnd(),w.point=t,w.lineStart=n,w.lineEnd=r,0>bu?(l=-(h=180),f=-(p=90)):y>ja?p=90:-ja>y&&(f=-90),
b[0]=l,b[1]=h}};return function(t){p=h=-(l=f=1/0),x=[],ra.geo.stream(t,w);var e=x.length;

if(e){x.sort(s);for(var n,r=1,i=x[0],o=[i];e>r;++r)n=x[r],c(n[0],i)||c(n[1],i)?(u(i[0],n[1])>u(i[0],i[1])&&(i[1]=n[1]),
u(n[0],i[1])>u(i[0],i[1])&&(i[0]=n[0])):o.push(i=n);for(var a,n,d=-(1/0),e=o.length-1,r=0,i=o[e];e>=r;i=n,
++r)n=o[r],(a=u(i[1],n[0]))>d&&(d=a,l=n[0],h=i[1])}return x=b=null,l===1/0||f===1/0?[[0/0,0/0],[0/0,0/0]]:[[l,f],[h,p]];

}}(),ra.geo.centroid=function(t){Mu=ku=_u=Su=Cu=Eu=Tu=Au=Nu=ju=qu=0,ra.geo.stream(t,Du);

var e=Nu,n=ju,r=qu,i=e*e+n*n+r*r;return qa>i&&(e=Eu,n=Tu,r=Au,ja>ku&&(e=_u,n=Su,r=Cu),
i=e*e+n*n+r*r,qa>i)?[0/0,0/0]:[Math.atan2(n,e)*Pa,nt(r/Math.sqrt(i))*Pa]};var Mu,ku,_u,Su,Cu,Eu,Tu,Au,Nu,ju,qu,Du={
sphere:M,point:ke,lineStart:Se,lineEnd:Ce,polygonStart:function(){Du.lineStart=Ee;

},polygonEnd:function(){Du.lineStart=Se}},Lu=De(Ae,ze,He,[-Da,-Da/2]),Ou=1e9;ra.geo.clipExtent=function(){
var t,e,n,r,i,o,a={stream:function(t){return i&&(i.valid=!1),i=o(t),i.valid=!0,i},
extent:function(u){return arguments.length?(o=$e(t=+u[0][0],e=+u[0][1],n=+u[1][0],r=+u[1][1]),
i&&(i.valid=!1,i=null),a):[[t,e],[n,r]]}};return a.extent([[0,0],[960,500]])},(ra.geo.conicEqualArea=function(){
return Be(We)}).raw=We,ra.geo.albers=function(){return ra.geo.conicEqualArea().rotate([96,0]).center([-.6,38.7]).parallels([29.5,45.5]).scale(1070);

},ra.geo.albersUsa=function(){function t(t){var o=t[0],a=t[1];return e=null,n(o,a),
e||(r(o,a),e)||i(o,a),e}var e,n,r,i,o=ra.geo.albers(),a=ra.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),u=ra.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),s={
point:function(t,n){e=[t,n]}};return t.invert=function(t){var e=o.scale(),n=o.translate(),r=(t[0]-n[0])/e,i=(t[1]-n[1])/e;

return(i>=.12&&.234>i&&r>=-.425&&-.214>r?a:i>=.166&&.234>i&&r>=-.214&&-.115>r?u:o).invert(t);

},t.stream=function(t){var e=o.stream(t),n=a.stream(t),r=u.stream(t);return{point:function(t,i){
e.point(t,i),n.point(t,i),r.point(t,i)},sphere:function(){e.sphere(),n.sphere(),r.sphere();

},lineStart:function(){e.lineStart(),n.lineStart(),r.lineStart()},lineEnd:function(){
e.lineEnd(),n.lineEnd(),r.lineEnd()},polygonStart:function(){e.polygonStart(),n.polygonStart(),
r.polygonStart()},polygonEnd:function(){e.polygonEnd(),n.polygonEnd(),r.polygonEnd();

}}},t.precision=function(e){return arguments.length?(o.precision(e),a.precision(e),
u.precision(e),t):o.precision()},t.scale=function(e){return arguments.length?(o.scale(e),
a.scale(.35*e),u.scale(e),t.translate(o.translate())):o.scale()},t.translate=function(e){
if(!arguments.length)return o.translate();var c=o.scale(),l=+e[0],f=+e[1];return n=o.translate(e).clipExtent([[l-.455*c,f-.238*c],[l+.455*c,f+.238*c]]).stream(s).point,
r=a.translate([l-.307*c,f+.201*c]).clipExtent([[l-.425*c+ja,f+.12*c+ja],[l-.214*c-ja,f+.234*c-ja]]).stream(s).point,
i=u.translate([l-.205*c,f+.212*c]).clipExtent([[l-.214*c+ja,f+.166*c+ja],[l-.115*c-ja,f+.234*c-ja]]).stream(s).point,
t},t.scale(1070)};var Ru,zu,Pu,Hu,Fu,Iu,Uu={point:M,lineStart:M,lineEnd:M,polygonStart:function(){
zu=0,Uu.lineStart=Ye},polygonEnd:function(){Uu.lineStart=Uu.lineEnd=Uu.point=M,Ru+=ga(zu/2);

}},$u={point:Xe,lineStart:M,lineEnd:M,polygonStart:M,polygonEnd:M},Bu={point:Je,lineStart:Ge,
lineEnd:Ke,polygonStart:function(){Bu.lineStart=Qe},polygonEnd:function(){Bu.point=Je,
Bu.lineStart=Ge,Bu.lineEnd=Ke}};ra.geo.path=function(){function t(t){return t&&("function"==typeof u&&o.pointRadius(+u.apply(this,arguments)),
a&&a.valid||(a=i(o)),ra.geo.stream(t,a)),o.result()}function e(){return a=null,t}
var n,r,i,o,a,u=4.5;return t.area=function(t){return Ru=0,ra.geo.stream(t,i(Uu)),
Ru},t.centroid=function(t){return _u=Su=Cu=Eu=Tu=Au=Nu=ju=qu=0,ra.geo.stream(t,i(Bu)),
qu?[Nu/qu,ju/qu]:Au?[Eu/Au,Tu/Au]:Cu?[_u/Cu,Su/Cu]:[0/0,0/0]},t.bounds=function(t){
return Fu=Iu=-(Pu=Hu=1/0),ra.geo.stream(t,i($u)),[[Pu,Hu],[Fu,Iu]]},t.projection=function(t){
return arguments.length?(i=(n=t)?t.stream||nn(t):x,e()):n},t.context=function(t){
return arguments.length?(o=null==(r=t)?new Ve:new tn(t),"function"!=typeof u&&o.pointRadius(u),
e()):r},t.pointRadius=function(e){return arguments.length?(u="function"==typeof e?e:(o.pointRadius(+e),
+e),t):u},t.projection(ra.geo.albersUsa()).context(null)},ra.geo.transform=function(t){
return{stream:function(e){var n=new rn(e);for(var r in t)n[r]=t[r];return n}}},rn.prototype={
point:function(t,e){this.stream.point(t,e)},sphere:function(){this.stream.sphere();

},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd();

},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd();

}},ra.geo.projection=an,ra.geo.projectionMutator=un,(ra.geo.equirectangular=function(){
return an(cn)}).raw=cn.invert=cn,ra.geo.rotation=function(t){function e(e){return e=t(e[0]*za,e[1]*za),
e[0]*=Pa,e[1]*=Pa,e}return t=fn(t[0]%360*za,t[1]*za,t.length>2?t[2]*za:0),e.invert=function(e){
return e=t.invert(e[0]*za,e[1]*za),e[0]*=Pa,e[1]*=Pa,e},e},ln.invert=cn,ra.geo.circle=function(){
function t(){var t="function"==typeof r?r.apply(this,arguments):r,e=fn(-t[0]*za,-t[1]*za,0).invert,i=[];

return n(null,null,1,{point:function(t,n){i.push(t=e(t,n)),t[0]*=Pa,t[1]*=Pa}}),{
type:"Polygon",coordinates:[i]}}var e,n,r=[0,0],i=6;return t.origin=function(e){return arguments.length?(r=e,
t):r},t.angle=function(r){return arguments.length?(n=gn((e=+r)*za,i*za),t):e},t.precision=function(r){
return arguments.length?(n=gn(e*za,(i=+r)*za),t):i},t.angle(90)},ra.geo.distance=function(t,e){
var n,r=(e[0]-t[0])*za,i=t[1]*za,o=e[1]*za,a=Math.sin(r),u=Math.cos(r),s=Math.sin(i),c=Math.cos(i),l=Math.sin(o),f=Math.cos(o);

return Math.atan2(Math.sqrt((n=f*a)*n+(n=c*l-s*f*u)*n),s*l+c*f*u)},ra.geo.graticule=function(){
function t(){return{type:"MultiLineString",coordinates:e()}}function e(){return ra.range(Math.ceil(o/v)*v,i,v).map(h).concat(ra.range(Math.ceil(c/m)*m,s,m).map(p)).concat(ra.range(Math.ceil(r/d)*d,n,d).filter(function(t){
return ga(t%v)>ja}).map(l)).concat(ra.range(Math.ceil(u/g)*g,a,g).filter(function(t){
return ga(t%m)>ja}).map(f))}var n,r,i,o,a,u,s,c,l,f,h,p,d=10,g=d,v=90,m=360,y=2.5;

return t.lines=function(){return e().map(function(t){return{type:"LineString",coordinates:t
}})},t.outline=function(){return{type:"Polygon",coordinates:[h(o).concat(p(s).slice(1),h(i).reverse().slice(1),p(c).reverse().slice(1))]
}},t.extent=function(e){return arguments.length?t.majorExtent(e).minorExtent(e):t.minorExtent();

},t.majorExtent=function(e){return arguments.length?(o=+e[0][0],i=+e[1][0],c=+e[0][1],
s=+e[1][1],o>i&&(e=o,o=i,i=e),c>s&&(e=c,c=s,s=e),t.precision(y)):[[o,c],[i,s]]},t.minorExtent=function(e){
return arguments.length?(r=+e[0][0],n=+e[1][0],u=+e[0][1],a=+e[1][1],r>n&&(e=r,r=n,
n=e),u>a&&(e=u,u=a,a=e),t.precision(y)):[[r,u],[n,a]]},t.step=function(e){return arguments.length?t.majorStep(e).minorStep(e):t.minorStep();

},t.majorStep=function(e){return arguments.length?(v=+e[0],m=+e[1],t):[v,m]},t.minorStep=function(e){
return arguments.length?(d=+e[0],g=+e[1],t):[d,g]},t.precision=function(e){return arguments.length?(y=+e,
l=mn(u,a,90),f=yn(r,n,y),h=mn(c,s,90),p=yn(o,i,y),t):y},t.majorExtent([[-180,-90+ja],[180,90-ja]]).minorExtent([[-180,-80-ja],[180,80+ja]]);

},ra.geo.greatArc=function(){function t(){return{type:"LineString",coordinates:[e||r.apply(this,arguments),n||i.apply(this,arguments)]
}}var e,n,r=xn,i=bn;return t.distance=function(){return ra.geo.distance(e||r.apply(this,arguments),n||i.apply(this,arguments));

},t.source=function(n){return arguments.length?(r=n,e="function"==typeof n?null:n,
t):r},t.target=function(e){return arguments.length?(i=e,n="function"==typeof e?null:e,
t):i},t.precision=function(){return arguments.length?t:0},t},ra.geo.interpolate=function(t,e){
return wn(t[0]*za,t[1]*za,e[0]*za,e[1]*za)},ra.geo.length=function(t){return Wu=0,
ra.geo.stream(t,Yu),Wu};var Wu,Yu={sphere:M,point:M,lineStart:Mn,lineEnd:M,polygonStart:M,
polygonEnd:M},Xu=kn(function(t){return Math.sqrt(2/(1+t))},function(t){return 2*Math.asin(t/2);

});(ra.geo.azimuthalEqualArea=function(){return an(Xu)}).raw=Xu;var Vu=kn(function(t){
var e=Math.acos(t);return e&&e/Math.sin(e)},x);(ra.geo.azimuthalEquidistant=function(){
return an(Vu)}).raw=Vu,(ra.geo.conicConformal=function(){return Be(_n)}).raw=_n,(ra.geo.conicEquidistant=function(){
return Be(Sn)}).raw=Sn;var Zu=kn(function(t){return 1/t},Math.atan);(ra.geo.gnomonic=function(){
return an(Zu)}).raw=Zu,Cn.invert=function(t,e){return[t,2*Math.atan(Math.exp(e))-Ra];

},(ra.geo.mercator=function(){return En(Cn)}).raw=Cn;var Ju=kn(function(){return 1;

},Math.asin);(ra.geo.orthographic=function(){return an(Ju)}).raw=Ju;var Gu=kn(function(t){
return 1/(1+t)},function(t){return 2*Math.atan(t)});(ra.geo.stereographic=function(){
return an(Gu)}).raw=Gu,Tn.invert=function(t,e){return[-e,2*Math.atan(Math.exp(t))-Ra];

},(ra.geo.transverseMercator=function(){var t=En(Tn),e=t.center,n=t.rotate;return t.center=function(t){
return t?e([-t[1],t[0]]):(t=e(),[t[1],-t[0]])},t.rotate=function(t){return t?n([t[0],t[1],t.length>2?t[2]+90:90]):(t=n(),
[t[0],t[1],t[2]-90])},n([0,0,90])}).raw=Tn,ra.geom={},ra.geom.hull=function(t){function e(t){
if(t.length<3)return[];var e,i=Et(n),o=Et(r),a=t.length,u=[],s=[];for(e=0;a>e;e++)u.push([+i.call(this,t[e],e),+o.call(this,t[e],e),e]);

for(u.sort(qn),e=0;a>e;e++)s.push([u[e][0],-u[e][1]]);var c=jn(u),l=jn(s),f=l[0]===c[0],h=l[l.length-1]===c[c.length-1],p=[];

for(e=c.length-1;e>=0;--e)p.push(t[u[c[e]][2]]);for(e=+f;e<l.length-h;++e)p.push(t[u[l[e]][2]]);

return p}var n=An,r=Nn;return arguments.length?e(t):(e.x=function(t){return arguments.length?(n=t,
e):n},e.y=function(t){return arguments.length?(r=t,e):r},e)},ra.geom.polygon=function(t){
return ba(t,Ku),t};var Ku=ra.geom.polygon.prototype=[];Ku.area=function(){for(var t,e=-1,n=this.length,r=this[n-1],i=0;++e<n;)t=r,
r=this[e],i+=t[1]*r[0]-t[0]*r[1];return.5*i},Ku.centroid=function(t){var e,n,r=-1,i=this.length,o=0,a=0,u=this[i-1];

for(arguments.length||(t=-1/(6*this.area()));++r<i;)e=u,u=this[r],n=e[0]*u[1]-u[0]*e[1],
o+=(e[0]+u[0])*n,a+=(e[1]+u[1])*n;return[o*t,a*t]},Ku.clip=function(t){for(var e,n,r,i,o,a,u=On(t),s=-1,c=this.length-On(this),l=this[c-1];++s<c;){
for(e=t.slice(),t.length=0,i=this[s],o=e[(r=e.length-u)-1],n=-1;++n<r;)a=e[n],Dn(a,l,i)?(Dn(o,l,i)||t.push(Ln(o,a,l,i)),
t.push(a)):Dn(o,l,i)&&t.push(Ln(o,a,l,i)),o=a;u&&t.push(t[0]),l=i}return t};var Qu,ts,es,ns,rs,is=[],os=[];

$n.prototype.prepare=function(){for(var t,e=this.edges,n=e.length;n--;)t=e[n].edge,
t.b&&t.a||e.splice(n,1);return e.sort(Wn),e.length},er.prototype={start:function(){
return this.edge.l===this.site?this.edge.a:this.edge.b},end:function(){return this.edge.l===this.site?this.edge.b:this.edge.a;

}},nr.prototype={insert:function(t,e){var n,r,i;if(t){if(e.P=t,e.N=t.N,t.N&&(t.N.P=e),
t.N=e,t.R){for(t=t.R;t.L;)t=t.L;t.L=e}else t.R=e;n=t}else this._?(t=ar(this._),e.P=null,
e.N=t,t.P=t.L=e,n=t):(e.P=e.N=null,this._=e,n=null);for(e.L=e.R=null,e.U=n,e.C=!0,
t=e;n&&n.C;)r=n.U,n===r.L?(i=r.R,i&&i.C?(n.C=i.C=!1,r.C=!0,t=r):(t===n.R&&(ir(this,n),
t=n,n=t.U),n.C=!1,r.C=!0,or(this,r))):(i=r.L,i&&i.C?(n.C=i.C=!1,r.C=!0,t=r):(t===n.L&&(or(this,n),
t=n,n=t.U),n.C=!1,r.C=!0,ir(this,r))),n=t.U;this._.C=!1},remove:function(t){t.N&&(t.N.P=t.P),
t.P&&(t.P.N=t.N),t.N=t.P=null;var e,n,r,i=t.U,o=t.L,a=t.R;if(n=o?a?ar(a):o:a,i?i.L===t?i.L=n:i.R=n:this._=n,
o&&a?(r=n.C,n.C=t.C,n.L=o,o.U=n,n!==a?(i=n.U,n.U=t.U,t=n.R,i.L=t,n.R=a,a.U=n):(n.U=i,
i=n,t=n.R)):(r=t.C,t=n),t&&(t.U=i),!r){if(t&&t.C)return void(t.C=!1);do{if(t===this._)break;

if(t===i.L){if(e=i.R,e.C&&(e.C=!1,i.C=!0,ir(this,i),e=i.R),e.L&&e.L.C||e.R&&e.R.C){
e.R&&e.R.C||(e.L.C=!1,e.C=!0,or(this,e),e=i.R),e.C=i.C,i.C=e.R.C=!1,ir(this,i),t=this._;

break}}else if(e=i.L,e.C&&(e.C=!1,i.C=!0,or(this,i),e=i.L),e.L&&e.L.C||e.R&&e.R.C){
e.L&&e.L.C||(e.R.C=!1,e.C=!0,ir(this,e),e=i.L),e.C=i.C,i.C=e.L.C=!1,or(this,i),t=this._;

break}e.C=!0,t=i,i=i.U}while(!t.C);t&&(t.C=!1)}}},ra.geom.voronoi=function(t){function e(t){
var e=new Array(t.length),r=u[0][0],i=u[0][1],o=u[1][0],a=u[1][1];return ur(n(t),u).cells.forEach(function(n,u){
var s=n.edges,c=n.site,l=e[u]=s.length?s.map(function(t){var e=t.start();return[e.x,e.y];

}):c.x>=r&&c.x<=o&&c.y>=i&&c.y<=a?[[r,a],[o,a],[o,i],[r,i]]:[];l.point=t[u]}),e}function n(t){
return t.map(function(t,e){return{x:Math.round(o(t,e)/ja)*ja,y:Math.round(a(t,e)/ja)*ja,
i:e}})}var r=An,i=Nn,o=r,a=i,u=as;return t?e(t):(e.links=function(t){return ur(n(t)).edges.filter(function(t){
return t.l&&t.r}).map(function(e){return{source:t[e.l.i],target:t[e.r.i]}})},e.triangles=function(t){
var e=[];return ur(n(t)).cells.forEach(function(n,r){for(var i,o,a=n.site,u=n.edges.sort(Wn),s=-1,c=u.length,l=u[c-1].edge,f=l.l===a?l.r:l.l;++s<c;)i=l,
o=f,l=u[s].edge,f=l.l===a?l.r:l.l,r<o.i&&r<f.i&&cr(a,o,f)<0&&e.push([t[r],t[o.i],t[f.i]]);

}),e},e.x=function(t){return arguments.length?(o=Et(r=t),e):r},e.y=function(t){return arguments.length?(a=Et(i=t),
e):i},e.clipExtent=function(t){return arguments.length?(u=null==t?as:t,e):u===as?null:u;

},e.size=function(t){return arguments.length?e.clipExtent(t&&[[0,0],t]):u===as?null:u&&u[1];

},e)};var as=[[-1e6,-1e6],[1e6,1e6]];ra.geom.delaunay=function(t){return ra.geom.voronoi().triangles(t);

},ra.geom.quadtree=function(t,e,n,r,i){function o(t){function o(t,e,n,r,i,o,a,u){
if(!isNaN(n)&&!isNaN(r))if(t.leaf){var s=t.x,l=t.y;if(null!=s)if(ga(s-n)+ga(l-r)<.01)c(t,e,n,r,i,o,a,u);
else{var f=t.point;t.x=t.y=t.point=null,c(t,f,s,l,i,o,a,u),c(t,e,n,r,i,o,a,u)}else t.x=n,
t.y=r,t.point=e}else c(t,e,n,r,i,o,a,u)}function c(t,e,n,r,i,a,u,s){var c=.5*(i+u),l=.5*(a+s),f=n>=c,h=r>=l,p=h<<1|f;

t.leaf=!1,t=t.nodes[p]||(t.nodes[p]=hr()),f?i=c:u=c,h?a=l:s=l,o(t,e,n,r,i,a,u,s)}
var l,f,h,p,d,g,v,m,y,x=Et(u),b=Et(s);if(null!=e)g=e,v=n,m=r,y=i;else if(m=y=-(g=v=1/0),
f=[],h=[],d=t.length,a)for(p=0;d>p;++p)l=t[p],l.x<g&&(g=l.x),l.y<v&&(v=l.y),l.x>m&&(m=l.x),
l.y>y&&(y=l.y),f.push(l.x),h.push(l.y);else for(p=0;d>p;++p){var w=+x(l=t[p],p),M=+b(l,p);

g>w&&(g=w),v>M&&(v=M),w>m&&(m=w),M>y&&(y=M),f.push(w),h.push(M)}var k=m-g,_=y-v;k>_?y=v+k:m=g+_;

var S=hr();if(S.add=function(t){o(S,t,+x(t,++p),+b(t,p),g,v,m,y)},S.visit=function(t){
pr(t,S,g,v,m,y)},S.find=function(t){return dr(S,t[0],t[1],g,v,m,y)},p=-1,null==e){
for(;++p<d;)o(S,t[p],f[p],h[p],g,v,m,y);--p}else t.forEach(S.add);return f=h=t=l=null,
S}var a,u=An,s=Nn;return(a=arguments.length)?(u=lr,s=fr,3===a&&(i=n,r=e,n=e=0),o(t)):(o.x=function(t){
return arguments.length?(u=t,o):u},o.y=function(t){return arguments.length?(s=t,o):s;

},o.extent=function(t){return arguments.length?(null==t?e=n=r=i=null:(e=+t[0][0],
n=+t[0][1],r=+t[1][0],i=+t[1][1]),o):null==e?null:[[e,n],[r,i]]},o.size=function(t){
return arguments.length?(null==t?e=n=r=i=null:(e=n=0,r=+t[0],i=+t[1]),o):null==e?null:[r-e,i-n];

},o)},ra.interpolateRgb=gr,ra.interpolateObject=vr,ra.interpolateNumber=mr,ra.interpolateString=yr;

var us=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,ss=new RegExp(us.source,"g");

ra.interpolate=xr,ra.interpolators=[function(t,e){var n=typeof e;return("string"===n?Qa.has(e.toLowerCase())||/^(#|rgb\(|hsl\()/i.test(e)?gr:yr:e instanceof ut?gr:Array.isArray(e)?br:"object"===n&&isNaN(e)?vr:mr)(t,e);

}],ra.interpolateArray=br;var cs=function(){return x},ls=ra.map({linear:cs,poly:Er,
quad:function(){return _r},cubic:function(){return Sr},sin:function(){return Tr},
exp:function(){return Ar},circle:function(){return Nr},elastic:jr,back:qr,bounce:function(){
return Dr}}),fs=ra.map({"in":x,out:Mr,"in-out":kr,"out-in":function(t){return kr(Mr(t));

}});ra.ease=function(t){var e=t.indexOf("-"),n=e>=0?t.slice(0,e):t,r=e>=0?t.slice(e+1):"in";

return n=ls.get(n)||cs,r=fs.get(r)||x,wr(r(n.apply(null,ia.call(arguments,1))))},
ra.interpolateHcl=Lr,ra.interpolateHsl=Or,ra.interpolateLab=Rr,ra.interpolateRound=zr,
ra.transform=function(t){var e=aa.createElementNS(ra.ns.prefix.svg,"g");return(ra.transform=function(t){
if(null!=t){e.setAttribute("transform",t);var n=e.transform.baseVal.consolidate();

}return new Pr(n?n.matrix:hs)})(t)},Pr.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")";

};var hs={a:1,b:0,c:0,d:1,e:0,f:0};ra.interpolateTransform=Ur,ra.layout={},ra.layout.bundle=function(){
return function(t){for(var e=[],n=-1,r=t.length;++n<r;)e.push(Wr(t[n]));return e};

},ra.layout.chord=function(){function t(){var t,c,f,h,p,d={},g=[],v=ra.range(o),m=[];

for(n=[],r=[],t=0,h=-1;++h<o;){for(c=0,p=-1;++p<o;)c+=i[h][p];g.push(c),m.push(ra.range(o)),
t+=c}for(a&&v.sort(function(t,e){return a(g[t],g[e])}),u&&m.forEach(function(t,e){
t.sort(function(t,n){return u(i[e][t],i[e][n])})}),t=(La-l*o)/t,c=0,h=-1;++h<o;){
for(f=c,p=-1;++p<o;){var y=v[h],x=m[y][p],b=i[y][x],w=c,M=c+=b*t;d[y+"-"+x]={index:y,
subindex:x,startAngle:w,endAngle:M,value:b}}r[y]={index:y,startAngle:f,endAngle:c,
value:(c-f)/t},c+=l}for(h=-1;++h<o;)for(p=h-1;++p<o;){var k=d[h+"-"+p],_=d[p+"-"+h];

(k.value||_.value)&&n.push(k.value<_.value?{source:_,target:k}:{source:k,target:_
})}s&&e()}function e(){n.sort(function(t,e){return s((t.source.value+t.target.value)/2,(e.source.value+e.target.value)/2);

})}var n,r,i,o,a,u,s,c={},l=0;return c.matrix=function(t){return arguments.length?(o=(i=t)&&i.length,
n=r=null,c):i},c.padding=function(t){return arguments.length?(l=t,n=r=null,c):l},
c.sortGroups=function(t){return arguments.length?(a=t,n=r=null,c):a},c.sortSubgroups=function(t){
return arguments.length?(u=t,n=null,c):u},c.sortChords=function(t){return arguments.length?(s=t,
n&&e(),c):s},c.chords=function(){return n||t(),n},c.groups=function(){return r||t(),
r},c},ra.layout.force=function(){function t(t){return function(e,n,r,i){if(e.point!==t){
var o=e.cx-t.x,a=e.cy-t.y,u=i-n,s=o*o+a*a;if(s>u*u/v){if(d>s){var c=e.charge/s;t.px-=o*c,
t.py-=a*c}return!0}if(e.point&&s&&d>s){var c=e.pointCharge/s;t.px-=o*c,t.py-=a*c}
}return!e.charge}}function e(t){t.px=ra.event.x,t.py=ra.event.y,u.resume()}var n,r,i,o,a,u={},s=ra.dispatch("start","tick","end"),c=[1,1],l=.9,f=ps,h=ds,p=-30,d=gs,g=.1,v=.64,m=[],y=[];

return u.tick=function(){if((r*=.99)<.005)return s.end({type:"end",alpha:r=0}),!0;

var e,n,u,f,h,d,v,x,b,w=m.length,M=y.length;for(n=0;M>n;++n)u=y[n],f=u.source,h=u.target,
x=h.x-f.x,b=h.y-f.y,(d=x*x+b*b)&&(d=r*o[n]*((d=Math.sqrt(d))-i[n])/d,x*=d,b*=d,h.x-=x*(v=f.weight/(h.weight+f.weight)),
h.y-=b*v,f.x+=x*(v=1-v),f.y+=b*v);if((v=r*g)&&(x=c[0]/2,b=c[1]/2,n=-1,v))for(;++n<w;)u=m[n],
u.x+=(x-u.x)*v,u.y+=(b-u.y)*v;if(p)for(Kr(e=ra.geom.quadtree(m),r,a),n=-1;++n<w;)(u=m[n]).fixed||e.visit(t(u));

for(n=-1;++n<w;)u=m[n],u.fixed?(u.x=u.px,u.y=u.py):(u.x-=(u.px-(u.px=u.x))*l,u.y-=(u.py-(u.py=u.y))*l);

s.tick({type:"tick",alpha:r})},u.nodes=function(t){return arguments.length?(m=t,u):m;

},u.links=function(t){return arguments.length?(y=t,u):y},u.size=function(t){return arguments.length?(c=t,
u):c},u.linkDistance=function(t){return arguments.length?(f="function"==typeof t?t:+t,
u):f},u.distance=u.linkDistance,u.linkStrength=function(t){return arguments.length?(h="function"==typeof t?t:+t,
u):h},u.friction=function(t){return arguments.length?(l=+t,u):l},u.charge=function(t){
return arguments.length?(p="function"==typeof t?t:+t,u):p},u.chargeDistance=function(t){
return arguments.length?(d=t*t,u):Math.sqrt(d)},u.gravity=function(t){return arguments.length?(g=+t,
u):g},u.theta=function(t){return arguments.length?(v=t*t,u):Math.sqrt(v)},u.alpha=function(t){
return arguments.length?(t=+t,r?r=t>0?t:0:t>0&&(s.start({type:"start",alpha:r=t}),
ra.timer(u.tick)),u):r},u.start=function(){function t(t,r){if(!n){for(n=new Array(s),
u=0;s>u;++u)n[u]=[];for(u=0;l>u;++u){var i=y[u];n[i.source.index].push(i.target),
n[i.target.index].push(i.source)}}for(var o,a=n[e],u=-1,c=a.length;++u<c;)if(!isNaN(o=a[u][t]))return o;

return Math.random()*r}var e,n,r,s=m.length,l=y.length,d=c[0],g=c[1];for(e=0;s>e;++e)(r=m[e]).index=e,
r.weight=0;for(e=0;l>e;++e)r=y[e],"number"==typeof r.source&&(r.source=m[r.source]),
"number"==typeof r.target&&(r.target=m[r.target]),++r.source.weight,++r.target.weight;

for(e=0;s>e;++e)r=m[e],isNaN(r.x)&&(r.x=t("x",d)),isNaN(r.y)&&(r.y=t("y",g)),isNaN(r.px)&&(r.px=r.x),
isNaN(r.py)&&(r.py=r.y);if(i=[],"function"==typeof f)for(e=0;l>e;++e)i[e]=+f.call(this,y[e],e);
else for(e=0;l>e;++e)i[e]=f;if(o=[],"function"==typeof h)for(e=0;l>e;++e)o[e]=+h.call(this,y[e],e);
else for(e=0;l>e;++e)o[e]=h;if(a=[],"function"==typeof p)for(e=0;s>e;++e)a[e]=+p.call(this,m[e],e);
else for(e=0;s>e;++e)a[e]=p;return u.resume()},u.resume=function(){return u.alpha(.1);

},u.stop=function(){return u.alpha(0)},u.drag=function(){return n||(n=ra.behavior.drag().origin(x).on("dragstart.force",Vr).on("drag.force",e).on("dragend.force",Zr)),
arguments.length?void this.on("mouseover.force",Jr).on("mouseout.force",Gr).call(n):n;

},ra.rebind(u,s,"on")};var ps=20,ds=1,gs=1/0;ra.layout.hierarchy=function(){function t(i){
var o,a=[i],u=[];for(i.depth=0;null!=(o=a.pop());)if(u.push(o),(c=n.call(t,o,o.depth))&&(s=c.length)){
for(var s,c,l;--s>=0;)a.push(l=c[s]),l.parent=o,l.depth=o.depth+1;r&&(o.value=0),
o.children=c}else r&&(o.value=+r.call(t,o,o.depth)||0),delete o.children;return ei(i,function(t){
var n,i;e&&(n=t.children)&&n.sort(e),r&&(i=t.parent)&&(i.value+=t.value)}),u}var e=ii,n=ni,r=ri;

return t.sort=function(n){return arguments.length?(e=n,t):e},t.children=function(e){
return arguments.length?(n=e,t):n},t.value=function(e){return arguments.length?(r=e,
t):r},t.revalue=function(e){return r&&(ti(e,function(t){t.children&&(t.value=0)}),
ei(e,function(e){var n;e.children||(e.value=+r.call(t,e,e.depth)||0),(n=e.parent)&&(n.value+=e.value);

})),e},t},ra.layout.partition=function(){function t(e,n,r,i){var o=e.children;if(e.x=n,
e.y=e.depth*i,e.dx=r,e.dy=i,o&&(a=o.length)){var a,u,s,c=-1;for(r=e.value?r/e.value:0;++c<a;)t(u=o[c],n,s=u.value*r,i),
n+=s}}function e(t){var n=t.children,r=0;if(n&&(i=n.length))for(var i,o=-1;++o<i;)r=Math.max(r,e(n[o]));

return 1+r}function n(n,o){var a=r.call(this,n,o);return t(a[0],0,i[0],i[1]/e(a[0])),
a}var r=ra.layout.hierarchy(),i=[1,1];return n.size=function(t){return arguments.length?(i=t,
n):i},Qr(n,r)},ra.layout.pie=function(){function t(a){var u,s=a.length,c=a.map(function(n,r){
return+e.call(t,n,r)}),l=+("function"==typeof r?r.apply(this,arguments):r),f=("function"==typeof i?i.apply(this,arguments):i)-l,h=Math.min(Math.abs(f)/s,+("function"==typeof o?o.apply(this,arguments):o)),p=h*(0>f?-1:1),d=(f-s*p)/ra.sum(c),g=ra.range(s),v=[];

return null!=n&&g.sort(n===vs?function(t,e){return c[e]-c[t]}:function(t,e){return n(a[t],a[e]);

}),g.forEach(function(t){v[t]={data:a[t],value:u=c[t],startAngle:l,endAngle:l+=u*d+p,
padAngle:h}}),v}var e=Number,n=vs,r=0,i=La,o=0;return t.value=function(n){return arguments.length?(e=n,
t):e},t.sort=function(e){return arguments.length?(n=e,t):n},t.startAngle=function(e){
return arguments.length?(r=e,t):r},t.endAngle=function(e){return arguments.length?(i=e,
t):i},t.padAngle=function(e){return arguments.length?(o=e,t):o},t};var vs={};ra.layout.stack=function(){
function t(u,s){if(!(h=u.length))return u;var c=u.map(function(n,r){return e.call(t,n,r);

}),l=c.map(function(e){return e.map(function(e,n){return[o.call(t,e,n),a.call(t,e,n)];

})}),f=n.call(t,l,s);c=ra.permute(c,f),l=ra.permute(l,f);var h,p,d,g,v=r.call(t,l,s),m=c[0].length;

for(d=0;m>d;++d)for(i.call(t,c[0][d],g=v[d],l[0][d][1]),p=1;h>p;++p)i.call(t,c[p][d],g+=l[p-1][d][1],l[p][d][1]);

return u}var e=x,n=ci,r=li,i=si,o=ai,a=ui;return t.values=function(n){return arguments.length?(e=n,
t):e},t.order=function(e){return arguments.length?(n="function"==typeof e?e:ms.get(e)||ci,
t):n},t.offset=function(e){return arguments.length?(r="function"==typeof e?e:ys.get(e)||li,
t):r},t.x=function(e){return arguments.length?(o=e,t):o},t.y=function(e){return arguments.length?(a=e,
t):a},t.out=function(e){return arguments.length?(i=e,t):i},t};var ms=ra.map({"inside-out":function(t){
var e,n,r=t.length,i=t.map(fi),o=t.map(hi),a=ra.range(r).sort(function(t,e){return i[t]-i[e];

}),u=0,s=0,c=[],l=[];for(e=0;r>e;++e)n=a[e],s>u?(u+=o[n],c.push(n)):(s+=o[n],l.push(n));

return l.reverse().concat(c)},reverse:function(t){return ra.range(t.length).reverse();

},"default":ci}),ys=ra.map({silhouette:function(t){var e,n,r,i=t.length,o=t[0].length,a=[],u=0,s=[];

for(n=0;o>n;++n){for(e=0,r=0;i>e;e++)r+=t[e][n][1];r>u&&(u=r),a.push(r)}for(n=0;o>n;++n)s[n]=(u-a[n])/2;

return s},wiggle:function(t){var e,n,r,i,o,a,u,s,c,l=t.length,f=t[0],h=f.length,p=[];

for(p[0]=s=c=0,n=1;h>n;++n){for(e=0,i=0;l>e;++e)i+=t[e][n][1];for(e=0,o=0,u=f[n][0]-f[n-1][0];l>e;++e){
for(r=0,a=(t[e][n][1]-t[e][n-1][1])/(2*u);e>r;++r)a+=(t[r][n][1]-t[r][n-1][1])/u;
o+=a*t[e][n][1]}p[n]=s-=i?o/i*u:0,c>s&&(c=s)}for(n=0;h>n;++n)p[n]-=c;return p},expand:function(t){
var e,n,r,i=t.length,o=t[0].length,a=1/i,u=[];for(n=0;o>n;++n){for(e=0,r=0;i>e;e++)r+=t[e][n][1];

if(r)for(e=0;i>e;e++)t[e][n][1]/=r;else for(e=0;i>e;e++)t[e][n][1]=a}for(n=0;o>n;++n)u[n]=0;

return u},zero:li});ra.layout.histogram=function(){function t(t,o){for(var a,u,s=[],c=t.map(n,this),l=r.call(this,c,o),f=i.call(this,l,c,o),o=-1,h=c.length,p=f.length-1,d=e?1:1/h;++o<p;)a=s[o]=[],
a.dx=f[o+1]-(a.x=f[o]),a.y=0;if(p>0)for(o=-1;++o<h;)u=c[o],u>=l[0]&&u<=l[1]&&(a=s[ra.bisect(f,u,1,p)-1],
a.y+=d,a.push(t[o]));return s}var e=!0,n=Number,r=vi,i=di;return t.value=function(e){
return arguments.length?(n=e,t):n},t.range=function(e){return arguments.length?(r=Et(e),
t):r},t.bins=function(e){return arguments.length?(i="number"==typeof e?function(t){
return gi(t,e)}:Et(e),t):i},t.frequency=function(n){return arguments.length?(e=!!n,
t):e},t},ra.layout.pack=function(){function t(t,o){var a=n.call(this,t,o),u=a[0],s=i[0],c=i[1],l=null==e?Math.sqrt:"function"==typeof e?e:function(){
return e};if(u.x=u.y=0,ei(u,function(t){t.r=+l(t.value)}),ei(u,wi),r){var f=r*(e?1:Math.max(2*u.r/s,2*u.r/c))/2;

ei(u,function(t){t.r+=f}),ei(u,wi),ei(u,function(t){t.r-=f})}return _i(u,s/2,c/2,e?1:1/Math.max(2*u.r/s,2*u.r/c)),
a}var e,n=ra.layout.hierarchy().sort(mi),r=0,i=[1,1];return t.size=function(e){return arguments.length?(i=e,
t):i},t.radius=function(n){return arguments.length?(e=null==n||"function"==typeof n?n:+n,
t):e},t.padding=function(e){return arguments.length?(r=+e,t):r},Qr(t,n)},ra.layout.tree=function(){
function t(t,i){var l=a.call(this,t,i),f=l[0],h=e(f);if(ei(h,n),h.parent.m=-h.z,ti(h,r),
c)ti(f,o);else{var p=f,d=f,g=f;ti(f,function(t){t.x<p.x&&(p=t),t.x>d.x&&(d=t),t.depth>g.depth&&(g=t);

});var v=u(p,d)/2-p.x,m=s[0]/(d.x+u(d,p)/2+v),y=s[1]/(g.depth||1);ti(f,function(t){
t.x=(t.x+v)*m,t.y=t.depth*y})}return l}function e(t){for(var e,n={A:null,children:[t]
},r=[n];null!=(e=r.pop());)for(var i,o=e.children,a=0,u=o.length;u>a;++a)r.push((o[a]=i={
_:o[a],parent:e,children:(i=o[a].children)&&i.slice()||[],A:null,a:null,z:0,m:0,c:0,
s:0,t:null,i:a}).a=i);return n.children[0]}function n(t){var e=t.children,n=t.parent.children,r=t.i?n[t.i-1]:null;

if(e.length){Ni(t);var o=(e[0].z+e[e.length-1].z)/2;r?(t.z=r.z+u(t._,r._),t.m=t.z-o):t.z=o;

}else r&&(t.z=r.z+u(t._,r._));t.parent.A=i(t,r,t.parent.A||n[0])}function r(t){t._.x=t.z+t.parent.m,
t.m+=t.parent.m}function i(t,e,n){if(e){for(var r,i=t,o=t,a=e,s=i.parent.children[0],c=i.m,l=o.m,f=a.m,h=s.m;a=Ti(a),
i=Ei(i),a&&i;)s=Ei(s),o=Ti(o),o.a=t,r=a.z+f-i.z-c+u(a._,i._),r>0&&(Ai(ji(a,t,n),t,r),
c+=r,l+=r),f+=a.m,c+=i.m,h+=s.m,l+=o.m;a&&!Ti(o)&&(o.t=a,o.m+=f-l),i&&!Ei(s)&&(s.t=i,
s.m+=c-h,n=t)}return n}function o(t){t.x*=s[0],t.y=t.depth*s[1]}var a=ra.layout.hierarchy().sort(null).value(null),u=Ci,s=[1,1],c=null;

return t.separation=function(e){return arguments.length?(u=e,t):u},t.size=function(e){
return arguments.length?(c=null==(s=e)?o:null,t):c?null:s},t.nodeSize=function(e){
return arguments.length?(c=null==(s=e)?null:o,t):c?s:null},Qr(t,a)},ra.layout.cluster=function(){
function t(t,o){var a,u=e.call(this,t,o),s=u[0],c=0;ei(s,function(t){var e=t.children;

e&&e.length?(t.x=Di(e),t.y=qi(e)):(t.x=a?c+=n(t,a):0,t.y=0,a=t)});var l=Li(s),f=Oi(s),h=l.x-n(l,f)/2,p=f.x+n(f,l)/2;

return ei(s,i?function(t){t.x=(t.x-s.x)*r[0],t.y=(s.y-t.y)*r[1]}:function(t){t.x=(t.x-h)/(p-h)*r[0],
t.y=(1-(s.y?t.y/s.y:1))*r[1]}),u}var e=ra.layout.hierarchy().sort(null).value(null),n=Ci,r=[1,1],i=!1;

return t.separation=function(e){return arguments.length?(n=e,t):n},t.size=function(e){
return arguments.length?(i=null==(r=e),t):i?null:r},t.nodeSize=function(e){return arguments.length?(i=null!=(r=e),
t):i?r:null},Qr(t,e)},ra.layout.treemap=function(){function t(t,e){for(var n,r,i=-1,o=t.length;++i<o;)r=(n=t[i]).value*(0>e?0:e),
n.area=isNaN(r)||0>=r?0:r}function e(n){var o=n.children;if(o&&o.length){var a,u,s,c=f(n),l=[],h=o.slice(),d=1/0,g="slice"===p?c.dx:"dice"===p?c.dy:"slice-dice"===p?1&n.depth?c.dy:c.dx:Math.min(c.dx,c.dy);

for(t(h,c.dx*c.dy/n.value),l.area=0;(s=h.length)>0;)l.push(a=h[s-1]),l.area+=a.area,
"squarify"!==p||(u=r(l,g))<=d?(h.pop(),d=u):(l.area-=l.pop().area,i(l,g,c,!1),g=Math.min(c.dx,c.dy),
l.length=l.area=0,d=1/0);l.length&&(i(l,g,c,!0),l.length=l.area=0),o.forEach(e)}}
function n(e){var r=e.children;if(r&&r.length){var o,a=f(e),u=r.slice(),s=[];for(t(u,a.dx*a.dy/e.value),
s.area=0;o=u.pop();)s.push(o),s.area+=o.area,null!=o.z&&(i(s,o.z?a.dx:a.dy,a,!u.length),
s.length=s.area=0);r.forEach(n)}}function r(t,e){for(var n,r=t.area,i=0,o=1/0,a=-1,u=t.length;++a<u;)(n=t[a].area)&&(o>n&&(o=n),
n>i&&(i=n));return r*=r,e*=e,r?Math.max(e*i*d/r,r/(e*o*d)):1/0}function i(t,e,n,r){
var i,o=-1,a=t.length,u=n.x,c=n.y,l=e?s(t.area/e):0;if(e==n.dx){for((r||l>n.dy)&&(l=n.dy);++o<a;)i=t[o],
i.x=u,i.y=c,i.dy=l,u+=i.dx=Math.min(n.x+n.dx-u,l?s(i.area/l):0);i.z=!0,i.dx+=n.x+n.dx-u,
n.y+=l,n.dy-=l}else{for((r||l>n.dx)&&(l=n.dx);++o<a;)i=t[o],i.x=u,i.y=c,i.dx=l,c+=i.dy=Math.min(n.y+n.dy-c,l?s(i.area/l):0);

i.z=!1,i.dy+=n.y+n.dy-c,n.x+=l,n.dx-=l}}function o(r){var i=a||u(r),o=i[0];return o.x=0,
o.y=0,o.dx=c[0],o.dy=c[1],a&&u.revalue(o),t([o],o.dx*o.dy/o.value),(a?n:e)(o),h&&(a=i),
i}var a,u=ra.layout.hierarchy(),s=Math.round,c=[1,1],l=null,f=Ri,h=!1,p="squarify",d=.5*(1+Math.sqrt(5));

return o.size=function(t){return arguments.length?(c=t,o):c},o.padding=function(t){
function e(e){var n=t.call(o,e,e.depth);return null==n?Ri(e):zi(e,"number"==typeof n?[n,n,n,n]:n);

}function n(e){return zi(e,t)}if(!arguments.length)return l;var r;return f=null==(l=t)?Ri:"function"==(r=typeof t)?e:"number"===r?(t=[t,t,t,t],
n):n,o},o.round=function(t){return arguments.length?(s=t?Math.round:Number,o):s!=Number;

},o.sticky=function(t){return arguments.length?(h=t,a=null,o):h},o.ratio=function(t){
return arguments.length?(d=t,o):d},o.mode=function(t){return arguments.length?(p=t+"",
o):p},Qr(o,u)},ra.random={normal:function(t,e){var n=arguments.length;return 2>n&&(e=1),
1>n&&(t=0),function(){var n,r,i;do n=2*Math.random()-1,r=2*Math.random()-1,i=n*n+r*r;
while(!i||i>1);return t+e*n*Math.sqrt(-2*Math.log(i)/i)}},logNormal:function(){var t=ra.random.normal.apply(ra,arguments);

return function(){return Math.exp(t())}},bates:function(t){var e=ra.random.irwinHall(t);

return function(){return e()/t}},irwinHall:function(t){return function(){for(var e=0,n=0;t>n;n++)e+=Math.random();

return e}}},ra.scale={};var xs={floor:x,ceil:x};ra.scale.linear=function(){return Bi([0,1],[0,1],xr,!1);

};var bs={s:1,g:1,p:1,r:1,e:1};ra.scale.log=function(){return Ki(ra.scale.linear().domain([0,1]),10,!0,[1,10]);

};var ws=ra.format(".0e"),Ms={floor:function(t){return-Math.ceil(-t)},ceil:function(t){
return-Math.floor(-t)}};ra.scale.pow=function(){return Qi(ra.scale.linear(),1,[0,1]);

},ra.scale.sqrt=function(){return ra.scale.pow().exponent(.5)},ra.scale.ordinal=function(){
return eo([],{t:"range",a:[[]]})},ra.scale.category10=function(){return ra.scale.ordinal().range(ks);

},ra.scale.category20=function(){return ra.scale.ordinal().range(_s)},ra.scale.category20b=function(){
return ra.scale.ordinal().range(Ss)},ra.scale.category20c=function(){return ra.scale.ordinal().range(Cs);

};var ks=[2062260,16744206,2924588,14034728,9725885,9197131,14907330,8355711,12369186,1556175].map(bt),_s=[2062260,11454440,16744206,16759672,2924588,10018698,14034728,16750742,9725885,12955861,9197131,12885140,14907330,16234194,8355711,13092807,12369186,14408589,1556175,10410725].map(bt),Ss=[3750777,5395619,7040719,10264286,6519097,9216594,11915115,13556636,9202993,12426809,15186514,15190932,8666169,11356490,14049643,15177372,8077683,10834324,13528509,14589654].map(bt),Cs=[3244733,7057110,10406625,13032431,15095053,16616764,16625259,16634018,3253076,7652470,10607003,13101504,7695281,10394312,12369372,14342891,6513507,9868950,12434877,14277081].map(bt);

ra.scale.quantile=function(){return no([],[])},ra.scale.quantize=function(){return ro(0,1,[0,1]);

},ra.scale.threshold=function(){return io([.5],[0,1])},ra.scale.identity=function(){
return oo([0,1])},ra.svg={},ra.svg.arc=function(){function t(){var t=Math.max(0,+n.apply(this,arguments)),c=Math.max(0,+r.apply(this,arguments)),l=a.apply(this,arguments)-Ra,f=u.apply(this,arguments)-Ra,h=Math.abs(f-l),p=l>f?0:1;

if(t>c&&(d=c,c=t,t=d),h>=Oa)return e(c,p)+(t?e(t,1-p):"")+"Z";var d,g,v,m,y,x,b,w,M,k,_,S,C=0,E=0,T=[];

if((m=(+s.apply(this,arguments)||0)/2)&&(v=o===Es?Math.sqrt(t*t+c*c):+o.apply(this,arguments),
p||(E*=-1),c&&(E=nt(v/c*Math.sin(m))),t&&(C=nt(v/t*Math.sin(m)))),c){y=c*Math.cos(l+E),
x=c*Math.sin(l+E),b=c*Math.cos(f-E),w=c*Math.sin(f-E);var A=Math.abs(f-l-2*E)<=Da?0:1;

if(E&&ho(y,x,b,w)===p^A){var N=(l+f)/2;y=c*Math.cos(N),x=c*Math.sin(N),b=w=null}}else y=x=0;

if(t){M=t*Math.cos(f-C),k=t*Math.sin(f-C),_=t*Math.cos(l+C),S=t*Math.sin(l+C);var j=Math.abs(l-f+2*C)<=Da?0:1;

if(C&&ho(M,k,_,S)===1-p^j){var q=(l+f)/2;M=t*Math.cos(q),k=t*Math.sin(q),_=S=null;

}}else M=k=0;if((d=Math.min(Math.abs(c-t)/2,+i.apply(this,arguments)))>.001){g=c>t^p?0:1;

var D=null==_?[M,k]:null==b?[y,x]:Ln([y,x],[_,S],[b,w],[M,k]),L=y-D[0],O=x-D[1],R=b-D[0],z=w-D[1],P=1/Math.sin(Math.acos((L*R+O*z)/(Math.sqrt(L*L+O*O)*Math.sqrt(R*R+z*z)))/2),H=Math.sqrt(D[0]*D[0]+D[1]*D[1]);

if(null!=b){var F=Math.min(d,(c-H)/(P+1)),I=po(null==_?[M,k]:[_,S],[y,x],c,F,p),U=po([b,w],[M,k],c,F,p);

d===F?T.push("M",I[0],"A",F,",",F," 0 0,",g," ",I[1],"A",c,",",c," 0 ",1-p^ho(I[1][0],I[1][1],U[1][0],U[1][1]),",",p," ",U[1],"A",F,",",F," 0 0,",g," ",U[0]):T.push("M",I[0],"A",F,",",F," 0 1,",g," ",U[0]);

}else T.push("M",y,",",x);if(null!=_){var $=Math.min(d,(t-H)/(P-1)),B=po([y,x],[_,S],t,-$,p),W=po([M,k],null==b?[y,x]:[b,w],t,-$,p);

d===$?T.push("L",W[0],"A",$,",",$," 0 0,",g," ",W[1],"A",t,",",t," 0 ",p^ho(W[1][0],W[1][1],B[1][0],B[1][1]),",",1-p," ",B[1],"A",$,",",$," 0 0,",g," ",B[0]):T.push("L",W[0],"A",$,",",$," 0 0,",g," ",B[0]);

}else T.push("L",M,",",k)}else T.push("M",y,",",x),null!=b&&T.push("A",c,",",c," 0 ",A,",",p," ",b,",",w),
T.push("L",M,",",k),null!=_&&T.push("A",t,",",t," 0 ",j,",",1-p," ",_,",",S);return T.push("Z"),
T.join("")}function e(t,e){return"M0,"+t+"A"+t+","+t+" 0 1,"+e+" 0,"+-t+"A"+t+","+t+" 0 1,"+e+" 0,"+t;

}var n=uo,r=so,i=ao,o=Es,a=co,u=lo,s=fo;return t.innerRadius=function(e){return arguments.length?(n=Et(e),
t):n},t.outerRadius=function(e){return arguments.length?(r=Et(e),t):r},t.cornerRadius=function(e){
return arguments.length?(i=Et(e),t):i},t.padRadius=function(e){return arguments.length?(o=e==Es?Es:Et(e),
t):o},t.startAngle=function(e){return arguments.length?(a=Et(e),t):a},t.endAngle=function(e){
return arguments.length?(u=Et(e),t):u},t.padAngle=function(e){return arguments.length?(s=Et(e),
t):s},t.centroid=function(){var t=(+n.apply(this,arguments)+ +r.apply(this,arguments))/2,e=(+a.apply(this,arguments)+ +u.apply(this,arguments))/2-Ra;

return[Math.cos(e)*t,Math.sin(e)*t]},t};var Es="auto";ra.svg.line=function(){return go(x);

};var Ts=ra.map({linear:vo,"linear-closed":mo,step:yo,"step-before":xo,"step-after":bo,
basis:Co,"basis-open":Eo,"basis-closed":To,bundle:Ao,cardinal:ko,"cardinal-open":wo,
"cardinal-closed":Mo,monotone:Oo});Ts.forEach(function(t,e){e.key=t,e.closed=/-closed$/.test(t);

});var As=[0,2/3,1/3,0],Ns=[0,1/3,2/3,0],js=[0,1/6,2/3,1/6];ra.svg.line.radial=function(){
var t=go(Ro);return t.radius=t.x,delete t.x,t.angle=t.y,delete t.y,t},xo.reverse=bo,
bo.reverse=xo,ra.svg.area=function(){return zo(x)},ra.svg.area.radial=function(){
var t=zo(Ro);return t.radius=t.x,delete t.x,t.innerRadius=t.x0,delete t.x0,t.outerRadius=t.x1,
delete t.x1,t.angle=t.y,delete t.y,t.startAngle=t.y0,delete t.y0,t.endAngle=t.y1,
delete t.y1,t},ra.svg.chord=function(){function t(t,u){var s=e(this,o,t,u),c=e(this,a,t,u);

return"M"+s.p0+r(s.r,s.p1,s.a1-s.a0)+(n(s,c)?i(s.r,s.p1,s.r,s.p0):i(s.r,s.p1,c.r,c.p0)+r(c.r,c.p1,c.a1-c.a0)+i(c.r,c.p1,s.r,s.p0))+"Z";

}function e(t,e,n,r){var i=e.call(t,n,r),o=u.call(t,i,r),a=s.call(t,i,r)-Ra,l=c.call(t,i,r)-Ra;

return{r:o,a0:a,a1:l,p0:[o*Math.cos(a),o*Math.sin(a)],p1:[o*Math.cos(l),o*Math.sin(l)]
}}function n(t,e){return t.a0==e.a0&&t.a1==e.a1}function r(t,e,n){return"A"+t+","+t+" 0 "+ +(n>Da)+",1 "+e;

}function i(t,e,n,r){return"Q 0,0 "+r}var o=xn,a=bn,u=Po,s=co,c=lo;return t.radius=function(e){
return arguments.length?(u=Et(e),t):u},t.source=function(e){return arguments.length?(o=Et(e),
t):o},t.target=function(e){return arguments.length?(a=Et(e),t):a},t.startAngle=function(e){
return arguments.length?(s=Et(e),t):s},t.endAngle=function(e){return arguments.length?(c=Et(e),
t):c},t},ra.svg.diagonal=function(){function t(t,i){var o=e.call(this,t,i),a=n.call(this,t,i),u=(o.y+a.y)/2,s=[o,{
x:o.x,y:u},{x:a.x,y:u},a];return s=s.map(r),"M"+s[0]+"C"+s[1]+" "+s[2]+" "+s[3]}var e=xn,n=bn,r=Ho;

return t.source=function(n){return arguments.length?(e=Et(n),t):e},t.target=function(e){
return arguments.length?(n=Et(e),t):n},t.projection=function(e){return arguments.length?(r=e,
t):r},t},ra.svg.diagonal.radial=function(){var t=ra.svg.diagonal(),e=Ho,n=t.projection;

return t.projection=function(t){return arguments.length?n(Fo(e=t)):e},t},ra.svg.symbol=function(){
function t(t,r){return(qs.get(e.call(this,t,r))||$o)(n.call(this,t,r))}var e=Uo,n=Io;

return t.type=function(n){return arguments.length?(e=Et(n),t):e},t.size=function(e){
return arguments.length?(n=Et(e),t):n},t};var qs=ra.map({circle:$o,cross:function(t){
var e=Math.sqrt(t/5)/2;return"M"+-3*e+","+-e+"H"+-e+"V"+-3*e+"H"+e+"V"+-e+"H"+3*e+"V"+e+"H"+e+"V"+3*e+"H"+-e+"V"+e+"H"+-3*e+"Z";

},diamond:function(t){var e=Math.sqrt(t/(2*Ls)),n=e*Ls;return"M0,"+-e+"L"+n+",0 0,"+e+" "+-n+",0Z";

},square:function(t){var e=Math.sqrt(t)/2;return"M"+-e+","+-e+"L"+e+","+-e+" "+e+","+e+" "+-e+","+e+"Z";

},"triangle-down":function(t){var e=Math.sqrt(t/Ds),n=e*Ds/2;return"M0,"+n+"L"+e+","+-n+" "+-e+","+-n+"Z";

},"triangle-up":function(t){var e=Math.sqrt(t/Ds),n=e*Ds/2;return"M0,"+-n+"L"+e+","+n+" "+-e+","+n+"Z";

}});ra.svg.symbolTypes=qs.keys();var Ds=Math.sqrt(3),Ls=Math.tan(30*za);_a.transition=function(t){
for(var e,n,r=Os||++Hs,i=Vo(t),o=[],a=Rs||{time:Date.now(),ease:Cr,delay:0,duration:250
},u=-1,s=this.length;++u<s;){o.push(e=[]);for(var c=this[u],l=-1,f=c.length;++l<f;)(n=c[l])&&Zo(n,l,i,r,a),
e.push(n)}return Wo(o,i,r)},_a.interrupt=function(t){return this.each(null==t?zs:Bo(Vo(t)));

};var Os,Rs,zs=Bo(Vo()),Ps=[],Hs=0;Ps.call=_a.call,Ps.empty=_a.empty,Ps.node=_a.node,
Ps.size=_a.size,ra.transition=function(t,e){return t&&t.transition?Os?t.transition(e):t:ra.selection().transition(t);

},ra.transition.prototype=Ps,Ps.select=function(t){var e,n,r,i=this.id,o=this.namespace,a=[];

t=A(t);for(var u=-1,s=this.length;++u<s;){a.push(e=[]);for(var c=this[u],l=-1,f=c.length;++l<f;)(r=c[l])&&(n=t.call(r,r.__data__,l,u))?("__data__"in r&&(n.__data__=r.__data__),
Zo(n,l,o,i,r[o][i]),e.push(n)):e.push(null)}return Wo(a,o,i)},Ps.selectAll=function(t){
var e,n,r,i,o,a=this.id,u=this.namespace,s=[];t=N(t);for(var c=-1,l=this.length;++c<l;)for(var f=this[c],h=-1,p=f.length;++h<p;)if(r=f[h]){
o=r[u][a],n=t.call(r,r.__data__,h,c),s.push(e=[]);for(var d=-1,g=n.length;++d<g;)(i=n[d])&&Zo(i,d,u,a,o),
e.push(i)}return Wo(s,u,a)},Ps.filter=function(t){var e,n,r,i=[];"function"!=typeof t&&(t=U(t));

for(var o=0,a=this.length;a>o;o++){i.push(e=[]);for(var n=this[o],u=0,s=n.length;s>u;u++)(r=n[u])&&t.call(r,r.__data__,u,o)&&e.push(r);

}return Wo(i,this.namespace,this.id)},Ps.tween=function(t,e){var n=this.id,r=this.namespace;

return arguments.length<2?this.node()[r][n].tween.get(t):B(this,null==e?function(e){
e[r][n].tween.remove(t)}:function(i){i[r][n].tween.set(t,e)})},Ps.attr=function(t,e){
function n(){this.removeAttribute(u)}function r(){this.removeAttributeNS(u.space,u.local);

}function i(t){return null==t?n:(t+="",function(){var e,n=this.getAttribute(u);return n!==t&&(e=a(n,t),
function(t){this.setAttribute(u,e(t))})})}function o(t){return null==t?r:(t+="",function(){
var e,n=this.getAttributeNS(u.space,u.local);return n!==t&&(e=a(n,t),function(t){
this.setAttributeNS(u.space,u.local,e(t))})})}if(arguments.length<2){for(e in t)this.attr(e,t[e]);

return this}var a="transform"==t?Ur:xr,u=ra.ns.qualify(t);return Yo(this,"attr."+t,e,u.local?o:i);

},Ps.attrTween=function(t,e){function n(t,n){var r=e.call(this,t,n,this.getAttribute(i));

return r&&function(t){this.setAttribute(i,r(t))}}function r(t,n){var r=e.call(this,t,n,this.getAttributeNS(i.space,i.local));

return r&&function(t){this.setAttributeNS(i.space,i.local,r(t))}}var i=ra.ns.qualify(t);

return this.tween("attr."+t,i.local?r:n)},Ps.style=function(t,e,r){function i(){this.style.removeProperty(t);

}function o(e){return null==e?i:(e+="",function(){var i,o=n(this).getComputedStyle(this,null).getPropertyValue(t);

return o!==e&&(i=xr(o,e),function(e){this.style.setProperty(t,i(e),r)})})}var a=arguments.length;

if(3>a){if("string"!=typeof t){2>a&&(e="");for(r in t)this.style(r,t[r],e);return this;

}r=""}return Yo(this,"style."+t,e,o)},Ps.styleTween=function(t,e,r){function i(i,o){
var a=e.call(this,i,o,n(this).getComputedStyle(this,null).getPropertyValue(t));return a&&function(e){
this.style.setProperty(t,a(e),r)}}return arguments.length<3&&(r=""),this.tween("style."+t,i);

},Ps.text=function(t){return Yo(this,"text",t,Xo)},Ps.remove=function(){var t=this.namespace;

return this.each("end.transition",function(){var e;this[t].count<2&&(e=this.parentNode)&&e.removeChild(this);

})},Ps.ease=function(t){var e=this.id,n=this.namespace;return arguments.length<1?this.node()[n][e].ease:("function"!=typeof t&&(t=ra.ease.apply(ra,arguments)),
B(this,function(r){r[n][e].ease=t}))},Ps.delay=function(t){var e=this.id,n=this.namespace;

return arguments.length<1?this.node()[n][e].delay:B(this,"function"==typeof t?function(r,i,o){
r[n][e].delay=+t.call(r,r.__data__,i,o)}:(t=+t,function(r){r[n][e].delay=t}))},Ps.duration=function(t){
var e=this.id,n=this.namespace;return arguments.length<1?this.node()[n][e].duration:B(this,"function"==typeof t?function(r,i,o){
r[n][e].duration=Math.max(1,t.call(r,r.__data__,i,o))}:(t=Math.max(1,t),function(r){
r[n][e].duration=t}))},Ps.each=function(t,e){var n=this.id,r=this.namespace;if(arguments.length<2){
var i=Rs,o=Os;try{Os=n,B(this,function(e,i,o){Rs=e[r][n],t.call(e,e.__data__,i,o);

})}finally{Rs=i,Os=o}}else B(this,function(i){var o=i[r][n];(o.event||(o.event=ra.dispatch("start","end","interrupt"))).on(t,e);

});return this},Ps.transition=function(){for(var t,e,n,r,i=this.id,o=++Hs,a=this.namespace,u=[],s=0,c=this.length;c>s;s++){
u.push(t=[]);for(var e=this[s],l=0,f=e.length;f>l;l++)(n=e[l])&&(r=n[a][i],Zo(n,l,a,o,{
time:r.time,ease:r.ease,delay:r.delay+r.duration,duration:r.duration})),t.push(n);

}return Wo(u,a,o)},ra.svg.axis=function(){function t(t){t.each(function(){var t,c=ra.select(this),l=this.__chart__||n,f=this.__chart__=n.copy(),h=null==s?f.ticks?f.ticks.apply(f,u):f.domain():s,p=null==e?f.tickFormat?f.tickFormat.apply(f,u):x:e,d=c.selectAll(".tick").data(h,f),g=d.enter().insert("g",".domain").attr("class","tick").style("opacity",ja),v=ra.transition(d.exit()).style("opacity",ja).remove(),m=ra.transition(d.order()).style("opacity",1),y=Math.max(i,0)+a,b=Hi(f),w=c.selectAll(".domain").data([0]),M=(w.enter().append("path").attr("class","domain"),
ra.transition(w));g.append("line"),g.append("text");var k,_,S,C,E=g.select("line"),T=m.select("line"),A=d.select("text").text(p),N=g.select("text"),j=m.select("text"),q="top"===r||"left"===r?-1:1;

if("bottom"===r||"top"===r?(t=Jo,k="x",S="y",_="x2",C="y2",A.attr("dy",0>q?"0em":".71em").style("text-anchor","middle"),
M.attr("d","M"+b[0]+","+q*o+"V0H"+b[1]+"V"+q*o)):(t=Go,k="y",S="x",_="y2",C="x2",
A.attr("dy",".32em").style("text-anchor",0>q?"end":"start"),M.attr("d","M"+q*o+","+b[0]+"H0V"+b[1]+"H"+q*o)),
E.attr(C,q*i),N.attr(S,q*y),T.attr(_,0).attr(C,q*i),j.attr(k,0).attr(S,q*y),f.rangeBand){
var D=f,L=D.rangeBand()/2;l=f=function(t){return D(t)+L}}else l.rangeBand?l=f:v.call(t,f,l);

g.call(t,l,f),m.call(t,f,f)})}var e,n=ra.scale.linear(),r=Fs,i=6,o=6,a=3,u=[10],s=null;

return t.scale=function(e){return arguments.length?(n=e,t):n},t.orient=function(e){
return arguments.length?(r=e in Is?e+"":Fs,t):r},t.ticks=function(){return arguments.length?(u=arguments,
t):u},t.tickValues=function(e){return arguments.length?(s=e,t):s},t.tickFormat=function(n){
return arguments.length?(e=n,t):e},t.tickSize=function(e){var n=arguments.length;
return n?(i=+e,o=+arguments[n-1],t):i},t.innerTickSize=function(e){return arguments.length?(i=+e,
t):i},t.outerTickSize=function(e){return arguments.length?(o=+e,t):o},t.tickPadding=function(e){
return arguments.length?(a=+e,t):a},t.tickSubdivide=function(){return arguments.length&&t;

},t};var Fs="bottom",Is={top:1,right:1,bottom:1,left:1};ra.svg.brush=function(){function t(n){
n.each(function(){var n=ra.select(this).style("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush",o).on("touchstart.brush",o),a=n.selectAll(".background").data([0]);

a.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),
n.selectAll(".extent").data([0]).enter().append("rect").attr("class","extent").style("cursor","move");

var u=n.selectAll(".resize").data(g,x);u.exit().remove(),u.enter().append("g").attr("class",function(t){
return"resize "+t}).style("cursor",function(t){return Us[t]}).append("rect").attr("x",function(t){
return/[ew]$/.test(t)?-3:null}).attr("y",function(t){return/^[ns]/.test(t)?-3:null;

}).attr("width",6).attr("height",6).style("visibility","hidden"),u.style("display",t.empty()?"none":null);

var s,f=ra.transition(n),h=ra.transition(a);c&&(s=Hi(c),h.attr("x",s[0]).attr("width",s[1]-s[0]),
r(f)),l&&(s=Hi(l),h.attr("y",s[0]).attr("height",s[1]-s[0]),i(f)),e(f)})}function e(t){
t.selectAll(".resize").attr("transform",function(t){return"translate("+f[+/e$/.test(t)]+","+h[+/^s/.test(t)]+")";

})}function r(t){t.select(".extent").attr("x",f[0]),t.selectAll(".extent,.n>rect,.s>rect").attr("width",f[1]-f[0]);

}function i(t){t.select(".extent").attr("y",h[0]),t.selectAll(".extent,.e>rect,.w>rect").attr("height",h[1]-h[0]);

}function o(){function o(){32==ra.event.keyCode&&(A||(x=null,j[0]-=f[1],j[1]-=h[1],
A=2),S())}function g(){32==ra.event.keyCode&&2==A&&(j[0]+=f[1],j[1]+=h[1],A=0,S());

}function v(){var t=ra.mouse(w),n=!1;b&&(t[0]+=b[0],t[1]+=b[1]),A||(ra.event.altKey?(x||(x=[(f[0]+f[1])/2,(h[0]+h[1])/2]),
j[0]=f[+(t[0]<x[0])],j[1]=h[+(t[1]<x[1])]):x=null),E&&m(t,c,0)&&(r(_),n=!0),T&&m(t,l,1)&&(i(_),
n=!0),n&&(e(_),k({type:"brush",mode:A?"move":"resize"}))}function m(t,e,n){var r,i,o=Hi(e),s=o[0],c=o[1],l=j[n],g=n?h:f,v=g[1]-g[0];

return A&&(s-=l,c-=v+l),r=(n?d:p)?Math.max(s,Math.min(c,t[n])):t[n],A?i=(r+=l)+v:(x&&(l=Math.max(s,Math.min(c,2*x[n]-r))),
r>l?(i=r,r=l):i=l),g[0]!=r||g[1]!=i?(n?u=null:a=null,g[0]=r,g[1]=i,!0):void 0}function y(){
v(),_.style("pointer-events","all").selectAll(".resize").style("display",t.empty()?"none":null),
ra.select("body").style("cursor",null),q.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),
N(),k({type:"brushend"})}var x,b,w=this,M=ra.select(ra.event.target),k=s.of(w,arguments),_=ra.select(w),C=M.datum(),E=!/^(n|s)$/.test(C)&&c,T=!/^(e|w)$/.test(C)&&l,A=M.classed("extent"),N=J(w),j=ra.mouse(w),q=ra.select(n(w)).on("keydown.brush",o).on("keyup.brush",g);

if(ra.event.changedTouches?q.on("touchmove.brush",v).on("touchend.brush",y):q.on("mousemove.brush",v).on("mouseup.brush",y),
_.interrupt().selectAll("*").interrupt(),A)j[0]=f[0]-j[0],j[1]=h[0]-j[1];else if(C){
var D=+/w$/.test(C),L=+/^n/.test(C);b=[f[1-D]-j[0],h[1-L]-j[1]],j[0]=f[D],j[1]=h[L];

}else ra.event.altKey&&(x=j.slice());_.style("pointer-events","none").selectAll(".resize").style("display",null),
ra.select("body").style("cursor",M.style("cursor")),k({type:"brushstart"}),v()}var a,u,s=E(t,"brushstart","brush","brushend"),c=null,l=null,f=[0,0],h=[0,0],p=!0,d=!0,g=$s[0];

return t.event=function(t){t.each(function(){var t=s.of(this,arguments),e={x:f,y:h,
i:a,j:u},n=this.__chart__||e;this.__chart__=e,Os?ra.select(this).transition().each("start.brush",function(){
a=n.i,u=n.j,f=n.x,h=n.y,t({type:"brushstart"})}).tween("brush:brush",function(){var n=br(f,e.x),r=br(h,e.y);

return a=u=null,function(i){f=e.x=n(i),h=e.y=r(i),t({type:"brush",mode:"resize"});

}}).each("end.brush",function(){a=e.i,u=e.j,t({type:"brush",mode:"resize"}),t({type:"brushend"
})}):(t({type:"brushstart"}),t({type:"brush",mode:"resize"}),t({type:"brushend"}));

})},t.x=function(e){return arguments.length?(c=e,g=$s[!c<<1|!l],t):c},t.y=function(e){
return arguments.length?(l=e,g=$s[!c<<1|!l],t):l},t.clamp=function(e){return arguments.length?(c&&l?(p=!!e[0],
d=!!e[1]):c?p=!!e:l&&(d=!!e),t):c&&l?[p,d]:c?p:l?d:null},t.extent=function(e){var n,r,i,o,s;

return arguments.length?(c&&(n=e[0],r=e[1],l&&(n=n[0],r=r[0]),a=[n,r],c.invert&&(n=c(n),
r=c(r)),n>r&&(s=n,n=r,r=s),(n!=f[0]||r!=f[1])&&(f=[n,r])),l&&(i=e[0],o=e[1],c&&(i=i[1],
o=o[1]),u=[i,o],l.invert&&(i=l(i),o=l(o)),i>o&&(s=i,i=o,o=s),(i!=h[0]||o!=h[1])&&(h=[i,o])),
t):(c&&(a?(n=a[0],r=a[1]):(n=f[0],r=f[1],c.invert&&(n=c.invert(n),r=c.invert(r)),
n>r&&(s=n,n=r,r=s))),l&&(u?(i=u[0],o=u[1]):(i=h[0],o=h[1],l.invert&&(i=l.invert(i),
o=l.invert(o)),i>o&&(s=i,i=o,o=s))),c&&l?[[n,i],[r,o]]:c?[n,r]:l&&[i,o])},t.clear=function(){
return t.empty()||(f=[0,0],h=[0,0],a=u=null),t},t.empty=function(){return!!c&&f[0]==f[1]||!!l&&h[0]==h[1];

},ra.rebind(t,s,"on")};var Us={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",
nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},$s=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]],Bs=cu.format=gu.timeFormat,Ws=Bs.utc,Ys=Ws("%Y-%m-%dT%H:%M:%S.%LZ");

Bs.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?Ko:Ys,Ko.parse=function(t){
var e=new Date(t);return isNaN(e)?null:e},Ko.toString=Ys.toString,cu.second=Ft(function(t){
return new lu(1e3*Math.floor(t/1e3))},function(t,e){t.setTime(t.getTime()+1e3*Math.floor(e));

},function(t){return t.getSeconds()}),cu.seconds=cu.second.range,cu.seconds.utc=cu.second.utc.range,
cu.minute=Ft(function(t){return new lu(6e4*Math.floor(t/6e4))},function(t,e){t.setTime(t.getTime()+6e4*Math.floor(e));

},function(t){return t.getMinutes()}),cu.minutes=cu.minute.range,cu.minutes.utc=cu.minute.utc.range,
cu.hour=Ft(function(t){var e=t.getTimezoneOffset()/60;return new lu(36e5*(Math.floor(t/36e5-e)+e));

},function(t,e){t.setTime(t.getTime()+36e5*Math.floor(e))},function(t){return t.getHours();

}),cu.hours=cu.hour.range,cu.hours.utc=cu.hour.utc.range,cu.month=Ft(function(t){
return t=cu.day(t),t.setDate(1),t},function(t,e){t.setMonth(t.getMonth()+e)},function(t){
return t.getMonth()}),cu.months=cu.month.range,cu.months.utc=cu.month.utc.range;var Xs=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],Vs=[[cu.second,1],[cu.second,5],[cu.second,15],[cu.second,30],[cu.minute,1],[cu.minute,5],[cu.minute,15],[cu.minute,30],[cu.hour,1],[cu.hour,3],[cu.hour,6],[cu.hour,12],[cu.day,1],[cu.day,2],[cu.week,1],[cu.month,1],[cu.month,3],[cu.year,1]],Zs=Bs.multi([[".%L",function(t){
return t.getMilliseconds()}],[":%S",function(t){return t.getSeconds()}],["%I:%M",function(t){
return t.getMinutes()}],["%I %p",function(t){return t.getHours()}],["%a %d",function(t){
return t.getDay()&&1!=t.getDate()}],["%b %d",function(t){return 1!=t.getDate()}],["%B",function(t){
return t.getMonth()}],["%Y",Ae]]),Js={range:function(t,e,n){return ra.range(Math.ceil(t/n)*n,+e,n).map(ta);

},floor:x,ceil:x};Vs.year=cu.year,cu.scale=function(){return Qo(ra.scale.linear(),Vs,Zs);

};var Gs=Vs.map(function(t){return[t[0].utc,t[1]]}),Ks=Ws.multi([[".%L",function(t){
return t.getUTCMilliseconds()}],[":%S",function(t){return t.getUTCSeconds()}],["%I:%M",function(t){
return t.getUTCMinutes()}],["%I %p",function(t){return t.getUTCHours()}],["%a %d",function(t){
return t.getUTCDay()&&1!=t.getUTCDate()}],["%b %d",function(t){return 1!=t.getUTCDate();

}],["%B",function(t){return t.getUTCMonth()}],["%Y",Ae]]);Gs.year=cu.year.utc,cu.scale.utc=function(){
return Qo(ra.scale.linear(),Gs,Ks)},ra.text=Tt(function(t){return t.responseText}),
ra.json=function(t,e){return At(t,"application/json",ea,e)},ra.html=function(t,e){
return At(t,"text/html",na,e)},ra.xml=Tt(function(t){return t.responseXML}),"function"==typeof define&&define.amd?define(ra):"object"==typeof e&&e.exports&&(e.exports=ra),
this.d3=ra}()},{}],24:[function(t,e,n){!function(t,n){"object"==typeof e&&"object"==typeof e.exports?e.exports=t.document?n(t,!0):function(t){
if(!t.document)throw new Error("jQuery requires a window with a document");return n(t);

}:n(t)}("undefined"!=typeof window?window:this,function(t,e){function n(t){var e="length"in t&&t.length,n=Q.type(t);

return"function"===n||Q.isWindow(t)?!1:1===t.nodeType&&e?!0:"array"===n||0===e||"number"==typeof e&&e>0&&e-1 in t;

}function r(t,e,n){if(Q.isFunction(e))return Q.grep(t,function(t,r){return!!e.call(t,r,t)!==n;

});if(e.nodeType)return Q.grep(t,function(t){return t===e!==n});if("string"==typeof e){
if(ut.test(e))return Q.filter(e,t,n);e=Q.filter(e,t)}return Q.grep(t,function(t){
return Y.call(e,t)>=0!==n})}function i(t,e){for(;(t=t[e])&&1!==t.nodeType;);return t;

}function o(t){var e=dt[t]={};return Q.each(t.match(pt)||[],function(t,n){e[n]=!0;

}),e}function a(){G.removeEventListener("DOMContentLoaded",a,!1),t.removeEventListener("load",a,!1),
Q.ready()}function u(){Object.defineProperty(this.cache={},0,{get:function(){return{};

}}),this.expando=Q.expando+u.uid++}function s(t,e,n){var r;if(void 0===n&&1===t.nodeType)if(r="data-"+e.replace(bt,"-$1").toLowerCase(),
n=t.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:xt.test(n)?Q.parseJSON(n):n;

}catch(i){}yt.set(t,e,n)}else n=void 0;return n}function c(){return!0}function l(){
return!1}function f(){try{return G.activeElement}catch(t){}}function h(t,e){return Q.nodeName(t,"table")&&Q.nodeName(11!==e.nodeType?e:e.firstChild,"tr")?t.getElementsByTagName("tbody")[0]||t.appendChild(t.ownerDocument.createElement("tbody")):t;

}function p(t){return t.type=(null!==t.getAttribute("type"))+"/"+t.type,t}function d(t){
var e=Rt.exec(t.type);return e?t.type=e[1]:t.removeAttribute("type"),t}function g(t,e){
for(var n=0,r=t.length;r>n;n++)mt.set(t[n],"globalEval",!e||mt.get(e[n],"globalEval"));

}function v(t,e){var n,r,i,o,a,u,s,c;if(1===e.nodeType){if(mt.hasData(t)&&(o=mt.access(t),
a=mt.set(e,o),c=o.events)){delete a.handle,a.events={};for(i in c)for(n=0,r=c[i].length;r>n;n++)Q.event.add(e,i,c[i][n]);

}yt.hasData(t)&&(u=yt.access(t),s=Q.extend({},u),yt.set(e,s))}}function m(t,e){var n=t.getElementsByTagName?t.getElementsByTagName(e||"*"):t.querySelectorAll?t.querySelectorAll(e||"*"):[];

return void 0===e||e&&Q.nodeName(t,e)?Q.merge([t],n):n}function y(t,e){var n=e.nodeName.toLowerCase();

"input"===n&&_t.test(t.type)?e.checked=t.checked:("input"===n||"textarea"===n)&&(e.defaultValue=t.defaultValue);

}function x(e,n){var r,i=Q(n.createElement(e)).appendTo(n.body),o=t.getDefaultComputedStyle&&(r=t.getDefaultComputedStyle(i[0]))?r.display:Q.css(i[0],"display");

return i.detach(),o}function b(t){var e=G,n=Ft[t];return n||(n=x(t,e),"none"!==n&&n||(Ht=(Ht||Q("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement),
e=Ht[0].contentDocument,e.write(),e.close(),n=x(t,e),Ht.detach()),Ft[t]=n),n}function w(t,e,n){
var r,i,o,a,u=t.style;return n=n||$t(t),n&&(a=n.getPropertyValue(e)||n[e]),n&&(""!==a||Q.contains(t.ownerDocument,t)||(a=Q.style(t,e)),
Ut.test(a)&&It.test(e)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,
a=n.width,u.width=r,u.minWidth=i,u.maxWidth=o)),void 0!==a?a+"":a}function M(t,e){
return{get:function(){return t()?void delete this.get:(this.get=e).apply(this,arguments);

}}}function k(t,e){if(e in t)return e;for(var n=e[0].toUpperCase()+e.slice(1),r=e,i=Zt.length;i--;)if(e=Zt[i]+n,
e in t)return e;return r}function _(t,e,n){var r=Wt.exec(e);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):e;

}function S(t,e,n,r,i){for(var o=n===(r?"border":"content")?4:"width"===e?1:0,a=0;4>o;o+=2)"margin"===n&&(a+=Q.css(t,n+Mt[o],!0,i)),
r?("content"===n&&(a-=Q.css(t,"padding"+Mt[o],!0,i)),"margin"!==n&&(a-=Q.css(t,"border"+Mt[o]+"Width",!0,i))):(a+=Q.css(t,"padding"+Mt[o],!0,i),
"padding"!==n&&(a+=Q.css(t,"border"+Mt[o]+"Width",!0,i)));return a}function C(t,e,n){
var r=!0,i="width"===e?t.offsetWidth:t.offsetHeight,o=$t(t),a="border-box"===Q.css(t,"boxSizing",!1,o);

if(0>=i||null==i){if(i=w(t,e,o),(0>i||null==i)&&(i=t.style[e]),Ut.test(i))return i;

r=a&&(J.boxSizingReliable()||i===t.style[e]),i=parseFloat(i)||0}return i+S(t,e,n||(a?"border":"content"),r,o)+"px";

}function E(t,e){for(var n,r,i,o=[],a=0,u=t.length;u>a;a++)r=t[a],r.style&&(o[a]=mt.get(r,"olddisplay"),
n=r.style.display,e?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&kt(r)&&(o[a]=mt.access(r,"olddisplay",b(r.nodeName)))):(i=kt(r),
"none"===n&&i||mt.set(r,"olddisplay",i?n:Q.css(r,"display"))));for(a=0;u>a;a++)r=t[a],
r.style&&(e&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=e?o[a]||"":"none"));

return t}function T(t,e,n,r,i){return new T.prototype.init(t,e,n,r,i)}function A(){
return setTimeout(function(){Jt=void 0}),Jt=Q.now()}function N(t,e){var n,r=0,i={
height:t};for(e=e?1:0;4>r;r+=2-e)n=Mt[r],i["margin"+n]=i["padding"+n]=t;return e&&(i.opacity=i.width=t),
i}function j(t,e,n){for(var r,i=(ne[e]||[]).concat(ne["*"]),o=0,a=i.length;a>o;o++)if(r=i[o].call(n,e,t))return r;

}function q(t,e,n){var r,i,o,a,u,s,c,l,f=this,h={},p=t.style,d=t.nodeType&&kt(t),g=mt.get(t,"fxshow");

n.queue||(u=Q._queueHooks(t,"fx"),null==u.unqueued&&(u.unqueued=0,s=u.empty.fire,
u.empty.fire=function(){u.unqueued||s()}),u.unqueued++,f.always(function(){f.always(function(){
u.unqueued--,Q.queue(t,"fx").length||u.empty.fire()})})),1===t.nodeType&&("height"in e||"width"in e)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],
c=Q.css(t,"display"),l="none"===c?mt.get(t,"olddisplay")||b(t.nodeName):c,"inline"===l&&"none"===Q.css(t,"float")&&(p.display="inline-block")),
n.overflow&&(p.overflow="hidden",f.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],
p.overflowY=n.overflow[2]}));for(r in e)if(i=e[r],Kt.exec(i)){if(delete e[r],o=o||"toggle"===i,
i===(d?"hide":"show")){if("show"!==i||!g||void 0===g[r])continue;d=!0}h[r]=g&&g[r]||Q.style(t,r);

}else c=void 0;if(Q.isEmptyObject(h))"inline"===("none"===c?b(t.nodeName):c)&&(p.display=c);
else{g?"hidden"in g&&(d=g.hidden):g=mt.access(t,"fxshow",{}),o&&(g.hidden=!d),d?Q(t).show():f.done(function(){
Q(t).hide()}),f.done(function(){var e;mt.remove(t,"fxshow");for(e in h)Q.style(t,e,h[e]);

});for(r in h)a=j(d?g[r]:0,r,f),r in g||(g[r]=a.start,d&&(a.end=a.start,a.start="width"===r||"height"===r?1:0));

}}function D(t,e){var n,r,i,o,a;for(n in t)if(r=Q.camelCase(n),i=e[r],o=t[n],Q.isArray(o)&&(i=o[1],
o=t[n]=o[0]),n!==r&&(t[r]=o,delete t[n]),a=Q.cssHooks[r],a&&"expand"in a){o=a.expand(o),
delete t[r];for(n in o)n in t||(t[n]=o[n],e[n]=i)}else e[r]=i}function L(t,e,n){var r,i,o=0,a=ee.length,u=Q.Deferred().always(function(){
delete s.elem}),s=function(){if(i)return!1;for(var e=Jt||A(),n=Math.max(0,c.startTime+c.duration-e),r=n/c.duration||0,o=1-r,a=0,s=c.tweens.length;s>a;a++)c.tweens[a].run(o);

return u.notifyWith(t,[c,o,n]),1>o&&s?n:(u.resolveWith(t,[c]),!1)},c=u.promise({elem:t,
props:Q.extend({},e),opts:Q.extend(!0,{specialEasing:{}},n),originalProperties:e,
originalOptions:n,startTime:Jt||A(),duration:n.duration,tweens:[],createTween:function(e,n){
var r=Q.Tween(t,c.opts,e,n,c.opts.specialEasing[e]||c.opts.easing);return c.tweens.push(r),
r},stop:function(e){var n=0,r=e?c.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)c.tweens[n].run(1);

return e?u.resolveWith(t,[c,e]):u.rejectWith(t,[c,e]),this}}),l=c.props;for(D(l,c.opts.specialEasing);a>o;o++)if(r=ee[o].call(c,t,l,c.opts))return r;

return Q.map(l,j,c),Q.isFunction(c.opts.start)&&c.opts.start.call(t,c),Q.fx.timer(Q.extend(s,{
elem:t,anim:c,queue:c.opts.queue})),c.progress(c.opts.progress).done(c.opts.done,c.opts.complete).fail(c.opts.fail).always(c.opts.always);

}function O(t){return function(e,n){"string"!=typeof e&&(n=e,e="*");var r,i=0,o=e.toLowerCase().match(pt)||[];

if(Q.isFunction(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(t[r]=t[r]||[]).unshift(n)):(t[r]=t[r]||[]).push(n);

}}function R(t,e,n,r){function i(u){var s;return o[u]=!0,Q.each(t[u]||[],function(t,u){
var c=u(e,n,r);return"string"!=typeof c||a||o[c]?a?!(s=c):void 0:(e.dataTypes.unshift(c),
i(c),!1)}),s}var o={},a=t===xe;return i(e.dataTypes[0])||!o["*"]&&i("*")}function z(t,e){
var n,r,i=Q.ajaxSettings.flatOptions||{};for(n in e)void 0!==e[n]&&((i[n]?t:r||(r={}))[n]=e[n]);

return r&&Q.extend(!0,t,r),t}function P(t,e,n){for(var r,i,o,a,u=t.contents,s=t.dataTypes;"*"===s[0];)s.shift(),
void 0===r&&(r=t.mimeType||e.getResponseHeader("Content-Type"));if(r)for(i in u)if(u[i]&&u[i].test(r)){
s.unshift(i);break}if(s[0]in n)o=s[0];else{for(i in n){if(!s[0]||t.converters[i+" "+s[0]]){
o=i;break}a||(a=i)}o=o||a}return o?(o!==s[0]&&s.unshift(o),n[o]):void 0}function H(t,e,n,r){
var i,o,a,u,s,c={},l=t.dataTypes.slice();if(l[1])for(a in t.converters)c[a.toLowerCase()]=t.converters[a];

for(o=l.shift();o;)if(t.responseFields[o]&&(n[t.responseFields[o]]=e),!s&&r&&t.dataFilter&&(e=t.dataFilter(e,t.dataType)),
s=o,o=l.shift())if("*"===o)o=s;else if("*"!==s&&s!==o){if(a=c[s+" "+o]||c["* "+o],
!a)for(i in c)if(u=i.split(" "),u[1]===o&&(a=c[s+" "+u[0]]||c["* "+u[0]])){a===!0?a=c[i]:c[i]!==!0&&(o=u[0],
l.unshift(u[1]));break}if(a!==!0)if(a&&t["throws"])e=a(e);else try{e=a(e)}catch(f){
return{state:"parsererror",error:a?f:"No conversion from "+s+" to "+o}}}return{state:"success",
data:e}}function F(t,e,n,r){var i;if(Q.isArray(e))Q.each(e,function(e,i){n||_e.test(t)?r(t,i):F(t+"["+("object"==typeof i?e:"")+"]",i,n,r);

});else if(n||"object"!==Q.type(e))r(t,e);else for(i in e)F(t+"["+i+"]",e[i],n,r);

}function I(t){return Q.isWindow(t)?t:9===t.nodeType&&t.defaultView}var U=[],$=U.slice,B=U.concat,W=U.push,Y=U.indexOf,X={},V=X.toString,Z=X.hasOwnProperty,J={},G=t.document,K="2.1.4",Q=function(t,e){
return new Q.fn.init(t,e)},tt=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,et=/^-ms-/,nt=/-([\da-z])/gi,rt=function(t,e){
return e.toUpperCase()};Q.fn=Q.prototype={jquery:K,constructor:Q,selector:"",length:0,
toArray:function(){return $.call(this)},get:function(t){return null!=t?0>t?this[t+this.length]:this[t]:$.call(this);

},pushStack:function(t){var e=Q.merge(this.constructor(),t);return e.prevObject=this,
e.context=this.context,e},each:function(t,e){return Q.each(this,t,e)},map:function(t){
return this.pushStack(Q.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){
return this.pushStack($.apply(this,arguments))},first:function(){return this.eq(0);

},last:function(){return this.eq(-1)},eq:function(t){var e=this.length,n=+t+(0>t?e:0);

return this.pushStack(n>=0&&e>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null);

},push:W,sort:U.sort,splice:U.splice},Q.extend=Q.fn.extend=function(){var t,e,n,r,i,o,a=arguments[0]||{},u=1,s=arguments.length,c=!1;

for("boolean"==typeof a&&(c=a,a=arguments[u]||{},u++),"object"==typeof a||Q.isFunction(a)||(a={}),
u===s&&(a=this,u--);s>u;u++)if(null!=(t=arguments[u]))for(e in t)n=a[e],r=t[e],a!==r&&(c&&r&&(Q.isPlainObject(r)||(i=Q.isArray(r)))?(i?(i=!1,
o=n&&Q.isArray(n)?n:[]):o=n&&Q.isPlainObject(n)?n:{},a[e]=Q.extend(c,o,r)):void 0!==r&&(a[e]=r));

return a},Q.extend({expando:"jQuery"+(K+Math.random()).replace(/\D/g,""),isReady:!0,
error:function(t){throw new Error(t)},noop:function(){},isFunction:function(t){return"function"===Q.type(t);

},isArray:Array.isArray,isWindow:function(t){return null!=t&&t===t.window},isNumeric:function(t){
return!Q.isArray(t)&&t-parseFloat(t)+1>=0},isPlainObject:function(t){return"object"!==Q.type(t)||t.nodeType||Q.isWindow(t)?!1:t.constructor&&!Z.call(t.constructor.prototype,"isPrototypeOf")?!1:!0;

},isEmptyObject:function(t){var e;for(e in t)return!1;return!0},type:function(t){
return null==t?t+"":"object"==typeof t||"function"==typeof t?X[V.call(t)]||"object":typeof t;

},globalEval:function(t){var e,n=eval;t=Q.trim(t),t&&(1===t.indexOf("use strict")?(e=G.createElement("script"),
e.text=t,G.head.appendChild(e).parentNode.removeChild(e)):n(t))},camelCase:function(t){
return t.replace(et,"ms-").replace(nt,rt)},nodeName:function(t,e){return t.nodeName&&t.nodeName.toLowerCase()===e.toLowerCase();

},each:function(t,e,r){var i,o=0,a=t.length,u=n(t);if(r){if(u)for(;a>o&&(i=e.apply(t[o],r),
i!==!1);o++);else for(o in t)if(i=e.apply(t[o],r),i===!1)break}else if(u)for(;a>o&&(i=e.call(t[o],o,t[o]),
i!==!1);o++);else for(o in t)if(i=e.call(t[o],o,t[o]),i===!1)break;return t},trim:function(t){
return null==t?"":(t+"").replace(tt,"")},makeArray:function(t,e){var r=e||[];return null!=t&&(n(Object(t))?Q.merge(r,"string"==typeof t?[t]:t):W.call(r,t)),
r},inArray:function(t,e,n){return null==e?-1:Y.call(e,t,n)},merge:function(t,e){for(var n=+e.length,r=0,i=t.length;n>r;r++)t[i++]=e[r];

return t.length=i,t},grep:function(t,e,n){for(var r,i=[],o=0,a=t.length,u=!n;a>o;o++)r=!e(t[o],o),
r!==u&&i.push(t[o]);return i},map:function(t,e,r){var i,o=0,a=t.length,u=n(t),s=[];

if(u)for(;a>o;o++)i=e(t[o],o,r),null!=i&&s.push(i);else for(o in t)i=e(t[o],o,r),
null!=i&&s.push(i);return B.apply([],s)},guid:1,proxy:function(t,e){var n,r,i;return"string"==typeof e&&(n=t[e],
e=t,t=n),Q.isFunction(t)?(r=$.call(arguments,2),i=function(){return t.apply(e||this,r.concat($.call(arguments)));

},i.guid=t.guid=t.guid||Q.guid++,i):void 0},now:Date.now,support:J}),Q.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){
X["[object "+e+"]"]=e.toLowerCase()});var it=function(t){function e(t,e,n,r){var i,o,a,u,s,c,f,p,d,g;

if((e?e.ownerDocument||e:F)!==q&&j(e),e=e||q,n=n||[],u=e.nodeType,"string"!=typeof t||!t||1!==u&&9!==u&&11!==u)return n;

if(!r&&L){if(11!==u&&(i=yt.exec(t)))if(a=i[1]){if(9===u){if(o=e.getElementById(a),
!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(e.ownerDocument&&(o=e.ownerDocument.getElementById(a))&&P(e,o)&&o.id===a)return n.push(o),
n}else{if(i[2])return K.apply(n,e.getElementsByTagName(t)),n;if((a=i[3])&&w.getElementsByClassName)return K.apply(n,e.getElementsByClassName(a)),
n}if(w.qsa&&(!O||!O.test(t))){if(p=f=H,d=e,g=1!==u&&t,1===u&&"object"!==e.nodeName.toLowerCase()){
for(c=S(t),(f=e.getAttribute("id"))?p=f.replace(bt,"\\$&"):e.setAttribute("id",p),
p="[id='"+p+"'] ",s=c.length;s--;)c[s]=p+h(c[s]);d=xt.test(t)&&l(e.parentNode)||e,
g=c.join(",")}if(g)try{return K.apply(n,d.querySelectorAll(g)),n}catch(v){}finally{
f||e.removeAttribute("id")}}}return E(t.replace(st,"$1"),e,n,r)}function n(){function t(n,r){
return e.push(n+" ")>M.cacheLength&&delete t[e.shift()],t[n+" "]=r}var e=[];return t;

}function r(t){return t[H]=!0,t}function i(t){var e=q.createElement("div");try{return!!t(e);

}catch(n){return!1}finally{e.parentNode&&e.parentNode.removeChild(e),e=null}}function o(t,e){
for(var n=t.split("|"),r=t.length;r--;)M.attrHandle[n[r]]=e}function a(t,e){var n=e&&t,r=n&&1===t.nodeType&&1===e.nodeType&&(~e.sourceIndex||X)-(~t.sourceIndex||X);

if(r)return r;if(n)for(;n=n.nextSibling;)if(n===e)return-1;return t?1:-1}function u(t){
return function(e){var n=e.nodeName.toLowerCase();return"input"===n&&e.type===t}}
function s(t){return function(e){var n=e.nodeName.toLowerCase();return("input"===n||"button"===n)&&e.type===t;

}}function c(t){return r(function(e){return e=+e,r(function(n,r){for(var i,o=t([],n.length,e),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]));

})})}function l(t){return t&&"undefined"!=typeof t.getElementsByTagName&&t}function f(){}
function h(t){for(var e=0,n=t.length,r="";n>e;e++)r+=t[e].value;return r}function p(t,e,n){
var r=e.dir,i=n&&"parentNode"===r,o=U++;return e.first?function(e,n,o){for(;e=e[r];)if(1===e.nodeType||i)return t(e,n,o);

}:function(e,n,a){var u,s,c=[I,o];if(a){for(;e=e[r];)if((1===e.nodeType||i)&&t(e,n,a))return!0;

}else for(;e=e[r];)if(1===e.nodeType||i){if(s=e[H]||(e[H]={}),(u=s[r])&&u[0]===I&&u[1]===o)return c[2]=u[2];

if(s[r]=c,c[2]=t(e,n,a))return!0}}}function d(t){return t.length>1?function(e,n,r){
for(var i=t.length;i--;)if(!t[i](e,n,r))return!1;return!0}:t[0]}function g(t,n,r){
for(var i=0,o=n.length;o>i;i++)e(t,n[i],r);return r}function v(t,e,n,r,i){for(var o,a=[],u=0,s=t.length,c=null!=e;s>u;u++)(o=t[u])&&(!n||n(o,r,i))&&(a.push(o),
c&&e.push(u));return a}function m(t,e,n,i,o,a){return i&&!i[H]&&(i=m(i)),o&&!o[H]&&(o=m(o,a)),
r(function(r,a,u,s){var c,l,f,h=[],p=[],d=a.length,m=r||g(e||"*",u.nodeType?[u]:u,[]),y=!t||!r&&e?m:v(m,h,t,u,s),x=n?o||(r?t:d||i)?[]:a:y;

if(n&&n(y,x,u,s),i)for(c=v(x,p),i(c,[],u,s),l=c.length;l--;)(f=c[l])&&(x[p[l]]=!(y[p[l]]=f));

if(r){if(o||t){if(o){for(c=[],l=x.length;l--;)(f=x[l])&&c.push(y[l]=f);o(null,x=[],c,s);

}for(l=x.length;l--;)(f=x[l])&&(c=o?tt(r,f):h[l])>-1&&(r[c]=!(a[c]=f))}}else x=v(x===a?x.splice(d,x.length):x),
o?o(null,a,x,s):K.apply(a,x)})}function y(t){for(var e,n,r,i=t.length,o=M.relative[t[0].type],a=o||M.relative[" "],u=o?1:0,s=p(function(t){
return t===e},a,!0),c=p(function(t){return tt(e,t)>-1},a,!0),l=[function(t,n,r){var i=!o&&(r||n!==T)||((e=n).nodeType?s(t,n,r):c(t,n,r));

return e=null,i}];i>u;u++)if(n=M.relative[t[u].type])l=[p(d(l),n)];else{if(n=M.filter[t[u].type].apply(null,t[u].matches),
n[H]){for(r=++u;i>r&&!M.relative[t[r].type];r++);return m(u>1&&d(l),u>1&&h(t.slice(0,u-1).concat({
value:" "===t[u-2].type?"*":""})).replace(st,"$1"),n,r>u&&y(t.slice(u,r)),i>r&&y(t=t.slice(r)),i>r&&h(t));

}l.push(n)}return d(l)}function x(t,n){var i=n.length>0,o=t.length>0,a=function(r,a,u,s,c){
var l,f,h,p=0,d="0",g=r&&[],m=[],y=T,x=r||o&&M.find.TAG("*",c),b=I+=null==y?1:Math.random()||.1,w=x.length;

for(c&&(T=a!==q&&a);d!==w&&null!=(l=x[d]);d++){if(o&&l){for(f=0;h=t[f++];)if(h(l,a,u)){
s.push(l);break}c&&(I=b)}i&&((l=!h&&l)&&p--,r&&g.push(l))}if(p+=d,i&&d!==p){for(f=0;h=n[f++];)h(g,m,a,u);

if(r){if(p>0)for(;d--;)g[d]||m[d]||(m[d]=J.call(s));m=v(m)}K.apply(s,m),c&&!r&&m.length>0&&p+n.length>1&&e.uniqueSort(s);

}return c&&(I=b,T=y),g};return i?r(a):a}var b,w,M,k,_,S,C,E,T,A,N,j,q,D,L,O,R,z,P,H="sizzle"+1*new Date,F=t.document,I=0,U=0,$=n(),B=n(),W=n(),Y=function(t,e){
return t===e&&(N=!0),0},X=1<<31,V={}.hasOwnProperty,Z=[],J=Z.pop,G=Z.push,K=Z.push,Q=Z.slice,tt=function(t,e){
for(var n=0,r=t.length;r>n;n++)if(t[n]===e)return n;return-1},et="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",nt="[\\x20\\t\\r\\n\\f]",rt="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",it=rt.replace("w","w#"),ot="\\["+nt+"*("+rt+")(?:"+nt+"*([*^$|!~]?=)"+nt+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+it+"))|)"+nt+"*\\]",at=":("+rt+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ot+")*)|.*)\\)|)",ut=new RegExp(nt+"+","g"),st=new RegExp("^"+nt+"+|((?:^|[^\\\\])(?:\\\\.)*)"+nt+"+$","g"),ct=new RegExp("^"+nt+"*,"+nt+"*"),lt=new RegExp("^"+nt+"*([>+~]|"+nt+")"+nt+"*"),ft=new RegExp("="+nt+"*([^\\]'\"]*?)"+nt+"*\\]","g"),ht=new RegExp(at),pt=new RegExp("^"+it+"$"),dt={
ID:new RegExp("^#("+rt+")"),CLASS:new RegExp("^\\.("+rt+")"),TAG:new RegExp("^("+rt.replace("w","w*")+")"),
ATTR:new RegExp("^"+ot),PSEUDO:new RegExp("^"+at),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+nt+"*(even|odd|(([+-]|)(\\d*)n|)"+nt+"*(?:([+-]|)"+nt+"*(\\d+)|))"+nt+"*\\)|)","i"),
bool:new RegExp("^(?:"+et+")$","i"),needsContext:new RegExp("^"+nt+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+nt+"*((?:-\\d)?\\d*)"+nt+"*\\)|)(?=[^-]|$)","i")
},gt=/^(?:input|select|textarea|button)$/i,vt=/^h\d$/i,mt=/^[^{]+\{\s*\[native \w/,yt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,xt=/[+~]/,bt=/'|\\/g,wt=new RegExp("\\\\([\\da-f]{1,6}"+nt+"?|("+nt+")|.)","ig"),Mt=function(t,e,n){
var r="0x"+e-65536;return r!==r||n?e:0>r?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320);

},kt=function(){j()};try{K.apply(Z=Q.call(F.childNodes),F.childNodes),Z[F.childNodes.length].nodeType;

}catch(_t){K={apply:Z.length?function(t,e){G.apply(t,Q.call(e))}:function(t,e){for(var n=t.length,r=0;t[n++]=e[r++];);
t.length=n-1}}}w=e.support={},_=e.isXML=function(t){var e=t&&(t.ownerDocument||t).documentElement;

return e?"HTML"!==e.nodeName:!1},j=e.setDocument=function(t){var e,n,r=t?t.ownerDocument||t:F;

return r!==q&&9===r.nodeType&&r.documentElement?(q=r,D=r.documentElement,n=r.defaultView,
n&&n!==n.top&&(n.addEventListener?n.addEventListener("unload",kt,!1):n.attachEvent&&n.attachEvent("onunload",kt)),
L=!_(r),w.attributes=i(function(t){return t.className="i",!t.getAttribute("className");

}),w.getElementsByTagName=i(function(t){return t.appendChild(r.createComment("")),
!t.getElementsByTagName("*").length}),w.getElementsByClassName=mt.test(r.getElementsByClassName),
w.getById=i(function(t){return D.appendChild(t).id=H,!r.getElementsByName||!r.getElementsByName(H).length;

}),w.getById?(M.find.ID=function(t,e){if("undefined"!=typeof e.getElementById&&L){
var n=e.getElementById(t);return n&&n.parentNode?[n]:[]}},M.filter.ID=function(t){
var e=t.replace(wt,Mt);return function(t){return t.getAttribute("id")===e}}):(delete M.find.ID,
M.filter.ID=function(t){var e=t.replace(wt,Mt);return function(t){var n="undefined"!=typeof t.getAttributeNode&&t.getAttributeNode("id");

return n&&n.value===e}}),M.find.TAG=w.getElementsByTagName?function(t,e){return"undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t):w.qsa?e.querySelectorAll(t):void 0;

}:function(t,e){var n,r=[],i=0,o=e.getElementsByTagName(t);if("*"===t){for(;n=o[i++];)1===n.nodeType&&r.push(n);

return r}return o},M.find.CLASS=w.getElementsByClassName&&function(t,e){return L?e.getElementsByClassName(t):void 0;

},R=[],O=[],(w.qsa=mt.test(r.querySelectorAll))&&(i(function(t){D.appendChild(t).innerHTML="<a id='"+H+"'></a><select id='"+H+"-\f]' msallowcapture=''><option selected=''></option></select>",
t.querySelectorAll("[msallowcapture^='']").length&&O.push("[*^$]="+nt+"*(?:''|\"\")"),
t.querySelectorAll("[selected]").length||O.push("\\["+nt+"*(?:value|"+et+")"),t.querySelectorAll("[id~="+H+"-]").length||O.push("~="),
t.querySelectorAll(":checked").length||O.push(":checked"),t.querySelectorAll("a#"+H+"+*").length||O.push(".#.+[+~]");

}),i(function(t){var e=r.createElement("input");e.setAttribute("type","hidden"),t.appendChild(e).setAttribute("name","D"),
t.querySelectorAll("[name=d]").length&&O.push("name"+nt+"*[*^$|!~]?="),t.querySelectorAll(":enabled").length||O.push(":enabled",":disabled"),
t.querySelectorAll("*,:x"),O.push(",.*:")})),(w.matchesSelector=mt.test(z=D.matches||D.webkitMatchesSelector||D.mozMatchesSelector||D.oMatchesSelector||D.msMatchesSelector))&&i(function(t){
w.disconnectedMatch=z.call(t,"div"),z.call(t,"[s!='']:x"),R.push("!=",at)}),O=O.length&&new RegExp(O.join("|")),
R=R.length&&new RegExp(R.join("|")),e=mt.test(D.compareDocumentPosition),P=e||mt.test(D.contains)?function(t,e){
var n=9===t.nodeType?t.documentElement:t,r=e&&e.parentNode;return t===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):t.compareDocumentPosition&&16&t.compareDocumentPosition(r)));

}:function(t,e){if(e)for(;e=e.parentNode;)if(e===t)return!0;return!1},Y=e?function(t,e){
if(t===e)return N=!0,0;var n=!t.compareDocumentPosition-!e.compareDocumentPosition;

return n?n:(n=(t.ownerDocument||t)===(e.ownerDocument||e)?t.compareDocumentPosition(e):1,
1&n||!w.sortDetached&&e.compareDocumentPosition(t)===n?t===r||t.ownerDocument===F&&P(F,t)?-1:e===r||e.ownerDocument===F&&P(F,e)?1:A?tt(A,t)-tt(A,e):0:4&n?-1:1);

}:function(t,e){if(t===e)return N=!0,0;var n,i=0,o=t.parentNode,u=e.parentNode,s=[t],c=[e];

if(!o||!u)return t===r?-1:e===r?1:o?-1:u?1:A?tt(A,t)-tt(A,e):0;if(o===u)return a(t,e);

for(n=t;n=n.parentNode;)s.unshift(n);for(n=e;n=n.parentNode;)c.unshift(n);for(;s[i]===c[i];)i++;

return i?a(s[i],c[i]):s[i]===F?-1:c[i]===F?1:0},r):q},e.matches=function(t,n){return e(t,null,null,n);

},e.matchesSelector=function(t,n){if((t.ownerDocument||t)!==q&&j(t),n=n.replace(ft,"='$1']"),
!(!w.matchesSelector||!L||R&&R.test(n)||O&&O.test(n)))try{var r=z.call(t,n);if(r||w.disconnectedMatch||t.document&&11!==t.document.nodeType)return r;

}catch(i){}return e(n,q,null,[t]).length>0},e.contains=function(t,e){return(t.ownerDocument||t)!==q&&j(t),
P(t,e)},e.attr=function(t,e){(t.ownerDocument||t)!==q&&j(t);var n=M.attrHandle[e.toLowerCase()],r=n&&V.call(M.attrHandle,e.toLowerCase())?n(t,e,!L):void 0;

return void 0!==r?r:w.attributes||!L?t.getAttribute(e):(r=t.getAttributeNode(e))&&r.specified?r.value:null;

},e.error=function(t){throw new Error("Syntax error, unrecognized expression: "+t);

},e.uniqueSort=function(t){var e,n=[],r=0,i=0;if(N=!w.detectDuplicates,A=!w.sortStable&&t.slice(0),
t.sort(Y),N){for(;e=t[i++];)e===t[i]&&(r=n.push(i));for(;r--;)t.splice(n[r],1)}return A=null,
t},k=e.getText=function(t){var e,n="",r=0,i=t.nodeType;if(i){if(1===i||9===i||11===i){
if("string"==typeof t.textContent)return t.textContent;for(t=t.firstChild;t;t=t.nextSibling)n+=k(t);

}else if(3===i||4===i)return t.nodeValue}else for(;e=t[r++];)n+=k(e);return n},M=e.selectors={
cacheLength:50,createPseudo:r,match:dt,attrHandle:{},find:{},relative:{">":{dir:"parentNode",
first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"
}},preFilter:{ATTR:function(t){return t[1]=t[1].replace(wt,Mt),t[3]=(t[3]||t[4]||t[5]||"").replace(wt,Mt),
"~="===t[2]&&(t[3]=" "+t[3]+" "),t.slice(0,4)},CHILD:function(t){return t[1]=t[1].toLowerCase(),
"nth"===t[1].slice(0,3)?(t[3]||e.error(t[0]),t[4]=+(t[4]?t[5]+(t[6]||1):2*("even"===t[3]||"odd"===t[3])),
t[5]=+(t[7]+t[8]||"odd"===t[3])):t[3]&&e.error(t[0]),t},PSEUDO:function(t){var e,n=!t[6]&&t[2];

return dt.CHILD.test(t[0])?null:(t[3]?t[2]=t[4]||t[5]||"":n&&ht.test(n)&&(e=S(n,!0))&&(e=n.indexOf(")",n.length-e)-n.length)&&(t[0]=t[0].slice(0,e),
t[2]=n.slice(0,e)),t.slice(0,3))}},filter:{TAG:function(t){var e=t.replace(wt,Mt).toLowerCase();

return"*"===t?function(){return!0}:function(t){return t.nodeName&&t.nodeName.toLowerCase()===e;

}},CLASS:function(t){var e=$[t+" "];return e||(e=new RegExp("(^|"+nt+")"+t+"("+nt+"|$)"))&&$(t,function(t){
return e.test("string"==typeof t.className&&t.className||"undefined"!=typeof t.getAttribute&&t.getAttribute("class")||"");

})},ATTR:function(t,n,r){return function(i){var o=e.attr(i,t);return null==o?"!="===n:n?(o+="",
"="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o.replace(ut," ")+" ").indexOf(r)>-1:"|="===n?o===r||o.slice(0,r.length+1)===r+"-":!1):!0;

}},CHILD:function(t,e,n,r,i){var o="nth"!==t.slice(0,3),a="last"!==t.slice(-4),u="of-type"===e;

return 1===r&&0===i?function(t){return!!t.parentNode}:function(e,n,s){var c,l,f,h,p,d,g=o!==a?"nextSibling":"previousSibling",v=e.parentNode,m=u&&e.nodeName.toLowerCase(),y=!s&&!u;

if(v){if(o){for(;g;){for(f=e;f=f[g];)if(u?f.nodeName.toLowerCase()===m:1===f.nodeType)return!1;

d=g="only"===t&&!d&&"nextSibling"}return!0}if(d=[a?v.firstChild:v.lastChild],a&&y){
for(l=v[H]||(v[H]={}),c=l[t]||[],p=c[0]===I&&c[1],h=c[0]===I&&c[2],f=p&&v.childNodes[p];f=++p&&f&&f[g]||(h=p=0)||d.pop();)if(1===f.nodeType&&++h&&f===e){
l[t]=[I,p,h];break}}else if(y&&(c=(e[H]||(e[H]={}))[t])&&c[0]===I)h=c[1];else for(;(f=++p&&f&&f[g]||(h=p=0)||d.pop())&&((u?f.nodeName.toLowerCase()!==m:1!==f.nodeType)||!++h||(y&&((f[H]||(f[H]={}))[t]=[I,h]),
f!==e)););return h-=i,h===r||h%r===0&&h/r>=0}}},PSEUDO:function(t,n){var i,o=M.pseudos[t]||M.setFilters[t.toLowerCase()]||e.error("unsupported pseudo: "+t);

return o[H]?o(n):o.length>1?(i=[t,t,"",n],M.setFilters.hasOwnProperty(t.toLowerCase())?r(function(t,e){
for(var r,i=o(t,n),a=i.length;a--;)r=tt(t,i[a]),t[r]=!(e[r]=i[a])}):function(t){return o(t,0,i);

}):o}},pseudos:{not:r(function(t){var e=[],n=[],i=C(t.replace(st,"$1"));return i[H]?r(function(t,e,n,r){
for(var o,a=i(t,null,r,[]),u=t.length;u--;)(o=a[u])&&(t[u]=!(e[u]=o))}):function(t,r,o){
return e[0]=t,i(e,null,o,n),e[0]=null,!n.pop()}}),has:r(function(t){return function(n){
return e(t,n).length>0}}),contains:r(function(t){return t=t.replace(wt,Mt),function(e){
return(e.textContent||e.innerText||k(e)).indexOf(t)>-1}}),lang:r(function(t){return pt.test(t||"")||e.error("unsupported lang: "+t),
t=t.replace(wt,Mt).toLowerCase(),function(e){var n;do if(n=L?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return n=n.toLowerCase(),
n===t||0===n.indexOf(t+"-");while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){
var n=t.location&&t.location.hash;return n&&n.slice(1)===e.id},root:function(t){return t===D;

},focus:function(t){return t===q.activeElement&&(!q.hasFocus||q.hasFocus())&&!!(t.type||t.href||~t.tabIndex);

},enabled:function(t){return t.disabled===!1},disabled:function(t){return t.disabled===!0;

},checked:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&!!t.checked||"option"===e&&!!t.selected;

},selected:function(t){return t.parentNode&&t.parentNode.selectedIndex,t.selected===!0;

},empty:function(t){for(t=t.firstChild;t;t=t.nextSibling)if(t.nodeType<6)return!1;

return!0},parent:function(t){return!M.pseudos.empty(t)},header:function(t){return vt.test(t.nodeName);

},input:function(t){return gt.test(t.nodeName)},button:function(t){var e=t.nodeName.toLowerCase();

return"input"===e&&"button"===t.type||"button"===e},text:function(t){var e;return"input"===t.nodeName.toLowerCase()&&"text"===t.type&&(null==(e=t.getAttribute("type"))||"text"===e.toLowerCase());

},first:c(function(){return[0]}),last:c(function(t,e){return[e-1]}),eq:c(function(t,e,n){
return[0>n?n+e:n]}),even:c(function(t,e){for(var n=0;e>n;n+=2)t.push(n);return t}),
odd:c(function(t,e){for(var n=1;e>n;n+=2)t.push(n);return t}),lt:c(function(t,e,n){
for(var r=0>n?n+e:n;--r>=0;)t.push(r);return t}),gt:c(function(t,e,n){for(var r=0>n?n+e:n;++r<e;)t.push(r);

return t})}},M.pseudos.nth=M.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,
image:!0})M.pseudos[b]=u(b);for(b in{submit:!0,reset:!0})M.pseudos[b]=s(b);return f.prototype=M.filters=M.pseudos,
M.setFilters=new f,S=e.tokenize=function(t,n){var r,i,o,a,u,s,c,l=B[t+" "];if(l)return n?0:l.slice(0);

for(u=t,s=[],c=M.preFilter;u;){(!r||(i=ct.exec(u)))&&(i&&(u=u.slice(i[0].length)||u),
s.push(o=[])),r=!1,(i=lt.exec(u))&&(r=i.shift(),o.push({value:r,type:i[0].replace(st," ")
}),u=u.slice(r.length));for(a in M.filter)!(i=dt[a].exec(u))||c[a]&&!(i=c[a](i))||(r=i.shift(),
o.push({value:r,type:a,matches:i}),u=u.slice(r.length));if(!r)break}return n?u.length:u?e.error(t):B(t,s).slice(0);

},C=e.compile=function(t,e){var n,r=[],i=[],o=W[t+" "];if(!o){for(e||(e=S(t)),n=e.length;n--;)o=y(e[n]),
o[H]?r.push(o):i.push(o);o=W(t,x(i,r)),o.selector=t}return o},E=e.select=function(t,e,n,r){
var i,o,a,u,s,c="function"==typeof t&&t,f=!r&&S(t=c.selector||t);if(n=n||[],1===f.length){
if(o=f[0]=f[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&w.getById&&9===e.nodeType&&L&&M.relative[o[1].type]){
if(e=(M.find.ID(a.matches[0].replace(wt,Mt),e)||[])[0],!e)return n;c&&(e=e.parentNode),
t=t.slice(o.shift().value.length)}for(i=dt.needsContext.test(t)?0:o.length;i--&&(a=o[i],
!M.relative[u=a.type]);)if((s=M.find[u])&&(r=s(a.matches[0].replace(wt,Mt),xt.test(o[0].type)&&l(e.parentNode)||e))){
if(o.splice(i,1),t=r.length&&h(o),!t)return K.apply(n,r),n;break}}return(c||C(t,f))(r,e,!L,n,xt.test(t)&&l(e.parentNode)||e),
n},w.sortStable=H.split("").sort(Y).join("")===H,w.detectDuplicates=!!N,j(),w.sortDetached=i(function(t){
return 1&t.compareDocumentPosition(q.createElement("div"))}),i(function(t){return t.innerHTML="<a href='#'></a>",
"#"===t.firstChild.getAttribute("href")})||o("type|href|height|width",function(t,e,n){
return n?void 0:t.getAttribute(e,"type"===e.toLowerCase()?1:2)}),w.attributes&&i(function(t){
return t.innerHTML="<input/>",t.firstChild.setAttribute("value",""),""===t.firstChild.getAttribute("value");

})||o("value",function(t,e,n){return n||"input"!==t.nodeName.toLowerCase()?void 0:t.defaultValue;

}),i(function(t){return null==t.getAttribute("disabled")})||o(et,function(t,e,n){
var r;return n?void 0:t[e]===!0?e.toLowerCase():(r=t.getAttributeNode(e))&&r.specified?r.value:null;

}),e}(t);Q.find=it,Q.expr=it.selectors,Q.expr[":"]=Q.expr.pseudos,Q.unique=it.uniqueSort,
Q.text=it.getText,Q.isXMLDoc=it.isXML,Q.contains=it.contains;var ot=Q.expr.match.needsContext,at=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,ut=/^.[^:#\[\.,]*$/;

Q.filter=function(t,e,n){var r=e[0];return n&&(t=":not("+t+")"),1===e.length&&1===r.nodeType?Q.find.matchesSelector(r,t)?[r]:[]:Q.find.matches(t,Q.grep(e,function(t){
return 1===t.nodeType}))},Q.fn.extend({find:function(t){var e,n=this.length,r=[],i=this;

if("string"!=typeof t)return this.pushStack(Q(t).filter(function(){for(e=0;n>e;e++)if(Q.contains(i[e],this))return!0;

}));for(e=0;n>e;e++)Q.find(t,i[e],r);return r=this.pushStack(n>1?Q.unique(r):r),r.selector=this.selector?this.selector+" "+t:t,
r},filter:function(t){return this.pushStack(r(this,t||[],!1))},not:function(t){return this.pushStack(r(this,t||[],!0));

},is:function(t){return!!r(this,"string"==typeof t&&ot.test(t)?Q(t):t||[],!1).length;

}});var st,ct=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,lt=Q.fn.init=function(t,e){var n,r;

if(!t)return this;if("string"==typeof t){if(n="<"===t[0]&&">"===t[t.length-1]&&t.length>=3?[null,t,null]:ct.exec(t),
!n||!n[1]&&e)return!e||e.jquery?(e||st).find(t):this.constructor(e).find(t);if(n[1]){
if(e=e instanceof Q?e[0]:e,Q.merge(this,Q.parseHTML(n[1],e&&e.nodeType?e.ownerDocument||e:G,!0)),
at.test(n[1])&&Q.isPlainObject(e))for(n in e)Q.isFunction(this[n])?this[n](e[n]):this.attr(n,e[n]);

return this}return r=G.getElementById(n[2]),r&&r.parentNode&&(this.length=1,this[0]=r),
this.context=G,this.selector=t,this}return t.nodeType?(this.context=this[0]=t,this.length=1,
this):Q.isFunction(t)?"undefined"!=typeof st.ready?st.ready(t):t(Q):(void 0!==t.selector&&(this.selector=t.selector,
this.context=t.context),Q.makeArray(t,this))};lt.prototype=Q.fn,st=Q(G);var ft=/^(?:parents|prev(?:Until|All))/,ht={
children:!0,contents:!0,next:!0,prev:!0};Q.extend({dir:function(t,e,n){for(var r=[],i=void 0!==n;(t=t[e])&&9!==t.nodeType;)if(1===t.nodeType){
if(i&&Q(t).is(n))break;r.push(t)}return r},sibling:function(t,e){for(var n=[];t;t=t.nextSibling)1===t.nodeType&&t!==e&&n.push(t);

return n}}),Q.fn.extend({has:function(t){var e=Q(t,this),n=e.length;return this.filter(function(){
for(var t=0;n>t;t++)if(Q.contains(this,e[t]))return!0})},closest:function(t,e){for(var n,r=0,i=this.length,o=[],a=ot.test(t)||"string"!=typeof t?Q(t,e||this.context):0;i>r;r++)for(n=this[r];n&&n!==e;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&Q.find.matchesSelector(n,t))){
o.push(n);break}return this.pushStack(o.length>1?Q.unique(o):o)},index:function(t){
return t?"string"==typeof t?Y.call(Q(t),this[0]):Y.call(this,t.jquery?t[0]:t):this[0]&&this[0].parentNode?this.first().prevAll().length:-1;

},add:function(t,e){return this.pushStack(Q.unique(Q.merge(this.get(),Q(t,e))))},
addBack:function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t));

}}),Q.each({parent:function(t){var e=t.parentNode;return e&&11!==e.nodeType?e:null;

},parents:function(t){return Q.dir(t,"parentNode")},parentsUntil:function(t,e,n){
return Q.dir(t,"parentNode",n)},next:function(t){return i(t,"nextSibling")},prev:function(t){
return i(t,"previousSibling")},nextAll:function(t){return Q.dir(t,"nextSibling")},
prevAll:function(t){return Q.dir(t,"previousSibling")},nextUntil:function(t,e,n){
return Q.dir(t,"nextSibling",n)},prevUntil:function(t,e,n){return Q.dir(t,"previousSibling",n);

},siblings:function(t){return Q.sibling((t.parentNode||{}).firstChild,t)},children:function(t){
return Q.sibling(t.firstChild)},contents:function(t){return t.contentDocument||Q.merge([],t.childNodes);

}},function(t,e){Q.fn[t]=function(n,r){var i=Q.map(this,e,n);return"Until"!==t.slice(-5)&&(r=n),
r&&"string"==typeof r&&(i=Q.filter(r,i)),this.length>1&&(ht[t]||Q.unique(i),ft.test(t)&&i.reverse()),
this.pushStack(i)}});var pt=/\S+/g,dt={};Q.Callbacks=function(t){t="string"==typeof t?dt[t]||o(t):Q.extend({},t);

var e,n,r,i,a,u,s=[],c=!t.once&&[],l=function(o){for(e=t.memory&&o,n=!0,u=i||0,i=0,
a=s.length,r=!0;s&&a>u;u++)if(s[u].apply(o[0],o[1])===!1&&t.stopOnFalse){e=!1;break;

}r=!1,s&&(c?c.length&&l(c.shift()):e?s=[]:f.disable())},f={add:function(){if(s){var n=s.length;

!function o(e){Q.each(e,function(e,n){var r=Q.type(n);"function"===r?t.unique&&f.has(n)||s.push(n):n&&n.length&&"string"!==r&&o(n);

})}(arguments),r?a=s.length:e&&(i=n,l(e))}return this},remove:function(){return s&&Q.each(arguments,function(t,e){
for(var n;(n=Q.inArray(e,s,n))>-1;)s.splice(n,1),r&&(a>=n&&a--,u>=n&&u--)}),this},
has:function(t){return t?Q.inArray(t,s)>-1:!(!s||!s.length)},empty:function(){return s=[],
a=0,this},disable:function(){return s=c=e=void 0,this},disabled:function(){return!s;

},lock:function(){return c=void 0,e||f.disable(),this},locked:function(){return!c;

},fireWith:function(t,e){return!s||n&&!c||(e=e||[],e=[t,e.slice?e.slice():e],r?c.push(e):l(e)),
this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!n;

}};return f},Q.extend({Deferred:function(t){var e=[["resolve","done",Q.Callbacks("once memory"),"resolved"],["reject","fail",Q.Callbacks("once memory"),"rejected"],["notify","progress",Q.Callbacks("memory")]],n="pending",r={
state:function(){return n},always:function(){return i.done(arguments).fail(arguments),
this},then:function(){var t=arguments;return Q.Deferred(function(n){Q.each(e,function(e,o){
var a=Q.isFunction(t[e])&&t[e];i[o[1]](function(){var t=a&&a.apply(this,arguments);

t&&Q.isFunction(t.promise)?t.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[o[0]+"With"](this===r?n.promise():this,a?[t]:arguments);

})}),t=null}).promise()},promise:function(t){return null!=t?Q.extend(t,r):r}},i={};

return r.pipe=r.then,Q.each(e,function(t,o){var a=o[2],u=o[3];r[o[1]]=a.add,u&&a.add(function(){
n=u},e[1^t][2].disable,e[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),
this},i[o[0]+"With"]=a.fireWith}),r.promise(i),t&&t.call(i,i),i},when:function(t){
var e,n,r,i=0,o=$.call(arguments),a=o.length,u=1!==a||t&&Q.isFunction(t.promise)?a:0,s=1===u?t:Q.Deferred(),c=function(t,n,r){
return function(i){n[t]=this,r[t]=arguments.length>1?$.call(arguments):i,r===e?s.notifyWith(n,r):--u||s.resolveWith(n,r);

}};if(a>1)for(e=new Array(a),n=new Array(a),r=new Array(a);a>i;i++)o[i]&&Q.isFunction(o[i].promise)?o[i].promise().done(c(i,r,o)).fail(s.reject).progress(c(i,n,e)):--u;

return u||s.resolveWith(r,o),s.promise()}});var gt;Q.fn.ready=function(t){return Q.ready.promise().done(t),
this},Q.extend({isReady:!1,readyWait:1,holdReady:function(t){t?Q.readyWait++:Q.ready(!0);

},ready:function(t){(t===!0?--Q.readyWait:Q.isReady)||(Q.isReady=!0,t!==!0&&--Q.readyWait>0||(gt.resolveWith(G,[Q]),
Q.fn.triggerHandler&&(Q(G).triggerHandler("ready"),Q(G).off("ready"))))}}),Q.ready.promise=function(e){
return gt||(gt=Q.Deferred(),"complete"===G.readyState?setTimeout(Q.ready):(G.addEventListener("DOMContentLoaded",a,!1),
t.addEventListener("load",a,!1))),gt.promise(e)},Q.ready.promise();var vt=Q.access=function(t,e,n,r,i,o,a){
var u=0,s=t.length,c=null==n;if("object"===Q.type(n)){i=!0;for(u in n)Q.access(t,e,u,n[u],!0,o,a);

}else if(void 0!==r&&(i=!0,Q.isFunction(r)||(a=!0),c&&(a?(e.call(t,r),e=null):(c=e,
e=function(t,e,n){return c.call(Q(t),n)})),e))for(;s>u;u++)e(t[u],n,a?r:r.call(t[u],u,e(t[u],n)));

return i?t:c?e.call(t):s?e(t[0],n):o};Q.acceptData=function(t){return 1===t.nodeType||9===t.nodeType||!+t.nodeType;

},u.uid=1,u.accepts=Q.acceptData,u.prototype={key:function(t){if(!u.accepts(t))return 0;

var e={},n=t[this.expando];if(!n){n=u.uid++;try{e[this.expando]={value:n},Object.defineProperties(t,e);

}catch(r){e[this.expando]=n,Q.extend(t,e)}}return this.cache[n]||(this.cache[n]={}),
n},set:function(t,e,n){var r,i=this.key(t),o=this.cache[i];if("string"==typeof e)o[e]=n;
else if(Q.isEmptyObject(o))Q.extend(this.cache[i],e);else for(r in e)o[r]=e[r];return o;

},get:function(t,e){var n=this.cache[this.key(t)];return void 0===e?n:n[e]},access:function(t,e,n){
var r;return void 0===e||e&&"string"==typeof e&&void 0===n?(r=this.get(t,e),void 0!==r?r:this.get(t,Q.camelCase(e))):(this.set(t,e,n),
void 0!==n?n:e)},remove:function(t,e){var n,r,i,o=this.key(t),a=this.cache[o];if(void 0===e)this.cache[o]={};
else{Q.isArray(e)?r=e.concat(e.map(Q.camelCase)):(i=Q.camelCase(e),e in a?r=[e,i]:(r=i,
r=r in a?[r]:r.match(pt)||[])),n=r.length;for(;n--;)delete a[r[n]]}},hasData:function(t){
return!Q.isEmptyObject(this.cache[t[this.expando]]||{})},discard:function(t){t[this.expando]&&delete this.cache[t[this.expando]];

}};var mt=new u,yt=new u,xt=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,bt=/([A-Z])/g;Q.extend({
hasData:function(t){return yt.hasData(t)||mt.hasData(t)},data:function(t,e,n){return yt.access(t,e,n);

},removeData:function(t,e){yt.remove(t,e)},_data:function(t,e,n){return mt.access(t,e,n);

},_removeData:function(t,e){mt.remove(t,e)}}),Q.fn.extend({data:function(t,e){var n,r,i,o=this[0],a=o&&o.attributes;

if(void 0===t){if(this.length&&(i=yt.get(o),1===o.nodeType&&!mt.get(o,"hasDataAttrs"))){
for(n=a.length;n--;)a[n]&&(r=a[n].name,0===r.indexOf("data-")&&(r=Q.camelCase(r.slice(5)),
s(o,r,i[r])));mt.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof t?this.each(function(){
yt.set(this,t)}):vt(this,function(e){var n,r=Q.camelCase(t);if(o&&void 0===e){if(n=yt.get(o,t),
void 0!==n)return n;if(n=yt.get(o,r),void 0!==n)return n;if(n=s(o,r,void 0),void 0!==n)return n;

}else this.each(function(){var n=yt.get(this,r);yt.set(this,r,e),-1!==t.indexOf("-")&&void 0!==n&&yt.set(this,t,e);

})},null,e,arguments.length>1,null,!0)},removeData:function(t){return this.each(function(){
yt.remove(this,t)})}}),Q.extend({queue:function(t,e,n){var r;return t?(e=(e||"fx")+"queue",
r=mt.get(t,e),n&&(!r||Q.isArray(n)?r=mt.access(t,e,Q.makeArray(n)):r.push(n)),r||[]):void 0;

},dequeue:function(t,e){e=e||"fx";var n=Q.queue(t,e),r=n.length,i=n.shift(),o=Q._queueHooks(t,e),a=function(){
Q.dequeue(t,e)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===e&&n.unshift("inprogress"),
delete o.stop,i.call(t,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(t,e){var n=e+"queueHooks";

return mt.get(t,n)||mt.access(t,n,{empty:Q.Callbacks("once memory").add(function(){
mt.remove(t,[e+"queue",n])})})}}),Q.fn.extend({queue:function(t,e){var n=2;return"string"!=typeof t&&(e=t,
t="fx",n--),arguments.length<n?Q.queue(this[0],t):void 0===e?this:this.each(function(){
var n=Q.queue(this,t,e);Q._queueHooks(this,t),"fx"===t&&"inprogress"!==n[0]&&Q.dequeue(this,t);

})},dequeue:function(t){return this.each(function(){Q.dequeue(this,t)})},clearQueue:function(t){
return this.queue(t||"fx",[])},promise:function(t,e){var n,r=1,i=Q.Deferred(),o=this,a=this.length,u=function(){
--r||i.resolveWith(o,[o])};for("string"!=typeof t&&(e=t,t=void 0),t=t||"fx";a--;)n=mt.get(o[a],t+"queueHooks"),
n&&n.empty&&(r++,n.empty.add(u));return u(),i.promise(e)}});var wt=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Mt=["Top","Right","Bottom","Left"],kt=function(t,e){
return t=e||t,"none"===Q.css(t,"display")||!Q.contains(t.ownerDocument,t)},_t=/^(?:checkbox|radio)$/i;

!function(){var t=G.createDocumentFragment(),e=t.appendChild(G.createElement("div")),n=G.createElement("input");

n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),
e.appendChild(n),J.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,e.innerHTML="<textarea>x</textarea>",
J.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue}();var St="undefined";J.focusinBubbles="onfocusin"in t;

var Ct=/^key/,Et=/^(?:mouse|pointer|contextmenu)|click/,Tt=/^(?:focusinfocus|focusoutblur)$/,At=/^([^.]*)(?:\.(.+)|)$/;

Q.event={global:{},add:function(t,e,n,r,i){var o,a,u,s,c,l,f,h,p,d,g,v=mt.get(t);
if(v)for(n.handler&&(o=n,n=o.handler,i=o.selector),n.guid||(n.guid=Q.guid++),(s=v.events)||(s=v.events={}),
(a=v.handle)||(a=v.handle=function(e){return typeof Q!==St&&Q.event.triggered!==e.type?Q.event.dispatch.apply(t,arguments):void 0;

}),e=(e||"").match(pt)||[""],c=e.length;c--;)u=At.exec(e[c])||[],p=g=u[1],d=(u[2]||"").split(".").sort(),
p&&(f=Q.event.special[p]||{},p=(i?f.delegateType:f.bindType)||p,f=Q.event.special[p]||{},
l=Q.extend({type:p,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&Q.expr.match.needsContext.test(i),
namespace:d.join(".")},o),(h=s[p])||(h=s[p]=[],h.delegateCount=0,f.setup&&f.setup.call(t,r,d,a)!==!1||t.addEventListener&&t.addEventListener(p,a,!1)),
f.add&&(f.add.call(t,l),l.handler.guid||(l.handler.guid=n.guid)),i?h.splice(h.delegateCount++,0,l):h.push(l),
Q.event.global[p]=!0)},remove:function(t,e,n,r,i){var o,a,u,s,c,l,f,h,p,d,g,v=mt.hasData(t)&&mt.get(t);

if(v&&(s=v.events)){for(e=(e||"").match(pt)||[""],c=e.length;c--;)if(u=At.exec(e[c])||[],
p=g=u[1],d=(u[2]||"").split(".").sort(),p){for(f=Q.event.special[p]||{},p=(r?f.delegateType:f.bindType)||p,
h=s[p]||[],u=u[2]&&new RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=h.length;o--;)l=h[o],
!i&&g!==l.origType||n&&n.guid!==l.guid||u&&!u.test(l.namespace)||r&&r!==l.selector&&("**"!==r||!l.selector)||(h.splice(o,1),
l.selector&&h.delegateCount--,f.remove&&f.remove.call(t,l));a&&!h.length&&(f.teardown&&f.teardown.call(t,d,v.handle)!==!1||Q.removeEvent(t,p,v.handle),
delete s[p])}else for(p in s)Q.event.remove(t,p+e[c],n,r,!0);Q.isEmptyObject(s)&&(delete v.handle,
mt.remove(t,"events"))}},trigger:function(e,n,r,i){var o,a,u,s,c,l,f,h=[r||G],p=Z.call(e,"type")?e.type:e,d=Z.call(e,"namespace")?e.namespace.split("."):[];

if(a=u=r=r||G,3!==r.nodeType&&8!==r.nodeType&&!Tt.test(p+Q.event.triggered)&&(p.indexOf(".")>=0&&(d=p.split("."),
p=d.shift(),d.sort()),c=p.indexOf(":")<0&&"on"+p,e=e[Q.expando]?e:new Q.Event(p,"object"==typeof e&&e),
e.isTrigger=i?2:3,e.namespace=d.join("."),e.namespace_re=e.namespace?new RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,
e.result=void 0,e.target||(e.target=r),n=null==n?[e]:Q.makeArray(n,[e]),f=Q.event.special[p]||{},
i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!Q.isWindow(r)){for(s=f.delegateType||p,
Tt.test(s+p)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||G)&&h.push(u.defaultView||u.parentWindow||t);

}for(o=0;(a=h[o++])&&!e.isPropagationStopped();)e.type=o>1?s:f.bindType||p,l=(mt.get(a,"events")||{})[e.type]&&mt.get(a,"handle"),
l&&l.apply(a,n),l=c&&a[c],l&&l.apply&&Q.acceptData(a)&&(e.result=l.apply(a,n),e.result===!1&&e.preventDefault());

return e.type=p,i||e.isDefaultPrevented()||f._default&&f._default.apply(h.pop(),n)!==!1||!Q.acceptData(r)||c&&Q.isFunction(r[p])&&!Q.isWindow(r)&&(u=r[c],
u&&(r[c]=null),Q.event.triggered=p,r[p](),Q.event.triggered=void 0,u&&(r[c]=u)),e.result;

}},dispatch:function(t){t=Q.event.fix(t);var e,n,r,i,o,a=[],u=$.call(arguments),s=(mt.get(this,"events")||{})[t.type]||[],c=Q.event.special[t.type]||{};

if(u[0]=t,t.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,t)!==!1){
for(a=Q.event.handlers.call(this,t,s),e=0;(i=a[e++])&&!t.isPropagationStopped();)for(t.currentTarget=i.elem,
n=0;(o=i.handlers[n++])&&!t.isImmediatePropagationStopped();)(!t.namespace_re||t.namespace_re.test(o.namespace))&&(t.handleObj=o,
t.data=o.data,r=((Q.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,u),
void 0!==r&&(t.result=r)===!1&&(t.preventDefault(),t.stopPropagation()));return c.postDispatch&&c.postDispatch.call(this,t),
t.result}},handlers:function(t,e){var n,r,i,o,a=[],u=e.delegateCount,s=t.target;if(u&&s.nodeType&&(!t.button||"click"!==t.type))for(;s!==this;s=s.parentNode||this)if(s.disabled!==!0||"click"!==t.type){
for(r=[],n=0;u>n;n++)o=e[n],i=o.selector+" ",void 0===r[i]&&(r[i]=o.needsContext?Q(i,this).index(s)>=0:Q.find(i,this,null,[s]).length),
r[i]&&r.push(o);r.length&&a.push({elem:s,handlers:r})}return u<e.length&&a.push({
elem:this,handlers:e.slice(u)}),a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(t,e){
return null==t.which&&(t.which=null!=e.charCode?e.charCode:e.keyCode),t}},mouseHooks:{
props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
filter:function(t,e){var n,r,i,o=e.button;return null==t.pageX&&null!=e.clientX&&(n=t.target.ownerDocument||G,
r=n.documentElement,i=n.body,t.pageX=e.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),
t.pageY=e.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),
t.which||void 0===o||(t.which=1&o?1:2&o?3:4&o?2:0),t}},fix:function(t){if(t[Q.expando])return t;

var e,n,r,i=t.type,o=t,a=this.fixHooks[i];for(a||(this.fixHooks[i]=a=Et.test(i)?this.mouseHooks:Ct.test(i)?this.keyHooks:{}),
r=a.props?this.props.concat(a.props):this.props,t=new Q.Event(o),e=r.length;e--;)n=r[e],
t[n]=o[n];return t.target||(t.target=G),3===t.target.nodeType&&(t.target=t.target.parentNode),
a.filter?a.filter(t,o):t},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==f()&&this.focus?(this.focus(),
!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===f()&&this.blur?(this.blur(),
!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&Q.nodeName(this,"input")?(this.click(),
!1):void 0},_default:function(t){return Q.nodeName(t.target,"a")}},beforeunload:{
postDispatch:function(t){void 0!==t.result&&t.originalEvent&&(t.originalEvent.returnValue=t.result);

}}},simulate:function(t,e,n,r){var i=Q.extend(new Q.Event,n,{type:t,isSimulated:!0,
originalEvent:{}});r?Q.event.trigger(i,null,e):Q.event.dispatch.call(e,i),i.isDefaultPrevented()&&n.preventDefault();

}},Q.removeEvent=function(t,e,n){t.removeEventListener&&t.removeEventListener(e,n,!1);

},Q.Event=function(t,e){return this instanceof Q.Event?(t&&t.type?(this.originalEvent=t,
this.type=t.type,this.isDefaultPrevented=t.defaultPrevented||void 0===t.defaultPrevented&&t.returnValue===!1?c:l):this.type=t,
e&&Q.extend(this,e),this.timeStamp=t&&t.timeStamp||Q.now(),void(this[Q.expando]=!0)):new Q.Event(t,e);

},Q.Event.prototype={isDefaultPrevented:l,isPropagationStopped:l,isImmediatePropagationStopped:l,
preventDefault:function(){var t=this.originalEvent;this.isDefaultPrevented=c,t&&t.preventDefault&&t.preventDefault();

},stopPropagation:function(){var t=this.originalEvent;this.isPropagationStopped=c,
t&&t.stopPropagation&&t.stopPropagation()},stopImmediatePropagation:function(){var t=this.originalEvent;

this.isImmediatePropagationStopped=c,t&&t.stopImmediatePropagation&&t.stopImmediatePropagation(),
this.stopPropagation()}},Q.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",
pointerleave:"pointerout"},function(t,e){Q.event.special[t]={delegateType:e,bindType:e,
handle:function(t){var n,r=this,i=t.relatedTarget,o=t.handleObj;return(!i||i!==r&&!Q.contains(r,i))&&(t.type=o.origType,
n=o.handler.apply(this,arguments),t.type=e),n}}}),J.focusinBubbles||Q.each({focus:"focusin",
blur:"focusout"},function(t,e){var n=function(t){Q.event.simulate(e,t.target,Q.event.fix(t),!0);

};Q.event.special[e]={setup:function(){var r=this.ownerDocument||this,i=mt.access(r,e);

i||r.addEventListener(t,n,!0),mt.access(r,e,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=mt.access(r,e)-1;

i?mt.access(r,e,i):(r.removeEventListener(t,n,!0),mt.remove(r,e))}}}),Q.fn.extend({
on:function(t,e,n,r,i){var o,a;if("object"==typeof t){"string"!=typeof e&&(n=n||e,
e=void 0);for(a in t)this.on(a,e,n,t[a],i);return this}if(null==n&&null==r?(r=e,n=e=void 0):null==r&&("string"==typeof e?(r=n,
n=void 0):(r=n,n=e,e=void 0)),r===!1)r=l;else if(!r)return this;return 1===i&&(o=r,
r=function(t){return Q().off(t),o.apply(this,arguments)},r.guid=o.guid||(o.guid=Q.guid++)),
this.each(function(){Q.event.add(this,t,r,n,e)})},one:function(t,e,n,r){return this.on(t,e,n,r,1);

},off:function(t,e,n){var r,i;if(t&&t.preventDefault&&t.handleObj)return r=t.handleObj,
Q(t.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),
this;if("object"==typeof t){for(i in t)this.off(i,e,t[i]);return this}return(e===!1||"function"==typeof e)&&(n=e,
e=void 0),n===!1&&(n=l),this.each(function(){Q.event.remove(this,t,n,e)})},trigger:function(t,e){
return this.each(function(){Q.event.trigger(t,e,this)})},triggerHandler:function(t,e){
var n=this[0];return n?Q.event.trigger(t,e,n,!0):void 0}});var Nt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,jt=/<([\w:]+)/,qt=/<|&#?\w+;/,Dt=/<(?:script|style|link)/i,Lt=/checked\s*(?:[^=]|=\s*.checked.)/i,Ot=/^$|\/(?:java|ecma)script/i,Rt=/^true\/(.*)/,zt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Pt={
option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],
col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],
td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};Pt.optgroup=Pt.option,
Pt.tbody=Pt.tfoot=Pt.colgroup=Pt.caption=Pt.thead,Pt.th=Pt.td,Q.extend({clone:function(t,e,n){
var r,i,o,a,u=t.cloneNode(!0),s=Q.contains(t.ownerDocument,t);if(!(J.noCloneChecked||1!==t.nodeType&&11!==t.nodeType||Q.isXMLDoc(t)))for(a=m(u),
o=m(t),r=0,i=o.length;i>r;r++)y(o[r],a[r]);if(e)if(n)for(o=o||m(t),a=a||m(u),r=0,
i=o.length;i>r;r++)v(o[r],a[r]);else v(t,u);return a=m(u,"script"),a.length>0&&g(a,!s&&m(t,"script")),
u},buildFragment:function(t,e,n,r){for(var i,o,a,u,s,c,l=e.createDocumentFragment(),f=[],h=0,p=t.length;p>h;h++)if(i=t[h],
i||0===i)if("object"===Q.type(i))Q.merge(f,i.nodeType?[i]:i);else if(qt.test(i)){
for(o=o||l.appendChild(e.createElement("div")),a=(jt.exec(i)||["",""])[1].toLowerCase(),
u=Pt[a]||Pt._default,o.innerHTML=u[1]+i.replace(Nt,"<$1></$2>")+u[2],c=u[0];c--;)o=o.lastChild;

Q.merge(f,o.childNodes),o=l.firstChild,o.textContent=""}else f.push(e.createTextNode(i));

for(l.textContent="",h=0;i=f[h++];)if((!r||-1===Q.inArray(i,r))&&(s=Q.contains(i.ownerDocument,i),
o=m(l.appendChild(i),"script"),s&&g(o),n))for(c=0;i=o[c++];)Ot.test(i.type||"")&&n.push(i);

return l},cleanData:function(t){for(var e,n,r,i,o=Q.event.special,a=0;void 0!==(n=t[a]);a++){
if(Q.acceptData(n)&&(i=n[mt.expando],i&&(e=mt.cache[i]))){if(e.events)for(r in e.events)o[r]?Q.event.remove(n,r):Q.removeEvent(n,r,e.handle);

mt.cache[i]&&delete mt.cache[i]}delete yt.cache[n[yt.expando]]}}}),Q.fn.extend({text:function(t){
return vt(this,function(t){return void 0===t?Q.text(this):this.empty().each(function(){
(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=t)});

},null,t,arguments.length)},append:function(){return this.domManip(arguments,function(t){
if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=h(this,t);e.appendChild(t);

}})},prepend:function(){return this.domManip(arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){
var e=h(this,t);e.insertBefore(t,e.firstChild)}})},before:function(){return this.domManip(arguments,function(t){
this.parentNode&&this.parentNode.insertBefore(t,this)})},after:function(){return this.domManip(arguments,function(t){
this.parentNode&&this.parentNode.insertBefore(t,this.nextSibling)})},remove:function(t,e){
for(var n,r=t?Q.filter(t,this):this,i=0;null!=(n=r[i]);i++)e||1!==n.nodeType||Q.cleanData(m(n)),
n.parentNode&&(e&&Q.contains(n.ownerDocument,n)&&g(m(n,"script")),n.parentNode.removeChild(n));

return this},empty:function(){for(var t,e=0;null!=(t=this[e]);e++)1===t.nodeType&&(Q.cleanData(m(t,!1)),
t.textContent="");return this},clone:function(t,e){return t=null==t?!1:t,e=null==e?t:e,
this.map(function(){return Q.clone(this,t,e)})},html:function(t){return vt(this,function(t){
var e=this[0]||{},n=0,r=this.length;if(void 0===t&&1===e.nodeType)return e.innerHTML;

if("string"==typeof t&&!Dt.test(t)&&!Pt[(jt.exec(t)||["",""])[1].toLowerCase()]){
t=t.replace(Nt,"<$1></$2>");try{for(;r>n;n++)e=this[n]||{},1===e.nodeType&&(Q.cleanData(m(e,!1)),
e.innerHTML=t);e=0}catch(i){}}e&&this.empty().append(t)},null,t,arguments.length);

},replaceWith:function(){var t=arguments[0];return this.domManip(arguments,function(e){
t=this.parentNode,Q.cleanData(m(this)),t&&t.replaceChild(e,this)}),t&&(t.length||t.nodeType)?this:this.remove();

},detach:function(t){return this.remove(t,!0)},domManip:function(t,e){t=B.apply([],t);

var n,r,i,o,a,u,s=0,c=this.length,l=this,f=c-1,h=t[0],g=Q.isFunction(h);if(g||c>1&&"string"==typeof h&&!J.checkClone&&Lt.test(h))return this.each(function(n){
var r=l.eq(n);g&&(t[0]=h.call(this,n,r.html())),r.domManip(t,e)});if(c&&(n=Q.buildFragment(t,this[0].ownerDocument,!1,this),
r=n.firstChild,1===n.childNodes.length&&(n=r),r)){for(i=Q.map(m(n,"script"),p),o=i.length;c>s;s++)a=n,
s!==f&&(a=Q.clone(a,!0,!0),o&&Q.merge(i,m(a,"script"))),e.call(this[s],a,s);if(o)for(u=i[i.length-1].ownerDocument,
Q.map(i,d),s=0;o>s;s++)a=i[s],Ot.test(a.type||"")&&!mt.access(a,"globalEval")&&Q.contains(u,a)&&(a.src?Q._evalUrl&&Q._evalUrl(a.src):Q.globalEval(a.textContent.replace(zt,"")));

}return this}}),Q.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",
insertAfter:"after",replaceAll:"replaceWith"},function(t,e){Q.fn[t]=function(t){for(var n,r=[],i=Q(t),o=i.length-1,a=0;o>=a;a++)n=a===o?this:this.clone(!0),
Q(i[a])[e](n),W.apply(r,n.get());return this.pushStack(r)}});var Ht,Ft={},It=/^margin/,Ut=new RegExp("^("+wt+")(?!px)[a-z%]+$","i"),$t=function(e){
return e.ownerDocument.defaultView.opener?e.ownerDocument.defaultView.getComputedStyle(e,null):t.getComputedStyle(e,null);

};!function(){function e(){a.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",
a.innerHTML="",i.appendChild(o);var e=t.getComputedStyle(a,null);n="1%"!==e.top,r="4px"===e.width,
i.removeChild(o)}var n,r,i=G.documentElement,o=G.createElement("div"),a=G.createElement("div");

a.style&&(a.style.backgroundClip="content-box",a.cloneNode(!0).style.backgroundClip="",
J.clearCloneStyle="content-box"===a.style.backgroundClip,o.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",
o.appendChild(a),t.getComputedStyle&&Q.extend(J,{pixelPosition:function(){return e(),
n},boxSizingReliable:function(){return null==r&&e(),r},reliableMarginRight:function(){
var e,n=a.appendChild(G.createElement("div"));return n.style.cssText=a.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
n.style.marginRight=n.style.width="0",a.style.width="1px",i.appendChild(o),e=!parseFloat(t.getComputedStyle(n,null).marginRight),
i.removeChild(o),a.removeChild(n),e}}))}(),Q.swap=function(t,e,n,r){var i,o,a={};
for(o in e)a[o]=t.style[o],t.style[o]=e[o];i=n.apply(t,r||[]);for(o in e)t.style[o]=a[o];

return i};var Bt=/^(none|table(?!-c[ea]).+)/,Wt=new RegExp("^("+wt+")(.*)$","i"),Yt=new RegExp("^([+-])=("+wt+")","i"),Xt={
position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:"0",fontWeight:"400"
},Zt=["Webkit","O","Moz","ms"];Q.extend({cssHooks:{opacity:{get:function(t,e){if(e){
var n=w(t,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,
flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,
widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(t,e,n,r){
if(t&&3!==t.nodeType&&8!==t.nodeType&&t.style){var i,o,a,u=Q.camelCase(e),s=t.style;

return e=Q.cssProps[u]||(Q.cssProps[u]=k(s,u)),a=Q.cssHooks[e]||Q.cssHooks[u],void 0===n?a&&"get"in a&&void 0!==(i=a.get(t,!1,r))?i:s[e]:(o=typeof n,
"string"===o&&(i=Yt.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(Q.css(t,e)),o="number"),
null!=n&&n===n&&("number"!==o||Q.cssNumber[u]||(n+="px"),J.clearCloneStyle||""!==n||0!==e.indexOf("background")||(s[e]="inherit"),
a&&"set"in a&&void 0===(n=a.set(t,n,r))||(s[e]=n)),void 0)}},css:function(t,e,n,r){
var i,o,a,u=Q.camelCase(e);return e=Q.cssProps[u]||(Q.cssProps[u]=k(t.style,u)),a=Q.cssHooks[e]||Q.cssHooks[u],
a&&"get"in a&&(i=a.get(t,!0,n)),void 0===i&&(i=w(t,e,r)),"normal"===i&&e in Vt&&(i=Vt[e]),
""===n||n?(o=parseFloat(i),n===!0||Q.isNumeric(o)?o||0:i):i}}),Q.each(["height","width"],function(t,e){
Q.cssHooks[e]={get:function(t,n,r){return n?Bt.test(Q.css(t,"display"))&&0===t.offsetWidth?Q.swap(t,Xt,function(){
return C(t,e,r)}):C(t,e,r):void 0},set:function(t,n,r){var i=r&&$t(t);return _(t,n,r?S(t,e,r,"border-box"===Q.css(t,"boxSizing",!1,i),i):0);

}}}),Q.cssHooks.marginRight=M(J.reliableMarginRight,function(t,e){return e?Q.swap(t,{
display:"inline-block"},w,[t,"marginRight"]):void 0}),Q.each({margin:"",padding:"",
border:"Width"},function(t,e){Q.cssHooks[t+e]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];4>r;r++)i[t+Mt[r]+e]=o[r]||o[r-2]||o[0];

return i}},It.test(t)||(Q.cssHooks[t+e].set=_)}),Q.fn.extend({css:function(t,e){return vt(this,function(t,e,n){
var r,i,o={},a=0;if(Q.isArray(e)){for(r=$t(t),i=e.length;i>a;a++)o[e[a]]=Q.css(t,e[a],!1,r);

return o}return void 0!==n?Q.style(t,e,n):Q.css(t,e)},t,e,arguments.length>1)},show:function(){
return E(this,!0)},hide:function(){return E(this)},toggle:function(t){return"boolean"==typeof t?t?this.show():this.hide():this.each(function(){
kt(this)?Q(this).show():Q(this).hide()})}}),Q.Tween=T,T.prototype={constructor:T,
init:function(t,e,n,r,i,o){this.elem=t,this.prop=n,this.easing=i||"swing",this.options=e,
this.start=this.now=this.cur(),this.end=r,this.unit=o||(Q.cssNumber[n]?"":"px")},
cur:function(){var t=T.propHooks[this.prop];return t&&t.get?t.get(this):T.propHooks._default.get(this);

},run:function(t){var e,n=T.propHooks[this.prop];return this.pos=e=this.options.duration?Q.easing[this.easing](t,this.options.duration*t,0,1,this.options.duration):t,
this.now=(this.end-this.start)*e+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),
n&&n.set?n.set(this):T.propHooks._default.set(this),this}},T.prototype.init.prototype=T.prototype,
T.propHooks={_default:{get:function(t){var e;return null==t.elem[t.prop]||t.elem.style&&null!=t.elem.style[t.prop]?(e=Q.css(t.elem,t.prop,""),
e&&"auto"!==e?e:0):t.elem[t.prop]},set:function(t){Q.fx.step[t.prop]?Q.fx.step[t.prop](t):t.elem.style&&(null!=t.elem.style[Q.cssProps[t.prop]]||Q.cssHooks[t.prop])?Q.style(t.elem,t.prop,t.now+t.unit):t.elem[t.prop]=t.now;

}}},T.propHooks.scrollTop=T.propHooks.scrollLeft={set:function(t){t.elem.nodeType&&t.elem.parentNode&&(t.elem[t.prop]=t.now);

}},Q.easing={linear:function(t){return t},swing:function(t){return.5-Math.cos(t*Math.PI)/2;

}},Q.fx=T.prototype.init,Q.fx.step={};var Jt,Gt,Kt=/^(?:toggle|show|hide)$/,Qt=new RegExp("^(?:([+-])=|)("+wt+")([a-z%]*)$","i"),te=/queueHooks$/,ee=[q],ne={
"*":[function(t,e){var n=this.createTween(t,e),r=n.cur(),i=Qt.exec(e),o=i&&i[3]||(Q.cssNumber[t]?"":"px"),a=(Q.cssNumber[t]||"px"!==o&&+r)&&Qt.exec(Q.css(n.elem,t)),u=1,s=20;

if(a&&a[3]!==o){o=o||a[3],i=i||[],a=+r||1;do u=u||".5",a/=u,Q.style(n.elem,t,a+o);
while(u!==(u=n.cur()/r)&&1!==u&&--s)}return i&&(a=n.start=+a||+r||0,n.unit=o,n.end=i[1]?a+(i[1]+1)*i[2]:+i[2]),
n}]};Q.Animation=Q.extend(L,{tweener:function(t,e){Q.isFunction(t)?(e=t,t=["*"]):t=t.split(" ");

for(var n,r=0,i=t.length;i>r;r++)n=t[r],ne[n]=ne[n]||[],ne[n].unshift(e)},prefilter:function(t,e){
e?ee.unshift(t):ee.push(t)}}),Q.speed=function(t,e,n){var r=t&&"object"==typeof t?Q.extend({},t):{
complete:n||!n&&e||Q.isFunction(t)&&t,duration:t,easing:n&&e||e&&!Q.isFunction(e)&&e
};return r.duration=Q.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in Q.fx.speeds?Q.fx.speeds[r.duration]:Q.fx.speeds._default,
(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){
Q.isFunction(r.old)&&r.old.call(this),r.queue&&Q.dequeue(this,r.queue)},r},Q.fn.extend({
fadeTo:function(t,e,n,r){return this.filter(kt).css("opacity",0).show().end().animate({
opacity:e},t,n,r)},animate:function(t,e,n,r){var i=Q.isEmptyObject(t),o=Q.speed(e,n,r),a=function(){
var e=L(this,Q.extend({},t),o);(i||mt.get(this,"finish"))&&e.stop(!0)};return a.finish=a,
i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(t,e,n){var r=function(t){
var e=t.stop;delete t.stop,e(n)};return"string"!=typeof t&&(n=e,e=t,t=void 0),e&&t!==!1&&this.queue(t||"fx",[]),
this.each(function(){var e=!0,i=null!=t&&t+"queueHooks",o=Q.timers,a=mt.get(this);

if(i)a[i]&&a[i].stop&&r(a[i]);else for(i in a)a[i]&&a[i].stop&&te.test(i)&&r(a[i]);

for(i=o.length;i--;)o[i].elem!==this||null!=t&&o[i].queue!==t||(o[i].anim.stop(n),
e=!1,o.splice(i,1));(e||!n)&&Q.dequeue(this,t)})},finish:function(t){return t!==!1&&(t=t||"fx"),
this.each(function(){var e,n=mt.get(this),r=n[t+"queue"],i=n[t+"queueHooks"],o=Q.timers,a=r?r.length:0;

for(n.finish=!0,Q.queue(this,t,[]),i&&i.stop&&i.stop.call(this,!0),e=o.length;e--;)o[e].elem===this&&o[e].queue===t&&(o[e].anim.stop(!0),
o.splice(e,1));for(e=0;a>e;e++)r[e]&&r[e].finish&&r[e].finish.call(this);delete n.finish;

})}}),Q.each(["toggle","show","hide"],function(t,e){var n=Q.fn[e];Q.fn[e]=function(t,r,i){
return null==t||"boolean"==typeof t?n.apply(this,arguments):this.animate(N(e,!0),t,r,i);

}}),Q.each({slideDown:N("show"),slideUp:N("hide"),slideToggle:N("toggle"),fadeIn:{
opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(t,e){
Q.fn[t]=function(t,n,r){return this.animate(e,t,n,r)}}),Q.timers=[],Q.fx.tick=function(){
var t,e=0,n=Q.timers;for(Jt=Q.now();e<n.length;e++)t=n[e],t()||n[e]!==t||n.splice(e--,1);

n.length||Q.fx.stop(),Jt=void 0},Q.fx.timer=function(t){Q.timers.push(t),t()?Q.fx.start():Q.timers.pop();

},Q.fx.interval=13,Q.fx.start=function(){Gt||(Gt=setInterval(Q.fx.tick,Q.fx.interval));

},Q.fx.stop=function(){clearInterval(Gt),Gt=null},Q.fx.speeds={slow:600,fast:200,
_default:400},Q.fn.delay=function(t,e){return t=Q.fx?Q.fx.speeds[t]||t:t,e=e||"fx",
this.queue(e,function(e,n){var r=setTimeout(e,t);n.stop=function(){clearTimeout(r);

}})},function(){var t=G.createElement("input"),e=G.createElement("select"),n=e.appendChild(G.createElement("option"));

t.type="checkbox",J.checkOn=""!==t.value,J.optSelected=n.selected,e.disabled=!0,J.optDisabled=!n.disabled,
t=G.createElement("input"),t.value="t",t.type="radio",J.radioValue="t"===t.value}();

var re,ie,oe=Q.expr.attrHandle;Q.fn.extend({attr:function(t,e){return vt(this,Q.attr,t,e,arguments.length>1);

},removeAttr:function(t){return this.each(function(){Q.removeAttr(this,t)})}}),Q.extend({
attr:function(t,e,n){var r,i,o=t.nodeType;if(t&&3!==o&&8!==o&&2!==o)return typeof t.getAttribute===St?Q.prop(t,e,n):(1===o&&Q.isXMLDoc(t)||(e=e.toLowerCase(),
r=Q.attrHooks[e]||(Q.expr.match.bool.test(e)?ie:re)),void 0===n?r&&"get"in r&&null!==(i=r.get(t,e))?i:(i=Q.find.attr(t,e),
null==i?void 0:i):null!==n?r&&"set"in r&&void 0!==(i=r.set(t,n,e))?i:(t.setAttribute(e,n+""),
n):void Q.removeAttr(t,e))},removeAttr:function(t,e){var n,r,i=0,o=e&&e.match(pt);

if(o&&1===t.nodeType)for(;n=o[i++];)r=Q.propFix[n]||n,Q.expr.match.bool.test(n)&&(t[r]=!1),
t.removeAttribute(n)},attrHooks:{type:{set:function(t,e){if(!J.radioValue&&"radio"===e&&Q.nodeName(t,"input")){
var n=t.value;return t.setAttribute("type",e),n&&(t.value=n),e}}}}}),ie={set:function(t,e,n){
return e===!1?Q.removeAttr(t,n):t.setAttribute(n,n),n}},Q.each(Q.expr.match.bool.source.match(/\w+/g),function(t,e){
var n=oe[e]||Q.find.attr;oe[e]=function(t,e,r){var i,o;return r||(o=oe[e],oe[e]=i,
i=null!=n(t,e,r)?e.toLowerCase():null,oe[e]=o),i}});var ae=/^(?:input|select|textarea|button)$/i;

Q.fn.extend({prop:function(t,e){return vt(this,Q.prop,t,e,arguments.length>1)},removeProp:function(t){
return this.each(function(){delete this[Q.propFix[t]||t]})}}),Q.extend({propFix:{
"for":"htmlFor","class":"className"},prop:function(t,e,n){var r,i,o,a=t.nodeType;
if(t&&3!==a&&8!==a&&2!==a)return o=1!==a||!Q.isXMLDoc(t),o&&(e=Q.propFix[e]||e,i=Q.propHooks[e]),
void 0!==n?i&&"set"in i&&void 0!==(r=i.set(t,n,e))?r:t[e]=n:i&&"get"in i&&null!==(r=i.get(t,e))?r:t[e];

},propHooks:{tabIndex:{get:function(t){return t.hasAttribute("tabindex")||ae.test(t.nodeName)||t.href?t.tabIndex:-1;

}}}}),J.optSelected||(Q.propHooks.selected={get:function(t){var e=t.parentNode;return e&&e.parentNode&&e.parentNode.selectedIndex,
null}}),Q.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){
Q.propFix[this.toLowerCase()]=this});var ue=/[\t\r\n\f]/g;Q.fn.extend({addClass:function(t){
var e,n,r,i,o,a,u="string"==typeof t&&t,s=0,c=this.length;if(Q.isFunction(t))return this.each(function(e){
Q(this).addClass(t.call(this,e,this.className))});if(u)for(e=(t||"").match(pt)||[];c>s;s++)if(n=this[s],
r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(ue," "):" ")){for(o=0;i=e[o++];)r.indexOf(" "+i+" ")<0&&(r+=i+" ");

a=Q.trim(r),n.className!==a&&(n.className=a)}return this},removeClass:function(t){
var e,n,r,i,o,a,u=0===arguments.length||"string"==typeof t&&t,s=0,c=this.length;if(Q.isFunction(t))return this.each(function(e){
Q(this).removeClass(t.call(this,e,this.className))});if(u)for(e=(t||"").match(pt)||[];c>s;s++)if(n=this[s],
r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(ue," "):"")){for(o=0;i=e[o++];)for(;r.indexOf(" "+i+" ")>=0;)r=r.replace(" "+i+" "," ");

a=t?Q.trim(r):"",n.className!==a&&(n.className=a)}return this},toggleClass:function(t,e){
var n=typeof t;return"boolean"==typeof e&&"string"===n?e?this.addClass(t):this.removeClass(t):this.each(Q.isFunction(t)?function(n){
Q(this).toggleClass(t.call(this,n,this.className,e),e)}:function(){if("string"===n)for(var e,r=0,i=Q(this),o=t.match(pt)||[];e=o[r++];)i.hasClass(e)?i.removeClass(e):i.addClass(e);
else(n===St||"boolean"===n)&&(this.className&&mt.set(this,"__className__",this.className),
this.className=this.className||t===!1?"":mt.get(this,"__className__")||"")})},hasClass:function(t){
for(var e=" "+t+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(ue," ").indexOf(e)>=0)return!0;

return!1}});var se=/\r/g;Q.fn.extend({val:function(t){var e,n,r,i=this[0];{if(arguments.length)return r=Q.isFunction(t),
this.each(function(n){var i;1===this.nodeType&&(i=r?t.call(this,n,Q(this).val()):t,
null==i?i="":"number"==typeof i?i+="":Q.isArray(i)&&(i=Q.map(i,function(t){return null==t?"":t+"";

})),e=Q.valHooks[this.type]||Q.valHooks[this.nodeName.toLowerCase()],e&&"set"in e&&void 0!==e.set(this,i,"value")||(this.value=i));

});if(i)return e=Q.valHooks[i.type]||Q.valHooks[i.nodeName.toLowerCase()],e&&"get"in e&&void 0!==(n=e.get(i,"value"))?n:(n=i.value,
"string"==typeof n?n.replace(se,""):null==n?"":n)}}}),Q.extend({valHooks:{option:{
get:function(t){var e=Q.find.attr(t,"value");return null!=e?e:Q.trim(Q.text(t))}},
select:{get:function(t){for(var e,n,r=t.options,i=t.selectedIndex,o="select-one"===t.type||0>i,a=o?null:[],u=o?i+1:r.length,s=0>i?u:o?i:0;u>s;s++)if(n=r[s],
!(!n.selected&&s!==i||(J.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&Q.nodeName(n.parentNode,"optgroup"))){
if(e=Q(n).val(),o)return e;a.push(e)}return a},set:function(t,e){for(var n,r,i=t.options,o=Q.makeArray(e),a=i.length;a--;)r=i[a],
(r.selected=Q.inArray(r.value,o)>=0)&&(n=!0);return n||(t.selectedIndex=-1),o}}}}),
Q.each(["radio","checkbox"],function(){Q.valHooks[this]={set:function(t,e){return Q.isArray(e)?t.checked=Q.inArray(Q(t).val(),e)>=0:void 0;

}},J.checkOn||(Q.valHooks[this].get=function(t){return null===t.getAttribute("value")?"on":t.value;

})}),Q.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(t,e){
Q.fn[e]=function(t,n){return arguments.length>0?this.on(e,null,t,n):this.trigger(e);

}}),Q.fn.extend({hover:function(t,e){return this.mouseenter(t).mouseleave(e||t)},
bind:function(t,e,n){return this.on(t,null,e,n)},unbind:function(t,e){return this.off(t,null,e);

},delegate:function(t,e,n,r){return this.on(e,t,n,r)},undelegate:function(t,e,n){
return 1===arguments.length?this.off(t,"**"):this.off(e,t||"**",n)}});var ce=Q.now(),le=/\?/;

Q.parseJSON=function(t){return JSON.parse(t+"")},Q.parseXML=function(t){var e,n;if(!t||"string"!=typeof t)return null;

try{n=new DOMParser,e=n.parseFromString(t,"text/xml")}catch(r){e=void 0}return(!e||e.getElementsByTagName("parsererror").length)&&Q.error("Invalid XML: "+t),
e};var fe=/#.*$/,he=/([?&])_=[^&]*/,pe=/^(.*?):[ \t]*([^\r\n]*)$/gm,de=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ge=/^(?:GET|HEAD)$/,ve=/^\/\//,me=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,ye={},xe={},be="*/".concat("*"),we=t.location.href,Me=me.exec(we.toLowerCase())||[];

Q.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:we,type:"GET",isLocal:de.test(Me[1]),
global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",
accepts:{"*":be,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",
json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/
},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{
"* text":String,"text html":!0,"text json":Q.parseJSON,"text xml":Q.parseXML},flatOptions:{
url:!0,context:!0}},ajaxSetup:function(t,e){return e?z(z(t,Q.ajaxSettings),e):z(Q.ajaxSettings,t);

},ajaxPrefilter:O(ye),ajaxTransport:O(xe),ajax:function(t,e){function n(t,e,n,a){
var s,l,m,y,b,M=e;2!==x&&(x=2,u&&clearTimeout(u),r=void 0,o=a||"",w.readyState=t>0?4:0,
s=t>=200&&300>t||304===t,n&&(y=P(f,w,n)),y=H(f,y,w,s),s?(f.ifModified&&(b=w.getResponseHeader("Last-Modified"),
b&&(Q.lastModified[i]=b),b=w.getResponseHeader("etag"),b&&(Q.etag[i]=b)),204===t||"HEAD"===f.type?M="nocontent":304===t?M="notmodified":(M=y.state,
l=y.data,m=y.error,s=!m)):(m=M,(t||!M)&&(M="error",0>t&&(t=0))),w.status=t,w.statusText=(e||M)+"",
s?d.resolveWith(h,[l,M,w]):d.rejectWith(h,[w,M,m]),w.statusCode(v),v=void 0,c&&p.trigger(s?"ajaxSuccess":"ajaxError",[w,f,s?l:m]),
g.fireWith(h,[w,M]),c&&(p.trigger("ajaxComplete",[w,f]),--Q.active||Q.event.trigger("ajaxStop")));

}"object"==typeof t&&(e=t,t=void 0),e=e||{};var r,i,o,a,u,s,c,l,f=Q.ajaxSetup({},e),h=f.context||f,p=f.context&&(h.nodeType||h.jquery)?Q(h):Q.event,d=Q.Deferred(),g=Q.Callbacks("once memory"),v=f.statusCode||{},m={},y={},x=0,b="canceled",w={
readyState:0,getResponseHeader:function(t){var e;if(2===x){if(!a)for(a={};e=pe.exec(o);)a[e[1].toLowerCase()]=e[2];

e=a[t.toLowerCase()]}return null==e?null:e},getAllResponseHeaders:function(){return 2===x?o:null;

},setRequestHeader:function(t,e){var n=t.toLowerCase();return x||(t=y[n]=y[n]||t,
m[t]=e),this},overrideMimeType:function(t){return x||(f.mimeType=t),this},statusCode:function(t){
var e;if(t)if(2>x)for(e in t)v[e]=[v[e],t[e]];else w.always(t[w.status]);return this;

},abort:function(t){var e=t||b;return r&&r.abort(e),n(0,e),this}};if(d.promise(w).complete=g.add,
w.success=w.done,w.error=w.fail,f.url=((t||f.url||we)+"").replace(fe,"").replace(ve,Me[1]+"//"),
f.type=e.method||e.type||f.method||f.type,f.dataTypes=Q.trim(f.dataType||"*").toLowerCase().match(pt)||[""],
null==f.crossDomain&&(s=me.exec(f.url.toLowerCase()),f.crossDomain=!(!s||s[1]===Me[1]&&s[2]===Me[2]&&(s[3]||("http:"===s[1]?"80":"443"))===(Me[3]||("http:"===Me[1]?"80":"443")))),
f.data&&f.processData&&"string"!=typeof f.data&&(f.data=Q.param(f.data,f.traditional)),
R(ye,f,e,w),2===x)return w;c=Q.event&&f.global,c&&0===Q.active++&&Q.event.trigger("ajaxStart"),
f.type=f.type.toUpperCase(),f.hasContent=!ge.test(f.type),i=f.url,f.hasContent||(f.data&&(i=f.url+=(le.test(i)?"&":"?")+f.data,
delete f.data),f.cache===!1&&(f.url=he.test(i)?i.replace(he,"$1_="+ce++):i+(le.test(i)?"&":"?")+"_="+ce++)),
f.ifModified&&(Q.lastModified[i]&&w.setRequestHeader("If-Modified-Since",Q.lastModified[i]),
Q.etag[i]&&w.setRequestHeader("If-None-Match",Q.etag[i])),(f.data&&f.hasContent&&f.contentType!==!1||e.contentType)&&w.setRequestHeader("Content-Type",f.contentType),
w.setRequestHeader("Accept",f.dataTypes[0]&&f.accepts[f.dataTypes[0]]?f.accepts[f.dataTypes[0]]+("*"!==f.dataTypes[0]?", "+be+"; q=0.01":""):f.accepts["*"]);

for(l in f.headers)w.setRequestHeader(l,f.headers[l]);if(f.beforeSend&&(f.beforeSend.call(h,w,f)===!1||2===x))return w.abort();

b="abort";for(l in{success:1,error:1,complete:1})w[l](f[l]);if(r=R(xe,f,e,w)){w.readyState=1,
c&&p.trigger("ajaxSend",[w,f]),f.async&&f.timeout>0&&(u=setTimeout(function(){w.abort("timeout");

},f.timeout));try{x=1,r.send(m,n)}catch(M){if(!(2>x))throw M;n(-1,M)}}else n(-1,"No Transport");

return w},getJSON:function(t,e,n){return Q.get(t,e,n,"json")},getScript:function(t,e){
return Q.get(t,void 0,e,"script")}}),Q.each(["get","post"],function(t,e){Q[e]=function(t,n,r,i){
return Q.isFunction(n)&&(i=i||r,r=n,n=void 0),Q.ajax({url:t,type:e,dataType:i,data:n,
success:r})}}),Q._evalUrl=function(t){return Q.ajax({url:t,type:"GET",dataType:"script",
async:!1,global:!1,"throws":!0})},Q.fn.extend({wrapAll:function(t){var e;return Q.isFunction(t)?this.each(function(e){
Q(this).wrapAll(t.call(this,e))}):(this[0]&&(e=Q(t,this[0].ownerDocument).eq(0).clone(!0),
this[0].parentNode&&e.insertBefore(this[0]),e.map(function(){for(var t=this;t.firstElementChild;)t=t.firstElementChild;

return t}).append(this)),this)},wrapInner:function(t){return this.each(Q.isFunction(t)?function(e){
Q(this).wrapInner(t.call(this,e))}:function(){var e=Q(this),n=e.contents();n.length?n.wrapAll(t):e.append(t);

})},wrap:function(t){var e=Q.isFunction(t);return this.each(function(n){Q(this).wrapAll(e?t.call(this,n):t);

})},unwrap:function(){return this.parent().each(function(){Q.nodeName(this,"body")||Q(this).replaceWith(this.childNodes);

}).end()}}),Q.expr.filters.hidden=function(t){return t.offsetWidth<=0&&t.offsetHeight<=0;

},Q.expr.filters.visible=function(t){return!Q.expr.filters.hidden(t)};var ke=/%20/g,_e=/\[\]$/,Se=/\r?\n/g,Ce=/^(?:submit|button|image|reset|file)$/i,Ee=/^(?:input|select|textarea|keygen)/i;

Q.param=function(t,e){var n,r=[],i=function(t,e){e=Q.isFunction(e)?e():null==e?"":e,
r[r.length]=encodeURIComponent(t)+"="+encodeURIComponent(e)};if(void 0===e&&(e=Q.ajaxSettings&&Q.ajaxSettings.traditional),
Q.isArray(t)||t.jquery&&!Q.isPlainObject(t))Q.each(t,function(){i(this.name,this.value);

});else for(n in t)F(n,t[n],e,i);return r.join("&").replace(ke,"+")},Q.fn.extend({
serialize:function(){return Q.param(this.serializeArray())},serializeArray:function(){
return this.map(function(){var t=Q.prop(this,"elements");return t?Q.makeArray(t):this;

}).filter(function(){var t=this.type;return this.name&&!Q(this).is(":disabled")&&Ee.test(this.nodeName)&&!Ce.test(t)&&(this.checked||!_t.test(t));

}).map(function(t,e){var n=Q(this).val();return null==n?null:Q.isArray(n)?Q.map(n,function(t){
return{name:e.name,value:t.replace(Se,"\r\n")}}):{name:e.name,value:n.replace(Se,"\r\n")
}}).get()}}),Q.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(t){}
};var Te=0,Ae={},Ne={0:200,1223:204},je=Q.ajaxSettings.xhr();t.attachEvent&&t.attachEvent("onunload",function(){
for(var t in Ae)Ae[t]()}),J.cors=!!je&&"withCredentials"in je,J.ajax=je=!!je,Q.ajaxTransport(function(t){
var e;return J.cors||je&&!t.crossDomain?{send:function(n,r){var i,o=t.xhr(),a=++Te;

if(o.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(i in t.xhrFields)o[i]=t.xhrFields[i];

t.mimeType&&o.overrideMimeType&&o.overrideMimeType(t.mimeType),t.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");

for(i in n)o.setRequestHeader(i,n[i]);e=function(t){return function(){e&&(delete Ae[a],
e=o.onload=o.onerror=null,"abort"===t?o.abort():"error"===t?r(o.status,o.statusText):r(Ne[o.status]||o.status,o.statusText,"string"==typeof o.responseText?{
text:o.responseText}:void 0,o.getAllResponseHeaders()))}},o.onload=e(),o.onerror=e("error"),
e=Ae[a]=e("abort");try{o.send(t.hasContent&&t.data||null)}catch(u){if(e)throw u}},
abort:function(){e&&e()}}:void 0}),Q.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(t){return Q.globalEval(t),
t}}}),Q.ajaxPrefilter("script",function(t){void 0===t.cache&&(t.cache=!1),t.crossDomain&&(t.type="GET");

}),Q.ajaxTransport("script",function(t){if(t.crossDomain){var e,n;return{send:function(r,i){
e=Q("<script>").prop({async:!0,charset:t.scriptCharset,src:t.url}).on("load error",n=function(t){
e.remove(),n=null,t&&i("error"===t.type?404:200,t.type)}),G.head.appendChild(e[0]);

},abort:function(){n&&n()}}}});var qe=[],De=/(=)\?(?=&|$)|\?\?/;Q.ajaxSetup({jsonp:"callback",
jsonpCallback:function(){var t=qe.pop()||Q.expando+"_"+ce++;return this[t]=!0,t}}),
Q.ajaxPrefilter("json jsonp",function(e,n,r){var i,o,a,u=e.jsonp!==!1&&(De.test(e.url)?"url":"string"==typeof e.data&&!(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&De.test(e.data)&&"data");

return u||"jsonp"===e.dataTypes[0]?(i=e.jsonpCallback=Q.isFunction(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,
u?e[u]=e[u].replace(De,"$1"+i):e.jsonp!==!1&&(e.url+=(le.test(e.url)?"&":"?")+e.jsonp+"="+i),
e.converters["script json"]=function(){return a||Q.error(i+" was not called"),a[0];

},e.dataTypes[0]="json",o=t[i],t[i]=function(){a=arguments},r.always(function(){t[i]=o,
e[i]&&(e.jsonpCallback=n.jsonpCallback,qe.push(i)),a&&Q.isFunction(o)&&o(a[0]),a=o=void 0;

}),"script"):void 0}),Q.parseHTML=function(t,e,n){if(!t||"string"!=typeof t)return null;

"boolean"==typeof e&&(n=e,e=!1),e=e||G;var r=at.exec(t),i=!n&&[];return r?[e.createElement(r[1])]:(r=Q.buildFragment([t],e,i),
i&&i.length&&Q(i).remove(),Q.merge([],r.childNodes))};var Le=Q.fn.load;Q.fn.load=function(t,e,n){
if("string"!=typeof t&&Le)return Le.apply(this,arguments);var r,i,o,a=this,u=t.indexOf(" ");

return u>=0&&(r=Q.trim(t.slice(u)),t=t.slice(0,u)),Q.isFunction(e)?(n=e,e=void 0):e&&"object"==typeof e&&(i="POST"),
a.length>0&&Q.ajax({url:t,type:i,dataType:"html",data:e}).done(function(t){o=arguments,
a.html(r?Q("<div>").append(Q.parseHTML(t)).find(r):t)}).complete(n&&function(t,e){
a.each(n,o||[t.responseText,e,t])}),this},Q.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(t,e){
Q.fn[e]=function(t){return this.on(e,t)}}),Q.expr.filters.animated=function(t){return Q.grep(Q.timers,function(e){
return t===e.elem}).length};var Oe=t.document.documentElement;Q.offset={setOffset:function(t,e,n){
var r,i,o,a,u,s,c,l=Q.css(t,"position"),f=Q(t),h={};"static"===l&&(t.style.position="relative"),
u=f.offset(),o=Q.css(t,"top"),s=Q.css(t,"left"),c=("absolute"===l||"fixed"===l)&&(o+s).indexOf("auto")>-1,
c?(r=f.position(),a=r.top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(s)||0),Q.isFunction(e)&&(e=e.call(t,n,u)),
null!=e.top&&(h.top=e.top-u.top+a),null!=e.left&&(h.left=e.left-u.left+i),"using"in e?e.using.call(t,h):f.css(h);

}},Q.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){
Q.offset.setOffset(this,t,e)});var e,n,r=this[0],i={top:0,left:0},o=r&&r.ownerDocument;

if(o)return e=o.documentElement,Q.contains(e,r)?(typeof r.getBoundingClientRect!==St&&(i=r.getBoundingClientRect()),
n=I(o),{top:i.top+n.pageYOffset-e.clientTop,left:i.left+n.pageXOffset-e.clientLeft
}):i},position:function(){if(this[0]){var t,e,n=this[0],r={top:0,left:0};return"fixed"===Q.css(n,"position")?e=n.getBoundingClientRect():(t=this.offsetParent(),
e=this.offset(),Q.nodeName(t[0],"html")||(r=t.offset()),r.top+=Q.css(t[0],"borderTopWidth",!0),
r.left+=Q.css(t[0],"borderLeftWidth",!0)),{top:e.top-r.top-Q.css(n,"marginTop",!0),
left:e.left-r.left-Q.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){
for(var t=this.offsetParent||Oe;t&&!Q.nodeName(t,"html")&&"static"===Q.css(t,"position");)t=t.offsetParent;

return t||Oe})}}),Q.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){
var r="pageYOffset"===n;Q.fn[e]=function(i){return vt(this,function(e,i,o){var a=I(e);

return void 0===o?a?a[n]:e[i]:void(a?a.scrollTo(r?t.pageXOffset:o,r?o:t.pageYOffset):e[i]=o);

},e,i,arguments.length,null)}}),Q.each(["top","left"],function(t,e){Q.cssHooks[e]=M(J.pixelPosition,function(t,n){
return n?(n=w(t,e),Ut.test(n)?Q(t).position()[e]+"px":n):void 0})}),Q.each({Height:"height",
Width:"width"},function(t,e){Q.each({padding:"inner"+t,content:e,"":"outer"+t},function(n,r){
Q.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),a=n||(r===!0||i===!0?"margin":"border");

return vt(this,function(e,n,r){var i;return Q.isWindow(e)?e.document.documentElement["client"+t]:9===e.nodeType?(i=e.documentElement,
Math.max(e.body["scroll"+t],i["scroll"+t],e.body["offset"+t],i["offset"+t],i["client"+t])):void 0===r?Q.css(e,n,a):Q.style(e,n,r,a);

},e,o?r:void 0,o,null)}})}),Q.fn.size=function(){return this.length},Q.fn.andSelf=Q.fn.addBack,
"function"==typeof define&&define.amd&&define("jquery",[],function(){return Q});var Re=t.jQuery,ze=t.$;

return Q.noConflict=function(e){return t.$===Q&&(t.$=ze),e&&t.jQuery===Q&&(t.jQuery=Re),
Q},typeof e===St&&(t.jQuery=t.$=Q),Q})},{}],25:[function(t,e,n){function r(t,e,n){
function r(){m&&clearTimeout(m),p&&clearTimeout(p),x=0,p=m=y=void 0}function o(e,n){
n&&clearTimeout(n),p=m=y=void 0,e&&(x=c(),d=t.apply(v,h),m||p||(h=v=void 0))}function s(){
var t=e-(c()-g);0>=t||t>e?o(y,p):m=setTimeout(s,t)}function l(){o(w,m)}function f(){
if(h=arguments,g=c(),v=this,y=w&&(m||!M),b===!1)var n=M&&!m;else{p||M||(x=g);var r=b-(g-x),i=0>=r||r>b;

i?(p&&(p=clearTimeout(p)),x=g,d=t.apply(v,h)):p||(p=setTimeout(l,r))}return i&&m?m=clearTimeout(m):m||e===b||(m=setTimeout(s,e)),
n&&(i=!0,d=t.apply(v,h)),!i||m||p||(h=v=void 0),d}var h,p,d,g,v,m,y,x=0,b=!1,w=!0;

if("function"!=typeof t)throw new TypeError(a);if(e=0>e?0:+e||0,n===!0){var M=!0;
w=!1}else i(n)&&(M=!!n.leading,b="maxWait"in n&&u(+n.maxWait||0,e),w="trailing"in n?!!n.trailing:w);

return f.cancel=r,f}function i(t){var e=typeof t;return!!t&&("object"==e||"function"==e);

}var o=t("lodash._getnative"),a="Expected a function",u=Math.max,s=o(Date,"now"),c=s||function(){
return(new Date).getTime()};e.exports=r},{"lodash._getnative":26}],26:[function(t,e,n){
function r(t){return!!t&&"object"==typeof t}function i(t,e){var n=null==t?void 0:t[e];

return u(n)?n:void 0}function o(t){return a(t)&&p.call(t)==s}function a(t){var e=typeof t;

return!!t&&("object"==e||"function"==e)}function u(t){return null==t?!1:o(t)?d.test(f.call(t)):r(t)&&c.test(t);

}var s="[object Function]",c=/^\[object .+?Constructor\]$/,l=Object.prototype,f=Function.prototype.toString,h=l.hasOwnProperty,p=l.toString,d=RegExp("^"+f.call(h).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");

e.exports=i},{}],27:[function(t,e,n){"use strict";e.exports=n=function(t,e,n,r){var i,o;

if("string"==typeof e){for(i=e.split(r||"."),o=0;o<i.length;o++){if(!t||!t.hasOwnProperty(i[o])&&!t[i[o]])return n;

t=t[i[o]]}return t}return n}},{}],28:[function(t,e,n){"use strict";var r=function(t,e,n,i){
var o,a;return t&&"object"==typeof t||(t={}),"string"==typeof e&&(o=e.split(i||"."),
a=o[0],o.length>1?(o.shift(),t[a]=r(t[a],o.join(i||"."),n,i)):t[a]=n),t};e.exports=n=r;

},{}]},{},[5]);