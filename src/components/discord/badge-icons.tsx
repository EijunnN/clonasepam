import type { SVGProps } from "react";

export interface BadgeIconProps extends SVGProps<SVGSVGElement> {
  palette?: readonly string[] | null;
}

// Helper to get colors safely
const getColors = (
  palette: readonly string[] | null | undefined,
  defaultColors: string[],
) => {
  if (!palette || palette.length < 4) return defaultColors;
  return palette;
};

export function Agua({ palette, ...props }: BadgeIconProps) {
  const [l, m, d, d2] = getColors(palette, [
    "#ffffff",
    "#0abbff",
    "#4282d8",
    "#4282d8",
  ]);
  return (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 6V5h-1V4h-1V3h-1V2H9V1H7v1H6v1H5v1H4v1H3v1H2v2H1v5h1v1h2v1h8v-1h2v-1h1V8h-1V6h-1Z"
        fill={m}
      />
      <path
        d="M7 0v1h2V0H7ZM6 1v1h1V1H6ZM9 1v1h1V1H9ZM10 2v1h1V2h-1ZM11 3v1h1V3h-1ZM12 4v1h1V4h-1ZM13 5v1h1V5h-1ZM14 6v2h1V6h-1ZM1 6v2h1V6H1ZM0 8v5h1V8H0ZM15 8v5h1V8h-1ZM5 2v1h1V2H5ZM4 3v1h1V3H4ZM3 4v1h1V4H3ZM2 5v1h1V5H2ZM1 13v1h1v-1H1ZM14 13v1h1v-1h-1ZM4 15v1h8v-1H4Z"
        fill="#000"
      />
      <path d="M4 14v1h8v-1H4Z" fill={d} />
      <path d="M2 14v1h2v-1H2ZM14 15v-1h-2v1h2Z" fill="#000" />
      <path d="M7 1v1h2V1H7Z" fill={l} />
      <path
        opacity=".5"
        d="M11 8V7h-1V6H9V5H7v1H6v1H5v1H4v3h1v1h6v-1h1V8h-1Z"
        fill="#fff"
      />
      <path
        d="M6 2v1h1V2H6ZM5 3v1h1V3H5ZM6 4v1h1V4H6ZM4 4v1h1V4H4ZM3 5v1h1V5H3ZM2 6v2h1V6H2ZM1 8v2h1V8H1Z"
        fill={l}
      />
      <path
        d="M12 5v1h1V5h-1ZM13 6v2h1V6h-1ZM14 8v4h-1v1h-1v1h2v-1h1V8h-1ZM2 14h2v-1H2v1Z"
        fill={d}
      />
    </svg>
  );
}

