const ejs = require('ejs');
const pdf = require('html-pdf');
const nodemailer = require('nodemailer');
const {
    logger
} = require("../utils/logger");
require('dotenv').config();

//Promisified Query...
const promisifiedQuery = (options) => {
    const db = require('../../config/mysql');
    return new Promise((resolve, reject) => {
        db.query(options, function (error, result) {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

// Get Column Information...
const getColumnInfo = async (table, column, attribute, value) => {
    try {
        const result = await promisifiedQuery(
            `SELECT ${column} FROM ${table} where ${attribute}='${value}' AND deleted_at is NULL;`
        )

        return {
            status: true,
            result: result.map((value) =>
                value[column]),

        };
    } catch (error) {
        logger.error(`Column Info Fetch Error:  ${error}`);
        return {
            status: false,
            error: error
        };
    }
}

const getUserInfo = async (email) => {
    try {
        const result = await promisifiedQuery(
            `SELECT *, 
            DATE_FORMAT(dob, '%Y-%m-%d') as dob,
            DATE_FORMAT(citizenshipissueddate, '%Y-%m-%d') as citizenshipissueddate,
            DATE_FORMAT(licenseissueddate, '%Y-%m-%d') as licenseissueddate,
            DATE_FORMAT(licenseexpirydate, '%Y-%m-%d') as licenseexpirydate
            FROM user where email='${email}' AND deleted_at is NULL;`
        );
        return {
            status: true,
            result: result,
        };
    } catch (error) {
        logger.error(`User Info Fetch Error:  ${error}`);
        return {
            status: false,
            error: error,
        };
    }
};

const getApplicationInfo = async (email) => {
    try {
        const result = await promisifiedQuery(
            `SELECT
            *,
            DATE_FORMAT(officevisitdate, '%Y-%m-%d') AS officevisitdate,
            DATE_FORMAT(created_at, '%Y-%m-%d') AS applieddate
            FROM application
            WHERE email = '${email}' AND deleted_at IS NULL
            ORDER BY created_at DESC;`
        );
        return {
            status: true,
            result: result,
        };
    } catch (error) {
        logger.error(`Application Info Fetch Error:  ${error}`);
        return {
            status: false,
            error: error,
        };
    }
};

const generatePDF = async (filePath, pdfPath, userInfo, applicationInfo) => {
    try {
        //PDF GENERATION CODE...
        return new Promise(function (resolve, reject) {
            ejs.renderFile((filePath), {
                userInfo: userInfo,
                applicationInfo: applicationInfo
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    let options = {
                        "format": "letter",
                        "orientation": "portrait",
                    };
                    pdf.create(data, options).toFile(pdfPath, function (error) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(true);
                        }
                    })
                }
            })
        })
    } catch (error) {
        logger.error(`PDF GENERATION ERROR:  ${error}`);
        return {
            status: false,
            error: error,
        };
    }
};

const sendEmail = async (mailOptions) => {
    try {
        //SEND EMAIL CODE...
        return new Promise((resolve, reject) => {
            let transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: false, // use TLS
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false,
                },
            });
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("Email Send Error: ", error);
                    reject(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(true);
                }
            });
        });
    } catch (error) {
        logger.error(`SEND EMAIL ERROR:  ${error}`);
        return {
            status: false,
            error: error,
        };
    }
};

module.exports = {
    promisifiedQuery,
    getColumnInfo,
    getUserInfo,
    getApplicationInfo,
    generatePDF,
    sendEmail,
}