'use client'

import style from './page.module.scss'
import { FieldText } from '@/components/field/text'
import Button from '@/components/button'
import Link from 'next/link'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from '@/hook/form'
import { LoginType } from '@/types/login.type'
import { useRouter } from 'next/navigation'
import { ErrorCollection, ErrorType } from '@/types/error.type'
import { Modal } from '@/components/modal'
import Image from 'next/image'
import AvatarPicture from '../../../public/avatar.png'
import { UserContext } from '@/context/user/user.context'
import { Form } from '@/components/form'

const LoginPage = () => {
    const { login } = useContext(UserContext)
    const router = useRouter()
    const loginForm = useForm<LoginType | null>('login')
    const [error, setError] = useState<ErrorType | null>(null)
    const loginClickHandler = async () => {
        setError(null)
        try {
            await login(loginForm.form as any)
            router.push('/')
        } catch (error: any) {
            setError(error?.response?.data)
        }
    }

    useEffect(() => {
        loginForm.updatePrev(() => null)
    }, [])

    return (
        <Modal
            className={style.loginPage}
            backgroundVariant="gradient"
            size="small"
        >
            <Form className={style.login} formName="login" errors={error}>
                <Image
                    height={120}
                    width={120}
                    alt="Avatar do Usuário"
                    src={AvatarPicture}
                />
                <FieldText label="E-mail" formField="email" />
                <FieldText label="Senha" formField="password" type="password" />
                {error && error.type === 'single' && (
                    <small className={style.error}>
                        {error.errors.message as string}
                    </small>
                )}
                <Button
                    leftIcon="login"
                    onAsyncClick={async () => await loginClickHandler()}
                >
                    Entrar
                </Button>
                <Link href="/recover">Esqueci minha senha</Link>
            </Form>
            <hr data-text="Ainda não tem uma conta?" />
            <section className={style.signin}>
                <Button
                    leftIcon="person"
                    onClick={() => {
                        router.push('/signin')
                    }}
                >
                    Cadastrar-se Gratuitamente
                </Button>
            </section>
        </Modal>
    )
}

export default LoginPage
