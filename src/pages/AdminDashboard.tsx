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

interface QuestionAnswer {
  question: string;
  answer: string | string[];
}

interface Booking {
  id: string;
  userInfo: {
    name: string;
    email: string;
    phone: string;
  };
  type: string;
  plan: {
    duration: string;
    price: string;
    discount?: number;
  };
  selectedDate: string;
  selectedTime: string;
  createdAt: string;
  questionnaire?: QuestionAnswer[];
}

type DownloadOption = "all" | "userData" | "subscription" | "questionnaire";
type TabOption = "all" | "todayBookings" | "todaySessions";

const sampleBookings: Booking[] = [
  {
    id: "bk-001-sample",
    userInfo: { name: "Priya Sharma", email: "priya.sharma@email.com", phone: "+91 98765 43210" },
    type: "skin",
    plan: { duration: "6 Months", price: "₹12,000", discount: 2000 },
    selectedDate: new Date().toISOString(),
    selectedTime: "10:00 AM",
    createdAt: new Date().toISOString(),
    questionnaire: [
      { question: "What are your primary skin goals?", answer: ["Reduce acne", "Even skin tone"] },
      { question: "What is your skin type?", answer: "Combination" },
      { question: "Do you have any known allergies?", answer: "No known allergies" },
      { question: "How much water do you drink daily?", answer: "2-3 liters" },
    ],
  },
  {
    id: "bk-002-sample",
    userInfo: { name: "Ananya Patel", email: "ananya.p@email.com", phone: "+91 87654 32109" },
    type: "hair",
    plan: { duration: "3 Months", price: "₹7,000", discount: 1000 },
    selectedDate: new Date().toISOString(),
    selectedTime: "2:00 PM",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    questionnaire: [
      { question: "What is your primary hair goal?", answer: "Reduce hair fall" },
      { question: "How often do you wash your hair?", answer: "Every other day" },
      { question: "Do you use any hair treatments?", answer: "Occasional oiling" },
    ],
  },
  {
    id: "bk-003-sample",
    userInfo: { name: "Kavitha Reddy", email: "kavitha.r@email.com", phone: "+91 76543 21098" },
    type: "skin",
    plan: { duration: "12 Months", price: "₹20,000", discount: 4000 },
    selectedDate: new Date(Date.now() + 172800000).toISOString(),
    selectedTime: "11:30 AM",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    questionnaire: [
      { question: "What are your primary skin goals?", answer: ["Anti-aging", "Hydration"] },
      { question: "What is your skin type?", answer: "Dry" },
      { question: "Current skincare routine?", answer: "Basic cleansing and moisturizer" },
      { question: "Any previous skin treatments?", answer: "Tried chemical peels before" },
      { question: "How much sun exposure do you get?", answer: "Moderate, 1-2 hours daily" },
    ],
  },
  {
    id: "bk-004-sample",
    userInfo: { name: "Meera Krishnan", email: "meera.k@email.com", phone: "+91 65432 10987" },
    type: "hair",
    plan: { duration: "1 Month", price: "₹2,500" },
    selectedDate: new Date(Date.now() + 259200000).toISOString(),
    selectedTime: "4:00 PM",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    questionnaire: [
      { question: "What is your primary hair goal?", answer: "Improve hair texture" },
      { question: "Describe your diet", answer: "Vegetarian, balanced diet" },
      { question: "Any hormonal issues?", answer: "PCOS diagnosed" },
    ],
  },
  {
    id: "bk-005-sample",
    userInfo: { name: "Deepika Nair", email: "deepika.n@email.com", phone: "+91 54321 09876" },
    type: "skin",
    plan: { duration: "3 Months", price: "₹7,000", discount: 1000 },
    selectedDate: new Date().toISOString(),
    selectedTime: "3:30 PM",
    createdAt: new Date().toISOString(),
    questionnaire: [
      { question: "What are your primary skin goals?", answer: ["Reduce dark spots", "Brightening"] },
      { question: "What is your skin type?", answer: "Oily" },
      { question: "Do you wear sunscreen daily?", answer: "Yes, SPF 30+" },
    ],
  },
  {
    id: "bk-006-sample",
    userInfo: { name: "Lakshmi Iyer", email: "lakshmi.i@email.com", phone: "+91 43210 98765" },
    type: "hair",
    plan: { duration: "6 Months", price: "₹12,000", discount: 2000 },
    selectedDate: new Date().toISOString(),
    selectedTime: "5:00 PM",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    questionnaire: [
      { question: "What is your primary hair goal?", answer: "Add volume and thickness" },
      { question: "Do you color your hair?", answer: "Yes, every 2 months" },
      { question: "Any scalp issues?", answer: "Mild dandruff" },
    ],
  },
  {
    id: "bk-007-sample",
    userInfo: { name: "Ritu Verma", email: "ritu.v@email.com", phone: "+91 32109 87654" },
    type: "skin",
    plan: { duration: "9 Months", price: "₹18,000" },
    selectedDate: new Date(Date.now() + 86400000).toISOString(),
    selectedTime: "9:00 AM",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    questionnaire: [
      { question: "What are your primary skin goals?", answer: ["Reduce fine lines", "Firm skin"] },
      { question: "What is your skin type?", answer: "Normal" },
      { question: "Current products used?", answer: "Vitamin C serum, retinol at night" },
    ],
  },
  {
    id: "bk-008-sample",
    userInfo: { name: "Sunita Gupta", email: "sunita.g@email.com", phone: "+91 21098 76543" },
    type: "hair",
    plan: { duration: "12 Months", price: "₹20,000", discount: 4000 },
    selectedDate: new Date(Date.now() + 345600000).toISOString(),
    selectedTime: "1:00 PM",
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    questionnaire: [
      { question: "What is your primary hair goal?", answer: "Control frizz and add shine" },
      { question: "Hair washing frequency?", answer: "Twice a week" },
      { question: "Heat styling usage?", answer: "Occasional blow drying" },
    ],
  },
  {
    id: "bk-009-sample",
    userInfo: { name: "Neha Agarwal", email: "neha.a@email.com", phone: "+91 10987 65432" },
    type: "skin",
    plan: { duration: "1 Month", price: "₹2,500" },
    selectedDate: new Date().toISOString(),
    selectedTime: "11:00 AM",
    createdAt: new Date(Date.now() - 28800000).toISOString(),
    questionnaire: [
      { question: "What are your primary skin goals?", answer: ["Clear blackheads", "Minimize pores"] },
      { question: "What is your skin type?", answer: "Combination" },
      { question: "Any sensitivities?", answer: "Sensitive to fragrance" },
    ],
  },
  {
    id: "bk-010-sample",
    userInfo: { name: "Pooja Mehta", email: "pooja.m@email.com", phone: "+91 09876 54321" },
    type: "hair",
    plan: { duration: "3 Months", price: "₹7,000", discount: 1000 },
    selectedDate: new Date().toISOString(),
    selectedTime: "6:00 PM",
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    questionnaire: [
      { question: "What is your primary hair goal?", answer: "Strengthen weak hair" },
      { question: "Recent hair changes?", answer: "Post-pregnancy hair fall" },
      { question: "Diet supplements?", answer: "Taking biotin" },
    ],
  },
];

