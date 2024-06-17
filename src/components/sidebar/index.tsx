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
            leftIcon={icon}
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
            <div
                className={style.background}
                style={{
                    backgroundImage: `url(https://i.pinimg.com/564x/3f/6d/9b/3f6d9bd2c86f6a46e8436aa3d271694c.jpg)`,
                }}
            />
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
                leftIcon={show ? 'menu_open' : 'menu'}
                className={style.showButton}
                onClick={() => {
                    setShow((x) => !x)
                }}
            />
        </aside>
    )
}

export default Sidebar
