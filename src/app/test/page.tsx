'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import {
  RotateCw,
  Sparkles,
  ArrowUp,
  RefreshCw,
  Maximize2,
  Volume2,
  Layers,
  Compass,
  Play,
  Pause,
  DownloadCloud
} from 'lucide-react';

export default function TestPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Ref to the model group so GSAP can target it from UI events
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);
  const autoRotateTweenRef = useRef<gsap.core.Tween | null>(null);

  // Control Panel state variables
  const [isRotating, setIsRotating] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [modelColor, setModelColor] = useState('#3b82f6');
  const [modelScale, setModelScale] = useState(1.5);
  const [activeTab, setActiveTab] = useState<'controls' | 'info' | 'code'>('controls');

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- 1. INITIALIZE THREE.JS SCENE, CAMERA, & RENDERER ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#030712', 0.15);

    const camera = new THREE.PerspectiveCamera(
      45,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- 2. LIGHTING CONFIGURATION ---
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.4);
    scene.add(ambientLight);

    // Key Directional Light
    const keyLight = new THREE.DirectionalLight('#ffffff', 1.8);
    keyLight.position.set(5, 5, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    // Front soft fill
    const frontLight = new THREE.DirectionalLight('#3b82f6', 1.2);
    frontLight.position.set(0, 0, 4);
    scene.add(frontLight);

    // Back rim light for dramatic highlights
    const rimLight = new THREE.DirectionalLight('#a855f7', 2);
    rimLight.position.set(-5, 5, -5);
    scene.add(rimLight);

    // Bottom fill
    const fillLight = new THREE.DirectionalLight('#ec4899', 0.5);
    fillLight.position.set(0, -5, 0);
    scene.add(fillLight);

    // --- 3. WRAPPER GROUP FOR CLEAN GSAP CONTROL ---
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Technology grid helper
    const gridHelper = new THREE.GridHelper(20, 20, '#4f46e5', '#1e1b4b');
    gridHelper.position.y = -1.5;
    if (gridHelper.material instanceof THREE.Material) {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.25;
    }
    scene.add(gridHelper);

    // --- 4. GLB MODEL LOADER (WITH AUTODETECT PATHS) ---
    const loader = new GLTFLoader();

    // We try to load from /3d/logo.glb (as detected in workspace), fallback to /logo.glb
    const primaryPath = '/3d/logo.glb';

    const applyModelSettings = (gltfScene: THREE.Group) => {
      // Auto center model geometries relative to the group
      const box = new THREE.Box3().setFromObject(gltfScene);
      const center = new THREE.Vector3();
      box.getCenter(center);
      gltfScene.position.sub(center);

      // Enhance material lighting & enable shadows
      gltfScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          if (child.material) {
            const mat = child.material as THREE.MeshStandardMaterial;
            mat.roughness = 0.15;
            mat.metalness = 0.85;
            mat.envMapIntensity = 2.0;
          }
        }
      });

      modelGroup.add(gltfScene);
      setLoading(false);

      // --- 5. GSAP ENTRANCE ANIMATIONS ---
      // Scale-in with a beautiful bouncy ease
      gsap.fromTo(modelGroup.scale,
        { x: 0, y: 0, z: 0 },
        {
          x: 1.5,
          y: 1.5,
          z: 1.5,
          duration: 1.8,
          ease: 'elastic.out(1.0, 0.65)'
        }
      );

      // Rotation spin-in
      gsap.fromTo(modelGroup.rotation,
        { y: -Math.PI * 3, x: -Math.PI / 4 },
        {
          y: 0,
          x: 0.1,
          duration: 2.2,
          ease: 'power3.out'
        }
      );

      // --- 6. GSAP IDLE FLOAT (CONTINUOUS YOYO) ---
      floatTweenRef.current = gsap.to(modelGroup.position, {
        y: 0.25,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });

      // --- 7. GSAP IDLE AUTO-ROTATION ---
      autoRotateTweenRef.current = gsap.to(modelGroup.rotation, {
        y: Math.PI * 2,
        duration: 16,
        repeat: -1,
        ease: 'none'
      });
    };

    loader.load(
      primaryPath,
      (gltf) => {
        applyModelSettings(gltf.scene);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setProgress(Math.round((xhr.loaded / xhr.total) * 100));
        } else {
          // Fallback progress simulation
          setProgress((prev) => Math.min(prev + 8, 98));
        }
      },
      (err) => {
        console.warn(`Primary GLB path [${primaryPath}] failed, trying fallback [/logo.glb]...`, err);

        // Try fallback path directly in case they put it at public/logo.glb
        loader.load(
          '/logo.glb',
          (fallbackGltf) => {
            applyModelSettings(fallbackGltf.scene);
          },
          (xhr) => {
            if (xhr.total > 0) {
              setProgress(Math.round((xhr.loaded / xhr.total) * 100));
            }
          },
          (fallbackErr) => {
            console.error('All GLB loading paths failed!', fallbackErr);
            setError('Không tìm thấy logo.glb ở /public/3d/logo.glb hay /public/logo.glb. Hãy chắc chắn rằng bạn đã copy file vào đúng thư mục.');
            setLoading(false);
          }
        );
      }
    );

    // --- 8. WEBGL RENDER LOOP ---
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // --- 9. WINDOW RESIZE HANDLER ---
    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.parentElement?.clientWidth || window.innerWidth;
      const height = canvasRef.current.parentElement?.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // --- 10. COMPONENT CLEANUP ---
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (floatTweenRef.current) floatTweenRef.current.kill();
      if (autoRotateTweenRef.current) autoRotateTweenRef.current.kill();

      scene.clear();
      renderer.dispose();
    };
  }, []);

  // --- INTERACTIVE GSAP TWEENS ---

  // A. SPIN: Trigger a quick full spin of the logo
  const triggerSpin = () => {
    if (!modelGroupRef.current) return;

    const wasRotating = isRotating;
    if (autoRotateTweenRef.current && wasRotating) {
      autoRotateTweenRef.current.pause();
    }

    gsap.to(modelGroupRef.current.rotation, {
      y: modelGroupRef.current.rotation.y + Math.PI * 2,
      duration: 1.4,
      ease: 'back.out(1.4)',
      onComplete: () => {
        if (autoRotateTweenRef.current && wasRotating) {
          autoRotateTweenRef.current.resume();
        }
      }
    });
  };

  // B. JUMP: Launch the logo upwards and bounce down
  const triggerJump = () => {
    if (!modelGroupRef.current) return;

    if (floatTweenRef.current) floatTweenRef.current.pause();

    const tl = gsap.timeline({
      onComplete: () => {
        if (floatTweenRef.current) floatTweenRef.current.resume();
      }
    });

    tl.to(modelGroupRef.current.position, {
      y: 1.2,
      duration: 0.4,
      ease: 'power2.out'
    });

    tl.to(modelGroupRef.current.position, {
      y: 0,
      duration: 0.75,
      ease: 'bounce.out'
    });
  };

  // C. PULSE: Elastic scaling bounce
  const triggerPulse = () => {
    if (!modelGroupRef.current) return;

    gsap.timeline()
      .to(modelGroupRef.current.scale, {
        x: modelScale * 1.4,
        y: modelScale * 1.4,
        z: modelScale * 1.4,
        duration: 0.2,
        ease: 'power2.out'
      })
      .to(modelGroupRef.current.scale, {
        x: modelScale,
        y: modelScale,
        z: modelScale,
        duration: 0.5,
        ease: 'elastic.out(1.2, 0.4)'
      });
  };

  // D. SHAKE: Rapid side-to-side rotation shake
  const triggerShake = () => {
    if (!modelGroupRef.current) return;

    const currentRotationZ = modelGroupRef.current.rotation.z;

    gsap.timeline()
      .to(modelGroupRef.current.rotation, { z: currentRotationZ + 0.2, duration: 0.08, ease: 'power1.inOut' })
      .to(modelGroupRef.current.rotation, { z: currentRotationZ - 0.2, duration: 0.08, ease: 'power1.inOut' })
      .to(modelGroupRef.current.rotation, { z: currentRotationZ + 0.15, duration: 0.08, ease: 'power1.inOut' })
      .to(modelGroupRef.current.rotation, { z: currentRotationZ - 0.15, duration: 0.08, ease: 'power1.inOut' })
      .to(modelGroupRef.current.rotation, { z: currentRotationZ, duration: 0.12, ease: 'back.out(1.2)' });
  };

  // E. ROTATION TOGGLE
  const toggleRotation = () => {
    if (!autoRotateTweenRef.current) return;

    if (isRotating) {
      autoRotateTweenRef.current.pause();
    } else {
      autoRotateTweenRef.current.play();
    }
    setIsRotating(!isRotating);
  };

  // F. GSAP SCALE TWEEN
  const changeScale = (newVal: number) => {
    setModelScale(newVal);
    if (!modelGroupRef.current) return;

    gsap.to(modelGroupRef.current.scale, {
      x: newVal,
      y: newVal,
      z: newVal,
      duration: 0.6,
      ease: 'back.out(1.5)'
    });
  };

  // G. WIREFRAME TOGGLE
  const toggleWireframeMode = () => {
    setWireframe(!wireframe);
    if (!modelGroupRef.current) return;

    modelGroupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            if ('wireframe' in mat) mat.wireframe = !wireframe;
          });
        } else {
          if ('wireframe' in child.material) child.material.wireframe = !wireframe;
        }
      }
    });
  };

  // H. GSAP COLOR TRANSITION TWEEN
  const changeColor = (hexColor: string) => {
    setModelColor(hexColor);
    if (!modelGroupRef.current) return;

    modelGroupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat.color) {
          gsap.to(mat.color, {
            r: new THREE.Color(hexColor).r,
            g: new THREE.Color(hexColor).g,
            b: new THREE.Color(hexColor).b,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      }
    });
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">

      {/* Dynamic Background Glowing Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* HEADER */}
      <header className="relative z-10 w-full px-6 py-5 flex items-center justify-between border-b border-slate-900 bg-slate-950/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Vietstrix 3D Studio
            </h1>
            <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-semibold font-mono">
              Three.js + GSAP Playground
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-[11px] font-mono bg-slate-900 border border-slate-800 rounded-full text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Yarn Environment Verified
          </span>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">

        {/* 3D CANVAS VIEWPORT (8 Columns) */}
        <section className="lg:col-span-8 flex flex-col bg-slate-900/40 border border-slate-900 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl relative min-h-[500px]">

          {/* Controls Bar for Viewport */}
          <div className="w-full px-4 py-3 bg-slate-950/80 border-b border-slate-900/80 flex items-center justify-between z-10 text-xs">
            <div className="flex items-center gap-2 text-slate-400 font-mono">
              <Compass className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Asset: logo.glb</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleRotation}
                className={`p-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                  isRotating
                    ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                title={isRotating ? 'Dừng xoay tự động' : 'Bật xoay tự động'}
              >
                {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>Auto Rotate</span>
              </button>

              <button
                onClick={toggleWireframeMode}
                className={`p-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                  wireframe
                    ? 'bg-pink-500/10 border-pink-500/30 text-pink-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Wireframe</span>
              </button>
            </div>
          </div>

          {/* Canvas Wrapper */}
          <div ref={containerRef} className="flex-1 w-full h-full relative">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

            {/* GLB LOADING SCREEN */}
            {loading && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center z-20 p-6 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full border-4 border-indigo-950 border-t-indigo-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-indigo-400">
                    {progress}%
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">Đang tải mô hình 3D...</h3>
                <p className="text-sm text-slate-400 max-w-sm">Đang tải và tối ưu hóa file logo.glb từ thư mục public.</p>

                <div className="w-64 h-1.5 bg-slate-900 rounded-full mt-4 overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* ERROR VIEW */}
            {error && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-lg flex flex-col items-center justify-center z-30 p-8 text-center">
                <div className="w-16 h-16 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full flex items-center justify-center mb-4">
                  <DownloadCloud className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Không tìm thấy Logo GLB</h3>
                <p className="text-slate-400 max-w-md text-sm mb-6 leading-relaxed">
                  {error}
                </p>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-left max-w-lg text-xs font-mono text-indigo-300 mb-6">
                  <span className="text-slate-500"># Đặt logo của bạn tại một trong hai đường dẫn:</span>
                  <br />
                  public/3d/logo.glb <span className="text-emerald-400">(Khuyên dùng)</span>
                  <br />
                  <span className="text-slate-500">hoặc</span>
                  <br />
                  public/logo.glb
                </div>

                <button
                  onClick={() => window.location.reload()}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold transition-all shadow-lg shadow-indigo-600/20 text-sm flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Thử tải lại Trang
                </button>
              </div>
            )}

            {/* Live Active Tweens Visualizer */}
            {!loading && !error && (
              <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex justify-between items-end">
                <div className="bg-slate-950/70 border border-slate-900/60 p-3 rounded-xl backdrop-blur-md max-w-[280px]">
                  <p className="text-[10px] uppercase font-mono tracking-wider text-indigo-400 font-bold mb-1">
                    Trạng thái Hoạt ảnh GSAP
                  </p>
                  <div className="flex flex-col gap-1 text-[11px] text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                      Floating: <span className="text-indigo-300 font-semibold font-mono">Active (Yoyo, Infinite)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isRotating ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                      Auto-Spinning: <span className="text-slate-300 font-semibold font-mono">{isRotating ? 'ON (16s cycle)' : 'PAUSED'}</span>
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-900/60 p-2 px-3 rounded-lg backdrop-blur-md text-[10px] text-slate-400 font-mono">
                  Scale: {modelScale.toFixed(1)}x | Lights: High Quality
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SIDEBAR CONTROL & SPECS (4 Columns) */}
        <section className="lg:col-span-4 flex flex-col bg-slate-900/40 border border-slate-900 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">

          {/* Tab Selector */}
          <div className="grid grid-cols-3 border-b border-slate-900/80 bg-slate-950/60">
            {(['controls', 'info', 'code'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 ${
                  activeTab === tab
                    ? 'border-indigo-500 bg-slate-900/60 text-white font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab === 'controls' && 'GSAP Tweak'}
                {tab === 'info' && 'Hướng dẫn'}
                {tab === 'code' && 'Code mẫu'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-5 overflow-y-auto max-h-[580px] min-h-[400px]">

            {/* PANEL A: GSAP TWEAKS */}
            {activeTab === 'controls' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    Kích hoạt Hiệu ứng (GSAP Trigger)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Bấm để phát các tween animation bằng GSAP trực tiếp lên các thuộc tính của logo 3D.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    disabled={loading || !!error}
                    onClick={triggerSpin}
                    className="p-3 bg-gradient-to-b from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:opacity-50 disabled:pointer-events-none rounded-xl text-xs font-semibold text-white flex flex-col items-center justify-center gap-2 border border-indigo-500/20 shadow-md shadow-indigo-950/50 hover:scale-[1.03] active:scale-[0.98] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                      <RotateCw className="w-4 h-4 text-indigo-300" />
                    </div>
                    <span>Xoay Phóng (Spin)</span>
                  </button>

                  <button
                    disabled={loading || !!error}
                    onClick={triggerJump}
                    className="p-3 bg-gradient-to-b from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 disabled:pointer-events-none rounded-xl text-xs font-semibold text-white flex flex-col items-center justify-center gap-2 border border-purple-500/20 shadow-md shadow-purple-950/50 hover:scale-[1.03] active:scale-[0.98] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <ArrowUp className="w-4 h-4 text-purple-300" />
                    </div>
                    <span>Nhảy nẩy (Jump)</span>
                  </button>

                  <button
                    disabled={loading || !!error}
                    onClick={triggerPulse}
                    className="p-3 bg-gradient-to-b from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 disabled:opacity-50 disabled:pointer-events-none rounded-xl text-xs font-semibold text-white flex flex-col items-center justify-center gap-2 border border-pink-500/20 shadow-md shadow-pink-950/50 hover:scale-[1.03] active:scale-[0.98] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-pink-300" />
                    </div>
                    <span>Co giãn (Pulse)</span>
                  </button>

                  <button
                    disabled={loading || !!error}
                    onClick={triggerShake}
                    className="p-3 bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 disabled:pointer-events-none rounded-xl text-xs font-semibold text-white flex flex-col items-center justify-center gap-2 border border-amber-500/20 shadow-md shadow-amber-950/50 hover:scale-[1.03] active:scale-[0.98] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <Volume2 className="w-4 h-4 text-amber-300" />
                    </div>
                    <span>Rung lắc (Shake)</span>
                  </button>
                </div>

                <div className="border-t border-slate-900 pt-4 flex flex-col gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-widest text-slate-400 font-mono">
                      1. Thay đổi Kích thước (Scale)
                    </h4>
                    <div className="flex gap-2">
                      {[1.0, 1.5, 2.0].map((val) => (
                        <button
                          key={val}
                          disabled={loading || !!error}
                          onClick={() => changeScale(val)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                            modelScale === val
                              ? 'bg-indigo-600 border-indigo-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          {val.toFixed(1)}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-widest text-slate-400 font-mono">
                      2. Thay đổi màu sắc (Smooth GSAP Tint)
                    </h4>
                    <p className="text-[11px] text-slate-400 mb-2">
                      GSAP sẽ chuyển màu vật liệu model cực mượt mà từ màu cũ sang màu mới:
                    </p>
                    <div className="flex gap-2.5">
                      {[
                        { color: '#3b82f6', label: 'Blue' },
                        { color: '#ec4899', label: 'Pink' },
                        { color: '#10b981', label: 'Emerald' },
                        { color: '#f59e0b', label: 'Amber' },
                        { color: '#ef4444', label: 'Red' },
                      ].map((item) => (
                        <button
                          key={item.color}
                          disabled={loading || !!error}
                          onClick={() => changeColor(item.color)}
                          className={`w-7 h-7 rounded-full border transition-all ${
                            modelColor === item.color
                              ? 'border-white scale-110 shadow-lg ring-2 ring-indigo-500/40'
                              : 'border-transparent hover:scale-105'
                          }`}
                          style={{ backgroundColor: item.color }}
                          title={item.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PANEL B: INSTRUCTION MANUAL */}
            {activeTab === 'info' && (
              <div className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed">
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">Cách load 3D GLB & GSAP</h3>
                  <p className="text-xs text-slate-400">
                    Dưới đây là các bước để dựng một trang 3D chuyên nghiệp siêu mượt bằng ThreeJS và GSAP:
                  </p>
                </div>

                <div className="flex flex-col gap-3.5 text-xs">
                  <div className="p-3 bg-slate-900/60 border border-slate-900 rounded-xl">
                    <span className="font-bold text-indigo-400 text-xs block mb-1">Bước 1: Cài đặt thư viện bằng Yarn</span>
                    <code className="block bg-slate-950 p-2 rounded text-[10px] text-emerald-400 font-mono border border-slate-900">
                      yarn add three gsap
                      <br />
                      yarn add -D @types/three
                    </code>
                  </div>

                  <div className="p-3 bg-slate-900/60 border border-slate-900 rounded-xl">
                    <span className="font-bold text-indigo-400 text-xs block mb-1">Bước 2: Cấu trúc thư mục</span>
                    <p className="text-slate-400">
                      Đặt file <code className="text-amber-400 font-mono">logo.glb</code> vào trong thư mục <code className="text-emerald-400 font-mono">public/</code> hoặc <code className="text-emerald-400 font-mono">public/3d/</code> để Next.js tự động cung cấp đường dẫn tĩnh (được truy cập thông qua <code className="text-indigo-400 font-mono">/logo.glb</code>).
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/60 border border-slate-900 rounded-xl">
                    <span className="font-bold text-indigo-400 text-xs block mb-1">Bước 3: Gắn Canvas & Dựng Scene</span>
                    <p className="text-slate-400">
                      Tạo một thẻ <code className="text-amber-400 font-mono">&lt;canvas ref=&#123;canvasRef&#125; /&gt;</code>. Trong Hook <code className="text-indigo-400 font-mono">useEffect</code>, khởi tạo:
                      <br />
                      - <strong className="text-slate-200">Scene</strong>, <strong className="text-slate-200">Camera</strong>, và <strong className="text-slate-200">WebGLRenderer</strong>.
                      <br />
                      - Đèn chiếu sáng <strong className="text-slate-200">DirectionalLight</strong> và <strong className="text-slate-200">AmbientLight</strong>.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/60 border border-slate-900 rounded-xl">
                    <span className="font-bold text-indigo-400 text-xs block mb-1">Bước 4: Load mô hình bằng GLTFLoader</span>
                    <p className="text-slate-400">
                      Dùng <code className="text-indigo-400 font-mono">GLTFLoader</code> để fetch file GLB. Khi tải xong, bọc model trong một <code className="text-amber-400 font-mono">THREE.Group</code> để GSAP có thể dễ dàng quản lý việc xoay, dịch chuyển và thu phóng mà không bị lệch tâm (pivot).
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/60 border border-slate-900 rounded-xl">
                    <span className="font-bold text-indigo-400 text-xs block mb-1">Bước 5: Tạo hoạt ảnh mượt với GSAP</span>
                    <p className="text-slate-400">
                      Sử dụng <code className="text-indigo-400 font-mono">gsap.to()</code> hoặc <code className="text-indigo-400 font-mono">gsap.fromTo()</code> tác động trực tiếp vào các thuộc tính của model 3D (như <code className="text-amber-400 font-mono">modelGroup.position.y</code>, <code className="text-amber-400 font-mono">modelGroup.rotation.y</code>, hoặc màu sắc vật liệu).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* PANEL C: CODE EXAMPLES */}
            {activeTab === 'code' && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">Dòng code chính (GSAP + Three)</h3>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl font-mono text-[10px] text-indigo-300 flex flex-col gap-2 overflow-x-auto leading-relaxed">
                  <p className="text-slate-500">{"// 1. Khai báo thư viện"}</p>
                  <code>import * as THREE from &apos;three&apos;;</code>
                  <code>import &#123; GLTFLoader &#125; from &apos;three/examples/jsm/loaders/GLTFLoader.js&apos;;</code>
                  <code>import gsap from &apos;gsap&apos;;</code>

                  <p className="text-slate-500 mt-2">{"// 2. Load model & Setup GSAP"}</p>
                  <code>const loader = new GLTFLoader();</code>
                  <code>const modelGroup = new THREE.Group();</code>
                  <code>scene.add(modelGroup);</code>

                  <code>loader.load(&apos;/3d/logo.glb&apos;, (gltf) =&gt; &#123;</code>
                  <code className="pl-3">const model = gltf.scene;</code>
                  <code className="pl-3">modelGroup.add(model);</code>
                  <code className="pl-3 text-emerald-400">{"// GSAP Entrance Animation"}</code>
                  <code className="pl-3">gsap.fromTo(modelGroup.scale, </code>
                  <code className="pl-6">&#123; x: 0, y: 0, z: 0 &#125;, </code>
                  <code className="pl-6">&#123; x: 1.5, y: 1.5, z: 1.5, duration: 1.5, ease: &apos;elastic.out&apos; &#125;</code>
                  <code className="pl-3">);</code>

                  <code className="pl-3 text-emerald-400">{"// GSAP Float idle animation"}</code>
                  <code className="pl-3">gsap.to(modelGroup.position, &#123;</code>
                  <code className="pl-6">y: 0.25,</code>
                  <code className="pl-6">duration: 2.5,</code>
                  <code className="pl-6">yoyo: true,</code>
                  <code className="pl-6">repeat: -1,</code>
                  <code className="pl-6">ease: &apos;sine.inOut&apos;</code>
                  <code className="pl-3">&#125;);</code>
                  <code>&#125;);</code>

                  <p className="text-slate-500 mt-2">{"// 3. Kích hoạt bằng sự kiện UI"}</p>
                  <code>const spinModel = () =&gt; &#123;</code>
                  <code className="pl-3">gsap.to(modelGroup.rotation, &#123;</code>
                  <code className="pl-6">y: modelGroup.rotation.y + Math.PI * 2,</code>
                  <code className="pl-6">duration: 1.2,</code>
                  <code className="pl-6">ease: &apos;back.out(1.5)&apos;</code>
                  <code className="pl-3">&#125;);</code>
                  <code>&#125;;</code>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-950/80 border-t border-slate-900 text-center text-[10px] text-slate-500 font-mono">
            Vietstrix Studio &copy; {new Date().getFullYear()} | Powered by WebGL
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full px-6 py-6 border-t border-slate-900 bg-slate-950/80 text-center text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <p className="flex items-center gap-1.5">
          <span>Khởi tạo môi trường bằng:</span>
          <span className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono border border-slate-800 text-indigo-400">yarn</span>
          <span className="text-slate-600">|</span>
          <span>Công nghệ:</span>
          <span className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono border border-slate-800 text-pink-400">GSAP 3</span>
          <span className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono border border-slate-800 text-sky-400">Three.js</span>
        </p>
        <p className="text-[11px] text-slate-500">
          * Mô hình được tự động tìm kiếm tại đường dẫn tĩnh.
        </p>
      </footer>
    </div>
  );
}
