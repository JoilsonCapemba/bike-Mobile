import {createContext, useState} from 'react'
import { loginService } from 'src/services/UserServices';


interface AuthProviderContextType {
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    telephone: string;
    setTelephone: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    saldo: string;
    setSaldo: React.Dispatch<React.SetStateAction<string>>;
}


const Context = createContext<AuthProviderContextType | undefined>(undefined);

function AuthProvider({children}: any){
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState<string>('')
    const [telephone, setTelephone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [saldo, setSaldo] = useState<string>('')
    

    return (
        <Context.Provider value={{user,setUser,telephone, setTelephone,email, setEmail,saldo, setSaldo}}>
            {children}
        </Context.Provider>
    )
}

export {Context, AuthProvider}




























/*
import {useContext, createContext, Children, useState} from 'react'

type AuthContextProps = {
    user: Userprops | null
    handlelogin: ()=> void
}

type Userprops = {
      
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({Children}: any)=>{
    const [user, setUser  ] = useState<Userprops | null>();
    const handlelogin = ()=>{
        return true
    }

    return <AuthContext.Provider 
        value={{
            handlelogin,
            user
        }}>
            {Children}
        </AuthContext.Provider>
}

export const useAuth = () =>{
    const context = useContext(AuthContext)
    return context
}
*/