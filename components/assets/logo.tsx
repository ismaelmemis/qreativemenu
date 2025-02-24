export default function Logo({ color, classes }: Readonly<{ color?: string; classes?: string }>) {
  return (
    <svg
      className={classes}
      fill="none"
      height="40"
      viewBox="0 0 39 48"
      width="40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={`${color ? color : '#ff692e'}`}>
        <path d="m9 23c0-5.5228 4.4772-10 10-10 5.5229 0 10 4.4772 10 10h9c0-10.4934-8.5066-19-19-19-10.49341 0-18.99999908 8.5066-19 19s8.50659 19 19 19v-9c-5.5228 0-10-4.4771-10-10z" />
        <path d="m29 23c0 5.5228 4.4772 10 10 10v9c-10.4934 0-19-8.5066-19-19z" opacity=".5" />
      </g>
    </svg>
  );
}
