import{a as ge,c as xe,g as $,h as V,j as D,n as E,s as be}from"./chunk-2B3ZQFAT.js";import{a as Ce,b as l,c as ve,d as q,e as _e,f as d,g as Me,h as Ie,i as Te,j as ye,k as Se,l as Ne,m as Fe,n as we,p as Ve,q as De,r as Ee,s as qe,t as k,u as ke,v as Ae,w as Le,x as Oe,y as Pe,z as $e}from"./chunk-TREBQN2R.js";import{N as ae,T as le,d as re,ja as se,ka as me,la as pe,ma as ue,na as w,oa as ce,pa as de,qa as fe,va as he}from"./chunk-HKMIRJN3.js";import{l as oe,m as ne,n as ie}from"./chunk-HPOY2XHW.js";import{$b as N,Ba as G,Bb as c,Gb as _,Hb as K,Jb as Z,K as z,Kb as J,Lb as m,Mb as p,Nb as u,Ob as W,Tb as y,Ub as b,Yb as X,Zb as Y,_b as ee,ac as F,cc as e,dc as S,fc as te,ic as v,lc as O,mc as P,ob as s,pb as I,ra as R,rb as B,sa as C,ua as U,ub as Q,wa as j,wb as T,xb as H,zb as f}from"./chunk-ET7S4RT5.js";var h=class h{static notInclude(...t){return a=>{if(a.value){if(typeof a.value=="string"&&t.some(o=>h.includes(a.value,o)))return{notInclude:!0};if(Array.isArray(a.value)&&t.some(o=>a.value.some(i=>h.includes(i,o))))return{notInclude:!0}}return null}}static notMatch(...t){return a=>a.value&&t.some(o=>a.value.toLowerCase().trim()===o.toLowerCase().trim())?{notMatch:!0}:null}static modId(t){return[...h.modTitle,l.pattern(`[a-z0-9${t}]+`)]}static includes(t,a){return t.toLowerCase().trim().includes(a.toLowerCase().trim())}};h.modIdMinLength=3,h.modIdMaxLength=63,h.modTitle=[l.required,l.minLength(h.modIdMinLength),l.maxLength(h.modIdMaxLength)];var g=h;var L=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275dir=U({type:t,selectors:[["","step",""]],standalone:!0});let n=t;return n})();function je(n,t){if(n&1&&e(0),n&2){let a=b(2).$implicit;S(a.label)}}function Ge(n,t){n&1&&(e(0,`
            `),u(1,"cn-button",5),e(2,`
          `))}function Be(n,t){n&1&&(e(0,`
            `),u(1,"cn-button",6),e(2,`
          `))}function Qe(n,t){if(n&1&&(e(0,`
      `),m(1,"mat-step"),e(2,`
        `),f(3,je,1,1,"ng-template",2),e(4,`
        `),W(5,3),e(6,`
        `),m(7,"div",4),e(8,`
          `),f(9,Ge,3,0)(10,Be,3,0),p(),e(11,`
      `),p(),e(12,`
    `)),n&2){let a=b(),o=a.$index,i=a.$implicit,r=b();s(5),c("ngTemplateOutlet",r.contents.get(o)),s(4),_(9,(!i.hasBack||i.hasBack())&&o>0?9:-1),s(),_(10,(!i.hasNext||i.hasNext())&&o<r.steps.length-1?10:-1)}}function He(n,t){if(n&1&&(e(0,`
    `),f(1,Qe,13,3)),n&2){let a=t.$implicit;s(),_(1,!a.isVisible||a.isVisible()?1:-1)}}var ze=(()=>{let t=class t{constructor(){this.steps=[]}};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=C({type:t,selectors:[["cn-stepper"]],contentQueries:function(i,r,x){if(i&1&&Y(x,L,4,X),i&2){let M;N(M=F())&&(r.contents=M)}},inputs:{steps:"steps"},standalone:!0,features:[v],decls:6,vars:1,consts:[["animationDuration","0","orientation","horizontal",3,"linear"],["stepper",""],["matStepLabel",""],[3,"ngTemplateOutlet"],[1,"cn-stepper-footer"],["icon","keyboard_arrow_left","label","Previous","stepperKind","previous"],["icon","keyboard_arrow_right","label","Next","stepperKind","next"]],template:function(i,r){i&1&&(m(0,"mat-stepper",0,1),e(2,`
  `),Z(3,He,2,1,null,null,K),p(),e(5,`
`)),i&2&&(c("linear",!0),s(3),J(r.steps))},dependencies:[ie,oe,ue,me,se,pe,w],styles:["[_nghost-%COMP%]   .cn-stepper-footer[_ngcontent-%COMP%]{display:grid;grid-auto-flow:column;margin-top:24px}[_nghost-%COMP%]   .cn-stepper-footer[_ngcontent-%COMP%] > cn-button[stepperkind=previous][_ngcontent-%COMP%]{justify-self:flex-start}[_nghost-%COMP%]   .cn-stepper-footer[_ngcontent-%COMP%] > cn-button[stepperkind=next][_ngcontent-%COMP%]{justify-self:flex-end}"]});let n=t;return n})();function Ze(n,t){if(n&1&&(m(0,"mat-hint"),e(1),p()),n&2){let a=b();s(),S(a.hint)}}function Je(n,t){if(n&1&&(m(0,"mat-error"),e(1),p()),n&2){let a=b();s(),S(a.errorMessage)}}var Re=(()=>{let t=class t extends Ee{constructor(o,i,r){super(i,r),this.ngZone=o,this.regex=/(.|\n)*/}blur(){this.onTouched()}input(){this.writeValue(this.value)}resize(){this.ngZone.onStable.pipe(z(1)).subscribe(()=>this.textarea.resizeToFitContent(!0))}};t.\u0275fac=function(i){return new(i||t)(I(Q),I(ve),I(B))},t.\u0275cmp=C({type:t,selectors:[["cn-textarea"]],viewQuery:function(i,r){if(i&1&&ee(k,5),i&2){let x;N(x=F())&&(r.textarea=x.first)}},inputs:{regex:"regex"},standalone:!0,features:[T,v],decls:11,vars:8,consts:[["appearance","outline","floatLabel","auto"],["autocomplete","off","cdkAutosizeMinRows","1","cdkTextareaAutosize","","charFilter","","matInput","",3,"disabled","errorStateMatcher","regex","required","ngModel","ngModelChange","blur","input"]],template:function(i,r){i&1&&(e(0,`
`),m(1,"mat-form-field",0),e(2,`
  `),m(3,"mat-label"),e(4),p(),e(5,`
  `),m(6,"textarea",1),y("ngModelChange",function(M){return r.value=M})("blur",function(){return r.blur()})("input",function(){return r.input()}),p(),e(7,`
  `),f(8,Ze,2,1,"mat-hint")(9,Je,2,1,"mat-error"),p(),e(10,`
`)),i&2&&(s(4),S(r.label),s(2),c("disabled",r.isDisabled)("errorStateMatcher",r.errorMatcher)("regex",r.regex)("required",r.isRequired)("ngModel",r.value),s(2),_(8,r.hint?8:-1),s(),_(9,r.invalid?9:-1))},dependencies:[Ne,Ce,q,Se,Me,Ae,ke,he,ce,fe,de,k,Le],styles:["[_nghost-%COMP%]{-webkit-user-select:none;user-select:none}"]});let n=t;return n})();function We(n,t){if(n&1&&(e(0,`
      `),m(1,"div",5),e(2,`
        `),u(3,"cn-select",6),e(4,`
        `),u(5,"cn-checkbox",7),e(6,`
        `),u(7,"cn-select",8),e(8,`
        `),u(9,"cn-select",9),e(10,`
      `),p(),e(11,`
    `)),n&2){let a=b();s(3),c("options",a.versions),s(4),c("multiple",!0)("options",a.loaders),s(2),c("multiple",!0)("options",a.platforms)}}function Xe(n,t){n&1&&(e(0,`
      `),m(1,"div",5),e(2,`
        `),u(3,"cn-input",10),e(4,`
        `),u(5,"cn-checkbox",11),e(6,`
        `),u(7,"cn-input",12),e(8,`
        `),u(9,"cn-input",13),e(10,`
      `),p(),e(11,`
    `))}function Ye(n,t){n&1&&(e(0,`
      `),m(1,"div",5),e(2,`
        `),u(3,"cn-textarea",14),e(4,`
      `),p(),e(5,`
    `))}function et(n,t){n&1&&(e(0,`
      `),m(1,"div",5),e(2,`
        `),u(3,"cn-input",15),e(4,`
        `),u(5,"cn-input",16),e(6,`
        `),u(7,"cn-input",17),e(8,`
      `),p(),e(9,`
    `))}var Ue=(()=>{let t=class t extends De{constructor(){super(...arguments),this.steps=[{label:"Minecraft and loaders"},{label:"Project details"},{label:"Project description",hasNext:()=>!this.form.controls.crystalNestMod.value},{label:"Ownership",isVisible:()=>!this.form.controls.crystalNestMod.value}],this.loaders=we,this.platforms={maven:"Maven",github:"GitHub",modrinth:"Modrinth",curseforge:"CurseForge"},this.neoforgeMinecraftVersion=20}ngOnChanges(o){o.versions&&this.form.controls.minecraftVersion.setValue(Object.values(this.versions)[0])}ngOnInit(){this.valueChanges("minecraftVersion",o=>{+o.split(".")[1]<this.neoforgeMinecraftVersion&&this.form.controls.loaders.value.includes("neoforge")?(this.form.controls.loaders.setValue(this.form.controls.loaders.value.filter(i=>i!=="neoforge")),this.form.controls.loaders.setValidators([l.required,g.notInclude("neoforge")])):this.form.controls.loaders.setValidators(l.required)},(o,i)=>!!(i&&o)),this.valueChanges("autogenModId",o=>{o?(this.form.controls.modId.disable(),this.form.controls.modIdKebab.disable(),this.updateModId(this.form.controls.modTitle.value)):(this.form.controls.modId.enable(),this.form.controls.modIdKebab.enable())}),this.valueChanges("modTitle",o=>this.updateModId(o),o=>(o??0)===o&&this.form.controls.autogenModId.value),this.valueChanges("crystalNestMod",o=>{o?(this.form.controls.group.disable(),this.form.controls.authors.disable(),this.form.controls.githubUser.disable(),this.form.controls.group.setValue(V),this.form.controls.authors.setValue(D.join(", ")),this.form.controls.githubUser.setValue(E),this.form.controls.group.setValidators(l.required),this.form.controls.authors.setValidators(l.required),this.form.controls.githubUser.setValidators(l.required)):(this.form.controls.group.enable(),this.form.controls.authors.enable(),this.form.controls.githubUser.enable(),this.form.controls.group.setValue(""),this.form.controls.authors.setValue(""),this.form.controls.githubUser.setValue(""),this.form.controls.group.setValidators([l.required,g.notInclude(V,".idea","common","fabric","forge","neoforge","gradle","wrapper","src","main","java","resources","mixin","platform","model","services","META-INF"),l.pattern("^([a-z]+(.|_))*[a-z]+$")]),this.form.controls.authors.setValidators([l.required,g.notInclude(...D)]),this.form.controls.githubUser.setValidators([l.required,g.notMatch(E)])),this.form.controls.group.updateValueAndValidity(),this.form.controls.authors.updateValueAndValidity(),this.form.controls.githubUser.updateValueAndValidity()})}initForm(){return{minecraftVersion:new d("",{nonNullable:!0,validators:l.required}),group:new d(V,{nonNullable:!0,validators:l.required}),authors:new d(D.join(", "),{nonNullable:!0,validators:l.required}),modTitle:new d("Cobweb Mod Skeleton",{nonNullable:!0,validators:g.modTitle}),modId:new d("cobweb_mod_skeleton",{nonNullable:!0,validators:g.modId("_")}),modIdKebab:new d("cobweb-mod-template",{nonNullable:!0,validators:g.modId("-")}),loaders:new d(["fabric","forge","neoforge"],{nonNullable:!0,validators:l.required}),platforms:new d(["maven","github","modrinth","curseforge"],{nonNullable:!0,validators:l.required}),githubUser:new d(E,{nonNullable:!0,validators:l.required}),description:new d("MultiLoader Mod Skeleton!",{nonNullable:!0,validators:l.required}),crystalNestMod:new d(!0,{nonNullable:!0,validators:l.required}),autogenModId:new d(!0,{nonNullable:!0,validators:l.required}),includeConfig:new d(!0,{nonNullable:!0,validators:l.required})}}updateModId(o){this.form.controls.modId.setValue(this.parseModTitle(o,"_")),this.form.controls.modIdKebab.setValue(this.parseModTitle(o,"-"))}parseModTitle(o,i){return o.toLowerCase().replaceAll(/[^0-9a-z]/g," ").trim().replaceAll(" ",i)}};t.\u0275fac=(()=>{let o;return function(r){return(o||(o=G(t)))(r||t)}})(),t.\u0275cmp=C({type:t,selectors:[["cn-generator-form"]],inputs:{versions:[R.HasDecoratorInputTransform,"versions","versions",o=>o||{}]},standalone:!0,features:[H,T,j,v],decls:18,vars:3,consts:[[3,"formGroup"],["formControlName","crystalNestMod","label","Are you a Crystal Nest's member?",1,"cn-cell-3"],[3,"steps"],["step",""],["icon","download","label","Download",3,"isDisabled","click"],[1,"cn-grid"],["formControlName","minecraftVersion","hint","Target Minecraft version","label","Minecraft version",1,"cn-cell-6",3,"options"],["formControlName","includeConfig","label","Include configuration",1,"cn-cell-6"],["formControlName","loaders","hint","Which mod loaders to support","label","Loaders",1,"cn-cell-6",3,"multiple","options"],["formControlName","platforms","hint","Which platforms to publish on","label","Platforms",1,"cn-cell-6",3,"multiple","options"],["formControlName","modTitle","label","Mod title",1,"cn-cell-6"],["formControlName","autogenModId","label","Autogenerate IDs",1,"cn-cell-6"],["formControlName","modId","hint","Mod unique identifier","label","Mod ID","regex","^[a-z0-9_]+$",1,"cn-cell-6"],["formControlName","modIdKebab","label","Mod ID kebab-case","regex","^[a-z0-9-]+$",1,"cn-cell-6"],["formControlName","description","label","Mod description",1,"cn-cell-6"],["formControlName","group","hint","Java group, es. `it.crystalnest`","label","Java group",1,"cn-cell-4"],["formControlName","authors","hint","List of authors separated by a comma","label","Mod authors",1,"cn-cell-4"],["formControlName","githubUser","hint","Name of the GitHub account/organization where the source code is hosted","label","GitHub owner",1,"cn-cell-4"]],template:function(i,r){i&1&&(m(0,"form",0),e(1,`
  `),u(2,"cn-toggle",1),e(3,`
  `),m(4,"cn-stepper",2),e(5,`
    `),f(6,We,12,5,"ng-template",3),e(7,`
    `),f(8,Xe,12,0,"ng-template",3),e(9,`
    `),f(10,Ye,6,0,"ng-template",3),e(11,`
    `),f(12,et,10,0,"ng-template",3),e(13,`
  `),p(),e(14,`
`),p(),e(15,`
`),m(16,"cn-button",4),y("click",function(){return r.emitSubmit()}),p(),e(17,`
`)),i&2&&(c("formGroup",r.form),s(4),c("steps",r.steps),s(12),c("isDisabled",!r.validity))},dependencies:[L,ae,Fe,Ie,q,_e,Te,ye,Oe,qe,ze,$e,Pe,w,Re]});let n=t;return n})();var Jt=(()=>{let t=class t extends Ve{constructor(o){super(),this.store$=o,this.versions$=this.store$.select($.selectMinecraftVersions),this.form$=this.store$.select($.selectForm),this.store$.dispatch(ge())}buildSkeleton(o){this.store$.dispatch(xe(o))}};t.\u0275fac=function(i){return new(i||t)(I(le))},t.\u0275cmp=C({type:t,selectors:[["cn-generator"]],standalone:!0,features:[te([be]),T,v],decls:5,vars:6,consts:[[3,"formData","versions","onSubmit"]],template:function(i,r){i&1&&(e(0,`This generator assumes the use of IntelliJ IDEA as IDE. Etc.
`),m(1,"cn-generator-form",0),y("onSubmit",function(M){return r.buildSkeleton(M)}),O(2,"async"),O(3,"async"),p(),e(4,`
Follow the instruction on the readme to finish the setup!
`)),i&2&&(s(),c("formData",P(2,2,r.form$))("versions",P(3,4,r.versions$)))},dependencies:[ne,re,Ue]});let n=t;return n})();export{Jt as GeneratorComponent};
