export const BASE_URL = "";
export const USERS_URL = "/api/users";
export const PRODUCTS_URL = "/api/products";
export const DEFAULT_IMAGE = "/images/placeholder.jpg";
export const UPLOADS_URL = "/api/upload";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";
export const CATEGORY_TYPES = ["toys", "treates", "holidays"];
export const SORT_TYPES = [
  { label: "Newest", value: "createdAt:desc" },
  { label: "Oldest", value: "createdAt:asc" },
  { label: "Price High to Low", value: "price:desc" },
  { label: "Price Low to High", value: "price:asc" },
];
export const PAGINATION_LIMIT = 8;
