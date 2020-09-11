import React from "react";

interface Props {
    children: React.ReactNode;
}

const FormAlignment: React.FC<Props> = ({children}) => {

    return <div style={{display: "flex"}}>
        <div style={{flex: 1}}/>
        <div style={{flexBasis: 800}}>
            {children}
        </div>
        <div style={{flex: 1}}/>
    </div>
}

export default FormAlignment
