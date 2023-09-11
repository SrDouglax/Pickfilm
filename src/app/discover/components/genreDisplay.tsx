import { IconType } from "react-icons";

interface GenreDisplayProps {
  icon: IconType;
  name: string;
  classNames: string;
  onClick: Function;
}

export default function GenreDisplay({
  icon: Icon,
  name,
  classNames,
  onClick
}: GenreDisplayProps) {
  return (
    <div
      className={`flex gap-1 items-center rounded-md border border-solid border-white border-opacity-20 shadow-md px-4 py-2 hover:shadow-lg hover:-translate-y-1 ease-in-out duration-200 ${classNames}`}
      onClick={() => onClick()}>
      <Icon className="text-3xl text-white" />
      <p className="text-2xl text-white whitespace-nowrap overflow-hidden overflow-ellipsis">{name}</p>
    </div>
  );
}
