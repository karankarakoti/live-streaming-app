import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Box } from "atoms";

export const Text = forwardRef(({ children, id, className, values, ...props }, textRef) =>
  id ? (
    <FormattedMessage id={id} values={values}>
      {(text) => (
        <Box {...props} ref={textRef} className={className}>
          {text}
        </Box>
      )}
    </FormattedMessage>
  ) : (
    <Box {...props} ref={textRef} className={className}>
      {children || null}
    </Box>
  )
);

Text.defaultProps = {
  fontSize: "1.6rem",
  id: null,
};

Text.propTypes = {
  id: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
