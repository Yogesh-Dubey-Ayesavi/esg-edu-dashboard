import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './global.css'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ESG-Edu',
  description: 'Smart India Hackathon 2023',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Sidebar>
      {children}
      <Toaster />
      </Sidebar>
      </body>
    </html>
  )
}
