'use client'

import style from './page.module.scss'
import { FieldText } from '@/components/field/text'
import Button from '@/components/button'
import Link from 'next/link'
import { API } from '@/settings/AxiosSettings'
import { useState } from 'react'

const LoginPage = () => {
    const [error, setError] = useState<string | null>(null)
    const loginClickHandler = async () => {
        setError(null)
        await new Promise((res) => setTimeout(() => res(true), 3000))

        try {
            await API.post('/user/login', {
                email: '',
                password: '',
            })
        } catch (error: any) {
            if (
                error?.response?.status === 400 &&
                error?.response?.data?.type === 'single'
            ) {
                setError(error?.response?.data?.errors?.message)
            }
        }
    }

    return (
        <div className={style.loginPage}>
            <div className={style.modal}>
                <section className={style.login}>
                    <h1>Entre na sua conta</h1>
                    <FieldText label="E-mail" />
                    <FieldText label="Senha" type="password" />
                    {error && <small className={style.error}>{error}</small>}
                    <div className={style.separator} />
                    <Link href="/forgotPassword">Esqueci minha senha</Link>
                    <Button
                        leftIcon="login"
                        onAsyncClick={async () => await loginClickHandler()}
                    >
                        Entrar
                    </Button>
                </section>
                <hr data-text="ou crie um novo cadastro" />
                <section className={style.signin}>
                    <Button leftIcon="person">Cadastrar-se</Button>
                </section>
            </div>
            <small>Todos os Direitos Reservados. GRIGO 2024</small>
        </div>
    )
}

export default LoginPage
