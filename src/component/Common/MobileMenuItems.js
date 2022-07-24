import  './MobileMenuItems.css';
import config from '../../config.json'
const MobileMenuItems = (props) =>
{
    function GenerateInvoice()
    {
        props.sideTabClickHandler(config.RESOURCES.GENERATEINVOICE); // consideinitials of functions or later on enums
    }

    function CheckInvoice()
    {
        props.sideTabClickHandler(config.RESOURCES.CHECKINVOICE);
    }
    return (
        <div className="gnb-wdthgt" style={{width:"100%"}}>
            <div style={{height:"5%",textAlign:"center"}}>
                <span><label className='gnb-label'>Click on page link below</label></span>
            </div>
            <div style={{height:"70%",margin:"10%",paddingTop:"5%",backgroundColor:"#006666",borderRadius:"10px"}}>
                <div className='white-background mmi-buttons' style={{}} >
                    <table style={{ height: "100%" }}>
                        <tr>
                            <td>
                                <span><label onClick={GenerateInvoice} className='black-label'>{config.RESOURCES.GENERATEINVOICE}</label></span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className='white-background mmi-buttons'>
                    <table style={{ height: "100%" }}>
                        <tr>
                            <td>
                                <span><label onClick={CheckInvoice} className='black-label'>{config.RESOURCES.CHECKINVOICE}</label></span>
                            </td>
                        </tr>
                    </table>

                </div>
            </div>
        </div>
    );
}
export default MobileMenuItems;