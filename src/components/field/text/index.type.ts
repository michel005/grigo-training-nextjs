import { GoogleIconType } from '@/types/googleIcon.type'
import { HTMLInputTypeAttribute } from 'react'

export interface FieldTextType {
    alignment?: 'left' | 'center' | 'right'
    label?: String
    icon?: GoogleIconType
    type?: HTMLInputTypeAttribute | undefined
    disabled?: boolean
    formName?: string
    formField?: string
    mask?: 'rg' | 'cpf' | 'cnpj' | 'cep' | 'date' | 'time' | 'phone'
    placeholder?: string
    error?: string
}
