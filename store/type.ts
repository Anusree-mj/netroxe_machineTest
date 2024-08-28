export interface UserItem {
    _id: string;
    name: string;
    email: string;
    password: string;
}
export interface TodosItem {
    task: string;
    description: string;
    isCompleted: boolean;
}

export interface ToDoItem {
    _id: string;
    userId: string;
    todos: TodosItem[];
    totalTodo: number
}

