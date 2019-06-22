import * as THREE from "three";
import { createGeometry as createGeometryFromValues } from "../geometry";
import { createMaterials } from "../materials";

let geometry: THREE.Geometry;
let material: THREE.Material[];

const d20Labels = [
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
  const t = (1 + Math.sqrt(5)) / 2;
  const vertices = [
    [-1, t, 0],
    [1, t, 0],
    [-1, -t, 0],
    [1, -t, 0],
    [0, -1, t],
    [0, 1, t],
    [0, -1, -t],
    [0, 1, -t],
    [t, 0, -1],
    [t, 0, 1],
    [-t, 0, -1],
    [-t, 0, 1]
  ];
  const faces = [
    [0, 11, 5, 1],
    [0, 5, 1, 2],
    [0, 1, 7, 3],
    [0, 7, 10, 4],
    [0, 10, 11, 5],
    [1, 5, 9, 6],
    [5, 11, 4, 7],
    [11, 10, 2, 8],
    [10, 7, 6, 9],
    [7, 1, 8, 10],
    [3, 9, 4, 11],
    [3, 4, 2, 12],
    [3, 2, 6, 13],
    [3, 6, 8, 14],
    [3, 8, 9, 15],
    [4, 9, 5, 16],
    [2, 4, 11, 17],
    [6, 2, 10, 18],
    [8, 6, 7, 19],
    [9, 8, 1, 20]
  ];
  return createGeometryFromValues(
    vertices,
    faces,
    radius,
    -0.2,
    -Math.PI / 4 / 2,
    0.955
  );
};

export const create = (scale: number) => {
  if (!geometry) {
    geometry = createGeometry(scale * 1.2);
  }
  if (!material) {
    material = createMaterials(d20Labels, scale / 2, scale * 2);
  }
  return { geometry, material };
};
