function ProgressBar({currentStep, totalSteps}) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="h-2 mb-4 lg:rounded-full" style={{backgroundColor : "#fde07c"}}>
      <div
        className= "h-2 rounded-r-full lg:rounded-full"
        style={{
          width: `${progressPercentage}%`,
          transition: "width 0.3s ease-in-out",
            backgroundColor : "#fec53b"
        }}
      />
    </div>
  );
}

export default ProgressBar;