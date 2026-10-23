const rateLimit = require("express-rate-limit");

// Limiter สำหรับ Auth/Login (5 ครั้งต่อ 15 นาที / โหมด test ให้เป็น 1000)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "test" ? 1000 : 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error: {
      code: "TOO_MANY_REQUESTS",
      message: "พยายามเข้าสู่ระบบเกินจำนวนที่กำหนด กรุณาลองใหม่ภายหลัง",
    },
  },
});

// Limiter สำหรับ API ทั่วไป (100 ครั้งต่อ 1 นาที / โหมด test ให้เป็น 1000)
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: process.env.NODE_ENV === "test" ? 1000 : 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

module.exports = { authLimiter, generalLimiter };
