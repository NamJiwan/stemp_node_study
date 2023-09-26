// common js
// 빌드가 필요없음
// const express = require("express");

//build -> common js
import express from "express";


const app = express();

/*
* ejs 템플릿 엔진
* 구멍이 있는 페이지 -> 구머에 데이터를 넣을수 있는걸
* node ejx
* npm install ejs
*/
app.set("view engine" ,"ejs");
//ejs의 파일의 위치는 여기야
// console.log(process.cwd()); 
// D:\영진직업\stemp_node_study
app.set("views", process.cwd() + "/src/client/html");


// node는 미들웨어 시스템으로 이루어져있음
app.use((req,res,next)=>{
  console.log("지나갑니다");
  next();
})


app.get("/",(req,res)=>{
  const homeData = {
    data : [
      {name:"처수"},
      {name:"영희"},
      {name:"민수"},      
    ],
    data1 : [
      {name:"처수1"},
      {name:"영희1"},
      {name:"민수1"},      
    ],
  };
  res.render("home",homeData)
})
app.get("/introduce",(req,res)=>{
  res.render("introduce")
})


app.listen("8080",()=>{
  console.info("8080 포트서버열림 http://localhost:8080");  
})
