THREE.Collision = function (mesh0, mesh1) {

        mesh0.updateMatrixWorld();
        mesh1.updateMatrixWorld();

        // collision detection:
        //   determines if any of the rays from the cube's origin to each vertex
        //      intersects any face of a mesh in the array of target meshes
        //   for increased collision accuracy, add more vertices to the cube;
        //      for example, new _THREE.CubeGeometry( 64, 64, 64, 8, 8, 8, wireMaterial )
        //   HOWEVER: when the origin of the ray is within the target mesh, collisions do not occur
        var originPoint = mesh0.position.clone();

        for (var vertexIndex = 0; vertexIndex < mesh0.geometry.vertices.length; vertexIndex++) {
            var localVertex = mesh0.geometry.vertices[vertexIndex].clone();

            var globalVertex = localVertex.applyMatrix4(mesh0.matrix);

            var directionVector = globalVertex.sub(mesh0.position);

            var ray = new _THREE.Raycaster(originPoint, directionVector.clone().normalize());
            var collisionResults = ray.intersectObject(mesh1);

            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length())
                return true;
        }

        return false;

    };
