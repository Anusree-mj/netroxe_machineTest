import React from 'react'

const completedTodos = ({completedTodos}) => {
    return (
        <>
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
        </>
    )
}

export default completedTodos