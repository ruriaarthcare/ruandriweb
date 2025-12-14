import { auth } from "@/firebase";
import { Booking } from "@/models/booking.model";

const ADMIN_API_BASE =
  "https://api-difbvyyjra-uc.a.run.app/admin";

async function getAuthHeader() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Not authenticated");
  }

  const token = await user.getIdToken();

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",

  };
}

/* ================================
   GET ALL BOOKINGS (ADMIN)
================================ */
export async function getAdminBookings(): Promise<Booking[]> {
    
  const headers = await getAuthHeader();

  const res = await fetch(`${ADMIN_API_BASE}/bookings`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to fetch bookings");
  }
   const data: Booking[] = await res.json();

  return data;
}
