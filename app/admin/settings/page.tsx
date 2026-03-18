"use client";

import { useEffect, useState, useRef } from "react";
import { Upload, Save, Image, Type, FileText, Loader2, Check, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { settingsService } from "@/services/settingsService";
import { adminService } from "@/services/adminService";
import toast from "react-hot-toast";

interface SettingField {
  key: string;
  label: string;
  type: "image" | "text" | "textarea";
  description: string;
  value: string;
}

const defaultFields: SettingField[] = [
  { key: "heroBannerImage", label: "Hero Banner Image", type: "image", description: "Main hero section background image", value: "" },
  { key: "heroTitle", label: "Hero Title", type: "text", description: "Main heading on hero section", value: "Lend a Hand," },
  { key: "heroSubtitle", label: "Hero Subtitle", type: "text", description: "Subtitle text below hero heading", value: "Your Support Can Make a Difference" },
  { key: "missionImage", label: "Mission Section Image", type: "image", description: "Image for Our Mission section", value: "" },
  { key: "missionText", label: "Mission Text", type: "textarea", description: "Our Mission section description", value: "We are dedicated to helping the underprivileged and bringing positive change to their lives. Join us in our mission to make a difference." },
];

export default function AdminSettings() {
  const [fields, setFields] = useState<SettingField[]>(defaultFields);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    settingsService.getAllSettings().then((res) => {
      const settingsMap: Record<string, string> = {};
      res.settings.forEach((s) => { settingsMap[s.key] = s.value; });
      setFields((prev) =>
        prev.map((f) => ({ ...f, value: settingsMap[f.key] !== undefined ? settingsMap[f.key] : f.value }))
      );
    }).catch(() => {});
  }, []);

  const updateField = (key: string, value: string) => {
    setFields((prev) => prev.map((f) => (f.key === key ? { ...f, value } : f)));
    setSaved(false);
  };

  const handleImageUpload = async (key: string, file: File) => {
    if (!file) return;
    setUploading(key);
    try {
      const res = await adminService.uploadImage(file);
      updateField(key, res.url);
      toast.success("Image uploaded!");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const settings = fields.map((f) => ({
        key: f.key,
        value: f.value,
        description: f.description,
      }));
      await settingsService.bulkUpdateSettings(settings);
      toast.success("Settings saved successfully!");
      setSaved(true);
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage hero banner, mission section, and other site content</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving..." : saved ? "Saved!" : "Save All"}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Hero Section Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Image className="h-5 w-5 text-blue-500" />
              Hero Section
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields.filter((f) => f.key.startsWith("hero")).map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                <p className="text-xs text-gray-400 mb-2">{field.description}</p>

                {field.type === "image" ? (
                  <div className="space-y-3">
                    {field.value && (
                      <div className="relative inline-block">
                        <img src={field.value} alt={field.label} className="h-40 rounded-lg object-cover border border-gray-200" />
                        <button
                          onClick={() => updateField(field.key, "")}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={(el) => { fileInputRefs.current[field.key] = el; }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(field.key, file);
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRefs.current[field.key]?.click()}
                        disabled={uploading === field.key}
                        className="flex items-center gap-2"
                      >
                        {uploading === field.key ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        {uploading === field.key ? "Uploading..." : "Upload Image"}
                      </Button>
                      <span className="text-xs text-gray-400">or paste URL:</span>
                      <Input
                        placeholder="https://..."
                        value={field.value}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        className="flex-1 text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <Input
                    value={field.value}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    placeholder={field.label}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mission Section Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              Our Mission Section
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields.filter((f) => f.key.startsWith("mission")).map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                <p className="text-xs text-gray-400 mb-2">{field.description}</p>

                {field.type === "image" ? (
                  <div className="space-y-3">
                    {field.value && (
                      <div className="relative inline-block">
                        <img src={field.value} alt={field.label} className="h-40 rounded-lg object-cover border border-gray-200" />
                        <button
                          onClick={() => updateField(field.key, "")}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={(el) => { fileInputRefs.current[field.key] = el; }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(field.key, file);
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRefs.current[field.key]?.click()}
                        disabled={uploading === field.key}
                        className="flex items-center gap-2"
                      >
                        {uploading === field.key ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        {uploading === field.key ? "Uploading..." : "Upload Image"}
                      </Button>
                      <span className="text-xs text-gray-400">or paste URL:</span>
                      <Input
                        placeholder="https://..."
                        value={field.value}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        className="flex-1 text-sm"
                      />
                    </div>
                  </div>
                ) : field.type === "textarea" ? (
                  <Textarea
                    value={field.value}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    placeholder={field.label}
                    rows={4}
                  />
                ) : (
                  <Input
                    value={field.value}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    placeholder={field.label}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
