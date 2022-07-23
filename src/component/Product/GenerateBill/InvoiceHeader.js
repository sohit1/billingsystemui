import "./InvoiceHeader.css"
import config from '../../../config.json'

const InvoiceHeader=(props)=>
{

    return(
            <div className="inv-wdthgt inv-float " style={{fontweight:"bold"}}>
                <div className='inv-divlabel inv-businessinfo'><label className="inv-label" style={{fontWeight:"bold"}}>{config.BUSINESS_TITLE.NAME}</label></div>
                <div className="inv-divlabel inv-addressline1"><label className="inv-label" style={{fontWeight:"bold"}}>{config.BUSINESS_TITLE.AREA} , {config.BUSINESS_TITLE.DISTRICT}</label></div>
                <div className="inv-divlabel inv-addressline2"><label className="inv-label" style={{fontWeight:"bold"}}>{config.BUSINESS_TITLE.CITY} , {config.BUSINESS_TITLE.STATE} , {config.BUSINESS_TITLE.PINCODE}</label></div>
                <div className="inv-divlabel inv-addressline2"><label className="inv-label" style={{fontWeight:"bold"}}>Contact No:{config.BUSINESS_TITLE.MOBILE}</label></div>
            </div>
    )
}
export default InvoiceHeader;