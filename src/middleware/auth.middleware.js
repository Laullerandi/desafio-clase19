const authMdw = (req, res, next) => {
  console.log("Validando sesión");
  if(req.session?.user) {
    return next();
  }

  return res.redirect("login");
}


export default authMdw;