import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
  Eye,
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
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [downloadOption, setDownloadOption] = useState<DownloadOption>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<TabOption>("all");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<Booking | null>(null);

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
    setSidePanelOpen(true);
  };

  const handleDownloadClick = (booking: Booking) => {
    setPendingDownload(booking);
    setShowDownloadDialog(true);
  };

  const downloadAsExcel = (booking: Booking) => {
    const workbook = XLSX.utils.book_new();
    const includeAll = downloadOption === "all";

    if (includeAll || downloadOption === "userData") {
      const userData = [
        ["Field", "Value"],
        ["Name", booking.userData.name],
        ["Email", booking.userData.email],
        ["Phone", booking.userData.phone],
      ];
      const wsUser = XLSX.utils.aoa_to_sheet(userData);
      XLSX.utils.book_append_sheet(workbook, wsUser, "User Data");
    }

    if (includeAll || downloadOption === "subscription") {
      const subscriptionData = [
        ["Field", "Value"],
        ["Type", booking.subscription.type],
        ["Plan", booking.subscription.duration],
        ["Amount", booking.subscription.amount],
        ["Date", new Date(booking.appointment.date).toLocaleDateString()],
        ["Time", booking.appointment.date],
      ];
      const wsSub = XLSX.utils.aoa_to_sheet(subscriptionData);
      XLSX.utils.book_append_sheet(workbook, wsSub, "Subscription");
    }

    if ((includeAll || downloadOption === "questionnaire") ) {
      const qaData = [["Question", "Answer"]];
      Object.entries(booking.data).forEach(([key, value]) => {
    if (key === "additionalNotes") return;
    qaData.push([key, value]);
  });
      const wsQA = XLSX.utils.aoa_to_sheet(qaData);
      XLSX.utils.book_append_sheet(workbook, wsQA, "Questionnaire");
    }

    XLSX.writeFile(workbook, `booking-${booking.userData.name.replace(/\s+/g, "_")}-${booking.id.slice(0, 8)}.xlsx`);
    toast.success("Downloaded as Excel");
  };

  const exportAllToExcel = () => {
    const workbook = XLSX.utils.book_new();
    
    const headers = ["ID", "Name", "Email", "Phone", "Type", "Plan", "Date", "Time", "Created"];
    const data = filteredBookings.map((b) => [
      b.id,
      b.userData.name,
      b.userData.email,
      b.userData.phone,
      b.subscription.type,
      b.subscription.duration,
      new Date(b.appointment.date).toLocaleDateString(),
      b.appointment.time,
      new Date(b.createdAt).toLocaleDateString(),
    ]);

    const wsData = [headers, ...data];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(workbook, ws, "Bookings");

    XLSX.writeFile(workbook, `bookings-${new Date().toISOString().split("T")[0]}.xlsx`);
    toast.success("Bookings exported as Excel");
  };

  // Calculate stats
  const totalRevenue = bookings.reduce((sum, b) => {
  return sum + (b.subscription?.amount ?? 0);
}, 0);

  const todayBookingsCount = bookings.filter(
  (b) =>
    b.appointment?.date &&
    new Date(b.appointment.date).toDateString() === new Date().toDateString()
).length;



  // Filter bookings based on active tab
  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "todayBookings") {
      return new Date(b.createdAt).toDateString() === new Date().toDateString();
    }
    if (activeTab === "todaySessions") {
      return new Date(b.appointment.date).toDateString() === new Date().toDateString();
    }
    return true;
  }).sort((a, b) => {
    if (activeTab === "todaySessions") {
      return a.appointment.date.localeCompare(b.appointment.time);
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const parseDDMMYYYY = (dateStr: string) => {
  const [day, month, year] = dateStr.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
};


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
    <div className="min-h-screen bg-gradient-hero">
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-12">
                Loading bookings...
              </TableCell>
            </TableRow>
          ) : filteredBookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-12">
                <p className="text-muted-foreground">No bookings found</p>
              </TableCell>
            </TableRow>
          ) : (
            paginatedBookings.map((booking) => (
              
          <TableRow key={booking.id}>
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
              ? parseDDMMYYYY(booking.appointment.date).toLocaleDateString("en-IN")
              : "—"}
          </TableCell>

          <TableCell>{booking.appointment?.time || "—"}</TableCell>

          <TableCell className="font-semibold">
            ₹{booking.subscription?.amount ?? 0}
          </TableCell>

          <TableCell>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleViewBooking(booking)}
            >
              View
            </Button>
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
      </div>

      {/* Side Panel */}
      <Sheet open={sidePanelOpen} onOpenChange={setSidePanelOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Booking Details</SheetTitle>
          </SheetHeader>

          {selectedBooking && (
            <div className="mt-6 space-y-6">
              {/* User Data Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground border-b pb-2">User Information</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="text-sm font-medium text-foreground">{selectedBooking.userData.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground">{selectedBooking.userData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium text-foreground">{selectedBooking.userData.phone}</p>
                  </div>
                </div>
              </div>

              {/* Subscription Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground border-b pb-2">Subscription Details</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="text-sm font-medium capitalize text-foreground">{selectedBooking.subscription.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Plan</p>
                    <p className="text-sm font-medium text-foreground">{selectedBooking.subscription.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="text-sm font-medium text-foreground">{selectedBooking.subscription.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm font-medium text-foreground">
                      {parseDDMMYYYY(selectedBooking.appointment.date).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="text-sm font-medium text-foreground">{selectedBooking.appointment.time}</p>
                  </div>
                </div>
              </div>

              {/* Questionnaire Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground border-b pb-2">
                  Questionnaire Responses
                </h3>

                {selectedBooking.data ? (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {Object.entries(selectedBooking.data)
                    .filter(([key]) => key.startsWith("Q")) 
                    .map(([key, value]) => (
                      <div key={key} className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">
                          {(selectedBooking.subscription.type === "skin"
                            ? SKIN_QUESTION_LABELS
                            : HAIR_QUESTION_LABELS)[key] ?? key}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {Array.isArray(value) ? value.join(", ") : value || "—"}
                        </p>
                      </div>
                    ))}

                  {/* Additional Notes */}
                  {selectedBooking.data.additionalNotes && (
                    <div className="bg-muted/50 rounded-lg p-3 border border-dashed">
                      <p className="text-xs text-muted-foreground mb-1">
                        Additional Notes
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {selectedBooking.data.additionalNotes}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No questionnaire data available
                </p>
              )}
            </div>


              {/* Download Options */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground border-b pb-2">Download Data</h3>
                  <div className="flex gap-2">
                    <Select value={downloadOption} onValueChange={(v: DownloadOption) => setDownloadOption(v)}>
                      <SelectTrigger className="flex-1">
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
                      className="bg-gradient-primary hover:opacity-90"
                      onClick={() => handleDownloadClick(selectedBooking)}
                    >
                      <FileSpreadsheet className="w-4 h-4 mr-2" />
                      Download Excel
                    </Button>
                  </div>
                </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

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
