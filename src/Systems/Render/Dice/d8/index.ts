import * as THREE from "three";
import { createGeometry as createGeometryFromValues } from "../geometry";
import { createMaterials } from "../materials";

let geometry: THREE.Geometry;
let material: THREE.Material[];

const labels = [
  " ",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20"
];

const createGeometry = radius => {
  const vertices = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1]
  ];
  const faces = [
    [0, 2, 4, 1],
    [0, 4, 3, 2],
    [0, 3, 5, 3],
    [0, 5, 2, 4],
    [1, 3, 4, 5],
    [1, 4, 2, 6],
    [1, 2, 5, 7],
    [1, 5, 3, 8]
  ];
  return createGeometryFromValues(
    vertices,
    faces,
    radius,
    0,
    -Math.PI / 4 / 2,
    0.965
  );
};

export const create = (scale: number) => {
  if (!geometry) {
    geometry = createGeometry(scale);
  }
  if (!material) {
    material = createMaterials(labels, scale / 2, scale * 2);
  }
  return { geometry, material };
};
