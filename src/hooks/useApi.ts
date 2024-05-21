import { useEffect, useState } from 'react'

const useApi = <T>(api: () => Promise<T>) => {
    const [response, setResponse] = useState<T>()
    const [error, setError] = useState<string | null>(null)
    const [status, setStatus] = useState<
        'IDDLE' | 'START' | 'LOADING' | 'SUCCESS' | 'ERROR'
    >('IDDLE')

    const run = () => {
        setStatus('IDDLE')
    }

    useEffect(() => {
        if (status === 'IDDLE') {
            setStatus('LOADING')
        }
        if (status == 'LOADING') {
            api()
                .then((resp) => {
                    setResponse(resp)
                    setStatus('SUCCESS')
                })
                .catch((error) => {
                    setResponse(undefined)
                    setStatus('ERROR')
                    setError(error)
                })
        }
    }, [api, response, status])

    return { response, error, status, run, hasError: () => !error }
}

export default useApi
