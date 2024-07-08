import { TiWarning } from "react-icons/ti";
export const MsgDisplay = ({ item, click }) => {
  if (item.type === "message") {
    return (
      <p className="text-white font-intermedium  text-sm dark:text-gray-200 whitespace-pre-wrap">
        {item.message}
      </p>
    );
  } else if (item.type === "image") {
    return (
      <img
        src={item.imageurl}
        className="rounded-md my-2"
        onClick={() => click(item.imageurl)}
      />
    );
  }
};

export const Warning = () => (
  <span className="flex w-auto h-auto border bg-yellow-100 items-center rounded-md">
    <TiWarning size={27} className="fill-yellow-600 mx-2" />
    <p className="text-[13px] font-inter text-yellow-700 text-center">
      Never send money to anyone and beware of scams </p>
  </span>
);
