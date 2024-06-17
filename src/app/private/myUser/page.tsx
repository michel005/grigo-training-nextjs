'use client'

import style from './page.module.scss'
import { useContext, useEffect, useMemo, useState } from 'react'
import { UserContext } from '@/context/user/user.context'
import { FieldText } from '@/components/field/text'
import { ErrorCollection, ErrorType } from '@/types/error.type'
import { useForm } from '@/hook/form'
import { UserType } from '@/types/user.type'
import { API } from '@/settings/axios.settings'
import Button from '@/components/button'
import { Form } from '@/components/form'
import { SessionUtils } from '@/utils/session.utils'

const MyUserPage = () => {
    const { currentUser, me } = useContext(UserContext)
    const myUserForm = useForm<UserType>('myUser')
    const [error, setError] = useState<ErrorType | null>(null)

    const saveFormClickHandler = async () => {
        setError(null)
        try {
            await API.put(
                '/user',
                {
                    full_name: myUserForm.form.full_name,
                    birthday: myUserForm.form.birthday,
                    phone: myUserForm.form.phone,
                },
                SessionUtils.tokenHeader()
            )
            await me()
        } catch (error: any) {
            setError(error.response.data)
        }
    }

    useEffect(() => {
        if (currentUser) {
            myUserForm.updatePrev(() => JSON.parse(JSON.stringify(currentUser)))
        }
    }, [currentUser])

    return (
        <div className={style.private}>
            <h1>Meu Usuário</h1>
            <Form formName="myUser" errors={error}>
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
            </Form>
            <div className={style.buttons}>
                <Button leftIcon="save" onAsyncClick={saveFormClickHandler}>
                    Salvar
                </Button>
            </div>
        </div>
    )
}

export default MyUserPage
