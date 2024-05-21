import MyUserSidebar from '@/components/navbar/myUser.sidebar'
import { GoogleIcons } from '@/types/GoogleIcons'
import React from 'react'
import DashboardSidebar from '@/components/navbar/dashboard.sidebar'

interface PageType {
    name: string
    path: string
    child?: string[]
    sidebar?: React.ReactNode
    hide?: boolean
    picture?: string
    icon?: GoogleIcons
}

const PageDefinition: PageType[] = [
    {
        name: 'Dashboard',
        path: '/',
        sidebar: <DashboardSidebar />,
        icon: 'home',
    },
    {
        name: 'Treinos',
        path: '/training',
        // sidebar: <MyUserSidebar />,
        picture:
            'https://i.pinimg.com/564x/bb/79/09/bb7909ca0e18f79828a3240e57115cca.jpg',
        icon: 'list',
    },
    {
        name: 'Formulário de Treinos',
        path: '/training/[id]',
        // sidebar: <MyUserSidebar />,
        hide: true,
        icon: 'description',
    },
    {
        name: 'Execuções',
        path: '/execution',
        // sidebar: <MyUserSidebar />,
        picture:
            'https://i.pinimg.com/564x/8f/47/19/8f471995815fb6d13b642b907247c72a.jpg',
        icon: 'weight',
    },
    {
        name: 'Meu Usuário',
        path: '/myUser',
        sidebar: <MyUserSidebar />,
        picture:
            'https://i.pinimg.com/736x/08/e0/5a/08e05ac02632100bce130a6b109ecd78.jpg',
        icon: 'verified_user',
    },
]

export default PageDefinition

export const AllPages = {
    dashboard: PageDefinition[0],
    training: PageDefinition[1],
    trainingForm: PageDefinition[2],
    execution: PageDefinition[3],
    myUser: PageDefinition[4],
}
