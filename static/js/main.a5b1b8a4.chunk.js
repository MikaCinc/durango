(this.webpackJsonpdurango=this.webpackJsonpdurango||[]).push([[0],{24:function(e,a,t){e.exports=t.p+"static/media/Logo.dac769b4.png"},30:function(e,a,t){},34:function(e,a,t){e.exports=t.p+"static/media/Logo2.df36def0.png"},42:function(e,a,t){e.exports=t(69)},47:function(e,a,t){},69:function(e,a,t){"use strict";t.r(a);var n=t(0),o=t.n(n),i=t(14),s=t.n(i),l=(t(47),t(40)),c=t(5),r=(t(30),[{ID:1,Title:"Vinyl",Logo:"vinyl.png",BrojMesta:32,BrojSlobodnihMesta:22,Details:{Opis:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",Slike:["","",""],RadnoVreme:"13:00 - 23:30",Lokacija:"https://www.google.com/maps/place/Vinyl+Cafe/@43.3179874,21.8948292,15z/data=!4m5!3m4!1s0x0:0xa52fd515620420f!8m2!3d43.3179874!4d21.8948292?hl=sr",Meni:""}},{ID:2,Title:"Square",Logo:"Square.jpg",BrojMesta:68,BrojSlobodnihMesta:31,Details:{Opis:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",Slike:["","",""],RadnoVreme:"18:00 - 05:15",Lokacija:"https://www.google.com/maps/place/Square+Cafe/@43.3203283,21.917684,15z/data=!4m5!3m4!1s0x0:0xa63c72132475dc46!8m2!3d43.3203283!4d21.917684?hl=sr",Meni:""}},{ID:3,Title:"Dnevna soba",Logo:"dnevnaSoba.jpg",BrojMesta:42,BrojSlobodnihMesta:0,Details:{Opis:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",Slike:["","",""],RadnoVreme:"06:50 - 00:10",Lokacija:"https://www.google.com/maps/place/Caffe+bar+Dnevna+soba/@43.3196389,21.896984,15z/data=!4m5!3m4!1s0x0:0xf0256956dfa8b74d!8m2!3d43.3196389!4d21.896984?hl=sr",Meni:""}}]),m=t(24),d=t.n(m),u=t(34),p=t.n(u),g=t(19),h=t.n(g),f=t(26),b=t.n(f),w=t(15),v=t.n(w),E=t(73),k=t(72);var y=function(e){var a=Object(n.useState)(3),t=Object(c.a)(a,2),i=t[0],s=t[1],l=Object(n.useState)(!1),r=Object(c.a)(l,2),m=r[0],d=r[1],u=function(){return d(!1)};return o.a.createElement("div",null,o.a.createElement("div",{className:"detailsHeader"},o.a.createElement("div",{className:"goBack",onClick:function(){e.setSelected(null)}},o.a.createElement("i",{className:"material-icons"},"arrow_back_ios"),o.a.createElement("span",null,"Nazad")),o.a.createElement("h1",{className:"detailsTitle boldText"},e.data.Title),o.a.createElement("img",{src:"./slike/"+e.data.Logo,className:"detailsLogo"})),o.a.createElement("div",{className:"detailsRow"},o.a.createElement("h1",{className:"detailRowText greyText boldText"},"Slobodnih mesta:",o.a.createElement("span",{style:{color:e.data.BrojSlobodnihMesta>0?"#3185FC":"#9A031E"}}," "+e.data.BrojSlobodnihMesta+" "),"/ ",e.data.BrojMesta)),o.a.createElement("div",{className:"detailsRow clickableRow",onClick:function(){d(!0)}},o.a.createElement("i",{className:"material-icons detailIcon"},"book"),o.a.createElement("h1",{className:"detailRowText"},"Napravi rezervaciju")),o.a.createElement(E.a,null,["kafic1.jpg","kafic2.jpg","kafic3.jpg"].map((function(e,a){return o.a.createElement(E.a.Item,{key:a},o.a.createElement("img",{className:"d-block w-100",src:"./slike/carouselMock/"+e,alt:a+1+". slika"}))}))),o.a.createElement("div",{className:"detailsRow"},o.a.createElement("i",{className:"material-icons detailIcon greyText"},"access_time"),function(){var a=e.data.Details.RadnoVreme,t=a.split(" - ")[0],n=a.split(" - ")[1],i=v()(),s=!1,l=!1;return i.isBetween(v()("00:00","HH:mm"),v()("05:00","HH:mm"))&&(l=!0),v()(n,"HH:mm").isBetween(v()("00:00","HH:mm"),v()("05:00","HH:mm"))&&(s=!0),i.isBetween(v()(t,"HH:mm").subtract(l?1:0,"days"),v()(n,"HH:mm").add(s?1:0,"days"))?o.a.createElement("h1",{className:"detailRowText"},o.a.createElement("span",{className:"greyText"},"Otvoreno: "),o.a.createElement("span",{style:{color:"#009A1F"}},a)):o.a.createElement("h1",{className:"detailRowText"},o.a.createElement("span",{className:"greyText"},"Zatvoreno: "),o.a.createElement("span",{style:{color:"#C50505"}},a))}()),o.a.createElement("div",{className:"detailsRow clickableRow",onClick:function(){window.open(e.data.Details.Lokacija,"_blank")}},o.a.createElement("i",{className:"material-icons detailIcon"},"map"),o.a.createElement("h1",{className:"detailRowText"},"Prika\u017ei na mapi")),o.a.createElement("div",{className:"detailAbout"},o.a.createElement("div",{className:"detailsRowSimple"},o.a.createElement("i",{className:"material-icons detailIcon greyText"},"info"),o.a.createElement("h1",{className:"detailRowText greyText"},"O mestu")),o.a.createElement("p",{className:"detailsAboutText"},e.data.Details.Opis)),o.a.createElement(k.a,{show:m,onHide:u,centered:!0},o.a.createElement(k.a.Body,null,o.a.createElement("div",{className:"modalInputDiv w-50"},o.a.createElement("h5",{className:"greyText boldText"},"Broj mesta"),o.a.createElement("p",{className:"modalInputText greyText "},o.a.createElement("span",{className:"clickable",onClick:function(){i>1&&s(i-1)}}," - "),o.a.createElement("span",null,i),o.a.createElement("span",{className:"clickable",onClick:function(){s(i+1)}}," + "))),o.a.createElement("div",{className:"modalInputDiv"},o.a.createElement("h5",{className:"greyText boldText"},"Datum & vreme"),o.a.createElement("p",{className:"greyText modalInputTextDate"},"12/01/2020 21:30")),o.a.createElement("button",{className:"buttonReserve boldText",onClick:function(){u()}},"Rezervi\u0161i"),o.a.createElement("button",{className:"buttonCancel boldText",onClick:function(){u()}},"Odustani"))))},N=t(37),j=t.n(N),x=t(38),T=t.n(x),I=t(28),S=function(e){var a=Object(n.useState)(!1),t=Object(c.a)(a,2),i=t[0],s=t[1],l=Object(n.useState)(""),r=Object(c.a)(l,2),m=r[0],u=r[1],p=Object(n.useState)(""),g=Object(c.a)(p,2),h=g[0],f=g[1];return o.a.createElement("div",{className:"loginScreen"},o.a.createElement(I.Fade,{when:!0,appear:!0,bottom:!0,delay:500,duration:1e3},o.a.createElement("img",{className:"loginLogo",src:d.a})),o.a.createElement("p",{className:"loginParagraph"},"Pogledajte ta\u010dan broj slobodnih mesta u svom omiljenom kafi\u0107u ili restoranu i rezervi\u0161ite mesto za posebne prilike"),o.a.createElement(I.Zoom,{when:i,bottom:!0,duration:1e3},o.a.createElement("div",null,o.a.createElement("img",{className:"loginProfileImageLoaded",src:m}),o.a.createElement("p",{className:"loginParagraph"},h))),o.a.createElement(j.a,{clientId:"873302302315-mv8lh0772kbe55nvh687qpv8ddvlv9t0.apps.googleusercontent.com",buttonText:"Login",onSuccess:function(a){s(!0),u(a.profileObj.imageUrl),f(a.profileObj.name),setTimeout((function(){e.setAuthorized(!0)}),2e3)},onFailure:function(e){alert("Something is wrong with Google login")},cookiePolicy:"single_host_origin",render:function(e){return o.a.createElement("div",{className:"google-btn",onClick:e.onClick,disabled:e.disabled},o.a.createElement("img",{className:"google-icon",src:"https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"}),o.a.createElement("p",{className:"google-text"},o.a.createElement("b",null,"Sign in with Google")))}}),o.a.createElement(T.a,{appId:"503529696932140",autoLoad:!1,fields:"name,email,picture",authType:"reauthenticate",tag:function(e){return o.a.createElement("div",{className:"facebook-btn",onClick:e.onClick},o.a.createElement("img",{className:"facebook-icon",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/267px-F_icon.svg.png"}),o.a.createElement("p",{className:"facebook-text"},o.a.createElement("b",null,"Sign in with Facebook")))},callback:function(a){s(!0),u(a.picture.data.url),f(a.name),setTimeout((function(){e.setAuthorized(!0)}),2e3)},onFailure:function(){console.log("Something is wrong with Facebook sign in")}}))},L=t(23),O=t.n(L);t(33);var C=function(e){var a=Object(n.useState)(!1),t=Object(c.a)(a,2),i=t[0],s=t[1],m=Object(n.useState)(!1),d=Object(c.a)(m,2),u=d[0],g=d[1],f=Object(n.useState)(Object(l.a)(r)),w=Object(c.a)(f,2),v=w[0],E=w[1],k=Object(n.useState)(null),N=Object(c.a)(k,2),j=N[0],x=N[1],T=Object(n.useState)(""),I=Object(c.a)(T,2),L=I[0],C=I[1];Object(n.useEffect)((function(){var e=b.a.parse(window.location.search);e.view&&x(parseInt(e.view,10))}),[]),Object(n.useEffect)((function(){j?window.history.pushState({},"",window.location.pathname+"?"+b.a.stringify({view:j})):window.history.pushState({},"",window.location.pathname)}),[j]),Object(n.useEffect)((function(){E(R())}),[L]),Object(n.useEffect)((function(){g(0===v.length)}),[v]);var R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,a=e.filter((function(e){return e.Title.trim().toLowerCase().indexOf(L.trim().toLowerCase())>-1}));return h.a.orderBy(a,"BrojSlobodnihMesta","desc")},B=function(){return o.a.createElement(n.Fragment,null,o.a.createElement("div",{className:"mainHeader"},o.a.createElement("img",{src:p.a,className:"logoHeader"}),o.a.createElement("div",{className:"search"},o.a.createElement("i",{className:"material-icons",id:"searchIcon"},"search"),o.a.createElement("input",{className:"searchInput",placeholder:"Pretra\u017ei...",value:L,onChange:function(e){C(e.target.value)}}))),u?o.a.createElement("div",{className:"noResults boldText"},o.a.createElement("h1",null,"Mesto koje tra\u017eite nije prona\u0111eno"),o.a.createElement("i",{className:"material-icons noResultsIcon"},"sentiment_very_dissatisfied")):v.map((function(e){return o.a.createElement("div",{key:e.ID,className:"singleLine button",onClick:function(){x(e.ID)}},o.a.createElement("img",{className:"listLogo",src:"./slike/"+e.Logo}),o.a.createElement("h1",{className:"lineTitle boldText"},e.Title),o.a.createElement("p",{className:"lineFreeSeats boldText greyText"},e.BrojSlobodnihMesta," / ",e.BrojMesta),o.a.createElement("i",{className:"material-icons peopleIcon",style:{color:e.BrojSlobodnihMesta>0?"#3185FC":"#9A031E"}},"people"))})))};return o.a.createElement("div",{className:"App"},i&&o.a.createElement(n.Fragment,null,o.a.createElement(O.a,{when:!j,collapse:!0,left:!0,duration:300},o.a.createElement("div",{className:"list"},!j&&B())),o.a.createElement(O.a,{when:j,collapse:!0,right:!0,delay:10,duration:300},o.a.createElement("div",{className:"details"},j&&o.a.createElement(y,{data:h.a.find(r,{ID:j}),setSelected:x})))),!i&&o.a.createElement(n.Fragment,null,o.a.createElement(S,{authorized:i,setAuthorized:s})))},R=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function B(e,a){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),a&&a.onUpdate&&a.onUpdate(e)):(console.log("Content is cached for offline use."),a&&a.onSuccess&&a.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}s.a.render(o.a.createElement(C,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/durango",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var a="".concat("/durango","/service-worker.js");R?(!function(e,a){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var n=t.headers.get("content-type");404===t.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):B(e,a)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(a,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):B(a,e)}))}}()}},[[42,1,2]]]);
//# sourceMappingURL=main.a5b1b8a4.chunk.js.map