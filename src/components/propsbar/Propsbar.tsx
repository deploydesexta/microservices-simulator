'use client';
import Forms from '../management/forms';
import styles from './Propsbar.module.css';

function Propsbar() {
  return (
    <div className={styles.propsbarContainer}>
      <div className={styles.propsbar}>
        <div className="container">
          <Forms className="mt-3" />
        </div>
      </div>
    </div>
  )
}


export default Propsbar;