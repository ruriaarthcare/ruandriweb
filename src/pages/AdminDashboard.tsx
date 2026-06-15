import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LogOut,
  Calendar,
  Users,
  IndianRupee,
  TrendingUp,
  Download,
  RefreshCw,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { Booking } from "@/models/booking.model";
import { fetchAdminBookings } from "@/services/admin.service";



type DownloadOption = "all" | "userData" | "subscription" | "questionnaire";
type TabOption = "all" | "todayBookings" | "todaySessions";

const ITEMS_PER_PAGE = 10;

//Skin question
const SKIN_QUESTION_LABELS: Record<string, string> = {
  Q1: "Q1. What is your primary skin goal?",
  Q2: "Q2. How does your skin usually feel after cleansing?",
  Q3: "Q3. How often do you experience breakouts?",
  Q4: "Q4. Do you experience any of the following skin concerns?",
  Q5: "Q5. How much sun exposure do you usually get?",
  Q6: "Q6. How would you describe your lifestyle?",
  Q7: "Q7. Which best describes your diet?",
  Q8: "Q8. How much water do you drink daily?",
  Q9: "Q9. Do you take any supplements for skin health?",
  Q10: "Q10. Any hormonal concerns that affect your skin?",
  Q11: "Q11. Are you currently pregnant or breastfeeding?",
  Q12: "Q12. Do you have any known skin conditions or allergies?",
  Q13: "Q13. Are you currently on any long-term medication?",
  Q14: "Q14. How would you describe your stress levels?",
  Q15: "Q15. On average, how many hours of sleep do you get daily?",
  Q16: "Q16. How often do you follow a skincare routine?",
};

//Hair  Question 
const HAIR_QUESTION_LABELS: Record<string, string> = {
  Q1: "Q1. What is your primary hair goal?",
  Q2: "Q2. How would you describe your scalp type?",
  Q3: "Q3. How would you describe your hair texture?",
  Q4: "Q4. Do you experience any of the following hair concerns?",
  Q5: "Q5. How often do you wash your hair?",
  Q6: "Q6. Do you regularly use heat or chemical treatments?",
  Q7: "Q7. Which best describes your diet?",
  Q8: "Q8. How much water do you drink daily?",
  Q9: "Q9. Do you take any supplements for hair health?",
  Q10: "Q10. Do you face any hormonal concerns that affect your hair?",
  Q11: "Q11. Are you currently pregnant or breastfeeding?",
  Q12: "Q12. Do you have any known scalp conditions or allergies?",
  Q13: "Q13. Are you currently on any long-term medication?",
  Q14: "Q14. How would you describe your stress levels?",
  Q15: "Q15. On average, how many hours of sleep do you get daily?",
  Q16: "Q16. How often do you oil or treat your hair at home?",
};



const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [downloadOption, setDownloadOption] = useState<DownloadOption>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<TabOption>("all");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<Booking | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "details">("list");

  const parseDDMMYYYY = (dateStr: string) => {
    if (!dateStr || typeof dateStr !== "string") {
      return new Date(NaN);
    }

    // 1. If it is in ISO format or YYYY-MM-DD format (starts with 4 digits followed by a dash/slash)
    if (/^\d{4}[-/]/.test(dateStr)) {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) return d;
    }

    // 2. Try parsing as DD-MM-YYYY
    const cleanStr = dateStr.replace(/\//g, "-");
    const parts = cleanStr.split("-");
    if (parts.length === 3) {
      const [p1, p2, p3] = parts;
      
      // If p1 is day (1-2 digits) and p3 starts with year (4 digits)
      if (p1.length <= 2 && p3.substring(0, 4).length === 4) {
        const day = Number(p1);
        const month = Number(p2);
        const year = Number(p3.substring(0, 4));
        const d = new Date(year, month - 1, day);
        if (!isNaN(d.getTime())) return d;
      }
      
      // If p1 is year (4 digits) p3 is day
      if (p1.length === 4 && p3.length <= 2) {
        const year = Number(p1);
        const month = Number(p2);
        const day = Number(p3);
        const d = new Date(year, month - 1, day);
        if (!isNaN(d.getTime())) return d;
      }
    }

    // 3. Fallback: Try native Date parser
    const fallback = new Date(dateStr);
    return fallback;
  };

  const formatDateSafe = (dateStr: string) => {
    const d = parseDDMMYYYY(dateStr);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

 useEffect(() => {
  const unsub = auth.onAuthStateChanged((user) => {
    if (!user) {
      navigate("/admin", { replace: true });
    } else {
      fetchBookings();
    }
  });

  return () => unsub();
}, [navigate]);


  const fetchBookings = async () => {
  try {
    setLoading(true);
    const data = await fetchAdminBookings();
    setBookings(data);
  } catch (err) {
    toast.error("Failed to load bookings");
  } finally {
    setLoading(false);
  }
};

//Logout
  const handleLogout = async () => {
  await signOut(auth);
  toast.success("Logged out");
  navigate("/admin");
};

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setDownloadOption("all");
    setViewMode("details");
  };

  const handleDownloadClick = (booking: Booking) => {
    setPendingDownload(booking);
    setShowDownloadDialog(true);
  };


