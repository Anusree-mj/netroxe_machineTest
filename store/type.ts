export interface UserItem {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export interface ToDoItem {
    _id: string;
    userId: string;
    task: string;
    description: string;
    isCompleted: boolean
}

