import  './SideTab.css';
import config from '../../config.json'
const SideTab = (props) =>
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
        <div className="divheight sidetab-divwidth sidetab-content">
            <table className='sidetab-table desktop-view'>
                <tr>
                    <td>
                        <div>
                            <span><label onClick={GenerateInvoice} className='sidetab-label'>{config.RESOURCES.GENERATEINVOICE}</label></span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div>
                            <span><label onClick={CheckInvoice} className='sidetab-label'>{config.RESOURCES.CHECKINVOICE}</label></span>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );
}
export default SideTab;