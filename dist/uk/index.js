(()=>{document.addEventListener("DOMContentLoaded",()=>{let f="savings",T="initial",B="numberOfShares",P="sharePrice",w="value",S="increase",_="change",b="profit",C="sliderVal",L="optionPrice",O="bonusMultiple",V="profitOver3k",o=document.getElementById(f),N=document.getElementById(T),x=document.getElementById(B),F=document.getElementById(P),M=document.getElementById(w),c=document.getElementById(S),A=document.getElementById(_),R=document.getElementById(b),q=document.getElementById(C),D=document.getElementById(L),k=document.getElementById(O),G=document.querySelectorAll('input[name="period"]'),m=document.getElementById(V),U="https://alpha-pulse.vercel.app/api/eod?id=nwg",p=t=>new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",minimumFractionDigits:2,maximumFractionDigits:2}).format(t),s=null,i=1.88,r=3,X=async()=>{try{let t=await fetch(U);if(!t.ok)throw new Error("Network response was not ok");return(await t.json())[0].price/100}catch(t){console.log("There was a problem with the fetch operation:",t.message)}},H=async()=>{s=await X(),s!==null&&(i=s*.8),F.textContent=p(s),D.textContent=p(i),o.addEventListener("input",()=>{let t=o.value,e=c.value;l(t,e)}),c.addEventListener("input",()=>{let t=o.value,e=c.value;l(t,e)}),G.forEach(t=>{t.addEventListener("change",function(){r=parseInt(this.value,10);let e=o.value,n=c.value;l(e,n)})})},l=(t,e)=>{let n=d=>new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",minimumFractionDigits:0,maximumFractionDigits:0}).format(d),j=d=>new Intl.NumberFormat().format(d),E=t*12*r,a=0,u=0;r===3?(a=1.1,u=a*t):r===5&&(a=3.2,u=a*t);let g=E+u,I=Math.floor(g/i),y=Math.round(I*s),h=y*(1+e/100),v=h-E;v<3e3?m.style.display="none":m.style.display="block",k.textContent=a,N.textContent=n(g),x.textContent=j(I),M.textContent=n(y),A.textContent=n(h),R.textContent=n(v)};H(),o.addEventListener("input",t=>{let e=t.target.reportValidity();t.target.setAttribute("aria-invalid",!e)}),console.log("live")});})();