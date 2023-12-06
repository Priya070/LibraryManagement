//fetchuser middleware

const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchuser;
//         const validPassword = await bcrypt.compare(req.body.password, user.password);
//         !validPassword && res.status(400).json("Wrong Password")
//         const data = {
//             user: {
//                 id: user.id
//             }
//         }
//         const authtoken = jwt.sign(data, process.env.JWT_SECRET);
//         res.json({ authtoken })
//     }
//     catch (err) {
//         res.send(err.message);
//     }
// })
//
//module.exports = router;
