/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite3 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite3/costumes/costume1.svg", {
        x: 260.5,
        y: 198
      }),
      new Costume("costume2", "./Sprite3/costumes/costume2.svg", {
        x: 17.400000000000006,
        y: 29.489999389648432
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite3/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 360);
    while (true) {
      this.y += 0 - this.toNumber(this.stage.vars.speed);
      if (this.compare(this.y, -360) < 0) {
        this.goto(0, 360);
      }
      yield;
    }
  }
}
