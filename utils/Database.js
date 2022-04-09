const Database = {
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
					},
					moduleData: parsedData
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
						},
						moduleData: parsedData
					});
				}).catch((err) => {
					resolve({
						data: parsedData.pages[position],
						type: parsedData.type,
						moduleLength: parsedData.pages.length,
						next: {
							hasNext: false
						},
						moduleData: parsedData
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
	},
	getModuleCount: function(track) {
		let count = 0;
		while (true) {
			if (doesFileExist(`/data/modules/${track}/${count}.json`) === false) break;
			count++;
		}
		return count;
	},
	getCode: function(storage_id) {
		return new Promise(async (resolve, reject) => {
			resolve(localStorage.getItem(`code::${storage_id}`));
		});
	},
	setCode: function(storage_id, code) {
		return new Promise(async (resolve, reject) => {
			localStorage.setItem(`code::${storage_id}`, code);
			resolve(true);
		});
	},
	removeCode: function(storage_id) {
		return new Promise(async (resolve, reject) => {
			localStorage.removeItem(`code::${storage_id}`);
			resolve(true);
		});
	},
	getSnippetIds: function() {
		return new Promise(async (resolve, reject) => {
			let snippet_ids = [];
			if(localStorage.getItem("snippet_ids") == null) {
				await Database.setSnippetIds(snippet_ids);
			}
			try {
				snippet_ids = JSON.parse(localStorage.getItem("snippet_ids"));
				resolve(snippet_ids);
			} catch(err) {
				await Database.setSnippetIds([]);
				resolve([]);
			}
		});
	},
	setSnippetIds: function(snippet_ids) {
		return new Promise(async (resolve, reject) => {
			localStorage.setItem("snippet_ids", JSON.stringify(snippet_ids));
			resolve(true)
		});
	},
	getSnippet: function(snippet_id) {
		return new Promise(async (resolve, reject) => {
			try {
				let parsed = JSON.parse(localStorage.getItem(`snippet::${snippet_id}`));
				resolve(parsed);
			} catch(err) {
				resolve(null);
			}
		});
	},
	setSnippet: function(snippet) {
		return new Promise(async (resolve, reject) => {
			localStorage.setItem("snippet::" + snippet.id, JSON.stringify(snippet));
			resolve(true);
		});
	},
	storeSnippet: function(snippet) {
		return new Promise(async (resolve, reject) => {
			let snippet_ids = await Database.getSnippetIds();
			if(snippet_ids.findIndex(id => id == snippet.id) < 0) {
				snippet_ids.push(snippet.id);
				await Database.setSnippetIds(snippet_ids);
				await Database.setSnippet(snippet);
			}
			resolve(true);
		});
	},
	removeSnippet: function(snippet_id) {
		return new Promise(async (resolve, reject) => {
			localStorage.removeItem("snippet::" + snippet_id);
			let snippet_ids = await Database.getSnippetIds();
			if(snippet_ids.findIndex(id => id == snippet_id) >= 0) {
				snippet_ids.splice(snippet_ids.findIndex(id => id == snippet_id), 1);
				await Database.setSnippetIds(snippet_ids);
			}
			resolve(true);
		});
	},
	getAllSnippets: function() {
		return new Promise(async (resolve, reject) => {
			let snippet_ids = await Database.getSnippetIds();
			let snippets = [];
			for(let i = 0; i < snippet_ids.length; i++) {
				let snippet = await Database.getSnippet(snippet_ids[i]);
				if(snippet != null) {
					snippets.push(snippet);
				}
			}
			resolve(snippets);
		});
	},
	clearBasicData: function() {
		return new Promise(async (resolve, reject) => {
			localStorage.removeItem("module");
			localStorage.removeItem("position");
			localStorage.removeItem("score");
			localStorage.removeItem("actions");
			resolve(true);
		});
	},
	clearAllCode: function() {
		return new Promise(async (resolve, reject) => {
			let storage_ids = Object.keys(localStorage).filter(key => key.startsWith("code::")).map(key => key.substring(6));
			for(let i = 0; i < storage_ids.length; i++) {
				await Database.removeCode(storage_ids[i]);
			}
			resolve(true);
		});
	},
	clearAllSnippets: function() {
		return new Promise(async (resolve, reject) => {
			let snippet_ids = Object.keys(localStorage).filter(key => key.startsWith("snippet::")).map(key => key.substring(9));
			for(let i = 0; i < snippet_ids.length; i++) {
				await Database.removeSnippet(snippet_ids[i]);
			}
			localStorage.removeItem("snippet_ids");
			resolve(true);
		});
	},
	clearAll: function() {
		return new Promise(async (resolve, reject) => {
			await Database.clearBasicData();
			await Database.clearAllCode();
			await Database.clearAllSnippets();
			resolve(true);
		});
	}
}
function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
     
    return xhr.status !== 404;
}
module.exports = Database;