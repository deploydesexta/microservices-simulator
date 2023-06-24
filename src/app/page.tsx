import { Suspense } from "react";
import dynamic from 'next/dynamic'
import Propsbar from '@/components/propsbar/Propsbar'
import Sidebar from '@/components/sidebar/Sidebar'
import Toolbar from '@/components/toolbar/Toolbar'
import Dialog from '@/components/ui-kit/dialog/Dialog'
import styles from './page.module.css'

const Whiteboard = dynamic(() => import('@/components/whiteboard/Whiteboard'), { ssr: false });

export default function Home() {
  return (
    <main className={styles.main}>
      <Suspense fallback={
        <div style={{position: 'absolute', left: 'var(--sidebar-width)', top: 'var(--toolbar-height)'}}>LOADING...</div>
      }>
        <Whiteboard />
      </Suspense>
      <Toolbar />
      <Sidebar />
      <Propsbar />
      <Dialog />
    </main>
  )
}
