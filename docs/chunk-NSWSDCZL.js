import{a as p,b as f}from"./chunk-ZGG4NCI6.js";import{d as h,g,i as u,k as S}from"./chunk-FJX3F6NB.js";import{X as x,Y as c}from"./chunk-OR7O3O7G.js";import"./chunk-3OV2KVJT.js";import{Bb as d,Lb as n,Mb as t,Nb as i,ec as e,lc as s,ob as m,sa as l}from"./chunk-LNVCPBNY.js";var _=(()=>{let a=class a{constructor(){this.xmlMavenPackageSnippet="```xml\n<dependency>\n  <groupId>it.crystalnest</groupId>\n  <artifactId>cobweb-fabric</artifactId>\n  <version>1.20.4-1.0.0</version>\n</dependency>\n```"}};a.\u0275fac=function(r){return new(r||a)},a.\u0275cmp=l({type:a,selectors:[["cn-versioning"]],standalone:!0,features:[s],decls:447,vars:1,consts:[["fragment","overview","id","overview","routerLink","/versioning"],["fontIcon","link"],[1,"eop"],["href","https://semver.org/","target","_blank"],["href","https://github.com/Crystal-Nest/cobweb-mod-template","target","_blank"],["routerLink","/generator"],["fragment","related-conventions","routerLink","/versioning"],["fragment","minecraft-version","id","minecraft-version","routerLink","/versioning"],["fragment","mod-version","id","mod-version","routerLink","/versioning"],["fragment","depending","id","depending","routerLink","/versioning"],["href","https://fabricmc.net/wiki/documentation:fabric_mod_json_spec#versionrange","target","_blank"],["href","https://maven.apache.org/enforcer/enforcer-rules/versionRanges.html","target","_blank"],["fragment","related-conventions","id","related-conventions","routerLink","/versioning"],[3,"data"],["fragment","final-notes","id","final-notes","routerLink","/versioning"],["href","https://docs.minecraftforge.net/en/latest/gettingstarted/versioning/","target","_blank"],["href","https://semver.org/#faq","target","_blank"],["href","https://discord.gg/BP6EdBfAmt","target","_blank"]],template:function(r,b){r&1&&(n(0,"a",0),e(1,`
  `),i(2,"mat-icon",1),e(3,`
  `),n(4,"h1"),e(5,"Overview"),t(),e(6,`
`),t(),e(7,`
`),i(8,"mat-divider"),e(9,`
`),n(10,"div"),e(11,`
  `),n(12,"span",2),e(13,"A well-known standard for versioning is "),n(14,"a",3),e(15,"Semantic Versioning"),t(),e(16,". Building on this foundation, "),n(17,"strong"),e(18,"C"),t(),e(19,"rystal "),n(20,"strong"),e(21,"N"),t(),e(22,"est "),n(23,"strong"),e(24,"S"),t(),e(25,"emantic "),n(26,"strong"),e(27,"V"),t(),e(28,"ersioning (CNSV) aims to standardize versioning specifically for Minecraft mods."),t(),e(29,`
  `),n(30,"span"),e(31,"A CNSV-compliant version consists of two independent parts:"),t(),e(32,`
  `),n(33,"ul",2),e(34,`
    `),n(35,"li"),e(36,"The "),n(37,"strong"),e(38,"Minecraft Version"),t(),e(39,", indicating the supported Minecraft version."),t(),e(40,`
    `),n(41,"li"),e(42,"The "),n(43,"strong"),e(44,"Mod Version"),t(),e(45,", indicating the features and changes available."),t(),e(46,`
  `),t(),e(47,`
  `),n(48,"span",2),e(49,"The Minecraft Version comes first, followed by the Mod Version, separated by a hyphen, to help users easily identify the required version. For example, a valid version could be "),n(50,"code"),e(51,"1.20.4-1.0.0"),t(),e(52,"."),t(),e(53,`
  `),n(54,"span"),e(55,"When using our "),n(56,"a",4),e(57,"template"),t(),e(58," or "),n(59,"a",5),e(60,"mod generator"),t(),e(61,", the Minecraft Version and Mod Version are two separate properties. During the build process, these properties are combined to create a valid CNSV version."),t(),e(62,`
  `),n(63,"span"),e(64,"Both the template and the mod generator ensure compliance with other "),n(65,"a",6),e(66,"related conventions"),t(),e(67,"."),t(),e(68,`
`),t(),e(69,`
`),n(70,"a",7),e(71,`
  `),i(72,"mat-icon",1),e(73,`
  `),n(74,"h1"),e(75,"Minecraft Version"),t(),e(76,`
`),t(),e(77,`
`),i(78,"mat-divider"),e(79,`
`),n(80,"div"),e(81,`
  `),n(82,"span"),e(83,"The Minecraft Version is straightforward: it must match the supported Minecraft version."),t(),e(84,`
  `),n(85,"span"),e(86,"When updating your mod to support a new Minecraft version, you only need to update the Minecraft Version, unless you also make significant changes to your mod's features or API, if any."),t(),e(87,`
`),t(),e(88,`
`),n(89,"a",8),e(90,`
  `),i(91,"mat-icon",1),e(92,`
  `),n(93,"h1"),e(94,"Mod Version"),t(),e(95,`
`),t(),e(96,`
`),i(97,"mat-divider"),e(98,`
`),n(99,"div"),e(100,`
  `),n(101,"span"),e(102,"The Mod Version, adhering to the Semantic Versioning standard, consists of three non-negative numbers: Major, Minor, and Patch."),t(),e(103,`
  `),n(104,"span"),e(105,"When incrementing a number, all numbers to its right must be reset to 0."),t(),e(106,`
  `),n(107,"ul"),e(108,`
    `),n(109,"li"),e(110,"The Major version is incremented for breaking changes, affecting either end-users or API users."),t(),e(111,`
    `),n(112,"li"),e(113,"The Minor version is incremented for backward-compatible changes that introduce new features or deprecate existing ones."),t(),e(114,`
    `),n(115,"li"),e(116,"The Patch version is incremented for backward-compatible bug fixes."),t(),e(117,`
  `),t(),e(118,`
  `),n(119,"span",2),e(120,"This system ensures that users and developers can easily determine the safety of updating your mod."),t(),e(121,`
  `),n(122,"span",2),e(123,"Optionally, the Mod Version can be followed by a hyphen and an "),n(124,"em"),e(125,"alpha"),t(),e(126," or "),n(127,"em"),e(128,"beta"),t(),e(129," designation, such as "),n(130,"code"),e(131,"1.20.4-1.0.0-alpha"),t(),e(132,". These versions are called "),n(133,"em"),e(134,"pre-release"),t(),e(135," or "),n(136,"em"),e(137,"unstable"),t(),e(138,". When no additional designation is used, versions are considered "),n(139,"em"),e(140,"release"),t(),e(141," or "),n(142,"em"),e(143,"stable"),t(),e(144,"."),t(),e(145,`
  `),n(146,"span"),e(147,"Unstable versions have different semantics for the Major, Minor, and Patch numbers:"),t(),e(148,`
  `),n(149,"ul"),e(150,`
    `),n(151,"li"),e(152,`
      Alpha
      `),n(153,"ul"),e(154,`
        `),n(155,"li"),e(156,"Highly unstable, frequently changing, and likely to break backward compatibility."),t(),e(157,`
        `),n(158,"li"),e(159,"Only the Patch number should be incremented, regardless of backward compatibility."),t(),e(160,`
        `),n(161,"li"),e(162,"The Minor number can be incremented for very significant changes, regardless of backward compatibility."),t(),e(163,`
        `),n(164,"li"),e(165,"The Major number must not change."),t(),e(166,`
      `),t(),e(167,`
    `),t(),e(168,`
    `),n(169,"li"),e(170,`
      Beta
      `),n(171,"ul"),e(172,`
        `),n(173,"li"),e(174,"Unstable but generally maintains backward compatibility."),t(),e(175,`
        `),n(176,"li"),e(177,"The Patch number should follow standard semantic rules."),t(),e(178,`
        `),n(179,"li"),e(180,"The Minor number should be incremented for breaking changes."),t(),e(181,`
        `),n(182,"li"),e(183,"The Major number must not change."),t(),e(184,`
      `),t(),e(185,`
    `),t(),e(186,`
  `),t(),e(187,`
  `),n(188,"span",2),e(189,"When transitioning from an alpha to a beta, you only need to change the designation unless there are breaking changes. When moving from an unstable to a stable version, simply remove the designation unless there are breaking changes. For example, "),n(190,"code"),e(191,"1.0.1-alpha"),t(),e(192," -> "),n(193,"code"),e(194,"1.0.2-alpha"),t(),e(195," -> "),n(196,"code"),e(197,"1.0.2-beta"),t(),e(198," -> "),n(199,"code"),e(200,"1.2.0-beta"),t(),e(201," -> "),n(202,"code"),e(203,"1.2.0"),t(),e(204,"."),t(),e(205,`
  `),n(206,"span"),e(207,"An exception to the standard Minor and Patch semantics occurs when the Major version is 0. In this case, you are indicating that the mod and its API are not ready for public use, and backward compatibility is not guaranteed:"),t(),e(208,`
  `),n(209,"ul"),e(210,`
    `),n(211,"li"),e(212,"The standard semantics apply to Minor and Patch numbers, but substantial breaking changes should increment the Minor version rather than the Major."),t(),e(213,`
    `),n(214,"li"),e(215,"Alpha and beta versions can be declared with a Major version of 0, but start with alpha and then beta, with no stable versions."),t(),e(216,`
    `),n(217,"li"),e(218,"When the mod and its API become stable, increment the Major version to 1."),t(),e(219,`
  `),t(),e(220,`
`),t(),e(221,`
`),n(222,"a",9),e(223,`
  `),i(224,"mat-icon",1),e(225,`
  `),n(226,"h1"),e(227,"Depending"),t(),e(228,`
`),t(),e(229,`
`),i(230,"mat-divider"),e(231,`
`),n(232,"div"),e(233,`
  `),n(234,"span",2),e(235,"When depending on another mod that complies with CNSV, you only need to check the Mod Version, as the Minecraft Version is assumed to be the same (otherwise, the game wouldn't load)."),t(),e(236,`
  `),n(237,"span"),e(238,"Fabric and Forge/NeoForge use different conventions for specifying allowed versions when depending on another mod:"),t(),e(239,`
  `),n(240,"ul"),e(241,`
    `),n(242,"li")(243,"strong"),e(244,"Fabric"),t(),e(245,": Fabric uses its own "),n(246,"a",10),e(247,"version range specification"),t(),e(248,". For a CNSV-compliant mod, you can use "),n(249,"code"),e(250,"^mod_version"),t(),e(251,", ensuring compatibility with the specified version and up within the same major version."),t(),e(252,`
    `),n(253,"li")(254,"strong"),e(255,"Forge and NeoForge"),t(),e(256,": These platforms use the "),n(257,"a",11),e(258,"Maven Version Range"),t(),e(259,". For a CNSV-compliant mod, you can use "),n(260,"code"),e(261,"[mod_version,)"),t(),e(262,", ensuring compatibility with the specified version and up within the same major version."),t(),e(263,`
  `),t(),e(264,`
`),t(),e(265,`
`),n(266,"a",12),e(267,`
  `),i(268,"mat-icon",1),e(269,`
  `),n(270,"h1"),e(271,"Related conventions"),t(),e(272,`
`),t(),e(273,`
`),i(274,"mat-divider"),e(275,`
`),n(276,"div"),e(277,`
  `),n(278,"span"),e(279,"The CNSV standard influences other naming conventions involving Minecraft and Mod versions:"),t(),e(280,`
  `),n(281,"ul"),e(282,`
    `),e(283,`
    `),n(284,"li"),e(285,"To refer to the same Mod Version across any Minecraft Version, use the format "),n(286,"code"),e(287,"vMOD"),t(),e(288,", where "),n(289,"code"),e(290,"MOD"),t(),e(291," is the Mod Version."),i(292,"br"),e(293,"For example, "),n(294,"code"),e(295,"v1.0.0"),t(),e(296," refers to all mod builds with the same Mod Version, regardless of the Minecraft Version."),t(),e(297,`
    `),n(298,"li"),e(299,"For artifact ("),n(300,"code"),e(301,".jar"),t(),e(302," file) naming, use the format "),n(303,"code"),e(304,"ID-LOADER-MC-MOD"),t(),e(305,", where "),n(306,"code"),e(307,"ID"),t(),e(308," is the mod "),n(309,"code"),e(310,"ID"),t(),e(311," in kebab case, "),n(312,"code"),e(313,"LOADER"),t(),e(314," is the supported mod loader in lowercase, "),n(315,"code"),e(316,"MC"),t(),e(317," is the Minecraft Version, and "),n(318,"code"),e(319,"MOD"),t(),e(320," is the Mod Version."),i(321,"br"),e(322,"For example, "),n(323,"code"),e(324,"cobweb-fabric-1.20.4-1.0.0"),t(),e(325," is the artifact for the Cobweb "),n(326,"code"),e(327,"v1.0.0"),t(),e(328," build that supports Fabric and Minecraft 1.20.4."),t(),e(329,`
    `),n(330,"li"),e(331,"When publishing a mod release on GitHub, the release must include artifacts for all supported mod loaders and use the format "),n(332,"code"),e(333,"vMC-MOD"),t(),e(334," for both the tag and release name, where "),n(335,"code"),e(336,"MC"),t(),e(337," is the Minecraft Version and "),n(338,"code"),e(339,"MOD"),t(),e(340," is the Mod Version."),i(341,"br"),e(342,"For example, "),n(343,"code"),e(344,"v1.20.4-1.0.0"),t(),e(345," is the release for "),n(346,"code"),e(347,"v1.0.0"),t(),e(348," that supports Minecraft 1.20.4 and contains artifacts for every supported mod loader."),t(),e(349,`
    `),n(350,"li"),e(351,"When publishing an artifact to a modding platform such as Modrinth or CurseForge, use the format "),n(352,"code"),e(353,"[LOADER - MC] TITLE vMOD"),t(),e(354," for the display name, where "),n(355,"code"),e(356,"LOADER"),t(),e(357," is the supported mod loader, "),n(358,"code"),e(359,"TITLE"),t(),e(360," is the mod title, "),n(361,"code"),e(362,"MC"),t(),e(363," is the Minecraft Version, and "),n(364,"code"),e(365,"MOD"),t(),e(366," is the Mod Version."),i(367,"br"),e(368,"For example, "),n(369,"code"),e(370,"[Fabric - 1.20.4] Cobweb v1.0.0"),t(),e(371," is the display name for the artifact "),n(372,"code"),e(373,"cobweb-fabric-1.20.4-1.0.0"),t(),e(374,"."),t(),e(375,`
    `),n(376,"li"),e(377,"For Maven package naming, use the format "),n(378,"code"),e(379,"GROUP:ID-LOADER:MC-MOD"),t(),e(380,", where "),n(381,"code"),e(382,"GROUP"),t(),e(383," is the Java group, "),n(384,"code"),e(385,"ID"),t(),e(386," is the mod ID in kebab case, "),n(387,"code"),e(388,"LOADER"),t(),e(389," is the supported mod loader in "),n(390,"strong"),e(391,"lowercase"),t(),e(392,", "),n(393,"code"),e(394,"MC"),t(),e(395," is the Minecraft Version, and "),n(396,"code"),e(397,"MOD"),t(),e(398," is the Mod Version."),i(399,"br"),e(400,"For example, "),n(401,"code"),e(402,"it.crystalnest:cobweb-fabric:1.20.4-1.0.0"),t(),e(403," is the Maven package for the Cobweb "),n(404,"code"),e(405,"v1.0.0"),t(),e(406," build that supports Fabric and Minecraft 1.20.4."),i(407,"br"),e(408,"In XML format, it would be:"),i(409,"markdown",13),t(),e(410,`
  `),t(),e(411,`
  `),n(412,"span"),e(413,"Our template and mod generator handle all these aspects automatically."),t(),e(414,`
`),t(),e(415,`
`),n(416,"a",14),e(417,`
  `),i(418,"mat-icon",1),e(419,`
  `),n(420,"h1"),e(421,"Final notes"),t(),e(422,`
`),t(),e(423,`
`),i(424,"mat-divider"),e(425,`
`),n(426,"div"),e(427,`
  `),n(428,"span",2),e(429,"Since we introduced the CNSV standard after we began development, only our most recent mod versions adhere to it. Previously, we followed a loose interpretation of "),n(430,"a",15),e(431,"Forge Semantic Versioning"),t(),e(432,"."),t(),e(433,`
  `),n(434,"span",2),e(435,"If you have any questions about the Mod Version, please refer to the "),n(436,"a",16),e(437,"Semantic Versioning FAQ"),t(),e(438,"."),t(),e(439,`
  `),n(440,"span"),e(441,"Still have questions? Come chat with us on "),n(442,"a",17),e(443,"Discord"),t(),e(444,"!"),t(),e(445,`
`),t(),e(446,`
`)),r&2&&(m(409),d("data",b.xmlMavenPackageSnippet))},dependencies:[g,h,S,u,f,p,c,x],styles:["[_nghost-%COMP%]{height:100%;flex:1;padding:2rem 2rem 2rem .75rem;color:#e3e3e3}[_nghost-%COMP%]   h1[_ngcontent-%COMP%]{font-size:2em;font-weight:400}[_nghost-%COMP%] > a[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;width:fit-content;margin-top:1rem;text-decoration:none;color:inherit}[_nghost-%COMP%] > a[_ngcontent-%COMP%]:first-child{margin-top:0}[_nghost-%COMP%] > a[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{visibility:hidden}[_nghost-%COMP%] > a[_ngcontent-%COMP%]:hover{filter:brightness(1.2)}[_nghost-%COMP%] > a[_ngcontent-%COMP%]:hover > mat-icon[_ngcontent-%COMP%]{visibility:visible}[_nghost-%COMP%] > mat-divider[_ngcontent-%COMP%]{margin:.125rem 0 1rem 1.5rem}[_nghost-%COMP%] > div[_ngcontent-%COMP%]{padding-left:2rem;line-height:1.5}[_nghost-%COMP%] > div[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{display:block}[_nghost-%COMP%] > div[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]{margin:.25rem 0}[_nghost-%COMP%] > div[_ngcontent-%COMP%] > *.eop[_ngcontent-%COMP%]{margin-bottom:.5rem}"]});let o=a;return o})();export{_ as VersioningComponent};
