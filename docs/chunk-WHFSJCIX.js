import{a as h}from"./chunk-DI2N247N.js";import"./chunk-ADHAQHOR.js";import{b as x,d as c}from"./chunk-437ZRHNI.js";import"./chunk-2RYUNRBV.js";import{Jb as n,Kb as t,Lb as i,bc as e,ic as d,mb as s,sa as l,zb as m}from"./chunk-HVAOHXCI.js";var b=(()=>{let a=class a{constructor(){this.xmlMavenPackageSnippet="```xml\n<dependency>\n  <groupId>it.crystalnest</groupId>\n  <artifactId>cobweb-fabric</artifactId>\n  <version>1.20.4-1.0.0</version>\n</dependency>\n```"}};a.\u0275fac=function(r){return new(r||a)},a.\u0275cmp=l({type:a,selectors:[["cn-versioning"]],standalone:!0,features:[d],decls:483,vars:1,consts:[["fragment","overview","route","versioning","title","Overview"],[1,"eop"],["href","https://semver.org/","target","_blank"],["href","https://github.com/Crystal-Nest/cobweb-mod-template","target","_blank"],["routerLink","/generator"],["fragment","related-conventions","routerLink","/versioning"],["fragment","minecraft-version","route","versioning","title","Minecraft Version"],["fragment","mod-version","route","versioning","title","Mod Version"],["fragment","depending","route","versioning","title","Depending"],["href","https://fabricmc.net/wiki/documentation:fabric_mod_json_spec#versionrange","target","_blank"],["href","https://maven.apache.org/enforcer/enforcer-rules/versionRanges.html","target","_blank"],["fragment","related-conventions","route","versioning","title","Related conventions"],[3,"data"],["fragment","final-notes","route","versioning","title","Final notes"],["href","https://docs.minecraftforge.net/en/latest/gettingstarted/versioning/","target","_blank"],["href","https://semver.org/#faq","target","_blank"],["href","https://discord.gg/BP6EdBfAmt","target","_blank"]],template:function(r,p){r&1&&(n(0,"cn-section",0),e(1,`
  `),n(2,"span",1),e(3,"A well-known standard for versioning is "),n(4,"a",2),e(5,"Semantic Versioning"),t(),e(6,". Building on this foundation, "),n(7,"strong"),e(8,"C"),t(),e(9,"rystal "),n(10,"strong"),e(11,"N"),t(),e(12,"est "),n(13,"strong"),e(14,"S"),t(),e(15,"emantic "),n(16,"strong"),e(17,"V"),t(),e(18,"ersioning (CNSV) aims to standardize versioning specifically for Minecraft mods."),t(),e(19,`
  `),n(20,"span"),e(21,"A CNSV-compliant version consists of two independent parts:"),t(),e(22,`
  `),n(23,"ul",1),e(24,`
    `),n(25,"li"),e(26,"The "),n(27,"strong"),e(28,"Minecraft Version"),t(),e(29,", indicating the supported Minecraft version."),t(),e(30,`
    `),n(31,"li"),e(32,"The "),n(33,"strong"),e(34,"Mod Version"),t(),e(35,", indicating the features and changes available."),t(),e(36,`
  `),t(),e(37,`
  `),n(38,"span",1),e(39,"The Minecraft Version comes first, followed by the Mod Version, separated by a hyphen, to help users easily identify the required version. For example, a valid version could be "),n(40,"code"),e(41,"1.20.4-1.0.0"),t(),e(42,"."),t(),e(43,`
  `),n(44,"span"),e(45,"When using our "),n(46,"a",3),e(47,"template"),t(),e(48," or "),n(49,"a",4),e(50,"mod generator"),t(),e(51,", the Minecraft Version and Mod Version are two separate properties. During the build process, these properties are combined to create a valid CNSV version."),t(),e(52,`
  `),n(53,"span"),e(54,"Both the template and the mod generator ensure compliance with other "),n(55,"a",5),e(56,"related conventions"),t(),e(57,"."),t(),e(58,`
`),t(),e(59,`
`),n(60,"cn-section",6),e(61,`
  `),n(62,"span"),e(63,"The Minecraft Version is straightforward: it must match the supported Minecraft version."),t(),e(64,`
  `),n(65,"span"),e(66,"When updating your mod to support a new Minecraft version, you only need to update the Minecraft Version, unless you also make significant changes to your mod's features or API, if any."),t(),e(67,`
`),t(),e(68,`
`),n(69,"cn-section",7),e(70,`
  `),n(71,"span"),e(72,"The Mod Version, adhering to the Semantic Versioning standard, consists of three non-negative numbers: Major, Minor, and Patch."),t(),e(73,`
  `),n(74,"span"),e(75,"When incrementing a number, all numbers to its right must be reset to 0."),t(),e(76,`
  `),n(77,"ul"),e(78,`
    `),n(79,"li"),e(80,"The Major version is incremented for breaking changes, affecting either end-users or API users."),t(),e(81,`
    `),n(82,"li"),e(83,"The Minor version is incremented for backward-compatible changes that introduce new features or deprecate existing ones."),t(),e(84,`
    `),n(85,"li"),e(86,"The Patch version is incremented for backward-compatible bug fixes."),t(),e(87,`
  `),t(),e(88,`
  `),n(89,"span"),e(90,"This system ensures that users and developers can easily determine the safety of updating your mod."),t(),e(91,`
  `),i(92,"br"),e(93,`
  `),n(94,"span",1),e(95,"Optionally, the Mod Version can be followed by a hyphen and an "),n(96,"em"),e(97,"alpha"),t(),e(98," or "),n(99,"em"),e(100,"beta"),t(),e(101," designation, such as "),n(102,"code"),e(103,"1.20.4-1.0.0-alpha"),t(),e(104,". These versions are called "),n(105,"em"),e(106,"pre-release"),t(),e(107," or "),n(108,"em"),e(109,"unstable"),t(),e(110,". When no additional designation is used, versions are considered "),n(111,"em"),e(112,"release"),t(),e(113," or "),n(114,"em"),e(115,"stable"),t(),e(116,"."),t(),e(117,`
  `),n(118,"span"),e(119,"Unstable versions have different semantics for the Major, Minor, and Patch numbers:"),t(),e(120,`
  `),n(121,"ul"),e(122,`
    `),n(123,"li"),e(124,`
      Alpha
      `),n(125,"ul"),e(126,`
        `),n(127,"li"),e(128,"Highly unstable, frequently changing, and likely to break backward compatibility."),t(),e(129,`
        `),n(130,"li"),e(131,"Only the Patch number should be incremented, regardless of backward compatibility."),t(),e(132,`
        `),n(133,"li"),e(134,"The Minor number can be incremented for very significant changes, regardless of backward compatibility."),t(),e(135,`
        `),n(136,"li"),e(137,"The Major number must not change."),t(),e(138,`
      `),t(),e(139,`
    `),t(),e(140,`
    `),n(141,"li"),e(142,`
      Beta
      `),n(143,"ul"),e(144,`
        `),n(145,"li"),e(146,"Unstable but generally maintains backward compatibility."),t(),e(147,`
        `),n(148,"li"),e(149,"The Patch number should follow standard semantic rules."),t(),e(150,`
        `),n(151,"li"),e(152,"The Minor number should be incremented for breaking changes."),t(),e(153,`
        `),n(154,"li"),e(155,"The Major number must not change."),t(),e(156,`
      `),t(),e(157,`
    `),t(),e(158,`
  `),t(),e(159,`
  `),n(160,"span"),e(161,"When transitioning from an alpha to a beta, you only need to change the designation unless there are breaking changes. When moving from an unstable to a stable version, simply remove the designation unless there are breaking changes. For example, "),n(162,"code"),e(163,"1.0.1-alpha"),t(),e(164," -> "),n(165,"code"),e(166,"1.0.2-alpha"),t(),e(167," -> "),n(168,"code"),e(169,"1.0.2-beta"),t(),e(170," -> "),n(171,"code"),e(172,"1.2.0-beta"),t(),e(173," -> "),n(174,"code"),e(175,"1.2.0"),t(),e(176,"."),t(),e(177,`
  `),i(178,"br"),e(179,`
  `),n(180,"span"),e(181,"An exception to the standard Minor and Patch semantics occurs when the Major version is 0. In this case, you are indicating that the mod and its API are not ready for public use, and backward compatibility is not guaranteed:"),t(),e(182,`
  `),n(183,"ul"),e(184,`
    `),n(185,"li"),e(186,"The standard semantics apply to Minor and Patch numbers, but substantial breaking changes should increment the Minor version rather than the Major."),t(),e(187,`
    `),n(188,"li"),e(189,"Alpha and beta versions can be declared with a Major version of 0, but start with alpha and then beta, with no stable versions."),t(),e(190,`
    `),n(191,"li"),e(192,"When the mod and its API become stable, increment the Major version to 1."),t(),e(193,`
  `),t(),e(194,`
  `),i(195,"br"),e(196,`
  `),n(197,"span"),e(198,"If you need to update your mod for only a subset of supported Minecraft versions, such as fixing a bug in older versions, follow these guidelines:"),t(),e(199,`
  `),n(200,"ul"),e(201,`
    `),n(202,"li")(203,"strong"),e(204,"Increment the Mod Version for new releases only"),t(),e(205,": when releasing a new Mod Version for just a subset of your supported Minecraft versions, increment the Mod Version only for those releases, leaving the others unchanged."),t(),e(206,`
    `),n(207,"li")(208,"strong"),e(209,"Maintain consistency across versions"),t(),e(210,": if you later release a new version for a Minecraft version that didn't have its Mod Version increased, ensure you increment its Mod Version to match the highest current version, not the next sequential number. This maintains consistency with the changes introduced."),t(),e(211,`
  `),t(),e(212,`
  `),n(213,"span"),e(214,"For example, you might find and fix a bug in version "),n(215,"code"),e(216,"1.19.4"),t(),e(217,". Later, you find another bug affecting all versions and fix that too. Here's how your versions should be updated:"),t(),e(218,`
  `),n(219,"ul"),e(220,`
    `),n(221,"li"),e(222,`
      Initial versions:
      `),n(223,"ul"),e(224,`
        `),n(225,"li")(226,"code"),e(227,"1.20.4-1.0.0"),t()(),e(228,`
        `),n(229,"li")(230,"code"),e(231,"1.20.2-1.0.0"),t()(),e(232,`
        `),n(233,"li")(234,"code"),e(235,"1.19.4-1.0.0"),t()(),e(236,`
      `),t(),e(237,`
    `),t(),e(238,`
    `),n(239,"li"),e(240,`
      Bugfix for 1.19.4 only:
      `),n(241,"ul"),e(242,`
        `),n(243,"li")(244,"code"),e(245,"1.20.4-1.0.0"),t()(),e(246,`
        `),n(247,"li")(248,"code"),e(249,"1.20.2-1.0.0"),t()(),e(250,`
        `),n(251,"li")(252,"code"),e(253,"1.19.4-1.0.1"),t()(),e(254,`
      `),t(),e(255,`
    `),t(),e(256,`
    `),n(257,"li"),e(258,`
      Bugfix for all versions:
      `),n(259,"ul"),e(260,`
        `),n(261,"li")(262,"code"),e(263,"1.20.4-1.0.2"),t()(),e(264,`
        `),n(265,"li")(266,"code"),e(267,"1.20.2-1.0.2"),t()(),e(268,`
        `),n(269,"li")(270,"code"),e(271,"1.19.4-1.0.2"),t()(),e(272,`
      `),t(),e(273,`
    `),t(),e(274,`
  `),t(),e(275,`
  `),n(276,"span"),e(277,"In this example, "),n(278,"code"),e(279,"1.20.4"),t(),e(280," and "),n(281,"code"),e(282,"1.20.2"),t(),e(283," skipped Mod Version "),n(284,"code"),e(285,"1.0.1"),t(),e(286,". This ensures your Mod Version scheme remains consistent and aligned with the changes made."),t(),e(287,`
`),t(),e(288,`
`),n(289,"cn-section",8),e(290,`
  `),n(291,"span",1),e(292,"When depending on another mod that complies with CNSV, you only need to check the Mod Version, as the Minecraft Version is assumed to be the same (otherwise, the game wouldn't load)."),t(),e(293,`
  `),n(294,"span"),e(295,"Fabric and Forge/NeoForge use different conventions for specifying allowed versions when depending on another mod:"),t(),e(296,`
  `),n(297,"ul"),e(298,`
    `),n(299,"li")(300,"strong"),e(301,"Fabric"),t(),e(302,": Fabric uses its own "),n(303,"a",9),e(304,"version range specification"),t(),e(305,". For a CNSV-compliant mod, you can use "),n(306,"code"),e(307,"^mod_version"),t(),e(308,", ensuring compatibility with the specified version and up within the same major version."),t(),e(309,`
    `),n(310,"li")(311,"strong"),e(312,"Forge and NeoForge"),t(),e(313,": These platforms use the "),n(314,"a",10),e(315,"Maven Version Range"),t(),e(316,". For a CNSV-compliant mod, you can use "),n(317,"code"),e(318,"[mod_version,)"),t(),e(319,", ensuring compatibility with the specified version and up within the same major version."),t(),e(320,`
  `),t(),e(321,`
`),t(),e(322,`
`),n(323,"cn-section",11),e(324,`
  `),n(325,"span"),e(326,"The CNSV standard influences other naming conventions involving Minecraft and Mod versions:"),t(),e(327,`
  `),n(328,"ul"),e(329,`
    `),n(330,"li"),e(331,"To refer to the same Mod Version across any Minecraft Version, use the format "),n(332,"code"),e(333,"vMOD"),t(),e(334,", where "),n(335,"code"),e(336,"MOD"),t(),e(337," is the Mod Version."),i(338,"br"),e(339,"For example, "),n(340,"code"),e(341,"v1.0.0"),t(),e(342," refers to all mod builds with the same Mod Version, regardless of the Minecraft Version."),t(),e(343,`
    `),n(344,"li"),e(345,"For artifact ("),n(346,"code"),e(347,".jar"),t(),e(348," file) naming, use the format "),n(349,"code"),e(350,"ID-LOADER-MC-MOD"),t(),e(351,", where "),n(352,"code"),e(353,"ID"),t(),e(354," is the mod "),n(355,"code"),e(356,"ID"),t(),e(357," in kebab case, "),n(358,"code"),e(359,"LOADER"),t(),e(360," is the supported mod loader in lowercase, "),n(361,"code"),e(362,"MC"),t(),e(363," is the Minecraft Version, and "),n(364,"code"),e(365,"MOD"),t(),e(366," is the Mod Version."),i(367,"br"),e(368,"For example, "),n(369,"code"),e(370,"cobweb-fabric-1.20.4-1.0.0"),t(),e(371," is the artifact for the Cobweb "),n(372,"code"),e(373,"v1.0.0"),t(),e(374," build that supports Fabric and Minecraft 1.20.4."),t(),e(375,`
    `),n(376,"li"),e(377,"When publishing a mod release on GitHub, the release must include artifacts for all supported mod loaders and use the format "),n(378,"code"),e(379,"vMC-MOD"),t(),e(380," for both the tag and release name, where "),n(381,"code"),e(382,"MC"),t(),e(383," is the Minecraft Version and "),n(384,"code"),e(385,"MOD"),t(),e(386," is the Mod Version."),i(387,"br"),e(388,"For example, "),n(389,"code"),e(390,"v1.20.4-1.0.0"),t(),e(391," is the release for "),n(392,"code"),e(393,"v1.0.0"),t(),e(394," that supports Minecraft 1.20.4 and contains artifacts for every supported mod loader."),t(),e(395,`
    `),n(396,"li"),e(397,"When publishing an artifact to a modding platform such as Modrinth or CurseForge, use the format "),n(398,"code"),e(399,"[LOADER - MC] TITLE vMOD"),t(),e(400," for the display name, where "),n(401,"code"),e(402,"LOADER"),t(),e(403," is the supported mod loader in "),n(404,"strong"),e(405,"pascal case"),t(),e(406,", "),n(407,"code"),e(408,"TITLE"),t(),e(409," is the mod title, "),n(410,"code"),e(411,"MC"),t(),e(412," is the Minecraft Version, and "),n(413,"code"),e(414,"MOD"),t(),e(415," is the Mod Version."),i(416,"br"),e(417,"For example, "),n(418,"code"),e(419,"[Fabric - 1.20.4] Cobweb v1.0.0"),t(),e(420," is the display name for the artifact "),n(421,"code"),e(422,"cobweb-fabric-1.20.4-1.0.0"),t(),e(423,"."),t(),e(424,`
    `),n(425,"li"),e(426,"For Maven package naming, use the format "),n(427,"code"),e(428,"GROUP:ID-LOADER:MC-MOD"),t(),e(429,", where "),n(430,"code"),e(431,"GROUP"),t(),e(432," is the Java group, "),n(433,"code"),e(434,"ID"),t(),e(435," is the mod ID in kebab case, "),n(436,"code"),e(437,"LOADER"),t(),e(438," is the supported mod loader in lowercase, "),n(439,"code"),e(440,"MC"),t(),e(441," is the Minecraft Version, and "),n(442,"code"),e(443,"MOD"),t(),e(444," is the Mod Version."),i(445,"br"),e(446,"For example, "),n(447,"code"),e(448,"it.crystalnest:cobweb-fabric:1.20.4-1.0.0"),t(),e(449," is the Maven package for the Cobweb "),n(450,"code"),e(451,"v1.0.0"),t(),e(452," build that supports Fabric and Minecraft 1.20.4."),i(453,"br"),e(454,"In XML format, it would be:"),i(455,"markdown",12),t(),e(456,`
  `),t(),e(457,`
  `),n(458,"span"),e(459,"Our template and mod generator handle all these aspects automatically."),t(),e(460,`
`),t(),e(461,`
`),n(462,"cn-section",13),e(463,`
  `),n(464,"span",1),e(465,"Since we introduced the CNSV standard after we began development, only our most recent mod versions adhere to it. Previously, we followed a loose interpretation of "),n(466,"a",14),e(467,"Forge Semantic Versioning"),t(),e(468,"."),t(),e(469,`
  `),n(470,"span",1),e(471,"If you have any questions about the Mod Version, please refer to the "),n(472,"a",15),e(473,"Semantic Versioning FAQ"),t(),e(474,"."),t(),e(475,`
  `),n(476,"span"),e(477,"Still have questions? Come chat with us on "),n(478,"a",16),e(479,"Discord"),t(),e(480,"!"),t(),e(481,`
`),t(),e(482,`
`)),r&2&&(s(455),m("data",p.xmlMavenPackageSnippet))},dependencies:[c,x,h],styles:["[_nghost-%COMP%]{height:100%;flex:1;padding:1rem 2rem 2rem .75rem}"]});let o=a;return o})();export{b as VersioningComponent};
