'use client'

import style from './index.module.scss'
import Button from '@/components/button'
import { GoogleIconType } from '@/types/googleIcon.type'
import { SidebarDefinition } from '@/constants/sidebar.definition'
import { usePathname, useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { useState } from 'react'

const SidebarOption = ({
    icon,
    label,
    path,
}: {
    icon: GoogleIconType
    label?: string
    path: string
}) => {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <Button
            icon={icon}
            onClick={() => {
                router.push(`/private${path}`)
            }}
            className={clsx(
                pathname === `/private${path}` && style.currentOption
            )}
        >
            {label}
        </Button>
    )
}

const Sidebar = () => {
    const [show, setShow] = useState<boolean>(true)

    return (
        <aside
            className={clsx(style.sidebar, !show && style.hideOptionsContent)}
        >
            <div className={style.background} />
            {Object.keys(SidebarDefinition).map((pageString) => {
                const page = SidebarDefinition[pageString]
                return (
                    <SidebarOption
                        key={pageString}
                        icon={page.icon}
                        label={page.label}
                        path={page.path}
                    />
                )
            })}
            <div className={style.grow} />
            <Button
                icon={show ? 'menu_open' : 'menu'}
                className={style.showButton}
                onClick={() => {
                    setShow((x) => !x)
                }}
            />
        </aside>
    )
}

export default Sidebar
