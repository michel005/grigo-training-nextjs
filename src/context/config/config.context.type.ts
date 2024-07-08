import { ReactNode } from 'react'
import { GoogleIconType } from '@/types/googleIcon.type'

export type ConfigContextFormType = {
    [key: string]: any
}

export interface ConfigContextType {
    value: (form: string) => any
    clearAll: () => void
    update: (form: string, prop: string, value: any) => void
    updatePrev: (form: string, value: (v: any) => any) => void
    dragDropData: null | {
        index: any
        group: string
        acceptTargetGroup: string[]
    }
    setDragDropData: any
}
