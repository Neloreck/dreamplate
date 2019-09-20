import { DetailedHTMLProps, HTMLAttributes } from "react";

// @Lib.
import { CustomButton, ICustomButtonProps } from "@Lib/components/custom/CustomButton";
import { CustomCard, ICustomCardProps } from "@Lib/components/custom/CustomCard";
import { CustomHeading, ICustomHeadingProps } from "@Lib/components/custom/CustomHeading";
import { CustomLoader, ICustomLoader } from "@Lib/components/custom/CustomLoader";
import { ApplicationRoot, IApplicationRootProps } from "@Lib/components/layout/ApplicationRoot";
import { IModalRootProps, ModalRoot } from "@Lib/components/layout/ModalRoot";

/**
 * Declare class field for web-components based elements.
 * Non-native elements don't support className property.
 */
export interface ICustomElementAttributes<T> extends HTMLAttributes<T> {
  className?: string;
  class?: string;
}

/**
 * Declaration of custom elements for external JSX usage.
 */
export interface ICustomIntrinsicElements {
  "application-root": DetailedHTMLProps<IApplicationRootProps, ApplicationRoot>;
  "modal-root": DetailedHTMLProps<IModalRootProps, ModalRoot>;
  "custom-card": DetailedHTMLProps<ICustomCardProps, CustomCard>;
  "custom-button": DetailedHTMLProps<ICustomButtonProps, CustomButton>;
  "custom-heading": DetailedHTMLProps<ICustomHeadingProps, CustomHeading>;
  "custom-loader": DetailedHTMLProps<ICustomLoader, CustomLoader>;
}
