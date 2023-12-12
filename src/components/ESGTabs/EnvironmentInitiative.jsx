"use client";

import React, { useLayoutEffect, useState } from "react";
import { EsgSDK } from "esg-sdk";
import InitiativeCard, { AddInitiativeCard } from "../InitiativeCard";

const ESG = EsgSDK.initialize();

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
