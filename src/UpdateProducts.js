import Header from "./Header";
import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function UpdateProducts(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [name, setName] = useState("");
  const [camera, setCamera] = useState("");
  const [display, setDisplay] = useState("");
  const [memory, setMemory] = useState("");
  const history = useHistory();

  console.log("props", props.match.params.id);
  const [data, setData] = useState([]);
  console.log("hasil-useEffect data >>", data);

  useEffect(async () => {
    try {
      let user = JSON.parse(localStorage.getItem("user-info"));
      const token = user.data.token;
      fetch(
        "http://localhost/directus/public/tokoonline/items/products/" +
          props.match.params.id,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setData(result.data);
            console.log("result.data", result.data);
            setName(result.data.name);
            setDisplay(result.data.display);
            setCamera(result.data.camera);
            setMemory(result.data.memory);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    } catch (e) {
      localStorage.clear();
    }
  }, []);

  async function editProduct(id) {
    try {
      let formSimpan = {
        name: name,
        camera: camera,
        display: display,
        memory: memory,
      };

      console.log("JSON.stringify", JSON.stringify(formSimpan));

      let user = JSON.parse(localStorage.getItem("user-info"));
      const token = user.data.token;

      fetch(
        "http://localhost/directus/public/tokoonline/items/products/" + id,
        {
          method: "PATCH",
          body: JSON.stringify(formSimpan),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((result) => console.log("ini hasilnya: ", result))
        .catch((error) => console.log("error", error));

      console.log("datadata", data);

      alert("Product has been updated!");
      history.push("/");
    } catch (e) {}
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Header />
        <h1>Update Products</h1>
        <div className="col-sm-6 offset-sm-3">
          <br />
          <input
            className="form-control"
            type="text"
            name="name"
            defaultValue={data.name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            name="memory"
            defaultValue={data.memory}
            onChange={(e) => setMemory(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            name="display"
            defaultValue={data.display}
            onChange={(e) => setDisplay(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            name="camera"
            defaultValue={data.camera}
            onChange={(e) => setCamera(e.target.value)}
          />
          <br />
          <br />
          <br />
          <button
            className="btn btn-danger"
            onClick={() => editProduct(data.id)}>
            Update Product
          </button>
        </div>
      </div>
    );
  }
}
export default withRouter(UpdateProducts);
