import { createContext,useState } from "react";
// import { useCookies } from "react-cookie";


export const UserContext = createContext('')

function User({children})

{

//   const user = JSON.parse('user');
//   const admin = JSON.parse(localStorage.getItem('admin'));

    const [userDetails,setUserDetails] = useState('')
    // const [adminDetails, setAdminDetails]=useState(admin)
    // const [cookies,setCookie,removeCookie] = useCookies([]);
    // const [ameen,setAmeen]=useState("hi ameen")
    return(
        <UserContext.Provider value={{userDetails,setUserDetails}}>
          {children}
        </UserContext.Provider>
    )
}

export default User;