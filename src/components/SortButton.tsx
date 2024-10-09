interface SortButtonProps {
  onClick: () => void;
  direction: 'ascending' | 'descending' | null;
}

const SortButton: React.FC<SortButtonProps> = ({ onClick, direction }) => {
  return (
    <button onClick={onClick} className="ml-2">
      <img
        src="/sort-icon.svg"
        alt="Sort Icon"
        className={`w-4 h-4 inline-block transform ${
          direction === 'ascending' ? 'rotate-180' : ''
        }`}
      />
    </button>
  );
};

export default SortButton;
