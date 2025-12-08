import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
  FileText,
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
  status: "confirmed" | "pending" | "completed" | "cancelled";
  createdAt: string;
  questionnaire?: QuestionAnswer[];
}

type DownloadOption = "userData" | "subscription" | "questionnaire";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [downloadOptions, setDownloadOptions] = useState<DownloadOption[]>([]);

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
      setBookings(JSON.parse(savedBookings));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminEmail");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const updateBookingStatus = (bookingId: string, newStatus: Booking["status"]) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    toast.success(`Booking status updated to ${newStatus}`);
  };

  const deleteBooking = (bookingId: string) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    toast.success("Booking deleted successfully");
    setSelectedBooking(null);
    setSidePanelOpen(false);
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setDownloadOptions([]);
    setSidePanelOpen(true);
  };

  const toggleDownloadOption = (option: DownloadOption) => {
    setDownloadOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const selectAllOptions = () => {
    setDownloadOptions(["userData", "subscription", "questionnaire"]);
  };

  const generateDownloadData = (booking: Booking) => {
    const data: { section: string; field: string; value: string }[] = [];

    if (downloadOptions.includes("userData")) {
      data.push(
        { section: "User Data", field: "Name", value: booking.userInfo.name },
        { section: "User Data", field: "Email", value: booking.userInfo.email },
        { section: "User Data", field: "Phone", value: booking.userInfo.phone }
      );
    }

    if (downloadOptions.includes("subscription")) {
      data.push(
        { section: "Subscription", field: "Type", value: booking.type },
        { section: "Subscription", field: "Plan", value: booking.plan.duration },
        { section: "Subscription", field: "Amount", value: booking.plan.price },
        { section: "Subscription", field: "Date", value: new Date(booking.selectedDate).toLocaleDateString() },
        { section: "Subscription", field: "Time", value: booking.selectedTime }
      );
    }

    if (downloadOptions.includes("questionnaire") && booking.questionnaire) {
      booking.questionnaire.forEach((qa, index) => {
        const answer = Array.isArray(qa.answer) ? qa.answer.join(", ") : qa.answer;
        data.push({
          section: "Questionnaire",
          field: `Q${index + 1}: ${qa.question}`,
          value: answer,
        });
      });
    }

    return data;
  };

  const downloadAsCSV = (booking: Booking) => {
    if (downloadOptions.length === 0) {
      toast.error("Please select at least one option to download");
      return;
    }

    const data = generateDownloadData(booking);
    const headers = ["Section", "Field", "Value"];
    const csvRows = [headers.join(",")];

    data.forEach((row) => {
      csvRows.push(`"${row.section}","${row.field}","${row.value}"`);
    });

    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `booking-${booking.userInfo.name.replace(/\s+/g, "_")}-${booking.id.slice(0, 8)}.csv`;
    a.click();
    toast.success("Downloaded as CSV");
  };

  const downloadAsExcel = (booking: Booking) => {
    if (downloadOptions.length === 0) {
      toast.error("Please select at least one option to download");
      return;
    }

    const workbook = XLSX.utils.book_new();

    if (downloadOptions.includes("userData")) {
      const userData = [
        ["Field", "Value"],
        ["Name", booking.userInfo.name],
        ["Email", booking.userInfo.email],
        ["Phone", booking.userInfo.phone],
      ];
      const wsUser = XLSX.utils.aoa_to_sheet(userData);
      XLSX.utils.book_append_sheet(workbook, wsUser, "User Data");
    }

    if (downloadOptions.includes("subscription")) {
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

    if (downloadOptions.includes("questionnaire") && booking.questionnaire) {
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

  const exportAllToCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Type", "Plan", "Date", "Time", "Created"];
    const csvData = bookings.map((b) => [
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

    const csv = [headers, ...csvData].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Bookings exported successfully");
  };

  // Calculate stats
  const totalRevenue = bookings.reduce((sum, b) => {
    const price = parseInt(b.plan.price.replace(/[₹,]/g, "")) || 0;
    return sum + price;
  }, 0);

  const todayBookings = bookings.filter(
    (b) => new Date(b.selectedDate).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Ru & Ri Management Portal</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
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
                <p className="text-sm text-muted-foreground">Today's Bookings</p>
                <p className="text-2xl font-bold text-foreground">{todayBookings}</p>
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
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">
                  {bookings.filter((b) => b.status === "completed").length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mb-6 justify-end">
          <Button variant="outline" onClick={loadBookings}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportAllToCSV} className="bg-gradient-primary hover:opacity-90">
            <Download className="w-4 h-4 mr-2" />
            Export All CSV
          </Button>
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
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <p className="text-muted-foreground">No bookings found</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Bookings will appear here when customers complete their checkout
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
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
        </Card>
      </div>

      {/* Side Panel */}
      <Sheet open={sidePanelOpen} onOpenChange={setSidePanelOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
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

              {/* Status Update */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground border-b pb-2">Update Status</h3>
                <Select
                  value={selectedBooking.status}
                  onValueChange={(value: Booking["status"]) =>
                    updateBookingStatus(selectedBooking.id, value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Download Options */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-semibold text-foreground">Download Options</h3>
                  <Button variant="link" size="sm" onClick={selectAllOptions} className="h-auto p-0">
                    Select All
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="userData"
                      checked={downloadOptions.includes("userData")}
                      onCheckedChange={() => toggleDownloadOption("userData")}
                    />
                    <label htmlFor="userData" className="text-sm font-medium cursor-pointer">
                      User Data (Name, Email, Phone)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="subscription"
                      checked={downloadOptions.includes("subscription")}
                      onCheckedChange={() => toggleDownloadOption("subscription")}
                    />
                    <label htmlFor="subscription" className="text-sm font-medium cursor-pointer">
                      Subscription (Type, Plan, Amount, Date, Time)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="questionnaire"
                      checked={downloadOptions.includes("questionnaire")}
                      onCheckedChange={() => toggleDownloadOption("questionnaire")}
                    />
                    <label htmlFor="questionnaire" className="text-sm font-medium cursor-pointer">
                      Questionnaire (All Q&A Responses)
                    </label>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => downloadAsCSV(selectedBooking)}
                    disabled={downloadOptions.length === 0}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    CSV
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-primary hover:opacity-90"
                    onClick={() => downloadAsExcel(selectedBooking)}
                    disabled={downloadOptions.length === 0}
                  >
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </div>

              {/* Delete Action */}
              <div className="pt-4 border-t">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => deleteBooking(selectedBooking.id)}
                >
                  Delete Booking
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminDashboard;
