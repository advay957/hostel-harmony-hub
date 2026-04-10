export interface Complaint {
  id: string;
  ticketNo: string;
  studentName: string;
  room: string;
  block: string;
  category: "Electricity" | "Water" | "Maintenance" | "Cleanliness" | "Other";
  description: string;
  status: "pending" | "progress" | "resolved";
  date: string;
  reply?: string;
}

export interface LeaveRequest {
  id: string;
  studentName: string;
  room: string;
  block: string;
  fromDate: string;
  toDate: string;
  reason: string;
  type: "Regular" | "Emergency" | "Medical";
  status: "pending" | "approved" | "rejected";
  date: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: "normal" | "important" | "urgent";
}

export interface Student {
  id: string;
  name: string;
  email: string;
  room: string;
  block: string;
  phone: string;
  feeStatus: "paid" | "pending" | "overdue";
  attendance: number;
}

export const complaints: Complaint[] = [
  { id: "1", ticketNo: "#1842", studentName: "Arjun Mehta", room: "402", block: "B", category: "Electricity", description: "Flickering light in the study area near window. Has been ongoing for 3 days.", status: "pending", date: "2026-03-15" },
  { id: "2", ticketNo: "#1841", studentName: "Sneha Roy", room: "305", block: "A", category: "Water", description: "Low water pressure in the bathroom during morning hours.", status: "progress", date: "2026-03-14" },
  { id: "3", ticketNo: "#1840", studentName: "Rahul Kumar", room: "210", block: "C", category: "Maintenance", description: "Door lock is jammed and difficult to open.", status: "resolved", date: "2026-03-12", reply: "Lock replaced. Please collect new key from office." },
  { id: "4", ticketNo: "#1839", studentName: "Priya Singh", room: "118", block: "B", category: "Cleanliness", description: "Common bathroom on 1st floor not cleaned today.", status: "pending", date: "2026-03-15" },
  { id: "5", ticketNo: "#1838", studentName: "Vikram Joshi", room: "504", block: "A", category: "Electricity", description: "Power outlet near bed not working.", status: "progress", date: "2026-03-13" },
];

export const leaveRequests: LeaveRequest[] = [
  { id: "1", studentName: "Arjun Mehta", room: "402", block: "B", fromDate: "2026-03-18", toDate: "2026-03-20", reason: "Family function at home", type: "Regular", status: "pending", date: "2026-03-15" },
  { id: "2", studentName: "Sneha Roy", room: "305", block: "A", fromDate: "2026-03-17", toDate: "2026-03-17", reason: "Doctor appointment", type: "Medical", status: "approved", date: "2026-03-14" },
  { id: "3", studentName: "Rahul Kumar", room: "210", block: "C", fromDate: "2026-03-20", toDate: "2026-03-25", reason: "Urgent family matter", type: "Emergency", status: "pending", date: "2026-03-15" },
];

export const notices: Notice[] = [
  { id: "1", title: "Water Supply Disruption", content: "Water supply will be interrupted on March 18th from 10 AM to 2 PM due to tank cleaning. Please store water accordingly.", date: "2026-03-15", priority: "important" },
  { id: "2", title: "Mess Menu Updated for Week 13", content: "The mess menu for Week 13 has been updated. Check the mess menu section for details.", date: "2026-03-14", priority: "normal" },
  { id: "3", title: "Hostel Day Celebration", content: "Annual Hostel Day will be celebrated on March 25th. All students are encouraged to participate in cultural events.", date: "2026-03-13", priority: "normal" },
  { id: "4", title: "Fee Payment Deadline", content: "Last date for hostel fee payment is March 31st. Late payment will incur a penalty of ₹500.", date: "2026-03-10", priority: "urgent" },
];

export const students: Student[] = [
  { id: "s1", name: "Arjun Mehta", email: "arjun@hostel.edu", room: "402", block: "B", phone: "+91 98765 43210", feeStatus: "paid", attendance: 92 },
  { id: "s2", name: "Sneha Roy", email: "sneha@hostel.edu", room: "305", block: "A", phone: "+91 98765 43211", feeStatus: "paid", attendance: 88 },
  { id: "s3", name: "Rahul Kumar", email: "rahul@hostel.edu", room: "210", block: "C", phone: "+91 98765 43212", feeStatus: "overdue", attendance: 75 },
  { id: "s4", name: "Priya Singh", email: "priya@hostel.edu", room: "118", block: "B", phone: "+91 98765 43213", feeStatus: "pending", attendance: 95 },
  { id: "s5", name: "Vikram Joshi", email: "vikram@hostel.edu", room: "504", block: "A", phone: "+91 98765 43214", feeStatus: "paid", attendance: 82 },
  { id: "s6", name: "Ananya Desai", email: "ananya@hostel.edu", room: "301", block: "C", phone: "+91 98765 43215", feeStatus: "paid", attendance: 90 },
];

export const messMenu: Record<string, { breakfast: string; lunch: string; snacks: string; dinner: string }> = {
  Monday: { breakfast: "Poha, Tea/Coffee, Fruits", lunch: "Dal, Rice, Roti, Paneer Butter Masala, Salad", snacks: "Samosa, Chai", dinner: "Rajma, Rice, Roti, Raita" },
  Tuesday: { breakfast: "Idli, Sambhar, Chutney, Coffee", lunch: "Chole, Rice, Roti, Aloo Gobi, Pickle", snacks: "Bread Pakora, Juice", dinner: "Dal Makhani, Jeera Rice, Roti, Salad" },
  Wednesday: { breakfast: "Paratha, Curd, Pickle, Tea", lunch: "Kadhi, Rice, Roti, Mix Veg, Papad", snacks: "Maggi, Tea", dinner: "Palak Paneer, Rice, Roti, Raita" },
  Thursday: { breakfast: "Upma, Vada, Chutney, Coffee", lunch: "Dal Tadka, Rice, Roti, Bhindi, Salad", snacks: "Pav Bhaji", dinner: "Chana Masala, Rice, Roti, Pickle" },
  Friday: { breakfast: "Chole Bhature, Lassi", lunch: "Sambhar, Rice, Roti, Cabbage, Papad", snacks: "Spring Rolls, Juice", dinner: "Malai Kofta, Rice, Roti, Salad" },
  Saturday: { breakfast: "Aloo Paratha, Curd, Tea", lunch: "Rajma, Rice, Roti, Baingan, Pickle", snacks: "Momos, Chutney", dinner: "Shahi Paneer, Pulao, Roti, Raita" },
  Sunday: { breakfast: "Puri, Halwa, Tea", lunch: "Special Thali - Paneer, Dal, Rice, Roti, Sweet, Salad", snacks: "Cake, Cold Drink", dinner: "Butter Dal, Fried Rice, Roti, Ice Cream" },
};
