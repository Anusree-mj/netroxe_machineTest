'use client'
import { LoadingButton } from "@mui/lab"
import { Box, TextField } from "@mui/material"
import { useState, useContext, useEffect } from "react"
import PostAddIcon from '@mui/icons-material/PostAdd';
import { UserContext } from "@/helpers/userContext";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAction, getTodoAction, todoStateType } from "@/store/toDoReducer";
import { toast } from "react-toastify";

const AddToDo = () => {
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error('Undefined userContext');
    }
    const { userId } = userContext;
    const dispatch = useDispatch()
    const [toDo, setTodo] = useState({ task: '', description: '' })
    const [toDoSpan, setTodoSpan] = useState({ taskSpan: '', descriptionSpan: '' })
    const isLoading = useSelector((state: { todo: todoStateType }) => state.todo.isLoading);
    const error = useSelector((state: { todo: todoStateType }) => state.todo.error);

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    const isValid = () => {
        let validity = true;
        if (toDo.task === '') {
            validity = false;
            setTodoSpan(prevSpan => ({
                ...prevSpan,
                taskSpan: 'This field is required'
            }))
        }
        if (toDo.description === '') {
            validity = false;
            setTodoSpan(prevSpan => ({
                ...prevSpan,
                descriptionSpan: 'This field is required'
            }))
        }
        return validity
    }

    const handleAdd = () => {
        let valid = isValid();
        if (!valid) return;
        dispatch(addTodoAction({ userId, task: toDo.task, description: toDo.description,handleToDoAdd }))
        setTodo({ task: '', description: '' })
    }

    const handleToDoAdd = () => {
        dispatch(getTodoAction({ userId }))
    }

    return (
        <Box sx={{
            width: '100%',
            display: 'flex', mt: 1, p: 2,
            flexDirection: "column", justifyContent: 'flex-start',
            alignItem: 'center',
            border: '1px solid red'
        }}>
            <Box sx={{
                display: 'flex', gap: 2,
                justifyContent: 'space-around', flexWrap: 'wrap',
            }}>
                <TextField
                    id="outlined-text-input"
                    label="Task"
                    value={toDo.task}
                    error={!!toDoSpan.taskSpan}
                    helperText={toDoSpan.taskSpan}
                    sx={{
                        backgroundColor: 'white', borderRadius: '0.3rem',
                        width: { xs: '30rem', md: '20rem' }, maxWidth: '100%'
                    }}
                    onClick={() => { setTodoSpan({ ...toDoSpan, taskSpan: '' }) }}
                    onChange={(e) => { setTodo({ ...toDo, task: e.target.value }) }}
                ></TextField>
                <TextField
                    id="outlined-text-input"
                    label="Description"
                    value={toDo.description}
                    error={!!toDoSpan.descriptionSpan}
                    sx={{
                        backgroundColor: 'white', borderRadius: '0.3rem',
                        width: { xs: '30rem', md: '20rem' }, maxWidth: '100%'
                    }}
                    helperText={toDoSpan.descriptionSpan}
                    onClick={() => { setTodoSpan({ ...toDoSpan, taskSpan: '' }) }}
                    onChange={(e) => { setTodo({ ...toDo, description: e.target.value }) }}
                ></TextField>
                <LoadingButton
                    loading={isLoading}
                    loadingPosition="end"
                    variant="contained"

                    onClick={handleAdd}
                ><PostAddIcon /></LoadingButton>
            </Box>
        </Box >
    )
}

export default AddToDo