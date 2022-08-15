const {
    logger
} = require("../utils/logger");

const {
    getUserInfo,
    getApplicationInfo,
} = require("../utils/utils");

const {
    storeApplication,
} = require("../models/Application.model");

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

        let id;
        let email = req.session.user;

        let tempInfo = await getUserInfo(email);
        if (tempInfo.status) {
            id = tempInfo.result[0].id;
        }


        let officeVisitDate = new Date();
        officeVisitDate.setMonth(officeVisitDate.getMonth() + 1);
        officeVisitDate = officeVisitDate.toISOString().slice(0, 10);

        const userInfo = {
            id,
            fullname,
            email,
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

module.exports = {
    index,
    create,
    store,
};