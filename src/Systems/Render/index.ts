import World from "./World";
import System from "../../Engine/System";
import components, { Component } from "../../Engine/Components";

class RenderSystem extends System {
  onAdded() {
    this.state = {
      world: new World(this.props.canvas)
    };

    components.follow(["CHARACTER"], {
      onAdd: (component: Component) => {
        console.log(component);
        console.log(component.expand());
        this.state.world.addCharacter(component.expand());
      }
    });
  }
  onUpdate() {
    const { world } = this.state;
    world.update();
  }
}

const makeRenderSystemFromCanvas = (canvas: HTMLCanvasElement) => {
  const renderSystem = new RenderSystem("renderSystem", { canvas });
  return renderSystem;
};

export default makeRenderSystemFromCanvas;
