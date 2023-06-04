import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const CustomModel = ({ scrollY }) => {
  const modelRef = useRef();
  const [rotationY, setRotationY] = useState(0);
  const [positionX, setPositionX] = useState(0);

  useFrame(({ mouse }) => {
    modelRef.current.rotation.y = rotationY + mouse.x/2; // Adjust rotation based on mouse movement along the x-axis
    modelRef.current.rotation.x = mouse.y/2; // Adjust rotation based on mouse movement along the y-axis
    modelRef.current.position.x = positionX;

    modelRef.current.scale.x = 0.7;
    modelRef.current.scale.y = 0.7;
    modelRef.current.scale.z = 0.7;

    const targetPositionY = scrollY < 400 ? -1 : 0;
    modelRef.current.position.y += (targetPositionY - modelRef.current.position.y) * 0.05;
  });

  useEffect(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const rotationScale = 400 / maxScroll;
    const positionScale = 5 / maxScroll; // Adjust the scale factor for the position
    const newRotationY = scrollY * rotationScale;
    const newPositionX = -scrollY * positionScale; // Adjust the direction and scale factor for the position

    setRotationY((newRotationY % 360) * (Math.PI / 180));
    setPositionX(newPositionX);
  }, [scrollY]);

  return (
    <group ref={modelRef}>
      <mesh receiveShadow castShadow>
        <Suspense fallback={null}>
          <GLTFModel />
        </Suspense>
      </mesh>
    </group>
  );
};

const GLTFModel = () => {
  const gltf = useLoader(GLTFLoader, '/model.glb'); // Replace with the actual path to your GLB model file

  useFrame(() => {
    // Do any additional animations or updates here
  });

  // Adjust the material properties
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.roughness = 0.5; // Adjust the roughness value (0 to 1)
      child.material.metalness = 0.1; // Adjust the metalness value (0 to 1)
    }
  });

  return <primitive object={gltf.scene} />;
};

const InteractiveModel = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Canvas className='fixed' shadowMap>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 10]} intensity={0.5} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-far={50} shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={10} shadow-camera-bottom={-10} />
      <CustomModel scrollY={scrollY} />
    </Canvas>
  );
};

export default InteractiveModel;
