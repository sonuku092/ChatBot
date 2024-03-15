import React from "react";

function SOS() {
  return (
      <div className="flex items-center justify-center">
        <button className="p-1 rounded-md border-[2px] items-center cursor-pointer hover:border-red-400 w-full">
          <h4 className="font-bold text-sm text-gray-600">SOS</h4>
          <p className="text-[10px] text-gray-400">Emergency assistance</p>
        </button>
      </div>
  );
}

export default SOS;
