import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/**
 * Schema for distributor inquiries submitted via DealerForm.
 *
 * Indexes are intentional:
 * - email: dedupe and lookup
 * - product: filter by which product attracted the lead
 * - createdAt (desc): default sort for admin views
 * - status: filter by lead stage
 */

const DealerInquirySchema = new Schema(
  {
    // ─── Lead identity ─────────────────────────────────
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: 200,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      // RFC-light email check — Mongoose validators run before save
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
      maxlength: 200,
      index: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
      maxlength: 50,
    },

    // ─── Business info ─────────────────────────────────
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
      maxlength: 200,
    },
    website: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      maxlength: 100,
    },
    city: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    // ─── Inquiry context ───────────────────────────────
    product: {
      type: String,
      required: [true, "Product is required"],
      trim: true,
      maxlength: 100,
      index: true,
    },
    units: {
      type: String,
      enum: ["20", "50", "100", "200+"],
      default: "20",
    },
    message: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: "",
    },

    // ─── Sales pipeline ────────────────────────────────
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "won", "lost"],
      default: "new",
      index: true,
    },

    // ─── Metadata ──────────────────────────────────────
    ipAddress: {
      type: String,
      trim: true,
      maxlength: 45, // IPv6 max length
      default: "",
    },
    userAgent: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    referer: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
    collection: "dealer_inquiries",
  },
);

// Composite index — most common admin query is "recent leads for this product"
DealerInquirySchema.index({ product: 1, createdAt: -1 });
// Sort newest first
DealerInquirySchema.index({ createdAt: -1 });

export type DealerInquiry = InferSchemaType<typeof DealerInquirySchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

// Re-use existing model if already compiled (Next.js hot reload safety)
const DealerInquiryModel: Model<DealerInquiry> =
  (mongoose.models.DealerInquiry as Model<DealerInquiry>) ||
  mongoose.model<DealerInquiry>("DealerInquiry", DealerInquirySchema);

export default DealerInquiryModel;