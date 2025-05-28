import React from 'react';

export const SubtitleTemplate = ({ icon, title }) => (
  <div className="flex my-4 items-center">
    {icon}
    <h2 className="text-xl font-semibold text-black px-5  ml-5 rounded-b-xl rounded-tl-xl">
      {title}
    </h2>
  </div>
);