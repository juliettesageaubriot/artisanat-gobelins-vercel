import dynamic from "next/dynamic";

const WebFont = dynamic(() => import("../../plugins/webfontloader"), {
  ssr: false,
});

export default WebFont;
