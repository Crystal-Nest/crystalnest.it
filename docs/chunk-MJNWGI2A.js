import{a as u,b as p}from"./chunk-ZGG4NCI6.js";import{b as f,d as S}from"./chunk-XNKN6H64.js";import{d as h,g}from"./chunk-XFOMVNZ2.js";import{X as x,Y as c}from"./chunk-OR7O3O7G.js";import"./chunk-3OV2KVJT.js";import{Bb as d,Lb as n,Mb as t,Nb as i,ec as e,lc as s,ob as m,sa as l}from"./chunk-LNVCPBNY.js";var _=(()=>{let a=class a{constructor(){this.xmlMavenPackageSnippet="```xml\n<dependency>\n  <groupId>it.crystalnest</groupId>\n  <artifactId>cobweb-fabric</artifactId>\n  <version>1.20.4-1.0.0</version>\n</dependency>\n```"}};a.\u0275fac=function(r){return new(r||a)},a.\u0275cmp=l({type:a,selectors:[["cn-versioning"]],standalone:!0,features:[s],decls:544,vars:1,consts:[["fragment","overview","id","overview","routerLink","/versioning"],["fontIcon","link"],[1,"eop"],["href","https://semver.org/","target","_blank"],["href","https://github.com/Crystal-Nest/cobweb-mod-template","target","_blank"],["routerLink","/generator"],["fragment","related-conventions","routerLink","/versioning"],["fragment","minecraft-version","id","minecraft-version","routerLink","/versioning"],["fragment","mod-version","id","mod-version","routerLink","/versioning"],["fragment","depending","id","depending","routerLink","/versioning"],["href","https://fabricmc.net/wiki/documentation:fabric_mod_json_spec#versionrange","target","_blank"],["href","https://maven.apache.org/enforcer/enforcer-rules/versionRanges.html","target","_blank"],["fragment","related-conventions","id","related-conventions","routerLink","/versioning"],[3,"data"],["fragment","final-notes","id","final-notes","routerLink","/versioning"],["href","https://docs.minecraftforge.net/en/latest/gettingstarted/versioning/","target","_blank"],["href","https://semver.org/#faq","target","_blank"],["href","https://discord.gg/BP6EdBfAmt","target","_blank"]],template:function(r,v){r&1&&(n(0,"a",0),e(1,`
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
  `),n(119,"span"),e(120,"This system ensures that users and developers can easily determine the safety of updating your mod."),t(),e(121,`
  `),i(122,"br"),e(123,`
  `),n(124,"span",2),e(125,"Optionally, the Mod Version can be followed by a hyphen and an "),n(126,"em"),e(127,"alpha"),t(),e(128," or "),n(129,"em"),e(130,"beta"),t(),e(131," designation, such as "),n(132,"code"),e(133,"1.20.4-1.0.0-alpha"),t(),e(134,". These versions are called "),n(135,"em"),e(136,"pre-release"),t(),e(137," or "),n(138,"em"),e(139,"unstable"),t(),e(140,". When no additional designation is used, versions are considered "),n(141,"em"),e(142,"release"),t(),e(143," or "),n(144,"em"),e(145,"stable"),t(),e(146,"."),t(),e(147,`
  `),n(148,"span"),e(149,"Unstable versions have different semantics for the Major, Minor, and Patch numbers:"),t(),e(150,`
  `),n(151,"ul"),e(152,`
    `),n(153,"li"),e(154,`
      Alpha
      `),n(155,"ul"),e(156,`
        `),n(157,"li"),e(158,"Highly unstable, frequently changing, and likely to break backward compatibility."),t(),e(159,`
        `),n(160,"li"),e(161,"Only the Patch number should be incremented, regardless of backward compatibility."),t(),e(162,`
        `),n(163,"li"),e(164,"The Minor number can be incremented for very significant changes, regardless of backward compatibility."),t(),e(165,`
        `),n(166,"li"),e(167,"The Major number must not change."),t(),e(168,`
      `),t(),e(169,`
    `),t(),e(170,`
    `),n(171,"li"),e(172,`
      Beta
      `),n(173,"ul"),e(174,`
        `),n(175,"li"),e(176,"Unstable but generally maintains backward compatibility."),t(),e(177,`
        `),n(178,"li"),e(179,"The Patch number should follow standard semantic rules."),t(),e(180,`
        `),n(181,"li"),e(182,"The Minor number should be incremented for breaking changes."),t(),e(183,`
        `),n(184,"li"),e(185,"The Major number must not change."),t(),e(186,`
      `),t(),e(187,`
    `),t(),e(188,`
  `),t(),e(189,`
  `),n(190,"span"),e(191,"When transitioning from an alpha to a beta, you only need to change the designation unless there are breaking changes. When moving from an unstable to a stable version, simply remove the designation unless there are breaking changes. For example, "),n(192,"code"),e(193,"1.0.1-alpha"),t(),e(194," -> "),n(195,"code"),e(196,"1.0.2-alpha"),t(),e(197," -> "),n(198,"code"),e(199,"1.0.2-beta"),t(),e(200," -> "),n(201,"code"),e(202,"1.2.0-beta"),t(),e(203," -> "),n(204,"code"),e(205,"1.2.0"),t(),e(206,"."),t(),e(207,`
  `),i(208,"br"),e(209,`
  `),n(210,"span"),e(211,"An exception to the standard Minor and Patch semantics occurs when the Major version is 0. In this case, you are indicating that the mod and its API are not ready for public use, and backward compatibility is not guaranteed:"),t(),e(212,`
  `),n(213,"ul"),e(214,`
    `),n(215,"li"),e(216,"The standard semantics apply to Minor and Patch numbers, but substantial breaking changes should increment the Minor version rather than the Major."),t(),e(217,`
    `),n(218,"li"),e(219,"Alpha and beta versions can be declared with a Major version of 0, but start with alpha and then beta, with no stable versions."),t(),e(220,`
    `),n(221,"li"),e(222,"When the mod and its API become stable, increment the Major version to 1."),t(),e(223,`
  `),t(),e(224,`
  `),i(225,"br"),e(226,`
  `),n(227,"span"),e(228,"If you need to update your mod for only a subset of supported Minecraft versions, such as fixing a bug in older versions, follow these guidelines:"),t(),e(229,`
  `),n(230,"ul"),e(231,`
    `),n(232,"li")(233,"strong"),e(234,"Increment the Mod Version for new releases only"),t(),e(235,": when releasing a new Mod Version for just a subset of your supported Minecraft versions, increment the Mod Version only for those releases, leaving the others unchanged."),t(),e(236,`
    `),n(237,"li")(238,"strong"),e(239,"Maintain consistency across versions"),t(),e(240,": if you later release a new version for a Minecraft version that didn't have its Mod Version increased, ensure you increment its Mod Version to match the highest current version, not the next sequential number. This maintains consistency with the changes introduced."),t(),e(241,`
  `),t(),e(242,`
  `),n(243,"span"),e(244,"For example, you might find and fix a bug in version "),n(245,"code"),e(246,"1.19.4"),t(),e(247,". Later, you find another bug affecting all versions and fix that too. Here's how your versions should be updated:"),t(),e(248,`
  `),n(249,"ul"),e(250,`
    `),n(251,"li"),e(252,`
      Initial versions:
      `),n(253,"ul"),e(254,`
        `),n(255,"li")(256,"code"),e(257,"1.20.4-1.0.0"),t()(),e(258,`
        `),n(259,"li")(260,"code"),e(261,"1.20.2-1.0.0"),t()(),e(262,`
        `),n(263,"li")(264,"code"),e(265,"1.19.4-1.0.0"),t()(),e(266,`
      `),t(),e(267,`
    `),t(),e(268,`
    `),n(269,"li"),e(270,`
      Bugfix for 1.19.4 only:
      `),n(271,"ul"),e(272,`
        `),n(273,"li")(274,"code"),e(275,"1.20.4-1.0.0"),t()(),e(276,`
        `),n(277,"li")(278,"code"),e(279,"1.20.2-1.0.0"),t()(),e(280,`
        `),n(281,"li")(282,"code"),e(283,"1.19.4-1.0.1"),t()(),e(284,`
      `),t(),e(285,`
    `),t(),e(286,`
    `),n(287,"li"),e(288,`
      Bugfix for all versions:
      `),n(289,"ul"),e(290,`
        `),n(291,"li")(292,"code"),e(293,"1.20.4-1.0.2"),t()(),e(294,`
        `),n(295,"li")(296,"code"),e(297,"1.20.2-1.0.2"),t()(),e(298,`
        `),n(299,"li")(300,"code"),e(301,"1.19.4-1.0.2"),t()(),e(302,`
      `),t(),e(303,`
    `),t(),e(304,`
  `),t(),e(305,`
  `),n(306,"span"),e(307,"In this example, "),n(308,"code"),e(309,"1.20.4"),t(),e(310," and "),n(311,"code"),e(312,"1.20.2"),t(),e(313," skipped Mod Version "),n(314,"code"),e(315,"1.0.1"),t(),e(316,". This ensures your Mod Version scheme remains consistent and aligned with the changes made."),t(),e(317,`
`),t(),e(318,`
`),n(319,"a",9),e(320,`
  `),i(321,"mat-icon",1),e(322,`
  `),n(323,"h1"),e(324,"Depending"),t(),e(325,`
`),t(),e(326,`
`),i(327,"mat-divider"),e(328,`
`),n(329,"div"),e(330,`
  `),n(331,"span",2),e(332,"When depending on another mod that complies with CNSV, you only need to check the Mod Version, as the Minecraft Version is assumed to be the same (otherwise, the game wouldn't load)."),t(),e(333,`
  `),n(334,"span"),e(335,"Fabric and Forge/NeoForge use different conventions for specifying allowed versions when depending on another mod:"),t(),e(336,`
  `),n(337,"ul"),e(338,`
    `),n(339,"li")(340,"strong"),e(341,"Fabric"),t(),e(342,": Fabric uses its own "),n(343,"a",10),e(344,"version range specification"),t(),e(345,". For a CNSV-compliant mod, you can use "),n(346,"code"),e(347,"^mod_version"),t(),e(348,", ensuring compatibility with the specified version and up within the same major version."),t(),e(349,`
    `),n(350,"li")(351,"strong"),e(352,"Forge and NeoForge"),t(),e(353,": These platforms use the "),n(354,"a",11),e(355,"Maven Version Range"),t(),e(356,". For a CNSV-compliant mod, you can use "),n(357,"code"),e(358,"[mod_version,)"),t(),e(359,", ensuring compatibility with the specified version and up within the same major version."),t(),e(360,`
  `),t(),e(361,`
`),t(),e(362,`
`),n(363,"a",12),e(364,`
  `),i(365,"mat-icon",1),e(366,`
  `),n(367,"h1"),e(368,"Related conventions"),t(),e(369,`
`),t(),e(370,`
`),i(371,"mat-divider"),e(372,`
`),n(373,"div"),e(374,`
  `),n(375,"span"),e(376,"The CNSV standard influences other naming conventions involving Minecraft and Mod versions:"),t(),e(377,`
  `),n(378,"ul"),e(379,`
    `),e(380,`
    `),n(381,"li"),e(382,"To refer to the same Mod Version across any Minecraft Version, use the format "),n(383,"code"),e(384,"vMOD"),t(),e(385,", where "),n(386,"code"),e(387,"MOD"),t(),e(388," is the Mod Version."),i(389,"br"),e(390,"For example, "),n(391,"code"),e(392,"v1.0.0"),t(),e(393," refers to all mod builds with the same Mod Version, regardless of the Minecraft Version."),t(),e(394,`
    `),n(395,"li"),e(396,"For artifact ("),n(397,"code"),e(398,".jar"),t(),e(399," file) naming, use the format "),n(400,"code"),e(401,"ID-LOADER-MC-MOD"),t(),e(402,", where "),n(403,"code"),e(404,"ID"),t(),e(405," is the mod "),n(406,"code"),e(407,"ID"),t(),e(408," in kebab case, "),n(409,"code"),e(410,"LOADER"),t(),e(411," is the supported mod loader in lowercase, "),n(412,"code"),e(413,"MC"),t(),e(414," is the Minecraft Version, and "),n(415,"code"),e(416,"MOD"),t(),e(417," is the Mod Version."),i(418,"br"),e(419,"For example, "),n(420,"code"),e(421,"cobweb-fabric-1.20.4-1.0.0"),t(),e(422," is the artifact for the Cobweb "),n(423,"code"),e(424,"v1.0.0"),t(),e(425," build that supports Fabric and Minecraft 1.20.4."),t(),e(426,`
    `),n(427,"li"),e(428,"When publishing a mod release on GitHub, the release must include artifacts for all supported mod loaders and use the format "),n(429,"code"),e(430,"vMC-MOD"),t(),e(431," for both the tag and release name, where "),n(432,"code"),e(433,"MC"),t(),e(434," is the Minecraft Version and "),n(435,"code"),e(436,"MOD"),t(),e(437," is the Mod Version."),i(438,"br"),e(439,"For example, "),n(440,"code"),e(441,"v1.20.4-1.0.0"),t(),e(442," is the release for "),n(443,"code"),e(444,"v1.0.0"),t(),e(445," that supports Minecraft 1.20.4 and contains artifacts for every supported mod loader."),t(),e(446,`
    `),n(447,"li"),e(448,"When publishing an artifact to a modding platform such as Modrinth or CurseForge, use the format "),n(449,"code"),e(450,"[LOADER - MC] TITLE vMOD"),t(),e(451," for the display name, where "),n(452,"code"),e(453,"LOADER"),t(),e(454," is the supported mod loader in "),n(455,"strong"),e(456,"pascal case"),t(),e(457,", "),n(458,"code"),e(459,"TITLE"),t(),e(460," is the mod title, "),n(461,"code"),e(462,"MC"),t(),e(463," is the Minecraft Version, and "),n(464,"code"),e(465,"MOD"),t(),e(466," is the Mod Version."),i(467,"br"),e(468,"For example, "),n(469,"code"),e(470,"[Fabric - 1.20.4] Cobweb v1.0.0"),t(),e(471," is the display name for the artifact "),n(472,"code"),e(473,"cobweb-fabric-1.20.4-1.0.0"),t(),e(474,"."),t(),e(475,`
    `),n(476,"li"),e(477,"For Maven package naming, use the format "),n(478,"code"),e(479,"GROUP:ID-LOADER:MC-MOD"),t(),e(480,", where "),n(481,"code"),e(482,"GROUP"),t(),e(483," is the Java group, "),n(484,"code"),e(485,"ID"),t(),e(486," is the mod ID in kebab case, "),n(487,"code"),e(488,"LOADER"),t(),e(489," is the supported mod loader in lowercase, "),n(490,"code"),e(491,"MC"),t(),e(492," is the Minecraft Version, and "),n(493,"code"),e(494,"MOD"),t(),e(495," is the Mod Version."),i(496,"br"),e(497,"For example, "),n(498,"code"),e(499,"it.crystalnest:cobweb-fabric:1.20.4-1.0.0"),t(),e(500," is the Maven package for the Cobweb "),n(501,"code"),e(502,"v1.0.0"),t(),e(503," build that supports Fabric and Minecraft 1.20.4."),i(504,"br"),e(505,"In XML format, it would be:"),i(506,"markdown",13),t(),e(507,`
  `),t(),e(508,`
  `),n(509,"span"),e(510,"Our template and mod generator handle all these aspects automatically."),t(),e(511,`
`),t(),e(512,`
`),n(513,"a",14),e(514,`
  `),i(515,"mat-icon",1),e(516,`
  `),n(517,"h1"),e(518,"Final notes"),t(),e(519,`
`),t(),e(520,`
`),i(521,"mat-divider"),e(522,`
`),n(523,"div"),e(524,`
  `),n(525,"span",2),e(526,"Since we introduced the CNSV standard after we began development, only our most recent mod versions adhere to it. Previously, we followed a loose interpretation of "),n(527,"a",15),e(528,"Forge Semantic Versioning"),t(),e(529,"."),t(),e(530,`
  `),n(531,"span",2),e(532,"If you have any questions about the Mod Version, please refer to the "),n(533,"a",16),e(534,"Semantic Versioning FAQ"),t(),e(535,"."),t(),e(536,`
  `),n(537,"span"),e(538,"Still have questions? Come chat with us on "),n(539,"a",17),e(540,"Discord"),t(),e(541,"!"),t(),e(542,`
`),t(),e(543,`
`)),r&2&&(m(506),d("data",v.xmlMavenPackageSnippet))},dependencies:[g,h,S,f,p,u,c,x],styles:["[_nghost-%COMP%]{height:100%;flex:1;padding:2rem 2rem 2rem .75rem;color:#e3e3e3}[_nghost-%COMP%]   h1[_ngcontent-%COMP%]{font-size:2em;font-weight:400}[_nghost-%COMP%] > a[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;width:fit-content;margin-top:1rem;text-decoration:none;color:inherit}[_nghost-%COMP%] > a[_ngcontent-%COMP%]:first-child{margin-top:0}[_nghost-%COMP%] > a[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{visibility:hidden}[_nghost-%COMP%] > a[_ngcontent-%COMP%]:hover{filter:brightness(1.2)}[_nghost-%COMP%] > a[_ngcontent-%COMP%]:hover > mat-icon[_ngcontent-%COMP%]{visibility:visible}[_nghost-%COMP%] > mat-divider[_ngcontent-%COMP%]{margin:.125rem 0 1rem 1.5rem}[_nghost-%COMP%] > div[_ngcontent-%COMP%]{padding-left:2rem;line-height:1.5}[_nghost-%COMP%] > div[_ngcontent-%COMP%] > mat-divider[_ngcontent-%COMP%]{margin:.75rem 33%}[_nghost-%COMP%] > div[_ngcontent-%COMP%] > *.eop[_ngcontent-%COMP%]{margin-bottom:.5rem}[_nghost-%COMP%] > div[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{display:block}[_nghost-%COMP%] > div[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]{margin:.25rem 0}[_nghost-%COMP%] > div[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{padding-left:1rem}"]});let o=a;return o})();export{_ as VersioningComponent};
