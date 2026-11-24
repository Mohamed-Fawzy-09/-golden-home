const D={profiles:[['كرافت لاين تركي / تقفيل مصري',3800],['نيولاين اقتصادي مصري',3300],['سيتي برمير',3500]],openings:[['جرار',0],['مفصلي',0],['قلاب',0]],openings:[[مفصلي ضلفه],[مفصلي ضلفتين]],glass:[['زجاج أبيض شفاف سنجل',0],['زجاج أبيض عاكس',0],['زجاج أبيض مسنفر سنجل',0],['زجاج دبل جورجيا',600]],inners:[['زجاج',0],['بانل',0]],addons:[['سلك بليسيه',750],['سلك عادي',250],['إكسسوارات خاصة',0],['نقل وتركيب',0]],minArea:1};let C;try{C={...D,...JSON.parse(localStorage.gh_catalog||'{}')}}catch{C=D}let I=[];const $=s=>document.querySelector(s),M=n=>(+n||0).toLocaleString('en-US')+' ج.م',E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));function nav(){let b=$('.menu');if(b)b.onclick=()=>$('.nav').classList.toggle('open')}function opts(a,v){return a.map(x=>`<option ${x[0]===v?'selected':''}>${E(x[0])}</option>`).join('')}function addItem(){I.push({id:Date.now()+Math.random(),kind:'شباك',w:120,h:120,q:1,p:C.profiles[0][0],o:'جرار',g:C.glass[0][0],n:'زجاج',a:[]});drawItems()}function A(x){return Math.max(+C.minArea||1,(+x.w)*(+x.h)/10000)}function R(x){return (C.profiles.find(a=>a[0]===x.p)?.[1]||0)+(C.openings.find(a=>a[0]===x.o)?.[1]||0)+(C.glass.find(a=>a[0]===x.g)?.[1]||0)+x.a.reduce((s,n)=>s+(C.addons.find(a=>a[0]===n)?.[1]||0),0)}function calc(x){return {a:A(x),r:R(x),t:A(x)*R(x)*x.q}}
function sketch(x) {
  const frame = `
    <rect x="55" y="12" width="130" height="125"
      fill="#cfe6f6" stroke="#7d8998" stroke-width="5"/>
  `;

  if (x.o === 'مفصلي') {
    return `<svg viewBox="0 0 240 160">
      ${frame}
      <g fill="none" stroke="#456078"
        stroke-width="5" stroke-linecap="square"
        stroke-linejoin="miter">
        <path d="M65 22 L120 65 L120 95 L65 130"/>
        <path d="M175 22 L120 65 L120 95 L175 130"/>
      </g>
    </svg>`;
  }

  if (x.o === 'قلاب') {
    return `<svg viewBox="0 0 240 160">
      ${frame}
      <g fill="none" stroke="#456078"
        stroke-width="5" stroke-linecap="square"
        stroke-linejoin="miter">
        <path d="M120 22 L65 130"/>
        <path d="M120 22 L175 130"/>
      </g>
    </svg>`;
  }

  let p = '';

  if (x.o === 'جرار') {
    p = `
      <path d="M120 20V130"/>
      <path d="M105 75H68 M76 67L68 75L76 83"/>
      <path d="M135 75H172 M164 67L172 75L164 83"/>
    `;
  }

  return `<svg viewBox="0 0 240 160">
    ${frame}
    <g fill="none" stroke="#456078" stroke-width="3"
      stroke-linecap="round" stroke-linejoin="round">${p}</g>
    <text x="120" y="154" text-anchor="middle"
      font-size="11" fill="#456078">${x.w} سم</text>
  </svg>`;
}
function drawItems(){let h=$('#items');if(!h)return;h.innerHTML=I.map((x,i)=>{let c=calc(x);return `<section class="panel"><div class="item-head"><b>بند ${i+1} — ${x.kind}</b><button onclick="removeItem('${x.id}')">حذف</button></div><div class="item-body"><h4>المقاسات والكمية</h4><div class="measure">${field('العرض سم','w',x.w,x.id)}${field('الارتفاع سم','h',x.h,x.id)}${field('العدد','q',x.q,x.id)}</div><div class="area">المساحة المحاسبية <b>${c.a.toFixed(2)} م²</b></div><div class="specs"><label class="field">نوع البند<select onchange="patch('${x.id}','kind',this.value)"><option>شباك</option><option ${x.kind==='باب'?'selected':''}>باب</option></select></label><label class="field">القطاع<select onchange="patch('${x.id}','p',this.value)">${opts(C.profiles,x.p)}</select></label><label class="field">نوع الفتح<select onchange="patch('${x.id}','o',this.value)">${opts(C.openings,x.o)}</select></label><label class="field">الجزء الداخلي<select onchange="patch('${x.id}','n',this.value)">${opts(C.inners,x.n)}</select></label><label class="field full">الزجاج<select onchange="patch('${x.id}','g',this.value)">${opts(C.glass,x.g)}</select></label></div><div class="preview">${sketch(x)}<p>معاينة نوع الفتح: ${x.o}</p></div><h4>إضافات اختيارية</h4><div class="addons">${C.addons.map(a=>`<label class="addon"><input type="checkbox" ${x.a.includes(a[0])?'checked':''} onchange="toggleAddon('${x.id}','${E(a[0])}',this.checked)">${E(a[0])}<small>+${M(a[1])}/م²</small></label>`).join('')}</div><div class="totalbar"><span>سعر المتر: ${M(c.r)}</span><strong>إجمالي البند: ${M(c.t)}</strong></div></div></section>`}).join('');totals()}function field(l,k,v,id){return `<label class="field">${l}<input type="number" min="1" value="${v}" onchange="patch('${id}','${k}',this.value)"></label>`}function patch(id,k,v){let x=I.find(a=>String(a.id)===id);x[k]=['w','h','q'].includes(k)?Math.max(1,+v):v;drawItems()}function toggleAddon(id,n,on){let x=I.find(a=>String(a.id)===id);x.a=on?[...new Set([...x.a,n])]:x.a.filter(v=>v!==n);drawItems()}function removeItem(id){I=I.filter(x=>String(x.id)!==id);drawItems()}function totals(){let sub=I.reduce((s,x)=>s+calc(x).t,0),ar=I.reduce((s,x)=>s+calc(x).a*x.q,0),d=+($('#discount')?.value||0),off=$('#discountType')?.value==='percent'?sub*Math.min(d,100)/100:Math.min(d,sub),t=Math.max(0,sub-off);if($('#areaTotal'))$('#areaTotal').textContent=ar.toFixed(2)+' م²';if($('#subTotal'))$('#subTotal').textContent=M(sub);if($('#finalTotal'))$('#finalTotal').textContent=M(t);return {sub,off,t,ar}}function saveQuote(){let q=JSON.parse(localStorage.gh_quotes||'[]'),t=totals();q.push({client:$('#client').value,phone:$('#phone').value,address:$('#address').value,date:$('#date').value,items:I,totals:t});localStorage.gh_quotes=JSON.stringify(q);alert('تم حفظ العرض على هذا الجهاز.')}function printQuote(){let t=totals();if(!I.length)return alert('أضف بندًا أولًا');let w=window.open('','_blank');if(!w)return alert('اسمح بالنوافذ المنبثقة');let rows=I.map((x,i)=>`<tr><td>${i+1}</td><td>${E(x.kind)} / ${E(x.p)} / ${E(x.o)} / ${E(x.g)}</td><td>${x.w}×${x.h}</td><td>${x.q}</td><td>${calc(x).a.toFixed(2)}</td><td>${M(calc(x).r)}</td><td>${M(calc(x).t)}</td></tr>`).join('');w.document.write(`<html lang="ar" dir="rtl"><meta charset="utf-8"><h1>GOLDEN HOME</h1><h2>عرض سعر</h2><p>العميل: ${E($('#client').value)} — الهاتف: ${E($('#phone').value)}</p><table border="1" cellpadding="8" width="100%"><tr><th>#</th><th>المواصفات</th><th>المقاس</th><th>عدد</th><th>م²</th><th>سعر المتر</th><th>الإجمالي</th></tr>${rows}</table><h2>الإجمالي النهائي: ${M(t.t)}</h2><script>onload=()=>print()</script></html>`);w.document.close()}function renderPrices(){let e=$('#priceList');if(!e)return;e.innerHTML=[['القطاعات',C.profiles],['أنواع الفتح',C.openings],['الزجاج',C.glass],['الإضافات',C.addons]].map(([h,a])=>`<section class="panel"><h3>${h}</h3><table class="table"><tr><th>النوع</th><th>السعر / م²</th></tr>${a.map(x=>`<tr><td>${E(x[0])}</td><td>${M(x[1])}</td></tr>`).join('')}</table></section>`).join('')+`<p>الحد الأدنى للمساحة: ${C.minArea} م²</p>`}function loginAdmin(){if($('#pin').value!==(localStorage.gh_pin||'1234'))return alert('رمز الدخول غير صحيح');$('#loginBox').classList.add('hidden');$('#adminBox').classList.remove('hidden');renderAdmin()}function renderAdmin(){let e=$('#adminFields');if(!e)return;e.innerHTML=[['profiles','القطاعات'],['openings','أنواع الفتح'],['glass','الزجاج'],['inners','الأجزاء الداخلية'],['addons','الإضافات']].map(([k,h])=>`<section class="panel"><h3>${h}</h3>${C[k].map((x,i)=>`<div class="adminrow"><input data-k="${k}" data-i="${i}" data-p="0" value="${E(x[0])}"><input type="number" data-k="${k}" data-i="${i}" data-p="1" value="${x[1]}"><button onclick="C['${k}'].splice(${i},1);renderAdmin()">×</button></div>`).join('')}<button class="btn dark" onclick="C.${k}.push(['اختيار جديد',0]);renderAdmin()">＋ إضافة</button></section>`).join('')+`<section class="panel"><label class="field">الحد الأدنى للمساحة<input id="minArea" type="number" value="${C.minArea}"></label></section>`}function saveAdmin(){document.querySelectorAll('[data-k]').forEach(e=>C[e.dataset.k][+e.dataset.i][+e.dataset.p]=+e.dataset.p===1?Math.max(0,+e.value):e.value);C.minArea=Math.max(.01,+$('#minArea').value||1);localStorage.gh_catalog=JSON.stringify(C);alert('تم حفظ الأسعار لهذا المتصفح.')}function changePin(){let old=prompt('رمز الإدارة الحالي');if(old!==(localStorage.gh_pin||'1234'))return alert('رمز غير صحيح');let n=prompt('الرمز الجديد');if(n&&n.length>=4){localStorage.gh_pin=n;alert('تم تغيير الرمز')}}function renderQuotes(){let e=$('#quotes'),q=JSON.parse(localStorage.gh_quotes||'[]');if(e)e.innerHTML=q.length?q.slice().reverse().map(x=>`<section class="panel"><h3>${E(x.client||'عميل')}</h3><p>${E(x.phone||'')} — ${E(x.address||'')}</p><b>${M(x.totals?.t||0)}</b></section>`).join(''):'لا توجد عروض محفوظة على هذا الجهاز.'}function renderCustomers(){let e=$('#customers'),q=JSON.parse(localStorage.gh_quotes||'[]'),m=new Map();q.forEach(x=>m.set(x.phone||x.client,x));if(e)e.innerHTML=m.size?[...m.values()].map(x=>`<section class="panel"><h3>${E(x.client||'—')}</h3><p>${E(x.phone||'')}</p><p>${E(x.address||'')}</p></section>`).join(''):'لا توجد بيانات عملاء محفوظة.'}document.addEventListener('DOMContentLoaded',()=>{nav();if($('#items')){if($('#date'))$('#date').value=new Date().toISOString().slice(0,10);addItem()}renderPrices();renderQuotes();renderCustomers()});
