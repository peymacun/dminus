(function(){
  const menu=document.querySelector('.menu');
  const header=document.querySelector('.header');
  if(menu&&header){menu.addEventListener('click',()=>{header.classList.toggle('mobile-open');menu.setAttribute('aria-expanded',header.classList.contains('mobile-open')?'true':'false')});}
  document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>header&&header.classList.remove('mobile-open')));
  const form=document.querySelector('#lead-form');
  if(form){form.addEventListener('submit',function(e){e.preventDefault();const d=new FormData(form);const lang=document.documentElement.lang;const subjects={de:'dMinus Anfrage',tr:'dMinus İletişim Talebi',en:'dMinus Enquiry'};const lines=[];for(const [k,v] of d.entries())lines.push(k+': '+v);window.location.href='mailto:info@dminus.co?subject='+encodeURIComponent(subjects[lang]||subjects.en)+'&body='+encodeURIComponent(lines.join('\n'));});}
})();
