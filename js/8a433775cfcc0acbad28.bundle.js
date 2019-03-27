(window["__webpackJsonp"]=window["__webpackJsonp"]||[]).push([[6],{"2LqZ":function(e,t,r){"use strict";r.d(t,"a",function(){return s});var o=r("ETTr");var n=r("ERkP");var i=r.n(n);const a=({children:e,className:t})=>n["createElement"]("div",{className:t},e);const s=Object(o["b"])(a)`
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

    ${e=>e.arrow?o["a"]`
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
`},BfMB:function(e,t,r){"use strict";r.d(t,"a",function(){return s});var o=r("ERkP");var n=r.n(o);var i=r("Dq9N");var a=r("MjIO");class s extends o["Component"]{render(){let{value:e,locale:t}=this.props;return"number"!=typeof e?(new a["a"]).format(e,t):(new i["a"]).format(e,t)}}},Dq9N:function(e,t,r){"use strict";r.d(t,"a",function(){return o});class o{format(e,t){return e.toLocaleString(t)}}},HAGo:function(e,t,r){"use strict";var o=r("D57K");var n=r("ERkP");var i=r("H8JU");var a=r("JkUX");var s=r("JiL2");var l=r("JhAV");const c={future:"in %s",past:"%s ago",s:"1 second",ss:"%d seconds",m:"1 minute",mm:"%d minutes",h:"1 hour",hh:"%d hours",d:"1 day",dd:"%d days",M:"1 month",MM:"%d months",y:"1 year",yy:"%d years"};let p={years:"y",months:"M",days:"d",hours:"h",minutes:"m",seconds:"s"};class h{constructor(e=c){this.translations=e}formatDiff(e,t){let r=this.format(e,t);return this.formatRelativeTime(r,e<t)}formatInterval(e){let t=(new Date).getTime();let r=t-e;return this.format(t,r)}format(e,t){let r=l(new Date(e),new Date(t));let o=["years","months","days","hours","minutes","seconds"];let n=o.findIndex(e=>0!==r[e]);if(-1===n)return this.humanizeDiffUnit(0,"seconds");{let e="";let t=o[n];e+=this.humanizeDiffUnit(r[t],t);if(n+2<o.length){let t=o[n+1];0!==r[t]&&(e+=" "+this.humanizeDiffUnit(r[t],t))}return e}}humanizeDiffUnit(e,t){let r=1===e?p[t]:p[t]+p[t];return this.translations[r].replace(/%d/i,""+e)}formatRelativeTime(e,t){return this.translations[t?"future":"past"].replace(/%s/i,e)}}var d=r("X2/K");const u=5;class m extends n["Component"]{constructor(){super(...arguments);this.onMouseDown=(e=>{this.mouseDownCoords={x:e.clientX,y:e.clientY}});this.onMouseUp=(e=>{Math.abs(e.clientX-this.mouseDownCoords.x)<=this.threshold&&Math.abs(e.clientY-this.mouseDownCoords.y)<=this.threshold&&this.props.onClick()})}get threshold(){return this.props.threshold}render(){return n["createElement"]("div",{onMouseDown:this.onMouseDown,onMouseUp:this.onMouseUp},this.props.children)}}m.defaultProps={threshold:5};var g=r("ETTr");var f=r("4qYS");r.d(t,"a",function(){return C});const b=g["b"].div`
    user-select: none;
    cursor: pointer;
`;const x=g["b"].div`
    margin: 0 0 0 16px;
`;var v;!function(e){e[e["AbsoluteTime"]=0]="AbsoluteTime";e[e["RelativeTime"]=1]="RelativeTime"}(v||(v={}));let C=class e extends n["Component"]{constructor(){super(...arguments);this.displayMode=v.RelativeTime;this.cycleDisplayMode=(()=>{if(this.displayMode===v.RelativeTime)this.displayMode=v.AbsoluteTime;else{if(this.displayMode!==v.AbsoluteTime)throw new Error(`Unknown display mode "${this.displayMode}`);this.displayMode=v.RelativeTime}});this.updateCurrentTime=(()=>{this.currentTime=Math.floor(Date.now()/1e3);this.timeoutId=setTimeout(this.updateCurrentTime,this.computeRefreshInterval())})}componentDidMount(){this.updateCurrentTime()}componentDidUpdate(e){if(this.props.timestamp!==e.timestamp){this.timeoutId&&clearTimeout(this.timeoutId);this.updateCurrentTime()}}componentWillUnmount(){this.timeoutId&&clearTimeout(this.timeoutId)}render(){let e;if(this.displayMode===v.RelativeTime)e=new h(this.props.translations).formatDiff(1e3*this.currentTime,1e3*this.props.timestamp);else{if(this.displayMode!==v.AbsoluteTime)throw new Error(`Unsupported display mode "${v[this.displayMode]}"`);e=new Date(1e3*this.props.timestamp).toLocaleDateString(this.props.locale,{timeZone:"UTC",timeZoneName:"short",year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})}let t=n["createElement"](s["a"],{variant:this.props.variant},n["createElement"](b,null,e));return n["createElement"](d["a"],{content:n["createElement"]("div",{style:{display:"flex",alignItems:"center"}},n["createElement"]("div",null,this.props.timestamp),n["createElement"](x,null,n["createElement"](f["a"],{value:""+this.props.timestamp,clipboard:this.props.clipboard})))},this.props.nonclickable?t:n["createElement"](m,{onClick:this.cycleDisplayMode},t))}computeRefreshInterval(){return this.currentTime-this.props.timestamp>60?6e4:1e3}};o["__decorate"]([i["k"]],C.prototype,"currentTime",void 0);o["__decorate"]([i["k"]],C.prototype,"displayMode",void 0);C=o["__decorate"]([a["b"]],C)},"Jh+e":function(e,t,r){"use strict";var o=r("D57K");var n=r("ERkP");var i=r("JkUX");var a=r("ETTr");var s=r("H3xX");class l extends n["Component"]{render(){return n["createElement"](s["a"],Object.assign({},this.props),n["createElement"]("g",{stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},n["createElement"]("polygon",{points:"0 0 24 0 24 24 0 24"}),n["createElement"]("path",{d:"M12,20 C7.581722,20 4,16.418278 4,12 C4,7.581722 7.581722,4 12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 Z M12,18 C15.3137085,18 18,15.3137085 18,12 C18,8.6862915 15.3137085,6 12,6 C8.6862915,6 6,8.6862915 6,12 C6,15.3137085 8.6862915,18 12,18 Z M12,16 C9.790861,16 8,14.209139 8,12 C8,9.790861 9.790861,8 12,8 C14.209139,8 16,9.790861 16,12 C16,14.209139 14.209139,16 12,16 Z",fill:"currentColor"})))}}class c extends n["Component"]{render(){return n["createElement"](s["a"],Object.assign({},this.props),n["createElement"]("g",{stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},n["createElement"]("polygon",{points:"0 0 24 0 24 24 0 24"}),n["createElement"]("path",{d:"M12,20 C7.581722,20 4,16.418278 4,12 C4,7.581722 7.581722,4 12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 Z M12,18 C15.3137085,18 18,15.3137085 18,12 C18,8.6862915 15.3137085,6 12,6 C8.6862915,6 6,8.6862915 6,12 C6,15.3137085 8.6862915,18 12,18 Z",fill:"currentColor"})))}}r.d(t,"a",function(){return u});const p=a["b"].div`
    padding: 8px 8px 8px 32px;
    position: relative;
`;const h=a["b"].label`
    text-transform: uppercase;
    display: block;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    color: ${({theme:e})=>e.colors.checkboxLabel};
`;const d=a["b"].div`
    position: absolute;
    top: 4px;
    left: 4px;
    color: ${({theme:e})=>e.colors.checkboxIcon};
`;let u=class e extends n["Component"]{constructor(){super(...arguments);this.onChange=(e=>{this.props.onChange&&this.props.onChange(e,!0,this.props.name,this.props.value)})}render(){return n["createElement"](p,null,n["createElement"]("input",{type:"radio",id:this.props.id,name:"radio_"+this.props.name,value:this.props.value,checked:this.props.checked||!1,onChange:this.onChange,style:{display:"none"}}),n["createElement"](h,{htmlFor:this.props.id},n["createElement"](d,null,this.props.checked?n["createElement"](l,null):n["createElement"](c,null)),this.props.children))}};u=o["__decorate"]([i["b"]],u)},JhAV:function(e,t,r){"use strict";e.exports=function e(t,r){const o=[-1/0,1,1,0,0,0,0];const n=[1/0,12,null,24,60,60,1e3];if(r<t){const e=r;r=t;t=e}let i=[t.getUTCFullYear(),t.getUTCMonth()+1,t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds(),t.getUTCMilliseconds()],a=[r.getUTCFullYear(),r.getUTCMonth()+1,r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds(),r.getUTCMilliseconds()],s=7;const l=e=>{--a[e];for(;a[e]<o[e];){const t=l(e-1);a[e]+=null===n[e]?t:n[e]}return 1===e?new Date(Date.UTC(a[0],a[1],0)).getUTCDate():n[e+1]};for(;s>0;){let e=a[--s]-i[s];for(;e<0;){a[s]+=l(s-1);e=a[s]-i[s]}a[s]=e}return{years:a[0],months:a[1],days:a[2],hours:a[3],minutes:a[4],seconds:a[5],milliseconds:a[6]}}},MjIO:function(e,t,r){"use strict";function o(e,t){let r=Intl.NumberFormat(e);if(r.formatToParts)return r.formatToParts(1000.1).find(e=>e.type===t).value;return"group"===t?1e3.toLocaleString().replace(/[0-9]/g,""):1.1.toLocaleString().replace(/[0-9]/g,"")}r.d(t,"a",function(){return n});class n{static getBnFormat(e){let t=this.formats.get(e);if(!t){t={decimalSeparator:o(e,"decimal"),groupSeparator:o(e,"group"),groupSize:3};this.formats.set(e,t)}return t}format(e,t,r={}){let o=n.getBnFormat(t);e=e.decimalPlaces(void 0!==r.maximumFractionDigits?r.maximumFractionDigits:3);if(void 0!==r.minimumFractionDigits){let t;if(e.decimalPlaces()<r.minimumFractionDigits)return e.toFormat(r.minimumFractionDigits,o)}return e.toFormat(o)}}n.formats=new Map},Unsh:function(e,t,r){"use strict";r.d(t,"a",function(){return s});var o=r("ERkP");var n=r.n(o);var i=r("JiL2");var a=r("BfMB");class s extends o["Component"]{render(){return o["createElement"](i["a"],{colors:e=>({background:e.colors.unclesBoxBg,text:e.colors.unclesBoxText,border:e.colors.unclesBoxBorder}),variant:this.props.variant},o["createElement"](a["a"],{locale:this.props.locale,value:this.props.children}))}}},opp1:function(e,t,r){"use strict";var o=r("HAGo");var n=r("ERkP");var i=r.n(n);function a(e){return{future:e.get("general.relativeTime.future"),past:e.get("general.relativeTime.past"),s:e.get("general.relativeTime.s"),ss:e.get("general.relativeTime.ss"),m:e.get("general.relativeTime.m"),mm:e.get("general.relativeTime.mm"),h:e.get("general.relativeTime.h"),hh:e.get("general.relativeTime.hh"),d:e.get("general.relativeTime.d"),dd:e.get("general.relativeTime.dd"),M:e.get("general.relativeTime.M"),MM:e.get("general.relativeTime.MM"),y:e.get("general.relativeTime.y"),yy:e.get("general.relativeTime.yy")}}r.d(t,"a",function(){return s});class s extends i.a.Component{render(){return i.a.createElement(o["a"],Object.assign({},this.props,{translations:a(this.props.translation)}))}}},tR7c:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var o=r("tqhF");const n=Object(o["c"])("div").withConfig({displayName:"HighlightSelectBox"})`
    font-size: 12px;
    height: 28px;
    text-transform: uppercase;
    font-weight: bold;
    padding: 0px 32px 0px 24px;
    box-sizing: border-box;
    border: 1px solid ${e=>e.theme.colors.selectBoxBorder};
    border-radius: 4px;
    background-color: ${e=>e.theme.colors.selectBoxBg};
    vertical-align: middle;
    line-height: 24px;
    color: ${e=>e.disabled?e.theme.colors.selectBoxTextDisabled:e.theme.colors.selectBoxText};
    cursor: ${e=>e.disabled?"default":"pointer"};

    position: relative;
    &:before {
        content: "";
        position: absolute;

        border-radius: 50%;
        background-color: ${e=>e.disabled?e.theme.colors.selectBoxTextDisabled:e.theme.colors.selectBoxBubble};
        width: 8px;
        height: 8px;
        top: 9px;
        left: 8px;
    }
    &:after {
        content: "";
        position: absolute;

        top: 10px;
        right: 11px;
        border-top: 5px solid ${e=>e.theme.colors.selectBoxArrow};
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }
`},wVDK:function(e,t,r){"use strict";r.r(t);var o=r("D57K");var n=r("ERkP");var i=r("JkUX");var a=r("tqhF");const s=a["c"].div.withConfig({displayName:"DashboardContentCenter"})`
    margin: 0 auto;
    width: 900px;
    max-width: 100%;
    text-align: center;
`;var l=r("6kd4");var c=r("H8JU");var p=r("DBf6");var h=r("GRjO");var d=r("f4ym");const u=Object(a["c"])("div").withConfig({displayName:"BarChartItemBarRoot"})`
    height: 100%;
    box-sizing: border-box;
    border: 2px solid ${e=>e.active?e.theme.colors.blockColorCode:e.theme.colors.blockListItem};
    background-color: ${e=>e.active?e.theme.colors.blockColorCode:e.theme.colors.blockListItem};

    ${e=>e.disabled||e.active?"":a["b"]`
    ${g}:hover & {
        border: 2px solid ${e.theme.colors.blockColorCode};
        background-color: transparent;
    }
    `}
    ${e=>e.disabled?a["b"]`
    opacity: .5;
    `:""}
`;const m=e=>n["createElement"](u,Object.assign({},e));const g=a["c"].div.withConfig({displayName:"BarChartItemRoot"})`
    cursor: pointer;
`;const f=Object(a["c"])("div").withConfig({displayName:"BarChartItemHitBox"})`
    height: ${({maxHeight:e})=>e}px;
    padding-left: 4px;
    padding-right: 4px;
    display: flex;
    align-items: flex-end;
`;const b=Object(a["c"])("div").withConfig({displayName:"BarChartItemBarWrapper"})`
    width: 8px;
    height: ${e=>Math.round(e.percent*e.maxHeight/100)}px;
    min-height: 8px;
`;class x extends n["Component"]{render(){return n["createElement"](g,null,n["createElement"](h["a"],{placement:"top",nonInteractive:!0,showDelay:0,hideDelay:0,offset:10,referenceElement:()=>this.barEl,content:this.props.tooltip},n["createElement"](d["a"],{to:this.props.link},n["createElement"](f,{maxHeight:this.props.maxHeight},n["createElement"](b,{percent:this.props.value,maxHeight:this.props.maxHeight},n["createElement"](m,{active:this.props.active,innerRef:e=>this.barEl=e}))))))}}const v=Object(a["c"])("div").withConfig({displayName:"BarChartRoot"})`
    display: flex;
    overflow: hidden;
    height: ${({height:e})=>e}px;
    align-items: flex-end;
    justify-content: center;
    padding: 16px 8px 20px 8px;
`;class C extends n["Component"]{getMaxValue(){return this.props.data.reduce((e,t)=>Math.max(e,t.value?t.value:0),0)}render(){let e=this.getMaxValue();return n["createElement"](v,{height:this.props.height,innerRef:e=>{this.props.innerRef&&this.props.innerRef(e)}},this.props.data.map((t,r)=>n["createElement"](x,{key:t.key,value:t.value?Math.floor(t.value/e*100):0,maxHeight:this.props.height,link:this.props.linkThunk?this.props.linkThunk(t):"",tooltip:this.props.tooltipThunk?this.props.tooltipThunk(t):null,active:!!this.props.activeThunk&&this.props.activeThunk(t)})))}}var y=r("/xco");var w=r("fcKJ");var k=r("sqN8");const E=50;let T=class e extends n["Component"]{constructor(){super(...arguments);this.blockValues=[];this.handleResize=(()=>{if(this.wrapperElement){this.wrapperElementWidth=this.wrapperElement.clientWidth;let e=getComputedStyle(this.wrapperElement);let t=parseInt(e.getPropertyValue("padding-left"),10)+parseInt(e.getPropertyValue("padding-right"),10);const r=this.wrapperElementWidth?Math.floor((this.wrapperElementWidth-t)/16):12;this.blocksShownCount=Math.min(r,50)}this.handleRangeChange()})}get blockRangeStart(){return(this.props.blockStateStore.getLatest()||1/0)-(this.blocksShownCount-1)}render(){return n["createElement"](C,{innerRef:e=>{this.wrapperElement=e;e&&(this.wrapperElementWidth=e.clientWidth)},height:80,data:this.blockValues.map((e,t)=>{let r;return{key:this.blockRangeStart+t,value:e?e.transactionCount:void 0,data:e}}),tooltipThunk:e=>n["createElement"]("div",{style:{padding:8,display:"flex"}},n["createElement"](y["a"],{variant:"small",noLink:!0},e.key),void 0!==e.value?n["createElement"](w["a"],{variant:"small"},this.props.translation.get("blockView.content.blockSummary.txs.label").replace(/%d/,""+e.value)):null),linkThunk:e=>this.urlBuilder.getBlock(e.key)})}componentDidMount(){this.urlBuilder=new k["a"];window.addEventListener("resize",this.handleResize);this.handleResize();this.setupLatestValueWatch()}componentWillUnmount(){window.removeEventListener("resize",this.handleResize);this.destroyLatestValueWatch()}setupLatestValueWatch(){this.destroyLatestValueWatch();this.latestValueWatch=Object(c["m"])(()=>this.props.blockStateStore.getLatest(),()=>{this.handleRangeChange()})}destroyLatestValueWatch(){if(this.latestValueWatch){this.latestValueWatch();this.latestValueWatch=void 0}}handleRangeChange(){this.dataFetchTask&&this.dataFetchTask.cancel();this.dataFetchTask=new p["a"](e=>this.fetchData(e).catch(e=>{if(!(e instanceof l["b"]))throw e}));this.dataFetchTask.start().catch(e=>this.props.logger.error(e))}fetchData(e){return o["__awaiter"](this,void 0,void 0,function*(){let t=this.blockRangeStart+this.blocksShownCount;let r=yield this.props.blockValueStore.fetch(this.blockRangeStart,t);if(e.isCancelled())return;this.blockValues=r})}};o["__decorate"]([c["k"]],T.prototype,"blocksShownCount",void 0);o["__decorate"]([c["k"].shallow],T.prototype,"blockValues",void 0);o["__decorate"]([c["d"]],T.prototype,"blockRangeStart",null);T=o["__decorate"]([i["b"]],T);var R=r("2LqZ");var B=r("zPJy");var M=r("opp1");var D=r("Unsh");var S=r("+5H0");var U=r("iTV9");var F=r("x56G");var $=r("tR7c");var V=r("Jh+e");let _=class e extends n["Component"]{constructor(){super(...arguments);this.onCheckboxChange=((e,t,r,o)=>{if(t){this.props.fields.setSelectedField(o,this.props.userPreferences);let e=this.props.fields.getSelectedField();this.props.nodeStore.selectedNode={name:e.label,url:e.value}}this.requestClose()})}render(){return n["createElement"](F["a"],{disabled:this.props.disabled,offset:{left:-20,top:-47},render:({requestClose:e})=>{this.requestClose=e;return n["createElement"](i["a"],null,()=>this.props.fields.getFields().map(e=>n["createElement"](V["a"],{id:"highlight_"+e.key,key:e.key,value:e.key,name:"highlight",checked:this.props.fields.getSelectedField().key===e.key,onChange:this.onCheckboxChange},e.label)))}},n["createElement"]($["a"],{disabled:this.props.disabled},this.props.fields.getSelectedField().label))}};_=o["__decorate"]([i["b"]],_);r.d(t,"DashboardContent",function(){return I});const L=a["c"].h1.withConfig({displayName:"Title"})`
    text-align: center;
	color: #357CFF;
	font-size: 36px;
	letter-spacing: 0.23px;
	line-height: 43px;
    font-weight: 300;
    margin: 14px 0 7px 0;
`;const W=a["c"].h2.withConfig({displayName:"SubTitle"})`
    text-align: center;
	color: #273656;
	font-size: 16px;
	font-weight: 300;
	letter-spacing: 0.2px;
	line-height: 19px;
    margin: 7px 0 14px 0;
`;const O=a["c"].div.withConfig({displayName:"DashboardLabel"})`
    display: flex;
    height: 48px;
    justify-content: center;
    align-items: center;
`;const H=a["c"].a.withConfig({displayName:"GithubLink"})`
	color: #357CFF;
    opacity: 1;
    transition: opacity linear 100ms;
    text-decoration: none;

    &:hover {
        opacity: 0.8;
    }

    &:visited {
        color: #357CFF;
    }
`;let I=class e extends n["Component"]{render(){let{translation:e,clipboard:t}=this.props;let r=this.props.appConfig.getLocale();return n["createElement"](s,null,n["createElement"](L,null,e.get("dashboardView.title")),n["createElement"](W,null,e.get("dashboardView.subTitle"),n["createElement"](H,{href:"https://github.com/Alethio/ethstats-lite-explorer",target:"_blank"},e.get("dashboardView.github"))),n["createElement"](U["a"],null,n["createElement"](S["a"],{translation:e,search:this.props.search,searchInlineStore:this.props.searchInlineStore})),n["createElement"](O,null,n["createElement"](R["a"],null,e.get("dashboardView.lastBlocksChart.title.label"))),n["createElement"](T,{blockStateStore:this.props.blockStateStore,blockValueStore:this.props.blockValueStore,translation:this.props.translation,logger:this.props.logger}),n["createElement"]("div",{style:{display:"flex",justifyContent:"center",flexWrap:"wrap"}},n["createElement"](B["a"],null,n["createElement"](_,{nodeStore:this.props.nodeStore,fields:this.props.nodeDropdownItems,userPreferences:this.props.userPreferences,translation:e,appConfig:this.props.appConfig})),n["createElement"](B["a"],null,n["createElement"](R["a"],null,e.get("chainView.content.latestBlock.label")),n["createElement"](y["a"],null,this.props.lastBlock.id)),this.props.lastBlock.creationTime?n["createElement"](B["a"],null,n["createElement"](R["a"],null,e.get("blockView.content.blockCreationTime.label")),n["createElement"](M["a"],{timestamp:this.props.lastBlock.creationTime,translation:e,nonclickable:!0,locale:r,clipboard:t})):null,n["createElement"](B["a"],null,n["createElement"](R["a"],null,e.get("blockView.content.transactions.label")),n["createElement"](w["a"],null,this.props.lastBlock.transactions.length)),n["createElement"](B["a"],null,n["createElement"](R["a"],null,e.get("blockView.content.uncles.label")),n["createElement"](D["a"],{locale:r},this.props.lastBlock.uncles.length))))}};I=o["__decorate"]([i["b"]],I)},x56G:function(e,t,r){"use strict";var o=r("D57K");var n=r("ERkP");var i=r("7nmT");var a=r("ETTr");var s=r("l/oz");var l=r("JkUX");var c=r("H8JU");var p=r("H3xX");class h extends n["Component"]{render(){return n["createElement"](p["a"],Object.assign({},this.props),n["createElement"]("g",{stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},n["createElement"]("polygon",{points:"0 0 24 0 24 24 0 24"}),n["createElement"]("polygon",{fill:"currentColor",fillRule:"nonzero",points:"14.8284271 16.2426407 12 13.4142136 9.17157288 16.2426407 7.75735931 14.8284271 10.5857864 12 7.75735931 9.17157288 9.17157288 7.75735931 12 10.5857864 14.8284271 7.75735931 16.2426407 9.17157288 13.4142136 12 16.2426407 14.8284271"})))}}const d=a["b"].div`
    cursor: pointer;
    line-height: 1;
    color: ${({theme:e})=>e.colors.closeBtn};
`;const u=a["b"].div`
    padding: 16px;
    border-radius: 8px;
    background-color: ${e=>e.theme.colors.overlayBg};
    border: 1px solid #D0DEF2;
    box-shadow: 0 2px 4px 0 rgba(51,69,100,0.07), 0 6px 16px 0 rgba(51,69,100,0.08);
`;class m extends n["Component"]{render(){return n["createElement"](u,null,n["createElement"]("div",{style:{padding:"4px"}},n["createElement"](d,{onClick:this.props.onClose},n["createElement"](h,null))),this.props.children)}}r.d(t,"a",function(){return f});const g=a["b"].div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;let f=class e extends n["Component"]{constructor(){super(...arguments);this.isOpened=!1;this.openSelectBox=(()=>{this.isOpened=!0});this.closeSelectBox=(()=>{this.isOpened=!1})}render(){let{disabled:e}=this.props;return n["createElement"](s["a"],null,n["createElement"](s["c"],null,({ref:t})=>n["createElement"]("div",{ref:t,onClick:e?void 0:this.openSelectBox,style:{cursor:e?"default":"pointer"}},this.props.children)),this.isOpened?i["createPortal"](n["createElement"](n["Fragment"],null,n["createElement"](g,{onClick:this.closeSelectBox}),n["createElement"](s["b"],{modifiers:{offset:{offset:this.props.offset?this.props.offset.left+"px, "+this.props.offset.top+"px":"auto"},flip:{enabled:!1},preventOverflow:{enabled:!0},hide:{enabled:!1}},placement:"bottom-start"},({ref:e,placement:t,style:r})=>n["createElement"]("div",{ref:e,"data-placement":t,style:r},n["createElement"](m,{onClose:this.closeSelectBox},this.props.render({requestClose:this.closeSelectBox}))))),document.body):null)}};o["__decorate"]([c["k"]],f.prototype,"isOpened",void 0);f=o["__decorate"]([l["b"]],f)},zPJy:function(e,t,r){"use strict";var o=r("ERkP");var n=r("ETTr");const i=({children:e,className:t})=>o["createElement"]("div",{className:t},e);const a=Object(n["b"])(i)`
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
`;var s=r("kvVz");r.d(t,"a",function(){return d});const l=({children:e,className:t})=>o["createElement"]("div",{className:t},e);const c=Object(n["b"])(l)`
    display: flex;
    flex: ${e=>e.fullRow?"1 1":"0 0"} auto;
`;const p=({children:e,className:t})=>o["createElement"]("div",{className:t},e);const h=Object(n["b"])(p)`
    display: flex;
    flex: ${({fullRow:e})=>e?"1 1":"0 1"} auto;
    flex-wrap: wrap;
`;class d extends o["PureComponent"]{render(){const e=o["Children"].toArray(this.props.children).reduce((e,t)=>{s["isFragment"](t)?e.push(...o["Children"].map(t.props.children,e=>{if(!s["isElement"](e)){console.error("Fragment passed to LayoutRowItem contains a child that is not a React.Element.",e);return e}return o["cloneElement"](e,{})})):e.push(t);return e},[]);const t=e.shift();return o["createElement"](c,{fullRow:this.props.fullRow},this.props.ignoreFirstLabel?null:o["createElement"](a,{isBeginningOfRow:this.props.isBeginningOfRow,baseHeight:this.props.baseHeight,autoWidth:this.props.autoWidth},t),1===e.length?this.childrenArrayRender(e):o["createElement"](h,{fullRow:this.props.fullRow},this.childrenArrayRender(e)))}childrenArrayRender(e){return e.map((e,t)=>o["createElement"](a,{baseHeight:this.props.baseHeight,autoHeight:this.props.autoHeight,autoWidth:this.props.autoWidth,key:t},e))}}d._brand="layoutRowItem"}}]);
//# sourceMappingURL=8a433775cfcc0acbad28.bundle.js.map