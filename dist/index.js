(()=>{document.addEventListener("DOMContentLoaded",()=>{let h="savings",v="initial",y="numberOfShares",T="sharePrice",f="value",P="increase",B="change",w="profit",S="sliderVal",C="optionPrice",o=document.getElementById(h),V=document.getElementById(v),L=document.getElementById(y),N=document.getElementById(T),_=document.getElementById(f),r=document.getElementById(P),b=document.getElementById(B),x=document.getElementById(w),X=document.getElementById(S),A=document.getElementById(C),F=document.querySelectorAll('input[name="period"]'),O="https://alpha-pulse.vercel.app/api/eod?id=nwg",d=t=>new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",minimumFractionDigits:2,maximumFractionDigits:2}).format(t),a=null,s=1.88,c=3,D=async()=>{try{let t=await fetch(O);if(!t.ok)throw new Error("Network response was not ok");return(await t.json())[0].price/100}catch(t){console.log("There was a problem with the fetch operation:",t.message)}},R=async()=>{a=await D(),a!==null&&(s=a*.8),N.textContent=d(a),A.textContent=d(s),o.addEventListener("input",()=>{let t=o.value,e=r.value;i(t,e)}),r.addEventListener("input",()=>{let t=o.value,e=r.value;i(t,e)}),F.forEach(t=>{t.addEventListener("change",function(){c=parseInt(this.value,10);let e=o.value,n=r.value;i(e,n)})})},i=(t,e)=>{let n=u=>new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",minimumFractionDigits:0,maximumFractionDigits:0}).format(u),G=u=>new Intl.NumberFormat().format(u),m=t*12*c,l=0;c===3?l=1.1*t:c===5&&(l=3.2*t);let p=m+l,E=Math.floor(p/s),g=Math.round(E*a),I=g*(1+e/100),M=I-m;V.textContent=n(p),L.textContent=G(E),_.textContent=n(g),b.textContent=n(I),x.textContent=n(M)};R(),o.addEventListener("input",t=>{let e=t.target.reportValidity();t.target.setAttribute("aria-invalid",!e)}),console.log("live")});})();