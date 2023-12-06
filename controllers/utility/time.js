function getDayNumber(req, res) {
  const target = new Date("2023-12-05T00:00:00Z");
  const todayIstMil =
    new Date().getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
  const todayIst = new Date(todayIstMil);
  const daysDifference = Math.floor(
    (todayIst - target) / (1000 * 60 * 60 * 24)
  );
  return res.status(200).json({ dayNo: daysDifference + 1});
}

export default getDayNumber;
