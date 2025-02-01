import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  title: { type: String, required: true },
  description: { type: String },
  // location: {
  //   address: { type: String, required: true },
  //   city: { type: String, required: true },
  //   state: { type: String, required: true },
  //   pincode: { type: String, required: true },
  //   latitude: { type: Number },
  //   longitude: { type: Number },
  // },
  // priceDetails: {
  //   amount: { type: Number, required: true },
  //   negotiable: { type: Boolean, default: false },
  // },
  // ownershipType: {
  //   type: String,
  //   enum: ["Freehold", "Leasehold"],
  //   required: true,
  // },
  // listedBy: {
  //   type: String,
  //   enum: ["Owner", "Agent", "Builder"],
  //   required: true,
  // },
  // possessionStatus: {
  //   type: String,
  //   enum: ["Ready to Move", "Under Construction"],
  //   required: true,
  // },
  // datePosted: { type: Date, default: Date.now },
  // propertyImages: [{ type: String }],
  // contactDetails: {
  //   name: { type: String, required: true },
  //   phoneNumber: { type: String, required: true },
  //   email: { type: String, required: true },
  // },
  // nearbyAmenities: [
  //   {
  //     type: String,
  //     enum: [
  //       "Schools",
  //       "Hospitals",
  //       "Markets",
  //       "Public Transport",
  //       "Shopping Malls",
  //       "Parks",
  //     ],
  //   },
  // ],
  // legalApprovals: [
  //   {
  //     type: String,
  //     enum: ["RERA", "Loan Approved", "Approval Pending", "Legal Dispute"],
  //   },
  // ],
  // paymentOptions: [
  //   { type: String, enum: ["EMI", "Full Payment", "Rent", "Lease"] },
  // ],
  // facingDirection: { type: String, enum: ["East", "West", "North", "South"] },
  // constructionYear: { type: Number },
  // securityFeatures: [
  //   {
  //     type: String,
  //     enum: [
  //       "CCTV",
  //       "Fire Safety",
  //       "Gated Security",
  //       "24/7 Guard",
  //       "Intercom",
  //       "Biometric Access",
  //     ],
  //   },
  // ],

  // // Type-Specific Attributes
  // propertyType: {
  //   type: String,
  //   enum: [
  //     "Apartment",
  //     "PG",
  //     "Villa",
  //     "Office Space",
  //     "Shop",
  //     "Warehouse",
  //     "Residential Plot",
  //     "Commercial Plot",
  //     "Agricultural Land",
  //     "Holiday Home",
  //     "Farmhouse",
  //   ],
  //   required: true,
  // },

  // // Residential Properties
  // configuration: {
  //   type: String,
  //   enum: ["1BHK", "2BHK", "3BHK", "4BHK", "Studio", "Duplex"],
  // },
  // carpetArea: { type: Number },
  // builtUpArea: { type: Number },
  // furnishing: {
  //   type: String,
  //   enum: ["Fully Furnished", "Semi-Furnished", "Unfurnished"],
  // },
  // amenities: [
  //   {
  //     type: String,
  //     enum: [
  //       "Power Backup",
  //       "Security",
  //       "Gym",
  //       "Swimming Pool",
  //       "Clubhouse",
  //       "Lifts",
  //     ],
  //   },
  // ],
  // parking: { type: String, enum: ["Covered", "Open"] },
  // floorNumber: { type: Number },
  // numberOfFloors: { type: Number },
  // balcony: { type: Boolean },

  // // PG/Hostel Specific
  // roomType: { type: String, enum: ["Shared", "Single"] },
  // genderSpecific: { type: String, enum: ["Male", "Female", "Co-Living"] },
  // foodAvailability: { type: Boolean },
  // housekeeping: { type: Boolean },

  // // Commercial Properties
  // frontageSize: { type: Number },
  // footfallPotential: { type: String, enum: ["Low", "Medium", "High"] },
  // visitorsParking: { type: Boolean },
  // displayWindowSize: { type: Number },
  // numberOfCabins: { type: Number },
  // conferenceRoom: { type: Boolean },
  // loadingUnloadingArea: { type: Boolean },
  // ceilingHeight: { type: Number },
  // fireSafety: { type: Boolean },
  // accessForHeavyVehicles: { type: Boolean },

  // // Land/Plots
  // plotDimensions: { type: String },
  // zoningPermissions: [
  //   { type: String, enum: ["Residential", "Commercial", "Agricultural"] },
  // ],
  // roadFrontage: { type: Number },
  // soilType: { type: String },
  // waterSource: { type: String },
  // irrigationSystem: { type: String },

  // // Farmhouse & Holiday Home
  // greenAreaCoverage: { type: Number },
  // livestockFacilities: { type: Boolean },
  // recreationalFeatures: [
  //   {
  //     type: String,
  //     enum: ["Pool", "Garden", "Gym", "Jogging Track", "Tennis Court"],
  //   },
  // ],

  // status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

const Property = mongoose.model("Property", propertySchema);
export default Property;
