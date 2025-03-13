import{a as h}from"./chunk-SHUL5QNF.js";import"./chunk-ADHAQHOR.js";import{b as x,d as c}from"./chunk-437ZRHNI.js";import"./chunk-2RYUNRBV.js";import{Jb as n,Kb as t,Lb as i,bc as e,ic as d,mb as m,sa as l,zb as s}from"./chunk-HVAOHXCI.js";var b=(()=>{let a=class a{constructor(){this.xmlMavenPackageSnippet="```xml\n<dependency>\n  <groupId>it.crystalnest</groupId>\n  <artifactId>cobweb-fabric</artifactId>\n  <version>1.20.4-1.0.0</version>\n</dependency>\n```"}};a.\u0275fac=function(r){return new(r||a)},a.\u0275cmp=l({type:a,selectors:[["cn-versioning"]],standalone:!0,features:[d],decls:489,vars:1,consts:[["fragment","overview","route","versioning","title","Overview"],[1,"eop"],["href","https://semver.org/","target","_blank"],["href","https://github.com/Crystal-Nest/cobweb-mod-template","target","_blank"],["routerLink","/generator"],["fragment","minecraft-version","route","versioning","title","Minecraft Version"],["fragment","mod-version","route","versioning","title","Mod Version"],["fragment","depending","route","versioning","title","Depending"],["href","https://fabricmc.net/wiki/documentation:fabric_mod_json_spec#versionrange","target","_blank"],["href","https://maven.apache.org/enforcer/enforcer-rules/versionRanges.html","target","_blank"],["fragment","related-conventions","route","versioning","title","Related conventions"],[3,"data"],["fragment","final-notes","route","versioning","title","Final notes"],["href","https://docs.minecraftforge.net/en/latest/gettingstarted/versioning/","target","_blank"],["href","https://semver.org/#faq","target","_blank"],["href","https://discord.gg/BP6EdBfAmt","target","_blank"]],template:function(r,p){r&1&&(n(0,"cn-section",0),e(1,`
  `),n(2,"span",1),e(3,"A well-known standard for versioning is "),n(4,"a",2),e(5,"Semantic Versioning"),t(),e(6,". Building on this foundation, "),n(7,"strong"),e(8,"C"),t(),e(9,"rystal "),n(10,"strong"),e(11,"N"),t(),e(12,"est "),n(13,"strong"),e(14,"S"),t(),e(15,"emantic "),n(16,"strong"),e(17,"V"),t(),e(18,"ersioning (CNSV) aims to standardize versioning specifically for Minecraft mods."),t(),e(19,`
  `),n(20,"span"),e(21,"A CNSV-compliant version consists of two independent parts:"),t(),e(22,`
  `),n(23,"ul",1),e(24,`
    `),n(25,"li"),e(26,"The "),n(27,"strong"),e(28,"Minecraft Version"),t(),e(29,", indicating the supported Minecraft version."),t(),e(30,`
    `),n(31,"li"),e(32,"The "),n(33,"strong"),e(34,"Mod Version"),t(),e(35,", indicating the features and changes available."),t(),e(36,`
  `),t(),e(37,`
  `),n(38,"span",1),e(39,"The Minecraft Version comes first, followed by the Mod Version, separated by a hyphen, to help users easily identify the required version. For example, a valid version could be "),n(40,"code"),e(41,"1.20.4-1.0.0"),t(),e(42,"."),t(),e(43,`
  `),n(44,"span"),e(45,"When using our "),n(46,"a",3),e(47,"template"),t(),e(48," or "),n(49,"a",4),e(50,"mod generator"),t(),e(51,", the Minecraft Version and Mod Version are two separate properties. During the build process, these properties are combined to create a valid CNSV version."),t(),e(52,`
`),t(),e(53,`
`),n(54,"cn-section",5),e(55,`
  `),n(56,"span"),e(57,"The Minecraft Version is straightforward: it must match the supported Minecraft version."),t(),e(58,`
  `),n(59,"span"),e(60,"When updating your mod to support a new Minecraft version, unless you also make significant changes to your mod's features or API, you only need to update the Minecraft Version."),t(),e(61,`
`),t(),e(62,`
`),n(63,"cn-section",6),e(64,`
  `),n(65,"span"),e(66,"The Mod Version, adhering to the Semantic Versioning standard, consists of three non-negative numbers: Major, Minor, and Patch."),t(),e(67,`
  `),n(68,"span"),e(69,"When incrementing a number, all numbers to its right must be reset to 0."),t(),e(70,`
  `),n(71,"ul"),e(72,`
    `),n(73,"li"),e(74,"The Major version is incremented for breaking changes, affecting either end-users or API users."),t(),e(75,`
    `),n(76,"li"),e(77,"The Minor version is incremented for backward-compatible changes that introduce new features or deprecate existing ones."),t(),e(78,`
    `),n(79,"li"),e(80,"The Patch version is incremented for backward-compatible bug fixes."),t(),e(81,`
  `),t(),e(82,`
  `),n(83,"span"),e(84,"This system ensures that users and developers can easily determine the safety of updating your mod."),t(),e(85,`
  `),i(86,"br"),e(87,`
  `),n(88,"span",1),e(89,"Optionally, the Mod Version can be followed by a hyphen and an "),n(90,"em"),e(91,"alpha"),t(),e(92," or "),n(93,"em"),e(94,"beta"),t(),e(95," designation, such as "),n(96,"code"),e(97,"1.20.4-1.0.0-alpha"),t(),e(98,". These versions are called "),n(99,"em"),e(100,"pre-release"),t(),e(101," or "),n(102,"em"),e(103,"unstable"),t(),e(104,". When no additional designation is used, versions are called "),n(105,"em"),e(106,"release"),t(),e(107," or "),n(108,"em"),e(109,"stable"),t(),e(110,"."),t(),e(111,`
  `),n(112,"span"),e(113,"Unstable versions have different semantics for the Major, Minor, and Patch numbers:"),t(),e(114,`
  `),n(115,"ul"),e(116,`
    `),n(117,"li"),e(118,`
      Alpha
      `),n(119,"ul"),e(120,`
        `),n(121,"li"),e(122,"Highly unstable, frequently changing, and likely to break backward compatibility."),t(),e(123,`
        `),n(124,"li"),e(125,"Only the Patch number should be incremented, regardless of backward compatibility."),t(),e(126,`
        `),n(127,"li"),e(128,"The Minor number can be incremented for very significant changes, regardless of backward compatibility."),t(),e(129,`
        `),n(130,"li"),e(131,"The Major number must not change."),t(),e(132,`
      `),t(),e(133,`
    `),t(),e(134,`
    `),n(135,"li"),e(136,`
      Beta
      `),n(137,"ul"),e(138,`
        `),n(139,"li"),e(140,"Unstable but generally maintains backward compatibility."),t(),e(141,`
        `),n(142,"li"),e(143,"The Patch number should be incremented for backward-compatible bug fixes or for backward-compatible changes that introduce new features or deprecate existing ones."),t(),e(144,`
        `),n(145,"li"),e(146,"The Minor number should be incremented for breaking changes."),t(),e(147,`
        `),n(148,"li"),e(149,"The Major number must not change."),t(),e(150,`
      `),t(),e(151,`
    `),t(),e(152,`
  `),t(),e(153,`
  `),n(154,"span"),e(155,"When transitioning from an alpha to a beta, you only need to change the designation, unless there are breaking changes. When moving from an unstable to a stable version, simply remove the designation unless there are breaking changes. For example, "),n(156,"code"),e(157,"1.0.1-alpha"),t(),e(158," -> "),n(159,"code"),e(160,"1.0.2-alpha"),t(),e(161," -> "),n(162,"code"),e(163,"1.0.2-beta"),t(),e(164," -> "),n(165,"code"),e(166,"1.2.0-beta"),t(),e(167," -> "),n(168,"code"),e(169,"1.2.0"),t(),e(170,"."),t(),e(171,`
  `),i(172,"br"),e(173,`
  `),n(174,"span"),e(175,"An exception to the standard Minor and Patch semantics occurs when the Major version is "),n(176,"code"),e(177,"0"),t(),e(178,". In this case, you are indicating that the mod and its API are "),n(179,"strong"),e(180,"not ready for public use"),t(),e(181,", and backward compatibility is not guaranteed:"),t(),e(182,`
  `),n(183,"ul"),e(184,`
    `),n(185,"li"),e(186,"The standard semantics apply to Minor and Patch numbers, but substantial breaking changes should increment the Minor version rather than the Major."),t(),e(187,`
    `),n(188,"li"),e(189,"Alpha and beta designations are optional, but if you do use them, do not remove them until the Major version becomes "),n(190,"code"),e(191,"1"),t(),e(192,"."),t(),e(193,`
    `),n(194,"li"),e(195,"When the mod and its API become stable, increment the Major version to "),n(196,"code"),e(197,"1"),t(),e(198," and remove any alpha or beta designation."),t(),e(199,`
  `),t(),e(200,`
  `),i(201,"br"),e(202,`
  `),n(203,"span"),e(204,"If you need to update your mod for only a subset of supported Minecraft versions, such as fixing a bug in older versions, follow these guidelines:"),t(),e(205,`
  `),n(206,"ul"),e(207,`
    `),n(208,"li")(209,"strong"),e(210,"Increment the Mod Version for new releases only"),t(),e(211,": when releasing a new Mod Version for just a subset of your supported Minecraft versions, increment the Mod Version only for those releases, leaving the others unchanged."),t(),e(212,`
    `),n(213,"li")(214,"strong"),e(215,"Maintain consistency across versions"),t(),e(216,": if you later release a new version for a Minecraft version that didn't have its Mod Version increased, ensure you increment its Mod Version to match the highest current version, not the next sequential number. This maintains consistency with the changes introduced."),t(),e(217,`
  `),t(),e(218,`
  `),n(219,"span"),e(220,"For example, you might find and fix a bug in version "),n(221,"code"),e(222,"1.19.4"),t(),e(223,". Later, you find another bug affecting all versions and fix that too. Here's how your versions should be updated:"),t(),e(224,`
  `),n(225,"ul"),e(226,`
    `),n(227,"li"),e(228,`
      Initial versions:
      `),n(229,"ul"),e(230,`
        `),n(231,"li")(232,"code"),e(233,"1.20.4-1.0.0"),t()(),e(234,`
        `),n(235,"li")(236,"code"),e(237,"1.20.2-1.0.0"),t()(),e(238,`
        `),n(239,"li")(240,"code"),e(241,"1.19.4-1.0.0"),t()(),e(242,`
      `),t(),e(243,`
    `),t(),e(244,`
    `),n(245,"li"),e(246,`
      Bugfix for 1.19.4 only:
      `),n(247,"ul"),e(248,`
        `),n(249,"li")(250,"code"),e(251,"1.20.4-1.0.0"),t()(),e(252,`
        `),n(253,"li")(254,"code"),e(255,"1.20.2-1.0.0"),t()(),e(256,`
        `),n(257,"li")(258,"code"),e(259,"1.19.4-1.0.1"),t()(),e(260,`
      `),t(),e(261,`
    `),t(),e(262,`
    `),n(263,"li"),e(264,`
      Bugfix for all versions:
      `),n(265,"ul"),e(266,`
        `),n(267,"li")(268,"code"),e(269,"1.20.4-1.0.2"),t()(),e(270,`
        `),n(271,"li")(272,"code"),e(273,"1.20.2-1.0.2"),t()(),e(274,`
        `),n(275,"li")(276,"code"),e(277,"1.19.4-1.0.2"),t()(),e(278,`
      `),t(),e(279,`
    `),t(),e(280,`
  `),t(),e(281,`
  `),n(282,"span"),e(283,"In this example, "),n(284,"code"),e(285,"1.20.4"),t(),e(286," and "),n(287,"code"),e(288,"1.20.2"),t(),e(289," skipped Mod Version "),n(290,"code"),e(291,"1.0.1"),t(),e(292,". This ensures your Mod Version scheme remains consistent and aligned with the changes made."),t(),e(293,`
`),t(),e(294,`
`),n(295,"cn-section",7),e(296,`
  `),n(297,"span",1),e(298,"When depending on another mod that complies with CNSV, you only need to check the Mod Version, as the Minecraft Version is assumed to be the same (otherwise, the game wouldn't load)."),t(),e(299,`
  `),n(300,"span"),e(301,"Fabric and Forge/NeoForge use different conventions for specifying allowed versions when depending on another mod:"),t(),e(302,`
  `),n(303,"ul"),e(304,`
    `),n(305,"li")(306,"strong"),e(307,"Fabric"),t(),e(308,": Fabric uses its own "),n(309,"a",8),e(310,"version range specification"),t(),e(311,". For a CNSV-compliant mod, you can use "),n(312,"code"),e(313,"^mod_version"),t(),e(314,", ensuring compatibility with the specified version and up within the same major version."),t(),e(315,`
    `),n(316,"li")(317,"strong"),e(318,"Forge and NeoForge"),t(),e(319,": These platforms use the "),n(320,"a",9),e(321,"Maven Version Range"),t(),e(322,". For a CNSV-compliant mod, you can use "),n(323,"code"),e(324,"[mod_version,)"),t(),e(325,", ensuring compatibility with the specified version and up within the same major version."),t(),e(326,`
  `),t(),e(327,`
`),t(),e(328,`
`),n(329,"cn-section",10),e(330,`
  `),n(331,"span"),e(332,"The CNSV standard influences other naming conventions involving Minecraft and Mod versions:"),t(),e(333,`
  `),n(334,"ul"),e(335,`
    `),n(336,"li"),e(337,"To refer to the same Mod Version across any Minecraft Version, use the format "),n(338,"code"),e(339,"vMOD"),t(),e(340,", where "),n(341,"code"),e(342,"MOD"),t(),e(343," is the Mod Version."),i(344,"br"),e(345,"For example, "),n(346,"code"),e(347,"v1.0.0"),t(),e(348," refers to all mod builds with the same Mod Version, regardless of the Minecraft Version."),t(),e(349,`
    `),n(350,"li"),e(351,"For artifact ("),n(352,"code"),e(353,".jar"),t(),e(354," file) naming, use the format "),n(355,"code"),e(356,"ID-LOADER-MC-MOD"),t(),e(357,", where "),n(358,"code"),e(359,"ID"),t(),e(360," is the mod "),n(361,"code"),e(362,"ID"),t(),e(363," in kebab case, "),n(364,"code"),e(365,"LOADER"),t(),e(366," is the supported mod loader in lowercase, "),n(367,"code"),e(368,"MC"),t(),e(369," is the Minecraft Version, and "),n(370,"code"),e(371,"MOD"),t(),e(372," is the Mod Version."),i(373,"br"),e(374,"For example, "),n(375,"code"),e(376,"cobweb-fabric-1.20.4-1.0.0"),t(),e(377," is the artifact for the Cobweb "),n(378,"code"),e(379,"v1.0.0"),t(),e(380," build that supports Fabric and Minecraft 1.20.4."),t(),e(381,`
    `),n(382,"li"),e(383,"When publishing a mod release on GitHub, the release must include artifacts for all supported mod loaders and use the format "),n(384,"code"),e(385,"vMC-MOD"),t(),e(386," for both the tag and release name, where "),n(387,"code"),e(388,"MC"),t(),e(389," is the Minecraft Version and "),n(390,"code"),e(391,"MOD"),t(),e(392," is the Mod Version."),i(393,"br"),e(394,"For example, "),n(395,"code"),e(396,"v1.20.4-1.0.0"),t(),e(397," is the release for "),n(398,"code"),e(399,"v1.0.0"),t(),e(400," that supports Minecraft 1.20.4 and contains artifacts for every supported mod loader."),t(),e(401,`
    `),n(402,"li"),e(403,"When publishing an artifact to a modding platform such as Modrinth or CurseForge, use the format "),n(404,"code"),e(405,"[LOADER - MC] TITLE vMOD"),t(),e(406," for the display name, where "),n(407,"code"),e(408,"LOADER"),t(),e(409," is the supported mod loader in "),n(410,"strong"),e(411,"pascal case"),t(),e(412,", "),n(413,"code"),e(414,"TITLE"),t(),e(415," is the mod title, "),n(416,"code"),e(417,"MC"),t(),e(418," is the Minecraft Version, and "),n(419,"code"),e(420,"MOD"),t(),e(421," is the Mod Version."),i(422,"br"),e(423,"For example, "),n(424,"code"),e(425,"[Fabric - 1.20.4] Cobweb v1.0.0"),t(),e(426," is the display name for the artifact "),n(427,"code"),e(428,"cobweb-fabric-1.20.4-1.0.0"),t(),e(429,"."),t(),e(430,`
    `),n(431,"li"),e(432,"For Maven package naming, use the format "),n(433,"code"),e(434,"GROUP:ID-LOADER:MC-MOD"),t(),e(435,", where "),n(436,"code"),e(437,"GROUP"),t(),e(438," is the Java group, "),n(439,"code"),e(440,"ID"),t(),e(441," is the mod ID in kebab case, "),n(442,"code"),e(443,"LOADER"),t(),e(444," is the supported mod loader in lowercase, "),n(445,"code"),e(446,"MC"),t(),e(447," is the Minecraft Version, and "),n(448,"code"),e(449,"MOD"),t(),e(450," is the Mod Version."),i(451,"br"),e(452,"For example, "),n(453,"code"),e(454,"it.crystalnest:cobweb-fabric:1.20.4-1.0.0"),t(),e(455," is the Maven package for the Cobweb "),n(456,"code"),e(457,"v1.0.0"),t(),e(458," build that supports Fabric and Minecraft 1.20.4."),i(459,"br"),e(460,"In XML format, it would be:"),i(461,"markdown",11),t(),e(462,`
  `),t(),e(463,`
  `),n(464,"span"),e(465,"Our template and mod generator handle all these aspects automatically."),t(),e(466,`
`),t(),e(467,`
`),n(468,"cn-section",12),e(469,`
  `),n(470,"span",1),e(471,"Since we introduced the CNSV standard after we began development, only our most recent mod versions adhere to it. Previously, we followed a loose interpretation of "),n(472,"a",13),e(473,"Forge Semantic Versioning"),t(),e(474,"."),t(),e(475,`
  `),n(476,"span",1),e(477,"If you have any questions about the Mod Version, please refer to the "),n(478,"a",14),e(479,"Semantic Versioning FAQ"),t(),e(480,"."),t(),e(481,`
  `),n(482,"span"),e(483,"Still have questions? Come chat with us on "),n(484,"a",15),e(485,"Discord"),t(),e(486,"!"),t(),e(487,`
`),t(),e(488,`
`)),r&2&&(m(461),s("data",p.xmlMavenPackageSnippet))},dependencies:[c,x,h],styles:["[_nghost-%COMP%]{height:100%;flex:1;padding:1rem 2rem 2rem .75rem}"]});let o=a;return o})();export{b as VersioningComponent};
