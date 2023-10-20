import {Router} from 'express';

import { Todo } from '../models/todo';

type RequestBoody={text: string};
type RequestParams={todoId: string};

let todos: Todo[] =[];

const router=Router();

router.get('/', (req, res, next) => {
    res.status(200).json({todos: todos})

});

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBoody;
    const newTodo: Todo = {
    id: Date.now().toString(),
    text: req.body.text
};

todos.push(newTodo);

res.status(201).json({message: 'Added todo', todo: newTodo, todos: todos});

});

router.put('/todo/:todoId', (req, res, next) => {
    const params=req.params as RequestParams;
    const tid = params.todoId;
    const body = req.body as RequestBoody;
    const todoIndex= todos.findIndex(todoItem => todoItem.id === tid);
    if(todoIndex >= 0){
        todos[todoIndex]= {id: todos[todoIndex].id, text: req.body.text};
        return res.status(200).json({message: "Updated todo", todos: todos});

    }
    res.status(400).json({message: 'could not find todo for this id.'});
});

router.delete('/todo/:todoId', (req, res, next) => {
    const params=req.params as RequestParams;
    todos = todos.filter(todoItem => todoItem.id !== params.todoId);
    res.status(200).json({message: "Deleted todo", todos: todos});

});

export default router;