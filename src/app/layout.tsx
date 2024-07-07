import React from 'react'
import './global.scss'
import { ConfigProvider } from '@/context/config/config.context'
import { Metadata } from 'next'
import { UserProvider } from '@/context/user/user.context'
import { Main } from '@/components/main'
import { ModalProvider } from '@/context/modal/modal.context'
import { PageProvider } from '@/context/page/page.context'

export const metadata: Metadata = {
    title: 'GRIGO Training',
    description: 'Gestão de Treinos',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-br">
            <PageProvider>
                <ModalProvider>
                    <ConfigProvider>
                        <UserProvider>
                            <Main>{children}</Main>
                        </UserProvider>
                    </ConfigProvider>
                </ModalProvider>
            </PageProvider>
        </html>
    )
}
