import { FC } from "react";
import { useCreateTodoForm } from "./use-create-todo-form";

export const TodoForm: FC = () => {
    const {
        register,
        errors
    }  = useCreateTodoForm()
    return (
        <div>sample</div>
    )
}