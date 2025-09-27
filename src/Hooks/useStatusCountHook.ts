import type { task } from "../Components/TaskList/TaskList"

export const useStatusCountHook = (Task:task[] , status : string)=>
{
    const status_task = Task.filter((cur)=>
    {
        return cur.status === status
            
    })
    return status_task.length
}