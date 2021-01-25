import { gql } from '@apollo/client';

export const ADD_TODO = gql`
    mutation AddTodo($todo: TodoInput) {
        addTodo(todo: $todo) {
            id
            title
            completed
        }
    }
`;

export const REMOVE_TODO = gql`
    mutation removeTodo($id: ID) {
        removeTodo(id: $id) {
            id
        }
    }
`;

export const UPDATE_TODO = gql`
    mutation updateTodo($id: ID) {
        updateTodo(id: $id) {
            id
            completed
        }
    }
`;
