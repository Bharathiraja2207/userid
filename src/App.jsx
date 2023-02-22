import { useEffect, useState } from 'react'
import './App.css'
 import { Formik, useFormik } from 'formik';
import { Route, Routes, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Editid } from './Editid';
import * as yup from "yup";


const formValidationSchema = yup.object({
  id: yup.number().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
});

export default function App() {

 
  return (
    <div className="App">
      <ButtonAppBar/>
   
    </div>
  )
}


 function ButtonAppBar() {
  const navigate=useNavigate()
  return (
    <div  className='navbar'>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit" onClick={()=>navigate("/")}>Home</Button>
          <Button color="inherit" onClick={()=>navigate("/adddata")}>Adduser</Button>
        </Toolbar>


       
      
      </AppBar>
    </Box>
    <Routes>
      <Route path='/' element={< Userdata/>}></Route>
      <Route path='/edit/:id' element={<Editid/>}></Route>
      <Route path='/adddata' element={ <Adddata/>}></Route>
    </Routes>
    </div>
  );
}
 function Userdata(){
  
  const[list,setlist]=useState([])
  
  const getid=()=>{ fetch("https://63f0967c5b7cf4107e22d318.mockapi.io/userid")
  .then((data)=>data.json())
  .then((mvs)=>setlist(mvs)),[];}
    
  useEffect(()=>getid());
    // fetch("https://63f0967c5b7cf4107e22d318.mockapi.io/userid")
    // .then((data)=>data.json())
    // .then((mvs)=>setlist(mvs)),[];



   const deleteid=(id)=>{
    fetch(`https://63f0967c5b7cf4107e22d318.mockapi.io/userid/${id}`,{method:"DELETE"})
    .then(()=>getid())
      // console.log("deleteid..",id)
    }

const navigate = useNavigate();

  return(
    <div className='user'>
    {list.map((dt)=><User datas={dt} id={dt.id}
    
    deletebutton={ 
      <IconButton color="primary" aria-label="delete" onClick={()=>deleteid(dt.id)}> <DeleteIcon /></IconButton>

      }
      
      editbutton={ 
        <IconButton color="primary" aria-label="Edit" onClick={()=>navigate(`/edit/${dt.id}`)}> <EditIcon /></IconButton>
      }/>
      )}
    </div>
  )
 }

 function User({datas,deletebutton,editbutton}){
  return(


<div className="users">
<Card sx={{ minWidth: 275 }}>
  <CardContent>
    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      <b>EMAIL        :</b>{datas.email}
    </Typography>
    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      <b>USER NAME       :</b>{datas.username}
    </Typography>
  </CardContent>
  <CardActions>
    <Stack direction="row" spacing={1}>
    {editbutton}
    {deletebutton}
    </Stack>
  </CardActions>
</Card>
</div>
  )
 }
 
 function Adddata(){

  const navigate=useNavigate()

const formik=useFormik({
  initialValues:{
    id:"",
    username:"",
    email:""
  },
  validationSchema: formValidationSchema,
  onSubmit:(newdata)=>{
    // console.log("form value..",newdata),
  adddata(newdata)}
});

// const[id,setid]=useState("")
// const[username,setusername]=useState("")
// const[email,setemail]=useState("")
const adddata= (newdata)=>{
  console.log(newdata)
//     const newdata={
//  id:id,
//  username:username,
//  email:email
//      };
     fetch("https://63f0967c5b7cf4107e22d318.mockapi.io/userid",{
      method:"POST",
    body:JSON.stringify(newdata),
  headers:{
    "content-type":"application/json"
  }
     })
     navigate("/")
   };
    

  return(
<form onSubmit={formik.handleSubmit}>
  <input 
  name="id"
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.id}
  ></input>
  {formik.errors.id && formik.touched.id ? (<div>{formik.errors.id }</div>) : null}

 <br></br>

  <input
   name="username"
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.username}
  type="text"></input>
  {formik.errors.username && formik.touched.username ? (<div>{formik.errors.username }</div>) : null}

 <br></br>

  <input
   name="email"
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.email}
  type='email'></input>

{formik.errors.email && formik.touched.email ? (<div>{formik.errors.email }</div>) : null}

  <button type="submit" >Addmovie</button>
</form>

  )
 
 }

 
