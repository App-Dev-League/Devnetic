const codeEditorHelper = require("../utils/codeEditor.js");
const plugins = require("../utils/plugins.js");

class PluginPanel extends tApp.Component {
	constructor(state, parent) {
		super(state, parent);
	}
    install(id){
        var pluginpanel = this;
        let plugin = document.getElementById("plugin-list-" + id);
        plugin.querySelector("h5").innerText = "Installing..."
        plugin.querySelector("h5").style.pointerEvents = "none"
        plugin.querySelector(".loading-bar-container").style.opacity = 1;
        plugin.querySelector(".loading-bar").style.width = "10%";
        plugins.download(id, async function(code){
            const reader = code.body.getReader();
            let bytesReceived = 0;
            let code_size = Number(code.headers.get('content-length'));
            while (true) {
                const result = await reader.read();
                if (result.done) {
                    console.log('Fetch complete');
                    break;
                }
                bytesReceived += result.value.length;
                plugin.querySelector("h5").innerText = "Installing..."
                plugin.querySelector(".loading-bar-container").style.opacity = 1;
                plugin.querySelector(".loading-bar").style.width = Math.round(bytesReceived/code_size*100)+"%";
            }
        }, function(){
            plugin.querySelector(".loading-bar-container").style.opacity = 0;
            pluginpanel.setState("update", "update")
        })
    }
    uninstall(id){
        var pluginpanel = this;
        let plugin = document.getElementById("plugin-list-" + id);
        plugin.querySelector(".loading-bar-container").style.opacity = 1;
        plugin.querySelector(".loading-bar").style.width = "10%";
        plugins.remove(id)
        plugin.querySelector(".loading-bar").style.width = "100%";
        setTimeout(function(){
            plugin.querySelector(".loading-bar-container").style.opacity = 0;
            pluginpanel.setState("update", "update")
        }, 500)
    }
	render(props) {
		return `<div>
        ${plugins.availablePlugins().map(plugin => {
                return `<div id="plugin-list-${plugin.id}" style="margin-bottom: 20px">
                    <img src="${plugin.image}" style="width: 60px; display: inline-block"/>
                    <div style="display: inline-block; margin-left: 20px; vertical-align: top">
                        <div>
                            <h3 style="margin-bottom: 0; margin-top: 0; display: inline-block">${plugin.name}</h3>
                            ${plugins.checkPluginStatus(plugin.id) ? `<h5 style="display: inline-block; margin: 0; margin-left: 30px; transform: translateY(-2px); font-size: 0.8em; padding: 0 5px; line-height: 14px; background-color: #b12c2c; cursor: pointer" onclick="{{_this}}.uninstall('${plugin.id}')">Uninstall</h5>` : `<h5 style="display: inline-block; margin: 0; margin-left: 30px; transform: translateY(-2px); font-size: 0.8em; padding: 0 5px; line-height: 14px; background-color: #2BA143; cursor: pointer" onclick="{{_this}}.install('${plugin.id}')">Install</h5>`}
                            </div>
                        <p style="margin-top: 0; margin-bottom: 0">${plugin.description}</p>
                        <div class="loading-bar-container" style="margin-top: 5px; opacity: 0">
                            <div class="loading-bar" style="width: 0%"></div>
                        </div>
                    </div>
                </div>`
            }).join("")}
        </div>`
	}
}

module.exports = PluginPanel;
