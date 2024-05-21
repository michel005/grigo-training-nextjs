import Business from '@/business/business'
import { TrainingType } from '@/types/TrainingType'

const allTrainings: TrainingType[] = [
    {
        id: 1,
        startDate: '01/06/2023',
        endDate: '31/12/2023',
        executions: [],
        exercises: [],
        progress: 0,
    },
    {
        id: 2,
        startDate: '01/01/2024',
        endDate: '30/06/2024',
        executions: [],
        exercises: [],
        progress: 30,
    },
    {
        id: 3,
        startDate: '01/03/2024',
        endDate: '30/06/2024',
        executions: [],
        exercises: [],
        progress: 85,
    },
]

export default class TrainingBusiness extends Business {
    static find = async () => {
        return {
            current: 0,
            size: 8,
            pageSize: 1,
            count: 36,
            result: allTrainings,
        }
    }
    static findById = async ({ id }: { id: number }) => {
        return allTrainings.find((x) => x.id === id)
    }
}
