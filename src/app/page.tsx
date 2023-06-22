import styles from './page.module.css'
import Propsbar from '@/components/propsbar/Propsbar'
import Sidebar from '@/components/sidebar/Sidebar'
import Toolbar from '@/components/toolbar/Toolbar'
import Whiteboard from '@/components/whiteboard/Whiteboard'

export default function Home() {
  return (
    <main className={styles.main}>
      <Whiteboard />
      <Toolbar />
      <Sidebar />
      <Propsbar />
    </main>
  )
}
