'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

const ScreenFrameScene = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<{
        scene?: THREE.Scene;
        camera?: THREE.PerspectiveCamera;
        renderer?: THREE.WebGLRenderer;
        frameGroup?: THREE.Group;
        animationId?: number;
    }>({});

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        scene.background = null; // Transparent background

        const camera = new THREE.PerspectiveCamera(
            50,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);

        // Lighting - Soft and even for clean aesthetic
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight1.position.set(5, 10, 7);
        scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight2.position.set(-5, -5, -5);
        scene.add(directionalLight2);

        // Load SVG and create extruded geometry
        const loader = new SVGLoader();
        const frameGroup = new THREE.Group();

        loader.load('/screen-frame.svg', (data) => {
            data.paths.forEach((path) => {
                const shapes = SVGLoader.createShapes(path);

                shapes.forEach((shape) => {
                    const geometry = new THREE.ExtrudeGeometry(shape, {
                        depth: 1,          // thickness of the frame
                        bevelEnabled: false
                    });

                    const material = new THREE.MeshStandardMaterial({
                        color: 0x222222,
                        metalness: 0.2,
                        roughness: 0.8,
                    });

                    const mesh = new THREE.Mesh(geometry, material);
                    // SVG y-axis is flipped; fix orientation
                    mesh.rotation.x = Math.PI;
                    frameGroup.add(mesh);
                });
            });

            // Center and scale the group
            // Original SVG is 800x600. Center it by translating -400, 300 (y is flipped)
            frameGroup.scale.set(0.015, 0.015, 0.015);
            frameGroup.position.set(-6, 4.5, 0); // Approx centering for 800x600 at 0.015 scale

            scene.add(frameGroup);

            // Store reference
            sceneRef.current.frameGroup = frameGroup;
        });

        // Position camera
        camera.position.set(0, 0, 50);
        camera.lookAt(0, 0, 0);

        // Store references
        sceneRef.current = {
            scene,
            camera,
            renderer,
            frameGroup: sceneRef.current.frameGroup // Ensure frameGroup is stored after loading
        };

        // Animation Loop
        let time = 0;
        const animate = () => {
            const animationId = requestAnimationFrame(animate);
            sceneRef.current.animationId = animationId;

            time += 0.01;

            if (sceneRef.current.frameGroup) {
                // Gentle rotation and floating animation
                sceneRef.current.frameGroup.rotation.y = Math.sin(time * 0.3) * 0.1;
                sceneRef.current.frameGroup.rotation.x = Math.PI + Math.cos(time * 0.2) * 0.05;
                sceneRef.current.frameGroup.position.y = Math.sin(time * 0.5) * 0.2;
            }

            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
            if (!containerRef.current || !camera || !renderer) return;

            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);

            if (sceneRef.current.animationId) {
                cancelAnimationFrame(sceneRef.current.animationId);
            }

            if (sceneRef.current.renderer) {
                sceneRef.current.renderer.dispose();
                if (containerRef.current && sceneRef.current.renderer.domElement) {
                    containerRef.current.removeChild(sceneRef.current.renderer.domElement);
                }
            }

            if (sceneRef.current.scene) {
                sceneRef.current.scene.traverse((object) => {
                    if (object instanceof THREE.Mesh) {
                        object.geometry.dispose();
                        if (object.material instanceof THREE.Material) {
                            object.material.dispose();
                        }
                    }
                });
            }
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default ScreenFrameScene;
