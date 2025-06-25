// Three.js 3D Background Animation for Hero Section
class HeroScene {
    constructor() {
        this.container = document.getElementById('hero-bg');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        this.windowHalf = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        
        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();

        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        this.camera.position.z = 400;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);

        // Create particles representing data points and neural networks
        this.createParticles();
        this.createConnections();
    }

    createParticles() {
        const particleCount = 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        // Color palette for agricultural theme
        const colorPalette = [
            new THREE.Color(0x2d5a27), // Dark green
            new THREE.Color(0x4a7c59), // Medium green
            new THREE.Color(0x81c784), // Light green
            new THREE.Color(0x66bb6a), // Fresh green
            new THREE.Color(0x388e3c)  // Forest green
        ];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Random positions
            positions[i3] = (Math.random() - 0.5) * 800;
            positions[i3 + 1] = (Math.random() - 0.5) * 600;
            positions[i3 + 2] = (Math.random() - 0.5) * 400;

            // Random colors from palette
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Random sizes
            sizes[i] = Math.random() * 3 + 1;

            // Store particle data for animation
            this.particles.push({
                velocity: {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5,
                    z: (Math.random() - 0.5) * 0.5
                },
                originalPosition: {
                    x: positions[i3],
                    y: positions[i3 + 1],
                    z: positions[i3 + 2]
                }
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Create particle material
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                uniform float time;
                
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + sin(time + position.x * 0.01) * 0.3);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    float r = distance(gl_PointCoord, vec2(0.5, 0.5));
                    if (r > 0.5) discard;
                    
                    float alpha = 1.0 - (r * 2.0);
                    alpha = alpha * alpha;
                    
                    gl_FragColor = vec4(vColor, alpha * 0.8);
                }
            `,
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
    }

    createConnections() {
        // Create lines connecting nearby particles to represent neural networks
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = [];
        const lineColors = [];

        const positions = this.particleSystem.geometry.attributes.position.array;
        const particleCount = positions.length / 3;

        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance < 120 && Math.random() > 0.7) {
                    linePositions.push(
                        positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                        positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                    );

                    // Green connections with varying opacity
                    const alpha = 1.0 - (distance / 120);
                    lineColors.push(0.2, 0.6, 0.3, alpha);
                    lineColors.push(0.2, 0.6, 0.3, alpha);
                }
            }
        }

        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4));

        const lineMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                attribute vec4 color;
                varying vec4 vColor;
                uniform float time;
                
                void main() {
                    vColor = color;
                    vec3 pos = position;
                    pos.y += sin(time + position.x * 0.01) * 2.0;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                varying vec4 vColor;
                
                void main() {
                    gl_FragColor = vColor;
                }
            `,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });

        this.connectionLines = new THREE.LineSegments(lineGeometry, lineMaterial);
        this.scene.add(this.connectionLines);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Update particle uniforms
        if (this.particleSystem.material.uniforms) {
            this.particleSystem.material.uniforms.time.value = time;
        }

        // Update connection lines uniforms
        if (this.connectionLines.material.uniforms) {
            this.connectionLines.material.uniforms.time.value = time;
        }

        // Animate particles
        const positions = this.particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            const i3 = i * 3;

            // Gentle floating motion
            positions[i3] += particle.velocity.x;
            positions[i3 + 1] += particle.velocity.y;
            positions[i3 + 2] += particle.velocity.z;

            // Add wave motion
            positions[i3 + 1] += Math.sin(time + particle.originalPosition.x * 0.01) * 0.5;

            // Boundary checks - wrap around
            if (positions[i3] > 400) positions[i3] = -400;
            if (positions[i3] < -400) positions[i3] = 400;
            if (positions[i3 + 1] > 300) positions[i3 + 1] = -300;
            if (positions[i3 + 1] < -300) positions[i3 + 1] = 300;
            if (positions[i3 + 2] > 200) positions[i3 + 2] = -200;
            if (positions[i3 + 2] < -200) positions[i3 + 2] = 200;
        }

        this.particleSystem.geometry.attributes.position.needsUpdate = true;

        // Mouse interaction
        this.camera.position.x += (this.mouse.x - this.camera.position.x) * 0.02;
        this.camera.position.y += (-this.mouse.y - this.camera.position.y) * 0.02;
        this.camera.lookAt(this.scene.position);

        // Rotate the entire scene slowly
        this.particleSystem.rotation.y += 0.002;
        this.connectionLines.rotation.y += 0.002;

        this.renderer.render(this.scene, this.camera);
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize(), false);
        document.addEventListener('mousemove', (event) => this.onMouseMove(event), false);
    }

    onWindowResize() {
        this.windowHalf.x = window.innerWidth / 2;
        this.windowHalf.y = window.innerHeight / 2;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX - this.windowHalf.x) * 0.1;
        this.mouse.y = (event.clientY - this.windowHalf.y) * 0.1;
    }

    destroy() {
        if (this.renderer) {
            this.container.removeChild(this.renderer.domElement);
            this.renderer.dispose();
        }
        if (this.particleSystem && this.particleSystem.geometry) {
            this.particleSystem.geometry.dispose();
        }
        if (this.particleSystem && this.particleSystem.material) {
            this.particleSystem.material.dispose();
        }
        if (this.connectionLines && this.connectionLines.geometry) {
            this.connectionLines.geometry.dispose();
        }
        if (this.connectionLines && this.connectionLines.material) {
            this.connectionLines.material.dispose();
        }
    }
}

// Initialize the scene when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if Three.js is available and we're not on a mobile device
    if (typeof THREE !== 'undefined' && window.innerWidth > 768) {
        const heroContainer = document.getElementById('hero-bg');
        if (heroContainer) {
            window.heroScene = new HeroScene();
        }
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    if (window.heroScene && typeof window.heroScene.destroy === 'function') {
        window.heroScene.destroy();
    }
}); 