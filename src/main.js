function bootstrapDemo() {
  const scene = document.querySelector('#vr-scene');
  const sky = document.querySelector('#sky');
  const enterVrButton = document.querySelector('#enter-vr-btn');
  const scene1Button = document.querySelector('#scene-1-btn');
  const scene2Button = document.querySelector('#scene-2-btn');
  const hotspots = Array.from(document.querySelectorAll('.hotspot'));

  if (!scene || !sky || !enterVrButton || !scene1Button || !scene2Button) {
    return;
  }

  const sceneMap = {
    scene1: '#scene1',
    scene2: '#scene2',
  };

  let currentScene = 'scene1';
  let transitionToken = 0;

  function setActive(sceneKey) {
    [scene1Button, scene2Button].forEach((button) => {
      const isActive = button.dataset.scene === sceneKey;
      button.setAttribute('data-active', isActive ? 'true' : 'false');
    });

    hotspots.forEach((hotspot) => {
      const isActive = hotspot.dataset.scene === sceneKey;
      hotspot.setAttribute('color', isActive ? '#00ffbf' : hotspot.dataset.colorDefault || '#36c3ff');
    });
  }

  function switchScene(sceneKey) {
    const skyAsset = sceneMap[sceneKey];
    if (!skyAsset || sceneKey === currentScene) {
      return;
    }

    const token = ++transitionToken;
    currentScene = sceneKey;

    const revealSky = () => {
      if (token !== transitionToken) {
        return;
      }

      sky.setAttribute('visible', 'true');
    };

    sky.addEventListener('materialtextureloaded', revealSky, { once: true });

    sky.setAttribute('visible', 'false');
    sky.setAttribute('src', skyAsset);

    window.setTimeout(revealSky, 700);
    setActive(sceneKey);
  }

  enterVrButton.addEventListener('click', () => {
    if (scene.is('vr-mode')) {
      return;
    }

    scene.enterVR();
  });

  scene1Button.addEventListener('click', () => switchScene('scene1'));
  scene2Button.addEventListener('click', () => switchScene('scene2'));

  hotspots.forEach((hotspot) => {
    hotspot.dataset.colorDefault = hotspot.getAttribute('color') || '#36c3ff';
    hotspot.addEventListener('click', (event) => {
      const targetScene = event.currentTarget?.dataset?.scene;
      switchScene(targetScene);
    });
  });

  sky.setAttribute('visible', 'true');
  sky.setAttribute('src', sceneMap[currentScene]);
  setActive(currentScene);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapDemo);
} else {
  bootstrapDemo();
}