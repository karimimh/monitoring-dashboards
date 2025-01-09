import { EMPTY_PANEL } from "@/constants/panel";
import { Panel } from "@/types/panel";

export function generateId(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export function generateEmptyPanel(): Panel {
  return { ...EMPTY_PANEL, id: generateId() };
}
