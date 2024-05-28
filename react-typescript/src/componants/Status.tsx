type StatusProps = {
    status: 'loading'|"success"|"error"
}



export const Status = (props:StatusProps) => {
    let message
    if(props.status === 'loading'){
        message = "Loading...."
    }else if(props.status === 'success'){
        message = "Data Fetched Succesfully"
    }else if(props.status === 'error'){
        message = "Data Fetched Failed"
    }
  return (
    <>
        <h2>Status: {message}</h2>
    </>
  )
}
