import net from "node:net";
const s = net.createConnection({host:'127.0.0.1',port:5433});
s.on('connect',()=>{console.log('TCP_OK'); s.end();});
s.on('error',(e)=>{console.log('TCP_ERR', e.code, e.message);});
setTimeout(()=>process.exit(0),3000);
