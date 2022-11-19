import { createChainedFunction } from "@material-ui/core";
import React, { useRef } from "react";


const Table =(props)=>
{
    const createTableData = (el) =>
    {
        const arrTableData = [];
        const arrayname = props.TableDatapProps.split(",");
        // for (let index = 0; index < Object.keys(el).length; index++) {
            for (let index = 0; index < arrayname.length; index++) {
                const element = arrayname[index];
                console.log("element  " + element);
                arrTableData.push(<td>el.element</td>)
                
            }
            console.log("length  " + Object.keys(el).length + " values1  " + el.EmpId + "  " + el.EmpName);
            arrTableData.push(<td>el[index]</td>)
            
        // }
        return arrTableData;
    }

    return(
        <React.Fragment>
            <table style={{width:"100%"}}>
                
                <tbody>
                    <tr className={props.HeaderClass}>
                        {props.TableHeader.map(header => <th>{header}</th>)}
                    </tr>
                    {
                        props.TableRows.map(tr =>
                            {
                                <tr>
                                {
                                    createTableData(tr)
                                }

                            </tr>
                            }
                        )
                    }
                    <tr>
                        <td>abc</td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>
    )
}
export default Table;