'use client'

import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { PageContextType } from '@/context/page/page.context.type'
import { useAPI } from '@/hook/api'
import { Business } from '@/business'

const initialValue = {
    training: {
        weekPlan: {},
        activeTrainings: [],
        archivedTrainings: [],
        completedTrainings: [],
    },
}

export const PageContext = createContext<PageContextType>({
    pageData: initialValue,
    training: async () => {},
})

export const PageProvider = ({ children }: { children: ReactNode }) => {
    const [pageData, setPageData] =
        useState<PageContextType['pageData']>(initialValue)

    const trainingPageApi = useAPI({
        api: Business.training.page,
        firstRun: false,
    })

    useEffect(() => {
        if (trainingPageApi.status === 'COMPLETED') {
            setPageData((x) => {
                x.training = trainingPageApi.response as any
                return { ...x }
            })
        }
    }, [trainingPageApi.status])

    const training = async () => {
        trainingPageApi.reset()
    }

    return (
        <PageContext.Provider
            value={{
                pageData,
                training,
            }}
        >
            {children}
        </PageContext.Provider>
    )
}
