import { useState } from 'react';
import MyContext from './myContext';

const MyProvider = ({ children }) => {
    const [stateGlobal, setStateGlobal] = useState(null)
   
    return ( 
        <MyContext.Provider value={{
            stateGlobal,
        }}>
            {children}
        </MyContext.Provider>
     );
}
 
export default MyProvider;