'use client'
import { Box, Button, Checkbox, IconButton, TextField, Typography } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from '@mui/material/Divider';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/helpers/userContext";
import { useDispatch, useSelector } from "react-redux";
import { getTodoAction, todoStateType } from "@/store/toDoReducer";
import { TodosItem } from "@/store/type";
import { apiCall } from "@/services/api";
import { toast } from "react-toastify";
import CompletedTodos from "./completedTodos";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const TodoManagement = () => {
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error('Undefined userContext');
    }
    const { userId } = userContext;
    const dispatch = useDispatch();
    const [isCompletedList, setIsCompletedList] = useState(false);
    const todoList = useSelector((state: { todo: todoStateType }) => state.todo.todo);
    const [editItemId, setEditItemId] = useState<string | null>(null);
    const [editedTask, setEditedTask] = useState<string>('');
    const [editedDescription, setEditedDescription] = useState<string>('');

    useEffect(() => {
        if (userId) {
            dispatch(getTodoAction({ userId }));
        }
    }, [userId, dispatch]);

    const handleEditClick = (item: TodosItem) => {
        setEditItemId(item.task); // Use a unique identifier if available
        setEditedTask(item.task);
        setEditedDescription(item.description);
    };

    const handleSaveClick = async (item: string) => {
        const data = { taskId:item,task: editedTask, description: editedDescription, userId };
        try {
            const response = await apiCall({
                method: 'PUT',
                endpoint: 'todo',
                body: data
            });
            if (response.status === 'ok') {
                dispatch(getTodoAction({ userId }));
                setEditItemId(null);
            }
        } catch (error) {
            toast.error('Unexpected error occurred');
            console.error('Error updating todo:', error);
        }
    };

    const handleCancelClick = () => {
        setEditItemId(null);
    };

    const handleDelete = async (task: string) => {
        try {
            const data = { task, userId };
            const response = await apiCall({
                method: 'DELETE',
                endpoint: 'todo',
                body: data
            });
            if (response.status === 'ok') {
                dispatch(getTodoAction({ userId }));
            }
        } catch (error) {
            toast.error('Unexpected error occurred');
            console.error('Error deleting todo:', error);
        }
    };

    const handleComplete = async (task: string) => {
        try {
            const data = { task, userId };
            const response = await apiCall({
                method: 'PATCH',
                endpoint: 'todo',
                body: data
            });
            if (response.status === 'ok') {
                dispatch(getTodoAction({ userId }));
            }
        } catch (error) {
            toast.error('Unexpected error occurred');
            console.error('Error completing todo:', error);
        }
    };

    const completedTodos = todoList[0]?.todos.filter((item: TodosItem) =>
        isCompletedList ? item.isComplete : true
    ) || [];

    return (
        <Box sx={{
            background: 'linear-gradient(to right, #3d3f42, #212226)',
             borderRadius: '0.2rem', display: 'flex',
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
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Typography sx={{ color: 'white' }}>
                            {`Tasks (${todoList.length > 0 ? todoList[0]?.totalTodo ?? 0 : 0})`}
                        </Typography>
                        <Typography sx={{ color: '#ffffff87' }}>{isCompletedList ? 'Completed' : 'Today'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {isCompletedList ? (
                            <ArrowBackIcon
                                sx={{ color: '#ffffff87', cursor: 'pointer' }}
                                onClick={() => { setIsCompletedList(false) }}
                            />
                        ) : (
                            <FactCheckOutlinedIcon
                                sx={{ color: '#ffffff87', cursor: 'pointer' }}
                                onClick={() => { setIsCompletedList(true) }}
                            />
                        )}
                        <SettingsIcon sx={{ color: '#ffffff87' }} />
                        <ArrowDropDownIcon sx={{ color: '#ffffff87' }} />
                    </Box>
                </Box>
                {!isCompletedList ? (
                    <>
                        {todoList[0]?.todos.map((item: TodosItem) => (
                            <Box sx={{ p: 1 }} key={item.task}>
                                <Divider sx={{ mb: 1, backgroundColor: '#ffffff87' }} />
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',  
                                    alignItems: 'center'
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: 1,
                                        alignItems: 'center',
                                        flex: 1 
                                    }}>
                                        {editItemId === item.task ? (
                                            <>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    value={editedTask}
                                                    onChange={(e) => setEditedTask(e.target.value)}
                                                    sx={{ color: 'white', mr: 1,backgroundColor:'white' }}
                                                />
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    value={editedDescription}
                                                    onChange={(e) => setEditedDescription(e.target.value)}
                                                    sx={{backgroundColor:'white',color: 'white', mr: 1 }}
                                                />
                                            </>
                                        ) : ( 
                                            
                                            <>
                                                <Checkbox
                                                    sx={{ color: 'white' }}
                                                    checked={item.isComplete}
                                                    onClick={() => { handleComplete(item.task) }}
                                                />
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Typography sx={{ color: 'white' }}>{item.task}</Typography>
                                                    <Typography sx={{ color: '#ffffff87' }}>{item.description}</Typography>
                                                </Box>
                                            </>
                                        )}
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        {editItemId === item.task ? (
                                            <>
                                                <IconButton onClick={() => handleSaveClick(item.task)}>
                                                    <PlaylistAddCheckIcon sx={{ color: '#ffffff87' }} />
                                                </IconButton>
                                                <IconButton onClick={handleCancelClick}>
                                                    <CloseOutlinedIcon sx={{ color: '#ffffff87' }} />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <>
                                                <IconButton onClick={() => handleEditClick(item)}>
                                                    <CreateOutlinedIcon sx={{ color: '#ffffff87', width: '1.1rem' }} />
                                                </IconButton>
                                                <IconButton onClick={() => { handleDelete(item.task) }}>
                                                    <CloseOutlinedIcon sx={{ color: '#ffffff87', width: '1.1rem' }} />
                                                </IconButton>
                                            </>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        ))}

                    </>
                ) : (
                    <CompletedTodos completedTodos={completedTodos} />
                )}
            </Box>
        </Box>
    )
}

export default TodoManagement;
