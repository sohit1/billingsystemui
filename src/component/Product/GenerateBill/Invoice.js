import './invoice.css';
import { useState } from 'react'
import {useEffect} from 'react'
import Item from './Item'
import AddIcon from '../../../images/Add-button.png'
import InvoiceHeader from './InvoiceHeader';
import config from '../../../config.json';

const mylists = [
];
const MenuItem =[

];
const Invoice = () => {
    const [mylist, setmylists] = useState(mylists);
    const [Total, setTotal] = useState(0);
    const [MenuItem, getMenuItems] = useState([]);

    useState(()=>
    {
         fetch(config.WEBAPI_URL+"product/getitems",
            {
                method: 'GET',
                headers:{
                    'Content-Type' : "application/json"
                }           
            }).then((response) => {
                if (response.status != 200) {
                    alert("Something went wrong");
                    return;
                }
                response.json().then((data) => {
                    if(data.responseStatus.errorNo != 0)
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
    const getTotalAmountHandler = () => {

    }
    const onQuantityChangeHandler = (p_value, p_id,p_itemId, p_pricePerUnit,p_Quantity,p_Flag) => {

        const newData = mylist.map(data => {

            //add new row of item
            if (data.id == p_id) { //should change only for the rows getting updated.
                if(p_Flag == 'OnItemChange')
            {
                return {
                    ...data,totalItemAmount: parseInt(p_value),itemId:parseInt(p_itemId),pricePerUnit:parseInt(p_pricePerUnit),quantity: parseInt(p_Quantity)
                };
            }
            else
            {
                return {
                            ...data, totalItemAmount: parseInt(p_value),quantity: parseInt(p_Quantity)
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
    const saveItemsAndPrintInvoice = () => {
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
            return;
        }
        var data =
        {
            "invoiceNo":0,
            "invoiceDetails":mylist
        }

        fetch(config.WEBAPI_URL+"invoice/generateinvoice",
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type' : "application/json",
                'Authorization': "Bearer "+localStorage.getItem('token-info')
            }           
        }).then((response) => {
            if (response.status != 200) {
                alert("Something went wrong");
                return;
            }
            response.json().then((data) => {
                setmylists([]);
                alert("Generated Invoice: #"+data.invoiceNo)
            });
        });
    }
    return (
        <div className="inv-content">
            <InvoiceHeader></InvoiceHeader>
            <div className='inv-margin'>
                <div className='inv-width inv-float-left inv-textalign-left'>
                    <label className="inv-label">Item</label>
                </div>
                <div className='inv-width inv-float-left inv-textalign-left'>
                    <label className="inv-label">Quantity</label>
                </div>
                <div className='inv-width inv-float-left inv-textalign-left mbdisplaynone'>
                    <label className="inv-label">PricePerUnit</label>
                </div>
                <div className='inv-width inv-float-left inv-textalign-left'>
                    <label className="inv-label">Amount</label>
                </div>
                <div className='inv-width inv-float-left inv-textalign-left'>
                    <img alt="addimage" onClick={AddRowHandler} className="inv-img" src={AddIcon}></img>
                </div>
            </div>
            <div className='inv-height-items'>
                {mylist.map(items => <Item onQuantityChange={onQuantityChangeHandler} itemsId={items.id} ptotalAmount={getTotalAmountHandler} key={items.id} MenuData ={MenuItem} />)}
            </div>
            <div className='inv-height-total'>
                <div className='inv-printbutton' onClick={saveItemsAndPrintInvoice}>
                    <label className='inv-label inv-label-button'>Print</label>
                </div>
                <div className='inv-float-right inv-footer-right'>
                    <label className="inv-float-right in-label-total" >{Total}</label>
                    <label className="inv-float-right">Rs</label>
                    <label className='inv-float-right inv-margin-right' >Total:</label>
                </div>
                
                
            </div>
        </div>
    );
}
export default Invoice;