"use client";

import React, { useLayoutEffect, useState } from "react";
import { EsgSDK } from "esg-sdk";
import InitiativeCard from "../InitiativeCard";

const ESG = EsgSDK.initialize();

const SocialInitiative = ({}) => {
  const [initiatives, setInitiatives] = useState([]);

  useLayoutEffect(() => {
    const getData = async () => {
      const files = await ESG.fetchFiles('social');
      console.log(files)
      setInitiatives(files);
    };
    getData();
  }, []);
  return (
    initiatives.map(initiative => <InitiativeCard title={initiative.name} key={initiative.sha} dir='social'/>)
  )
  ;
};

export default SocialInitiative;
