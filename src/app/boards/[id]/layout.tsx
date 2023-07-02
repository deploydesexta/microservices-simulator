import 'bootstrap/dist/css/bootstrap.css';
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Microservices Simulator',
  description: 'Microservices architecture simulator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={[inter.className, 'light-theme', 'overflow-y-hidden'].join(' ')}>{children}</body>
    </html>
  )
}
