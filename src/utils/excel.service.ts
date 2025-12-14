import * as XLSX from "xlsx";
import { toast } from "sonner";




export function exportAllBookingsToExcel(filteredBookings: any[]) {
  const workbook = XLSX.utils.book_new();

  const headers = [
    "Sr. No.",
    "Booking ID",
    "Name",
    "Email",
    "Phone",
    "Type",
    "Plan",
    "Date",
    "Time",
    "Created At",
  ];

  const data = filteredBookings.map((b, index) => [
    index + 1,
    b.id,
    b.userData?.name || "-",
    b.userData?.email || "-",
    b.userData?.phone || "-",
    b.subscription?.type || "-",
    b.subscription?.duration || "-",
    new Date(b.appointment?.date).toLocaleDateString(),
    b.appointment?.time || "-",
    new Date(b.createdAt).toLocaleDateString(),
  ]);

  const wsData = [headers, ...data];
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Column spacing
  ws["!cols"] = [
    { wch: 8 },
    { wch: 20 },
    { wch: 20 },
    { wch: 28 },
    { wch: 16 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
    { wch: 12 },
    { wch: 16 },
  ];

  XLSX.utils.book_append_sheet(workbook, ws, "Bookings");

  XLSX.writeFile(
    workbook,
    `All-Bookings-${new Date().toISOString().split("T")[0]}.xlsx`
  );

  toast.success("All bookings exported successfully");
}


