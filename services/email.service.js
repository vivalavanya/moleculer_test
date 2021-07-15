const nodemailer = require('nodemailer');
('use strict');

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: 'email',
	/**
	 * Actions
	 */
	actions: {
		/**
		 * Get weather by city name
		 *
		 * @returns
		 */
		send: {
			rest: {
				method: 'POST',
				path: '/send',
			},
			params: {
				to: 'string',
				subject: 'string',
				text: 'string',
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				let transporter = nodemailer.createTransport({
					host: process.env.EMAIL_HOST,
					port: process.env.EMAIL_PORT,
					secure: true, // true for 465, false for other ports
					auth: {
						user: process.env.EMAIL_AUTH_USER, // generated ethereal user
						pass: process.env.EMAIL_AUTH_PASS, // generated ethereal password
					},
				});
				// send mail with defined transport object
				let info = await transporter.sendMail({
					from: `"Test mail 👻" <${process.env.EMAIL_AUTH_USER}>`, // sender address
					to: ctx.params.to, // list of receivers
					subject: ctx.params.to, // Subject line
					text: ctx.params.text, // plain text body
				});
				return info;
			},
		},
	},
};
