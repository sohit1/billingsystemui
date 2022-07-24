import React, { useRef } from "react";
import "./TableRow.css"
import editicon from "../../images/editicon.png";


const TableRow=(props)=>{
    const getBillDetaisl=()=>{
        props.onViewBillDetailsClick(props.ItemDetails.invoiceNo);
    }

    const createtd =()=>{
        let content = [];
        var result = [];
        if(props !== 'undefined')
        {
        for(var i in props.ItemDetails)
            result.push([i, props.ItemDetails [i]]);

        for (var i =0 ; i< result.length ; i++) {
            var classname = "";
            if (i === 3)
                classname = "tr-tdwidth20";
            else
                classname = "tr-tdwidth15";
            content.push(<td className={classname} key={props.ItemDetails.invoiceNo+i}>{result[i][1]}
            {
                i === 4 &&
                <img  style={{width:"20%" , cursor:"pointer"}} src={editicon} alt="view" onClick={getBillDetaisl}></img>
            }
            </td>);
          }
          return content;
        }
    }
      return (
          <tr className="trItemRow" key={props.ItemDetails.invoiceNo}>
              {createtd()}
          </tr>
      );
}

export default TableRow;