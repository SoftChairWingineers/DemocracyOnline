export default function handler(req, res) {
  res.setHeader('Set-Cookie', 'session=; Max-Age=0; Path=/; HttpOnly');
  res.redirect('/login');
}