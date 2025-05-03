import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BadgeCheck, FileText } from "lucide-react";

export default function SwiftLease() {
  const [step, setStep] = useState(1);
  const [screeningResult, setScreeningResult] = useState(null);
  const [formData, setFormData] = useState({
    income: "",
    jobType: "",
    rentalHistory: "",
    pets: "",
    evictions: "",
    state: "",
    rent: "",
    duration: "",
    petPolicy: "",
    notes: ""
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleScreening = () => {
    setScreeningResult({
      approved: true,
      notes: "✅ Meets income/rental history. ⚠️ Review eviction record."
    });
    setStep(2);
  };

  const handleLeaseGeneration = async () => {
    setStep(3);
  };

  const handleDownload = async () => {
    const res = await fetch("http://localhost:5000/generate-lease", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        state: formData.state,
        rent: formData.rent,
        duration: formData.duration,
        pets: formData.petPolicy,
        notes: formData.notes
      })
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lease_agreement.pdf";
    a.click();
  };

  return (
    <div className="p-8 bg-gradient-to-br from-white via-slate-100 to-white min-h-screen text-gray-800 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-900">SwiftLease</h1>
        <p className="text-md text-gray-600">Fast. Accurate. Stress-Free Leasing.</p>
      </div>
      {/* (rest of the component remains unchanged) */}
    </div>
  );
}