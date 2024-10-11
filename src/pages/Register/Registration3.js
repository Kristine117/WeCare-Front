import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import registerModal from "./Register.module.css";

export default function Registration3() {
    const navigate = useNavigate();

    // Retrieve and parse the initialData from localStorage
    const storedInitialData = JSON.parse(localStorage.getItem("initialData"));
    // Extract email and password from the parsed object
    const storedEmail = storedInitialData ? storedInitialData.email : "";
    const storedPassword = storedInitialData ? storedInitialData.password : "";
  
    const [barangays, setBarangays] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [activeForm, setActiveForm] = useState(null);
    const [isSeniorModalOpen, setIsSeniorModalOpen] = useState(false);
    const [isCaregiverModalOpen, setIsCaregiverModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // State for confirmation modal
  
    // Initialize initialData without Redux state
    const [initialData, setInitialData] = useState({
      firstname: "",
      lastname: "",
      gender: "",
      contactNumber: "",
      birthDate: "",
      userType: "",
      barangayId: "",
      experienceId: "",
      street: "",
      email: "",        
      password: ""     
    });




  
    const isSeniorFormComplete = () => {
      return activeForm === 'senior' && 
             initialData.firstname && 
             initialData.lastname && 
             initialData.gender && 
             initialData.contactNumber.length === 11 && // Assuming contact number has 11 digits
             initialData.birthDate && 
             initialData.userType && 
             initialData.barangayId && 
             initialData.experienceId && 
             initialData.street;
    };
    
    const isCaregiverFormComplete = () => {
      return activeForm === 'caregiver' && 
             initialData.firstname && 
             initialData.lastname && 
             initialData.gender && 
             initialData.contactNumber.length === 11 && // Assuming contact number has 11 digits
             initialData.birthDate && 
             initialData.userType && 
             initialData.barangayId && 
             initialData.experienceId && 
             initialData.street;
    };
    
    const openSeniorModal = () => {
      setActiveForm('senior');
      setIsSeniorModalOpen(true);
      setInitialData((prevData) => ({
        ...prevData,
        userType: "senior citizen",
        email: storedEmail,
        password: storedPassword,
      }));
    };
    
    const openCaregiverModal = () => {
      setActiveForm('caregiver');
      setIsCaregiverModalOpen(true);
      setInitialData((prevData) => ({
        ...prevData,
        userType: "senior assistant",
        email: storedEmail,
        password: storedPassword,
      }));
    };
    
  
    const closeSeniorModal = () => setIsSeniorModalOpen(false);
    const closeCaregiverModal = () => setIsCaregiverModalOpen(false);


      // Open the confirmation modal when the user clicks submit
      const openConfirmationModal = (e) => {
        e.preventDefault();
        setIsConfirmationModalOpen(true);
        collectDataRegistration1();
      };


            // Fire this function when the component starts
  useEffect(() => {
    // Perform any initialization logic here
    console.log("function FIRE");
    fetch(`${process.env.REACT_APP_API_URL}/barangay/registered-barangays`,{
      method:'GET',
      headers:{
         "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.isSuccess) {
        setBarangays(data.data); // Update the state with barangay data
      } else {
        console.error("Failed to fetch barangay data.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    })
    

    fetch(`${process.env.REACT_APP_API_URL}/experience/registered-experiences`,{
      method:'GET',
      headers:{
        "Content-Type": "application/json"
     }
    })
    .then(response => response.json())
    .then(data => {
      if (data.isSuccess) {
        setExperiences(data.data); // Update the state with barangay data
      } else {
        console.error("Failed to fetch barangay data.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    })



  }, []);


  
    const collectDataRegistration1 = (e) => {

      fetch(`${process.env.REACT_APP_API_URL}/main/register-user`,{
        method:'POST',
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(initialData) 
      })
      .then(response => response.json())  // Assuming the server responds with JSON
      .then(data => {

        // Close all modals and navigate to the homepage
        setIsConfirmationModalOpen(false);
        navigate("/"); // Navigate to the homepage
        storedEmail = "";
        storedPassword = "";

      })
      .catch(error => {
        console.error("Error:", error);
      });
      // Close the modal after successful submission
      if (activeForm === 'senior') {
        setIsSeniorModalOpen(false);
      } else if (activeForm === 'caregiver') {
        setIsCaregiverModalOpen(false);
      }
    };

    // Handle form submission
    const collectDataRegistration2 = (e) => {
      e.preventDefault();

      console.log(initialData)
      setIsSeniorModalOpen(false);
      setIsCaregiverModalOpen(false);
    };

    useEffect(() => {
      setActiveForm(activeForm); // This will ensure the buttons are re-calculated when the form is filled.
    }, [initialData]);
  
    // Handle changes in form input fields
    const handleChange = (e) => {
      const { name, value } = e.target;
      setInitialData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    
  
    const seniorButtonClass = isSeniorFormComplete() 
    ? `${registerModal.complete} ${registerModal["square-place-holder"]}` 
    : `${registerModal["square-place-holder"]}`;
  
  const caregiverButtonClass = isCaregiverFormComplete() 
    ? `${registerModal.complete} ${registerModal["square-place-holder"]}` 
    : `${registerModal["square-place-holder"]}`;
  
    
    

    return (
      <div className="background1">
        <div className="login-container">
          <div className="login-box">
            <span
              className="material-symbols-outlined"
              onClick={() => navigate("/registration1")}
            >
              arrow_back
            </span>
            <h3 className="pb-3">Almost Finish!</h3>

            <form onSubmit={openConfirmationModal}>
            <div className="form-group">
              <label className="pb-3">Step 2: Roles and Agreement</label>
            </div>
            <div className="form-group">
              <label className="pb-3">Register an account for:</label>
              <div className="d-flex justify-content-center">
                {/* Senior button */}
                <div
                  className={`${seniorButtonClass} button-hover-effect p-2 m-2 d-flex flex-column align-items-center`}
                  onClick={openSeniorModal}
                >
                  <span className="material-symbols-outlined icon-custom">
                    elderly
                  </span>
                  <p className="font-white">Senior</p>
                </div>

                {/* Caregiver button */}
                <div
                  className={`${caregiverButtonClass} button-hover-effect p-2 m-2 d-flex flex-column align-items-center`}
                  onClick={openCaregiverModal}
                >
                  <span className="material-symbols-outlined icon-custom">
                    person_apron
                  </span>
                  <p className="font-white">Caregiver</p>
                </div>
              </div>

              {/* Agreement section */}
              <div className="form-group">
                <label className="pt-3 pb-3">
                  To continue, please review and agree to the following:
                </label>
              </div>

              <div className="form-group">
                <input type="checkbox" className="mr-2" required />
                <label className="pb-1">I agree to the Data Privacy</label>
              </div>

              <div className="form-group">
                <input type="checkbox" className="mr-2" required />
                <label className="pb-2">I agree to the Terms & Conditions.</label>
              </div>
            </div>
            <button type="submit" className="btn btn-login">
              Register
            </button>
          </form>


          </div>
        </div>



          {/* Confirmation Modal */}
          {isConfirmationModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h4>Confirm Submission</h4>
                <p>Are you sure you want to submit the form?</p>
                <button onClick={collectDataRegistration2}>Confirm</button>
                <button onClick={() => setIsConfirmationModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}


 {/* Senior Citizen Modal */}
 {isSeniorModalOpen && (
        <div className={registerModal.modal}>
          <div className={registerModal.modalContentSenior}>
            <span className="close" onClick={closeSeniorModal}>
              &times;
            </span>
            <h2>Senior Application Form</h2>
            <form onSubmit={collectDataRegistration2} className="spacing">

            <div className="d-flex mt-5">  

             <div className="d-block">  
                <div className="form-group d-flex">
                <input type="text" className="form-control mr-4" 
                      placeholder="Enter Family Name" id="familyName" name="lastname" 
                      value={initialData.lastname}
                      onChange={handleChange}/>
                <input type="text" className="form-control" placeholder="Enter First Name"
                      id="firstName" name="firstname" 
                      value={initialData.firstname}
                      onChange={handleChange}
                      required />
                </div>

                <div className="form-group d-flex mt-4">
                <select
                  id="barangay"
                  name="barangayId"
                  className="form-control select-input"
                  required
                  value={initialData.barangayId} // Ensure you have this defined
                  onChange={handleChange} // Ensure you have a handleChange function defined
                >
                  <option value="">Select Barangay</option>
                  {barangays.map((barangay) => (
                    <option key={barangay.barangayId} value={barangay.barangayId}>
                      {barangay.barangay}
                    </option>
                  ))}
                </select>

                    <input type="text" className="form-control ml-3" placeholder="Enter Street"
                      id="street" name="street" 
                      value={initialData.street}
                      onChange={handleChange} />
                </div>


                <div className="form-group d-flex">
                    <div className="d-block">
                        <label className="mb-2 ml-2">Birth Date</label>
                        <input type="date" className="form-control mr-4" 
                        required/>
                    </div>
                    <input type="text" className="form-control mt-4 ml-3" placeholder="Enter Age" 
                      id="birthDate" name="birthDate"
                      value={initialData.birthDate}
                      onChange={handleChange} // Corrected here
                    />
                </div>


                <div className="form-group d-flex mt-4">
                <input 
                type="text"
                className="form-control mr-2"
                placeholder="Enter contact no."
                id="contact"
                name="contactNumber"
                pattern="\d{11}"  
                minLength="11"    
                maxLength="11"    
                title="Contact number must be exactly 11 digits" 
                required
              />
                </div>
              </div> 






              <div className="d-block ml-5">  

                <div className="form-group sex-checkBox-container mb-4">
                    <label>Sex: </label>
                    <div className="d-flex ml-5">
                    <input type="radio" name="gender" className="mr-2" id="male"
                        value="male" // Corrected to set a specific value
                        onChange={handleChange}
                        required/>
                        <label htmlFor="male">Male</label>
                    </div>

                    <div className="d-flex ml-5">
                    <input type="radio" name="gender" className="mr-2" id="female" 
                        value="female" // Corrected to set a specific value
                        onChange={handleChange}
                        required/>
                        <label htmlFor="female">Female</label>
                    </div>

                

                    </div>


                    <div className="form-group d-block">
                        <input type="number" className="form-control" placeholder="Enter Senior ID "
                        id="seniodId" name="seniodId"
                        required/>
                        <label className="mt-2">(If Applicable)</label>
                    </div>

                </div> 
            </div> 

            <div className="d-flex mb-5 mt-3 "> 
                <label className="mr-4">Civil status:</label>
                <input type="radio" name="civilStatus" value="single" className="mr-2" id="single" required/>
                <label className="mr-3">Single</label>
                <input type="radio" name="civilStatus" value="married" className="mr-2" id="married" required/>
                <label className="mr-3">Married</label>
                <input type="radio" name="civilStatus" value="separated" className="mr-2" id="separated" required/>
                <label className="mr-3">Separated</label>
                <input type="radio" name="civilStatus" value="window" className="mr-2" id="window" required/>
                <label>widow/her</label>
            </div> 
 

            <div className="d-flex mb-5 mt-3"> 
                <label className="mr-3">Health status:</label>
                <input type="radio" name="healthStatus" value="physicallyFit" className="mr-2" id="physicallyFit" required/>
                <label className="mr-3">Physically fit</label>
                <input type="radio" name="healthStatus" value="frailSickly" className="mr-2" id="frailSickly" required/>
                <label className="mr-3">Frail/Sickly</label>
                <input type="radio" name="healthStatus" value="pwd" className="mr-2" id="pwd" required/>
                <label className="mr-3">PWD</label>
                <input type="radio" name="healthStatus" value="bedRidden" className="mr-2" id="bedRidden" required/>
                <label>Bedridden</label>
            </div> 
 

            <div className="d-block mb-3 mt-4"> 
                <label className="mr-3 mb-3">Are you taking medicines/maintenance as prescribed by a doctor?</label>

                <input type="radio" name="medsTaken" value="medsYes" className="mr-2" id="medsYes" required/>
                <label className="mr-3">YES</label>
                <input type="radio" name="medsTaken" value="medsNo" className="mr-2" id="medsNo" required/>
                <label>NO</label>
            </div>

            <div className="sex-checkBox-container mb-3 mt-4 ml-2"> 
            <label className="mr-3 mb-1">If yes, please write the prescribed medicine/s</label>
            <textarea id="prescribeMed" name="prescribeMed" rows="4" cols="50" className="form-control" required>
           
            </textarea>
            </div>

            <div className="sex-checkBox-container mb-3 mt-4 ml-2"> 
            <label className="mr-3"> Authorized representative     (Leave Blank if None)</label>
            <input type="submit" className="btn btn-login buttonSeniorSize" value="Add Person" required/>
            </div>


 
              {/* Add more fields as necessary */}
              <div className="d-flex justify-content-center">
              <input type="submit" className="btn btn-login buttonSeniorSize" value="Submit" />
              </div>

            </form>
          </div>
        </div>
      )}



        {/* Caregiver Modal */}
        {isCaregiverModalOpen && (
        <div className={registerModal.modal}>
          <div className={registerModal.modalContent}>
          <span className="close" onClick={closeCaregiverModal}>
              &times;
            </span>
            <h2>Caregiver Registration Form</h2>
            <form  onSubmit={collectDataRegistration2}>

            <div className="d-flex mt-5"> 

            <div className="d-block">  
                <div className="form-group d-flex">
                <input type="text" className="form-control mr-4" 
                      placeholder="Enter Family Name" id="familyName" name="lastname" 
                      value={initialData.lastname}
                      onChange={handleChange}/>
                <input type="text" className="form-control" placeholder="Enter First Name"
                      id="firstName" name="firstname" 
                      value={initialData.firstname}
                      onChange={handleChange} 
                      required/>
                </div>



                <div className="form-group sex-checkBox-container mb-4 ml-3">
                    <label>Sex: </label>
                    <div className="d-flex ml-5">
                    <input type="radio" name="gender" className="mr-2" id="male"
                        value="male" // Corrected to set a specific value
                        onChange={handleChange}
                        required/>
                        <label htmlFor="male">Male</label>
                    </div>

                    <div className="d-flex ml-5">
                    <input type="radio" name="gender" className="mr-2" id="female" 
                        value="female" // Corrected to set a specific value
                        onChange={handleChange}
                        required/>
                        <label htmlFor="female">Female</label>
                    </div>
                </div>


                <div className="form-group d-flex mt-4">
                <select
                  id="barangay"
                  name="barangayId"
                  className="form-control select-input"
                  required
                  value={initialData.barangayId} // Ensure you have this defined
                  onChange={handleChange} // Ensure you have a handleChange function defined
                >
                  <option value="">Select Barangay</option>
                  {barangays.map((barangay) => (
                    <option key={barangay.barangayId} value={barangay.barangayId}>
                      {barangay.barangay}
                    </option>
                  ))}
                </select>

                    <input type="text" className="form-control ml-3" placeholder="Enter Street"
                      id="street" name="street" 
                      value={initialData.street}
                      onChange={handleChange} />
                </div>


                <div className="form-group d-flex">
                    <div className="d-block">
                        <label className="mb-2 ml-2">Birth Date</label>
                        <input type="date" className="form-control mr-4" />
                    </div>
                    <input type="text" className="form-control mt-4 ml-3" placeholder="Enter Age" 
                      id="birthDate" name="birthDate"
                      value={initialData.birthDate}
                      onChange={handleChange} // Corrected here
                      required
                    />
                </div>


                <div className="form-group d-flex mt-4">
                <input 
                type="text"
                className="form-control mr-2"
                placeholder="Enter contact no."
                id="contact"
                name="contactNumber"
                pattern="\d{11}"  
                minLength="11"    
                maxLength="11"    
                title="Contact number must be exactly 11 digits" 
                required
              />
                      

<select
                    id="experience"
                    name="experienceId"
                    className="form-control select-input"
                    required
                    value={initialData.experienceId} // Ensure you have this defined
                    onChange={handleChange} // Ensure you have a handleChange function defined
                  >
                    <option value="">Experience</option>
                    {experiences.map((experience) => (
                      <option key={experience.experienceId} value={experience.experienceId}>
                        Years of Experience: {experience.numOfYears}
                        -Experience Description:{experience.experienceDescription}
                      </option>
                    ))}
                  </select>
                </div>

              </div> 




            </div> 



              {/* Add more fields as necessary */}
              <div className="d-flex justify-content-center">
              <input type="submit" className="btn btn-login buttonSeniorSize" value="Submit" />
              </div>




            </form>


          </div>
        </div>
      )}
        
      </div>
    );
}
