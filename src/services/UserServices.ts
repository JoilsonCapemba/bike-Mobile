import axios from "axios";
import { XMLParser } from 'fast-xml-parser';

const url = 'https://56ba-102-216-56-154.ngrok-free.app/ws/users.wsdl';

export const createUser = async (user) => {
    console.log('entrou', user);
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

        return response.data;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw new Error('Erro ao criar usuário.');
    }
};

export const loginService = async (telefone, password) => {
    console.log('entrou');
    try {
        const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
                    <soapenv:Header/>
                    <soapenv:Body>
                        <int:loginRequest>
                            <int:telephone>${telefone}</int:telephone>
                            <int:password>${password}</int:password>
                            <int:wifiCodig></int:wifiCodig>
                        </int:loginRequest>
                    </soapenv:Body>
                    </soapenv:Envelope>`;

        const response = await axios.post(url, xmls, {
            headers: {
                'Content-Type': 'text/xml'
            }
        });

        const parser = new XMLParser();
        const jsonRes = parser.parse(response.data);
        const loginRes = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:loginResponse'];

        const name = loginRes['ns2:name'];
        const email = loginRes['ns2:email'];
        const telephone = loginRes['ns2:telephone'];
        const saldo = loginRes['ns2:saldo'];
        const id = loginRes['ns2:id'];
        const token = loginRes['ns2:token'];
        const type = loginRes['ns2:type'];

        const user = {
            id: id,
            name: name,
            email: email,
            telephone: telephone,
            saldo: saldo,
            token: token,
            type: type
        };

        console.log(user);

        if (type == 0) return null;

        return user;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw new Error('Erro ao fazer login.');
    }
};

export const sendPointsService = async (telefoneDe, telefonePara, saldo) => {
    try {
        const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
                        <soapenv:Header/>
                        <soapenv:Body>
                            <int:sendPointRequest>
                                <int:telephoneFrom>${telefoneDe}</int:telephoneFrom>
                                <int:telephoneReceiver>${telefonePara}</int:telephoneReceiver>
                                <int:saldo>${saldo}</int:saldo>
                            </int:sendPointRequest>
                        </soapenv:Body>
                    </soapenv:Envelope>`;

        const response = await axios.post(url, xmls, {
            headers: {
                'Content-Type': 'text/xml'
            }
        });

        const parser = new XMLParser();
        const jsonRes = parser.parse(response.data);
        const serviceStatus = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:sendPointResponse']['ns2:serviceStatus'];

        if (serviceStatus['ns2:status'] === 'SUCCESS') {
            console.log('Pontos enviados com sucesso');
            return true;
        } else {
            console.log('Falha ao enviar pontos:', serviceStatus['ns2:mensagem']);
            throw new Error(serviceStatus['ns2:mensagem']);
        }
    } catch (error) {
        throw new Error('Erro ao enviar pontos, verifique se os campos estão preenchidos.');
    }
};

export const getSaldoService = async (userId) => {
    console.log('Obtendo saldo');
    try {
        const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
                        <soapenv:Header/>
                        <soapenv:Body>
                            <int:getSaldoRequest>
                                <int:userId>${userId}</int:userId>
                            </int:getSaldoRequest>
                        </soapenv:Body>
                    </soapenv:Envelope>`;

        const response = await axios.post(url, xmls, {
            headers: {
                'Content-Type': 'text/xml'
            }
        });

        const parser = new XMLParser();
        const jsonRes = parser.parse(response.data);
        const saldoResponse = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:getSaldoResponse'];

        const saldo = saldoResponse['ns2:saldo'];

        console.log('Saldo obtido:', saldo, userId);

        return saldo;
    } catch (error) {
        console.error('Erro ao obter saldo:', error);
        throw new Error('Erro ao obter saldo.');
    }
};