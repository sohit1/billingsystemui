import './invoice.css';
import { useState , useEffect } from 'react'
import Item from './Item'
import AddIcon from '../../../images/Add-button.png'
import InvoiceHeader from './InvoiceHeader';
// import InvoicePrint from './InvoicePrint';
import config from '../../../config.json';
import ReactToPrint from "react-to-print";
import React, { useRef } from "react";
import Example from './InvoicePrint';
import CustomButton from '../../Common/CustomButton';

let nNumberOfItem = 0;
const mylists = [];
const listinvoiceinfo = [];

const Invoice = () => {
    const [mylist, setmylists] = useState(mylists);
    const [Total, setTotal] = useState(0);
    const [MenuItem, getMenuItems] = useState([]);
    const [IsInvoice,setInvoice] = useState(true);
    const [invoiceinfo ,setInvoiceInfo] = useState(listinvoiceinfo);
    const [invoiceNumber ,setInvoiceNumber] = useState("");
    const [invoiceAmount ,setInvoiceAmount] = useState("");
    const [DisablePrint ,setDisablePrint] = useState(false);
    const [RESOURCES ,setResources] = useState(localStorage.getItem('Screen') =='true' ? config.MOBILE.RESOURCES : config.RESOURCES);
    
    useEffect(() => {
        setResources(window.outerWidth < 991 ? config.MOBILE.RESOURCES : config.RESOURCES)
    });

    useState(()=>
    {
         fetch(config.WEBAPI_URL+"product/getitems",
            {
                method: 'GET',
                headers:{
                    'Content-Type' : "application/json"
                }           
            }).then((response) => {
                if (response.status !== 200) {
                    alert("Something went wrong");
                    return;
                }
                response.json().then((data) => {
                    if(data.responseStatus.errorNo !== 0)
                        {
                            alert(data.responseStatus.errorMessage);
                            return;
                        }
                    getMenuItems(data.itemInfo);
                });
            });
    });
    const AddRowHandler = () => {

        //Adding row of item to mylist
        setmylists((prevmylist) => {
            return (prevmylist.concat({ id: Date.now(),itemId:0, totalItemAmount: 0,pricePerUnit:"",quantity: 0, ...prevmylist }));
        });

    }
    function OnPrintClose()
    {
        setInvoice(true);
    }
    const getTotalAmountHandler = () => {

    }
    const onQuantityChangeHandler = (p_value, p_id,p_itemId, p_pricePerUnit,p_Quantity,p_Flag) => {

        const newData = mylist.map(data => {

            //add new row of item
            if (data.id === p_id) { //should change only for the rows getting updated.
                if(p_Flag === 'OnItemChange')
            {
                return {
                    ...data,totalItemAmount: parseInt(p_value),itemId:parseInt(p_itemId),pricePerUnit:parseInt(p_pricePerUnit),quantity: parseInt(p_Quantity)
                };
            }
            else
            {
                return {
                            ...data, totalItemAmount: parseInt(p_value),quantity: parseFloat(p_Quantity)
                        };
            }
        }
        return data;
           


        });
        setmylists(newData);
        const sum = newData.map(values => values.totalItemAmount).reduce((result, number) => result + number);
        setTotal(sum);
    }
    const ValidateIsEmpty = (value) => {
        if (value === undefined || value === "")
            return true;

        return false;
    }
   async function saveItemsAndPrintInvoice() {
        if(!mylist.length > 0)
        {
            alert("Click on + button to add items to the bill");
            return;
        }
        setDisablePrint(true);
        let breturned = false;
        mylist.forEach(element => {
            if(ValidateIsEmpty(element.quantity))
            {
                alert("quantity can not be empty.");
                breturned = true;
                return;
            }
            if(element.quantity === 0)
            {
                alert("quantity can not be 0.");
                breturned = true;
                return;
            }
            if(element.itemId === 0)
            {
                alert("Please select item")
                breturned = true;
                return;
            }

            
        });
        if(breturned)
        {
            alert("breturned");
            setDisablePrint(false);
            return;
        }
        var data =
        {
            "invoiceNo":0,
            "invoiceDetails":mylist
        }

       await fetch(config.WEBAPI_URL+"invoice/generateinvoice",
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type' : "application/json",
                'Authorization': "Bearer "+localStorage.getItem('token-info')
            }           
        }).then((response) => {
            if (response.status !== 200) {
                alert("Something went wrong");
                return;
            }
            response.json().then((data) => {
                setmylists([]);
                alert(data.responseStatus.errorMessage+" : #"+data.invoiceNo);
            });
        });
        setDisablePrint(false);
    }
    //TestFunction
     async function saveItemsAndPrintInvoicetest () {
       
        if(!mylist.length > 0)
        {
            alert("Click on + button to add items to the bill");
            return;
        }
        let breturned = false;
        mylist.forEach(element => {
            nNumberOfItem = nNumberOfItem+1;
            if(ValidateIsEmpty(element.quantity))
            {
                alert("quantity can not be empty.");
                breturned = true;
                return;
            }
            if(element.quantity === 0)
            {
                alert("quantity can not be 0.");
                breturned = true;
                return;
            }
            if(element.itemId === 0)
            {
                alert("Please select item")
                breturned = true;
                return;
            }

            
        });
        if(breturned)
        {

            return;
        }
        var data =
        {
            "invoiceNo":0,
            "invoiceDetails":mylist
        }
        await fetch(config.WEBAPI_URL+"invoice/generateinvoice",
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type' : "application/json",
                'Authorization': "Bearer "+localStorage.getItem('token-info')
            }           
        }).then((response) => {
            if (response.status !== 200) {
                alert("Something went wrong");
                return;
            }
            response.json().then((data) => {
                setmylists([]);
                alert(data.responseStatus.errorMessage+" : #"+data.invoiceNo);
                setInvoiceInfo(data.invoiceDetails);
                setInvoiceNumber(data.invoiceNo);
                setInvoiceAmount(data.invoiceAmount);
                setInvoice(false);
            });
            
        });
        
    }
    //End TestFunction
    return (
        <React.Fragment>
            <div className='h-100'>
                {
                    IsInvoice &&

                    <div className="h-100 br-shadow bg-col-white d-flex f-direction-column ">
                        {/* <div className='inv-printbutton-test' style={{width:"100%",textAlign:"left",backgroundColor:"white",display:""}}onClick={saveItemsAndPrintInvoicetest}>
                        <label className='inv-label inv-label-button'>Print</label>
                    </div> */}
                        <div className="dvInvoiceHeader">
                            <InvoiceHeader></InvoiceHeader>
                        </div>
                        <div className='m-l-1 h-6 d-flex invoice-header'>
                            <div className='w-20 f-md-2_0_20'>
                                <label className="">{RESOURCES.ITEM}</label>
                            </div>
                            <div className='w-20 m-l-6px w-md-18'>
                                <label className="">{RESOURCES.QUANTITY}</label>
                            </div>
                            <div className='w-20 w-md-18'>
                                <label className="">{RESOURCES.PRICEPERUNIT}</label>
                            </div>
                            <div className='w-20 w-md-18'>
                                <label className="">{RESOURCES.AMOUNT}</label>
                            </div>
                            <div className='w-20 w-md-10'>
                                <label className="h-100"><img alt="addimage" onClick={AddRowHandler} src={AddIcon}></img></label>
                            </div>
                        </div>
                        <div className='inv-height-items h-68 m-l-1'>
                            {mylist.map(items => <Item onQuantityChange={onQuantityChangeHandler} itemsId={items.id} ptotalAmount={getTotalAmountHandler} key={items.id} MenuData={MenuItem} />)}
                        </div>
                        <div className='flex-1-1-auto d-flex font-w-900'>
                            <label className='m-l-60 p-r-1'>Total:</label>
                            <label className="">Rs </label>
                            <label className="" >{Total}</label>
                        </div>
                        <div className={DisablePrint ? '' : ''} onClick={saveItemsAndPrintInvoice}>
                            <CustomButton Text ="Generate Invoice" Color="white" BorderRadius="20px 20px 0px 0px"></CustomButton>
                            {/* <label className='inv-label inv-label-button'>Print</label> */}
                        </div>
                        {/* <div className='inv-height-total w-100' style={{bottom:"0"}}>
                        <div className= {DisablePrint ? 'inv-pointerevent inv-printbutton ' : 'inv-printbutton'} onClick={saveItemsAndPrintInvoice}>
                            <label className='inv-label inv-label-button'>Print</label>
                        </div>
                        <div className='inv-float-right inv-footer-right'>
                            <label className="inv-float-right in-label-total inv-labelcolor" >{Total}</label>
                            <label className="inv-float-right inv-labelcolor">Rs</label>
                            <label className='inv-float-right inv-margin-right inv-labelcolor' >Total:</label>
                        </div>
                    </div> */}
                    </div>

                }
                {
                    (!IsInvoice) &&
                    <div className="inv-content">
                        <Example InvoiceNumber={invoiceNumber} InvoiceAmount={invoiceAmount} OnClose={OnPrintClose} InvoiceInfo={invoiceinfo} NumberOfItems={nNumberOfItem}></Example>
                    </div>
                }
            </div>
        </React.Fragment>
    );
}

export default Invoice;