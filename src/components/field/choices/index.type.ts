export interface FieldChoicesType {
    label?: String
    disabled?: boolean
    formName?: string
    formField?: string
    options?: Map<string, string>
    error?: string
    type?: 'SINGLE' | 'MULTIPLE'
}
