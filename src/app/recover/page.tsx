'use client'

import style from './page.module.scss'
import { FieldText } from '@/components/field/text'
import Button from '@/components/button'
import { API } from '@/settings/axios.settings'
import { useEffect, useState } from 'react'
import { useForm } from '@/hook/form'
import { useRouter } from 'next/navigation'
import { ErrorType } from '@/types/error.type'
import { Modal } from '@/components/modal'
import { RecoverType } from '@/types/recover.type'
import { Form } from '@/components/form'

const RecoverPage = () => {
    const router = useRouter()
    const recoverForm = useForm<RecoverType>('recover')
    const [error, setError] = useState<ErrorType | null>(null)

    const createUserClickHandler = async () => {
        setError(null)
        try {
            await API.post('/user/recover', {
                email: recoverForm.form.email || '',
                phone: recoverForm.form.phone || '',
            })
        } catch (e: any) {
            setError(e.response.data)
        }
    }

    useEffect(() => {
        recoverForm.updatePrev(() => ({
            email: '',
        }))
    }, [])

    return (
        <Modal
            className={style.recoverPage}
            backgroundVariant="gradient"
            size="small"
        >
            <Form formName="recover" errors={error}>
                <div className={style.title}>
                    <h1>Recuperando seu acesso</h1>
                    <small>
                        Informe seu endereço de e-mail e sua data de
                        aniversário, e lhe enviaremos instruções de como
                        recuperar seu acesso.
                    </small>
                </div>
                <FieldText label="E-mail" formField="email" />
                <FieldText label="Telefone" formField="phone" mask="phone" />
                <Button
                    leftIcon="person_add"
                    onAsyncClick={createUserClickHandler}
                >
                    Enviar Instruções de Recuperação
                </Button>
            </Form>
            <section className={style.returnToLogin}>
                <Button
                    leftIcon="login"
                    onClick={() => {
                        router.push('/login')
                    }}
                >
                    Voltar ao Login
                </Button>
            </section>
        </Modal>
    )
}

export default RecoverPage
