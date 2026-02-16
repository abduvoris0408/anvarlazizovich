export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Burxonov Anvar Lazizovich - Advokat va Mediator",
    description:
      "Professional legal services: civil, criminal, family, labor law and mediation. 15+ years of experience, 500+ successful cases.",
    url: "https://burxonov-law.uz",
    telephone: "+998901234567",
    email: "info@burxonov.uz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tashkent",
      addressLocality: "Tashkent",
      addressRegion: "Tashkent",
      postalCode: "100000",
      addressCountry: "UZ",
    },
    areaServed: ["UZ", "Uzbekistan"],
    priceRange: "$$",
    image: "https://burxonov-law.uz/logo.png",
    sameAs: [
      "https://t.me/burxonov_advokat",
      "https://www.facebook.com/burxonov.advokat",
    ],
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://burxonov-law.uz",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://burxonov-law.uz/practice",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Mediation",
        item: "https://burxonov-law.uz/mediation",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "About",
        item: "https://burxonov-law.uz/about",
      },
    ],
  }

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Burxonov Anvar Lazizovich",
    jobTitle: "Lawyer and Certified Mediator",
    description:
      "Professional lawyer and certified mediator with 15+ years of experience in civil, criminal, family, and labor law.",
    url: "https://burxonov-law.uz",
    email: "info@burxonov.uz",
    telephone: "+998901234567",
    nationality: "Uzbek",
    knowsAbout: [
      "Civil Law",
      "Criminal Law",
      "Family Law",
      "Labor Law",
      "Mediation",
    ],
    memberOf: {
      "@type": "Organization",
      name: "Uzbekistan Lawyers Association",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  )
}
