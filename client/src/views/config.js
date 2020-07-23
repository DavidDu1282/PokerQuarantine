export const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://poker-quarantine.herokuapp.com"
    : "http://localhost:3001";
