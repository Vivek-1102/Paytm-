import { useEffect } from "react";
import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/User";
import axios from "axios";

export  function Dashboard(){
   
    // useEffect(async()=>{
    //  const response = await axios.get("http://localhost:3000/api/v1/user")
    // },[])

    return <div>
    <Appbar/>
    <div className="m-8"></div>
    <Balance value={"10000"}/>
     <Users/> 
    </div>
}