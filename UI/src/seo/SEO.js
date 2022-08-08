import MetaTags from 'react-meta-tags';

const SEO = ({ title, description, keywords, currentURL, previewImage, type }) => {
  return (
    <MetaTags>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=6"
      />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:site_name" content={title} key="ogsitename" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:url" content={currentURL} key="ogurl" />
      <meta property="og:image" content={previewImage ? previewImage : "/favicon-lg.png" } key="ogimage" />
      <meta property="og:type" content={type} key="ogtype" />

      {/* We will use this during Blogs SEO */}
      {/* <meta property="og:image:secure_url" content="https://res.cloudinary.com/fay/image/upload/w_1280,h_640,c_fill,q_auto,f_auto/w_860,c_fit,co_rgb:232129,g_west,x_80,y_-60,l_text:Source%20Sans%20Pro_70_line_spacing_-10_semibold:Anyone%20Can%20Map!%20Inspiration%20and%20an%20introduction%20to%20the%20world%20of%20mapping/blog-social-card-1.1" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="640" /> */}

      {/* We will use this during Blogs SEO */}
      {/* <meta property="og:type" content="article" />
      <meta property="article:publisher" content="https://www.colbyfayock.com" />
      <meta property="article:section" content="Coding" />
      <meta property="article:tag" content="Coding" /> */}

      <title>{title}</title>

      <link href="/manifest.json" rel="manifest" />
      <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
      <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
      <link href="/favicon-32x32.png" rel="apple-touch-icon" />
      <meta name="theme-color" content="#002147" />
    </MetaTags>
  );
};

export default SEO;
