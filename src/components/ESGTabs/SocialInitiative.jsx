"use client";

import React, { useLayoutEffect, useState } from "react";
import InitiativeCard, { AddInitiativeCard } from "../InitiativeCard";
import ESG from "@/lib/esg-helper";

const SocialInitiative = ({}) => {
  const [initiatives, setInitiatives] = useState([]);

  useLayoutEffect(() => {
    const getData = async () => {
      const files = await ESG.fetchFiles("social");
      setInitiatives(files);
    };
    getData();
  }, []);
  return (
    <>
    <AddInitiativeCard dir='social'/>
      {initiatives.map((initiative) => (
      <InitiativeCard
        title={initiative.name}
        key={initiative.sha}
        dir="social"
      />
      ))}
    </>
  );
};

export default SocialInitiative;
