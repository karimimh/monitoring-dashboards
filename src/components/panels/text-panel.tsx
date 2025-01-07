"use client";

import PanelCard from "./panel-card";

interface TextPanelProps {
  title: string;
  text: string;
  bgColor?: string;
}

const TextPanel = ({
  title,
  text,
  bgColor = "white",
}: TextPanelProps) => {
  return (
    <PanelCard title={title}>
      <div
        className="flex items-center justify-center h-32 w-96 text-4xl font-extrabold"
        style={{ color: "white", backgroundColor: bgColor }}
      >
        {text}
      </div>
    </PanelCard>
  );
};

export default TextPanel;
