const fs = require('fs')
const http = require('http')

//File Configurations

const messageFile = 'message.txt'
var clientUser = null;
var first = 1;
var initialString = ''

http.createServer(function(reques, response){
    response.writeHead(200,{
        'Content-Type' : 'text/event-stream',
        'Cache-Control' : 'no-cache'
    })
    clientUser = response;
    printDataToBrowser()
}).listen(3000)


 var printDataToBrowser = function() {  
    fs.readFile(messageFile, function (err, data) {
        if(err) {
            throw err
        }
        var lines = data.toString('utf-8').split("\n");
        if(first && lines.length) {
            first = 0;
            console.log('here1')
            clientUser.write(lines[lines.length-3])
            clientUser.write('\n')
            clientUser.write(lines[lines.length-2])
            clientUser.write('\n')
            clientUser.write(lines[lines.length-1])
            clientUser.write('\n')
        } else {
            console.log('here2')
            clientUser.write(lines[lines.length-1])
            clientUser.write('\n')
        }
    })
}

// console.log('Watching file for changes')
watchFileForChanges() 
//writeFileForChanges()

function watchFileForChanges() {
    fs.open(messageFile, 'r', function(err, fileData) {
        if(err) {
            return
        }
        fs.watch(messageFile, function(event, filename){
            if(event == 'change') {
                console.log('changed')
                printDataToBrowser(fileData)
            }
        })
    })
}


// function writeFileForChanges() {
//     fs.appendFile(messageFile, 'Hello content!', function (err) {
//        console.log('Saved!');
//        setTimeout(writeFileForChanges, 2000) 
//     });
// }
