(this.webpackJsonpdurango=this.webpackJsonpdurango||[]).push([[0],{24:function(e,a,t){e.exports=t.p+"static/media/Logo.dac769b4.png"},30:function(e,a,t){},34:function(e,a,t){e.exports=t.p+"static/media/Logo2.df36def0.png"},42:function(e,a,t){e.exports=t(69)},47:function(e,a,t){},69:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),o=t(14),i=t.n(o),l=(t(47),t(40)),c=t(5),r=(t(30),[{ID:1,Title:"Vinyl",Logo:"vinyl.png",BrojMesta:32,BrojSlobodnihMesta:22,Details:{Opis:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",Slike:["","",""],RadnoVreme:"13:00 - 23:30",Lokacija:"https://www.google.com/maps/place/Vinyl+Cafe/@43.3179874,21.8948292,15z/data=!4m5!3m4!1s0x0:0xa52fd515620420f!8m2!3d43.3179874!4d21.8948292?hl=sr",Meni:""}},{ID:2,Title:"Square",Logo:"Square.jpg",BrojMesta:68,BrojSlobodnihMesta:31,Details:{Opis:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",Slike:["","",""],RadnoVreme:"18:00 - 05:15",Lokacija:"https://www.google.com/maps/place/Square+Cafe/@43.3203283,21.917684,15z/data=!4m5!3m4!1s0x0:0xa63c72132475dc46!8m2!3d43.3203283!4d21.917684?hl=sr",Meni:""}},{ID:3,Title:"Dnevna soba",Logo:"dnevnaSoba.jpg",BrojMesta:42,BrojSlobodnihMesta:0,Details:{Opis:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",Slike:["","",""],RadnoVreme:"06:50 - 00:10",Lokacija:"https://www.google.com/maps/place/Caffe+bar+Dnevna+soba/@43.3196389,21.896984,15z/data=!4m5!3m4!1s0x0:0xf0256956dfa8b74d!8m2!3d43.3196389!4d21.896984?hl=sr",Meni:""}}]),m=t(24),d=t.n(m),u=t(34),p=t.n(u),g=t(19),h=t.n(g),b=t(26),E=t.n(b),f=t(15),w=t.n(f),v=t(73),k=t(72);var y=function(e){var a=Object(n.useState)(3),t=Object(c.a)(a,2),o=t[0],i=t[1],l=Object(n.useState)(!1),r=Object(c.a)(l,2),m=r[0],d=r[1],u=function(){return d(!1)};return s.a.createElement("div",null,s.a.createElement("div",{className:"detailsHeader"},s.a.createElement("div",{className:"goBack",onClick:function(){e.setSelected(null)}},s.a.createElement("i",{className:"material-icons"},"arrow_back_ios"),s.a.createElement("span",null,"Nazad")),s.a.createElement("h1",{className:"detailsTitle boldText"},e.data.Title),s.a.createElement("img",{src:"./slike/"+e.data.Logo,className:"detailsLogo"})),s.a.createElement("div",{className:"detailsRow"},s.a.createElement("h1",{className:"detailRowText greyText boldText"},"Slobodnih mesta:",s.a.createElement("span",{style:{color:e.data.BrojSlobodnihMesta>0?"#3185FC":"#9A031E"}}," "+e.data.BrojSlobodnihMesta+" "),"/ ",e.data.BrojMesta)),s.a.createElement("div",{className:"detailsRow clickableRow",onClick:function(){d(!0)}},s.a.createElement("i",{className:"material-icons detailIcon"},"book"),s.a.createElement("h1",{className:"detailRowText"},"Napravi rezervaciju")),s.a.createElement(v.a,null,["kafic1.jpg","kafic2.jpg","kafic3.jpg"].map((function(e,a){return s.a.createElement(v.a.Item,{key:a},s.a.createElement("img",{className:"d-block w-100",src:"./slike/carouselMock/"+e,alt:a+1+". slika"}))}))),s.a.createElement("div",{className:"detailsRow"},s.a.createElement("i",{className:"material-icons detailIcon greyText"},"access_time"),function(){var a=e.data.Details.RadnoVreme,t=a.split(" - ")[0],n=a.split(" - ")[1],o=w()(),i=!1,l=!1;return o.isBetween(w()("00:00","HH:mm"),w()("05:00","HH:mm"))&&(l=!0),w()(n,"HH:mm").isBetween(w()("00:00","HH:mm"),w()("05:00","HH:mm"))&&(i=!0),o.isBetween(w()(t,"HH:mm").subtract(l?1:0,"days"),w()(n,"HH:mm").add(i?1:0,"days"))?s.a.createElement("h1",{className:"detailRowText"},s.a.createElement("span",{className:"greyText"},"Otvoreno: "),s.a.createElement("span",{style:{color:"#009A1F"}},a)):s.a.createElement("h1",{className:"detailRowText"},s.a.createElement("span",{className:"greyText"},"Zatvoreno: "),s.a.createElement("span",{style:{color:"#C50505"}},a))}()),s.a.createElement("div",{className:"detailsRow clickableRow",onClick:function(){window.open(e.data.Details.Lokacija,"_blank")}},s.a.createElement("i",{className:"material-icons detailIcon"},"map"),s.a.createElement("h1",{className:"detailRowText"},"Prika\u017ei na mapi")),s.a.createElement("div",{className:"detailAbout"},s.a.createElement("div",{className:"detailsRowSimple"},s.a.createElement("i",{className:"material-icons detailIcon greyText"},"info"),s.a.createElement("h1",{className:"detailRowText greyText"},"O mestu")),s.a.createElement("p",{className:"detailsAboutText"},e.data.Details.Opis)),s.a.createElement(k.a,{show:m,onHide:u,centered:!0},s.a.createElement(k.a.Body,null,s.a.createElement("div",{className:"modalInputDiv w-50"},s.a.createElement("h5",{className:"greyText boldText"},"Broj mesta"),s.a.createElement("p",{className:"modalInputText greyText "},s.a.createElement("span",{className:"clickable",onClick:function(){o>1&&i(o-1)}}," - "),s.a.createElement("span",null,o),s.a.createElement("span",{className:"clickable",onClick:function(){i(o+1)}}," + "))),s.a.createElement("div",{className:"modalInputDiv"},s.a.createElement("h5",{className:"greyText boldText"},"Datum & vreme"),s.a.createElement("p",{className:"greyText modalInputTextDate"},"12/01/2020 21:30")),s.a.createElement("button",{className:"buttonReserve boldText",onClick:function(){u()}},"Rezervi\u0161i"),s.a.createElement("button",{className:"buttonCancel boldText",onClick:function(){u()}},"Odustani"))))},N=t(37),j=t.n(N),x=t(38),I=t.n(x),T=t(28),S=function(e){var a=Object(n.useState)(!1),t=Object(c.a)(a,2),o=t[0],i=t[1],l=Object(n.useState)(""),r=Object(c.a)(l,2),m=r[0],u=r[1],p=Object(n.useState)(""),g=Object(c.a)(p,2),h=g[0],b=g[1];return s.a.createElement("div",{className:"loginScreen"},s.a.createElement(T.Fade,{when:!0,appear:!0,bottom:!0,delay:500,duration:1e3},s.a.createElement("img",{className:"loginLogo",src:d.a})),s.a.createElement("p",{className:"loginParagraph"},"Pogledajte ta\u010dan broj slobodnih mesta u svom omiljenom kafi\u0107u ili restoranu i rezervi\u0161ite mesto za posebne prilike"),s.a.createElement(T.Zoom,{when:o,bottom:!0,duration:1e3},s.a.createElement("div",null,s.a.createElement("img",{className:"loginProfileImageLoaded",src:m}),s.a.createElement("p",{className:"loginParagraph"},h))),s.a.createElement(j.a,{clientId:"873302302315-mv8lh0772kbe55nvh687qpv8ddvlv9t0.apps.googleusercontent.com",buttonText:"Login",onSuccess:function(a){i(!0),u(a.profileObj.imageUrl),b(a.profileObj.name),setTimeout((function(){e.setAuthorized(!0)}),2e3)},onFailure:function(e){alert("Something is wrong with Google login")},cookiePolicy:"single_host_origin",render:function(e){return s.a.createElement("div",{className:"google-btn",onClick:e.onClick,disabled:e.disabled},s.a.createElement("img",{className:"google-icon",src:"https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"}),s.a.createElement("p",{className:"google-text"},s.a.createElement("b",null,"Sign in with Google")))}}),s.a.createElement(I.a,{appId:"503529696932140",autoLoad:!1,fields:"name,email,picture",authType:"reauthenticate",tag:function(e){return s.a.createElement("div",{className:"facebook-btn",onClick:e.onClick},s.a.createElement("img",{className:"facebook-icon",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/267px-F_icon.svg.png"}),s.a.createElement("p",{className:"facebook-text"},s.a.createElement("b",null,"Sign in with Facebook")))},callback:function(a){i(!0),u(a.picture.data.url),b(a.name),setTimeout((function(){e.setAuthorized(!0)}),2e3)},onFailure:function(){console.log("Something is wrong with Facebook sign in")}}))},L=t(23),O=t.n(L);t(33);var B=function(e){var a=Object(n.useState)(!1),t=Object(c.a)(a,2),o=t[0],i=t[1],m=Object(n.useState)(!1),d=Object(c.a)(m,2),u=d[0],g=d[1],b=Object(n.useState)(Object(l.a)(r)),f=Object(c.a)(b,2),w=f[0],v=f[1],k=Object(n.useState)(null),N=Object(c.a)(k,2),j=N[0],x=N[1],I=Object(n.useState)(""),T=Object(c.a)(I,2),L=T[0],B=T[1];Object(n.useEffect)((function(){var e=E.a.parse(window.location.search);e.view&&x(parseInt(e.view,10))}),[]),Object(n.useEffect)((function(){j?window.history.pushState({},"",window.location.pathname+"?"+E.a.stringify({view:j})):window.history.pushState({},"",window.location.pathname)}),[j]),Object(n.useEffect)((function(){v(C())}),[L]),Object(n.useEffect)((function(){g(0===w.length)}),[w]);var C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,a=e.filter((function(e){return e.Title.trim().toLowerCase().indexOf(L.trim().toLowerCase())>-1}));return h.a.orderBy(a,"BrojSlobodnihMesta","desc")},M=function(){return s.a.createElement(n.Fragment,null,s.a.createElement("div",{className:"mainHeader"},s.a.createElement("img",{src:p.a,className:"logoHeader"}),s.a.createElement("div",{className:"search"},s.a.createElement("i",{className:"material-icons",id:"searchIcon"},"search"),s.a.createElement("input",{className:"searchInput",placeholder:"Pretra\u017ei...",value:L,onChange:function(e){B(e.target.value)}}))),u?s.a.createElement("div",{className:"noResults boldText"},s.a.createElement("h1",null,"Mesto koje tra\u017eite nije prona\u0111eno"),s.a.createElement("i",{className:"material-icons noResultsIcon"},"sentiment_very_dissatisfied")):w.map((function(e){return s.a.createElement("div",{key:e.ID,className:"singleLine button",onClick:function(){x(e.ID)}},s.a.createElement("img",{className:"listLogo",src:"./slike/"+e.Logo}),s.a.createElement("h1",{className:"lineTitle boldText"},e.Title),s.a.createElement("p",{className:"lineFreeSeats boldText greyText"},e.BrojSlobodnihMesta," / ",e.BrojMesta),s.a.createElement("i",{className:"material-icons peopleIcon",style:{color:e.BrojSlobodnihMesta>0?"#3185FC":"#9A031E"}},"people"))})))};return s.a.createElement("div",{className:"App"},o&&s.a.createElement(n.Fragment,null,s.a.createElement(O.a,{when:!j,collapse:!0,left:!0,duration:300},s.a.createElement("div",{className:"list"},!j&&M())),s.a.createElement(O.a,{when:j,collapse:!0,right:!0,delay:10,duration:300},s.a.createElement("div",{className:"details"},j&&s.a.createElement(y,{data:h.a.find(r,{ID:j}),setSelected:x})))),!o&&s.a.createElement(n.Fragment,null,s.a.createElement(S,{authorized:o,setAuthorized:i})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[42,1,2]]]);
//# sourceMappingURL=main.34b44afb.chunk.js.map