import React from "react";
import CompactBar from "../../component/CompactBar/CompactBar";
import HomeMain from "../../component/HomeMain/HomeMain";
import LeftItem from "../../component/LeftItem/LeftItem";
import RightBar from "../../component/RightBar/RightBar";

export default function Home() {
  return (
    <div className="flex flex-row max-w-screen overflow-x-hidden">
      <CompactBar>
        <LeftItem />
      </CompactBar>
      <HomeMain />
      <RightBar />
    </div>
  );
}
