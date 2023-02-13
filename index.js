const express = require("express");
const connection = require("./src/database/connection");
const { logger } = require("./src/config/logging");
const signUp = require("./src/routes/user/signUp");
const Login = require("./src/routes/user/Login");
const { getAllProducts } = require("./src/routes/Products/Products");
const { getAllCategories } = require("./src/routes/Products/Categories");
const { getCategoryProducts } = require("./src/routes/Products/Categories");
const { getProductById } = require("./src/routes/Products/Products");
const { createProduct } = require("./src/routes/Admin/createProduct");
const { createCategory } = require("./src/routes/Admin/createCategory");
const { getBanners } = require("./src/routes/user/Banners");
const {
  createSingleProductOrder,
  checkOutCart,
} = require("./src/routes/Orders/CreateOrder");
const {
  addToCart,
  getCartData,
  deleteFromCartQuery,
  increaseProductQuantity,

  checkProductExitsInCart,
} = require("./src/routes/user/UpdateCart");

const checkPhoneNumber = require("./src/routes/user/checkPhoneNumber");
const {
  getUserAddress,
  addAddress,
  deleteAddress,
  updateAddress,
} = require("./src/routes/user/Address");
const {
  getMarketingUsers,
  makeMarketingUser,
  removeMarketingUser,
} = require("./src/routes/Admin/marketingUser");
const { verifyPayment } = require("./src/routes/Payment/verifyPayment");
const {
  getUserProfile,
  updateUserProfile,
  updateProfilePic,
  updateName,
  updatePhoneNumber,
} = require("./src/routes/user/Profile");
const {
  getPreferableProducts,
} = require("./src/routes/user/PreferableProducts");
const { getUserOrders } = require("./src/routes/Orders/Orders");
const {
  addToWishlist,
  checkProductExitsInWishlist,
  getWishlist,
  getWishlistData,
  removeFromWishlist,
} = require("./src/routes/user/Wishlist");
const { getAllCoupons, validateCoupon } = require("./src/routes/user/coupons");
const { registerDeviceToken } = require("./src/routes/user/Notification");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send('<iframe src="http://bahurani.online"></iframe>');
});
app.use(updateAddress);
app.use(getMarketingUsers);
app.use(addToWishlist);
app.use(removeFromWishlist);
app.use(getWishlist);
app.use(validateCoupon);
app.use(checkProductExitsInWishlist);
app.use(getPreferableProducts);
app.use(registerDeviceToken);
app.use(increaseProductQuantity);
app.use(makeMarketingUser);
app.use(addToCart);
app.use(getWishlistData);
app.use(updateProfilePic);
app.use(updateName);
app.use(getAllCoupons);
app.use(updatePhoneNumber);
app.use(deleteAddress);
app.use(getUserOrders);
app.use(verifyPayment);
app.use(deleteFromCartQuery);
app.use(removeMarketingUser);
app.use(getBanners);
app.use(getAllProducts);
app.use(getUserProfile);
app.use(updateUserProfile);
app.use(getAllCategories);
app.use(checkProductExitsInCart);
app.use(getProductById);
app.use(getCartData);
app.use(getCategoryProducts);
app.use(createCategory);
app.use(signUp);
app.use(Login);
app.use(createSingleProductOrder);
app.use(createProduct);
app.use(checkPhoneNumber);
app.use(getUserAddress);
app.use(addAddress);
app.use(checkOutCart);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  logger.info(`Bahurani Backend Hosted on port ${PORT}`);
});
