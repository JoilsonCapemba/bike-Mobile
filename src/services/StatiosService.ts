import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

// URL do endpoint SOAP
const endpointUrl = 'https://56ba-102-216-56-154.ngrok-free.app/ws';

export const entregarBicicleta = async (stationId: number, dockId: number) => {
  console.log('Devolvendo bicicleta no dock');
  try {
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
                    <soapenv:Header/>
                    <soapenv:Body>
                      <int:EntregarBicicletaRequest>
                        <int:stationId>${stationId}</int:stationId>
                        <int:dockId>${dockId}</int:dockId>
                      </int:EntregarBicicletaRequest>
                    </soapenv:Body>
                  </soapenv:Envelope>`;

    const response = await axios.post(endpointUrl, xmls, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: ""
    });

    console.log('Resposta SOAP:', response.data);

    const jsonRes = parser.parse(response.data);
    const sucesso = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:EntregarBicicletaResponse']['ns2:success'];

    return sucesso;
  } catch (error) {
    console.error('Erro ao devolver bicicleta:', error);
    throw new Error('Erro ao devolver bicicleta.');
  }
};

export const levantarBicicleta = async (stationId: number, dockId: number) => { // Corrigi o tipo para 'number'
  console.log('Levantando bicicleta do dock');
  try {
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
                    <soapenv:Header/>
                    <soapenv:Body>
                      <int:LevantarBicicletaRequest>
                        <int:stationId>${stationId}</int:stationId>
                        <int:dockId>${dockId}</int:dockId>
                      </int:LevantarBicicletaRequest>
                    </soapenv:Body>
                  </soapenv:Envelope>`;

    const response = await axios.post(endpointUrl, xmls, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: ""
    });

    console.log('Resposta SOAP:', response.data);

    const jsonRes = parser.parse(response.data);
    const sucesso = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:LevantarBicicletaResponse']['ns2:success'];

    return sucesso;
  } catch (error) {
    console.error('Erro ao levantar bicicleta:', error);
    throw new Error('Erro ao levantar bicicleta.');
  }
};

export const getStations = async () => {
  console.log('Buscando todas as estações');
  try {
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
                    <soapenv:Header/>
                    <soapenv:Body>
                      <int:getAllServicesRequest/>
                    </soapenv:Body>
                  </soapenv:Envelope>`;

    const response = await axios.post(endpointUrl, xmls, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });

    const parser = new XMLParser();
    const jsonRes = parser.parse(response.data);
    const servicesRes = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:getAllServicesResponse']['ns2:services'];

    const results = servicesRes.map((element: any) => ({
      serviceName: element['ns2:serviceName'],
      serviceUrl: element['ns2:serviceUrl'],
      id: element['ns2:id']
    }));

    console.log(results);
    return results;
  } catch (error) {
    console.error('Erro ao buscar estações:', error);
    throw new Error('Erro ao buscar estações.');
  }
};

export const getStation = async (stationName: string) => {
  console.log('Buscando detalhes da estação');
  try {
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.uan.com">
                    <soapenv:Header/>
                    <soapenv:Body>
                      <int:GetStationRequest>
                        <int:stationName>${stationName}</int:stationName>
                      </int:GetStationRequest>
                    </soapenv:Body>
                  </soapenv:Envelope>`;

    const response = await axios.post(endpointUrl, xmls, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: ""
    });

    console.log('Resposta SOAP:', response.data);

    const jsonRes = parser.parse(response.data);
    const stationRes = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:GetStationResponse']['ns2:station'];

    console.log('Resposta JSON analisada:', jsonRes);

    const stationDetails = {
      id: parseInt(stationRes['ns2:id']),
      name: stationRes['ns2:name'],
      latitude: parseFloat(stationRes['ns2:latitude']),
      longitude: parseFloat(stationRes['ns2:longitude']),
      capacity: parseInt(stationRes['ns2:capacity']),
      availableBikes: parseInt(stationRes['ns2:availableBikes']),
      availableDocks: parseInt(stationRes['ns2:availableDocks']),
      deliveryBonus: parseInt(stationRes['ns2:deliveryBonus']),
    };

    console.log(stationDetails);
    return stationDetails;
  } catch (error) {
    console.error('Erro ao buscar estação:', error);
    throw new Error('Erro ao buscar estação.');
  }
};
