import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';

type UserData={
  name:string;
  email:string;
}

const App:React.FC=()=>{
  const [userData,setUserData]=useState<UserData | null>(null);

  const fetchData=async()=>{
    try{
      const response= await axios.get('https://randomuser.me/api');
      const {results}=response.data;
      const {name,email}=results[0];
      const userData:UserData={name:`${name.first} ${name.last}`,email}
      setUserData(userData);
      localStorage.setItem('userData',JSON.stringify(userData));
    }catch(error){
      console.error('Error',error);
    }
  }
  const refreshData=()=>{
    fetchData();
  }
  useEffect(()=>{
    const savedUserData=localStorage.getItem('userData');
    if(savedUserData){
      setUserData(JSON.parse(savedUserData));
    }else{
      fetchData();
    }
  },[]);

  return(
    <div className="mainDiv">
      <button onClick={refreshData} className='buttonStyle'>Refresh</button>
      {userData? (
        <div className='dataDiv'>
          <p>Name : {userData.name}</p>
          <p>Email : {userData.email}</p>
        </div>
      ):(
        <p>Loading...</p>
      )}
    </div>
  )
}
 

export default App;
