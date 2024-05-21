'use client'

import UserBusiness from '@/business/user.business'
import DateField from '@/components/field/dateField'
import Field from '@/components/field/field'
import PictureField from '@/components/field/pictureField'
import SelectField from '@/components/field/selectField'
import FormLayout from '@/components/layout/formLayout'
import HeaderTabsContent from '@/components/layout/headerTabsContent'
import Path from '@/components/path'
import { AllPages } from '@/constants/pageDefinition'
import useForm from '@/hooks/useForm'
import { UserType } from '@/types/UserType'
import { useEffect, useState } from 'react'
import NumberField from '@/components/field/numberField'

const MyUserPage = () => {
    const currentUserForm = useForm<UserType>('currentUserForm')
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        UserBusiness.me()
            .then((response) => {
                currentUserForm.update(response)
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <Path values={[AllPages.dashboard, AllPages.myUser]} />
            <HeaderTabsContent
                header={{
                    picture: (
                        <PictureField
                            variant="circle"
                            formField="currentUserForm|picture"
                            size={150}
                        />
                    ),
                    title: currentUserForm.value?.full_name || '',
                    description: currentUserForm.value?.email,
                    details: [
                        ['Cadastro', currentUserForm.value?.created],
                        ['Atualização', currentUserForm.value?.updated],
                        ['Telefone', currentUserForm.value?.phone],
                    ],
                }}
                tabs={{
                    details: {
                        label: 'Detalhes',
                        icon: 'description',
                    },
                    address: {
                        label: 'Endereço',
                        icon: 'map',
                    },
                    settings: {
                        label: 'Configurações',
                        icon: 'settings',
                    },
                }}
                loading={loading}
            >
                {(current) => {
                    if (current === 'details') {
                        return (
                            <FormLayout>
                                <FormLayout flexDirection="row">
                                    <Field
                                        loading={loading}
                                        label="Nome Completo"
                                        formField="currentUserForm|full_name"
                                    />
                                    <Field
                                        loading={loading}
                                        label="E-mail"
                                        formField="currentUserForm|email"
                                    />
                                </FormLayout>
                                <FormLayout flexDirection="row">
                                    <DateField
                                        loading={loading}
                                        label="Data de Nascimento"
                                        formField="currentUserForm|birthday"
                                    />
                                    <Field
                                        loading={loading}
                                        label="Telefone"
                                        formField="currentUserForm|phone"
                                    />
                                </FormLayout>
                                <FormLayout flexDirection="row">
                                    <SelectField
                                        loading={loading}
                                        label="Tipo de Pessoa"
                                        formField="currentUserForm|person_type"
                                        options={[
                                            ['PF', 'Física'],
                                            ['PJ', 'Jurídica'],
                                        ]}
                                    />
                                    <SelectField
                                        loading={loading}
                                        label="Tipo de Documento"
                                        formField="currentUserForm|document_type"
                                        options={[
                                            ['RG', 'RG'],
                                            ['CPF', 'CPF'],
                                            ['CNPJ', 'CNPJ'],
                                        ]}
                                    />
                                    <Field
                                        loading={loading}
                                        mask={
                                            currentUserForm.value?.document_type?.toLowerCase() as any
                                        }
                                        label="Documento"
                                        formField="currentUserForm|document_number"
                                    />
                                </FormLayout>
                            </FormLayout>
                        )
                    }

                    if (current === 'address') {
                        return (
                            <FormLayout>
                                <Field
                                    label="CEP"
                                    formField="currentUserForm|zip_code"
                                    mask="cep"
                                />
                                <Field
                                    loading={loading}
                                    label="Nome da Rua"
                                    formField="currentUserForm|street_name"
                                />
                                <FormLayout flexDirection="row">
                                    <Field
                                        loading={loading}
                                        label="Número"
                                        formField="currentUserForm|street_number"
                                    />
                                    <Field
                                        loading={loading}
                                        label="Complemento"
                                        formField="currentUserForm|complement"
                                    />
                                </FormLayout>
                                <Field
                                    loading={loading}
                                    label="Bairro"
                                    formField="currentUserForm|neighborhood"
                                />
                                <FormLayout flexDirection="row">
                                    <Field
                                        loading={loading}
                                        label="Cidade"
                                        formField="currentUserForm|city"
                                    />
                                    <Field
                                        loading={loading}
                                        label="Estado"
                                        formField="currentUserForm|state"
                                    />
                                    <Field
                                        loading={loading}
                                        label="País"
                                        formField="currentUserForm|country"
                                    />
                                </FormLayout>
                            </FormLayout>
                        )
                    }

                    if (current === 'settings') {
                        return (
                            <FormLayout>
                                <NumberField
                                    loading={loading}
                                    label="Porcentagem de Comissão"
                                    formField="currentUserForm|commission_percentage"
                                    info="Utilizado caso não informe uma comissão para o cliente"
                                />
                            </FormLayout>
                        )
                    }
                    return <></>
                }}
            </HeaderTabsContent>
        </>
    )
}

export default MyUserPage
