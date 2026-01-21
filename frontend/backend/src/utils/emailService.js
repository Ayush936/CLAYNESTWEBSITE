const nodemailer = require('nodemailer');

// Create transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Send order confirmation email
const sendOrderConfirmation = async (userEmail, orderDetails) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: 'Order Confirmation - ClayNest',
      html: `
        <h2>Thank you for your order!</h2>
        <p>Order ID: <strong>${orderDetails.orderId}</strong></p>
        <p>Total Amount: <strong>₹${orderDetails.total}</strong></p>
        <p>Items:</p>
        <ul>
          ${orderDetails.items.map(item => `<li>${item.name} x ${item.quantity}</li>`).join('')}
        </ul>
        <p>We will ship your order shortly. You can track it using your order ID.</p>
        <p>Contact us: <strong>+91 9369635323</strong></p>
        <p>Thank you for choosing ClayNest!</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent to:', userEmail);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

// Send product inquiry email to admin
const sendProductInquiry = async (customerName, customerEmail, message) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `New Product Inquiry from ${customerName}`,
      html: `
        <h2>New Product Inquiry</h2>
        <p>From: <strong>${customerName}</strong></p>
        <p>Email: <strong>${customerEmail}</strong></p>
        <p>Message:</p>
        <p>${message}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Product inquiry email sent to admin');
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

// Send welcome email to new user
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: 'Welcome to ClayNest!',
      html: `
        <h2>Welcome to ClayNest, ${userName}!</h2>
        <p>We're excited to have you join our community of ceramic art enthusiasts.</p>
        <p>Start exploring our handcrafted ceramic products today!</p>
        <p>Contact us: <strong>+91 9369635323</strong></p>
        <p>Happy shopping!</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', userEmail);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

module.exports = {
  sendOrderConfirmation,
  sendProductInquiry,
  sendWelcomeEmail
};
