(()=>{document.addEventListener("DOMContentLoaded",()=>{let r="annualIncome",d="monthlyInvestment",I="calculate",l=document.getElementById(r),e=document.getElementById(d),v=document.getElementById(I),y="monthlySavings",E="trueSharesCost",g=document.getElementById(y),T=document.getElementById(E),V=0,p=11,C=21,S=31,L=21,o=0,n=0,a=0;v.addEventListener("click",()=>{o=parseFloat(m(l.value)),n=parseFloat(m(e.value)),o>44928?a=n*(1-L/100):o>44928?a=n*(1-S/100):o>21e3?a=n*(1-C/100):o>14500?a=n*(1-p/100):a=n;let t=Math.round(a*100)/100;N(t,n)});let m=t=>t.replace(/[£,]/g,""),i=t=>t.replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,","),N=(t,u)=>{let s=c=>new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",minimumFractionDigits:0,maximumFractionDigits:0}).format(c);T.textContent=s(t),g.textContent=s(u-t)};l.addEventListener("input",t=>{l.value=i(l.value),l.value="\xA3"+l.value}),e.addEventListener("input",t=>{e.value=i(e.value),e.value="\xA3"+e.value;let u=m(e.value),s=5,c=150;u<s||u>c?e.setCustomValidity(`Income must be between \xA3${s.toLocaleString()} and \xA3${c.toLocaleString()}.`):e.setCustomValidity("");let B=t.target.reportValidity();t.target.setAttribute("aria-invalid",!B)})});})();
