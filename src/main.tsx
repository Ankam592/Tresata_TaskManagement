import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AddTaskForm } from './Components/AddTaskForm/AddTaskForm.tsx'
import { TaskList } from './Components/TaskList/TaskList.tsx'
import { EditTask } from './Components/EditTask/EditTask.tsx'
import './index.css'
import App from './App.tsx'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:
      [{
        path: '',
        element: <TaskList></TaskList>
      },
      {
        path:'addTask',
        element: <AddTaskForm></AddTaskForm>
      },
       {
        path:'edit/:id',
        element: <EditTask></EditTask>
      },
       {
        path:'delete/:id',
        element: <></>
      }
      ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>
)
