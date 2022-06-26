const jwt = require("jsonwebtoken");

exports.checkTokenQueryParam = (token) => {
  console.log("token:"+token)
  token = token && token.split(" ")[1];
  console.log("token sem bearer:"+token)
  if (!token) {
    return false
  }
  try {
    const secret = process.env.SECRET;
    const res = jwt.verify(token, secret);
    return res.id 
  } catch (err) {
    return false
  }
};
