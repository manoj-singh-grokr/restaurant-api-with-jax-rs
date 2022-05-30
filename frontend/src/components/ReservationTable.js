import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const ReservationTable = ({ rows, setReservations }) => {
  const [updateStatus, setUpdateStatus] = useState("");

  const handleUpdate = async (values) => {
    var date = new Date(values.timeOfReservation);
    var isoDateTime = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .substring(0, 19);

    const result = await axios({
      url: "/restaurant_api/api/reservations/update/" + values.id,
      method: "put",
      data: {
        noOfPeople: values.noOfPeople,
        timeOfReservation: isoDateTime,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      setUpdateStatus(1);
    } else {
      setUpdateStatus(2);
    }
    setTimeout(() => {
      setUpdateStatus("");
    }, 2000);
  };

  const handleDelete = async (mobileNo) => {
    const result = await axios({
      method: "DELETE",
      url: "/restaurant_api/api/reservations/delete",
      data: { mobileNo: mobileNo },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      setReservations((prev) => {
        return prev.filter((item) => item.mobileNo !== mobileNo);
      });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "User Name", width: 130 },
    {
      field: "mobileNo",
      headerName: "Mobile No",
      width: 130,
      sortable: false,
    },
    {
      field: "noOfPeople",
      headerName: "No of People",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: "timeOfReservation",
      headerName: "Time Of Reservation",
      type: "dateTime",
      width: 180,
      editable: true,
      valueGetter: (params) =>
        `${new Date(params.row.timeOfReservation).toLocaleString()}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => handleUpdate(params.row)}>
            <EditIcon data-testid={`update${params.row.id}`} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.mobileNo)}>
            <DeleteIcon data-testid={`delete${params.row.id}`} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: "timeOfReservation", sort: "desc" }],
          },
        }}
        autoHeight={true}
        rows={rows}
        columns={columns}
        editMode="row"
        pageSize={5}
        columnBuffer={6}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      {updateStatus && (
        <p
          style={{
            color: updateStatus === 1 ? "green" : "red",
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          {updateStatus === 1 ? "Successfully updated!" : "Failed updating!"}
        </p>
      )}
    </div>
  );
};

export default ReservationTable;
