import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ENGINE_NODES, type EngineNodeKey } from '../lib/engineNodes';

export type { EngineNodeKey };
export { ENGINE_NODES };

interface Hero3DProps {
  activeNode?: EngineNodeKey;
  onSelectNode?: (node: EngineNodeKey) => void;
  scrollProgress?: number;
  theme?: 'dark' | 'light';
  backgroundMode?: boolean;
  showDock?: boolean;
}

function detectSoftwareWebGL(): boolean {
  try {
    const probe = document.createElement('canvas');
    const gl = probe.getContext('webgl2') || probe.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function Hero3D({
  activeNode = 'ai',
  onSelectNode,
  scrollProgress = 0,
  theme = 'dark',
  backgroundMode = false,
  showDock = true,
}: Hero3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  const activeNodeRef = useRef<EngineNodeKey>(activeNode);
  const scrollRef = useRef<number>(scrollProgress);
  const themeRef = useRef<'dark' | 'light'>(theme);
  const backgroundRef = useRef<boolean>(backgroundMode);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    activeNodeRef.current = activeNode;
  }, [activeNode]);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSoftwareGl = detectSoftwareWebGL();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const width = container.clientWidth || 1200;
    const height = container.clientHeight || 680;
    renderer.setSize(width, height);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.1, backgroundRef.current ? 5.25 : 6.2);
    camera.lookAt(0, 0, 0);

    // 3-point studio rig + crimson architectural rim light
    const hemiLight = new THREE.HemisphereLight(0xeef2ff, 0x18181b, 0.95);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.35);
    keyLight.position.set(4.5, 6.0, 5.0);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xea0400, 4.8, 16, 1.5);
    rimLight.position.set(-3.2, 1.6, -2.5);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.85);
    fillLight.position.set(-4.0, -2.0, 3.5);
    scene.add(fillLight);

    // Shared PBR Materials
    const brushedObsidian = new THREE.MeshStandardMaterial({
      color: 0x141416,
      metalness: 0.88,
      roughness: 0.24,
    });

    const satinTitanium = new THREE.MeshStandardMaterial({
      color: 0x3b3d46,
      metalness: 0.84,
      roughness: 0.32,
    });

    const matteGraphite = new THREE.MeshStandardMaterial({
      color: 0x101014,
      metalness: 0.35,
      roughness: 0.68,
    });

    const crimsonAccent = new THREE.MeshPhysicalMaterial({
      color: 0xea0400,
      emissive: 0x7a0300,
      emissiveIntensity: 1.0,
      metalness: 0.55,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const ceramicWhite = new THREE.MeshPhysicalMaterial({
      color: 0xf4f4f5,
      metalness: 0.15,
      roughness: 0.22,
      clearcoat: 0.8,
    });

    const opticalGlass = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.85,
      transparent: true,
      opacity: isSoftwareGl ? 0.38 : 0.95,
      ior: 1.5,
      thickness: 0.6,
    });

    // Composite Core Assembly (Digital Growth Engine)
    const engineRoot = new THREE.Group();
    if (backgroundRef.current) {
      engineRoot.position.set(width >= 1024 ? 0.75 : 0, -0.05, 0);
      engineRoot.scale.setScalar(1.08);
    }
    scene.add(engineRoot);

    const geometries: THREE.BufferGeometry[] = [];
    const registerGeo = <T extends THREE.BufferGeometry>(g: T): T => {
      geometries.push(g);
      return g;
    };

    // 1. Primary sculptural outer gimbal ring
    const outerRingGeo = registerGeo(new THREE.TorusGeometry(1.82, 0.068, 24, 96));
    const outerRing = new THREE.Mesh(outerRingGeo, brushedObsidian);
    outerRing.rotation.x = Math.PI * 0.32;
    engineRoot.add(outerRing);

    // 2. Secondary precision inner stator ring
    const innerRingGeo = registerGeo(new THREE.TorusGeometry(1.36, 0.048, 20, 80));
    const innerRing = new THREE.Mesh(innerRingGeo, satinTitanium);
    innerRing.rotation.y = Math.PI * 0.25;
    engineRoot.add(innerRing);

    // 3. Thin crimson orbital energy track
    const crimsonTrackGeo = registerGeo(new THREE.TorusGeometry(1.58, 0.02, 16, 96));
    const crimsonTrack = new THREE.Mesh(crimsonTrackGeo, crimsonAccent);
    crimsonTrack.rotation.x = -Math.PI * 0.22;
    engineRoot.add(crimsonTrack);

    // 4. Central architectural core assembly
    const coreGroup = new THREE.Group();
    const coreCrystalGeo = registerGeo(new THREE.OctahedronGeometry(0.64, 0));
    const coreCrystal = new THREE.Mesh(coreCrystalGeo, crimsonAccent);
    coreGroup.add(coreCrystal);

    const coreCageGeo = registerGeo(new THREE.IcosahedronGeometry(0.88, 1));
    const coreCageMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true,
    });
    const coreCage = new THREE.Mesh(coreCageGeo, coreCageMat);
    coreGroup.add(coreCage);

    const collarGeo = registerGeo(new THREE.CylinderGeometry(0.56, 0.7, 0.14, 32));
    const topCollar = new THREE.Mesh(collarGeo, brushedObsidian);
    topCollar.position.y = 0.74;
    const bottomCollar = new THREE.Mesh(collarGeo, brushedObsidian);
    bottomCollar.position.y = -0.74;
    bottomCollar.rotation.x = Math.PI;
    coreGroup.add(topCollar, bottomCollar);
    engineRoot.add(coreGroup);

    // 5. Six satellite service nodes arranged along orbit
    const nodeGroups = new Map<EngineNodeKey, THREE.Group>();
    const nodeBaseGeo = registerGeo(new THREE.BoxGeometry(0.38, 0.25, 0.08));
    const nodeScreenGeo = registerGeo(new THREE.BoxGeometry(0.3, 0.17, 0.02));
    const nodePinGeo = registerGeo(new THREE.SphereGeometry(0.048, 16, 16));
    const connectorGeo = registerGeo(new THREE.CylinderGeometry(0.01, 0.01, 1.5, 8));

    ENGINE_NODES.forEach((meta) => {
      const nGroup = new THREE.Group();
      const radius = 2.12;
      const x = Math.cos(meta.angle) * radius;
      const z = Math.sin(meta.angle) * radius * 0.58;
      const y = Math.sin(meta.angle * 2) * 0.4;

      nGroup.position.set(x, y, z);

      const frame = new THREE.Mesh(nodeBaseGeo, matteGraphite);
      const glassPlate = new THREE.Mesh(nodeScreenGeo, opticalGlass);
      glassPlate.position.z = 0.045;

      const accentDot = new THREE.Mesh(nodePinGeo, ceramicWhite.clone());
      accentDot.position.set(0.11, 0.055, 0.055);
      accentDot.name = 'accentDot';

      nGroup.add(frame, glassPlate, accentDot);
      engineRoot.add(nGroup);
      nodeGroups.set(meta.key, nGroup);

      const strut = new THREE.Mesh(connectorGeo, satinTitanium);
      strut.position.set(x * 0.5, y * 0.5, z * 0.5);
      strut.lookAt(x, y, z);
      strut.rotateX(Math.PI / 2);
      engineRoot.add(strut);
    });

    // 6. Instanced architectural micro-particles
    const particleCount = 56;
    const particleGeo = registerGeo(new THREE.BoxGeometry(0.034, 0.034, 0.034));
    const particles = new THREE.InstancedMesh(particleGeo, ceramicWhite, particleCount);
    const dummy = new THREE.Object3D();
    const particleBase: Array<{ angle: number; radius: number; y: number; speed: number }> = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.3 + (i % 5) * 0.3;
      const y = ((i % 7) - 3) * 0.4;
      particleBase.push({ angle, radius, y, speed: 0.12 + (i % 4) * 0.04 });
      dummy.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius * 0.6);
      dummy.updateMatrix();
      particles.setMatrixAt(i, dummy.matrix);
    }
    particles.computeBoundingSphere();
    engineRoot.add(particles);

    // Grounded contact shadow disc
    const shadowGeo = registerGeo(new THREE.CircleGeometry(1.85, 48));
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -1.65;
    scene.add(contactShadow);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const handlePointerMove = (e: PointerEvent) => {
      const vw = window.innerWidth || 1;
      const vh = window.innerHeight || 1;
      pointerRef.current.x = (e.clientX / vw) * 2 - 1;
      pointerRef.current.y = -((e.clientY / vh) * 2 - 1);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 1200;
      const h = container.clientHeight || 680;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (backgroundRef.current) {
        engineRoot.position.x = w >= 1024 ? 0.75 : 0;
      }
    };
    window.addEventListener('resize', handleResize);

    let isVisible = true;
    let isTabActive = !document.hidden;
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    const onVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    let frameId = 0;
    let disposed = false;
    const startTime = performance.now();
    let lastTime = startTime;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.SIGNALED;
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync && gl.deleteSync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const updateScene = (dt: number, elapsed: number) => {
      const targetRotY = pointerRef.current.x * 0.28 + scrollRef.current * 0.7 + elapsed * 0.16;
      const targetRotX = pointerRef.current.y * 0.16 + Math.sin(elapsed * 0.38) * 0.07;

      engineRoot.rotation.y = THREE.MathUtils.damp(engineRoot.rotation.y, targetRotY, 4.5, dt);
      engineRoot.rotation.x = THREE.MathUtils.damp(engineRoot.rotation.x, targetRotX, 4.5, dt);

      outerRing.rotation.z += dt * 0.24;
      innerRing.rotation.x += dt * 0.3;
      crimsonTrack.rotation.z -= dt * 0.36;
      coreGroup.rotation.y -= dt * 0.42;

      const selected = activeNodeRef.current;
      nodeGroups.forEach((group, key) => {
        const isTarget = key === selected;
        const targetScale = isTarget ? 1.26 : 0.96;
        const s = THREE.MathUtils.damp(group.scale.x, targetScale, 6, dt);
        group.scale.setScalar(s);
        group.lookAt(camera.position);

        const dot = group.getObjectByName('accentDot') as THREE.Mesh | undefined;
        if (dot && dot.material instanceof THREE.MeshPhysicalMaterial) {
          dot.material.color.setHex(isTarget ? 0xea0400 : 0xf4f4f5);
          dot.material.emissive.setHex(isTarget ? 0xea0400 : 0x000000);
          dot.material.emissiveIntensity = isTarget ? 1.3 : 0;
        }
      });

      for (let i = 0; i < particleCount; i++) {
        const p = particleBase[i];
        const a = p.angle + elapsed * p.speed;
        dummy.position.set(
          Math.cos(a) * p.radius,
          p.y + Math.sin(elapsed + i) * 0.08,
          Math.sin(a) * p.radius * 0.55
        );
        dummy.rotation.set(elapsed * 0.5, elapsed * 0.3, 0);
        dummy.updateMatrix();
        particles.setMatrixAt(i, dummy.matrix);
      }
      particles.instanceMatrix.needsUpdate = true;

      shadowMat.opacity = themeRef.current === 'dark' ? 0.32 : 0.08;
    };

    const tick = () => {
      if (disposed) return;
      if (!isVisible || !isTabActive) {
        lastTime = performance.now();
        frameId = window.setTimeout(tick, 220);
        return;
      }

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.08);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;
      updateScene(dt, elapsed);
      renderer.render(scene, camera);

      if (prefersReducedMotion) {
        return;
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    updateScene(0.016, 0);
    renderer.render(scene, camera);
    if (!prefersReducedMotion) {
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);

      geometries.forEach((g) => g.dispose());
      brushedObsidian.dispose();
      satinTitanium.dispose();
      matteGraphite.dispose();
      crimsonAccent.dispose();
      ceramicWhite.dispose();
      opticalGlass.dispose();
      coreCageMat.dispose();
      shadowMat.dispose();
      envTarget.dispose();
      renderer.dispose();
    };
  }, []);

  if (backgroundMode) {
    return (
      <div className="relative w-full h-full">
        {webglUnavailable ? (
          <div
            data-testid="hero-3d-fallback"
            className="w-full h-full bg-gradient-to-br from-neutral-900/40 via-transparent to-[#EA0400]/15"
            aria-hidden="true"
          />
        ) : (
          <div
            ref={mountRef}
            data-testid="hero-3d-canvas"
            aria-label="Interactive 3D Digital Growth Engine sculpture"
            className="w-full h-full"
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] flex flex-col">
      {webglUnavailable ? (
        <div
          data-testid="hero-3d-fallback"
          className="w-full flex-1 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 flex flex-col items-center justify-center p-8 text-center text-white"
        >
          <div className="w-20 h-20 rounded-full border-2 border-[#EA0400] flex items-center justify-center mb-4">
            <span className="font-display font-bold text-2xl">DA</span>
          </div>
          <p className="font-display font-semibold text-lg">Digital Growth Engine</p>
          <p className="text-sm text-neutral-400 max-w-xs mt-1">
            Connected design, engineering, media, and practical AI systems.
          </p>
        </div>
      ) : (
        <div
          ref={mountRef}
          data-testid="hero-3d-canvas"
          aria-label="Interactive 3D Digital Growth Engine sculpture"
          className="w-full flex-1 min-h-[300px] sm:min-h-[380px] lg:min-h-[430px]"
        />
      )}

      {showDock && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 px-2">
          {ENGINE_NODES.map((node) => {
            const isActive = activeNode === node.key;
            return (
              <button
                key={node.key}
                type="button"
                onClick={() => onSelectNode?.(node.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#EA0400] text-white border-[#EA0400]'
                    : 'bg-white/90 dark:bg-[#111111] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-neutral-800 hover:border-[#EA0400]/60'
                }`}
              >
                {node.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Hero3D;
