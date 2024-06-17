'use client'

import style from './page.module.scss'
import { useContext, useEffect } from 'react'
import { UserContext } from '@/context/user/user.context'
import { useRouter } from 'next/navigation'

const Section = ({
    header,
    description,
}: {
    header: string
    description: string
}) => {
    return (
        <section className={style.section}>
            <div className={style.text}>
                <h1>{header}</h1>
                <p>{description}</p>
            </div>
        </section>
    )
}

const HomePage = () => {
    const { currentUser } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        if (!!currentUser) {
            router.push('/private')
        }
    }, [currentUser])

    if (!!currentUser) {
        return <></>
    }

    return (
        <div className={style.homePage}>
            <Section
                header="Gestor de treino profissional"
                description="Controle seus treinos com um sistema completo e unico, com dicas, opiniões de especialistas e agilidade."
            />
        </div>
    )
}

export default HomePage
