async function handleUserLogin(req, res) {
    return res.json({msg : "login"});
}

async function handleUserSignUp(req, res) {
    return res.json({msg : "signup"});
}

const func = {
    handleUserLogin,
    handleUserSignUp,
}

export default func;