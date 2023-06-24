'use client';
import { useState } from 'react';
import { Library, PanelLeftClose } from 'lucide-react';
import styles from './Sidebar.module.css';
import Services from './services';

function Sidebar() {
  const [mousePointer, setMousePointer] = useState('');
  const [option, setOption] = useState('');

  const toggleOption = (clickedOption: string) => 
    setOption(option === clickedOption ? '' : clickedOption);

  return (
    <div>
      { option === 'components' && <Components onClose={() => setOption('')} /> }
      <div className={styles.sideBar}>
        <div className="mt-3 text-center">
          <span
            className={mousePointer === 'components' ? styles.active : ''}
            onMouseEnter={() => setMousePointer('components')}
            onMouseLeave={() => setMousePointer('')}
            onClick={() => toggleOption('components')}
          >
            <Library 
              width={mousePointer === 'components' ? 32 : 24}
              strokeWidth={1}
            />
          </span>
        </div>
      </div>
    </div>
  )
}

type ComponentsProps = {
  onClose: () => void;
};

function Components({onClose}: ComponentsProps) {
  return (
    <div className={styles.sideBarComponent}>
      <span className="pt-3 pe-3 text-end" onClick={onClose}>
        <PanelLeftClose width={32} />
      </span>
      <Services />
    </div>
  )
}

export default Sidebar;
