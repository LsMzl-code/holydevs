'use client'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

import { v4 as uuidv4 } from "uuid";

interface MiniMapProps {
   latitude: number | null | undefined;
   longitude: number | null | undefined;

}

const MiniMap = ({ latitude, longitude }: MiniMapProps) => {
   const markers = [
      {
         latitude: latitude,
         longitude: longitude,
      },
   ];

   const customIcon = new Icon({
      iconUrl: "https://img.icons8.com/?size=48&id=13800&format=png",
      iconSize: [38, 38],
   });

   return (
      <MapContainer
         // Coordonnées géographiques du logement (latitude, longitude)
         center={[Number(latitude), Number(longitude)]}
         zoom={12}
         className="h-[200px] rounded-md z-50 shadow"
      >
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         {markers.map((marker) => (
            <Marker
               position={[marker?.latitude ?? 0, marker?.longitude ?? 0]}
               icon={customIcon}
               key={uuidv4()}
            >
               {/* //TODO: Trouver infos à mettre dans la popup */}
               <Popup>Votre position</Popup>
            </Marker>
         ))}
      </MapContainer>
   );
};

export default MiniMap;
