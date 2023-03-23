/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Other extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Other/costumes/costume1.svg", {
        x: 17.33333499999992,
        y: 26.81665564941403
      })
    ];

    this.sounds = [new Sound("pop", "./Other/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.vars.carspeed = 0;
    this.vars.lane = 0;
  }

  *whenGreenFlagClicked() {
    this.stage.vars.clonecount = 0;
    this.visible = false;
    while (true) {
      yield* this.wait(this.random(1, 2));
      if (
        this.compare(this.stage.vars.speed, 0) > 0 &&
        this.compare(this.stage.vars.clonecount, 4) < 0
      ) {
        this.createClone();
      }
      yield;
    }
  }

  *startAsClone() {
    this.stage.vars.clonecount++;
    this.vars.carspeed = this.random(5, 22);
    this.vars.lane = this.random(1, 4);
    while (
      !(
        this.toString(
          this.itemOf(this.stage.vars.laneempty, this.vars.lane - 1)
        ) === "Yes"
      )
    ) {
      this.vars.lane = this.random(1, 4);
      yield;
    }
    this.stage.vars.laneempty.splice(this.vars.lane - 1, 1, "No");
    this.x = this.toNumber(
      this.itemOf(this.stage.vars.lane, this.vars.lane - 1)
    );
    if (this.compare(this.vars.carspeed, this.stage.vars.speed) > 0) {
      this.y = -200;
    } else {
      this.y = 200;
    }
    this.visible = true;
    this.effects.color += this.random(50, 90);
    while (true) {
      this.y +=
        this.toNumber(this.vars.carspeed) -
        this.toNumber(this.stage.vars.speed);
      if (this.compare(this.y, -190) < 0 || this.compare(this.y, 196) > 0) {
        this.stage.vars.laneempty.splice(this.vars.lane - 1, 1, "Yes");
        this.stage.vars.clonecount--;
        this.deleteThisClone();
      }
      yield;
    }
  }
}
