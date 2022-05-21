var text=`
So what is CORS? Well CORS is a thing that keeps the internet safe. It blocks requests from domains that are not it’s own.
If, for some reason, you wanted to allow requests from all domains to your server, you first need another package: “cors”, and then import it into your program. Then, app.use(cors()) 
If you would like to allow cors for a 
specific domain, use app.use(cors({origin: “yourdomain”}))
`,code=(String.prototype.replaceAll=function(t,e){t=new RegExp(t,"g");return this.replace(t,e)},text=(text=(text=0===text.indexOf("\n")?text.slice(1):text).lastIndexOf("\n")===text.length-1?text.slice(0,-1):text).split("\n"),[]);for(i=0;i<text.length;i++)text[i].startsWith("        ")?code.push({type:"text",content:"[[ ]][[ ]][[ ]][[ ]]● "+text[i].slice(8)}):text[i].startsWith("    ")?code.push({type:"text",content:"[[ ]][[ ]]◆ "+text[i].slice(4)}):code.push({type:"text",content:"➔ "+text[i]});console.log(JSON.stringify(code).slice(1,-1));