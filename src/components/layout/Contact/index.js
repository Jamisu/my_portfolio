import './index.scss'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Contact = () => {
    return(<div className='map-container'>

            <div className="info-map">
                Adam Pocentek<br/><br/>
                Junior FullStack Developer<br/><br/>
                690 292 060<br/><br/>
                Krakow<br/>
                Poland<br/>
            </div>
            
            <MapContainer center={[50.016, 19.984]} zoom={12.2}scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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