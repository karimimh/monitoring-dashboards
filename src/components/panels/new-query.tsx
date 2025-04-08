"use client";

import { useDatabaseQueries } from "@/hooks/use-query";
import { useState } from "react";
import Select from "../select";
import { Button } from "../ui/button";

interface NewQueryProps {}

const NewQuery = ({}: NewQueryProps) => {
  const fromQuery = useDatabaseQueries(
    "metrics",
    [["show measurements"]],
    [],
    []
  )
    .at(0)
    ?.data?.at(0)
    ?.results.at(0)
    ?.series.at(0)
    ?.values.map((item) => item.toString());
  const [fromValue, setFromValue] = useState<string>();
  const selectQuery = useDatabaseQueries(
    "metrics",
    [[`show field keys from "${fromValue}"`]],
    [],
    []
  )
    .at(0)
    ?.data?.at(0)
    ?.results.at(0)
    ?.series.at(0)
    ?.values.map((item) => item.toString());

  const [selectValue, setSelectValue] = useState<string>();

  const tagKeysQuery = useDatabaseQueries(
    "metrics",
    [[`show tag keys from "${fromValue}"`]],
    [],
    []
  )
    .at(0)
    ?.data?.at(0)
    ?.results.at(0)
    ?.series.at(0)
    ?.values.map((item) => item.toString());
  const [tagKeyValue, setTagKeyValue] = useState<string>();

  const tagValuesQuery = useDatabaseQueries(
    "metrics",
    [[`show tag values from "${fromValue}" with key="${tagKeyValue}"`]],
    [],
    []
  )
    .at(0)
    ?.data?.at(0)
    ?.results.at(0)
    ?.series.at(0)
    ?.values.map((item) => item.toString());
  const [tagValue, setTagValue] = useState<string>();

  return (
    <div className="flex gap-2 items-center flex-wrap" dir="ltr">
      <span>SELECT</span>{" "}
      <Select
        value={selectValue}
        onValueChange={setSelectValue}
        options={selectQuery ?? []}
      />
      <span>FROM</span>{" "}
      <Select
        value={fromValue}
        onValueChange={setFromValue}
        options={fromQuery ?? []}
      />
      <span>WHERE</span> <Button>+</Button>
      <Select
        value={tagKeyValue}
        onValueChange={setTagKeyValue}
        options={tagKeysQuery ?? []}
      />
      <span>=</span>
      <Select
        value={tagValue}
        onValueChange={setTagValue}
        options={tagValuesQuery ?? []}
      />
      <Button>+</Button>
    </div>
  );
};

export default NewQuery;