export function Brujula({ palette, ...props }: BadgeIconProps) {
  const [l, m, d, d2] = getColors(palette, [
    "#f0f0f0",
    "#47baff",
    "#4282d8",
    "#be0351",
  ]);
  return (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4V3H9V1H7v2H6v1H5v1h1v1h1v1h2V6h1V5h1V4h-1Z" fill={m} />
      <path
        d="M10 12v1H9v2H7v-2H6v-1H5v-1h1v-1h1V9h2v1h1v1h1v1h-1Z"
        fill={d2} // Originally Red
      />
      <path d="M7 0v1h2V0H7Z" fill="#000" />
      <path d="M7 1v1h2V1H7Z" fill={l} />
      <path d="M7 6v1h2V6H7Z" fill={d} />
      <path
        d="M7 1H6v2h1V1ZM1 7H0v2h1V7ZM3 7V6H1v1h2ZM6 3H5v1h1V3Z"
        fill="#000"
      />
      <path d="M6 4H5v1h1V4ZM7 3H6v1h1V3Z" fill={l} />
      <path d="M7 9v1h2V9H7Z" fill={l} />
      <path d="M7 14v1h2v-1H7ZM7 12H6v1h1v-1ZM6 11H5v1h1v-1Z" fill={d2} />
      <path d="M7 10H6v1h1v-1Z" fill={l} />
      <path d="M9 13h1v-1H9v1ZM10 12h1v-1h-1v1ZM9 11h1v-1H9v1Z" fill={d2} />
      <path d="M8 4H7v1h1V4Z" fill={l} />
      <path d="M10 5H9v1h1V5ZM11 4h-1v1h1V4Z" fill={d} />
      <path
        d="M12 10h1V9h2V7h-2V6h-1V5h-1v1h-1v1H9v2h1v1h1v1h1v-1Z"
        fill="#C7C7C7"
      />
      <path d="M15 7h-1v2h1V7Z" fill="#707070" />
      <path d="M12 6V5h-1v1h1ZM11 7V6h-1v1h1Z" fill="#fff" />
      <path
        d="M11 10V9h-1v1h1ZM10 9V8H9v1h1ZM13 10V9h-1v1h1ZM12 11v-1h-1v1h1Z"
        fill="#707070"
      />
      <path
        d="M4 10H3V9H1V7h2V6h1V5h1v1h1v1h1v2H6v1H5v1H4v-1Z"
        fill="#C7C7C7"
      />
      <path d="M1 9h1V7H1v2Z" fill="#fff" />
      <path d="M6 9h1V7H6v2Z" fill="#707070" />
      <path d="M5 6V5H4v1h1ZM4 7V6H3v1h1ZM5 8V7H4v1h1Z" fill="#fff" />
      <path d="M6 10V9H5v1h1ZM5 11v-1H4v1h1Z" fill="#707070" />
      <path
        d="M5 4H4v1h1V4ZM6 5H5v1h1V5ZM7 6H6v1h1V6ZM9 7H7v2h2V7ZM10 9H9v1h1V9ZM11 10h-1v1h1v-1ZM4 5H3v1h1V5ZM9 16v-1H7v1h2ZM7 13H6v2h1v-2ZM1 9v1h2V9H1ZM6 12H5v1h1v-1ZM5 11H4v1h1v-1ZM4 10H3v1h1v-1ZM9 3h1V1H9v2ZM15 9h1V7h-1v2ZM15 7V6h-2v1h2ZM10 4h1V3h-1v1ZM11 5h1V4h-1v1ZM10 6h1V5h-1v1ZM9 7h1V6H9v1ZM6 10h1V9H6v1ZM5 11h1v-1H5v1Z"
        fill="#000"
      />
      <path
        d="M11 5h1V4h-1v1ZM12 6h1V5h-1v1ZM9 15h1v-2H9v2ZM13 9v1h2V9h-2ZM10 13h1v-1h-1v1ZM11 12h1v-1h-1v1ZM12 11h1v-1h-1v1Z"
        fill="#000"
      />
    </svg>
  );
}

export function Cuernos({ palette, ...props }: BadgeIconProps) {
  const [l, m, d, d2] = getColors(palette, [
    "#f0f0f0",
    "#b79cf8",
    "#816bee",
    "#816bee",
  ]);
  return (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 5V3h-1V2h-1V1h-2v1h1v1h1v4h-1v1h-1v1H6V8H5V7H4V3h1V2h1V1H4v1H3v1H2v2H1v6h1v2h1v1h2v1h6v-1h2v-1h1v-2h1V5h-1Z"
        fill={m}
      />
      <path
        d="M6 0H4v1h2V0ZM2 3H1v2h1V3ZM5 3H4v4h1V3ZM10 8H6v1h4V8Z"
        fill="#000"
      />
      <path d="M10 9H6v1h4V9Z" fill={l} />
      <path d="M1 5H0v6h1V5ZM11 15H5v1h6v-1Z" fill="#000" />
      <path
        d="M2 10H1v1h1v-1ZM13 12h-2v1H5v-1H3v-1H2v2h1v1h2v1h6v-1h2v-1h1v-2h-1v1ZM15 10h-1v1h1v-1Z"
        fill={d}
      />
      <path d="M4 1H3v1h1V1ZM3 2H2v1h1V2Z" fill="#000" />
      <path
        d="M6 1H4v1h2V1ZM4 2H3v1h1V2ZM3 3H2v1h1V3ZM2 5H1v1h1V5ZM3 6H2v1h1V6ZM5 7H4v1h1V7ZM6 8H5v1h1V8ZM12 7h-1v1h1V7ZM11 1h-1v1h1V1ZM11 8h-1v1h1V8Z"
        fill={l}
      />
      <path
        d="M7 1H6v1h1V1ZM6 2H5v1h1V2ZM6 7H5v1h1V7ZM2 11H1v2h1v-2ZM3 13H2v1h1v-1ZM12 0h-2v1h2V0ZM13 14h-2v1h2v-1ZM5 14H3v1h2v-1ZM15 3h-1v2h1V3ZM12 3h-1v4h1V3ZM16 5h-1v6h1V5ZM13 1h-1v1h1V1ZM14 2h-1v1h1V2ZM10 1H9v1h1V1ZM11 2h-1v1h1V2ZM11 7h-1v1h1V7ZM15 11h-1v2h1v-2ZM14 13h-1v1h1v-1Z"
        fill="#000"
      />
      <path d="M5 2H4v1h1V2Z" fill={m} />
    </svg>
  );
}

