import './invoice.css';
import { useState } from 'react'
import Item from './Item'
import AddIcon from '../../../images/Add-button.png'
import InvoiceHeader from './InvoiceHeader';

const mylists = [
];
const InvoiceHeaderList =[
    {
        businessName : "Jb pvt ltd",
        businessAddressLine1: "Propert No., City",
        businessAddressLine2: "Near landmark, State, Pincode"
    }
];
const Invoice = () => {
    const [mylist, setmylists] = useState(mylists);
    const [Total, setTotal] = useState(0);
    
    const AddRowHandler = () => {

        setmylists((prevmylist) => {
            return (prevmylist.concat({ id: Date.now(), amount: "",PricePerUnit:"",Quantity: 0,ItemName:"",ItemsDetail:"", ...prevmylist }));
        }
        );

    }
    const getTotalAmountHandler = () => {

    }
    const onQuantityChangeHandler = (value, id, PricePerUnit,ItemName,Quantity) => {

        const newData = mylist.map(data => {

            if (data.id !== id) {
                return data;
            }
            if (ItemName !== undefined)
            {
                return {
                    ...data, amount: value,PricePerUnit: PricePerUnit, ItemName: ItemName
                };
            }
            else
            {
                return {
                    ...data, amount: value,Quantity: Quantity
                };
            }
           


        });
        setmylists(newData);
        const sum = newData.map(values => values.amount).reduce((result, number) => result + number);
        setTotal(sum);
    }
    const saveItemsAndPrintInvoice = () => {

        fetch("https://localhost:44389/Invoice/SaveInvoiceDetails",
        {
            method: 'POST',
            body: JSON.stringify(mylist),
            headers:{
                'Content-Type' : "application/json"
            }           
        }).then((response) => {
            if (response.status != 200) {
                alert("Something went wrong");
                console.log("Error : " + response.status);
                return;
            }
            response.json().then((data) => {
                
            });
        });
    }
    return (
        <div className="inv-content">
            <InvoiceHeader getBusinessInfo={InvoiceHeaderList}></InvoiceHeader>
            <div className='inv-margin'>
                <div className='inv-width inv-float-left inv-textalign-left'>
                    <label className="inv-label">Item</label>
                </div>
                <div className='inv-width inv-float-left inv-textalign-left'>
                    <label className="inv-label">Quantity</label>
                </div>
                <div className='inv-width inv-float-left inv-textalign-left'>
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
                {mylist.map(items => <Item onQuantityChange={onQuantityChangeHandler} itemsId={items.id} ptotalAmount={getTotalAmountHandler} key={items.id} />)}
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