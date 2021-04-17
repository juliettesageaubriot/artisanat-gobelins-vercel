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
      {/* <link rel="manifest" href="/app.manifest" crossorigin="use-credentials"/> */}
      <link rel="preload" href="/assets/fonts/fa-regular-400.woff2" as="font" type="font/woff2" crossorigin="" />
      <link rel="preload" href="/assets/fonts/fa-brands-400.woff2" as="font" type="font/woff2" crossorigin="" />
      <link rel="preload" href="/assets/fonts/fa-light-300.woff2" as="font" type="font/woff2" crossorigin="" />

      <link rel="apple-touch-icon" sizes="57x57" href="/assets/favicon/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/assets/favicon/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/assets/favicon/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/assets/favicon/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/assets/favicon/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/assets/favicon/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/assets/favicon/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/assets/favicon/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/assets/favicon/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/assets/favicon/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff"></meta>
    </Helmet>
  );
}

export default TheSeo;