export function Espada({ palette, ...props }: BadgeIconProps) {
  const [l, m, d, d2] = getColors(palette, [
    "#d1cdd5",
    "#ffe361",
    "#847d8b",
    "#ffb84b",
  ]);
  return (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 1v1h-1v1H9v1H8v1H7v2H6v1h2v2h1V9h2V8h1V7h1V6h1V5h1V1h-4Z"
        fill={l}
      />
      <path
        d="M3 9h1v1h2v2h1v1h2v1h2v-2H9v-1H8v-1H7V9H6V8H5V7H4V5H2v2h1v2Z"
        fill={m}
      />
      <path d="M5 11H3v2h2v-2ZM3 13H1v2h2v-2Z" fill={m} />
      <path
        d="M11 1h-1v1h1V1ZM10 2H9v1h1V2ZM9 3H8v1h1V3ZM8 4H7v1h1V4ZM7 5H6v2h1V5ZM5 5H4v2h1V5ZM2 5H1v2h1V5ZM3 7H2v2h1V7ZM11 9H9v1h2V9ZM11 11H9v1h2v-1ZM12 12h-1v2h1v-2Z"
        fill="#000"
      />
      <path d="M15 1h-1v4h1V1Z" fill={d} />
      <path d="M1 13H0v2h1v-2ZM11 14H9v1h2v-1ZM9 13H7v1h2v-1Z" fill="#000" />
      <path d="M5 12H3v1h2v-1ZM3 14H1v1h2v-1Z" fill={d2} />
      <path
        d="M3 14v1h1v-1h1v-1H3v1ZM6 12v-2H4V9H3v2h2v2h2v-1H6ZM3 12v-1H2v1H1v1h2v-1ZM3 15H1v1h2v-1ZM4 4H2v1h2V4ZM7 9v1h1V8H6v1h1Z"
        fill="#000"
      />
      <path
        d="M13 3h-1v1h1V3ZM12 4h-1v1h1V4ZM11 5h-1v1h1V5ZM10 6H9v1h1V6ZM9 7H8v1h1V7Z"
        fill={d}
      />
      <path d="M7 7H6v1h1V7Z" fill={l} />
      <path
        d="M4 8H3v1h1V8ZM3 6H2v1h1V6ZM5 9H4v1h1V9ZM7 11H6v1h1v-1ZM8 12H7v1h1v-1ZM10 13H9v1h1v-1Z"
        fill={d2}
      />
      <path
        d="M9 10H8v1h1v-1ZM6 7H5v1h1V7ZM15 5h-1v1h1V5ZM14 6h-1v1h1V6ZM13 7h-1v1h1V7ZM12 8h-1v1h1V8ZM11 0v1h4v4h1V0h-5Z"
        fill="#000"
      />
      <path
        d="M11 12h-1v1h1v-1ZM9 11H8v1h1v-1ZM8 10H7v1h1v-1ZM7 9H6v1h1V9ZM6 8H5v1h1V8ZM5 7H4v1h1V7Z"
        fill={l}
      />
      <path
        d="M8 5H7v1h3V5H9V4H8v1ZM10 2v1H9v1h3V3h-1V2h-1ZM14 1h-3v1h3V1Z"
        fill={l}
      />
      <path
        d="M14 5h-1v1h1V5ZM13 6h-1v1h1V6ZM12 7h-1v1h1V7ZM11 8h-1v1h1V8ZM9 9H8v1h1V9Z"
        fill={d}
      />
      <path d="M4 5H3v1h1V5ZM4 11H3v1h1v-1ZM2 13H1v1h1v-1Z" fill={l} />
    </svg>
  );
}

