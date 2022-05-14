import MainHeader from "./Header";
import './Common.css';
import SideTab from "./SideTab";
import GenerateBill from "../Product/GenerateBill/GenerateBill"

const MasterLanding = (props) => {
    function mainHeaderEventHandler(param)
    {
        if(param == "true")
        {
            props.IsMasterPage("LandingPage")
        }

    }
    return (
        <div className="divheight">
            <MainHeader IsLogout = {mainHeaderEventHandler}></MainHeader>
            <div className="content">
                <SideTab />
                <GenerateBill></GenerateBill>
            </div>
            
        </div>
    );
}
export default MasterLanding;