//viewController.js
export const homeViewController = (req,res)=>{
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
};

export const introduceViewController = (req,res)=>{
  res.render("introduce")
}
export const courseViewController = (req,res)=>{
  res.render("course")
}
export const qrController = (req,res)=>{
  res.render("qr")
}
export const profileController = (req,res)=>{
  res.render("profile")
}
export const joinController = (req,res)=>{
  res.render("join")
}
export const loginController = (req,res)=>{
  res.render("login")
}