export function Fuego({ palette, ...props }: BadgeIconProps) {
  const [l, m, d, d2] = getColors(palette, [
    "#f0f0f0",
    "#fd6214",
    "#ba3500",
    "#ba3500",
  ]);
  return (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 6V4h-1V1h-1v1h-1v1H9v1H8v1H3v1H2v2H1v4h1v1h1v1h1v1h8v-1h1v-1h1V6h-1Z"
        fill={m}
      />
      <path
        d="M0 8v4h1V8H0ZM15 9v3h1V9h-1ZM14 6v3h1V6h-1ZM13 4v2h1V4h-1Z"
        fill="#000"
      />
      <path d="M14 9v3h1V9h-1ZM13 6v3h1V6h-1ZM12 4v2h1V4h-1Z" fill={d} />
      <path
        d="M1 6v2h1V6H1ZM7 3H6v1h1V3ZM9 3H8v1h1V3ZM8 4H7v1h1V4ZM2 5v1h1V5H2ZM1 12v1h1v-1H1ZM2 13v1h1v-1H2ZM3 14v1h1v-1H3ZM14 12v1h1v-1h-1ZM13 13v1h1v-1h-1ZM12 14v1h1v-1h-1ZM4 15v1h8v-1H4ZM3 4v1h1V4H3ZM4 3v1h1V3H4ZM5 2v1h1V2H5ZM9 2v1h1V2H9ZM10 1v1h1V1h-1ZM11 0v1h1V0h-1Z"
        fill="#000"
      />
      <path
        d="M11 1v1h1V1h-1ZM10 2v1h1V2h-1ZM9 3v1h1V3H9ZM8 4v1h1V4H8ZM5 3v1h1V3H5ZM4 4v1h1V4H4ZM6 4v1h1V4H6Z"
        fill={l}
      />
      <path d="M5 4v1h1V4H5Z" fill={m} />
      <path
        opacity=".5"
        d="M11 4v1h1V4h-1ZM12 9V8h-1V6h-1v1H9v1H6V7H5v2H3v2h1v2h1v1h6v-1h1v-2h1V9h-1Z"
        fill="#fff"
      />
      <path d="M3 5v1h1V5H3ZM2 6v2h1V6H2ZM4 8v1h1V8H4Z" fill={l} />
      <path
        d="M2 12v1h1v-1H2ZM3 13v1h1v-1H3ZM12 13v1h1v-1h-1ZM13 12v1h1v-1h-1ZM4 14v1h8v-1H4Z"
        fill={d}
      />
      <path d="M1 8v2h1V8H1ZM11 10h-1V9H6v1H5v2h1v1h4v-1h1v-2Z" fill={l} />
      <path d="M12 1v3h1V1h-1Z" fill="#000" />
    </svg>
  );
}

