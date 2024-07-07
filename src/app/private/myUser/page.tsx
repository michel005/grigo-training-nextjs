'use client'

import { useContext, useEffect } from 'react'
import { UserContext } from '@/context/user/user.context'
import { FieldText } from '@/components/field/text'
import { ErrorType } from '@/types/error.type'
import { useForm } from '@/hook/form'
import { UserType } from '@/types/user.type'
import { Form, FormRow } from '@/components/form'
import { FieldFake } from '@/components/field/fake'
import Page from '@/components/page'

const MyUserPage = () => {
    const { currentUser, me } = useContext(UserContext)
    const myUserForm = useForm<UserType>('myUser')
    const myUserErrorForm = useForm<ErrorType | null>('myUserError')

    useEffect(() => {
        if (currentUser) {
            myUserForm.updatePrev(() => JSON.parse(JSON.stringify(currentUser)))
        }
    }, [currentUser])

    return (
        <Page
            header={{
                header: 'Meu Usuário',
                pictures: [
                    'https://saude.sesisc.org.br/wp-content/uploads/sites/13/2023/09/Beneficios-de-fazer-academia-Para-sua-saude-e-seu-corpo-scaled.jpg',
                ],
            }}
        >
            <Form formName="myUser" errors={myUserErrorForm.form}>
                <FormRow>
                    <FieldFake label="E-mail" formField="email" />
                    <FieldText
                        label="Nome Completo"
                        formField="full_name"
                        placeholder="Ex: João da Silva"
                    />
                </FormRow>
                <FormRow>
                    <FieldText
                        label="Telefone"
                        formField="phone"
                        mask="phone"
                    />
                    <FieldText
                        label="Data de Nascimento"
                        formField="birthday"
                        mask="date"
                    />
                </FormRow>
            </Form>
        </Page>
    )
}

export default MyUserPage
