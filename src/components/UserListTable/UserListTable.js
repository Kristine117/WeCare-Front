import React, { useState } from "react";
import kwan from "./UserListTable.module.css";
import {FaEllipsisH } from "react-icons/fa";
import Button from "../Button/Button";
import { createPortal } from "react-dom";
import { FaX } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import useUpdate from "../../hooks/useUpdate";
import Swal from "sweetalert2";
const UserListTable=({length, list,fetchDataHandler})=>{

    const [allBoxes,setAllBoxes]= useState(false);
    const [openModal,setOpenModal] = useState(false);
    const [openFloat,setOpenFloat]= useState(
        new Array(length ? +length: 0).fill(false)
      );
    const [checkedState, setCheckedState] = useState(
        new Array(length ? +length: 0).fill(false)
      );


    const [userId,setUserId] = useState(null);
    const navigate = useNavigate();
    const handleOnChange = (position) => {

        let updatedCheckedState;

        if(position !== -1){
           updatedCheckedState = checkedState.map((item, index) =>
                index === position ? !item : item
            );
        }else {
            setAllBoxes(val=>!val);
            updatedCheckedState =   new Array(length).fill(!allBoxes);
        }
        setCheckedState(updatedCheckedState);
    };

    function openFloatFunc(index){
 
        const parsedIndex = +index;
        
        const floatMap = openFloat?.map((item, index)=> index === parsedIndex );

        console.log(floatMap)
        setOpenFloat(floatMap)
    }

    function closeFloatFunc(){
        setOpenModal(val=>!val)
        setOpenFloat(new Array(length).fill(false))
        setUserId(null);
    }


    const {updateFunc,error} = useUpdate();

    async function handleUpdateUser(e){
        const operation = e.target.dataset.operation;

        const composedUrl = `admin/user-manage/${encodeURIComponent(userId)}/${encodeURIComponent(operation)}`;

        const method = "PUT";

        const result = await updateFunc(method,{},composedUrl);
        const declaredOption = operation === "delete" ? "Deleted": "Updated";
        if(result?.isSuccess) {
            Swal.fire({
                title: `${result.messsage}`,
                icon: "successful",
                text: "User has been successfully deleted!",
              });
        
           
        }else {
            Swal.fire({
                title: `Operation Failed`,
                icon: "error",
                text: "Something went wrong. Please try again later!",
              });
        
        }

        fetchDataHandler();

        
          navigate("/users");
        
    }
    const modal = openModal && createPortal(<>
    <div className={kwan["backdrop-modal"]} onClick={closeFloatFunc}></div>
    <div className={kwan["container"]}>
        <FaX className={kwan["close-modal"]} onClick={closeFloatFunc}/>
        <p className={kwan["modal-message"]}>Are you sure you want to remove this user?</p>

        <Button type="button" className={kwan["no-btn"]} onClick={closeFloatFunc}>No</Button>
        <Button type="button" className={kwan["yes-btn"]} 
        onClick={handleUpdateUser} data-operation="delete">Yes</Button>
      
    </div>
    </>
    ,document.querySelector("#modal"))


    return(
        <React.Fragment>
            {modal}
            <header className={kwan["header"]}>
                <div><input type="checkbox" name="main" checked={allBoxes} onChange={()=>handleOnChange(-1)}/></div>
                <div>Name</div>
                <div>Email</div>
                <div>Role</div>
                <div>Status</div>
            
            </header>   

            <ul className={kwan["list"]}>
                {list?.map((val,i)=> 
                <li className={kwan["list-item"]} key={val.userId}>
                   <div><input name={val.userId} type="checkbox" 
                   checked={checkedState[i]} onChange={()=>handleOnChange(i)}/></div>
                   <div>{val.fullName}</div>
                   <div>{val.email}</div>
                   <div>{val.userType === 'assistant' ? "Assistant": "Senior"}</div>
                   <div>{val.approveFlg ? "Verified": "Pending"}</div>
                   <div className={kwan["ellipsis-container"]} onClick={()=>openFloatFunc(i)}  >
                        <FaEllipsisH className={kwan["ellipsis"]} />
                   </div>
                   {openFloat[i] && <div className={kwan["floating-option"]}>
                        <Link relative="true" to={`${encodeURIComponent(val.userId)}/edit`}
                        className={kwan["btn-edit"]}>
                            Modify Password
                        </Link>
                        {val.canBeDeleted === 1 && <Button type="button" className={kwan["btn-delete"]} 
                        onClick={()=>{
                            setOpenModal(val=>!val)
                            setUserId(val.userId)
                        }}>Delete</Button>}
                   </div>}
                </li>)}
            </ul>
        </React.Fragment>
    )
}

export default UserListTable