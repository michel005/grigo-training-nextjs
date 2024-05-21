'use client'

import Path from '@/components/path'
import { AllPages } from '@/constants/pageDefinition'

const MyUserPage = () => {
    return (
        <>
            <Path values={[AllPages.dashboard, AllPages.execution]} />
        </>
    )
}

export default MyUserPage
