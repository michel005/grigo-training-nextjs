import { GoogleIconType } from '@/types/googleIcon.type'

export interface FieldSelectType {
    label?: String
    icon?: GoogleIconType
    options?: Map<string, string>
    disabled?: boolean
    formName?: string
    formField?: string
    error?: string
}
