import { useForm } from "react-hook-form"
import {DevTool}from "@hookform/devtools"

type FormValues ={
  username:string,
  email:string,
  channel:string
}


export const YouTubeForm = () => {
  let renderCount =0
  const form = useForm<FormValues>()
  const {register,control,handleSubmit}=form

  const submitForm=(data:FormValues)=>{
    console.log('Form Submitted', data)
  }

  renderCount++
  return (
    <div>
      <h1>YouTube Form ({renderCount})</h1>

      <form onSubmit={handleSubmit(submitForm)}>
        <label htmlFor="username">Username</label>
        <input
         type="text" 
         id="username" 
         {...register("username")}/>

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register('email')} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register('channel')}  />

        <button>Submit</button>
      </form>

      <DevTool control={control}/>
    </div>
  )
}
