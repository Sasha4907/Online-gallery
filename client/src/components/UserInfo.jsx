import { twMerge } from "tailwind-merge"

function DataField({ name, data }) {
  return (
    <div className="w-[450px] flex flex-row items-start justify-start gap-[20px] max-w-full mq450:flex-wrap">
      <div className="flex-1 relative inline-block z-[1] mq450:text-lgi">
        {name}:
      </div>
      <div className="flex-1 flex flex-col items-start justify-start box-border min-w-[143px]">
        <div className="w-full text-left">
          {data}
        </div>
      </div>
    </div>
  )
}

export default function UserInfo({ picture, username, name, email, registrationDate, className }) {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={twMerge("w-[670px] overflow-hidden flex flex-row items-center justify-center gap-[35px] max-w-full mq675:flex-wrap mq675:gap-[17px] mq450:flex-col")}>
      <div className="min-h-[226px] min-w-[167px] flex flex-col items-start justify-end pt-0 px-0 pb-[3px] box-border mq675:flex-1">
        <img className="w-60 h-auto self-stretch flex-1 relative z-[1]" src={picture}/>
      </div>
      <div className="flex-1 flex flex-col items-end justify-start gap-[27px] min-w-[304px] max-w-full">
        <DataField
          name={"Псевдонім"}
          data={username}
        />
        <DataField
          name={"Ім'я"}
          data={name}
        />
        <DataField
          name={"Пошта"}
          data={email}
        />
        <DataField
          name={"Дата реєстрації"}
          data={formatDate(registrationDate)}
        />
      </div>
    </div>
  )
}