export function Heart({ palette, ...props }: BadgeIconProps) {
  const [l, m, d, d2] = getColors(palette, [
    "#f0f0f0",
    "#ff7fc0",
    "#ff1b90",
    "#ff1b90",
  ]);
  return (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 2v1h2V2H7ZM9 1v1h4V1H9ZM13 2v1h1V2h-1ZM14 3v1h1V3h-1ZM15 4v5h1V4h-1ZM14 9v2h1V9h-1ZM13 11v1h1v-1h-1ZM11 12v1h2v-1h-2ZM9 13v1h2v-1H9ZM7 14v1h2v-1H7Z"
        fill="#000"
      />
      <path
        d="M15 4h-1V3h-1V2H9v1H7V2H3v1H2v1H1v5h1v2h1v1h2v1h2v1h2v-1h2v-1h2v-1h1V9h1V4Z"
        fill={m}
      />
      <path
        d="M15 4h-1v5h1V4ZM14 9h-1v2h1V9ZM3 9H2v2h1V9ZM13 11h-2v1h2v-1ZM11 12H9v1h2v-1ZM9 13H7v1h2v-1ZM7 12H5v1h2v-1ZM5 11H3v1h2v-1Z"
        fill={d}
      />
      <path
        d="M3 1v1h4V1H3ZM2 2v1h1V2H2ZM1 3v1h1V3H1ZM0 4v5h1V4H0ZM1 9v2h1V9H1ZM2 11v1h1v-1H2ZM3 12v1h2v-1H3ZM5 13v1h2v-1H5Z"
        fill="#000"
      />
      <path d="M3 2v1h4V2H3ZM9 2v1h4V2H9ZM7 3v1h2V3H7Z" fill={l} />
      <path
        opacity=".6"
        d="M11 6V5H9v1H7V5H5v1H4v3h1v1h2.01v1h2v-1H11V9h1V6h-1Z"
        fill="#fff"
      />
      <path
        d="M13 3v1h1V3h-1ZM2 3v1h1V3H2ZM3 4v1h1V4H3ZM1 4v2h1V4H1Z"
        fill={l}
      />
    </svg>
  );
}

export function Hoja({ palette, ...props }: BadgeIconProps) {
  const [l, m, d, d2] = getColors(palette, [
    "#ffffff",
    "#bcef42",
    "#7fb134",
    "#4a8359",
  ]);
  return (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 2V1H9v1H3v5H1v5h12V7h2V2Z" fill={m} />
      <path d="M11 13v-1H5v1h6Z" fill={d} />
      <path d="M15 2V1H9v1h6ZM9 3V2H5v1h4Z" fill={l} />
      <path
        d="M3 11v1h2v-1H3ZM13 10h-1v2h1v-2ZM15 5h-1v2h1V5ZM14 7h-1v3h1V7Z"
        fill={d}
      />
      <path d="M16 1h-1v6h1V1Z" fill="#000" />
      <path d="M3 9H2v6h1V9Z" fill={d2} />
      <path
        d="M15 0H9v1h6V0ZM11 13H5v1h6v-1ZM9 1H5v1h4V1ZM5 2H3v1h2V2ZM3 3H2v2h1V3ZM1 7H0v5h1v3h1v-3H1V7h1V5H1v2ZM13 12h-2v1h2v-1ZM14 10h-1v2h1v-2h1V7h-1v3ZM4 13h1v-1H3v3h1v-2ZM3 15H2v1h1v-1Z"
        fill="#000"
      />
      <path d="M2 7h1V5H2v2ZM1 9h1V7H1v2ZM5 3H3v2h1V4h1V3Z" fill={l} />
      <path
        d="M4 8h2V7H4v1ZM6 7h2V6H6v1ZM8 6h2V5H8v1ZM10 5h1V4h-1v1ZM11 4h1V3h-1v1Z"
        fill={d2}
      />
      <path d="M5 4v1h1V4H5Z" fill={l} />
      <path d="M3 8v1h1V8H3Z" fill={d2} />
    </svg>
  );
}

