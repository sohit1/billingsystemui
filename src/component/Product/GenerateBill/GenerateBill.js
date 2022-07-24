import './GenerateBill.css'
import Invoice from './Invoice'
import Title from "../../Common/Title";
import config from '../../../config.json';

const GenerateBill = (props) =>
{
    function onBackButtonClickHandler()
    {
        props.BackButtonClick();
    }

    return(
        <div className="gnb-wdthgt">
            <div className="mb-gnb-title">
                <Title Title={config.RESOURCES.GENERATEINVOICE} BackButtonClick={onBackButtonClickHandler}/>
                <span className="mbdisplaynone"><label className='gnb-label'>Genrate Invoice</label></span>
            </div>
            <Invoice />
        </div>
    );
}
export default GenerateBill;