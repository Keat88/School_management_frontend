import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  User,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Lock,
  Camera,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const initialProfile = {
  fullName: "Daniel",
  email: "daniel@school.edu",
  phone: "+855 12 345 678",
  gender: "Male",
  dateOfBirth: "1990-05-14",
  address: "123 Street, Phnom Penh, Cambodia",
  role: "admin",
};

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 bg-white transition-shadow";
const labelClass = "block text-sm font-medium text-gray-600 mb-1.5";

function Field({ label, icon: Icon, ...props }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}
        <input
          className={`${inputClass} ${Icon ? "pl-9" : ""}`}
          {...props}
        />
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-700">{value}</p>
      </div>
    </div>
  );
}

function ProfilePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    ...initialProfile,
    fullName: currentUser?.name || initialProfile.fullName,
  });
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  const avatarInitial = useMemo(
    () => (profile.fullName || "A").trim().charAt(0).toUpperCase(),
    [profile.fullName]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Persist to the backend/API once it exists; for now keep in local state.
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-start justify-center p-4 md:p-10">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Edit Profile
            </h1>
            <p className="text-sm text-gray-500">
              Manage your personal information and account settings
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <div className="rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          <div className="px-6 pb-6 -mt-14">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
              <div className="relative">
                <div className="h-28 w-28 rounded-2xl bg-white p-1 shadow-lg">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Profile"
                      className="h-full w-full rounded-xl object-cover"
                    />
                  ) : (
                    <div className="h-full w-full rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center text-4xl font-bold">
                      {avatarInitial}
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <button
                  type="button"
                  aria-label="Change photo"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-colors"
                >
                  <Camera size={14} />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-gray-800">
                  {profile.fullName}
                </h2>
                <span className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-blue-50 text-blue-600">
                  <User size={12} /> {profile.role}
                </span>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  <InfoItem icon={Mail} label="Email" value={profile.email} />
                  <InfoItem icon={Phone} label="Phone" value={profile.phone} />
                  <InfoItem icon={MapPin} label="Location" value={profile.address} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            onSubmit={handleSave}
            className="rounded-2xl bg-white shadow-sm border border-gray-200 p-6 lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="font-semibold text-gray-800">
                Personal Information
              </h3>
              <p className="text-sm text-gray-400">
                Update your basic details below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Full Name"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                required
              />
              <Field
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={profile.dateOfBirth}
                onChange={handleChange}
              />
              <div>
                <label className={labelClass}>Gender</label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 pb-1">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  icon={Mail}
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  icon={Phone}
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <label className={labelClass}>Address</label>
                <textarea
                  name="address"
                  rows={2}
                  value={profile.address}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 shadow-sm transition-colors"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          </form>

          <div className="rounded-2xl bg-white shadow-sm border border-gray-200 p-6 h-fit space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">Account</h3>
              <p className="text-sm text-gray-400">
                Quick summary of your account.
              </p>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <Lock size={16} className="text-gray-400" /> Role
              </span>
              <span className="text-sm font-semibold text-gray-800 capitalize">
                {profile.role}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <User size={16} className="text-gray-400" /> Member since
              </span>
              <span className="text-sm font-semibold text-gray-800">2024</span>
            </div>
            <button
              type="button"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-red-500 transition-colors"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;