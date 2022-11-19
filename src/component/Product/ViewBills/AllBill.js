import config from '../../../config.json'
import TableRow from '../../Common/TableRow.js'
import "./AllBills.css"
import React, { useState,useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';

const AllBills = (props) => {
    const [selectedDate, setSelectedDate] = useState(changeTimezone);
    const [fromselectedDate, setFromSelectedDate] = useState(new Date());
    const [lstBills, setLstBills] = useState([]);
    const [TotalBillAmount, setTotalBillAmount] = useState(0);
    const [isRecordFound, setRecordFound] = useState(false);
    const [isMobileScreen, setMobileScreen] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 415) {
            setMobileScreen(true);
            getAllBills();
        }
        changeTimezone();
    }, []);

    function changeTimezone()
    {
        var date = new Date();
        var frmDate = date.getMonth() +"/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return new Date(frmDate);
    //   return new Date(
    //     new Date().toLocaleString('en-US', { timeZone: 'IST' })
    //   );
    }

    function getTotalBillAmount(lstBill) {
        var sum = 0;
        lstBill.forEach(element => {
            sum += parseInt(element.billAmount);
        });
        return sum;
    }

    function viewBillDetailsHandler(pInvoiceNo) {
        props.onViewBillDetailsClick(pInvoiceNo);
    }

    function getAllBills() {
        let responseData = [];
        var frmDate = selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear() + " " + selectedDate.getHours() + ":" + selectedDate.getMinutes() + ":" + selectedDate.getSeconds();
        var toDate = fromselectedDate.getDate() + "/" + (fromselectedDate.getMonth() + 1) + "/" + fromselectedDate.getFullYear() + " " + fromselectedDate.getHours() + ":" + fromselectedDate.getMinutes() + ":" + fromselectedDate.getSeconds();
        let lstBill = [];
        let url = '';
        url = config.WEBAPI_URL + "invoice/getAllInvoice?psfrmDate=" + frmDate + "&pstoDate=" + toDate;
        if (window.innerWidth < 415) {
            frmDate = '01/01/1999 13:00:00'
            url = config.WEBAPI_URL + "invoice/getAllInvoice?psfrmDate=" + frmDate + "&pstoDate=" + toDate;
        }
        fetch(url,
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
                    responseData = data.invoiceInfo;
                    responseData.forEach(element => {
                        var dcbd = {
                            invoiceNo: element.invoiceNo,
                            userId: element.userId,
                            billAmount: element.invoiceAmount,
                            createdDate: element.created_Date,
                            Action: ""
                        }
                        lstBill.push(dcbd)

                    });
                    setTotalBillAmount(getTotalBillAmount(lstBill));
                    setLstBills(lstBill);
                    if (lstBill !== 'undefined' && lstBill.length > 0) {
                        setRecordFound(true)
                    }
                    else {
                        setRecordFound(false)
                    }
                });
            });
    }
    return (
        <React.Fragment>
            <div className='mbdisplaynone' style={{ height: "15%" }}>
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

                    <div onClick={getAllBills} style={{ backgroundColor: "blue", width: "50%", height: "30%", cursor: "pointer", marginTop: "12%", borderRadius: "8px" }}>
                        <label style={{ cursor: "pointer" }}>Get Bills</label>
                    </div>

                </div>

            </div>
            <div className="dvborder"></div>
            <div className="itemHeader">
                <table className="tblItemHeader" style={{ marginLeft: '2%' }}>
                    <tr>
                        <td className="abs-tdwidth15">
                            {
                                isMobileScreen &&
                                <span>{config.MOBILE.RESOURCES.BILLNO}</span>
                            }
                            {
                                !isMobileScreen &&
                                <span>{config.RESOURCES.BILLNO}</span>
                            }

                        </td>
                        <td className='abs-tdwidth15'>
                            {
                                isMobileScreen &&
                                <span>{config.MOBILE.RESOURCES.USERID}</span>
                            }
                            {
                                !isMobileScreen &&
                                <span>{config.RESOURCES.USERID}</span>
                            }
                        </td>
                        <td className='abs-tdwidth15'>
                            {
                                isMobileScreen &&
                                <span>{config.MOBILE.RESOURCES.BILLAMOUNT}</span>
                            }
                            {
                                !isMobileScreen &&
                                <span>{config.RESOURCES.BILLAMOUNT}</span>
                            }
                        </td>
                        <td className='abs-tdwidth20'>
                            {
                                isMobileScreen &&
                                <span>{config.MOBILE.RESOURCES.CREATEDDATE}</span>
                            }
                            {
                                !isMobileScreen &&
                                <span>{config.RESOURCES.CREATEDDATE}</span>
                            }
                        </td>
                        <td className='abs-tdwidth15'>
                            <span>Action</span>
                        </td>
                    </tr>
                </table>
            </div>
            <div style={{ width: "100%", height: "70%", overflowX: "hidden", overflowY: "auto" }}>
                <table className="tblItem" style={{ marginLeft: '2%' }} >
                    {lstBills.map(items => <TableRow onViewBillDetailsClick={viewBillDetailsHandler} key={items.invoiceNo} ItemDetails={items}></TableRow>)}
                </table>
                {
                    !isRecordFound &&
                    <table style={{ height: "100%" }}>
                        <tr>
                            <td style={{ textAlign: "center" }}>
                                <span className='abs-label' style={{ color: "red" }}>
                                    No record found !!!!.
                                </span>
                            </td>
                        </tr>
                    </table>
                }
            </div>
            <div className="dvborder"></div>
            <div style={{ width: "100%", height: "7%" }}>
                <div>
                    <span style={{ fontWeight: "bold", position: "relative", top: "15px" }}><label className='abs-label'>Total bill amount : </label><label style={{ wordSpacing: "-2px" }} className="abs-label">Rs {TotalBillAmount}</label></span>
                </div>
            </div>
            <div>
                {

                }
            </div>
            <div className="dvborder"></div>
        </React.Fragment>
    );
}

export default AllBills;