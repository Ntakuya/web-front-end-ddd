import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from "yup"

const createTodoSchema = object({
    title: string()
})

type CreateTodo = {
    title: string
}

export function useCreateTodoForm() {
    const {
        register, handleSubmit, formState:{ errors }
    } = useForm<CreateTodo>({
        resolver: yupResolver(createTodoSchema)
    })

    return ({
        register,
        handleSubmit,
        errors
    })
}