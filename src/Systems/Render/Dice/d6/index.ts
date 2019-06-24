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
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1]
  ];
  const faces = [
    [0, 3, 2, 1, 1],
    [1, 2, 6, 5, 2],
    [0, 1, 5, 4, 3],
    [3, 7, 6, 2, 4],
    [0, 4, 7, 3, 5],
    [4, 5, 6, 7, 6]
  ];
  return createGeometryFromValues(
    vertices,
    faces,
    radius,
    0.1,
    Math.PI / 4,
    0.96
  );
};

export const create = (scale: number) => {
  if (!geometry) {
    geometry = createGeometry(scale * 0.9);
  }
  if (!material) {
    material = createMaterials(labels, scale / 2, scale * 2);
  }
  return { geometry, material };
};
