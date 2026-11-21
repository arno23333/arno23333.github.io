(function(){
var KEY='fts-consent',TAG='GTM-W5FL68SQ',SIX_MONTHS=183*864e5;
var T={
zh:{t:'这个网站想用 Google Analytics 了解访客看了哪些页面，帮助改进内容，只有你同意后才会启用，不用于广告',a:'同意',d:'拒绝',m:'隐私政策',s:'Cookie 设置'},
en:{t:'This site would like to use Google Analytics to see which pages visitors view and improve the content. It is only switched on if you agree and is not used for advertising.',a:'Accept',d:'Decline',m:'Privacy policy',s:'Cookie settings'},
fr:{t:'Ce site souhaite utiliser Google Analytics pour savoir quelles pages sont consultées et améliorer le contenu. Il n’est activé qu’avec votre accord et ne sert pas à la publicité.',a:'Accepter',d:'Refuser',m:'Politique de confidentialité',s:'Paramètres des cookies'},
de:{t:'Diese Website möchte Google Analytics nutzen, um zu sehen, welche Seiten besucht werden, und die Inhalte zu verbessern. Es wird nur mit Ihrer Zustimmung aktiviert und nicht für Werbung verwendet.',a:'Akzeptieren',d:'Ablehnen',m:'Datenschutz',s:'Cookie-Einstellungen'}};
var lang=(document.documentElement.lang||'en').slice(0,2).toLowerCase();if(!T[lang])lang='en';var L=T[lang];
function read(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}}
function save(v){try{localStorage.setItem(KEY,JSON.stringify({v:v,t:Date.now()}))}catch(e){}}
var loaded=false;
function load(){if(loaded)return;loaded=true;
var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id='+TAG;document.head.appendChild(s);
window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date())}
function banner(){if(document.getElementById('fts-consent'))return;
var b=document.createElement('div');b.id='fts-consent';b.setAttribute('role','dialog');b.setAttribute('aria-label',L.s);
var sm=window.matchMedia&&matchMedia('(max-width:420px)').matches;
b.style.cssText='position:fixed;'+(sm?'left:10px;right:10px;bottom:10px;padding:14px 16px;':'left:16px;right:16px;bottom:16px;padding:18px 20px;')+'z-index:9999;max-width:760px;margin:0 auto;background:#fbf8f1;color:#1f211d;border:1px solid rgba(31,33,29,.32);border-radius:10px;box-shadow:0 18px 50px rgba(29,31,26,.18);font:'+(sm?'14px/1.55':'15px/1.6')+' var(--font-ui,system-ui,sans-serif)';
var p=document.createElement('p');p.style.cssText='margin:0 0 12px';p.textContent=L.t+' ';
var a=document.createElement('a');a.href='/'+lang+'/privacy.html';a.textContent=L.m;a.style.cssText='color:inherit;text-decoration:underline';p.appendChild(a);
var row=document.createElement('div');row.style.cssText='display:flex;gap:10px;flex-wrap:wrap';
function btn(txt,fn){var x=document.createElement('button');x.type='button';x.textContent=txt;
x.style.cssText='flex:1 1 96px;padding:'+(sm?'8px 12px':'10px 16px')+';border:1px solid #1f211d;border-radius:999px;background:transparent;color:#1f211d;font:inherit;cursor:pointer';
x.addEventListener('click',function(){fn();b.remove()});return x}
row.appendChild(btn(L.d,function(){save('denied')}));row.appendChild(btn(L.a,function(){save('granted');load()}));
b.appendChild(p);b.appendChild(row);document.body.appendChild(b);
// 服务与报价页电脑版第一屏底下是四个价格板块，同意条抬到它上面，不挡着点
var j=document.querySelector('.jump');if(j&&window.matchMedia&&matchMedia('(min-width:761px)').matches)b.style.bottom=(j.offsetHeight+16)+'px'}
function init(){var c=read();
if(c&&c.v==='granted')load();
else if(!c||Date.now()-c.t>SIX_MONTHS)banner();
var f=document.querySelector('.footer-links');
if(f){var link=document.createElement('a');link.href='#';link.textContent=L.s;link.addEventListener('click',function(e){e.preventDefault();banner()});f.appendChild(link)}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
