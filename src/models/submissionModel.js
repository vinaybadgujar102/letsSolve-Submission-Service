const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: [true, "User ID for the submission is required"],
    },
    problemID: {
      type: String,
      required: [true, "Problem ID for the submission is required"],
    },
    language: {
      type: String,
      required: [true, "Language for the submission is required"],
    },
    code: {
      type: String,
      required: [true, "Code for the submission is required"],
    },
    status: {
      type: String,
      enum: ["Accepted", "Success", "RE", "TLE", "MLE", "WA", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
