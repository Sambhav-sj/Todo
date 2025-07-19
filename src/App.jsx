import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLocal = (parse) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleCompleted = (e) => {
    setShowCompleted(!showCompleted)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLocal()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLocal()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLocal()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLocal()
  }

  return (
    <>
      <Navbar />
      <div className="mx-2 md:container md:mx-auto my-5 rounded-xl p-6 bg-blue-100 min-h-[85vh] md:w-1/2">
        <h1 className="font-bold text-2xl flex justify-center items-center">Todo - Your task manager</h1>
        <div className="addTodo my-5">
          <h2 className="text-xl font-bold mb-3">Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" placeholder="Enter Your Task" className="w-full rounded-lg px-3" />
            <button onClick={handleAdd} disabled={todo.length <= 3} className="bg-blue-900 hover:bg-blue-950 p-2 text-sm font-bold text-white mx-3 rounded-xl">Save</button>
          </div>
        </div>
        <div className="gap-5 flex">
          <input onChange={toggleCompleted} type="checkbox" checked={showCompleted} />Show Completed Task
        </div>
        <div className="bg-black h-[0.7px] justify-center items-center w-full my-3"></div>
        <h2 className="text-xl font-bold my-3">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to Display</div>}
          {todos.map(item => {

            return (showCompleted || !item.isCompleted) && <div key={item.id} className="todo flex w-full justify-between my-3">
              <div className="flex gap-5">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-blue-900 hover:bg-blue-950 p-4 py-1 text-sm font-bold
               text-white mx-2 rounded-lg"><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-blue-900 hover:bg-blue-950 p-4 py-1 text-sm font-bold
               text-white mx-2 rounded-lg"><FaTrash /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