export function Hongo({ palette, ...props }: BadgeIconProps) {
  const [l, m, d, d2] = getColors(palette, [
    "#ffffff",
    "#ffe361",
    "#ff2c52",
    "#ffb84b",
  ]);
  return (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 12v-2h-1V9H6v1H5v2H4v3h8v-3h-1Z" fill={m} />
      <path d="M14 3V2h-2V1H4v1H2v1H1v6h1v1h2V9h8v1h2V9h1V3h-1Z" fill={d} />
      <path d="M12 0H4v1h8V0Z" fill="#000" />
      <path d="M12 1H4v1h8V1ZM4 2H2v1h2V2ZM14 2h-2v1h2V2Z" fill={l} />
      <path d="M12 15H4v1h8v-1ZM1 3H0v6h1V3ZM4 1H2v1h2V1Z" fill="#000" />
      <path d="M2 7V3H1v6h2V7H2Z" fill={l} />
      <path d="M15 3h-1v6h1V3Z" fill="#be0351" />
      <path d="M15 6h-2v2h2V6ZM12 2h-2v2h2V2Z" fill={l} />
      <path opacity=".5" d="M15 6h-1v2h1V6Z" fill="#be0351" />
      <path d="M10 7H6v1h4V7ZM12 8h-2v1h2V8ZM6 8H4v1h2V8Z" fill="#be0351" />
      <path d="M6 10H5v2h1v-2Z" fill={l} />
      <path d="M11 10h-1v2h1v-2ZM11 12v2H4v1h8v-3h-1Z" fill={d2} />
      <path d="M5 12H4v2h1v-2Z" fill={l} />
      <path d="M4 9H2v1h2V9ZM14 9h-2v1h2V9Z" fill="#be0351" />
      <path d="M8 6H6v2h2V6Z" fill={l} />
      <path opacity=".5" d="M8 7H6v1h2V7Z" fill="#be0351" />
      <path d="M10 8H6v1h4V8Z" fill="#000" />
      <path d="M10 9H6v1h4V9Z" fill={l} />
      <path d="M2 2H1v1h1V2Z" fill="#000" />
      <path d="M5 3H4v1h1V3Z" fill={l} />
      <path
        d="M4 12H3v3h1v-3ZM5 10h1V9H4v1H2v1h2v1h1v-2ZM2 9H1v1h1V9ZM16 3h-1v6h1V3ZM14 1h-2v1h2V1ZM15 2h-1v1h1V2ZM14 10h-2V9h-2v1h1v2h1v3h1v-3h-1v-1h2v-1h1V9h-1v1Z"
        fill="#000"
      />
    </svg>
  );
}

export function Rayo({ palette, ...props }: BadgeIconProps) {
  const [l, m, d, d2] = getColors(palette, [
    "#f0f0f0",
    "#ffe361",
    "#ffb84b",
    "#ffb84b",
  ]);
  return (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 6H4v1H2v2h6v2H7v1H6v1H5v1H4v1h2v-1h1v-1h1v-1h1v-1h2v-1h1V9h2V7H7V6h1V5h1V4h1V3H8v1H7v1H5v1Z"
        fill={m}
      />
      <path d="M1 7H0v2h1V7Z" fill="#000" />
      <path d="M2 7H1v2h1V7Z" fill={l} />
      <path
        d="M16 7h-1v2h1V7ZM3 6H1v1h2V6ZM6 4H4v1h2V4ZM4 5H3v1h1V5Z"
        fill="#000"
      />
      <path
        d="M4 6H3v1h1V6ZM5 5H4v1h1V5ZM6 6H5v1h1V6ZM7 4H6v1h1V4ZM8 3H7v1h1V3ZM8 10H7v1h1v-1ZM7 11H6v1h1v-1ZM6 12H5v1h1v-1ZM5 13H4v1h1v-1ZM4 14H3v1h1v-1Z"
        fill={l}
      />
      <path
        d="M12 2h-1v1h1V2ZM13 9h-1v1h1V9ZM12 10h-1v1h1v-1ZM10 11H9v1h1v-1ZM9 12H8v1h1v-1ZM15 8h-1v1h1V8Z"
        fill={d}
      />
      <path d="M15 7h-1v1h1V7Z" fill={l} />
      <path
        d="M11 3h-1v1h1V3ZM10 4H9v1h1V4ZM9 5H8v1h1V5ZM8 6H7v1h1V6Z"
        fill={d}
      />
      <path d="M10 2H9v1h1V2Z" fill={l} />
      <path d="M9 2H7v1h2V2ZM7 3H6v1h1V3ZM13 0h-3v1h3V0Z" fill="#000" />
      <path d="M13 1h-3v1h3V1Z" fill={l} />
      <path
        d="M15 6H8v1h7V6ZM10 1H9v1h1V1ZM14 1h-1v1h1V1ZM13 2h-1v1h1V2ZM12 3h-1v1h1V3ZM11 4h-1v1h1V4ZM10 5H9v1h1V5ZM15 9h-2v1h2V9ZM12 11h-2v1h2v-1ZM13 10h-1v1h1v-1ZM9 13H7v1h2v-1ZM10 12H9v1h1v-1ZM6 15H3v1h3v-1ZM8 9H1v1h7V9ZM7 14H6v1h1v-1ZM3 14H2v1h1v-1ZM4 13H3v1h1v-1ZM5 12H4v1h1v-1ZM6 11H5v1h1v-1ZM7 10H6v1h1v-1Z"
        fill="#000"
      />
      <path d="M11 2h-1v1h1V2Z" fill={m} />
    </svg>
  );
}

