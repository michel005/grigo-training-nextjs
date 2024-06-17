'use client'

import React, { useContext } from 'react'
import { UserContext } from '@/context/user/user.context'
import Header from '@/components/header'
import Loading from '@/components/loading'

export const Main = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const { status } = useContext(UserContext)
    return (
        <body>
            <Header />
            {status === 'LOADING' ? <Loading /> : <main>{children}</main>}
        </body>
    )
}
