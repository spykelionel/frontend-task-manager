import React, { useEffect, useState } from "react";

const Todo = () => {
  const baseURL = "https://task-manager-e3rz.onrender.com/api/v1/tasks";
  const [showForm, setshowform] = useState(true);
  const [showNew, setshowNew] = useState(true);
  const [showDelete, setshowDelete] = useState(true);
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [isEditItem, setisEditItem] = useState(null);
  const [showList, setshowList] = useState(true);
  const [editMessage, seteditMessage] = useState(false);
  const [deleteMessage, setdeleteMessage] = useState(false);
  const [deleteMessagesuccess, setdeleteMessagesuccess] = useState(false);
  const [inputTitle, setinputTitle] = useState("");
  const [inputDescription, setinputDescription] = useState("");
  const [items, setitems] = useState([
    {
      id: "1",
      title: "Default Task",
      description: "Default description",
    },
  ]);

  useEffect(() => {
    setshowList(true);
    async function fetchData() {
      try {
        const response = await fetch(baseURL, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setitems(data);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    return () => {};
  }, []);

  //   HANDLING INPUT FIELDS
  const handleInput = (e) => {
    setinputTitle(e.target.value);
  };
  const handleInputDescription = (e) => {
    setinputDescription(e.target.value);
  };
  //   HANDLING INPUT FIELDS

  //   SUBMITTING FORM
  const handleSubmit = (e) => {
    setshowList(true);
    setshowNew(true);
    e.preventDefault();

    if (!inputTitle || !inputDescription) {
      alert("fill data");
      showList(false);
    } else if (inputTitle && !toggleSubmit) {
      setitems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputTitle, description: inputDescription };
          }
          return elem;
        })
      );

      setinputTitle("");
      setinputDescription("");
      settoggleSubmit(true);
      setshowform(false);
      setshowDelete(true);
    } else {
      async function postData() {
        try {
          const response = await fetch("http://127.0.0.1:5000/api/v1/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: inputTitle,
              description: inputDescription,
            }),
          });
          const data = await response.json();
          //   localStorage.setItem("newID", data.id);
          //   const allinputTitle = {
          //     id: data.id,
          //     name: data.title,
          //     description: data.descriptionr,
          //   };
          console.log(data);
          setitems([data, ...items]);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
      postData();

      setinputTitle("");
      setinputDescription("");
      setshowform(false);
    }
  };

  const handleDelete = (index) => {
    console.log(index);
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });

    async function deleteData() {
      try {
        const response = await fetch(
          `${baseURL}/${index}`,
          {
            method: "Delete",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    deleteData();
    setdeleteMessage(true);

    setTimeout(() => {
      setitems(updatedItems);
      setdeleteMessage(false);
    }, 2000);
    setdeleteMessagesuccess(false);
  };

  const updateItem = () => {
    const id = isEditItem;
    const frmstorage = localStorage.getItem("id");
    console.log(`${isEditItem} - From Storage ${frmstorage}`);
    async function editData() {
      try {
        const response = await fetch(
          `${baseURL}/${id}`,
          {
            method: "Put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: inputTitle,
              description: inputDescription,
            }),
          }
        );
        const data = await response.json();
        // handleDelete(data.id)
        setitems([...items, data]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    editData();
  };
  //   DELETE

  //   EDIT
  const handleEdit = (id) => {
    window.localStorage.setItem("id", id);
    console.log("THe id", id);
    setshowList(false);
    setshowDelete(false);
    setshowNew(false);
    setshowform(true);

    settoggleSubmit(false);
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setinputTitle(newEditItem.title);
    setinputDescription(newEditItem.description);
    setisEditItem(id);
    console.log(newEditItem);
  };
  //   EDIT

  // ADD NEW TASK
  const handleAdd = () => {
    //   alert("hello")
    setshowform(true);
    setshowList(true);
    setshowNew(false);
  };
  // ADD NEW TASK
  return (
    <>
      {showNew ? (
        <div className="container">
          <div className="col-12 text-end">
            <button className="btn btn-primary " onClick={handleAdd}>
              New
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {showForm ? (
        <>
          <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
            <div className="row">
              <div className="text-center">
                <h2>{toggleSubmit ? "Add Task" : " Edit Task"}</h2>
              </div>
              <form className="col-12 p-2" onSubmit={handleSubmit}>
                <label htmlFor="title" className="my-2">
                  Enter Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title"
                  className="w-100 my-1 p-2"
                  onChange={handleInput}
                  value={inputTitle}
                />
                <label className="my-2" htmlFor="description">
                  Enter
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="description"
                  className="w-100 my-1 p-2"
                  onChange={handleInputDescription}
                  value={inputDescription}
                />
                {/* <div className="text-center"> */}
                {toggleSubmit ? (
                  <button className="btn btn-primary my-2">Save</button>
                ) : (
                  <button className="btn btn-success my-2" onClick={updateItem}>
                    Update
                  </button>
                )}
                {/* </div> */}
              </form>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {showList ? (
        <div className="container py-2 ">
          {deleteMessage ? (
            <p className="text-center text-danger">Item Deleted Successfully</p>
          ) : (
            ""
          )}
          {items.map((elem, index) => {
            return (
              <div
                className="row border rounded shadow p-3 mb-3 bg-white rounded  p-2"
                key={elem.id}
              >
                <div className="col-12 d-flex justify-content-between align-items-center">
                  <div>
                    <h4>{elem.title}</h4>
                    <p>{elem.description}</p>
                  </div>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => handleEdit(elem.id)}
                  >
                    Edit
                  </button>
                  {showDelete ? (
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(elem.id)}
                    >
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Todo;
