import { jwtDecode } from "jwt-decode";

// Function to decode the token
const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export { decodeToken };
