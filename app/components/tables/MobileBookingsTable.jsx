"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import BookingsFilter from "../filters/BookingsFilter";
import CustomTableRow from "../table_rows/BookingsTableRow";
import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import useAtinaCalls from "@/app/hooks/useAtinaCalls";
import { tableStyles } from "@/app/styles/table_styles";

const tableStyle = {
  th: {
    cell: {
      textTransform: "capitalize",
      fontWeight: "600",
      paddingInline: "5px",
    },
  },
  tr: {
    cell: {
      fontSize: "0.8em",
      padding: "10px",
    },
    image: {
      transition: "0.3s all",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(2.5)",
        zIndex: "4",
      },
    },
  },
};

const tableColumns = [
  "datum",
  "uhrzeit",
  "buchungstyp",
  "straße",
  "hausnummer",
  "plz",
  "stadt",
  "land",
  "erstellt am",
];

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const MobileBookingsTable = () => {
  const { mobileBookings } = useSelector((state) => state.atina);
  const [contextMenu, setContextMenu] = useState(initalContextMenu);

  const { getMobileBookingsData } = useAtinaCalls();

  // ===pagination states START===
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shownData, setShownData] = useState();
  const [restart, setRestart] = useState(false);
  const [newest, setNewest] = useState(true);

  const handlePagination = () => {
    let currentPage = rowsPerPage * page;
    const newArray = mobileBookings?.slice(
      currentPage,
      currentPage + rowsPerPage
    );

    return setShownData(newArray);
  };
  // ===pagination states END===

  // ===Table Filter START===
  const [filterVal, setFilterVal] = useState({});

  const handleFilter = () => {
    const flag = Object.values(filterVal).some((x) => x !== "");
    const filteredData = mobileBookings?.filter((item) =>
      flag
        ? item.id === parseInt(filterVal.id) ||
          (item?.date?.toLowerCase() === filterVal?.date?.toLowerCase() &&
            filterVal.date !== "") ||
          (item?.bookingType?.toLowerCase() ===
            filterVal?.bookingType?.toLowerCase() &&
            filterVal.bookingType !== "") ||
          (item?.street?.toLowerCase() === filterVal?.street?.toLowerCase() &&
            filterVal.street !== "") ||
          (item?.zip?.toLowerCase() === filterVal?.zip?.toLowerCase() &&
            filterVal.zip !== "") ||
          (item?.city?.toLowerCase() === filterVal?.city?.toLowerCase() &&
            filterVal.city !== "") ||
          (item?.country?.toLowerCase() === filterVal?.country?.toLowerCase() &&
            filterVal.country !== "")
        : true
    );
    setShownData(filteredData);
  };

  const handleReset = () => {
    setFilterVal({});
    handleFilter();
  };
  // ===Table Filter END===

  // === Column Select START ===
  const [selectedColumns, setSelectedColumns] = useState(tableColumns);
  // === Column Select END ===

  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1400px)");

  useEffect(() => {
    getMobileBookingsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restart]);

  useEffect(() => {
    handlePagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, mobileBookings]);
  // console.log(mobileBookings[0]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {contextMenu.show && (
        <ContextMenu
          X={contextMenu.x}
          Y={contextMenu.y}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          tableColumns={tableColumns}
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
        />
      )}
      <TableContainer
        component={Paper}
        onContextMenu={handleRightClick}
        sx={{
          maxWidth: xxl ? "90vw" : { lg: "1250px" },
          margin: "auto",
          padding: "1rem 10px",
          position: "relative",
        }}
      >
        <BookingsFilter
          handleReset={handleReset}
          handleFilter={handleFilter}
          filterVal={filterVal}
          setFilterVal={setFilterVal}
        />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Pagination
            data={mobileBookings}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            handlePagination={handlePagination}
            setRestart={setRestart}
          />
          <DownloadCSV rawData={shownData} />
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {selectedColumns.includes("datum") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  datum
                </TableCell>
              )}
              {selectedColumns.includes("uhrzeit") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  uhrzeit
                </TableCell>
              )}
              {selectedColumns.includes("buchungstyp") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  buchungstyp
                </TableCell>
              )}
              {selectedColumns.includes("straße") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  straße
                </TableCell>
              )}
              {selectedColumns.includes("hausnummer") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  hausnummer
                </TableCell>
              )}
              {selectedColumns.includes("plz") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  plz
                </TableCell>
              )}
              {selectedColumns.includes("stadt") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  stadt
                </TableCell>
              )}
              {selectedColumns.includes("land") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  land
                </TableCell>
              )}
              {selectedColumns.includes("erstellt am") && (
                <TableCell
                  onClick={() => setNewest(!newest)}
                  sx={{
                    ...tableStyles.th.cell,
                    display: "flex",
                    alignItems: "center",
                    columnGap: "5px",
                    cursor: "pointer",
                  }}
                  align="left"
                >
                  <Box>erstellt am</Box>
                  {newest && <VerticalAlignBottomIcon />}
                  {!newest && <VerticalAlignTopIcon />}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {shownData?.map((booking) => {
              return (
                <CustomTableRow
                  key={booking?.id}
                  selectedColumns={selectedColumns}
                  booking={booking}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MobileBookingsTable;
