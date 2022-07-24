import React from 'react'
import BackIcon from "../../images/backicon.png";

const Title = (props) => {
    function onBackButtonClickHandler()
    {
        props.BackButtonClick();
    }
    return (
        <table className="mbdisplay ">
            <tr>
                <td>
                    <span>
                        <label className='gnb-label'>
                            <img style={{ width: "20%", cursor: "pointer" }} src={BackIcon} alt="back" onClick={onBackButtonClickHandler}></img>
                        </label>
                    </span>
                </td>
                <td>
                    <span><label style={{fontWeight:"bold"}} className='gnb-label'>{props.Title}</label></span>
                </td>
                <td>
                    <span><label className='gnb-label'></label></span>
                </td>
            </tr>
        </table>
    );
}
export default Title;