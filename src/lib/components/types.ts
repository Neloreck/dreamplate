import { DetailedHTMLProps, HTMLAttributes } from "react";

// @Lib.
import { ContentCard, IContentCardProps } from "@Lib/components/custom/ContentCard";
import { CustomButton, ICustomButtonProps } from "@Lib/components/custom/CustomButton";
import { CustomHeading, ICustomHeadingProps } from "@Lib/components/custom/CustomHeading";
import { ApplicationRoot, IApplicationRootProps } from "@Lib/components/layout/ApplicationRoot";
import { IModalRootProps, ModalRoot } from "@Lib/components/layout/ModalRoot";

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
  "application-root": DetailedHTMLProps<IApplicationRootProps, ApplicationRoot>;
  "modal-root": DetailedHTMLProps<IModalRootProps, ModalRoot>;
  "content-card": DetailedHTMLProps<IContentCardProps, ContentCard>;
  "custom-button": DetailedHTMLProps<ICustomButtonProps, CustomButton>;
  "custom-heading": DetailedHTMLProps<ICustomHeadingProps, CustomHeading>;
}
