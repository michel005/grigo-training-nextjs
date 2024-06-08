'use client'

import style from './index.module.scss'
import Link from 'next/link'
import Icon from '@/components/icon'
import Button from '@/components/button'
import { usePathname, useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <header className={style.header}>
            <Link href="/">
                <Icon icon="fitness_center" /> GRIGO Training
            </Link>

            {pathname !== '/login' && (
                <Button
                    leftIcon="login"
                    onClick={() => {
                        router.push('/login')
                    }}
                >
                    Entrar / Cadastrar-se
                </Button>
            )}
        </header>
    )
}

export default Header
