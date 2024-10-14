import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

import { v4 as uuidv4 } from "uuid";

interface MapProps {
   cityLatitude: number | null | undefined;
   cityLongitude: number | null | undefined;
}

const LeafletMap = ({ cityLatitude, cityLongitude }: MapProps) => {
   const markers = [
      {
         latitude: 48.39,
         longitude: -4.4806,
      },
   ];

   const customIcon = new Icon({
      iconUrl: "https://img.icons8.com/?size=48&id=13800&format=png",
      iconSize: [38, 38],
   });

   return (
      <MapContainer
         center={[Number(cityLatitude), Number(cityLongitude)]}
         zoom={13}
         className="h-[400px] rounded-md z-30"
      >
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         {markers.map((marker) => (
            <Marker
               position={[marker.latitude, marker.longitude]}
               icon={customIcon}
               key={uuidv4()}
            >
               {/* //TODO: Trouver infos à mettre dans la popup */}
               <Popup>Nom de la maison</Popup>
            </Marker>
         ))}
      </MapContainer>
   );
};

export default LeafletMap;
