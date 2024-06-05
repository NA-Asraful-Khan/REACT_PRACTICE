type ListProps<T> = {
    items: T[]
    onClick: (value: T) => void
  }
  
  export const List = <T extends {
      last: string,
      first: string, 
      id: number 
}>({
    items,
    onClick
  }: ListProps<T>) => {
    return (
      <div style={{ margin: '15px', border: '1px solid black' }}>
        <h2>List of items</h2>
        {items.map(item => {
          return (
            <div key={item.id} onClick={() => onClick(item)}>
              {item.first} {item.last}
            </div>
          )
        })}
      </div>
    )
  }