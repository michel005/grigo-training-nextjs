'use client'

import { Modal } from '@/components/modal'
import { Form } from '@/components/form'
import { FieldText } from '@/components/field/text'
import { useContext, useEffect, useMemo, useState } from 'react'
import { ModalContext } from '@/context/modal/modal.context'
import { useForm } from '@/hook/form'
import Button from '@/components/button'
import { ErrorType } from '@/types/error.type'
import style from './index.module.scss'
import { ExecutionType } from '@/types/execution.type'
import { TimeUtils } from '@/utils/time.utils'
import { useAPI } from '@/hook/api'
import { Business } from '@/business'

export interface ExecutionPlan {
    type: 'TIME' | 'SERIE' | 'DROP' | 'REST'
    date_time?: string
    serie_count?: number
    drop_count?: number
    repetition_count?: number
    weight?: number
    execution_time?: string
}

export const ExecutionModal = () => {
    const { allModals, close } = useContext(ModalContext)
    const executionForm = useForm<ExecutionType | null>('executionForm')
    const [error, setError] = useState<ErrorType | null>()

    const executionModal = allModals.get('execution.form')

    const executionPlan = useAPI<ExecutionPlan[]>({
        api: async () => {
            if (!executionModal?.exercise?.id) {
                return []
            }

            return await Business.execution.executionPlan({
                exerciseId: executionModal?.exercise?.id as string,
            })
        },
        dependencies: [executionModal?.exercise?.id],
    })

    const [current, setCurrent] = useState<number>(0)
    const executionPlanForm = useMemo(
        () => executionPlan.response?.[current] || null,
        [current, executionPlan.response]
    )

    const header = useMemo(() => {
        if (executionPlanForm?.type === 'REST') {
            return `Descanse por ${TimeUtils.literalTime(executionPlanForm?.execution_time as any)}`
        }
        if (executionPlanForm?.type === 'TIME') {
            return `Tempo`
        }
        if (executionPlanForm?.type === 'SERIE') {
            return `Série ${executionPlanForm?.serie_count}`
        }
        return `Drop ${executionPlanForm?.drop_count}`
    }, [executionPlanForm])

    useEffect(() => {
        executionForm.updatePrev(() => executionModal)
    }, [executionModal])

    return (
        <Modal
            header={header}
            onClose={() => {
                executionForm.updatePrev(() => null)
                close('execution', 'form')
            }}
            backgroundVariant="blur"
            size="small"
        >
            {executionModal?.exercise?.observation && (
                <p>{executionModal?.exercise?.observation}</p>
            )}
            <Form formName="executionForm" errors={error}>
                {executionPlanForm?.type === 'TIME' && (
                    <>
                        <FieldText
                            label="Tempo de Execução"
                            formField="exercise_time"
                            mask="time"
                        />
                    </>
                )}
                {executionPlanForm?.type === 'SERIE' && (
                    <>
                        <FieldText
                            label="Número de Repetições"
                            formField="repetition_count"
                            type="number"
                        />
                        <FieldText
                            label="Peso (KG)"
                            formField="weight"
                            type="number"
                        />
                    </>
                )}
                {executionPlanForm?.type === 'DROP' && (
                    <>
                        <FieldText
                            label="Peso (KG)"
                            formField="weight"
                            type="number"
                        />
                    </>
                )}
            </Form>
            <div className={style.buttons}>
                <Button
                    icon="keyboard_arrow_left"
                    variant="secondary"
                    disabled={current === 0}
                    onClick={() => {
                        setCurrent((x) => x - 1)
                    }}
                />
                <span>
                    {current + 1} de {executionPlan.response?.length || 0}
                </span>
                {current === (executionPlan.response?.length || 0) - 1 ? (
                    <Button
                        icon="check"
                        onClick={() => {
                            executionForm.updatePrev(() => null)
                            close('execution', 'form')
                        }}
                    />
                ) : (
                    <Button
                        icon="keyboard_arrow_right"
                        onClick={() => {
                            setCurrent((x) => x + 1)
                        }}
                    />
                )}
            </div>
        </Modal>
    )
}
