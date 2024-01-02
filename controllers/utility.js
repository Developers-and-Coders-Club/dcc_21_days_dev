import getDayNumber from "../utility/time.js";

async function handleGetDayNumber(req, res) {
    const dayNo = await getDayNumber();
    if(!dayNo) 
        return res.status(500).json({msg : "server error"});
    return res.status(200).json({dayNo : dayNo});
}

const utility = {
    handleGetDayNumber,
}

export default utility;