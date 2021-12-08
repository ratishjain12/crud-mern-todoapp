
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Todoitem from './components/Todoitem';
import {useState,useEffect} from 'react';
import Axios from 'axios';
import {TodoContext} from './context/TodoContext';

 
function App() {
  const [input, setInput] = useState();
  const [item, setItem] = useState([]);
  const [track,setTrack] = useState(false);

  useEffect(() => {
    Axios.get("https://crud-todoapp.herokuapp.com/find").then((Response)=>{
      console.log(Response)
      if(Response.data === false){
        setItem([])
      }else{
        setItem(Response.data);
      }
      
      
      console.log(item);
    })
  }, [track]);

  const add = (e) =>{
    e.preventDefault();
    Axios.post("https://crud-todoapp.herokuapp.com/additem",{title:input}).then((Response)=>{
      console.log(Response);
      setTrack(!track);
    })
    setInput('');
  }
  return (
    <div className="App flex items-center">
    <div className="bg-tertiary ml-3 mr-3 h-3/4 mx-auto overflow-auto overflow-x-hidden rounded-md lg:w-1/2 lg:mx-auto md:w-1/2 md:mx-auto sm:w-1/2 sm:mx-auto shadow-md overflow-auto overflow-x-hidden ">
    <p className="text-center font-bold mt-2 text-xl">To-Do List</p>
    <div className="flex flex-col ml-3 mr-3 lg:mx-auto items-center">
    <Box
      sx={{
        width: 500,
        height:80,
        maxWidth: '100%',
      }} 
      className="mt-8 "
      >
      <form onSubmit={add}>
      <TextField fullWidth id="fullWidth" color="secondary" onChange={(e)=>{setInput(e.target.value)}} value={input} placeholder="add item"/>
      </form>
      
    </Box>
    </div>
    <div>
   
    <button className="ml-5 mb-2 bg-primary w-24 lg:ml-22 rounded h-12 shadow-md" onClick={add} type="submit" disabled={!input}>
      ADD
    </button>
    <TodoContext.Provider value={{track,setTrack}}>
    {item?.map((items)=>{
      return(
        
        <Todoitem title={items.title} id = {items._id}/>
        
        
      );
      
    })}
    </TodoContext.Provider>
    
    
    </div>
   
    
    </div>
    
    </div>
  );
}

export default App;
