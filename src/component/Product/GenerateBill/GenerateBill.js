import './GenerateBill.css'
import Invoice from './Invoice'

const GenerateBill = () =>
{
    return(
        <div className="gnb-wdthgt">
            <div>
                <span><label className='gnb-label'>Billing</label></span>
            </div>
            <Invoice />
        </div>
    );
}
export default GenerateBill;