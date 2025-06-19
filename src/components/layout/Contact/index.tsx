import './index.scss'
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useOutletContext } from "react-router-dom";

const Contact = () => {
    const [dayMode] = useOutletContext<string>();
    return(<div className='map-container'>

            <div className={"info-map " + dayMode}>
                Adam Pocentek<br/>
                FullStack Developer<br/>TEL: 
                <a href="tel:690 292 060"> 690 292 060</a><br/>EMAIL: 
                <a href="mailto: a.pocentek@gmail.com"> a.pocentek@gmail.com</a><br/>
                Krakow<br/>
                Poland<br/>
            </div>
            
            <MapContainer center={[50.016, 19.984]} zoom={12.2}scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    // @ts-ignore
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[50.016, 19.984]}>
                    <Popup>Hi :)</Popup>
                </Marker>
            </MapContainer>

        </div>
    )
}

export default Contact