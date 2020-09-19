export default function redirectToHomePage(history, routes) {
  console.log('--->', history);
  return history.push(routes);
}
