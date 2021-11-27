const Database = {
	clear: function() {
		localStorage.removeItem("module");
		localStorage.removeItem("position");
		localStorage.removeItem("score");
		localStorage.removeItem("actions");
	},
	updateState: function(track, moduleNum, position) {
		return new Promise(async (resolve, reject) => {
			localStorage.setItem("module", moduleNum);
			localStorage.setItem("position", position);
			let { data } = await Database.getModuleData(track, moduleNum, position);
			let actions = await Database.getActions();
			if(actions[track] == null) {
				actions[track] = [];
			}
			if(actions[track][moduleNum] == null) {
				actions[track][moduleNum] = [];
			}
			if(actions[track][moduleNum][position] == null) {
				actions[track][moduleNum][position] = {
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
			if(localStorage.getItem("actions") == null) {
				await Database.setActions(actions);
			}
			try {
				actions = JSON.parse(localStorage.getItem("actions"));
				resolve(actions);
			} catch(err) {
				await Database.setActions({});
				resolve({});
			}
		});
	},
	setActions: function(actions) {
		return new Promise(async (resolve, reject) => {
			localStorage.setItem("actions", JSON.stringify(actions));
			resolve(true)
		});
	},
	getScore: function() {
		return new Promise(async (resolve, reject) => {
			let score = {
				points: 0,
				coins: 0
			}
			if(localStorage.getItem("score") == null) {
				await Database.setScore(score);
			}
			try {
				score = JSON.parse(localStorage.getItem("score"));
			} catch(err) {
				await Database.setScore(score);
			}
			resolve(score);
		});
	},
	setScore: function(score) {
		return new Promise(async (resolve, reject) => {
			localStorage.setItem("score", JSON.stringify(score));
			resolve(true);
		});
	},
	getModuleData: function(track, moduleNum, position) {
		return new Promise(async (resolve, reject) => {
			let data = await tApp.get(`/data/modules/${track}/${moduleNum}.json`).catch((err) => {
				reject(err);
			});
			let parsedData = await data.json().catch((err) => {
				reject(err);
			});
			if(position < parsedData.pages.length - 1) {
				resolve({
					data: parsedData.pages[position],
					type: parsedData.type,
					moduleLength: parsedData.pages.length,
					next: {
						hasNext: true,
						module: moduleNum,
						position: position + 1
					}
				});
			} else {
				tApp.get(`/data/modules/${track}/${moduleNum + 1}.json`).then(() => {
					resolve({
						data: parsedData.pages[position],
						type: parsedData.type,
						moduleLength: parsedData.pages.length,
						next: {
							hasNext: true,
							module: moduleNum + 1,
							position: 0
						}
					});
				}).catch((err) => {
					resolve({
						data: parsedData.pages[position],
						type: parsedData.type,
						moduleLength: parsedData.pages.length,
						next: {
							hasNext: false
						}
					});
				});
			}
			
		});
	},
	getModulePosition: function(track, moduleNum) {
		return new Promise(async (resolve, reject) => {
			let actions = await Database.getActions();
			if(actions[track] == null || actions[track][moduleNum] == null) {
				resolve(0);
			} else {
				resolve(actions[track][moduleNum].length);
			}
		});
	}
}

module.exports = Database;