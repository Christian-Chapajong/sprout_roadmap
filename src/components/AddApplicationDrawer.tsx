import { useState } from "react";
import type { Application } from "../data/applications";

type AddApplicationDrawerProps = {
  onClose?: () => void;
  onAddApplication?: (application: Omit<Application, "id">) => void;
};

export const AddApplicationDrawer = ({
  onClose,
  onAddApplication,
}: AddApplicationDrawerProps): JSX.Element => {
  const [formData, setFormData] = useState({
    company: "",
    stage: "Online application",
    logo: "",
    progress: 0,
    total: 6,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const stageOptions = [
    "Online application",
    "Assessment centre", 
    "Video Interview",
    "Online assessments",
    "Offer received",
    "Interview",
    "Phone screening",
    "Final round",
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }
    
    if (!formData.logo.trim()) {
      newErrors.logo = "Company logo URL is required";
    } else if (!isValidUrl(formData.logo)) {
      newErrors.logo = "Please enter a valid URL";
    }

    if (formData.progress < 0 || formData.progress > formData.total) {
      newErrors.progress = `Progress must be between 0 and ${formData.total}`;
    }

    if (formData.total < 1) {
      newErrors.total = "Total steps must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddApplication?.(formData);
      onClose?.();
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="w-[393px] h-[686px] flex flex-col bg-white rounded-t-[20px] shadow-[0_0_15px_15px_rgba(0,0,0,0.25)]">
      {/* Header */}
      <header className="w-full py-4 px-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <span className="font-bold text-black text-xs">Add New Application</span>
          {onClose && (
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#f3f3f3] hover:bg-[#e9e9e9] border border-[#ddd] flex items-center justify-center"
              aria-label="Close add application form"
            >
              <span className="leading-none">✕</span>
            </button>
          )}
        </div>
      </header>

      {/* Form */}
      <main className="flex flex-col w-full px-4 py-4 overflow-y-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="company" className="font-bold text-black text-xs">
              Company Name *
            </label>
            <input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., Google, Microsoft, Apple"
            />
            {errors.company && (
              <span className="text-red-500 text-xs">{errors.company}</span>
            )}
          </div>

          {/* Company Logo URL */}
          <div className="flex flex-col gap-2">
            <label htmlFor="logo" className="font-bold text-black text-xs">
              Company Logo URL *
            </label>
            <input
              id="logo"
              type="url"
              value={formData.logo}
              onChange={(e) => handleInputChange("logo", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="https://example.com/logo.png"
            />
            {errors.logo && (
              <span className="text-red-500 text-xs">{errors.logo}</span>
            )}
            {formData.logo && !errors.logo && (
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <img
                  src={formData.logo}
                  alt="Logo preview"
                  className="w-8 h-8 object-cover rounded"
                  onError={() => setErrors(prev => ({ ...prev, logo: "Invalid image URL" }))}
                />
                <span className="text-xs text-gray-600">Logo preview</span>
              </div>
            )}
          </div>

          {/* Application Stage */}
          <div className="flex flex-col gap-2">
            <label htmlFor="stage" className="font-bold text-black text-xs">
              Current Stage
            </label>
            <select
              id="stage"
              value={formData.stage}
              onChange={(e) => handleInputChange("stage", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {stageOptions.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          {/* Progress Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="progress" className="font-bold text-black text-xs">
                Progress
              </label>
              <input
                id="progress"
                type="number"
                min="0"
                max={formData.total}
                value={formData.progress}
                onChange={(e) => handleInputChange("progress", parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.progress && (
                <span className="text-red-500 text-xs">{errors.progress}</span>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="total" className="font-bold text-black text-xs">
                Total Steps
              </label>
              <input
                id="total"
                type="number"
                min="1"
                value={formData.total}
                onChange={(e) => handleInputChange("total", parseInt(e.target.value) || 6)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.total && (
                <span className="text-red-500 text-xs">{errors.total}</span>
              )}
            </div>
          </div>

          {/* Progress Preview */}
          {formData.total > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-bold text-black text-xs">Progress Preview</span>
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>{formData.progress}/{formData.total} completed</span>
                <span>{Math.round((formData.progress / formData.total) * 100)}%</span>
              </div>
              <div className="w-full h-2.5 bg-[#d9d9d9] rounded-[10px] overflow-hidden">
                <div
                  className="h-full bg-lime-green rounded-l-[10px] transition-all duration-300"
                  style={{ width: `${(formData.progress / formData.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-bold text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Add Application
          </button>
        </form>
      </main>
    </div>
  );
};
