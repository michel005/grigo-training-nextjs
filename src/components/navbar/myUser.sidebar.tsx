import UserBusiness from '@/business/user.business'
import Button from '@/components/button'
import usePage from '@/hooks/usePage'
import { Icon } from '../icon'
import { useContext } from 'react'
import { SessionContext } from '@/store/session.context'
import { UserType } from '@/types/UserType'
import { useRouter } from 'next/navigation'

const MyUserSidebar = () => {
    const rounter = useRouter()
    const { setCurrentUser } = useContext(SessionContext)
    const { currentUserForm, currentUserFormError } = usePage(
        'currentUserForm',
        'currentUserFormError'
    )

    return (
        <>
            <Button
                leftSpace={<Icon>save</Icon>}
                onClick={() => {
                    UserBusiness.update({
                        user: currentUserForm.value,
                    })
                        .then(() => {
                            UserBusiness.me().then((response: UserType) => {
                                setCurrentUser(response)
                                currentUserForm.update(response)
                            })
                        })
                        .catch((error: any) => {
                            currentUserFormError.update(error)
                        })
                }}
            >
                Salvar
            </Button>
            <div style={{ flexGrow: 1 }} />
            <Button
                leftSpace={<Icon>door_open</Icon>}
                onClick={() => {
                    localStorage.clear()
                    setCurrentUser(null)
                    rounter.push('/')
                }}
                variant="secondary"
            >
                Sair
            </Button>
        </>
    )
}

export default MyUserSidebar
