"use client";

import Panel from "./panel";

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
    <Panel title={title}>
      <div
        className="flex items-center justify-center h-32 w-96 text-4xl font-extrabold"
        style={{ color: "white", backgroundColor: bgColor }}
      >
        {text}
      </div>
    </Panel>
  );
};

export default TextPanel;
