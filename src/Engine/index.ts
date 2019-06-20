import System from "./System";

class GameEngine {
  private systems: System[] = [];
  private isRunning: boolean = false;

  public latestTick: number = 0;

  addSystem(system: System) {
    this.systems.push(system);
    system.onAdded && system.onAdded();
  }

  removeSytem(name: string) {
    const systemToRemove = this.systems.find(system => system.name === name);
    if (systemToRemove) {
      this.systems = this.systems.filter(
        systems => name !== systemToRemove.name
      );
      systemToRemove.onRemove && systemToRemove.onRemove();
      return;
    }
    console.warn(`No system found with name: ${name}`);
  }

  tick() {
    if (this.isRunning) {
      this.latestTick = Date.now() - this.latestTick;
      this.systems.forEach(
        system => system.onUpdate && system.onUpdate(this.latestTick)
      );
    }
  }

  start() {
    this.isRunning = true;
    this.latestTick = 0;
    this.tick();
  }

  stop() {
    this.isRunning = false;
  }
}

export default GameEngine;
