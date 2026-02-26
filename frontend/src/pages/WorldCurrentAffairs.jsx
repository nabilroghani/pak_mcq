import React from 'react';
import MCQsPageTemplate from '../Components/MCQsPageTemplate';
import world from "../assets/world.png"; 

const WorldCurrentAffairs = () => {
  const categories = [
    "Heads of State", "International Summits", "World Economies",
    "Global Awards", "Recent Wars/Conflicts", "Sports Events",
    "United Nations News", "New Scientific Discoveries"
  ];

  const worldMcqs = [
    {
      id: 1,
      category: "Global News",
      question: "Which country will host the COP29 Climate Summit?",
      options: ["Azerbaijan", "UAE", "Brazil", "Germany"]
    }
    // Baqi MCQs yahan add karein
  ];

  return (
    <MCQsPageTemplate 
      title="World"
      titleHighlighted="Current Affairs"
      bannerImg={world}
      description="Stay updated with global events, international relations, and major world news for your competitive exam preparation."
      categories={categories}
      mcqsData={worldMcqs}
    />
  );
};

export default WorldCurrentAffairs;