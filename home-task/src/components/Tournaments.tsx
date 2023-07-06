import Navbar from "./Navbar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Link } from "@mui/material";
import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";

const Tournaments = () => {
  const [totalPrize, setTotalPrize] = useState(0);
  const [value, copy] = useCopyToClipboard();
  const tournamentData: any = localStorage.getItem("tournamentData");
  const parsedData = tournamentData ? JSON.parse(tournamentData) : [];
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      renderCell: (params: any) => {
        const id = params.row.id;

        const handleCopyToClipboard = () => {
          copy(id);
          alert(`Copied ID ${id} to clipboard!`);
          console.log(`Copied value: ${value ?? 'Nothing is copied yet!'}`)
        };

        return <Button onClick={handleCopyToClipboard}>{id}</Button>;
      },
    },

    { field: "title", headerName: "Title", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "numberOfPlayers", headerName: "Number of Players", width: 150 },
    { field: "entryFee", headerName: "Entry Fee", width: 100 },
    {
      field: "totalPrizePool",
      headerName: "Total Prize Pool",
      width: 150,
      renderCell: (params) => {
        return <div>{params.row.totalPrizePool || totalPrize}</div>;
      },
    },
    { field: "numberOfWinners", headerName: "Number of Winners", width: 150 },
    {
      field: "action1",
      headerName: "Action 1",
      width: 150,
      renderCell: () => <Link href="/">Home page</Link>,
    },
    {
      field: "action2",
      headerName: "Action 2",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => handleAction2(params.row)}
            aria-label="Remove a Prize"
          >
            Remove a prize
          </Button>
        );
      },
    },
  ];

  const handleAction2 = (selectedTournament: any) => {
    const updatedTournamentData = parsedData.map((tournament: any) => {
      if (tournament.id === selectedTournament.id) {
        const updatedPrizeDistribution = tournament.prizeDistribution.slice(
          0,
          -1
        );
        const lastPrize =
          tournament.prizeDistribution[tournament.prizeDistribution.length - 1]
            ?.prize;
        setTotalPrize(tournament.totalPrizePool - Number(lastPrize));

        return {
          ...tournament,
          prizeDistribution: updatedPrizeDistribution,
          totalPrizePool: tournament.totalPrizePool - Number(lastPrize),
        };
      }
      return tournament;
    });
    localStorage.setItem(
      "tournamentData",
      JSON.stringify(updatedTournamentData)
    );
  };

  return (
    <>
      <Navbar />
      <div style={{ height: 400, width: "90%", padding: "40px" }}>
        <DataGrid
          rows={parsedData}
          columns={columns}
          disableRowSelectionOnClick
          autoHeight
        />
      </div>
    </>
  );
};

export default Tournaments;
