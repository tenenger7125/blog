(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[480],{1826:function(e,t,n){Promise.resolve().then(n.t.bind(n,5593,23)),Promise.resolve().then(n.t.bind(n,6280,23)),Promise.resolve().then(n.bind(n,4802)),Promise.resolve().then(n.bind(n,1138)),Promise.resolve().then(n.bind(n,2383)),Promise.resolve().then(n.bind(n,48))},2383:function(e,t,n){"use strict";n.d(t,{default:function(){return c}});var s=n(9890),i=n(9556),o=n(3530),r=n(774),a=n(6554);let l=(0,o.default)(()=>Promise.all([n.e(209),n.e(498),n.e(261),n.e(56)]).then(n.bind(n,7222)).then(e=>e.Pagination),{loadableGenerated:{webpack:()=>[null]},ssr:!1});var c=e=>{let{page:t,totalPage:n}=e,o=(0,r.useRouter)(),[c,u]=(0,i.useState)(t);return(0,s.jsx)("div",{className:"py-7",children:(0,s.jsx)(l,{page:c,pageTotal:n,siblingCount:2,onChange:e=>{u(e),o.push("".concat(a.m.POSTS,"/").concat(e))}})})}},48:function(e,t,n){"use strict";n.r(t);var s=n(9890),i=n(9556),o=n(1813);t.default=e=>{let[t,n]=(0,i.useState)(!1),[r,a]=(0,i.useState)(!1),l=(0,i.useRef)(null),c=async()=>{var e;let t=null===(e=l.current)||void 0===e?void 0:e.textContent;if(t)try{a(!0),await navigator.clipboard.writeText(t)}catch(e){console.warn("copy is not working")}finally{a(!1),n(!0),setTimeout(()=>n(!1),1500)}};return(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsxs)("button",{"aria-label":t?"Copied":"Copy",className:"absolute right-0 top-0 flex items-center gap-2 rounded bg-black px-3 py-2 text-white",disabled:t||r,onClick:c,children:[(0,s.jsx)("span",{className:"fill-white",children:t?(0,s.jsx)(o.J,{icon:"check"}):(0,s.jsx)(o.J,{icon:"contentCopy"})}),(0,s.jsx)("span",{children:t?"Copied !":"Copy"})]}),(0,s.jsx)("pre",{ref:l,...e})]})}},6554:function(e,t,n){"use strict";n.d(t,{m:function(){return s}});let s={HOME:"/",POSTS:"/posts",POST:"/post"}}},function(e){e.O(0,[1,280,468,141,736,744],function(){return e(e.s=1826)}),_N_E=e.O()}]);