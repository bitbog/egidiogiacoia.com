import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

interface ViewerInstance {
  destroy: () => void;
  closeExpanded: () => void;
}

const activeInstances = new Set<ViewerInstance>();
let sharedBackdrop: HTMLDivElement | null = null;
let activeExpandedViewer: ViewerInstance | null = null;
let globalListenersAttached = false;

function getOrCreateBackdrop(): HTMLDivElement {
  if (sharedBackdrop && document.body.contains(sharedBackdrop)) {
    return sharedBackdrop;
  }
  const el = document.createElement('div');
  el.className = 'viewer-3d-backdrop';
  el.hidden = true;
  el.addEventListener('click', () => {
    activeExpandedViewer?.closeExpanded();
  });
  document.body.appendChild(el);
  sharedBackdrop = el;
  return el;
}

function attachGlobalListeners() {
  if (globalListenersAttached) return;
  globalListenersAttached = true;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeExpandedViewer) {
      activeExpandedViewer.closeExpanded();
    }
  });

  window.addEventListener('pagehide', () => {
    destroyModelViewers3D();
  });
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

function showViewerError(stage: HTMLElement, message: string) {
  stage.classList.add('has-error');
  const loader = stage.querySelector<HTMLElement>('[data-viewer-loader] span:last-child');
  if (loader) {
    loader.textContent = message;
  }
}

function setSphericalCamera(
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  theta: number,
  phi: number,
  distance: number
) {
  const spherical = new THREE.Spherical(distance, phi, theta);
  const pos = new THREE.Vector3().setFromSpherical(spherical);
  camera.position.copy(pos);
  controls.target.set(0, 0, 0);
  controls.update();
}

