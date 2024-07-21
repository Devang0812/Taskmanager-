import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";



function App() {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showfin, setshowfin] = useState(true)

//fetch data from local storage
  useEffect(() => {
      let todostr = localStorage.getItem('todos')
      if (todostr) {
        let todos = JSON.parse(localStorage.getItem("todos"))
        setTodos(todos)
      }
  }, [])

//save data to local storage
  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos))
    
  }

//add new task and save to local storage
  const handleAdd =() => {
    setTodos(prevTodos =>{
     const newTodos= [...prevTodos, { id: uuidv4(), todo, isCompleted: false }]
     saveToLS(newTodos)
     return newTodos
    })
    setTodo('')
  }


//edit task 
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    setTodos(prevTodos =>{
      const newTodos = prevTodos.filter(item => item.id !== id
      );
      saveToLS(newTodos)
      return newTodos
    })
  }



  const handleDelete = (e, id) => {
    setTodos(prevTodos =>{
      const newTodos = prevTodos.filter(item => item.id !== id
      );
      saveToLS(newTodos)
      return newTodos
    })
  }



  const handleChange = (e) => {
    setTodo(e.target.value)
  }


  const handleCheckbox = (e) => {
    let id = e.target.name;
      const index = todos.findIndex(i =>i.id === id)
      let newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted
      saveToLS(newTodos)
      setTodos(newTodos)
  }


  const toggleFin = (e) => {
    setshowfin(prevShowFin => !prevShowFin)
  }

  return (
    <div className=''>
      <Navbar />
      <div className="my-3 md:container md:w-1/2 w-[90%] mx-auto rounded-xl p-5 text-white bg-slate-800 h-[83vh] min-h-[80vh] ">
        <h1 className='font-bold text-center text-xl'>eTask - Manage Your Task at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-3">
          <h2 className='text-lg font-bold'>Add a Task</h2>
          <input onChange={handleChange} value={todo} type="text" className='rounded-md w-full px-5 py-1 bg-gray-500' placeholder='Your Task' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='border font-bold hover:bg-slate-700 p-3 py-1 rounded-md border-none cursor-pointer'>Save</button>
        </div>
        <input onChange={toggleFin} type="checkbox" name="" className='md:ml-[75%]  mr-2' checked={showfin} id="" />Show Fnished
        <h2 className='text-lg font-bold text-center'>Your Task</h2>
        <div className=" items-center flex overflow-y-auto flex-col h-[43vh] todos">
          {todos.length === 0 && <div className=' m-5'>No Task to Display</div>}
          {todos.map(item => {
            return (showfin || !item.isCompleted) && <div key={item.id} className="todo flex justify-between md:w-[80%] w-[85%] md:mx-5 my-3 ">
              <div className='flex gap-5 items-center'>
                <input type="checkbox" onChange={handleCheckbox} checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='border font-bold hover:bg-slate-700 p-3 py-1 rounded-md ml-6 border-none text-xl'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='border font-bold hover:bg-slate-700 p-3 py-1 rounded-md mx-0 border-none text-2xl'><MdDeleteOutline /></button>
              </div>
            </div>
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
