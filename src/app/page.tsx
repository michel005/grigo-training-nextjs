import style from './page.module.scss'

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
