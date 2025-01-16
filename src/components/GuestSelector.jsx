function GuestSelector({ text, isSelected, onGuestClick }) {
  return (
    <button
      className="rounded-full py-2 px-4 transition-shadow duration-300 font-semibold mx-1 my-2"
      style={{
        color: isSelected ? "#EFE1C0" : "#60605F", 
        border: "2px solid #DFD2AC",
        backgroundColor: isSelected ? "#D4AB67" : "#fefefe", 
      }}
      onClick={() => onGuestClick(text)}
    >
      {text}
    </button>
  );
}

export default GuestSelector;