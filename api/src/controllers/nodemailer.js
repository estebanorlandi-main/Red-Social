const nodemailer = require("nodemailer");
const { google } = require("googleapis")
const config = require("./config.js")
const OAuth2 = google.auth.OAuth2

const OAuth2_client = new OAuth2(config.clientId, config.clientSecret)

OAuth2_client.setCredentials({refresh_Token: config.refreshToken})

async function send_verification(email, token){
	const accessToken = await OAuth2_client.getAccessToken(OAuth2_client)
	const transport = nodemailer.createTransport({
		service:"gmail",
		auth:{
			type: "OAuth2",
			user: config.userEmail,
			clientId: config.clientId,
			clientSecret: config.clientSecret,
			refreshToken: config.refreshToken,
			accessToken: accessToken
		}
	})	
	const mail_options={
		from:`Code Net APP <${config.userEmail}>`,
		to: email,
		subject: "Account Verification Code Net APP",
		html: `<h1>Email Confirmation</h1>
			<a target="_blank" href="http://localhost:3001/validate/account?email=${email}&token=${token}">Validate email</a>`
	}
	transport.sendMail(mail_options, (error, result)=>{
		if(error){
			console.log("Error:")
		} else {
			console.log("Success:")
		}
		transport.close()
	})
}
async function forgot_validate(email, token){
	const accessToken = await OAuth2_client.getAccessToken(OAuth2_client)
	const transport = nodemailer.createTransport({
		service:"gmail",
		auth:{
			type: "OAuth2",
			user: config.userEmail,
			clientId: config.clientId,
			clientSecret: config.clientSecret,
			refreshToken: config.refreshToken,
			accessToken: accessToken
		}
	})	
	const mail_options={
		from:`Code Net APP <${config.userEmail}>`,
		to: email,
		subject: "Reset Password Code Net APP",
		html: `<h1>Password Reset</h1>
			<a target="_blank" href="http://localhost:3001/validate/password/reset?email=${email}&token=${token}">generate new password</a>`
	}
	transport.sendMail(mail_options, (error, result)=>{
		if(error){
			console.log("Error:")
		} else {
			console.log("Success:")
		}
		transport.close()
	})
}


module.exports = {
	send_verification,
	forgot_validate
};