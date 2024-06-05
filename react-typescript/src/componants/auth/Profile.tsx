export type ProfileProps = {
    name:string
}
export const Profile = ({name}:ProfileProps) => {
  return (
    <div style={{ margin: '15px', border: '1px solid black' }}>Private Profile Comp Name is {name}</div>
  )
}
