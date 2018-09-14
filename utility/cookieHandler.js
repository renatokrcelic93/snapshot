export const getCookie = a => {
  var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
};

export const deleteCookie = (name, domain) => {
  if (domain) {
    document.cookie =
      name + "=; domain=" + domain + "; Max-Age=-99999999; Path=/";
  } else {
    document.cookie = name + "=; Max-Age=-99999999;";
  }
};

export const setCookie = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; Path=/";
};
