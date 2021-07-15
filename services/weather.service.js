const { BrokerNode } = require('moleculer');
const fetch = require('node-fetch');

('use strict');

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: 'weather',

	actions: {
		/**
		 * Get weather by city name
		 *
		 * @returns
		 */
		getWeather: {
			rest: {
				method: 'GET',
				path: '/getWeather',
			},
			params: {
				city: 'string',
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				var url = `https://api.openweathermap.org/data/2.5/weather?q=${ctx.params.city}&appid=${process.env.OPENWEATHER_API}&units=metric`;
				var w = await fetch(url);
				const data = await w.json();
				return data;
			},
		},

		getDiff: {
			rest: {
				method: 'GET',
				path: '/getDiff',
			},
			params: {
				first: 'string',
				second: 'string',
				email: 'string',
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				var citiesTemp = [];
				for (let c in ctx.params) {
					var url = `https://api.openweathermap.org/data/2.5/weather?q=${ctx.params[c]}&appid=${process.env.OPENWEATHER_API}&units=metric&lang=ru`;
					var w = await fetch(url);
					const data = await w.json();
					citiesTemp.push(data);
				}

				var first =
					citiesTemp[0].main.temp > citiesTemp[1].main.temp
						? citiesTemp[0].name
						: citiesTemp[1].name;
				var second =
					citiesTemp[0].main.temp < citiesTemp[1].main.temp
						? citiesTemp[0].name
						: citiesTemp[1].name;
				var temp = Math.abs(citiesTemp[0].main.temp - citiesTemp[1].main.temp);
				if (temp >= 10) {
					ctx.call('email.send', {
						to: ctx.params.email,
						subject: 'Пора валить',
						text: `В городе ${first} теплее чем в городе ${second}, срочно валим в ${first}`,
					});
				}
				return temp;
			},
		},
	},
};
