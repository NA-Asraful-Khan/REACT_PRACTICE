type GreetProps = {
    name: string,
    messageCount: number,
    isLoggedIn: boolean
}


export const Greet = (props:GreetProps) => {
  return (
    <>
    {
        props.isLoggedIn?<h2>Hello {props.name}! You have {props.messageCount} message unread.</h2>: <h2>Hello User! Please Log In.</h2>
    }
    
    </>
  )
}
