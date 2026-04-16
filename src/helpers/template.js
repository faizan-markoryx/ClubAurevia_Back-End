module.exports = {

  membershipWelcomeLetter: (
    name,
    email,
    phone,
    membershipName,
    membershipPrice,
    memberId
  ) => `

<div style="font-family:'Poppins',Arial,sans-serif;background:#F4F4F4;padding:30px">

  <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden">

    <header style="background:#16302C;color:#E0E1E0;padding:25px;text-align:center">
      <h1 style="margin:0; color: #FFFFFF">Welcome to Club Aurevia</h1>
      <p style="margin-top:5px;font-size:14px;color: #FFFFFF">
        Your Membership Has Been Successfully Activated
      </p>
    </header>

    <div style="padding:30px;color:#333;line-height:1.6">

      <p>Hello <strong>${name}</strong>,</p>

      <p>
        Congratulations and welcome to <strong>Club Aurevia</strong>.
        We are delighted to have you as a valued member of our premium
        travel and lifestyle community.
      </p>

      <p>
        Below are your membership details:
      </p>

      <div style="background:#F4F4F4;border-radius:8px;padding:20px;margin:25px 0">

        <table style="width:100%;font-size:14px">

          <tr>
            <td style="padding:6px 0"><strong>Name</strong></td>
            <td>${name}</td>
          </tr>

          <tr>
            <td style="padding:6px 0"><strong>Email</strong></td>
            <td>${email}</td>
          </tr>

          <tr>
            <td style="padding:6px 0"><strong>Phone</strong></td>
            <td>${phone}</td>
          </tr>

          <tr>
            <td style="padding:6px 0"><strong>Membership</strong></td>
            <td>${membershipName}</td>
          </tr>

          <tr>
            <td style="padding:6px 0"><strong>Membership Price</strong></td>
            <td>${membershipPrice}</td>
          </tr>

          <tr>
            <td style="padding:6px 0"><strong>Membership ID</strong></td>
            <td style="color:#16302C;font-weight:bold">${memberId}</td>
          </tr>

        </table>

      </div>

      <p>
        You can log in to your account using your
        <strong>Membership ID</strong> and the
        <strong>password you created during registration</strong>.
      </p>

      <div style="text-align:center;margin:30px 0">

        <a href="https://clubaurevia.com/login"
        style="
        background:#16302C;
        color:#ffffff;
        padding:12px 25px;
        border-radius:6px;
        text-decoration:none;
        font-weight:500;
        display:inline-block
        ">
        Login To Your Account
        </a>

      </div>

      <p>
        If you have any questions or need assistance,
        our support team will always be happy to help you.
      </p>

      <p style="margin-top:25px">
        Warm Regards,<br>
        <strong>Club Aurevia Team</strong>
      </p>

    </div>

    <footer style="background:#16302C;color: #FFFFFF;text-align:center;padding:20px;font-size:13px">

      <p style="margin:0">
        © 2016 Club Aurevia
      </p>

      <p style="margin-top:5px">
        Luxury Travel Membership Experience
      </p>

    </footer>

  </div>

</div>

  `,

  verifyOtp: (userName, otp) => `

<div style="font-family:'Poppins',Arial,sans-serif;background:#F4F4F4;padding:30px">

  <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden">

    <header style="background:#16302C;color:#E0E1E0;padding:25px;text-align:center">
      <h1 style="margin:0; color: #FFFFFF">Email Verification</h1>
      <p style="margin-top:5px;font-size:14px;color: #FFFFFF">
        Your Membership Has Been Successfully Activated
      </p>
    </header>

    <div style="padding:30px;color:#333;line-height:1.6">

      <p>Hello <strong>${userName}</strong>,</p>

      <p>
        Thank you for registering with us. Please use the OTP below
        to verify your email address.
      </p>

      <div style="text-align:center;margin:30px 0">
        <span style="
          display:inline-block;
          background:#F4F4F4;
          padding:15px 25px;
          font-size:22px;
          font-weight:bold;
          letter-spacing:3px;
          border-radius:8px;
          color:#16302C
        ">
          ${otp}
        </span>
      </div>

      <p>
        This OTP is valid for <strong>2 minutes</strong>.
        If you did not request this, please ignore this email.
      </p>

      <p style="margin-top:25px">
        Warm Regards,<br>
        <strong>Club Aurevia Team</strong>
      </p>

    </div>

    <footer style="background:#16302C;color: #FFFFFF;text-align:center;padding:20px;font-size:13px">

      <p style="margin:0">
        © 2016 Club Aurevia
      </p>

      <p style="margin-top:5px">
        Luxury Travel Membership Experience
      </p>

    </footer>

  </div>

</div>

  `,

  registerSuccess: (name) => `

<div style="font-family:'Poppins',Arial,sans-serif;background:#F4F4F4;padding:30px">
  <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden">

    <header style="background:#16302C;color:#E0E1E0;padding:25px;text-align:center">
      <h1 style="margin:0; color: #FFFFFF">Welcome to Club Aurevia</h1>
      <p style="margin-top:5px;font-size:14px;color: #FFFFFF">
        Welcome to Our Platform, Club Aurevia
      </p>
    </header>

    <div style="padding:30px;color:#333;line-height:1.6">
      <p>Hello <strong>${name}</strong>,</p>

      <p>We are excited to have you on board. Your account has been successfully created.</p>
      <p>You can now enjoy all features of our platform. If you have any questions, feel free to contact us.</p>

      <p style="margin-top:25px">
        Warm Regards,<br>
        <strong>Club Aurevia Team</strong>
      </p>
    </div>

    <footer style="background:#16302C;color: #FFFFFF;text-align:center;padding:20px;font-size:13px">

      <p style="margin:0">
        © 2016 Club Aurevia
      </p>

      <p style="margin-top:5px">
        Luxury Travel Membership Experience
      </p>

    </footer>
  </div>
</div>

`,

  resetPassword: (link) => `

<div style="font-family:'Poppins',Arial,sans-serif;background:#F4F4F4;padding:30px">
  <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden">

    <header style="background:#16302C;color:#E0E1E0;padding:25px;text-align:center">
      <h1 style="margin:0; color: #FFFFFF">Welcome to Club Aurevia</h1>
      <p style="margin-top:5px;font-size:14px;color: #FFFFFF">
        Reset Your Password
      </p>
    </header>

    <div style="padding:30px;color:#333;line-height:1.6">
      <p>Hello,</p>

      <p>We received a request to reset your password. Click below to continue:</p>

      <div style="text-align:center;margin:30px 0">
        <a href="${link}" style="background:#16302C;color:#fff;padding:12px 25px;border-radius:6px;text-decoration:none;display:inline-block">
          Reset Password
        </a>
      </div>

      <p>If you did not request this, please ignore this email.</p>

      <p style="margin-top:25px">
        Warm Regards,<br>
        <strong>Club Aurevia Team</strong>
      </p>
    </div>

    <footer style="background:#16302C;color: #FFFFFF;text-align:center;padding:20px;font-size:13px">

      <p style="margin:0">
        © 2016 Club Aurevia
      </p>

      <p style="margin-top:5px">
        Luxury Travel Membership Experience
      </p>

    </footer>
  </div>
</div>

`,

  resetPasswordSuccess: (name) => `

<div style="font-family:'Poppins',Arial,sans-serif;background:#F4F4F4;padding:30px">
  <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden">

    <header style="background:#16302C;color:#E0E1E0;padding:25px;text-align:center">
      <h1 style="margin:0; color: #FFFFFF">Welcome to Club Aurevia</h1>
      <p style="margin-top:5px;font-size:14px;color: #FFFFFF">
        Password Reset Successful
      </p>
    </header>

    <div style="padding:30px;color:#333;line-height:1.6">
      <p>Hello <strong>${name}</strong>,</p>

      <p>Your password has been successfully reset. You can now login using your new password.</p>
      <p>If this wasn't you, please contact support immediately.</p>

      <p style="margin-top:25px">
        Warm Regards,<br>
        <strong>Club Aurevia Team</strong>
      </p>
    </div>

    <footer style="background:#16302C;color: #FFFFFF;text-align:center;padding:20px;font-size:13px">

      <p style="margin:0">
        © 2016 Club Aurevia
      </p>

      <p style="margin-top:5px">
        Luxury Travel Membership Experience
      </p>

    </footer>
  </div>
</div>

`,

  forgotPassword: (otp) => `

<div style="font-family:'Poppins',Arial,sans-serif;background:#F4F4F4;padding:30px">
  <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden">

    <header style="background:#16302C;color:#E0E1E0;padding:25px;text-align:center">
      <h1 style="margin:0; color: #FFFFFF">Welcome to Club Aurevia</h1>
      <p style="margin-top:5px;font-size:14px;color: #FFFFFF">
        Forgot Password
      </p>
    </header>

    <div style="padding:30px;color:#333;line-height:1.6">
      <p>Hello,</p>

      <p>Use the OTP below to reset your password:</p>

      <div style="text-align:center;margin:30px 0">
        <span style="background:#F4F4F4;padding:15px 25px;font-size:22px;font-weight:bold;border-radius:8px;color:#16302C">
          ${otp}
        </span>
      </div>

      <p>This OTP will expire in 10 minutes.</p>

      <p style="margin-top:25px">
        Warm Regards,<br>
        <strong>Club Aurevia Team</strong>
      </p>
    </div>

    <footer style="background:#16302C;color: #FFFFFF;text-align:center;padding:20px;font-size:13px">

      <p style="margin:0">
        © 2016 Club Aurevia
      </p>

      <p style="margin-top:5px">
        Luxury Travel Membership Experience
      </p>

    </footer>
  </div>
</div>

`,



  //   createOrder: (orderId, orderDetails) => `
  //       <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  //         <header style="text-align: center; padding: 20px;">
  //           <img src="https://rinoxtools.com/images/RinoxToolsLogo.png" alt="Rinox Tools" style="max-width: 80px;" />
  //         </header>
  //         <h1 style="color: #4CAF50;">Order Confirmation</h1>
  //         <p>Hello,</p>
  //         <p>Thank you for your order. Your order number is <strong>#${orderId}</strong>. Here are the details of your order:</p>
  //         <p>${orderDetails}</p>

  //         <footer style="margin-top: 30px; text-align: center;">
  //           <p>Best regards,<br />Rinox Tools</p>
  //           <p>Follow us:</p>
  //            <p>
  //             <a href="https://www.facebook.com/share/1AEX82fZxm/" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" style="width: 24px; height: 24px;" />
  //             </a>
  //             <a href="https://twitter.com/yourcompany" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" style="width: 24px; height: 24px;" />
  //             </a>
  //             <a href="https://www.instagram.com/rinoxtools?igsh=YjVpZDFrZGw4bHJ0" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width: 24px; height: 24px;" />
  //             </a>
  //           </p>
  //           <p>For support, email us at: <a href="mailto: rinoxtools@outlook.com"> rinoxtools@outlook.com</a></p>
  //           <p> Gf-09, Block D1, Sumel-10 Phase-2, M.H. Mill Compound,
  //               <br />
  //               Saraspur, Opp. Saraspur ITI Ahmedabad 380018</p>
  //         </footer>
  //       </div>
  //     `,

  //   paymentSuccess: (user, order) => `
  //   <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  //     <header style="text-align: center; padding: 20px;">
  //       <img src="https://rinoxtools.com/images/RinoxToolsLogo.png" alt="Rinox Tools" style="max-width: 80px;" />
  //     </header>
  //     <h1 style="color: #4CAF50;">Payment Successful!</h1>
  //     <p>Dear ${user.userName},</p>
  //     <p>Thank you for your payment. We have successfully processed your transaction.</p>
  //     <table style="margin: 20px auto; border-collapse: collapse; width: 100%; max-width: 600px; border: 1px solid #ddd;">
  //       <tr style="background-color: #f9f9f9;">
  //         <td style="padding: 10px; font-weight: bold;">Order ID:</td>
  //         <td style="padding: 10px;">${order._id}</td>
  //       </tr>
  //       <tr>
  //         <td style="padding: 10px; font-weight: bold;">Amount Paid:</td>
  //         <td style="padding: 10px;">$${order.totalAmount}</td>
  //       </tr>
  //       <tr style="background-color: #f9f9f9;">
  //         <td style="padding: 10px; font-weight: bold;">Date:</td>
  //         <td style="padding: 10px;">${order.orderDate}</td>
  //       </tr>
  //     </table>
  //     <p>If you have any questions or concerns regarding your payment, feel free to contact our support team.</p>
  //     <footer style="margin-top: 30px; text-align: center;">
  //       <p>Best regards,<br />Rinox Tools</p>
  //       <p>Follow us:</p>
  //        <p>
  //             <a href="https://www.facebook.com/share/1AEX82fZxm/" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" style="width: 24px; height: 24px;" />
  //             </a>
  //             <a href="https://twitter.com/yourcompany" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" style="width: 24px; height: 24px;" />
  //             </a>
  //             <a href="https://www.instagram.com/rinoxtools?igsh=YjVpZDFrZGw4bHJ0" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width: 24px; height: 24px;" />
  //             </a>
  //           </p>
  //       <p>For support, email us at: <a href="mailto: rinoxtools@outlook.com">rinoxtools@outlook.com</a></p>
  //       <p> Gf-09, Block D1, Sumel-10 Phase-2, M.H. Mill Compound,
  //               <br />
  //               Saraspur, Opp. Saraspur ITI Ahmedabad 380018</p>
  //     </footer>
  //   </div>
  // `,
  //   paymentFailed: (user, order) => `
  //   <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  //     <header style="text-align: center; padding: 20px;">
  //       <img src="https://rinoxtools.com/images/RinoxToolsLogo.png" alt="Rinox Tools" style="max-width: 80px;" />
  //     </header>
  //     <h1 style="color: #FF0000;">Payment Failed</h1>
  //     <p>Dear ${user.userName},</p>
  //     <p>We regret to inform you that your recent payment attempt was unsuccessful. Please find the details below:</p>
  //     <table style="margin: 20px auto; border-collapse: collapse; width: 100%; max-width: 600px; border: 1px solid #ddd;">
  //       <tr style="background-color: #f9f9f9;">
  //         <td style="padding: 10px; font-weight: bold;">Order ID:</td>
  //         <td style="padding: 10px;">${order._id}</td>
  //       </tr>
  //       <tr>
  //         <td style="padding: 10px; font-weight: bold;">Amount:</td>
  //         <td style="padding: 10px;">$${order.totalAmount}</td>
  //       </tr>
  //       <tr style="background-color: #f9f9f9;">
  //         <td style="padding: 10px; font-weight: bold;">Date:</td>
  //         <td style="padding: 10px;">${order.orderDate}</td>
  //       </tr>
  //     </table>
  //     <p>This could be due to insufficient funds, incorrect payment details, or a technical issue. We recommend the following actions:</p>
  //     <ul style="margin-left: 20px;">
  //       <li>Verify your payment details and try again.</li>
  //       <li>Contact your bank to ensure there are no issues with your account.</li>
  //       <li>Try using a different payment method.</li>
  //     </ul>
  //     <p>If you continue to experience issues, please contact our support team for assistance.</p>
  //     <footer style="margin-top: 30px; text-align: center;">
  //       <p>Best regards,<br />Rinox Tools</p>
  //       <p>Follow us:</p>
  //        <p>
  //             <a href="https://www.facebook.com/share/1AEX82fZxm/" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" style="width: 24px; height: 24px;" />
  //             </a>
  //             <a href="https://twitter.com/yourcompany" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" style="width: 24px; height: 24px;" />
  //             </a>
  //             <a href="https://www.instagram.com/rinoxtools?igsh=YjVpZDFrZGw4bHJ0" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width: 24px; height: 24px;" />
  //             </a>
  //           </p>
  //       <p>For support, email us at: <a href="mailto: rinoxtools@outlook.com">rinoxtools@outlook.com</a></p>
  //       <p> Gf-09, Block D1, Sumel-10 Phase-2, M.H. Mill Compound,
  //               <br />
  //               Saraspur, Opp. Saraspur ITI Ahmedabad 380018</p>
  //     </footer>
  //   </div>
  // `,
  //   createOrder: (user, order) => `
  //   <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  //     <header style="text-align: center; padding: 20px;">
  //       <img src="https://rinoxtools.com/images/RinoxToolsLogo.png" alt="Rinox Tools" style="max-width: 80px;" />
  //     </header>
  //     <h1 style="color: #4CAF50;">Order Confirmation</h1>
  //     <p>Dear ${user.userName},</p> 
  //     <p>Thank you for your purchase! Your order has been successfully placed. Below are your order details:</p>
  //     <table style="margin: 20px auto; border-collapse: collapse; width: 100%; max-width: 600px; border: 1px solid #ddd;">
  //       <tr style="background-color: #f9f9f9;">
  //         <td style="padding: 10px; font-weight: bold;">Order ID:</td>
  //         <td style="padding: 10px;">${order._id}</td>
  //       </tr>
  //       <tr>
  //         <td style="padding: 10px; font-weight: bold;">Order Date:</td>
  //         <td style="padding: 10px;">${order.orderDate}</td>
  //       </tr>
  //       <tr style="background-color: #f9f9f9;">
  //         <td style="padding: 10px; font-weight: bold;">Total Amount:</td>
  //         <td style="padding: 10px;">$${order.totalAmount}</td>
  //       </tr>
  //     </table>
  //     <h2 style="margin-top: 20px;">Products Ordered:</h2>
  //     <table style="margin: 20px auto; border-collapse: collapse; width: 100%; max-width: 600px; border: 1px solid #ddd;">
  //       <thead>
  //         <tr style="background-color: #f1f1f1;">
  //           <th style="padding: 10px; text-align: left;">Product</th>
  //           <th style="padding: 10px; text-align: left;">Quantity</th>
  //           <th style="padding: 10px; text-align: left;">Price</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         ${order.cartItems
  //       .map(
  //         (product) => `
  //           <tr>
  //             <td style="padding: 10px;">${product.title}</td>
  //             <td style="padding: 10px;">${product.quantity}</td>
  //             <td style="padding: 10px;">$${product.price}</td>
  //           </tr>
  //         `
  //       )
  //       .join("")}
  //       </tbody>
  //     </table>
  //     <p>Your order is being processed and will be delivered within <strong>7 working days</strong>.</p>
  //     <p>If you have any questions, please contact our support team.</p>
  //     <footer style="margin-top: 30px; text-align: center;">
  //       <p>Best regards,<br />Rinox Tools</p>
  //       <p>Follow us:</p>
  //        <p>
  //             <a href="https://www.facebook.com/share/1AEX82fZxm/" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" style="width: 24px; height: 24px;" />
  //             </a>
  //             <a href="https://twitter.com/yourcompany" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" style="width: 24px; height: 24px;" />
  //             </a>
  //             <a href="https://www.instagram.com/rinoxtools?igsh=YjVpZDFrZGw4bHJ0" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width: 24px; height: 24px;" />
  //             </a>
  //           </p>
  //       <p>For support, email us at: <a href="mailto:support@yourcompany.com">support@yourcompany.com</a></p>
  //       <p>1234 Your Street, Your City, Your Country</p>
  //     </footer>
  //   </div>
  // `,
  //   deliveredOrder: (user, order) => `
  //   <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  //     <header style="text-align: center; padding: 20px;">
  //       <img src="https://rinoxtools.com/images/RinoxToolsLogo.png" alt="Rinox Tools" style="max-width: 80px;" />
  //     </header>
  //     <h1 style="color: #4CAF50;">Order Delivered</h1>
  //     <p>Dear ${user.userName},</p>
  //     <p>We are delighted to inform you that your order has been successfully delivered on <strong>${`your location`}</strong>. Below are the details of your order:</p>
  //     <table style="margin: 20px auto; border-collapse: collapse; width: 100%; max-width: 600px; border: 1px solid #ddd;">
  //       <tr style="background-color: #f9f9f9;">
  //         <td style="padding: 10px; font-weight: bold;">Order ID:</td>
  //         <td style="padding: 10px;">${order._id}</td>
  //       </tr>
  //       <tr>
  //         <td style="padding: 10px; font-weight: bold;">Ordered Date:</td>
  //         <td style="padding: 10px;">${order.orderDate}</td>
  //       </tr>
  //     </table>
  //     <h2 style="margin-top: 20px;">Products Delivered:</h2>
  //     <table style="margin: 20px auto; border-collapse: collapse; width: 100%; max-width: 600px; border: 1px solid #ddd;">
  //       <thead>
  //         <tr style="background-color: #f1f1f1;">
  //           <th style="padding: 10px; text-align: left;">Product</th>
  //           <th style="padding: 10px; text-align: left;">Quantity</th>
  //           <th style="padding: 10px; text-align: left;">Price</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         ${order.cartItems
  //       .map(
  //         (product) => `
  //           <tr>
  //             <td style="padding: 10px;">${product.title}</td>
  //             <td style="padding: 10px;">${product.quantity}</td>
  //             <td style="padding: 10px;">$${product.price}</td>
  //           </tr>
  //         `
  //       )
  //       .join("")}
  //       </tbody>
  //     </table>
  //     <p>We hope you are satisfied with your purchase! If you have any questions or need further assistance, please do not hesitate to contact us.</p>
  //     <p>Thank you for shopping with us!</p>
  //     <footer style="margin-top: 30px; text-align: center;">
  //       <p>Best regards,<br />Rinox Tools</p>
  //       <p>Follow us:</p>
  //        <p>
  //             <a href="https://www.facebook.com/share/1AEX82fZxm/" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" style="width: 24px; height: 24px;" />
  //             </a>
  //             <a href="https://twitter.com/yourcompany" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" style="width: 24px; height: 24px;" />
  //             </a>
  //             <a href="https://www.instagram.com/rinoxtools?igsh=YjVpZDFrZGw4bHJ0" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width: 24px; height: 24px;" />
  //             </a>
  //           </p>
  //      <p>For support, email us at: <a href="mailto: rinoxtools@outlook.com">rinoxtools@outlook.com</a></p>
  //       <p> Gf-09, Block D1, Sumel-10 Phase-2, M.H. Mill Compound,
  //               <br />
  //               Saraspur, Opp. Saraspur ITI Ahmedabad 380018</p>
  //     </footer>
  //   </div>
  // `,
  //   dueOrderReminder: (user, order) => `
  //   <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  //     <header style="text-align: center; padding: 20px;">
  //       <img src="https://rinoxtools.com/images/RinoxToolsLogo.png" alt="Rinox Tools" style="max-width: 80px;" />
  //     </header>
  //     <h1 style="color: #FF9800;">Payment Due Reminder</h1>
  //     <p>Dear ${user.userName},</p>
  //     <p>We hope this message finds you well. This is a gentle reminder that your payment for the order placed on <strong>${order.orderDate
  //     }</strong> is still due.</p>

  //     <table style="margin: 20px auto; border-collapse: collapse; width: 100%; max-width: 600px; border: 1px solid #ddd;">
  //       <tr style="background-color: #f9f9f9;">
  //         <td style="padding: 10px; font-weight: bold;">Order ID:</td>
  //         <td style="padding: 10px;">${order._id}</td>
  //       </tr>
  //       <tr>
  //         <td style="padding: 10px; font-weight: bold;">Total Amount Due:</td>
  //         <td style="padding: 10px; color: #D32F2F; font-weight: bold;">$${order.totalAmount
  //     }</td>
  //       </tr>
  //       <tr>
  //         <td style="padding: 10px; font-weight: bold;">Due Date:</td>
  //         <td style="padding: 10px; color: #D32F2F; font-weight: bold;">${order.orderDate
  //     }</td>
  //       </tr>
  //     </table>

  //     <h2 style="margin-top: 20px;">Order Summary:</h2>
  //     <table style="margin: 20px auto; border-collapse: collapse; width: 100%; max-width: 600px; border: 1px solid #ddd;">
  //       <thead>
  //         <tr style="background-color: #f1f1f1;">
  //           <th style="padding: 10px; text-align: left;">Product</th>
  //           <th style="padding: 10px; text-align: left;">Quantity</th>
  //           <th style="padding: 10px; text-align: left;">Price</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         ${order.cartItems
  //       .map(
  //         (product) => `
  //           <tr>
  //             <td style="padding: 10px;">${product.title}</td>
  //             <td style="padding: 10px;">${product.quantity}</td>
  //             <td style="padding: 10px;">$${product.price}</td>
  //           </tr>
  //         `
  //       )
  //       .join("")}
  //       </tbody>
  //     </table>

  //     <p>We kindly request you to complete the payment at your earliest convenience to avoid any service disruptions.</p>

  //     <p style="text-align: center; margin-top: 20px;">
  //       <a href="https://yourpaymentlink.com" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 5px;">Pay Now</a>
  //     </p>

  //     <p>If you have already made the payment, please disregard this message. Should you have any questions or require assistance, feel free to contact us.</p>

  //     <footer style="margin-top: 30px; text-align: center;">
  //       <p>Best regards,<br />Rinox Tools</p>
  //       <p>Follow us:</p>
  //        <p>
  //             <a href="https://www.facebook.com/share/1AEX82fZxm/" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" style="width: 24px; height: 24px;" />
  //             </a>
  //             <a href="https://twitter.com/yourcompany" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" style="width: 24px; height: 24px;" />
  //             </a>
  //             <a href="https://www.instagram.com/rinoxtools?igsh=YjVpZDFrZGw4bHJ0" target="_blank" style="margin-right: 10px;">
  //               <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width: 24px; height: 24px;" />
  //             </a>
  //           </p>
  //       <p>For support, email us at: <a href="mailto:rinoxtools@outlook.com">rinoxtools@outlook.com</a></p>
  //       <p> Gf-09, Block D1, Sumel-10 Phase-2, M.H. Mill Compound,
  //               <br />
  //               Saraspur, Opp. Saraspur ITI Ahmedabad 380018</p>
  //     </footer>
  //   </div>
  // `,
};
