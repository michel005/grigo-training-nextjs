import React from 'react'
import './global.scss'
import Header from '@/components/header'
import axios, { Axios } from 'axios'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-br">
            <body>
                <Header />
                <main>{children}</main>
            </body>
        </html>
    )
}
