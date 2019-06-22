import * as THREE from "three";

export const materialOptions = {
  specular: 0x172022,
  color: 0xf0f0f0,
  shininess: 40,
  flatShading: true,
  magFilter: THREE.LinearFilter,
  minFilter: THREE.LinearFilter
};

export const labelColor = "#aaaaaa";
export const diceColor = "#202020";

export function calculateTextureSize(approx) {
  return Math.pow(2, Math.floor(Math.log(approx) / Math.log(2)));
}

export function createTextTexture(size, margin, text, color, back_color) {
  if (text === undefined) {
    return null;
  }
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const textureSize = calculateTextureSize(size + size * 2 * margin) * 100;
  canvas.width = canvas.height = textureSize;
  context.font = textureSize / (1 + 2 * margin) + "pt Arial";
  context.fillStyle = back_color;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.textAlign = "center";
  context.textBaseline = "middle";
  // context.fillStyle = color;
  context.shadowColor = "pink";

  // Specify the shadow offset.
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;

  // Blur the shadow to create a bevel effect.
  context.shadowBlur = 5;
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  if (text === "6" || text === "9") {
    context.fillText("  .", canvas.width / 2, canvas.height / 2);
  }

  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function createMaterials(
  faceLabels: string[],
  size: number,
  margin: number
) {
  const materials = [];
  for (let i = 0; i < faceLabels.length; ++i)
    materials.push(
      new THREE.MeshPhongMaterial({
        ...materialOptions,
        map: createTextTexture(
          size,
          margin,
          faceLabels[i],
          labelColor,
          diceColor
        )
      })
    );
  return materials;
}
