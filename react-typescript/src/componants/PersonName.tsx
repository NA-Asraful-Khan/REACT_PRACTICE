import { PersonNameProps } from "./Person.type"


export const PersonName = (props: PersonNameProps) => {
    return (
        <>
            <h3>First Name: {props.name.first}</h3>
            <h3>Last Name: {props.name.last}</h3>
        </>
    )
}
