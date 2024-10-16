import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import appList from "./AppointmentList.module.css";
import SideMenu from "../../components/SideMenu/SideMenu";
import AppointmentDetails from "../../components/AppointmentDetails/AppointmentDetails";

const AppointmentList = ()=>{
    const [list,setList] = useState([]);
    useEffect(()=>{
        async function getAppointmentList(){

            const data = await fetch(`${process.env.REACT_APP_API_URL}/appointment/appointment-list`,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                  },
            })
            const parseData = await data.json();
            setList(parseData?.data);
        }

        getAppointmentList();
    },[])
    
    console.log(list)
    const {user} = useContext(UserContext);
    return(
        <main>
           {(!user?.id && user.userType !== 'senior' && user.userType !== null) && <Navigate to={"/login"}/>}
           {(user.userType === 'senior' && user.userType !== null) && <section className={appList['page-flex']}>
                <SideMenu/>
                <DashboardContainer>
                    <div>Appointment List</div>
                    {list?.map(val=><AppointmentDetails key={val.appointmentId} appId={val.appointmentId}
                        description={val.serviceDescription}
                        statusDes={val.statusDescription}
                        price={val.totalAmount}
                        assistantName={val.assistantName}
                        />)}
                </DashboardContainer>            
            </section>}
        </main>        
    )
}

export default AppointmentList;