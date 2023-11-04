import React, { useState, useEffect } from "react";
import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import doneAllFill from "@iconify/icons-eva/done-all-fill";
import refreshOutline from "@iconify/icons-eva/refresh-outline";
import searchFill from "@iconify/icons-eva/search-fill";
import downloadIcon from "@iconify/icons-ant-design/download-outline";
import checkIcon from "@iconify/icons-ant-design/check-circle-outline";
import cancelIcon from "@iconify/icons-bx/x-circle";
import jsPDF from "jspdf";
import "jspdf-autotable";
// material
import { styled, alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApproval, setRequestList, setRejection } from "../store/actions";
import PacmanLoader from "react-spinners/PacmanLoader";
import Modal from "@mui/material/Modal";
// material
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
    Box,
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    Pagination,
    InputAdornment,
    Input,
    TextField,
} from "@mui/material";
import {
    fetchRequest,
    fetchRequestPage,
    fetchByNumber,
    fetchByName,
    totalCount,
    updateApprovalAll,
    updateApproval,
    fetchByDate,
} from "../api";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
    UserListHead,
    UserListToolbar,
    UserMoreMenu,
} from "../components/_dashboard/user";
//
// import USERLIST from '../_mocks_/user';
import Searchbar from "../layouts/dashboard/Searchbar";
import { DatePicker, LocalizationProvider } from "@mui/lab";
// import { setRejection } from "../store/actions/requestsActions";

// ----------------------------------------------------------------------

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
};

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled("div")(({ theme }) => ({
    top: 0,
    left: 0,
    zIndex: 99,
    width: "100%",
    display: "flex",
    position: "relative",
    alignItems: "center",
    height: APPBAR_MOBILE,
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
    padding: theme.spacing(0, 3),
    boxShadow: theme.customShadows.z8,
    backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
    [theme.breakpoints.up("md")]: {
        height: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5),
    },
}));

const TABLE_HEAD = [
    { id: "Name", label: "Name", alignRight: false },
    { id: "Phone Number", label: "Phone Number", alignRight: false },
    { id: "Applied On", label: "Applied On", alignRight: false },
    { id: "Address", label: "Address", alignRight: false },
    { id: "Amount", label: "Amount", alignRight: false },
    { id: "Period", label: "Period", alignRight: false },
    { id: "KYC status", label: "KYC status", alignRight: false },
    { id: "Status", label: "Status", alignRight: false },
    { id: "Payment Status", label: "Payment Status", alignRight: false },
    { id: "Accept Reject", label: "Accept/Reject", alignRight: false },
];

