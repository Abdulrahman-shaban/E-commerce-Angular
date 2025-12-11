// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AddressSchema = new mongoose.Schema({
  label: { type: String }, // e.g., "Home", "Work"
  governorate: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  building: { type: String },
  floor: { type: String },
  apartment: { type: String },
  additional: { type: String }, // notes, landmarks
  phone: { type: String }, // optional alternate phone for this address
  isDefault: { type: Boolean, default: false }
}, { _id: true });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  mobile: { type: String, required: true, trim: true },
  role: { type: String, enum: ['client', 'admin'], default: 'client' },
  blocked: { type: Boolean, default: false },
  addresses: { type: [AddressSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// HASH password before save (only when modified)
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  this.updatedAt = Date.now();
  next();
});

// Ensure at most one default address. If multiple set isDefault, keep the last true.
UserSchema.pre('save', function (next) {
  if (this.addresses && this.addresses.length > 0) {
    let defaultCount = 0;
    for (let i = 0; i < this.addresses.length; i++) {
      if (this.addresses[i].isDefault) defaultCount++;
    }
    if (defaultCount > 1) {
      // keep only the last one marked true, set others false
      let seen = false;
      for (let i = this.addresses.length - 1; i >= 0; i--) {
        if (this.addresses[i].isDefault && !seen) {
          seen = true;
        } else {
          this.addresses[i].isDefault = false;
        }
      }
    } else if (defaultCount === 0) {
      // if no default, set the first address as default (optional behaviour)
      if (this.addresses.length > 0) this.addresses[0].isDefault = true;
    }
  }
  next();
});

// Compare plaintext password with hashed password
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Add an address and optionally make it default
UserSchema.methods.addAddress = function (addressObj = {}, makeDefault = false) {
  if (makeDefault) {
    // mark all other addresses non-default
    this.addresses.forEach(addr => (addr.isDefault = false));
  }
  this.addresses.push(addressObj);
  // if no addresses were defaulted, pre-save hook will ensure one default
  return this.save();
};

// Set an existing address as default by address _id
UserSchema.methods.setDefaultAddress = function (addressId) {
  let found = false;
  this.addresses.forEach(addr => {
    if (addr._id.toString() === addressId.toString()) {
      addr.isDefault = true;
      found = true;
    } else {
      addr.isDefault = false;
    }
  });
  if (!found) throw new Error('Address not found');
  return this.save();
};

// Remove address by id
UserSchema.methods.removeAddress = function (addressId) {
  this.addresses = this.addresses.filter(addr => addr._id.toString() !== addressId.toString());
  // ensure there's still a default if addresses remain
  if (this.addresses.length > 0 && !this.addresses.some(a => a.isDefault)) {
    this.addresses[0].isDefault = true;
  }
  return this.save();
};

// Block / unblock helpers
UserSchema.methods.block = function () {
  this.blocked = true;
  return this.save();
};
UserSchema.methods.unblock = function () {
  this.blocked = false;
  return this.save();
};

// Indexes
UserSchema.index({ email: 1 });

// Export model
module.exports = mongoose.model('User', UserSchema);
