export const getCSRFToken = () => {
  const name = "csrftoken=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length);
  }
  console.log(cookies);

  return "";
};
