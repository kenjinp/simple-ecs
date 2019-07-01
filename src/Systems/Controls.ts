import System from "../Engine/System";
import { Die } from "../Components/Character";
import components from "../Engine/Components";
import { diceTypeList } from "../Systems/Render/Dice/types";

class ControlSystem extends System {
  onAdded() {
    document.addEventListener("keypress", (event: KeyboardEvent) => {
      const diceType =
        diceTypeList[Math.floor(Math.random() * diceTypeList.length)];
      const die = new Die({ diceType });
      console.log("kkeyyyyy", die);
      components.add(die);
      setTimeout(() => {
        components.remove(die);
      }, 3000);
    });
  }
  onRemove() {}
}

export default ControlSystem;
