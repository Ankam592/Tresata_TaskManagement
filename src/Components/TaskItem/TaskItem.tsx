import './TaskItem.css'
import type { task } from '../TaskList/TaskList'
import { Trash2, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'




export const TaskItem = ({ id, title, description, status, timestamp }: task) => {

    const handleDelete = (id: string) => {
        const stored = localStorage.getItem("tasks");
        const tasks = stored ? JSON.parse(stored) : [];
        const newtask = tasks.filter((cur: any) => {
            return cur.id !== id
        })
        localStorage.setItem("tasks", JSON.stringify(newtask));
        window.location.reload();
    }
    return (
        <div className="task_item">
            <div className="task_head">

                <div className="name_icon">
                    <p>{title[0]}</p>
                </div>
                <div className="task_title">
                    <p style={{ textDecoration: status === "Completed" ? "line-through" : "none" }}>
                        {title}
                    </p>
                </div>

                <div className="task_statusdiv">
                    <div className={`${status === 'InProgress' ? 'task_statusinprogress' : (status === 'Completed' ? 'task_statusinpending' : 'task_statuscompleted')}`}>
                    </div>
                    <div className="task_status">
                        <p>{status}</p>
                    </div>
                </div>
            </div>
            <div className='task_desc_div'>
                <div className="name_icon_1">
                    <p>{title[0]}</p>
                </div>
                <div className='name_desc'>
                     <p style={{ textDecoration: status === "Completed" ? "line-through" : "none" }}>
                        {description}
                    </p>
                </div>

            </div>
            <div className='task_desc_div'>
                <div className="name_icon_1">
                    <p>{title[0]}</p>
                </div>
                <div className='time_desc'>
                    <p>{timestamp}</p>
                </div>
                <div className="task_unrestdiv">
                    <Link to={`/edit/${id}`}><div className="edit">
                        <Pencil size={15} color='blue' />
                    </div></Link>

                    <div className="delete" onClick={() => handleDelete(id)}>
                        <Trash2 size={15} color='red' />
                    </div>
                </div>
            </div>

        </div>
    )
}