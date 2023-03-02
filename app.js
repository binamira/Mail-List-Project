const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {
    res.sendFile(__dirname+"/signup.html")
    
})

app.post("/",function (req,res) {
    var firstName=req.body.name
    var lastName=req.body.surname
    var emailAdress=req.body.email

    var data={
         members :
        [{
             email_address:emailAdress,
             status:"subscribed",
             merge_fields:{
                FNAME: firstName,
                LNAME: lastName,

             }

        }]
    }

    var jsonData=JSON.stringify(data);
    const url="https://us11.api.mailchimp.com/3.0/lists/9e3c85b40c"
    var options={
        method:"POST",
        auth:"amira:14f74d91b16590c7aad89e08e37f7752-us11",
    }
    const request=https.request(url,options,function (response) {
        response.on("data",function (data) {
            console.log(JSON.parse(data))
            
            if (response.statusCode===200) {
                res.sendFile(__dirname+"/success.html")
                
            }else{
                res.sendFile(__dirname+"/fail.html")
            }

            
        })
        
    })

    request.write(jsonData);
    request.end();

    
})

app.post("/fail",function (req,res) {
    res.redirect("/");
    
})


app.listen(3000,function () {

    console.log("server 3k started")
    
})

//14f74d91b16590c7aad89e08e37f7752-us11
//9e3c85b40c