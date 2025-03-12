interface PHex {
  color: string;
}

const Hex = ({ color }: PHex) => {
  return (
    <div className="flex justify-center items-center w-28 text-xs rounded-md py-1.5 px-2 border-slate-700 bg-slate-800">
      <span className="text-slate-300 mr-2">HEX</span>
      <span className="w-20 text-center">{color}</span>
    </div>
  );
};

export default Hex;
