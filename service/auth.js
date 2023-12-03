import jwt from "jsonwebtoken";
const secret = "JanKeBhiKyaKrLega";

function setUser(user) {
    return jwt.sign({
        username: user.username,
        email: user.email,
        enrollNo: user.enrollNo,
        role: user.role,
    }, process.env.ACCESS_TOKEN_SECRET || secret);
}

function getUser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || secret);
    }
    catch(error) {
        return null;
    }
}
const authService = {
    setUser, 
    getUser,
}
export default authService;