import { Card, Col, Row } from "antd";
import logo from "./logo.svg";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CardHeader from "@mui/material/CardHeader";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./App.css";

import {
  connectMetaMaskaction,
  EnterLottery,
  getBalance,
  LotteryContract,
  PickaWinner,
  getAccount,
} from "./component/wallet";
import { TextField } from "@mui/material";
import { ethers, providers } from "ethers";

function App() {
  const [isWalletconnected, setisWalletConnected] = useState(false);
  const [IntractWithContract, setIntractWithContract] = useState();
  const [account, setAccount] = useState("abc");
  const [allPlayer, setAllPlayer] = useState([]);
  const [balance, setBalance] = useState(0);
  const [enterdValue, setEnterdValue] = useState();

  const [manager, setManager] = useState("");
  useEffect(() => {
    if (isWalletconnected) {
      setInterval(() => {
        ReadyToIntractWithContract();
      }, 2000);
    }
  }, [isWalletconnected]);

  const ReadyToIntractWithContract = async () => {
    if (isWalletconnected) {
      const intractWithWeb3 = await LotteryContract();
      setIntractWithContract(intractWithWeb3);
      const managerResult = await intractWithWeb3.manager();
      const playerResult = await intractWithWeb3.getAllPlayers();
      // const balance = await window.web3.eth.getBalance(managerResult);

      const balanceResult = await getBalance();
      const getConnectedAccount = await getAccount();
      setAccount(getConnectedAccount[0]);
      setBalance(balanceResult);
      setManager(managerResult);

      setAllPlayer(playerResult);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>

            {isWalletconnected ? (
              <Button variant="contained" color="success" disabled>
                Connected
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={async () => {
                  const result = await connectMetaMaskaction();
                  // setTimeout(() => {
                  if (result) {
                    setisWalletConnected(true);
                  } else {
                    setisWalletConnected(false);
                  }
                  // }, 1000);
                }}
              >
                Connect
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container xs={12} justifyContent={"center"} alignContent={"center"}>
        <Grid
          container
          xs={6}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
            This Contract is managed by {manager} {balance}
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
            Total Number of Player {allPlayer.length}
          </Typography>

          <Card
            style={{
              borderRadius: 20,
              width: "100%",
              backgroundColor: "rgba(156, 161, 157,0.3)",
              border: "1px solid black",
              marginTop: 20,
            }}
          >
            <CardHeader
              title={"Try Your Luck"}
              style={{ textAlign: "center" }}
            />
            {enterdValue < balance ? "" : "insufficient Funds"}
            <CardContent>
              <TextField
                id="outlined-basic"
                label="Enter Value"
                onChange={(e) => {
                  setEnterdValue(e.target.value);
                }}
                style={{ width: "100%" }}
                type="number"
                variant="outlined"
              />
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <Button
                size="small"
                variant="contained"
                disabled={enterdValue < balance ? true : false}
                onClick={() => {
                  EnterLottery(enterdValue);
                }}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>{" "}
      <Grid container xs={12} justifyContent={"center"} alignContent={"center"}>
        <Grid
          container
          xs={6}
          justifyContent={"center"}
          alignContent={"center"}
        >
          {manager == account && (
            <Box>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Pick a Winner
              </Typography>

              <Button
                variant="contained"
                onClick={async () => {
                  const result = await PickaWinner();
                }}
              >
                Pick a Winner
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
