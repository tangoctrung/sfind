import { SVGProps } from "react";

export function IconInfo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em" height="1em"
            viewBox="0 0 24 24" {...props}>
            <path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14c0 .53-.21 1.04-.59 1.41c-.37.38-.88.59-1.41.59H5c-.53 0-1.04-.21-1.41-.59C3.21 20.04 3 19.53 3 19V5c0-1.11.89-2 2-2m6 6h2V7h-2zm3 8v-2h-1v-4h-3v2h1v2h-1v2z"></path>
        </svg>
    )
}