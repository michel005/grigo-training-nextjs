'use client'

import React, { useContext, useEffect } from 'react'
import Sidebar from '@/components/sidebar'
import style from './layout.module.scss'
import { UserContext } from '@/context/user/user.context'
import { usePathname, useRouter } from 'next/navigation'
import { TrainingModal } from '@/modal/training'
import { ModalContext } from '@/context/modal/modal.context'
import { ExerciseModal } from '@/modal/exercise'
import { MessageModal } from '@/modal/message'

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const { allModals } = useContext(ModalContext)
    const { status, currentUser } = useContext(UserContext)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (
            status === 'DONE' &&
            !currentUser &&
            !['/login', '/recover', '/', '/signin'].includes(pathname)
        ) {
            router.push('/')
        }
    }, [status, currentUser])

    return (
        <div className={style.layout}>
            <Sidebar />
            <section>
                {children}

                {allModals.get('training.form') && <TrainingModal />}
                {allModals.get('exercise.form') && <ExerciseModal />}
                {allModals.get('message.message') && <MessageModal />}
            </section>
        </div>
    )
}

export default Layout
