let builtUrl = "https://www.linkedin.com/jobs/search/?keywords=software%20engineer&location=Scottsdale%2C%20Arizona&locationId=us.4-1-0-8-29&start=25"

const axios = require("axios")
const fs = require("fs")
const cheerio = require("cheerio")

axios(builtUrl, {
    method: "GET"
}).then(resp => {
    let $ = cheerio.load(resp.data)
    let arr = []
    for(keys in resp.request){
        arr.push(keys)
    }
// status,statusText,headers,config,request,data
// _events,_eventsCount,_maxListeners,output,outputEncodings,outputCallbacks,outputSize,writable,_last,chunkedEncoding,shouldKeepAlive,useChunkedEncodingByDefault,sendDate,_removedConnection,_removedContLen,_removedTE,_contentLength,_hasBody,_trailer,finished,_headerSent,socket,connection,_header,_onPendingData,agent,socketPath,timeout,method,path,_ended,res,aborted,timeoutCb,upgradeOrConnect,parser,maxHeadersCount,_redirectable,_finish,_implicitHeader,abort,onSocket,_deferToConnect,setTimeout,setNoDelay,setSocketKeepAlive,clearTimeout,_renderHeaders,destroy,_send,_writeRaw,_storeHeader,setHeader,getHeader,getHeaderNames,getHeaders,hasHeader,removeHeader,headersSent,write,addTrailers,end,_flush,_flushOutput,flushHeaders,flush,pipe,setMaxListeners,getMaxListeners,emit,addListener,on,prependListener,once,prependOnceListener,removeListener,off,removeAllListeners,listeners,rawListeners,listenerCount,eventNames
    
    fs.writeFile("log.txt", resp.request.write, function(err){
        console.log("wrote")
    })
    // console.log(jobArr)
})