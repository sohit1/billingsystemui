import MainHeader from "./Header";
import './Common.css';
import SideTab from "./SideTab";
import GenerateBill from "../Product/GenerateBill/GenerateBill.js"
import BillInfo from "../Product/ViewBills/BillInfo"
import config from '../../config.json'
import { useState } from 'react'
import MobileMenuItems from "./MobileMenuItems";

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
    }

    return (
        <div className="divheight">
            <MainHeader IsLogout = {mainHeaderEventHandler}></MainHeader>
            <div className="content">
                <SideTab sideTabClickHandler ={sideTabClickHandler}/>
                {
                    sideTabMenuItem === config.RESOURCES.GENERATEINVOICE &&
                    <GenerateBill BackButtonClick ={onBackButtonClickHandler}></GenerateBill>
                }
                {
                    sideTabMenuItem === config.RESOURCES.CHECKINVOICE &&
                    <BillInfo BackButtonClick ={onBackButtonClickHandler}/>
                }
                {
                    sideTabMenuItem === "" &&
                    <MobileMenuItems sideTabClickHandler ={sideTabClickHandler}/>
                }
                

            </div>
            
        </div>
    );
}
export default MasterLanding;