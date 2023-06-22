import Management from '../management/Management';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.bar}>
      {/* <Management /> */}
      <div className="mt-3 text-center">Nodes</div>
    </div>
  )
}


export default Sidebar;
