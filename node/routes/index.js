var express = require('express');
var router = express.Router();
const { exec } = require('child_process');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { flag: false });
});

function Delete_file(filename){
  exec(`rm ${filename}`, (err, stdout, stderr) => {  /* Delete File  */
    if (err) {
          console.log(err);
    }
    else{
      console.log(filename," Deleted .");
    }
  })
}

function Execute_Code(filename,compile,run,lang,res,result){
      exec(compile, (err, stdout, stderr) => {  /* Compile  */
        if (err) {
              console.log(err);
        }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
        if(stderr){
              result.output=stderr;
              res.set("Content-type", "application/json; charset=utf-8")
              res.send(JSON.stringify(result, null, '\t'));
              return;
        }
      exec(run,(err, stdout, stderr) => {  /* run  */
        if (err) {
            console.log(err);
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if(stderr){
              result.output=stderr;
              res.set("Content-type", "application/json; charset=utf-8")
              res.send(JSON.stringify(result, null, '\t'));
              return;
        }
        result.output=stdout;
        Delete_file(filename);
        Delete_file("input");
        res.set("Content-type", "application/json; charset=utf-8")
        res.send(JSON.stringify(result, null,'\t'));
      })
    });
}

function CreateFiles(filename,code,input,compile,run,lang,res,execute_code){
  result = {
    lang:lang,
    output:''
  }
  fs.writeFile(filename, code,  (err) => { /* Create  source code file  */
    if (err){
      console.log(err);
      result.output=err;
      res.set("Content-type", "application/json; charset=utf-8")
      res.send(JSON.stringify(result, null, '\t'));
      return;
    }
  else{
        console.log(filename,'created !');
        fs.writeFile("input",input,(err) => { /* Create  input file  */
             if(err){
               console.log(err);
               result.output=err;
               res.set("Content-type", "application/json; charset=utf-8")
               res.send(JSON.stringify(result, null, '\t'));
               return;
             }
             console.log('input file created !');
             execute_code(filename,compile,run,lang,res,result);
        })
  }
});
}

router.post('/',function(req, res, next) {
    console.log(req.body.data)
    let lang = req.body.lang;
    let code = req.body.code;
    let input = req.body.input;
    let compile = {        /* commands for compile */
          c:"gcc main.c",
          cpp:"g++ main.cpp",
          py:"pyc main.py"
    }
    let filenames = {   /* file names for different languages */
        c:"main.c",
        cpp:"main.cpp",
        py:"main.py"
    }
    let run = {         /* commands for run  */
        c:"./a.out < input",
        cpp:"./a.out < input",
        py:"py main.py < input"
    }
    CreateFiles(filenames[lang],code,input,compile[lang],run[lang],lang,res,Execute_Code);
  
  
})

module.exports = router;
