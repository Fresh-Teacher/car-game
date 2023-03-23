/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Player/costumes/costume1.svg", {
        x: 17.33333499999992,
        y: 26.816665649414034
      })
    ];

    this.sounds = [new Sound("pop", "./Player/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.speed = 0;
    this.goto(-35, 0);
    while (true) {
      if (this.keyPressed("up arrow")) {
        this.stage.vars.speed += 0.1;
      } else {
        this.stage.vars.speed -= 0.1;
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.compare(this.stage.vars.speed, 20) > 0) {
        this.stage.vars.speed = 20;
      }
      if (this.compare(this.stage.vars.speed, 0) < 0) {
        this.stage.vars.speed = 0;
      }
      if (this.keyPressed("right arrow")) {
        if (this.compare(this.x, 103) < 0) {
          this.x += 6;
        }
      }
      if (this.keyPressed("left arrow")) {
        if (this.compare(this.x, -105) > 0) {
          this.x -= 6;
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    while (true) {
      if (this.touching(this.sprites["Other"].andClones())) {
        this.broadcast("End Game");
        /* TODO: Implement stop all */ null;
      }
      yield;
    }
  }
}
