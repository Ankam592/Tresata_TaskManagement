import React, { useEffect, useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import "./EditTask.css";
import { useParams } from "react-router-dom";
import { ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Formdata = {
    title: string;
    description: string;
    status: string;
};

export const EditTask = () => {
    const { id } = useParams<{ id: string }>();
    const [isOpen, setOpen] = useState<boolean>(false);
    const [clicked, setClicked] = useState(false);
    const [error, setError] = useState("");

    const [formdata, setFormData] = useState<Formdata>({
        title: "",
        description: "",
        status: "",
    });

    useEffect(() => {
        const ld = JSON.parse(localStorage.getItem("tasks") || "[]");
        const data = ld ? ld.find((cur: any) => cur?.id == id) : null;
        if (data) {
            setFormData({
                title: data.title,
                description: data.description,
                status: data.status || "Pending",
            });
        }
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formdata.title === "") {
            setError("Please enter title!");
            setTimeout(() => {
                setError("");
            }, 2000);
        } else {
            const stored = localStorage.getItem("tasks");
            const tasks = stored ? JSON.parse(stored) : [];
            const new_tasks = tasks.map((cur: any) => {
                if (cur.id == id) {
                    return {
                        ...cur,
                        title: formdata.title,
                        description: formdata.description,
                        status: formdata.status,
                        timestamp: formatDate(new Date()),
                    };
                }
                return cur;
            });
            localStorage.setItem("tasks", JSON.stringify(new_tasks));
            setFormData({ title: "", description: "", status: "" });
        }
    };

    function formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, "0");
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    const handleStatus = (stat: string) => {
        setFormData((prev) => ({ ...prev, status: stat }));
        setClicked(!clicked);
        setOpen(false);
    };
     const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
            setFormData({ title: "", description: "" ,status:"Pending"})
        }

    return (
        <div className="addTask">
            <form onSubmit={handleSubmit}>
                <div className="title_div">
                    <Input
                        placeholder="Enter the title"
                        type="text"
                        name="title"
                        value={formdata.title}
                        onChange={handleChange}
                        className="searchinput"
                    />
                </div>

                <div className="desc_div">
                    <textarea
                        placeholder="Enter the description"
                        rows={4}
                        name="description"
                        value={formdata.description}
                        onChange={handleChange}
                        className="descinput"
                    />
                </div>

                {/* Status dropdown trigger + floating dropdown */}
                <div className="status_wrapper">
                    <div className="status_div" onClick={() => setOpen((prev) => !prev)}>
                        <div className="status_color" style={{ backgroundColor: formdata.status === 'Pending' ? '#D0D0D0' : (formdata.status === 'Completed' ? '#368A04' : '#FFB03C') }} />
                        <div className="status_">
                            <p>{formdata.status || "Pending"}</p>
                        </div>
                        <div className="status_icon">
                            {!isOpen ? <ChevronDown /> : <ChevronUp />}
                        </div>
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="taskstatus_dropdown"
                            >
                                <div className="pending" onClick={() => handleStatus("Pending")}>
                                    <div className="status_color_pending"></div>
                                    <div className="status_">
                                        <p>Pending</p>
                                    </div>
                                </div>
                                <div
                                    className="progress"
                                    onClick={() => handleStatus("InProgress")}
                                >
                                    <div className="status_color_progress"></div>
                                    <div className="status_">
                                        <p>In Progress</p>
                                    </div>
                                </div>
                                <div
                                    className="completed"
                                    onClick={() => handleStatus("Completed")}
                                >
                                    <div className="status_color_completed"></div>
                                    <div className="status_">
                                        <p>Completed</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Buttons */}
                <div className="formbtns">
                    <div className="cancel">
                        <button className="cancelbtn" type="button" onClick={(e) => handleCancel(e)} >Cancel</button>                        </div>
                    {error && (
                        <div className="cancel">
                            <p style={{ color: "red", fontSize: "12px" }}>{error}</p>
                        </div>
                    )}
                    <div className="add">
                        <Button className="addbtn" type="submit">
                            ADD
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
