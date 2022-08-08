import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { fontSize, variant } from "styled-system";
import PropTypes from "prop-types";

import { Box, Flex, Text, Loader } from "atoms";

const ButtonBase = styled(Box)`
  position: relative;
  cursor: pointer;
  outline: none;
  border: none;
  display: grid;
  align-items: center;
  font-family: Inter;
  font-size: 1.2rem;

  ${variant({
    variants: {
      primary: {
        color: "white",        
        bg: "primary.200",        
        fontFamily: "primary",        
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all .3s",
        fontWeight: 600,
        "&:active, &:hover": {
          bg: "primary.200",
          color: "primary.100",
        },
        "&:focus": {
          bg: "primary.200",
          color: "primary.100",
          outline: "none",          
        },
      },
      primaryOutline: {
        color: "primary.200",        
        bg: "white",        
        fontFamily: "primary",        
        border: "1px solid",
        borderColor: "primary.200",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all .3s",
        fontWeight: 600,
        "&:active, &:hover": {
          bg: "primary.200",
          color: "white",
          borer: "none",
        },
        "&:focus": {
          bg: "primary.200",
          color: "white",
          outline: "none",          
          borer: "none",
        },
      },
      secondary: {
        color: "white",
        bg: "secondary.100",
        fontFamily: "primary",        
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all .3s",
        fontWeight: 600,
        "&:active, &:hover": {
          bg: "secondary.200",
          color: "white",
        },
        "&:focus": {
          bg: "secondary.200",
          color: "white",
          outline: "none",          
        },
      },
      accent: {
        color: "white",
        bg: "accent.100",
        fontFamily: "primary",        
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all .3s",
        fontWeight: 600,
        "&:active, &:hover": {
          bg: "accent.200",
          color: "white",
        },
        "&:focus": {
          bg: "accent.200",
          color: "white",
          outline: "none",          
        },
      },
      success: {
        color: "white",
        bg: "success.100",
        fontFamily: "primary",        
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all .3s",
        fontWeight: 600,
        "&:active, &:hover": {
          bg: "success.200",
          color: "white",
        },
        "&:focus": {
          bg: "success.200",
          color: "white",
          outline: "none",          
        },
      },
      info: {
        color: "white",
        bg: "info.100",
        fontFamily: "primary",        
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all .3s",
        fontWeight: 600,
        "&:active, &:hover": {
          bg: "info.200",
          color: "white",
        },
        "&:focus": {
          bg: "info.200",
          color: "white",
          outline: "none",          
        },
      },
      danger: {
        color: "white",
        bg: "danger.100",
        fontFamily: "primary",        
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all .3s",
        fontWeight: 600,
        "&:active, &:hover": {
          bg: "danger.200",
          color: "white",
        },
        "&:focus": {
          bg: "danger.200",
          color: "white",
          outline: "none",          
        },
      },
      white: {
        bg: "white",
        color: "danger.100",
        fontFamily: "primary",        
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all .3s",
        fontWeight: 600,
        "&:active, &:hover": {
          color: "danger.200",
          bg: "white",
        },
        "&:focus": {
          color: "danger.200",
          bg: "white",
          outline: "none",          
        },
      },
      warning: {
        color: "white",
        bg: "warning.100",
        fontFamily: "primary",        
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all .3s",
        fontWeight: 600,
        "&:active, &:hover": {
          bg: "warning.200",
          color: "white",
        },
        "&:focus": {
          bg: "warning.200",
          color: "white",
          outline: "none",          
        },
      },
      disabled: {
        color: "white",
        backgroundColor: "grey.200",
        cursor: "not-allowed",
        border: "none",
      },      
    },
  })}
  &[disabled] {
    color: "grey.500";
    background-color: "grey.600";
    cursor: not-allowed;
  }
`;

export const Button = ({
  disabled,
  loading,
  children,
  variant: v = "primary",
  onClick,
  showAsyncLoad,
  fontWeight,
  classes,
  label,
  ...rest
}) => {
  const [asyncLoading, setLoading] = useState(false);
  const onClickHandler = useCallback(
    async (...arg) => {
      setLoading(true);
      try {
        await onClick?.(arg);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    },
    [onClick]
  );

  return (
    <ButtonBase
      variant={v}
      as="button"
      color="white"
      {...rest}
      onClick={onClickHandler}
      disabled={disabled || loading || (showAsyncLoad && asyncLoading)}
      overflow="hidden"
      className={classes}
    >
      {(loading || (showAsyncLoad && asyncLoading)) && (
        <Flex
          left={0}
          right={0}
          position="absolute"
          justifyContent="center"
          alignItems="center"
          fontSize={2}
          height="15px"
          width="15px"
          mx="auto"
        >
          <Loader loading />
        </Flex>
      )}
      {label ? (
        <Text
          color="inherit"
          opacity={loading || (showAsyncLoad && asyncLoading) ? 0 : 1}
          id={label}
          fontSize={fontSize}
          fontWeight={fontWeight}
        />
      ) : (
        <Text
          color="inherit"
          opacity={loading || (showAsyncLoad && asyncLoading) ? 0 : 1}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontSize={fontSize}
        >
          {children}
        </Text>
      )}
    </ButtonBase>
  );
};

Button.defaultProps = {
  as: "button",
  width: "100%",
  fontSize: "1.2rem",  
};

Button.propTypes = {  
  fontSize: PropTypes.string,
  as: PropTypes.string,
  width: PropTypes.string,
};
