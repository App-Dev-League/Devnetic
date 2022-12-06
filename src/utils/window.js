if (!window.windowManager) {
    window.windowManager = []
}

module.exports = {
    newWindow: function (name, innerHTML, width, height) {
        let element = document.createElement('div');
        element.id = "window-" + Math.random().toString().replace(".", "")
        element.innerHTML = `
        <div class="window-header"><span>${name}</span>
            <div class="buttons">
                <span onclick="require('./utils/window.js').toggleMaximized('${element.id}')" class="codicon codicon-chrome-restore"></span>
                <span onclick="require('./utils/window.js').killWindow('${element.id}')" class="codicon codicon-close"></span>
            </div>
        </div>
        <div class="window-content" style="height: 100%">${innerHTML}</div>
        `
        element.classList.add("window-window")
        //element.style.zIndex = windowManager.length - 1 + 300; // current index within windowManager array + 300
        element.style.height = height || "fit-content"
        element.style.width = width || "fit-content"
        document.getElementById("window-container").appendChild(element)
        window.windowManager.push(element.id)
        interact("#" + element.id)
            .resizable({
                edges: { left: true, right: true, bottom: true, top: true },
                listeners: {
                    move(event) {
                        var target = event.target
                        if (target.classList.contains('window-maximized')) return;

                        if (target.querySelector("iframe")) {
                            // then the target is an iframe and we need to do some extra work
                            target.querySelector("iframe").style.pointerEvents = "none"
                        }
                        var x = (parseFloat(target.getAttribute('data-x')) || 0)
                        var y = (parseFloat(target.getAttribute('data-y')) || 0)

                        // update the element's style
                        target.style.width = event.rect.width + 'px'
                        target.style.height = event.rect.height + 'px'

                        // translate when resizing from top or left edges
                        x += event.deltaRect.left
                        y += event.deltaRect.top

                        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

                        target.setAttribute('data-x', x)
                        target.setAttribute('data-y', y)
                    },

                }
            }).on("resizeend", function(event) {
                if (event.target.querySelector("iframe")) {
                    event.target.querySelector("iframe").style.pointerEvents = "all"
                }
            })
        interact("#" + element.id + " .window-header").draggable({
            listeners: { move: dragMoveListener },
        })
        element.addEventListener("mousedown", function () {
            let windowIndex = window.windowManager.findIndex(e => e === element.id);
            window.windowManager.splice(windowIndex, 1);
            window.windowManager.push(element.id);
            updateWindowStack()
        })
        updateWindowStack()
        return element.id
    },
    killWindow: function (id) {
        let element = document.getElementById(id);
        element.parentElement.removeChild(element)
        let windowIndex = window.windowManager.findIndex(e => e === id);
        window.windowManager.splice(windowIndex, 1);
        updateWindowStack()
    },
    toggleMaximized: function (id) {
        let element = document.getElementById(id);
        element.classList.add("transitioning")
        element.classList.toggle('window-maximized');
        setTimeout(function () {
            element.classList.remove('transitioning');
        }, 500)
    },
    updateWindow: function (id, innerHTML, name) {
        let element = document.getElementById(id);
        if (name) element.querySelector(".window-header span").innerHTML = name
        if (innerHTML) element.querySelector(".window-content").innerHTML = innerHTML
    }
}
function dragMoveListener(event) {
    var target = event.target.parentElement,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    if (target.classList.contains('window-maximized')) return;
    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}
function updateWindowStack() {
    window.windowManager.forEach((e, index) => {
        document.getElementById(e).style.zIndex = index + 300
    })
}
