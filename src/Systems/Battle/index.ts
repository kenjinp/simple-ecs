import System from "../../Engine/System";

class BattleSystem extends System {
  onAdded() {
    document.addEventListener("keypress", (event: KeyboardEvent) => {
      console.log("battle", { event });
    });
  }
}

export default BattleSystem;
