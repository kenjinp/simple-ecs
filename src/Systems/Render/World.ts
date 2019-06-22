import * as THREE from "three";
import { OrbitControls } from "@avatsaev/three-orbitcontrols-ts";
import { Character } from "../../Components/Character";
import { d12 } from "./Dice";

export interface Transform {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

// A simple world renderer.

// In the future, all the "Objects" rendered to the scene
// could be managed by data-driven "Components"
// handled by the "renderSytem" as a "System"
export default class World {
  public scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  public size: [number, number];
  private worldObjects: {
    [uuid: string]: THREE.Object3D;
  };
  constructor(canvas: HTMLCanvasElement) {
    this.worldObjects = {};
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.shadowMap.enabled = true;
    // this.renderer.shadowMapSoft = true;
    this.size = [canvas.clientWidth, canvas.clientHeight];
    this.renderer.setSize(...this.size);

    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.01,
      1000
    );

    this.camera.name = "debug-camera";
    this.camera.position.set(0, 0, 20);
    this.scene.add(this.camera);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.autoRotate = true;
    // const rot = new THREE.Vector3(0, 1, 1);
    // this.camera.quaternion.setFromAxisAngle(rot, Math.PI / 2);

    const groundGeo = new THREE.PlaneGeometry(100, 100, 10);
    const groundMat = new THREE.MeshPhongMaterial({
      color: 0x65c34a,
      side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    const rot = new THREE.Vector3(1, 0, 0);
    ground.quaternion.setFromAxisAngle(rot, Math.PI / 2);
    ground.receiveShadow = true;
    // this.scene.add(ground);

    // LIGHTS
    this.scene.add(new THREE.AmbientLight(0x666666));

    const light = new THREE.DirectionalLight(0xdfebff, 1.75);
    light.position.set(300, 400, 50);
    light.position.multiplyScalar(1.3);

    light.castShadow = true;

    this.scene.add(light);

    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    window.addEventListener(
      "resize",
      () => {
        this.size = [window.innerWidth, window.innerHeight];
        // TODO maybe cycle through all cameras
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      },
      false
    );
  }

  update() {
    this.renderer.render(this.scene, this.camera);
    return this;
  }

  addBox(uuid: string, transform: Transform) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0x0aeedf });
    const cube = new THREE.Mesh(geometry, material);
    cube.receiveShadow = true;
    cube.castShadow = true;
    const box = new THREE.Object3D();
    box.add(cube);
    const { position } = transform;
    if (position) {
      const { x, y, z } = position;
      box.position.set(x, y, z);
    }
    const { rotation } = transform;
    if (rotation) {
      const { x, y, z } = rotation;
      box.rotation.set(x, y, z);
    }
    this.worldObjects[uuid] = box;
    this.scene.add(box);
  }

  addCharacter(character: Character) {
    const { geometry, material } = d12.create(1);
    const cube = new THREE.Mesh(geometry, material);
    cube.receiveShadow = true;
    cube.castShadow = true;
    const box = new THREE.Object3D();
    box.add(cube);
    const { position } = character.data.transform.data;
    if (position) {
      const { x, y, z } = position;
      box.position.set(x, y, z);
    }
    const { rotation } = character.data.transform.data;
    if (rotation) {
      const { x, y, z } = rotation;
      box.rotation.set(x, y, z);
    }
    this.worldObjects[character.uuid] = box;
    this.scene.add(box);
  }

  getWorldObjectByUUID(uuid: string) {
    return this.worldObjects[uuid] || null;
  }
}
