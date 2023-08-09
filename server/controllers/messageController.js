const asyncHandler = require("express-async-handler");
const Message = require('../models/messageSchema')

const sendMsg = asyncHandler(async (req, res) => {
    const { text, sender, reciever } = req.body;

    const newMsg = await Message.create({
        message: {
            text
        },
        users: [sender, reciever],
        sender: sender
    })
    if (newMsg) {
        res.status(200).json({ message: newMsg.message, isSenderMe: true })
    }
    else
        res.status(400).json({ msg: 'Failed to send msg' })
})

const getMessages = asyncHandler(async (req, res) => {
    const { from, to } = req.body;
    const msgs = await Message.find({
        users: {
            $all: [from, to]
        }
    }).sort({ updatedAt: 1 })

    if (msgs) {
        const allMsg = msgs.map((msg) => {
            return {
                message: msg.message,
                isSenderMe: msg.sender.toString() === from
            }
        })
        res.status(200).json(allMsg)
    }
    else
        res.status(400).json({ msg: "Failed to retieve all the msgs" })
})
const deleteAllMsg = asyncHandler(async (req,res)=>{
    const msgsDeleted = await Message.deleteMany({})
})
module.exports = {
    sendMsg,
    getMessages,
    deleteAllMsg
}