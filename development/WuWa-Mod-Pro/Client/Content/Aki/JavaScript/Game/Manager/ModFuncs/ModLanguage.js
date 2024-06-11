"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModLanguage = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
var CurrLang = "en";
class ModLanguage {
  // new (exports.LanguageDefine = LanguageDefine)(0, "zh-Hans", "zh"),
  // new LanguageDefine(1, "en", "en"),
  // new LanguageDefine(2, "ja", "ja"),
  // new LanguageDefine(3, "ko", "ko"),
  // new LanguageDefine(4, "ru", "en"),
  // new LanguageDefine(5, "zh-Hant", "zh"),
  // new LanguageDefine(6, "de", "en"),
  // new LanguageDefine(7, "es", "en"),
  // new LanguageDefine(8, "pt", "en"),
  // new LanguageDefine(9, "id", "en"),
  // new LanguageDefine(10, "fr", "en"),
  // new LanguageDefine(11, "vi", "en"),
  // new LanguageDefine(12, "th", "en"),
  static GetCurrLang() {
    CurrLang = LanguageSystem_1.LanguageSystem.PackageLanguage;
    return CurrLang;
  }
  static Langs = ["en", "zh-Hans", "ja"];

  static translate = [
    {
      en: "HitMultiplier[F6]",
      chs: "多倍攻击[F6]",
      ja: "ヒット倍率[F6]",
    },
    {
      en: "GodMode[F5]",
      chs: "无敌模式[F5]",
      ja:"神モードやで[F5]",
    },
    {
      en: "AutoPickTreasure[F7]",
      chs: "拾取宝箱[F7]",
      ja: "自動で宝を拾うんや[F7]",
    },
    {
      en: "AutoAbsorb[F8]",
      chs: "自动吸收[F8]",
      ja:"自動で吸収すんや",
    },
    {
      en: "killAura[F9]",
      chs: "杀戮光环[F9]",
      ja:"キルオーラやで[F9]",
    },
    {
      en: "PerceptionRange[F10]",
      chs: "感知范围[F10]",
      ja: "感知範囲やで[F10]",
    },
    {
      en: "NoCD[F11]",
      chs: "无冷却[F11]",
      ja: "クールダウンなしやで[F11]",
    },
    {
      en: "PlayerSpeed[F12]",
      chs: "玩家速度[F12]",
      ja: "プレイヤーのスピードやで[F12]",
    },
    {
      en: "CustomTp[Ins]",
      chs: "自定义传送[Ins]",
      ja: "てきとうな瞬間移動[Ins]",
    },
    {
      en: "AutoLoot[Num0]",
      chs: "自动拾取[Num0]",
      ja: "自動あっぷる[Num0]",
    },
    {
      en: "KunMods State[Home] DisableAntiCheat : ON ",
      chs: "坤模组状态[Home] 安全保护 : 开启 ",
      ja: "くんモード[Home] チート防止おらん  : オン",
    },
    {
      en: " : ON |",
      chs: " : 开启 |",
      ja: "オン",
    },
    {
      en: " : OFF |",
      chs: " : 关闭 |",
      ja: "オフ",
    },
    {
      en: "ON",
      chs: "开启",
      ja: "オン",
    },
    {
      en: "OFF",
      chs: "关闭",
      ja: "オフ",
    },
    {
      en: "GodMode",
      chs: "无敌模式",
      ja: "神モードやで",
    },
    {
      en: "HitMultiplier",
      chs: "多倍攻击",
      ja: "ヒット倍率",
    },
    {
      en: "AutoPickTreasure",
      chs: "拾取宝箱",
      ja: "自動で宝を拾うんや",
    },
    {
      en: "AutoAbsorb",
      chs: "自动吸收",
      ja: "自動で吸収すんや",
    },
    {
      en: "killAura",
      chs: "杀戮光环",
      ja: "キルオーラやで",
    },
    {
      en: "PerceptionRange",
      chs: "感知范围",
      ja: "感知範囲やで",
    },
    {
      en: "NoCD",
      chs: "无冷却",
      ja: "クールダウンなしやで",
    },
    {
      en: "PlayerSpeed",
      chs: "玩家速度",
      ja: "プレイヤーのスピードやで",
    },
    {
      en: "CustomTp",
      chs: "自定义传送",
      ja: "てきとうな瞬間移動",
    },
    {
      en: "AutoLoot",
      chs: "自动拾取:",
      ja: "自動あっぷる",
    },
    {
      en: "CustomTp State [Insert]:",
      chs: "自定义传送状态[Insert]:",
      ja: "カスタムテレポートの状態[Insert]",
    },
    {
      en: "Shows[Delete]",
      chs: "显示[Delete]",
      ja: "ショー[Delete]",
    },
    {
      en: "CurrentFile:",
      chs: "当前文件:",
      ja: "今のファイル",
    },
    {
      en: "| PreviousFile[PageUp]: ",
      chs: "| 上一个文件[PageUp]:",
      ja: "| 前のファイル[PageUp]",
    },
    {
      en: " | NextFile[PageDown]: ",
      chs: " | 下一个文件[PageDown]:",
      ja: " | つぎのファイル[PageDown]",
    },
    {
      en: " | PreviousPos[Up]: ",
      chs: " | 上一个位置[Up]:",
      ja: " |前のポジション[Up]",
    },
    {
      en: " | NextPos[Down]: ",
      chs: " | 下一个位置[Down]:",
      ja: " |つぎのポジション[Down]",
    },
    {
      en: "AntiDither[Num1]",
      chs: "反虚化[Num1]",
      ja: "アンチディザ[Num1]",
    },
    {
      en: "AntiDither",
      chs: "反虚化",
      ja: "アンチディザ",
    },
    {
      en: "Please enter hit count",
      chs: "请输入攻击次数",
      ja: "ヒット数入れてや",
    },
    {
      en: "HitMultiplier:Please enter hit count",
      chs: "倍数攻击：请输入攻击次数",
      ja: "ヒットの倍率や：ヒット数入れてや",
    }
  ];

  static ModTr = (string) => {
    var lang = CurrLang;
    for (let i = 0; i < ModLanguage.translate.length; i++) {
      if (lang === "en" && ModLanguage.translate[i].en === string) {
        return ModLanguage.translate[i].en;
      } else if (lang === "zh-Hans" && ModLanguage.translate[i].en === string) {
        return ModLanguage.translate[i].chs;
      } else if (lang === "ja" && ModLanguage.translate[i].en === string) {
        return ModLanguage.translate[i].ja;
      }
    }
    return string; // return original string if no translation found
  };

}

exports.ModLanguage = ModLanguage;
