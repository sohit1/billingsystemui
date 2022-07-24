import './Common.css';
//import profilepic from "D:/Practice/ReactJS/authenticationsystem/src/images/profile-icon.png";

const MainHeader = (props) => {
    const logout = () =>
    {
         localStorage.clear();
        // localStorage.setItem('token-info'," ");
        // localStorage.setItem('login-time'," ");
       // localStorage.clear();
        props.IsLogout("true")
    }
    return (
        <div className="common-header">
            <div className="common-header-left-component">
                <div className="divlogo">
                    <span>JB</span>
                </div>
            </div>
            <div className= "common-header-right-component">
                <div className="common-header-right-component-right">
                    <div className="common-header-right-component-right-right">
                        <div className='common-divheight'>
                            <label className="lbl-logout" onClick={logout}>Log out</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MainHeader;