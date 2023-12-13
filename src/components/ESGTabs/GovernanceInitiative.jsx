"use client";

import React, { useLayoutEffect, useState } from "react";
import InitiativeCard, { AddInitiativeCard } from "../InitiativeCard";
import ESG from "@/lib/esg-helper";

const GovernanceInitiative = ({}) => {
  const [initiatives, setInitiatives] = useState([]);

  useLayoutEffect(() => {
    const getData = async () => {
      const files = await ESG.fetchFiles("governance");
      setInitiatives(files);
    };
    getData();
  }, []);
  return (
    <>
      <AddInitiativeCard dir='governance'/>
      {initiatives.map((initiative) => (
        <InitiativeCard
          title={initiative.name}
          key={initiative.sha}
          dir="governance"
        />
      ))}
    </>
  );
};

export default GovernanceInitiative;
