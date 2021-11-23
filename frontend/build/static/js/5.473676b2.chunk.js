(this["webpackJsonpmern-app-03"]=this["webpackJsonpmern-app-03"]||[]).push([[5],{48:function(e,t,n){"use strict";n.d(t,"c",(function(){return l})),n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return o})),n.d(t,"d",(function(){return d}));var a=n(18);var r="REQUIRE",i="MINLENGTH",c="MAXLENGTH",s="EMAIL",l=function(){return{type:r}},u=function(e){return{type:i,val:e}},o=function(){return{type:s}},d=function(e,t){var n,l=!0,u=function(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=Object(a.a)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,s=!0,l=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return s=e.done,e},e:function(e){l=!0,c=e},f:function(){try{s||null==n.return||n.return()}finally{if(l)throw c}}}}(t);try{for(u.s();!(n=u.n()).done;){var o=n.value;o.type===r&&(l=l&&e.trim().length>0),o.type===i&&(l=l&&e.trim().length>=o.val),o.type===c&&(l=l&&e.trim().length<=o.val),"MIN"===o.type&&(l=l&&+e>=o.val),"MAX"===o.type&&(l=l&&+e<=o.val),o.type===s&&(l=l&&/^\S+@\S+\.\S+$/.test(e))}}catch(d){u.e(d)}finally{u.f()}return l}},54:function(e,t,n){"use strict";var a=n(11),r=n(47),i=n(0),c=n(48),s=(n(55),n(1)),l=function(e,t){switch(t.type){case"CHANGE":return Object(r.a)(Object(r.a)({},e),{},{value:t.val,isValid:Object(c.d)(t.val,t.validators)});case"TOUCH":return Object(r.a)(Object(r.a)({},e),{},{isTouched:!0});default:return e}};t.a=function(e){var t=Object(i.useReducer)(l,{value:e.value||"",isTouched:!1,isValid:e.valid||!1}),n=Object(a.a)(t,2),r=n[0],c=n[1],u=e.id,o=e.onInput,d=r.value,p=r.isValid;Object(i.useEffect)((function(){o(u,d,p)}),[u,o,d,p]);var b=function(t){c({type:"CHANGE",val:t.target.value,validators:e.validators})},j=function(){c({type:"TOUCH"})},f="input"===e.element?Object(s.jsx)("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:b,onBlur:j,value:r.value}):Object(s.jsx)("textarea",{id:e.id,rows:e.rows||3,onChange:b,onBlur:j,value:r.value});return Object(s.jsxs)("div",{className:"form-control ".concat(!r.isValid&&r.isTouched&&"form-control--invalid"),children:[Object(s.jsx)("label",{htmlFor:e.id,children:e.label}),f,!r.isValid&&r.isTouched&&Object(s.jsx)("p",{children:e.errorText})]})}},55:function(e,t,n){},56:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n(11),r=n(57),i=n(47),c=n(0),s=function(e,t){switch(t.type){case"INPUT_CHANGE":var n=!0;for(var a in e.inputs)e.inputs[a]&&(n=a===t.inputId?n&&t.isValid:n&&e.inputs[a].isValid);return Object(i.a)(Object(i.a)({},e),{},{inputs:Object(i.a)(Object(i.a)({},e.inputs),{},Object(r.a)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:n});case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}},l=function(e,t){var n=Object(c.useReducer)(s,{inputs:e,isValid:t}),r=Object(a.a)(n,2),i=r[0],l=r[1];return[i,Object(c.useCallback)((function(e,t,n){l({type:"INPUT_CHANGE",value:t,isValid:n,inputId:e})}),[]),Object(c.useCallback)((function(e,t){l({type:"SET_DATA",inputs:e,formIsValid:t})}),[])]}},58:function(e,t,n){"use strict";var a=n(11),r=n(0),i=n(46),c=(n(59),n(1));t.a=function(e){var t=Object(r.useState)(),n=Object(a.a)(t,2),s=n[0],l=n[1],u=Object(r.useState)(),o=Object(a.a)(u,2),d=o[0],p=o[1],b=Object(r.useState)(!1),j=Object(a.a)(b,2),f=j[0],v=j[1],O=Object(r.useRef)();Object(r.useEffect)((function(){if(s){var e=new FileReader;e.onload=function(){p(e.result)},e.readAsDataURL(s)}}),[s]);return Object(c.jsxs)("div",{className:"form-control",children:[Object(c.jsx)("input",{id:e.id,ref:O,style:{display:"none"},type:"file",accept:".jpg,.png,.jpeg",onChange:function(t){var n,a=f;t.target.files&&1===t.target.files.length?(n=t.target.files[0],l(n),v(!0),a=!0):(v(!1),a=!1),e.onInput(e.id,n,a)}}),Object(c.jsxs)("div",{className:"image-upload ".concat(e.center&&"center"),children:[Object(c.jsxs)("div",{className:"image-upload__preview",children:[d&&Object(c.jsx)("img",{src:d,alt:"Preview"}),!d&&Object(c.jsx)("p",{children:"Please pick an image."})]}),Object(c.jsx)(i.a,{type:"button",onClick:function(){O.current.click()},children:"PICK IMAGE"})]}),!f&&Object(c.jsx)("p",{children:e.errorText})]})}},59:function(e,t,n){},60:function(e,t,n){},72:function(e,t,n){"use strict";n.r(t);var a=n(49),r=n.n(a),i=n(50),c=n(11),s=n(0),l=n.n(s),u=n(2),o=n(46),d=n(54),p=n(52),b=n(17),j=n(48),f=n(56),v=n(53),O=n(12),h=n(58),m=(n(60),n(1));t.default=function(){var e=Object(s.useContext)(O.a),t=Object(v.a)(),n=t.isLoading,a=t.error,y=t.clearError,x=t.sendRequest,g=Object(f.a)({title:{value:"",isValid:!1},image:{value:null,isValid:!1},description:{value:"",isValid:!1},address:{value:"",isValid:!1}},!1),T=Object(c.a)(g,2),I=T[0],V=T[1],A=Object(u.g)(),w=function(){var t=Object(i.a)(r.a.mark((function t(n){var a;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),(a=new FormData).append("title",I.inputs.title.value),a.append("image",I.inputs.image.value),a.append("description",I.inputs.description.value),a.append("address",I.inputs.address.value),t.prev=6,t.next=9,x("https://mern-awolfen.herokuapp.com/api/places","POST",a,{Authorization:"Bearer ".concat(e.token)});case 9:A.push("/"),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(6),console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[6,12]])})));return function(e){return t.apply(this,arguments)}}();return Object(m.jsxs)(l.a.Fragment,{children:[Object(m.jsx)(p.a,{error:a,onClear:y}),Object(m.jsxs)("form",{className:"place-form",onSubmit:w,children:[n&&Object(m.jsx)(b.a,{asOverlay:!0}),Object(m.jsx)(d.a,{id:"title",element:"input",type:"text",label:"Title",validators:[Object(j.c)()],errorText:"Please enter a valid title.",onInput:V}),Object(m.jsx)(h.a,{center:!0,id:"image",onInput:V,errorText:"Please provide an image."}),Object(m.jsx)(d.a,{id:"description",element:"textarea",label:"Description",validators:[Object(j.b)(5)],errorText:"Please enter a valid description (at least 5 characters).",onInput:V}),Object(m.jsx)(d.a,{id:"address",element:"input",label:"Address",validators:[Object(j.c)()],errorText:"Please enter a valid address.",onInput:V}),Object(m.jsx)(o.a,{type:"submit",disabled:!I.isValid,children:"ADD PLACE"})]})]})}}}]);
//# sourceMappingURL=5.473676b2.chunk.js.map