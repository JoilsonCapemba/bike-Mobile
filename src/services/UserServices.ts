import axios from "axios"
import {DOMParser} from 'xmldom';

type Userprops = {
    name: string
    email: string
    telefone: string
    senha: string
    tipo: number 
    enderecoMac: string
}

export const createUser = async (user: Userprops)  => {
    console.log('entrou')
    try{
        const xmls =`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.bikeshared.uan.com">
                    <soapenv:Header/>
                    <soapenv:Body>
                        <int:createUserRequest>
                            <int:userInfo>
                                <int:userId>?</int:userId>
                                <int:name>${user.name}</int:name>
                                <int:email>${user.email}</int:email>
                                <int:telephone>${user.telefone}</int:telephone>
                                <int:password>${user.senha}</int:password>
                                <int:type>${user.tipo}</int:type>
                                <int:macAddress>${user.enderecoMac}</int:macAddress>
                            </int:userInfo>
                        </int:createUserRequest>
                    </soapenv:Body>
                    </soapenv:Envelope>`

        const response = await axios.post(
            'https://fad8-2c0f-f888-a980-58c-a052-1f3b-342c-4725.ngrok-free.app/ws/users.wsdl', // Substitua pela URL da API real
            xmls,
            {
                headers:{
                    'Content-Type': 'text/xml'
                }
            }
        )

        // Analisar a resposta XML
        /*parseString(response.data, (err, result) => {
            if (err) {
                console.error('Erro ao analisar a resposta XML:', err);
            } else {
                console.log('Resposta XML:', result);
                // Processar a resposta XML
            }
        });*/
        
       return response
    }
    catch(error){
        console.error('Erro ao criar usuário:', error);
        throw new Error('Erro ao criar usuário.');
    }
}

export const login = async (telefone: string, password: string)  => {
    console.log('entrou')
    try{
        const xmls =`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.bikeshared.uan.com">
                    <soapenv:Header/>
                    <soapenv:Body>
                        <int:loginRequest>
                            <int:telephone>${telefone}</int:telephone>
                            <int:password>${password}</int:password>
                            <int:wifiCodig></int:wifiCodig>
                        </int:loginRequest>
                    </soapenv:Body>
                    </soapenv:Envelope>`

        const response = await axios.post(
            'https://fad8-2c0f-f888-a980-58c-a052-1f3b-342c-4725.ngrok-free.app/ws/users.wsdl', // Substitua pela URL da API real
            xmls,
            {
                headers:{
                    'Content-Type': 'text/xml'
                }
            }
        )

        const parer = new DOMParser()
        const doc = parer.parseFromString(response, 'text/xml')

        if(doc != null) return true
        else return false
        
       return response
    }
    catch(error){
        console.error('Erro ao fazer login:', error);
        throw new Error('Erro ao fazer login.');
    }
}