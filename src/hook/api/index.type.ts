import { ErrorType } from '@/types/error.type'

export interface UseAPIType<T> {
    response: T | null
    error: ErrorType | null
    status: 'IDLE' | 'RUNNING' | 'COMPLETED' | 'ERROR'
    reset: () => void
}
