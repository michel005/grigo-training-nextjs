'use client'

import UserBusiness from '@/business/user.business'
import Background from '@/components/layout/background'
import Button from '@/components/button'
import FlexRow from '@/components/layout/flexRow'
import FormLayout from '@/components/layout/formLayout'
import Field from '@/components/field/field'
import usePage from '@/hooks/usePage'
import { SessionContext } from '@/store/session.context'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import style from './page.module.scss'

const LoginPage = () => {
    const router = useRouter()
    const { setCurrentUser } = useContext(SessionContext)
    const [status, setStatus] = useState<'iddle' | 'loading' | 'error'>('iddle')
    const { loginForm, loginFormError, signinForm, signinFormError } = usePage(
        'loginForm',
        'loginFormError',
        'signinForm',
        'signinFormError'
    )

    return (
        <>
            <Background className={`${style.background}`} center={true}>
                <FormLayout className={style.loginPage}>
                    <h3>Entrar na sua conta</h3>
                    <FormLayout>
                        <Field
                            label="Nome de Usuário"
                            formField="loginForm|user_name"
                            disabled={status === 'loading'}
                        />
                        <Field
                            type="password"
                            label="Senha de Acesso"
                            formField="loginForm|password"
                            disabled={status === 'loading'}
                        />
                        <Button
                            style={{ justifyContent: 'center' }}
                            disabled={status === 'loading'}
                            onClick={() => {
                                setStatus('loading')
                                loginFormError.clear()
                                UserBusiness.login({
                                    user_name: loginForm.value?.user_name,
                                    password: loginForm.value?.password,
                                })
                                    .then((response) => {
                                        loginForm.clear()
                                        setCurrentUser(response.user)
                                        localStorage.setItem(
                                            'auth_token',
                                            response.token
                                        )
                                        router.push('/')
                                        router.refresh()
                                    })
                                    .catch((errors) => {
                                        if (errors.message) {
                                            loginFormError.updateProp(
                                                'user_name',
                                                errors
                                            )
                                        }
                                        setStatus('error')
                                    })
                            }}
                        >
                            Entrar
                        </Button>
                        <FlexRow className={style.commands}>
                            <Button
                                variant="link"
                                onClick={() => {}}
                                disabled={status === 'loading'}
                            >
                                Esqueceu sua senha?
                            </Button>
                            <Button
                                variant="link"
                                disabled={status === 'loading'}
                                onClick={() => {
                                    signinForm.clear()
                                    signinFormError.clear()
                                    router.push('/signin')
                                }}
                            >
                                Cadastre-se
                            </Button>
                        </FlexRow>
                    </FormLayout>
                </FormLayout>
            </Background>
        </>
    )
}

export default LoginPage
