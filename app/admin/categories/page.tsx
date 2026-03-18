"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { adminService } from "@/services/adminService";
import { formatCurrency } from "@/lib/utils";
import type { Category } from "@/types";
import toast from "react-hot-toast";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<{ name: string; description: string; targetAmount: number; status: "active" | "inactive" }>({ name: "", description: "", targetAmount: 0, status: "active" });

  const fetchCategories = () => {
    adminService.getAllCategories().then((res) => setCategories(res.categories)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchCategories(); }, []);

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setForm({ name: cat.name, description: cat.description, targetAmount: cat.targetAmount, status: cat.status });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name) { toast.error("Name is required"); return; }
    try {
      if (editing) {
        await adminService.updateCategory(editing._id, form);
        toast.success("Category updated");
      } else {
        await adminService.createCategory(form);
        toast.success("Category created");
      }
      setShowForm(false);
      setEditing(null);
      setForm({ name: "", description: "", targetAmount: 0, status: "active" });
      fetchCategories();
    } catch (err: any) { toast.error(err.response?.data?.message || "Failed"); }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    try {
      await adminService.deleteCategory(id);
      toast.success("Category deleted");
      fetchCategories();
    } catch { toast.error("Delete failed"); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <Dialog open={showForm} onOpenChange={(open) => { setShowForm(open); if (!open) setEditing(null); }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Category</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <Input label="Name *" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              <Textarea label="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              <Input label="Target Amount" type="number" value={form.targetAmount} onChange={(e) => setForm((f) => ({ ...f, targetAmount: Number(e.target.value) }))} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "active" | "inactive" }))} className="flex h-11 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-green-500 focus:outline-none">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <Button onClick={handleSave} className="w-full">{editing ? "Update" : "Create"} Category</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {categories.map((c) => (
          <Card key={c._id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">{c.name}</p>
                  <Badge variant={c.status === "active" ? "success" : "danger"}>{c.status}</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">{c.description || "No description"}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Raised: {formatCurrency(c.raisedAmount)} / Target: {formatCurrency(c.targetAmount)}
                </p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="h-4 w-4" /></button>
                <button onClick={() => deleteCategory(c._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
              </div>
            </CardContent>
          </Card>
        ))}
        {categories.length === 0 && !loading && <div className="text-center py-12 text-gray-400">No categories yet</div>}
      </div>
    </div>
  );
}
