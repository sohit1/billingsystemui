import config from '../../../config.json'
import AllBills from './AllBill'
import ViewBillDetails from './ViewBillDetails'
import { useState } from 'react'
import Title from "../../Common/Title";

const BillInfo = (props) => {
    const[isViewBillDetails, setViewBillDetails] = useState(false);
    const[InvoiceInfoDetails, setInvoiceInfoDetails] = useState([]);
    const[InvocieNumber, setInvocieNumber] = useState([]);
    const[InvoiceAmount, setInvoiceAmount] = useState([]);


    function viewBillDetailsHandler(pInvoiceNo)
    {
        getBillDetailsUsingInvoiceNumber(pInvoiceNo);
    }

    function onBackButtonClickHandler()
    {
        props.BackButtonClick();
    }

    function getBillDetailsUsingInvoiceNumber(pInvoiceNo)
    {
        fetch(config.WEBAPI_URL + "invoice/getBillDetailsUsingInvoiceNumber?pnInvoiceNo="+pInvoiceNo,
            {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json"
                }
            }).then((response) => {
                if (response.status !== 200) {
                    alert(response.status.errorMessage);
                    return;
                }
                response.json().then((data) => {
                    if (data.responseStatus.errorNo !== 0) {
                        alert(data.responseStatus.errorMessage);
                        setViewBillDetails(false);
                        return;
                    }
                    setInvoiceInfoDetails(data.invoiceDetails);
                    setInvocieNumber(data.invoiceNo);
                    setInvoiceAmount(data.invoiceAmount);
                    setViewBillDetails(true);
                });
            });
    }

    return (
        <div className="abs-wdthgt">
            <div>
                <Title Title={config.RESOURCES.CHECKINVOICE} BackButtonClick={onBackButtonClickHandler}/>
                <span className="mbdisplaynone"><label className='abs-label'>{config.RESOURCES.VIEWBILLS}</label></span>
            </div>
            <div className='abs-content-out'>
                <div className='abs-content' style={{float:"left"}}>
                    <AllBills onViewBillDetailsClick={viewBillDetailsHandler} />
                </div>
                {
                    isViewBillDetails && 
                    <div className='abs-content' style={{float:"right" }}>
                        <ViewBillDetails InvoiceNumber = {InvocieNumber} InvoiceAmount={InvoiceAmount} InvoiceInfo={InvoiceInfoDetails}/>
                    </div>
                }
            </div>
        </div>
    )
}
export default BillInfo;