import type { ChangeEvent } from 'react'
import './Input.css'
type searchInput =
{
    placeholder : string,
    type : string,
    name : string,
    value : string
    className : string,
    onChange : (e:ChangeEvent<HTMLInputElement>)=>void

}

export const Input = ({ placeholder = 'Enter the text', type = 'text',name , value = '',onChange ,  className = ''} : searchInput)=>
{
    return (
        <input type={type} placeholder={placeholder} value={value} name={name} onChange={onChange} className={className} />
    )
}