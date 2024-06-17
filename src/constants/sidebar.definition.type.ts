import { GoogleIconType } from '@/types/googleIcon.type'

export interface SidebarDefinitionType {
    [key: string]: {
        icon: GoogleIconType
        label: string
        path: string
    }
}
