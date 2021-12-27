import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "selimhalim12@gmail.com",
    pass: "nooirygeqmwwthme",
  },
});
export default transporter;
