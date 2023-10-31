//require the messages model
const Message = require("../../../models/Message");

const index = async (req, res) => {
    let messages = await Message.find({});
    res.json({
        status: "success",
        message: "GETTING messages",
        data: [{
            messages: messages
        }],
    });
};
const create = async(req, res) => {
    let m = new Message();
    m.message = req.body.message;
    m.sender = req.body.sender;
     try {
        let doc = await m.save();
        res.json({
            "status": "success",
            "message": "Message sent",
            "data": {
                "message": doc
            }
        });
    } catch (err) {
        console.error(err);
        res.json({
            "status": "error",
            "message": "Could not save message"
        });
    }

};
const show = async (req, res) => {
    try {
        let message = await Message.findById(req.params.id);
        console.log(message);
        if (message) {
            res.json({
                "status": "success",
                "message": "GETTING message with ID " + req.params.id,
                "data": {
                    "message": message
                }
            });
        } else {
            res.json({
                "status": "error",
                "message": "Message with ID " + req.params.id + " not found."
            });
        }
    } catch (err) {
        console.error(err);
        res.json({
            "status": "error",
            "message": "An error occurred while retrieving the message."
        });
    };
}
const update = async (req, res) => {
    try {
        let message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (message) {
            res.json({
                "status": "success",
                "message": "UPDATED message with ID " + req.params.id,
                "data": {
                    "message": message
                }
            });
        } else {
            res.json({
                "status": "error",
                "message": "Message with ID " + req.params.id + " not found."
            });
        }
    } catch (err) {
        console.error(err);
        res.json({
            "status": "error",
            "message": "An error occurred while updating the message."
        });
    }
};
module.exports.index = index;
module.exports.create = create;
module.exports.show = show;
module.exports.update = update;