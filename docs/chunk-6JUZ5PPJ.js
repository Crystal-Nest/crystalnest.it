import{A as p,B as f,R as M,q as r,r as o,w as E,x as l}from"./chunk-L2NADHDI.js";import{Ba as T,a as n,b as a,ja as m}from"./chunk-LNVCPBNY.js";var h=r("[Generator] Retrieve template Minecraft versions"),A=r("[Generator] Save template Minecraft versions",o()),S=r("[Generator] Generate mod",o()),u=r("[Generator] Save template and form",o()),b=r("[Generator] Save form",o()),g=r("[Generator] Build mod",o());var x={minecraftVersions:{},templates:{},form:null},O=l({name:"generator",reducer:f(x,p(A,(t,{minecraftVersions:e})=>a(n({},t),{minecraftVersions:e})),p(u,(t,{template:e,form:s})=>a(n({},t),{templates:a(n({},t.templates),{[s.minecraftVersion]:e}),form:s})),p(b,(t,{form:e})=>a(n({},t),{form:e}))),extraSelectors:({selectTemplates:t})=>({selectTemplate:e=>E(t,s=>s[e])})});var B="it.crystalnest",D="it/crystalnest",U=["Crystal Spider","Moonstone Webber","Noir"],P="cobweb_mod_template",_="cobweb-mod-template",V="Cobweb Mod Template",i="crystal-nest",w=`https://raw.githubusercontent.com/${i}/mod-fancy-assets/main/${P}/banner.png`,N=/\*\*Support us\*\*(.|\n)*/,H=["fabric","forge","neoforge"],C=["maven","github","modrinth","curseforge"];var W=(()=>{let e=class e extends M{getMinecraftVersions(){return this.get("https://api.github.com/repos/crystal-nest/cobweb-mod-template/branches",{headers:{"X-GitHub-Api-Version":"2022-11-28"}})}getTemplate(c){return this.post("/api/workers/github-repo-archive",{user:i,repo:_,branch:c},{responseType:"arraybuffer"})}};e.\u0275fac=(()=>{let c;return function(d){return(c||(c=T(e)))(d||e)}})(),e.\u0275prov=m({token:e,factory:e.\u0275fac});let t=e;return t})();export{h as a,A as b,S as c,u as d,b as e,g as f,O as g,B as h,D as i,U as j,P as k,_ as l,V as m,i as n,w as o,N as p,H as q,C as r,W as s};
