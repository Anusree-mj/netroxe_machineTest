import { TodosItem } from '@/store/type'
import { Box, Checkbox, Typography } from '@mui/material'
import Divider from '@mui/material/Divider';

interface CompletedTodosProps {
    completedTodos: TodosItem[];
}

const CompletedTodos = ({ completedTodos }: CompletedTodosProps) => {
    return (
        <>
            {completedTodos.map((item: TodosItem) => (
                <Box sx={{ p: 1 }} key={item.task}>
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
                                sx={{ color: 'white' }} checked
                                disabled
                            />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography sx={{ color: 'white' }}>{item.task}</Typography>
                                <Typography sx={{ color: '#ffffff87' }}>{item.description}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            ))}
        </>
    )
}

export default CompletedTodos