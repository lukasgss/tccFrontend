import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface MetaTagsProps {
  title: string;
  description: string;
  keywords: string;
}

export default function MetaTags({ title, description, keywords }: Readonly<MetaTagsProps>) {
  const location = useLocation();

  return (
    <HelmetProvider>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={`Ache Meu Pet, AcheMeuPet, achemeupet, ache meu pet, ${keywords}`} />
        <meta name="author" content="AcheMeuPet" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://achemeupet.com.br${location.pathname}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://achemeupet.com.br/assets/images/ache-meu-pet-logo.webp" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://achemeupet.com.br${location.pathname}`} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="https://achemeupet.com.br/assets/images/ache-meu-pet-logo.webp" />

        {/* WhatsApp */}
        <meta property="og:site_name" content="AcheMeuPet" />
        <meta property="og:locale" content="pt_BR" />
      </Helmet>
    </HelmetProvider>
  );
}
