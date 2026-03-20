import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
    const mountRef = useRef(null);

    useEffect(() => {
        // Basic Three.js setup
        const scene = new THREE.Scene();

        // We want the hero scene to feel dark and premium
        // A TorusKnot provides good reflections and looks complex/abstract
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // performance optimization
        mountRef.current.appendChild(renderer.domElement);

        // Geometry & Material
        const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 128, 32);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x0a0a0a,
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
        });
        const torusKnot = new THREE.Mesh(geometry, material);
        scene.add(torusKnot);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xd4af37, 50, 100); // Gold accent light
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0x4444ff, 50, 100); // Subtle blue rim light
        pointLight2.position.set(-5, -5, 5);
        scene.add(pointLight2);

        // Mouse Interaction
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            // Render rotation
            torusKnot.rotation.x += 0.005;
            torusKnot.rotation.y += 0.005;

            // Mouse effect (easing for smoothness)
            torusKnot.rotation.x += (mouseY * 0.5 - torusKnot.rotation.x) * 0.05;
            torusKnot.rotation.y += (mouseX * 0.5 - torusKnot.rotation.y) * 0.05;

            renderer.render(scene, camera);
        };
        animate();

        // Resize Handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);

            // Free WebGL memory
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />;
}
