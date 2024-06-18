import{a as ve,c as _e,g as G,h as A,j as L,n as P,s as Me}from"./chunk-HS6QBH67.js";import{a as ye,b as s,c as Ie,d as $,e as Te,f,g as Se,h as Ne,i as we,j as Fe,k as Ve,l as ke,m as De,n as N,p as Oe,q as qe,r as Ee,s as z,t as Ae,u as Le,v as Pe,w as $e,x as ze,y as je}from"./chunk-WB7E7LYY.js";import{i as he,j as ge,k as be,l as xe,q as Ce}from"./chunk-XO4FADRN.js";import{o as pe,v as ue,w as ce,x as de,y as fe,z as E}from"./chunk-IZFIIXU2.js";import"./chunk-543JV44P.js";import{Y as me,d as se,w as le}from"./chunk-OR7O3O7G.js";import{l as re,m as q,n as ae}from"./chunk-3OV2KVJT.js";import{$b as oe,Bb as d,Gb as M,Hb as W,Jb as X,K as H,Kb as Y,Lb as p,Mb as u,Nb as l,Ob as ee,Ub as T,Wb as x,_b as te,a as U,ac as ne,bc as D,cc as O,ec as e,fc as S,ic as ie,lc as _,ob as m,oc as w,pb as v,pc as F,ra as V,rb as Z,sa as C,u as B,ua as Q,ub as J,wa as K,wb as I,xb as k,zb as h}from"./chunk-LNVCPBNY.js";var b=class b{static notInclude(...t){return a=>{if(a.value){if(typeof a.value=="string"&&t.some(o=>b.includes(a.value,o)))return{notInclude:!0};if(Array.isArray(a.value)&&t.some(o=>a.value.some(i=>b.includes(i,o))))return{notInclude:!0}}return null}}static notMatch(...t){return a=>a.value&&t.some(o=>a.value.toLowerCase().trim()===o.toLowerCase().trim())?{notMatch:!0}:null}static modId(t){return[...b.modTitle,s.pattern(`[a-z0-9${t}]+`)]}static includes(t,a){return t.toLowerCase().trim().includes(a.toLowerCase().trim())}};b.modIdMinLength=3,b.modIdMaxLength=63,b.modTitle=[s.required,s.minLength(b.modIdMinLength),s.maxLength(b.modIdMaxLength)];var g=b;var R=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275dir=Q({type:t,selectors:[["","step",""]],standalone:!0});let n=t;return n})();function Be(n,t){if(n&1&&e(0),n&2){let a=x(2).$implicit;S(a.label)}}function He(n,t){n&1&&(e(0,`
            `),l(1,"cn-button",5),e(2,`
          `))}function Qe(n,t){n&1&&(e(0,`
            `),l(1,"cn-button",6),e(2,`
          `))}function Ke(n,t){if(n&1&&(e(0,`
      `),p(1,"mat-step"),e(2,`
        `),h(3,Be,1,1,"ng-template",2),e(4,`
        `),ee(5,3),e(6,`
        `),p(7,"div",4),e(8,`
          `),h(9,He,3,0)(10,Qe,3,0),u(),e(11,`
      `),u(),e(12,`
    `)),n&2){let a=x(),o=a.$index,i=a.$implicit,r=x();m(5),d("ngTemplateOutlet",r.contents.get(o)),m(4),M(9,(!i.hasBack||i.hasBack())&&o>0?9:-1),m(),M(10,(!i.hasNext||i.hasNext())&&o<r.steps.length-1?10:-1)}}function Ze(n,t){if(n&1&&(e(0,`
    `),h(1,Ke,13,3)),n&2){let a=t.$implicit;m(),M(1,!a.isVisible||a.isVisible()?1:-1)}}var Re=(()=>{let t=class t{constructor(){this.orientation="horizontal",this.steps=[]}};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=C({type:t,selectors:[["cn-stepper"]],contentQueries:function(i,r,c){if(i&1&&oe(c,R,4,te),i&2){let y;D(y=O())&&(r.contents=y)}},inputs:{orientation:[V.HasDecoratorInputTransform,"orientation","orientation",o=>o||"horizontal"],steps:"steps"},standalone:!0,features:[k,_],decls:6,vars:2,consts:[["animationDuration","0",3,"linear","orientation"],["stepper",""],["matStepLabel",""],[3,"ngTemplateOutlet"],[1,"cn-stepper-footer"],["icon","keyboard_arrow_left","label","Previous","stepperKind","previous"],["icon","keyboard_arrow_right","label","Next","stepperKind","next"]],template:function(i,r){i&1&&(p(0,"mat-stepper",0,1),e(2,`
  `),X(3,Ze,2,1,null,null,W),u(),e(5,`
`)),i&2&&(d("linear",!0)("orientation",r.orientation),m(3),Y(r.steps))},dependencies:[ae,re,fe,ce,ue,de,E],styles:["[_nghost-%COMP%]   .cn-stepper-footer[_ngcontent-%COMP%]{display:grid;grid-auto-flow:column;margin-top:24px}[_nghost-%COMP%]   .cn-stepper-footer[_ngcontent-%COMP%] > cn-button[stepperkind=previous][_ngcontent-%COMP%]{justify-self:flex-start}[_nghost-%COMP%]   .cn-stepper-footer[_ngcontent-%COMP%] > cn-button[stepperkind=next][_ngcontent-%COMP%]{justify-self:flex-end}"]});let n=t;return n})();function We(n,t){if(n&1&&(p(0,"mat-hint"),e(1),u()),n&2){let a=x();m(),S(a.hint)}}function Xe(n,t){if(n&1&&(p(0,"mat-error"),e(1),u()),n&2){let a=x();m(),S(a.errorMessage)}}var Ue=(()=>{let t=class t extends qe{constructor(o,i,r){super(i,r),this.ngZone=o,this.regex=/(.|\n)*/}blur(){this.onTouched()}input(){this.writeValue(this.value)}resize(){this.ngZone.onStable.pipe(H(1)).subscribe(()=>this.textarea.resizeToFitContent(!0))}};t.\u0275fac=function(i){return new(i||t)(v(J),v(Ie),v(Z))},t.\u0275cmp=C({type:t,selectors:[["cn-textarea"]],viewQuery:function(i,r){if(i&1&&ne(z,5),i&2){let c;D(c=O())&&(r.textarea=c.first)}},inputs:{regex:"regex"},standalone:!0,features:[I,_],decls:11,vars:8,consts:[["appearance","outline","floatLabel","auto"],["autocomplete","off","cdkAutosizeMaxRows","16","cdkAutosizeMinRows","1","cdkTextareaAutosize","","charFilter","","matInput","",3,"disabled","errorStateMatcher","regex","required","ngModel","ngModelChange","blur","input"]],template:function(i,r){i&1&&(e(0,`
`),p(1,"mat-form-field",0),e(2,`
  `),p(3,"mat-label"),e(4),u(),e(5,`
  `),p(6,"textarea",1),T("ngModelChange",function(y){return r.value=y})("blur",function(){return r.blur()})("input",function(){return r.input()}),u(),e(7,`
  `),h(8,We,2,1,"mat-hint")(9,Xe,2,1,"mat-error"),u(),e(10,`
`)),i&2&&(m(4),S(r.label),m(2),d("disabled",r.isDisabled)("errorStateMatcher",r.errorMatcher)("regex",r.regex)("required",r.isRequired)("ngModel",r.value),m(2),M(8,r.hint?8:-1),m(),M(9,r.invalid?9:-1))},dependencies:[ke,ye,$,Ve,Se,Le,Ae,Ce,ge,xe,be,z,Pe],styles:["[_nghost-%COMP%]{-webkit-user-select:none;user-select:none}"]});let n=t;return n})();function Ye(n,t){if(n&1&&(e(0,`
      `),p(1,"div",5),e(2,`
        `),l(3,"cn-select",6),e(4,`
        `),l(5,"cn-checkbox",7),e(6,`
        `),l(7,"cn-select",8),e(8,`
        `),l(9,"cn-select",9),e(10,`
      `),u(),e(11,`
    `)),n&2){let a=x();m(3),d("options",a.versions),m(4),d("multiple",!0)("options",a.loaders),m(2),d("multiple",!0)("options",a.platforms)}}function et(n,t){n&1&&(e(0,`
      `),p(1,"div",5),e(2,`
        `),l(3,"cn-input",10),e(4,`
        `),l(5,"cn-checkbox",11),e(6,`
        `),l(7,"cn-input",12),e(8,`
        `),l(9,"cn-input",13),e(10,`
      `),u(),e(11,`
    `))}function tt(n,t){n&1&&(e(0,`
      `),p(1,"div",5),e(2,`
        `),l(3,"cn-textarea",14),e(4,`
      `),u(),e(5,`
    `))}function ot(n,t){n&1&&(e(0,`
      `),p(1,"div",5),e(2,`
        `),l(3,"cn-input",15),e(4,`
        `),l(5,"cn-input",16),e(6,`
        `),l(7,"cn-input",17),e(8,`
      `),u(),e(9,`
    `))}var Ge=(()=>{let t=class t extends Oe{constructor(o){super(),this.breakpointObserver=o,this.stepperOrientation$=this.breakpointObserver.observe("(min-width: 46.25rem)").pipe(B(({matches:i})=>i?"horizontal":"vertical"),this.takeUntil()),this.steps=[{label:"Minecraft and loaders"},{label:"Project details"},{label:"Project description",hasNext:()=>!this.form.controls.crystalNestMod.value},{label:"Ownership",isVisible:()=>!this.form.controls.crystalNestMod.value}],this.platforms={maven:"Maven",github:"GitHub",modrinth:"Modrinth",curseforge:"CurseForge"},this.neoforgeTransitionVersion=20,this.loaders=U({},N)}ngOnChanges(o){o.versions&&this.form.controls.minecraftVersion.setValue(Object.values(this.versions)[0])}ngOnInit(){this.valueChanges("minecraftVersion",o=>{let[i,r]=o.split(".").slice(1).map(c=>+c);i<this.neoforgeTransitionVersion||i===this.neoforgeTransitionVersion&&r===1?(this.form.controls.loaders.setValue(Object.keys(N).filter(c=>c!=="neoforge")),this.form.controls.loaders.setValidators([s.required,g.notInclude("neoforge")]),delete this.loaders.neoforge):i>this.neoforgeTransitionVersion?(this.form.controls.loaders.setValue(Object.keys(N).filter(c=>c!=="forge")),this.form.controls.loaders.setValidators([s.required,g.notInclude("forge")]),delete this.loaders.forge):(this.form.controls.loaders.setValidators(s.required),this.loaders=U({},N),this.form.controls.loaders.setValue(Object.keys(N)))},(o,i)=>!!(i&&o)),this.valueChanges("autogenModId",o=>{o?(this.form.controls.modId.disable(),this.form.controls.modIdKebab.disable(),this.updateModId(this.form.controls.modTitle.value)):(this.form.controls.modId.enable(),this.form.controls.modIdKebab.enable())}),this.valueChanges("modTitle",o=>this.updateModId(o),o=>(o??0)===o&&this.form.controls.autogenModId.value),this.valueChanges("crystalNestMod",o=>{o?(this.form.controls.group.disable(),this.form.controls.authors.disable(),this.form.controls.githubUser.disable(),this.form.controls.group.setValue(A),this.form.controls.authors.setValue(L.join(", ")),this.form.controls.githubUser.setValue(P),this.form.controls.group.setValidators(s.required),this.form.controls.authors.setValidators(s.required),this.form.controls.githubUser.setValidators(s.required)):(this.form.controls.group.enable(),this.form.controls.authors.enable(),this.form.controls.githubUser.enable(),this.form.controls.group.setValue(""),this.form.controls.authors.setValue(""),this.form.controls.githubUser.setValue(""),this.form.controls.group.setValidators([s.required,g.notInclude(A,".idea","common","fabric","forge","neoforge","gradle","wrapper","src","main","java","resources","mixin","platform","model","services","META-INF"),s.pattern("^([a-z]+(.|_))*[a-z]+$")]),this.form.controls.authors.setValidators([s.required,g.notInclude(...L)]),this.form.controls.githubUser.setValidators([s.required,g.notMatch(P)])),this.form.controls.group.updateValueAndValidity(),this.form.controls.authors.updateValueAndValidity(),this.form.controls.githubUser.updateValueAndValidity()})}initForm(){return{minecraftVersion:new f("",{nonNullable:!0,validators:s.required}),group:new f(A,{nonNullable:!0,validators:s.required}),authors:new f(L.join(", "),{nonNullable:!0,validators:s.required}),modTitle:new f("Cobweb Mod Skeleton",{nonNullable:!0,validators:g.modTitle}),modId:new f("cobweb_mod_skeleton",{nonNullable:!0,validators:g.modId("_")}),modIdKebab:new f("cobweb-mod-template",{nonNullable:!0,validators:g.modId("-")}),loaders:new f(["fabric","forge","neoforge"],{nonNullable:!0,validators:s.required}),platforms:new f(["maven","github","modrinth","curseforge"],{nonNullable:!0,validators:s.required}),githubUser:new f(P,{nonNullable:!0,validators:s.required}),description:new f("MultiLoader Mod Skeleton!",{nonNullable:!0,validators:s.required}),crystalNestMod:new f(!0,{nonNullable:!0,validators:s.required}),autogenModId:new f(!0,{nonNullable:!0,validators:s.required}),includeConfig:new f(!0,{nonNullable:!0,validators:s.required})}}updateModId(o){this.form.controls.modId.setValue(this.parseModTitle(o,"_")),this.form.controls.modIdKebab.setValue(this.parseModTitle(o,"-"))}parseModTitle(o,i){return o.toLowerCase().replaceAll(/[^0-9a-z]/g," ").trim().replaceAll(" ",i)}};t.\u0275fac=function(i){return new(i||t)(v(le))},t.\u0275cmp=C({type:t,selectors:[["cn-generator-form"]],inputs:{versions:[V.HasDecoratorInputTransform,"versions","versions",o=>o||{}]},standalone:!0,features:[k,I,K,_],decls:19,vars:6,consts:[[3,"formGroup"],["formControlName","crystalNestMod","label","Are you a Crystal Nest's member?",1,"cn-cell-3"],[3,"orientation","steps"],["step",""],["icon","download","label","Download",3,"isDisabled","click"],[1,"cn-grid"],["formControlName","minecraftVersion","hint","Target Minecraft version","label","Minecraft version",1,"cn-cell-6",3,"options"],["formControlName","includeConfig","label","Include configuration",1,"cn-cell-6"],["formControlName","loaders","hint","Which mod loaders to support","label","Loaders",1,"cn-cell-6",3,"multiple","options"],["formControlName","platforms","hint","Which platforms to publish on","label","Platforms",1,"cn-cell-6",3,"multiple","options"],["formControlName","modTitle","hint","Mod name","label","Mod title",1,"cn-cell-6"],["formControlName","autogenModId","label","Autogenerate IDs",1,"cn-cell-6"],["formControlName","modId","hint","Mod unique identifier","label","Mod ID","regex","^[a-z0-9_]+$",1,"cn-cell-6"],["formControlName","modIdKebab","hint","Mod ID for URLs and packages","label","Mod ID kebab-case","regex","^[a-z0-9-]+$",1,"cn-cell-6"],["formControlName","description","hint","Allows for multiline text","label","Mod description",1,"cn-cell-12"],["formControlName","group","hint","Java group, es. `it.crystalnest`","label","Java group",1,"cn-cell-4"],["formControlName","authors","hint","List of authors separated by a comma","label","Mod authors",1,"cn-cell-4"],["formControlName","githubUser","hint","Name of the GitHub account/organization where the source code is hosted","label","GitHub owner",1,"cn-cell-4"]],template:function(i,r){i&1&&(p(0,"form",0),e(1,`
  `),l(2,"cn-toggle",1),e(3,`
  `),p(4,"cn-stepper",2),w(5,"async"),e(6,`
    `),h(7,Ye,12,5,"ng-template",3),e(8,`
    `),h(9,et,12,0,"ng-template",3),e(10,`
    `),h(11,tt,6,0,"ng-template",3),e(12,`
    `),h(13,ot,10,0,"ng-template",3),e(14,`
  `),u(),e(15,`
`),u(),e(16,`
`),p(17,"cn-button",4),T("click",function(){return r.emitSubmit()}),u(),e(18,`
`)),i&2&&(d("formGroup",r.form),m(4),d("orientation",F(5,4,r.stepperOrientation$))("steps",r.steps),m(13),d("isDisabled",!r.validity))},dependencies:[q,R,me,De,Ne,$,Te,we,Fe,$e,Ee,Re,je,ze,E,Ue],styles:["[_nghost-%COMP%]   cn-checkbox[_ngcontent-%COMP%]{padding-bottom:1.5rem}"]});let n=t;return n})();var oo=(()=>{let t=class t extends he{constructor(o){super(),this.store$=o,this.versions$=this.store$.select(G.selectMinecraftVersions),this.form$=this.store$.select(G.selectForm),this.store$.dispatch(ve())}buildSkeleton(o){this.store$.dispatch(_e(o))}};t.\u0275fac=function(i){return new(i||t)(v(pe))},t.\u0275cmp=C({type:t,selectors:[["cn-generator"]],standalone:!0,features:[ie([Me]),I,_],decls:17,vars:6,consts:[[3,"formData","versions","onSubmit"]],template:function(i,r){i&1&&(e(0,`This generator assumes the use of IntelliJ IDEA as IDE.
`),l(1,"br"),e(2,`
It assumes you will publish your code publicly on GitHub.
`),l(3,"br"),e(4,`
The default license is GPL-3.0, but you can change it to the one that better fits your needs.
`),l(5,"br"),e(6,`
If you do not publish your source code on GitHub, make sure to change the automatically generated changelog string when publishing your version (in the root build.gradle) to point to the correct changelog.
`),l(7,"br"),e(8,`

`),p(9,"cn-generator-form",0),T("onSubmit",function(y){return r.buildSkeleton(y)}),w(10,"async"),w(11,"async"),u(),e(12,`

`),l(13,"br"),e(14,`
Follow the instruction on the readme to finish the setup!
`),l(15,"br"),e(16,`
More questions? Come chat on our Discord!
`)),i&2&&(m(9),d("formData",F(10,2,r.form$))("versions",F(11,4,r.versions$)))},dependencies:[q,se,Ge],styles:["[_nghost-%COMP%]{padding:2rem}@media (max-width: 46.25rem){[_nghost-%COMP%]{padding:1rem}}"]});let n=t;return n})();export{oo as GeneratorComponent};
