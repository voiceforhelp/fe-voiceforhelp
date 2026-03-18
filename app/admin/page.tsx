"use client";

import { useEffect, useState } from "react";
import { IndianRupee, Users, Video, HandHeart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminService } from "@/services/adminService";
import type { DashboardStats } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#2E7D32", "#F57C00", "#1976D2", "#7B1FA2", "#D32F2F", "#00838F"];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [daily, setDaily] = useState<any[]>([]);
  const [monthly, setMonthly] = useState<any[]>([]);
  const [categoryStats, setCategoryStats] = useState<any[]>([]);

  useEffect(() => {
    adminService.getDashboardStats().then((res) => setStats(res.stats)).catch(() => {});
    adminService.getDailyDonations().then((res) => setDaily(res.data)).catch(() => {});
    adminService.getMonthlyDonations().then((res) => setMonthly(res.data)).catch(() => {});
    adminService.getCategoryWiseDonations().then((res) => setCategoryStats(res.data)).catch(() => {});
  }, []);

  const statCards = [
    { label: "Total Donations", value: stats ? formatCurrency(stats.totalAmount) : "₹0", icon: IndianRupee, color: "text-green-600 bg-green-100" },
    { label: "Total Donors", value: stats?.totalDonors || 0, icon: Users, color: "text-blue-600 bg-blue-100" },
    { label: "Videos Uploaded", value: stats?.totalVideos || 0, icon: Video, color: "text-purple-600 bg-purple-100" },
    { label: "Volunteers", value: stats?.totalVolunteers || 0, icon: HandHeart, color: "text-orange-600 bg-orange-100" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s, i) => (
          <Card key={i}>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="text-lg font-bold text-gray-900">{s.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader><CardTitle className="text-base">Daily Donations (30 days)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={daily}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#2E7D32" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Monthly Donations (12 months)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="amount" fill="#F57C00" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Category-wise Donations</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryStats} dataKey="totalAmount" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={((props: any) => `${props.name || ""} (${((props.percent || 0) * 100).toFixed(0)}%)`) as any}>
                {categoryStats.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
