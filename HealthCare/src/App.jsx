import { useRef } from "react";
import cover from "./assets/cover.jpg";
import axios from "axios";

function App() {
  // Create references for each input field (Name, Age, File)
  const name = useRef();
  const age = useRef();
  const file = useRef();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object to append the form data
    const formData = new FormData();
    formData.append("Name", name.current.value);
    formData.append("age", age.current.value);
    formData.append("file", file.current.files[0]);

    // Submit the form data to the backend using axios
    try {
      const response = await axios.post("/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(`Response: ${response.data.message}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="mainContainer">
        <div className="imgsec">
          <img src={cover} alt="cover image" />
        </div>
        <div className="formSec">
          <h2 className="heading">Healthcare Dashboard</h2>

          {/* Form to collect user input */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="Name" className="form-label">
                Name <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="Name"
                required
                ref={name}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="age" className="form-label">
                Age <span className="required">*</span>
              </label>
              <select
                className="form-control selectControl"
                id="age"
                name="age"
                required
                ref={age}
              >
                <option value="">Select Age</option>
                {/* Generate age options from 1 to 100 */}
                {[...Array(100).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="file" className="form-label">
                File Upload <span className="required">*</span>
              </label>
              <input
                type="file"
                className="form-control"
                id="file"
                name="file"
                required
                ref={file}
              />
            </div>
            <button type="submit" className="btn btn-primary submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
