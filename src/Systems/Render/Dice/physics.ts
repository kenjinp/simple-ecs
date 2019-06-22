import * as CANNON from "cannon";

export function createShape(vertices, faces, radius) {
  var cv = new Array(vertices.length),
    cf = new Array(faces.length);
  for (var i = 0; i < vertices.length; ++i) {
    var v = vertices[i];
    cv[i] = new CANNON.Vec3(v.x * radius, v.y * radius, v.z * radius);
  }
  for (var i = 0; i < faces.length; ++i) {
    cf[i] = faces[i].slice(0, faces[i].length - 1);
  }
  return new CANNON.ConvexPolyhedron(cv, cf);
}
