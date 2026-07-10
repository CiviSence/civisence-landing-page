import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  BadgeCheck,
  Tag,
  AlertCircle,
  Loader2,
  Search,
  ExternalLink,
  Plus,
  X,
  CheckCircle2,
  ChevronDown,
  User2,
  Users,
} from "lucide-react";
import {
  getOrganizations,
  registerOrganization,
} from "../../api/organization/org.api.js";


// ─── Status pill ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status, isActive }) => {
  const active = isActive && status === "active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        active ? "bg-emerald-100 text-emerald-700" : "bg-red-50 text-red-500"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-red-400"}`}
      />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

// ─── Skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-3xl border border-gray-100 p-6 animate-pulse">
    <div className="flex items-start gap-4 mb-5">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-3 bg-gray-100 rounded w-full" />
      <div className="h-3 bg-gray-100 rounded w-5/6" />
    </div>
    <div className="mt-5 flex gap-2">
      <div className="h-6 w-16 bg-gray-100 rounded-full" />
      <div className="h-6 w-12 bg-gray-100 rounded-full" />
    </div>
  </div>
);

// ─── Organization card ────────────────────────────────────────────────────────
const OrgCard = ({ org, index }) => {
  const displayName = org.name || org.organization_name || "Organization";
  const displayEmail = org.official_email || org.contact_email;
  const displayPhone = org.phone || org.contact_phone;
  const displayAddress = org.address || org.country || org.industry;
  const displayDescription = org.description || org.message;
  const displayStatus = org.status || (org.is_active ? "active" : "pending");
  const isActive = org.status === "verified";

  const initials = displayName
    .split(/[\s,]+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const gradients = [
    "from-blue-500 to-indigo-600",
    "from-violet-500 to-purple-600",
    "from-emerald-500 to-teal-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-cyan-500 to-blue-600",
  ];
  const grad = gradients[index % gradients.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="group bg-white rounded-3xl border border-gray-100 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 flex items-start gap-4">
        {/* Avatar */}
        <div
          className={`bg-gradient-to-br ${grad} w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-md`}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base leading-snug truncate group-hover:text-primary transition-colors">
            {displayName}
          </h3>
          {org.industry && (
            <p className="text-xs text-gray-400 mt-0.5">{org.industry}</p>
          )}
          {org.code && (
            <p className="text-xs text-gray-400 font-mono mt-0.5">{org.code}</p>
          )}
          {(org.domain || org.website) && (
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5 truncate">
              <ExternalLink size={10} />
              {org.domain || org.website}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-6 pb-4 flex-1 space-y-3">
        {displayDescription && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {displayDescription}
          </p>
        )}
        <ul className="space-y-1.5 text-xs text-gray-500">
          {displayAddress && (
            <li className="flex items-start gap-2">
              <MapPin size={12} className="shrink-0 mt-0.5 text-gray-400" />
              <span className="line-clamp-2">{displayAddress}</span>
            </li>
          )}
          {displayPhone && (
            <li className="flex items-center gap-2">
              <Phone size={12} className="shrink-0 text-gray-400" />
              <span>{displayPhone}</span>
            </li>
          )}
          {displayEmail && (
            <li className="flex items-center gap-2">
              <Mail size={12} className="shrink-0 text-gray-400" />
              <span className="truncate">{displayEmail}</span>
            </li>
          )}
        </ul>
      </div>

      {/* Footer */}
      <div className="px-6 pb-5 pt-2 flex items-center gap-2 border-t border-gray-50">
        <StatusBadge status={displayStatus} isActive={isActive} />
        <div className="bg-primary/10 p-1 px-2 font-semibold text-gray-500 text-xs flex gap-1 rounded-2xl">
          <Users size={13} />
          {org.size}
        </div>

        {isActive && (
          <span className="ml-auto text-primary" aria-label="Verified">
            <BadgeCheck size={16} />
          </span>
        )}
      </div>
    </motion.article>
  );
};

// ─── Input helper ─────────────────────────────────────────────────────────────
const Field = ({ label, id, required, error, children }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1.5"
    >
      {label}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition bg-white";

const INDUSTRIES = [
  "Smart City / Municipal",
  "Education / University",
  "Healthcare",
  "Corporate / Enterprise",
  "Residential / Housing",
  "NGO / Non-Profit",
  "Government",
  "Other",
];

const SIZES = ["1–10", "11–50", "51–200", "201–500", "500+"];

// ─── Registration Modal ───────────────────────────────────────────────────────
const RegisterModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    organization_name: "",
    industry: "",
    size: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    website: "",
    country: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.organization_name.trim())
      e.organization_name = "Organization name is required.";
    if (!form.contact_name.trim()) e.contact_name = "Contact name is required.";
    if (!form.contact_email.trim()) e.contact_email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact_email))
      e.contact_email = "Enter a valid email address.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      const data = await registerOrganization(form);
      setSubmitted(true);
      onSuccess(data);
    } catch (err) {
      const msg =
        err?.response?.data?.error || "Something went wrong. Please try again.";
      setErrors({ _form: msg });
    } finally {
      setSubmitting(false);
    }
  };

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdrop}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        style={{
          background: "rgba(17,24,39,0.55)",
          backdropFilter: "blur(4px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Register your Organization
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Get listed on CiviSence — approval usually takes 1–2 business
                days.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Success state */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-4 py-14 px-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Registration Submitted!
              </h3>
              <p className="text-gray-500 text-sm max-w-xs">
                Your organization has been submitted for review. We'll reach out
                to <strong>{form.contact_email}</strong> within 1–2 business
                days.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition"
              >
                Done
              </button>
            </motion.div>
          ) : (
            /* Form */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="overflow-y-auto flex-1 px-6 py-5 space-y-4"
            >
              {errors._form && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  {errors._form}
                </div>
              )}

              {/* Row 1 */}
              <Field
                label="Organization Name"
                id="organization_name"
                required
                error={errors.organization_name}
              >
                <input
                  id="organization_name"
                  name="organization_name"
                  type="text"
                  placeholder="e.g. Pune Municipal Corporation"
                  value={form.organization_name}
                  onChange={handleChange}
                  className={`${inputClass} ${errors.organization_name ? "border-red-300 focus:ring-red-200" : ""}`}
                />
              </Field>

              {/* Row 2: industry + size */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Industry" id="industry" error={errors.industry}>
                  <div className="relative">
                    <select
                      id="industry"
                      name="industry"
                      value={form.industry}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none pr-8`}
                    >
                      <option value="">Select…</option>
                      {INDUSTRIES.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </Field>
                <Field label="Team Size" id="size" error={errors.size}>
                  <div className="relative">
                    <select
                      id="size"
                      name="size"
                      value={form.size}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none pr-8`}
                    >
                      <option value="">Select…</option>
                      {SIZES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </Field>
              </div>

              {/* Row 3: contact name + email */}
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Contact Name"
                  id="contact_name"
                  required
                  error={errors.contact_name}
                >
                  <input
                    id="contact_name"
                    name="contact_name"
                    type="text"
                    placeholder="Your full name"
                    value={form.contact_name}
                    onChange={handleChange}
                    className={`${inputClass} ${errors.contact_name ? "border-red-300 focus:ring-red-200" : ""}`}
                  />
                </Field>
                <Field
                  label="Contact Email"
                  id="contact_email"
                  required
                  error={errors.contact_email}
                >
                  <input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    placeholder="you@org.com"
                    value={form.contact_email}
                    onChange={handleChange}
                    className={`${inputClass} ${errors.contact_email ? "border-red-300 focus:ring-red-200" : ""}`}
                  />
                </Field>
              </div>

              {/* Row 4: phone + country */}
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Phone"
                  id="contact_phone"
                  error={errors.contact_phone}
                >
                  <input
                    id="contact_phone"
                    name="contact_phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.contact_phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
                <Field label="Country" id="country" error={errors.country}>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    placeholder="e.g. India"
                    value={form.country}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
              </div>

              {/* Row 5: website */}
              <Field label="Website" id="website" error={errors.website}>
                <input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://yourorg.gov.in"
                  value={form.website}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>

              {/* Row 6: message */}
              <Field
                label="Additional Notes"
                id="message"
                error={errors.message}
              >
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Tell us briefly about your organization's needs…"
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {/* Submit */}
              <div className="pt-1 pb-2">
                <button
                  id="register-org-submit"
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Building2 size={16} />
                      Submit Registration
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────
const OrganizationsPage = () => {
  const [orgs, setOrgs] = useState([]);
  const [pendingOrgs, setPendingOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchOrgs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getOrganizations();
        if (!cancelled) setOrgs(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled)
          setError(err.message || "Failed to load organizations.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchOrgs();
    return () => {
      cancelled = true;
    };
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const handleRegistrationSuccess = (data) => {
    // Optimistically add the new org to both lists so it shows up right away
    if (data?.data) {
      setOrgs((prev) => [data.data, ...prev]);
      setPendingOrgs((prev) => [data.data, ...prev]);
    }
  };

  const filtered = orgs.filter((o) =>
    [
      o.name,
      o.organization_name,
      o.description,
      o.message,
      o.address,
      o.country,
      o.industry,
      o.code,
      o.domain,
      o.website,
    ]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(search.toLowerCase())),
  );

  const filteredPending = pendingOrgs.filter((o) =>
    [o.organization_name, o.industry, o.country, o.contact_name]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="pt-32 pb-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative blob */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(108,99,255,0.07) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Organizations listed on{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(135deg,#6C63FF,#7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                CiviSence
              </span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Municipalities, campuses, and enterprises using CiviSence to
              manage civic issues at scale.
            </p>
          </motion.div>

          {/* Search + Register button row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="search"
                placeholder="Search organizations…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition"
              />
            </div>

            {/* Register button */}
            <button
              id="register-organization-btn"
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold shadow-md hover:shadow-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 whitespace-nowrap"
            >
              <Plus size={16} />
              Register Organization
            </button>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle size={28} className="text-red-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-700">
                Could not load organizations
              </h2>
              <p className="text-gray-400 text-sm max-w-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition"
              >
                Retry
              </button>
            </motion.div>
          )}

          {/* ── Active org grid ── */}
          {!loading && !error && filtered.length > 0 && (
            <div>
              <p className="text-sm text-gray-400 mb-6">
                {filtered.length} organization{filtered.length !== 1 ? "s" : ""}{" "}
                found
                {search && ` for "${search}"`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {filtered.map((org, i) => (
                    <OrgCard key={org.id} org={org} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Empty / no-results state (only when no pending either) */}
          {!loading &&
            !error &&
            filtered.length === 0 &&
            filteredPending.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center gap-3"
              >
                <Building2 size={40} className="text-gray-200" />
                <h2 className="text-lg font-semibold text-gray-400">
                  {search
                    ? "No organizations match your search"
                    : "No organizations found"}
                </h2>
                {search ? (
                  <button
                    onClick={() => setSearch("")}
                    className="text-primary text-sm underline underline-offset-2"
                  >
                    Clear search
                  </button>
                ) : (
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-1 flex items-center gap-1.5 text-primary text-sm font-medium underline underline-offset-2"
                  >
                    <Plus size={14} />
                    Be the first to register
                  </button>
                )}
              </motion.div>
            )}
        </div>
      </section>

      {/* Registration modal */}
      <AnimatePresence>
        {showModal && (
          <RegisterModal
            onClose={() => setShowModal(false)}
            onSuccess={handleRegistrationSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrganizationsPage;
