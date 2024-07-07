import { TrainingPageType } from '@/types/trainingPage.type'

export interface PageContextType {
    pageData: {
        training: TrainingPageType
    }
    training: () => Promise<void>
}
