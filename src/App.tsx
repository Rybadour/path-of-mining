import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";

import Header from './components/header/header';
import ReactTooltip from 'react-tooltip';
import useStore from './store';

import './App.scss';
import { Scene } from './store/scenes';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import MiningScene from './components/mining/mining-scene';
import { TutorialModal } from './components/tutorial-modal';

function App() {
  const [isTutorialOpen, setIsTutorialOpen] = useState(true);

  return (
    <div className="App">
      <Header />

      <Content />

      <ReactTooltip place="bottom" effect="solid" className="standard-tooltip" />

      <footer>
        <div className="attribution">
          Game icons provided by <a href="https://game-icons.net/">game-icons.net</a>
          under <a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.
        </div>
      </footer>

      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
    </div>
  );
}

let lastTime: number = Date.now();
function Content() {
  const scene = useStore(s => s.scenes.currentScene);

  const updateSaving = useStore(s => s.mining.update);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - lastTime;
      lastTime = Date.now();
      updateSaving(elapsed);
    }, 100);

    return () => clearInterval(interval);
  }, [updateSaving]);

  const sceneMap: Record<Scene, ReactJSXElement> = {
    [Scene.Mining]: <MiningScene />,
  }

  return <div className="content">
    {sceneMap[scene]}
  </div>;
}

export default App;
