/*! For license information please see 728.7ef6c993.chunk.js.LICENSE.txt */
(self.webpackChunkmy_react_template=self.webpackChunkmy_react_template||[]).push([[728],{2728:function(t,i,e){"use strict";e.r(i),e.d(i,{default:function(){return l}});var o=e(5671),n=e(3144),a=e(9340),s=e(8557),h=e(2791),r=e(885),c=e(1676),g=e.n(c),u=e(184),d=function(t){var i=(0,h.useState)([]),e=(0,r.Z)(i,2),o=e[0],n=e[1],a=(0,h.useState)([]),s=(0,r.Z)(a,2),c=s[0],d=s[1],l=function(){n([]),d([]),fetch("https://api.thecatapi.com/v1/images/search?limit=20").then((function(t){return t.json()})).then((function(t){n(t),d(g()(t.map((function(t){return t.width/t.height})),{containerPadding:10,targetRowHeight:160,containerWidth:document.getElementById("catContainer").clientWidth-20}).boxes)}))};return(0,h.useEffect)((function(){l()}),[]),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{children:(0,u.jsx)("button",{onClick:function(){l()},children:"\u6362\u4e00\u6279"})}),(0,u.jsx)("div",{id:"catContainer",style:{position:"relative",width:"100%"},children:c.map((function(t,i){var e=o[i],n={position:"absolute",width:t.width+"px",height:t.height+"px",left:t.left+"px",top:t.top+"px"};return(0,u.jsx)("img",{style:n,src:e.url,alt:""},i)}))})]})},l=function(t){(0,a.Z)(e,t);var i=(0,s.Z)(e);function e(){return(0,o.Z)(this,e),i.apply(this,arguments)}return(0,n.Z)(e,[{key:"render",value:function(){return(0,u.jsx)("div",{children:(0,u.jsx)(d,{})})}}]),e}(h.Component)},1676:function(t,i,e){"use strict";var o=e(1818);function n(t,i){var e;return!1!==t.fullWidthBreakoutRowCadence&&(i._rows.length+1)%t.fullWidthBreakoutRowCadence===0&&(e=!0),new o({top:i._containerHeight,left:t.containerPadding.left,width:t.containerWidth-t.containerPadding.left-t.containerPadding.right,spacing:t.boxSpacing.horizontal,targetRowHeight:t.targetRowHeight,targetRowHeightTolerance:t.targetRowHeightTolerance,edgeCaseMinRowHeight:.5*t.targetRowHeight,edgeCaseMaxRowHeight:2*t.targetRowHeight,rightToLeft:!1,isBreakoutRow:e,widowLayoutStyle:t.widowLayoutStyle})}function a(t,i,e){return i._rows.push(e),i._layoutItems=i._layoutItems.concat(e.getItems()),i._containerHeight+=e.height+t.boxSpacing.vertical,e.items}t.exports=function(t,i){var e={},o={},s={containerWidth:1060,containerPadding:10,boxSpacing:10,targetRowHeight:320,targetRowHeightTolerance:.25,maxNumRows:Number.POSITIVE_INFINITY,forceAspectRatio:!1,showWidows:!0,fullWidthBreakoutRowCadence:!1,widowLayoutStyle:"left"},h={},r={};return i=i||{},e=Object.assign(s,i),h.top=isNaN(parseFloat(e.containerPadding.top))?e.containerPadding:e.containerPadding.top,h.right=isNaN(parseFloat(e.containerPadding.right))?e.containerPadding:e.containerPadding.right,h.bottom=isNaN(parseFloat(e.containerPadding.bottom))?e.containerPadding:e.containerPadding.bottom,h.left=isNaN(parseFloat(e.containerPadding.left))?e.containerPadding:e.containerPadding.left,r.horizontal=isNaN(parseFloat(e.boxSpacing.horizontal))?e.boxSpacing:e.boxSpacing.horizontal,r.vertical=isNaN(parseFloat(e.boxSpacing.vertical))?e.boxSpacing:e.boxSpacing.vertical,e.containerPadding=h,e.boxSpacing=r,o._layoutItems=[],o._awakeItems=[],o._inViewportItems=[],o._leadingOrphans=[],o._trailingOrphans=[],o._containerHeight=e.containerPadding.top,o._rows=[],o._orphans=[],e._widowCount=0,function(t,i,e){var o,s,h,r=[];return t.forceAspectRatio&&e.forEach((function(i){i.forcedAspectRatio=!0,i.aspectRatio=t.forceAspectRatio})),e.some((function(e,h){if(isNaN(e.aspectRatio))throw new Error("Item "+h+" has an invalid aspect ratio");if(s||(s=n(t,i)),o=s.addItem(e),s.isLayoutComplete()){if(r=r.concat(a(t,i,s)),i._rows.length>=t.maxNumRows)return s=null,!0;if(s=n(t,i),!o&&(o=s.addItem(e),s.isLayoutComplete())){if(r=r.concat(a(t,i,s)),i._rows.length>=t.maxNumRows)return s=null,!0;s=n(t,i)}}})),s&&s.getItems().length&&t.showWidows&&(i._rows.length?(h=i._rows[i._rows.length-1].isBreakoutRow?i._rows[i._rows.length-1].targetRowHeight:i._rows[i._rows.length-1].height,s.forceComplete(!1,h)):s.forceComplete(!1),r=r.concat(a(t,i,s)),t._widowCount=s.getItems().length),i._containerHeight=i._containerHeight-t.boxSpacing.vertical,i._containerHeight=i._containerHeight+t.containerPadding.bottom,{containerHeight:i._containerHeight,widowCount:t._widowCount,boxes:i._layoutItems}}(e,o,t.map((function(t){return t.width&&t.height?{aspectRatio:t.width/t.height}:{aspectRatio:t}})))}},1818:function(t){(t.exports=function(t){this.top=t.top,this.left=t.left,this.width=t.width,this.spacing=t.spacing,this.targetRowHeight=t.targetRowHeight,this.targetRowHeightTolerance=t.targetRowHeightTolerance,this.minAspectRatio=this.width/t.targetRowHeight*(1-t.targetRowHeightTolerance),this.maxAspectRatio=this.width/t.targetRowHeight*(1+t.targetRowHeightTolerance),this.edgeCaseMinRowHeight=t.edgeCaseMinRowHeight,this.edgeCaseMaxRowHeight=t.edgeCaseMaxRowHeight,this.widowLayoutStyle=t.widowLayoutStyle,this.isBreakoutRow=t.isBreakoutRow,this.items=[],this.height=0}).prototype={addItem:function(t){var i,e,o,n=this.items.concat(t),a=this.width-(n.length-1)*this.spacing,s=n.reduce((function(t,i){return t+i.aspectRatio}),0),h=a/this.targetRowHeight;return this.isBreakoutRow&&0===this.items.length&&t.aspectRatio>=1?(this.items.push(t),this.completeLayout(a/t.aspectRatio,"justify"),!0):s<this.minAspectRatio?(this.items.push(Object.assign({},t)),!0):s>this.maxAspectRatio?0===this.items.length?(this.items.push(Object.assign({},t)),this.completeLayout(a/s,"justify"),!0):(i=this.width-(this.items.length-1)*this.spacing,e=this.items.reduce((function(t,i){return t+i.aspectRatio}),0),o=i/this.targetRowHeight,Math.abs(s-h)>Math.abs(e-o)?(this.completeLayout(i/e,"justify"),!1):(this.items.push(Object.assign({},t)),this.completeLayout(a/s,"justify"),!0)):(this.items.push(Object.assign({},t)),this.completeLayout(a/s,"justify"),!0)},isLayoutComplete:function(){return this.height>0},completeLayout:function(t,i){var e,o,n,a,s,h=this.left,r=this.width-(this.items.length-1)*this.spacing;("undefined"===typeof i||["justify","center","left"].indexOf(i)<0)&&(i="left"),t!==(o=Math.max(this.edgeCaseMinRowHeight,Math.min(t,this.edgeCaseMaxRowHeight)))?(this.height=o,e=r/o/(r/t)):(this.height=t,e=1),this.items.forEach((function(t){t.top=this.top,t.width=t.aspectRatio*this.height*e,t.height=this.height,t.left=h,h+=t.width+this.spacing}),this),"justify"===i?(h-=this.spacing+this.left,n=(h-this.width)/this.items.length,a=this.items.map((function(t,i){return Math.round((i+1)*n)})),1===this.items.length?this.items[0].width-=Math.round(n):this.items.forEach((function(t,i){i>0?(t.left-=a[i-1],t.width-=a[i]-a[i-1]):t.width-=a[i]}))):"center"===i&&(s=(this.width-h)/2,this.items.forEach((function(t){t.left+=s+this.spacing}),this))},forceComplete:function(t,i){"number"===typeof i?this.completeLayout(i,this.widowLayoutStyle):this.completeLayout(this.targetRowHeight,this.widowLayoutStyle)},getItems:function(){return this.items}}}}]);
//# sourceMappingURL=728.7ef6c993.chunk.js.map