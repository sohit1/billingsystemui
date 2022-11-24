import './GenerateBill.css'
import Invoice from './Invoice'
import Title from "../../Common/Title";
import config from '../../../config.json';
import React from 'react';

const GenerateBill = (props) =>
{
    function onBackButtonClickHandler()
    {
        props.BackButtonClick();
    }

    return(
        <React.Fragment>
            <Title Title={config.RESOURCES.GENERATEINVOICE} BackButtonClick={onBackButtonClickHandler} />
            {/* <span className="mbdisplaynone"><label className='gnb-label'>Genrate Invoice</label></span> */}
            <div className="justify_content_center h-93">
                <div className="container h-100">
                    <Invoice />
                </div>
            </div>


        </React.Fragment>
        
    );
}
export default GenerateBill;