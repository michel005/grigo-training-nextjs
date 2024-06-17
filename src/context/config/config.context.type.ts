export type ConfigContextFormType = {
    [key: string]: any
}

export interface ConfigContextType {
    value: (form: string) => any
    update: (form: string, prop: string, value: any) => void
    updatePrev: (form: string, value: (v: any) => any) => void
}
