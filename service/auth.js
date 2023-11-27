import jwt from "jsonwebtoken";
const secret = "JanKeBhiKyaHekrLega";

function setUser(user) {
    return jwt.sign({
        username: user.username,
        email: user.email,
        enrollNo: user.enrollNo,
        role: user.role,
    }, secret);
}

function getUser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
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