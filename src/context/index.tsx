import {useContext, createContext} from 'react'

type AuthContextProps = {

}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)