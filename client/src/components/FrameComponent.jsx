const FrameComponent = ({ picture, prop, Artist }) => {
  return (
    <div className="h-[470px] flex flex-col items-start justify-start gap-[40px] max-w-full">
      <div className="flex flex-row items-start justify-start px-[100px]">
        <h2 className="m-0 relative text-xl font-candal font-normal">
          {prop}
          </h2>
      </div>
      <div className="self-stretch flex-1 relative">
        <img src={`http://localhost:5000${picture}`} className="max-w-full max-h-[470px] object-cover" />
        <h2 className="text-xl font-candal">{Artist}</h2>
      </div>
    </div>
  );
};

export default FrameComponent;
