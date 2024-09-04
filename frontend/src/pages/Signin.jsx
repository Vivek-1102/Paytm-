import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router";

export  function Signin(){
  const navigate = useNavigate();
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
    
    return <>
       

<section className="relative flex flex-wrap lg:h-screen lg:items-center">
  <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
    <div className="mx-auto max-w-lg text-center">
      <Heading heading={"Welcome Back!"}/>
      <SubHeading subHeading={"Enter your details to login into your account"}/>
     </div>

    <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">

      <Input onChange={(e)=>{setEmail(e.target.value)}} type={"email"} label={"Email"} placeholder={"Enter email"}/>
      <Input onChange={(e)=>{setPassword(e.target.value)}} type={"paasword"} label={"Password"} placeholder={"Enter password"}/>
      
      <div className="flex items-center justify-between">
       <BottomWarning label={"No account?"} buttonText={"Sign up"} to={"/signup"}/>
       <Button name={"Sign in"} onClick={async ()=>{
        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
          username:email,
          password: password
        })
        localStorage.setItem("SiginTOken",response.data.token)
        navigate("/dashboard");
       }}/>
      </div>
    </form>
  </div>

  <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
    <img
      alt=""
      src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
      className="absolute inset-0 h-full w-full object-cover"
    />
  </div>
</section>
    </>
}