import React, { useEffect, useState } from 'react'
import { MdDelete, MdNoteAdd, MdAdd } from "react-icons/md";



const date = new Date().toDateString();

const Todos = ({ todo, toggleCompleteTask, DeleteTodos }) => {
    return (
        <div className='flex items-center todo justify-between'>
            <input className='outline-none px-6 cursor-pointer' type="checkbox" checked={todo.isCompleted} onChange={() => toggleCompleteTask(todo.id)} />
            <li className='pl-2'> {todo.task}</li>
            <button className='pl-6 ml-10 hover:text-red-500' onClick={() => DeleteTodos(todo.id)}><MdDelete /></button>
        </div>
    )
}


const getLocalItems = () => {
    let list = localStorage.getItem("lists");

    if (list) {
        return JSON.parse(localStorage.getItem("lists"));
    } else {
        return []
    }
}

const ToDo = () => {

    // const [todos, setTodos] = useState([]);
    const [todos, setTodos] = useState(getLocalItems());
    const [inputTodo, setInputTodo] = useState("")
    const [filter, setFilter] = useState("All");

    // adding the task
    const AddItem = () => {
        setFilter("All")
        setTodos([...todos, {
            task: inputTodo,
            id: Date.now().toLocaleString(),
            isCompleted: false
        }])
        setInputTodo("")
    }

    // delteing the task
    const DeleteTodos = (delete_todo_id) => {
        const restTodos = todos.filter((todo) => todo.id != delete_todo_id);
        setTodos(restTodos)
    }

    // filtering the task completed or not

    const toggleCompleteTask = (taskId) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === taskId) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            }
            return todo
        });
        setTodos(newTodos)
        // console.log(JSON.stringify(newTodos))
    }

    const handleFilter = () => {
        if (filter === "Active") {
            return todos.filter((todo) => todo.isCompleted === false)
        } else if (filter === "Completed") {
            return todos.filter((todo) => todo.isCompleted === true)
        } else {
            return todos;
        }
    }

    const clearCompletedTodos = () => {
        const activeTodos = todos.filter((todo) => !todo.isCompleted);
        setTodos(activeTodos);
    }

    const getActiveTodos = () => {
        const activeTodos = todos.filter((todo) => !todo.isCompleted);
        return activeTodos.length;
    }

    // Add Data to Local Storage

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(todos))
    }, [todos])


    return (
        <div className='flex items-center justify-center mt-14 '>
            <div className='flex flex-col bg-slate-900 text-white items-center w-1/2 min-h-96 p-8 rounded-xl'>

                <div className='p-2 flex flex-col items-center '>
                    <MdNoteAdd className=' text-3xl mb-2 text-yellow-300' />
                    <p className='font-semibold text-sm md:text-base '>{date}</p>
                </div>

                <div className='flex items-center justify-between'>
                    <input type="text" className=' outline text-black pr-5 pl-5  w-3/5 rounded ' placeholder='Add a Task...'
                        value={inputTodo} onChange={(event) => setInputTodo(event.target.value)}
                    />
                    <button onClick={AddItem} className='text-green-500 pl-5 text-3xl'><MdAdd /></button>
                </div>

                <div className='mt-1 p-4 flex flex-col items-start'>
                    <ul classname=' flex flex-col items-start'>

                        {
                            handleFilter().length > 0 ? (handleFilter().map((todo) => (
                                <Todos
                                    key={todo.id}
                                    todo={todo}
                                    toggleCompleteTask={toggleCompleteTask}
                                    DeleteTodos={DeleteTodos}
                                />

                            ))) : <p className='text-sm md:text-base'>No Task to show</p>

                        }


                    </ul>
                </div>

                <div className='flex flex-col md:flex-row flex-wrap p-5 m-5'>
                    {/* {getActiveTodos()} <p className='p-2'>Rem. Todos</p> */}
                    
                    <button className=' bg-blue-500 px-1 m-2 rounded-lg text-white hover:bg-white hover:text-blue-500 cursor-pointer ' onClick={() => setFilter("All")}>All</button>

                    <button className=' bg-blue-500 px-1  m-2 rounded-lg text-white hover:bg-white hover:text-blue-500 cursor-pointer' onClick={() => setFilter("Active")}>Active</button>

                    <button className=' bg-blue-500 px-1  m-2 rounded-lg text-white hover:bg-white hover:text-blue-500 cursor-pointer' onClick={() => setFilter("Completed")}>Completed</button>

                    <button className=' bg-blue-500 px-1  m-2 rounded-lg text-white hover:bg-white hover:text-blue-500 cursor-pointer' onClick={clearCompletedTodos}>Clear Completed</button>
                </div>

            </div>
        </div>
    )
}

export default ToDo