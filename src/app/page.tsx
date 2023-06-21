import styles from './page.module.css'
import Management from '@/components/management/Management'
import Whiteboard from '@/components/whiteboard/Whiteboard'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="mt-5">
        <div className="container-fluid">
          <div className="row">
            <h1>Microservices Simulator</h1>
          </div>
          <div className="row mt-5">
            <div className="col-12 col-md-4">
              <Management />
            </div>
            <div className="col-12 col-md-8">
              <Whiteboard />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
