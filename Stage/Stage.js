/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.speed = 6.5999999999999925;
    this.vars.clonecount = 2;
    this.vars.lane = [-100, -35, 35, 100];
    this.vars.laneempty = ["Yes", "No", "Yes", "No"];

    this.watchers.speed = new Watcher({
      label: "Speed",
      style: "normal",
      visible: true,
      value: () => this.vars.speed,
      x: 245,
      y: 175
    });
  }

  *whenGreenFlagClicked() {
    this.vars.lane = [];
    this.vars.lane.push(-100);
    this.vars.lane.push(-35);
    this.vars.lane.push(35);
    this.vars.lane.push(100);
    this.vars.laneempty = [];
    this.vars.laneempty.push("Yes");
    this.vars.laneempty.push("Yes");
    this.vars.laneempty.push("Yes");
    this.vars.laneempty.push("Yes");
  }
}
