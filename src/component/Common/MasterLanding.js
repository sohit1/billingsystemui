import MainHeader from "./Header";
import './Common.css';
import SideTab from "./SideTab";
import GenerateBill from "../Product/GenerateBill/GenerateBill.js"
import BillInfo from "../Product/ViewBills/BillInfo"
import config from '../../config.json'
import { useState } from 'react'
import MobileMenuItems from "./MobileMenuItems";
import Attendance from "../Employee/Attendance";
import ManageEmployee from "../Employee/ManageEmployee";

const MasterLanding = (props) => {
    const [sideTabMenuItem, setSideTabMenuItem] = useState("");
    function mainHeaderEventHandler(param)
    {
        if(param == "true")
        {
            props.IsMasterPage("LandingPage")
        }

    }
    function onBackButtonClickHandler()
    {
        setSideTabMenuItem("");
    }

    const sideTabClickHandler=(param) =>{
        if(param === config.RESOURCES.GENERATEINVOICE)
        {
            setSideTabMenuItem(config.RESOURCES.GENERATEINVOICE);
        }
        else if(param === config.RESOURCES.CHECKINVOICE)
        {
            setSideTabMenuItem(config.RESOURCES.CHECKINVOICE);
        }
        else if(param === config.RESOURCES.EMPLOYEE)
        {
            setSideTabMenuItem(config.RESOURCES.EMPLOYEE);
        }
    }

    return (
        <div className="divheight">
            <MainHeader IsLogout={mainHeaderEventHandler}></MainHeader>
            <div className="content">
                <SideTab sideTabClickHandler={sideTabClickHandler} />
                <div className="d-flex w-90 f-direction-column w-mv-100 h-100">
                    {
                        sideTabMenuItem === config.RESOURCES.GENERATEINVOICE &&
                        <GenerateBill BackButtonClick={onBackButtonClickHandler}></GenerateBill>
                    }
                    {
                        sideTabMenuItem === config.RESOURCES.CHECKINVOICE &&
                        <BillInfo BackButtonClick={onBackButtonClickHandler} />
                    }
                    {
                        sideTabMenuItem === "" &&
                        <MobileMenuItems sideTabClickHandler={sideTabClickHandler} />
                    }
                    {
                        sideTabMenuItem === config.RESOURCES.EMPLOYEE &&
                        <ManageEmployee BackButtonClick={onBackButtonClickHandler} />
                    }
                </div>
            </div>
            
        </div>
    );
}
export default MasterLanding;