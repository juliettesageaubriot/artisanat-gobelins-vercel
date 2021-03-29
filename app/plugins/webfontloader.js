import WebFont from "webfontloader/webfontloader";

WebFont.load({
  custom: {
    families: [
      "Open Sans:400,600,700",
      "Font Awesome 6 Pro",
      "Font Awesome 6 Brands",
    ],
    urls: ["/assets/css/fonts.css"],
  },
});

const fontLoader = () => <></>;

export default fontLoader;
