import clsx from "clsx";
import { ConditionalLinkProps } from "./ConditionalLink.types";
import { Link } from "react-router-dom";

const ConditionalLink = ({ condition, children, style, className, ...linkProps }: ConditionalLinkProps): JSX.Element =>
    condition ? (
        <Link className={clsx("flex", className)} style={style} {...linkProps}>
            {children}
        </Link>
    ) : (
        <span className={clsx("flex", className)} style={style}>
            {children}
        </span>
    );

export default ConditionalLink;