const ITEMS_PER_PAGE = 10;

const AdminDashboard = () => {
  const navigate = useNavigate();
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
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin");
      return;
    }
    loadBookings();
  }, [navigate]);

  const loadBookings = () => {
    const savedBookings = localStorage.getItem("bookings");
    if (savedBookings) {
      const parsed = JSON.parse(savedBookings);
      const sampleIds = sampleBookings.map((b) => b.id);
      const filteredSaved = parsed.filter((b: Booking) => !sampleIds.includes(b.id));
      setBookings([...sampleBookings, ...filteredSaved]);
    } else {
      setBookings(sampleBookings);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminEmail");
    toast.success("Logged out successfully");
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
        ["Name", booking.userInfo.name],
        ["Email", booking.userInfo.email],
        ["Phone", booking.userInfo.phone],
      ];
      const wsUser = XLSX.utils.aoa_to_sheet(userData);
      XLSX.utils.book_append_sheet(workbook, wsUser, "User Data");
    }

    if (includeAll || downloadOption === "subscription") {
      const subscriptionData = [
        ["Field", "Value"],
        ["Type", booking.type],
        ["Plan", booking.plan.duration],
        ["Amount", booking.plan.price],
        ["Date", new Date(booking.selectedDate).toLocaleDateString()],
        ["Time", booking.selectedTime],
      ];
      const wsSub = XLSX.utils.aoa_to_sheet(subscriptionData);
      XLSX.utils.book_append_sheet(workbook, wsSub, "Subscription");
    }

    if ((includeAll || downloadOption === "questionnaire") && booking.questionnaire) {
      const qaData = [["Question", "Answer"]];
      booking.questionnaire.forEach((qa) => {
        const answer = Array.isArray(qa.answer) ? qa.answer.join(", ") : qa.answer;
        qaData.push([qa.question, answer]);
      });
      const wsQA = XLSX.utils.aoa_to_sheet(qaData);
      XLSX.utils.book_append_sheet(workbook, wsQA, "Questionnaire");
    }

    XLSX.writeFile(workbook, `booking-${booking.userInfo.name.replace(/\s+/g, "_")}-${booking.id.slice(0, 8)}.xlsx`);
    toast.success("Downloaded as Excel");
  };

  const exportAllToExcel = () => {
    const workbook = XLSX.utils.book_new();
    
    const headers = ["ID", "Name", "Email", "Phone", "Type", "Plan", "Date", "Time", "Created"];
    const data = filteredBookings.map((b) => [
      b.id,
      b.userInfo.name,
      b.userInfo.email,
      b.userInfo.phone,
      b.type,
      b.plan.duration,
      new Date(b.selectedDate).toLocaleDateString(),
      b.selectedTime,
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
    const price = parseInt(b.plan.price.replace(/[₹,]/g, "")) || 0;
    return sum + price;
  }, 0);

  const todayBookingsCount = bookings.filter(
    (b) => new Date(b.selectedDate).toDateString() === new Date().toDateString()
  ).length;

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "todayBookings") {
      return new Date(b.createdAt).toDateString() === new Date().toDateString();
    }
    if (activeTab === "todaySessions") {
      return new Date(b.selectedDate).toDateString() === new Date().toDateString();
    }
    return true;
  }).sort((a, b) => {
    if (activeTab === "todaySessions") {
      return a.selectedTime.localeCompare(b.selectedTime);
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
            <Button variant="outline" onClick={loadBookings}>
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
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <p className="text-muted-foreground">No bookings found</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activeTab === "todayBookings" && "No bookings made today"}
                      {activeTab === "todaySessions" && "No sessions scheduled for today"}
                      {activeTab === "all" && "Bookings will appear here when customers complete their checkout"}
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{booking.userInfo.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {booking.id.slice(0, 8)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm text-foreground">{booking.userInfo.email}</p>
                        <p className="text-xs text-muted-foreground">{booking.userInfo.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {booking.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{booking.plan.duration}</TableCell>
                    <TableCell>
                      <p className="text-sm text-foreground">
                        {new Date(booking.selectedDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-foreground">{booking.selectedTime}</p>
                    </TableCell>
                    <TableCell className="font-semibold">{booking.plan.price}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewBooking(booking)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
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
                    <p className="text-sm font-medium text-foreground">{selectedBooking.userInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground">{selectedBooking.userInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium text-foreground">{selectedBooking.userInfo.phone}</p>
                  </div>
                </div>
              </div>

              {/* Subscription Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground border-b pb-2">Subscription Details</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="text-sm font-medium capitalize text-foreground">{selectedBooking.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Plan</p>
                    <p className="text-sm font-medium text-foreground">{selectedBooking.plan.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="text-sm font-medium text-foreground">{selectedBooking.plan.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(selectedBooking.selectedDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="text-sm font-medium text-foreground">{selectedBooking.selectedTime}</p>
                  </div>
                </div>
              </div>

              {/* Questionnaire Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground border-b pb-2">Questionnaire Responses</h3>
                {selectedBooking.questionnaire && selectedBooking.questionnaire.length > 0 ? (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {selectedBooking.questionnaire.map((qa, index) => (
                      <div key={index} className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Q{index + 1}: {qa.question}</p>
                        <p className="text-sm font-medium text-foreground">
                          {Array.isArray(qa.answer) ? qa.answer.join(", ") : qa.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No questionnaire data available</p>
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
