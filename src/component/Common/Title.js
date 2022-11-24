import React from 'react'
import BackIcon from "../../images/backicon.png";

const Title = (props) => {
    function onBackButtonClickHandler() {
        props.BackButtonClick();
    }
    return (
        <div className='w-100 m-t-b-l h-7'>
            <table className='mbdisplaynone'>
                <tr>
                    <td className='mbdisplay'>
                        <span>
                            <label className='gnb-label'>
                                <img style={{ width: "20%", cursor: "pointer" }} src={BackIcon} alt="back" onClick={onBackButtonClickHandler}></img>
                            </label>
                        </span>
                    </td>
                    <td>
                        <span><label style={{ fontWeight: "bold" }} className='gnb-label'>{props.Title}</label></span>
                    </td>
                    <td>
                        <span><label className='gnb-label'></label></span>
                    </td>
                </tr>
            </table>           
            <div className="h-100 w-100 mbdisplay" style={{fontweight:"bold"}}>
                <div className='w-20 h-100' style={{float:"left"}}>
                        <label className=''>
                            <img src={BackIcon} alt="back" onClick={onBackButtonClickHandler}></img>
                        </label>
                </div>
                <div className='w-80 h-100 max-w-50 m-auto d-flex'>
                    <span><label style={{ fontWeight: "bold"}} className='lbl-col-green'>{props.Title}</label></span>
                </div>
            </div>
        </div>

    );
}
export default Title;