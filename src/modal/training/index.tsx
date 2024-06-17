'use client'

import { Modal } from '@/components/modal'
import { Form, FormRow } from '@/components/form'
import { FieldText } from '@/components/field/text'
import { useContext, useEffect, useState } from 'react'
import { ModalContext } from '@/context/modal/modal.context'
import { useForm } from '@/hook/form'
import { TrainingType } from '@/types/training.type'
import Button from '@/components/button'
import { ErrorType } from '@/types/error.type'
import style from './index.module.scss'
import { Business } from '@/business'
import { useMessage } from '@/hook/message'

export const TrainingModal = () => {
    const { allModals, close } = useContext(ModalContext)
    const message = useMessage()
    const trainingForm = useForm<TrainingType | null>('trainingForm')
    const [error, setError] = useState<ErrorType | null>()

    const saveTrainingClickHandler = async () => {
        try {
            if (trainingForm.form?.id) {
                await Business.training.update({
                    id: trainingForm.form?.id,
                    entity: {
                        name: trainingForm.form?.name,
                        start_date: trainingForm.form?.start_date,
                        end_date: trainingForm.form?.end_date,
                        muscle_group: trainingForm.form?.muscle_group,
                    },
                })
            } else {
                await Business.training.create({
                    entity: {
                        name: trainingForm.form?.name,
                        start_date: trainingForm.form?.start_date,
                        end_date: trainingForm.form?.end_date,
                        muscle_group: trainingForm.form?.muscle_group,
                    },
                })
            }
            trainingForm.updatePrev(() => null)
            close('training', 'form')
        } catch (error: any) {
            setError(error?.response?.data)
        }
    }

    const removeTrainingClickHandler = async () => {
        message.question(
            'Exclusão de Treino',
            'Deseja realmente excluir este treino?',
            () => {
                Business.training
                    .remove({
                        id: trainingForm.form?.id,
                    })
                    .then(() => {
                        close('training', 'form')
                    })
            }
        )
    }

    useEffect(() => {
        trainingForm.updatePrev(() => allModals.get('training.form'))
    }, [allModals])

    return (
        <Modal
            header="Formulário de Treino"
            onClose={() => {
                trainingForm.updatePrev(() => null)
                close('training', 'form')
            }}
            backgroundVariant="blur"
        >
            <Form formName="trainingForm" errors={error}>
                <FormRow>
                    <FieldText
                        label="Data de Início"
                        formField="start_date"
                        mask="date"
                    />
                    <FieldText
                        label="Data de Término"
                        formField="end_date"
                        mask="date"
                    />
                </FormRow>
                <FieldText label="Nome do Treino" formField="name" />
                <FieldText label="Grupo Muscular" formField="muscle_group" />
            </Form>
            <div className={style.buttons}>
                <Button leftIcon="save" onAsyncClick={saveTrainingClickHandler}>
                    Salvar
                </Button>
                {trainingForm.form?.id && (
                    <Button
                        leftIcon="delete"
                        onAsyncClick={removeTrainingClickHandler}
                        variant="ghost"
                    >
                        Remover
                    </Button>
                )}
            </div>
        </Modal>
    )
}
