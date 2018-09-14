const FontFaceObserver = require("fontfaceobserver");

const Fonts = () => {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css?family=Quicksand:300,400,500,700,900";
  link.rel = "stylesheet";

  document.head.appendChild(link);

  const roboto = new FontFaceObserver("Quicksand");

  roboto.load().then(() => {
    document.documentElement.classList.add("Quicksand");
  });
};

export default Fonts;
