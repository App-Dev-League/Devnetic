var inputValues = []

module.exports = {
    show: function (text, description, inputs) {
        var modal = document.getElementById("ui-modal");
        closeModal()
        modal.querySelector(".ui-modal-header").innerHTML = text;
        modal.querySelector(".ui-modal-desc").innerHTML = description;
        modal.querySelector(".fa-xmark").onclick = function () {
            closeModal()
        }   
        inputs.forEach(input => {
            if (input.type === "button") {
                let button = document.createElement("button");
                button.innerHTML = input.text;
                button.addEventListener("click", closeModal)
                button.addEventListener("click", input.onclick || function(){})
                modal.querySelector(".ui-modal-buttons").appendChild(button)
            } else if (input.type === "text") {
                let textInput = document.createElement("input");
                textInput.setAttribute("type", "text");
                textInput.setAttribute("placeholder", input.text);
                modal.querySelector(".ui-modal-footer").appendChild(textInput);
            } else if (input.type === "cancel") {
                modal.querySelector(".fa-xmark").onclick = function () {
                    closeModal()
                    input.onclick();
                }   
            }
        })
        modal.classList.remove("hidden")
        function closeModal() {
            inputValues = []
            modal.querySelectorAll("input").forEach(element => {
                inputValues.push(element.value);
            })
            modal.classList.add("hidden");
            modal.querySelector(".ui-modal-header").innerHTML = "";
            modal.querySelector(".ui-modal-desc").innerHTML = "";
            modal.querySelector(".ui-modal-buttons").innerHTML = ""
        }
    },
    getInputValues: function() {
        return inputValues;
    }
}