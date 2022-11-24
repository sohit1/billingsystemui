const CustomButton=(props)=>
{
  return(
  <div style={{cursor:"pointer",width:"100%",backgroundColor:`chocolate`,height:"100%",textWeight:"bold",textAlign:"center",lineHeight:"2",borderRadius:`${props.BorderRadius}`}}>
    <label style={{color:`${props.Color}`,cursor:"pointer"}}>
      {props.Text}
    </label>
  </div>
  );
}
export default CustomButton;