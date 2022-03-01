var code = `
function coinFlip(userChoice) {
  userChoice = userChoice.toLowerCase();
  if (!["heads", "tails"].includes(userChoice)) {
    return "Invalid option. Must be 'heads' or 'tails'";
  }
  var winner;
  var computerChoice = Math.floor(Math.random() * 2) === 0 ? "heads" : "tails";
  if (userChoice === computerChoice) {
    winner = "user";
    coinFlipScore++;
  } else {
    winner = "computer";
  }
  return \`The user chose \${userChoice}, and the computer chose \${computerChoice}, so the winner is \${winner} and your score is \${coinFlipScore}\`
}
`

if (code.startsWith("\n")) code = code.slice(1)
if (code.endsWith("\n")) code = code.slice(0, -1)
code = code.replace(/\n/g, "\\n")
code = code.replace(/\"/g, '\\"')
console.log(code)