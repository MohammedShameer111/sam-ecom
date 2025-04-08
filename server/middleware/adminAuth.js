
import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized. Please login again." });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the role is "admin"
    if (token_decode.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Invalid token. Please login again." });
  }
};

export default adminAuth;
