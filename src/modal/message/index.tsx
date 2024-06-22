'use client'

import { Modal } from '@/components/modal'
import { useContext } from 'react'
import { ModalContext } from '@/context/modal/modal.context'
import Button from '@/components/button'
import style from './index.module.scss'

export const MessageModal = () => {
    const { allModals, close } = useContext(ModalContext)

    const { header, content, onConfirm } = allModals.get('message.message')

    return (
        <Modal
            header={header}
            onClose={() => {
                close('message', 'message')
            }}
            backgroundVariant="blur"
            classNameBackground={style.modal}
            size="medium"
        >
            <p>{content}</p>
            <div className={style.buttons}>
                {onConfirm && (
                    <Button
                        icon="check"
                        onClick={() => {
                            onConfirm?.()
                            close('message', 'message')
                        }}
                    >
                        Confirmar
                    </Button>
                )}
                <Button
                    icon="close"
                    onClick={() => {
                        close('message', 'message')
                    }}
                    variant="ghost"
                >
                    Cancelar
                </Button>
            </div>
        </Modal>
    )
}
