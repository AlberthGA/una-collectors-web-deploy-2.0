interface MenuButtonProps {
  title: string;
  img: string;
  onMouseClick?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, img, onMouseClick }) => {
  return (
    <div className="group relative zoom text-center" onClick={onMouseClick}>
      <label className="block text-blue-900 text-lg font-base mb-2" >
        {title}
      </label>
      <div className="flex justify-center w-full min-h-80 bg-buttonsColor aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img src={img}
          className="w-full h-full object-center my-auto lg:w-48 lg:h-48" />
      </div>
    </div>
  );
};

export default MenuButton;
