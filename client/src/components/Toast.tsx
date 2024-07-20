

export const Toast = (props: {text: string, open: boolean}) => {
    const className = `${props.open ? 'show' : ''} toast`
    return (
      <div className={className}>
        <p>{props.text}</p>
        </div>
    )
  }