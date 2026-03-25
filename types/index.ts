export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  avatar?: string;
  donations?: string[];
  isVerified?: boolean;
  createdAt?: string;
}

export interface Donation {
  _id: string;
  userId?: string;
  name: string;
  email?: string;
  phone: string;
  amount: number;
  category?: Category;
  paymentStatus: "pending" | "completed" | "failed";
  paymentMethod: string;
  transactionId?: string;
  donationDate: string;
  donationGroupDate: string;
  isAnonymous: boolean;
  createdAt: string;
}

export interface SocialLink {
  url: string;
  title?: string;
  thumbnail?: string;
}

export interface VideoImpact {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  category?: Category;
  donorGroupDate: string;
  linkedDonors?: LinkedDonor[];
  tags?: string[];
  socialLinks: {
    instagram?: SocialLink[];
    youtube?: SocialLink[];
    facebook?: SocialLink[];
  };
  status: "processing" | "published" | "failed";
  views: number;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

export interface VideoComment {
  _id: string;
  video: string;
  user: { _id: string; name: string; email?: string; avatar?: string };
  text: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface AdminCommentResponse {
  success: boolean;
  comments: (VideoComment & { video: { _id: string; title: string; thumbnailUrl?: string } })[];
  total: number;
  page: number;
  pages: number;
  counts: { pending: number; approved: number; rejected: number };
}

export interface VideoLikeItem {
  _id: string;
  user: { _id: string; name: string; email?: string; avatar?: string };
  video: { _id: string; title: string; thumbnailUrl?: string };
  createdAt: string;
}

export interface LinkedDonor {
  _id: string;
  name: string;
  email?: string;
  amount: number;
  category?: Category;
  donationDate?: string;
  isAnonymous?: boolean;
}

export interface DonorListItem {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  amount: number;
  category?: Category;
  donationDate: string;
  donationGroupDate: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  image?: string;
  color?: string;
  bgColor?: string;
  status: "active" | "inactive";
  targetAmount: number;
  raisedAmount: number;
}

export interface Volunteer {
  _id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  availabilityType: "weekends" | "alternate_days" | "festivals" | "specific_dates";
  date?: string;
  time?: string;
  location?: string;
  notes?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  [key: string]: unknown;
}

export interface DashboardStats {
  totalAmount: number;
  totalDonations: number;
  totalDonors: number;
  totalVideos: number;
  totalVolunteers: number;
  totalUsers: number;
}

export interface DonationForm {
  name: string;
  email: string;
  phone: string;
  amount: number;
  category: string;
  isVolunteer: boolean;
}

export interface FastDonationForm {
  phone: string;
  amount: number;
  email?: string;
}

export interface VolunteerForm {
  name: string;
  email: string;
  phone: string;
  availabilityType: string;
  date?: string;
  time?: string;
  location?: string;
  notes?: string;
}

export interface UPIPaymentData {
  upiId: string;
  amount: number;
  payeeName: string;
  upiLink: string;
  transactionRef: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface OTPVerifyForm {
  email: string;
  otp: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  email: string;
  resetToken: string;
  newPassword: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  shortDescription: string;
  image: string;
  author: { _id: string; name: string; avatar?: string };
  status: "draft" | "published";
  socialContent?: {
    youtube?: { title: string; description: string; tags: string[] };
    instagram?: { caption: string; hashtags: string[] };
    facebook?: string;
  };
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface AIGeneratedContent {
  blogContent: string;
  shortDescription: string;
  youtube: { title: string; description: string; tags: string[] };
  instagram: { caption: string; hashtags: string[] };
  facebook: string;
}

export interface AIVideoContent {
  description: string;
  tags: string[];
}
