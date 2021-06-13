const User = require("../models/user");

exports.login = (req, res) => {
    User.findOne(
        { role: req.body.role, name: req.body.name, password: req.body.password },
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "Something went wrong",
                });
            } else {
                res.send(result);
            }
        }
    );
};

exports.getUser = async (req, res, next) => {
    try {
        let users = await User.find().exec();
        res.send(users);
    }
    catch (e) {
        res.status(500).send({ messsage: "Something went wrong" });
    }
};

exports.addUser = async (req, res) => {
    try {
        await User.create(req.body, (err, result) => {
            res.status(200).send({
                messsage: "Created Book successfully",
            });
        })
    }
    catch (e) {
        res.status(500).send({ messsage: "Something went wrong" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id }, (err, result) => {
            res.send(result);
        })
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
};

exports.editUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id).exec();
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send("No Data Found");
        }
    } catch (e) {
        res.status(500).send({ messsage: "Something went wrong" });
    }
};
exports.updataUser = async (req, res) => {
    try {
        await User.updateOne(
            { _id: req.params.id },
            req.body
        ).exec();
        res.status(200).send({
            messsage: "Updated successfully",
        });
    } catch (error) {
        res.status(500).send({
            messsage: "Something went wrong when updaing",
        });
    }
};
