(()=>{document.addEventListener("DOMContentLoaded",()=>{let E="savings",h="initial",I="numberOfShares",y="sharePrice",P="value",S="increase",T="change",L="profit",f="sliderVal",B="optionPrice",N="bonusMultiple",n=document.getElementById(E),w=document.getElementById(h),V=document.getElementById(I),b=document.getElementById(y),C=document.getElementById(P),r=document.getElementById(S),_=document.getElementById(T),x=document.getElementById(L),H=document.getElementById(f),A=document.getElementById(B),G=document.getElementById(N),F=document.querySelectorAll('input[name="period"]'),M="https://alpha-pulse.vercel.app/api/eod?id=nwg",u=e=>new Intl.NumberFormat("pl-PL",{style:"currency",currency:"PLN",minimumFractionDigits:2,maximumFractionDigits:2}).format(e),a=null,c=1.88,d=3,O=5,D=async()=>{try{let e=await fetch(M);if(!e.ok)throw new Error("Network response was not ok");return(await e.json())[0].price/100}catch(e){console.log("There was a problem with the fetch operation:",e.message)}},m=e=>e.replace(/[£,]/g,""),R=e=>e.replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,","),U=async()=>{a=await D(),a!==null&&(convertedSharePrice=a*O,c=convertedSharePrice*.8),b.textContent=u(convertedSharePrice),A.textContent=u(c),n.addEventListener("input",()=>{n.value=R(n.value),n.value="\xA3"+n.value;let e=m(n.value),t=r.value;s(e,t)}),r.addEventListener("input",()=>{let e=m(n.value),t=r.value;s(e,t)}),F.forEach(e=>{e.addEventListener("change",function(){d=parseInt(this.value,10);let t=n.value,o=r.value;s(t,o)})})},s=(e,t)=>{let o=l=>new Intl.NumberFormat("pl-PL",{style:"currency",currency:"PLN",minimumFractionDigits:0,maximumFractionDigits:0}).format(l),X=l=>new Intl.NumberFormat().format(l),i=e*12*d,p=Math.floor(i/c),g=Math.round(p*convertedSharePrice),v=g*(1+t/100),k=v-i;w.textContent=o(i),V.textContent=X(p),C.textContent=o(g),_.textContent=o(v),x.textContent=o(k)};U(),n.addEventListener("input",e=>{let t=e.target.reportValidity();e.target.setAttribute("aria-invalid",!t)}),console.log("live")});})();
