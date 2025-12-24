'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<{
        scene?: THREE.Scene;
        camera?: THREE.PerspectiveCamera;
        renderer?: THREE.WebGLRenderer;
        frameGroup?: THREE.Group;
        meshPlane?: THREE.Mesh;
        gridHelper?: THREE.GridHelper;
        animationId?: number;
    }>({});

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        scene.background = null; // Transparent background

        const camera = new THREE.PerspectiveCamera(
            45,
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

        // Lighting - Soft and even for technical drawing aesthetic
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.4);
        directionalLight1.position.set(5, 10, 7);
        scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.2);
        directionalLight2.position.set(-5, -5, -5);
        scene.add(directionalLight2);

        // Screen Printing Frame - Based on uploaded image
        const frameWidth = 12;
        const frameHeight = 7;
        const frameDepth = 0.8;
        const borderThickness = 0.3;

        const frameGroup = new THREE.Group();

        // Frame material - Dark, technical look
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            metalness: 0.3,
            roughness: 0.7
        });

        // Create outer frame (4 sides)
        const createFrameBar = (width: number, height: number, depth: number) => {
            const geometry = new THREE.BoxGeometry(width, height, depth);
            return new THREE.Mesh(geometry, frameMaterial);
        };

        // Top bar
        const topBar = createFrameBar(frameWidth, borderThickness, frameDepth);
        topBar.position.y = frameHeight / 2;
        frameGroup.add(topBar);

        // Bottom bar
        const bottomBar = createFrameBar(frameWidth, borderThickness, frameDepth);
        bottomBar.position.y = -frameHeight / 2;
        frameGroup.add(bottomBar);

        // Left bar
        const leftBar = createFrameBar(borderThickness, frameHeight, frameDepth);
        leftBar.position.x = -frameWidth / 2;
        frameGroup.add(leftBar);

        // Right bar
        const rightBar = createFrameBar(borderThickness, frameHeight, frameDepth);
        rightBar.position.x = frameWidth / 2;
        frameGroup.add(rightBar);

        // Screen Mesh - The printing surface
        const meshWidth = frameWidth - borderThickness * 2;
        const meshHeight = frameHeight - borderThickness * 2;

        // Create mesh grid pattern
        const meshGroup = new THREE.Group();

        // Load the screen printing image as texture
        const textureLoader = new THREE.TextureLoader();
        const imageTexture = textureLoader.load('/screen-frame.svg');

        // Mesh material with image texture
        const meshMaterial = new THREE.MeshStandardMaterial({
            map: imageTexture,
            transparent: true,
            opacity: 0.95,
            side: THREE.DoubleSide,
            metalness: 0.1,
            roughness: 0.6
        });

        const meshPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(meshWidth, meshHeight),
            meshMaterial
        );
        meshPlane.position.z = -0.1; // Slightly behind the frame
        meshGroup.add(meshPlane);

        // Add subtle grid overlay to simulate mesh texture
        const gridMaterial = new THREE.LineBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.15
        });

        const gridSize = 0.4;
        const divisions = Math.floor(meshWidth / gridSize);

        // Horizontal grid lines
        for (let i = 0; i <= Math.floor(meshHeight / gridSize); i++) {
            const y = (i * gridSize) - meshHeight / 2;
            const points = [
                new THREE.Vector3(-meshWidth / 2, y, 0.01),
                new THREE.Vector3(meshWidth / 2, y, 0.01)
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, gridMaterial);
            meshGroup.add(line);
        }

        // Vertical grid lines
        for (let i = 0; i <= divisions; i++) {
            const x = (i * gridSize) - meshWidth / 2;
            const points = [
                new THREE.Vector3(x, -meshHeight / 2, 0.01),
                new THREE.Vector3(x, meshHeight / 2, 0.01)
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, gridMaterial);
            meshGroup.add(line);
        }

        frameGroup.add(meshGroup);

        // Add corner reinforcements for technical detail
        const cornerMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            metalness: 0.5,
            roughness: 0.5
        });

        const cornerSize = 0.4;
        const cornerGeometry = new THREE.BoxGeometry(cornerSize, cornerSize, frameDepth + 0.1);

        const corners = [
            { x: frameWidth / 2, y: frameHeight / 2 },
            { x: -frameWidth / 2, y: frameHeight / 2 },
            { x: frameWidth / 2, y: -frameHeight / 2 },
            { x: -frameWidth / 2, y: -frameHeight / 2 }
        ];

        corners.forEach(pos => {
            const corner = new THREE.Mesh(cornerGeometry, cornerMaterial);
            corner.position.set(pos.x, pos.y, 0);
            frameGroup.add(corner);
        });

        scene.add(frameGroup);

        // Position camera
        camera.position.set(0, 0, 18);
        camera.lookAt(0, 0, 0);

        // Store references
        sceneRef.current = {
            scene,
            camera,
            renderer,
            frameGroup,
            meshPlane
        };

        // Animation Loop
        let time = 0;
        const animate = () => {
            const animationId = requestAnimationFrame(animate);
            sceneRef.current.animationId = animationId;

            time += 0.01;

            if (frameGroup) {
                // Gentle rotation and floating animation
                frameGroup.rotation.y = Math.sin(time * 0.3) * 0.15;
                frameGroup.rotation.x = Math.cos(time * 0.2) * 0.1;
                frameGroup.position.y = Math.sin(time * 0.5) * 0.3;
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

export default ThreeScene;
