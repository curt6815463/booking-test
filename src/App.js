import Distribution from "./Distribution.js";

const people = 6;
const rooms = [
  { max: 8, min: 3 },
  { max: 5, min: 2 },
];
const handleDistribution = (data) => {
  window.alert(JSON.stringify(data));
};

function App() {
  return (
    <div>
      <Distribution
        people={people}
        rooms={rooms}
        onDistribution={handleDistribution}
      />
    </div>
  );
}

export default App;
