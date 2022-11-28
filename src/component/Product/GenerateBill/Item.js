import './Item.css';
import { useState } from 'react'
import config from '../../../config.json'
import removeIcon from '../../../images/removeIcon.png'

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

    const RemoveRowHandler =(event) =>
    {
        props.onQuantityChange(priceperunit * event.target.value ,props.itemsId,0,priceperunit,event.target.value,'OnItemDelete');
    }

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
        const re = /^[0-9,.]+$/;
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
        <div className='h-10 m-b-1 d-flex'>
            <div className='w-25 f-md-2_0_20'>
                <select onChange={selectItemHandler} className='itm-select1-width'>
                    {MenuItems.map(items => <option value={items.itemId + "_" + items.pricePerUnit+"_"+items.itemName} key={items.itemId}>{items.itemName}</option>)}
                </select>
                {/* <input className="itm-input" type="text" name="item"></input> */}
            </div>
            <div className='w-25 w-md-18 m-1-6px'>
                <input onChange={QyantityHandler} className="itm-input" type="text" name="Quantity"></input>
            </div>
            <div className='w-25 w-md-18 d-flex'>
                <label className="m-auto-0 f-md-2">{priceperunit}</label>
            </div>
            <div className='w-25 w-md-18 d-flex'>
                <label className="m-auto-0">{Amount}</label>
            </div>
            <div className='w-25 w-md-10 d-flex itm-al-center'>
                <img alt="removeimage" src={removeIcon} className="h-50 cur-pointer" onClick={RemoveRowHandler}></img>
            </div>
        </div>
    );
}
export default Item;