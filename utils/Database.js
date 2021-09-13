const Database = {
	updateState: function(moduleNum, position) {
		return new Promise(async (resolve, reject) => {
			let data = await Database.getModuleData(moduleNum, position);
			let actions = await Database.getActions();
			if(actions[moduleNum + "-" + position] == null) {
				actions[moduleNum + "-" + position] = {
					points: data.points || 0,
					coins: data.coins || 0
				};
				await Database.setActions(actions);
				let score = await Database.getScore();
				score.points += data.points || 0;
				score.coins += data.coins || 0;
				await Database.setScore(score);
			}
			resolve();
		});
	},
	getActions: function() {
		return new Promise(async (resolve, reject) => {
			let actions = {};
			// if(localStorage.getItem("actions") == null) {
			// 	await Database.setActions(actions);
			// }
			// try {
			// 	actions = JSON.parse(localStorage.getItem("actions"));
			// } catch(err) {
			// 	await Database.setActions(actions);
			// }
			resolve(actions);
		});
	},
	setActions: function(actions) {
		return new Promise(async (resolve, reject) => {
			// localStorage.setItem("actions", JSON.stringify(actions));
			resolve(true)
		});
	},
	getScore: function() {
		return new Promise(async (resolve, reject) => {
			let score = {
				points: 0,
				coins: 0
			}
			// if(localStorage.getItem("score") == null) {
			// 	await Database.setScore(score);
			// }
			// try {
			// 	score = JSON.parse(localStorage.getItem("score"));
			// } catch(err) {
			// 	await Database.setScore(score);
			// }
			resolve(score);
		});
	},
	setScore: function(score) {
		return new Promise(async (resolve, reject) => {
			//localStorage.setItem("score", JSON.stringify(score));
			resolve(true);
		});
	},
	getModuleData: function(moduleNum, position) {
		return new Promise(async (resolve, reject) => {
			let data = await tApp.get(`/data/modules/${moduleNum}.json`).catch((err) => {
				reject(err);
			});
			let parsedData = await data.json().catch((err) => {
				reject(err);
			});
			resolve([parsedData.pages[position], parsedData.type]);
		});
	},
	getModulePosition: function(moduleNum) {
		return new Promise(async (resolve, reject) => {
			resolve(0);
		});
	}
}

module.exports = Database;