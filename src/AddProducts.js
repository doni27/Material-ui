import Header from "./Header";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function AddProducts() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState("");
  const [display, setDisplay] = useState("");
  const [memory, setMemory] = useState("");
  const [camera, setCamera] = useState("");
  const history = useHistory();

  function addProduct() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("display", display);
    formData.append("memory", memory);
    formData.append("camera", camera);

    console.log("formData", formData);

    let user = JSON.parse(localStorage.getItem("user-info"));
    const token = user.data.token;
    fetch("http://localhost/directus/public/tokoonline/items/products", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    alert("Product added!");
    history.push("/");
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Header />
        <h1>Add Products</h1>
        <div className="col-sm-6 offset-sm-3">
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}></input>
          <textarea
            className="form-control"
            placeholder="Display"
            onChange={(e) => setDisplay(e.target.value)}></textarea>
          <textarea
            className="form-control"
            placeholder="Memory"
            onChange={(e) => setMemory(e.target.value)}></textarea>
          <textarea
            className="form-control"
            placeholder="Camera"
            onChange={(e) => setCamera(e.target.value)}></textarea>
          <br></br>
          <button className="btn btn-primary" onClick={addProduct}>
            Add Product
          </button>
        </div>
      </div>
    );
  }
}
export default AddProducts;
