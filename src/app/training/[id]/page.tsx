'use client'

import Path from '@/components/path'
import { AllPages } from '@/constants/pageDefinition'
import { TrainingType } from '@/types/TrainingType'
import TrainingBusiness from '@/business/training.business'
import useFormApi from '@/hooks/useFormApi'
import FormLayout from '@/components/layout/formLayout'
import DateField from '@/components/field/dateField'

const TrainingDetailsPage = ({ params }: { params: { id: string } }) => {
    const trainingApi = useFormApi<TrainingType | undefined>({
        api: async () =>
            await TrainingBusiness.findById({ id: parseInt(params.id) }),
        formName: 'trainingDetails',
    })

    return (
        <>
            <Path
                values={[
                    AllPages.dashboard,
                    AllPages.training,
                    {
                        name: `#${trainingApi.form.value?.id}`,
                        icon: 'description',
                    },
                ]}
            />
            <FormLayout flexDirection="row">
                <DateField
                    label="Data de Início"
                    formField="trainingDetails|startDate"
                />
                <DateField
                    label="Data de Término"
                    formField="trainingDetails|endDate"
                />
            </FormLayout>
        </>
    )
}

export default TrainingDetailsPage
