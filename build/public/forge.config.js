const path = require("path");


module.exports = {
    packagerConfig: {
        dir: "./app",
        icon: "./images/icon"
    },
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                name: "Devnetic",
                loadingGif: "./images/installation_loop.gif",
                setupIcon: path.join("images", "icon.ico"),
                skipUpdateIcon: true,
                icon: path.join("images", "icon.ico")
            }
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: ["darwin"]
        },
        {
            name: "@electron-forge/maker-deb",
            config: {}
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {}
        }
    ],
    make_targets: {
        win32: ["squirrel"],
        darwin: ["zip", "dmg"],
        linux: ["deb", "rpm", "flatpak", "snap"]
    },
    electronWinstallerConfig: {
        name: 'Devnetic',
        noMsi: false,
        author: 'App Dev League',
        exe: 'devnetic.exe',
        description: 'An interactive teaching app developed by App Dev League for students looking to learn about Application Development and AI in the form of multiple choice questions, an integrated code editor, project-oriented curriculum, and a gamified leveling up system.',
        iconUrl: 'https://devnetic.vercel.app/favicon.ico',
    },
    publishers: [
        {
          name: "@electron-forge/publisher-github",
          config: {
            repository: {
              owner: "App-Dev-League",
              name: "Devnetic"
            }
          }
        }
      ],
}
