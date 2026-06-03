import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  isVerified: boolean;
  data?: string;
  role: "systemOwner" | "user" | "admin" | "subAdmin" | "messMalik";

  adminId?: Types.ObjectId;
  createdBy?: Types.ObjectId;
  permanentData?: Types.ObjectId;

  isActive: boolean;

  refreshTokens: {
    token: string;
    createdAt: Date;
  }[];

  emailVerificationToken?: string;
  passwordResetOTP?: string;
  passwordResetOTPExpires?: Date;

  inviteToken?: string;
  inviteExpires?: Date;
  linkAttempts?: string;

  subscription: {
    isActive: boolean;
    plan: "monthly";
    startDate?: Date;
    endDate?: Date;
    lastPaymentId?: string;
  };

  loginAttempts: number;
  lockUntil?: Date;
  lastLogin?: Date;

  inviteStatus: "pending" | "verified" | "expired";

  deletedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      select: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    data: String,

    role: {
      type: String,
      enum: ["systemOwner", "user", "admin", "subAdmin", "messMalik"],
      default: "user",
    },

    adminId: { type: Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    permanentData: { type: Schema.Types.ObjectId, ref: "UserPermanentData" },

    isActive: { type: Boolean, default: false },

    refreshTokens: [
      {
        token: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    emailVerificationToken: String,
    passwordResetOTP: String,
    passwordResetOTPExpires: Date,

    inviteToken: String,
    inviteExpires: Date,
    linkAttempts: String,

    subscription: {
      isActive: { type: Boolean, default: false },
      plan: { type: String, enum: ["monthly"], default: "monthly" },
      startDate: Date,
      endDate: Date,
      lastPaymentId: String,
    },

    loginAttempts: { type: Number, default: 0 },
    lockUntil: Date,
    lastLogin: Date,

    inviteStatus: {
      type: String,
      enum: ["pending", "verified", "expired"],
      default: "pending",
    },

    deletedAt: Date,
  },
  { timestamps: true },
);

userSchema.index({ role: 1 });

const User = mongoose.model<IUser>("User", userSchema);

export default User;
