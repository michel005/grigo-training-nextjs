import { SidebarDefinitionType } from '@/constants/sidebar.definition.type'

export const SidebarDefinition: SidebarDefinitionType = {
    dashboard: {
        icon: 'dashboard',
        label: 'Dashboard',
        path: '',
    },
    training: {
        icon: 'list',
        label: 'Treino',
        path: '/training',
    },
    execution: {
        icon: 'play_arrow',
        label: 'Execução',
        path: '/execution',
    },
    report: {
        icon: 'print',
        label: 'Relatório',
        path: '/report',
    },
    myUser: {
        icon: 'person',
        label: 'Meu Usuário',
        path: '/myUser',
    },
    settings: {
        icon: 'settings',
        label: 'Configurações',
        path: '/settings',
    },
}
