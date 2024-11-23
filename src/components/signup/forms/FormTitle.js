const FormTitle = props => {
  return (
    <div style={{flex: 1, display: "flex", alignItems: "center", fontSize: "14px", fontWeight: 600, gap: "4px", margin: "5px 0"}}>
        {props.title}
        {props.required && <div style={{width: "4px", height: "4px", backgroundColor: "red", borderRadius: "50%", marginBottom: "14px"}} />}
    </div>
  )
}

export default FormTitle;
