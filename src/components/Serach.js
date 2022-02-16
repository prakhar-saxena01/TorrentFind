import { useState } from "react";
import {
  AppBar,
  Container,
  InputBase,
  Toolbar,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Pagination,
  Backdrop,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Torrent from "./Torrent";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [torrents, setTorrents] = useState("");
  const [error, setError] = useState(false);
  const [server, setServer] = useState("pirate");
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [noOfpage, setNoOfPage] = useState(1);

  const selectHandler = (e) => {
    setServer(e.target.value);
    setTorrents("");
  };
  const inputHandler = (e) => {
    setValue(e.target.value);
  };
  const serachHandler = (e) => {
    e.preventDefault();
    if (value === "") {
      setTorrents("");
      setError(false);
      return 0;
    }
    setTorrents("");
    setLoading(true);
    axios
      .get(`https://tapi.up.railway.app/${server}/search/${value}`)
      .then((response) => {
        setTorrents(response.data);
        setNoOfPage(Math.ceil(response.data.length / itemsPerPage));
        setPage(1);
        setError(false);
        setLoading(false);
        setValue("");
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
        setTorrents("");
      });
  };
  const handelPagination = (event, value) => {
    setPage(value);
  };
  const StyledInputBase = styled(InputBase)({
    color: "inherit",
    "&.Mui-focused": {
      color: "inherit",
    },
  });
  const StyledSelect = styled(Select)({
    color: "inherit",
  });

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              Torrent Search
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
              }}
            >
              TSearch
            </Typography>

            <Box
              component="form"
              sx={{
                display: { xs: "flex", md: "flex" },
                alignItems: "center",
                justifyContent: "start",
              }}
              onSubmit={serachHandler}
            >
              <StyledInputBase
                placeholder="Search…"
                value={value}
                onChange={inputHandler}
                autoFocus={true}
              />
              <StyledSelect
                value={server}
                onChange={selectHandler}
                sx={{ mr: 3, display: { xs: "none", md: "block" } }}
              >
                <MenuItem value="pirate">Piratebay</MenuItem>
                <MenuItem value="lime">Lime</MenuItem>
                <MenuItem value="yts">Yts</MenuItem>
              </StyledSelect>
              <Button variant="contained" type="submit" sx={{ px: 3 }}>
                Search
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container
        sx={{
          mt: { xs: 8, md: 10 },
        }}
      >
        {loading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : error ? (
          <Alert variant="outlined" severity="error" sx={{ mt: 10 }}>
            No Torrent Found
          </Alert>
        ) : (
          torrents &&
          torrents
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((t) => <Torrent t={t} s={server} key={t.magnet} />)
        )}
      </Container>
      {torrents && (
        <Container
          spacing={2}
          sx={{
            my: 5,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Pagination
            count={noOfpage}
            page={page}
            onChange={handelPagination}
            defaultPage={1}
            variant="outlined"
            shape="rounded"
            color="primary"
            // sx={{ justtifyContent: "space-evenly" }}
          />
        </Container>
      )}
    </>
  );
};

export default Search;
