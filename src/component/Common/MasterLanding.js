import MainHeader from "./Header";
import './Common.css';
import SideTab from "./SideTab";
import GenerateBill from "../Product/GenerateBill/GenerateBill.js"
import BillInfo from "../Product/ViewBills/BillInfo"
import config from '../../config.json'
import { useState } from 'react'

const MasterLanding = (props) => {
    const [sideTabMenuItem, setSideTabMenuItem] = useState(config.RESOURCES.GENERATEINVOICE);
    function mainHeaderEventHandler(param)
    {
        if(param == "true")
        {
            props.IsMasterPage("LandingPage")
        }

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
                    <GenerateBill></GenerateBill>
                }
                {
                    sideTabMenuItem === config.RESOURCES.CHECKINVOICE &&
                    <BillInfo/>
                }
                {/* {
                    sideTabMenuItem ==="" &&
                    <div style={{ textAlign: "center", marginTop: "7%" }}>
                        <label>WELCOME SOHIT SINGH</label>
                    </div>
                } */}
                

            </div>
            
        </div>
    );
}
export default MasterLanding;