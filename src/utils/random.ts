import { EMPTY_PANEL } from "@/constants/panel";
import { Panel } from "@/types/panel";
import * as crypto from "crypto";

export function generateId(): string {
  return crypto.randomBytes(8).toString("hex");
}

export function generateEmptyPanel(): Panel {
  return { ...EMPTY_PANEL, id: generateId() };
}
