
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from "sonner";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SreamJam',
  description: '스트리밍 웹서비스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{baseTheme: dark}}>
          <html lang="en">
      <body className={inter.className}>
        <ThemeProvider 
        attribute='class'
        forcedTheme='dark'
        storageKey='gamehub-theme'>
          <Toaster theme='light' position='bottom-center' />
        {children}
        </ThemeProvider>
       </body>
    </html>
    </ClerkProvider>

  )
}
