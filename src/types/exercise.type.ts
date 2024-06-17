export interface ExerciseType {
    id?: string
    name?: string
    type?: 'TIME' | 'SERIE' | 'REPETITION' | 'DROP'
    observation?: string
    series?: number
    drops?: number
    repetitions?: number
    exercise_time?: string
    rest_time?: string
    training_id?: string
}
