(function(){
  var $=function(s,r){return (r||document).querySelectorAll(s)},d=document,root=d.documentElement;
  // 滚动浮现
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  $('.rv,.rvx,.sgrid figure').forEach(function(el){io.observe(el)});
  // 手机菜单
  var menu=d.querySelector('.menu');
  function setMenu(open){root.classList.toggle('mo',open);if(menu)menu.setAttribute('aria-hidden',open?'false':'true');$('.mb').forEach(function(b){b.setAttribute('aria-expanded',open?'true':'false')})}
  $('.mb').forEach(function(b){b.addEventListener('click',function(){setMenu(true)})});
  $('.mx,.menu a').forEach(function(b){b.addEventListener('click',function(){setMenu(false)})});
  addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
  // 首屏轮播：第一张只在第一次打开时做开场
  $('[data-carousel]').forEach(function(c){
    var s=$('.slide',c),dt=$('.dots button',c),i=0,t=null,x0=null;if(s.length<2)return;
    function pre(k){var im=s[(k+s.length)%s.length].querySelector('img[data-src]');if(im)load(im)}
    function go(n,user){s[i].classList.remove('on');dt[i].classList.remove('on');i=(n+s.length)%s.length;pre(i);pre(i+1);s[i].classList.remove('first');s[i].classList.add('on');dt[i].classList.add('on');if(user)auto()}
    function auto(){clearInterval(t);t=setInterval(function(){go(i+1)},5200)}
    dt.forEach(function(b,k){b.addEventListener('click',function(){go(k,true)})});
    var p=c.querySelector('.prev'),n=c.querySelector('.next');if(p)p.addEventListener('click',function(){go(i-1,true)});if(n)n.addEventListener('click',function(){go(i+1,true)});
    c.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
    c.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>44)go(i+(dx<0?1:-1),true)},{passive:true});
    function fill(){pre(1)}
    if(d.readyState==='complete')setTimeout(fill,1200);else addEventListener('load',function(){setTimeout(fill,1200)});
    setTimeout(auto,7000);
  });
  function load(im){if(!im.dataset.src)return;im.srcset=im.dataset.srcset;im.src=im.dataset.src;im.removeAttribute('data-src')}
  // 固定背景：快滚到时才加载
  var bo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){$('img[data-src]',e.target).forEach(load);bo.unobserve(e.target)}})},{rootMargin:'900px 0px'});
  $('.fxs').forEach(function(el){bo.observe(el)});
  // 客人说：一次一条，可左右切换，看得到时自动换
  $('[data-reviews]').forEach(function(w){
    var q=$('blockquote',w),n=w.querySelector('.kwn'),i=0,t=null,vis=false;if(q.length<2)return;
    function go(k){q[i].classList.remove('on');i=(k+q.length)%q.length;q[i].classList.add('on');if(n)n.textContent=(i+1)+' / '+q.length}
    function auto(){clearInterval(t);if(vis)t=setInterval(function(){go(i+1)},8000)}
    w.querySelector('.prev').addEventListener('click',function(){go(i-1);auto()});w.querySelector('.next').addEventListener('click',function(){go(i+1);auto()});
    new IntersectionObserver(function(es){vis=es[0].isIntersecting;auto()}).observe(w);
  });
  // 影片：进入视口才加载和播放，离开就暂停
  // 关于页横幅两支影片形状差很多（电脑扁、手机方），按横幅实际的宽高比挑更接近的那支；没写比例的（首页）照旧按屏幕宽度
  function pick(v){var a=+v.dataset.arLg,b=+v.dataset.arSm,r=v.clientWidth/(v.clientHeight||1);
    if(a&&b)return Math.abs(Math.log(r/a))<=Math.abs(Math.log(r/b))?v.dataset.srcLg:v.dataset.srcSm;
    return matchMedia('(max-width:760px)').matches?v.dataset.srcSm:v.dataset.srcLg}
  $('.film video, .ahero video').forEach(function(v){
    var loaded=false,vo=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){if(!loaded){if(v.dataset.poster)v.poster=v.dataset.poster;v.src=pick(v);loaded=true}var pr=v.play();if(pr&&pr.catch)pr.catch(function(){})}
      else if(loaded)v.pause()})},{rootMargin:'200px 0px'});vo.observe(v)});
  // 照片带离开视口暂停
  var lp=new IntersectionObserver(function(es){es.forEach(function(e){var t=e.target.querySelector('.tr');if(t)t.classList.toggle('paused',!e.isIntersecting)})});
  $('.rib').forEach(function(el){lp.observe(el)});
  // 作品页筛选（也支持 portfolio.html#婚礼）
  function filt(f){$('.chips button').forEach(function(x){x.classList.toggle('on',x.dataset.f===f)});
    $('.cards.pf .card').forEach(function(c){c.classList.toggle('hide',f!=='all'&&c.dataset.kind!==f);c.classList.add('in')})}
  $('.chips button').forEach(function(b){b.addEventListener('click',function(){filt(b.dataset.f)})});
  if($('.chips').length&&location.hash){var h=decodeURIComponent(location.hash.slice(1));if(d.querySelector('.chips [data-f="'+h+'"]'))filt(h)}
  // 咨询表单
  $('form[data-inquiry]').forEach(function(form){
    var map={portrait:['个人旅行肖像'],couple:['情侣拍摄'],proposal:['求婚拍摄'],wedding:['婚礼拍摄'],elopement:['Other','私奔 / 小型仪式']};
    if(form.dataset.types){try{map=JSON.parse(form.dataset.types)}catch(e){}}   // 其他语言的选项值写在表单上
    function sync(sel){var box=d.getElementById(sel.dataset.other);if(!box)return;var on=sel.value==='Other',inp=box.querySelector('input');box.hidden=!on;inp.disabled=!on;inp.required=on}
    $('select[data-other]',form).forEach(function(sel){sel.addEventListener('change',function(){sync(sel)});sync(sel)});
    var tp=new URLSearchParams(location.search).get('type'),st=form.querySelector('#f-type');
    if(tp&&map[tp]&&st){st.value=map[tp][0];sync(st);if(map[tp][1]){var o=d.getElementById('f-type-ot');if(o)o.value=map[tp][1]}}
    var today=new Date(),iso=new Date(today.getTime()-today.getTimezoneOffset()*6e4).toISOString().slice(0,10);
    var d1=form.querySelector('#f-date'),d2=form.querySelector('#f-date2');
    // 日期：不能早于今天，结束日期不能早于拍摄日期。iPhone 的日期滚轮不认 min，选错了这里清掉并在框下面说明
    function note(el,t){var s=el.parentNode.querySelector('.fe');if(!s){s=d.createElement('small');s.className='fe';s.setAttribute('role','alert');el.parentNode.appendChild(s)}s.textContent=t||''}
    function chk(){if(d1){if(d1.value&&d1.value<iso){d1.value='';note(d1,form.dataset.past)}else if(d1.value)note(d1,'');if(d2)d2.min=d1.value||iso}
      if(d2){var lo=(d1&&d1.value)||iso;if(d2.value&&d2.value<lo){d2.value='';note(d2,(d1&&d1.value)?form.dataset.order:form.dataset.past)}else if(d2.value)note(d2,'')}}
    if(d1){d1.min=iso;d1.addEventListener('change',chk);d1.addEventListener('blur',chk)}if(d2){d2.min=iso;d2.addEventListener('change',chk);d2.addEventListener('blur',chk)}
    var msg=form.querySelector('.msg'),btn=form.querySelector('button[type=submit]');
    form.addEventListener('submit',function(e){e.preventDefault();
      msg.classList.remove('err');msg.textContent=msg.dataset.sending;btn.disabled=true;
      fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}}).then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok||j.success===false)throw 0})})
      .then(function(){form.reset();$('select[data-other]',form).forEach(sync);$('.fe',form).forEach(function(s){s.textContent=''});msg.textContent=msg.dataset.ok})
      .catch(function(){msg.textContent=msg.dataset.err;msg.classList.add('err')})
      .then(function(){btn.disabled=false;msg.focus&&msg.focus()})});
  });

  // 价格从高往下减到起价（首页影片上的价格、报价页的起价）
  var easeOut=function(t){return 1-Math.pow(1-t,3)},still=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function show(el,v){var n=+el.dataset.count;el.textContent=(el.dataset.pre||'')+(n>999?v.toLocaleString('en-US').replace(/,/g,el.dataset.sep||','):v)+(el.dataset.post||'')}
  var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var el=e.target,n=+el.dataset.count,from=n*3,t0=null,dur=1500;
    function f(ts){if(!t0)t0=ts;var k=Math.min(1,(ts-t0)/dur);show(el,Math.round(from-(from-n)*easeOut(k)));if(k<1)requestAnimationFrame(f)}requestAnimationFrame(f)})},{threshold:.6});
  if(!still)$('[data-count]').forEach(function(el){show(el,+el.dataset.count*3);co.observe(el)});
  // 常见问题标题：逐字打出来
  $('[data-type]').forEach(function(h){
    if(root.classList.contains('seen')||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    var full=h.innerHTML,txt=full.replace(/<br\s*\/?>/g,'\n'),i=0;h.style.minHeight=h.offsetHeight+'px';h.innerHTML='<span class="caret"></span>';
    setTimeout(function step(){i++;var s=txt.slice(0,i).replace(/\n/g,'<br>');h.innerHTML=s+'<span class="caret"></span>';if(i<txt.length)setTimeout(step,95);else setTimeout(function(){h.innerHTML=full},1600)},900)});
  // 常见问题：展开收起有高度过渡
  $('details.js-acc').forEach(function(dt){var sm=dt.querySelector('summary'),an=dt.querySelector('.ans');
    sm.addEventListener('click',function(e){e.preventDefault();
      if(dt.open){an.style.height=an.scrollHeight+'px';dt.classList.remove('op');requestAnimationFrame(function(){requestAnimationFrame(function(){an.style.height='0px'})});
        setTimeout(function(){dt.open=false;an.style.height=''},560)}
      else{dt.open=true;an.style.height='0px';requestAnimationFrame(function(){dt.classList.add('op');an.style.height=an.scrollHeight+'px'});setTimeout(function(){if(dt.open)an.style.height='auto'},580)}})});
  // 常见问题：分类导航跟着滚动高亮
  var fqs=$('.fq'),fnl=$('.faqn a[href^="#"]');
  if(fqs.length&&fnl.length){var fo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var id=e.target.id;fnl.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+id)})}})},{rootMargin:'-35% 0px -55% 0px'});fqs.forEach(function(x){fo.observe(x)})}
  // 流程：时间线跟着滚动画出来
  var stp=d.querySelector('.steps'),stl=stp&&stp.querySelector('.line i'),sli=stp?$('li',stp):[];
  function steps(){if(!stp)return;var r=stp.getBoundingClientRect(),k=Math.max(0,Math.min(1,(innerHeight*.62-r.top)/r.height));stl.style.height=(k*100)+'%';
    sli.forEach(function(li){li.classList.toggle('lit',li.getBoundingClientRect().top<innerHeight*.62)})}

  // 微信：点一下复制微信号
  $('[data-copy]').forEach(function(b){var tip=b.getAttribute('data-tip');b.addEventListener('click',function(){var v=b.dataset.copy;
    function ok(){b.setAttribute('data-tip',(b.dataset.done||'已复制微信号 ')+v);b.classList.add('on');setTimeout(function(){b.classList.remove('on');b.setAttribute('data-tip',tip)},2200)}
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(v).then(ok,ok);else ok()})});
  // 整组页和单张墙：点开看大图，可左右切换
  var all=$('.sgrid figure,.wall figure'),figs=[];
  if(all.length){var LB={en:['Previous','Next','Close'],fr:['Précédente','Suivante','Fermer'],de:['Zurück','Weiter','Schließen']}[(d.documentElement.lang||'').slice(0,2)]||['上一张','下一张','关闭'];var lb=d.createElement('div'),li=0,lx=null;lb.className='lb';lb.setAttribute('role','dialog');
    lb.innerHTML='<img alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"><button type="button" class="arr prev" aria-label="'+LB[0]+'"><svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg></button><button type="button" class="arr next" aria-label="'+LB[1]+'"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></button><button type="button" class="x" aria-label="'+LB[2]+'"></button><p class="n"></p>';
    d.body.appendChild(lb);var im=lb.querySelector('img'),nn=lb.querySelector('.n');
    function big(i){var s=figs[i].querySelector('img'),ss=(s.getAttribute('srcset')||'').split(',').map(function(x){return x.trim().split(' ')[0]}).filter(Boolean);return ss.length?ss[ss.length-1]:s.currentSrc||s.src}
    function open(i){li=(i+figs.length)%figs.length;im.src=big(li);im.alt=figs[li].querySelector('img').alt||'';nn.textContent=(li+1)+' / '+figs.length;lb.classList.add('on');root.classList.add('lock')}
    function close(){lb.classList.remove('on');root.classList.remove('lock')}
    all.forEach(function(f){f.addEventListener('click',function(){figs=[].filter.call(all,function(x){return x.offsetParent!==null});open(figs.indexOf(f))})});
    lb.querySelector('.prev').addEventListener('click',function(e){e.stopPropagation();open(li-1)});lb.querySelector('.next').addEventListener('click',function(e){e.stopPropagation();open(li+1)});
    lb.querySelector('.x').addEventListener('click',close);lb.addEventListener('click',function(e){if(e.target===lb)close()});
    addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')open(li-1);else if(e.key==='ArrowRight')open(li+1)});
    lb.addEventListener('touchstart',function(e){lx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){if(lx===null)return;var dx=e.changedTouches[0].clientX-lx;lx=null;if(Math.abs(dx)>44)open(li+(dx<0?1:-1))},{passive:true})}
  // 顶部导航、进度线、轻微视差
  var fx=d.querySelector('.fx'),prog=d.querySelector('.prog'),tp=d.querySelector('.totop'),par=$('.trio figure'),last=0,dir='down',top0=false,tick=false,wide=matchMedia('(min-width:761px)');
  // 第五轮：四张竖图不再做视差（高低不齐的原因）；导航往上滚就出现，鼠标移到顶部也出现；滚过一屏多出现回到顶部
  if(tp)tp.addEventListener('click',function(e){e.preventDefault();scrollTo({top:0,behavior:'smooth'})});
  addEventListener('mousemove',function(e){var h=e.clientY<(fx&&fx.classList.contains('on')?fx.offsetHeight+16:56);if(h!==top0){top0=h;if(!tick){tick=true;requestAnimationFrame(run)}}},{passive:true});
  function run(){var y=scrollY,h=root.scrollHeight-innerHeight;
    if(prog)prog.style.width=(h>0?y/h*100:0)+'%';
    var dy=y-last;if(Math.abs(dy)>6){dir=dy<0?'up':'down';last=y}
    if(fx)fx.classList.toggle('on',y>innerHeight*.6&&(dir==='up'||(top0&&wide.matches))&&!root.classList.contains('mo'));
    if(tp)tp.classList.toggle('on',y>innerHeight*1.2);
    if(wide.matches)par.forEach(function(el,k){var r=el.getBoundingClientRect();if(r.bottom<-100||r.top>innerHeight+100)return;var p=(r.top+r.height/2-innerHeight/2)/innerHeight;el.style.transform='translateY('+(p*(k%2?-24:24)).toFixed(1)+'px)'});
    steps();tick=false}
  addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(run)}},{passive:true});run();
})();

// 第四轮：页面加载完后提前取底部大图，滚到底不再空着
window.addEventListener('load',function(){setTimeout(function(){
  [].forEach.call(document.querySelectorAll('.end img[loading="lazy"]'),function(i){i.loading='eager'})
},700)});

document.querySelectorAll('.ahero video').forEach(function(v){v.addEventListener('playing',function(){v.classList.add('on')})});
