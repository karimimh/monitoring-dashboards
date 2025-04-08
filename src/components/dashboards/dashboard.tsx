"use client";

import { useVariables } from "@/hooks/use-variable";
import { Variable } from "@/schemas/variable";
import { Dashboard as DashboardObject } from "@/types/dashboard";
import { Panel } from "@/types/panel";
import { generateEmptyPanel } from "@/utils/random";
import { useMemo, useRef, useState } from "react";
import PanelCards from "../panels/panel-cards";
import PanelForm, { PanelFormHandle } from "../panels/panel-form";
import VariableForm, { VariableFormHandle } from "../panels/variable-form";
import Variables, { VariablesHandle } from "../variables";
import DashboardHeader from "./dashboard-header";

interface DashboardProps {
  selectedDashboard: DashboardObject;
}

const Dashboard = ({ selectedDashboard }: DashboardProps) => {
  const panelFormRef = useRef<PanelFormHandle>(null);
  const variableFormRef = useRef<VariableFormHandle>(null);
  const variablesRef = useRef<VariablesHandle>(null);
  const [fromDate, setFromDate] = useState<number | undefined>(
    Date.now() - 24 * 60 * 60 * 1000
  );
  const [toDate, setToDate] = useState<number | undefined>(Date.now());
  const [variables, setVariables] = useState<Variable[]>(
    selectedDashboard.variables
  );
  const [panels, setPanels] = useState<Panel[]>(selectedDashboard.panels);
  const queryResults = useVariables("metrics", variables);
  const variableValues = useMemo(() => {
    const result = [];
    for (let i = 0; i < queryResults.length; i++) {
      const panelQueryResult = queryResults[i];
      const name = variables[i].name;
      if (!name) continue;
      const data = panelQueryResult.data?.results
        ?.at(0)
        ?.series[0].values.map((value) => value.at(1))
        .filter((item) => Boolean(item));
      if (!data) continue;
      result.push({ name, values: data });
    }
    return result;
  }, [queryResults, variables]);
  const [selectedVariableValues, setSelectedVariableValues] = useState<
    { name: string; value: string | number | null }[]
  >([]);

  console.log(variableValues, selectedVariableValues);
  return (
    <>
      <DashboardHeader
        fromDate={fromDate}
        setFromDate={setFromDate}
        setPanels={setPanels}
        panelFormRef={panelFormRef}
        toDate={toDate}
        setToDate={setToDate}
        dashboard={selectedDashboard}
        panels={panels}
        variableFromRef={variableFormRef}
        variables={variables}
      />
      <PanelCards
        variableValues={variableValues}
        selectedVariableValues={selectedVariableValues}
        panels={panels}
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
      <VariableForm
        queryResults={queryResults}
        ref={variableFormRef}
        onSubmit={(newVariable) => {
          const existingVariableIndex = variables.findIndex(
            (item) => item.name === newVariable.name
          );
          if (existingVariableIndex >= 0) {
            setVariables((prev) => [
              ...prev.slice(0, existingVariableIndex),
              newVariable,
              ...prev.slice(existingVariableIndex + 1),
            ]);
          } else {
            setVariables((prev) => [...prev, newVariable]);
          }
          variableFormRef.current?.setIsOpen(false);
          variableFormRef.current?.setVariableForm({
            name: "",
            query: "",
          });
        }}
        variables={variables}
        onVariableValueSelected={(name, value) => {
          const existingVariableIndex = selectedVariableValues.findIndex(
            (item) => item.name === name
          );
          if (existingVariableIndex >= 0) {
            setSelectedVariableValues((prev) => [
              ...prev.slice(0, existingVariableIndex),
              { name, value },
              ...prev.slice(existingVariableIndex + 1),
            ]);
          } else {
            setSelectedVariableValues((prev) => [...prev, { name, value }]);
          }
        }}
        onVariablesChange={(newVariables) => {
          setVariables(newVariables);
        }}
      />
    </>
  );
};

export default Dashboard;
