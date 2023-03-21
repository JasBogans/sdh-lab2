import { createContext, useContext, useState } from "react";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const appC = useAppProvider();

  return <AppContext.Provider value={appC}>{children}</AppContext.Provider>;
};

export const useAppState = () => {
  return useContext(AppContext);
};

function useAppProvider() {
  const [patientsList, setPatientsList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(undefined);

  const addPatient = (patient) => {
    fetch("http://localhost:3000/api/patients/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setPatientsList([...patientsList, res.data]);
        }
      });
  };

  const updatePatient = (patient) => {
    fetch("http://localhost:3000/api/patients/" + patient._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setPatientsList(
            patientsList.map((p) => (p._id === patient._id ? patient : p))
          );
        }
      });
  };

  const deletePatient = (id) => {
    fetch("http://localhost:3000/api/patients/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setPatientsList(patientsList.filter((p) => p._id !== id));
        }
      });
  };

  return {
    patientsList,
    setPatientsList,
    modalOpen,
    setModalOpen,
    selectedPatient,
    setSelectedPatient,
    addPatient,
    updatePatient,
    deletePatient,
  };
}

export default AppContext;
