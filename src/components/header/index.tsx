'use client'

import style from './index.module.scss'
import Link from 'next/link'
import Icon from '@/components/icon'
import Button from '@/components/button'
import { usePathname, useRouter } from 'next/navigation'
import { useContext } from 'react'
import { UserContext } from '@/context/user/user.context'
import { useMessage } from '@/hook/message'

const Header = () => {
    const { status, currentUser, logout } = useContext(UserContext)
    const message = useMessage()
    const router = useRouter()
    const pathname = usePathname()

    return (
        <header className={style.header}>
            <Link href={!!currentUser ? '/private' : '/'}>
                <Icon icon="fitness_center" /> GRIGO Training
            </Link>
            <div className={style.space} />
            {status !== 'LOADING' &&
                !['/login', '/signin', '/recover'].includes(pathname) && (
                    <>
                        {!currentUser ? (
                            <Button
                                icon="login"
                                onClick={() => {
                                    router.push('/login')
                                }}
                            >
                                Entrar / Cadastrar-se
                            </Button>
                        ) : (
                            <>
                                <Button
                                    icon="person"
                                    className={style.userButton}
                                    disabled={true}
                                >
                                    {currentUser?.full_name}
                                </Button>
                                <Button
                                    icon="logout"
                                    onClick={() => {
                                        message.question(
                                            'Saindo de sua conta',
                                            'Deseja realmente sair da sua conta? Todas as operações não salvar serão perdidas.',
                                            () => {
                                                logout()
                                            }
                                        )
                                    }}
                                />
                            </>
                        )}
                    </>
                )}
        </header>
    )
}

export default Header
