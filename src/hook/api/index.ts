'use client'

import { useEffect, useState } from 'react'
import { UseAPIType } from '@/hook/api/index.type'
import { ErrorType } from '@/types/error.type'

export const useAPI = <T>({
    api,
    dependencies = [],
    firstRun = true,
}: {
    api: () => Promise<T>
    dependencies?: any
    firstRun?: boolean
}): UseAPIType<T> => {
    const [response, setResponse] = useState<T | null>(null)
    const [error, setError] = useState<ErrorType | null>(null)
    const [status, setStatus] = useState<UseAPIType<any>['status']>(
        firstRun ? 'IDLE' : 'COMPLETED'
    )

    useEffect(() => {
        if (status === 'IDLE') {
            setStatus('RUNNING')
            api()
                .then((res) => {
                    setResponse(res)
                    setStatus('COMPLETED')
                })
                .catch((res: ErrorType) => {
                    setError(res)
                    setStatus('ERROR')
                })
        }
    }, [status])

    useEffect(() => {
        setStatus('IDLE')
    }, [...dependencies])

    const reset = () => {
        setStatus('IDLE')
    }

    return {
        response,
        error,
        status,
        reset,
    }
}
