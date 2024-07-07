export interface FieldChoicesType {
    label?: String
    disabled?: boolean
    formName?: string
    formField?: string
    options?: Map<any, any>
    error?: string
    type?: 'SINGLE' | 'MULTIPLE'
    orientation?: 'HORIZONTAL' | 'VERTICAL'
    alignment?: 'LEFT' | 'CENTER' | 'RIGHT'
}
