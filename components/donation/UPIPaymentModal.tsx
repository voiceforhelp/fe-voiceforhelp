"use client";

import { useRouter } from "next/navigation";
import { QRCode } from "react-qrcode-logo";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, CheckCircle2 } from "lucide-react";
import { UPI_ID } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import type { UPIPaymentData } from "@/types";
import toast from "react-hot-toast";

interface UPIPaymentModalProps {
  open: boolean;
  onClose: () => void;
  paymentData: UPIPaymentData;
}

export default function UPIPaymentModal({ open, onClose, paymentData }: UPIPaymentModalProps) {
  const router = useRouter();

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast.success("UPI ID copied!");
  };

  const openUPIApp = () => {
    window.location.href = paymentData.upiLink;
  };

  const confirmPayment = () => {
    onClose();
    // Redirect to status page with the donation/transaction ID
    router.push(`/donate/status?txnId=${paymentData.transactionRef}`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md mx-auto bg-white border-gray-100">
        <DialogHeader>
          <DialogTitle className="text-center text-gray-900">Complete Your Donation</DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            Scan QR code or use UPI ID to pay {formatCurrency(paymentData.amount)}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          {/* QR Code */}
          <div className="bg-white p-4 rounded-xl border-2 border-gold/20 shadow-inner">
            <QRCode
              value={paymentData.upiLink}
              size={180}
              quietZone={8}
              fgColor="#1B5E20"
              eyeRadius={8}
              qrStyle="dots"
            />
          </div>

          {/* Amount */}
          <div className="text-center">
            <p className="text-3xl font-bold text-gold">{formatCurrency(paymentData.amount)}</p>
          </div>

          {/* UPI ID */}
          <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-4 py-2.5 w-full border border-gray-100">
            <div className="flex-1">
              <p className="text-xs text-gray-500">UPI ID</p>
              <p className="font-mono font-semibold text-white">{UPI_ID}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={copyUPI} className="h-8 w-8">
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          {/* Open in UPI app */}
          <Button variant="secondary" className="w-full" onClick={openUPIApp}>
            <ExternalLink className="mr-2 h-4 w-4" /> Open in UPI App
          </Button>

          {/* Confirm payment - goes to status page */}
          <Button variant="default" className="w-full" onClick={confirmPayment}>
            <CheckCircle2 className="mr-2 h-4 w-4" /> I&apos;ve Completed the Payment
          </Button>

          <p className="text-xs text-gray-500 text-center">
            After clicking above, we&apos;ll verify your payment status.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
