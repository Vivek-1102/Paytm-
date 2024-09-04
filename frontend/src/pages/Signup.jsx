import { useState } from "react";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router";

export  function Signup(){
  const navigate = useNavigate();
  const [firstName , setFirstName]=useState("");
  const [lastName , setLastName]=useState("");
  const [email , setEmail]=useState("");
  const [password , setPassword]=useState("");
  
    
 return <>
<section className="relative flex flex-wrap lg:h-screen lg:items-center">
  <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
    <div className="mx-auto max-w-lg text-center">
      <Heading heading={"Get Started!"}/>
      <SubHeading subHeading={"Enter your details to create your account"}/>
     </div>

    <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
      <Input onChange={(e)=>{
        setFirstName(e.target.value);
      }} type={"text"} label={"Firstname"} placeholder={"Enter Firstname"}/>
      <Input onChange={(e)=>{
        setLastName(e.target.value);
      }} type={"text"} label={"Lastname"} placeholder={"Enter Lastname"}/>
      <Input onChange={(e)=>{
        setEmail(e.target.value);
      }} type={"email"} label={"Email"} placeholder={"Enter email"}/>
      <Input onChange={(e)=>{
        setPassword(e.target.value);
      }} type={"password"} label={"Password"} placeholder={"Enter password"}/>
      
      <div className="flex items-center justify-between">
       <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
       <Button name={"Sign up"} onClick={async ()=>{
        const response =await axios.post("http://localhost:3000/api/v1/user/signup",{
          firstName : firstName,
          lastName : lastName,
          username : email,
          password : password
        })
        console.log(response);
        localStorage.setItem("token",response.data.token);
        console.log("after navigate");
        navigate("/dashboard");
        console.log("before navigate");
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