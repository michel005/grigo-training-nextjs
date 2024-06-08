import { GoogleIconType } from '@/types/GoogleIcon.type'
import { HTMLInputTypeAttribute } from 'react'

export interface FieldTextType {
    label?: String
    icon?: GoogleIconType
    type?: HTMLInputTypeAttribute | undefined
}
