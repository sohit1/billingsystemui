import "./Invoiceprint.css"
import "./InvoiceHeader.css"
import config from '../../../config.json'
import ReactToPrint from "react-to-print";
import Invoice from "./Invoice";
import InvoiceHeader from "./InvoiceHeader";
import React, { useRef } from "react";

// const ComponentToPrint=(props)=>
// {
//     return (
//         <div className='print-source'>
//           <InvoiceHeader/>
//         </div>
//       );
// }

class ComponentToPrint extends React.Component {
    render() {
      return (
          <React.Fragment>
              <ItemsRowContainer InvoiceNumberAndAmount = {this.props.InvoiceNumberAndAmount} InvoiceInfo = {this.props.InvoiceInfo}/>
          </React.Fragment>
      );
    }
  }

const ItemsRowContainer = (props) => {
    return (
        <React.Fragment>
            
            <div className="billContent">
                <InvoiceHeader />
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

              <ComponentToPrint InvoiceNumberAndAmount = {this.props.InvoiceNumberAndAmount}InvoiceInfo={this.props.InvoiceInfo} ref={el => (this.componentRef = el)} />
              <div className = "reacttoprint">
                  <ReactToPrint
                      trigger={() =>
                        
                              <div className="btnPrint">
                                  <label className=''><a href="#">Print</a></label>
                              </div>
                    }
                      content={() => this.componentRef}
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