'use client'

import { useContext } from 'react'
import { ConfigContext } from '@/context/config/config.context'
import { UseFormType } from '@/hook/form/index.type'
import { ConfigContextFormType } from '@/context/config/config.context.type'
import { ModalContext } from '@/context/modal/modal.context'
import { UseMessageType } from '@/hook/message/index.type'

export const useMessage = (): UseMessageType => {
    const { open } = useContext(ModalContext)

    const message = (header: string, content: React.ReactNode) => {
        open('message', 'message', {
            header,
            content,
        })
    }

    const question = (
        header: string,
        content: React.ReactNode,
        onConfirm: () => void
    ) => {
        open('message', 'message', {
            header,
            content,
            onConfirm,
        })
    }

    return {
        message,
        question,
    }
}
