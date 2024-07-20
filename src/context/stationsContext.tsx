import {createContext, useState} from 'react'
import { getStations } from 'src/services/StatiosService';


/*interface StationAuthProviderContextType {
    serviceName: string;
    setServiceName: React.Dispatch<React.SetStateAction<string>>;
    serviceUrl: string;
    setServiceUrl: React.Dispatch<React.SetStateAction<string>>;
    id: string;
    setId: React.Dispatch<React.SetStateAction<string>>;
}*/

interface StationAuthProviderContextType {
    stations: [];
    setStations: React.Dispatch<React.SetStateAction<[]>>
}


const StationsContext = createContext<StationAuthProviderContextType | undefined>(undefined);

function StationsAuthProvider({children}: any){
    const [serviceName, setServiceName] = useState<string>('')
    const [serviceUrl, setServiceUrl] = useState<string>('')
    const [id, setId] = useState<string>('')

    const [stations, setStations] = useState<[]>([])
    


    return (
        <StationsContext.Provider value={{stations, setStations}}>
            {children}
        </StationsContext.Provider>
    )
}

export {StationsContext, StationsAuthProvider}