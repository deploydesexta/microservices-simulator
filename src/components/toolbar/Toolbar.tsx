import { HelpCircle } from 'lucide-react';
import styles from './Toolbar.module.css';
import Library from './Library';

function Toolbar() {
  return (
    <div className={[styles.toolbar, 'd-flex', 'justify-content-between'].join(' ')}>
      <div className="d-flex ms-2 align-items-center text-white text-decoration-none">
        <Library />
      </div>

      <div className="d-flex align-items-center text-white text-decoration-none">
        <span className="fs-6">Microservices Simulator</span>
      </div>

      <div className="d-flex me-2 align-items-center text-white text-decoration-none">
        <HelpCircle width={24} />
      </div>
    </div>
  )
}

export default Toolbar;
