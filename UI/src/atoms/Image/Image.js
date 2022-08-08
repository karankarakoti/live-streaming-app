import React from "react";

import { ImageWrapper } from "./Image.styles";

export const Image = React.memo(({ src, alt, objectFit, borderRadius, ...rest }) => (
  <ImageWrapper {...rest}>
    <img src={src} alt={alt} width="100%" height="100%" style={{objectFit: objectFit || "unset", borderRadius: borderRadius || "unset"}} />
  </ImageWrapper>
));
