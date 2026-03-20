"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Plus, Edit, Trash2, Eye, X, Mail, Phone, Shield, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { adminService } from "@/services/adminService";
import type { User } from "@/types";
import toast from "react-hot-toast";

const initialForm = { name: "", email: "", phone: "", password: "", role: "user" as "user" | "admin" };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  // View user detail
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    adminService
      .getUsers(page, search)
      .then((res) => {
        setUsers(res.users);
        setTotalPages(res.pages);
        setTotal(res.total);
      })
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, [page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const openCreate = () => {
    setEditing(null);
    setForm(initialForm);
    setShowForm(true);
  };

  const openEdit = (user: User) => {
    setEditing(user);
    setForm({ name: user.name, email: user.email, phone: user.phone, password: "", role: user.role });
    setShowForm(true);
  };

  const openView = async (user: User) => {
    try {
      const res = await adminService.getUserById(user._id || user.id);
      setViewUser(res.user);
      setShowDetail(true);
    } catch {
      toast.error("Failed to load user details");
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.email || !form.phone) {
      toast.error("Name, email and phone are required");
      return;
    }
    if (!editing && !form.password) {
      toast.error("Password is required for new user");
      return;
    }

    setSaving(true);
    try {
      if (editing) {
        const updateData: Record<string, string> = { name: form.name, email: form.email, phone: form.phone, role: form.role };
        await adminService.updateUser(editing._id || editing.id, updateData);
        toast.success("User updated");
      } else {
        await adminService.createUser(form);
        toast.success("User created");
      }
      setShowForm(false);
      setEditing(null);
      setForm(initialForm);
      fetchUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save user");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (user: User) => {
    if (!confirm(`Delete user "${user.name}"? This action cannot be undone.`)) return;
    try {
      await adminService.deleteUser(user._id || user.id);
      toast.success("User deleted");
      fetchUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete user");
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500 mt-1">{total} total users</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Search by name, email or phone..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {searchInput && (
            <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {search && (
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          Showing results for &quot;<span className="font-medium text-gray-700">{search}</span>&quot;
          <button onClick={clearSearch} className="text-green-600 hover:underline">Clear</button>
        </div>
      )}

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-600">Name</th>
                  <th className="text-left p-4 font-semibold text-gray-600 hidden md:table-cell">Email</th>
                  <th className="text-left p-4 font-semibold text-gray-600 hidden sm:table-cell">Phone</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Role</th>
                  <th className="text-left p-4 font-semibold text-gray-600 hidden lg:table-cell">Verified</th>
                  <th className="text-left p-4 font-semibold text-gray-600 hidden lg:table-cell">Joined</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-400">Loading...</td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-400">No users found</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id || user.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold shrink-0">
                            {user.name?.[0]?.toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">{user.name}</p>
                            <p className="text-xs text-gray-400 md:hidden truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-500 hidden md:table-cell">{user.email}</td>
                      <td className="p-4 hidden sm:table-cell">{user.phone}</td>
                      <td className="p-4">
                        <Badge variant={user.role === "admin" ? "warning" : "default"}>
                          {user.role === "admin" ? "Admin" : "User"}
                        </Badge>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <Badge variant={user.isVerified ? "success" : "danger"}>
                          {user.isVerified ? "Yes" : "No"}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-500 hidden lg:table-cell">{formatDate(user.createdAt)}</td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <button onClick={() => openView(user)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg" title="View Details">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button onClick={() => openEdit(user)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete(user)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Previous
          </Button>
          <span className="flex items-center px-4 text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      )}

      {/* Create/Edit User Dialog */}
      <Dialog open={showForm} onOpenChange={(open) => { setShowForm(open); if (!open) { setEditing(null); setForm(initialForm); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit User" : "Create New User"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input label="Name *" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Full name" />
            <Input label="Email *" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="email@example.com" />
            <Input label="Phone *" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+91 9876543210" />
            {!editing && (
              <Input label="Password *" type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} placeholder="Min 6 characters" />
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as "user" | "admin" }))}
                className="flex h-11 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-green-500 focus:outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button onClick={handleSave} className="w-full" disabled={saving}>
              {saving ? "Saving..." : editing ? "Update User" : "Create User"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View User Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={(open) => { setShowDetail(open); if (!open) setViewUser(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {viewUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl font-bold">
                  {viewUser.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{viewUser.name}</h3>
                  <Badge variant={viewUser.role === "admin" ? "warning" : "default"}>
                    {viewUser.role === "admin" ? "Admin" : "User"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-gray-900">{viewUser.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium text-gray-900">{viewUser.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  {viewUser.isVerified ? <ShieldCheck className="h-4 w-4 text-green-500" /> : <Shield className="h-4 w-4 text-gray-400" />}
                  <span className="text-gray-600">Verified:</span>
                  <Badge variant={viewUser.isVerified ? "success" : "danger"}>
                    {viewUser.isVerified ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-600 ml-7">Joined:</span>
                  <span className="font-medium text-gray-900">{formatDate(viewUser.createdAt)}</span>
                </div>
                {viewUser.donations && viewUser.donations.length > 0 && (
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-600 ml-7">Donations:</span>
                    <span className="font-medium text-gray-900">{viewUser.donations.length} donation(s)</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => { setShowDetail(false); openEdit(viewUser); }}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => {
                    setShowDetail(false);
                    handleDelete(viewUser);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
