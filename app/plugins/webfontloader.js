import WebFont from "webfontloader/webfontloader";

WebFont.load({
  custom: {
    families: [
      "Raleway:400,600,700",
      "Font Awesome 5 Pro",
      "Font Awesome 5 Brands",
    ],
    urls: ["/assets/css/fonts.css"],
  },
});

const fontLoader = () => <></>;

export default fontLoader;
