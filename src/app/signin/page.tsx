'use client'

import style from './page.module.scss'
import { FieldText } from '@/components/field/text'
import Button from '@/components/button'
import { API } from '@/settings/axios.settings'
import { useEffect, useState } from 'react'
import { useForm } from '@/hook/form'
import { UserType } from '@/types/user.type'
import { useRouter } from 'next/navigation'
import { ErrorType } from '@/types/error.type'
import { Modal } from '@/components/modal'
import { Form } from '@/components/form'

const SignInPage = () => {
    const router = useRouter()
    const signinForm = useForm<UserType>('signin')
    const [error, setError] = useState<ErrorType | null>(null)

    const createUserClickHandler = async () => {
        setError(null)
        try {
            await API.post('/user', {
                full_name: signinForm.form.full_name || '',
                email: signinForm.form.email || '',
                phone: signinForm.form.phone || '',
                password: signinForm.form.password || '',
                birthday: signinForm.form.birthday || '',
            })
            router.push('/login')
        } catch (e: any) {
            setError(e.response.data)
        }
    }

    useEffect(() => {
        signinForm.updatePrev(() => ({
            full_name: '',
            email: '',
            phone: '',
            birthday: '',
            password: '',
        }))
    }, [])

    return (
        <Modal
            className={style.signinPage}
            backgroundVariant="gradient"
            size="small"
        >
            <Form className={style.form} formName="signin" errors={error}>
                <div className={style.title}>
                    <h1>Crie seu usuário</h1>
                    <small>
                        E tenha acesso a todas as funcionalidades do GRIGO
                        Training
                    </small>
                </div>
                <FieldText
                    label="Nome Completo"
                    formField="full_name"
                    placeholder="Ex: João da Silva"
                />
                <FieldText label="Telefone" formField="phone" mask="phone" />
                <FieldText
                    label="Data de Nascimento"
                    formField="birthday"
                    mask="date"
                />
                <FieldText
                    label="E-mail"
                    formField="email"
                    placeholder="Ex: joaosilva@yahoo.com"
                />
                <FieldText
                    label="Senha"
                    formField="password"
                    type="password"
                    placeholder="Use letras, números e caracteres especiais"
                />
                <div className={style.separator} />
                <Button
                    leftIcon="person_add"
                    onAsyncClick={createUserClickHandler}
                >
                    Cadastrar
                </Button>
            </Form>
            <hr data-text="Já possui um usuário?" />
            <section className={style.login}>
                <Button leftIcon="login" onClick={() => router.push('/login')}>
                    Entrar
                </Button>
            </section>
        </Modal>
    )
}

export default SignInPage
