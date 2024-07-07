'use client'

import style from './index.module.scss'
import Button from '@/components/button'
import { GoogleIconType } from '@/types/googleIcon.type'
import { SidebarDefinition } from '@/constants/sidebar.definition'
import { usePathname, useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { useState } from 'react'
import { StringUtils } from '@/utils/string.utils'

const SidebarOption = ({
    icon,
    label,
    path,
    childs,
    needsAttention = false,
}: {
    icon: GoogleIconType
    label?: string
    childs?: string[]
    path: string
    needsAttention?: boolean
}) => {
    const pathname = usePathname()
    const router = useRouter()

    const currentPath =
        StringUtils.comparePaths(pathname, `/private${path}`) ||
        (childs || []).filter((x) =>
            StringUtils.comparePaths(pathname, `/private${x}`)
        ).length > 0

    return (
        <Button
            title={label}
            icon={icon}
            onClick={() => {
                router.push(`/private${path}`)
            }}
            className={clsx(currentPath && style.currentOption)}
            bag={needsAttention && <span className={style.attention} />}
        />
    )
}

const Sidebar = () => {
    const [show, setShow] = useState<boolean>(true)
    const pathName = usePathname()

    const allOptions = Object.keys(SidebarDefinition).map(
        (x) => SidebarDefinition[x]
    )
    const currentOption = allOptions.find((x) =>
        StringUtils.comparePaths(pathName, `/private${x.path}`)
    )

    return (
        <aside
            className={clsx(style.sidebar, !show && style.hideOptionsContent)}
        >
            <div className={style.menu}>
                <Button
                    icon="fitness_center"
                    className={clsx(style.currentOption, style.appLogo)}
                />
                <hr />
                {allOptions
                    .filter((x) => !x.hide)
                    .map((page) => {
                        return (
                            <SidebarOption
                                key={page.path}
                                icon={page.icon}
                                label={page.label}
                                path={page.path}
                                childs={page.childs}
                            />
                        )
                    })}
                <div className={style.grow} />
                <SidebarOption
                    {...SidebarDefinition.notifications}
                    needsAttention={true}
                />
                <SidebarOption {...SidebarDefinition.myUser} />
                <Button
                    icon={show ? 'menu_open' : 'menu'}
                    onClick={() => {
                        setShow((x) => !x)
                    }}
                />
            </div>
            <div className={style.subMenu}>
                <div className={style.appName}>
                    <h3>Grigo Training</h3>
                    <small>Gestão de Treinos</small>
                </div>
                {currentOption?.label && <h5>{currentOption?.label}</h5>}
                {currentOption?.sidebar}
            </div>
        </aside>
    )
}

export default Sidebar
