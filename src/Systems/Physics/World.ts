import CANNON from "cannon";

export interface Transform {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

class PhysicsWorld {
  public world: CANNON.World;
  private fixedTimeStep: number; // seconds
  private maxSubSteps: number;
  private worldObjects: {
    [uuid: string]: CANNON.Body;
  };
  constructor() {
    this.worldObjects = {};
    const world = new CANNON.World();
    world.gravity.set(0, 0, -9.82); // m/s²

    // ground Z axis by default, should rotate I think
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0, shape: groundShape });
    // const rot = new CANNON.Vec3(1, 0, 0);
    // groundBody.quaternion.setFromAxisAngle(rot, Math.PI / 2);
    // groundBody.position.set(0, 0, 0);
    // console.log("GROUND PHYS", groundBody.quaternion, groundBody.position);

    world.addBody(groundBody);
    this.fixedTimeStep = 1.0 / 60.0;
    this.maxSubSteps = 3;
    this.world = world;
  }

  update(delta: number) {
    this.world.step(this.fixedTimeStep, delta, this.maxSubSteps);
    return this;
  }

  addBox(uuid: string, transform: Transform) {
    const { position, rotation } = transform;
    const { x, y, z } = position;
    const { x: rx, y: ry, z: rz } = position;
    const boxBody = new CANNON.Body({
      mass: 5, // kg
      position: new CANNON.Vec3(x, y, z), // m
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
    });
    boxBody.velocity.setZero();
    boxBody.initVelocity.setZero();
    boxBody.angularVelocity.setZero();
    boxBody.initAngularVelocity.setZero();
    this.worldObjects[uuid] = boxBody;
    this.world.addBody(boxBody);
  }

  getBodyFromUUID(uuid: string) {
    return this.worldObjects[uuid] || null;
  }
}

export default PhysicsWorld;
