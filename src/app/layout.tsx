import "@/styles/theme.scss"
import "@/styles/index.scss"
import { Body, ThemeProviderWrapper } from '@/comps/Theme'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/context/ThemeContext"
import { DropdownProvider } from "@/context/DropdownContext"

export const metadata: Metadata = {
  title: 'Nexus Admin',
  description: 'Admin Panel created by Void Studios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProviderWrapper>
        <DropdownProvider>
          {children}
        </DropdownProvider>
      </ThemeProviderWrapper>
    </html>
  )
}
