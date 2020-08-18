
import React from 'react';
const Popup = ({children,onClose,visible})=>{
    return(
        visible && (
            <div vie className="popup-mask">
            <div className="popup-dialog">
                <div onClick={onClose} className="close-btn" > <span className="mdi mdi-close"></span> </div>
                <div className="popup-haader">
                    <h2>Add User</h2>
                </div>
                <div className="popup-content">
                    {children}
                </div>
            </div>
        </div>
        )
    )
}
export default Popup