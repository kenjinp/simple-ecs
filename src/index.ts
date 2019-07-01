import GameEngine from "./Engine";
import makeRenderSystemFromCanvas from "./Systems/Render";
import ControlSystem from "./Systems/Controls";
import PhysicsSystem from "./Systems/Physics";
import BattleSystem from "./Systems/Battle";

document.getElementById("app").innerHTML = `
<div class="container"><h1 class="neon">Dice<br/>Magic</h1></div>
<div class="game-container"><canvas id="world">

</canvas></div>
`;

const world = document.getElementById("world");

const engine = new GameEngine();

const gameLoop = () => {
  engine.tick();
  requestAnimationFrame(gameLoop);
};

const renderSystem = makeRenderSystemFromCanvas(world as HTMLCanvasElement);

engine.addSystem(renderSystem);
engine.addSystem(new PhysicsSystem("physicsSystem"));
engine.addSystem(new ControlSystem("controlSystem"));
engine.addSystem(new BattleSystem("battleSystem"));

gameLoop();

engine.start();
