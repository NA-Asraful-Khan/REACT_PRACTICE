type PersonName = {
    name: {
        firstName: string,
        lastName: string
    }
}
export const PersonName = (props: PersonName) => {
    return (
        <>
            <h3>First Name: {props.name.firstName}</h3>
            <h3>Last Name: {props.name.lastName}</h3>
        </>
    )
}