export function Skeleton(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 4V3h-1V2h-1V1H4v1H3v1H2v1H1v6h1v1h1v1h1v2h1v1h6v-1h1v-2h1v-1h1v-1h1V4h-1Z"
        fill="#d1cdd5"
      />
      <path
        d="M4 1H3v1h1V1ZM3 2H2v1h1V2ZM2 3H1v1h1V3ZM4 12H3v2h1v-2ZM3 11H2v1h1v-1ZM5 14H4v1h1v-1ZM2 10H1v1h1v-1Z"
        fill="#000"
      />
      <path
        d="M4 11H3v1h1v-1ZM5 13H4v1h1v-1ZM3 10H2v1h1v-1ZM7 7H4v3h3V7Z"
        fill="#847d8b"
      />
      <path d="M7 8H5v2h2V8Z" fill="#57595f" />
      <path d="M12 7H9v3h3V7Z" fill="#847d8b" />
      <path d="M12 8h-2v2h2V8Z" fill="#57595f" />
      <path
        d="M12 12.01h1v-1h-1v1ZM11 14.01h1v-1h-1v1ZM13 11.01h1v-1h-1v1Z"
        fill="#847d8b"
      />
      <path d="M1 4H0v6h1V4Z" fill="#000" />
      <path d="M2 4H1v6h1V4Z" fill="#fff" />
      <path
        d="M12 2.01h1v-1h-1v1ZM13 3.01h1v-1h-1v1ZM14 4.01h1v-1h-1v1ZM12 14.01h1v-2h-1v2ZM13 12.01h1v-1h-1v1ZM11 15.01h1v-1h-1v1ZM14 11.01h1v-1h-1v1ZM15 10.01h1v-6h-1v6Z"
        fill="#000"
      />
      <path d="M14 10.01h1v-6h-1v6Z" fill="#847d8b" />
      <path d="M4 0v1h8V0H4Z" fill="#000" />
      <path
        d="M4 2H3v1h1V2ZM3 3H2v1h1V3ZM4 4H3v1h1V4ZM12 3.01h1v-1h-1v1ZM13 4.01h1v-1h-1v1ZM4 1v1h8V1H4Z"
        fill="#fff"
      />
      <path d="M5 15v1h6v-1H5Z" fill="#000" />
      <path d="M5 14v1h6v-1H5Z" fill="#847d8b" />
      <path d="M7 13H6v2h1v-2ZM10 13H9v2h1v-2Z" fill="#57595f" />
    </svg>
  );
}

export const BadgeIcons = {
  Agua,
  Brujula,
  Cuernos,
  Espada,
  Fuego,
  Heart,
  Hoja,
  Hongo,
  Rayo,
  Skeleton,
};

export type BadgeIconName = keyof typeof BadgeIcons;
