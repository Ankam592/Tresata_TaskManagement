
import type { ReactNode,ButtonHTMLAttributes } from "react";

type Btn = 
{
    className?: string,
    type?:string,
    children?:ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({className = '' ,type,children} : Btn)=>
{

    return (
        <button className={className} type={type}>{children}</button>
    )
}