import axios from "axios"
import {DOMParser} from 'xmldom';
import {xml2json} from 'xml-js'
import {XMLParser} from 'fast-xml-parser';


type Userprops = {
    name: string
    email: string
    telefone: string
    senha: string
    tipo: number 
    enderecoMac: string
}

const url = 'https://90b6-129-122-244-245.ngrok-free.app/ws/users.wsdl'

export const createUser = async (user) => {
    console.log('entrou', user); // Verifique se todos os dados estão sendo passados
    try {
        const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
                    <soapenv:Header/>
                    <soapenv:Body>
                        <int:createUserRequest>
                            <int:userInfo>
                                <int:userId>?</int:userId>
                                <int:name>${user.name}</int:name>
                                <int:email>${user.email}</int:email>
                                <int:telephone>${user.telephone}</int:telephone>
                                <int:password>${user.password}</int:password>
                                <int:type>${user.type}</int:type>
                                <int:macAddress>${user.macAddress}</int:macAddress>
                            </int:userInfo>
                        </int:createUserRequest>
                    </soapenv:Body>
                    </soapenv:Envelope>`;

        const response = await axios.post(url, xmls, {
            headers: {
                'Content-Type': 'text/xml'
            }
        });

        console.log('Resposta do servidor:', response.data);
        
        // Adicione lógica para analisar e processar a resposta se necessário
        
        return response.data;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw new Error('Erro ao criar usuário.');
    }
};

export const loginService = async (telefone: string, password: string)  => {
    console.log('entrou')
    try{
        const xmls =`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
                    <soapenv:Header/>
                    <soapenv:Body>
                        <int:loginRequest>
                            <int:telephone>${telefone}</int:telephone>
                            <int:password>${password}</int:password>
                            <int:wifiCodig></int:wifiCodig>
                        </int:loginRequest>
                    </soapenv:Body>
                    </soapenv:Envelope>`

        let env = null
                
        const response = await axios.post(url, xmls,
            {
                headers:{
                    'Content-Type': 'text/xml'
                }
            }
        )
        const parser = new XMLParser()
        const jsonRes = parser.parse(response.data)
        const loginRes = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:loginResponse']
        
            const name = loginRes['ns2:name']
            const email = loginRes['ns2:email']
            const telephone = loginRes['ns2:telephone']
            const saldo = loginRes['ns2:saldo']
            const id = loginRes['ns2:id']
            const token = loginRes['ns2:token']
            const type = loginRes['ns2:type']
        
            const user = {
                id: id,
                name: name,
                email: email,
                telephone: telephone,
                saldo: saldo,
                token: token,
                type: type
            }

            console.log(user)

            if(type == 0) return null

            return user
        

    }
    catch(error){
        console.error('Erro ao fazer login:', error);
        throw new Error('Erro ao fazer login.');
    }
}
/*

const response = await axios.post(url, requestBody, config);
    const parser = new XMLParser();
    const jsonResponse = parser.parse(response.data);
    const loginResponse =
      jsonResponse['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:UserResponse'];
    const estado = loginResponse['ns2:estado'];
    if (estado) {
      const userIdCiclista = loginResponse['ns2:ciclistaId'];
      const emailUser = loginResponse['ns2:email'];
      const name = loginResponse['ns2:nome'];
      const lastName = loginResponse['ns2:sobrenome'];
      const avatarUrl = loginResponse['ns2:avatarUrl'];
      const token = loginResponse['ns2:token'];
      return {
        userIdCiclista: userIdCiclista,
        estado: estado,
        token: token,
        email: emailUser,
        name: name,
        lastName: lastName,
        avatarUrl: avatarUrl,
      };
    } else {
      const message = loginResponse['ns2:mensagem'];
      return {estado: estado, message: message};
    }
  } catch (error) {
    console.log('Erro ao fazer requisição:', error);
    return {error: error};
  }
}

*/