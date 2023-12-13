"use client";

import React, { useLayoutEffect, useState } from "react";
import InitiativeCard, { AddInitiativeCard } from "../InitiativeCard";
import ESG from "@/lib/esg-helper";

const EnvironmentInitiative = ({}) => {
  const [initiatives, setInitiatives] = useState([]);

  useLayoutEffect(() => {
    const getData = async () => {
      const files = await ESG.fetchFiles("environment");
      setInitiatives(files);
    };
    getData();
  }, []);
  return (
    <>
      <AddInitiativeCard dir='environment'/>
      {initiatives.map((initiative) => (
        <InitiativeCard
          title={initiative.name}
          key={initiative.sha}
          dir="environment"
        />
      ))}
    </>
  );
};

export default EnvironmentInitiative;
