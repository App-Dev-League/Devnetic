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
                button.addEventListener("click", function(){
                    closeModal();
                    if (input.onclick) input.onclick();
                })
                modal.querySelector(".ui-modal-buttons").appendChild(button)
            } else if (input.type === "text") {
                let textInput = document.createElement("input");
                textInput.setAttribute("type", "text");
                textInput.setAttribute("placeholder", input.placeholder || "");
                textInput.setAttribute("value", input.value || "");
                modal.querySelector(".ui-modal-footer").prepend(textInput);
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
                element.parentElement.removeChild(element)
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
    },
    randomQuote: function() {
        const quotes = [
            "Failure isn't fatal, but failure to change might be",
            "Everything you want is on the other side of fear.",
            "Success is most often achieved by those who don't know that failure is inevitable.",
            "Only those who dare to fail greatly can ever achieve greatly.",
            "The phoenix must burn to emerge.",
            "If you're not prepared to be wrong, you'll never come up with anything original.",
            "Giving up is the only sure way to fail.",
            "If you don't try at anything, you can't fail… it takes back bone to lead the life you want",
            "Failure should be our teacher, not our undertaker. Failure is delay, not defeat. It is a temporary detour, not a dead end. Failure is something we can avoid only by saying nothing, doing nothing, and being nothing.",
            "When you take risks you learn that there will be times when you succeed and there will be times when you fail, and both are equally important.",
            "It's failure that gives you the proper perspective on success.",
            "There is no failure except in no longer trying.",
            "I have not failed. I've just found 10,000 ways that won't work.",
            "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            "There is only one thing that makes a dream impossible to achieve: the fear of failure",
            "Pain is temporary. Quitting lasts forever.",
            "Success is stumbling from failure to failure with no loss of enthusiasm.",
            "I'd rather be partly great than entirely useless.",
            "We are all failures - at least the best of us are",
            "The only real mistake is the one from which we learn nothing.",
            "Failures are finger posts on the road to achievement.",
            "Winners are not afraid of losing. But losers are. Failure is part of the process of success. People who avoid failure also avoid success.",
            "Every adversity, every failure, every heartache carries with it the seed of an equal or greater benefit.",
            "You build on failure. You use it as a stepping stone. Close the door on the past. You don't try to forget the mistakes, but you don't dwell on it. You don't let it have any of your energy, or any of your time, or any of your space.",
            "It's not how far you fall, but how high you bounce that counts.",
            "Failure is so important. We speak about success all the time. It is the ability to resist failure or use failure that often leads to greater success. I've met people who don't want to try for fear of failing.",
            "No human ever became interesting by not failing. The more you fail and recover and improve, the better you are as a person. Ever meet someone who's always had everything work out for them with zero struggle? They usually have the depth of a puddle. Or they don't exist.",
            "When we give ourselves permission to fail, we, at the same time, give ourselves permission to excel.",
            "With a hint of good judgment, to fear nothing, not failure or suffering or even death, indicates that you value life the most. You live to the extreme; you push limits; you spend your time building legacies. Those do not die.",
            "What is the point of being alive if you don't at least try to do something remarkable?"
        ]
        return quotes[Math.floor(Math.random()*quotes.length)]
    }
}