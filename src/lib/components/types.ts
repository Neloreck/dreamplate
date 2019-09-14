import { DetailedHTMLProps, HTMLAttributes } from "react";

// @Lib.
import { ContentCard, IContentCardProps } from "@Lib/components/custom/ContentCard";
import { CustomButton, ICustomButtonProps } from "@Lib/components/custom/CustomButton";
import { CustomHeading, ICustomHeadingProps } from "@Lib/components/custom/CustomHeading";

/**
 * Declare class field for web-components based elements.
 * Non-native elements don't support className property.
 */
export interface ICustomElementAttributes extends HTMLAttributes<any> {
  className?: string;
  class?: string;
}

/**
 * Declaration of custom elements for external JSX usage.
 */
export interface ICustomIntrinsicElements {
  "content-card": DetailedHTMLProps<IContentCardProps, ContentCard>;
  "custom-button": DetailedHTMLProps<ICustomButtonProps, CustomButton>;
  "custom-heading": DetailedHTMLProps<ICustomHeadingProps, CustomHeading>;
}
