export const uploadImage = (req, res) => {
  if (!req.file) {
    const error = new Error("No file uploaded");
    error.statusCode = 400;
    return next(error);
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ success: true, imageUrl });
};
