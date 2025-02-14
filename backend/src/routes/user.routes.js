const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logOut, refreshAccessToken, changePassword, getCurrentUser } = require('../controller/user.controller')
const verifyJWT = require('../middleware/auth.middleware')
const { getNotes, saveNote, deleteNote, editNote } = require('../controller/note.controller')

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route('/change-password').post(verifyJWT, changePassword)
router.route('/logout').post(verifyJWT, logOut)
router.route('/c/:username').get(verifyJWT, getCurrentUser)
router.route('/notes').get(verifyJWT, getNotes)
router.route('/save-note/:id').put(verifyJWT, editNote)
router.route('/save-note').post(verifyJWT, saveNote)
router.route('/delete-note/:id').delete(verifyJWT, deleteNote)

module.exports = router