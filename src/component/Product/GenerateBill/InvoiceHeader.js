import "./InvoiceHeader.css"
import config from '../../../config.json'

const InvoiceHeader=(props)=>
{

    return(
            <div className="max-w-50 m-l-auto m-r-auto col-black max-w-md-60" style={{fontweight:"bold"}}>
                <div className='inv-divlabel inv-businessinfo mbdisplaynone font-size'><label style={{fontWeight:"bold"}} className="col-black">{config.BUSINESS_TITLE.NAME}</label></div>
                <div className='inv-divlabel inv-businessinfo mbdisplay font-size'><label style={{fontWeight:"bold"}} className="col-black">{config.MOBILE.BUSINESS_TITLE.NAME}</label></div>
                <div className="inv-divlabel inv-addressline1 mbdisplaynone font-family-initial"><label style={{fontWeight:"bold"}} className="col-black">{config.BUSINESS_TITLE.AREA}, {config.BUSINESS_TITLE.CITY}, {config.BUSINESS_TITLE.PINCODE}</label></div>
                <div className="inv-divlabel inv-addressline1 mbdisplay font-family-initial"><label style={{fontWeight:"bold"}} className="col-black">{config.MOBILE.BUSINESS_TITLE.AREA} , {config.MOBILE.BUSINESS_TITLE.CITY} , {config.MOBILE.BUSINESS_TITLE.PINCODE}</label></div>
                {/* <div className="inv-divlabel inv-addressline2 mbdisplaynone font-family-initial"><label style={{fontWeight:"bold"}} className="col-black">{config.BUSINESS_TITLE.STATE} , {config.BUSINESS_TITLE.PINCODE}</label></div> */}
                <div className="inv-divlabel inv-addressline2 font-family-initial"><label style={{fontWeight:"bold"}} className="col-black">Tel: +91{config.BUSINESS_TITLE.MOBILE}</label></div>
            </div>
    )
}
export default InvoiceHeader;