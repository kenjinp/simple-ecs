import { Component } from "../Engine/Components";

export type Vector3 = {
  x: number;
  y: number;
  z: number;
};

export class Transform extends Component {
  data: {
    position: Vector3;
    rotation: Vector3;
    scale: number;
  };
  constructor(props?: { position: Vector3; rotation: Vector3; scale: number }) {
    const DEFAULT_TRANSFORM = {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1
    };
    super("TRANSFORM", props || DEFAULT_TRANSFORM);
  }
}

export class Character extends Component {
  data: { key: string; transform: Transform };
  constructor({ key }: { key: string }) {
    const transform = new Transform();
    const data = {
      key,
      transform: {
        "@type": transform.type,
        "@id": transform.uuid
      }
    };
    super("CHARACTER", data);
  }
}

export class Die extends Component {
  data: {
    diceType: string;
    transform: Transform;
  };
  constructor({ diceType }: { diceType: string }) {
    const transform = new Transform();
    const data = {
      diceType,
      transform: {
        "@type": transform.type,
        "@id": transform.uuid
      }
    };
    super("DIE", data);
  }
}
