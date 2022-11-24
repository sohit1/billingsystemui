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
        <div className="container mbdisplay w-100 h-100 justify_content_center">
            <div style={{height:"5%",textAlign:"center"}}>
                <span><label className='gnb-label'>Click on page link below</label></span>
            </div>
            <div className="h-95 br-10 bg-col-green p-t-5">
                <div className='white-background mmi-buttons' style={{}} >
                    <table style={{ height: "100%" }}>
                        <tbody>
                        <tr>
                            <td>
                                <span><label onClick={GenerateInvoice} className='black-label'>{config.RESOURCES.GENERATEINVOICE}</label></span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className='white-background mmi-buttons'>
                    <table style={{ height: "100%" }}>
                        <tbody>
                        <tr>
                            <td>
                                <span><label onClick={CheckInvoice} className='black-label'>{config.RESOURCES.CHECKINVOICE}</label></span>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}
export default MobileMenuItems;