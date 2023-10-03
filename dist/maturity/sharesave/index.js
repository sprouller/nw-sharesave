(()=>{document.addEventListener("DOMContentLoaded",()=>{let g="optionPrice",E="savings",v="totalSaved",I="numberOfShares",T="sharePrice",y="initialShareValue",h="initialProfit",P="increase",f="change",S="profit",B=document.getElementById(g),n=document.getElementById(E),w=document.getElementById(v),_=document.getElementById(I),C=document.getElementById(T),O=document.getElementById(y),V=document.getElementById(h),o=document.getElementById(P),F=document.getElementById(f),N=document.getElementById(S),b=document.querySelectorAll('input[name="period"]'),x="https://alpha-pulse.vercel.app/api/eod?id=nwg",A=t=>new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",minimumFractionDigits:2,maximumFractionDigits:2}).format(t),D=t=>new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",minimumFractionDigits:4,maximumFractionDigits:4}).format(t),L=t=>new Intl.NumberFormat().format(t),s=null,r=1.88,i=3,G=async()=>{try{let t=await fetch(x);if(!t.ok)throw new Error("Network response was not ok");return(await t.json())[0].price/100}catch(t){console.log("There was a problem with the fetch operation:",t.message)}},l=t=>t.replace(/[£,]/g,""),R=t=>t.replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,","),X=async()=>{s=await G(),C.textContent=A(s),n.addEventListener("input",()=>{n.value=R(n.value),n.value="\xA3"+n.value;let t=l(n.value),e=o.value;u(t,e)}),o.addEventListener("input",()=>{let t=l(n.value),e=o.value;u(t,e)}),b.forEach(t=>{t.addEventListener("change",function(){i=parseInt(this.value,10);let e=l(n.value),a=o.value;u(e,a),B.textContent=D(r)})})},u=(t,e)=>{let a=k=>new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",minimumFractionDigits:0,maximumFractionDigits:0}).format(k);i===3?r=1.7829:i===5&&(r=2.2699);let c=t*12*i;w.textContent=a(c);let d=Math.floor(c/r);_.textContent=L(d);let m=d*s;O.textContent=a(d);let M=m-c;V.textContent=a(M);let p=m*(1+e/100);F.textContent=a(p);let U=p-c;N.textContent=a(U)};X(),n.addEventListener("input",t=>{let e=t.target.reportValidity();t.target.setAttribute("aria-invalid",!e)}),console.log("live")});})();
