import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import { useFormikContext } from "formik";
import type { OrderFormValues } from "../types/interfaces";
import { getAddress } from "../api/getAddress";
import { useAppSelector } from "../app/hooks";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const shopIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/5695/5695239.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
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
  const shopsList = useAppSelector((state) => state.shops).shops;

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
        <LocationMarker />

        {shopsList.map((shop) => (
          <Marker key={shop.id} position={[shop.lat, shop.lng]} icon={shopIcon}>
            <Popup>
              <strong>{shop.name}</strong>
              <br />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
