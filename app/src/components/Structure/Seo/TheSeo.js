import React from 'react';
import { Helmet } from "react-helmet"

const TheSeo = ({ title, description }) => {
  return (
    <Helmet
      title={title}
      lang="FR_fr"
      description={description}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: "",
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        }
      ]
      }
    >
      <link rel="manifest" href="/app.manifest" crossorigin="use-credentials"/>
      <link rel="preload" href="/assets/fonts/fa-regular-400.woff2" as="font" type="font/woff2" crossorigin=""/>
      <link rel="preload" href="/assets/fonts/fa-brands-400.woff2" as="font" type="font/woff2" crossorigin=""/>
    </Helmet>
  );
}

export default TheSeo;
