import { useEffect, useState } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
const url = 'https://www.course-api.com/react-tours-project';

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [tours, setTours] = useState([])

  const removeTour = (id) => {
    const newTour = tours.filter(tour => tour.id != id)
    setTours(newTour)
}
  const fetchTours = async () => {
    setIsLoading(true)
    try {
      const resp = await fetch(url)
      const tours = await resp.json()
      setTours(tours);
      
    } catch (error) {
      console.table(error)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchTours()
  }, [])
  if (isLoading) {
    return <main>
      <Loading/>
    </main>
  }
  if (tours.length === 0) {
    return <main>
      <div className="title">
        <h2>no tours left </h2>
        <button style={{marginTop: '2rem'}} className="btn" onClick={fetchTours}>Refetch tours</button>
      </div>
    </main>
  }
  return <main>
    <Tours tours={tours} removeTour={removeTour} />
  </main>;
};
export default App;
