(this["webpackJsonpmern-app-03"]=this["webpackJsonpmern-app-03"]||[]).push([[8],{45:function(e,t,c){"use strict";c(0),c(51);var n=c(1);t.a=function(e){return Object(n.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})}},51:function(e,t,c){},65:function(e,t,c){},66:function(e,t,c){},67:function(e,t,c){},75:function(e,t,c){"use strict";c.r(t);var n=c(49),s=c.n(n),a=c(50),r=c(11),i=c(0),l=c.n(i),u=c(45),j=c(9),o=(c(65),c(1)),h=function(e){return Object(o.jsx)("div",{className:"avatar ".concat(e.className),style:e.style,children:Object(o.jsx)("img",{src:e.image,alt:e.alt,style:{width:e.width,height:e.width}})})},d=(c(66),function(e){return Object(o.jsx)("li",{className:"user-item",children:Object(o.jsx)(u.a,{className:"user-item__content",children:Object(o.jsxs)(j.b,{to:"/".concat(e.id,"/places"),children:[Object(o.jsx)("div",{className:"user-item__image",children:Object(o.jsx)(h,{image:"".concat("http://localhost:5000/").concat(e.image),alt:e.name})}),Object(o.jsxs)("div",{className:"user-item__info",children:[Object(o.jsx)("h2",{children:e.name}),Object(o.jsxs)("h3",{children:[e.placeCount," ",1===e.placeCount?"Place":"Places"]})]})]})})})}),m=(c(67),function(e){return 0===e.items.length?Object(o.jsx)("div",{className:"center",children:Object(o.jsx)(u.a,{children:Object(o.jsx)("h2",{children:"No users found."})})}):Object(o.jsx)("ul",{className:"users-list",children:e.items.map((function(e){return Object(o.jsx)(d,{id:e.id,image:e.image,name:e.name,placeCount:e.places.length},e.id)}))})}),b=c(17),O=c(52),p=c(53);t.default=function(){var e=Object(p.a)(),t=e.isLoading,c=e.error,n=e.clearError,u=e.sendRequest,j=Object(i.useState)(),h=Object(r.a)(j,2),d=h[0],x=h[1];return Object(i.useEffect)((function(){(function(){var e=Object(a.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u("".concat("http://localhost:5000/api","/users"));case 3:t=e.sent,x(t.users),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[u]),Object(o.jsxs)(l.a.Fragment,{children:[Object(o.jsx)(O.a,{error:c,onClear:n}),t&&Object(o.jsx)("div",{className:"center",children:Object(o.jsx)(b.a,{asOverlay:!0})}),!t&&d&&Object(o.jsx)(m,{items:d})]})}}}]);
//# sourceMappingURL=8.7c300503.chunk.js.map