import { getAdminBookings } from "@/api/admin.api";
import { Booking } from "@/models/booking.model";

export async function fetchAdminBookings(): Promise<Booking[]> {
  const raw = await getAdminBookings();

  return raw
    // ❌ remove empty / session-only records
    .filter((b: any) => b.data && b.data.userData)

    // ✅ normalize data shape for UI
    .map((b: any): Booking => ({
        id: b.id,
        createdAt: b.createdAt,

        userData: {
            name: b.data.userData.name,
            email: b.data.userData.email,
            phone: b.data.userData.phone,
        },

        subscription: {
            type: b.data.type ?? "—",
            duration: b.data.subscription?.duration ?? "—",
            amount: b.data.subscription?.amount ?? 0,
            discount: 0,
            discountedAmount: 0
        },

        appointment: {
            date: b.data.booking?.date ?? "",
            time: b.data.booking?.time ?? "",
        },

        // keep full questionnaire data
        data: b.data,
        expireAt: 0,
        isClosed: false
    }));

}