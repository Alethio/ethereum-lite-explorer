(window["__webpackJsonp"]=window["__webpackJsonp"]||[]).push([[4],{"2LqZ":function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n("ETTr");var a=n("ERkP");var i=n.n(a);const o=({children:e,className:t})=>a["createElement"]("div",{className:t},e);const l=Object(r["b"])(o)`
    font-size: 12px;
    line-height: 12px;
    height: 12px;
    text-transform: uppercase;
    background-color: ${e=>e.arrow?e.disabled?e.theme.colors.arrowLabelBgDisabled:e.theme.colors.arrowLabelBg:"transparent"};
    font-weight: 600;
    letter-spacing: .5px;
    padding: 4px 8px;
    margin-right: ${e=>e.arrow?"10px":"0"};
    color: ${e=>e.arrow?e.theme.colors.arrowLabel:e.theme.colors.label};

    /**
     * When is the first label in a row the width of the container (LayoutRowItemWrapper) is 200px + 2*8px padding,
     * and the display: flex along with justify-content: flex-end ensures that the label is right aligned.
     * However, if the label is long enough (bigger than 200px) to wrap, the Label div will occupy all the container
     * width, and the text will be aligned to right thanks to the rule below.
     */
    text-align: right;

    ${e=>e.arrow?r["a"]`
    position: relative;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: -10px;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 10px solid ${e.disabled?e.theme.colors.arrowLabelBgDisabled:e.theme.colors.arrowLabelBg};
        transform: scaleX(.8);
        transform-origin: center left;
    }
    `:""}
`},"4gox":function(e,t,n){"use strict";var r=n("D57K");var a=n("ERkP");var i=n("ETTr");class o extends a["Component"]{constructor(){super(...arguments);this.divWidth=0;this.onResize=(()=>{this.props.onResize&&this.props.onResize(this.divWidth)});this.handleResize=(()=>{if(this.divElement){this.divWidth=this.divElement.clientWidth;this.onResize()}})}render(){return a["createElement"]("div",{className:this.props.className,ref:e=>{this.divElement=e}},this.props.children)}componentDidMount(){window.addEventListener("resize",this.handleResize);this.handleResize()}componentWillUnmount(){window.removeEventListener("resize",this.handleResize)}}const l=Object(i["b"])(o)`
    display: ${({smallScreen:e})=>e?"block":"flex"};
    ${({centerContent:e})=>e?i["a"]`
        justify-content: center;
    `:""};
`;var s=n("H8JU");var c=n("JkUX");n.d(t,"a",function(){return u});let u=class e extends a["Component"]{constructor(){super(...arguments);this.smallScreen=!1;this.isFirstLabelIgnored=!1;this.onResize=(e=>{this.smallScreen=!!this.props.minWidth&&e<=this.props.minWidth;if(!this.props.responsive||!this.props.responsive.ignoreFirstLabel)return;this.isFirstLabelIgnored="forLowRes"===this.props.responsive.ignoreFirstLabel&&e<540||"forMobile"===this.props.responsive.ignoreFirstLabel&&e<460})}isLayoutRowItemInstance(e){let t=!1;try{const n=e.type;t="layoutRowItem"===n._brand}catch(e){}return t}render(){let e=0;return this.smallScreen?a["Children"].map(this.props.children,e=>{if(null===e||void 0===e)return e;const t=this.isLayoutRowItemInstance(e);return a["createElement"](l,{smallScreen:this.smallScreen,onResize:this.onResize,centerContent:this.isFirstLabelIgnored},t?a["cloneElement"](e,{isBeginningOfRow:!0,fullRow:!0,ignoreFirstLabel:this.isFirstLabelIgnored}):e)}):a["createElement"](l,{smallScreen:this.smallScreen,onResize:this.onResize,centerContent:this.isFirstLabelIgnored},a["Children"].map(this.props.children,t=>{if(null===t||void 0===t)return t;const n=this.isLayoutRowItemInstance(t);return n?a["cloneElement"](t,{isBeginningOfRow:!e++||this.smallScreen,ignoreFirstLabel:this.isFirstLabelIgnored}):t}))}};r["__decorate"]([s["k"]],u.prototype,"smallScreen",void 0);r["__decorate"]([s["k"]],u.prototype,"isFirstLabelIgnored",void 0);u=r["__decorate"]([c["b"]],u)},BfMB:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n("ERkP");var a=n.n(r);var i=n("Dq9N");var o=n("MjIO");class l extends r["Component"]{render(){let{value:e,locale:t}=this.props;return"number"!=typeof e?(new o["a"]).format(e,t):(new i["a"]).format(e,t)}}},Dq9N:function(e,t,n){"use strict";n.d(t,"a",function(){return r});class r{format(e,t){return e.toLocaleString(t)}}},HAGo:function(e,t,n){"use strict";var r=n("D57K");var a=n("ERkP");var i=n("H8JU");var o=n("JkUX");var l=n("JiL2");var s=n("JhAV");const c={future:"in %s",past:"%s ago",s:"1 second",ss:"%d seconds",m:"1 minute",mm:"%d minutes",h:"1 hour",hh:"%d hours",d:"1 day",dd:"%d days",M:"1 month",MM:"%d months",y:"1 year",yy:"%d years"};let u={years:"y",months:"M",days:"d",hours:"h",minutes:"m",seconds:"s"};class m{constructor(e=c){this.translations=e}formatDiff(e,t){let n=this.format(e,t);return this.formatRelativeTime(n,e<t)}formatInterval(e){let t=(new Date).getTime();let n=t-e;return this.format(t,n)}format(e,t){let n=s(new Date(e),new Date(t));let r=["years","months","days","hours","minutes","seconds"];let a=r.findIndex(e=>0!==n[e]);if(-1===a)return this.humanizeDiffUnit(0,"seconds");{let e="";let t=r[a];e+=this.humanizeDiffUnit(n[t],t);if(a+2<r.length){let t=r[a+1];0!==n[t]&&(e+=" "+this.humanizeDiffUnit(n[t],t))}return e}}humanizeDiffUnit(e,t){let n=1===e?u[t]:u[t]+u[t];return this.translations[n].replace(/%d/i,""+e)}formatRelativeTime(e,t){return this.translations[t?"future":"past"].replace(/%s/i,e)}}var d=n("X2/K");const p=5;class h extends a["Component"]{constructor(){super(...arguments);this.onMouseDown=(e=>{this.mouseDownCoords={x:e.clientX,y:e.clientY}});this.onMouseUp=(e=>{Math.abs(e.clientX-this.mouseDownCoords.x)<=this.threshold&&Math.abs(e.clientY-this.mouseDownCoords.y)<=this.threshold&&this.props.onClick()})}get threshold(){return this.props.threshold}render(){return a["createElement"]("div",{onMouseDown:this.onMouseDown,onMouseUp:this.onMouseUp},this.props.children)}}h.defaultProps={threshold:5};var g=n("ETTr");var f=n("4qYS");n.d(t,"a",function(){return x});const v=g["b"].div`
    user-select: none;
    cursor: pointer;
`;const b=g["b"].div`
    margin: 0 0 0 16px;
`;var E;!function(e){e[e["AbsoluteTime"]=0]="AbsoluteTime";e[e["RelativeTime"]=1]="RelativeTime"}(E||(E={}));let x=class e extends a["Component"]{constructor(){super(...arguments);this.displayMode=E.RelativeTime;this.cycleDisplayMode=(()=>{if(this.displayMode===E.RelativeTime)this.displayMode=E.AbsoluteTime;else{if(this.displayMode!==E.AbsoluteTime)throw new Error(`Unknown display mode "${this.displayMode}`);this.displayMode=E.RelativeTime}});this.updateCurrentTime=(()=>{this.currentTime=Math.floor(Date.now()/1e3);this.timeoutId=setTimeout(this.updateCurrentTime,this.computeRefreshInterval())})}componentDidMount(){this.updateCurrentTime()}componentDidUpdate(e){if(this.props.timestamp!==e.timestamp){this.timeoutId&&clearTimeout(this.timeoutId);this.updateCurrentTime()}}componentWillUnmount(){this.timeoutId&&clearTimeout(this.timeoutId)}render(){let e;if(this.displayMode===E.RelativeTime)e=new m(this.props.translations).formatDiff(1e3*this.currentTime,1e3*this.props.timestamp);else{if(this.displayMode!==E.AbsoluteTime)throw new Error(`Unsupported display mode "${E[this.displayMode]}"`);e=new Date(1e3*this.props.timestamp).toLocaleDateString(this.props.locale,{timeZone:"UTC",timeZoneName:"short",year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})}let t=a["createElement"](l["a"],{variant:this.props.variant},a["createElement"](v,null,e));return a["createElement"](d["a"],{content:a["createElement"]("div",{style:{display:"flex",alignItems:"center"}},a["createElement"]("div",null,this.props.timestamp),a["createElement"](b,null,a["createElement"](f["a"],{value:""+this.props.timestamp,clipboard:this.props.clipboard})))},this.props.nonclickable?t:a["createElement"](h,{onClick:this.cycleDisplayMode},t))}computeRefreshInterval(){return this.currentTime-this.props.timestamp>60?6e4:1e3}};r["__decorate"]([i["k"]],x.prototype,"currentTime",void 0);r["__decorate"]([i["k"]],x.prototype,"displayMode",void 0);x=r["__decorate"]([o["b"]],x)},JhAV:function(e,t,n){"use strict";e.exports=function e(t,n){const r=[-1/0,1,1,0,0,0,0];const a=[1/0,12,null,24,60,60,1e3];if(n<t){const e=n;n=t;t=e}let i=[t.getUTCFullYear(),t.getUTCMonth()+1,t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds(),t.getUTCMilliseconds()],o=[n.getUTCFullYear(),n.getUTCMonth()+1,n.getUTCDate(),n.getUTCHours(),n.getUTCMinutes(),n.getUTCSeconds(),n.getUTCMilliseconds()],l=7;const s=e=>{--o[e];for(;o[e]<r[e];){const t=s(e-1);o[e]+=null===a[e]?t:a[e]}return 1===e?new Date(Date.UTC(o[0],o[1],0)).getUTCDate():a[e+1]};for(;l>0;){let e=o[--l]-i[l];for(;e<0;){o[l]+=s(l-1);e=o[l]-i[l]}o[l]=e}return{years:o[0],months:o[1],days:o[2],hours:o[3],minutes:o[4],seconds:o[5],milliseconds:o[6]}}},MjIO:function(e,t,n){"use strict";function r(e,t){let n=Intl.NumberFormat(e);if(n.formatToParts)return n.formatToParts(1000.1).find(e=>e.type===t).value;return"group"===t?1e3.toLocaleString().replace(/[0-9]/g,""):1.1.toLocaleString().replace(/[0-9]/g,"")}n.d(t,"a",function(){return a});class a{static getBnFormat(e){let t=this.formats.get(e);if(!t){t={decimalSeparator:r(e,"decimal"),groupSeparator:r(e,"group"),groupSize:3};this.formats.set(e,t)}return t}format(e,t,n={}){let r=a.getBnFormat(t);e=e.decimalPlaces(void 0!==n.maximumFractionDigits?n.maximumFractionDigits:3);if(void 0!==n.minimumFractionDigits){let t;if(e.decimalPlaces()<n.minimumFractionDigits)return e.toFormat(n.minimumFractionDigits,r)}return e.toFormat(r)}}a.formats=new Map},VV7E:function(e,t,n){"use strict";var r=n("ERkP");var a=n("JiL2");class i{constructor(e){this.bigNumberFormatter=e}format(e,t){let n=["H","KH","MH","GH","TH","PH"];for(let r=n.length-1;r>=0;--r){let a=e.shiftedBy(-3*r);if(!r||a.isGreaterThanOrEqualTo(1))return this.bigNumberFormatter.format(a,t)+" "+n[r]}throw new Error("Should be unreachable")}}var o=n("MjIO");n.d(t,"a",function(){return l});class l extends r["Component"]{render(){let e=new i(new o["a"]);return r["createElement"](a["a"],null,e.format(this.props.value,this.props.locale))}}},eiyX:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n("ERkP");var a=n.n(r);var i=n("JiL2");var o=n("BfMB");class l extends r["Component"]{render(){let{value:e,locale:t}=this.props;return r["createElement"](i["a"],null,r["createElement"](o["a"],{value:e,locale:t}))}}},oTso:function(e,t,n){"use strict";var r=n("ERkP");var a=n("ETTr");var i=n("X2/K");var o=n("vHDT");function l(e){let t="";for(let n=0;n<e.length;n+=2)t+=String.fromCharCode(parseInt(e.substr(n,2),16));return t}const s=a["b"].div`
    padding: 14px 0;
    white-space: pre;
`;const c=a["b"].div`
    padding: 2px 8px;
    margin: 8px 0;
    background: ${e=>e.theme.colors.rawDataBackground};
    color: ${e=>e.theme.colors.rawDataText};
    width: fit-content;
    font-family: "Roboto Mono", monospace;
    font-size: 14px;
    line-height: 16px;

    &:first-child {
        margin-top: 0;
    }

    &:last-child {
        margin-bottom: 0;
    }

    &:empty {
        display: none;
    }
`;class u extends r["Component"]{render(){return r["createElement"](s,null,this.props.children.split(/\r?\n/).map((e,t)=>r["createElement"](c,{key:t},e)))}}var m=n("XlMW");n.d(t,"a",function(){return p});const d=a["b"].div`
    margin: 0 8px 0 16px;
`;class p extends r["PureComponent"]{constructor(){super(...arguments);this.copyExtraData=(()=>{this.props.clipboard.copy("0x"+this.props.data.replace(/^0x/,""))})}render(){let{data:e}=this.props;return r["createElement"](i["a"],{content:r["createElement"]("div",{style:{display:"flex",alignItems:"center"}},r["createElement"]("div",null,"0x"+e.replace(/^0x/,"")),r["createElement"](d,null,r["createElement"](o["a"],{Icon:m["a"],color:e=>e.colors.copyIcon,onClick:this.copyExtraData})))},r["createElement"](u,null,l(e)))}}},opp1:function(e,t,n){"use strict";var r=n("HAGo");var a=n("ERkP");var i=n.n(a);function o(e){return{future:e.get("general.relativeTime.future"),past:e.get("general.relativeTime.past"),s:e.get("general.relativeTime.s"),ss:e.get("general.relativeTime.ss"),m:e.get("general.relativeTime.m"),mm:e.get("general.relativeTime.mm"),h:e.get("general.relativeTime.h"),hh:e.get("general.relativeTime.hh"),d:e.get("general.relativeTime.d"),dd:e.get("general.relativeTime.dd"),M:e.get("general.relativeTime.M"),MM:e.get("general.relativeTime.MM"),y:e.get("general.relativeTime.y"),yy:e.get("general.relativeTime.yy")}}n.d(t,"a",function(){return l});class l extends i.a.Component{render(){return i.a.createElement(r["a"],Object.assign({},this.props,{translations:o(this.props.translation)}))}}},pyjp:function(e,t,n){"use strict";n.d(t,"a",function(){return s});var r=n("D57K");var a=n("ERkP");var i=n.n(a);var o=n("h7ob");var l=n("JkUX");let s=class e extends a["Component"]{render(){let{noLink:e}=this.props;return a["createElement"](o["a"],{colors:e=>({background:e.colors.unclesBoxBg,text:e.colors.unclesBoxText}),variant:this.props.variant,linkTo:e?void 0:e=>e.getUncle(this.props.blockNr,this.props.uncleIndex),clipboard:this.props.clipboard},this.props.children)}};s=r["__decorate"]([l["b"]],s)},rnM1:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var r=n("ERkP");var a=n.n(r);var i=n("h7ob");const o=({children:e,variant:t,Icon:n,noLink:a,clipboard:o})=>r["createElement"](i["a"],{colors:e=>({background:e.colors.addressHashBoxBg,text:e.colors.valueBox.primary.text}),variant:t,Icon:n,linkTo:a?void 0:t=>t.getAccount(e),clipboard:o},e)},yjHU:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n("ERkP");var a=n.n(r);var i=n("JiL2");var o=n("lQ5N");const l=({children:e})=>r["createElement"](i["a"],null,r["createElement"](o["a"],null,e))},yoTl:function(e,t,n){"use strict";n.r(t);var r=n("ERkP");var a=n("4gox");var i=n("zPJy");var o=n("2LqZ");var l=n("JiL2");class s extends r["Component"]{render(){let{children:e,variant:t}=this.props;return r["createElement"](l["a"],{colors:e=>({background:e.colors.unclesBoxBg,text:e.colors.unclesBoxText,border:e.colors.unclesBoxBorder}),variant:t},"#",e)}}var c=n("opp1");var u=n("pyjp");var m=n("/xco");var d=n("yjHU");var p=n("rnM1");var h=n("eiyX");var g=n("VV7E");var f=n("oTso");var v=n("tpOg");n.d(t,"UncleContent",function(){return b});class b extends r["PureComponent"]{render(){let{translation:e,uncleDetails:t,clipboard:n,locale:b}=this.props;return r["createElement"](r["Fragment"],null,r["createElement"](a["a"],{minWidth:900},r["createElement"](i["a"],null,r["createElement"](o["a"],null,e.get("uncleView.content.uncleNumber.label")),r["createElement"](s,null,t.id)),r["createElement"](i["a"],null,t.creationTime?r["createElement"](r["Fragment"],null,r["createElement"](o["a"],null,e.get("blockView.content.blockCreationTime.label")),r["createElement"](c["a"],{timestamp:t.creationTime,translation:e,locale:b,clipboard:n})):null),void 0!==t.position?r["createElement"](i["a"],null,r["createElement"](o["a"],null,e.get("uncleView.content.position.label")),r["createElement"](l["a"],null,t.position)):null),r["createElement"](a["a"],{minWidth:760},r["createElement"](i["a"],null,r["createElement"](o["a"],null,e.get("general.hash")),r["createElement"](u["a"],{clipboard:n,noLink:!0,blockNr:t.parentId,uncleIndex:0},t.hash)),t.parentId?r["createElement"](i["a"],null,r["createElement"](o["a"],null,e.get("uncleView.content.includedBy.label")),r["createElement"](m["a"],null,t.parentId)):null),r["createElement"](a["a"],null,r["createElement"](i["a"],null,r["createElement"](o["a"],null,e.get("general.nonce")),r["createElement"](d["a"],null,t.nonce))),t.sha3uncles?r["createElement"](a["a"],null,r["createElement"](i["a"],null,r["createElement"](o["a"],null,e.get("blockView.content.sha3Uncles.label")),r["createElement"](v["a"],{clipboard:n},t.sha3uncles))):null,t.beneficiaryAddress?r["createElement"](a["a"],null,r["createElement"](i["a"],{fullRow:!0},r["createElement"](o["a"],null,e.get("blockView.content.beneficiary.label")),r["createElement"](p["a"],{clipboard:n},t.beneficiaryAddress))):null,r["createElement"](a["a"],null,r["createElement"](i["a"],null,r["createElement"](o["a"],null,e.get("general.gasLimit")),r["createElement"](h["a"],{value:t.gasLimit,locale:b}))),r["createElement"](a["a"],null,r["createElement"](i["a"],null,r["createElement"](o["a"],null,e.get("blockView.content.difficulty.label")),r["createElement"](g["a"],{value:t.difficulty,locale:b}))),t.extraData?r["createElement"](a["a"],null,r["createElement"](i["a"],null,r["createElement"](o["a"],null,e.get("blockView.content.extraData.label")),r["createElement"](f["a"],{data:t.extraData,clipboard:n}))):null,t.mixHash?r["createElement"](a["a"],null,t.mixHash?r["createElement"](i["a"],null,r["createElement"](o["a"],null,e.get("blockView.content.mixHash.label")),r["createElement"](v["a"],{clipboard:n},t.mixHash)):[]):null)}}},zPJy:function(e,t,n){"use strict";var r=n("ERkP");var a=n("ETTr");const i=({children:e,className:t})=>r["createElement"]("div",{className:t},e);const o=Object(a["b"])(i)`
    display: flex;
    align-items: center;
    /* put this to auto for tx alignment */
    height: ${({autoHeight:e,baseHeight:t})=>e?"auto":t?t+"px":"48px"};
    padding: 0 8px;
    /* flex: 0 0 auto; put this to 1 1 for tx wrapping */
    flex: ${({autoHeight:e})=>e?"1 1":"0 0"} auto;
    width: ${e=>e.isBeginningOfRow&&!e.autoWidth?"200px":"auto"};
    justify-content: ${e=>e.justifyContent?e.justifyContent:e.isBeginningOfRow?"flex-end":"inherit"};

    @media ${e=>e.theme.mediaQueries.breakPoints.smallerThanFullView} {
        width: auto;
        min-width: ${e=>e.isBeginningOfRow&&!e.autoWidth?"125px":"auto"};
    }

    @media ${e=>e.theme.mediaQueries.breakPoints.lessThan620px} {
        width: auto;
        min-width: ${e=>e.isBeginningOfRow&&!e.autoWidth?"95px":"auto"};
    }
`;var l=n("kvVz");n.d(t,"a",function(){return d});const s=({children:e,className:t})=>r["createElement"]("div",{className:t},e);const c=Object(a["b"])(s)`
    display: flex;
    flex: ${e=>e.fullRow?"1 1":"0 0"} auto;
`;const u=({children:e,className:t})=>r["createElement"]("div",{className:t},e);const m=Object(a["b"])(u)`
    display: flex;
    flex: ${({fullRow:e})=>e?"1 1":"0 1"} auto;
    flex-wrap: wrap;
`;class d extends r["PureComponent"]{render(){const e=r["Children"].toArray(this.props.children).reduce((e,t)=>{l["isFragment"](t)?e.push(...r["Children"].map(t.props.children,e=>{if(!l["isElement"](e)){console.error("Fragment passed to LayoutRowItem contains a child that is not a React.Element.",e);return e}return r["cloneElement"](e,{})})):e.push(t);return e},[]);const t=e.shift();return r["createElement"](c,{fullRow:this.props.fullRow},this.props.ignoreFirstLabel?null:r["createElement"](o,{isBeginningOfRow:this.props.isBeginningOfRow,baseHeight:this.props.baseHeight,autoWidth:this.props.autoWidth},t),1===e.length?this.childrenArrayRender(e):r["createElement"](m,{fullRow:this.props.fullRow},this.childrenArrayRender(e)))}childrenArrayRender(e){return e.map((e,t)=>r["createElement"](o,{baseHeight:this.props.baseHeight,autoHeight:this.props.autoHeight,autoWidth:this.props.autoWidth,key:t},e))}}d._brand="layoutRowItem"}}]);
//# sourceMappingURL=0c18767d0e19bf8edade.bundle.js.map