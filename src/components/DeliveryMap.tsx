import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import { useFormikContext } from "formik";
import type { OrderFormValues } from "../types/interfaces";
import { getAddress } from "../api/getAddress";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker() {
  const { setFieldValue } = useFormikContext<OrderFormValues>();
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    async click(e) {
      setPosition(e.latlng);
      setFieldValue(
        "deliveryAddress",
        await getAddress(e.latlng.lat, e.latlng.lng)
      );
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={markerIcon} />
  );
}

export default function DeliveryMap() {
  const { values } = useFormikContext<OrderFormValues>();

  return (
    <div className="w-full h-2/3 rounded-lg overflow-hidden shadow">
      <MapContainer
        center={[48.9261, 24.7207]}
        zoom={12}
        className="w-full h-full  "
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
        // onSelect={(lat, lng) => {
        //   console.log(`Selected coordinates: ${lat}, ${lng}`);
        // }}
        />
      </MapContainer>
      {values.deliveryAddress && (
        <div className="p-2 bg-white text-sm h-1/4">
          Selected Address: {values.deliveryAddress}
        </div>
      )}
    </div>
  );
}
