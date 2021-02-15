const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customer/cartController");
const orderController = require("../app/http/controllers/customer/orderController");
const guest = require("../app/http/middlewares/guest");
const auth = require("../app/http/middlewares/auth");
const admin = require("../app/http/middlewares/admin");
const adminOrderController = require("../app/http/controllers/admin/orderController");
const statusController = require("../app/http/controllers/admin/statusController");

function initRoutes(app) {
  app.get("/", homeController().index);

  app.get("/login", guest, authController().login);
  app.post("/login", authController().postlogin);

  app.get("/register", guest, authController().register);
  app.post("/register", authController().postRegister);
  app.post("/logout", authController().logout);

  app.get("/cart", cartController().index);
  app.post("/updateCart", cartController().update);

  // customer routes
  app.post("/orders", auth, orderController().store);
  app.get("/customers/orders", auth, orderController().index);
  app.get("/customers/orders/:id", auth, orderController().show);

  // Admin routes   
  app.get("/admin/order", admin, adminOrderController().index);
  // app.get("/admin/order/status", admin, statusController().update);
  app.post("/admin/order/status", admin, statusController().update);
}
  
module.exports = initRoutes;
