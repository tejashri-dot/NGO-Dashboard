import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "./withMaterialTable.module.css";

const customButtonStyle = {
  background: "linear-gradient(165deg, #EFA423 0%, #F04333 100%)",
  color: "white",
  fontWeight: "bold",
  textTransform: "none",
  padding: "8px 20px",
  borderRadius: "8px",
};

const withMaterialTable = (WrappedComponent, tableConfig) => {
  return () => {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState({});
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 }); // Add pagination state
    const [rowCount, setRowCount] = useState(0); // Total rows for pagination

    useEffect(() => {
      const fetchData = async () => {
        const result = await tableConfig.getData({
          page: pagination.pageIndex,
          pageSize: pagination.pageSize,
        });
        setData(result.data || result); // Use result.data if paginated, otherwise result
        setRowCount(result.total || result.length || 0); // Set total rows
      };
      fetchData();
    }, [tableConfig, pagination]); // Depend on pagination changes

    const openAddDialog = () => {
      setSelectedRow({});
      setIsAddOpen(true);
    };

    const openEditDialog = (rowData) => {
      setSelectedRow(rowData);
      setIsEditOpen(true);
    };

    const closeDialogs = () => {
      setIsAddOpen(false);
      setIsEditOpen(false);
      setSelectedRow({});
    };

    const handleAdd = async () => {
      const newRow = await tableConfig.addData(selectedRow);
      setData((prev) => [...prev, newRow]);
      setRowCount((prev) => prev + 1); // Update row count
      closeDialogs();
    };

    const handleUpdate = async () => {
      await tableConfig.updateData(selectedRow);
      setData((prev) =>
        prev.map((item) => (item.id === selectedRow.id ? selectedRow : item)) // Use 'id' not '_id'
      );
      closeDialogs();
    };

    const handleDelete = async (rowData) => {
      if (window.confirm("Are you sure you want to delete this item?")) {
        await tableConfig.deleteData(rowData.id); // Use 'id' not '_id'
        setData((prev) => prev.filter((item) => item.id !== rowData.id));
        setRowCount((prev) => prev - 1); // Update row count
      }
    };

    const truncateText = (value) => {
      if (!value) return "—";
      const str = String(value);
      const words = str.trim().split(" ");
      return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : str;
    };

    const truncateLink = (url) => {
      if (!url) return "—";
      return url.length > 35 ? url.substring(0, 35) + "..." : url;
    };

    const ActionMenu = ({ row }) => {
      const [anchorEl, setAnchorEl] = useState(null);

      return (
        <>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                alert(JSON.stringify(row.original, null, 2));
                setAnchorEl(null);
              }}
            >
              View
            </MenuItem>
            <MenuItem
              onClick={() => {
                openEditDialog(row.original);
                setAnchorEl(null);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDelete(row.original);
                setAnchorEl(null);
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </>
      );
    };

    const columns = useMemo(() => {
      return [
        {
          accessorKey: "srNo",
          header: "Sr No",
          Cell: ({ row }) => row.index + 1,
        },
        ...tableConfig.columns.map((col) => ({
          ...col,
          Cell: col.Cell || (({ row }) => truncateText(row.original[col.accessorKey])),
        })),
        {
          accessorKey: "actions",
          header: "Actions",
          Cell: ({ row }) => <ActionMenu row={row} />,
        },
      ];
    }, [data]);

    const renderFormFields = () => {
      return tableConfig.columns.map((col) => {
        // Conditional rendering for Bhishi-specific fields
        if (col.accessorKey === "amount" && selectedRow.type !== "Donor") return null;
        if (col.accessorKey === "bhishiType" && selectedRow.type !== "Bhishi Member") return null;

        if (col.inputType === "date") {
          return (
            <div key={col.accessorKey} style={{ margin: "10px 0" }}>
              <FormControl fullWidth>
                <InputLabel shrink>{col.header}</InputLabel>
                <DatePicker
                  selected={
                    selectedRow[col.accessorKey]
                      ? new Date(selectedRow[col.accessorKey])
                      : new Date()
                  }
                  onChange={(date) =>
                    setSelectedRow((prev) => ({
                      ...prev,
                      [col.accessorKey]: date.toISOString().split("T")[0],
                    }))
                  }
                  dateFormat="yyyy-MM-dd"
                  customInput={<TextField margin="dense" />}
                />
              </FormControl>
            </div>
          );
        }

        if (col.inputType === "select" && col.options) {
          return (
            <FormControl key={col.accessorKey} fullWidth margin="dense">
              <InputLabel>{col.header}</InputLabel>
              <Select
                value={selectedRow[col.accessorKey] || col.options[0] || ""}
                onChange={(e) =>
                  setSelectedRow((prev) => ({
                    ...prev,
                    [col.accessorKey]: e.target.value,
                  }))
                }
                label={col.header}
              >
                {col.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }

        if (["audio", "video", "thumbnail"].includes(col.accessorKey)) {
          const label =
            col.accessorKey === "audio"
              ? "Upload Audio"
              : col.accessorKey === "video"
              ? "Upload Video"
              : "Upload Thumbnail";

          return (
            <div key={col.accessorKey} style={{ margin: "10px 0" }}>
              <label style={{ fontWeight: "bold" }}>{label}</label>
              <input
                type="file"
                accept={
                  col.accessorKey === "audio"
                    ? "audio/*"
                    : col.accessorKey === "video"
                    ? "video/*"
                    : "image/*"
                }
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setSelectedRow((prev) => ({
                      ...prev,
                      [col.accessorKey]: file,
                    }));
                  }
                }}
              />
              {selectedRow[col.accessorKey] &&
                typeof selectedRow[col.accessorKey] !== "object" && (
                  <div style={{ fontSize: "12px", color: "#888" }}>
                    Existing: {truncateLink(selectedRow[col.accessorKey])}
                  </div>
                )}
            </div>
          );
        }

        return (
          <TextField
            key={col.accessorKey}
            label={col.header}
            fullWidth
            margin="dense"
            value={selectedRow[col.accessorKey] || ""}
            onChange={(e) =>
              setSelectedRow((prev) => ({
                ...prev,
                [col.accessorKey]: e.target.value,
              }))
            }
          />
        );
      });
    };

    return (
      <div className={styles.Container}>
        <div className={styles.Header}>
          <h2>{tableConfig.title}</h2>
          <Button
            startIcon={<AddIcon />}
            onClick={openAddDialog}
            style={customButtonStyle}
          >
            Add New
          </Button>
        </div>

        <div className={styles.TableWrapper}>
          <MaterialReactTable
            columns={columns}
            data={data}
            enablePagination
            manualPagination // Enable manual pagination
            onPaginationChange={setPagination} // Update pagination state
            state={{ pagination }} // Pass pagination state to table
            rowCount={rowCount} // Total rows for pagination
          />
        </div>

        <Dialog open={isAddOpen} onClose={closeDialogs}>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogContent>{renderFormFields()}</DialogContent>
          <DialogActions>
            <Button onClick={closeDialogs}>Cancel</Button>
            <Button onClick={handleAdd} style={customButtonStyle}>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isEditOpen} onClose={closeDialogs}>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogContent>{renderFormFields()}</DialogContent>
          <DialogActions>
            <Button onClick={closeDialogs}>Cancel</Button>
            <Button onClick={handleUpdate} style={customButtonStyle}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
};

export default withMaterialTable;