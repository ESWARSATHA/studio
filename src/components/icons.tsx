import type { SVGProps } from "react";

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2l4.95 4.95-2.83 7.07-7.07 2.83L2 12z" />
    <path d="M12 22l4.95-4.95-2.83-7.07-7.07-2.83L2 12" />
    <path d="M17.83 7.07L22 12l-4.95 4.95-7.07-2.83" />
    <path d="M6.17 16.93L2 12l4.95-4.95 7.07 2.83" />
  </svg>
);
