/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
// Import thêm các công cụ hỗ trợ phát sáng
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

interface FloatingCoreProps {
  modelPath?: string;
  className?: string;
  cameraAnim: {
    zoomIn: number;
  };
}

export default function FloatingCore({
  modelPath = "/model.glb", // Đảm bảo đường dẫn file glb của bạn đúng
  className = "w-full h-full min-h-125",
  cameraAnim = { zoomIn: 0 },
}: FloatingCoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null); // Lưu tham chiếu model để xoay
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null); // Store camera reference

  // Update camera position when zoom changes
  useEffect(() => {
    if (!cameraRef.current) return;

    const camera = cameraRef.current;

    // Only update if there's actual animation
    if (cameraAnim.zoomIn === 0) {
      camera.position.set(0, 3.3, 4);
      return;
    }

    // BASE
    const base = {
      x: 0,
      y: 3.3,
      z: 4,
    };

    // ZOOM IN
    const zoomInZ = cameraAnim.zoomIn * -2.5;
    const zoomInY = cameraAnim.zoomIn * -0.4;

    // FINAL POSITION
    camera.position.set(base.x, base.y + zoomInY, base.z + zoomInZ);
  }, [cameraAnim]);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 3.3, 4); // Góc nhìn hơi chéo từ trên xuống như ảnh mẫu
    cameraRef.current = camera; // Store camera in ref

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Quan trọng để màu sắc đúng:
    renderer.toneMapping = THREE.ReinhardToneMapping;
    containerRef.current.appendChild(renderer.domElement);

    // 4. POST-PROCESSING (Tạo hiệu ứng Glow)
    const renderScene = new RenderPass(scene, camera);

    // UnrealBloomPass(độ phân giải, cường độ, bán kính, ngưỡng sáng)
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      1, // Cường độ (Strength) - Chỉnh tăng nếu muốn sáng hơn
      0.4, // Bán kính (Radius)
      0.5, // Ngưỡng (Threshold) - Càng thấp càng nhiều thứ phát sáng
    );

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xfbaa4a, 0.1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xfbaa4a, 10); // Đèn màu vàng giống lõi
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    // 6. Load model
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      const model = gltf.scene;
      modelRef.current = model; // Gán vào ref để hàm animate có thể truy cập
      scene.add(model);

      model.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          // Ép Threejs nhận diện đúng tính chất trong suốt và phát sáng của vỏ/lõi
          if (node.material.emissive) {
            node.material.emissiveIntensity = 1.0; // Tăng mạnh để Bloom bắt được
          }
          if (node.material.transparent) {
            node.material.depthWrite = true; // Sửa lỗi hiển thị xuyên thấu
          }
        }
      });
    });

    // 7. Animation loop
    let animationId: number;
    function animate() {
      animationId = requestAnimationFrame(animate);

      // Lệnh xoay model:
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005; // Xoay chầm chậm quanh trục Y
      }

      // Thay vì renderer.render, ta dùng composer.render để thấy hiệu ứng Glow
      composer.render();
    }
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [modelPath]);

  return <div ref={containerRef} className={className} />;
}
