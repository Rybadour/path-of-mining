import Modal from 'react-modal';
import { useCallback, useState } from 'react';
import { pick } from 'lodash';
import shallow from 'zustand/shallow';

import Icon from '../../shared/components/icon';
import HelpModal from './help-modal';
import { STANDARD_MODAL_STYLE } from '../../shared/constants';
import useStore from '../../store';

import './header.scss';
import { Scene } from '../../store/scenes';
import classNames from 'classnames';

Modal.setAppElement('#root');

function Header() {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);

  const scenes = useStore(s => pick(
    s.scenes, [ 'currentScene', 'switchScene' ]
  ), shallow);
  
  const onSwitchScene = useCallback((scene) => {
    scenes.switchScene(scene);
  }, [scenes.switchScene]);

  const sceneList = [Scene.Mining];

  return <>
    <header>
      <h1>Path of Mining</h1>

      <div className="options">
        <button className="no-style" onClick={() => setIsHelpModalOpen(true)} data-tip="Help">
          <Icon size="sm" icon="help" />
        </button>
        <button className="no-style" onClick={() => setIsOptionsModalOpen(true)} data-tip="Options">
          <Icon size="sm" icon="settings-knobs" />
        </button>
      </div>

      <Modal
        isOpen={isHelpModalOpen}
        onRequestClose={() => setIsHelpModalOpen(false)}
        style={STANDARD_MODAL_STYLE}
        contentLabel="Help Tips"
        className="help-modal-content center-modal header-modal"
      >
        <HelpModal />
      </Modal>
      
    </header>
    <div className="scene-tabs">
      {sceneList.map(s =>
        <button
          key={s}
          className={classNames({current: s === scenes.currentScene})}
          onClick={() => onSwitchScene(s)}
        >{s}</button>
      )}
    </div>
  </>;
}

/* *
      <Modal
        isOpen={isOptionsModalOpen}
        onRequestClose={() => setIsOptionsModalOpen(false)}
        style={STANDARD_MODAL_STYLE}
        contentLabel="Options"
        className="options-modal-content center-modal header-modal"
      >
        <OptionsModal />
      </Modal>
/* */

export default Header;