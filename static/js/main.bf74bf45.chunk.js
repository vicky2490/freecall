(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{24:function(e,a,t){e.exports=t(39)},29:function(e,a,t){},30:function(e,a,t){},31:function(e,a,t){},36:function(e,a,t){},38:function(e,a,t){},39:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),r=t(20),s=t.n(r),o=(t(29),t(30),t(3)),m=t(2),i=(t(31),t(21));var l=function(){return c.a.createElement("div",{className:"wrap"},c.a.createElement("div",{className:"index-menu"},c.a.createElement("div",{className:"index-menu-box"},c.a.createElement(i.a,{to:"/game"},c.a.createElement("button",{className:"start-button"},"START")),c.a.createElement("div",{className:"caption"},"How to play?"))))},d=t(8),u=t(9),v=t(11),E=t(10),p=t(12),w=(t(36),t(13)),h=t.n(w),N=(t(38),function(e){function a(e){var t;return Object(d.a)(this,a),(t=Object(v.a)(this,Object(E.a)(a).call(this,e))).getCardImgCssName=function(e,a){var t="";switch(e){case 0:t+="spade-";break;case 1:t+="heart-";break;case 2:t+="club-";break;case 3:t+="diamond-"}return t+=a},t.state={card:[],cardRows:[]},t}return Object(p.a)(a,e),Object(u.a)(a,[{key:"render",value:function(){var e=this.props.cardRows,a=this.props.p,t=this.getCardImgCssName(e.eachColor,e.num);return c.a.createElement("div",{className:"".concat(t," card top-").concat(a)})}}]),a}(n.Component)),b=function(e){function a(){var e;return Object(d.a)(this,a),(e=Object(v.a)(this,Object(E.a)(a).call(this))).state={card:[],cardRows:[]},e}return Object(p.a)(a,e),Object(u.a)(a,[{key:"componentWillMount",value:function(){for(var e=[],a=[7,7,7,7,6,6,6,6],t=[],n=0;n<52;n++)e.push(n);for(var c=0;c<50;c++){var r=Math.floor(52*Math.random())+1,s=Math.floor(52*Math.random())+1,o=e[r-1];e[r-1]=e[s-1],e[s-1]=o;var m=Math.floor(8*Math.random())+1,i=Math.floor(8*Math.random())+1,l=a[m-1];a[m-1]=a[i-1],a[i-1]=l}for(var d=0;d<8;d++){var u=a[d],v=h.a.take(e,u);v=h.a.map(v,function(e){return{eachColor:Math.floor(e/13),num:(e+1)%13===0?13:(e+1)%13,dataIdex:e}}),t.push({row:d+1,content:v}),e=h.a.drop(e,u)}this.setState({card:e,cardRows:t})}},{key:"render",value:function(){return c.a.createElement("div",{className:"game-wrap"},c.a.createElement("div",{className:"header"},c.a.createElement("div",{className:"title"},"FREECELL"),c.a.createElement("div",{className:"count-bar"},c.a.createElement("div",{className:"count-time-move"},"TIME:"),c.a.createElement("div",{className:"count-time-move count-num"},"00:00"),c.a.createElement("div",{className:"count-time-move"},"MOVE:"),c.a.createElement("div",{className:"count-time-move count-num"},"00"))),c.a.createElement("div",{className:"context"},c.a.createElement("div",{className:"vacancy-box"}),c.a.createElement("div",{className:"vacancy-box"}),c.a.createElement("div",{className:"vacancy-box"}),c.a.createElement("div",{className:"vacancy-box"}),c.a.createElement("div",{className:"standard-box suithearts"}),c.a.createElement("div",{className:"standard-box suitdiamonds"}),c.a.createElement("div",{className:"standard-box suitclubs"}),c.a.createElement("div",{className:"standard-box suitspades"}),c.a.createElement("div",{className:"card-row"},this.state.cardRows[0].content.map(function(e,a){return c.a.createElement(N,{key:a,cardRows:e,p:a})})),c.a.createElement("div",{className:"card-row"},this.state.cardRows[1].content.map(function(e,a){return c.a.createElement(N,{key:a,cardRows:e,p:a})})),c.a.createElement("div",{className:"card-row"},this.state.cardRows[2].content.map(function(e,a){return c.a.createElement(N,{key:a,cardRows:e,p:a})})),c.a.createElement("div",{className:"card-row"},this.state.cardRows[3].content.map(function(e,a){return c.a.createElement(N,{key:a,cardRows:e,p:a})})),c.a.createElement("div",{className:"card-row"},this.state.cardRows[4].content.map(function(e,a){return c.a.createElement(N,{key:a,cardRows:e,p:a})})),c.a.createElement("div",{className:"card-row"},this.state.cardRows[5].content.map(function(e,a){return c.a.createElement(N,{key:a,cardRows:e,p:a})})),c.a.createElement("div",{className:"card-row"},this.state.cardRows[6].content.map(function(e,a){return c.a.createElement(N,{key:a,cardRows:e,p:a})})),c.a.createElement("div",{className:"card-row"},this.state.cardRows[7].content.map(function(e,a){return c.a.createElement(N,{key:a,cardRows:e,p:a})})),c.a.createElement("div",{className:"game-menu"},c.a.createElement("div",{className:"material-icons setting"},"power_settings_new"),c.a.createElement("div",{className:"material-icons setting"},"pause"),c.a.createElement("button",{className:"menu-btn"},"UNDO"),c.a.createElement("div",{className:"material-icons setting"},"replay"),c.a.createElement("div",{className:"material-icons setting"},"help_outline"))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var f=Object(m.b)();s.a.render(c.a.createElement(o.b,{history:f},c.a.createElement(o.c,null,c.a.createElement(o.a,{exact:!0,path:"/",component:l}),c.a.createElement(o.a,{path:"/game",component:b}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[24,1,2]]]);
//# sourceMappingURL=main.bf74bf45.chunk.js.map