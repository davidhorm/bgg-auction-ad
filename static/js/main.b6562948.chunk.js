(this["webpackJsonpbgg-auction-ad"]=this["webpackJsonpbgg-auction-ad"]||[]).push([[0],{104:function(t,e,n){},120:function(t,e){},122:function(t,e){},132:function(t,e,n){},138:function(t,e,n){"use strict";n.r(e);var r=n(8),a=n(0),c=n.n(a),i=n(10),o=n.n(i),u=(n(104),n(18)),s=n.n(u),l=n(35),f=n(51),b=n(179),d=n(180),j=n(181),m=n(183),p=n(182),h=n(177),g=n(178),v=n(173),O=n(90),x=function(){var t=Object(l.a)(s.a.mark((function t(e){var n,r,a;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"https://bgg-auction-ad.davidhorm.workers.dev/",n="xmlapi/geeklist/".concat(e),r="".concat("https://bgg-auction-ad.davidhorm.workers.dev/").concat(n),t.next=5,fetch(r).then(function(){var t=Object(l.a)(s.a.mark((function t(e){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.text();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).then(function(){var t=Object(l.a)(s.a.mark((function t(e){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(O.parseStringPromise)(e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).then((function(t){return t})).catch((function(t){return console.error(t),"An error occurred trying to get the GeekList with id: ".concat(e)}));case 5:return a=t.sent,t.abrupt("return",a);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),y=n(73),w=function(t){if(t[0]&&t[0].indexOf(": ")>=0)return t[0].split(": ")[1].trim();return t[0]&&t[0].indexOf(" - ")>=0?t[0].split(" - ")[1].trim():""},k=function(t){var e=t.filter((function(t){return t.match(/^(starting bid)|(sb)|(opening bid)|(min bid)|(minimum bid)/i)}));return w(e)},G=function(t){var e=t.filter((function(t){return t.match(/^(soft reserve)|(sr)|(hard reserve)/i)}));return w(e)},B=function(t){var e=t.filter((function(t){return t.match(/^(buy it now)|(bin)/i)}));return w(e)},S=function(t){return t.geeklist.item.map((function(t){var e,n=(e=t.body)&&e[0]?e[0].toLowerCase().replaceAll(/(\[\/?\w+(=#?\w+)?])|(\[\/?-])/gi,"").split("\n").filter((function(t){return t.trim()})):[];return Object(y.a)(Object(y.a)({},t.$),{},{startingBid:k(n),softReserve:G(n),buyItNow:B(n)})}))},A=function(t,e){return"hidden"===e||"table"===e?"":t.map((function(t){return"[imageid=".concat(t.imageid," ").concat(e," inline]")})).join("")},L=function(t,e){return"[floatleft][u][b]".concat(t,"[/b][/u]\r\n").concat(e,"[/floatleft]")},N=function(t,e){if(e){var n=t.map((function(t){return"[imageid=".concat(t.imageid," square]")})).join("");return L("Box Art",n)}return""},C=function(t,e){var n=e?"\r\n":"",r=t.map((function(t){return"".concat(n,"[thing=").concat(t.objectid,"][/thing]").concat(n)})).join("\r\n");return L("Game (BGG Link)",r)},I=function(t,e){var n=e?"\r\n":"",r=t.map((function(t){return"".concat(n,"[listitem=").concat(t.id,"]Auction[/listitem]").concat(n)})).join("\r\n");return L("Auction",r)},R=function(t,e){var n=e?"\r\n":"";if(t.filter((function(t){return t.startingBid})).length>0){var r=t.map((function(t){return"".concat(n).concat(t.startingBid||"-").concat(n)})).join("\r\n");return L("SB",r)}return""},D=function(t,e){var n=e?"\r\n":"";if(t.filter((function(t){return t.softReserve})).length>0){var r=t.map((function(t){return"".concat(n).concat(t.softReserve||"-").concat(n)})).join("\r\n");return L("SR",r)}return""},q=function(t,e){var n=e?"\r\n":"";if(t.filter((function(t){return t.buyItNow})).length>0){var r=t.map((function(t){return"".concat(n).concat(t.buyItNow||"-").concat(n)})).join("\r\n");return L("BIN",r)}return""},z=function(t,e){var n="table"===e,r=[N(t,n),C(t,n),I(t,n),R(t,n),D(t,n),q(t,n)];return"[size=12][floatleft]".concat(r.join(""),"[/floatleft][/size][clear]")},F=function(t,e,n){var r=e.sort((function(t,e){return t.objectname.localeCompare(e.objectname)}));return["Auction Link: [b][geeklist=".concat(t,"][/geeklist][/b]"),A(r,n),z(r,n),"[b][COLOR=#009900]List Generated via [url=http://davidhorm.github.io/bgg-auction-ad]BGG Auction Ad[/url] tool (a free service)[/COLOR][/b]"].filter((function(t){return t})).join("\r\n\r\n")},T=(n(132),Object(v.a)({root:{display:"block",margin:"1em"}})),P=function(){var t=Object(a.useState)(""),e=Object(f.a)(t,2),n=e[0],c=e[1],i=Object(a.useState)("table"),o=Object(f.a)(i,2),u=o[0],v=o[1],O=Object(a.useState)(""),y=Object(f.a)(O,2),w=y[0],k=y[1],G=T(),B=function(){var t=Object(l.a)(s.a.mark((function t(e){var r,a,c;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),k("loading"),t.next=4,x(n);case 4:(r=t.sent)&&r.geeklist?(a=S(r),c=F(n,a,u),k(c)):r.message?k(r.message):k(r);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),A="Image Size (and Location)";return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)("h1",{children:"BGG Auction Ad Generator"}),Object(r.jsxs)("div",{children:["Do you have a GeekList Auction on ",Object(r.jsx)("a",{href:"https://www.boardgamegeek.com/",children:"BoardGameGeek"}),"? Do you want to display a gallery of the box art and links to your auction items? Use this tool to generate text to copy and paste into a BGG post."]}),Object(r.jsxs)("form",{onSubmit:B,children:[Object(r.jsx)(b.a,{className:G.root,id:"geeklist-id",label:"GeekList ID",variant:"outlined",type:"number",value:n,onChange:function(t){return c(t.target.value)}}),Object(r.jsxs)(p.a,{component:"fieldset",className:G.root,children:[Object(r.jsx)(h.a,{component:"legend",children:A}),Object(r.jsxs)(j.a,{"aria-label":A,name:"image-size-location",value:u,onChange:function(t){return v(t.target.value)},children:[Object(r.jsx)(m.a,{value:"table",label:"Square (Table)",control:Object(r.jsx)(d.a,{})}),Object(r.jsx)(m.a,{value:"small",label:"Small (Gallery)",control:Object(r.jsx)(d.a,{})}),Object(r.jsx)(m.a,{value:"square",label:"Square  (Gallery)",control:Object(r.jsx)(d.a,{})}),Object(r.jsx)(m.a,{value:"micro",label:"Micro  (Gallery)",control:Object(r.jsx)(d.a,{})}),Object(r.jsx)(m.a,{value:"hidden",label:"None",control:Object(r.jsx)(d.a,{})})]})]}),Object(r.jsx)(g.a,{variant:"contained",color:"primary",type:"submit",className:G.root,children:"Generate"})]}),Object(r.jsx)("h3",{children:"Generated Text"}),Object(r.jsx)("textarea",{className:"generated-text",value:w||"",readOnly:!0})]})},J=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,185)).then((function(e){var n=e.getCLS,r=e.getFID,a=e.getFCP,c=e.getLCP,i=e.getTTFB;n(t),r(t),a(t),c(t),i(t)}))};o.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(P,{})}),document.getElementById("root")),J()}},[[138,1,2]]]);
//# sourceMappingURL=main.b6562948.chunk.js.map