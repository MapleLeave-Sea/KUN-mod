"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModCustomTp = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  TeleportController_1 = require("../../Module/Teleport/TeleportController"),
  ModTpFile = require("./ModTpFile").ModTpFile;
var CurrFile = "None";
var PrevFile = "None";
var NextFile = "None";
var PrevPos = "None";
var CurrPos = "None";
var NextPos = "None";
var TotalNum = 0;
var CurreNum = -1;
var TotalFileNum = 0;
var CurreFileNum = 0;

class ModCustomTp {
  static ShowCtpState() {
    this.GetTpInfo();
    var state = ModManager_1.ModManager.Settings.CustomTp;
    var title =
      "CustomTp State [Insert]:" +
      (state ? "ON" : "OFF") +
      "Shows[Delete]"+
      " (" +
      (CurreNum + 1).toString() +
      "/" +
      (TotalNum + 1).toString() +
      ")" +
      CurrPos;

    var readme =
      "CurrentFile:" +
      CurrFile +
      "| PreviousFile[PageUp]: " +
      PrevFile +
      "| NextFile[PageDown]: " +
      NextFile +
      " | PreviousPos[Up]: " +
      PrevPos +
      " | NextPos[Down]: " +
      NextPos;
    ModManager_1.ModManager.ShowConfirmBox(title, readme, 50);
  }
  static CustomTpEnable() {
    this.GetTpInfoFirst();
    this.ShowCtpState();
  }
  static CustomTpDisable() {
    CurrFile = "None";
    PrevFile = "None";
    NextFile = "None";
    PrevPos = "None";
    CurrPos = "None";
    NextPos = "None";
    TotalNum = 0;
    CurreNum = -1;
    TotalFileNum = 0;
    CurreFileNum = 0;
  }

  static GetTpInfo() {
    TotalNum = ModTpFile.CustomTpList[CurreFileNum].length - 1;
    TotalFileNum = ModTpFile.CustomTpList.length - 1;
    CurrFile = ModTpFile.CustomTpList[CurreFileNum][0].filename;
    try {
      PrevFile = ModTpFile.CustomTpList[CurreFileNum - 1][0].filename;
    } catch (error) {
      PrevFile = "None";
    }

    try {
      NextFile = ModTpFile.CustomTpList[CurreFileNum + 1][0].filename;
    } catch (error) {
      NextFile = "None";
    }
    try {
      CurrPos = this.GetPosInfo(CurreFileNum, CurreNum);
    } catch {
      CurrPos = "None";
    }

    try {
      PrevPos = this.GetPosInfo(CurreFileNum, CurreNum - 1);
    } catch (error) {
      PrevPos = "None";
    }

    try {
      NextPos = this.GetPosInfo(CurreFileNum, CurreNum + 1);
    } catch (error) {
      NextPos = "None";
    }
  }

  static GetTpInfoFirst() {
    CurrFile = "None";
    PrevFile = "None";
    NextFile = "None";
    PrevPos = "None";
    CurrPos = "None";
    NextPos = "None";
    TotalNum = 0;
    CurreNum = -1;
    TotalFileNum = 0;
    CurreFileNum = 0;
    this.GetTpInfo();
  }

  static GetPosInfo(num1, num2) {
    var x = ModTpFile.CustomTpList[num1][num2].x;
    var y = ModTpFile.CustomTpList[num1][num2].y;
    var z = ModTpFile.CustomTpList[num1][num2].z;
    var PosInfo =
      "(" +
      Math.floor(x / 100).toString() +
      "," +
      Math.floor(y / 100).toString() +
      "," +
      Math.floor(z / 100).toString() +
      ")";
    return PosInfo;
  }

  static AddFile() {
    if (CurreFileNum < TotalFileNum) {
      CurreFileNum = CurreFileNum + 1;
      CurreNum = 0;
    } else ModManager_1.ModManager.ShowTip("is the last file");
  }
  static SubFile() {
    if (CurreFileNum != 0) {
      CurreFileNum = CurreFileNum - 1;
      CurreNum = 0;
    } else ModManager_1.ModManager.ShowTip("is the first file");
  }
  static AddPos() {
    if (CurreNum < TotalNum) {
      CurreNum++;
    } else ModManager_1.ModManager.ShowTip("is the last pos");
  }
  static SubPos() {
    if (CurreNum > 0) {
      CurreNum--;
    } else ModManager_1.ModManager.ShowTip("is the first pos");
  }

  static GoTp() {
    var x = ModTpFile.CustomTpList[CurreFileNum][CurreNum].x;
    var y = ModTpFile.CustomTpList[CurreFileNum][CurreNum].y;
    var z = ModTpFile.CustomTpList[CurreFileNum][CurreNum].z;
    var tips = this.GetPosInfo(CurreFileNum,CurreNum)
    ModManager_1.ModManager.ShowTip("go to"+ModTpFile.CustomTpList[CurreFileNum][CurreNum].name+tips);
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(
      new UE.Vector(x, y, z),
      new UE.Rotator(0, 0, 0),
      "comment/message"
    );
  }
}
exports.ModCustomTp = ModCustomTp;
