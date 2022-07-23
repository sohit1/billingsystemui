import config from '../../../config.json'
import TableRow from '../../Common/TableRow.js'
import "./AllBills.css"
import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

const AllBills = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [fromselectedDate, setFromSelectedDate] = useState(new Date());
    const [lstBills, setLstBills] = useState([]);
    const [TotalBillAmount, setTotalBillAmount] = useState(0);
    const [isRecordFound, setRecordFound] = useState(false);

    function getTotalBillAmount(lstBill)
    {
        var sum = 0;
        lstBill.forEach(element => {
            sum += parseInt(element.billAmount);
        });
        return sum;
    }

    function viewBillDetailsHandler(pInvoiceNo)
    {
        props.onViewBillDetailsClick(pInvoiceNo);
    }

    function getAllBills() {
        let responseData = [];
        var  frmDate = selectedDate.getDate()+"/"+(selectedDate.getMonth()+1)+"/"+selectedDate.getFullYear()+" "+selectedDate.getHours()+":"+selectedDate.getMinutes()+":"+selectedDate.getSeconds();
        var toDate = fromselectedDate.getDate()+"/"+(fromselectedDate.getMonth()+1)+"/"+fromselectedDate.getFullYear()+" "+fromselectedDate.getHours()+":"+fromselectedDate.getMinutes()+":"+fromselectedDate.getSeconds();
        let lstBill =[];
        fetch(config.WEBAPI_URL + "invoice/getAllInvoice?psfrmDate="+frmDate+"&pstoDate="+toDate,
            {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json"
                }
            }).then((response) => {
                if (response.status !== 200) {
                    return;
                }
                response.json().then((data) => {
                    if (data.responseStatus.errorNo !== 0) {
                        return;
                    }
                    responseData =  data.invoiceInfo;
                    responseData.forEach(element => {
                        var dcbd = {
                                invoiceNo:element.invoiceNo,
                                userId:element.userId,
                                billAmount:element.invoiceAmount,
                                createdDate:element.created_Date,
                                Action:""
                            }
                        lstBill.push(dcbd)
                        
                    });
                    setTotalBillAmount(getTotalBillAmount(lstBill));
                    setLstBills(lstBill);
                    if(lstBill !== 'undefined' && lstBill.length > 0)
                    {
                        setRecordFound(true)
                    }
                    else
                    {
                        setRecordFound(false)
                    }
                });
            });
    }
    return (
        // <div className="abs-wdthgt">
        <React.Fragment>
            {/* <div>
                <span><label className='abs-label'>{config.RESOURCES.VIEWBILLS}</label></span>
            </div> */}
            {/* <div className='abs-content-out'> */}
                {/* <React.Fragment> */}
                    <div style={{ height: "15%" }}>
                        <div style={{ width: "75%", float: "left" }}>
                            <div style={{ marginTop: "2%" }}>
                                <div style={{ width: "20%", float: "left" }}>
                                    <label className='abs-label'>{config.RESOURCES.FROMDATE}</label>
                                </div>
                                <div>
                                    <DateTimePicker 
                                        format="dd/MM/yyyy HH:mm:ss"
                                        ToSelectedDate={selectedDate}
                                        onChange={date => setSelectedDate(date)}
                                        value={selectedDate}
                                        />
                                </div>
                            </div>

                            <div style={{ marginTop: "2%" }}>
                                <div style={{ width: "20%", float: "left" }}>
                                    <label className='abs-label'>{config.RESOURCES.TODATE}</label>
                                </div>
                                <div>
                                    <DateTimePicker FromSelectedDate={fromselectedDate} onChange={date => setFromSelectedDate(date)} value={fromselectedDate} format="dd/MM/yyyy HH:mm:ss" />
                                </div>
                            </div>

                        </div>
                        <div style={{ width: "25%", float: "right", height: "100%" }}>
                            {/* <span onClick={getAllBills} style={{ backgroundColor: "blue", width: "20%", height: "20%", cursor: "pointer" , marginTop:"12%" }}>
                                <label>Get Bills</label>
                            </span> */}
                            <div onClick={getAllBills} style={{ backgroundColor: "blue", width: "50%", height: "30%", cursor: "pointer" , marginTop:"12%",borderRadius:"8px" }}>
                                <label style={{cursor:"pointer"}}>Get Bills</label>
                            </div>

                        </div>

                    </div>
                    <div className="dvborder"></div>
                    <div className="itemHeader">
                        <table className="tblItemHeader" style={{marginLeft:'2%'}}>
                            <tr>
                                <td className="abs-tdwidth10">
                                    <span>#BillNo</span>
                                </td>
                                <td className='abs-tdwidth10'>
                                    <span>#UserId</span>
                                </td>
                                <td className='abs-tdwidth15'>
                                    <span>Bill Amount</span>

                                </td>
                                <td className='abs-tdwidth20'>
                                    <span>Created Date</span>
                                </td>
                                <td className='abs-tdwidth10'>
                                    <span>Action</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div style={{ width: "100%" ,height:"70%",overflowX:"hidden",overflowY:"auto"}}>
                        <table className="tblItem" style={{ marginLeft: '2%' }} >
                            {lstBills.map(items => <TableRow onViewBillDetailsClick={viewBillDetailsHandler} key={items.invoiceNo} ItemDetails={items}></TableRow>)}
                        </table>
                        {
                            !isRecordFound &&
                            <table style={{height:"100%"}}>
                                <tr>
                                    <td style={{textAlign:"center"}}>
                                        <span className='abs-label' style={{color:"red"}}>
                                            No record found !!!!.
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        }
                    </div>
                    <div className="dvborder"></div>
                    <div style={{width:"100%",height:"7%"}}>
                        <div>
                            <span style={{fontWeight:"bold" , position:"relative", top:"15px"}}><label className='abs-label'>Total bill amount : </label><label style={{wordSpacing:"-2px"}} className="abs-label">Rs {TotalBillAmount}</label></span>
                        </div>
                    </div>
                    <div className="dvborder"></div>
                    
                {/* </div> */}

            {/* </div> */}
        
        {/* </div> */}
        </React.Fragment>
    );
}

export default AllBills;