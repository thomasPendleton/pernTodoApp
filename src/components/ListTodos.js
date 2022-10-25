import React, { useEffect, useState } from "react"
import EditTodo from "./EditTodo"

const ListTodos = () => {
  const [todosList, setTodosList] = useState([])

  const deleteTodo = async (id) => {
    console.log("delete")
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      })
      setTodosList(todosList.filter((item) => item.todo_id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const editTodo = async () => {
    console.log("edit")
  }

  const getTodos = async () => {
    const response = await fetch("http://localhost:5000/todos")
    const data = await response.json()
    setTodosList(data)
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todosList.map((item) => {
            // console.log(item)
            const { todo_id, description } = item
            return (
              <tr key={todo_id}>
                <td>{description}</td>
                <td onClick={editTodo}>
                  <EditTodo todo={item} />
                </td>
                <td onClick={() => deleteTodo(todo_id)}>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default ListTodos
