import React from 'react';
import MCQsPageTemplate from '../Components/MCQsPageTemplate';
import pak from "../assets/pak.png";
import { mcqsData } from '../Data/Questions';

const PakistanCurrentAffairs = () => {
  const categories = [
    "Current IG’s of Police", "Current Governors",
    "Current Chief Justices", "Current Ambassadors",
    "Current Federal Ministers", "Current Chief Ministers",
    "Current KPK Ministers", "Current Punjab Ministers",
    "Current Sindh Ministers", "Current Balochistan Ministers"
  ];

  return (
    <MCQsPageTemplate 
      title="Pakistan"
      titleHighlighted="Current Affairs"
      bannerImg={pak}
      description="Prepare for PPSC, FPSC, NTS, and CSS exams with our up-to-date 2024-2026 Pakistan Current Affairs MCQs collection."
      categories={categories}
      mcqsData={mcqsData}
    />
  );
};

export default PakistanCurrentAffairs;