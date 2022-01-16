export const home = async (req, res) => {
  res.locals.user  = req.session?.user || null;
  await res.render('pages/home');
  delete res.locals.user;
}