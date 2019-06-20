import PhysicsWorld from "./World";
import System from "../../Engine/System";

class PhysicsSystem extends System {
  onAdded() {
    this.state = {
      physicsWorld: new PhysicsWorld()
    };
  }
  onUpdate(delta) {
    const { physicsWorld } = this.state;
    physicsWorld.update(delta);
  }
}

export default PhysicsSystem;
