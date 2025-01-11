"use client";

import { PlusIcon } from "lucide-react";
import PanelCards from "./panels/panel-cards";
import { Button } from "./ui/button";
import Variables, { VariablesHandle } from "./variables";
import PanelForm, { PanelFormHandle } from "./panels/panel-form";
import { generateEmptyPanel } from "@/utils/random";
import { Panel } from "@/types/panel";
import { Variable } from "@/schemas/variable";

interface DashboardProps {
  variablesRef: React.RefObject<VariablesHandle | null>;
  selectedDashboardId: string;
  panelFormRef: React.RefObject<PanelFormHandle | null>;
  variables: Variable[];
  panels: Panel[];
  setVariables: React.Dispatch<React.SetStateAction<Variable[]>>;
  setPanels: React.Dispatch<React.SetStateAction<Panel[]>>;
}

const Dashboard = ({
  variablesRef,
  panelFormRef,
  variables,
  panels,
  setVariables,
  setPanels,
}: DashboardProps) => {
  return (
    <>
      <Button
        className="absolute top-[4.5rem] right-6 flex items-center"
        onClick={() => {
          panelFormRef?.current?.setPanelForm(generateEmptyPanel());
          panelFormRef?.current?.setIsOpen(true);
        }}
        dir="rtl"
        variant="outline"
      >
        <PlusIcon className="size-4" />
        <span>افزودن پنل</span>
      </Button>
      <PanelCards
        panels={panels}
        variables={variables}
        onEditPanelClick={(p) => {
          panelFormRef.current?.setPanelForm(p);
          panelFormRef.current?.setIsOpen(true);
        }}
        onDeleteButtonClick={(p) => {
          const index = panels.findIndex((item) => item.id === p.id);
          if (index >= 0) {
            setPanels((prev) => [
              ...prev.slice(0, index),
              ...prev.slice(index + 1),
            ]);
          }
        }}
      />
      <Variables
        ref={variablesRef}
        value={variables}
        onSubmit={(newVariables) => {
          variablesRef.current?.setIsOpen(false);
          setVariables(newVariables);
        }}
      />
      <PanelForm
        ref={panelFormRef}
        onSubmit={(panelForm: Panel) => {
          const existingPanelIndex = panels.findIndex(
            (item) => item.id === panelForm.id
          );
          if (existingPanelIndex >= 0) {
            setPanels((prev) => [
              ...prev.slice(0, existingPanelIndex),
              panelForm,
              ...prev.slice(existingPanelIndex + 1),
            ]);
          } else {
            setPanels((prev) => [...prev, panelForm]);
          }
          panelFormRef.current?.setIsOpen(false);
          panelFormRef.current?.setPanelForm(generateEmptyPanel());
        }}
      />
    </>
  );
};

export default Dashboard;
