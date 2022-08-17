const {
    logger
} = require("../utils/logger");
const path = require('path');
const fs = require('fs');

const {
    getUserInfo,
    getApplicationInfo,
    generatePDF,
    sendEmail,
} = require("../utils/utils");

const {
    storeApplication,
} = require("../models/Application.model");
const {
    send
} = require("process");

async function index(req, res) {
    try {
        let email = req.session.user;
        const applicationInfo = await getApplicationInfo(email);

        if (applicationInfo.status) {
            if (applicationInfo.result.length != 0) {
                const userInfo = await getUserInfo(email);
                res.render('application/index', {
                    userInfo: userInfo.result[0],
                    applicationInfo: applicationInfo.result[0],
                });
            } else {
                res.redirect('/dashboard/application/create');
            }
        }
    } catch (error) {
        logger.error(`APPLICATION VIEW ERROR: ${error}`);
        res.render("error", {
            error: "ERROR LOADING APPLICATION VIEW PAGE",
        });
    }
}

async function create(req, res) {
    try {
        let email = req.session.user;
        const applicationInfo = await getApplicationInfo(email);

        if (applicationInfo.status) {
            if (applicationInfo.result.length != 0) {
                res.redirect('/dashboard/application/');
            } else {
                const userInfo = await getUserInfo(email);

                res.render('application/create', {
                    userInfo: userInfo.result[0]
                });
            }
        }
    } catch (error) {
        logger.error(`APPLICATION CREATE VIEW ERROR: ${error}`);
        res.render("error", {
            error: "ERROR LOADING APPLICATION CREATE PAGE",
        });
    }
}

async function store(req, res) {
    try {
        const {
            fullname,
            licensecategory,
        } = req.body;

        let id, type;
        let email = req.session.user;

        let tempInfo = await getUserInfo(email);
        if (tempInfo.status) {
            id = tempInfo.result[0].id;
            if (tempInfo.result[0].haslicense == '1') {
                type = 1;
            } else {
                type = 0;
            }
        }

        let officeVisitDate = new Date();
        officeVisitDate.setMonth(officeVisitDate.getMonth() + 1);
        officeVisitDate = officeVisitDate.toISOString().slice(0, 10);

        const userInfo = {
            id,
            fullname,
            email,
            type,
            licensecategory,
            officeVisitDate,
        }

        const result = await storeApplication(userInfo);
        if (result.status) {
            //Here will be function call for email handler {WIP}...
            res.redirect('/dashboard/application/');
        } else {
            throw (result.error);
        }
    } catch (error) {
        logger.error(`APPLICATION STORE ERROR: ${error}`);
        res.render('error', {
            error: "Something Went Wrong While Storing Application"
        });
    }
}

async function download(req, res) {
    try {
        let email = req.session.user;
        const filePath = path.join(__dirname, '../views/', "applicationtemplate.ejs");

        let date = new Date().toISOString().replace(/:/g, '-');
        date = date.substring(0, 10);

        // PDF Value Acquisition...
        const userInfo = await getUserInfo(email);
        const applicationInfo = await getApplicationInfo(email);

        const pdfPath = path.join(__dirname, '../../report_files/', `${userInfo.result[0].name}-license-${date}.pdf`);

        await generatePDF(filePath, pdfPath, userInfo.result[0], applicationInfo.result[0]);
        res.download(pdfPath, function (err) {
            if (err) {
                throw err;
            }
            fs.unlink(pdfPath, function () {
                // console.log("File was deleted");
            })
        })
    } catch (error) {
        logger.error(`DOWNLOAD ERROR: ${error}`);
        res.render('error', {
            error: "Something Went Wrong While Downloading Application"
        });
    }
}

async function email(req, res) {
    try {
        let email = req.session.user;
        const filePath = path.join(__dirname, '../views/', "applicationtemplate.ejs");

        let date = new Date().toISOString().replace(/:/g, '-');
        date = date.substring(0, 10);

        // PDF Value Acquisition...
        const userInfo = await getUserInfo(email);
        const applicationInfo = await getApplicationInfo(email);

        const pdfPath = path.join(__dirname, '../../report_files/', `${userInfo.result[0].name}-license-${date}.pdf`);

        await generatePDF(filePath, pdfPath, userInfo.result[0], applicationInfo.result[0]);

        // send mail with defined transport object
        let mailOptions = {
            from: `"Online Driving License System - EAS 👻" <developers_eas@outlook.com>`, // sender address
            to: `${email}`, // list of receivers
            subject: "Online Driving License Application", // Subject line
            text: `Hello ${userInfo.result[0].name},\n\nPlease find the attached document of your Online Driving License Application.\n[ Reference Number - ${applicationInfo.result[0].id} ]\nWith regards,\nOnline Driving License System`,
            attachments: [{
                filename: `${userInfo.result[0].name}-report-${date}.pdf`,
                path: `${pdfPath}`,
                contentType: 'application/pdf',
            }],
        }
        await sendEmail(mailOptions);
        fs.unlink(pdfPath, function (err) {
            if (err) {
                // console.log("fs error:", err);
                throw err
            }
        })
        res.redirect('back');
    } catch (error) {
        logger.error(`EMAIL SEND ERROR: ${error}`);
        res.render('error', {
            error: "Something Went Wrong While Sending Email"
        });
    }
}

module.exports = {
    index,
    create,
    store,
    download,
    email,
};