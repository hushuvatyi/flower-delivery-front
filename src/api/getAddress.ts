export async function getAddress(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=0`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch address");
    }

    const data = await res.json();

    return data.display_name;
  } catch (err) {
    console.error("Error fetching address:", err);
    return `${lat}, ${lng}`;
  }
}
