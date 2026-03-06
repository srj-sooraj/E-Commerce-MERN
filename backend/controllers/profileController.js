import User from "../models/User.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user);
};

export const updateUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;   // ✅ ADD

  // ✅ Address update
  // user.address = {
  //   house: req.body.house || user.address?.house,
  //   street: req.body.street || user.address?.street,
  //   city: req.body.city || user.address?.city,
  //   state: req.body.state || user.address?.state,
  //   pincode: req.body.pincode || user.address?.pincode,
  // };

  if (req.file) {
    user.profilePic = `/uploads/${req.file.filename}`;
  }

  await user.save();

  res.json({
    message: "Profile updated",
    user,
  });
};


export const addAddress = async (req, res) => {
  const user = await User.findById(req.user._id);

  const newAddress = {
    house: req.body.house,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    isDefault: req.body.isDefault || false,
  };

  // if setting default → remove previous default
  if (newAddress.isDefault) {
    user.addresses.forEach(addr => addr.isDefault = false);
  }

  user.addresses.push(newAddress);
  await user.save();

  res.json(user);
};


export const deleteAddress = async (req, res) => {
  const user = await User.findById(req.user._id);

  user.addresses = user.addresses.filter(
    addr => addr._id.toString() !== req.params.id
  );

  await user.save();

  res.json(user);
};


export const setDefaultAddress = async (req, res) => {
  const user = await User.findById(req.user._id);

  user.addresses.forEach(addr => {
    addr.isDefault = addr._id.toString() === req.params.id;
  });

  await user.save();

  res.json(user);
};

