import { SVGProps } from "react";

export function IconText(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em" height="1em"
            viewBox="0 0 24 24" {...props}>
            <path fill="currentColor" d="M10 19.11L12.11 17H7v-2h7v.12L16.12 13H7v-2h10v1.12l1.24-1.23c.48-.48 1.11-.75 1.8-.75c.33 0 .66.07.96.19V5a2 2 0 0 0-2-2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h5zM7 7h10v2H7zm14.7 7.35l-1 1l-2.05-2.05l1-1a.55.55 0 0 1 .77 0l1.28 1.28c.21.21.21.56 0 .77M12 19.94l6.06-6.06l2.05 2.05L14.06 22H12z"></path>
        </svg>
    )
}