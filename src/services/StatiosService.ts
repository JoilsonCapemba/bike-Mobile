import axios from "axios"
import {DOMParser} from 'xmldom';
import {xml2json} from 'xml-js'
import {XMLParser} from 'fast-xml-parser';
import { useState } from "react";


type Userprops = {
    name: string
    email: string
    telefone: string
    senha: string
    tipo: number 
    enderecoMac: string
}

const url = 'https://9294-129-122-221-10.ngrok-free.app/ws/services.wsdl'



export const getStations = async ()  => {
    console.log('entrou')
    try{
        const xmls =`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.bikeshared.uan.com">
                        <soapenv:Header/>
                        <soapenv:Body>
                            <int:getAllServicesRequest/>
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
        const servicesRes = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:getAllServicesResponse']

        

        
        /*const servicesArray = jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:getAllServicesResponse']['ns2:services'];
        setServices(Array.isArray(servicesArray) ? servicesArray : [servicesArray]);*/

            //console.log(servicesRes["ns2:services"][1]["ns2:id"])

            const results = []

            servicesRes["ns2:services"].forEach(Element =>{
                const est = {
                    serviceName:  Element['ns2:serviceName'],
                    serviceUrl: Element['ns2:serviceUrl'],
                    id:  Element['ns2:id']
                }

                results.push(est)
            })

            console.log(results)
            
            

        
            
            

            
            
            /*jsonRes['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:getAllServicesResponse'].array.forEach(element => {
                const serviceName = element['ns2:services']['ns2:serviceName']
                const serviceUrl = element['ns2:services']['ns2:serviceUrl']
                const id = element['ns2:services']['ns2:id']

                console.log(element)
            });*/


            /*for(let i = 0; i < servicesRes.lengh; i++){
                const serviceName = servicesRes['ns2:services']['ns2:serviceName']
                const serviceUrl = servicesRes['ns2:services']['ns2:serviceUrl']
                const id = servicesRes['ns2:services']['ns2:id']

                console.log(serviceName)

                console.log(serviceUrl)
                
                const stat = {
                    serName : serviceName,
                    serUrl : serviceUrl,
                    serId : id
                }

                }*/
                return results
    }
    catch(error){
        console.error('Erro ao buscar estacoes:', error);
        throw new Error('Erro ao buscar estacoes.');
    }
}