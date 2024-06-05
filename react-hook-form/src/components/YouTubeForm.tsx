import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"

type FormValues = {
  username: string,
  email: string,
  channel: string
}


export const YouTubeForm = () => {
  let renderCount = 0
  const form = useForm<FormValues>()
  const { register, control, handleSubmit, formState } = form
  const { errors } = formState

  const submitForm = (data: FormValues) => {
    console.log('Form Submitted', data)
  }

  renderCount++
  return (
    <div>
      <h1>YouTube Form ({renderCount})</h1>

      <form onSubmit={handleSubmit(submitForm)} noValidate>
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
            validate:{
              notAdmin:(fieldValue)=>{
                return(fieldValue !=="admin@example.com" || "Enter a different Email Address")
              },
              notBlackListed:(fieldValue)=>{
                return(
                  !fieldValue.endsWith("baddomain.com")||"This Domain is not supported"
                )
              }
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
        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  )
}
