(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1824:(e,t,a)=>{Promise.resolve().then(a.bind(a,9337))},9337:(e,t,a)=>{"use strict";a.d(t,{default:()=>F});var n=a(5155);let i={name:"Safe Levels - extended",id:"ExtendedSafeLevels",values:{no2:50,pm25:50,pm10:50,o3:50,co:50,so2:50}};var s=a(2115);class l{constructor(e,t={useCache:!1}){this.isLoading=!1,this.promiseStack=[],this.resolveAll=()=>{this.promiseStack.forEach(e=>e(this.responseCache)),this.promiseStack.splice(0)},this.execute=async()=>{if(this.options.useCache&&this.responseCache)return this.responseCache;if(this.isLoading)return new Promise(e=>{this.promiseStack.push(e)});this.isLoading=!0;let e=await fetch(this.url).then(e=>e.json());if(this.isLoading=!1,"ok"===e.status)return this.responseCache=e.data,this.resolveAll(),e.data;this.resolveAll()},this.url=e,this.options=t}}let r="d577a785bc98d866dd1360f3cbfaa58de9279dc9",o=(()=>{let e=new l("https://api.waqi.info/v2/map/bounds?latlng=".concat(0,",").concat(0,",").concat(90,",").concat(180,"&networks=all&token=").concat(r),{useCache:!0}),t=new l("https://api.waqi.info/feed/here/?token=".concat(r));return{fetchStations:()=>e.execute(),fetchHere:()=>t.execute(),searchStation:e=>new l("https://api.waqi.info/search/?keyword=".concat(e,"&token=").concat(r),{useCache:!0}).execute(),fetchStation:e=>new l("https://api.waqi.info/v2/feed/".concat(e,"/?token=").concat(r),{useCache:!0}).execute(),fetchGeoStation:e=>{let[t,a]=e;return new l("https://api.waqi.info/feed/geo:".concat(t,";").concat(a,"/?token=").concat(r),{useCache:!0}).execute()}}})();var c=a(9327);let u=(0,s.createContext)({activeQuality:"",setActiveQuality:()=>{}}),h=e=>e>300?"#7e0023":e>200?"#8f3f97":e>150?"#ff0000":e>100?"#ff7e00":e>50?"#ffff00":"#00e400",d=e=>{let{side:t,cx:a,cy:i,ry:l,clipPath:r,data:o,xRadiusFactor:c}=e,d="left"===t,x=h(o.value),{activeQuality:f,setActiveQuality:m}=(0,s.useContext)(u),[p,g]=(0,s.useState)(0),[w,j]=(0,s.useState)(""),[y,k]=(0,s.useState)(1),b=(0,s.useRef)(null),N=(0,s.useCallback)(()=>{let e,t;if(!b.current)return;let a=b.current.getTotalLength()/2;g(a),1===o.ratio?(e="".concat(a,",").concat(a),t=d?-a/2:a/2):(e="".concat(a*o.ratio,",").concat((2-o.ratio)*a),t=d?-a/2:a*o.ratio-a/2),j(e),k(t)},[o.ratio,d]);(0,s.useLayoutEffect)(()=>{N()});let S=e=>{e.preventDefault(),m(o.name)},C=e=>{e.preventDefault(),m("")};return(0,n.jsxs)("g",{onPointerEnter:S,onPointerLeave:C,onPointerDown:S,onPointerUp:C,children:[(0,n.jsx)("ellipse",{cx:a,cy:i,fill:"none",stroke:x,strokeOpacity:0,strokeWidth:20,rx:l*c,ry:l,clipPath:r,strokeDasharray:w,strokeDashoffset:y}),(0,n.jsx)("ellipse",{ref:b,cx:a,cy:i,fill:"none",stroke:x,strokeOpacity:f&&f!==o.name?.2:1,strokeWidth:2,rx:l*c,ry:l,clipPath:r,className:"transition-all duration-500",strokeDasharray:w,strokeDashoffset:2*p,style:{transition:"stroke-dashoffset 1s",strokeDashoffset:y}})]})},x=(0,s.createContext)({height:0,width:0});var f=a(348);let m=e=>{let{x:t,y:a,px:i,py:s,text:l,clipPath:r,textColor:o,bgColor:c,opacity:u,textAnchor:h}=e,{ref:d,height:x,width:m}=(0,f.A)(),p=null!=i?i:4,g=null!=s?s:4,w="end"!==h;return(0,n.jsxs)("g",{children:[x&&m&&(0,n.jsx)("rect",{x:w?t:t-m-2*p,y:a-g-x/2,rx:"5px",height:x+2*g,width:m+2*p,fill:null!=c?c:"none",fillOpacity:null!=u?u:.6,strokeWidth:0,clipPath:r,className:"transition-all"}),(0,n.jsx)("text",{ref:d,x:t,y:a,dx:w?p:-p,alignmentBaseline:"middle",textAnchor:w?"start":"end",fill:o,fillOpacity:null!=u?u:1,clipPath:r,className:"font-light capitalize cursor-default text-xs sm:text-sm md:text-base lg:text-lg transition-all select-none",children:l})]})},p=e=>{let{side:t,cx:a,cy:i,ry:l,clipPath:r,data:o}=e,c=h(o.value),{activeQuality:d,setActiveQuality:f}=(0,s.useContext)(u),{width:p}=(0,s.useContext)(x),g=p/2,w=i+l;return(0,n.jsxs)("g",{onPointerEnter:()=>f(o.name),onPointerLeave:()=>f(""),onPointerDown:()=>f(o.name),onPointerUp:()=>f(""),children:["left"===t&&(0,n.jsx)(m,{x:Math.max(a-g+40,a-.8*g),y:w,opacity:d&&o.name!==d?.4:1,textColor:o.name===d?"black":"white",bgColor:o.name===d?"white":"black",text:o.name,clipPath:r}),(0,n.jsx)(m,{x:"left"===t?a-g:a+g,y:w,opacity:d&&o.name!==d?.4:1,textColor:o.name===d?"black":"white",bgColor:o.name===d?c:"none",text:o.value.toFixed(2).split(".00")[0],clipPath:r,textAnchor:"right"===t?"end":"start"})]})},g=e=>{let{side:t,cx:a,cy:i,ry:l,clipPath:r,data:o}=e,c=h(o.value),{activeQuality:d,setActiveQuality:f}=(0,s.useContext)(u),{width:m}=(0,s.useContext)(x),p=m/2,g=i+l;return(0,n.jsxs)("g",{onPointerEnter:()=>f(o.name),onPointerLeave:()=>f(""),onPointerDown:()=>f(o.name),onPointerUp:()=>f(""),children:[(0,n.jsx)("line",{x1:"left"===t?a-p:a,x2:"left"===t?a:a+p,y1:g,y2:g,stroke:c,strokeOpacity:"0",strokeWidth:20,rx:l/2,ry:l,clipPath:r}),(0,n.jsx)("line",{x1:"left"===t?a-p:a,x2:"left"===t?a:a+p,y1:g,y2:g,stroke:o.name===d?c:"#8b8b8b",strokeOpacity:d&&o.name!==d?.4:1,strokeWidth:"2",strokeDasharray:"5,5",rx:l/2,ry:l,clipPath:r,className:"transition-all duration-500"})]})},w=10,j=e=>{let{side:t,data:a}=e,i="left"===t,l=(0,s.useContext)(x),{height:r}=l,o=l.width/2,c="AqiViz-fingerprint-".concat(t),u="url(#".concat(c,")"),h=r/2,f=r/2-10,m=.6;.6*f>=o&&(m=.8*o/f);let j=Math.max((f-w)/a.data.length,30);return(0,n.jsxs)("g",{children:[(0,n.jsx)("clipPath",{id:c,children:(0,n.jsx)("rect",{x:i?0:o,y:"0",height:r,width:o})}),null==a?void 0:a.data.map((e,i)=>(0,n.jsx)(g,{data:e,side:t,cx:o,cy:h,ry:f-j*i,clipPath:u},"axis-".concat(a.name,"-").concat(e.name))),null==a?void 0:a.data.map((e,i)=>(0,n.jsx)(d,{data:e,side:t,cx:o,cy:h,ry:f-j*i,clipPath:u,xRadiusFactor:m},"quality-".concat(a.name,"-").concat(e.name))),null==a?void 0:a.data.map((e,i)=>(0,n.jsx)(p,{data:e,side:t,cx:o,cy:h,ry:f-j*i,clipPath:u},"labels-".concat(a.name,"-").concat(e.name)))]})},y=()=>{let{ref:e,height:t,width:a}=(0,f.A)(),[n,i]=(0,s.useState)(0),[l,r]=(0,s.useState)(0);return(0,s.useEffect)(()=>{i(a||0),r(t||0)},[a,t]),{svgRef:e,height:l,width:n}};var k=a(710);let b=()=>(0,n.jsx)(k.AhV,{"aria-label":"spinning-loader",className:"size-10 animate-spin text-white"}),N=e=>{let{leftAqiData:t,rightAqiData:a}=e,{svgRef:i,width:l,height:r}=y(),[o,c]=(0,s.useState)(""),[h,d]=(()=>{let e={name:t.name,data:[]},n={name:a.name,data:[]},i=Object.keys(a.values);return Object.keys(t.values).filter(e=>i.includes(e)).forEach(i=>{var s,l;let r=null!==(s=t.values[i])&&void 0!==s?s:0,o=null!==(l=a.values[i])&&void 0!==l?l:0;e.data.push({name:i,value:r,ratio:Math.min(1,r/o)}),n.data.push({name:i,value:o,ratio:Math.min(1,o/r)})}),[e,n]})();return(0,n.jsx)(x,{value:{height:r,width:l},children:(0,n.jsx)(u,{value:{activeQuality:o,setActiveQuality:c},children:l&&r&&h&&d?(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("div",{ref:i,className:"relative w-full h-full flex items-center justify-center",children:(0,n.jsxs)("svg",{width:"100%",height:"100%",id:"ContainerSVG",children:[(0,n.jsx)("defs",{id:"F1DataVisDefs"}),(0,n.jsx)(j,{side:"left",data:h}),(0,n.jsx)(j,{side:"right",data:d}),(0,n.jsx)("line",{x1:l/2,x2:l/2,y1:0,y2:r,stroke:"white",strokeOpacity:"0.7",strokeWidth:3})]})})}):(0,n.jsx)("div",{ref:i,className:"relative w-full h-full flex justify-center items-center",children:(0,n.jsx)(b,{})})})})},S={region:{read:e=>{if(!e)return;let[t,a,n,i]=e.split("&");return t&&a&&n&&i?{name:t,id:a,geo:[+n,+i]}:void 0},write:e=>"".concat(e.name,"&").concat(e.id).concat(e.geo?"&".concat(e.geo[0],"&").concat(e.geo[1]):"")}};var C=a(9219),P=a(2596),A=a(2515),q=a(7509);let D=e=>{let{elementsType:t}=e;return(0,n.jsxs)("div",{className:"flex h-full w-full flex-col items-center justify-center",children:[(0,n.jsx)(q.aj9,{className:"size-24 animate-bounce text-white"}),(0,n.jsx)("p",{className:"text-center text-lg text-white",children:"No ".concat(t||"results"," found, please try another query.")})]})},O=e=>{let{query:t,placeholder:a,options:i,select:l}=e,r="dropdown-".concat((0,s.useId)()),o=(e,a)=>{l(e),t.value="",a()};return(0,n.jsx)(C.AM,{children:e=>{let{open:s}=e;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:(0,P.A)("relative w-full"),children:[(0,n.jsx)(C.ut,{className:(0,P.A)(s?"invisible":"","relative p-2 pr-8 rounded-lg pointer-events-auto block w-full","text-start text-sm/6 font-semibold outline-2","text-white/40 focus-within:text-white/100 focus:text-white/100   hover:text-white/100 ","outline-white/40 focus-within:outline-white/100 focus:outline-white/100  hover:outline-white/100"),children:a}),s&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("input",{className:(0,P.A)("absolute inset-0 left-0 top-0","p-2 pr-8 rounded-lg pointer-events-auto w-full","text-start text-sm/6 font-semibold outline-2","text-white/40 focus-within:text-white/100 focus:text-white/100   hover:text-white/100 ","outline-white/40 focus-within:outline-white/100 focus:outline-white/100  hover:outline-white/100"),autoFocus:!0,type:"text",placeholder:a,value:t.value,onChange:e=>{let{target:a}=e;return t.value=a.value}}),(0,n.jsx)("button",{className:"group absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer",onPointerDownCapture:()=>t.value="",children:(0,n.jsx)(A.Tfw,{className:"size-4 text-white group-hover:opacity-75"})})]})]}),(0,n.jsx)(C.QT,{transition:!0,anchor:{to:"bottom",gap:5},className:"pointer-events-auto transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0",children:e=>{let{close:a}=e;return(0,n.jsx)("div",{className:(0,P.A)("p-4 overflow-hidden rounded-xl","[--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 ","bg-black/80","transition duration-200 ease-in-out"),children:(0,n.jsx)("div",{className:(0,P.A)(" w-80 max-h-80 max-w-full min-h-64 overflow-y-auto","flex flex-row items-center",(null==i?void 0:i.length)?"flex-wrap":t.value.length?"justify-center":"invisible pointer-events-none"),children:(null==i?void 0:i.length)&&i.map(e=>(0,n.jsx)("button",{onClick:()=>o(e,a),className:"text-start px-4 rounded-lg py-2 text-sm text-gray-300 hover:bg-blue-300/30 active:bg-blue-300/30 data-focus:outline-hidden",children:e.value},"".concat(r,"-option-").concat(e.id)))||t.value.length&&(!i&&(0,n.jsx)(D,{})||(0,n.jsx)(b,{}))})})}})]})}})},E=e=>{let[t,a]=(0,s.useState)(e);return{set value(v){a(v)},get value(){return t}}};var L=a(2064);let z=e=>{let{setLeftRegion:t,setRightRegion:a,leftName:i,rightName:l,children:r}=e,[c,u]=(0,s.useState)([]),[h,d]=(0,s.useState)([]),x=E(""),f=E("");return(0,L.A)(async()=>{if(!x.value){u([]);return}c||u([]),o.searchStation(x.value).then(e=>{if(console.log("Stations found: ".concat(e)),!(null==e?void 0:e.length)){u(void 0);return}u(e.map(e=>({value:e.station.name,id:e.uid.toString(),data:e})))})},300,[x.value]),(0,L.A)(async()=>{if(!f.value){d([]);return}h||d([]),o.searchStation(f.value).then(e=>{if(!(null==e?void 0:e.length)){d(void 0);return}d(e.map(e=>({value:e.station.name,id:e.uid.toString(),data:e})))})},300,[f.value]),(0,n.jsxs)("div",{className:"h-full w-full flex flex-col justify-between gap-2 p-4 overflow-hidden",children:[(0,n.jsxs)("div",{className:"w-full flex justify-around gap-4",children:[(0,n.jsx)("div",{className:"grow w-10 max-w-60",children:(0,n.jsx)(O,{query:x,placeholder:"Search for a station...",options:c,select:e=>t(e.data)})}),(0,n.jsx)("div",{className:"grow w-10 max-w-60",children:(0,n.jsx)(O,{query:f,placeholder:"Search for a station...",options:h,select:e=>a(e.data)})})]}),(0,n.jsx)("div",{className:"w-full h-auto grow flex justify-center items-center",children:r}),(0,n.jsxs)("div",{className:"w-full flex items-start text-base sm:text-lg md:text-xl font-extralight text-blue-400",children:[(0,n.jsx)("div",{className:"grow flex justify-center max-w-1/2 text-center ",children:(0,n.jsx)("span",{className:"pr-4 md:pr-6 lg:pr-10 transition capitalize select-none",children:i})}),(0,n.jsx)("div",{className:"grow flex justify-center max-w-1/2 text-center ",children:(0,n.jsx)("span",{className:"pl-4 md:pl-6 lg:pl-10 transition capitalize select-none",children:l})})]})]})},F=()=>{let[e,t]=(0,s.useState)({name:"",id:"",values:{}}),[a,l]=(0,s.useState)({name:"",id:"",values:{}}),[r,u]=(0,c.A)("fingerprint-viz-left-region",S.region.write(i)),[h,d]=(0,c.A)("fingerprint-viz-right-region",S.region.write(i)),x=(0,s.useCallback)(a=>{let n=a.uid.toString(),s=a.station.name,l=a.station.geo;if(n!==e.id&&s!==e.name){if(!n||s===i.name){t(i),u(S.region.write(i));return}(async()=>{(l?o.fetchGeoStation(l):o.fetchStation(n)).then(e=>{e&&(t({name:s,id:n,values:Object.keys(e.iaqi).reduce((t,a)=>({...t,[a]:e.iaqi[a].v}),{})}),u(S.region.write({name:s,id:n,geo:l})))})})()}},[u,e]),f=(0,s.useCallback)(e=>{let t=e.uid.toString(),n=e.station.name,s=e.station.geo;if(t!==a.id&&n!==a.name){if(!t||n===i.name){l(i),d(S.region.write(i));return}(async()=>{(s?o.fetchGeoStation(s):o.fetchStation(t)).then(e=>{e&&(l({name:n,id:t,values:Object.keys(e.iaqi).reduce((t,a)=>({...t,[a]:e.iaqi[a].v}),{})}),d(S.region.write({name:n,id:t,geo:s})))})})()}},[d,a]);return(0,s.useEffect)(()=>{if(!e.name){let e=S.region.read(r);x(e?{station:{name:e.name,geo:e.geo},uid:e.id}:{station:{name:i.name},uid:i.id})}if(!a.name){let e=S.region.read(h);f(e?{station:{name:e.name,geo:e.geo},uid:e.id}:{station:{name:i.name},uid:i.id})}}),(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(z,{leftName:e.name,rightName:a.name,setLeftRegion:x,setRightRegion:f,children:(0,n.jsx)(N,{leftAqiData:e,rightAqiData:a})})})}}},e=>{var t=t=>e(e.s=t);e.O(0,[506,479,603,545,124,441,684,358],()=>t(1824)),_N_E=e.O()}]);