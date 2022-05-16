import BillingImg from '../../images/GenerateBill.png';
const ProductCatalog = (props) => {
    const startBillingHandler=()=>
    {
        console.log("startBillingHandler");
        props.IsProductCatalog("Register");
    }
    return (
        <div className='divbox'>
            <div className='float-left'>
                <div className=''>
                    <img src={BillingImg} alt="billingimage"></img>
                </div>
                <div onClick={startBillingHandler} className='divbutton1 mbdivbutton1'>
                    <label className='labelcolor'>Start billing</label>
                </div>
            </div>
            <div className='float-right'>
                <div className=''>
                    <img src={BillingImg} alt="billingimage"></img>
                </div>
                <div onClick={startBillingHandler} className='divbutton1 mbdivbutton1'>
                    <label className='labelcolor'>Employee ledger</label>
                </div>
            </div>
        </div>
    );
}   
export default ProductCatalog;