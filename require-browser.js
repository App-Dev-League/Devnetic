const requireExecute = (code) => {
	return eval(`(() => {
		let exports = {};
		let module = {exports: exports};
		${code}
		let moduleExports = {};
		if(module.exports.constructor == Object && exports.constructor == Object) {
			moduleExports = {...exports, ...module.exports};
		} else if(typeof module.exports == "function" && typeof exports == "function") {
			moduleExports[exports.name] = exports;
		} else if(exports.constructor == Object && Object.keys(exports).length == 0) {
			moduleExports = module.exports;
		} else {
			moduleExports = exports;
		}
		return moduleExports;
		})();`);
}
window.downloadFileCount = 0;
const requireExecuteBrowser = (code) => {
	let script = document.createElement('script');
	script.type = 'text/javascript';
	try {
		script.appendChild(document.createTextNode(code));
	} catch(err) {
		script.text = code;
	}
	document.body.appendChild(script);
}

const { install, installAll, require, requireBrowser, _getInstalledData } = (function() {
	let cache = {};
	let context = "./";
	let requiring = false;
	const install = (filename, options) => {
		return new Promise(async (resolve, reject) => {
			if(options == null || options.constructor != Object) {
				options = {};
			}
			options = {...options};
			if(options.node_modules == null || typeof options.node_modules != "string") {
				options.node_modules = "/node_modules/";
			}
			if(options.node_modules[options.node_modules.length - 1] != "/") {
				options.node_modules += "/";
			}
			if(options.path == null || typeof options.path != "string") {
				options.path = "";
			}
			if(options.reinstall == null || typeof options.reinstall != "boolean") {
				options.reinstall = false;
			}
			if(options.installDependencies == null || typeof options.installDependencies != "boolean") {
				options.installDependencies = true;
			}
			if(options.installDevDependencies == null || typeof options.installDevDependencies != "boolean") {
				options.installDevDependencies = false;
			}
			filename = options.path + filename;
			if(filename.includes("/") && filename.endsWith(".js")) {
				if(options.name == null || typeof options.name != "string") {
					options.name = absolute(filename);
				}
				if(options.reinstall || cache[options.name] == null) {
					fetch(filename).then(async (res) => {
						if(res.status == 200) {
							res.text().then(async (data) => {
								let pathList = filename.split("/");
								pathList.splice(pathList.length - 1, 1);
								let c = pathList.join("/") + "/";
								cache[options.name] = {
									data: data,
									context: c
								};
								resolve();
							}).catch(async (err) => {
								reject("require-browser Fatal Error: Unable to parse `" + filename + "`.\n\n" + err);
							});
						} else {
							reject("require-browser Fatal Error: Unable to parse `" + filename + "`.\n\n" + err);
						}
					}).catch(async (err) => {
						reject("require-browser Fatal Error: Unable to fetch `" + filename + "`.\n\n" + err);
					});
				} else {
					resolve();
				}
			} else {
				let slash = false;
				if(filename.includes("/") && !filename.startsWith("@")) {
					slash = true;
					filename = absolute(filename);
				}
				if(options.name == null || typeof options.name != "string") {
					options.name = filename;
				}
				let requestPath;
				if(slash) {
					requestPath = filename + "/";
				} else {
					requestPath = options.node_modules + filename + "/";
				}
				fetch(requestPath + "package.json").then(async (res) => {
					if(res.status == 200) {
						res.json().then(async (data) => {
							let file = "index.js";
							if(data.main != null) {
								file = data.main;
							}
							if(data.browser != null && data.browser[file] != null) {
								file = data.browser[file];
							}
							if(file[0] == "/") {
								file = file.substring(1);
							}
							if(options.reinstall || cache[options.name] == null) {
								await install(requestPath + file, options);
							}
							if(options.installDependencies) {
								let dependencies = Object.keys((data.dependencies) || {});
								for(let i = 0; i < dependencies.length; i++) {
									if(options.reinstall || cache[dependencies[i]] == null) {
										await install(dependencies[i], options);
									}
								}
							}
							if(options.installDevDependencies) {
								let dependencies = Object.keys((data.devDependencies) || {});
								for(let i = 0; i < dependencies.length; i++) {
									if(options.reinstall || cache[dependencies[i]] == null) {
										await install(dependencies[i], options);
									}
								}
							}
							resolve();
						}).catch(async (err) => {
							reject("require-browser Fatal Error: Unable to parse module `" + filename + "`.\n\n" + err);
						});
					} else {
						reject("require-browser Fatal Error: Unable to parse module `" + filename + "`.\n\n" + err);
					}
				}).catch(async (err) => {
					let file = "index.js";
					if(options.reinstall || cache[options.name] == null) {
						install(requestPath + file, options).then(async () => {
							resolve();
						}).catch(async (err) => {
							if(!requestPath.startsWith(options.node_modules)) {
								await install(options.node_modules + requestPath, options);
							}
							resolve();
						});
					} else {
						resolve();
					}
				})
			}
			window.downloadFileCount++
			window.newFileCallback()
		});
	}

	const installAll = (filenames, options) => {
		return new Promise(async (resolve, reject) => {
			let allPromises = []
			for(let i = 0; i < filenames.length; i++) {
				allPromises.push(install(filenames[i], options))
				//await install(filenames[i], options);
			}
			await Promise.all(allPromises)
			resolve();
		});
	}

	const getLocation = () => {
		return window.location.href.substring(0, window.location.href.length - window.location.hash.length);
	}

	const absolute = (rel, base = getLocation()) => {
		if(rel.includes("://")) {
			return rel;
		}
		var st = base.split("/");
		var arr = rel.split("/");
		st.pop(); // ignore the current file name (or no string)
		// (ignore if "base" is the current folder without having slash in trail)
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == ".")
				continue;
			if (arr[i] == "..")
				st.pop();
			else
				st.push(arr[i]);
		}
		return st.join("/");
	}

	const requireLowLevel = (filename, func) => {
		if(filename.includes("/")) {
			filename = absolute(context + filename);
		}
		if(cache[filename] == null) {
			throw "require-browser Fatal Error: Unable to find `" + filename + "`, ensure that it is installed first.";
		} else {
			let prevContext = context;
			context = cache[filename].context;
			let result;
			try {
				result = func(cache[filename].data);
			} catch(err) {
				context = prevContext;
				throw err;
			}
			context = prevContext;
			return result;
		}
	}

	const require = (filename) => {
		return requireLowLevel(filename, requireExecute);
	}

	const requireBrowser = (filename) => {
		requireLowLevel(filename, requireExecuteBrowser);
	}

	const _getInstalledData = () => {
		return cache;
	}

	return { install, installAll, require, requireBrowser, _getInstalledData };
})();
