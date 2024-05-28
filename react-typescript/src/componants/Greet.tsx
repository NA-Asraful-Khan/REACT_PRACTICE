type GreetProps = {
    name: string
}


export const Greet = (props:GreetProps) => {
  return (
    <h2>Hello {props.name}!</h2>
  )
}
