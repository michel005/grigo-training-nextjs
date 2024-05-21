'use client'

import AddressBusiness from '@/business/address.business'
import UserBusiness from '@/business/user.business'
import Button from '@/components/button'
import DateField from '@/components/field/dateField'
import Field from '@/components/field/field'
import PictureField from '@/components/field/pictureField'
import SelectField from '@/components/field/selectField'
import { Icon } from '@/components/icon'
import Background from '@/components/layout/background'
import FlexRow from '@/components/layout/flexRow'
import FormLayout from '@/components/layout/formLayout'
import Stepper from '@/components/stepper'
import useForm from '@/hooks/useForm'
import usePage from '@/hooks/usePage'
import { UserType } from '@/types/UserType'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import style from './page.module.scss'
import { Forms } from '@/constants/forms'

const PersonalData = () => {
    return (
        <FormLayout>
            <Field label="Nome Completo" formField="signInForm|full_name" />
            <Field label="E-mail" formField="signInForm|email" />
            <Field label="Nome de Usuário" formField="signInForm|user_name" />
            <Field
                label="Senha de Acesso"
                type="password"
                formField="signInForm|password"
            />
            <FormLayout flexDirection="row">
                <DateField
                    label="Data de Nascimento"
                    formField="signInForm|birthday"
                />
                <Field label="Telefone" formField="signInForm|phone" />
            </FormLayout>
        </FormLayout>
    )
}

const DocumentationData = () => {
    const signInForm = useForm<UserType>(Forms.signInForm)
    return (
        <FormLayout>
            <FormLayout flexDirection="row">
                <SelectField
                    label="Tipo de Pessoa"
                    formField="signInForm|person_type"
                    options={[
                        ['PF', 'Física'],
                        ['PJ', 'Jurídica'],
                    ]}
                />
                <SelectField
                    label="Tipo de Documento"
                    formField="signInForm|document_type"
                    options={[
                        ['RG', 'RG'],
                        ['CPF', 'CPF'],
                        ['CNPJ', 'CNPJ'],
                    ]}
                />
            </FormLayout>
            <Field
                mask={signInForm.value?.document_type?.toLowerCase() as any}
                label="Documento"
                formField="signInForm|document_number"
            />
        </FormLayout>
    )
}

const AddressData = () => {
    const signinForm = useForm<UserType>(Forms.signInForm)
    return (
        <FormLayout>
            <Field
                label="CEP"
                formField="signInForm|zip_code"
                mask="cep"
                rightSpace={
                    <Button
                        rightSpace={<Icon>search</Icon>}
                        variant="ghost"
                        onClick={() => {
                            AddressBusiness.byZipCode(
                                signinForm.value?.zip_code?.padStart(7, '0') ||
                                    ''
                            ).then((response) => {
                                signinForm.value = {
                                    ...signinForm.value,
                                    ...response,
                                }
                                signinForm.update(signinForm.value)
                            })
                        }}
                    >
                        Buscar
                    </Button>
                }
            />
            <Field label="Nome da Rua" formField="signInForm|street_name" />
            <FormLayout flexDirection="row">
                <Field label="Número" formField="signInForm|street_number" />
                <Field label="Complemento" formField="signInForm|complement" />
            </FormLayout>
            <Field label="Bairro" formField="signInForm|neighborhood" />
            <FormLayout flexDirection="row">
                <Field label="Cidade" formField="signInForm|city" />
                <Field label="Estado" formField="signInForm|state" />
                <Field label="País" formField="signInForm|country" />
            </FormLayout>
        </FormLayout>
    )
}

const UserPictureData = () => {
    return (
        <FlexRow style={{ justifyContent: 'center' }}>
            <PictureField formField="signInForm|picture" variant="circle" />
        </FlexRow>
    )
}

const steps = [
    {
        label: 'Usuário',
        content: () => <PersonalData />,
        description:
            'Informe os dados necessários para identificar seu usuário',
    },
    {
        label: 'Documentação',
        content: () => <DocumentationData />,
        description:
            'É opcional, mas você pode informar um documento para que seja possível gerar recibos e notas',
    },
    {
        label: 'Endereço',
        content: () => <AddressData />,
        description:
            'Com o seu endereço, seus clientes recebem uma nota fiscal mais completa, gerando mais confiança em seus produtos e serviços',
    },
    {
        label: 'Imagem',
        content: () => <UserPictureData />,
        description:
            'Identifique seu bazar com uma logo ou imagem. Ao clicar em "Cadastrar" você conclui o cadastro o seu usuário.',
    },
]

const SignInPage = () => {
    const router = useRouter()
    const { loginForm, signInForm, signInFormError } = usePage(
        Forms.loginForm,
        Forms.signInForm,
        Forms.signInFormError
    )
    const maxSteps = steps.length

    React.useEffect(() => {
        signInForm.clear()
        signInFormError.clear()
    }, [])

    return (
        <Background className={`${style.background}`} center={true}>
            <FormLayout className={style.signInPage}>
                <Stepper
                    header={(step) => (
                        <>
                            <h1>{steps[step].label}</h1>
                            <p>{steps[step].description}</p>
                        </>
                    )}
                    maxSteps={maxSteps}
                    lastStepButton={(step, setStep) => {
                        return (
                            <Button
                                style={{ alignSelf: 'center' }}
                                onClick={() => {
                                    UserBusiness.create({
                                        user: signInForm.value,
                                    })
                                        .then((response: any) => {
                                            loginForm.updateProp(
                                                'user_name',
                                                response.user_name
                                            )
                                            router.push('/login')
                                        })
                                        .catch((error: any) => {
                                            signInForm.update(error)

                                            if (
                                                Object.keys(error).find(
                                                    (x: string) =>
                                                        [
                                                            'full_name',
                                                            'email',
                                                            'user_name',
                                                            'password',
                                                            'birthday',
                                                            'phone',
                                                        ].includes(x)
                                                )
                                            ) {
                                                setStep(0)
                                            } else if (
                                                Object.keys(error).find(
                                                    (x: string) =>
                                                        [
                                                            'person_type',
                                                            'document_type',
                                                            'document_number',
                                                        ].includes(x)
                                                )
                                            ) {
                                                setStep(1)
                                            } else if (
                                                Object.keys(error).find(
                                                    (x: string) =>
                                                        [
                                                            'zip_code',
                                                            'city',
                                                            'state',
                                                            'country',
                                                        ].includes(x)
                                                )
                                            ) {
                                                setStep(2)
                                            } else if (
                                                Object.keys(error).find(
                                                    (x: string) =>
                                                        ['picture'].includes(x)
                                                )
                                            ) {
                                                setStep(3)
                                            }
                                        })
                                }}
                                rightSpace={<Icon>save</Icon>}
                            >
                                Cadastrar
                            </Button>
                        )
                    }}
                >
                    {(step) => {
                        return steps[step].content()
                    }}
                </Stepper>
                <Link
                    href="/login"
                    style={{
                        color: '#ccc',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    Já possui uma conta? Entre agora
                </Link>
            </FormLayout>
        </Background>
    )
}

export default SignInPage
