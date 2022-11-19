import '../Product/GenerateBill/GenerateBill.css'
import config from '../../config.json';
import React , {useState , useEffect} from 'react';
import attendanceIcon from "../../images/attendance.png";
import salaryIcon from "../../images/salary.png";
import Organisation from "../../images/Organisation.jpg";
import style from './ManageEmployee.module.css';
import Attendance from './Attendance';


const ManageEmployee = (props) =>
{
    const [Screen,setScreen] = useState("");
    const [Message ,setMessage] = useState("");
    
    useEffect(() =>
    {
        let date = new Date();
        let hours = date.getHours() + (date.getMinutes()/60);
        if(hours > 12 && hours < 18 )
            setMessage("Good Afternoon");
        else if(hours > 18 && hours < 23.99)
            setMessage("Good Evening");
        else
            setMessage("Good Morning");
    },[]);

    function AttendanceHandler(param)
    {
        setMessage(config.RESOURCES.ATTENDANCE);
        setScreen(config.RESOURCES.ATTENDANCE);
    }
    
    return(
        <div className="gnb-wdthgt">
            <div className="mb-title title">
                {/* <Title Title={config.RESOURCES.GENERATEINVOICE} BackButtonClick={onBackButtonClickHandler}/> */}
                <span className="mbdisplaynone"><label className='gnb-label'>{config.RESOURCES.EMPLOYEE}</label></span>
            </div>
            <div className='inv-content-out'>
                <div className={"inv-content "+style.content}>
                    <div className={style.sideMenu}>
                        <div className="logo-name" style={{ height: "30%" }}>
                            <div className='logo' style={{ height: "75%", textAlign: "center" }}>
                                <img style={{ height: "70%", width: "45%", borderRadius: "50%", marginTop: "10%", border: "5px solid grey" }} src={Organisation}></img>
                            </div>
                            <div className="name" style={{ height: "15%", color: "black", fontWeight: "700", textAlign: "center", fontSize: "130%", fontFamily: "serif" }}>
                                <label style={{ color: "black" }}>Abc Organisation</label>
                            </div>
                            <div style={{ borderBottom: "2px solid grey", margin: "2%" }}></div>
                        </div>
                        <div style={{ height: "70%", margin: "15%", marginTop: "2%", fontFamily: "serif" }}>
                            <table style={{ borderSpacing: "0 15px", color: "grey", fontFamily: "serif" }}>
                                <tbody>
                                    <tr style={{ cursor: "pointer" }} onClick={AttendanceHandler}>
                                        <td style={{ height: "20px" }} className={style.firsttd}>
                                            <img src={attendanceIcon}></img>
                                        </td>
                                        <td>
                                            <lable>{config.RESOURCES.ATTENDANCE}</lable>
                                        </td>
                                    </tr>
                                    <tr style={{ cursor: "pointer" }}>
                                        <td style={{ height: "20px" }} className={style.firsttd}>
                                            <img src={salaryIcon}></img>
                                        </td>
                                        <td>
                                            <lable>Salary</lable>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="" style={{ position: "relative", float: "right", width: "75%", height:"93%"}}>
                        {
                            Screen==="" &&
                            <div style={{marginTop:"2%"}}>
                                <lable className="screen-title">{Message}</lable>
                                <p>This screen is provided to maintain the empolyee details.</p>
                            </div>
                        }
                        {
                            Screen === config.RESOURCES.ATTENDANCE &&
                            <div style={{marginTop:"2%",height:"100%"}}>
                                <lable className="screen-title">{Message}</lable>
                                <div style={{height:"100%"}}>
                                    <Attendance></Attendance>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ManageEmployee;