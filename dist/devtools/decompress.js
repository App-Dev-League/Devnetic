var LZString=function(){function e(o,r){if(!s[o]){s[o]={};for(var e=0;e<o.length;e++)s[o][o.charAt(e)]=e}return s[o][r]}var g=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",s={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(o){return e(n,r.charAt(o))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return g(o+32)})+" "},decompressFromUTF16:function(r){return null==r?"":""==r?null:i._decompress(r.length,16384,function(o){return r.charCodeAt(o)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),e=new Uint8Array(2*r.length),n=0,t=r.length;n<t;n++){var s=r.charCodeAt(n);e[2*n]=s>>>8,e[2*n+1]=s%256}return e},decompressFromUint8Array:function(o){if(null==o)return i.decompress(o);for(var r=new Array(o.length/2),e=0,n=r.length;e<n;e++)r[e]=256*o[2*e]+o[2*e+1];var t=[];return r.forEach(function(o){t.push(g(o))}),i.decompress(t.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return t.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(o){return e(t,r.charAt(o))}))},compress:function(o){return i._compress(o,16,function(o){return g(o)})},_compress:function(o,r,e){if(null==o)return"";for(var n,t,s,i,c={},p={},u="",a=2,l=3,f=2,h=[],d=0,m=0,A=0;A<o.length;A+=1)if(s=o.charAt(A),Object.prototype.hasOwnProperty.call(c,s)||(c[s]=l++,p[s]=!0),i=u+s,Object.prototype.hasOwnProperty.call(c,i))u=i;else{if(Object.prototype.hasOwnProperty.call(p,u)){if(u.charCodeAt(0)<256){for(n=0;n<f;n++)d<<=1,m==r-1?(m=0,h.push(e(d)),d=0):m++;for(t=u.charCodeAt(0),n=0;n<8;n++)d=d<<1|1&t,m==r-1?(m=0,h.push(e(d)),d=0):m++,t>>=1}else{for(t=1,n=0;n<f;n++)d=d<<1|t,m==r-1?(m=0,h.push(e(d)),d=0):m++,t=0;for(t=u.charCodeAt(0),n=0;n<16;n++)d=d<<1|1&t,m==r-1?(m=0,h.push(e(d)),d=0):m++,t>>=1}0==--a&&(a=Math.pow(2,f),f++),delete p[u]}else for(t=c[u],n=0;n<f;n++)d=d<<1|1&t,m==r-1?(m=0,h.push(e(d)),d=0):m++,t>>=1;0==--a&&(a=Math.pow(2,f),f++),c[i]=l++,u=String(s)}if(""!==u){if(Object.prototype.hasOwnProperty.call(p,u)){if(u.charCodeAt(0)<256){for(n=0;n<f;n++)d<<=1,m==r-1?(m=0,h.push(e(d)),d=0):m++;for(t=u.charCodeAt(0),n=0;n<8;n++)d=d<<1|1&t,m==r-1?(m=0,h.push(e(d)),d=0):m++,t>>=1}else{for(t=1,n=0;n<f;n++)d=d<<1|t,m==r-1?(m=0,h.push(e(d)),d=0):m++,t=0;for(t=u.charCodeAt(0),n=0;n<16;n++)d=d<<1|1&t,m==r-1?(m=0,h.push(e(d)),d=0):m++,t>>=1}0==--a&&(a=Math.pow(2,f),f++),delete p[u]}else for(t=c[u],n=0;n<f;n++)d=d<<1|1&t,m==r-1?(m=0,h.push(e(d)),d=0):m++,t>>=1;0==--a&&(a=Math.pow(2,f),f++)}for(t=2,n=0;n<f;n++)d=d<<1|1&t,m==r-1?(m=0,h.push(e(d)),d=0):m++,t>>=1;for(;;){if(d<<=1,m==r-1){h.push(e(d));break}m++}return h.join("")},decompress:function(r){return null==r?"":""==r?null:i._decompress(r.length,32768,function(o){return r.charCodeAt(o)})},_decompress:function(o,r,e){for(var n,t,s,i,c,p,u=[],a=4,l=4,f=3,h="",d=[],m={val:e(0),position:r,index:1},A=0;A<3;A+=1)u[A]=A;for(t=0,i=Math.pow(2,2),c=1;c!=i;)s=m.val&m.position,m.position>>=1,0==m.position&&(m.position=r,m.val=e(m.index++)),t|=(0<s?1:0)*c,c<<=1;switch(t){case 0:for(t=0,i=Math.pow(2,8),c=1;c!=i;)s=m.val&m.position,m.position>>=1,0==m.position&&(m.position=r,m.val=e(m.index++)),t|=(0<s?1:0)*c,c<<=1;p=g(t);break;case 1:for(t=0,i=Math.pow(2,16),c=1;c!=i;)s=m.val&m.position,m.position>>=1,0==m.position&&(m.position=r,m.val=e(m.index++)),t|=(0<s?1:0)*c,c<<=1;p=g(t);break;case 2:return""}for(n=u[3]=p,d.push(p);;){if(m.index>o)return"";for(t=0,i=Math.pow(2,f),c=1;c!=i;)s=m.val&m.position,m.position>>=1,0==m.position&&(m.position=r,m.val=e(m.index++)),t|=(0<s?1:0)*c,c<<=1;switch(p=t){case 0:for(t=0,i=Math.pow(2,8),c=1;c!=i;)s=m.val&m.position,m.position>>=1,0==m.position&&(m.position=r,m.val=e(m.index++)),t|=(0<s?1:0)*c,c<<=1;u[l++]=g(t),p=l-1,a--;break;case 1:for(t=0,i=Math.pow(2,16),c=1;c!=i;)s=m.val&m.position,m.position>>=1,0==m.position&&(m.position=r,m.val=e(m.index++)),t|=(0<s?1:0)*c,c<<=1;u[l++]=g(t),p=l-1,a--;break;case 2:return d.join("")}if(0==a&&(a=Math.pow(2,f),f++),u[p])h=u[p];else{if(p!==l)return null;h=n+n.charAt(0)}d.push(h),u[l++]=n+h.charAt(0),n=h,0==--a&&(a=Math.pow(2,f),f++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);const fs=require("fs"),PATH_TO_FILE="../assets/plugins/brython/brython.compressed.txt",WRITE_PATH="../assets/plugins/brython/brython.test.js";console.log("Decompressing file at: "+PATH_TO_FILE);let text=fs.readFileSync(PATH_TO_FILE).toString();var out=LZString.decompressFromUTF16(text);fs.writeFileSync(WRITE_PATH,out),console.log("Wrote file to "+WRITE_PATH);