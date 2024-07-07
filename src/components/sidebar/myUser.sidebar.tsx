import Button from '@/components/button'
import { API } from '@/settings/axios.settings'
import { SessionUtils } from '@/utils/session.utils'
import { useForm } from '@/hook/form'
import { UserType } from '@/types/user.type'
import { ErrorType } from '@/types/error.type'
import { useContext } from 'react'
import { UserContext } from '@/context/user/user.context'

export const MyUserSidebar = () => {
    const { me } = useContext(UserContext)
    const myUserForm = useForm<UserType>('myUser')
    const myUserErrorForm = useForm<ErrorType | null>('myUserError')

    const saveFormClickHandler = async () => {
        myUserErrorForm.updatePrev(() => null)
        try {
            await API.put(
                '/user',
                {
                    full_name: myUserForm.form.full_name,
                    birthday: myUserForm.form.birthday,
                    phone: myUserForm.form.phone,
                },
                SessionUtils.tokenHeader()
            )
            await me()
        } catch (error: any) {
            myUserErrorForm.updatePrev(() => error.response.data)
        }
    }

    return (
        <>
            <Button icon="save" onAsyncClick={saveFormClickHandler}>
                Salvar
            </Button>
        </>
    )
}
