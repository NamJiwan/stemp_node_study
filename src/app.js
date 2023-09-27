// common js
// 빌드가 필요없음
// const express = require("express");

//build -> common js
import "dotenv/config"
import "regenerator-runtime"
import express from "express";
import viewRouter from "./router/viewRouter";
import apiRouter from "./router/apiRouter";



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
// app.use((req,res,next)=>{
//   console.log("지나갑니다");
//   next();
// })
app.use("/css",express.static("src/client/css"));
app.use("/js",express.static("src/client/js"));
app.use("/file",express.static("src/client/file"));
/*
 * 주소 : /**   view만 전달해주는 router  viewRouter => ejs 파일만 전달해주는 
 * 주소 : /api  api만 전달해주는 router   apiRouter => 데이터만 전달해주는
 */
app.use("/api", apiRouter);
app.use("/",viewRouter);


app.listen("8080",()=>{
  console.info("8080 포트서버열림 http://localhost:8080");  
})
