function doesFileExist(path) {
	return new Promise(async (resolve, reject) => {
		tApp.get(path).then((file) => {
			resolve(file.status !== 404);
		}).catch(() => {
			resolve(false);
		});
	});
}
module.exports = doesFileExist