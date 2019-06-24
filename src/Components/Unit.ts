import { Component } from "../Engine/Components";

export class Action extends Component {
  constructor(data) {
    super("ACTION", data);
  }
}

// Maybe each of these should be individual components?
export class Unit extends Component {
  data: {
    attack: number;
    power: number;
    morale: number;
    defense: number;
    toughness: number;
    size: number; // dice notation
    name: string;
    ancestry: string; // like dawrf
    experience: string; // like "Seasoned"
    equipment: string; // "medium",
    type: string; // "Infantry"
    actions: Action[];
  };
  constructor(data) {
    super("UNIT", data);
  }
}

export class IronheartDefenders extends Unit {
  constructor() {
    const data = {
      attack: 4,
      power: 2,
      morale: 4,
      defense: 13,
      toughness: 13,
      size: "1d6",
      name: "Ironheart Defenders",
      ancestry: "Dwarf",
      experience: "Seasoned",
      equipment: "Medium",
      type: "Infantry",
      actions: [new Action({ name: "Attack" })]
    };
    super(data);
  }
}
