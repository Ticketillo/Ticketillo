import { Ref } from "react";
import { IconProps } from "./Icon.types";
import clsx from "clsx";
import "./Icon.css";

export default function SvgIcon({ className, style, children, ref, ...rest }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            className={clsx("icon", className)}
            style={style}
            ref={ref as Ref<SVGSVGElement>}
            role="img"
            {...rest}
        >
            {children}
        </svg>
    );
}
