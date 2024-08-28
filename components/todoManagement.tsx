'use client'
import { Box, Checkbox, Typography } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from '@mui/material/Divider';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/helpers/userContext";
import { useDispatch, useSelector } from "react-redux";
import { getTodoAction, todoStateType } from "@/store/toDoReducer";
import { TodosItem } from "@/store/type";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { apiCall } from "@/services/api";
import { toast } from "react-toastify";

const TodoManagement = () => {
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error('Undefined userContext');
    }
    const { userId } = userContext;
    const dispatch = useDispatch()
    const [isCompletedList, setIsCompletedList] = useState(false);
    const todoList = useSelector((state: { todo: todoStateType }) => state.todo.todo);

    useEffect(() => {
        if (userId) {
            console.log(userId, 'useriddddddddddddddd')
            dispatch(getTodoAction({ userId }))
        }
    }, [userId])

    const handleDelete = async (task: string) => {
        try {
            const data = { task, userId }
            const response = await apiCall({
                method: 'DELETE',
                endpoint: 'todo',
                body: data
            });
            if (response.status === 'ok') {
                dispatch(getTodoAction({ userId }))
            }
        } catch (error) {
            toast.error('Unexpected error occured')
            console.error('Error deleting todo:', error);
        }
    }

    const handleComplete = async (task: string) => {
        try {
            const data = { task, userId }
            const response = await apiCall({
                method: 'PATCH',
                endpoint: 'todo',
                body: data
            });
            if (response.status === 'ok') {
                dispatch(getTodoAction({ userId }))
            }
        } catch (error) {
            toast.error('Unexpected error occured')
            console.error('Error deleting todo:', error);
        }
    }

    return (
        <Box sx={{
            background: 'linear-gradient(to right, #3d3f42, #212226)',
            border: '1px solid red', borderRadius: '0.2rem', display: 'flex',
            justifyContent: "center", alignItems: 'center', mt: 2
        }}>
            <Box sx={{
                width: '90%', p: 1, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                backgroundColor: '#03013559', display: 'flex',
                flexDirection: 'column'
            }}>
                <Box sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <Box sx={{
                        display: 'flex', gap: 2
                    }}>
                        <Typography sx={{ color: 'white' }}>
                            {`Tasks (${todoList.length > 0 ? todoList[0]?.totalTodo ?? 0 : 0})`}
                        </Typography>
                        <Typography sx={{ color: '#ffffff87' }}>Today</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <FactCheckOutlinedIcon sx={{ color: '#ffffff87', }} />
                        <SettingsIcon sx={{ color: '#ffffff87' }} />
                        <ArrowDropDownIcon sx={{ color: '#ffffff87', }} />
                    </Box>
                </Box>
                {todoList[0]?.todos.map((item: TodosItem) => (
                    <Box sx={{ p: 1 }}>
                        <Divider sx={{ mb: 1, backgroundColor: '#ffffff87' }} />
                        <Box sx={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Box sx={{
                                display: 'flex', gap: 1, justifyContent: 'center',
                                alignItem: 'center'
                            }}>
                                <Checkbox
                                    sx={{ color: 'white' }}
                                    checked={item.isCompleted}
                                    onClick={() => { handleComplete(item.task) }}
                                />
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <Typography sx={{ color: 'white' }}>{item.task}</Typography>
                                    <Typography sx={{ color: '#ffffff87' }}>{item.description}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ gap: 1, display: 'flex' }}>
                                <CreateOutlinedIcon sx={{ color: '#ffffff87', cursor: 'pointer', width: '1.1rem' }} />
                                <CloseOutlinedIcon onClick={() => { handleDelete(item.task) }}
                                    sx={{ color: '#ffffff87', width: '1.1rem', cursor: 'pointer' }} />
                            </Box>
                        </Box>
                    </Box>

                ))}
            </Box>
        </Box >
    )
}

export default TodoManagement