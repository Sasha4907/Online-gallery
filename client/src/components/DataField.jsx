export default function DataField({ name, data }) {
  return (
    <div className="flex flex-row items-start justify-start gap-[10px] max-w-full mq450:flex-wrap ">
      <div className="text-right flex-1 relative inline-block z-[1] mq450:text-lgi">
        {name}:
      </div>
      <div className="flex-1 flex flex-col items-start justify-start box-border min-w-[180px]">
        <div className="w-full text-left">
          {data}
        </div>
      </div>
    </div>
  )
}