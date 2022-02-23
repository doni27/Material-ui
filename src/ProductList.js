import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductList() {
  const [data, setItems] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  console.log("data", data);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [items, setItems] = useState([]);

  async function deleteOperation(id) {
    if (
      window.confirm(
        "Are you sure you want to delete product with id = " + id + " ?"
      )
    ) {
      let user = JSON.parse(localStorage.getItem("user-info"));
      const token = user.data.token;
      fetch(
        "http://localhost/directus/public/tokoonline/items/products/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getData();
      alert("Product has been deleted");
    } else {
      getData();
    }
  }

  // let user = JSON.parse(localStorage.getItem("user-info"));
  // const dataToken = user ? user.data : "";
  // console.log("user-info", dataToken.token);

  const getData = () => {
    try {
      let user = JSON.parse(localStorage.getItem("user-info"));
      const token = user ? user.data.token : "";
      console.log("token_user", token);

      fetch("http://localhost/directus/public/tokoonline/items/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.data);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    } catch (e) {}
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Header />
        <h1>Product Lists</h1>
        <div className="col-sm-8 offset-sm-2">
          <Table solid bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Display</th>
                <th>Memory</th>
                <th>Camera</th>
                <th>Action</th>
              </tr>
            </thead>

            {data.map((item) => (
              <tbody key={item.id}>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.display}</td>
                  <td>{item.memory}</td>
                  <td>{item.camera}</td>
                  <td>
                    <span
                      className="btnDelete"
                      onClick={() => deleteOperation(item.id)}>
                      Delete
                    </span>
                    <Link to={"update/" + item.id}>
                      <span className="btnUpdate">Update</span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </div>
    );
  }
}

export default ProductList;
