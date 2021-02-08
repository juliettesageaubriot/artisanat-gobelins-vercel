import React from 'react';
import Link from 'next/link'

export default function Custom404() {

  return (
    <section id="main404" className="section section_404" data-template="section404">
          <Link href="/">
            <a className="link link_homepage btn">Return to the homepage</a>
          </Link>
    </section>
  )
}
