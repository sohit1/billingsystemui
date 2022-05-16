import './Item.css';
import { useState } from 'react'
import config from '../../../config.json'

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
            setMenuItems((prevstate)=>
                    {
                        return (prevstate.concat({itemName: "Select item", pricePerUnit: 0 ,itemId:"0000"}, ...props.MenuData ));
                    });
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
        props.onQuantityChange(priceperunit * event.target.value ,props.itemsId,0,priceperunit,event.target.value,'OnQunatityChange');
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
        var itemId = itemDetails[0];
        var pricePerUnit = itemDetails[1];
        var itemTotalAmount = pricePerUnit * Quantity;
        setpriceperunit(pricePerUnit);
        setAmount(itemTotalAmount);
        props.onQuantityChange(itemTotalAmount , props.itemsId,itemId,pricePerUnit,Quantity,'OnItemChange');
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
            <div className='itm-width itm-float-left itm-textalign-left mbdisplaynone'>
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