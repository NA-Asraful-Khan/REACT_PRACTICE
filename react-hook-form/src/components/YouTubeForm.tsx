import { useForm ,useFieldArray, FieldErrors} from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import { useEffect } from "react"

type FormValues = {
  username: string,
  email: string,
  channel: string,
  social: {
    twitter: string,
    facebook: string
  },
  phoneNumbers: string[],
  phNumbers:{
    number:string
  }[],
  age:number,
  dob: string,
}


export const YouTubeForm = () => {
  let renderCount = 0
  const form = useForm<FormValues>({
    defaultValues: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
      const data = await response.json()
      return {
        username: data.name,
        email: data.email,
        channel: "",
        social: {
          twitter: "",
          facebook: ""
        },
        phoneNumbers: [
          "", ""
        ],
        phNumbers:[
          {number:''}
        ],
        age:0,
        dob: new Date().toISOString().split('T')[0]
      }
    },
    mode:"all"
  })
  const { register, control, handleSubmit, formState ,watch,getValues,setValue,reset} = form
  const { errors,isDirty,isValid,isSubmitSuccessful,isSubmitting } = formState
  

  const {fields,append,remove}=useFieldArray({
    name:'phNumbers',
    control
  })

  const submitForm = (data: FormValues) => {
    console.log('Form Submitted', data)
  }

  const onError =(errors:FieldErrors<FormValues>)=>{
    console.log("Form Errors", errors)
  }
  
  // const watchUserName = watch("username")
  const watchForm = watch()
  useEffect(()=>{
    const subscription = watch((value)=>{
      console.log(value)
    })
    return () =>subscription.unsubscribe()
  },[watch])

  const handleGetValues = ()=>{
    console.log("Get Values", getValues())
  }

  const handleSetValues = ()=>{
    setValue("username","",{
      shouldValidate:true,
      shouldDirty:true,
      shouldTouch:true
    })
  }

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset()
    }
  },[isSubmitSuccessful,reset])


  renderCount++
  return (
    <div>
      <h1>YouTube Form ({renderCount})</h1>
      <h2>Watched Values:{JSON.stringify(watchForm)}</h2>
      <form onSubmit={handleSubmit(submitForm,onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: 'Username is Required'
            })} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" {...register('email', {
            required: 'Email is erquired',
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Invalid Email Format'
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (fieldValue !== "admin@example.com" || "Enter a different Email Address")
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") || "This Domain is not supported"
                )
              },
              emailAvailable: async (fieldValue) => {
                const response = await fetch(
                  `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                );
                const data = await response.json();
                return data.length === 0 || "Email already exists";
              },
      
            },

          })} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register('channel', {
            required: 'Channel is erquired'
          })} />
          <p className="error">{errors.channel?.message}</p>
        </div>

        {/* Date  */}

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" {...register('age', {
            required: 'Age is erquired',
            valueAsNumber:true
          })} />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date Of Birth</label>
          <input type="date" id="dob" {...register('dob', {
            required: {
              value:true,
              message: "Date of Birth Is required"
            },
            valueAsDate:true
          })} />
          <p className="error">{errors.age?.message}</p>
        </div>


        {/* Social  */}

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input type="text" id="twitter" {...register('social.twitter', {
            disabled:watch("channel")!==""
          })} />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">facebook</label>
          <input type="text" id="facebook" {...register('social.facebook')} />
        </div>

        {/* Phone Number  */}

        <div className="form-control">
          <label htmlFor="primariPhone">Primary Number</label>
          <input type="text" id="primariPhone" {...register('phoneNumbers.0')} />
        </div>

        <div className="form-control">
          <label htmlFor="secondaryPhone">Secondary Number</label>
          <input type="text" id="secondaryPhone" {...register('phoneNumbers.1', {
            required: 'Phone Number is erquired'
          })} />
        </div>
        <p className="error">{errors.phoneNumbers?.[1]?.message}</p>


          <div>
            <label>List of phone numbers</label>
            <div>
              {fields.map((field,index)=>{
                return(
                  <div className="form-control" key={field.id}>
                    <input type="text"{...register(`phNumbers.${index}.number`as const)} />
                    {index> 0 && (
                      <button type="button" onClick={()=> remove(index)}>Remove</button>
                    )}
                  </div>
                )
              })}

              <button type="button" onClick={()=> append({number:""})}>Add Phone Number</button>
            </div>
          </div>

          

        <div>
        <button disabled={!isDirty || !isValid ||isSubmitting}>Submit</button>
        <button type="button" onClick={()=>reset()}>Reset</button>
        </div>

        <div>
        <button type="button" onClick={handleGetValues}>Get Values</button>
        <button type="button" onClick={handleSetValues}>Set Values</button>
        </div>
        
      </form>
  
      <DevTool control={control} />
    </div>
  )
}
