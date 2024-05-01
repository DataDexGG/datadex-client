import './styles/globals.css'

export const metadata = {
  title: 'DataDex',
  description: 'Management Panel - StarWars Galaxy of Heroes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}
