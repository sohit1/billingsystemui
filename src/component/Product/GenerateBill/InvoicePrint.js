import "./Invoiceprint.css"
import "./InvoiceHeader.css"
import ReactToPrint from "react-to-print";
import InvoiceHeader from "./InvoiceHeader";
import React from "react";
import QrCode from '../../../images/QRCode.jpeg';
import CustomButton from '../../Common/CustomButton';

class ComponentToPrint extends React.Component {
    render() {
      return (
          <React.Fragment>
              <ItemsRowContainer InvoiceNumber={this.props.InvoiceNumber} InvoiceAmount={this.props.InvoiceAmount} InvoiceInfo = {this.props.InvoiceInfo}/>
          </React.Fragment>
      );
    }
  }

  class ComponentToPrintHidden extends React.Component {
    render() {
      return (
          <React.Fragment>
              <ItemsRowContainerHidden InvoiceNumber={this.props.InvoiceNumber} InvoiceAmount={this.props.InvoiceAmount} InvoiceInfo = {this.props.InvoiceInfo}/>
          </React.Fragment>
      );
    }
  }

  const ItemsRowContainerHidden = (props) => {
    return (
        <React.Fragment>
            
            <div className="billContent col-black">
                <div className="dvInvoiceHeader">
                    <InvoiceHeader></InvoiceHeader>
                </div>
                <div className="br-btm-1 h-6 pd-1">
                    <div className="w-60 float-l">
                        <label className="col-black">Date : {new Date().getDate()}/{new Date().getMonth()}/{new Date().getFullYear()}  {new Date().getHours()}:{new Date().getMinutes()}</label>
                    </div>
                    <div className="w-40 float-r">
                        <label className="col-black">Bill No: #{props.InvoiceNumber}</label>
                    </div>
                </div>
                <div className="itemHeader h-6">
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
                    <div className="m-btm-2 max-h-60">
                        <table className="tblItem">
                            {props.InvoiceInfo.map(items => <ItemsRow ItemDetails={items}></ItemsRow>)}
                        </table>
                    </div>
                
                <div className="dvborder"></div>
                <div className="dvborder"></div>
                <div className="h-6 w-100 col-black">
                    <table className="h-100">
                        <tr>
                            <td className="w-84 w-md-30">

                            </td>
                            <td>
                                <span>
                                    <label className="col-black">
                                        Total : Rs {props.InvoiceAmount}
                                    </label>
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="dvborder"></div>
                <div className="dvborder"></div>
                <div className="max-w-50 m-l-auto m-r-auto col-black txt-al-center m-top-4">
                    <label className="m-btm-1 col-black ">Scan to pay</label>
                    <label className="h-100"><img  src={QrCode}></img></label>
                </div>
            </div>
        </React.Fragment>

    );
}

const ItemsRowContainer = (props) => {
    return (
        <React.Fragment>
            
            <div className="billContent col-black">
                <div className="dvInvoiceHeader">
                    <InvoiceHeader></InvoiceHeader>
                </div>
                <div className="br-btm-1 h-6 pd-1">
                    <div className="w-60 float-l">
                        <label>Date : {new Date().getDate()}/{new Date().getMonth()}/{new Date().getFullYear()}  {new Date().getHours()}:{new Date().getMinutes()}</label>
                    </div>
                    <div className="w-40 float-r">
                        <label>Bill No: #{props.InvoiceNumber}</label>
                    </div>
                </div>
                <div className="itemHeader h-6">
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
                    <div className="ovf-auto m-btm-1 max-h-60">
                        <table className="tblItem">
                            {props.InvoiceInfo.map(items => <ItemsRow ItemDetails={items}></ItemsRow>)}
                        </table>
                    </div>
                
                <div className="dvborder"></div>
                <div className="dvborder"></div>
                <div className="h-6 w-100 col-black">
                    <table className="h-100">
                        <tr>
                            <td className="w-84 w-md-30">

                            </td>
                            <td>
                                <span>
                                    <label>
                                        Total : Rs {props.InvoiceAmount}
                                    </label>
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
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
            console.log('NumberOfItems' , this.props.NumberOfItems);
            this.props.OnClose();
        }

        const PaperSize =(props) =>
        {
            console.log('NumberOfItems' , this.props.NumberOfItems);
            if(this.props.NumberOfItems > 6)
            {
                return 6 + (this.props.NumberOfItems - 6) / 1.5;
            }
            return 6;
            
        }
      return (
          <div className ="divMain">
              <div style={{ display: "none" }}>
                  <ComponentToPrintHidden InvoiceNumber = {this.props.InvoiceNumber} InvoiceAmount={this.props.InvoiceAmount} InvoiceInfo={this.props.InvoiceInfo} ref={el => (this.componentRef = el)} />
              </div>

              <ComponentToPrint InvoiceNumber = {this.props.InvoiceNumber} InvoiceAmount={this.props.InvoiceAmount} InvoiceInfo={this.props.InvoiceInfo} />
              <div className = "reacttoprint">
                  <ReactToPrint
                      trigger={() =>
                        
                              <div className="w-25 float-l">
                                 <CustomButton Text ="Print" Color="white" BorderRadius="20px 20px 20px 20px"></CustomButton>
                                  {/* <label className=''><a href="#">Print</a></label> */}
                              </div>
                    }
                      content={() => this.componentRef}
                    //   content={() => }
                    //   pageStyle="print"
                    pageStyle={`@page {size: 4in ${PaperSize()}in}`}
                    //  pageStyle="@page {size: 4in 14in}"
                  />
                  <div className="w-25 float-r " onClick={onPrintClose} >
                      <CustomButton Text ="Close" Color="white" BorderRadius="15px 15px 15px 15px"></CustomButton>
                  </div>
              </div>
              
          </div>
      );
    }
  }
  
  export default Example;