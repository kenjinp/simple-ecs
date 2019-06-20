import System from "../Engine/System";
import { Character } from "../Components/Character";
import components from "../Engine/Components";

class ControlSystem extends System {
  onAdded() {
    document.onkeypress = (event: KeyboardEvent) => {
      const { key } = event;
      if (key !== " ") {
        components.add(new Character({ key }));
      }
    };
  }
  onRemove() {}
}

export default ControlSystem;
