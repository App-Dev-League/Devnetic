var code = `
# fibonacci sequence
# @precondition n is zero or a positive integer
def fib(n):
  if n <= 1:
    return n
  return fib(n-1) + fib(n-2) # breaking into finding sum of previous two values of the sequence
`

if (code.startsWith("\n")) code = code.slice(1)
if (code.endsWith("\n")) code = code.slice(0, -1)
code = code.replace(/\n/g, "\\n")
code = code.replace(/\"/g, '\\"')
console.log(code)