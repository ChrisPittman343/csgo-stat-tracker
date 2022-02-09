function Splash() {
  return (
    <div className="absolute">
      Cover entire page while fetching data, then fade out
      <br />
      Should probably CRONjob fetch csgostats{"'"} data for the month, parse it,
      then store it in Firestore
      <br />
      You could then do specific queries yourself by calling the same api with
      diff start + end times
    </div>
  );
}

export default Splash;
