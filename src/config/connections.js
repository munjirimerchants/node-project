const connections = {
  server: "http://localhost:3001",
};

const endpoints = {
  login: "/api/users/login",
  register: "/api/users/register",
  usersByUserID: "/api/users",
  users: "/api/users",
  machineproducts: "/api/machineproducts",
  machineproductsBySlug: "/api/machineproducts/bySlug",
  brickproducts: "/api/brickproducts",
  brickproductsBySlug: "/api/brickproducts/bySlug",
  enquiries: "/api/enquiries",
  enquiriesByUserID: "/api/enquiries/users",
  enquiriesEnquire: "/api/enquiries/enquire",
  enquiriesEnquireAuthenticated: "/api/enquiries/enquire-authenticated",
  brickorders: "/api/brickorders",
  brickordersByUserID: "/api/brickorders/users",
  brickordersOrder: "/api/brickorders/order",
  brickordersOrderAuthenticated: "/api/brickorders/order-authenticated",
  brickordersOrderAndRegister: "/api/brickorders/register-and-order",
  adminRegister: "/api/admins/register",
  adminIsAdmin: "/api/admins/isAdmin",
};

//CommentForm has a special api point that might need manual changes

export { connections, endpoints };
