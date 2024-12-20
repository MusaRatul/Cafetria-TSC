import { createContext, useState } from "react";
const MyContext=createContext();
 const MyContextProvider=({children})=>{
    
    const [flag,setFlag]=useState(false);
    const [cartfoods,setCartfoods]=useState([]);
    const [totalprice,setTotalprice]=useState(0);
    const [userEmail,setUserEmail]=useState("");
    const [adminflag,setAdminflag]=useState(false);
    const [userflag,setUserflag]=useState(false);
    return (
        <MyContext.Provider value={{flag:flag,setFlag:setFlag,cartfoods:cartfoods,setCartfoods:setCartfoods,totalprice:totalprice,setTotalprice:setTotalprice,userEmail:userEmail,setUserEmail:setUserEmail,userflag:userflag,setUserflag:setUserflag,adminflag:adminflag,setAdminflag:setAdminflag}}>
            {children}
        </MyContext.Provider>
    )
};
export {MyContext,MyContextProvider};