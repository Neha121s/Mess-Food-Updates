import React, { useEffect, useState } from "react";
import "./MessSettings.css";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import TaskListContextProvider from "./EditTaskListContext";
import EditTaskForm from "./EditTaskForm";
import { authAxiosMess } from "../../../App";
import { useParams } from "react-router-dom";

const EditMenu = () => {
  const { menuId } = useParams();
  const messId = localStorage.getItem("userIdMess");
  const [menu, setMenu] = useState({
    menuName: "",
    tag: "",
    price: "",
    menuItem: [],
  });

  const addMenu = (e) => {
    const { name, value } = e.target;
    setMenu((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  //function to recieve data from child...
  const addList = (data) => {
    setMenu({ ...menu, menuItem: data });
  };

  useEffect(() => {
    authAxiosMess
      .get(`api/menu/${messId}/${menuId}`)
      .then((res) => {
        // console.log(res);
        setMenu({
          menuName: res.data.menu.menuName,
          tag: res.data.menu.tag[0],
          price: res.data.menu.price,
          menuItem: res.data.menu.menuItem,
        });
        // console.log(tasks);
      })
      .catch((err) => console.log(err));
  }, [messId, menuId]);



  const onSubmit = (e) => {
    e.preventDefault();
    console.log("updated MessList")
    console.log(menu);
    const menuData = {
      menuItem: menu.menuItem.map((idx) => {
        return { itemName: idx.itemName };
      }),
      tag: menu.tag,
      menuName: menu.menuName,
      price: menu.price,
    };

    authAxiosMess
      .patch(`api/menu/update/${messId}/${menuId}`, menuData)
      .then((res) => {
        // console.log(res);
        alert("menu updated successfully");
      })
      .catch((err) => console.log(err));

   
  };
  return (
    <div style={{ width: "70%" }} className="mt-4">
      <div className="edit-profile ml-1 container">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="MenuName">Menu Name</label>
            <input
              type="text"
              name="menuName"
              className="form-control"
              onChange={addMenu}
              value={menu.menuName}
              id="MenuName"
              placeholder="New Menu"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Type">Type</label>
            <input
              type="text"
              name="tag"
              className="form-control"
              onChange={addMenu}
              value={menu.tag}
              id="Type"
              placeholder="for eg: Upwas"
            />
          </div>
          <div className="form-group col-md-6 position-relative">
            <label htmlFor="AddItems">Add Items</label>

            <div className="main">
              <TaskListContextProvider addList={addList}>
                <EditTaskForm />
              </TaskListContextProvider>
            </div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="SetPrice">Set Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              id="SetPrice"
              placeholder="70 INR"
              onChange={addMenu}
              value={menu.price}
            />
            <div
              id="inc-button"
              className="spinner-button"
              style={{ width: "20px", height: "20px" }}
            >
              <ArrowDropUpIcon
                style={{ cursor: "pointer", color: "#FFB800" }}
              />
            </div>
            <div
              id="dec-button"
              className="spinner-button"
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
            >
              <ArrowDropDownIcon
                style={{ cursor: "pointer", color: "#FFB800" }}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-warning text-white d-block mx-auto"
          style={{ width: "7rem" }}
          onClick={onSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditMenu;
