function doesFileExist(s){return new Promise(async(t,e)=>{tApp.get(s).then(e=>{t(404!==e.status)}).catch(()=>{t(!1)})})}module.exports=doesFileExist;