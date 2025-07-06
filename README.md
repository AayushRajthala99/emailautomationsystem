# 📧 Email Automation System

A feature-extended clone of the **Department of Transport Management (DoTM) Nepal's** official Online Driving License and Vehicle Registration System. This project replicates the real-world workflow of license and vehicle registration services as provided by DoTM, which manages traffic control, driving license issuance, and vehicle inspections across Nepal.

---

## 📝 Project Description

This web application was built as part of a college project to simulate and improve upon the existing services offered by the Department of Transport Management (DoTM), Nepal. While closely mirroring DoTM’s official license and vehicle registration workflow, the project introduces several additional optimizations to enhance the user experience in a personal testing environment.

Key Enhancements:
- 📄 **Auto-Generate Application PDF**: After submitting the license/vehicle registration form, a PDF is generated and sent to the applicant via email.
- 💾 **Automatic File Download**: The system automatically downloads the generated PDF to the applicant's device.
- 🖱️ **Manual Download Option**: Added a button for users to manually download the PDF in case the auto-download fails.

---
> This project was developed solely for educational purposes and is not affiliated with the official DoTM services.
A lightweight, browser-based email automation system built with **Node.js**, **Express**, **EJS**, and **CSS**, enabling users to send templated emails through a web interface.

## 🚀 Features

- **Web UI**: Create, preview, and send custom email templates via an EJS-powered dashboard.  
- **Template Management**: Store and reuse multiple email templates.  
- **SMTP Integration**: Seamless email dispatch using SMTP configurations.  
- **Responsive Frontend**: Built with HTML5, CSS3, and EJS for ease of use.  
- **Configurable**: Easily modify SMTP settings (server, credentials, ports) in the config file.

---

## 🛠️ Tech Stack

- **Backend**: Node.js + Express  
- **Templating**: EJS  
- **Frontend**: HTML5 + CSS3  
- **Email Handling**: Nodemailer (SMTP)  
- **Project Structure**:
  - `src/`: Core server, routing, and email logic  
  - `public/`: Static assets (CSS, client-side JS)  
  - `config/`: SMTP/email config files  
  - `migrations/`: Database setup (if using persistent storage)

---

## 💡 Installation & Setup

1. **Clone the repo**  
   ```bash
   git clone https://github.com/AayushRajthala99/emailautomationsystem.git
   cd emailautomationsystem
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure SMTP settings**
   Edit `config/default.json` (or your environment-specific config) with your SMTP server, port, username, and password.

4. **Run the server**

   ```bash
   npm start
   ```

5. **Access the app**
   Navigate to `http://localhost:3000` in your browser.

---

## 📄 Usage

* Use the web dashboard to design or select an email template.
* Fill in recipient address, subject line, and optional attachments.
* Preview your email and click **Send**.
* Manage templates via the built-in template library.

---

## 📌 Contributing

Contributions are welcome! To contribute:

* Fork the repo and create feature branches (e.g., `feature/add-attachments`).
* Open a pull request with clear code and documentation updates.
* Submit issues for bugs, enhancements, or questions.

---

## 📋 Roadmap

Upcoming enhancements:

1. Add **OAuth2 provider support** (e.g., Gmail, Outlook).
2. Enable **file attachments** in emails.
3. Introduce **user authentication** & multi-user template management.
4. Implement **bulk email campaigns**.
5. Integrate with **email delivery services** (e.g., SendGrid, Mailgun).

---

## 💬 Author

**Aayush Rajthala** – Security researcher & full-stack developer
GitHub: [AayushRajthala99](https://github.com/AayushRajthala99)