function mountViewer(stage: HTMLElement): ViewerInstance | null {
  if (stage.dataset.viewerMounted === 'true') return null;
  stage.dataset.viewerMounted = 'true';

  const canvasWrap = stage.querySelector<HTMLElement>('[data-viewer-canvas]');
  const spinBtn = stage.querySelector<HTMLButtonElement>('[data-viewer-spin]');
  const resetBtn = stage.querySelector<HTMLButtonElement>('[data-viewer-reset]');
  const expandBtn = stage.querySelector<HTMLButtonElement>('[data-viewer-expand]');

  if (!canvasWrap) return null;

  if (!isWebGLAvailable()) {
    showViewerError(stage, 'Anteprima 3D non supportata su questo browser.');
    return null;
  }

  const src = stage.dataset.src || '';
  const colorHex = stage.dataset.color || '#c9c5bc';
  const initTheta = Number.parseFloat(stage.dataset.theta || '0.35');
  const initPhi = Number.parseFloat(stage.dataset.phi || '1.35');
  const initDist = Number.parseFloat(stage.dataset.distance || '3.0');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
  } catch {
    showViewerError(stage, 'Impossibile avviare il motore 3D.');
    return null;
  }

  const maxDpr = window.innerWidth <= 768 ? 1.5 : 2;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  canvasWrap.appendChild(renderer.domElement);

  renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());

  const scene = new THREE.Scene();

  // Ambiente da studio leggero per riflessi realistici sul PLA
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const roomEnv = new RoomEnvironment();
  const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
  scene.environment = envTarget.texture;
  roomEnv.dispose();
  pmremGenerator.dispose();

  const width = Math.max(canvasWrap.clientWidth, 1);
  const height = Math.max(canvasWrap.clientHeight, 1);
  renderer.setSize(width, height, false);

  const camera = new THREE.PerspectiveCamera(36, width / height, 0.05, 50);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.enableZoom = false; // Abilitato solo quando espanso per non bloccare lo scroll pagina
  controls.minDistance = 1.45;
  controls.maxDistance = 6.2;
  controls.autoRotateSpeed = 0.9;

  let userRequestedSpin = !prefersReducedMotion;
  controls.autoRotate = userRequestedSpin;

  if (spinBtn) {
    spinBtn.classList.toggle('is-active', userRequestedSpin);
    spinBtn.setAttribute('aria-pressed', String(userRequestedSpin));
  }

  setSphericalCamera(camera, controls, initTheta, initPhi, initDist);

  // Illuminazione 3-point da studio
  const hemiLight = new THREE.HemisphereLight(0xfaf8f5, 0x3a3f47, 0.7);
  const keyLight = new THREE.DirectionalLight(0xfff5e8, 2.0);
  keyLight.position.set(3.2, 4.6, 3.8);
  const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.75);
  fillLight.position.set(-4.0, 1.8, 2.5);
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.9);
  rimLight.position.set(0.5, 3.2, -4.2);

  scene.add(hemiLight, keyLight, fillLight, rimLight);

  function syncLightingTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    hemiLight.intensity = isDark ? 0.58 : 0.75;
    keyLight.intensity = isDark ? 2.15 : 1.95;
    fillLight.intensity = isDark ? 0.85 : 0.75;
    rimLight.intensity = isDark ? 1.05 : 0.85;
  }
  syncLightingTheme();

  const themeObserver = new MutationObserver(syncLightingTheme);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });

  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(colorHex),
    roughness: 0.56,
    metalness: 0.04,
    envMapIntensity: 0.35
  });

  let loadedGroup: THREE.Object3D | null = null;
  let disposed = false;

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(
    src,
    (gltf) => {
      if (disposed) return;
      const root = gltf.scene;
      root.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.material = material;
        }
      });
      scene.add(root);
      loadedGroup = root;
      stage.classList.add('is-ready');
    },
    undefined,
    () => {
      if (disposed) return;
      showViewerError(stage, 'Errore nel caricamento del modello 3D.');
    }
  );

  let isVisible = true;
  let rafId = 0;

  const animate = () => {
    if (disposed || !isVisible) {
      rafId = 0;
      return;
    }
    rafId = window.requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  const startLoop = () => {
    if (!disposed && isVisible && rafId === 0) {
      rafId = window.requestAnimationFrame(animate);
    }
  };

  const stopLoop = () => {
    if (rafId !== 0) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
  };

  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        isVisible = entry.isIntersecting || stage.classList.contains('is-expanded');
        if (isVisible) startLoop();
        else stopLoop();
      }
    },
    { threshold: 0.01 }
  );
  visibilityObserver.observe(stage);

  const resizeObserver = new ResizeObserver(() => {
    if (disposed) return;
    const w = Math.max(canvasWrap.clientWidth, 1);
    const h = Math.max(canvasWrap.clientHeight, 1);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    renderer.render(scene, camera);
  });
  resizeObserver.observe(canvasWrap);

  // Sospende la rotazione automatica durante l'interazione diretta
  const onControlStart = () => {
    controls.autoRotate = false;
    if (spinBtn) {
      spinBtn.classList.remove('is-active');
      spinBtn.setAttribute('aria-pressed', 'false');
    }
  };
  controls.addEventListener('start', onControlStart);

  const onSpinClick = () => {
    userRequestedSpin = !controls.autoRotate;
    controls.autoRotate = userRequestedSpin;
    if (spinBtn) {
      spinBtn.classList.toggle('is-active', userRequestedSpin);
      spinBtn.setAttribute('aria-pressed', String(userRequestedSpin));
    }
  };
  spinBtn?.addEventListener('click', onSpinClick);

  const onResetClick = () => {
    setSphericalCamera(camera, controls, initTheta, initPhi, initDist);
    renderer.render(scene, camera);
  };
  resetBtn?.addEventListener('click', onResetClick);

  const closeExpanded = () => {
    if (!stage.classList.contains('is-expanded')) return;
    stage.classList.remove('is-expanded');
    controls.enableZoom = false;
    document.body.classList.remove('viewer-expanded');
    const backdrop = getOrCreateBackdrop();
    backdrop.hidden = true;
    expandBtn?.setAttribute('aria-expanded', 'false');
    expandBtn?.setAttribute('aria-label', 'Espandi modello 3D a schermo intero');
    if (activeExpandedViewer === instance) {
      activeExpandedViewer = null;
    }
  };

  const openExpanded = () => {
    if (activeExpandedViewer && activeExpandedViewer !== instance) {
      activeExpandedViewer.closeExpanded();
    }
    const backdrop = getOrCreateBackdrop();
    backdrop.hidden = false;
    stage.classList.add('is-expanded');
    controls.enableZoom = true;
    document.body.classList.add('viewer-expanded');
    expandBtn?.setAttribute('aria-expanded', 'true');
    expandBtn?.setAttribute('aria-label', 'Chiudi vista 3D espansa');
    activeExpandedViewer = instance;
    isVisible = true;
    startLoop();
  };

  const onExpandClick = () => {
    if (stage.classList.contains('is-expanded')) closeExpanded();
    else openExpanded();
  };
  expandBtn?.addEventListener('click', onExpandClick);

  const instance: ViewerInstance = {
    closeExpanded,
    destroy: () => {
      disposed = true;
      closeExpanded();
      stopLoop();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      controls.removeEventListener('start', onControlStart);
      spinBtn?.removeEventListener('click', onSpinClick);
      resetBtn?.removeEventListener('click', onResetClick);
      expandBtn?.removeEventListener('click', onExpandClick);
      controls.dispose();
      if (loadedGroup) {
        loadedGroup.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            (obj as THREE.Mesh).geometry?.dispose();
          }
        });
      }
      material.dispose();
      envTarget.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      delete stage.dataset.viewerMounted;
    }
  };

  activeInstances.add(instance);
  startLoop();
  return instance;
}

export function initModelViewers3D() {
  attachGlobalListeners();

  const stages = Array.from(document.querySelectorAll<HTMLElement>('[data-model-viewer]'));
  if (stages.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    stages.forEach((stage) => mountViewer(stage));
    return;
  }

  const lazyObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          lazyObserver.unobserve(target);
          mountViewer(target);
        }
      }
    },
    { rootMargin: '250px 0px' }
  );

  stages.forEach((stage) => {
    if (stage.dataset.viewerMounted !== 'true') {
      lazyObserver.observe(stage);
    }
  });
}

export function destroyModelViewers3D() {
  activeInstances.forEach((inst) => inst.destroy());
  activeInstances.clear();
  activeExpandedViewer = null;
}
