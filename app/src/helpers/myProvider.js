import { useState } from 'react';
import MyContext from './myContext';

const MyProvider = ({ children }) => {
    const [stateGlobal, setStateGlobal] = useState({
        volume: "ALLLOOO"
    })

    return ( 
        <MyContext.Provider value={{
            stateGlobal,
            setVolumeContext: (e) => setStateGlobal({volume: e})
        }}>
            {children}
        </MyContext.Provider>
     );
}
 
export default MyProvider;