import styles from './Toolbar.module.css';

function Toolbar() {
  return (
    <div className={[styles.toolbar, 'd-flex'].join(' ')}>
      <div className="d-flex ms-2 align-items-center text-white text-decoration-none">
        <span className="fs-6">Microservices Simulator</span>
      </div>
    </div>
  )
}


export default Toolbar;
