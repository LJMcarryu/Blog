import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const ICON_BG = "#050505";
const ICON_FG = "#ffffff";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: ICON_BG,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: ICON_FG,
          borderRadius: 6,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        J
      </div>
    ),
    { ...size }
  );
}
