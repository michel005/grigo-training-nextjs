'use client'

import { Modal } from '@/components/modal'
import { Form } from '@/components/form'
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
import { TrainingMuscleGroupDefinition } from '@/constants/training.muscleGroup.definition'
import { FieldChoices } from '@/components/field/choices'
import { PageContext } from '@/context/page/page.context'

export const TrainingModal = () => {
    const { training: refreshTraining } = useContext(PageContext)

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
                        muscle_group: trainingForm.form?.muscle_group,
                    },
                })
            } else {
                await Business.training.create({
                    entity: {
                        name: trainingForm.form?.name,
                        muscle_group: trainingForm.form?.muscle_group,
                    },
                })
            }
            trainingForm.updatePrev(() => null)
            await refreshTraining()
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
                        refreshTraining()
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
            size="medium"
        >
            <Form formName="trainingForm" errors={error}>
                <FieldText label="Nome do Treino" formField="name" />
                <FieldChoices
                    label="Grupo Muscular"
                    formField="muscle_group"
                    orientation="VERTICAL"
                    options={
                        new Map(
                            Object.keys(TrainingMuscleGroupDefinition).map(
                                (x) => [x, TrainingMuscleGroupDefinition[x]]
                            )
                        )
                    }
                />
            </Form>
            <div className={style.buttons}>
                <Button icon="save" onAsyncClick={saveTrainingClickHandler}>
                    Salvar
                </Button>
                {trainingForm.form?.id && (
                    <Button
                        icon="delete"
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
