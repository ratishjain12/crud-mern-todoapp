import React,{useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Axios from 'axios';
import {useContext} from 'react';
import {TodoContext} from '../context/TodoContext';
import Modal from "react-modal";
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import './todo.css'

Modal.setAppElement('#root');
function Todoitem({title,id}) {
    const {setTrack,track} = useContext(TodoContext);
    const [updateInput, setUpdateinput] = useState();
    const [isopen, setIsOpen] = useState(false);
    const  update = (e) =>{
        e.preventDefault();
        Axios.post("https://crud-todoapp.herokuapp.com/update",{id:id,title:updateInput}).then((Response)=>{
            setTrack(!track);
            setIsOpen(false);
        })
    }

    const deleteitem = (e) =>{
        e.preventDefault();
        Axios.post("https://crud-todoapp.herokuapp.com/remove",{id:id}).then((Response)=>{
            
            setTrack(!track);
        })
    }
    return (
        <>
        <div className='todoitem flex items-center justify-between m-2 mt-2 bg-primary rounded-md shadow-md p-2 ml-5 mr-5' >
            <div className='leftside'>
                <p className='ml-2 font-bold'>{title}</p>
                

            </div>
            <div className='rightside'>
            <button onClick={()=>setIsOpen(true)}>
            <Checkbox icon={<EditIcon className='text-purple-500'/>} checkedIcon={<EditIcon className='text-purple-800'/>} />
            </button>
            <button onClick={deleteitem}>
            <Checkbox icon={<DeleteIcon className='text-purple-700'/>} checkedIcon={<DeleteIcon className='text-purple-900'/>} />
            
            </button>
            
           

            </div>
            
            
        </div>
        <div>
                <Modal isOpen={isopen} onRequestClose={()=>setIsOpen(false)} className="modal shadow-xl rounded-md ">
                <div className="flex items-center">
                <p className='text-center font-bold flex-1 text-lg ml-11 '>Update</p>
                
                <Checkbox icon={<CloseIcon className='text-purple-500'/>} checkedIcon={<CloseIcon className='text-purple-800'/>} onChange={update} onClick={()=>setIsOpen(false)}/>
                </div>
                <div className='flex justify-center mt-1'>
                <form onSubmit={update}>
                <TextField id="fullWidth" color="secondary" placeholder="Update...." className='  w-42 md:w-72  lg:w-80 ' onChange={(e)=>{setUpdateinput(e.target.value)}}/>
                </form>  
                </div>
                <div className='flex justify-center'>
                <button className="bg-primary p-2 mt-2 rounded-lg pl-12 pr-12 md:pl-24 text-black font-bold  md:pr-24" onClick={update}>Update</button>
                </div>
               
                
                </Modal>
        </div>
        </>
    )
}

export default Todoitem
