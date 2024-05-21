import Main from '@/components/main'
import Provider from '@/components/provider'
import type { Metadata } from 'next'
import React from 'react'
import '../styles/global.scss'

export const metadata: Metadata = {
    title: 'Meu Bazar Online',
    description: 'Gestão de Bazar Online',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-br">
            <body>
                <Provider>
                    <Main>{children}</Main>
                </Provider>
            </body>
        </html>
    )
}
