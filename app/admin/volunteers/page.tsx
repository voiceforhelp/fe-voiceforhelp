"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminService } from "@/services/adminService";
import { formatDate } from "@/lib/utils";
import type { Volunteer } from "@/types";
import toast from "react-hot-toast";

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetch = () => {
    setLoading(true);
    adminService.getVolunteers(page).then((res) => {
      setVolunteers(res.volunteers);
      setTotalPages(res.pages);
    }).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, [page]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await adminService.updateVolunteerStatus(id, status);
      toast.success(`Volunteer ${status}`);
      fetch();
    } catch { toast.error("Update failed"); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Volunteer Applications</h1>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : (
        <div className="space-y-4">
          {volunteers.map((v) => (
            <Card key={v._id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">{v.name}</p>
                      <Badge variant={v.status === "approved" ? "success" : v.status === "pending" ? "warning" : "danger"}>{v.status}</Badge>
                    </div>
                    <p className="text-xs text-gray-500">{v.email} &middot; {v.phone}</p>
                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
                      <span>Availability: {v.availabilityType.replace("_", " ")}</span>
                      {v.location && <span>&middot; {v.location}</span>}
                      {v.date && <span>&middot; {formatDate(v.date)}</span>}
                    </div>
                    {v.notes && <p className="text-xs text-gray-400 mt-1">{v.notes}</p>}
                  </div>
                  {v.status === "pending" && (
                    <div className="flex gap-1">
                      <button onClick={() => updateStatus(v._id, "approved")} className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><CheckCircle className="h-5 w-5" /></button>
                      <button onClick={() => updateStatus(v._id, "rejected")} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><XCircle className="h-5 w-5" /></button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          {volunteers.length === 0 && <div className="text-center py-12 text-gray-400">No applications yet</div>}
        </div>
      )}

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
