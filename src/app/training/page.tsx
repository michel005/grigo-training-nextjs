'use client'

import Path from '@/components/path'
import { AllPages } from '@/constants/pageDefinition'
import ApiTable from '@/components/apiTable'
import TrainingBusiness from '@/business/training.business'
import BarChart from '@/components/charts/barChart'
import Link from 'next/link'

const TrainingPage = () => {
    return (
        <>
            <Path values={[AllPages.dashboard, AllPages.training]} />
            <ApiTable<any>
                columns={{
                    id: {
                        header: '#',
                        valueModifier: (row) => (
                            <Link href={`/training/${row.id}`}>#{row.id}</Link>
                        ),
                        width: 60,
                    },
                    startDate: {
                        header: 'Início',
                        width: 100,
                    },
                    endDate: {
                        header: 'Término',
                        width: 100,
                    },
                    exercises: {
                        header: 'Total de Exercícios',
                        valueModifier: (row) => row?.exercises.length,
                        width: 150,
                        alignment: 'center',
                    },
                    executions: {
                        header: 'Total de Execuções',
                        valueModifier: (row) => row?.executions.length,
                        width: 150,
                        alignment: 'center',
                    },
                    progress: {
                        header: 'Progresso',
                        valueModifier: (row) => (
                            <BarChart
                                value={row.progress}
                                max={100}
                                label={`${row.progress}%`}
                            />
                        ),
                        width: 200,
                    },
                }}
                requestData={TrainingBusiness.find}
            />
        </>
    )
}

export default TrainingPage
