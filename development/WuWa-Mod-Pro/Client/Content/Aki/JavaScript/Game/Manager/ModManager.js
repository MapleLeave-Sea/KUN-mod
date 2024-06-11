"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModManager = void 0);
const puerts_1 = require("puerts"), //一个格子跳到game下
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  InputSettings_1 = require("../InputSettings/InputSettings"),
  InputController_1 = require("../Input/InputController"),
  TeleportController_1 = require("../Module/Teleport/TeleportController"), //传送
  CreatureController_1 = require("../World/Controller/CreatureController"), //add
  ConfirmBoxController_1 = require("../Module/ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../Module/ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../Module/ScrollingTips/ScrollingTipsController"),
  MapController_1 = require("../Module/Map/Controller/MapController"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterController_1 = require("..//NewWorld/Character/CharacterController"),
  UidView_1 = require("../Module/UidShow/UidView"),
  LguiUtil_1 = require("../Module/Util/LguiUtil"),
  UiManager_1 = require("../../Ui/UiManager"),
  WeatherController_1 = require("../Module/Weather/WeatherController"),
  WorldDebugModel_1 = require("../World/Model/WorldDebugModel"), //
  ModCustomTp_1 = require("./ModFuncs/ModCustomTp"),
  ModUtils_1 = require("./ModFuncs/ModUtils"),
  ModDebuger_1 =require("./ModFuncs/ModDebuger");
  
  const ModLanguage_1 = require("./ModFuncs/ModLanguage");
  const ModTr = ModLanguage_1.ModLanguage.ModTr;
class ModManager {
  //functions  // download link： https://github.com/Gktwo/wuwa-mod
  static Settings = {
    ModEnabled:true,
    GodMode: true,
    HitMultiplier: false,
    Hitcount:15,
    AutoPickTreasure: false,
    AntiDither: true,
    AutoAbsorb: false,
    NoCD: false,
    InfiniteStamina: false,
    killAura: false,
    PerceptionRange: false,
    Weather: false,
    WeatherType: 1,
    MarkTp: false,
    CustomTp: false,
    playerSpeedValue: 3,
    PlayerSpeed: false,
    ShowMenu: false,
    AutoLoot:false,

    Uid: " | Github:https://github.com/Gktwo/wuwa-mod | Discord:https://discord.gg/QYu59wctHT",
  };

  static ModStart() {
    ModDebuger_1.ModDebuger.TestMethod();
    ModLanguage_1.ModLanguage.GetCurrLang();
    this.AddKey("ShowMenu", "Home");
    this.AddToggle("GodMode", "F5");
    this.AddToggle("HitMultiplier", "F6");
    this.AddToggle("AutoPickTreasure", "F7");
    this.AddToggle("AutoAbsorb", "F8");
    this.AddToggle("killAura", "F9");
    this.AddToggle("PerceptionRange", "F10");
    this.AddToggle("NoCD", "F11");
    this.AddToggle("PlayerSpeed", "F12");
    this.AddToggle("CustomTp", "Insert");
    this.AddToggle("AutoLoot", "NumPadZero");
    this.AddToggle("AntiDither", "NumPadOne");

    //this.AddKey("DebugFunc", "NumPadSeven");
    //this.AddKey("MarkTp","t");//done
    //  this.AddToggle("Weather","Numpad6");//done
    // this.AddToggle("AntiDither","f8");//done
    // this.AddToggle("InfiniteStamina","f10");
    //this.AddToggle("MarkTp","t");
  }
  
  static listenModsToggle() {

    // if (this.listenKey("DebugFunc", "NumPadSeven")) {
    //   ModDebuger_1.ModDebuger.playerdebug();
    // }

    if (this.listenKey("ShowMenu", "Home")) {
      this.ShowMenu();
    }

    this.listenMod('GodMode', "F5", "GodMode");
    if(this.listenMod('HitMultiplier', "F6", "HitMultiplier")){
      if(this.Settings.HitMultiplier){
        ModUtils_1.ModUtils.KuroSingleInputBox({
          title: ModTr("HitMultiplier:Please enter hit count"),
          customFunc: async (string) => { 
            var count = ModUtils_1.ModUtils.StringToInt(string);
            if(count!=="error")
              {
                this.Settings.Hitcount = count
              }         
           },
          inputText: this.Settings.Hitcount.toString(),
          defaultText: ModTr("Please enter hit count"),
          isCheckNone: true,
          needFunctionButton: false
        });

      }

    }
    this.listenMod('AutoPickTreasure', "F7", "AutoPickTreasure");
    this.listenMod('AutoAbsorb', "F8", "AutoAbsorb");
    this.listenMod('killAura', "F9", "killAura");
    this.listenMod('PerceptionRange', "F10", "PerceptionRange");
    this.listenMod('NoCD', "F11", "NoCD");

    if (this.listenMod('PlayerSpeed', "F12","PlayerSpeed")) {
      if (this.Settings.PlayerSpeed) {
        this.SetPlayerSpeed(3);
      } else {
        this.SetPlayerSpeed(1);
      }
    }
    if (this.listenMod('CustomTp', "Insert","CustomTp")) {
      if (this.Settings.CustomTp) {
        this.AddKey("PreviousFile", "PageUp");
        this.AddKey("NextFile", "PageDown");
        this.AddKey("PreviousPos", "Up");
        this.AddKey("NextPos", "Down");
        this.AddKey("ShowTpState", "Delete");
        ModCustomTp_1.ModCustomTp.CustomTpEnable();
      } else {
        this.RemoveKey("PreviousFile", "PageUp");
        this.RemoveKey("NextFile", "PageDown");
        this.RemoveKey("Previous", "Up");
        this.RemoveKey("Next", "Down");
        this.RemoveKey("ShowTpState", "Delete");
        ModCustomTp_1.ModCustomTp.CustomTpDisable();
      }
    }
    if(this.Settings.CustomTp)
      {
        if (this.listenKey("ShowTpState", "Delete")) {
          ModCustomTp_1.ModCustomTp.ShowCtpState();
        }
        if (this.listenKey("PreviousFile", "PageUp")) {
          ModCustomTp_1.ModCustomTp.SubFile();          
          
        }
        if (this.listenKey("NextFile", "PageDown")) {
          ModCustomTp_1.ModCustomTp.AddFile();
          
        }
        if (this.listenKey("PreviousPos", "Up")) {
          ModCustomTp_1.ModCustomTp.SubPos();
          ModCustomTp_1.ModCustomTp.GoTp();
        }
        if (this.listenKey("NextPos", "Down")) {
          ModCustomTp_1.ModCustomTp.AddPos();
          ModCustomTp_1.ModCustomTp.GoTp();
        }
      }
      this.listenMod('AutoLoot', "NumPadZero","AutoLoot");
      this.listenMod('AntiDither', "NumPadOne","AntiDither");
      ModDebuger_1.ModDebuger.EnableDebug();
      if(ModDebuger_1.ModDebuger.Setting.EnableDebug){      
        ModDebuger_1.ModDebuger.ListenDebug();
      }

  }

  static AddToggle(desc, key) {
    InputSettings_1.InputSettings.AddActionMapping(desc, key);
  }
  static RemoveToggle(desc, key) {
    InputSettings_1.InputSettings.RemoveActionMapping(desc, key);
  }
  static AddKey(desc, key) {
    InputSettings_1.InputSettings.AddActionMapping(desc, key);
  }
  static RemoveKey(desc, key) {
    InputSettings_1.InputSettings.RemoveActionMapping(desc, key);
  }
  static ShowFuncStateTip(func,string){
    string=ModTr(string);
    var info = "Unknown";
    if (this.Settings.hasOwnProperty(func)) 
         var state=this.Settings[func];
    if(state){
       info = string +" | "+ModTr("ON");
      this.ShowTip(info);
    }    
    else{
       info = string +" | "+ModTr("OFF");
      this.ShowTip(info);
    }


  }

  static Toggle(func) {
    if (this.Settings.hasOwnProperty(func)) {
      this.Settings[func] = !this.Settings[func];
    }
  }

  static listenMod(func, key,funcname) {
    if (InputController_1.InputController.IsMyKeyUp(key)) {
      if (this.Settings.hasOwnProperty(func)) {
        this.Settings[func] = !this.Settings[func];
        this.ShowFuncStateTip(func,funcname)
      }
      return true;
    }
    return false;
  }
  static listenKey(desc, key) {

    return InputController_1.InputController.IsMyKeyUp(key);
  }

  static TPtest() {
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(
      new UE.Vector(0, 0, 0),
      new UE.Rotator(0, 0, 0),
      "comment/message"
    );
  }
  static TpNoloadingTo(x, y, z) {
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(
      new UE.Vector(x, y, z),
      new UE.Rotator(0, 0, 0),
      "comment/message"
    );
  }

  static TpNoloadingTo2(tppos) {
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(
      tppos,
      new UE.Rotator(0, 0, 0),
      "comment/message"
    );
  }

  static MonsterBoom(entity, Delay) {
    CreatureController_1.CreatureController.MonsterBoomRequest(entity, Delay);
  }

  static ChangWeather(weatherID) {
    WeatherController_1.WeatherController.TestChangeWeather(weatherID);
    //1.sunny 2.Cloudy 3.ThunderRain 4.Snow 5.rain
  }

  // static SetUidView(string){
  //   //UidView_1.UidView.setlo
  //   LguiUtil_1.LguiUtil.SetLocalText(
  //     this.GetText(0),
  //     "FriendMyUid",
  //     string
  //   );

  // }

  static ShowConfirmBox(title, string, id) {
    //封号那个窗口
    var newBox = new ConfirmBoxDefine_1.ConfirmBoxDataNew(id);
    newBox.SetTextArgs(string);
    newBox.SetTitle(title);
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(newBox);
  }

  static ShowTip(string) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(string);
  }
  //MENU
  // static getSettingName(value) {
  //     let keys = Object.keys(this.Settings);
  //     for(let i = 0; i < keys.length; i++) {
  //         if(this.Settings[keys[i]] === value) {
  //             return keys[i];
  //         }
  //     }
  //     return null;
  // }

  static FuncState(func, string) {
    if (func) return string + ModTr(" : ON |");
    else return string + ModTr(" : OFF |");
  }
  static ShowMenu() {
    //类似封号那个窗口
    var newBox = new ConfirmBoxDefine_1.ConfirmBoxDataNew(50);
    var state =
      this.FuncState(this.Settings.GodMode, ModTr("GodMode[F5]")) +
      this.FuncState(this.Settings.HitMultiplier, ModTr("HitMultiplier[F6]")) +
      this.FuncState(this.Settings.AutoPickTreasure, ModTr("AutoPickTreasure[F7]")) +
      this.FuncState(this.Settings.AutoAbsorb, ModTr("AutoAbsorb[F8]")) +
      this.FuncState(this.Settings.killAura, ModTr("killAura[F9]")) +
      this.FuncState(this.Settings.PerceptionRange, ModTr("PerceptionRange[F10]")) +
      this.FuncState(this.Settings.NoCD, ModTr("NoCD[F11]")) +
      this.FuncState(this.Settings.PlayerSpeed, ModTr("PlayerSpeed[F12]")) +
      //this.FuncState(this.Settings.MarkTp,"MarkTp")+
      this.FuncState(this.Settings.CustomTp, ModTr("CustomTp[Ins]"))+
      this.FuncState(this.Settings.AutoLoot, ModTr("AutoLoot[Num0]"))+
      this.FuncState(this.Settings.AntiDither,ModTr("AntiDither[Num1]"))
    //this.FuncState(this.Settings.InfiniteStamina,"InfiniteStamina")

    newBox.SetTextArgs(state);
    newBox.SetTitle(ModTr("KunMods State[Home] DisableAntiCheat : ON "));
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(newBox);
  }
  static MarkTp() {
    var r = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
    var i = ModelManager_1.ModelManager.MapModel.GetMark(r[0], r[1]);
    var targetX = i.TrackTarget.X;
    var targetY = i.TrackTarget.Y;
    var v = MapController_1.MapController.GetMarkPosition(targetX, targetY);
    if (v.Z == 0) v.Z = 300;
    if (v.X == 0 && v.Y == 0) return;
    this.TpNoloadingTo(v.X * 100, v.Y * 100, v.Z * 100);
  }
  static GetEntityList() {
    return ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
  }
  //example
  // static SetTimeDilation(t) {
  //   var e = ModelManager_1.ModelManager.CreatureModel;
  //   for (const r of e.GetAllEntities()) r.IsInit && r.Entity.SetTimeDilation(t);
  //   for (const a of e.DelayRemoveContainer.GetAllEntities())
  //     a.IsInit && a.Entity.SetTimeDilation(t);
  // }
  static SpawnEntity() {}

  static SetPlayerSpeed(value) {
    CharacterController_1.CharacterController.SetTimeDilation(value);
  }
  //自定义传送
}
exports.ModManager = ModManager;
