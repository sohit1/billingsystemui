import "./Invoiceprint.css"
import "./InvoiceHeader.css"
import config from '../../../config.json'
import ReactToPrint from "react-to-print";
import Invoice from "./Invoice";
import InvoiceHeader from "./InvoiceHeader";
import React, { useRef } from "react";

class ComponentToPrint extends React.Component {
    render() {
      return (
          <React.Fragment>
              <ItemsRowContainer InvoiceNumber={this.props.InvoiceNumber} InvoiceAmount={this.props.InvoiceAmount} InvoiceInfo = {this.props.InvoiceInfo}/>
          </React.Fragment>
      );
    }
  }

const ItemsRowContainer = (props) => {
    return (
        <React.Fragment>
            
            <div className="billContent">
                <div className="dvInvoiceHeader" style={{ paddingBottom: "2%" }}>
                    <InvoiceHeader></InvoiceHeader>
                </div>
                <div className="itemCashier">
                    <table style={{borderSpacing:"0 1em",borderCollapse:"separate"}} className="tblItemHeader">
                        <tr>
                            <td className="">
                                <span>Date : {new Date().getDate()}/{new Date().getMonth()}/{new Date().getFullYear()}  {new Date().getHours()}:{new Date().getMinutes()}</span>
                            </td>
                            <td>
                                <span>Table No :#</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="">
                                <span>Cashier : Abc</span>
                            </td>
                            <td>
                                <span>Bill No: #{props.InvoiceNumber}</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="itemHeader">
                    <table className="tblItemHeader">
                        <tr>
                            <td className="tdItem">
                                <span>Item</span>
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
                <table className="tblItem">
                    {props.InvoiceInfo.map(items => <ItemsRow ItemDetails={items}></ItemsRow>)}
                </table>
                <div className="dvborder"></div>
                <table className="tblSubPrice">
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
                <table className="tblSubPrice" style={{height: "10%"}}>
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
                <div className="dvborder"></div>
                <table className="tblSubPrice" style={{height: "5%"}}>
                    <tr>
                        <td className="tdItem">
                            <span></span>
                        </td>
                        <td>
                            <span style={{fontWeight:"bold"}}>Grand Total   :</span>
                        </td>
                        <td>
                        <span></span>
                        </td>
                        <td>
                            <span style={{fontWeight:"bold"}}>Rs {props.InvoiceAmount}</span>
                        </td>
                    </tr>
                </table>
                <div className="dvborder"></div>
                <div className="dvborder"></div>
            </div>
        </React.Fragment>

    );
}

  const ItemsRow=(props)=>
{
      return (
          <tr className="trItemRow">
              <td className="tdItem">{props.ItemDetails.itemName}</td>
              <td><span>{props.ItemDetails.quantity}</span></td>
              <td><span>{props.ItemDetails.itemPrice}</span></td>
              <td><span>{props.ItemDetails.totalItemAmount}</span></td>
          </tr>
      );
}

  class Example extends React.Component {
    render() {
        const onPrintClose = (event) => {
            this.props.OnClose();
        }
      return (
          <div className ="divMain">

              <ComponentToPrint InvoiceNumber = {this.props.InvoiceNumber} InvoiceAmount={this.props.InvoiceAmount} InvoiceInfo={this.props.InvoiceInfo} ref={el => (this.componentRef = el)} />
              <div className = "reacttoprint">
                  <ReactToPrint
                      trigger={() =>
                        
                              <div className="btnPrint">
                                  <label className=''><a href="#">Print</a></label>
                              </div>
                    }
                      content={() => this.componentRef}
                    //   pageStyle="print"
                    // pageStyle={`@page {size: 6in ${this.props.NumberOfItems*2}in}`}
                    pageStyle="@page {size: 6in 14in}"
                  />
                  <div className="btnClose" onClick={onPrintClose} >
                      <label className=''><span>Close</span></label>
                  </div>
              </div>
              
          </div>
      );
    }
  }
  
  export default Example;