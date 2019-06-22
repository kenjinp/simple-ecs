import * as THREE from "three";
import { createGeometry as createGeometryFromValues } from "../geometry";
import {
  materialOptions,
  calculateTextureSize,
  labelColor,
  diceColor
} from "../materials";

let geometry: THREE.Geometry;
let material: THREE.Material[];

const D4Labels = [
  [[], [0, 0, 0], [2, 4, 3], [1, 3, 4], [2, 1, 4], [1, 2, 3]],
  [[], [0, 0, 0], [2, 3, 4], [3, 1, 4], [2, 4, 1], [3, 2, 1]],
  [[], [0, 0, 0], [4, 3, 2], [3, 4, 1], [4, 2, 1], [3, 1, 2]],
  [[], [0, 0, 0], [4, 2, 3], [1, 4, 3], [4, 1, 2], [1, 3, 2]]
];

function createText(size, margin, text, color, back_color) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const textureSize = calculateTextureSize(size * 10 + margin) * 2;
  canvas.width = canvas.height = textureSize;
  context.font = (textureSize - margin) / 1.5 + "pt Arial";
  context.fillStyle = back_color;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = color;
  for (var i in text) {
    context.fillText(
      text[i],
      canvas.width / 2,
      canvas.height / 2 - textureSize * 0.3
    );
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate((Math.PI * 2) / 3);
    context.translate(-canvas.width / 2, -canvas.height / 2);
  }
  canvas.className = "textures";
  document.body.appendChild(canvas);
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const createMaterials = (size, margin, labels) => {
  const materials = [];
  for (var i = 0; i < labels.length; ++i) {
    materials.push(
      new THREE.MeshPhongMaterial({
        ...materialOptions,
        map: createText(size, margin, labels[i], labelColor, diceColor)
      })
    );
  }
  return materials;
};

const createGeometry = radius => {
  const vertices = [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]];
  const faces = [[1, 0, 2, 1], [0, 1, 3, 2], [0, 3, 2, 3], [1, 2, 3, 4]];
  return createGeometryFromValues(
    vertices,
    faces,
    radius,
    -0.1,
    (Math.PI * 7) / 6,
    0.96
  );
};

export const create = (scale: number) => {
  if (!geometry) {
    geometry = createGeometry(scale * 1.2);
  }
  if (!material) {
    material = createMaterials(scale / 2, scale * 2, D4Labels[0]);
  }
  return { geometry, material };
};
