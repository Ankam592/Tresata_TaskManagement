import React, { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import './AddTaskForm.css'

type Formdata =
    {
        title: string,
        description: string
    }
export const AddTaskForm = () => {
    const [formdata, setFormData] = useState<Formdata>(
        {
            title: "",
            description: ""
        }
    )
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))

    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const stored = localStorage.getItem('tasks');
        const tasks = stored ? JSON.parse(stored) : [];
        const task_add = {
           id: tasks.length , title: formdata.title, description: formdata.description, status: "Pending", timestamp: formatDate(new Date())
        }
        tasks.push(task_add)
        localStorage.setItem("tasks", JSON.stringify(tasks))
        setFormData({ title: "", description: "" })
    }

     const handleCancel = () => {
        setFormData({ title: "", description: "" })
    }


    function formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, "0");
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    return (

        <div className="addTask">
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <div className="title_div">
                    <Input placeholder="Enter the title" type="text" name='title' value={formdata.title} onChange={(e) => handleChange(e)} className="searchinput"></Input>
                </div>
                <div className="desc_div">
                    <textarea placeholder="Enter the description"  name="description" value={formdata.description} onChange={(e) => handleChange(e)} className="descinput"></textarea>
                </div>
                <div className="formbtns">
                    <div className="cancel">
                        <button className="cancelbtn" type="button"  onClick={() => handleCancel()} >Cancel</button>
                    </div>
                    <div className="add" >
                        <Button className="addbtn" type="submit">ADD</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}