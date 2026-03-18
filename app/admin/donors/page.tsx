"use client";

import { useEffect, useState } from "react";
import { Search, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminService } from "@/services/adminService";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Donation } from "@/types";
import toast from "react-hot-toast";

export default function AdminDonorsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [groupDate, setGroupDate] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDonations = () => {
    setLoading(true);
    if (groupDate) {
      adminService.getDonationsByGroupDate(groupDate).then((res) => {
        setDonations(res.donations);
        setTotalPages(1);
      }).catch(() => {}).finally(() => setLoading(false));
    } else {
      adminService.getDonations(page, search).then((res) => {
        setDonations(res.donations);
        setTotalPages(res.pages);
      }).catch(() => {}).finally(() => setLoading(false));
    }
  };

  useEffect(() => { fetchDonations(); }, [page, groupDate]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await adminService.updateDonationStatus(id, status);
      toast.success(`Status updated to ${status}`);
      fetchDonations();
    } catch { toast.error("Failed to update"); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Donor List</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex gap-2">
          <Input placeholder="Search donors..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
          <Button onClick={fetchDonations}><Search className="h-4 w-4" /></Button>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <input type="date" value={groupDate} onChange={(e) => setGroupDate(e.target.value)} className="h-11 rounded-lg border border-gray-300 px-3 text-sm focus:border-green-500 focus:outline-none" />
          {groupDate && <Button variant="ghost" size="sm" onClick={() => setGroupDate("")}>Clear</Button>}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-600">Name</th>
                  <th className="text-left p-4 font-semibold text-gray-600 hidden md:table-cell">Email</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Phone</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Amount</th>
                  <th className="text-left p-4 font-semibold text-gray-600 hidden md:table-cell">Category</th>
                  <th className="text-left p-4 font-semibold text-gray-600 hidden lg:table-cell">Date</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 font-medium">{d.name}</td>
                    <td className="p-4 text-gray-500 hidden md:table-cell">{d.email || "-"}</td>
                    <td className="p-4">{d.phone}</td>
                    <td className="p-4 font-bold text-green-700">{formatCurrency(d.amount)}</td>
                    <td className="p-4 hidden md:table-cell">{d.category?.name || "-"}</td>
                    <td className="p-4 text-gray-500 hidden lg:table-cell">{formatDate(d.donationDate)}</td>
                    <td className="p-4">
                      <Badge variant={d.paymentStatus === "completed" ? "success" : d.paymentStatus === "pending" ? "warning" : "danger"}>
                        {d.paymentStatus}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {d.paymentStatus === "pending" && (
                        <div className="flex gap-1">
                          <button onClick={() => updateStatus(d._id, "completed")} className="p-1 text-green-600 hover:bg-green-50 rounded"><CheckCircle className="h-4 w-4" /></button>
                          <button onClick={() => updateStatus(d._id, "failed")} className="p-1 text-red-600 hover:bg-red-50 rounded"><XCircle className="h-4 w-4" /></button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {donations.length === 0 && (
                  <tr><td colSpan={8} className="p-8 text-center text-gray-400">No donations found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
          <span className="flex items-center px-4 text-sm text-gray-500">Page {page} of {totalPages}</span>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>Next</Button>
        </div>
      )}
    </div>
  );
}
