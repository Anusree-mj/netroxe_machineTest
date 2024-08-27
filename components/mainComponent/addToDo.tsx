'use client'
import { LoadingButton } from "@mui/lab"
import { Box, TextField } from "@mui/material"
import { useState, useContext } from "react"
import PostAddIcon from '@mui/icons-material/PostAdd';
import { UserContext } from "@/helpers/userContext";

const AddToDo = () => {
    const { userId } = useContext(UserContext)
    const [toDo, setTodo] = useState({ task: '', description: '' })
    const [toDoSpan, setTodoSpan] = useState({ taskSpan: '', descriptionSpan: '' })

    return (
        <Box sx={{
            width: '60rem', maxWidth: { xs: '95%', md: '70%' },
            display: 'flex', mt: 1, border: '1px solid red', p: 2,
            flexDirection: "column", justifyContent: 'flex-start',
            alignItem: 'center',
        }}>
            <Box sx={{
                display: 'flex', gap: 2, border: '1px solid green',
                justifyContent: 'space-around', flexWrap: 'wrap'
            }}>
                <TextField
                    id="outlined-text-input"
                    label="Task"
                    value={toDo.task}
                    error={!!toDoSpan.taskSpan}
                    helperText={toDoSpan.taskSpan}
                    sx={{ backgroundColor: 'white', borderRadius: '0.3rem', width: '20rem', maxWidth: '100%' }}
                    onClick={() => { setTodoSpan({ ...toDoSpan, taskSpan: '' }) }}
                    onChange={(e) => { setTodo({ ...toDo, task: e.target.value }) }}
                ></TextField>
                <TextField
                    id="outlined-text-input"
                    label="Description"
                    value={toDo.description}
                    error={!!toDoSpan.descriptionSpan}
                    sx={{ backgroundColor: 'white', borderRadius: '0.3rem', width: '20rem', maxWidth: '100%' }}
                    helperText={toDoSpan.descriptionSpan}
                    onClick={() => { setTodoSpan({ ...toDoSpan, taskSpan: '' }) }}
                    onChange={(e) => { setTodo({ ...toDo, description: e.target.value }) }}
                ></TextField>
                <LoadingButton
                    // loading={isLoading}
                    loadingPosition="end"
                    variant="contained"><PostAddIcon /></LoadingButton>
            </Box>
        </Box>
    )
}

export default AddToDo