//Download the each booking 
const downloadAsExcel = (booking: Booking) => {
  const workbook = XLSX.utils.book_new();
  const sheetData: any[][] = [];

  const isAll = downloadOption === "all";

  /* ================= USER DETAILS ================= */
  if (isAll || downloadOption === "userData") {
    sheetData.push(["USER DETAILS"]);
    sheetData.push(["Field", "Value"]);
    sheetData.push(["Name", booking.userData?.name || "-"]);
    sheetData.push(["Email", booking.userData?.email || "-"]);
    sheetData.push(["Phone", booking.userData?.phone || "-"]);
    sheetData.push([]);
  }

  /* ================= SUBSCRIPTION DETAILS ================= */
  if (isAll || downloadOption === "subscription") {
    sheetData.push(["SUBSCRIPTION DETAILS"]);
    sheetData.push(["Type", booking.subscription?.type || "-"]);
    sheetData.push(["Plan", booking.subscription?.duration || "-"]);
    sheetData.push(["Amount", booking.subscription?.amount || "-"]);
    sheetData.push([
      "Appointment Date",
      booking.appointment?.date ? formatDateSafe(booking.appointment.date) : "—",
    ]);
    sheetData.push(["Time", booking.appointment?.time || "-"]);
    sheetData.push([]);
  }

  /* ================= QUESTIONNAIRE ================= */
  if (isAll || downloadOption === "questionnaire") {
    sheetData.push(["QUESTIONNAIRE"]);

    const isHair = booking.subscription?.type === "hair";
    const questionLabels = isHair
      ? HAIR_QUESTION_LABELS
      : SKIN_QUESTION_LABELS;

    Object.entries(booking.data || {}).forEach(([key, value]) => {
      if (!key.startsWith("Q")) return;
      if (key === "additionalNotes") return;

      const question = questionLabels[key] || key;
      sheetData.push([question, String(value)]);
    });
  }

  /* ================= CREATE SHEET ================= */
  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  ws["!cols"] = [{ wch: 30 }, { wch: 45 }];

  /* ================= MERGE + STYLE HEADINGS ================= */
  const merges: XLSX.Range[] = [];

  sheetData.forEach((row, index) => {
    if (
      row[0] === "USER DETAILS" ||
      row[0] === "SUBSCRIPTION DETAILS" ||
      row[0] === "QUESTIONNAIRE"
    ) {
      merges.push({
        s: { r: index, c: 0 },
        e: { r: index, c: 1 },
      });

      const cell = ws[XLSX.utils.encode_cell({ r: index, c: 0 })];
      if (cell) {
        cell.s = {
          font: { bold: true, sz: 14 },
          alignment: { horizontal: "center", vertical: "center" },
          fill: { fgColor: { rgb: "E9ECEF" } },
        };
      }
    }
  });

  ws["!merges"] = merges;

  XLSX.utils.book_append_sheet(workbook, ws, "Booking Details");

  XLSX.writeFile(
    workbook,
    `${downloadOption.toUpperCase()}-${booking.userData.name
      .replace(/\s+/g, "_")}-${booking.id.slice(0, 8)}.xlsx`
  );

  toast.success("Excel downloaded successfully");
};




  //Export all the bookings 
  const exportAllToExcel = () => {
  const workbook = XLSX.utils.book_new();

  // ✅ Headers (Added Sr. No.)
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

  // ✅ Data rows
  const data = filteredBookings.map((b, index) => [
    index + 1, // Sr. No.
    b.id,
    b.userData?.name || "-",
    b.userData?.email || "-",
    b.userData?.phone || "-",
    b.subscription?.type || "-",
    b.subscription?.duration || "-",
    b.appointment?.date ? formatDateSafe(b.appointment.date) : "—",
    b.appointment?.time || "-" ,
    new Date(b.createdAt).toLocaleDateString(),
  ]);

  const wsData = [headers, ...data];
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // 🎨 Column width (spacing)
  ws["!cols"] = [
    { wch: 8 },   // Sr. No.
    { wch: 20 },  // Booking ID
    { wch: 20 },  // Name
    { wch: 28 },  // Email
    { wch: 16 },  // Phone
    { wch: 14 },  // Type
    { wch: 14 },  // Plan
    { wch: 14 },  // Date
    { wch: 12 },  // Time
    { wch: 16 },  // Created
  ];

  // 🎯 Header styling (bold + center)
  const range = XLSX.utils.decode_range(ws["!ref"] as string);

  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell = ws[XLSX.utils.encode_cell({ r: 0, c: C })];
    if (!cell) continue;

    cell.s = {
      font: { bold: true },
      alignment: { horizontal: "center", vertical: "center" },
    };
  }

  // 🎯 Center Sr. No. column
  for (let R = 1; R <= range.e.r; ++R) {
    const cell = ws[XLSX.utils.encode_cell({ r: R, c: 0 })];
    if (!cell) continue;

    cell.s = {
      alignment: { horizontal: "center" },
    };
  }

  XLSX.utils.book_append_sheet(workbook, ws, "Bookings");

  XLSX.writeFile(
    workbook,
    `bookings-${new Date().toISOString().split("T")[0]}.xlsx`
  );

  toast.success("Bookings exported as Excel");
};




  // Calculate stats
  const totalRevenue = bookings.reduce((sum, b) => {
  return sum + (b.subscription?.amount ?? 0);
}, 0);

  const todayBookingsCount = bookings.filter((b) => {
    if (!b.appointment?.date) return false;
    const d = parseDDMMYYYY(b.appointment.date);
    return !isNaN(d.getTime()) && d.toDateString() === new Date().toDateString();
  }).length;



  // Filter bookings based on active tab
  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "todayBookings") {
      return new Date(b.createdAt).toDateString() === new Date().toDateString();
    }
    if (activeTab === "todaySessions") {
      if (!b.appointment?.date) return false;
      const d = parseDDMMYYYY(b.appointment.date);
      return !isNaN(d.getTime()) && d.toDateString() === new Date().toDateString();
    }
    return true;
  }).sort((a, b) => {
    if (activeTab === "todaySessions") {
      return (a.appointment?.time || "").localeCompare(b.appointment?.time || "");
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  // Reset page when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const tabs: { key: TabOption; label: string }[] = [
    { key: "all", label: "All Bookings" },
    { key: "todayBookings", label: "Today's Bookings" },
    { key: "todaySessions", label: "Today's Sessions" },
  ];

  return (
    <div className="min-h-screen no-header-offset bg-gradient-hero">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Ru & Ri Management Portal</p>
          </div>
          <Button variant="outline" onClick={() => setShowLogoutDialog(true)}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        {viewMode === "details" && selectedBooking ? (
          <div className="space-y-6">
            {/* Header / Navigation Bar */}
            <div className="flex flex-col gap-3 pb-4 border-b">
              <Button 
                variant="ghost" 
                onClick={() => setViewMode("list")} 
                className="w-fit pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to Bookings
              </Button>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider capitalize">
                    {selectedBooking.subscription.type} Care
                  </span>
                  <h2 className="text-3xl font-extrabold text-foreground mt-2">
                    {selectedBooking.userData.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Booking ID: <span className="font-mono font-medium text-foreground">{selectedBooking.id}</span> • Registered on {new Date(selectedBooking.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleDownloadClick(selectedBooking)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Summary
                  </Button>
                </div>
              </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (Customer Details, Questionnaire) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Customer Card */}
                <Card className="p-6 shadow-soft border-border/40 bg-card/60 backdrop-blur">
                  <h3 className="text-lg font-bold text-foreground mb-4 border-b pb-2">Customer Profile</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Email Address</p>
                      <p className="text-sm font-semibold text-foreground mt-1 select-all">{selectedBooking.userData.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Phone Number</p>
                      <p className="text-sm font-semibold text-foreground mt-1 select-all">{selectedBooking.userData.phone}</p>
                    </div>
                    {(() => {
                      const addr = selectedBooking.appointment?.address || selectedBooking.data?.booking?.address || selectedBooking.data?.address;
                      if (addr) {
                        return (
                          <div className="sm:col-span-2 mt-2">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Delivery Address</p>
                            <p className="text-sm font-medium text-foreground mt-1 bg-muted/40 p-3 rounded-lg border border-dashed border-border/80">
                              {typeof addr === "string" 
                                ? addr 
                                : `${addr.street || addr.addressLine || addr.address || ""}, ${addr.city || ""} - ${addr.pincode || ""}`.trim().replace(/^,?\s*,?/, "")}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                </Card>

                {/* Questionnaire Card */}
                <Card className="p-6 shadow-soft border-border/40 bg-card/60 backdrop-blur">
                  <h3 className="text-lg font-bold text-foreground mb-4 border-b pb-2">Consultation Questionnaire</h3>
                  
                  {selectedBooking.data ? (
                    <div className="space-y-4">
                      {Object.entries(selectedBooking.data)
                        .filter(([key]) => key.startsWith("Q"))
                        .sort(([a], [b]) => {
                          const numA = parseInt(a.slice(1), 10);
                          const numB = parseInt(b.slice(1), 10);
                          return numA - numB;
                        })
                        .map(([key, value]) => (
                          <div key={key} className="bg-muted/30 rounded-xl p-4 border border-border/30 hover:border-border/60 transition-all">
                            <p className="text-sm font-semibold text-foreground/90 mb-2">
                              {(selectedBooking.subscription.type === "skin"
                                ? SKIN_QUESTION_LABELS
                                : HAIR_QUESTION_LABELS)[key] ?? key}
                            </p>
                            <p className="text-sm text-muted-foreground pl-3 border-l-2 border-primary/60 font-medium">
                              {Array.isArray(value) ? value.join(", ") : value || "—"}
                            </p>
                          </div>
                        ))}

                      {/* Additional Notes */}
                      {selectedBooking.data.additionalNotes && (
                        <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                          <p className="text-sm font-semibold text-primary mb-2">
                            Additional Customer Notes
                          </p>
                          <p className="text-sm text-foreground/90 font-medium">
                            {selectedBooking.data.additionalNotes}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic text-center py-6">
                      No questionnaire data available
                    </p>
                  )}
                </Card>
              </div>

              {/* Right Column (Plan, Payment, Actions) */}
              <div className="space-y-6">
                
                {/* Subscription Details Card */}
                <Card className="p-6 shadow-soft border-border/40 bg-card/60 backdrop-blur">
                  <h3 className="text-lg font-bold text-foreground mb-4 border-b pb-2">Subscription</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Type</span>
                      <span className="text-sm font-bold capitalize text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{selectedBooking.subscription.type}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Plan Duration</span>
                      <span className="text-sm font-semibold text-foreground">{selectedBooking.subscription.duration}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Amount</span>
                      <span className="text-sm font-bold text-foreground">₹{selectedBooking.subscription.amount}</span>
                    </div>
                    
                    <div className="border-t border-border/60 my-2 pt-2 space-y-3">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-muted-foreground">Session Date</span>
                        <span className="text-sm font-semibold text-foreground">
                          {selectedBooking.appointment?.date ? formatDateSafe(selectedBooking.appointment.date) : "—"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-muted-foreground">Session Time</span>
                        <span className="text-sm font-semibold text-foreground">{selectedBooking.appointment?.time || "—"}</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Payment Card */}
                <Card className="p-6 shadow-soft border-border/40 bg-card/60 backdrop-blur">
                  <h3 className="text-lg font-bold text-foreground mb-4 border-b pb-2">Payment Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Payment Status</span>
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/45 px-2.5 py-0.5 rounded-full">Paid</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Total Paid</span>
                      <span className="text-sm font-bold text-foreground">₹{selectedBooking.subscription.amount}</span>
                    </div>
                    
                    {(() => {
                      const payId = selectedBooking.data?.razorpay_payment_id || selectedBooking.data?.paymentId || selectedBooking.data?.razorpayPaymentId || selectedBooking.data?.payment?.razorpay_payment_id || selectedBooking.data?.payment?.paymentId;
                      if (payId) {
                        return (
                          <div className="pt-2 border-t border-border/60 mt-2">
                            <p className="text-xs text-muted-foreground font-semibold">Razorpay Payment ID</p>
                            <p className="text-xs font-mono font-medium text-foreground bg-muted/60 p-2 rounded mt-1 select-all border border-border/80 break-all">{payId}</p>
                          </div>
                        );
                      }
                      return null;
                    })()}
                    {(() => {
                      const orderId = selectedBooking.data?.razorpay_order_id || selectedBooking.data?.orderId || selectedBooking.data?.razorpayOrderId || selectedBooking.data?.payment?.razorpay_order_id || selectedBooking.data?.payment?.orderId;
                      if (orderId) {
                        return (
                          <div className="pt-2">
                            <p className="text-xs text-muted-foreground font-semibold">Razorpay Order ID</p>
                            <p className="text-xs font-mono font-medium text-foreground bg-muted/60 p-2 rounded mt-1 select-all border border-border/80 break-all">{orderId}</p>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                </Card>

                {/* Actions Card */}
                <Card className="p-6 shadow-soft border-border/40 bg-card/60 backdrop-blur">
                  <h3 className="text-lg font-bold text-foreground mb-4 border-b pb-2">Actions</h3>
                  <div className="space-y-3">
                    <Select value={downloadOption} onValueChange={(v: DownloadOption) => setDownloadOption(v)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select data to download" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Data</SelectItem>
                        <SelectItem value="userData">User Data Only</SelectItem>
                        <SelectItem value="subscription">Subscription Only</SelectItem>
                        <SelectItem value="questionnaire">Questionnaire Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      className="w-full bg-gradient-primary hover:opacity-90 mt-2"
                      onClick={() => handleDownloadClick(selectedBooking)}
                    >
                      <FileSpreadsheet className="w-4 h-4 mr-2" />
                      Download Excel Report
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-6 shadow-soft">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Sessions</p>
                    <p className="text-2xl font-bold text-foreground">{todayBookingsCount}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <IndianRupee className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-foreground">₹{totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Today's New</p>
                    <p className="text-2xl font-bold text-foreground">
                      {bookings.filter((b) => new Date(b.createdAt).toDateString() === new Date().toDateString()).length}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Tab Navigation with Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={fetchBookings}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button onClick={exportAllToExcel} className="bg-gradient-primary hover:opacity-90">
                  <Download className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
              </div>
            </div>

            {/* Bookings Table */}
            <Card className="shadow-medium overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    Loading bookings...
                  </TableCell>
                </TableRow>
              ) : filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <p className="text-muted-foreground">No bookings found</p>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBookings.map((booking) => (
                  
              <TableRow 
                key={booking.id}
                onClick={() => handleViewBooking(booking)}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
              >
              <TableCell>
                <div className="font-medium">
                  {booking.userData?.name || "Unknown"}
                </div>
              </TableCell>

              <TableCell>
                <div className="text-sm">
                  {booking.userData?.email || "—"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {booking.userData?.phone || "—"}
                </div>
              </TableCell>

              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {booking.subscription?.type || "—"}
                </Badge>
              </TableCell>

              <TableCell>{booking.subscription?.duration || "—"}</TableCell>

              <TableCell>
                {booking.appointment?.date
                  ? formatDateSafe(booking.appointment.date)
                  : "—"}
              </TableCell>

              <TableCell>{booking.appointment?.time || "—"}</TableCell>

              <TableCell className="font-semibold">
                ₹{booking.subscription?.amount ?? 0}
              </TableCell>
            </TableRow>

            ))

      )}
    </TableBody>

              </Table>

              {/* Pagination */}
              {filteredBookings.length > ITEMS_PER_PAGE && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredBookings.length)} of {filteredBookings.length} bookings
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    <span className="text-sm text-foreground px-2">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </>
        )}
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout from the admin dashboard?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Download Confirmation Dialog */}
      <AlertDialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Download</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to download the booking data as an Excel file?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingDownload) {
                  downloadAsExcel(pendingDownload);
                  setPendingDownload(null);
                }
                setShowDownloadDialog(false);
              }}
            >
              Download
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
