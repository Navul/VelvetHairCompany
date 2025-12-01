const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Send email
const sendEmail = async (options) => {
  const transporter = createTransporter();

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.html || options.message
  };

  const info = await transporter.sendMail(message);
  console.log('Email sent:', info.messageId);
  return info;
};

// Send welcome email
const sendWelcomeEmail = async (user) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #8B5CF6;">Welcome to Velvet Hair Wigs!</h1>
      <p>Hi ${user.firstName},</p>
      <p>Thank you for joining Velvet Hair Company! We're excited to have you as part of our community.</p>
      <p>Discover our premium collection of wigs and hair extensions designed to make you look and feel your best.</p>
      <a href="${process.env.FRONTEND_URL}/products" style="background-color: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 20px;">Shop Now</a>
      <p style="margin-top: 30px;">Best regards,<br>The Velvet Hair Team</p>
    </div>
  `;

  return sendEmail({
    email: user.email,
    subject: 'Welcome to Velvet Hair Company!',
    html
  });
};

// Send order confirmation email
const sendOrderConfirmationEmail = async (user, order) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #8B5CF6;">Order Confirmation</h1>
      <p>Hi ${user.firstName},</p>
      <p>Thank you for your order! Your order #${order.orderNumber} has been confirmed.</p>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Order Details:</h3>
        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
        <p><strong>Total Amount:</strong> $${order.pricing.totalPrice.toFixed(2)}</p>
        <p><strong>Status:</strong> ${order.orderStatus}</p>
      </div>
      <p>We'll send you another email when your order ships.</p>
      <a href="${process.env.FRONTEND_URL}/orders/${order._id}" style="background-color: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 20px;">View Order</a>
      <p style="margin-top: 30px;">Best regards,<br>The Velvet Hair Team</p>
    </div>
  `;

  return sendEmail({
    email: user.email,
    subject: `Order Confirmation - ${order.orderNumber}`,
    html
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendOrderConfirmationEmail
};