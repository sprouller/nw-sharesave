(()=>{document.addEventListener("DOMContentLoaded",()=>{let y="savings",v="initial",T="numberOfShares",B="sharePrice",P="value",f="increase",w="change",S="profit",C="sliderVal",L="optionPrice",b="bonusMultiple",o=document.getElementById(y),N=document.getElementById(v),V=document.getElementById(T),_=document.getElementById(B),x=document.getElementById(P),c=document.getElementById(f),M=document.getElementById(w),A=document.getElementById(S),H=document.getElementById(C),F=document.getElementById(L),O=document.getElementById(b),D=document.querySelectorAll('input[name="period"]'),R="https://alpha-pulse.vercel.app/api/eod?id=nwg",m=t=>new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",minimumFractionDigits:2,maximumFractionDigits:2}).format(t),a=null,i=1.88,r=3,G=async()=>{try{let t=await fetch(R);if(!t.ok)throw new Error("Network response was not ok");return(await t.json())[0].price/100}catch(t){console.log("There was a problem with the fetch operation:",t.message)}},U=async()=>{a=await G(),a!==null&&(i=a*.8),_.textContent=m(a),F.textContent=m(i),o.addEventListener("input",()=>{let t=o.value,e=c.value;l(t,e)}),c.addEventListener("input",()=>{let t=o.value,e=c.value;l(t,e)}),D.forEach(t=>{t.addEventListener("change",function(){r=parseInt(this.value,10);let e=o.value,n=c.value;l(e,n)})})},l=(t,e)=>{let n=d=>new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",minimumFractionDigits:0,maximumFractionDigits:0}).format(d),X=d=>new Intl.NumberFormat().format(d),p=t*12*r,s=0,u=0;r===3?(s=1.1,u=s*t):r===5&&(s=3.2,u=s*t);let E=p+u,g=Math.floor(E/i),I=Math.round(g*a),h=I*(1+e/100),k=h-p;O.textContent=s,N.textContent=n(E),V.textContent=X(g),x.textContent=n(I),M.textContent=n(h),A.textContent=n(k)};U(),o.addEventListener("input",t=>{let e=t.target.reportValidity();t.target.setAttribute("aria-invalid",!e)}),console.log("live")});})();
