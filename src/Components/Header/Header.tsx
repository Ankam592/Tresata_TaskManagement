import { useLocation } from 'react-router-dom'
import './Header.css'
import { ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';


export const Header = () => {
    const path = useLocation().pathname;



    return (
        <header className='header'>
            {path.startsWith('/edit/') ? <div className="heading">
                <Link to='/'>
                    <div className="headIcon">
                        <ArrowLeft size={20} color='#FFFFFF' />
                    </div></Link>

                <div className="HeadText">
                    <h1 className='apph'>Edit Task</h1>
                </div>
            </div> : (path == '/addTask' ?
                <div className="heading">
                   <Link to='/'>
                    <div className="headIcon">
                        <ArrowLeft size={20} color='#FFFFFF' />
                    </div></Link>
                    <div className="HeadText">
                        <h1 className='apph'>Add Task</h1>
                    </div>
                </div>
                : <div className="heading">
                    <div className="HeadText">
                        <h1 className='apph'>TO-DO APP</h1>
                    </div>
                </div>)}

        </header>
    )
} 