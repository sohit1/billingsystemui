import './Item.css';
import { useState } from 'react'

const Item = (props) => {
    const[priceperunit, setpriceperunit]  = useState('0');
    const[Amount, setAmount]  = useState(0);
    const[Quantity, setQuantity] = useState(0);
    const[MenuItems, setMenuItems] = useState([
        // {
        //     sItemName: "Select item", nAmount: 0,sItemId:""
        // }
    ]);
    useState(()=>
    {
        //Later implementation Items will be fetched with the mapped company id;

        // We will write fetch api to get the data console.log("initial state");
         fetch("https://localhost:44389/Product/getSellableItems?pnCompanyId=12",
            {
                method: 'GET',
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
                    console.log((JSON.stringify(data)));
                    console.log(((data)));
                    setMenuItems((prevstate)=>
                    {
                        console.log((prevstate.concat({itemName: "Select item", nAmount: 0 ,sItemId:"0000"}, ...data )));
                        return (prevstate.concat({itemName: "Select item", pricePerUnit: 0 ,itemId:"0000"}, ...data ));
                    });
                });
            });

        //setMenuItems(listItems);
    });
    const QyantityHandler =(event) =>
    {
        setQuantity(0);
        if(event.target.value === '')
        {
            setAmount(0);
            return;
        }
        if(validateNumeric(event.target.value))
        {
            alert("Insert numeric value");
            return;
        }
        setQuantity(event.target.value);
        setAmount(priceperunit * event.target.value);
        props.onQuantityChange(priceperunit * event.target.value , props.itemsId,undefined,undefined,event.target.value);
    }
    const validateNumeric=(value)=>
    {
        const re = /^[0-9\b]+$/;
        if (re.test(value)) {
            return false;
         }
        return true;
    }
    const selectItemHandler=(event)=>
    {
        var itemDetails = event.target.value.split("_") ;
        setpriceperunit(itemDetails[1]);
        setAmount(itemDetails[1] * Quantity);
        props.onQuantityChange(itemDetails[1] * Quantity , props.itemsId,itemDetails[1],itemDetails[0]+"_"+itemDetails[2]);
    }

    return (
        <div className='itm-margin-2'>

            <div className='itm-width itm-float-left itm-textalign-center'>
                <select onChange={selectItemHandler} className='itm-select1-width'>
                    {MenuItems.map(items => <option value={items.itemId + "_" + items.pricePerUnit+"_"+items.itemName} key={items.itemId}>{items.itemName}</option>)}
                </select>
                {/* <input className="itm-input" type="text" name="item"></input> */}
            </div>
            <div className='itm-width itm-float-left itm-textalign-left'>
                <input onChange={QyantityHandler} className="itm-input" type="text" name="Quantity"></input>
            </div>
            <div className='itm-width itm-float-left itm-textalign-left'>
                <label className="itm-label">{priceperunit}</label>
            </div>
            <div className='itm-width itm-float-left itm-textalign-left'>
                <label className="itm-label">{Amount}</label>
            </div>
            <div className='itm-width itm-float-left itm-textalign-center'>

            </div>
        </div>
    );
}
export default Item;