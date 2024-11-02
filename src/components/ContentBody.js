const ContentBody = ({children, className, ...props}) => {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E5E5E5", overflow: "auto",
      width: props.width||"100%", height: props.height||"100%", padding: props.padding||"24px", boxSizing: "border-box",
      ...props
    }}>
      {children}
    </div>
  )
}

export default ContentBody;
