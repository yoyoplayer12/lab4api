//require the messages model
const Message = require("../../../models/Message");

const index = async (req, res) => {
    let messages = await Message.find({});
    res.json({
        status: "success",
        message: "GET all messages",
        data: [{
            messages: messages
        }],
    });
};
const create = async(req, res) => {

    let m = new Message();
    m.message = req.body.message;
    m.senderId = req.body.senderId;
     try {
        let doc = await m.save();
        res.json({
            "status": "success",
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
module.exports.index = index;
module.exports.create = create;