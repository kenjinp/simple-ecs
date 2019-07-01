import World from "./World";
import System from "../../Engine/System";
import components, { Component } from "../../Engine/Components";

class RenderSystem extends System {
  onAdded() {
    this.state = {
      world: new World(this.props.canvas)
    };

    components.follow(["DIE"], {
      onAdd: (component: Component) => {
        this.state.world.addDie(component.expand());
      },
      onDelete: (component: Component) => {
        this.state.world.removeDie(component.expand());
      }
    });
  }
  onUpdate(delta: number) {
    const { world } = this.state;
    world.update(delta);
  }
}

const makeRenderSystemFromCanvas = (canvas: HTMLCanvasElement) => {
  const renderSystem = new RenderSystem("renderSystem", { canvas });
  return renderSystem;
};

export default makeRenderSystemFromCanvas;
