'use client'

import PageDefinition from '@/constants/pageDefinition'
import { SessionContext } from '@/store/session.context'
import { StringUtils } from '@/utils/stringUtils'
import { usePathname, useRouter } from 'next/navigation'
import { useContext } from 'react'
import Button from './button'
import FlexRow from './layout/flexRow'
import Picture from './picture'
import { Icon } from '@/components/icon'
import { AppInfo } from '@/constants/appInfo'

const Navbar = () => {
    const { currentUser } = useContext(SessionContext)
    const router = useRouter()
    const pathname = usePathname()

    if (!!currentUser) {
        return (
            <div className="componentNavbar">
                <Button
                    className="componentNavbar__menuButton"
                    onClick={() => router.push('/')}
                    variant="link"
                    leftSpace={<Icon>menu</Icon>}
                />
                <h3>{AppInfo.title}</h3>
                <FlexRow className="componentNavbar__navbarOptions">
                    {PageDefinition.filter((page) => !page.hide).map(
                        (page, pageKey) => (
                            <Button
                                key={pageKey}
                                className={
                                    pathname === page.path ||
                                    (page.child || []).find((x) =>
                                        StringUtils.comparePaths(pathname, x)
                                    )
                                        ? 'componentNavbar__activeMenu'
                                        : ''
                                }
                                onClick={() => {
                                    router.push(page.path)
                                }}
                                variant="link"
                            >
                                {page.name}
                            </Button>
                        )
                    )}
                </FlexRow>
                <Picture
                    alt={currentUser?.full_name}
                    picture={currentUser?.picture?.value}
                    size={42}
                    variant="circle"
                />
            </div>
        )
    }

    return (
        <div className="componentNavbar">
            <Button
                className="componentNavbar__menuButton"
                onClick={() => router.push('/')}
                variant="link"
                leftSpace={<Icon>menu</Icon>}
            />
            <h3>{AppInfo.title}</h3>
            <Button onClick={() => router.push('/login')}>
                Entrar / Cadastrar-se
            </Button>
        </div>
    )
}

export default Navbar
