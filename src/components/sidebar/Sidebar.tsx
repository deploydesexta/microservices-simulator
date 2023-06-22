import Management from '../management/Management';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.bar}>
      <Management />
    </div>
  )
}


export default Sidebar;
