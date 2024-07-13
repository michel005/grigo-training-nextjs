import { SidebarDefinitionType } from '@/constants/sidebar.definition.type'
import { TrainingSidebar } from '@/components/sidebar/training.sidebar'
import { ExerciseSidebar } from '@/components/sidebar/exercise.sidebar'
import { MyUserSidebar } from '@/components/sidebar/myUser.sidebar'

export const SidebarDefinition: SidebarDefinitionType = {
    dashboard: {
        icon: 'home',
        label: 'Dashboard',
        path: '',
    },
    training: {
        icon: 'list',
        label: 'Treinos',
        path: '/training',
        childs: ['/training/[id]', '/training/execute'],
        sidebar: <TrainingSidebar />,
    },
    execute: {
        icon: 'play_arrow',
        label: 'Treinos',
        path: '/training/execute',
        sidebar: <TrainingSidebar />,
        hide: true,
    },
    exercise: {
        icon: 'copy_all',
        label: 'Exercícios',
        path: '/training/[id]',
        sidebar: <ExerciseSidebar />,
        hide: true,
    },
    report: {
        icon: 'print',
        label: 'Relatório',
        path: '/report',
    },
    notifications: {
        icon: 'notifications',
        label: 'Notificações',
        path: '/notifications',
        hide: true,
    },
    myUser: {
        icon: 'person',
        label: 'Meu Usuário',
        sidebar: <MyUserSidebar />,
        path: '/myUser',
        hide: true,
    },
    settings: {
        icon: 'settings',
        label: 'Configurações',
        path: '/settings',
    },
}
