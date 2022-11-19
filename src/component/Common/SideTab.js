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
    function EmployeeHandler()
    {
        props.sideTabClickHandler(config.RESOURCES.EMPLOYEE);
    }
    return (
        <div className="divheight sidetab-divwidth sidetab-content mbdisplaynone">
            <table className='sidetab-table desktop-view'>
                <tbody>
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
                <tr>
                    <td>
                        <div>
                            <span><label onClick={EmployeeHandler} className='sidetab-label'>{config.RESOURCES.EMPLOYEE}</label></span>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
export default SideTab;