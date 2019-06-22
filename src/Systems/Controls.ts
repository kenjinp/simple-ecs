import System from "../Engine/System";
import { Die } from "../Components/Character";
import components from "../Engine/Components";
import { diceTypeList } from "../Systems/Render/Dice/types";

class ControlSystem extends System {
  onAdded() {
    document.onkeypress = (event: KeyboardEvent) => {
      const diceType =
        diceTypeList[Math.floor(Math.random() * diceTypeList.length)];
      components.add(new Die({ diceType }));
    };
  }
  onRemove() {}
}

export default ControlSystem;
