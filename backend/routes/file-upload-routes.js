const router = require("express").Router();
const supabase = require("../client.js");
const { convert } = require("pdf-img-convert");
const { v4: uuidv4 } = require("uuid");

router.post("/upload", async (req, res) => {
  let result = await uploadFile(req.files.attachmentFile, req.body.userId);
  res.send(result);
});

const convertFile = async (file) => {
  const pdfArray = await convert(file, {
    page_numbers: [1],
    base64: true,
  });
  const pdfBuffer = Buffer.from(pdfArray[0], "base64");
  console.log("ACTUAL PDF BUFFER", pdfBuffer);
  return pdfBuffer;
};

const uploadFile = async (file, userId) => {
  let { data: fileData, mimetype } = file;
  if (mimetype == "application/pdf") {
    fileData = await convertFile(fileData);
  }
  const cdnExtension = userId + "/" + uuidv4();

  let { data, error } = await supabase.storage
    .from("images")
    .upload(cdnExtension, fileData);

  if (data) {
    return {
      success: true,
      cdnUrl: process.env.VITE_SUPABASE_BASE_CDN_URL + cdnExtension,
      error: "",
    };
  } else {
    return {
      success: false,
      cdnUrl: "",
      error: error,
    };
  }
};
module.exports = router;
