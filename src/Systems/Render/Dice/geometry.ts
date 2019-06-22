import * as THREE from "three";

// https://en.wikipedia.org/wiki/Chamfer_(geometry)
export function chamferGeometry(vectors, faces, chamfer) {
  var chamfer_vectors = [],
    chamfer_faces = [],
    corner_faces = new Array(vectors.length);
  for (var i = 0; i < vectors.length; ++i) corner_faces[i] = [];
  for (var i = 0; i < faces.length; ++i) {
    var ii = faces[i],
      fl = ii.length - 1;
    var center_point = new THREE.Vector3();
    var face = new Array(fl);
    for (var j = 0; j < fl; ++j) {
      var vv = vectors[ii[j]].clone();
      center_point.add(vv);
      corner_faces[ii[j]].push((face[j] = chamfer_vectors.push(vv) - 1));
    }
    center_point.divideScalar(fl);
    for (var j = 0; j < fl; ++j) {
      var vv = chamfer_vectors[face[j]];
      vv.subVectors(vv, center_point)
        .multiplyScalar(chamfer)
        .addVectors(vv, center_point);
    }
    face.push(ii[fl]);
    chamfer_faces.push(face);
  }
  for (var i = 0; i < faces.length - 1; ++i) {
    for (var j = i + 1; j < faces.length; ++j) {
      var pairs = [],
        lastm = -1;
      for (var m = 0; m < faces[i].length - 1; ++m) {
        var n = faces[j].indexOf(faces[i][m]);
        if (n >= 0 && n < faces[j].length - 1) {
          if (lastm >= 0 && m != lastm + 1) pairs.unshift([i, m], [j, n]);
          else pairs.push([i, m], [j, n]);
          lastm = m;
        }
      }
      if (pairs.length !== 4) continue;
      chamfer_faces.push([
        chamfer_faces[pairs[0][0]][pairs[0][1]],
        chamfer_faces[pairs[1][0]][pairs[1][1]],
        chamfer_faces[pairs[3][0]][pairs[3][1]],
        chamfer_faces[pairs[2][0]][pairs[2][1]],
        -1
      ]);
    }
  }
  for (var i = 0; i < corner_faces.length; ++i) {
    var cf = corner_faces[i],
      face = [cf[0]],
      count = cf.length - 1;
    while (count) {
      for (var m = faces.length; m < chamfer_faces.length; ++m) {
        var index = chamfer_faces[m].indexOf(face[face.length - 1]);
        if (index >= 0 && index < 4) {
          if (--index == -1) index = 3;
          var next_vertex = chamfer_faces[m][index];
          if (cf.indexOf(next_vertex) >= 0) {
            face.push(next_vertex);
            break;
          }
        }
      }
      --count;
    }
    face.push(-1);
    chamfer_faces.push(face);
  }
  return { vectors: chamfer_vectors, faces: chamfer_faces };
}

export function createGeometry(
  vertices,
  faces,
  radius: number,
  tab,
  af,
  chamfer
) {
  var vectors = new Array(vertices.length);
  for (var i = 0; i < vertices.length; ++i) {
    vectors[i] = new THREE.Vector3().fromArray(vertices[i]).normalize();
  }
  var cg = chamferGeometry(vectors, faces, chamfer);
  var geom = makeGeometry(cg.vectors, cg.faces, radius, tab, af);
  //var geom = make_geom(vectors, faces, radius, tab, af); // Without chamfer
  // geom.cannon_shape = createShape(vectors, faces, radius); // use for cannon!
  return geom;
}

export function makeGeometry(vertices, faces, radius, tab, af) {
  var geom = new THREE.Geometry();
  for (var i = 0; i < vertices.length; ++i) {
    var vertex = vertices[i].multiplyScalar(radius);
    vertex.index = geom.vertices.push(vertex) - 1;
  }
  for (var i = 0; i < faces.length; ++i) {
    var ii = faces[i],
      fl = ii.length - 1;
    var aa = (Math.PI * 2) / fl;
    for (var j = 0; j < fl - 2; ++j) {
      geom.faces.push(
        new THREE.Face3(
          ii[0],
          ii[j + 1],
          ii[j + 2],
          [
            geom.vertices[ii[0]],
            geom.vertices[ii[j + 1]],
            geom.vertices[ii[j + 2]]
          ],
          0,
          ii[fl] + 1
        )
      );
      geom.faceVertexUvs[0].push([
        new THREE.Vector2(
          (Math.cos(af) + 1 + tab) / 2 / (1 + tab),
          (Math.sin(af) + 1 + tab) / 2 / (1 + tab)
        ),
        new THREE.Vector2(
          (Math.cos(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab),
          (Math.sin(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab)
        ),
        new THREE.Vector2(
          (Math.cos(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab),
          (Math.sin(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab)
        )
      ]);
    }
  }
  geom.computeFaceNormals();
  geom.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius);
  return geom;
}
