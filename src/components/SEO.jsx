import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ 
  title = "B-Connect", 
  description = "Brahmin Connect", 
  keywords = "Brahmin", 
  canonical = "Brahmin" 
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};

export default SEO;
