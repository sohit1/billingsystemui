import '../Product/GenerateBill/GenerateBill.css'
import React , {useEffect, useState}from 'react';
import { Checkbox } from '@material-ui/core';
import './Attendance.css';
import config from '../../config.json';
import CustomButton from '../Common/CustomButton';
import {DatePickerComponent} from '@syncfusion/ej2-react-calendars';


const Attendance = (props) => {
    const[EmployeeData , setEmployeeData] = useState([]);
    const[checkBoxValues , setCheckBoxValues] = useState([]);
    const [fromSelectedValue,setFromSelectedValue] = useState(changeTimezone);

    function changeTimezone()
    {
      return new Date(
        new Date().toLocaleString('en-US', { timeZone: 'IST' })
      );
    }

    function onBackButtonClickHandler() {
        props.BackButtonClick();
    }
    useEffect(()=>
    {
        fetch(config.WEBAPI_URLLOCAL+"Employee/getemployes",
            {
                method: 'GET',
                headers:{
                    'Content-Type' : "application/json"
                }           
            }).then((response) => {
                if (response.status !== 200) {
                    alert(response.statusText);
                    return;
                }
                response.json().then((data) => {
                    if(data.responseStatus.errorNo !== 0)
                        {
                            alert(data.responseStatus.errorMessage);
                            return;
                        }
                        setEmployeeData(data.employes);
                });
            });

    } ,[]);

    function CheckBoxHandler(event)
    {
        if(event.target.checked)
            setCheckBoxValues((prevstate) => {
                return (prevstate.concat(event.target.value));
            });
        else
        {
            let index = checkBoxValues.indexOf(event.target.value);
            checkBoxValues.splice(index , 1);
        }
    }
    function SubmitHandler()
    {
        console.log(new Date(fromSelectedValue , "dd/MM/yyyy"));
        fetch(config.WEBAPI_URLLOCAL+"employee/insertattendance?Date="+ fromSelectedValue,
        {
            method: 'POST',
            body: JSON.stringify(checkBoxValues),
            headers:{
                'Content-Type' : "application/json"
            }           
        }).then((response) => {
            if (response.status !== 200) {
                alert("Something went wrong");
                return;
            }
            response.json().then((data) => {
                // setmylists([]);
                alert(data.responseStatus.errorMessage+" : #"+data.invoiceNo);
            });
        });
    }

    return (
        <React.Fragment>
            <div className ="xyz" style={{width:"88%", height:"100%"}}>
            <div style={{}}>
                <div style={{float:"right",marginBottom:"2%",width:"17%",backgroundColor:"chocolate",borderRadius:"15px"}}>
                    <DatePickerComponent format={"dd/MM/yyyy"} value={fromSelectedValue} change={date => setFromSelectedValue(date.value)}></DatePickerComponent>
                </div>
            </div>
            <div className="atddiv" style={{width: "100%",height:"88%" }}>
                <table style={{ width: "100%", marginLeft: "2%", marginTop: "2%", borderCollapse: "collapse" }}>

                    <tbody>
                        <tr style={{ textAlign: "left", backgroundColor: "aliceblue" }}>
                            <th style={{ height: "50px", borderRadius: "10px 0px 0px 10px" }}>#EmpId</th>
                            <th>EmpName</th>
                            <th style={{ borderRadius: "0px 10px 10px 0px" }}></th>
                        </tr>
                        {
                            EmployeeData.map((tbltr, key) => <tr className="abc" key={key + tbltr.EmpId}>
                                <td>{tbltr.employeeId}</td>
                                <td>{tbltr.employeeName}</td>
                                <td><Checkbox value={tbltr.employeeId} onClick={CheckBoxHandler}/></td>
                            </tr>)
                        }
                    </tbody>
                </table>

            </div>
            <div style={{ width: "100%", marginLeft: "2%", marginTop: "2%" }} onClick={SubmitHandler}>
                <CustomButton Text="Submit"></CustomButton>
            </div>
            </div>
        </React.Fragment>
    );
}
export default Attendance;