// ----------------------------------------------------------------------
// Can be a string as well. Need to ensure each key-value pair ends with ;

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(
            array,
            (_user) =>
                _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function User() {
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState("asc");
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState("amount");
    const [filterName, setFilterName] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [result, setResult] = useState([]);
    const [count, setCount] = useState(0);
    const [searchRequest, setSearchRequest] = useState("");
    const dispatch = useDispatch();
    let [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    let [color, setColor] = useState("#007B55");
    const [value, setValue] = useState(null);
    const handleDateSearch = () => {
        console.log(value);
    };
    const { requestList } = useSelector((state) => state.requestReducers);

    useEffect(async () => {
        handleApiCall(0, 100);
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRequestSort = (event, property) => {
        console.log(property);
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = result.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        const skip = (newPage ? newPage - 1 : newPage) * 100;
        handleApiCall(skip, 100);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const handleRefresh = () => {
        setPage(1);
        setValue(null);
        handleApiCall(0, 100);
    };

    const handleApproveAll = () => {
        updateApprovalAll().then((res) => {
            handleApiCall(0, 100);
        });
    };
    const handleApiCall = async (skip, limit) => {
        setLoading(true);
        setOpen(true);
        setRowsPerPage(100);
        if (skip !== undefined && limit !== undefined) {
            await fetchRequestPage(skip, limit).then((res) => {
                dispatch(setRequestList(res));
                setResult(res);
            });
        }
        setOpen(false);
        setLoading(false);
        await totalCount().then((res) => {
            setCount(res);
        });
    };

    const handleSearch = async () => {
        setLoading(true);
        setOpen(true);
        searchRequest == Number(searchRequest)
            ? await fetchByNumber(searchRequest).then((res) => {
                  setCount(res.length);
                  setRowsPerPage(res.length);
                  setResult(res);
              })
            : await fetchByName(searchRequest).then((res) => {
                  setCount(res.length);
                  setRowsPerPage(res.length);
                  setResult(res);
              });
        setOpen(false);
        setLoading(false);
    };
    const handlePdfDownload = () => {
        const doc = new jsPDF();
        doc.autoTable({ html: "#my-table" });
        doc.save("table-data.pdf");
    };
    const handleApprove = (id, approval) => {
        const data = {
            userId: id,
            approval: !approval,
        };
        updateApproval(data).then((res) => {
            dispatch(setApproval("1"));
        });
    };
    const handleRejection = (id, approval) => {
        const data = {
            userId: id,
            approval: !approval,
        };
        updateApproval(data).then((res) => {
            dispatch(setRejection("1"));
        });
    };

    useEffect(() => {
        console.log(value);
        if (value !== null) {
            setLoading(true);
            setOpen(true);
            fetchByDate(value).then((res) => {
                console.log(res);
                setCount(res.length);
                setRowsPerPage(res.length);
                setResult(res);
                setOpen(false);
                setLoading(false);
            });
        } else {
            handleApiCall();
        }
    }, [value]);

    useEffect(() => {
        setResult(requestList);
    }, [requestList]);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - result.length) : 0;

    const filteredUsers = applySortFilter(
        result,
        getComparator(order, orderBy),
        filterName
    );

    const isUserNotFound = filteredUsers.length === 0;

    var no = 0 + (page - 1) * 100;

    return (
        <Page title="Requests | LoanPe">
            <Container>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <PacmanLoader
                            color={color}
                            loading={loading}
                            size={25}
                        />
                    </Box>
                </Modal>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                >
                    <Typography variant="h4" gutterBottom>
                        Requests
                    </Typography>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Select Date"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                        </LocalizationProvider>
                        <span style={{ marginInline: "10px" }}></span>
                        <Button
                            variant="contained"
                            onClick={handleRefresh}
                            startIcon={<Icon icon={refreshOutline} />}
                        >
                            Refresh
                        </Button>
                        <span style={{ marginInline: "10px" }}></span>
                        <Button
                            variant="contained"
                            onClick={handleApproveAll}
                            startIcon={<Icon icon={doneAllFill} />}
                        >
                            Approve All
                        </Button>
                        <span style={{ marginInline: "10px" }}></span>
                        <Button
                            variant="contained"
                            onClick={handlePdfDownload}
                            startIcon={<Icon icon={downloadIcon} />}
                        >
                            Export as PDF
                        </Button>
                    </div>
                </Stack>
                <Card>
                    {/* <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}
                    <SearchbarStyle>
                        <Input
                            autoFocus
                            fullWidth
                            disableUnderline
                            placeholder="Search…"
                            value={searchRequest}
                            onChange={(e) => setSearchRequest(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Box
                                        component={Icon}
                                        icon={searchFill}
                                        sx={{
                                            color: "text.disabled",
                                            width: 20,
                                            height: 20,
                                        }}
                                    />
                                </InputAdornment>
                            }
                            sx={{ mr: 1, fontWeight: "fontWeightBold" }}
                        />
                        <Button variant="contained" onClick={handleSearch}>
                            Search
                        </Button>
                    </SearchbarStyle>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table id="my-table">
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={count}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    // onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {result
                                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const {
                                                _id,
                                                firstName,
                                                lastName,
                                                income,
                                                sex,
                                                pincode,
                                                phoneNumber,
                                                approval,
                                                address,
                                                date,
                                                choice,
                                                panPhoto,
                                                transaction,
                                                paymentStage1,
                                                paymentStage2,
                                                paymentStage3,
                                                isKycCompleted,
                                            } = row;
                                            const isItemSelected =
                                                selected.indexOf(firstName) !==
                                                -1;
                                            no++;
                                            return (
                                                <TableRow
                                                    hover
                                                    key={_id}
                                                    tabIndex={-1}
                                                    // role="checkbox"
                                                    // selected={isItemSelected}
                                                    // aria-checked={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        {/* <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, firstName)}
                            /> */}
                                                        {no}
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            spacing={1}
                                                        >
                                                            {/* <Avatar alt={firstName} src={avatarUrl} /> */}
                                                            <Typography
                                                                variant="subtitle2"
                                                                noWrap
                                                            >
                                                                {firstName +
                                                                    " " +
                                                                    lastName}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {phoneNumber}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {date.slice(0, 10)}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {address}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {choice.amount}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {choice.tenurePeriod}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Label
                                                            variant="ghost"
                                                            className="m-1"
                                                            color={
                                                                isKycCompleted
                                                                    ? "success"
                                                                    : "error"
                                                            }
                                                        >
                                                            {isKycCompleted
                                                                ? sentenceCase(
                                                                      "Completed"
                                                                  )
                                                                : sentenceCase(
                                                                      "Pending"
                                                                  )}
                                                        </Label>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {transaction &&
                                                            transaction.image && (
                                                                <Label
                                                                    variant="ghost"
                                                                    className="m-1"
                                                                    color={
                                                                        (approval ===
                                                                            "banned" &&
                                                                            "error") ||
                                                                        "success"
                                                                    }
                                                                >
                                                                    {approval
                                                                        ? sentenceCase(
                                                                              "approved"
                                                                          )
                                                                        : sentenceCase(
                                                                              "not Approved"
                                                                          )}
                                                                </Label>
                                                            )}

                                                        <Label
                                                            variant="ghost"
                                                            className="m-1"
                                                            color={
                                                                approval
                                                                    ? "success"
                                                                    : "error"
                                                            }
                                                        >
                                                            {approval
                                                                ? sentenceCase(
                                                                      "approved"
                                                                  )
                                                                : sentenceCase(
                                                                      "not Approved"
                                                                  )}
                                                        </Label>
                                                        {panPhoto === "" && (
                                                            <Label
                                                                className="m-1"
                                                                variant="ghost"
                                                                color="error"
                                                            >
                                                                {sentenceCase(
                                                                    "pending KYC"
                                                                )}
                                                            </Label>
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {paymentStage1 && (
                                                            <Label
                                                                variant="filled"
                                                                color="error"
                                                            >
                                                                1
                                                            </Label>
                                                        )}
                                                        <span
                                                            style={{
                                                                marginInline:
                                                                    "4px",
                                                            }}
                                                        ></span>
                                                        {paymentStage2 && (
                                                            <Label
                                                                variant="filled"
                                                                color="secondary"
                                                            >
                                                                2
                                                            </Label>
                                                        )}
                                                        <span
                                                            style={{
                                                                marginInline:
                                                                    "4px",
                                                            }}
                                                        ></span>
                                                        {paymentStage3 && (
                                                            <Label
                                                                variant="filled"
                                                                color="success"
                                                            >
                                                                3
                                                            </Label>
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <div>
                                                            <Button
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    approval
                                                                        ? handleRejection(
                                                                              _id,
                                                                              approval
                                                                          )
                                                                        : handleApprove(
                                                                              _id,
                                                                              approval
                                                                          );
                                                                }}
                                                            >
                                                                {!approval ? (
                                                                    <Icon
                                                                        icon={
                                                                            checkIcon
                                                                        }
                                                                        width="24"
                                                                        height="24"
                                                                        color="#00FF00"
                                                                    />
                                                                ) : (
                                                                    <Icon
                                                                        icon={
                                                                            cancelIcon
                                                                        }
                                                                        width="24"
                                                                        height="24"
                                                                        color="#FF0000"
                                                                    />
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        <UserMoreMenu
                                                            requestDetails={row}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                    <Pagination
                        count={Math.ceil(count / rowsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                    />
                </Card>
            </Container>
        </Page>
    );
}
