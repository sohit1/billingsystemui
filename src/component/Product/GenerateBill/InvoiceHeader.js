import "./InvoiceHeader.css"

const InvoiceHeader=(props)=>
{

    return(
            <div className="inv-wdthgt inv-border inv-float ">
                <div className='inv-divlabel inv-businessinfo'><label className="inv-label">{props.getBusinessInfo[0].businessName}</label></div>
                <div className="inv-divlabel inv-addressline1"><label className="inv-label">{props.getBusinessInfo[0].businessAddressLine1}</label></div>
                <div className="inv-divlabel inv-addressline2"><label className="inv-label">{props.getBusinessInfo[0].businessAddressLine2}</label></div>
            </div>
    )
}
export default InvoiceHeader;