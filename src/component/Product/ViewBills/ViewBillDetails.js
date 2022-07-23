import InvoiceHeader from "../GenerateBill/InvoiceHeader";
import React, { useRef } from "react";

class ViewBillDetails extends React.Component {
    render() {
        return (
            <React.Fragment>
                <ItemsRowContainer InvoiceNumber={this.props.InvoiceNumber} InvoiceAmount={this.props.InvoiceAmount} InvoiceInfo={this.props.InvoiceInfo} />
            </React.Fragment>
        );
    }
}

const ItemsRowContainer = (props) => {
    return (
        <React.Fragment>

            <div className="billContent">
                <div className="" style={{height:"5%",marginLeft:"2%"}}>
                    <table className="tblItemHeader">
                        <tr>
                            <td className="tdItem">
                                <span>#Item</span>
                            </td>
                            <td>
                                <span>Qty</span>
                            </td>
                            <td>
                                <span>Price</span>

                            </td>
                            <td>
                                <span>Amount</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="dvborder"></div>
                <div style={{height:"73%" , overflowY:"auto",overflowX:"hidden",marginLeft:"2%"}}>
                    <table className="tblItem">
                        {props.InvoiceInfo.map(items => <ItemsRow ItemDetails={items}></ItemsRow>)}
                    </table>
                </div>

                <div className="dvborder"></div>
                <table className="tblSubPrice" style={{marginLeft:"2%"}}>
                    <tr>
                        <td className="tdItem">
                            <span></span>
                        </td>
                        <td>
                            <span></span>
                        </td>
                        <td>
                            <span>Sub Total :</span>
                        </td>
                        <td>
                            <span>Rs {props.InvoiceAmount}</span>
                        </td>
                    </tr>
                </table>
                <div className="dvborder"></div>
                <table className="tblSubPrice" style={{ height: "10%" ,marginLeft:"2%"}} >
                    <tr>
                        <td className="tdItem">
                            <span></span>
                        </td>
                        <td>
                            <span>Others :</span>
                        </td>
                        <td>
                            <span></span>
                        </td>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                </table>
                <div className="dvborder"></div>
                <table className="tblSubPrice" style={{ height: "5%",marginLeft:"2%" }}>
                    <tr>
                        <td className="tdItem">
                            <span></span>
                        </td>
                        <td>
                            <span style={{ fontWeight: "bold" }}>Grand Total   :</span>
                        </td>
                        <td>
                            <span></span>
                        </td>
                        <td>
                            <span style={{ fontWeight: "bold" }}>Rs {props.InvoiceAmount}</span>
                        </td>
                    </tr>
                </table>
                <div className="dvborder"></div>
            </div>
        </React.Fragment>

    );
}

const ItemsRow = (props) => {
    return (
        <tr className="trItemRow">
            <td className="tdItem">{props.ItemDetails.itemName}</td>
            <td><span>{props.ItemDetails.quantity}</span></td>
            <td><span>{props.ItemDetails.itemPrice}</span></td>
            <td><span>{props.ItemDetails.totalItemAmount}</span></td>
        </tr>
    );
}

export default ViewBillDetails;